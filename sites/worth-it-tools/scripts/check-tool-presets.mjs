/*
 * check:tool-presets
 *
 * Every 台灣常見情境一鍵帶入 block (src/components/ToolPresets.astro) must be safe to click:
 *   - 2 to 3 buttons per block, each with a label and a note;
 *   - every key in a button's values is the id of a real field on the same built page, so a renamed input
 *     cannot silently turn a preset into a no-op;
 *   - sibling presets set the same keys, so switching never leaves a stale value behind;
 *   - the block is labelled as examples (範例) and sits before the calculator in the DOM.
 * Reads dist/zh/tools/<slug>/index.html. Run after `npm run build`.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve('dist/zh/tools');
if (!existsSync(root)) {
  console.error('dist/zh/tools does not exist. Build the site first.');
  process.exit(1);
}
const failures = [];
let blocks = 0;
const decode = (v) => v.replaceAll('&quot;', '"').replaceAll('&#34;', '"').replaceAll('&#39;', "'").replaceAll('&amp;', '&');

for (const slug of readdirSync(root)) {
  const file = join(root, slug, 'index.html');
  if (!existsSync(file)) continue;
  const html = readFileSync(file, 'utf8');
  const marker = html.search(/<section\b[^>]*data-tool-presets/);
  if (marker < 0) continue;
  const start = marker;
  blocks += 1;
  const where = `/zh/tools/${slug}/`;
  const block = html.slice(start, html.indexOf('</section>', start));
  const buttons = [...block.matchAll(/<button\b[^>]*data-preset-values="([^"]*)"[^>]*>/g)].map((m) => ({ tag: m[0], values: m[1] }));
  if (buttons.length < 2 || buttons.length > 3) failures.push(`${where}: ${buttons.length} preset buttons (need 2-3)`);
  if (!block.includes('範例')) failures.push(`${where}: block is not labelled as examples (範例)`);
  let keySets = [];
  for (const b of buttons) {
    if (!/data-preset-note="[^"]+"/.test(b.tag)) failures.push(`${where}: a button has no data-preset-note`);
    let values;
    try {
      values = JSON.parse(decode(b.values));
    } catch {
      failures.push(`${where}: preset values are not valid JSON`);
      continue;
    }
    keySets.push(Object.keys(values).sort().join('|'));
    for (const key of Object.keys(values)) {
      const idAt = html.indexOf(`id="${key}"`);
      if (idAt < 0) failures.push(`${where}: preset key "${key}" is not a field id on the page`);
      else if (idAt < start) failures.push(`${where}: field "${key}" appears before the preset block`);
    }
  }
  if (new Set(keySets).size > 1) failures.push(`${where}: sibling presets set different keys`);
}

if (blocks < 5) failures.push(`only ${blocks} pages carry preset blocks (expected at least 5)`);
console.log(`tool preset blocks checked: ${blocks}`);
if (failures.length) {
  console.error(failures.join('\n'));
  console.error('check:tool-presets FAILED');
  process.exit(1);
}
console.log('check:tool-presets OK');
