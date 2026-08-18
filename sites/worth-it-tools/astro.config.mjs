// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { createSitemapLastmodResolver } from './scripts/sitemap-lastmod.mjs';
import deindexedRegistry from './src/data/deindexed-urls.json' with { type: 'json' };

// The canonical production URL. Override per-site via the SITE_URL env var.
// MUST be an absolute origin (no trailing path) for sitemap + canonical URLs.
const SITE_URL = process.env.SITE_URL || 'https://worthcalc.win';
const resolveSitemapLastmod = createSitemapLastmodResolver();
const deindexedPaths = new Set(deindexedRegistry.urls.map((url) => new URL(url).pathname));

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  // Complete five-language routing. Every released core route has a native
  // EN, Traditional Chinese, Spanish, French, and German equivalent.
  i18n: {
    locales: ['en', 'zh', 'es', 'fr', 'de'],
    defaultLocale: 'en',
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
  integrations: [
    sitemap({
      // /en/ remains available for old links, but / is the canonical English
      // homepage. Hreflang is emitted in each page head by src/lib/seo.ts.
      filter: (page) => page !== `${SITE_URL}/en/` && !deindexedPaths.has(new URL(page).pathname),
      serialize: (item) => ({
        ...item,
        lastmod: resolveSitemapLastmod(item.url).lastmod,
      }),
    }),
  ],
});
