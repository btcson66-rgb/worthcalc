// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The canonical production URL. Override per-site via the SITE_URL env var.
// MUST be an absolute origin (no trailing path) for sitemap + canonical URLs.
const SITE_URL = process.env.SITE_URL || 'https://worthcalc.win';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  // Bilingual routing. Both locales are prefixed (/en/, /zh/) for clean
  // hreflang + sitemap. The root "/" is the x-default homepage.
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
      // Don't let Astro auto-generate a root redirect. We serve our own
      // src/pages/index.astro so crawlers and GA/GSC checks see the real page.
      redirectToDefaultLocale: false,
    },
  },
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
    // Inline all stylesheets: removes the render-blocking CSS request
    // (Lighthouse mobile flagged /_astro/*.css as render-blocking).
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          zh: 'zh',
        },
      },
    }),
  ],
});
