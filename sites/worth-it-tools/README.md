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

Routes are locale-prefixed: `/en` for English and `/zh` for Traditional Chinese. Internal links should use `localizedPath(locale, '/route')`.

To add a language, add the locale to `LOCALES` and the locale maps in `src/consts.ts`, add UI strings in `src/i18n/ui.ts`, then create matching `src/pages/<locale>/` pages.

## Project Structure

```text
src/
  components/       Shared UI, SEO, ads, export controls
  i18n/             Locale utilities and UI strings
  layouts/          Base, article, and tool layouts
  lib/              SEO and browser storage helpers
  pages/            Static routes, tools, robots.txt
  styles/           Global styles
public/             Static assets such as og-default.png and ads.txt
dist/               Build output
```

