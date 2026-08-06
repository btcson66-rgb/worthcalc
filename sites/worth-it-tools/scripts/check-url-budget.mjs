// Fails the build when the site grows more URLs than it has earned.
//
// Why this exists: between 2026-07-19 and 2026-07-23 worthcalc's sitemap went
// from 41 to 341 URLs -- a five-language site shell plus a 100-page growth
// pack, published in five days onto a YMYL money domain with no authority.
// On 2026-07-25 GSC impressions dropped from 87/day to 3/day and stayed there.
// Nothing in the pipeline noticed the URL count moving. Now something does.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const distDir = join(projectRoot, 'dist');
const budgetPath = join(projectRoot, 'config', 'url-budget.json');

if (!existsSync(distDir)) {
  console.error('[url-budget] dist/ does not exist. Build the site first.');
  process.exit(1);
}
if (!existsSync(budgetPath)) {
  console.error(`[url-budget] Missing ${budgetPath}.`);
  process.exit(1);
}

const budget = JSON.parse(readFileSync(budgetPath, 'utf8'));
if (!Number.isInteger(budget.maxUrls) || budget.maxUrls <= 0) {
  console.error('[url-budget] config/url-budget.json needs a positive integer "maxUrls".');
  process.exit(1);
}

const childSitemaps = readdirSync(distDir).filter(
  (name) => /^sitemap-.+\.xml$/.test(name) && name !== 'sitemap-index.xml',
);
if (childSitemaps.length === 0) {
  console.error('[url-budget] No child sitemap found in dist/. Did the sitemap integration run?');
  process.exit(1);
}

const urls = childSitemaps.flatMap((name) =>
  [...readFileSync(join(distDir, name), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]),
);
const total = urls.length;

if (total > budget.maxUrls) {
  console.error(
    `[url-budget] The sitemap has ${total} URLs but the budget is ${budget.maxUrls} ` +
      `(last reviewed ${budget.reviewedAt}).`,
  );
  console.error(`[url-budget] ${budget.reviewedBecause}`);
  console.error(`[url-budget] ${budget.raisingThisCap}`);
  process.exit(1);
}

// A count that has drifted below the recorded figure is not an error, but the
// recorded figure should not be allowed to rot -- it is what reviewers read.
if (total !== budget.currentUrls) {
  console.warn(
    `[url-budget] Sitemap has ${total} URLs; config/url-budget.json still records ` +
      `${budget.currentUrls}. Update "currentUrls" so the file stays honest.`,
  );
}

console.log(`[url-budget] ${total}/${budget.maxUrls} URLs.`);
