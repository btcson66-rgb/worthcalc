#!/usr/bin/env node
/**
 * audit.mjs — AdSense / SEO / GSC / GA4 readiness audit for a single site.
 *
 * Runs against the built dist/ directory. Run `npm run build` first.
 *
 * Usage:
 *   node scripts/audit.mjs           # audit dist/ in cwd
 *   node scripts/audit.mjs path/to   # audit dist/ in path/to
 */

import { existsSync, readdirSync, statSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const siteRoot = resolve(process.argv[2] || '.');
const distDir = join(siteRoot, 'dist');

const PASS = '✓';
const FAIL = '✗';
const WARN = '⚠';

const results = [];
let passCount = 0;
let failCount = 0;
let warnCount = 0;

function check(label, ok, note = '') {
  const icon = ok === true ? PASS : ok === 'warn' ? WARN : FAIL;
  if (ok === true) passCount++;
  else if (ok === 'warn') warnCount++;
  else failCount++;
  const line = `  ${icon} ${label}${note ? ` — ${note}` : ''}`;
  results.push(line);
  return ok;
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function walkHtml(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) files.push(...walkHtml(full));
    else if (entry.endsWith('.html')) files.push(full);
  }
  return files;
}

// ── Pre-checks ──────────────────────────────────────────────────────────────

console.log(`\nAuditing: ${siteRoot}\n`);

if (!existsSync(distDir)) {
  console.error(`${FAIL} dist/ not found. Run "npm run build" first.`);
  process.exit(1);
}

// ── Collect HTML files ──────────────────────────────────────────────────────

const htmlFiles = walkHtml(distDir);
check('Built HTML pages', htmlFiles.length > 0, `${htmlFiles.length} pages`);

// ── 1. Homepage ─────────────────────────────────────────────────────────────

const homepageCandidates = ['index.html', 'en/index.html', 'zh/index.html', 'es/index.html', 'fr/index.html', 'de/index.html'];
const hasHomepage = homepageCandidates.some((p) => existsSync(join(distDir, p)));
check('Homepage exists', hasHomepage);

const notFoundPath = join(distDir, '404.html');
const hasNotFound = existsSync(notFoundPath);
check('Custom 404 page exists', hasNotFound);
if (hasNotFound) {
  const notFound = readFileSync(notFoundPath, 'utf8');
  check('404 page is noindex', /<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(notFound));
  check('404 page does not load ads', !/pagead2\.googlesyndication|adsbygoogle|data-ad-slot/i.test(notFound));
}

// ── 2. Legal pages ──────────────────────────────────────────────────────────

const legalPages = ['about', 'privacy', 'terms', 'contact', 'disclaimer', 'changelog'];
for (const page of legalPages) {
  const found =
    existsSync(join(distDir, `en/${page}/index.html`)) ||
    existsSync(join(distDir, `zh/${page}/index.html`)) ||
    existsSync(join(distDir, `${page}/index.html`)) ||
    existsSync(join(distDir, `${page}.html`));
  check(`Legal page: /${page}`, found);
}

// ── 3. Sitemap ──────────────────────────────────────────────────────────────

const hasSitemap =
  existsSync(join(distDir, 'sitemap-index.xml')) ||
  existsSync(join(distDir, 'sitemap.xml')) ||
  existsSync(join(distDir, 'sitemap-0.xml'));
check('sitemap.xml exists', hasSitemap);

