/**
 * Per-site constants. When cloning this starter into one of the 5 sites,
 * this is the primary file to edit (plus the .env file).
 */

export const SITE = {
  /** Internal default; the production origin comes from `Astro.site` (SITE_URL). */
  url: 'https://example.com',
  /** Brand name, appended to page titles. */
  name: 'SEO Tool Starter',
  /** Twitter / X handle for Open Graph (optional, include the @). */
  twitter: '',
  /** Default social share image, served from /public. */
  defaultOgImage: '/og-default.png',
} as const;

export type Locale = 'en' | 'zh';

export const LOCALES: Locale[] = ['en', 'zh'];
export const DEFAULT_LOCALE: Locale = 'en';

/** Human-readable language names for the language switcher. */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
};

/** BCP-47 codes for the <html lang> attribute and hreflang. */
export const LOCALE_HREFLANG: Record<Locale, string> = {
  en: 'en',
  zh: 'zh-Hant',
};

export const GA_ID = import.meta.env.PUBLIC_GA_ID ?? '';
export const ADSENSE_CLIENT = import.meta.env.PUBLIC_ADSENSE_CLIENT ?? '';
