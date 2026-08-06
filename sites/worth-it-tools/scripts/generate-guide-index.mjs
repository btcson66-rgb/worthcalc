// 從建置產物產生 src/data/guideIndex.ts：每個語系的編輯型頁面路徑＋該頁自己的 H1。
//
// 標題取自各頁實際渲染出來的 H1，不是手打的——手打的翻譯會漂、會過時，
// 而且五個語系乘以四十幾頁沒有人會持續維護。
//
// 用法：先 `npm run build`，再 `npm run generate:guide-index`，然後重跑一次 build
// 讓首頁把新索引渲染進去。新增編輯頁之後如果忘了跑，`npm run check:guide-index`
// 會在 verify 時擋下來。
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const distDir = join(projectRoot, 'dist');
const outPath = join(projectRoot, 'src', 'data', 'guideIndex.ts');
const LOCALES = ['en', 'zh', 'es', 'fr', 'de'];
const LEGAL_SLUGS = new Set(['about', 'privacy', 'terms', 'contact', 'disclaimer', 'changelog']);

if (!existsSync(distDir)) {
  console.error('[guide-index] dist/ does not exist. Run `npm run build` first.');
  process.exit(1);
}

function walkIndexHtml(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) files.push(...walkIndexHtml(full));
    else if (entry === 'index.html') files.push(full);
  }
  return files;
}

const decodeText = (value) => value
  .replace(/<[^>]+>/g, '')
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/&nbsp;/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const byLocale = Object.fromEntries(LOCALES.map((locale) => [locale, []]));
const missingH1 = [];

for (const file of walkIndexHtml(distDir)) {
  const sitePath = `/${relative(distDir, file).split(sep).join('/')}`.replace(/index\.html$/, '');
  const segments = sitePath.split('/').filter(Boolean);
  const locale = segments[0];
  if (!LOCALES.includes(locale)) continue;             // 根首頁
  if (segments.length < 2) continue;                   // 語系首頁
  if (segments[1] === 'tools') continue;               // 工具頁由首頁工具區連
  if (LEGAL_SLUGS.has(segments.at(-1))) continue;      // 法務頁由頁尾連

  const heading = readFileSync(file, 'utf8').match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1];
  if (!heading) { missingH1.push(sitePath); continue; }
  byLocale[locale].push({ path: `/${segments.slice(1).join('/')}/`, title: decodeText(heading) });
}

if (missingH1.length > 0) {
  console.error('[guide-index] 這些頁面沒有 H1，無法產生連結文字：');
  for (const path of missingH1) console.error(`- ${path}`);
  process.exit(1);
}

for (const locale of LOCALES) {
  byLocale[locale].sort((left, right) => left.title.localeCompare(right.title, locale));
}

const escape = (value) => value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const lines = [
  '// 全站指南索引：每個語系每一頁編輯型內容，含該頁自己的 H1 當連結文字。',
  '//',
  '// 為什麼存在：2026-08-06 盤點發現 341 個頁面裡有 106 頁「內文零內部連結」，',
  '// 其中最新的六篇（rule-of-72-explained、installment-apr-table、extended-warranty-math',
  '// 的 en 與 zh 版）唯一的入站連結是自己的語言切換器。Google 主要靠連結發現頁面，',
  '// 而這個站的 sitemap 從未被下載過，所以那些頁面等於沒有任何發現路徑——',
  '// 07-28 發布的 /en/rule-of-72-explained/ 到 08-06 仍是「URL is unknown to Google」。',
  '//',
  '// 首頁會把這份索引整份列出，讓每一頁都至少有一條來自全站最常被爬的頁面的連結。',
  '// scripts/check-guide-index.mjs 會擋下任何沒有實質入站連結的編輯頁。',
  '//',
  '// 這個檔案由 `npm run generate:guide-index` 從 dist 產生，不要手改。',
  '',
  "import type { Locale } from '../consts';",
  '',
  'export interface GuideIndexEntry {',
  '  /** 不含語系前綴的路徑，交給 localizedPath() 組。 */',
  '  path: string;',
  '  title: string;',
  '}',
  '',
  'export const guideIndex: Record<Locale, GuideIndexEntry[]> = {',
];
for (const locale of LOCALES) {
  lines.push(`  ${locale}: [`);
  for (const entry of byLocale[locale]) {
    lines.push(`    { path: '${escape(entry.path)}', title: '${escape(entry.title)}' },`);
  }
  lines.push('  ],');
}
lines.push('};', '');

writeFileSync(outPath, lines.join('\n'), 'utf8');
console.log(`[guide-index] wrote ${relative(projectRoot, outPath)}`);
for (const locale of LOCALES) console.log(`  ${locale}: ${byLocale[locale].length}`);
