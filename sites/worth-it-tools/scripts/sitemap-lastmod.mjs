import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const pagesRoot = join(projectRoot, 'src', 'pages');
const locales = new Set(['en', 'zh', 'es', 'fr', 'de', 'hi', 'ar']);
const dateFields = ['updated', 'lastUpdated', 'lastReviewed', 'published', 'pubDate', 'date'];

function normalizeRoute(value) {
  const pathname = new URL(value, 'https://worthcalc.win').pathname;
  return pathname === '/' ? '/' : `${pathname.replace(/^\/+|\/+$/g, '')}/`;
}

function frontmatterValue(markdown, field) {
  const frontmatter = markdown.match(/^\uFEFF?---\s*\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1] ?? '';
  const match = frontmatter.match(new RegExp(`^${field}:\\s*["']?([^"'\\s#]+)`, 'm'));
  return match?.[1] ?? null;
}

function validDate(value) {
  if (!value) return null;
  const match = String(value).match(/^(\d{4}-\d{2}-\d{2})/);
  if (!match || Number.isNaN(Date.parse(`${match[1]}T00:00:00Z`))) return null;
  return match[1];
}

function markdownFiles(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return markdownFiles(path);
    return entry.isFile() && entry.name.endsWith('.md') ? [path] : [];
  });
}

function contentRouteLookup() {
  const lookup = new Map();
  const collections = [
    { directory: join(projectRoot, 'src', 'content', 'growth-tools'), slugField: 'toolSlug', prefix: 'tools/' },
    { directory: join(projectRoot, 'src', 'content', 'growth-articles'), slugField: 'articleSlug', prefix: '' },
  ];

  for (const collection of collections) {
    for (const sourceFile of markdownFiles(collection.directory)) {
      const markdown = readFileSync(sourceFile, 'utf8');
      const locale = frontmatterValue(markdown, 'locale');
      const slug = frontmatterValue(markdown, collection.slugField);
      const canonical = frontmatterValue(markdown, 'canonical');
      const draft = frontmatterValue(markdown, 'draft');
      if (!locales.has(locale) || !slug || draft === 'true') continue;
      const contentDate = dateFields.map((field) => validDate(frontmatterValue(markdown, field))).find(Boolean);
      if (canonical) lookup.set(normalizeRoute(canonical), { sourceFile, contentDate });
      lookup.set(normalizeRoute(`/${locale}/${collection.prefix}${slug}/`), { sourceFile, contentDate });
    }
  }
  return lookup;
}

function sourceFileForRoute(route, contentLookup) {
  const content = contentLookup.get(route);
  if (content) return content;
  if (route === '/') return { sourceFile: join(pagesRoot, 'index.astro'), contentDate: null };

  const parts = route.split('/').filter(Boolean);
  const locale = parts.shift();
  if (!locales.has(locale)) return null;
  const relativeRoute = parts.join('/');
  const explicitPage = join(pagesRoot, locale, relativeRoute ? `${relativeRoute}.astro` : 'index.astro');
  if (existsSync(explicitPage)) return { sourceFile: explicitPage, contentDate: null };

  const localePage = join(pagesRoot, '[locale]', relativeRoute ? `${relativeRoute}.astro` : 'index.astro');
  if (existsSync(localePage)) return { sourceFile: localePage, contentDate: null };

  // These two catch-all routes render their content from the named data files.
  // Prefer those content sources over a single generic wrapper for every URL.
  if (parts[0] === 'tools' && parts.length === 2) {
    return { sourceFile: join(projectRoot, 'src', 'data', 'coreToolContent.ts'), contentDate: null };
  }
  if (parts.length === 1) {
    return { sourceFile: join(projectRoot, 'src', 'data', 'legalContent.ts'), contentDate: null };
  }
  return null;
}

function repoRoot() {
  return execFileSync('git', ['rev-parse', '--show-toplevel'], {
    cwd: projectRoot,
    encoding: 'utf8',
    windowsHide: true,
  }).trim();
}

function gitAuthorDate(sourceFile, root) {
  const repoPath = relative(root, sourceFile).split(sep).join('/');
  const output = execFileSync(
    'git',
    ['log', '-1', '--format=%ad', '--date=format:%Y-%m-%d', '--', repoPath],
    { cwd: root, encoding: 'utf8', windowsHide: true },
  ).trim();
  return validDate(output);
}

export function createSitemapLastmodResolver() {
  const root = repoRoot();
  const contentLookup = contentRouteLookup();
  const sourceDates = new Map();
  const routeLookup = new Map();

  return (url) => {
    const route = normalizeRoute(url);
    if (routeLookup.has(route)) return routeLookup.get(route);
    const source = sourceFileForRoute(route, contentLookup);
    if (!source?.sourceFile || !existsSync(source.sourceFile)) {
      throw new Error(`No verified source-file mapping for sitemap route ${route}`);
    }

    let signal = 'frontmatter';
    let lastmod = source.contentDate;
    if (!lastmod) {
      signal = 'git-author-date';
      if (!sourceDates.has(source.sourceFile)) {
        sourceDates.set(source.sourceFile, gitAuthorDate(source.sourceFile, root));
      }
      lastmod = sourceDates.get(source.sourceFile);
    }
    if (!lastmod) {
      signal = 'source-mtime-fallback';
      lastmod = statSync(source.sourceFile).mtime.toISOString().slice(0, 10);
      console.warn(`[sitemap:lastmod] mtime fallback: ${route} <- ${relative(projectRoot, source.sourceFile)}`);
    }

    const resolved = {
      lastmod,
      route,
      signal,
      sourceFile: relative(projectRoot, source.sourceFile).split(sep).join('/'),
    };
    routeLookup.set(route, resolved);
    return resolved;
  };
}
