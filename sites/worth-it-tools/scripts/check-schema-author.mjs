import { readdir, readFile } from 'node:fs/promises';
import { join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteDir = fileURLToPath(new URL('..', import.meta.url));
const distDir = resolve(siteDir, 'dist');
const siteOrigin = 'https://worthcalc.win';
const allowedSameAsHosts = new Set(['funnytools.win', 'roomfeng.win']);
// SEO rebuild P1 (2026-10-15): the author of every Article and WebApplication is
// a named Person. Until then this check enforced the opposite (an Organization,
// and it failed on a Person). The owner chose the name and authorised it on
// 2026-10-15. The Person node may carry ONLY these keys: no jobTitle, no
// credential, no sameAs, no worksFor, because none has been supplied and an
// invented qualification on a money page is worse than none.
const AUTHOR_NAME = 'Benson Lai';
const PERSON_ALLOWED_KEYS = new Set(['@type', '@id', 'name', 'url']);
const legalSlugs = new Set(['privacy', 'terms', 'contact', 'disclaimer', 'changelog']);
const contentLocales = new Set(['en', 'zh', 'es', 'fr', 'de', 'hi', 'ar']);
const failures = [];
const htmlFiles = [];
let authorObjects = 0;
let schemaBlocks = 0;
const sampleFiles = new Set();
const stats = new Map();
const reverseMode = process.env.SCHEMA_AUTHOR_REVERSE_MODE ?? '';
const reversePath = process.env.SCHEMA_AUTHOR_REVERSE_PATH ?? '/zh/tools/commute-cost/';
let reverseApplied = false;

if (reverseMode && !new Set(['missing', 'organization', 'credential']).has(reverseMode)) {
  throw new Error('SCHEMA_AUTHOR_REVERSE_MODE must be missing, organization or credential');
}

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (entry.isFile() && entry.name.endsWith('.html')) htmlFiles.push(path);
  }
}

