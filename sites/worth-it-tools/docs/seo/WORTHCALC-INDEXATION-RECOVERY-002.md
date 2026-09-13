# WORTHCALC-INDEXATION-RECOVERY-002

Generated: 2026-09-13

## Merge status

- PR #163: **MERGED**
- PR head: `1d9910b9261a4dbc84a5cfc8f5f8605e63d5e7d3`
- Merge commit / production commit: `84323ff81c08e468572b0a280571af0bb1a1f2de`
- Merged at: `2026-09-13T08:38:04Z`
- Pre-merge CI: success; exact head, clean merge state, and no unexpected commits confirmed.

## Production deployment

- Site: `https://worthcalc.win/`
- Workflow: `Deploy WorthCalc`, run `34748175116`, conclusion `success`
- Build job: `103699827776`, success
- Pages deploy job: `103699909186`, success
- Pages deployment ID: `84323ff81c08e468572b0a280571af0bb1a1f2de`
- Deployment action window: `2026-09-13T08:38:56Z`–`2026-09-13T08:39:02Z`
- Production-serving confirmation: the post-deploy full live crawl served the repaired routes and found zero of the five pre-deploy stale links.
- IndexNow job: `103699933642`, success
- GSC sitemap job: `103699933640`, success

## Production audit

The sitemap index and its listed child returned HTTP 200. Every sitemap URL was fetched again after deployment.

| Metric | Before | After |
| --- | ---: | ---: |
| Sitemap URLs | 1,229 | 1,229 |
| HTTP 200 | 1,229 | 1,229 |
| HTTP 3xx | 0 | 0 |
| HTTP 4xx | 0 | 0 |
| HTTP 5xx | 0 | 0 |
| Sitemap indexable URLs | not available in pre-deploy readback | 1,229 |
| Sitemap noindex URLs | 0 | 0 |
| Canonical mismatches | 0 | 0 |
| Canonical to redirect | 0 | 0 |
| Canonical to 404 | 0 | 0 |
| Broken internal links | 5 known stale links | 0 |
| Internal links to redirects | 0 | 0 |
| Valuable orphan indexable URLs | 0 | 0 |
| Hreflang errors | 0 | 0 |
| Accidental noindex | 0 | 0 |

The five pre-deploy 404s were internal-link targets outside the sitemap; the sitemap itself already returned `HTTP 200 = 1,229` before deployment. The authoritative after value is the post-deploy full crawl: `HTTP 200 = 1,229`, with no 3xx/4xx/5xx.

The production rendered-link scan covered all 1,229 sitemap pages, including the root and locale hubs. The repaired five stale links now resolve to final 200 routes; no internal link points to a redirect.

## Canonical, hreflang, robots, and indexability

- All 1,229 sitemap pages returned an absolute canonical whose target was HTTP 200 and indexable; canonical mismatch, canonical-to-redirect, and canonical-to-404 counts were all 0.
- Hreflang targets were HTTP 200, indexable, canonical-consistent, and reciprocal; broken reciprocal pairs and all hreflang errors were 0.
- `robots.txt`: HTTP 200; `Allow: /`; both the sitemap index and child sitemap are discoverable.
- Sitemap pages with meta `noindex`: 0.
- Sitemap pages with `X-Robots-Tag: noindex`: 0.
- The existing 50-page intentional German `deindexedRegistry` remains outside the sitemap and unchanged. No intentional noindex policy was removed.
- The root topic-directory stubs `/en/topics/`, `/zh/topics/`, `/es/topics/`, `/fr/topics/`, and `/de/topics/` remain unlisted 404/noindex compatibility stubs. They are not internally linked, are not sitemap URLs, and are not counted as broken internal links. Actual topic hubs under `/topics/<slug>/` were validated where present.

## Rendered HTML sample

The post-deploy sample contained 65 valid HTTP 200 pages:

- Root homepage: 1.
- EN and ZH: each locale home, tools index, guides index, 5 calculator pages, 5 guide pages, and 5 topic hubs.
- ES: locale home, tools index, guides index, 5 calculator pages, and 5 guide pages.
- FR: locale home, tools index, guides index, and 5 calculator pages.
- DE: locale home, tools index, guides index, and its 4 available calculator pages.

All 65 valid samples had initial HTML title, meta description, H1, substantive `<main>` content, absolute canonical, and internal links. No sample had meta or header `noindex`. The 1,229-page sitemap inventory also had 0 missing title, H1, canonical, or non-200 canonical targets.

## Post-merge gates

- Build: pass; 1,281 pages built.
- `npm.cmd run check:indexation`: **PASS**, exit 0.
- `npm.cmd run verify`: **PASS**, exit 0.
- Post-merge local indexation metrics: 1,280 generated HTML URLs; 1,229 unique sitemap URLs; 0 local broken links; 0 local hreflang errors; 0 sitemap noindex; 0 sitemap 4xx/5xx; 0 canonical mismatch; 0 valuable orphans.
- Full post-deploy live indexation audit: **PASS**, exit 0; 1,229/1,229 live URLs HTTP 200; live broken links 0; live hreflang errors 0.

## GSC and sitemap readiness

- Local direct GSC API: `BLOCKED BY CREDENTIAL`; `GSC_SERVICE_ACCOUNT_JSON` is not present locally. No secret was requested or printed.
- GitHub Actions GSC sitemap job: success (`103699933640`). This is sitemap-submission workflow evidence, not proof of Google indexing, rankings, traffic, or revenue.
- Manual URL Inspection / Request indexing: not used.
- SITEMAP READY FOR RESUBMISSION: **YES**. The production sitemap is clean; do not repeatedly delete and resubmit the same sitemap.

## Priority recrawl observation set

No bulk Request indexing was sent. For a later, limited observation set, prioritize:

1. `https://worthcalc.win/`
2. `https://worthcalc.win/en/tools/`
3. `https://worthcalc.win/zh/tools/`
4. `https://worthcalc.win/en/guides/`
5. `https://worthcalc.win/zh/guides/`
6. `https://worthcalc.win/en/topics/transportation/`
7. `https://worthcalc.win/zh/topics/transportation/`
8. `https://worthcalc.win/en/tools/commute-cost/`
9. `https://worthcalc.win/zh/tools/commute-cost/`
10. `https://worthcalc.win/en/tools/budget-builder/`
11. `https://worthcalc.win/zh/tools/budget-builder/`
12. `https://worthcalc.win/en/guides/car-loan-60-vs-72-vs-84-early-exit/`
13. `https://worthcalc.win/en/guides/annual-bills-monthly-equivalent/`
14. `https://worthcalc.win/zh/guides/annual-expenses-monthly-equivalent/`
15. `https://worthcalc.win/en/true-hourly-wage-after-commuting-work-expenses/`

These are observation candidates only; they do not imply that indexing should be requested immediately.

## Remaining blockers and boundaries

- No technical production gate remains failed.
- Google’s actual crawl/indexing state remains an external observation outcome and is not claimed from deployment or sitemap submission success.
- The supplied GSC snapshot still has aggregate counts only; URL-level classification for its 174 redirect rows remains unavailable.
- Similarity candidates from RECOVERY-001 remain `HUMAN_REVIEW_REQUIRED`; no bulk merge, redirect, canonical, or noindex action was taken.
- Do not expand the URL inventory during the observation period.

## READY FOR GOOGLE RECRAWL: YES

All RECOVERY-002 deployment and production technical gates passed. This status means the site is technically ready for Google to recrawl; it does not assert that Google has already indexed the URLs.
