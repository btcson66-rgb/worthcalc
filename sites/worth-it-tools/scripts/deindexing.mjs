import deindexedRegistry from '../src/data/deindexed-urls.json' with { type: 'json' };

export const softDeindexedUrls = new Set(deindexedRegistry.urls);

export function isSoftDeindexedUrl(url) {
  return softDeindexedUrls.has(new URL(url).href);
}

export function expectedHreflangsFor(url, candidates) {
  const current = new URL(url);
  const segments = current.pathname.split('/').filter(Boolean);
  const currentLocale = segments[0];
  if (['en', 'zh', 'es', 'fr', 'de'].includes(currentLocale)) segments.shift();
  if (currentLocale === 'de') return [...candidates];

  const logical = segments.join('/');
  const germanUrl = new URL(`/de/${logical ? `${logical}/` : ''}`, current.origin).href;
  return isSoftDeindexedUrl(germanUrl)
    ? candidates.filter((hreflang) => hreflang !== 'de')
    : [...candidates];
}
