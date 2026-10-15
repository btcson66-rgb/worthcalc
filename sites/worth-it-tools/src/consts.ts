/**
 * Per-site constants. When cloning this starter into one of the 5 sites,
 * this is the primary file to edit (plus the .env file).
 */

export const SITE = {
  /** Internal default; the production origin comes from `Astro.site` (SITE_URL). */
  url: 'https://worthcalc.win',
  /** Brand name, appended to page titles. */
  name: 'WorthCalc',
  /** Twitter / X handle for Open Graph (optional, include the @). */
  twitter: '',
  /** Default social share image, served from /public. */
  defaultOgImage: '/og-default.png',
  /**
   * Logo for schema.org Organization. SVG is a format Google accepts for the
   * logo property, and the mark is already vector, so there is no raster copy
   * to keep in sync with it.
   */
  logo: '/favicon.svg',
} as const;

export type Locale = 'en' | 'zh' | 'es' | 'fr' | 'de';
export type ContentLocale = Locale | 'hi' | 'ar';
export type CoreLocale = Locale;

/*
 * SEO rebuild P1 (2026-10-15): the site is a Traditional Chinese (Taiwan) money
 * calculator. Only two locales still have routes:
 *
 *   zh  the indexed site. Its homepage is `/` (HOME_LOCALE); /zh/ is a redirect stub.
 *   en  kept for human visitors behind the language switcher, but noindex and
 *       out of the sitemap and out of hreflang (see src/data/deindexed-urls.json).
 *
 * es, fr, de, hi and ar are retired: no route is built for them. Their source
 * files are still in the repository, dormant, until P1b decides what to delete;
 * the `Locale` / `ContentLocale` types keep naming them so that dormant data
 * files still type-check. Every list below is what is BUILT, not what is typed.
 */

/** Locales that still have built routes. */
export const LOCALES: Locale[] = ['en', 'zh'];
/** Locales the editorial content programme still publishes into. */
export const CONTENT_LOCALES: ContentLocale[] = ['en', 'zh'];
/** Locales with a complete homepage, legal pages, and calculator catalogue. */
export const CORE_LOCALES: CoreLocale[] = ['en', 'zh'];
export const DEFAULT_LOCALE: Locale = 'en';
/**
 * The locale served at the site root `/`. Its homepage is `/`, every other
 * locale's homepage is `/<locale>/`. This is deliberately separate from
 * DEFAULT_LOCALE, which only decides the translation fallback.
 */
export const HOME_LOCALE: Locale = 'zh';

/** Human-readable language names for the language switcher. */
export const LOCALE_LABELS: Record<ContentLocale, string> = {
  en: 'English',
  zh: '中文',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  hi: 'हिन्दी',
  ar: 'العربية',
};

/** BCP-47 codes for the <html lang> attribute and hreflang. */
export const LOCALE_HREFLANG: Record<ContentLocale, string> = {
  en: 'en',
  // Region, not just script. This locale's money content is bound to Taiwanese
  // rules and institutions -- 央行 selective credit controls, DBR, the 好市多
  // Taiwan fee schedule -- so the region is the part a searcher in Taiwan is
  // matched on. A script-only tag would claim Hong Kong and Macau just as
  // strongly, and none of those figures apply there.
  zh: 'zh-TW',
  es: 'es',
  fr: 'fr',
  de: 'de',
  hi: 'hi',
  ar: 'ar',
};

/**
 * Writing direction for the <html dir> attribute.
 *
 * Arabic shipped 155 pages with no dir at all, so the browser applied bidi to
 * the Arabic runs but laid the document out left-to-right: the breadcrumb sat
 * on the wrong side, sentence-final punctuation landed at the wrong end of the
 * line, and Latin tokens inside Arabic headings (CADR, kWh) collided with the
 * text around them. `lang` alone does not set direction — this does.
 */
export const LOCALE_DIR: Record<ContentLocale, 'ltr' | 'rtl'> = {
  en: 'ltr',
  zh: 'ltr',
  es: 'ltr',
  fr: 'ltr',
  de: 'ltr',
  hi: 'ltr',
  ar: 'rtl',
};

export const GA_ID = import.meta.env.PUBLIC_GA_ID ?? '';
export const ADSENSE_CLIENT = import.meta.env.PUBLIC_ADSENSE_CLIENT ?? '';
/** Google Search Console HTML-tag verification token (the `content` value). Empty = no meta tag. */
export const GSC_VERIFICATION = import.meta.env.PUBLIC_GSC_VERIFICATION ?? '';
