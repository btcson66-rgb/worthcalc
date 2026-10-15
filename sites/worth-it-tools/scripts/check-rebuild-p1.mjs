// Invariants of the 2026-10-15 SEO rebuild (work order P1-WC), checked against dist/.
//
// Why a dedicated script instead of leaning on the existing ~120 checks: those
// verify what earlier programmes shipped. This one pins what the rebuild
// promised, so a later PR cannot quietly undo it:
//
//   1. The sitemap holds `/` and zh pages only. No /en/, no /zh/ stub, no other locale.
//   2. Every /en/ page is noindex and names no hreflang alternate.
//   3. No FAQPage or HowTo structured data anywhere (Google retired the FAQ rich result 2026-06-15).
//   4. `/` is the Traditional Chinese homepage: lang zh-TW (site-wide since P1b), canonical `/`, indexable.
//   5. /zh/ is a redirect stub: noindex, canonical `/`, meta refresh, no ad loader, no hreflang.
//   6. Every indexable calculator/article page shows the "Benson Lai" byline linked to the
//      author page and a visible not-financial-advice notice.
//   7. No routes exist for the retired locales (es, fr, de, hi, ar).
//   8. Every link on the homepage's situation groups points to a sitemap page the
//      disposition audit marks `keep`.
//   9. The disposition CSV covers every sitemap page, with valid actions. Since P1b the CSV is also
//      the record of what was removed or merged: a `keep`/`rewrite` row must be a sitemap page and
//      every other row must not be (the stub / 404 checks live in check-rebuild-p1b.mjs).
//  10. deploy-worthcalc.yml has no `schedule` trigger, and no money brief dated after
//      2026-10-15 is publishable (they are `draft: true` until a human flips them).
//
// Usage: node scripts/check-rebuild-p1.mjs   (after `npm run build`)
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv } from './lib/csv.mjs';

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const repoRoot = dirname(dirname(projectRoot));
const distDir = join(projectRoot, 'dist');
const origin = 'https://worthcalc.win';
const csvPath = join(projectRoot, 'docs', 'audits', 'worthcalc-rebuild-p1-disposition-2026-10-15.csv');
const workflowPath = join(repoRoot, '.github', 'workflows', 'deploy-worthcalc.yml');
const briefsDir = join(projectRoot, 'src', 'content', 'money-briefs');
const REBUILD_DATE = '2026-10-15';
const RETIRED_LOCALES = ['es', 'fr', 'de', 'hi', 'ar'];
const LEGAL_SLUGS = new Set(['about', 'privacy', 'terms', 'contact', 'disclaimer', 'changelog']);
const ACTIONS = /^(keep|rewrite|remove|merge_into:https:\/\/worthcalc\.win\/\S*)$/;

const failures = [];
const fail = (message) => failures.push(message);

if (!existsSync(distDir)) {
  console.error('[rebuild-p1] dist/ does not exist. Build the site first.');
  process.exit(1);
}

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) files.push(...walk(full));
    else if (entry.endsWith('.html')) files.push(full);
  }
  return files;
}

const sitePathOf = (file) => `/${relative(distDir, file).split(sep).join('/')}`.replace(/index\.html$/, '');
const pages = new Map();
for (const file of walk(distDir)) pages.set(sitePathOf(file), readFileSync(file, 'utf8'));

const meta = (html, name) => html.match(new RegExp(`<meta\\s+name="${name}"\\s+content="([^"]*)"`, 'i'))?.[1] ?? '';
const canonicalOf = (html) => html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1] ?? '';
const hreflangsOf = (html) => [...html.matchAll(/<link\s+rel="alternate"\s+hreflang="([^"]+)"\s+href="([^"]+)"/gi)].map((m) => [m[1], m[2]]);
const jsonLdOf = (html) => [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].flatMap((m) => {
  try { return [JSON.parse(m[1])]; } catch { return []; }
});
function collectTypes(value, out = new Set()) {
  if (Array.isArray(value)) value.forEach((item) => collectTypes(item, out));
  else if (value && typeof value === 'object') {
    const type = value['@type'];
    for (const t of Array.isArray(type) ? type : type ? [type] : []) out.add(t);
    Object.values(value).forEach((child) => collectTypes(child, out));
  }
  return out;
}