function decodeHtml(value) {
  return value
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

function routePath(file) {
  const rel = relative(distDir, file).split(sep).join('/');
  if (rel === 'index.html') return '/';
  return `/${rel.replace(/index\.html$/, '')}`;
}

function localeForPath(pathname) {
  const locale = pathname.split('/').filter(Boolean)[0];
  return contentLocales.has(locale) ? locale : null;
}

function slugForPath(pathname) {
  return pathname.split('/').filter(Boolean).at(-1) ?? '';
}

function typeIncludes(value, type) {
  const candidate = value?.['@type'];
  return candidate === type || (Array.isArray(candidate) && candidate.includes(type));
}

function isAuthoredType(value) {
  return typeIncludes(value, 'Article') || typeIncludes(value, 'SoftwareApplication') || typeIncludes(value, 'WebApplication');
}

function collectTypedNodes(value, result = []) {
  if (Array.isArray(value)) {
    value.forEach((item) => collectTypedNodes(item, result));
  } else if (value && typeof value === 'object') {
    if (isAuthoredType(value)) result.push(value);
    Object.values(value).forEach((child) => collectTypedNodes(child, result));
  }
  return result;
}

function pageRouteType(nodes) {
  if (nodes.some((node) => typeIncludes(node, 'SoftwareApplication') || typeIncludes(node, 'WebApplication'))) return 'tool';
  if (nodes.some((node) => typeIncludes(node, 'Article'))) return 'article';
  return 'other';
}

function shouldRequireAuthor(pathname, routeType, robots) {
  return !/noindex/i.test(robots) && !legalSlugs.has(slugForPath(pathname)) && (routeType === 'tool' || routeType === 'article');
}

function reverseMutate(value, pathname) {
  if (!reverseMode || pathname !== reversePath || !value || typeof value !== 'object') return;
  if (Array.isArray(value)) {
    value.forEach((item) => reverseMutate(item, pathname));
    return;
  }
  if (isAuthoredType(value)) {
    reverseApplied = true;
    if (reverseMode === 'missing') delete value.author;
    if (reverseMode === 'organization' && value.author && typeof value.author === 'object') value.author['@type'] = 'Organization';
    if (reverseMode === 'credential' && value.author && typeof value.author === 'object') value.author.jobTitle = 'Certified Financial Planner';
  }
  Object.values(value).forEach((child) => reverseMutate(child, pathname));
}

function addFailure(file, message) {
  failures.push(relative(siteDir, file) + ': ' + message);
}

function visit(value, file, pathname, path = '$') {
  if (Array.isArray(value)) {
    value.forEach((item, index) => visit(item, file, pathname, path + '[' + index + ']'));
    return;
  }
  if (!value || typeof value !== 'object') return;

  for (const [key, child] of Object.entries(value)) {
    if (key === 'author') {
      authorObjects += 1;
      if (!child || typeof child !== 'object' || Array.isArray(child)) {
        addFailure(file, path + '.author is not an object');
      } else {
        const author = child;
        if (author['@type'] !== 'Person') addFailure(file, path + '.author is not a Person');
        if (author.name !== AUTHOR_NAME) addFailure(file, path + '.author.name is not ' + AUTHOR_NAME);
        const locale = localeForPath(pathname);
        if (locale && author.url !== `${siteOrigin}/${locale}/about/`) addFailure(file, path + '.author.url is not the locale author page');
        if (locale && author['@id'] !== `${siteOrigin}/${locale}/about/#benson-lai`) addFailure(file, path + '.author.@id is not the locale author id');
        for (const authorKey of Object.keys(author)) {
          if (!PERSON_ALLOWED_KEYS.has(authorKey)) addFailure(file, path + '.author.' + authorKey + ' is not allowed (only verifiable facts: name and url)');
        }
        if (author['@type'] === 'Person' && author.name === AUTHOR_NAME && sampleFiles.size < 10) {
          sampleFiles.add(relative(siteDir, file));
        }
      }
    }
    // A publisher that carries its own @type must be the one Organization; a bare
    // {"@id": ...} reference to it (used by the homepage) is fine.
    if (key === 'publisher' && child && typeof child === 'object' && !Array.isArray(child) && child['@type']) {
      if (child['@type'] !== 'Organization' || child.name !== 'Btcson Lab') addFailure(file, path + '.publisher is not the Btcson Lab Organization');
    }
    if (key === 'sameAs') {
      if (!Array.isArray(child)) {
        addFailure(file, path + '.sameAs is not an array');
      } else {
        for (const sameAs of child) {
          try {
            const host = new URL(String(sameAs)).hostname.toLowerCase().replace(/^www\./, '');
            if (!allowedSameAsHosts.has(host)) addFailure(file, path + '.sameAs contains ' + sameAs);
          } catch {
            addFailure(file, path + '.sameAs contains an invalid URL');
          }
        }
      }
    }
    visit(child, file, pathname, path + '.' + key);
  }
}

await walk(distDir);
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const pathname = routePath(file);
  const robotsTag = html.match(/<meta\b[^>]*name=["']robots["'][^>]*>/i)?.[0] ?? '';
  const robots = robotsTag.match(/content=["']([^"']*)["']/i)?.[1] ?? '';
  const locale = localeForPath(pathname) ?? 'root';
  const matches = html.matchAll(/<script\b[^>]*type=(?:"application\/ld\+json"|'application\/ld\+json')[^>]*>([\s\S]*?)<\/script>/gi);
  const pageNodes = [];
  for (const match of matches) {
    schemaBlocks += 1;
    try {
      const parsed = JSON.parse(decodeHtml(match[1].trim()));
      reverseMutate(parsed, pathname);
      pageNodes.push(...collectTypedNodes(parsed));
      visit(parsed, file, pathname);
    } catch (error) {
      addFailure(file, 'invalid JSON-LD: ' + error.message);
    }
  }

  const routeType = pageRouteType(pageNodes);
  const required = shouldRequireAuthor(pathname, routeType, robots);
  const key = routeType + '|' + locale;
  const group = stats.get(key) ?? { pages: 0, required: 0, missing: 0 };
  group.pages += 1;
  if (required) {
    group.required += pageNodes.length;
    for (const node of pageNodes) {
      if (!Object.prototype.hasOwnProperty.call(node, 'author')) {
        group.missing += 1;
        addFailure(file, pathname + ' ' + routeType + '.author is missing');
      }
    }
  }
  stats.set(key, group);
}

if (reverseMode && !reverseApplied) {
  failures.push(reversePath + ': reverse target was not found in an Article or SoftwareApplication schema');
}

if (failures.length > 0) {
  console.error('[schema-author] FAIL');
  failures.slice(0, 20).forEach((failure) => console.error('  ' + failure));
  if (failures.length > 20) console.error('  ... ' + (failures.length - 20) + ' more');
  process.exit(1);
}

const requiredPages = [...stats.values()].reduce((sum, group) => sum + group.required, 0);
console.log('[schema-author] PASS — ' + htmlFiles.length + ' HTML files, ' + schemaBlocks + ' JSON-LD blocks, ' + authorObjects + ' author objects; required coverage ' + requiredPages + '/' + requiredPages + '; Person author (Benson Lai, name+url only), Organization publisher, sameAs rules PASS');
console.log('[schema-author] coverage by route_type|locale');
for (const [key, group] of [...stats].sort()) console.log('  ' + key + ' pages=' + group.pages + ' required=' + group.required + ' missing=' + group.missing);
console.log('[schema-author] sample 10 — author @type Person; name ' + AUTHOR_NAME);
for (const file of sampleFiles) console.log('  ' + file);
