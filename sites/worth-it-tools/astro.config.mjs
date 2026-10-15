// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import { createSitemapLastmodResolver } from './scripts/sitemap-lastmod.mjs';
import deindexedRegistry from './src/data/deindexed-urls.json' with { type: 'json' };

// The canonical production URL. Override per-site via the SITE_URL env var.
// MUST be an absolute origin (no trailing path) for sitemap + canonical URLs.
const SITE_URL = process.env.SITE_URL || 'https://worthcalc.win';
const resolveSitemapLastmod = createSitemapLastmodResolver();
const deindexedPaths = new Set(deindexedRegistry.urls.map((url) => new URL(url).pathname));
// Locales retired wholesale; see localeDecision in the registry for the evidence.
const deindexedLocales = new Set(deindexedRegistry.locales ?? []);
const isDeindexed = (pathname) =>
  deindexedPaths.has(pathname) || deindexedLocales.has(pathname.split('/').filter(Boolean)[0]);

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  // 2026-10-15 rebuild: Traditional Chinese (Taiwan) is the site; its homepage
  // is `/`. English is built but noindex. es/fr/de/hi/ar are retired and have
  // no routes (see src/consts.ts).
  i18n: {
    locales: ['zh', 'en'],
    defaultLocale: 'zh',
    routing: {
      prefixDefaultLocale: true,
      // Don't let Astro auto-generate a root redirect. We serve our own
      // src/pages/index.astro so crawlers and GA/GSC checks see the real page.
      redirectToDefaultLocale: false,
    },
  },
  // 'always' matches how the site is actually served: build.format is
  // 'directory', so the host 301-redirects /en/about -> /en/about/. Declaring
  // it here keeps dev, canonical, hreflang and internal links on one form
  // instead of letting slashless links generate a redirect hop per crawl.
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // Inline all stylesheets: removes the render-blocking CSS request
    // (Lighthouse mobile flagged /_astro/*.css as render-blocking).
    inlineStylesheets: 'always',
  },
  markdown: {
    remarkPlugins: [remarkMath],
  },
  integrations: [
    sitemap({
      // / is the canonical homepage (Traditional Chinese). /zh/ is only a
      // redirect stub pointing at it, so it never belongs in the sitemap; /en/
      // and everything under it is noindex through the deindexed registry.
      // Hreflang is emitted in each page head by src/lib/seo.ts.
      filter: (page) => page !== `${SITE_URL}/zh/` && !isDeindexed(new URL(page).pathname),
      serialize: (item) => ({
        ...item,
        lastmod: resolveSitemapLastmod(item.url).lastmod,
      }),
    }),
  ],
});
