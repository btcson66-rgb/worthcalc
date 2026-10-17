// Invariants of the three zh directory pages (P2 batch 7, 2026-10-17), checked against dist/.
//
// /zh/tools/, /zh/guides/ and /zh/money/ render from src/lib/directoryTw.ts. This script pins
// the division of labour that file promises, so a later PR cannot quietly turn them back into
// three overlapping lists:
//
//   1. Every content page in the sitemap is listed in exactly one directory (no page missing,
//      none listed twice), and every listed page is a sitemap page the disposition CSV marks
//      `keep` -- never a stub, a noindex page or a removed URL.
//   2. The role is real. A `tool` page opens with its form (or a tool section) inside
//      TOOL_FIRST_MAX_CHARS of main text; a `guide` or `reference` page does not.
//   3. Each directory page links to exactly the pages of its own role (the /money/ page may also
//      repeat the three calculators whose URLs sit under /money/, in their own section), has a
//      section for every scenario group it holds, and links to the other two directories.
//   4. Every `ask` is one sentence with no figures. A number belongs on the page that cites its
//      source and check date.
//
// Usage: node scripts/check-directory-tw.mjs   (after `npm run build`)
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv } from './lib/csv.mjs';

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const distDir = join(projectRoot, 'dist');
const origin = 'https://worthcalc.win';
const dataPath = join(projectRoot, 'src', 'lib', 'directoryTw.ts');
const csvPath = join(projectRoot, 'docs', 'audits', 'worthcalc-rebuild-p1-disposition-2026-10-15.csv');
const NOT_CONTENT = new Set(['/', '/zh/about/', '/zh/contact/', '/zh/disclaimer/', '/zh/privacy/', '/zh/terms/', '/zh/changelog/', '/zh/tools/', '/zh/guides/', '/zh/money/']);
const DIRS = { tool: '/zh/tools/', guide: '/zh/guides/', reference: '/zh/money/' };

const failures = [];
const fail = (message) => failures.push(message);

if (!existsSync(distDir)) {
  console.error('[directory-tw] dist/ does not exist. Build the site first.');
  process.exit(1);
}

