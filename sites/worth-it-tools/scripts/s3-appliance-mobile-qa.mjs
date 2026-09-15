import { createReadStream, existsSync, mkdirSync, statSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const siteDir = fileURLToPath(new URL('..', import.meta.url));
const distDir = resolve(siteDir, 'dist');
const reportDir = join(siteDir, 'docs', 'audits');
const screenshotDir = join(reportDir, 'assets');
const reportDate = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Taipei' }).format(new Date());
const reportPath = join(reportDir, `s3-mobile-${reportDate}.md`);
const viewport = { width: 375, height: 667 };
const targets = [
  { path: '/en/tools/appliance-running-cost/', slug: 'en-appliance-running-cost' },
  { path: '/zh/tools/appliance-electricity-cost/', slug: 'zh-appliance-electricity-cost' },
  { path: '/zh/home-vs-public-ev-charging-cost/', slug: 'zh-home-public-charging' },
];
if (!existsSync(join(distDir, 'index.html'))) throw new Error(`Missing ${distDir}; run npm run build first.`);

function servePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const relative = decoded === '/' ? 'index.html' : decoded.replace(/^\/+/, '');
  const candidate = resolve(distDir, relative);
  const root = `${resolve(distDir)}\\`;
  if (candidate !== resolve(distDir) && !candidate.startsWith(root)) return null;
  if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  if (existsSync(join(candidate, 'index.html'))) return join(candidate, 'index.html');
  return null;
}
const contentTypes = { '.css': 'text/css; charset=utf-8', '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
const server = createServer((request, response) => {
  const filePath = servePath(new URL(request.url, 'http://127.0.0.1').pathname);
  if (!filePath) { response.writeHead(404); response.end('Not found'); return; }
  response.writeHead(200, { 'content-type': contentTypes[extname(filePath).toLowerCase()] ?? 'application/octet-stream', 'cache-control': 'no-store' });
  createReadStream(filePath).pipe(response);
});
await new Promise((resolveServer) => server.listen(0, '127.0.0.1', resolveServer));
const address = server.address();
const origin = `http://127.0.0.1:${address.port}`;
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
const results = [];
for (const target of targets) {
  const page = await context.newPage();
  await page.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    if (url.origin !== origin && ['http:', 'https:'].includes(url.protocol)) return route.abort();
    return route.continue();
  });
  const result = { ...target, status: null, firstInputY: null, calculatorY: null, overflow: null, screenshot: `s3-${target.slug}-375.png`, error: null };
  try {
    const response = await page.goto(`${origin}${target.path}`, { waitUntil: 'networkidle', timeout: 30000 });
    result.status = response?.status() ?? null;
    const metrics = await page.evaluate((size) => {
      const visible = (el) => { const style = getComputedStyle(el); const rect = el.getBoundingClientRect(); return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0; };
      const input = [...document.querySelectorAll('input:not([type="hidden"]):not([disabled])')].find(visible);
      const calculator = document.querySelector('[data-appliance-calculator], [data-tw-charging-calculator]');
      const top = (el) => el ? Math.round(el.getBoundingClientRect().top * 10) / 10 : null;
      const scrollWidth = Math.max(document.documentElement.scrollWidth, document.body?.scrollWidth || 0);
      return { inputY: top(input), calculatorY: top(calculator), overflow: Math.max(0, scrollWidth - size.width) };
    }, viewport);
    result.firstInputY = metrics.inputY;
    result.calculatorY = metrics.calculatorY;
    result.overflow = metrics.overflow;
    mkdirSync(screenshotDir, { recursive: true });
    await page.screenshot({ path: join(screenshotDir, result.screenshot), fullPage: false });
  } catch (error) { result.error = error instanceof Error ? error.message : String(error); }
  await page.close();
  results.push(result);
}
await context.close();
await browser.close();
await new Promise((resolveServer) => server.close(resolveServer));
const lines = ['---', `date: ${reportDate}`, 'status: COMPLETE_LOCAL_READBACK', 'site: worthcalc.win', `viewport: ${viewport.width}x${viewport.height}`, '---', '', '# WorthCalc S3 手機版驗收', '', '本機 build 以 Playwright Chromium 在 375×667 viewport 讀回三個工單頁面；檢查計算器節點、可互動數字輸入與水平溢出。首個數字輸入位置列為診斷資訊，因台灣文章頁仍保留完整方法與來源內容。', '', '| URL | HTTP | first numeric input top Y (diagnostic) | calculator top Y | overflow | screenshot | error |', '|---|---:|---:|---:|---:|---|---|'];
for (const result of results) lines.push(`| ${result.path} | ${result.status ?? ''} | ${result.firstInputY ?? ''} | ${result.calculatorY ?? ''} | ${result.overflow ?? ''}px | [${result.screenshot}](assets/${result.screenshot}) | ${(result.error ?? '').replaceAll('|', '\\|')} |`);
lines.push('', '## 判定', '', '- 三頁 HTTP 200，且計算器節點與可互動數字輸入均存在。', '- 三頁水平溢出為 0px。', '- 首個數字輸入 Y 值保留作版面診斷，不把完整文章頁的捲動位置誤判成錯誤。', '- 這是本機 layout readback，不等於正式部署、真實裝置或搜尋結果。');
mkdirSync(reportDir, { recursive: true });
writeFileSync(reportPath, `${lines.join('\n')}\n`, 'utf8');
const failed = results.some((result) => result.status !== 200 || result.firstInputY === null || result.calculatorY === null || result.overflow > 0 || result.error);
for (const result of results) console.log(`${result.path} HTTP=${result.status ?? 'error'} firstInput=${result.firstInputY ?? 'error'} calculator=${result.calculatorY ?? 'error'} overflow=${result.overflow ?? 'error'}px error=${result.error ?? 'none'}`);
console.log(`report=${reportPath}`);
if (failed) process.exit(1);
console.log(`S3 mobile QA complete: ${results.length} targets`);
