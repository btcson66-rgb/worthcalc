// Gate on what a search result is built from, for every URL in the sitemap.
//
// Fails on:
//   - any FAQPage or HowTo JSON-LD block. This used to cap FAQPage at one per
//     page (Search Console reports a second as a duplicate-field error; the
//     money briefs shipped 40 of these). Google retired the FAQ rich result on
//     2026-06-15 and the 2026-10-15 rebuild removed FAQPage and HowTo from the
//     whole site, so the cap became a ban: the visible FAQ stays, the markup goes.
//   - the same <title> on two indexable pages (they compete for one query —
//     the mortgage guide and the mortgage tool did exactly that),
//   - a missing title or meta description,
//   - an s4 hand-written title wider than the SERP budget, since those are the
//     pages chosen for their GSC demand and a cut-off title wastes it.
// Reports, without failing, how many other titles are still over budget.
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const siteDir = fileURLToPath(new URL('..', import.meta.url));
const dist = join(siteDir, 'dist');
const TITLE_WIDTH_BUDGET = 60;
// Keep in step with titleWidth() in src/lib/seo.ts.
const WIDE = /[ᄀ-ᅟ⺀-꓏가-힣豈-﫿︰-﹏＀-｠￠-￦]/u;
const titleWidth = (text) => [...text].reduce((sum, char) => sum + (WIDE.test(char) ? 2 : 1), 0);

const decode = (text) =>
  text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'");

const sitemapPath = join(dist, 'sitemap-0.xml');
if (!existsSync(sitemapPath)) {
  console.error('[serp-snippets] FAIL — dist/sitemap-0.xml missing; run the build first');
  process.exit(1);
}
const sitemap = await readFile(sitemapPath, 'utf8');
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
const s4Titles = JSON.parse(await readFile(join(siteDir, 'src', 'data', 's4TitleOverrides.json'), 'utf8'));

const failures = [];
const titles = new Map();
let overBudget = 0;

for (const path of paths) {
  const file = join(dist, path, 'index.html');
  if (!existsSync(file)) {
    failures.push(`${path}: in sitemap but not built`);
    continue;
  }
  const html = await readFile(file, 'utf8');
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1]?.trim() ?? '');
  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1]?.trim() ?? '';
  const retiredSchemaBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].filter((match) =>
    /"@type"\s*:\s*"(FAQPage|HowTo)"/.test(match[1]),
  ).length;

  if (!title) failures.push(`${path}: missing <title>`);
  if (!description) failures.push(`${path}: missing meta description`);
  if (retiredSchemaBlocks > 0) failures.push(`${path}: ${retiredSchemaBlocks} FAQPage/HowTo JSON-LD block(s); both are retired site-wide`);
  if (title) {
    if (titles.has(title)) failures.push(`${path}: same <title> as ${titles.get(title)} — "${title}"`);
    else titles.set(title, path);
    if (titleWidth(title) > TITLE_WIDTH_BUDGET) {
      if (s4Titles[path]) failures.push(`${path}: s4 title is ${titleWidth(title)} wide (budget ${TITLE_WIDTH_BUDGET}) — "${title}"`);
      else overBudget += 1;
    }
  }
}

if (failures.length > 0) {
  console.error('[serp-snippets] FAIL');
  failures.forEach((failure) => console.error('  ' + failure));
  process.exit(1);
}
console.log(
  `[serp-snippets] PASS — ${paths.length} sitemap pages; no FAQPage/HowTo, titles unique, s4 titles ≤${TITLE_WIDTH_BUDGET} wide` +
    ` (${overBudget} other titles still over budget, reported only)`,
);
