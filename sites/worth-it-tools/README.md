# WorthCalc

This is a reusable static SEO tool-site starter built with Astro 5 and TypeScript. It ships with bilingual English and Traditional Chinese routes, SEO-ready layouts, static legal pages, and browser-based utility tools. It has no backend, database, AI service, or server-side user accounts.

## Tech Stack & Requirements

- Astro 5
- TypeScript
- ESLint
- `@astrojs/sitemap`
- Node.js 18+
- npm

## Quick Start

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the local Astro development server. |
| `npm run build` | Build the static site into `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run typecheck` | Run Astro and TypeScript checks. |
| `npm run lint` | Run ESLint. |
| `npm run check:links` | Run the project link checker. |
| `npm run check:indexation` | Verify sitemap/indexability, canonical, hreflang, internal-link, orphan, and similarity evidence after a build. |
| `npm run verify` | Run the combined verification workflow. |

## Cloning Into a New Site

Use this 5-site workflow when creating another tool site from the starter:

1. Copy the whole folder to a new project directory.
2. Edit `src/consts.ts` for the site name, canonical URL, social handle, locale metadata, and navigation labels.
3. Edit `.env` for `SITE_URL`, `PUBLIC_GA_ID`, and `PUBLIC_ADSENSE_CLIENT`.
4. Add new tools under `src/pages/{en,zh}/tools` and keep both locales in sync.
5. Add `og-default.png` to `/public` and replace placeholder legal/contact details before launch.

## Deploy

The site is static. `npm run build` outputs production files to `dist/`. Set `SITE_URL` at build time so sitemap and canonical URLs match the deployed domain.

- Netlify: connect the repo, set build command `npm run build`, publish directory `dist`, and add `SITE_URL` in environment variables.
- Vercel: import the repo, keep Astro defaults, set output directory `dist`, and add `SITE_URL` in environment variables.
- Cloudflare Pages: set framework preset Astro, build command `npm run build`, output directory `dist`, and add `SITE_URL` in build variables.
- GitHub Pages: build with `npm run build`, then publish the `dist/` folder with your Pages workflow.

## GA4 Setup

Create a Google Analytics 4 property, copy the Measurement ID in the form `G-XXXX`, and set `PUBLIC_GA_ID` in `.env` or the host build environment. The analytics script only loads when this value is set.

## Google Search Console Setup

Add your site in Google Search Console as either a Domain property or a URL-prefix property. Verify ownership with a DNS TXT record or by placing the provided HTML verification file in `/public`. After the site is live, submit the sitemap.

## Indexation recovery audit

Run `npm run build` followed by `npm run check:indexation` for the permanent local gate. To refresh repository evidence and perform a production readback, run `node scripts/check-indexation-recovery.mjs --write --live`; the live result documents HTTP and discovery state but is not proof of Google indexing.

## Sitemap Submission

The sitemap is generated automatically by `@astrojs/sitemap` at `/sitemap-index.xml`. `robots.txt` references it. Submit `/sitemap-index.xml` in Google Search Console after deployment.

## AdSense Review Checklist

- Set `PUBLIC_ADSENSE_CLIENT` only when your publisher ID is ready.
- Add `ads.txt` to `/public`.
- Keep about, privacy, terms, contact, and disclaimer pages published.
- Replace all legal placeholders with real site details.
- Publish original, useful content beyond thin placeholder pages.
- Confirm navigation works on desktop and mobile.
- Confirm the privacy policy discloses cookies, analytics, and advertising.
- Ad placeholders render inert until AdSense is configured.

## License Audit Workflow

See `license-audit.md`. Before shipping each of the 5 sites, run `npm ls --all` and a license audit tool, then record the result and any exceptions.

## i18n

Content routes are locale-prefixed: `/en/...` for English and `/zh/...` for Traditional Chinese. The substantive root page `/` is the canonical English and x-default homepage; `/en/` is kept only as a compatibility URL and canonicalizes to `/`. Internal links should use `localizedPath(locale, '/route')`.

To add a language, add the locale to `LOCALES` and the locale maps in `src/consts.ts`, add UI strings in `src/i18n/ui.ts`, then create matching `src/pages/<locale>/` pages.

### SEO rebuild P1 (2026-10-15): Traditional Chinese (Taiwan) only

This supersedes the expansion policy below. The site is rebuilt as 台灣人的金錢決策計算機:

- **Homepage.** `/` is the Traditional Chinese homepage (`lang="zh-TW"`, canonical `/`,
  `src/pages/index.astro` + `src/components/HomePageTw.astro` + `src/lib/homeTw.ts`).
  `/zh/` is only a `noindex` redirect stub (meta refresh + canonical `/`) and is not in the sitemap.
  The root locale is `HOME_LOCALE` in `src/consts.ts`; `localizedPath('zh', '/')` returns `/`.
- **English.** `/en/**` is built for human visitors (language switcher) but is `noindex`, out of the
  sitemap and out of hreflang (`en` is in `locales` of `src/data/deindexed-urls.json`).
- **Retired locales.** `es`, `fr`, `de`, `hi` and `ar` have no routes: `LOCALES`, `CORE_LOCALES` and
  `CONTENT_LOCALES` in `src/consts.ts` list only `en` and `zh`, the content collections load only
  `{en,zh}/**`, and the es/fr/de-only pages were deleted. P1b then deleted their content files,
  registry entries, schema files and OG images (see below). Do not add routes for them.
- **Author.** Every zh calculator and article page carries a byline (`AuthorByline.astro`) naming
  Benson Lai, linked to `/zh/about/`, with the page's last-verified date and a visible
  not-financial-advice notice. JSON-LD `author` is a `Person` (name and url only -- no credential, no
  job title); `publisher` stays the Organization. Never add a qualification that the owner has not supplied.
