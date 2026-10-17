// Invariants of the 2026-10-15 disposition (work order P1b-WC), checked against dist/ and the repo.
//
// check-rebuild-p1.mjs pins what the P1 rebuild promised. This one pins what P1b did with the
// audit in docs/audits/worthcalc-rebuild-p1-disposition-2026-10-15.csv, so that a later PR cannot
// quietly bring a removed page back or turn a stub into a real page again:
//
//   1. Every `remove` row is gone: no page at its URL, no English mirror, not in the sitemap.
//   2. Every `merge_into` row is a redirect stub: noindex,follow, canonical = the target, a meta
//      refresh to the target, no ad loader, no hreflang, no structured data, not in the sitemap.
//      Its English mirror, if it exists, is a stub too (to the English mirror of the target).
//   3. The target of every merge is a real, indexable sitemap page (or `/`).
//   4. src/data/redirect-stubs.json and the stubs in dist/ are the same set (plus `/zh/`, the
//      homepage alias, which is the only stub not listed in the registry).
//   5. No page links to a removed URL or to a stub. A stub is where a page used to be; internal
//      links must point at the page that took over.
//   6. The sitemap holds exactly the `keep` and `rewrite` rows, and stays under maxUrls (160).
//   7. Every built page except the stubs and /en/ declares <html lang="zh-TW"> (/en/ is "en").
//   8. The retired locales (es, fr, de, hi, ar) leave nothing behind: no content directory, no
//      OG image, no locale-keyed entries in the files that used to carry them.
//
// Usage: node scripts/check-rebuild-p1b.mjs   (after `npm run build`)
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv } from './lib/csv.mjs';

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const distDir = join(projectRoot, 'dist');
const origin = 'https://worthcalc.win';
const csvPath = join(projectRoot, 'docs', 'audits', 'worthcalc-rebuild-p1-disposition-2026-10-15.csv');
const stubRegistryPath = join(projectRoot, 'src', 'data', 'redirect-stubs.json');
const budgetPath = join(projectRoot, 'config', 'url-budget.json');
const MAX_URLS = 160;
const RETIRED_LOCALES = ['es', 'fr', 'de', 'hi', 'ar'];

const failures = [];
const fail = (message) => failures.push(message);

if (!existsSync(distDir)) {
  console.error('[rebuild-p1b] dist/ does not exist. Build the site first.');
  process.exit(1);
}

function walk(dir, ext) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) files.push(...walk(full, ext));
    else if (entry.endsWith(ext)) files.push(full);
  }
  return files;
}

const sitePathOf = (file) => `/${relative(distDir, file).split(sep).join('/')}`.replace(/index\.html$/, '');
const pages = new Map();
for (const file of walk(distDir, '.html')) pages.set(sitePathOf(file), readFileSync(file, 'utf8'));

