import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const locales = ['en', 'es', 'zh', 'hi', 'ar'];
const topics = {
  119: 'portable-air-conditioner-electricity-cost-per-cooling-session-used',
  120: 'pool-pump-electricity-cost-per-filtration-cycle-used',
  121: 'dehumidifier-electricity-cost-per-laundry-drying-session-used',
  122: 'electric-wine-cooler-electricity-cost-per-storage-day-used',
  123: 'attic-fan-electricity-cost-per-ventilation-hour-used',
  124: 'solar-inverter-electricity-cost-per-monitoring-day-used',
};
const id = Number(process.argv[2]);
if (!topics[id]) throw new Error(`Unknown SEO programme: ${process.argv[2]}`);
const slug = topics[id];
const errors = [];

for (const locale of locales) {
  const label = `/${locale}/guides/${slug}/`;
  const source = join(root, 'src', 'content', 'growth-articles', locale, `${slug}.md`);
  const output = join(root, 'dist', locale, 'guides', slug, 'index.html');
  const schema = join(root, 'src', 'data', 'seo-packages-002-005', 'schema', `${id}__${locale}__${slug}.json`);
  if (!existsSync(source)) errors.push(`${label}: missing source`);
  if (!existsSync(output)) errors.push(`${label}: missing build output`);
  if (!existsSync(schema)) errors.push(`${label}: missing schema`);
  if (existsSync(source)) {
    const text = readFileSync(source, 'utf8');
    if ((text.match(/^# /gm) || []).length !== 1) errors.push(`${label}: expected one H1`);
    for (const host of ['eia.gov', 'energystar.gov', 'consumerfinance.gov']) if (!text.includes(host)) errors.push(`${label}: missing ${host}`);
    if ((text.match(/\]\(\/(?:en|es|zh|hi|ar)\/guides\//g) || []).length < 4) errors.push(`${label}: fewer than four internal links`);
    if ([...text].length < 1800) errors.push(`${label}: substantive copy is too short`);
    const lower = text.toLowerCase();
    if (!['measured', '實測', 'medida', 'mide', 'माप', 'المقاس'].some((term) => lower.includes(term.toLowerCase()))) errors.push(`${label}: missing measurement boundary`);
  }
  if (existsSync(output)) {
    const html = readFileSync(output, 'utf8');
    if (!html.includes('rel="canonical"') || !html.includes(`https://worthcalc.win${label}`)) errors.push(`${label}: missing exact canonical`);
    if (!html.includes('index,follow')) errors.push(`${label}: missing indexable robots`);
    if (!html.includes('"@type":"Article"') || !html.includes('"@type":"BreadcrumbList"')) errors.push(`${label}: missing Article/BreadcrumbList schema`);
  }
}

const sitemap = join(root, 'dist', 'sitemap-0.xml');
if (!existsSync(sitemap)) errors.push('missing dist/sitemap-0.xml');
else {
  const text = readFileSync(sitemap, 'utf8');
  for (const locale of locales) if (!text.includes(`<loc>https://worthcalc.win/${locale}/guides/${slug}/</loc>`)) errors.push(`${slug}: missing sitemap entry for ${locale}`);
}

if (errors.length) {
  console.error(`SEO programme ${id} failed (${errors.length}):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`SEO programme ${id} passed: 5 localized substantive routes, official sources, measurement boundary, internal links, canonical/robots/schema, and sitemap.`);
