import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const slug = 'heat-pump-cost-per-heating-hour-used';
const locales = ['en', 'es', 'zh', 'hi', 'ar'];
const errors = [];
for (const locale of locales) {
  const route = '/' + locale + '/guides/' + slug + '/';
  const source = join(root, 'src', 'content', 'growth-articles', locale, slug + '.md');
  const output = join(root, 'dist', locale, 'guides', slug, 'index.html');
  const schema = join(root, 'src', 'data', 'seo-packages-002-005', 'schema', '035__' + locale + '__' + slug + '.json');
  if (!existsSync(source)) errors.push(route + ': missing source');
  if (!existsSync(output)) errors.push(route + ': missing build output');
  if (!existsSync(schema)) errors.push(route + ': missing schema');
  if (existsSync(source)) {
    const text = readFileSync(source, 'utf8');
    if ((text.match(/^# /gm) || []).length !== 1) errors.push(route + ': expected one H1');
    if (!text.includes('ENERGY STAR') || !text.includes('energystar.gov')) errors.push(route + ': missing ENERGY STAR attribution');
    if (!text.includes('EIA') || !text.includes('eia.gov')) errors.push(route + ': missing EIA attribution');
    if ((text.match(/\]\(\/(?:en|es|zh|hi|ar)\//g) || []).length < 4) errors.push(route + ': fewer than four internal links');
    if (text.length < 900) errors.push(route + ': substantive copy is too short');
  }
  if (existsSync(output)) {
    const html = readFileSync(output, 'utf8');
    if (!html.includes('rel="canonical"')) errors.push(route + ': missing canonical');
    if (!html.includes('index,follow')) errors.push(route + ': missing indexable robots');
    if (!html.includes('"@type":"Article"') || !html.includes('"@type":"BreadcrumbList"')) errors.push(route + ': missing Article/BreadcrumbList schema');
  }
}
const sitemap = join(root, 'dist', 'sitemap-0.xml');
if (!existsSync(sitemap)) errors.push('dist/sitemap-0.xml missing');
else {
  const xml = readFileSync(sitemap, 'utf8');
  for (const locale of locales) if (!xml.includes('https://worthcalc.win/' + locale + '/guides/' + slug + '/')) errors.push('/' + locale + '/guides/' + slug + '/: missing sitemap entry');
}
if (errors.length) {
  console.error('SEO program 035 check failed (' + errors.length + '):\n- ' + errors.join('\n- '));
  process.exit(1);
}
console.log('SEO program 035 passed: 5 localized heat-pump guides have substantive copy, official-source attribution, internal links, indexable canonical/robots, Article + BreadcrumbList schema, and sitemap entries.');
