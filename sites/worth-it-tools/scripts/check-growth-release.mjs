import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const dist = resolve('dist');
const locales = ['en', 'zh', 'es', 'fr', 'de'];
const hreflangs = ['en', 'zh-Hant', 'es', 'fr', 'de', 'x-default'];
const pairs = {
  'mortgage-payoff': 'extra-mortgage-payments-guide',
  'credit-card-payoff': 'credit-card-minimum-payment-trap',
  'budget-builder': 'budget-with-irregular-income',
  'debt-strategy': 'snowball-vs-avalanche',
  'car-affordability': 'true-cost-of-car-ownership',
  'salary-converter': 'hourly-vs-annual-salary',
  'dti-calculator': 'how-to-calculate-dti',
  'home-affordability': 'how-much-home-can-you-afford',
  'compound-growth': 'how-compound-growth-works',
};
const sitemap = readFileSync(join(dist, 'sitemap-0.xml'), 'utf8');
const failures = [];

function checkPage(file, url, reciprocal) {
  if (!existsSync(file)) { failures.push(`Missing route ${file}`); return; }
  const html = readFileSync(file, 'utf8');
  if ((html.match(/<h1(?:\s|>)/g) ?? []).length !== 1) failures.push(`${url}: expected exactly one H1`);
  if (!html.includes(`<link rel="canonical" href="${url}">`)) failures.push(`${url}: wrong canonical`);
  for (const lang of hreflangs) if (!html.includes(`hreflang="${lang}"`)) failures.push(`${url}: missing hreflang=${lang}`);
  if (html.includes('noindex')) failures.push(`${url}: completed page is noindex`);
  if (!html.includes(reciprocal)) failures.push(`${url}: missing reciprocal tool/article link`);
  if (/localhost|github\.io|OFFICIAL_CPI_DATA_REQUIRED|lorem ipsum|>TODO</i.test(html)) failures.push(`${url}: placeholder or non-production text leaked`);
  if (!sitemap.includes(`<loc>${url}</loc>`)) failures.push(`${url}: missing from sitemap`);
}

for (const locale of locales) {
  for (const [tool, article] of Object.entries(pairs)) {
    const toolUrl = `https://worthcalc.win/${locale}/tools/${tool}/`;
    const articleUrl = `https://worthcalc.win/${locale}/${article}/`;
    checkPage(join(dist, locale, 'tools', tool, 'index.html'), toolUrl, `/${locale}/${article}/`);
    checkPage(join(dist, locale, article, 'index.html'), articleUrl, `/${locale}/tools/${tool}/`);
    const toolHtml = existsSync(join(dist, locale, 'tools', tool, 'index.html')) ? readFileSync(join(dist, locale, 'tools', tool, 'index.html'), 'utf8') : '';
    for (const marker of ['data-growth-calculator', 'data-action="calculate"', 'data-action="example"', 'data-action="reset"', 'aria-live="polite"']) if (!toolHtml.includes(marker)) failures.push(`${toolUrl}: missing calculator marker ${marker}`);
  }
  const blockedTool = join(dist, locale, 'tools', 'inflation-purchasing-power', 'index.html');
  const blockedArticle = join(dist, locale, 'nominal-vs-real-purchasing-power', 'index.html');
  if (existsSync(blockedTool) || existsSync(blockedArticle)) failures.push(`${locale}: inflation route published before official CPI gate`);
  for (const blockedUrl of [`https://worthcalc.win/${locale}/tools/inflation-purchasing-power/`, `https://worthcalc.win/${locale}/nominal-vs-real-purchasing-power/`]) if (sitemap.includes(`<loc>${blockedUrl}</loc>`)) failures.push(`${blockedUrl}: blocked URL leaked into sitemap`);
}

if (failures.length) {
  console.error(`Growth release check failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log('Growth release check passed: 45 tools + 45 articles, reciprocal five-locale hreflang/canonical/sitemap coverage, one H1, calculator actions, and inflation block.');
