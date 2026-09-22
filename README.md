# 青古堂 / Seikoudou

A four-language gallery website for Korean ancient pottery. React, TypeScript and Tailwind; Next.js App Router conventions, with Vinext providing the Cloudflare Workers hosting build.

**Website:** https://seikoudou-gallery.jkim02493.chatgpt.site  
**GitHub:** https://github.com/jkim02493-code/-

## Where things live

| Folder | Purpose |
|---|---|
| `app/` | Route entry points, layout, metadata and shared styles |
| `components/gallery/` | Named site sections: header, hero, collection, artwork details, inquiry form and footer |
| `components/ui/` | Reusable accessible UI primitives; keep separate from gallery content |
| `data/artworks.ts` | Artwork images, verified object facts and translations |
| `i18n/locales/` | English (`en`), Japanese (`ja`), Korean (`ko`) and Simplified Chinese (`zh`) interface text |
| `i18n/language-provider.tsx` | Language selection, URL and preference persistence |
| `server/inquiries/` | Server-only validation and Notion writes |
| `public/images/` | Artwork photographs |
| `tests/` | Inquiry API checks with mocked Notion responses |
| `docs/` | Setup, content editing, architecture and release instructions |
| `build/`, `scripts/`, `vendor/` | Framework tooling and bundled third-party support |

## Quick start

Use the pnpm version declared in `package.json` and Node 22.13 or newer.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Set private Notion credentials in `.env.local` for local development. Hosted runtime settings are separate. Never commit secrets. In managed Sites environments, use the supplied preview and build helpers.

## Common changes

- **Edit a page section:** its named file in `components/gallery/`.
- **Change wording:** the corresponding file in `i18n/locales/`.
- **Add an artwork:** add its image in `public/images/`, then a record in `data/artworks.ts` with all four translations.
- **Change form handling:** `server/inquiries/handler.ts`. The route entry is `app/api/inquiry/route.ts`.
- **Change visual styling:** `app/globals.css`.

Visitors can switch languages without losing filters or a typed inquiry. The selection is remembered on the device and appears in the URL, for example `?lang=ja`. Chinese uses Simplified Chinese. The original visitor message is sent to Notion unchanged.

## Guides

- [Project map](docs/architecture.md)
- [Notion connection](docs/notion-setup.md)
- [Content and translations](docs/content-editing.md)
- [GitHub and publishing](docs/publishing.md)

## Checks

```bash
pnpm exec tsc --noEmit
node --experimental-strip-types tests/inquiry.mjs
pnpm build
```

API tests cover validation, origins, size limits, missing configuration, Notion property mapping, long Unicode messages and service failure. They mock Notion; a real test submission is still required after setting the live integration token. The optional WebMCP filter degrades gracefully when unavailable.

## Reference photography

The initial three works are public-domain museum references, **not gallery inventory**. Each detail dialog links to its collection record. Replace them with authorized inventory photographs and verified descriptions before a public commercial launch.

Images: The Metropolitan Museum of Art, Public Domain under Open Access.

- [Celadon maebyeong, 27.119.11](https://www.metmuseum.org/art/collection/search/39590)
- [Buncheong bottle, 2021.126](https://www.metmuseum.org/art/collection/search/851660)
- [Moon jar, 1979.413.1](https://www.metmuseum.org/art/collection/search/45432)
