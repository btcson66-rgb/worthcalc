import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const projectRoot = resolve('.');
const contentRoot = join(projectRoot, 'src', 'content', 'growth-articles');
const distRoot = join(projectRoot, 'dist');
const sitemapPath = join(distRoot, 'sitemap-0.xml');
const packageIds = new Set(['002', '003', '004', '005', '006', '007', '008', '009']);
const failures = [];
const guides = [];

function value(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*["']?([^"'\\r\\n]+)["']?\\s*$`, 'm'));
  return match?.[1]?.trim() ?? '';
}

for (const locale of ['en', 'zh']) {
  const localeRoot = join(contentRoot, locale);
  for (const file of readdirSync(localeRoot).filter((name) => name.endsWith('.md'))) {
    const source = readFileSync(join(localeRoot, file), 'utf8');
    const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/m)?.[1] ?? '';
    const packageId = value(frontmatter, 'packageId');
    if (!packageIds.has(packageId)) continue;
    guides.push({
      packageId,
      locale,
      slug: value(frontmatter, 'articleSlug'),
      canonical: value(frontmatter, 'canonical'),
      image: value(frontmatter, 'ogImage'),
    });
  }
}

if (guides.length !== 120) failures.push(`expected 120 package guides, found ${guides.length}`);

const sitemap = existsSync(sitemapPath) ? readFileSync(sitemapPath, 'utf8') : '';
if (!sitemap) failures.push('dist/sitemap-0.xml is missing');

for (const guide of guides) {
  const expectedPath = `/${guide.locale}/guides/${guide.slug}/`;
  const htmlPath = join(distRoot, expectedPath.slice(1), 'index.html');
  const html = existsSync(htmlPath) ? readFileSync(htmlPath, 'utf8') : '';
  if (!html) {
    failures.push(`${expectedPath}: missing build output`);
    continue;
  }
  if ((html.match(/<h1(?:\s|>)/g) ?? []).length !== 1) failures.push(`${expectedPath}: expected one h1`);
  if (!html.includes(`<link rel="canonical" href="${guide.canonical}"`)) failures.push(`${expectedPath}: canonical mismatch`);
  if (!html.includes('<meta name="robots" content="index,follow">')) failures.push(`${expectedPath}: not index,follow`);
  if (html.includes('FAQPage')) failures.push(`${expectedPath}: unexpected FAQPage schema`);
  if (!html.includes('"@type":"Article"') && !html.includes('"@type": "Article"')) failures.push(`${expectedPath}: Article schema missing`);
  if (!html.includes('"@type":"BreadcrumbList"') && !html.includes('"@type": "BreadcrumbList"')) {
    failures.push(`${expectedPath}: BreadcrumbList schema missing`);
  }
  if (!sitemap.includes(`<loc>${guide.canonical}</loc>`)) failures.push(`${expectedPath}: missing from sitemap`);
  if (!guide.image || !existsSync(join(projectRoot, 'public', guide.image.slice(1)))) {
    failures.push(`${expectedPath}: OG image source missing (${guide.image})`);
  }
  if (guide.image && !existsSync(join(distRoot, guide.image.slice(1)))) failures.push(`${expectedPath}: OG image missing from dist`);
  if (/localhost|127\.0\.0\.1|example\.com/i.test(html)) failures.push(`${expectedPath}: placeholder host found`);
}

const sitemapUrls = (sitemap.match(/<loc>[^<]+<\/loc>/g) ?? []).length;
if (sitemapUrls !== 432) failures.push(`expected 432 sitemap URLs, found ${sitemapUrls}`);

if (failures.length) {
  console.error(`SEO package check failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`SEO package check passed: ${guides.length} guides, 1 h1/canonical/robots/Article/BreadcrumbList/image/sitemap entry per page; ${sitemapUrls} sitemap URLs.`);
