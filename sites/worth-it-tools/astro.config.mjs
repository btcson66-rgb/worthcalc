// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The canonical production URL. Override per-site via the SITE_URL env var.
// MUST be an absolute origin (no trailing path) for sitemap + canonical URLs.
const SITE_URL = process.env.SITE_URL || 'https://example.com';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  // Bilingual routing. Both locales are prefixed (/en/, /zh/) for clean
  // hreflang + sitemap. The root "/" redirects to the default locale.
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
      // Don't let Astro auto-generate the "/" → "/en/" redirect stub (it is
      // noindex and carries no GA tag). We serve our own src/pages/index.astro
      // instead, which includes the GA tag so GA4/GSC detection works on the
      // root URL that Google actually crawls.
      redirectToDefaultLocale: false,
    },
  },
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
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
