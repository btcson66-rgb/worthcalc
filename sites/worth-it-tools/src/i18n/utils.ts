import { CONTENT_LOCALES, CORE_LOCALES, DEFAULT_LOCALE, type ContentLocale } from '../consts';
import { ui, type UIKey } from './ui';

/** Extract the active locale from a URL pathname (/en/..., /zh/...). */
export function getLocaleFromUrl(url: URL): ContentLocale {
  const [, maybeLocale] = url.pathname.split('/');
  if ((CONTENT_LOCALES as string[]).includes(maybeLocale)) {
    return maybeLocale as ContentLocale;
  }
  return DEFAULT_LOCALE;
}

/** Return a translator bound to a locale, with fallback to the default locale. */
export function useTranslations(locale: ContentLocale) {
  return function t(key: UIKey): string {
    const active = ui[locale] as Record<string, string>;
    const fallback = ui[DEFAULT_LOCALE] as Record<string, string>;
    return active[key] ?? fallback[key] ?? key;
  };
}

/**
 * Build a locale-prefixed, absolute (site-relative) path.
 * `localizedPath('zh', '/tools/word-counter')` -> '/zh/tools/word-counter/'
 * `localizedPath('en', '/')` -> '/'
 *
 * The trailing slash is mandatory: the site is built with
 * `build.format: 'directory'`, so the host 301-redirects every slashless
 * variant. Emitting the slashless form made ~30% of Googlebot's requests
 * redirect hops, which is crawl budget we cannot spare. Canonical and
 * hreflang (src/lib/seo.ts) have always used the trailing-slash form, so
 * this also stops internal links from disagreeing with them.
 */
export function localizedPath(locale: ContentLocale, path = '/'): string {
  const clean = `/${path}`.replace(/\/{2,}/g, '/').replace(/\/$/, '');
  if (clean === '') return locale === DEFAULT_LOCALE ? '/' : `/${locale}/`;
  return `/${locale}${clean}/`;
}

/**
 * Link to a route in the complete five-language site shell. Keeping this
 * helper central makes any future staged locale release explicit.
 */
export function localizedCorePath(locale: ContentLocale, path = '/'): string {
  const coreLocale = (CORE_LOCALES as readonly string[]).includes(locale) ? locale : DEFAULT_LOCALE;
  return localizedPath(coreLocale, path);
}

/**
 * Given the current URL, return the equivalent path in another locale —
 * used by the language switcher to keep the user on the same page.
 */
export function switchLocalePath(url: URL, target: ContentLocale): string {
  const segments = url.pathname.split('/').filter(Boolean);
  if ((CONTENT_LOCALES as string[]).includes(segments[0])) {
    segments.shift();
  }
  if (segments.length === 0) return target === DEFAULT_LOCALE ? '/' : `/${target}/`;
  return `/${[target, ...segments].join('/')}/`;
}

/** Strip the locale prefix to get the logical route, e.g. '/zh/about' -> '/about'. */
export function routeWithoutLocale(url: URL): string {
  const segments = url.pathname.split('/').filter(Boolean);
  if ((CONTENT_LOCALES as string[]).includes(segments[0])) {
    segments.shift();
  }
  return `/${segments.join('/')}`;
}
