// 為每一篇 staged editorial guide 產生專屬的社群預覽圖（1200x630）。
//
// 為什麼需要它：套件範本把同一個 ogImage 字面值複製到每一筆條目，895 筆裡有
// 776 筆都指向 /images/guides/annual-bills-monthly-equivalent-og.webp。微波爐、
// 桌上型攪拌機、停車證三篇都在對外宣傳一張「年度帳單」的圖，五種語言都一樣。
// 而每筆的 imageAlt 寫的是自己的標題，所以 alt 與圖片在每一筆上都互相矛盾。
//
// 這支腳本產生標題卡：圖上就是那篇的標題，alt 因此自動變成誠實的描述。
//
// 這是維護工具，不在 build 或 verify 鏈上——它需要 Playwright 與多語系字型
// （CJK／阿拉伯／天城體），CI 沒有裝。新增套件後在本機跑一次，把產出的圖
// commit 進去；`npm run check:og-images` 會在 build 時擋下漏掉的圖。
//
//   npm i -D playwright && npx playwright install chromium
//   sudo apt-get install -y fonts-noto-cjk fonts-noto-core webp
//   npm run generate:og-images
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, statSync, unlinkSync, writeFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outDir = join(root, 'public', 'images', 'guides', 'og');
const distDir = join(root, '.og-data-dist');