- **Structured data.** No `FAQPage` or `HowTo` anywhere (Google retired the FAQ rich result on
  2026-06-15). The visible FAQ content stays. Calculator schema is `WebApplication`.
- **No scheduled releases.** `deploy-worthcalc.yml` has no `schedule`; money briefs dated after
  2026-10-15 are `draft: true` and only a human flips them.
- **Disposition audit.** `docs/audits/worthcalc-rebuild-p1-disposition-2026-10-15.csv` proposes
  keep / rewrite / merge_into / remove for every page that was in the sitemap. Nothing was deleted in P1;
  P1b executed the approved rows. The homepage may only link to `keep` rows.
- **Gate.** `npm run check:rebuild-p1` (part of `npm run verify`) pins all of the above against `dist/`.

### SEO rebuild P1b (2026-10-15): the approved disposition, executed

The CEO approved the P1 audit; P1b carried it out (sitemap 143 -> 89 URLs, `maxUrls` 425 -> 160):

- **`remove` (35 pages)** are deleted outright: source, data and registry entries are gone, `dist/`
  has no page there and the URL is a 404. Their English mirrors went with them.
- **`merge_into` (19 pages)** are redirect stubs (`src/components/RedirectStub.astro`, listed in
  `src/data/redirect-stubs.json`, generated by `src/pages/[locale]/[...stub].astro`): `noindex,follow`,
  canonical and meta refresh to the page that took over, no ad loader / hreflang / structured data, not in
  the sitemap. Where the target lacked something useful from the merged page, the key points were moved
  into the target (no page was added). The six topic hubs (`/<locale>/topics/*`) are stubs to the homepage.
  **No internal link may point at a stub** -- link to the target.
- **Retired locales** (`es`, `fr`, `de`, `hi`, `ar`): content directories, schema files, OG images and
  registry entries are deleted.
- **`<html lang>`** is `zh-TW` on every zh page including the homepage.
- **Gate.** `npm run check:rebuild-p1b` (part of `npm run verify`) pins all of the above.

### i18n expansion policy (2026-07-25, SEO audit)

`es`/`fr`/`de` already cover 195 of the site's 333 sitemap URLs (59%) but had **zero
GSC impressions** in the 28 days to 2026-07-21, and spot-checked URLs (e.g.
`/es/tools/costco-membership/`) come back "Google 無法辨識的網址" (URL unknown to
Google) on URL Inspection — meaning Google has not crawled them yet, not that the
content is thin (the `check-multilingual-editorial.mjs` native-market-marker gate
already enforces real localized content, not machine-translated filler).

**Do not add new `es`/`fr`/`de` routes** (new `growth-tools`/`growth-articles`
locale entries, new `[locale]/tools/[tool].astro` released-tool slugs, or new
`[locale]/*` editorial pages) until GSC shows the existing 195 URLs picking up
impressions, or until a CEO/web-department decision explicitly re-opens this line.
The daily `content-library/` pipeline already only ships `en`/`zh` pairs (see
`content-library/README.md`) — keep it that way. `en` and `zh` remain fully open
for new tools and articles; this pause is `es`/`fr`/`de` only, and it does not
apply to fixing bugs, hreflang, or internal links on the pages that already exist.

## Information architecture (2026-09-05)

Before this, the site had no layer between a 1,207-URL sitemap and a single
calculator page. The homepage carried the whole catalogue — 15 `<h2>` sections
and 304 internal links on English, including `guideIndex[locale]` rendered in
full, because that index was the only inbound link 131 editorial pages had.

Four layers now:

| Layer | Route | What it holds |
|-------|-------|---------------|
| Homepage | `/`, `/{locale}/` | Hero, what the site is for, the four decision clusters, ten calculators, links to both directories, six guides, method and limits, FAQ. Nine sections; nothing exhaustive. |
| Topic hub | `/{locale}/topics/{topic}/` | One decision area: its calculators, up to twelve of its guides, how to read the pages. **`en` and `zh` only** — see the i18n freeze above. `es`/`fr`/`de` get the same grouping as headed, anchored sections of their own directories. |
| Directory | `/{locale}/tools/`, `/{locale}/guides/` | The complete catalogue, grouped by topic. All five core locales. This is where the 131 formerly homepage-only pages get their inbound link. |
| Leaf | calculator and guide pages | Every one ends with a topic strip (`TopicLinks.astro`) linking its hub, both directories, and any page sharing its slug at another URL prefix. |

Six topics, defined in `src/lib/topics.ts`: `housing`, `debt-credit`,
`transportation`, `everyday`, `memberships`, `income-savings`. The first, second,
third and fourth are `PRIMARY_TOPIC_IDS`, the clusters the homepage leads with.
Pages are assigned by `classifyTopic()` — ordered rules over hyphen-separated
slug tokens, plus an explicit override table for the slugs that mislead the
rules. Adding a page needs no registration; adding a page whose slug does not
match any rule lands it in `everyday`, so check the directory after publishing
something unusual.

**Never hard-code a catalogue count.** `/en/about/` once said "we currently
publish eight calculators" while the site served eighteen, and the Spanish,
French and German About pages each claimed eight calculators and 29 guides.
`src/lib/catalog.ts` counts the real catalogue at build time; use
`getLibraryCounts(locale)` when a page needs a number, or write the sentence
without one.

## Project Structure

```text
src/
  components/       Shared UI, SEO, ads, export controls
  i18n/             Locale utilities and UI strings
  layouts/          Base, article, and tool layouts
  lib/              SEO helpers, topic model, catalogue counts, browser storage
  pages/            Static routes, tools, directories, topic hubs, robots.txt
  styles/           Global styles
public/             Static assets such as og-default.png and ads.txt
dist/               Build output
```

