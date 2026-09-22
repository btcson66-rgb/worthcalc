import deindexedRegistry from '../src/data/deindexed-urls.json' with { type: 'json' };

export const softDeindexedUrls = new Set(deindexedRegistry.urls);

/**
 * Locales retired wholesale, as opposed to the per-URL list above.
 *
 * es/fr/de were retired on 2026-09-22: 141 impressions between them against
 * 953 for en and zh, and nobody maintaining their financial localisation, so
 * their figures go stale unnoticed. Expanding that into 141 url entries would
 * record one decision as 141 findings and bury the reasoning; `localeDecision`
 * in the registry carries the evidence and the rollback.
 */
export const softDeindexedLocales = new Set(deindexedRegistry.locales ?? []);

// Mirrors LOCALE_HREFLANG in src/consts.ts. These scripts run under plain node
// with no TypeScript loader, so the table cannot be imported from there.
const LOCALE_HREFLANG = { en: 'en', zh: 'zh-TW', es: 'es', fr: 'fr', de: 'de', hi: 'hi', ar: 'ar' };

export function isSoftDeindexedUrl(url) {
  const parsed = new URL(url);
  if (softDeindexedUrls.has(parsed.href)) return true;
  const locale = parsed.pathname.split('/').filter(Boolean)[0];
  return locale !== undefined && softDeindexedLocales.has(locale);
}

export function expectedHreflangsFor(url, candidates) {
  const current = new URL(url);
  const segments = current.pathname.split('/').filter(Boolean);
  const currentLocale = segments[0];
  if (Object.hasOwn(LOCALE_HREFLANG, currentLocale)) segments.shift();
  const logical = segments.join('/');
  if (isSoftDeindexedUrl(url)) return [];
  const localeByHreflang = Object.fromEntries(
    Object.entries(LOCALE_HREFLANG).map(([locale, hreflang]) => [hreflang, locale]),
  );
  return candidates.filter((hreflang) => {
    const siblingLocale = localeByHreflang[hreflang];
    if (!siblingLocale) return true;
    const siblingPath = !logical && siblingLocale === 'en'
      ? '/'
      : `/${siblingLocale}/${logical ? `${logical}/` : ''}`;
    return !isSoftDeindexedUrl(new URL(siblingPath, current.origin).href);
  });
}
