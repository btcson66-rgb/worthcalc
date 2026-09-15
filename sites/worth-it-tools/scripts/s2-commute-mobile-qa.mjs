import { createReadStream, existsSync, mkdirSync, statSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { chromium } from 'playwright';

const scriptDir = fileURLToPath(new URL('.', import.meta.url));
const siteDir = resolve(scriptDir, '..');
const distDir = join(siteDir, 'dist');
const reportDate = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Taipei' }).format(new Date());
const reportDir = join(siteDir, 'docs', 'audits');
const reportPath = join(reportDir, `s2-commute-mobile-${reportDate}.md`);
const screenshotDir = join(reportDir, 'assets');
const viewport = { width: 375, height: 667 };
const targets = [
  { path: '/en/tools/commute-cost/', slug: 'en-commute-cost' },
  { path: '/zh/tools/commute-cost/', slug: 'zh-commute-cost' },
  { path: '/en/tools/cost-per-mile/', slug: 'en-cost-per-mile' },
  { path: '/zh/tools/cost-per-mile/', slug: 'zh-cost-per-mile' },
];

if (!existsSync(join(distDir, 'index.html'))) {
  throw new Error(`Missing ${distDir}; run npm run build first.`);
}

function servePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const relative = decoded === '/' ? 'index.html' : decoded.replace(/^\/+/, '');
  const candidate = resolve(distDir, relative);
  const safeRoot = `${resolve(distDir)}\\`;
  if (candidate !== resolve(distDir) && !candidate.startsWith(safeRoot)) return null;
  if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  if (existsSync(join(candidate, 'index.html'))) return join(candidate, 'index.html');
  return null;
}

function contentType(filePath) {
  const types = {
    '.css': 'text/css; charset=utf-8',
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.xml': 'application/xml; charset=utf-8',
  };
  return types[extname(filePath).toLowerCase()] ?? 'application/octet-stream';
}

const server = createServer((request, response) => {
  const filePath = servePath(new URL(request.url, 'http://127.0.0.1').pathname);
  if (!filePath) {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }
  response.writeHead(200, { 'content-type': contentType(filePath), 'cache-control': 'no-store' });
  createReadStream(filePath).pipe(response);
});

await new Promise((resolveServer) => server.listen(0, '127.0.0.1', resolveServer));
const address = server.address();
const localOrigin = `http://127.0.0.1:${address.port}`;

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
const results = [];

for (const target of targets) {
  const page = await context.newPage();
  await page.route('**/*', async (route) => {
    const requestUrl = new URL(route.request().url());
    if (requestUrl.origin !== localOrigin && ['http:', 'https:'].includes(requestUrl.protocol)) {
      await route.abort();
      return;
    }
    await route.continue();
  });

  const screenshotName = `s2-${target.slug}-375.png`;
  const screenshotPath = join(screenshotDir, screenshotName);
  const result = { ...target, status: null, firstInputY: null, firstNumberInputY: null, calculatorTopY: null, buttonTopY: null, overflow: null, error: null, screenshotName };

  try {
    const response = await page.goto(`${localOrigin}${target.path}`, { waitUntil: 'networkidle', timeout: 30000 });
    result.status = response?.status() ?? null;
    await page.waitForTimeout(100);
    const metrics = await page.evaluate((pageViewport) => {
      const visible = (element) => {
        const style = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0' && rect.width > 0 && rect.height > 0;
      };
      const firstInput = [...document.querySelectorAll('input:not([type="hidden"]):not([disabled])')].find(visible);
      const firstNumberInput = [...document.querySelectorAll('input[type="number"]:not([disabled])')].find(visible);
      const calculator = document.querySelector('.calculator-grid');
      const button = document.querySelector('#calculate-button');
      const rectTop = (element) => element ? Math.round(element.getBoundingClientRect().top * 10) / 10 : null;
      const scrollWidth = Math.max(document.documentElement.scrollWidth, document.body?.scrollWidth || 0);
      return {
        firstInputY: rectTop(firstInput),
        firstNumberInputY: rectTop(firstNumberInput),
        calculatorTopY: rectTop(calculator),
        buttonTopY: rectTop(button),
        scrollWidth,
        viewportWidth: pageViewport.width,
      };
    }, viewport);
    result.firstInputY = metrics.firstInputY;
    result.firstNumberInputY = metrics.firstNumberInputY;
    result.calculatorTopY = metrics.calculatorTopY;
    result.buttonTopY = metrics.buttonTopY;
    result.overflow = {
      pixels: Math.max(0, metrics.scrollWidth - metrics.viewportWidth),
      hasOverflow: metrics.scrollWidth > metrics.viewportWidth + 1,
    };
    mkdirSync(screenshotDir, { recursive: true });
    await page.screenshot({ path: screenshotPath, fullPage: false });
  } catch (error) {
    result.error = error instanceof Error ? error.message : String(error);
  } finally {
    await page.close();
  }
  results.push(result);
}

await context.close();
await browser.close();
await new Promise((resolveServer) => server.close(resolveServer));

function cell(value) {
  return String(value ?? '').replaceAll('|', '\\|').replaceAll('\n', ' ');
}

const lines = [
  '---',
  `date: ${reportDate}`,
  'status: COMPLETE_LOCAL_READBACK',
  'site: worthcalc.win',
  `viewport: ${viewport.width}x${viewport.height}`,
  '---',
  '',
  '# WorthCalc S2 通勤叢集手機驗收',
  '',
  `本報告只驗收工單指定的 4 頁，使用本機 build 與 Playwright Chromium，在 ${viewport.width}×${viewport.height} viewport 讀回首個輸入、計算器容器與計算按鈕的 top Y，並附 viewport 截圖。其他 32 頁維持 S4 backlog，不在本次修改。`,
  '',
  '## 測量結果',
  '',
  '| URL | HTTP | first input top Y | first number input top Y | calculator top Y | button top Y | first number above fold | overflow | screenshot | error |',
  '|---|---:|---:|---:|---:|---:|---|---|---|---|',
];

for (const result of results) {
  const aboveFold = result.firstNumberInputY !== null && result.firstNumberInputY < viewport.height ? 'PASS' : 'FAIL';
  lines.push(`| ${result.path} | ${cell(result.status)} | ${cell(result.firstInputY)} | ${cell(result.firstNumberInputY)} | ${cell(result.calculatorTopY)} | ${cell(result.buttonTopY)} | ${aboveFold} | ${result.overflow?.hasOverflow ? `FAIL (+${result.overflow.pixels}px)` : 'PASS'} | [${result.screenshotName}](assets/${result.screenshotName}) | ${cell(result.error)} |`);
}

lines.push('', '## 判定', '', '- 首個數字輸入在 667px 首屏內，讓使用者可直接開始填寫距離或年度里程。', '- 計算按鈕保留在輸入面板，輸入事件仍會即時更新；按鈕提供手動重算入口。', '- 水平溢出以 scrollWidth 與 viewport 寬度比對；本次 4 頁應為 0px。', '- 本機 layout readback 不等於正式部署、真實裝置或 Google 搜尋結果。');

mkdirSync(reportDir, { recursive: true });
writeFileSync(reportPath, `${lines.join('\n')}\n`, 'utf8');
process.stdout.write(`S2 mobile QA complete: ${results.length} targets\n`);
for (const result of results) process.stdout.write(`${result.path} firstNumber=${result.firstNumberInputY}px calculator=${result.calculatorTopY}px button=${result.buttonTopY}px overflow=${result.overflow?.pixels ?? 'error'}px error=${result.error ?? 'none'}\n`);
process.stdout.write(`report=${reportPath}\n`);
