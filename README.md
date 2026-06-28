# Multi-Site Static SEO Tool System

## Overview

This repo helps you manage many independent static SEO tool websites from one place. Each site can have its own name, domain, tools, content, analytics, and deployment settings while still starting from the same reusable template.

Each generated site is built for browser-based tools. There is no backend, no database, and no AI API requirement. The finished site is static HTML, CSS, and JavaScript, so it is free or low-cost to host on services like Cloudflare Pages, Vercel, GitHub Pages, or any static host.

## Architecture

```text
root/
  starter-template/  reusable Astro starter copied when creating a new site
  sites/             independent generated websites
  shared/            reusable code ideas and shared utilities
  scripts/           root management scripts
  docs/              setup guides, policies, and checklists
```

`starter-template/` is the source template for new sites. Edit it when you want future sites to start with improved layouts, scripts, or content patterns.

`sites/` contains your real websites. Each subfolder is a separate static site with its own package.json and build output.

`shared/` stores reusable utilities and examples that can be copied into a site when needed.

`scripts/` contains root-level management tools for creating, auditing, checking, and comparing sites.

`docs/` contains practical guides for SEO content, analytics, AdSense readiness, licensing, and launches.

## Requirements

- Node.js 18 or newer
- npm

No other tools are required.

## Quick Start

1. Clone or download this repo.
2. Create your first site:

```bash
npm run create-site -- --slug my-first-site --name "My First Site"
```

3. Start local development:

```bash
cd sites/my-first-site
npm install
npm run dev
```

4. Open http://localhost:4321 in your browser.

## Creating a New Site

Use the root create script:

```bash
npm run create-site -- --slug my-first-site --name "My First Site"
```

`--slug` is the folder name and package name. Use lowercase letters, numbers, and hyphens.

`--name` is the human-readable site name shown in docs and generated config.

The command creates `sites/my-first-site/` by copying `starter-template/`. It also creates or updates starter files such as `site.config.ts`, `.env.example`, `package.json`, `README.md`, `launch-checklist.md`, and `license-audit.md` inside the new site.

After creating a site, edit:

- `site.config.ts` for the site name, description, URL, language settings, navigation, and tool metadata.
- `.env` for production values such as `SITE_URL`, `PUBLIC_GA_ID`, and `PUBLIC_ADSENSE_CLIENT`.

To add tools, create new Astro pages under `src/pages/en/tools/` and `src/pages/zh/tools/`, then add the page to the site navigation, related links, and sitemap metadata if your site config requires it.

## Site Development

### Add a New Tool Page

Create a `.astro` file in:

```text
src/pages/en/tools/
src/pages/zh/tools/
```

Use `ToolLayout` for tool pages. A complete tool page should include a clear title, description, tool controls, FAQ content, related links, and enough explanatory text for search visitors.

### Add a New Landing Page

Create a `.astro` file in:

```text
src/pages/en/
src/pages/zh/
```

Use `ArticleLayout` for article-style landing pages. Follow `docs/seo-content-standard.md` and include sections like what the tool does, how to use it, examples, use cases, FAQ, privacy notes, and related links.

### Edit Legal Pages

Legal and trust pages live under each locale folder, for example:

```text
src/pages/en/privacy.astro
src/pages/en/terms.astro
src/pages/en/contact.astro
src/pages/en/disclaimer.astro
src/pages/zh/privacy.astro
src/pages/zh/terms.astro
src/pages/zh/contact.astro
src/pages/zh/disclaimer.astro
```

Update these pages for each real site before launch.

## Building & Deploying

Inside a site folder, run:

```bash
npm run build
```

This produces a static `dist/` folder. Deploy the contents of `dist/` to a static host.

Recommended hosting options:

- Cloudflare Pages, recommended and free: connect your GitHub repo, set the build command to `npm run build`, and set the output directory to `dist`.
- Vercel: connect the repo, use the same build command, and set the output directory to `dist`.
- GitHub Pages: use GitHub Actions to build the site and publish `dist/`.
- Any static host: upload the generated `dist/` folder.

