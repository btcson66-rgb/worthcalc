// Phase 1 disposition planner.
//
// Default mode is dry-run. Only --apply writes the two registries, and this
// script never runs as part of build/verify. The CSV is intentionally explicit:
// url, action (keep | deindex | merge_into:<target-url>), reason.

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ORIGIN = 'https://worthcalc.win';
const DEINDEXED_PATH = join(ROOT, 'src', 'data', 'deindexed-urls.json');
const REDIRECTS_PATH = join(ROOT, 'src', 'data', 'seo-redirects.json');

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (quoted) {
      if (char === '"' && text[index + 1] === '"') { field += '"'; index += 1; }
      else if (char === '"') quoted = false;
      else field += char;
    } else if (char === '"') quoted = true;
    else if (char === ',') { row.push(field); field = ''; }
    else if (char === '\n') { row.push(field.replace(/\r$/, '')); rows.push(row); row = []; field = ''; }
    else field += char;
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  if (!rows.length) return [];
  const headers = rows[0].map((header) => header.trim());
  return rows.slice(1)
    .filter((values) => values.some((value) => value.trim() !== ''))
    .map((values) => Object.fromEntries(headers.map((header, index) => [header, (values[index] ?? '').trim()])));
}

function normalizeUrl(value, label) {
  let parsed;
  try { parsed = new URL(value); } catch { throw new Error(`${label} 不是有效的絕對 URL：${value}`); }
  if (parsed.origin !== ORIGIN) throw new Error(`${label} 必須屬於 ${ORIGIN}：${value}`);
  if (parsed.search || parsed.hash) throw new Error(`${label} 不可含 query/hash：${value}`);
  parsed.pathname = parsed.pathname === '/' ? '/' : `${parsed.pathname.replace(/^\/+|\/+$/g, '')}/`;
  return parsed.href;
}

export function validateRows(rows) {
  if (!rows.length) throw new Error('CSV 沒有資料列');
  const required = ['url', 'action', 'reason'];
  for (const field of required) if (!Object.hasOwn(rows[0], field)) throw new Error(`CSV 缺少欄位：${field}`);
  const sources = new Set();
  return rows.map((input, index) => {
    const line = index + 2;
    const url = normalizeUrl(input.url, `第 ${line} 列 url`);
    if (sources.has(url)) throw new Error(`CSV 重複 url：${url}`);
    sources.add(url);
    const action = input.action.trim();
    const reason = input.reason.trim();
    if (!reason) throw new Error(`第 ${line} 列 reason 不可為空`);
    if (action === 'keep' || action === 'deindex') return { url, action, reason };
    const match = action.match(/^merge_into:(.+)$/);
    if (!match) throw new Error(`第 ${line} 列 action 無效：${action}`);
    const target = normalizeUrl(match[1].trim(), `第 ${line} 列 merge target`);
    if (target === url) throw new Error(`第 ${line} 列不可 merge_into 自己：${url}`);
    return { url, action: 'merge_into', target, reason };
  });
}

function readJson(path, fallback) {
  if (!existsSync(path)) return fallback;
  return JSON.parse(readFileSync(path, 'utf8'));
}

function normalizedRedirectRules(registry) {
  const rules = Array.isArray(registry) ? registry : registry?.rules;
  if (!Array.isArray(rules)) return [];
  return rules.map((rule) => ({
    source: normalizeUrl(rule.source, '既有 redirect source'),
    target: normalizeUrl(rule.target, '既有 redirect target'),
    reason: String(rule.reason || ''),
  }));
}

export function planDisposition(rows, { deindexed = { urls: [] }, redirects = { version: 1, rules: [] }, updatedAt = new Date().toISOString().slice(0, 10) } = {}) {
  const normalized = validateRows(rows);
  const urls = Array.isArray(deindexed.urls) ? [...deindexed.urls].map((url) => normalizeUrl(url, '既有 deindexed URL')) : [];
  const deindexedUrls = new Set(urls);
  const existingRules = normalizedRedirectRules(redirects);
  const rulesBySource = new Map(existingRules.map((rule) => [rule.source, rule]));
  const counts = { input: normalized.length, keep: 0, deindex: 0, deindexAdded: 0, merge: 0, mergeAdded: 0, unchanged: 0 };
  const additions = [];

  for (const row of normalized) {
    if (row.action === 'keep') { counts.keep += 1; counts.unchanged += 1; continue; }
    if (row.action === 'deindex') {
      counts.deindex += 1;
      if (deindexedUrls.has(row.url)) counts.unchanged += 1;
      else { deindexedUrls.add(row.url); counts.deindexAdded += 1; }
      continue;
    }
    counts.merge += 1;
    if (deindexedUrls.has(row.target)) throw new Error(`merge target 已在 deindexed registry：${row.target}`);
    const existing = rulesBySource.get(row.url);
    if (existing) {
      if (existing.target !== row.target) throw new Error(`既有 redirect target 衝突：${row.url}`);
      counts.unchanged += 1;
      continue;
    }
    const rule = { source: row.url, target: row.target, reason: row.reason };
    rulesBySource.set(row.url, rule);
    additions.push(rule);
    counts.mergeAdded += 1;
  }

  return {
    counts,
    deindexed: { ...deindexed, urls: [...deindexedUrls] },
    redirects: { ...redirects, version: redirects.version || 1, updatedAt, rules: [...existingRules, ...additions] },
    rows: normalized,
  };
}

export function writeDispositionPlan(plan, { deindexedPath = DEINDEXED_PATH, redirectsPath = REDIRECTS_PATH } = {}) {
  writeFileSync(deindexedPath, `${JSON.stringify(plan.deindexed, null, 2)}\n`, 'utf8');
  writeFileSync(redirectsPath, `${JSON.stringify(plan.redirects, null, 2)}\n`, 'utf8');
}

function parseCli(argv) {
  const result = { apply: false, csv: '', deindexedPath: DEINDEXED_PATH, redirectsPath: REDIRECTS_PATH };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--apply') result.apply = true;
    else if (arg === '--csv') result.csv = argv[++index] || '';
    else if (arg === '--deindexed') result.deindexedPath = resolve(argv[++index] || result.deindexedPath);
    else if (arg === '--redirects') result.redirectsPath = resolve(argv[++index] || result.redirectsPath);
  }
  return result;
}

async function main() {
  const args = parseCli(process.argv.slice(2));
  if (!args.csv) throw new Error('請提供 --csv <disposition.csv>；預設只做 dry-run，寫入需明確加 --apply');
  const rows = parseCsv(readFileSync(resolve(args.csv), 'utf8'));
  const plan = planDisposition(rows, {
    deindexed: readJson(args.deindexedPath, { decision: { reviewDate: new Date().toISOString().slice(0, 10) }, urls: [] }),
    redirects: readJson(args.redirectsPath, { version: 1, rules: [] }),
  });
  if (args.apply) writeDispositionPlan(plan, args);
  console.log(JSON.stringify({
    mode: args.apply ? 'apply' : 'dry-run',
    ...plan.counts,
    writes: args.apply ? [args.deindexedPath, args.redirectsPath] : [],
  }, null, 2));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(`[apply-disposition] ${error.message}`);
    process.exitCode = 1;
  });
}
