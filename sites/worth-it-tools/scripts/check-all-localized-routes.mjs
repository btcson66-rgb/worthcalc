import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';

const dist = resolve('dist');
const locales = ['en', 'zh', 'es', 'fr', 'de'];
const expectedLang = { en: 'en', zh: 'zh-Hant', es: 'es', fr: 'fr', de: 'de' };
const expectedHreflangs = ['en', 'zh-Hant', 'es', 'fr', 'de', 'x-default'];
const sitemapFile = join(dist, 'sitemap-0.xml');
const sitemap = existsSync(sitemapFile) ? readFileSync(sitemapFile, 'utf8') : '';
const routes = new Map();
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

    const html = readFileSync(file, 'utf8');
    if (!html.includes(`lang="${expectedLang[locale]}"`)) failures.push(`/${locale}/${route}: wrong html lang`);
    if (!html.includes('rel="canonical"')) failures.push(`/${locale}/${route}: missing canonical`);
    for (const hreflang of expectedHreflangs) {
      if (!html.includes(`hreflang="${hreflang}"`)) failures.push(`/${locale}/${route}: missing hreflang=${hreflang}`);
    }
    const path = locale === 'en' && route === '' ? '' : `${locale}/${route}${route ? '/' : ''}`;
    const url = `https://worthcalc.win/${path}`;
    if (!sitemap.includes(`<loc>${url}</loc>`)) failures.push(`Sitemap missing ${url}`);
  }
}

for (const [route, present] of routes) {
  const missing = locales.filter((locale) => !present.has(locale));
  if (missing.length) failures.push(`/${route}: missing locales ${missing.join(', ')}`);
}

if (failures.length) {
  console.error(`All-localized-routes check failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`All localized routes check passed: ${routes.size} logical routes × ${locales.length} locales = ${localizedPages} localized pages; canonical, hreflang and sitemap coverage complete.`);
