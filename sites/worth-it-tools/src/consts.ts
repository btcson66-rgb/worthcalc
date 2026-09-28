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

/** Every locale with at least one completed, indexable route. */
export const LOCALES: Locale[] = ['en', 'zh', 'es', 'fr', 'de'];
/** Locales currently supported by the staged editorial content programme. */
export const CONTENT_LOCALES: ContentLocale[] = ['en', 'zh', 'es', 'fr', 'de', 'hi', 'ar'];
/** Locales with a complete homepage, legal pages, and calculator catalogue. */
export const CORE_LOCALES: CoreLocale[] = ['en', 'zh', 'es', 'fr', 'de'];
export const DEFAULT_LOCALE: Locale = 'en';

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
export const AFFILIATE_GA_ID = import.meta.env.PUBLIC_AFFILIATE_GA_ID?.trim() || 'G-Q78WN8NZ0R';
export const ADSENSE_CLIENT = import.meta.env.PUBLIC_ADSENSE_CLIENT ?? '';
/** Google Search Console HTML-tag verification token (the `content` value). Empty = no meta tag. */
export const GSC_VERIFICATION = import.meta.env.PUBLIC_GSC_VERIFICATION ?? '';
