# Project map

## Rendering

`app/page.tsx` renders `components/gallery/gallery-page.tsx`. The gallery page owns the selected artwork, collection filter and inquiry draft. It composes these independent sections:

| Component | Responsibility |
|---|---|
| `header.tsx` | Brand, navigation and accessible language selector |
| `hero.tsx` | Introductory photography and copy |
| `collection-grid.tsx` | Category filters, cards and optional WebMCP filter tool |
| `artwork-dialog.tsx` | Focus-managed artwork details and inquiry action |
| `inquiry-form.tsx` | Form fields, submission lifecycle and localized messages |
| `footer.tsx` | Gallery contact links and footer |

## Languages

`i18n/config.ts` defines supported locale IDs and their native names. All dictionaries conform to the English `Messages` type, so missing translation keys fail type checking. `language-provider.tsx` applies an explicit `?lang=` parameter first, then a saved preference. Invalid values fall back to English. It updates the document language and title. UI categories use stable IDs, so switching languages does not reset a filter. User-entered form content is preserved and is never automatically translated.

## Inquiry boundary

The frontend posts JSON to `/api/inquiry`. The thin route delegates to `server/inquiries/handler.ts`, which validates and bounds the request, then uses the official Notion SDK. A success response is returned only after Notion creates a page. Secrets exist only as server runtime variables, never in browser bundles or source files.

The ChatGPT Notion connector and this website's runtime credential are separate. Being able to create a database through ChatGPT does not grant the deployed website permission to write to it.

## Infrastructure

`.openai/hosting.json` retains the existing Site identity. `build/` and `scripts/` support its Worker build. `components/ui/` contains the bundled accessibility primitives. `db/` is unused starter support; no visitor inquiry is stored there. The source uses Next.js route conventions, while production compilation uses Vinext.
