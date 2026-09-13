# WORTHCALC-INDEXATION-RECOVERY-001

Generated: 2026-09-13T08:23:58.910Z

## Executive summary

The current production sitemap exposes 1229 unique URLs, while the supplied Google Search Console export (effective 2026-09-04) knows 489. This is a discovery/lifecycle gap, not evidence that all 188 URLs are low-quality: 174 are reported as redirects, 8 as noindex, 2 as alternate canonical, and only 4 as crawled but currently not indexed.

The repository-side repair in this change fixes 5 concrete internal links found in generated HTML and adds a permanent build gate covering sitemap status/indexability/canonical, same-site absolute links, internal reachability, hreflang reciprocity, duplicate sitemap entries, and broken links. No bulk deletion, noindex expansion, canonical restructuring, or URL merge was performed.

## GSC baseline

| Metric | Value |
| --- | ---: |
| Indexed | 301 |
| Not indexed | 188 |
| Known URLs | 489 |
| Page with redirect | 174 |
| Excluded by noindex | 8 |
| Alternate page with proper canonical | 2 |
| Crawled - currently not indexed | 4 |

The GSC API health check was not available in this run because the environment did not contain `GSC_SERVICE_ACCOUNT_JSON`. The aggregate ZIP contains no URL-level export for the 174 redirect rows, so those source URLs remain unclassified rather than guessed.

## Current production inventory

The production sitemap index and its one child returned HTTP 200 with XML content. The live crawl read back 1229 sitemap URLs. Live status counts: `{"200":1229}`. The local origin/main build contains 1280 HTML routes, of which 1230 are technically indexable and 50 are noindex by policy.

## Root causes

### Root cause 1: Google-known URL inventory is older/smaller than the deployed sitemap

Evidence: the supplied GSC snapshot stops at 2026-09-04 and knows 489; the current public sitemap readback exposes 1229. The repository history also shows the information-architecture migration that moved the exhaustive guide catalogue off the homepage into guides/tools directories and topic hubs. This is consistent with a sitemap/discovery migration, but the missing URL-level GSC export and unavailable API prevent claiming which exact 174 old URLs were migrated.

Fix: retain the existing crawlable hierarchy, verify the public sitemap/robots surfaces, and add permanent parity gates. No repeated manual indexing requests were used as a substitute for site repair.

### Root cause 2: five rendered internal links still pointed at stale or non-existent paths

Evidence before repair: generated HTML contained five same-site links not present in the built route inventory: the English 60/72/84 auto-loan guide, English annual-bills guide, two commute/true-hourly-wage links, and the Chinese annual-expenses guide. The existing link check skipped absolute URLs, so this defect was not caught.

Fix: updated the five content links and the matching legacy package related-link metadata to their actual final 200 routes; the new recovery gate checks same-origin absolute links as well as relative links.

Before: 5 local broken internal links. After: expected 0 in the final build gate.

### Root cause 3: current URL quality is constrained by intentional policy, not an automatic bulk deindex target

Evidence: the current repository has 50 noindex pages, all from the existing German zero-impression deindex registry or explicit page policy; the current GSC export only describes eight noindex URLs because its known-URL universe is smaller. Current technical audits found 0 sitemap canonical mismatches and 0 valuable sitemap orphans locally.

Decision: keep the registry unchanged until its dated review; do not turn the 174 aggregate redirects, eight aggregate noindex rows, or similarity candidates into bulk URL actions without URL-level evidence and human review.

## Changes implemented

- Repaired five stale internal links in growth article content.
- Repaired the same five paths in legacy package related-link metadata so future renderers cannot reintroduce them.
- Added `scripts/check-indexation-recovery.mjs`; default mode is a local build gate, and `--write --live` creates this report and CSV evidence.
- Added sitemap, canonical, hreflang, link-graph, orphan, redirect, and similarity artifacts under `docs/seo/`.

## Findings

- Redirects: live sitemap redirect URLs = 0; GSC aggregate redirects = 174, with no URL-level rows in the supplied export.
- Noindex: current registry/policy rows = 50; accidental noindex = 0; sitemap noindex = 0.
- Canonical: sitemap mismatch = 0; unexpected canonical collisions = 0.
- Hreflang: repository issues = 0; current production readback issues = 0.
- Internal links: repository broken = 0; current production readback broken = 5; internal links to redirects = 0.
- Orphans: valuable indexable sitemap orphans = 0.
- Similarity: 45 candidate pair(s) at or above 0.86 normalized-token Jaccard similarity; every candidate remains `HUMAN_REVIEW_REQUIRED`, and no page was merged, redirected, canonicalized, or deindexed from similarity alone.

## Before / after metrics

| Metric | Before local repair | After local repair / current readback |
| --- | ---: | ---: |
| Generated HTML URLs | 1280 | 1280 |
| Sitemap URLs | 1229 | 1229 |
| Indexable URLs | 1230 | 1230 |
| Broken internal links | 5 | 0 |
| Sitemap canonical mismatch | 0 | 0 |
| Sitemap noindex URLs | 0 | 0 |
| Valuable orphan indexable URLs | 0 | 0 |

## Repository acceptance metrics

- Generated HTML URLs: 1280
- Sitemap URLs: 1229
- Indexable URLs: 1230
- 200 URLs: 1280
- Redirect URLs: 0
- Noindex URLs: 50
- Canonical mismatch: 0
- Hreflang errors: 0
- Broken internal links: 0
- Internal links pointing to redirects: 0
- Orphan indexable URLs: 0
- Near-duplicate pairs: 45
- Average click depth: 2.66
- Max click depth: 3



## Current production readback (pre-PR)

- Sitemap URLs crawled: 1229
- HTTP status counts: `{"200":1229}`
- Sitemap redirect URLs: 0
- Sitemap noindex URLs: 0
- Canonical mismatches: 0
- Hreflang issues: 0
- Broken internal links to current repository routes: 5

The live broken-link count is a pre-PR production observation. It is expected to remain until this branch is approved and deployed; it is not a repository acceptance failure after the local build gate passes.

## Post-deploy GSC actions

1. After the approved PR is deployed, submit/read back `https://worthcalc.win/sitemap-index.xml` and its listed child sitemap using the Search Console Sitemap API.
2. Inspect the homepage, the six topic hubs where applicable, both directories, and the 10-20 highest-quality decision pages.
3. Compare Page Indexing and Search Analytics only after Google has a new crawl window. Submission, HTTP 200, and sitemap readback are delivery evidence; they are not proof of indexing, rankings, traffic, conversions, or revenue.

## Remaining risks

- The 174 GSC redirect rows cannot be individually classified without the missing URL-level export.
- GSC API state remains unverified until the credential is supplied; no claim is made about sitemap download or indexing lifecycle.
- Similarity candidates are advisory and require human intent review.
- Production still reflects the pre-PR content until this branch is approved and deployed.

## READY FOR GOOGLE RECRAWL: NO

The repository gate is ready after the final build passes, but the five-link repair is not production-deployed in this run.