// registry 是 TypeScript，而且各套件檔的寫法有三種（單行單引號、單行雙引號、
// 多行 pretty-print），逐行用正規式解析一定會漏。編譯後直接 import 才可靠。
function loadGuides() {
  writeFileSync(join(root, 'tsconfig.ogdata.json'), JSON.stringify({
    compilerOptions: {
      target: 'ES2022', module: 'ESNext', moduleResolution: 'Bundler',
      outDir: '.og-data-dist', rootDir: 'src', skipLibCheck: true, strict: false, noEmitOnError: false,
    },
    include: ['src/data/seoPackage*.ts', 'src/consts.ts'],
  }, null, 2) + '\n');
  try { execFileSync('npx', ['tsc', '-p', 'tsconfig.ogdata.json'], { cwd: root, stdio: 'pipe' }); }
  catch { /* consts.ts 的 import.meta.env 會報型別錯，但 JS 還是有產出，不影響 */ }
  // tsc 的 Bundler 解析會輸出無副檔名的相對 import，Node 解不了，補上 .js
  const patch = (dir) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) patch(p);
      else if (e.name.endsWith('.js')) {
        writeFileSync(p, readFileSync(p, 'utf8').replace(/(from '\.\/[^']*?)'/g, (m, g) => g.endsWith('.js') ? m : `${g}.js'`));
      }
    }
  };
  patch(distDir);
  return import(join(distDir, 'data', 'seoPackageRegistry.js'));
}

const TAGLINE = {
  en: ['No sign-up', '100% private', 'Free forever'],
  es: ['Sin registro', '100% privado', 'Gratis siempre'],
  zh: ['免註冊', '完全私密', '永久免費'],
  hi: ['बिना साइन-अप', '100% निजी', 'हमेशा मुफ़्त'],
  ar: ['بدون تسجيل', 'خاص 100%', 'مجاني دائمًا'],
};
const RTL = new Set(['ar']);
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// 版面沿用 scripts/og-source/og-default.html 的品牌樣式，只是把固定標語換成該篇標題。
const cardHtml = (title, locale) => `<!doctype html><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1200px;height:630px}
body{display:flex;flex-direction:column;justify-content:center;gap:26px;padding:64px 90px;
 background:#f7fbfb;background-image:radial-gradient(1100px 520px at 88% -18%,#cdf1ec 0%,rgba(205,241,236,0) 62%);
 font-family:"Noto Sans","Noto Sans CJK TC","Noto Sans Arabic","Noto Sans Devanagari","DejaVu Sans",sans-serif;color:#17323b}
.mark{display:flex;align-items:center;gap:22px}
.mark svg{width:68px;height:68px}
.name{font-size:42px;font-weight:700;letter-spacing:-.015em}
h1{font-weight:800;line-height:1.14;letter-spacing:-.02em;overflow-wrap:anywhere}
.sub{display:flex;gap:14px;flex-wrap:wrap}
.sub span{border:1px solid #b9ded8;border-radius:999px;padding:9px 20px;background:#fff;color:#2a5c60;font-size:22px;font-weight:600}
.rule{height:8px;width:132px;border-radius:999px;background:linear-gradient(90deg,#14b8a6,#0d9488)}
body[dir=rtl] .mark,body[dir=rtl] .sub{justify-content:flex-end}
body[dir=rtl] .rule{align-self:flex-end}
</style><body${RTL.has(locale) ? ' dir="rtl"' : ''} lang="${locale}">
<div class="mark"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><defs><linearGradient id="wc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#14b8a6"/><stop offset="1" stop-color="#0d9488"/></linearGradient></defs><rect x="1" y="1" width="30" height="30" rx="8" fill="url(#wc)"/><path d="M8 16.5l4.2 4.4L24 9.5" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10.5" cy="10.5" r="1.7" fill="#fff" opacity=".9"/></svg><div class="name">WorthCalc</div></div>
<div class="rule"></div><h1 id="t">${esc(title)}</h1>
<div class="sub">${(TAGLINE[locale] ?? TAGLINE.en).map((s) => `<span>${esc(s)}</span>`).join('')}</div></body>`;

const { seoPackageGuides, ogImagePathFor } = await loadGuides();
const guides = Object.values(seoPackageGuides);
mkdirSync(outDir, { recursive: true });

const todo = guides.filter((g) => !existsSync(join(root, 'public', ogImagePathFor(g))));
console.log(`[og-images] ${guides.length} 篇 guide，其中 ${todo.length} 篇還沒有圖。`);
if (todo.length === 0) { rmSync(distDir, { recursive: true, force: true }); process.exit(0); }

const { chromium } = await import('playwright');
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })).newPage();

let n = 0; const sizes = [];
for (const g of todo) {
  await page.setContent(cardHtml(g.title, g.locale), { waitUntil: 'load' });
  // 標題長度差距很大，取塞得下的最大字級。不要用 body.scrollHeight 判斷：
  // body 是固定高度的 flex 容器，內容溢出時不一定會長高，那樣永遠量到「不合」。
  await page.evaluate(() => {
    const h = document.getElementById('t');
    const cs = getComputedStyle(document.body);
    const room = 630 - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom)
      - parseFloat(cs.rowGap || cs.gap) * 3
      - document.querySelector('.mark').offsetHeight
      - document.querySelector('.rule').offsetHeight
      - document.querySelector('.sub').offsetHeight;
    for (let size = 64; size >= 26; size -= 2) {
      h.style.fontSize = `${size}px`;
      if (h.offsetHeight <= room) return;
    }
  });
  const webp = join(root, 'public', ogImagePathFor(g));
  const png = `${webp}.png`;
  await page.screenshot({ path: png, type: 'png' });   // Playwright 只輸出 png/jpeg
  execFileSync('cwebp', ['-quiet', '-q', '78', png, '-o', webp]);
  unlinkSync(png);
  sizes.push(statSync(webp).size);
  if (++n % 100 === 0) console.log(`  ... ${n}/${todo.length}`);
}
await browser.close();
rmSync(distDir, { recursive: true, force: true });

const kb = (b) => `${(b / 1024).toFixed(1)}KB`;
sizes.sort((a, b) => a - b);
console.log(`[og-images] 產生 ${n} 張；中位數 ${kb(sizes[Math.floor(sizes.length / 2)])}，最大 ${kb(sizes.at(-1))}，合計 ${kb(sizes.reduce((a, b) => a + b, 0))}`);
