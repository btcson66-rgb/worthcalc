import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve('.');
const dist = join(root, 'dist');
const slugs = [
  'cloud-storage-cost-per-retained-gb',
  'mobile-data-cost-per-gb-used',
  'event-ticket-cost-per-attended-hour',
  'language-class-cost-per-completed-session',
  'meal-delivery-plan-cost-per-eaten-meal',
  'software-add-on-cost-per-active-seat',
];
const locales = ['en', 'es', 'zh', 'hi', 'ar'];
const pages = slugs.flatMap((slug) => locales.map((locale) => `https://worthcalc.win/${locale}/guides/${slug}/`));
const sitemap = ['sitemap-0.xml', 'sitemap-1.xml', 'sitemap-2.xml']
  .map((file) => existsSync(join(dist, file)) ? readFileSync(join(dist, file), 'utf8') : '').join('\n');
const failures = [];

for (const canonical of pages) {
  const path = new URL(canonical).pathname;
  const htmlPath = join(dist, path.slice(1), 'index.html');
  const html = existsSync(htmlPath) ? readFileSync(htmlPath, 'utf8') : '';
  if (!html) { failures.push(path + ': missing build output'); continue; }
  if ((html.match(/<h1(?:\s|>)/g) ?? []).length !== 1) failures.push(path + ': expected exactly one h1');
  if (!html.includes('<link rel="canonical" href="' + canonical + '"')) failures.push(path + ': canonical mismatch');
  if (!html.includes('<meta name="robots" content="index,follow">')) failures.push(path + ': not index,follow');
  if (!html.includes('"@type":"Article"') && !html.includes('"@type": "Article"')) failures.push(path + ': Article schema missing');
  if (!html.includes('"@type":"BreadcrumbList"') && !html.includes('"@type": "BreadcrumbList"')) failures.push(path + ': BreadcrumbList schema missing');
  if (!html.includes('CFPB') || !html.includes('consumerfinance.gov')) failures.push(path + ': CFPB source attribution missing');
  const articleText = (html.match(/<article[\s\S]*?<\/article>/i)?.[0] ?? '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (articleText.length < 900) failures.push(path + ': substantive article text is shorter than 900 characters');
  if ((html.match(/<h2(?:\s|>)/g) ?? []).length < 3) failures.push(path + ': fewer than three explanatory h2 sections');
  if ((html.match(/href="\/(?:en|es|zh|hi|ar)\//g) ?? []).length < 3) failures.push(path + ': fewer than three locale-aware internal links');
  if (!sitemap.includes('<loc>' + canonical + '</loc>')) failures.push(path + ': missing from sitemap');
}

if (failures.length) {
  console.error('SEO program 016 check failed (' + failures.length + '):');
  failures.forEach((failure) => console.error('- ' + failure));
  process.exit(1);
}
console.log('SEO program 016 passed: ' + pages.length + ' localized shared-capacity and unit-consumption guides have one H1, indexable canonical/robots, Article + BreadcrumbList schema, CFPB attribution, internal links, and sitemap entries.');
