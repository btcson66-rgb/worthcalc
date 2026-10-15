import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const origin = 'https://worthcalc.win';
const htmlFiles = [];
function walk(folder) {
  for (const item of readdirSync(folder, { withFileTypes: true })) {
    const path = join(folder, item.name);
    if (item.isDirectory()) walk(path);
    else if (item.name === 'index.html') htmlFiles.push(path);
  }
}
walk(dist);
let checked = 0;
const offenders = [];
for (const file of htmlFiles) {
  const route = '/' + relative(dist, file).replaceAll('\\', '/').replace(/index\.html$/, '');
  const url = new URL(route, origin).href;
  const html = readFileSync(file, 'utf8');
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
  const robots = html.match(/<meta\s+name="robots"\s+content="([^"]+)"/i)?.[1] || '';
  if (canonical !== url || /noindex/i.test(robots)) continue;
  checked++;
  for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)) {
    const target = new URL(match[1].replaceAll('&amp;', '&'), url);
    // /zh/ is only a noindex redirect stub for the homepage `/` (2026-10-15
    // rebuild); /en/ is the human-only English page and is reached through the
    // language switcher, which is not an internal-link-equity problem.
    if (target.origin === origin && target.pathname === '/zh/') offenders.push(`${route} -> ${match[1]}`);
  }
}
assert.equal(offenders.length, 0, `Indexable canonical pages link to the /zh/ redirect stub (link to / instead):\n${offenders.join('\n')}`);
console.log(`[canonical-home-links] PASS — ${checked} indexable canonical pages, 0 links to the /zh/ stub`);
