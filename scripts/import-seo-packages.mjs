import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';

const inputRoot = resolve(process.argv[2] || 'C:/Users/User/Downloads/worthcalc-seo-extracted-20260902');
const siteRoot = resolve(process.argv[3] || 'sites/worth-it-tools');
const packageIds = ['002', '003', '004', '005', '006', '007', '008', '009'];
const contentRoot = join(siteRoot, 'src', 'content', 'growth-articles');
const schemaRoot = join(siteRoot, 'src', 'data', 'seo-packages-002-005', 'schema');
const metadataPath = join(siteRoot, 'src', 'data', 'seoPackages002to005.ts');

function packageDir(id) {
  const parent = join(inputRoot, id);
  const child = readdirSync(parent, { withFileTypes: true }).find((entry) => entry.isDirectory());
  if (!child) throw new Error('Missing package directory for ' + id);
  return join(parent, child.name);
}

function slugFromPath(path) {
  return path.split('/').filter(Boolean).at(-1);
}

function parseFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error('Page is missing YAML frontmatter');
  return { frontmatter: match[1], body: match[2] };
}

// Package formulas use LaTeX's \[...\] display delimiters. Astro's Markdown
// parser recognizes the equivalent $$...$$ form, so normalize only the
// delimiter lines while preserving every formula token and editorial word.
function normalizeDisplayMath(body) {
  return body
    .replace(/^(\s*)\\\[\s*$/gm, '$1$$$$')
    .replace(/^(\s*)\\\]\s*$/gm, '$1$$$$');
}

function normalizeInternalLinks(body) {
  const replacements = [
    ['/en/guides/loan-term-vs-monthly-payment/', '/en/loan-term-monthly-payment-vs-total-interest/'],
    ['/en/guides/apr-vs-apy/', '/en/apr-vs-apy/'],
    ['/en/guides/savings-rate-gross-vs-net/', '/en/savings-rate-gross-vs-net/'],
    ['/en/guides/emergency-fund-irregular-income/', '/en/emergency-fund-irregular-income/'],
    ['/en/guides/net-worth-vs-liquid-net-worth/', '/en/net-worth-vs-liquid-net-worth/'],
    ['/en/tools/dti-dbr/', '/en/tools/dti-calculator/'],
    ['/zh/guides/loan-term-vs-monthly-payment/', '/zh/loan-term-vs-total-interest/'],
    ['/zh/guides/emergency-fund-vs-sinking-fund/', '/zh/emergency-fund-vs-sinking-fund/'],
    ['/zh/guides/savings-rate-calculation/', '/zh/how-to-calculate-savings-rate/'],
    ['/zh/guides/installment-zero-interest/', '/zh/zero-interest-installments-truth/'],
    ['/zh/guides/apr-vs-apy/', '/zh/apr-vs-apy/'],
    ['/zh/guides/emergency-fund-how-much/', '/zh/emergency-fund-how-much/'],
    ['/zh/guides/emergency-fund-irregular-income/', '/zh/emergency-fund-irregular-income/'],
    ['/zh/guides/emergency-fund-vs-debt-payoff/', '/zh/emergency-fund-vs-debt-payoff/'],
    ['/zh/guides/net-worth-how-to-calculate/', '/zh/how-to-calculate-net-worth/'],
    ['/zh/guides/liquid-net-worth/', '/zh/liquid-net-worth-explained/'],
    ['/zh/tools/dti-dbr/', '/zh/tools/dti-calculator/'],
    ['/zh/guides/simple-vs-compound-interest/', '/zh/simple-vs-compound-interest/'],
    ['/zh/guides/subscription-cost/', '/zh/tools/subscription-audit/'],
  ];
  return replacements.reduce((text, [from, to]) => text.replaceAll(from, to), body);
}

