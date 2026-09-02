// 擋下孤兒頁：sitemap 裡的每一個編輯型頁面，都必須在站內有實質內部連結。
//
// 為什麼存在：2026-08-06 盤點 341 個頁面，發現 106 頁「內文零內部連結」，
// 其中最新的六篇（rule-of-72-explained / installment-apr-table /
// extended-warranty-math 的 en 與 zh 版）唯一的入站連結是自己的語言切換器。
// Google 主要靠連結發現頁面，而這個站的 sitemap 從未被 Google 下載過
// （見 03_Incidents/2026-08-05），所以那些頁面等於沒有發現路徑——07-28 發布的
// /en/rule-of-72-explained/ 到 08-06 仍然是「URL is unknown to Google」。
//
// 判定用建置產物，不是原始碼：真正決定 Google 看到什麼的是 HTML。
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const distDir = join(projectRoot, 'dist');
const LOCALES = ['en', 'zh', 'es', 'fr', 'de', 'hi', 'ar'];
const LEGAL_SLUGS = new Set(['about', 'privacy', 'terms', 'contact', 'disclaimer', 'changelog']);
// 每頁都有的語言切換器會讓同一篇文章的各語言版互指。那不是發現路徑——
// 如果整組五個語言版都沒有別的入口，Google 一個都找不到。所以互指不算數。
const MIN_INBOUND = 1;

if (!existsSync(distDir)) {
  console.error('[guide-index] dist/ does not exist. Build the site first.');
  process.exit(1);
}

function walkHtml(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) files.push(...walkHtml(full));
    else if (entry.endsWith('.html')) files.push(full);
  }
  return files;
}

const toSitePath = (file) => `/${relative(distDir, file).split(sep).join('/')}`.replace(/index\.html$/, '');

function isEditorial(sitePath) {
  const segments = sitePath.split('/').filter(Boolean);
  if (segments.length < 2) return false;                 // 根首頁與語系首頁
  if (!LOCALES.includes(segments[0])) return false;
  if (segments[1] === 'tools') return false;             // 工具頁由首頁工具區連
  if (LEGAL_SLUGS.has(segments.at(-1))) return false;    // 法務頁由頁尾連
  return true;
}

// 同一篇文章的跨語言版本互指不算入站連結——那是語言切換器，不是發現路徑。
const logicalRoute = (sitePath) => sitePath.split('/').filter(Boolean).slice(1).join('/');

const htmlFiles = walkHtml(distDir);
const inbound = new Map(); // 目標路徑 -> 來源路徑集合

for (const file of htmlFiles) {
  const from = toSitePath(file);
  const html = readFileSync(file, 'utf8');
  for (const match of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    let to = match[1];
    if (/\.[a-z0-9]+$/i.test(to)) continue;              // 資產
    if (!to.endsWith('/')) to += '/';
    if (to === from) continue;                           // 自連
    if (logicalRoute(to) && logicalRoute(to) === logicalRoute(from)) continue; // 語言切換器
    if (!inbound.has(to)) inbound.set(to, new Set());
    inbound.get(to).add(from);
  }
}

const orphans = htmlFiles
  .map(toSitePath)
  .filter(isEditorial)
  .map((path) => ({ path, inbound: (inbound.get(path) ?? new Set()).size }))
  .filter((row) => row.inbound < MIN_INBOUND)
  .sort((left, right) => left.path.localeCompare(right.path));

if (orphans.length > 0) {
  console.error(
    `[guide-index] ${orphans.length} editorial page(s) have no internal inbound link other than ` +
      'their own language switcher. Google finds pages through links, and this site\'s sitemap has ' +
      'never been downloaded, so an orphan is a page Google will not discover. Add each one to ' +
      'src/data/guideIndex.ts (the homepage renders that index in full):',
  );
  for (const row of orphans) console.error(`- ${row.path}`);
  process.exit(1);
}

const editorialCount = htmlFiles.map(toSitePath).filter(isEditorial).length;
console.log(`[guide-index] ${editorialCount} editorial pages, every one reachable by an internal link.`);
