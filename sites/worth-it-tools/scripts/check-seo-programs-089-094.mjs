import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const locales = ['en', 'es', 'zh', 'hi', 'ar'];
const topics = {
  '089': 'projector-electricity-cost-per-presentation-hour-used',
  '090': 'e-reader-electricity-cost-per-reading-hour-used',
  '091': 'electric-pencil-sharpener-electricity-cost-per-sharpening-session-used',
  '092': 'electric-stapler-electricity-cost-per-stapling-session-used',
  '093': 'desk-fan-electricity-cost-per-cooling-hour-used',
  '094': 'electric-foot-massager-electricity-cost-per-massage-session-used',
};
const id = process.argv[2];
if (!topics[id]) throw new Error(`Unknown SEO programme: ${id}`);
const slug = topics[id];
const errors = [];
for (const locale of locales) {
  const source = join(root, 'src', 'content', 'growth-articles', locale, `${slug}.md`);
  const output = join(root, 'dist', locale, 'guides', slug, 'index.html');
  const schema = join(root, 'src', 'data', 'seo-packages-002-005', 'schema', `${id}__${locale}__${slug}.json`);
  const label = `/${locale}/guides/${slug}/`;
  if (!existsSync(source)) errors.push(`${label}: missing source`);
  if (!existsSync(output)) errors.push(`${label}: missing build output`);
  if (!existsSync(schema)) errors.push(`${label}: missing schema`);
  if (existsSync(source)) {
    const text = readFileSync(source, 'utf8');
    if ((text.match(/^# /gm) || []).length !== 1) errors.push(`${label}: expected one H1`);
    for (const sourceHost of ['eia.gov', 'energystar.gov', 'consumerfinance.gov']) {
      if (!text.includes(sourceHost)) errors.push(`${label}: missing ${sourceHost} attribution`);
    }
    if ((text.match(/\]\(\/(?:en|es|zh|hi|ar)\//g) || []).length < 4) errors.push(`${label}: fewer than four internal links`);
    if (text.length < 1100) errors.push(`${label}: substantive copy is too short`);
    if (!text.includes('measured') && !text.includes('實測') && !text.includes('medida') && !text.includes('माप') && !text.includes('المقاس')) errors.push(`${label}: missing measurement boundary`);
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
  for (const locale of locales) if (!text.includes(`<loc>https://worthcalc.win/${locale}/guides/${slug}/</loc>`)) errors.push(`/${locale}/guides/${slug}/: missing sitemap entry`);
}
if (errors.length) {
  console.error(`SEO programme ${id} failed (${errors.length}):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`SEO programme ${id} passed: ${locales.length} localized substantive routes, official sources, measurement boundary, internal links, canonical/robots/schema, and sitemap.`);
