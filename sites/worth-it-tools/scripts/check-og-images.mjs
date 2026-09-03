// 擋下「很多頁共用同一張社群預覽圖」再次發生。
//
// 2026-09-03 之前，895 筆 staged guide 裡有 776 筆的 ogImage 是同一個字面值，
// 因為套件範本把它連同其他欄位一起複製。沒有任何檢查在看這件事，所以它跟著
// 每一個新套件複製了幾十次。現在 ogImage 由 seoPackageRegistry 依路由推導，
// 這支檢查確認推導出來的檔案真的存在、而且沒有兩頁共用同一張。
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, 'dist');
if (!existsSync(dist)) {
  console.error('[og-images] dist/ 不存在，請先 build。');
  process.exit(1);
}

const pages = [];
(function walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === 'index.html') pages.push(p);
  }
})(dist);

const OG = /<meta property="og:image" content="([^"]+)"/;
const GUIDE_ROUTE = /^\/[a-z-]+\/guides\/[^/]+\/index\.html$/;
const byImage = new Map();
const missing = [];
const notGenerated = [];
for (const p of pages) {
  const m = OG.exec(readFileSync(p, 'utf8'));
  if (!m) continue;
  const url = m[1];
  const path = url.replace(/^https?:\/\/[^/]+/, '');
  const route = p.replace(dist, '').replace(/\\/g, '/');
  if (!path.startsWith('/images/guides/og/')) {
    // guide 路由卻沒指到專屬圖 = 這篇的卡還沒產（頁面已 fallback 到站台預設圖，不會 404）。
    if (GUIDE_ROUTE.test(route)) notGenerated.push(route.replace(/index\.html$/, ''));
    continue;   // 其餘（首頁、工具頁、法務頁）本來就用預設圖
  }
  if (!existsSync(join(dist, path))) missing.push(`${p.replace(dist, '')} → ${path}`);
  if (!byImage.has(path)) byImage.set(path, []);
  byImage.get(path).push(p.replace(dist, '').replace(/index\.html$/, ''));
}

let failed = false;
if (notGenerated.length) {
  failed = true;
  console.error(`[og-images] ${notGenerated.length} 篇 guide 還沒產專屬社群預覽圖，目前退回站台預設圖。`);
  console.error('  補產：npm run generate:og-images（需要 Playwright、Noto CJK/Arabic/Devanagari 字型、cwebp），產完把 public/images/guides/og/ 一起 commit。');
  notGenerated.slice(0, 10).forEach((x) => console.error(`  ${x}`));
}
if (missing.length) {
  failed = true;
  console.error(`[og-images] ${missing.length} 頁指向不存在的圖，請跑 npm run generate:og-images：`);
  missing.slice(0, 10).forEach((x) => console.error(`  ${x}`));
}

// 同一支 guide 的不同語系各有自己的圖，所以一張圖只該對應一頁。
const shared = [...byImage.entries()].filter(([, ps]) => ps.length > 1);
if (shared.length) {
  failed = true;
  console.error(`[og-images] ${shared.length} 張圖被多頁共用（每篇 guide 應有專屬的圖）：`);
  shared.slice(0, 10).forEach(([img, ps]) => console.error(`  ${img} ← ${ps.length} 頁：${ps.slice(0, 3).join(', ')}`));
}

if (failed) process.exit(1);
console.log(`[og-images] ${byImage.size} 篇 guide，每篇都有專屬且存在的社群預覽圖。`);
