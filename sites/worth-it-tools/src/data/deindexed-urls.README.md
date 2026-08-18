# German soft-deindex registry

`deindexed-urls.json` is the single rollback control for the first 2026-W34 option D batch.

- Source: GSC Search Analytics API data for 2026-07-18 through 2026-08-14 (28 days), recorded in the repository-root `worthcalc-locale-audit.json`.
- Decision rule: German URLs in `bucket === "C_301_to_en"`, meaning 0 impressions during the measured window.
- Decision date: 2026-08-17.
- Review date: 2026-09-14.
- Behaviour: listed pages remain browsable, emit `noindex,follow`, stay out of the sitemap, and are removed as German hreflang targets from sibling locale pages.
- Rollback: replace the `urls` array with `[]` and rebuild. No page restoration or redirect change is needed.
