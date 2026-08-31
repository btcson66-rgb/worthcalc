import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';
import { expectedHreflangsFor, isSoftDeindexedUrl } from './deindexing.mjs';

const dist = resolve('dist');
const locales = ['en', 'zh', 'es', 'fr', 'de'];
// en + zh are required for normal new routes. es/fr/de are frozen as of
// 2026-07-25 (see the "i18n expansion policy" section in README.md). Package 001
// is an approved editorial exception: its manifest intentionally contains a
// small set of single-language routes. What IS a defect is a *partially*
// localized frozen-language route or a page that declares hreflang for a version
// that does not exist.
const requiredLocales = ['en', 'zh'];
const approvedSingleLocaleRoutes = new Set([
  'loan-term-monthly-payment-vs-total-interest',
  'net-worth-vs-liquid-net-worth',
  'savings-rate-gross-vs-net',
  'emergency-fund-how-much',
  'emergency-fund-vs-debt-payoff',
  'emergency-fund-vs-sinking-fund',
  'how-to-calculate-net-worth',
  'how-to-calculate-savings-rate',
  'liquid-net-worth-explained',
  'loan-term-vs-total-interest',
  'simple-vs-compound-interest',
]);
const frozenLocales = ['es', 'fr', 'de'];
const expectedLang = { en: 'en', zh: 'zh-Hant', es: 'es', fr: 'fr', de: 'de' };
const hreflangFor = { en: 'en', zh: 'zh-Hant', es: 'es', fr: 'fr', de: 'de' };
const sitemapFile = join(dist, 'sitemap-0.xml');
const sitemap = existsSync(sitemapFile) ? readFileSync(sitemapFile, 'utf8') : '';
const routes = new Map();
const pages = [];
const failures = [];
let localizedPages = 0;

function walkHtml(dir) {
  const files = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) files.push(...walkHtml(full));
    else if (name === 'index.html') files.push(full);
  }
  return files;
}

// Pass 1: discover which locales actually exist for each logical route.
for (const locale of locales) {
  const localeDir = join(dist, locale);
  if (!existsSync(localeDir)) {
    failures.push(`Missing locale directory: ${locale}`);
    continue;
  }
  for (const file of walkHtml(localeDir)) {
    localizedPages += 1;
    const rel = relative(localeDir, file).split(sep).join('/');
    const route = rel === 'index.html' ? '' : rel.replace(/\/index\.html$/, '');
    const present = routes.get(route) ?? new Set();
    present.add(locale);
    routes.set(route, present);
    pages.push({ locale, route, file });
  }
}

// Pass 2: validate each page against the locales that genuinely exist for its route.
for (const { locale, route, file } of pages) {
  const html = readFileSync(file, 'utf8');
  const present = routes.get(route) ?? new Set([locale]);

  if (!html.includes(`lang="${expectedLang[locale]}"`)) failures.push(`/${locale}/${route}: wrong html lang`);
  if (!html.includes('rel="canonical"')) failures.push(`/${locale}/${route}: missing canonical`);

  const path = locale === 'en' && route === '' ? '' : `${locale}/${route}${route ? '/' : ''}`;
  const url = `https://worthcalc.win/${path}`;
  const expectedHreflangs = expectedHreflangsFor(
    url,
    locales.filter((sibling) => present.has(sibling)).map((sibling) => hreflangFor[sibling]),
  );

  // Every existing sibling version must be declared, plus x-default.
  for (const tag of expectedHreflangs) {
    if (!html.includes(`hreflang="${tag}"`)) failures.push(`/${locale}/${route}: missing hreflang=${tag}`);
  }
  if (!html.includes('hreflang="x-default"')) failures.push(`/${locale}/${route}: missing hreflang=x-default`);

  for (const sibling of locales.filter((candidate) => present.has(candidate))) {
    const tag = hreflangFor[sibling];
    if (!expectedHreflangs.includes(tag) && html.includes(`hreflang="${tag}"`)) {
      failures.push(`/${locale}/${route}: advertises soft-deindexed hreflang=${tag}`);
    }
  }

  // Declaring a version that does not exist is a real SEO bug: it points Google at a 404.
  for (const absent of locales.filter((l) => !present.has(l))) {
    const tag = hreflangFor[absent];
    if (html.includes(`hreflang="${tag}"`)) {
      failures.push(`/${locale}/${route}: declares hreflang=${tag} but /${absent}/${route} does not exist`);
    }
  }

  const inSitemap = sitemap.includes(`<loc>${url}</loc>`);
  if (isSoftDeindexedUrl(url)) {
    if (!html.includes('<meta name="robots" content="noindex,follow">')) failures.push(`${url}: missing noindex,follow`);
    if (inSitemap) failures.push(`Sitemap includes soft-deindexed ${url}`);
  } else if (!inSitemap) {
    failures.push(`Sitemap missing ${url}`);
  }
}

// Route-level coverage rules.
let enZhOnlyRoutes = 0;
for (const [route, present] of routes) {
  const missingRequired = approvedSingleLocaleRoutes.has(route)
    ? []
    : requiredLocales.filter((locale) => !present.has(locale));
  if (missingRequired.length) failures.push(`/${route}: missing required locales ${missingRequired.join(', ')}`);

  const frozenPresent = frozenLocales.filter((locale) => present.has(locale));
  if (frozenPresent.length === 0) {
    enZhOnlyRoutes += 1;
  } else if (frozenPresent.length < frozenLocales.length) {
    const missing = frozenLocales.filter((locale) => !present.has(locale));
    failures.push(`/${route}: partially localized - has ${frozenPresent.join(', ')} but missing ${missing.join(', ')}`);
  }
}

if (failures.length) {
  console.error(`All-localized-routes check failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  `All localized routes check passed: ${routes.size} logical routes, ${localizedPages} localized pages; ` +
    `${routes.size - enZhOnlyRoutes} fully five-language, ${enZhOnlyRoutes} en+zh only (i18n freeze, see README). ` +
    'Canonical, indexable hreflang and sitemap coverage complete; soft-deindexed German routes are excluded as configured.',
);