// ---- the data file --------------------------------------------------------
const source = readFileSync(dataPath, 'utf8');
const threshold = Number(source.match(/TOOL_FIRST_MAX_CHARS\s*=\s*(\d+)/)?.[1]);
if (!Number.isInteger(threshold)) fail('directoryTw.ts: TOOL_FIRST_MAX_CHARS not found');
const groupIds = [...source.matchAll(/^\s*id:\s*'([a-z-]+)',\s*$/gm)].map((m) => m[1]);
const entries = [...source.matchAll(/\{\s*role:\s*'(tool|guide|reference)',\s*group:\s*'([a-z-]+)',\s*href:\s*'([^']+)',\s*title:\s*'([^']+)',\s*ask:\s*'([^']+)'\s*\}/g)].map((m) => ({
  role: m[1], group: m[2], href: m[3], title: m[4], ask: m[5],
}));
const declared = (source.match(/^\s*\{\s*role:\s*'/gm) ?? []).length;
if (entries.length !== declared) fail(`directoryTw.ts: ${declared} entry lines but only ${entries.length} parse (keep one entry per line, single-quoted)`);
if (groupIds.length === 0) fail('directoryTw.ts: no groups found');

// ---- the built site -------------------------------------------------------
const read = (path) => {
  const file = join(distDir, path, 'index.html');
  return existsSync(file) ? readFileSync(file, 'utf8') : undefined;
};
const meta = (html, name) => html.match(new RegExp(`<meta\\s+name="${name}"\\s+content="([^"]*)"`, 'i'))?.[1] ?? '';
const isStub = (html) => /<meta http-equiv="refresh"/i.test(html);

const sitemap = [...readFileSync(join(distDir, 'sitemap-0.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(origin, ''));
const [header, ...csvRows] = parseCsv(readFileSync(csvPath, 'utf8').replace(/^\uFEFF/, ''));
const col = Object.fromEntries(header.map((name, i) => [name, i]));
const keep = new Set(csvRows.filter((row) => row[col.proposed_action] === 'keep').map((row) => row[col.url].replace(origin, '')));

// 1. coverage
const seen = new Map();
for (const entry of entries) {
  if (seen.has(entry.href)) fail(`${entry.href}: listed twice (${seen.get(entry.href)} and ${entry.role})`);
  seen.set(entry.href, entry.role);
  if (!groupIds.includes(entry.group)) fail(`${entry.href}: unknown group "${entry.group}"`);
  if (!sitemap.includes(entry.href)) fail(`${entry.href}: listed in a directory but not in the sitemap`);
  if (!keep.has(entry.href)) fail(`${entry.href}: listed in a directory but the disposition CSV does not mark it keep`);
}
for (const path of sitemap) {
  if (NOT_CONTENT.has(path)) continue;
  if (!seen.has(path)) fail(`${path}: a content page in the sitemap that no directory lists`);
}

// 2. the role is real
function textBeforeFirstControl(html) {
  const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? html;
  const body = main.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '');
  const control = body.search(/<(input|select|textarea)\b/);
  const toolSection = body.search(/<section\b[^>]*class="[^"]*\btool\b/);
  const first = [control, toolSection].filter((n) => n >= 0).sort((a, b) => a - b)[0];
  if (first === undefined) return Infinity;
  return body.slice(0, first).replace(/<[^>]+>/g, '').replace(/\s+/g, '').length;
}
for (const entry of entries) {
  const html = read(entry.href);
  if (!html) { fail(`${entry.href}: not built`); continue; }
  if (isStub(html)) fail(`${entry.href}: is a redirect stub`);
  if (/noindex/i.test(meta(html, 'robots'))) fail(`${entry.href}: is noindex`);
  const before = textBeforeFirstControl(html);
  if (entry.role === 'tool') {
    if (before > threshold) fail(`${entry.href}: listed as a calculator but its form starts after ${before} characters (limit ${threshold}); list it under guide or reference`);
  } else if (before <= threshold) {
    fail(`${entry.href}: listed as ${entry.role} but it opens with its form (${before} characters in); list it under tool`);
  }
  if (/[0-9０-９%％]/.test(entry.ask)) fail(`${entry.href}: the ask carries a figure -- state numbers on the page, not in the directory`);
  if (!/[？。]$/.test(entry.ask)) fail(`${entry.href}: the ask must end with ？ or 。`);
  if ((entry.ask.match(/[？。]/g) ?? []).length !== 1) fail(`${entry.href}: the ask must be exactly one sentence`);
}

// 3. the directory pages
for (const [role, dir] of Object.entries(DIRS)) {
  const html = read(dir);
  if (!html) { fail(`${dir}: not built`); continue; }
  const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? html;
  const hrefs = new Set([...main.matchAll(/href="(\/zh\/[^"#]*)"/g)].map((m) => m[1]));
  for (const entry of entries) {
    const linked = hrefs.has(entry.href);
    const underMoney = dir === DIRS.reference && entry.role === 'tool' && entry.href.startsWith('/zh/money/');
    if (entry.role === role && !linked) fail(`${dir}: does not link ${entry.href}`);
    if (entry.role !== role && linked && !underMoney) fail(`${dir}: links ${entry.href}, which belongs to the ${entry.role} directory`);
  }
  for (const other of Object.values(DIRS)) {
    if (other !== dir && !hrefs.has(other)) fail(`${dir}: does not link the sibling directory ${other}`);
  }
  for (const id of new Set(entries.filter((e) => e.role === role).map((e) => e.group))) {
    if (!new RegExp(`<section[^>]*id="${id}"`).test(main)) fail(`${dir}: no section for group ${id}`);
  }
  if (/FAQPage|HowTo/.test(html)) fail(`${dir}: carries FAQPage/HowTo`);
  if (/noindex/i.test(meta(html, 'robots'))) fail(`${dir}: is noindex`);
}

if (failures.length > 0) {
  console.error(`[directory-tw] FAIL (${failures.length})`);
  failures.slice(0, 40).forEach((message) => console.error(`  - ${message}`));
  if (failures.length > 40) console.error(`  ... ${failures.length - 40} more`);
  process.exit(1);
}
const byRole = Object.keys(DIRS).map((role) => `${role}=${entries.filter((e) => e.role === role).length}`).join(' ');
console.log(`[directory-tw] PASS — ${entries.length} pages, each listed once (${byRole}); ${groupIds.length} scenario groups; roles match the built pages; asks are one figure-free sentence`);
