# Money briefs: the dated-reference cluster and its release gate

Created: 2026-09-18

## Why this cluster exists

After the S1 consolidation on 2026-09-15 the site carried **307 indexable URLs** and
**929 soft-deindexed ones** (`src/data/deindexed-urls.json`). Every one of the 307 was
an evergreen formula page. Two consequences followed:

1. **Nothing had a reason to be re-crawled.** A page whose content is a formula does not
   change, so a crawler that has seen it once has no reason to come back.
2. **Nothing carried a citable figure.** The pages explained *how* to calculate;
   none of them stated *what the number currently is*, with a date and a source.

Those are the two things a small site on a domain with no authority can still win at,
and the two things an AI answer cannot replace: a current number, and an interactive
calculator that runs it on the reader's own inputs.

Each brief therefore does three things in order:

1. States one figure from a named primary source, with the date it was verified.
2. Shows the arithmetic that turns that figure into a decision, with a worked example.
3. Hands the reader to the calculator that runs it on their own numbers.

## Where things live

| Path | What it is |
| --- | --- |
| `src/content/money-briefs/{en,zh}/<slug>.md` | The briefs. Frontmatter carries the release date, sources, limits, formula and FAQ. |
| `src/content.config.ts` → `moneyBriefs` | Schema. `sources` and `limits` are required and non-empty. |
| `src/lib/publication.ts` | The release gate. `publishCutoff()` and `isPublished()`. |
| `src/lib/moneyBriefs.ts` | Locale scope (`BRIEF_LOCALES`), cluster ids, and the en/zh UI copy. |
| `src/pages/[locale]/money/[slug].astro` | The brief page. |
| `src/pages/[locale]/money/index.astro` | The hub. Lists **due** briefs, grouped by cluster, newest first. |
| `scripts/check-due-briefs.mjs` | The CI gate that decides whether a scheduled night is a release night. |

## How the release gate works

A brief carries `publishAt: YYYY-MM-DD`. `getStaticPaths` emits **only** briefs whose
date has arrived, so an unreleased brief has no HTML, no sitemap entry, no internal
link and no hreflang alternate. It does not exist until its date.

This is deliberately stricter than rendering it `noindex`: a noindex page is still a
crawled URL, and crawl budget is the thing being conserved.

The cutoff is read once per build from `PUBLISH_AS_OF`, defaulting to today in UTC.
To see what the site looks like on a future date:

```bash
PUBLISH_AS_OF=2026-10-14 npm run build
```

An invalid `PUBLISH_AS_OF` throws rather than falling back to today — a typo in a
workflow must stop the build, not publish the whole backlog because
`new Date('tomrrow')` is `Invalid Date`.

### Why a date and not a `draft` flag

A flag is flipped by a human, and a human flipping fifty-four flags flips them in
batches. That is the shape that took the sitemap from 41 to 341 URLs between
2026-07-19 and 2026-07-23 and GSC impressions from 87/day to 3/day
(`config/url-budget.json` keeps the full record). A date cannot be flipped in a batch.
The whole cluster can be written, reviewed and merged in one commit while the public
surface still grows by the two pages due that day.

## How a brief actually goes live

The date gate only decides *what a build emits*. Something still has to build on the
day. That is the `schedule` trigger on `.github/workflows/deploy-worthcalc.yml`:

```
schedule:
  - cron: '20 3 * * *'
```

- The `release-window` job runs `scripts/check-due-briefs.mjs` and outputs `due`.
- `build` runs only when `due == 'true'` (or when the event is a push or a dispatch).
- `deploy`, `indexnow` and `gsc-submit` follow as they do for a push.

The gate's window is **two days**, not one. GitHub's scheduled events are best-effort
and get dropped under load; a one-day window would silently skip a release the first
time a cron did not fire. Two days means the next night picks it up, and re-deploying
an already-published day is harmless because the build is deterministic for a date.

**Scheduled workflows only run on the default branch**, so nothing fires until this is
merged to `main`. GitHub also disables scheduled workflows in repositories with 60 days
of no activity — if releases stop, check that first.

### Current runway

