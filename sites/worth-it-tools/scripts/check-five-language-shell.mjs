import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { expectedHreflangsFor, isSoftDeindexedUrl } from './deindexing.mjs';

const dist = resolve('dist');
// 2026-10-15 rebuild: the "five-language shell" is now a two-language shell. es, fr
// and de are retired (no routes); en is built but noindex; zh is the indexed site
// and its homepage is `/`. The file keeps its name so `npm run check:shell` and the
// CI wiring do not change. `hreflangs` still lists the retired tags on purpose:
// the "advertises soft-deindexed hreflang" assertion is what proves no page names
// them.
const locales = ['en', 'zh'];
const hreflangs = ['en', 'zh-TW', 'es', 'fr', 'de', 'x-default'];
const releasedLegal = ['about', 'privacy', 'terms', 'contact', 'disclaimer', 'changelog'];
const releasedTools = ['installment-true-apr', 'subscription-audit', 'costco-membership', 'ev-vs-gas', 'rent-vs-buy', 'commute-cost', 'latte-factor', 'cashback-breakeven'];
const releasedSupplemental = ['bulk-buying-waste-math', 'costco-math', 'is-costco-executive-membership-worth-it'];
const failures = [];

function verify(path, kind) {
  const file = join(dist, path, 'index.html');
  if (!existsSync(file)) {
    failures.push(`Missing /${path}/`);
    return;
  }
  const html = readFileSync(file, 'utf8');
  const url = path ? `https://worthcalc.win/${path}/` : 'https://worthcalc.win/';
  if (!html.includes('<h1')) failures.push(`/${path}/ missing h1`);
  if (!html.includes('rel="canonical"')) failures.push(`/${path}/ missing canonical`);
  // /en/ is noindex (soft-deindexed), so it has no hreflang cluster; expectedHreflangsFor
  // returns [] for it. The zh pages' cluster is zh-TW + x-default only.
  const expectedHreflangs = expectedHreflangsFor(url, hreflangs);
  for (const hreflang of expectedHreflangs) {
    if (!html.includes(`hreflang="${hreflang}"`)) failures.push(`/${path}/ missing hreflang=${hreflang}`);
  }
  for (const absentHreflang of hreflangs.filter((item) => !expectedHreflangs.includes(item))) {
    if (html.includes(`hreflang="${absentHreflang}"`)) failures.push(`/${path}/ advertises soft-deindexed hreflang=${absentHreflang}`);
  }
  if (isSoftDeindexedUrl(url) && !html.includes('<meta name="robots" content="noindex,follow">')) {
    failures.push(`/${path}/ missing noindex,follow`);
  }
  if (kind !== 'home' && !html.includes('"@type":"BreadcrumbList"')) failures.push(`/${path}/ missing BreadcrumbList`);
  const text = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length < 900) failures.push(`/${path}/ content too thin (${text.length} chars)`);
}

for (const slug of releasedLegal) for (const locale of locales) verify(`${locale}/${slug}`, 'legal');
for (const slug of releasedTools) for (const locale of locales) verify(`${locale}/tools/${slug}`, 'tool');
// The zh homepage is the site root; the English homepage is /en/ (noindex).
verify('', 'home');
verify('en', 'home');
for (const slug of releasedSupplemental) for (const locale of locales) verify(`${locale}/${slug}`, 'editorial');

const sitemapFile = join(dist, 'sitemap-0.xml');
const sitemap = existsSync(sitemapFile) ? readFileSync(sitemapFile, 'utf8') : '';
function verifySitemap(url) {
  const inSitemap = sitemap.includes(`<loc>${url}</loc>`);
  if (isSoftDeindexedUrl(url) ? inSitemap : !inSitemap) {
    failures.push(isSoftDeindexedUrl(url) ? `Sitemap includes soft-deindexed ${url}` : `Sitemap missing ${url}`);
  }
}
for (const slug of releasedLegal) for (const locale of locales) {
  const url = `https://worthcalc.win/${locale}/${slug}/`;
  verifySitemap(url);
}
for (const slug of releasedTools) for (const locale of locales) {
  const url = `https://worthcalc.win/${locale}/tools/${slug}/`;
  verifySitemap(url);
}
for (const slug of releasedSupplemental) for (const locale of locales) {
  const url = `https://worthcalc.win/${locale}/${slug}/`;
  verifySitemap(url);
}
// Through verifySitemap, like every other loop in this file: it asserts
// presence for an indexable URL and absence for a soft-deindexed one. Asserting
// presence unconditionally made retiring a locale impossible without editing
// this check, which is backwards -- the registry is meant to be the control.
verifySitemap('https://worthcalc.win/');
verifySitemap('https://worthcalc.win/en/');
// /zh/ is the redirect stub for `/`; it is never a sitemap entry.
if (sitemap.includes('<loc>https://worthcalc.win/zh/</loc>')) failures.push('Sitemap must exclude the /zh/ redirect stub');

if (failures.length) {
  console.error(`Two-language shell check failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log(`Two-language shell check passed: ${releasedLegal.length}/6 legal slugs, ${releasedTools.length}/8 tool slugs x ${locales.length} locales (en, zh), zh homepage at / and English homepage at /en/, ${releasedSupplemental.length} supplemental routes. es/fr/de are retired and not checked.`);
