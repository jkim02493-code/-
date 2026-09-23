# Content and translations

## Artwork records

1. Add an authorized photograph to `public/images/`, using a lowercase, descriptive filename without spaces.
2. Add or update the artwork in `data/artworks.ts`.
3. Assign `culture` as `korea` or `china`, then use the matching category: `celadon`, `buncheong`, `white`, `sancai`, `longquan`, or `blueWhite`.
4. Fill in `title`, `period`, `alt`, `dimensions`, `description`, and `material` for **each** of `en`, `ja`, `ko`, and `zh`.
5. Verify dimensions, attribution and dates against the actual inventory record.
6. Run type checking, then preview and publish.

The hero currently uses `public/images/celadon.jpg` and the first artwork's translated image description. Change these together if replacing the hero subject.

## Interface text

Edit `i18n/locales/en.ts`, `ja.ts`, `ko.ts`, and `zh.ts`. Preserve placeholders `{title}` and `{id}` in the inquiry prefill. Do not translate stable locale/category IDs or API field names.

English is the default when no valid preference exists. The language menu uses native labels, supports keyboards and updates the URL without reloading. A saved preference is optional; language switching still works if browser storage is blocked.

## Museum reference disclosure

The current artworks belong to museums. The reference note, credit line, and similar-works inquiry button disclose that clearly. When replacing all reference records with verified gallery inventory, update those messages in all four dictionaries together. This is an editorial file-based workflow, not an authenticated upload portal.
