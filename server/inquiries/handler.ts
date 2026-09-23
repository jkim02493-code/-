import { Client, isNotionClientError } from "@notionhq/client";
import { z } from "zod";

/** NOTION SETUP — server only; never prefix these secrets with NEXT_PUBLIC_.
 * 1. Create an internal connection at https://www.notion.so/profile/integrations.
 *    Enable Read content and Insert content. Copy its API token.
 * 2. Create a Notion database with these EXACT property names and types:
 *    Name: Title | Email: Email | Inquiry Details: Rich text | Submission Date/Time: Date.
 * 3. Open the database -> Connections -> add your connection.
 * 4. Copy .env.example to .env.local. Put the token in NOTION_API_KEY and
 *    the database UUID from its URL (not a view ID) in NOTION_DATABASE_ID.
 *    In production, set the same names as private server runtime variables.
 * 5. For a database containing multiple data sources, also set NOTION_DATA_SOURCE_ID.
 *    Single-source databases are resolved automatically from NOTION_DATABASE_ID.
 * 6. Restart the server, submit an inquiry, and confirm all four properties in Notion.
 *
 * Uses the official SDK and the explicit 2025-09-03 API contract. See:
 * https://developers.notion.com/guides/get-started/upgrade-guide-2025-09-03
 * Put a distributed rate-limit rule on POST /api/inquiry before opening publicly.
 * The honeypot and origin check are basic defenses, not an abuse rate limiter.
 */
const schema = z.object({
  fullName: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  details: z.string().trim().min(10).max(6000),
  website: z.string().max(500).optional().default(""),
}).strict();
const json = (data: object, status = 200) => Response.json(data, { status, headers: { "Cache-Control": "no-store" } });

// Limit actual bytes, including chunked requests that omit Content-Length.
async function readBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("invalid_body");
  const chunks: Uint8Array[] = []; let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read(); if (done) break;
      size += value.byteLength;
      if (size > 32768) { await reader.cancel(); throw new Error("body_too_large"); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return JSON.parse(new TextDecoder().decode(bytes));
}

export async function handleInquiry(request: Request) {
  // Browsers send Origin; reject cross-origin calls. No permissive CORS headers.
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return json({ error: "Please submit the form from this website." }, 403);
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return json({ error: "Please send a JSON request." }, 415);
  let input: unknown;
  try { input = await readBody(request); }
  catch (e) { return json({ error: "Your inquiry could not be read. Please check it and try again." }, e instanceof Error && e.message === "body_too_large" ? 413 : 400); }
  const parsed = schema.safeParse(input);
  if (!parsed.success) return json({ error: "Please enter your name, a valid email, and an inquiry of 10–6,000 characters." }, 400);
  if (parsed.data.website) return json({ error: "Your inquiry could not be accepted. Please try again." }, 400);
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!apiKey || !databaseId) return json({ error: "Online inquiries are not available yet. Please try again later." }, 503);
  const notion = new Client({ auth: apiKey, notionVersion: "2025-09-03", timeoutMs: 12000, retry: false, logger: () => {} });
  try {
    const database = await notion.databases.retrieve({ database_id: databaseId });
    if (!("data_sources" in database)) throw new Error("database_unavailable");
    const configuredSource = process.env.NOTION_DATA_SOURCE_ID;
    const dataSourceId = configuredSource || (database.data_sources.length === 1 ? database.data_sources[0].id : undefined);
    if (!dataSourceId || !database.data_sources.some(source => source.id.replaceAll("-", "") === dataSourceId.replaceAll("-", ""))) throw new Error("data_source_configuration");
    // Notion limits each rich-text element to 2,000 characters. Split safely.
    const chars = Array.from(parsed.data.details);
    const richText = [];
    for (let i = 0; i < chars.length; i += 1000) richText.push({ type: "text" as const, text: { content: chars.slice(i, i + 1000).join("") } });
    await notion.pages.create({
      parent: { type: "data_source_id", data_source_id: dataSourceId },
      properties: {
        Name: { title: [{ type: "text", text: { content: parsed.data.fullName } }] },
        Email: { email: parsed.data.email },
        "Inquiry Details": { rich_text: richText },
        "Submission Date/Time": { date: { start: new Date().toISOString() } },
      },
    });
    return json({ ok: true }, 201);
  } catch (e) {
    // Log a code only. Never log tokens, emails, names, inquiry text or SDK bodies.
    console.error("Inquiry storage failed", isNotionClientError(e) ? e.code : "configuration_or_network");
    return json({ error: "We could not confirm receipt of your inquiry. Please wait a moment before trying again." }, 502);
  }
}
