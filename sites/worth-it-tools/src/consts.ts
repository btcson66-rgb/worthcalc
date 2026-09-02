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
  zh: 'zh-Hant',
  es: 'es',
  fr: 'fr',
  de: 'de',
  hi: 'hi',
  ar: 'ar',
};

export const GA_ID = import.meta.env.PUBLIC_GA_ID ?? '';
export const ADSENSE_CLIENT = import.meta.env.PUBLIC_ADSENSE_CLIENT ?? '';
/** Google Search Console HTML-tag verification token (the `content` value). Empty = no meta tag. */
export const GSC_VERIFICATION = import.meta.env.PUBLIC_GSC_VERIFICATION ?? '';
