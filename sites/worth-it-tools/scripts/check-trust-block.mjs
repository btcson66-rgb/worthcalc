import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteDir = fileURLToPath(new URL('..', import.meta.url));
const distDir = resolve(siteDir, 'dist');
const legalSlugs = new Set(['about', 'privacy', 'terms', 'contact', 'disclaimer', 'changelog']);
const failures = [];
const reverseMode = process.env.TRUST_BLOCK_REVERSE_MODE ?? '';
const reversePath = normalizedPath(process.env.TRUST_BLOCK_REVERSE_PATH ?? '/en/tools/commute-cost/');
let reverseApplied = false;

if (reverseMode && !new Set(['missing', 'invalid']).has(reverseMode)) {
  throw new Error('TRUST_BLOCK_REVERSE_MODE must be missing or invalid');
}

function normalizedPath(url) {
  const parsed = new URL(url, 'https://worthcalc.win');
  const pathname = parsed.pathname.endsWith('/') ? parsed.pathname : parsed.pathname + '/';
  return pathname === '//' ? '/' : pathname;
}

function pathnameFromDistFile(filePath) {
  const relativePath = relative(distDir, filePath).replaceAll('\\', '/');
  return normalizedPath(`https://worthcalc.win/${relativePath.replace(/index\.html$/, '')}`);
}

function isCalculatorOrArticle(pathname, html) {
  const robots = html.match(/<meta\b[^>]*name="robots"[^>]*content="([^"]*)"/i)?.[1] ?? '';
  if (/noindex/i.test(robots)) return false;
  if (!/<section\b[^>]*class="[^"]*\btool\b/i.test(html) && !/<article\b[^>]*class="[^"]*\bprose\b/i.test(html)) return false;
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length < 2) return false;
  const slug = segments.at(-1);
  if (legalSlugs.has(slug)) return false;
  return true;
}

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filePath = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(filePath));
    else if (entry.isFile() && entry.name === 'index.html') files.push(filePath);
  }
  return files;
}

function attribute(tag, name) {
  const match = tag.match(new RegExp(name + '="([^"]*)"', 'i'));
  return match?.[1] ?? '';
}

function validIsoDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value + 'T00:00:00Z');
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

const candidates = [];
for (const filePath of await walk(distDir)) {
  const html = await readFile(filePath, 'utf8');
  const pathname = pathnameFromDistFile(filePath);
  if (isCalculatorOrArticle(pathname, html)) candidates.push({ url: `https://worthcalc.win${pathname}`, filePath });
}

if (process.env.S4_TRUST_BLOCK_REVERSE_URL) {
  candidates.push({
    url: new URL(process.env.S4_TRUST_BLOCK_REVERSE_URL, 'https://worthcalc.win').toString(),
  });
}

for (const candidate of candidates) {
  const pathname = normalizedPath(candidate.url);
  const relativePath = pathname === '/' ? 'index.html' : join(pathname.replace(/^\/+/, ''), 'index.html');
  const filePath = candidate.filePath ?? resolve(distDir, relativePath);
  const distRoot = resolve(distDir) + sep;
  if (filePath !== resolve(distDir) && !filePath.startsWith(distRoot)) {
    failures.push(pathname + ': resolved outside dist');
    continue;
  }
  if (!existsSync(filePath)) {
    failures.push(pathname + ': missing build output ' + relative(siteDir, filePath));
    continue;
  }
  const html = await readFile(filePath, 'utf8');
  let candidateHtml = html;
  if (reverseMode && pathname === reversePath) {
    reverseApplied = true;
    if (reverseMode === 'missing') {
      candidateHtml = candidateHtml.replace(/<section\b[^>]*data-trust-block[^>]*>/i, '');
    } else {
      candidateHtml = candidateHtml.replace(/data-last-reviewed="[^"]*"/i, 'data-last-reviewed="not-a-date"');
    }
  }
  const trustTag = candidateHtml.match(/<section\b[^>]*data-trust-block[^>]*>/i)?.[0];
  if (!trustTag) {
    failures.push(pathname + ': missing TrustBlock');
    continue;
  }
  const lastReviewed = attribute(trustTag, 'data-last-reviewed');
  const limitCount = Number(attribute(trustTag, 'data-limit-count'));
  const sourceCount = Number(attribute(trustTag, 'data-source-count'));
  if (!validIsoDate(lastReviewed)) failures.push(pathname + ': lastReviewed is not a valid ISO date');
  if (!Number.isInteger(limitCount) || limitCount < 1) failures.push(pathname + ': limits must contain at least one item');
  if (!Number.isInteger(sourceCount) || sourceCount < 0) {
    failures.push(pathname + ': source count is invalid');
    continue;
  }
  const sourceTags = [...candidateHtml.matchAll(/<li\b[^>]*data-trust-source[^>]*>/gi)].map((match) => match[0]);
  if (sourceTags.length !== sourceCount) failures.push(pathname + ': source count does not match rendered sources');
  for (const sourceTag of sourceTags) {
    if (!attribute(sourceTag, 'data-source-url')) failures.push(pathname + ': source is missing url');
    if (!validIsoDate(attribute(sourceTag, 'data-verified-date'))) failures.push(pathname + ': source is missing valid verifiedDate');
  }
}

if (reverseMode && !reverseApplied) {
  failures.push(reversePath + ': reverse target was not found in the eligible page set');
}

if (failures.length > 0) {
  console.error('[trust-block] FAIL — ' + failures.length + ' issue(s) across ' + candidates.length + ' kept calculator/article pages');
  failures.slice(0, 20).forEach((failure) => console.error('  ' + failure));
  if (failures.length > 20) console.error('  ... ' + (failures.length - 20) + ' more');
  process.exit(1);
}

console.log('[trust-block] PASS — ' + candidates.length + ' kept calculator/article pages checked; limits, lastReviewed, and sources valid');