// Keep the duplicated compatibility homepage from splitting search signals.
// The real root page stays substantive for users and AdSense; /en/ points its
// canonical at / and is intentionally omitted from the sitemap.
function tagAttribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}=["']([^"']+)["']`, 'i'));
  return match?.[1] ?? '';
}

function canonicalHref(html) {
  const tags = html.match(/<link\b[^>]*>/gi) ?? [];
  const tag = tags.find((candidate) => tagAttribute(candidate, 'rel').toLowerCase() === 'canonical');
  return tag ? tagAttribute(tag, 'href') : '';
}

function alternateHref(html, hreflang) {
  const tags = html.match(/<link\b[^>]*>/gi) ?? [];
  const tag = tags.find(
    (candidate) =>
      tagAttribute(candidate, 'rel').toLowerCase() === 'alternate' &&
      tagAttribute(candidate, 'hreflang').toLowerCase() === hreflang.toLowerCase(),
  );
  return tag ? tagAttribute(tag, 'href') : '';
}

const productionOrigin = 'https://worthcalc.win';
const rootHomepagePath = join(distDir, 'index.html');
const englishHomepagePath = join(distDir, 'en', 'index.html');
const chineseHomepagePath = join(distDir, 'zh', 'index.html');
const spanishHomepagePath = join(distDir, 'es', 'index.html');
const frenchHomepagePath = join(distDir, 'fr', 'index.html');
const germanHomepagePath = join(distDir, 'de', 'index.html');
const homepageFilesExist = [rootHomepagePath, englishHomepagePath, chineseHomepagePath, spanishHomepagePath, frenchHomepagePath, germanHomepagePath].every(existsSync);
check('Canonical homepage variants exist', homepageFilesExist);

if (homepageFilesExist) {
  const rootHomepage = readFileSync(rootHomepagePath, 'utf8');
  const englishHomepage = readFileSync(englishHomepagePath, 'utf8');
  const chineseHomepage = readFileSync(chineseHomepagePath, 'utf8');
  const spanishHomepage = readFileSync(spanishHomepagePath, 'utf8');
  const frenchHomepage = readFileSync(frenchHomepagePath, 'utf8');
  const germanHomepage = readFileSync(germanHomepagePath, 'utf8');
  const expectedRoot = `${productionOrigin}/`;
  const expectedChinese = `${productionOrigin}/zh/`;
  const expectedSpanish = `${productionOrigin}/es/`;
  const expectedFrench = `${productionOrigin}/fr/`;
  const expectedGerman = `${productionOrigin}/de/`;

  check('Root homepage is self-canonical', canonicalHref(rootHomepage) === expectedRoot);
  check('/en/ consolidates its canonical to /', canonicalHref(englishHomepage) === expectedRoot);
  check('/zh/ remains self-canonical', canonicalHref(chineseHomepage) === expectedChinese);
  check('/es/ remains self-canonical', canonicalHref(spanishHomepage) === expectedSpanish);
  check('/fr/ remains self-canonical', canonicalHref(frenchHomepage) === expectedFrench);
  check('/de/ remains self-canonical', canonicalHref(germanHomepage) === expectedGerman);

  for (const [label, html] of [
    ['Root homepage', rootHomepage],
    ['/en/ compatibility homepage', englishHomepage],
    ['/zh/ homepage', chineseHomepage],
    ['/es/ homepage', spanishHomepage],
    ['/fr/ homepage', frenchHomepage],
    ['/de/ homepage', germanHomepage],
  ]) {
    check(`${label} English hreflang targets /`, alternateHref(html, 'en') === expectedRoot);
    check(`${label} Chinese hreflang targets /zh/`, alternateHref(html, 'zh-Hant') === expectedChinese);
    check(`${label} Spanish hreflang targets /es/`, alternateHref(html, 'es') === expectedSpanish);
    check(`${label} French hreflang targets /fr/`, alternateHref(html, 'fr') === expectedFrench);
    check(`${label} German hreflang targets /de/`, alternateHref(html, 'de') === expectedGerman);
    check(`${label} x-default targets /`, alternateHref(html, 'x-default') === expectedRoot);
  }

  const englishHtmlFiles = htmlFiles.filter(
    (file) => file === rootHomepagePath || file.startsWith(join(distDir, 'en') + '\\'),
  );
  const englishHomeLinkViolations = englishHtmlFiles.filter((file) =>
    /<a\b[^>]*href=["']\/en\/?["']/i.test(readFileSync(file, 'utf8')),
  );
  check(
    'English internal home links target /',
    englishHomeLinkViolations.length === 0,
    englishHomeLinkViolations.length > 0 ? `${englishHomeLinkViolations.length} pages still link to /en/` : '',
  );
}

if (hasSitemap) {
  const sitemapXml = readdirSync(distDir)
    .filter((entry) => /^sitemap(?:-index|-\d+)?\.xml$/i.test(entry) || entry === 'sitemap.xml')
    .map((entry) => readFileSync(join(distDir, entry), 'utf8'))
    .join('\n');
  check('Sitemap includes canonical root homepage', sitemapXml.includes(`<loc>${productionOrigin}/</loc>`));
  check('Sitemap excludes compatibility /en/ homepage', !sitemapXml.includes(`<loc>${productionOrigin}/en/</loc>`));
  check('Sitemap includes /zh/ homepage', sitemapXml.includes(`<loc>${productionOrigin}/zh/</loc>`));
  check('Sitemap includes /es/ homepage', sitemapXml.includes(`<loc>${productionOrigin}/es/</loc>`));
  check('Sitemap includes /fr/ homepage', sitemapXml.includes(`<loc>${productionOrigin}/fr/</loc>`));
  check('Sitemap includes /de/ homepage', sitemapXml.includes(`<loc>${productionOrigin}/de/</loc>`));
}

// ── 4. robots.txt ───────────────────────────────────────────────────────────

const hasRobots = existsSync(join(distDir, 'robots.txt'));
check('robots.txt exists', hasRobots);
if (hasRobots) {
  const robots = readFileSync(join(distDir, 'robots.txt'), 'utf8');
  check('robots.txt references sitemap', robots.toLowerCase().includes('sitemap'));
}

// ── 5–12. Per-page SEO checks ───────────────────────────────────────────────

let pagesWithoutTitle = 0;
let pagesWithoutDesc = 0;
let pagesWithoutCanonical = 0;
let pagesWithoutH1 = 0;
let pagesWithoutInternalLinks = 0;
let thinPages = 0;
let hasGa4 = false;
let hasAdsPlaceholder = false;
let calculatorPages = 0;
let calculatorPagesWithoutReview = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');

  // Skip redirect-only pages (meta refresh) — they legitimately lack content.
  if (/http-equiv=["']refresh["']/i.test(html)) continue;

  if (!/<title[^>]*>.+<\/title>/is.test(html)) pagesWithoutTitle++;
  if (!/<meta\s[^>]*name=["']description["'][^>]*>/i.test(html)) pagesWithoutDesc++;
  if (!/<link\s[^>]*rel=["']canonical["'][^>]*>/i.test(html)) pagesWithoutCanonical++;
  if (!/<h1[\s>]/i.test(html)) pagesWithoutH1++;

  // Internal links: <a href="/...">
  const internalLinks = (html.match(/href=["'](\/[^"']*?)["']/g) || []).length;
  if (internalLinks < 2) pagesWithoutInternalLinks++;

  // Thin content check. 200 chars accommodates CJK pages (information-dense).
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (bodyMatch) {
    const textOnly = bodyMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (textOnly.length < 200) thinPages++;
  }

  // GA4 check
  if (html.includes('googletagmanager.com/gtag/js') || html.includes('gtag(')) hasGa4 = true;

  // AdSense placeholder check
  if (html.includes('ad-slot') || html.includes('adsbygoogle')) hasAdsPlaceholder = true;

  const relativePath = file.slice(distDir.length).replaceAll('\\', '/');
  if (/\/(?:en|zh)\/tools\/[^/]+\/index\.html$/.test(relativePath)) {
    calculatorPages++;
    const hasReview =
      html.includes('class="calculator-review"') &&
      html.includes('class="last-updated"') &&
      html.includes('class="estimate-disclaimer"') &&
      (html.includes('Methodology') || html.includes('計算方法')) &&
      (html.includes('Limitations') || html.includes('限制'));
    if (!hasReview) calculatorPagesWithoutReview++;
  }
}

check('Every page has <title>', pagesWithoutTitle === 0, pagesWithoutTitle > 0 ? `${pagesWithoutTitle} missing` : '');
check('Every page has meta description', pagesWithoutDesc === 0, pagesWithoutDesc > 0 ? `${pagesWithoutDesc} missing` : '');
check('Every page has canonical URL', pagesWithoutCanonical === 0, pagesWithoutCanonical > 0 ? `${pagesWithoutCanonical} missing` : '');
check('Every page has H1', pagesWithoutH1 === 0, pagesWithoutH1 > 0 ? `${pagesWithoutH1} missing` : '');
check('Pages have internal links (≥2)', pagesWithoutInternalLinks === 0, pagesWithoutInternalLinks > 0 ? `${pagesWithoutInternalLinks} pages with <2 links` : '');
check('No thin pages (<200 chars body)', thinPages === 0, thinPages > 0 ? `${thinPages} thin pages` : '');
check('GA4 gtag mechanism present', hasGa4 || 'warn', hasGa4 ? '' : 'GA4 not injected (PUBLIC_GA_ID may be empty)');
check('AdSense placeholder present', hasAdsPlaceholder);
check(
  'Calculator methodology disclosure',
  calculatorPages > 0 && calculatorPagesWithoutReview === 0,
  `${calculatorPages} tool pages checked${calculatorPagesWithoutReview > 0 ? `; ${calculatorPagesWithoutReview} missing review details` : ''}`,
);

// ── 13–15. Project files ────────────────────────────────────────────────────

check('license-audit.md exists', existsSync(join(siteRoot, 'license-audit.md')));
check('README.md exists', existsSync(join(siteRoot, 'README.md')));
check('launch-checklist.md exists', existsSync(join(siteRoot, 'launch-checklist.md')) || 'warn', 'optional but recommended');

// ── 16. Broken links (delegate to check-links if available) ─────────────────

const linkScript = join(siteRoot, 'scripts', 'check-links.mjs');
check('Internal link checker available', existsSync(linkScript), existsSync(linkScript) ? 'run "npm run check:links" separately' : 'scripts/check-links.mjs not found');

// ── Summary ─────────────────────────────────────────────────────────────────

console.log('Audit Results:');
for (const r of results) console.log(r);
console.log(`\nSummary: ${passCount} passed, ${failCount} failed, ${warnCount} warnings`);
console.log(`Pages: ${htmlFiles.length}`);

if (failCount > 0) {
  console.log('\n⚠ Site is NOT ready for AdSense / launch. Fix the failures above.\n');
  process.exit(1);
} else if (warnCount > 0) {
  console.log('\n⚠ Site passes with warnings. Review before launch.\n');
  process.exit(0);
} else {
  console.log('\n✓ Site passes all checks. Ready for launch / AdSense application.\n');
  process.exit(0);
}
