// Reports how many URLs the sitemap carries. It does not cap them.
//
// History, kept deliberately: between 2026-07-19 and 2026-07-23 worthcalc's
// sitemap went from 41 to 341 URLs -- a five-language site shell plus a
// 100-page growth pack, published in five days onto a YMYL money domain with
// no authority. On 2026-07-25 GSC impressions dropped from 87/day to 3/day and
// stayed there. Nothing in the pipeline noticed the URL count moving, so this
// check was built to fail the build past a fixed cap.
//
// 2026-09-02: the owner decided to lift the cap and scale SEO pages up. The
// cap is gone; the instrument is not. Deleting the counter as well would put
// us back where we were in July -- growing the URL count with nothing watching
// it. So this now reports the number and the delta on every build, and always
// exits 0. Read the delta in the verify output; it is the only place the
// growth rate is visible at a glance.
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
