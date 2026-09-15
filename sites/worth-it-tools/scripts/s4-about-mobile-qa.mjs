import { createReadStream, existsSync, mkdirSync, statSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const siteDir = fileURLToPath(new URL('..', import.meta.url));
const distDir = resolve(siteDir, 'dist');
const reportDir = join(siteDir, 'docs', 'audits');
const screenshotDir = join(reportDir, 'assets');
const targets = ['en', 'zh', 'es', 'fr', 'de'].map((locale) => ({
  locale,
  path: '/' + locale + '/about/',
  screenshot: 's4-about-' + locale + '-375.png',
}));
const viewport = { width: 375, height: 667 };

if (!existsSync(join(distDir, 'index.html'))) throw new Error('Missing dist/index.html; run npm run build first.');
mkdirSync(screenshotDir, { recursive: true });

function servePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const relativePath = decoded === '/' ? 'index.html' : decoded.replace(/^\/+/, '');
  const candidate = resolve(distDir, relativePath);
  const root = resolve(distDir) + '\\';
  if (candidate !== resolve(distDir) && !candidate.startsWith(root)) return null;
  if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  if (existsSync(join(candidate, 'index.html'))) return join(candidate, 'index.html');
  return null;
}

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};
const server = createServer((request, response) => {
  const filePath = servePath(new URL(request.url, 'http://127.0.0.1').pathname);
  if (!filePath) {
    response.writeHead(404);
    response.end('Not found');
    return;
  }
  response.writeHead(200, {
    'content-type': contentTypes[extname(filePath).toLowerCase()] ?? 'application/octet-stream',
    'cache-control': 'no-store',
  });
  createReadStream(filePath).pipe(response);
});

await new Promise((resolveServer) => server.listen(0, '127.0.0.1', resolveServer));
const address = server.address();
const origin = 'http://127.0.0.1:' + address.port;
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
  const result = { ...target, status: null, hasAuthorMethodology: false, horizontalOverflow: null, error: null };
  try {
    const response = await page.goto(origin + target.path, { waitUntil: 'networkidle', timeout: 30000 });
    result.status = response?.status() ?? null;
    const metrics = await page.evaluate(() => ({
      hasAuthorMethodology: Boolean(document.querySelector('[data-author-methodology]')),
      horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
    }));
    result.hasAuthorMethodology = metrics.hasAuthorMethodology;
    result.horizontalOverflow = metrics.horizontalOverflow;
    await page.screenshot({ path: join(screenshotDir, target.screenshot), fullPage: true });
  } catch (error) {
    result.error = error.message;
  } finally {
    await page.close();
  }
  results.push(result);
}

await browser.close();
await new Promise((resolveServer) => server.close(resolveServer));

const failures = results.filter((result) => result.status !== 200 || !result.hasAuthorMethodology || result.horizontalOverflow || result.error);
const report = [
  '# S4 五語系 about 行動版渲染驗收',
  '',
  '- viewport：375 × 667，Playwright headless Chromium',
  '- 外部網路：已封鎖；只檢查本次 dist 產物',
  '',
  '| locale | HTTP | 作者方法論區塊 | 水平溢出 | 截圖 |',
  '| --- | ---: | --- | --- | --- |',
  ...results.map((result) => '| ' + result.locale + ' | ' + result.status + ' | ' + (result.hasAuthorMethodology ? 'PASS' : 'FAIL') + ' | ' + (result.horizontalOverflow ? 'FAIL' : 'PASS') + ' | [screenshot](./assets/' + result.screenshot + ') |'),
  '',
  failures.length === 0 ? '五語系區塊均成功渲染，且未發現水平溢出。' : '失敗：' + failures.map((result) => result.locale + ' ' + result.error).join('; '),
  '',
].join('\n');
writeFileSync(join(reportDir, 's4-about-mobile-2026-09-15.md'), report, 'utf8');
console.log('[s4-about-mobile] ' + (failures.length === 0 ? 'PASS' : 'FAIL') + ' — ' + results.length + ' locales; screenshots in ' + screenshotDir);
if (failures.length > 0) process.exit(1);
