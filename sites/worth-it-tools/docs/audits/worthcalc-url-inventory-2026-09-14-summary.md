# WorthCalc URL inventory summary — 2026-09-14

## Scope and method

- Source: the locally generated `dist/sitemap-0.xml`; exact sitemap URL count: **1233**.
- One row per URL in that child sitemap. Main-content text removes `header`, `nav`, `footer`, and `aside`; inbound/outbound counts use unique same-locale body targets and unique source pages respectively.
- Package IDs come from the built per-page OG image path and review metadata comes from content frontmatter. Topic values use the existing `classifyTopic()` implementation loaded through Vite. No package source files were regex-parsed.
- `og_image_unique` is true only when the built `og:image` is present, non-default, and used by one inventory URL.
- 125–130: **terminated / not admitted**. The local unpublished commit `67c688f` is not an ancestor of `origin/main`; no 125–130 entries are in the active main registry, so no unmerged page code was carried into this branch.

## Locale × route type

| Locale | tool | guide | topic-hub | index | legal | home | Total |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| ar | 0 | 155 | 0 | 0 | 0 | 0 | 155 |
| de | 4 | 0 | 0 | 11 | 1 | 1 | 17 |
| en | 18 | 195 | 6 | 60 | 6 | 1 | 286 |
| es | 17 | 155 | 0 | 43 | 6 | 1 | 222 |
| fr | 17 | 0 | 0 | 43 | 6 | 1 | 67 |
| hi | 0 | 155 | 0 | 0 | 0 | 0 | 155 |
| zh | 18 | 235 | 6 | 65 | 6 | 1 | 331 |

## Cluster counts

| Cluster | URLs |
| --- | ---: |
| debt-credit | 97 |
| everyday | 699 |
| housing | 45 |
| income-savings | 118 |
| memberships | 193 |
| transportation | 81 |

## Word-count distribution

| Percentile | Words |
| --- | ---: |
| P10 | 328.0 |
| P50 | 618.0 |
| P90 | 1938.2 |

## Internal inbound links

`internal_inbound_links=0`: **26** pages.

- https://worthcalc.win/
- https://worthcalc.win/de/
- https://worthcalc.win/de/terms/
- https://worthcalc.win/en/changelog/
- https://worthcalc.win/en/freelancer-pricing-decision-engine/
- https://worthcalc.win/en/job-offer-true-value-decision-engine/
- https://worthcalc.win/en/terms/
- https://worthcalc.win/es/
- https://worthcalc.win/es/about/
- https://worthcalc.win/es/changelog/
- https://worthcalc.win/es/contact/
- https://worthcalc.win/es/disclaimer/
- https://worthcalc.win/es/privacy/
- https://worthcalc.win/es/terms/
- https://worthcalc.win/fr/
- https://worthcalc.win/fr/about/
- https://worthcalc.win/fr/changelog/
- https://worthcalc.win/fr/contact/
- https://worthcalc.win/fr/disclaimer/
- https://worthcalc.win/fr/privacy/
- https://worthcalc.win/fr/terms/
- https://worthcalc.win/zh/
- https://worthcalc.win/zh/changelog/
- https://worthcalc.win/zh/freelancer-pricing-decision-engine/
- https://worthcalc.win/zh/job-offer-true-value-decision-engine/
- https://worthcalc.win/zh/terms/

## External source links

`source_count=0`: **96** pages.

## Terminated package list

- SEO package 125: terminated 2026-09-14 per master plan; unpublished and absent from `origin/main` registry.
- SEO package 126: terminated 2026-09-14 per master plan; unpublished and absent from `origin/main` registry.
- SEO package 127: terminated 2026-09-14 per master plan; unpublished and absent from `origin/main` registry.
- SEO package 128: terminated 2026-09-14 per master plan; unpublished and absent from `origin/main` registry.
- SEO package 129: terminated 2026-09-14 per master plan; unpublished and absent from `origin/main` registry.
- SEO package 130: terminated 2026-09-14 per master plan; unpublished and absent from `origin/main` registry.
