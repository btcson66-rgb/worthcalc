import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';
import { createServer } from 'vite';

const ROOT = resolve('.');
const DIST = join(ROOT, 'dist');
const ORIGIN = 'https://worthcalc.win';
const OUTPUT = join(ROOT, 'docs', 'audits');
const LOCALES = new Set(['en', 'zh', 'es', 'fr', 'de', 'hi', 'ar']);

type SourceMeta = {
  sourceFile: string;
  title: string;
  locale: string;
  slug: string;
  lastReviewed: string;
};

type Page = {
  path: string;
  file: string;
  html: string;
  locale: string;
  routeType: string;
  slug: string;
  title: string;
  h1: string;
  bodyHtml: string;
  wordCount: number;
  bodyLinks: string[];
  externalLinks: string[];
  internalTargets: string[];
  packageId: string;
  cluster: string;
  sourceFile: string;
  lastReviewed: string;
  ogImage: string;
};

function walk(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function normalizePath(path: string): string {
  if (path === '/') return '/';
  return `/${path.replace(/^\/+|\/+$/g, '')}/`;
}

function decodeHtml(value: string): string {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&apos;', "'");
}

function attribute(tag: string, name: string): string {
  return tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, 'i'))?.[2] ?? '';
}

function plainText(html: string): string {
  return decodeHtml(html)
    .replace(/<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function bodyHtml(html: string): string {
  const main = html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0] ?? html;
  return main.replace(/<(?:header|nav|footer|aside)\b[\s\S]*?<\/(?:header|nav|footer|aside)>/gi, ' ');
}

function countWords(text: string): number {
  const han = text.match(/[\p{Script=Han}]/gu)?.length ?? 0;
  const nonHan = text.replace(/[\p{Script=Han}]/gu, ' ').match(/[\p{L}\p{N}]+/gu)?.length ?? 0;
  return han + nonHan;
}

function parseFrontmatter(markdown: string): Record<string, string> {
  const block = markdown.match(/^\uFEFF?---\s*\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1] ?? '';
  const result: Record<string, string> = {};
  for (const line of block.split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z][\w-]*):\s*(.*?)\s*$/);
    if (!match) continue;
    let value = match[2];
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    result[match[1]] = value;
  }
  return result;
}

function sourceMeta(): Map<string, SourceMeta> {
  const result = new Map<string, SourceMeta>();
  for (const directory of ['growth-articles', 'growth-tools']) {
    const base = join(ROOT, 'src', 'content', directory);
    if (!existsSync(base)) continue;
    for (const file of walk(base).filter((candidate) => candidate.endsWith('.md'))) {
      const meta = parseFrontmatter(readFileSync(file, 'utf8'));
      const field = directory === 'growth-articles' ? 'articleSlug' : 'toolSlug';
      const prefix = directory === 'growth-articles' ? 'guides' : 'tools';
      if (!meta.locale || !meta[field] || meta.draft === 'true') continue;
      result.set(normalizePath(`/${meta.locale}/${prefix}/${meta[field]}`), {
        sourceFile: relative(ROOT, file).split(sep).join('/'),
        title: meta.title ?? '',
        locale: meta.locale,
        slug: meta[field],
        lastReviewed: meta.lastReviewed ?? '',
      });
    }
  }
  return result;
}

function sourceForRoute(path: string, content: Map<string, SourceMeta>): SourceMeta {
  const fromContent = content.get(path);
  if (fromContent) return fromContent;
  const parts = path.split('/').filter(Boolean);
  if (path === '/') return { sourceFile: 'src/pages/index.astro', title: '', locale: 'en', slug: 'home', lastReviewed: '' };
  const locale = parts[0] && LOCALES.has(parts[0]) ? parts[0] : 'en';
  const logical = parts[0] && LOCALES.has(parts[0]) ? parts.slice(1).join('/') : parts.join('/');
  const explicit = join(ROOT, 'src', 'pages', locale, logical ? `${logical}.astro` : 'index.astro');
  if (existsSync(explicit)) return { sourceFile: relative(ROOT, explicit).split(sep).join('/'), title: '', locale, slug: logical.split('/').at(-1) || 'home', lastReviewed: '' };
  const directoryIndex = join(ROOT, 'src', 'pages', '[locale]', logical, 'index.astro');
  if (logical && existsSync(directoryIndex)) return { sourceFile: relative(ROOT, directoryIndex).split(sep).join('/'), title: '', locale, slug: logical.split('/').at(-1) ?? '', lastReviewed: '' };
  if (logical.startsWith('guides/')) return { sourceFile: 'src/pages/[locale]/guides/[slug].astro', title: '', locale, slug: logical.split('/').at(-1) ?? '', lastReviewed: '' };
  if (logical.startsWith('tools/')) return { sourceFile: 'src/pages/[locale]/tools/[tool].astro', title: '', locale, slug: logical.split('/').at(-1) ?? '', lastReviewed: '' };
  if (logical.startsWith('topics/')) return { sourceFile: 'src/pages/[locale]/topics/[topic].astro', title: '', locale, slug: logical.split('/').at(-1) ?? '', lastReviewed: '' };
  if (['about', 'privacy', 'terms', 'contact', 'disclaimer', 'changelog'].includes(logical)) return { sourceFile: 'src/pages/[locale]/[legal].astro', title: '', locale, slug: logical, lastReviewed: '' };
  return { sourceFile: '', title: '', locale, slug: logical.split('/').at(-1) ?? '', lastReviewed: '' };
}

