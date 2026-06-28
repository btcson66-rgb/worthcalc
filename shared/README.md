# Shared Libraries

These are standalone, dependency-free TypeScript modules that any site can copy into its `src/lib/` folder.

They are not imported directly at build time. Each site is self-contained. The shared folder serves as a reference and source of truth for common SEO, analytics, ad, storage, and export helpers.

## Subdirectories

- `seo/`: metadata, schema, and sitemap helpers for static SEO pages.
- `analytics/`: Google Analytics 4 configuration and script helpers.
- `ads/`: AdSense snippets, placeholders, and policy reminders.
- `storage/`: safe browser localStorage helpers for persistent tool fields.
- `export/`: clipboard and download helpers for text, JSON, CSV, and future PDF exports.
- `ui/`: reference notes for shared UI component patterns used by individual sites.
