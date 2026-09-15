import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteDir = fileURLToPath(new URL('..', import.meta.url));
const distDir = resolve(siteDir, 'dist');
const defaultDisposition = join(siteDir, 'docs', 'audits', 'worthcalc-disposition-2026-09-15.csv');
const dispositionPath = process.env.S4_TRUST_DISPOSITION_FILE
  ? resolve(siteDir, process.env.S4_TRUST_DISPOSITION_FILE)
  : defaultDisposition;
const legalSlugs = new Set(['about', 'privacy', 'terms', 'contact', 'disclaimer', 'changelog']);
const failures = [];

function parseCsvLine(line) {
  const fields = [];
  let field = '';
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"' && line[index + 1] === '"') {
      field += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === ',' && !quoted) {
      fields.push(field);
      field = '';
    } else {
      field += char;
    }
  }
  fields.push(field);
  return fields;
}

function normalizedPath(url) {
  const parsed = new URL(url);
  const pathname = parsed.pathname.endsWith('/') ? parsed.pathname : parsed.pathname + '/';
  return pathname === '//' ? '/' : pathname;
}

function isCalculatorOrArticle(row) {
  if (row.action !== 'keep' && row.action !== 'keep-priority') return false;
  if (row.routeType !== 'tool' && row.routeType !== 'index') return false;
  const pathname = normalizedPath(row.url);
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length < 2) return false;
  const slug = segments.at(-1);
  if (legalSlugs.has(slug)) return false;
  if (segments.length === 2 && ['tools', 'guides', 'topics'].includes(slug)) return false;
  return true;
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

const csv = await readFile(dispositionPath, 'utf8');
const lines = csv.split(/\r?\n/).filter((line) => line.trim().length > 0);
if (lines.length < 2) throw new Error('Disposition CSV has no data rows: ' + dispositionPath);
const candidates = lines.slice(1).map((line) => {
  const fields = parseCsvLine(line.replace(/^\\uFEFF/, ''));
  return { url: fields[0], action: fields[1], routeType: fields.at(-1) };
}).filter(isCalculatorOrArticle);

if (process.env.S4_TRUST_BLOCK_REVERSE_URL) {
  candidates.push({
    url: new URL(process.env.S4_TRUST_BLOCK_REVERSE_URL, 'https://worthcalc.win').toString(),
    action: 'keep',
    routeType: 'tool',
  });
}

for (const candidate of candidates) {
  const pathname = normalizedPath(candidate.url);
  const relativePath = pathname === '/' ? 'index.html' : join(pathname.replace(/^\/+/, ''), 'index.html');
  const filePath = resolve(distDir, relativePath);
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
  const trustTag = html.match(/<section\b[^>]*data-trust-block[^>]*>/i)?.[0];
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
  const sourceTags = [...html.matchAll(/<li\b[^>]*data-trust-source[^>]*>/gi)].map((match) => match[0]);
  if (sourceTags.length !== sourceCount) failures.push(pathname + ': source count does not match rendered sources');
  for (const sourceTag of sourceTags) {
    if (!attribute(sourceTag, 'data-source-url')) failures.push(pathname + ': source is missing url');
    if (!validIsoDate(attribute(sourceTag, 'data-verified-date'))) failures.push(pathname + ': source is missing valid verifiedDate');
  }
}

if (failures.length > 0) {
  console.error('[trust-block] FAIL — ' + failures.length + ' issue(s) across ' + candidates.length + ' kept calculator/article pages');
  failures.slice(0, 20).forEach((failure) => console.error('  ' + failure));
  if (failures.length > 20) console.error('  ... ' + (failures.length - 20) + ' more');
  process.exit(1);
}

console.log('[trust-block] PASS — ' + candidates.length + ' kept calculator/article pages checked; limits, lastReviewed, and sources valid');