// 1. sitemap
const sitemapFile = join(distDir, 'sitemap-0.xml');
const sitemapUrls = existsSync(sitemapFile)
  ? [...readFileSync(sitemapFile, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  : [];
if (sitemapUrls.length === 0) fail('sitemap-0.xml is missing or empty');
for (const url of sitemapUrls) {
  const path = url.replace(origin, '');
  if (path === '/zh/') fail(`sitemap lists the /zh/ redirect stub: ${url}`);
  else if (path !== '/' && !path.startsWith('/zh/')) fail(`sitemap lists a non-zh page: ${url}`);
}
if (!sitemapUrls.includes(`${origin}/`)) fail('sitemap does not list the homepage `/`');

// 2. English: noindex, no hreflang
let englishPages = 0;
for (const [path, html] of pages) {
  if (!path.startsWith('/en/')) continue;
  englishPages += 1;
  if (!/noindex/i.test(meta(html, 'robots'))) fail(`${path}: English page is indexable (robots="${meta(html, 'robots')}")`);
  if (hreflangsOf(html).length > 0) fail(`${path}: English page declares hreflang`);
  if (sitemapUrls.includes(`${origin}${path}`)) fail(`${path}: English page is in the sitemap`);
}
if (englishPages === 0) fail('no /en/ pages were built; the English homepage should still exist for human visitors');

// 3. no FAQPage / HowTo
let schemaBlocks = 0;
for (const [path, html] of pages) {
  const blocks = jsonLdOf(html);
  schemaBlocks += blocks.length;
  for (const type of collectTypes(blocks)) {
    if (type === 'FAQPage' || type === 'HowTo' || type === 'Question' || type === 'HowToStep') fail(`${path}: structured data contains ${type}`);
  }
}

// 4. homepage
const home = pages.get('/');
if (!home) fail('dist/index.html is missing');
else {
  if (!/<html lang="zh-TW"/.test(home)) fail('/: <html lang> is not zh-TW');
  if (canonicalOf(home) !== `${origin}/`) fail(`/: canonical is ${canonicalOf(home)}`);
  if (/noindex/i.test(meta(home, 'robots'))) fail('/: homepage is noindex');
  if (!home.includes('台灣人的金錢決策計算機')) fail('/: homepage does not carry the positioning line');
  if (/Transparent Calculators for Real Money Decisions/.test(home)) fail('/: homepage still carries the English headline');
  for (const [lang, href] of hreflangsOf(home)) {
    if (lang !== 'zh-TW' && lang !== 'x-default') fail(`/: unexpected hreflang ${lang}`);
    if (href !== `${origin}/`) fail(`/: hreflang ${lang} points at ${href}`);
  }
}

// 5. /zh/ stub
const stub = pages.get('/zh/');
if (!stub) fail('dist/zh/index.html (redirect stub) is missing');
else {
  if (!/noindex/i.test(meta(stub, 'robots'))) fail('/zh/: stub is not noindex');
  if (canonicalOf(stub) !== `${origin}/`) fail(`/zh/: stub canonical is ${canonicalOf(stub)}`);
  if (!/<meta http-equiv="refresh" content="0; url=\/"/.test(stub)) fail('/zh/: stub has no meta refresh to /');
  if (/adsbygoogle|googlesyndication/.test(stub)) fail('/zh/: stub loads the ad script');
  if (hreflangsOf(stub).length > 0) fail('/zh/: stub declares hreflang');
  if (jsonLdOf(stub).length > 0) fail('/zh/: stub carries structured data');
}

// 6. byline + disclaimer on indexable zh calculator/article pages
let bylineChecked = 0;
for (const url of sitemapUrls) {
  const path = url.replace(origin, '');
  if (!path.startsWith('/zh/')) continue;
  const html = pages.get(path);
  if (!html) { fail(`${path}: in the sitemap but not built`); continue; }
  const slug = path.split('/').filter(Boolean).at(-1);
  if (!html.includes('data-trust-block') || LEGAL_SLUGS.has(slug)) continue;
  bylineChecked += 1;
  const byline = html.match(/<div class="author-byline"[\s\S]*?<\/div>/)?.[0] ?? '';
  if (!byline) { fail(`${path}: no author byline`); continue; }
  if (!/<a href="\/zh\/about\/"[^>]*rel="author"[^>]*>Benson Lai<\/a>/.test(byline)) fail(`${path}: byline does not link Benson Lai to /zh/about/`);
  if (!/<time datetime="\d{4}-\d{2}-\d{2}"[^>]*>/.test(byline)) fail(`${path}: byline has no last-verified date`);
  if (!/data-ymyl-disclaimer/.test(byline) || !byline.includes('不構成財務建議')) fail(`${path}: no visible not-financial-advice notice`);
  const types = collectTypes(jsonLdOf(html));
  if (!types.has('Article') && !types.has('WebApplication')) fail(`${path}: no Article/WebApplication schema`);
}
for (const [path, html] of pages) {
  if (!path.startsWith('/zh/') || path === '/zh/') continue;
  for (const node of jsonLdOf(html).flatMap((block) => (Array.isArray(block) ? block : [block]))) {
    const authored = [node, ...(Array.isArray(node['@graph']) ? node['@graph'] : [])];
    for (const item of authored) {
      const type = item?.['@type'];
      const isAuthored = ['Article', 'WebApplication'].some((t) => type === t || (Array.isArray(type) && type.includes(t)));
      if (isAuthored && item.author?.['@type'] !== 'Person') fail(`${path}: ${type} author is not a Person`);
    }
  }
}
const aboutHtml = pages.get('/zh/about/') ?? '';
if (!/"@type":"ProfilePage"/.test(aboutHtml) || !aboutHtml.includes('Benson Lai')) fail('/zh/about/: author page is missing the ProfilePage / Benson Lai entity');
for (const forbidden of ['CFP', '會計師', '理財顧問資格', 'Certified', '證照持有', '碩士', '博士']) {
  // The author page may say it lists no credentials, but must never claim one.
  const claim = new RegExp(`Benson Lai[^。]{0,40}(?:是|為|具有|擁有|持有)[^。]{0,20}${forbidden}`);
  if (claim.test(aboutHtml)) fail(`/zh/about/: appears to claim a qualification (${forbidden})`);
}

// 7. retired locales
for (const locale of RETIRED_LOCALES) {
  if (existsSync(join(distDir, locale))) fail(`dist/${locale}/ exists; ${locale} is a retired locale and must have no routes`);
}

// 8 + 9. disposition CSV
const expectedColumns = ['url', 'type', 'title', 'taiwan_specific', 'has_official_source', 'source_examples', 'last_checked_date', 'gsc_impressions_28d', 'proposed_action', 'reason'];
const actionCounts = new Map();
if (!existsSync(csvPath)) fail(`missing ${relative(repoRoot, csvPath)}`);
else {
  const [header, ...body] = parseCsv(readFileSync(csvPath, 'utf8').replace(/^\uFEFF/, ''));
  if (header.join(',') !== expectedColumns.join(',')) fail(`CSV header is ${header.join(',')}`);
  const index = Object.fromEntries(expectedColumns.map((name, i) => [name, i]));
  const csvUrls = new Set();
  const keep = new Set();
  for (const row of body) {
    const url = row[index.url];
    if (csvUrls.has(url)) fail(`CSV lists ${url} twice`);
    csvUrls.add(url);
    const retiredByP1b = row[index.proposed_action] === 'remove' || row[index.proposed_action].startsWith('merge_into:');
    if (retiredByP1b && sitemapUrls.includes(url)) fail(`CSV ${url}: marked ${row[index.proposed_action]} but still in the sitemap`);
    if (!retiredByP1b && !sitemapUrls.includes(url)) fail(`CSV row is not in the sitemap: ${url}`);
    if (!/^(tool|article|brief|hub|legal)$/.test(row[index.type])) fail(`CSV ${url}: bad type "${row[index.type]}"`);
    if (!/^(yes|partial|no)$/.test(row[index.taiwan_specific])) fail(`CSV ${url}: bad taiwan_specific "${row[index.taiwan_specific]}"`);
    if (!/^(yes|no)$/.test(row[index.has_official_source])) fail(`CSV ${url}: bad has_official_source "${row[index.has_official_source]}"`);
    if (row[index.last_checked_date] && !/^\d{4}-\d{2}-\d{2}$/.test(row[index.last_checked_date])) fail(`CSV ${url}: bad last_checked_date`);
    if (row[index.gsc_impressions_28d] && !/^\d+$/.test(row[index.gsc_impressions_28d])) fail(`CSV ${url}: bad gsc_impressions_28d`);
    const action = row[index.proposed_action];
    if (!ACTIONS.test(action)) fail(`CSV ${url}: bad proposed_action "${action}"`);
    if (!row[index.reason]) fail(`CSV ${url}: empty reason`);
    const kind = action.startsWith('merge_into:') ? 'merge_into' : action;
    actionCounts.set(kind, (actionCounts.get(kind) ?? 0) + 1);
    if (action === 'keep') keep.add(url);
    if (action.startsWith('merge_into:')) {
      const target = action.slice('merge_into:'.length);
      if (!sitemapUrls.includes(target)) fail(`CSV ${url}: merge target is not a sitemap page: ${target}`);
      if (target === url) fail(`CSV ${url}: merges into itself`);
    }
  }
  for (const url of sitemapUrls) if (!csvUrls.has(url)) fail(`sitemap page has no CSV row: ${url}`);
  // A page cannot be merged into a page that is itself going away.
  const actionOf = new Map(body.map((row) => [row[index.url], row[index.proposed_action]]));
  for (const [url, action] of actionOf) {
    if (!action.startsWith('merge_into:')) continue;
    const targetAction = actionOf.get(action.slice('merge_into:'.length));
    if (targetAction === 'remove' || targetAction?.startsWith('merge_into:')) fail(`CSV ${url}: merge target is itself ${targetAction}`);
  }

  if (home) {
    const groups = home.match(/<section class="home-situations"[\s\S]*?<\/section>\s*<section class="home-library"/)?.[0] ?? '';
    const hrefs = [...groups.matchAll(/<h4[^>]*><a href="([^"]+)"/g)].map((m) => m[1]);
    if (hrefs.length === 0) fail('/: could not find any situation-group links');
    for (const href of hrefs) {
      const url = `${origin}${href}`;
      if (!sitemapUrls.includes(url)) fail(`/: homepage links to a page that is not in the sitemap: ${href}`);
      else if (!keep.has(url)) fail(`/: homepage links to a page the disposition audit does not mark keep: ${href}`);
    }
  }
}

// 10a. workflow has no schedule trigger
if (!existsSync(workflowPath)) fail(`missing ${relative(repoRoot, workflowPath)}`);
else {
  const workflow = readFileSync(workflowPath, 'utf8');
  const onBlock = workflow.split(/\n(?=\S)/).find((block) => block.startsWith('on:')) ?? '';
  const uncommented = onBlock.split('\n').filter((line) => !line.trim().startsWith('#')).join('\n');
  if (/^\s*schedule:/m.test(uncommented) || /\bcron:/.test(uncommented)) fail('deploy-worthcalc.yml still has a schedule trigger');
  if (!/^\s*push:/m.test(uncommented) || !/^\s*workflow_dispatch:/m.test(uncommented)) fail('deploy-worthcalc.yml must keep push and workflow_dispatch');
}

// 10b. future briefs are drafts
function markdownFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return markdownFiles(full);
    return entry.name.endsWith('.md') ? [full] : [];
  });
}
let futureBriefs = 0;
for (const file of markdownFiles(briefsDir)) {
  const source = readFileSync(file, 'utf8');
  const publishAt = source.match(/^publishAt:\s*["']?(\d{4}-\d{2}-\d{2})/m)?.[1];
  const draft = /^draft:\s*true\s*$/m.test(source);
  if (publishAt && publishAt > REBUILD_DATE) {
    futureBriefs += 1;
    if (!draft) fail(`${relative(projectRoot, file)}: publishAt ${publishAt} is after ${REBUILD_DATE} but the brief is not draft: true`);
  }
}

if (failures.length > 0) {
  console.error(`[rebuild-p1] FAIL (${failures.length})`);
  failures.slice(0, 40).forEach((message) => console.error(`  - ${message}`));
  if (failures.length > 40) console.error(`  ... ${failures.length - 40} more`);
  process.exit(1);
}

const summary = [...actionCounts].map(([action, count]) => `${action}=${count}`).join(' ');
console.log(
  `[rebuild-p1] PASS — sitemap ${sitemapUrls.length} URLs (/ + zh only); ${englishPages} English pages all noindex without hreflang; ` +
    `${schemaBlocks} JSON-LD blocks, no FAQPage/HowTo; homepage zh-TW; /zh/ stub OK; ` +
    `byline+notice on ${bylineChecked} calculator/article pages; no retired-locale routes; ` +
    `disposition ${summary}; ${futureBriefs} future-dated briefs are draft; no workflow schedule`,
);
