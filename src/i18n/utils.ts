import { DEFAULT_LOCALE, LOCALES, type Locale } from '../consts';
import { ui, type UIKey } from './ui';

/** Extract the active locale from a URL pathname (/en/..., /zh/...). */
export function getLocaleFromUrl(url: URL): Locale {
  const [, maybeLocale] = url.pathname.split('/');
  if ((LOCALES as string[]).includes(maybeLocale)) {
    return maybeLocale as Locale;
  }
  return DEFAULT_LOCALE;
}

/** Return a translator bound to a locale, with fallback to the default locale. */
export function useTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    return ui[locale][key] ?? ui[DEFAULT_LOCALE][key] ?? key;
  };
}

/**
 * Build a locale-prefixed, absolute (site-relative) path.
 * `localizedPath('zh', '/tools/word-counter')` -> '/zh/tools/word-counter'
 * `localizedPath('en', '/')` -> '/en'
 */
export function localizedPath(locale: Locale, path = '/'): string {
  const clean = `/${path}`.replace(/\/{2,}/g, '/').replace(/\/$/, '');
  return clean === '' ? `/${locale}` : `/${locale}${clean}`;
}

/**
 * Given the current URL, return the equivalent path in another locale —
 * used by the language switcher to keep the user on the same page.
 */
export function switchLocalePath(url: URL, target: Locale): string {
  const segments = url.pathname.split('/').filter(Boolean);
  if ((LOCALES as string[]).includes(segments[0])) {
    segments[0] = target;
  } else {
    segments.unshift(target);
  }
  return `/${segments.join('/')}`;
}

/** Strip the locale prefix to get the logical route, e.g. '/zh/about' -> '/about'. */
export function routeWithoutLocale(url: URL): string {
  const segments = url.pathname.split('/').filter(Boolean);
  if ((LOCALES as string[]).includes(segments[0])) {
    segments.shift();
  }
  return `/${segments.join('/')}`;
}