function routeType(path: string): string {
  if (path === '/' || /^\/(?:en|zh|es|fr|de|hi|ar)\/$/.test(path)) return 'home';
  if (/^\/(?:en|zh|es|fr|de|hi|ar)\/tools\/[^/]+\/$/.test(path)) return 'tool';
  if (/^\/(?:en|zh|es|fr|de|hi|ar)\/guides\/[^/]+\/$/.test(path)) return 'guide';
  if (/^\/(?:en|zh)\/topics\/[^/]+\/$/.test(path)) return 'topic-hub';
  if (/^\/(?:en|zh|es|fr|de|hi|ar)\/(?:about|privacy|terms|contact|disclaimer|changelog)\/$/.test(path)) return 'legal';
  return 'index';
}

function localeFor(path: string): string {
  const locale = path.split('/').filter(Boolean)[0];
  return locale && LOCALES.has(locale) ? locale : 'en';
}

function resolveInternal(href: string, pagePath: string): string | null {
  if (!href || href.startsWith('#') || /^(?:mailto|tel|javascript|data):/i.test(href)) return null;
  try {
    const url = new URL(href, `${ORIGIN}${pagePath}`);
    if (url.origin !== ORIGIN) return null;
    return normalizePath(url.pathname);
  } catch {
    return null;
  }
}