| Batch | Topics | Release window |
| --- | ---: | --- |
| 1 | 27 | 2026-09-18 → 2026-10-14 |
| 2 | 11 | 2026-10-15 → 2026-10-25 |
| 3 | 14 | 2026-10-26 → 2026-11-08 |
| **Total** | **52** | **2026-09-18 → 2026-11-08** |

52 topics × en/zh = 104 brief pages, plus the two hubs. At full release the sitemap
reaches 412 URLs against `maxUrls` 425 in `config/url-budget.json`. The rate is two
URLs a day throughout; only the runway gets longer when a batch is added.

The last scheduled release is **2026-11-08**. After that date the cron still fires
nightly, `check-due-briefs.mjs` reports nothing due, and the build is skipped — so the
cluster stops publishing silently rather than failing. Adding the next batch is the
only thing that restarts it.

## Internal linking, and why the hub does not read `guideIndex.ts`

`scripts/check-guide-index.mjs` fails any editorial page in the sitemap that has no
substantive inbound internal link. A brief released by a nightly rebuild has to acquire
that link **in the same build that first emits it**.

`src/data/guideIndex.ts` is generated from a previous build and committed, so it cannot
know about a page released on a day nobody touched the repo. The hub therefore reads
the collection directly. The same reasoning applies to `src/pages/llms.txt.ts`.

Each brief's inbound links, in order of weight:

1. The hub (`/en/money/`, `/zh/money/`) — always current.
2. The homepage library section and the site footer, which link the hub (en/zh only).
3. `/en/guides/` and the topic hubs, once `guideIndex.ts` is regenerated.
4. Sibling briefs, via `related` in frontmatter.

`related` entries pointing at other briefs are filtered against the set of live briefs
at build time, so a brief published today never links to one that is three weeks away.

## Adding a brief

1. Write `src/content/money-briefs/en/<slug>.md` and the `zh` counterpart. Keep
   `briefSlug` identical across locales — that is what pairs them for hreflang.
2. Give it a `publishAt` on a day nothing else is scheduled. Check the current
   schedule with:
   ```bash
   for f in src/content/money-briefs/en/*.md; do
     printf '%s  %s\n' "$(grep -m1 '^publishAt:' "$f" | cut -d'"' -f2)" "$(basename "$f" .md)"
   done | sort
   ```
3. `sources` must be non-empty, each with a URL and a `verifiedDate`. Prefer a URL
   already used elsewhere in this repo — those have been checked. The site's build
   cannot verify external URLs, so an invented one ships silently.
4. `limits` must be non-empty and must say what the page does **not** cover.
5. Check the URL budget has room: `config/url-budget.json`, `maxUrls`.
6. `PUBLISH_AS_OF=<its date> npm run build` to see it, then `npm run verify`.

## Boundaries

- **en and zh only.** `BRIEF_LOCALES` matches `HUB_LOCALES` in `src/lib/topics.ts` and
  the i18n expansion freeze in `README.md`. The reason is concentration of measured
  demand: in the 3-month window recorded in
  `docs/audits/worthcalc-disposition-2026-09-15.csv`, en and zh took **760 of the 873
  impressions (87%)** across the kept set, on 163 of its 304 URLs. Writing a new cluster
  where 87% of the demand already sits beats spreading it five ways.

  > **Correction, 2026-09-19.** This bullet previously said es, fr and de "recorded zero
  > GSC impressions". That is false. The same CSV shows they recorded **113 impressions
  > across 50 URLs**; the zero belongs to the *deindexed* 195 URLs described in the
  > comment in `src/lib/topics.ts`, not to the kept 141. German is in fact the
  > best-performing locale on the site by hit rate — **15 of its 17 kept URLs earned
  > impressions (88%)**, against 49% for en and 33% for zh — which argues de is
  > under-built rather than expendable. Do not use this freeze as grounds for removing
  > or deindexing those locales.
- **The figures need re-verification.** Every brief carries a `lastReviewed` date and
  renders it. A rate brief whose figure is six months stale is worse than no brief,
  because the whole premise of the cluster is that these numbers are current.
- **This does not claim anything about rankings.** It changes what the site publishes
  and how fast. Whether Google crawls, indexes or ranks it is an external outcome and
  is not asserted by any check in this repository.