Set `SITE_URL` at build time so sitemap and canonical URLs use the production domain.

## GA4 & Search Console

Use GA4 to measure traffic and Google Search Console to verify indexing, submit sitemaps, and review search performance.

See `docs/ga4-gsc-setup.md` for the full guide.

## AdSense

AdSense readiness depends on useful content, working navigation, legal pages, a stable domain, and ad placements that do not block the tools.

See `docs/adsense-checklist.md` for requirements.

## Checking All Sites

Run this from the repo root:

```bash
npm run check-all-sites
```

The script checks every site in `sites/`. It installs dependencies when `node_modules/` is missing, runs build, runs audit after a successful build, counts generated pages and tool pages, and checks for sitemap, GA4, and AdSense markers.

Example output:

```text
Site          | Build | Audit | Pages | Tools | Sitemap | GA4  | AdSense
--------------|-------|-------|-------|-------|---------|------|--------
my-first-site | PASS  | PASS  | 18    | 2     | PASS    | PASS | PASS
```

## Auditing a Single Site

Run this from the repo root:

```bash
npm run audit-site -- --slug my-site
```

This delegates to the selected site's `npm run audit` script.

## Updating Sites from Starter

Run this from the repo root:

```bash
npm run update-starter
```

This is a report-only script. It compares selected files in `starter-template/` with each site in `sites/` and reports files that are missing or diverged.

It does not overwrite anything. To sync a file, copy it from `starter-template/` to `sites/<slug>/` after reviewing the difference.

## License Policy

Keep every dependency, copied asset, icon, snippet, and third-party file compatible with your site license and hosting plan. Track decisions before publishing a site.

See `docs/license-policy.md`.

## Project Structure

```text
root/
  README.md
  package.json
  starter-template/
    package.json
    site.config.example.ts
    src/
      components/
      layouts/
      lib/
      i18n/
      pages/
        en/
          tools/
        zh/
          tools/
      styles/
    scripts/
      audit.mjs
      check-links.mjs
    public/
    docs/
    license-audit.md
  sites/
    site-name/
      package.json
      site.config.ts
      .env.example
      src/
        components/
        layouts/
        lib/
        i18n/
        pages/
          en/
            tools/
          zh/
            tools/
        styles/
      scripts/
      public/
      dist/
      launch-checklist.md
      license-audit.md
  shared/
    ads/
    analytics/
    export/
    seo/
    storage/
    ui/
  scripts/
    create-site.mjs
    audit-site.mjs
    check-all-sites.mjs
    update-starter.mjs
  docs/
    adsense-checklist.md
    ga4-gsc-setup.md
    license-policy.md
    seo-content-standard.md
    site-launch-checklist.md
```

## Scripts Reference

### Root Scripts

| Script | Command | Purpose |
| --- | --- | --- |
| create-site | `npm run create-site -- --slug my-site --name "My Site"` | Creates a new site from `starter-template/`. |
| audit-site | `npm run audit-site -- --slug my-site` | Runs the selected site's audit script. |
| check-all-sites | `npm run check-all-sites` | Builds and audits every site, then prints a summary table. |
| update-starter | `npm run update-starter` | Reports template files that are missing or diverged in each site. |

### Per-Site Scripts

Run these inside a site folder such as `sites/my-site/`.

| Script | Command | Purpose |
| --- | --- | --- |
| dev | `npm run dev` | Starts the local development server. |
| build | `npm run build` | Builds the static production site into `dist/`. |
| preview | `npm run preview` | Previews the built site locally. |
| audit | `npm run audit` | Runs the site's SEO and AdSense readiness audit. |
| lint | `npm run lint` | Checks code style and common issues. |
| typecheck | `npm run typecheck` | Checks TypeScript and Astro types. |
| check:links | `npm run check:links` | Checks internal links in the generated site. |
| verify | `npm run verify` | Runs the site's combined verification workflow, when configured. |
