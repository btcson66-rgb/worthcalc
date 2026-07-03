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
import { join, resolve, relative, sep } from 'node:path';

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

const homepageCandidates = ['index.html', 'en/index.html', 'zh/index.html'];
const hasHomepage = homepageCandidates.some((p) => existsSync(join(distDir, p)));
check('Homepage exists', hasHomepage);

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
}

check('Every page has <title>', pagesWithoutTitle === 0, pagesWithoutTitle > 0 ? `${pagesWithoutTitle} missing` : '');
check('Every page has meta description', pagesWithoutDesc === 0, pagesWithoutDesc > 0 ? `${pagesWithoutDesc} missing` : '');
check('Every page has canonical URL', pagesWithoutCanonical === 0, pagesWithoutCanonical > 0 ? `${pagesWithoutCanonical} missing` : '');
check('Every page has H1', pagesWithoutH1 === 0, pagesWithoutH1 > 0 ? `${pagesWithoutH1} missing` : '');
check('Pages have internal links (≥2)', pagesWithoutInternalLinks === 0, pagesWithoutInternalLinks > 0 ? `${pagesWithoutInternalLinks} pages with <2 links` : '');
check('No thin pages (<200 chars body)', thinPages === 0, thinPages > 0 ? `${thinPages} thin pages` : '');
check('GA4 gtag mechanism present', hasGa4 || 'warn', hasGa4 ? '' : 'GA4 not injected (PUBLIC_GA_ID may be empty)');
check('AdSense placeholder present', hasAdsPlaceholder);

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
