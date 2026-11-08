/*
 * check:money-bridge
 *
 * Google had indexed the home page, the /zh/tools/* calculators and two guides
 * but none of the /zh/money/* briefs. A page Google has never crawled can only
 * be discovered through static <a href> links on pages it already knows, so this
 * check parses dist/ and asserts that EVERY /zh/money/<slug>/ page receives at
 * least MIN_INBOUND (2) links from the "PASS set" of already-indexed pages.
 *
 * PASS set = `/`, every /zh/tools/<slug>/ page (not the /zh/tools/ hub), and the
 * two indexed guides. Hub pages (/zh/money/, /zh/tools/) and sibling money
 * pages do not count: the point is links FROM pages Google already knows.
 *
 * Usage: node scripts/check-money-spider-bridge.mjs [--matrix] [--dist <dir>]
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const args = process.argv.slice(2);
const matrix = args.includes('--matrix');
const distArg = args.indexOf('--dist');
const distDir = resolve(distArg >= 0 ? args[distArg + 1] : 'dist');
const MIN_INBOUND = 2;
const GUIDES = ['/zh/how-to-calculate-dti/', '/zh/true-cost-of-car-ownership/'];

if (!existsSync(distDir)) {
  console.error('dist/ does not exist. Build the site first.');
  process.exit(1);
}

const dirs = (p) => (existsSync(p) ? readdirSync(p).filter((n) => statSync(join(p, n)).isDirectory()) : []);
// noindex pages (the two redirect stubs left by merged briefs) are deliberately
// not linkable targets: they are excluded rather than "fixed".
const isIndexable = (file) => !/<meta name="robots" content="[^"]*noindex/i.test(readFileSync(file, 'utf8'));
const moneySlugs = dirs(join(distDir, 'zh', 'money')).filter((s) => {
  const f = join(distDir, 'zh', 'money', s, 'index.html');
  return existsSync(f) && isIndexable(f);
});
const toolSlugs = dirs(join(distDir, 'zh', 'tools')).filter((s) => existsSync(join(distDir, 'zh', 'tools', s, 'index.html')));

const passPages = ['/', ...toolSlugs.map((s) => `/zh/tools/${s}/`), ...GUIDES];
const moneyUrl = (s) => `/zh/money/${s}/`;
const inbound = new Map(moneySlugs.map((s) => [s, new Set()]));
const problems = [];

for (const page of passPages) {
  const file = page === '/' ? join(distDir, 'index.html') : join(distDir, page, 'index.html');
  if (!existsSync(file)) {
    problems.push(`PASS page missing from dist: ${page}`);
    continue;
  }
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(/<a\b[^>]*?\bhref=(["'])(.*?)\1/gi)) {
    let href = m[2].split('#')[0].split('?')[0].replace(/^https:\/\/worthcalc\.win/, '');
    if (!href.endsWith('/')) href += '/';
    const m2 = href.match(/^\/zh\/money\/([^/]+)\/$/);
    if (m2 && inbound.has(m2[1])) inbound.get(m2[1]).add(page);
  }
}

const rows = moneySlugs.sort().map((s) => ({ slug: s, count: inbound.get(s).size, from: [...inbound.get(s)] }));
if (matrix) for (const r of rows) console.log(`${String(r.count).padStart(2)}  ${r.slug}  <- ${r.from.join(', ')}`);

for (const r of rows) if (r.count < MIN_INBOUND) problems.push(`${moneyUrl(r.slug)} has ${r.count} inbound PASS links (< ${MIN_INBOUND})`);
if (moneySlugs.length === 0) problems.push('no /zh/money/* pages found in dist');

const min = Math.min(...rows.map((r) => r.count));
console.log(`money pages: ${moneySlugs.length}; PASS pages: ${passPages.length}; min inbound: ${min}; pages with >=3: ${rows.filter((r) => r.count >= 3).length}`);
if (problems.length) {
  console.error(problems.join('\n'));
  console.error('check:money-bridge FAILED');
  process.exit(1);
}
console.log('check:money-bridge OK');
