import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteDir = fileURLToPath(new URL('..', import.meta.url));
const beforeDir = resolve(siteDir, '..', '..', '..', 's4-title-before-20260915-dist');
const distDir = resolve(siteDir, 'dist');
const overrides = JSON.parse(await readFile(resolve(siteDir, 'src', 'data', 's4TitleOverrides.json'), 'utf8'));
const reportPath = resolve(siteDir, 'docs', 'audits', 's4-title-application-2026-09-15.md');

function htmlPath(root, pathname) {
  return pathname === '/' ? join(root, 'index.html') : join(root, pathname.replace(/^\/+/, ''), 'index.html');
}

function decode(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#34;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

function attr(tag, name) {
  return tag.match(new RegExp(name + '="([^"]*)"', 'i'))?.[1] ?? '';
}

function readMetadata(html) {
  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? '');
  const descriptionTag = html.match(/<meta\b[^>]*name=["']description["'][^>]*>/i)?.[0] ?? '';
  return { title, description: decode(attr(descriptionTag, 'content')) };
}

function cell(value) {
  return String(value || 'MISSING').replaceAll('|', '\\|').replaceAll(/\r?\n/g, ' ');
}

const rows = [];
for (const [pathname, expected] of Object.entries(overrides)) {
  const beforePath = htmlPath(beforeDir, pathname);
  const afterPath = htmlPath(distDir, pathname);
  const before = existsSync(beforePath) ? readMetadata(await readFile(beforePath, 'utf8')) : { title: '', description: '' };
  const after = existsSync(afterPath) ? readMetadata(await readFile(afterPath, 'utf8')) : { title: '', description: '' };
  rows.push({
    pathname,
    before,
    after,
    expected,
    titleMatch: after.title === expected.title,
    descriptionMatch: after.description === expected.description,
  });
}

const unmatched = rows.filter((row) => !row.titleMatch || !row.descriptionMatch);
const report = [
  '# S4 63 組 title／description 實際套用結果',
  '',
  '- 日期：2026-09-15',
  '- before：S3 建置產物 s4-title-before-20260915-dist',
  '- after：本次 S4 dist 建置產物',
  '- 結果：' + rows.length + ' 列；title exact match ' + rows.filter((row) => row.titleMatch).length + '/' + rows.length + '；description exact match ' + rows.filter((row) => row.descriptionMatch).length + '/' + rows.length + '。',
  '- 功能差異：本次只更新 head metadata；沒有為了 title 新增或改寫頁面功能。',
  '',
  '| URL | 改前 title | 改後 title | 改前 description | 改後 description |',
  '| --- | --- | --- | --- | --- |',
  ...rows.map((row) => '| ' + [row.pathname, row.before.title, row.after.title, row.before.description, row.after.description].map(cell).join(' | ') + ' |'),
  '',
  unmatched.length === 0
    ? '所有 63 列均與 CEO 提供的 title／description 完全相符。'
    : '未完全相符列：' + unmatched.map((row) => row.pathname).join(', '),
  '',
].join('\n');

await writeFile(reportPath, report, 'utf8');
console.log('[s4-title-audit] wrote ' + reportPath + ' (' + rows.length + ' rows; unmatched ' + unmatched.length + ')');