function sitemapPaths(): string[] {
  const file = join(DIST, 'sitemap-0.xml');
  if (!existsSync(file)) throw new Error(`Missing ${file}; run npm run build first.`);
  return [...readFileSync(file, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(decodeHtml(match[1])).pathname);
}

function packageIdFromBuildImage(ogImage: string, path: string): string {
  const imagePath = new URL(ogImage, ORIGIN).pathname;
  const slug = path.split('/').filter(Boolean).at(-1) ?? '';
  const match = imagePath.match(/^\/images\/guides\/og\/(\d+)-([a-z]{2})-(.+)\.webp$/i);
  return match && match[3] === slug ? match[1] : '';
}

function pagesFromSitemap(paths: string[], content: Map<string, SourceMeta>, classifyTopic: (path: string) => string): Page[] {
  return paths.map((path) => {
    const file = path === '/' ? join(DIST, 'index.html') : join(DIST, path.slice(1), 'index.html');
    const html = readFileSync(file, 'utf8');
    const body = bodyHtml(html);
    const source = sourceForRoute(path, content);
    const anchors = [...body.matchAll(/<a\b[^>]*\bhref\s*=\s*(["'])(.*?)\1[^>]*>/gi)].map((match) => decodeHtml(match[2]));
    const internalTargets = anchors.map((href) => resolveInternal(href, path)).filter((value): value is string => Boolean(value));
    const externalLinks = anchors.filter((href) => {
      try {
        const url = new URL(href, `${ORIGIN}${path}`);
        return (url.protocol === 'https:' || url.protocol === 'http:') && url.origin !== ORIGIN;
      } catch {
        return false;
      }
    });
    const title = plainText(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? '')
      .replace(/\s*\|\s*WorthCalc\s*$/, '')
      .trim();
    const h1 = [...body.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => plainText(match[1])).join(' | ');
    const ogImageTag = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => match[0]).find((tag) => attribute(tag, 'property').toLowerCase() === 'og:image');
    const ogImage = attribute(ogImageTag ?? '', 'content');
    const locale = localeFor(path);
    const route = routeType(path);
    return {
      path,
      file,
      html,
      locale,
      routeType: route,
      slug: source.slug || path.split('/').filter(Boolean).at(-1) || 'home',
      title: source.title || title,
      h1,
      bodyHtml: body,
      wordCount: countWords(plainText(body)),
      bodyLinks: anchors,
      externalLinks,
      internalTargets,
      packageId: packageIdFromBuildImage(ogImage, path),
      cluster: classifyTopic(path),
      sourceFile: source.sourceFile,
      lastReviewed: source.lastReviewed,
      ogImage,
    };
  });
}

function historyMap(): Map<string, { date: string; subject: string }> {
  const repositoryRoot = execFileSync('git', ['rev-parse', '--show-toplevel'], { cwd: ROOT, encoding: 'utf8' }).trim();
  const raw = execFileSync('git', ['log', '--first-parent', '--reverse', '--format=__COMMIT__%H|%ad|%s', '--date=short', '--name-only', '--', 'sites/worth-it-tools/src/content', 'sites/worth-it-tools/src/pages', 'sites/worth-it-tools/src/data'], { cwd: repositoryRoot, encoding: 'utf8' });
  const result = new Map<string, { date: string; subject: string }>();
  let current: { date: string; subject: string } | null = null;
  for (const line of raw.split(/\r?\n/)) {
    if (line.startsWith('__COMMIT__')) {
      const [, date, subject] = line.match(/^__COMMIT__[^|]+\|([^|]+)\|([\s\S]*)$/) ?? [];
      current = date && subject ? { date, subject } : null;
      continue;
    }
    const path = line.trim();
    if (current && path) {
      const normalized = path.replace(/^sites\/worth-it-tools\//, '');
      if (!result.has(normalized)) result.set(normalized, current);
    }
  }
  return result;
}

function firstPr(subject: string): string {
  const match = subject.match(/(?:pull request|PR)\s*#?(\d+)|\(#(\d+)\)/i);
  return match ? `PR #${match[1] || match[2]}` : '無資料';
}

function csvCell(value: unknown): string {
  const text = value === null || value === undefined ? '' : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function percentile(values: number[], fraction: number): number {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const position = (sorted.length - 1) * fraction;
  const lower = Math.floor(position);
  const upper = Math.ceil(position);
  if (lower === upper) return sorted[lower];
  return sorted[lower] + (sorted[upper] - sorted[lower]) * (position - lower);
}

function makeSummary(rows: Array<Record<string, string | number | boolean>>, zeroInbound: string[], zeroSources: number, sitemapCount: number, terminated: string[]): string {
  const routeTypes = ['tool', 'guide', 'topic-hub', 'index', 'legal', 'home'];
  const locales = [...new Set(rows.map((row) => String(row.locale)))].sort();
  const matrix = locales.map((locale) => {
    const values = routeTypes.map((type) => rows.filter((row) => row.locale === locale && row.route_type === type).length);
    return `| ${locale} | ${values.join(' | ')} | ${values.reduce((sum, value) => sum + value, 0)} |`;
  });
  const clusters = [...new Set(rows.map((row) => String(row.cluster)))].sort().map((cluster) => `| ${cluster} | ${rows.filter((row) => row.cluster === cluster).length} |`);
  const wordCounts = rows.map((row) => Number(row.word_count)).filter(Number.isFinite);
  const zeroList = zeroInbound.length ? zeroInbound.map((url) => `- ${url}`).join('\n') : '- 無';
  return `# WorthCalc URL inventory summary — 2026-09-14

## Scope and method

- Source: the locally generated \`dist/sitemap-0.xml\`; exact sitemap URL count: **${sitemapCount}**.
- One row per URL in that child sitemap. Main-content text removes \`header\`, \`nav\`, \`footer\`, and \`aside\`; inbound/outbound counts use unique same-locale body targets and unique source pages respectively.
- Package IDs come from the built per-page OG image path and review metadata comes from content frontmatter. Topic values use the existing \`classifyTopic()\` implementation loaded through Vite. No package source files were regex-parsed.
- \`og_image_unique\` is true only when the built \`og:image\` is present, non-default, and used by one inventory URL.
- 125–130: **terminated / not admitted**. The local unpublished commit \`67c688f\` is not an ancestor of \`origin/main\`; no 125–130 entries are in the active main registry, so no unmerged page code was carried into this branch.

## Locale × route type

| Locale | tool | guide | topic-hub | index | legal | home | Total |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${matrix.join('\n')}

## Cluster counts

| Cluster | URLs |
| --- | ---: |
${clusters.join('\n')}

## Word-count distribution

| Percentile | Words |
| --- | ---: |
| P10 | ${percentile(wordCounts, 0.1).toFixed(1)} |
| P50 | ${percentile(wordCounts, 0.5).toFixed(1)} |
| P90 | ${percentile(wordCounts, 0.9).toFixed(1)} |

## Internal inbound links

\`internal_inbound_links=0\`: **${zeroInbound.length}** pages.

${zeroList}

## External source links

\`source_count=0\`: **${zeroSources}** pages.

## Terminated package list

${terminated.map((packageId) => `- SEO package ${packageId}: terminated 2026-09-14 per master plan; unpublished and absent from \`origin/main\` registry.`).join('\n')}
`;
}

const paths = sitemapPaths();
const vite = await createServer({ root: ROOT, appType: 'custom', logLevel: 'error', server: { middlewareMode: true } });
const { classifyTopic } = await vite.ssrLoadModule('/src/lib/topics.ts') as { classifyTopic: (path: string) => string };
const pages = pagesFromSitemap(paths, sourceMeta(), classifyTopic);
await vite.close();
const pageSet = new Set(pages.map((page) => page.path));
const inbound = new Map(pages.map((page) => [page.path, new Set<string>()]));
const ogUsage = new Map<string, number>();
for (const page of pages) {
  if (page.ogImage) ogUsage.set(page.ogImage, (ogUsage.get(page.ogImage) ?? 0) + 1);
  for (const target of new Set(page.internalTargets)) {
    if (!pageSet.has(target)) continue;
    const targetLocale = localeFor(target);
    if (targetLocale === page.locale) inbound.get(target)?.add(page.path);
  }
}

const history = historyMap();
const rows = pages.map((page) => {
  const historyRow = history.get(page.sourceFile);
  const uniqueOg = Boolean(page.ogImage) && !/og-default\.png$/i.test(page.ogImage) && (ogUsage.get(page.ogImage) ?? 0) === 1;
  const sameLocaleTargets = new Set(page.internalTargets.filter((target) => pageSet.has(target) && localeFor(target) === page.locale));
  const hasCalculator = page.routeType === 'tool' || /<(?:form|input|select|textarea)\b|calculator/i.test(page.bodyHtml);
  return {
    url: `${ORIGIN}${page.path}`,
    locale: page.locale,
    route_type: page.routeType,
    package_id: page.packageId,
    cluster: page.cluster,
    slug: page.slug,
    title: page.title,
    h1: page.h1,
    word_count: page.wordCount,
    internal_inbound_links: inbound.get(page.path)?.size ?? 0,
    internal_outbound_links: sameLocaleTargets.size,
    has_calculator: hasCalculator,
    source_count: new Set(page.externalLinks).size,
    last_reviewed: page.lastReviewed,
    og_image_unique: uniqueOg,
    first_commit_date: historyRow?.date ?? '無資料',
    first_pr: historyRow ? firstPr(historyRow.subject) : '無資料',
  };
});

mkdirSync(OUTPUT, { recursive: true });
const columns = ['url', 'locale', 'route_type', 'package_id', 'cluster', 'slug', 'title', 'h1', 'word_count', 'internal_inbound_links', 'internal_outbound_links', 'has_calculator', 'source_count', 'last_reviewed', 'og_image_unique', 'first_commit_date', 'first_pr'];
writeFileSync(join(OUTPUT, 'worthcalc-url-inventory-2026-09-14.csv'), [columns.join(','), ...rows.map((row) => columns.map((column) => csvCell(row[column as keyof typeof row])).join(','))].join('\n') + '\n', 'utf8');
const zeroInbound = rows.filter((row) => row.internal_inbound_links === 0).map((row) => row.url);
const zeroSources = rows.filter((row) => row.source_count === 0).length;
writeFileSync(join(OUTPUT, 'worthcalc-url-inventory-2026-09-14-summary.md'), makeSummary(rows, zeroInbound, zeroSources, paths.length, ['125', '126', '127', '128', '129', '130']), 'utf8');
console.log(JSON.stringify({ sitemapUrls: paths.length, inventoryRows: rows.length, zeroInbound: zeroInbound.length, zeroSources, output: OUTPUT }, null, 2));
