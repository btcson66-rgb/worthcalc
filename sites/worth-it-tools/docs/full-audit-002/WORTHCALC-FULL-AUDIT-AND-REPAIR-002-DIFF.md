# WORTHCALC-FULL-AUDIT-AND-REPAIR-002 — crawl diff

- Before: production at 2026-09-23T17:19:48.198746+00:00
- After: local candidate preview at 2026-09-24T00:09:33.992301+00:00; production has not been updated.
- Sitemap: 179 → 181, both 100% crawled.
- Intentional deindex routes checked: 1120 → 1120.
- Built routes: 581 (excluding test fixture); locale counts: {'root': 1, 'ar': 14, 'de': 67, 'en': 165, 'es': 67, 'fr': 67, 'hi': 14, 'zh': 186}.

| Check | Production before | Candidate after |
|---|---:|---:|
| alias_internal_link_sources | 2 | 0 |
| broken_link_sources | 6 | 0 |
| deindexed_in_hreflang | 0 | 0 |
| deindexed_without_noindex | 0 | 0 |
| hreflang_nonreciprocal_sources | 0 | 0 |
| internal_redirect_sources | 0 | 0 |
| missing_description | 0 | 0 |
| missing_h1 | 0 | 0 |
| missing_title | 0 | 0 |
| orphan_urls | 0 | 0 |
| schema_parse_errors | 0 | 0 |
| sitemap_in_deindexed | 0 | 0 |
| sitemap_noindex | 0 | 0 |
| sitemap_non200 | 0 | 0 |
| sitemap_nonself_canonical | 0 | 0 |
| sitemap_redirects | 0 | 0 |

The six production broken-link sources expose Cloudflare email-protection placeholders to raw HTTP crawlers. A browser decoded the contact link to mailto:btcson224@gmail.com. The local preview has no Cloudflare obfuscation.
One intentionally retired URL returned HTTP 503 in the first production sweep: /en/guides/true-cost-of-free-shipping-threshold/. Two immediate repeat requests returned 404. The first result is retained as a transient observation.
The 9 legacy auto-calculator pages have no Reset control; browser reload retains edited number fields. Their route, calculation, validation, locale, mobile and console checks passed, but the requested full interaction gate is incomplete.
ExportButtons.astro and downloadGate.ts exist, but no current page imports ExportButtons. The gate was exercised with a browser fixture and mocked endpoint; live user-facing TXT/JSON/email export reachability is not verified.
