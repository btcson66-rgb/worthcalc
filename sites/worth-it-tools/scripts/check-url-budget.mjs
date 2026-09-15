// Reports how many URLs the sitemap carries and enforces the recorded cap.
//
// History, kept deliberately: between 2026-07-19 and 2026-07-23 worthcalc's
// sitemap went from 41 to 341 URLs -- a five-language site shell plus a
// 100-page growth pack, published in five days onto a YMYL money domain with
// no authority. On 2026-07-25 GSC impressions dropped from 87/day to 3/day and
// stayed there. Nothing in the pipeline noticed the URL count moving, so this
// check was built to fail the build past a fixed cap.
//
// 2026-09-15: S5 restored a bounded cap at 310 after S1 sitemap consolidation.
// The counter remains visible on every build, and exceeding maxUrls is a hard
// failure so a new page batch cannot silently expand the submitted surface.
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const distDir = join(projectRoot, 'dist');
const budgetPath = join(projectRoot, 'config', 'url-budget.json');

if (!existsSync(distDir)) {
  console.error('[url-count] dist/ does not exist. Build the site first.');
  process.exit(1);
}

const childSitemaps = readdirSync(distDir).filter(
  (name) => /^sitemap-.+\.xml$/.test(name) && name !== 'sitemap-index.xml',
);
// A missing sitemap is still a real build failure, not a budget question.
if (childSitemaps.length === 0) {
  console.error('[url-count] No child sitemap found in dist/. Did the sitemap integration run?');
  process.exit(1);
}

const total = childSitemaps.flatMap((name) =>
  [...readFileSync(join(distDir, name), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]),
).length;

const record = existsSync(budgetPath) ? JSON.parse(readFileSync(budgetPath, 'utf8')) : {};
const previous = Number.isInteger(record.currentUrls) ? record.currentUrls : null;
const maximum = Number.isInteger(record.maxUrls) ? record.maxUrls : null;

if (maximum !== null && total > maximum) {
  console.error(`[url-count] ${total} URLs exceed the frozen maxUrls=${maximum}. Update the budget only with the required evidence.`);
  process.exit(1);
}

if (previous === null) {
  console.log(`[url-count] ${total} URLs in the sitemap.`);
} else {
  const delta = total - previous;
  const sign = delta > 0 ? `+${delta}` : String(delta);
  console.log(
    `[url-count] ${total} URLs in the sitemap (${delta === 0 ? 'no change' : sign} since ${record.recordedAt ?? 'the last recorded build'}).`,
  );
}

// Keep the recorded figure current so the next build's delta means something.
if (total !== previous) {
  writeFileSync(budgetPath, `${JSON.stringify({
    ...record,
    currentUrls: total,
    recordedAt: new Date().toISOString().slice(0, 10),
  }, null, 2)}\n`, 'utf8');
}
