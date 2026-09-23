# Notion inquiry inbox

The owner has a private database titled **青古堂 · Website Inquiries**. Its database and data-source IDs have been configured in the hosted Site. The remaining credential is the website's private `NOTION_API_KEY`.

## Exact property mapping

| Website field | Notion property | Notion type |
|---|---|---|
| Full name | Name | Title |
| Email address | Email | Email |
| Inquiry details | Inquiry Details | Text / rich text |
| Server receipt time | Submission Date/Time | Date |

The same fields are displayed in all four site languages. Names, emails and inquiry text are stored exactly as submitted after trimming leading/trailing whitespace. Unicode text is supported. Long messages are split into valid Notion rich-text elements without truncation. Timestamps use UTC.

## Finish the runtime connection

1. Open https://www.notion.so/profile/integrations and create an internal connection for Seikoudou in the workspace containing the inquiry database.
2. Enable only **Read content** and **Insert content**. No user-profile or update-content permissions are needed for the form.
3. Give that connection access to **青古堂 · Website Inquiries** through the database's Connections menu.
4. Store the connection token as the hosted Site secret **NOTION_API_KEY**. Never paste it into repository files, commit history, browser code or public issue comments.
5. Redeploy to apply the new runtime environment revision.
6. Submit a clearly marked test inquiry through the actual website. Confirm a new Notion row with all four fields before describing the form as connected.

For local development, copy `.env.example` to `.env.local` and set the same variables. Keep the actual database ID and optional data-source ID in environment variables. The token must be shared with the specific database even when ChatGPT can already see that database.

## Error behavior

Without a token, visitors see a translated unavailable message and the server returns 503. Validation returns 400, foreign origins 403, oversized requests 413, and Notion failures 502. The form preserves visitor text after failure. SDK automatic retries are disabled; uncertain network failures can occur after a page was saved, so inspect Notion before repeating an uncertain submission.

Before opening the site publicly, configure a distributed rate limit for `POST /api/inquiry` at the hosting edge. The request limit, origin check and honeypot are not a distributed rate limiter.