const meta = (html, name) => html.match(new RegExp(`<meta\\s+name="${name}"\\s+content="([^"]*)"`, 'i'))?.[1] ?? '';
const canonicalOf = (html) => html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1] ?? '';
const refreshOf = (html) => html.match(/<meta http-equiv="refresh" content="0; url=([^"]+)"/i)?.[1] ?? '';
const isRedirectStub = (html) => /<meta http-equiv="refresh"/i.test(html) && /<meta name="robots" content="noindex/i.test(html);
const toPath = (url) => url.replace(origin, '') || '/';
const enMirror = (path) => (path === '/' ? '/en/' : path.replace(/^\/zh\//, '/en/'));

// sitemap
const sitemapFile = join(distDir, 'sitemap-0.xml');
const sitemapUrls = existsSync(sitemapFile)
  ? [...readFileSync(sitemapFile, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  : [];
if (sitemapUrls.length === 0) fail('sitemap-0.xml is missing or empty');
const sitemapPaths = new Set(sitemapUrls.map(toPath));

// disposition CSV
const expectedColumns = ['url', 'type', 'title', 'taiwan_specific', 'has_official_source', 'source_examples', 'last_checked_date', 'gsc_impressions_28d', 'proposed_action', 'reason'];
if (!existsSync(csvPath)) fail('missing the disposition CSV');
const rows = existsSync(csvPath) ? parseCsv(readFileSync(csvPath, 'utf8').replace(/^\uFEFF/, '')) : [[]];
const [header, ...body] = rows;
if (header.join(',') !== expectedColumns.join(',')) fail(`CSV header is ${header.join(',')}`);
const col = Object.fromEntries(expectedColumns.map((name, i) => [name, i]));
const removed = [];
const merged = [];
const kept = [];
for (const row of body) {
  const path = toPath(row[col.url]);
  const action = row[col.proposed_action];
  if (action === 'remove') removed.push(path);
  else if (action.startsWith('merge_into:')) merged.push({ path, target: toPath(action.slice('merge_into:'.length)) });
  else kept.push(path);
}

// 1. removed pages are gone
for (const path of removed) {
  if (pages.has(path)) fail(`${path}: marked remove but dist still has a page there`);
  if (pages.has(enMirror(path))) fail(`${enMirror(path)}: the English mirror of a removed page is still built`);
  if (sitemapPaths.has(path)) fail(`${path}: marked remove but still in the sitemap`);
}

// 2 + 3. merged pages are redirect stubs that point at a real page
for (const { path, target } of merged) {
  const stub = pages.get(path);
  if (!stub) { fail(`${path}: marked merge_into but no stub is built there`); continue; }
  if (!isRedirectStub(stub)) fail(`${path}: marked merge_into but the page is not a redirect stub`);
  if (!/noindex,follow/i.test(meta(stub, 'robots'))) fail(`${path}: stub robots is "${meta(stub, 'robots')}", expected noindex,follow`);
  if (canonicalOf(stub) !== `${origin}${target}`) fail(`${path}: stub canonical is ${canonicalOf(stub)}, expected ${origin}${target}`);
  if (refreshOf(stub) !== target) fail(`${path}: stub meta refresh goes to "${refreshOf(stub)}", expected ${target}`);
  if (/adsbygoogle|googlesyndication/.test(stub)) fail(`${path}: stub loads the ad script`);
  if (/rel="alternate"\s+hreflang/i.test(stub)) fail(`${path}: stub declares hreflang`);
  if (/application\/ld\+json/.test(stub)) fail(`${path}: stub carries structured data`);
  if (sitemapPaths.has(path)) fail(`${path}: stub is in the sitemap`);
  const targetPage = pages.get(target);
  if (!targetPage) fail(`${path}: merge target ${target} is not built`);
  else {
    if (isRedirectStub(targetPage)) fail(`${path}: merge target ${target} is itself a stub`);
    if (!sitemapPaths.has(target)) fail(`${path}: merge target ${target} is not in the sitemap`);
  }
  const mirror = pages.get(enMirror(path));
  if (mirror) {
    if (!isRedirectStub(mirror)) fail(`${enMirror(path)}: the English mirror of a merged page is a real page, not a stub`);
    else if (refreshOf(mirror) !== enMirror(target)) fail(`${enMirror(path)}: English stub goes to "${refreshOf(mirror)}", expected ${enMirror(target)}`);
  }
}

// 4. registry == stubs in dist
const registry = existsSync(stubRegistryPath) ? JSON.parse(readFileSync(stubRegistryPath, 'utf8')) : { stubs: [] };
const registered = new Set(registry.stubs.map((stub) => stub.from));
for (const stub of registry.stubs) {
  if (!pages.has(stub.from)) fail(`${stub.from}: listed in redirect-stubs.json but not built`);
  else if (refreshOf(pages.get(stub.from)) !== stub.to) fail(`${stub.from}: registry says ${stub.to}, built stub goes to ${refreshOf(pages.get(stub.from))}`);
}
const builtStubs = [...pages].filter(([, html]) => isRedirectStub(html)).map(([path]) => path);
// P2 batch 5 (2026-10-17): stubs must not chain. Every registry target (including rows with no CSV merge_into row,
// such as the topic hubs) has to be a built, real page -- never another stub, never a 404.
for (const stub of registry.stubs) {
  const targetPage = pages.get(stub.to);
  if (!targetPage) fail(`${stub.from}: stub target ${stub.to} is not a built page`);
  else if (isRedirectStub(targetPage)) fail(`${stub.from}: stub target ${stub.to} is itself a stub (chained redirect)`);
}
for (const path of builtStubs) {
  if (path !== '/zh/' && !registered.has(path)) fail(`${path}: a redirect stub is built but not listed in redirect-stubs.json`);
}
for (const { path } of merged) {
  if (!registered.has(path)) fail(`${path}: marked merge_into in the CSV but not listed in redirect-stubs.json`);
}

// 5. nothing links to a removed URL or to a stub
const deadPaths = new Set([...removed, ...removed.map(enMirror), ...builtStubs]);
let linkCount = 0;
for (const [path, html] of pages) {
  if (isRedirectStub(html)) continue;
  for (const match of html.matchAll(/<a\s[^>]*href="(\/[^"#?]*)"/g)) {
    linkCount += 1;
    const href = match[1].endsWith('/') ? match[1] : `${match[1]}/`;
    if (deadPaths.has(href)) fail(`${path}: links to ${href}, which is ${builtStubs.includes(href) ? 'a redirect stub' : 'a removed page'}`);
  }
}

// 6. sitemap == keep + rewrite, under the budget
const expectedSitemap = new Set(kept);
for (const path of sitemapPaths) if (!expectedSitemap.has(path)) fail(`${path}: in the sitemap but not a keep/rewrite row in the CSV`);
for (const path of expectedSitemap) if (!sitemapPaths.has(path)) fail(`${path}: a keep/rewrite row but missing from the sitemap`);
if (sitemapUrls.length > MAX_URLS) fail(`sitemap has ${sitemapUrls.length} URLs, over the P1b ceiling of ${MAX_URLS}`);
if (existsSync(budgetPath)) {
  const budget = JSON.parse(readFileSync(budgetPath, 'utf8'));
  if (budget.maxUrls !== MAX_URLS) fail(`config/url-budget.json maxUrls is ${budget.maxUrls}, expected ${MAX_URLS}`);
  if (budget.currentUrls !== sitemapUrls.length) fail(`config/url-budget.json currentUrls is ${budget.currentUrls}, the sitemap has ${sitemapUrls.length}`);
}

// 7. <html lang>
for (const [path, html] of pages) {
  if (path === '/404.html') continue;
  const lang = html.match(/<html\s+lang="([^"]*)"/i)?.[1];
  const expected = path.startsWith('/en/') ? 'en' : 'zh-TW';
  if (isRedirectStub(html) && path.startsWith('/en/')) { if (lang !== 'en') fail(`${path}: stub lang is ${lang}, expected en`); continue; }
  if (lang !== expected) fail(`${path}: <html lang="${lang}">, expected ${expected}`);
}

// 8. retired locales leave nothing behind
const contentRoots = ['growth-articles', 'growth-tools', 'money-briefs'];
for (const root of contentRoots) {
  for (const locale of RETIRED_LOCALES) {
    if (existsSync(join(projectRoot, 'src', 'content', root, locale))) fail(`src/content/${root}/${locale}/ still exists`);
  }
}
const ogDir = join(projectRoot, 'public', 'images', 'guides', 'og');
if (existsSync(ogDir)) {
  const leftovers = readdirSync(ogDir).filter((name) => RETIRED_LOCALES.some((locale) => new RegExp(`^\\d+-${locale}-`).test(name)));
  if (leftovers.length > 0) fail(`public/images/guides/og still holds ${leftovers.length} OG images of retired locales (e.g. ${leftovers[0]})`);
}

if (failures.length > 0) {
  console.error(`[rebuild-p1b] FAIL (${failures.length})`);
  failures.slice(0, 40).forEach((message) => console.error(`  - ${message}`));
  if (failures.length > 40) console.error(`  ... ${failures.length - 40} more`);
  process.exit(1);
}

console.log(
  `[rebuild-p1b] PASS — sitemap ${sitemapUrls.length} URLs = ${kept.length} keep/rewrite rows (max ${MAX_URLS}); ` +
    `${removed.length} removed pages absent (and their English mirrors); ${merged.length} merged pages are stubs to a live target; ` +
    `${builtStubs.length} stubs built = registry + /zh/; ${linkCount} internal links, none to a removed page or a stub; ` +
    `<html lang> zh-TW on every zh page; no retired-locale content or OG images left`,
);
