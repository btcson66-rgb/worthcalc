import deindexedRegistry from '../src/data/deindexed-urls.json' with { type: 'json' };

export const softDeindexedUrls = new Set(deindexedRegistry.urls);
const LOCALE_HREFLANG = { en: 'en', zh: 'zh-Hant', es: 'es', fr: 'fr', de: 'de', hi: 'hi', ar: 'ar' };

export function isSoftDeindexedUrl(url) {
  return softDeindexedUrls.has(new URL(url).href);
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
