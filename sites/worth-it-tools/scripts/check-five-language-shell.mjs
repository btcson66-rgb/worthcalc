import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const dist = resolve('dist');
const locales = ['en', 'zh', 'es', 'fr', 'de'];
const hreflangs = ['en', 'zh-Hant', 'es', 'fr', 'de', 'x-default'];
const releasedLegal = ['about', 'privacy'];
const releasedTools = [];
const releasedHomeLocales = [];
const failures = [];

function verify(path, kind) {
  const file = join(dist, path, 'index.html');
  if (!existsSync(file)) {
    failures.push(`Missing /${path}/`);
    return;
  }
  const html = readFileSync(file, 'utf8');
  if (!html.includes('<h1')) failures.push(`/${path}/ missing h1`);
  if (!html.includes('rel="canonical"')) failures.push(`/${path}/ missing canonical`);
  for (const hreflang of hreflangs) {
    if (!html.includes(`hreflang="${hreflang}"`)) failures.push(`/${path}/ missing hreflang=${hreflang}`);
  }
  if (kind !== 'home' && !html.includes('"@type":"BreadcrumbList"')) failures.push(`/${path}/ missing BreadcrumbList`);
  const text = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length < 900) failures.push(`/${path}/ content too thin (${text.length} chars)`);
}

for (const slug of releasedLegal) for (const locale of locales) verify(`${locale}/${slug}`, 'legal');
for (const slug of releasedTools) for (const locale of locales) verify(`${locale}/tools/${slug}`, 'tool');
for (const locale of releasedHomeLocales) verify(locale, 'home');

const sitemapFile = join(dist, 'sitemap-0.xml');
const sitemap = existsSync(sitemapFile) ? readFileSync(sitemapFile, 'utf8') : '';
for (const slug of releasedLegal) for (const locale of locales) {
  const url = `https://worthcalc.win/${locale}/${slug}/`;
  if (!sitemap.includes(`<loc>${url}</loc>`)) failures.push(`Sitemap missing ${url}`);
}

if (failures.length) {
  console.error(`Five-language shell check failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log(`Five-language shell check passed: ${releasedLegal.length}/6 legal slugs, ${releasedTools.length}/8 tool slugs, ${releasedHomeLocales.length}/5 localized homepages.`);
