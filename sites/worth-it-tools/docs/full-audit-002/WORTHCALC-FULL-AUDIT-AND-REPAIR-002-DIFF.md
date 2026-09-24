# WORTHCALC-FULL-AUDIT-AND-REPAIR-002 — crawl diff

- Before: production at 2026-09-23T17:19:48.198746+00:00
- After: local candidate preview at 2026-09-24T05:24:44.886114+00:00; production has not been updated.
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
The 9 legacy auto-calculator pages have no Reset control, so Reset is NOT_APPLICABLE. Their route, calculation, recomputation, validation, locale, mobile, console and fresh-context checks passed. All 18 calculators passed the applicable interaction gate.
ExportButtons.astro and downloadGate.ts remain as source infrastructure, but no current production page imports ExportButtons. The gate was exercised with a browser fixture and mocked endpoint; current production and candidate calculator pages expose no email-export entry. Privacy now describes the available Copy/CSV/Print controls and retains the real newsletter/Brevo disclosure.