function firstTool(related, locale) {
  const tool = related.find((item) => /\/tools\//.test(item));
  if (!tool) return '/' + locale + '/tools/budget-builder/';
  const url = new URL(tool, 'https://worthcalc.win');
  return url.pathname.replace(/\/$/, '') + '/';
}

function yamlString(value) {
  return JSON.stringify(value);
}

const metas = [];
mkdirSync(schemaRoot, { recursive: true });

for (const packageId of packageIds) {
  const dir = packageDir(packageId);
  const manifestPath = join(dir, 'seo-pages-manifest.json');
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const pages = Array.isArray(manifest) ? manifest : manifest.pages;
  if (!Array.isArray(pages) || pages.length !== 15) throw new Error(packageId + ': expected 15 manifest pages');

  for (const item of pages) {
    const locale = item.language === 'zh-Hant' ? 'zh' : item.language;
    if (!['en', 'zh'].includes(locale)) throw new Error(packageId + ': unsupported locale ' + item.language);
    const articleSlug = slugFromPath(item.canonical);
    const pageFile = item.page_file || item.source_file || item.filename;
    const schemaFile = item.schema_file || ('schema/' + item.filename.replace(/\.md$/, '.json'));
    const sourcePath = existsSync(join(dir, pageFile)) ? join(dir, pageFile) : join(dir, 'pages', pageFile);
    const sourceSchemaPath = existsSync(join(dir, schemaFile)) ? join(dir, schemaFile) : join(dir, 'schema', basename(schemaFile));
    if (!existsSync(sourcePath) || !existsSync(sourceSchemaPath)) {
      throw new Error(packageId + ': missing ' + pageFile + ' or ' + schemaFile);
    }
    const source = readFileSync(sourcePath, 'utf8');
    const parsed = parseFrontmatter(source);
    const body = normalizeInternalLinks(normalizeDisplayMath(parsed.body));
    const lastReviewed = item.last_reviewed || parsed.frontmatter.match(/^last_reviewed:\s*['"]?([^'"\r\n]+)['"]?\s*$/m)?.[1];
    if (!lastReviewed) throw new Error(packageId + ': missing last_reviewed for ' + articleSlug);
    const related = item.related || item.related_routes || [];
    const pageFrontmatter = [
      'contentType: article',
      'articleSlug: ' + yamlString(articleSlug),
      'locale: ' + yamlString(locale),
      'title: ' + yamlString(item.title),
      'description: ' + yamlString(item.meta_description),
      'relatedTool: ' + yamlString(firstTool(related, locale)),
      'lastReviewed: ' + yamlString(lastReviewed),
      'draft: false',
      'packageId: ' + yamlString(packageId),
      'seoTitle: ' + yamlString(item.seo_title),
      'robots: ' + yamlString(item.robots || 'index,follow'),
      'canonical: ' + yamlString(item.canonical),
      'ogTitle: ' + yamlString(item.og_title),
      'ogDescription: ' + yamlString(item.og_description),
      'ogImage: ' + yamlString(item.og_image),
      'imageAlt: ' + yamlString(item.image_alt),
      'breadcrumbLabel: ' + yamlString(item.breadcrumb_label || item.title),
    ].join('\n');
    const outputPath = join(contentRoot, locale, articleSlug + '.md');
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, '---\n' + pageFrontmatter + '\n---\n\n' + body, 'utf8');

    const outputSchemaName = packageId + '__' + locale + '__' + articleSlug + '.json';
    copyFileSync(sourceSchemaPath, join(schemaRoot, outputSchemaName));
    metas.push({
      key: locale + '/' + articleSlug,
      packageId,
      locale,
      articleSlug,
      title: item.title,
      seoTitle: item.seo_title,
      metaDescription: item.meta_description,
      excerpt: item.excerpt,
      canonical: item.canonical,
      robots: item.robots || 'index,follow',
      ogTitle: item.og_title,
      ogDescription: item.og_description,
      ogImage: item.og_image,
      imageAlt: item.image_alt,
      imageBrief: item.image_brief || '',
      lastReviewed,
      related,
      breadcrumbLabel: item.breadcrumb_label || item.title,
      schemaFile: outputSchemaName,
    });
  }
}

metas.sort((a, b) => a.key.localeCompare(b.key));
const metadata = [
  'export interface SeoPackageGuideMeta {',
  '  key: string;',
  '  packageId: string;',
  "  locale: 'en' | 'zh';",
  '  articleSlug: string;',
  '  title: string;',
  '  seoTitle: string;',
  '  metaDescription: string;',
  '  excerpt: string;',
  '  canonical: string;',
  '  robots: string;',
  '  ogTitle: string;',
  '  ogDescription: string;',
  '  ogImage: string;',
  '  imageAlt: string;',
  '  imageBrief: string;',
  '  lastReviewed: string;',
  '  related: string[];',
  '  breadcrumbLabel: string;',
  '  schemaFile: string;',
  '}',
  '',
  'export const seoPackageGuides: Record<string, SeoPackageGuideMeta> = ' + JSON.stringify(Object.fromEntries(metas.map((meta) => [meta.key, meta])), null, 2) + ';',
  '',
].join('\n');
writeFileSync(metadataPath, metadata, 'utf8');
console.log('Imported ' + metas.length + ' guides from packages ' + packageIds.join(', ') + '.');
