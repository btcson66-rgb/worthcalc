import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const dist = resolve('dist');
const locales = ['en', 'zh', 'es', 'fr', 'de'];
const hreflangs = ['en', 'zh-Hant', 'es', 'fr', 'de', 'x-default'];
const failures = [];

function read(relativePath) {
  const file = join(dist, relativePath);
  if (!existsSync(file)) {
    failures.push(`Missing ${relativePath}`);
    return '';
  }
  return readFileSync(file, 'utf8');
}

for (const locale of locales) {
  const html = read(`${locale}/subscription-creep/index.html`);
  if (!html) continue;

  for (const hreflang of hreflangs) {
    if (!html.includes(`hreflang="${hreflang}"`)) {
      failures.push(`/${locale}/subscription-creep/ missing hreflang=${hreflang}`);
    }
  }

  for (const marker of ['class="direct-answer"', '<table', 'class="source-list"', 'class="last-verified"']) {
    if (!html.includes(marker)) failures.push(`/${locale}/subscription-creep/ missing ${marker}`);
  }

  for (const schemaType of ['Article', 'FAQPage', 'BreadcrumbList']) {
    if (!html.includes(`"@type":"${schemaType}"`)) {
      failures.push(`/${locale}/subscription-creep/ missing ${schemaType} schema`);
    }
  }
}

const sitemap = read('sitemap-0.xml');
for (const locale of ['es', 'fr', 'de']) {
  const url = `https://worthcalc.win/${locale}/subscription-creep/`;
  if (!sitemap.includes(`<loc>${url}</loc>`)) failures.push(`Sitemap missing ${url}`);
}

for (const [locale, slug] of [
  ['en', 'costco-membership'],
  ['zh', 'costco-membership'],
  ['en', 'commute-cost'],
  ['zh', 'commute-cost'],
]) {
  const html = read(`${locale}/tools/${slug}/index.html`);
  for (const marker of ['class="direct-answer"', '<table', 'class="source-list"', 'class="last-verified"']) {
    if (html && !html.includes(marker)) failures.push(`/${locale}/tools/${slug}/ missing ${marker}`);
  }
}

if (failures.length) {
  console.error(`Multilingual editorial check failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Multilingual editorial check passed: 5 subscription variants, 3 new routes, 4 enriched high-value tools.');
