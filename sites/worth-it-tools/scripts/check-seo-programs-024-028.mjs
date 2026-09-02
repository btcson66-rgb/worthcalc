import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const locales = ['en', 'es', 'zh', 'hi', 'ar'];
const packages = {
  '024': 'refrigerator-cost-per-day-used',
  '025': 'water-heater-cost-per-gallon-heated',
  '026': 'oven-stove-cost-per-cooking-hour-used',
  '027': 'hvac-cost-per-operating-hour-used',
  '028': 'led-lighting-cost-per-hour-used',
};
const id = process.argv[2] ?? '';
if (!packages[id]) throw new Error('Usage: node check-seo-programs-024-028.mjs <024|025|026|027|028>');
const slug = packages[id]; const errors = [];
for (const locale of locales) {
  const route = `/${locale}/guides/${slug}/`;
  const source = join(root, 'src', 'content', 'growth-articles', locale, `${slug}.md`);
  const output = join(root, 'dist', locale, 'guides', slug, 'index.html');
  const schema = join(root, 'src', 'data', 'seo-packages-002-005', 'schema', `${id}__${locale}__${slug}.json`);
  if (!existsSync(source)) errors.push(`${route}: missing source`);
  if (!existsSync(output)) errors.push(`${route}: missing build output`);
  if (!existsSync(schema)) errors.push(`${route}: missing schema`);
  if (existsSync(source)) {
    const text = readFileSync(source, 'utf8');
    if ((text.match(/^# /gm) || []).length !== 1) errors.push(`${route}: expected one H1`);
    if (!text.includes('ENERGY STAR') || !text.includes('energystar.gov')) errors.push(`${route}: missing ENERGY STAR attribution`);
    if (id === '024' || id === '025') { if (!text.includes('CFPB') || !text.includes('consumerfinance.gov')) errors.push(`${route}: missing CFPB attribution`); }
    if (id === '026' || id === '028') { if (!text.includes('EIA') || !text.includes('eia.gov')) errors.push(`${route}: missing EIA attribution`); }
    if ((text.match(/\]\(\/(?:en|es|zh|hi|ar)\//g) || []).length < 4) errors.push(`${route}: fewer than four internal links`);
    if (text.length < 900) errors.push(`${route}: substantive copy is too short`);
  }
  if (existsSync(output)) {
    const html = readFileSync(output, 'utf8');
    if (!html.includes('rel="canonical"')) errors.push(`${route}: missing canonical`);
    if (!html.includes('index,follow')) errors.push(`${route}: missing indexable robots`);
    if (!html.includes('"@type":"Article"') || !html.includes('"@type":"BreadcrumbList"')) errors.push(`${route}: missing Article/BreadcrumbList schema`);
  }
}
const sitemap = join(root, 'dist', 'sitemap-0.xml');
if (!existsSync(sitemap)) errors.push('dist/sitemap-0.xml missing');
else { const xml = readFileSync(sitemap, 'utf8'); for (const locale of locales) if (!xml.includes(`https://worthcalc.win/${locale}/guides/${slug}/`)) errors.push(`/${locale}/guides/${slug}/: missing sitemap entry`); }
if (errors.length) { console.error(`SEO program ${id} check failed (${errors.length}):\n- ${errors.join('\n- ')}`); process.exit(1); }
console.log(`SEO program ${id} passed: 5 localized ${slug} guides have substantive copy, official-source attribution, internal links, indexable canonical/robots, Article + BreadcrumbList schema, and sitemap entries.`);
