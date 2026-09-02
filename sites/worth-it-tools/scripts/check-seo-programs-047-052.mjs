import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const program = process.argv[2];
const definitions = {
  '047': { slug: 'vacuum-cleaner-electricity-cost-per-cleaning-hour-used' },
  '048': { slug: 'robot-vacuum-cost-per-cleaning-cycle-used' },
  '049': { slug: 'electric-kettle-cost-per-boil-used' },
  '050': { slug: 'coffee-maker-cost-per-brew-used' },
  '051': { slug: 'hair-dryer-cost-per-drying-session-used' },
  '052': { slug: 'garment-steamer-cost-per-steaming-hour-used' },
};
const definition = definitions[program];
if (!definition) throw new Error('Usage: node scripts/check-seo-programs-047-052.mjs 047|048|049|050|051|052');

const root = process.cwd();
const locales = ['en', 'es', 'zh', 'hi', 'ar'];
const sitemap = readFileSync(join(root, 'dist', 'sitemap-0.xml'), 'utf8');
const failures = [];
for (const locale of locales) {
  const key = `${locale}/${definition.slug}`;
  const sourcePath = join(root, 'src', 'content', 'growth-articles', locale, `${definition.slug}.md`);
  const htmlPath = join(root, 'dist', locale, 'guides', definition.slug, 'index.html');
  const schemaPath = join(root, 'src', 'data', 'seo-packages-002-005', 'schema', `${program}__${locale}__${definition.slug}.json`);
  if (!existsSync(sourcePath) || !existsSync(htmlPath) || !existsSync(schemaPath)) {
    failures.push(`${key}: missing source, built HTML, or schema`);
    continue;
  }
  const source = readFileSync(sourcePath, 'utf8');
  const html = readFileSync(htmlPath, 'utf8');
  const schema = readFileSync(schemaPath, 'utf8');
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  const internalLinks = new Set([...source.matchAll(/\]\((\/[^)]+)\)/g)].map((match) => match[1])).size;
  const canonical = `https://worthcalc.win/${locale}/guides/${definition.slug}/`;
  if (source.length < 900) failures.push(`${key}: source copy is under 900 characters`);
  if ((source.match(/^# /gm) ?? []).length !== 1 || h1Count !== 1) failures.push(`${key}: expected exactly one H1`);
  if (internalLinks < 4) failures.push(`${key}: fewer than four internal links`);
  if (!source.includes('eia.gov') || !source.includes('consumerfinance.gov')) failures.push(`${key}: missing EIA or CFPB attribution`);
  if (!html.includes(`<link rel="canonical" href="${canonical}"`) || !html.includes('name="robots" content="index,follow"')) failures.push(`${key}: canonical or robots boundary failed`);
  if (!schema.includes('"Article"') || !schema.includes('"BreadcrumbList"')) failures.push(`${key}: schema types missing`);
  if (!sitemap.includes(`<loc>${canonical}</loc>`)) failures.push(`${key}: sitemap entry missing`);
}
if (failures.length) {
  console.error(`SEO program ${program} failed:`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`SEO program ${program} passed: five localized guides have substantive copy, EIA/CFPB attribution, internal links, indexable canonical/robots, Article + BreadcrumbList schema, and sitemap entries.`);
