import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve('.');
const dist = join(root, 'dist');
const slug = 'annual-cost-savings-calculator';
const pages = [
  ['en', 'https://worthcalc.win/en/guides/annual-cost-savings-calculator/'],
  ['es', 'https://worthcalc.win/es/guides/annual-cost-savings-calculator/'],
  ['zh', 'https://worthcalc.win/zh/guides/annual-cost-savings-calculator/'],
  ['hi', 'https://worthcalc.win/hi/guides/annual-cost-savings-calculator/'],
  ['ar', 'https://worthcalc.win/ar/guides/annual-cost-savings-calculator/'],
];
const failures = [];
const sitemap = ['sitemap-0.xml', 'sitemap-1.xml', 'sitemap-2.xml']
  .map((file) => existsSync(join(dist, file)) ? readFileSync(join(dist, file), 'utf8') : '').join('\n');

for (const [locale, canonical] of pages) {
  const path = `/${locale}/guides/${slug}/`;
  const htmlPath = join(dist, path.slice(1), 'index.html');
  const html = existsSync(htmlPath) ? readFileSync(htmlPath, 'utf8') : '';
  if (!html) { failures.push(`${path}: missing build output`); continue; }
  if ((html.match(/<h1(?:\s|>)/g) ?? []).length !== 1) failures.push(`${path}: expected exactly one h1`);
  if (!html.includes(`<link rel="canonical" href="${canonical}"`)) failures.push(`${path}: canonical mismatch`);
  if (!html.includes('<meta name="robots" content="index,follow">')) failures.push(`${path}: not index,follow`);
  if (!html.includes('"@type":"Article"') && !html.includes('"@type": "Article"')) failures.push(`${path}: Article schema missing`);
  if (!html.includes('"@type":"BreadcrumbList"') && !html.includes('"@type": "BreadcrumbList"')) failures.push(`${path}: BreadcrumbList schema missing`);
  if (!html.includes('CFPB')) failures.push(`${path}: source attribution missing`);
  const internalLinks = (html.match(/href="\/(?:en|es|zh|hi|ar)\//g) ?? []).length;
  if (internalLinks < 3) failures.push(`${path}: fewer than three locale-aware internal links`);
  if (!sitemap.includes(`<loc>${canonical}</loc>`)) failures.push(`${path}: missing from sitemap`);
}

if (failures.length) {
  console.error(`SEO program 010 check failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log('SEO program 010 passed: 5 localized guides have one H1, indexable canonical/robots, Article + BreadcrumbList schema, sources, internal links, and sitemap entries.');
