import { createReadStream, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { chromium } from 'playwright';

const scriptDir = fileURLToPath(new URL('.', import.meta.url));
const siteDir = resolve(scriptDir, '..');
const distDir = join(siteDir, 'dist');
const sitemapPath = join(distDir, 'sitemap-0.xml');
const reportDate = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Taipei' }).format(new Date());
const reportPath = join(siteDir, 'docs', 'audits', `mobile-sweep-${reportDate}.md`);
const viewport = { width: 375, height: 667 };

if (!existsSync(sitemapPath)) {
  throw new Error(`Missing ${sitemapPath}; run npm run build first.`);
}

const sitemap = readFileSync(sitemapPath, 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (sitemapUrls.length === 0) {
  throw new Error(`No URLs found in ${sitemapPath}`);
}

function servePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const relative = decoded === '/' ? 'index.html' : decoded.replace(/^\/+/, '');
  const candidate = resolve(distDir, relative);
  const safeRoot = `${resolve(distDir)}\\`;
  if (candidate !== resolve(distDir) && !candidate.startsWith(safeRoot)) return null;

  if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  if (decoded.endsWith('/') && existsSync(join(candidate, 'index.html'))) return join(candidate, 'index.html');
  if (existsSync(join(candidate, 'index.html'))) return join(candidate, 'index.html');
  return null;
}

function contentType(filePath) {
  const types = {
    '.css': 'text/css; charset=utf-8',
    '.gif': 'image/gif',
    '.html': 'text/html; charset=utf-8',
    '.ico': 'image/x-icon',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.xml': 'application/xml; charset=utf-8',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
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

function localUrl(publicUrl) {
  const parsed = new URL(publicUrl);
  return `${localOrigin}${parsed.pathname}${parsed.search}`;
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
const results = [];

for (const publicUrl of sitemapUrls) {
  const page = await context.newPage();
  await page.route('**/*', async (route) => {
    const requestUrl = new URL(route.request().url());
    if (requestUrl.origin !== localOrigin && ['http:', 'https:'].includes(requestUrl.protocol)) {
      await route.abort();
      return;
    }
    await route.continue();
  });

  const result = {
    url: publicUrl,
    path: new URL(publicUrl).pathname,
    status: null,
    overflow: null,
    undersized: [],
    primary: { status: 'not_applicable', selector: null, top: null },
    error: null,
  };

  try {
    const response = await page.goto(localUrl(publicUrl), { waitUntil: 'networkidle', timeout: 30000 });
    result.status = response?.status() ?? null;
    await page.waitForTimeout(50);
    const metrics = await page.evaluate((pageViewport) => {
      const visible = (element) => {
        const style = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) !== 0 && rect.width > 0 && rect.height > 0;
      };
      const label = (element) => (element.getAttribute('aria-label') || element.textContent || element.getAttribute('title') || '').replace(/\s+/g, ' ').trim().slice(0, 100);
      const allClickables = [...document.querySelectorAll('a,button,input,select,textarea,[role="button"],[tabindex]')]
        .filter(visible)
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return {
            tag: element.tagName.toLowerCase(),
            label: label(element),
            href: element.getAttribute('href') || '',
            width: Math.round(rect.width * 10) / 10,
            height: Math.round(rect.height * 10) / 10,
            top: Math.round(rect.top * 10) / 10,
          };
        });
      const primarySelectors = [
        '[data-action="calculate"]',
        'form:not([data-newsletter-form]) button[type="submit"]',
        'form:not([data-newsletter-form]) input[type="submit"]',
      ];
      let primary = null;
      let selector = null;
      for (const candidateSelector of primarySelectors) {
        const candidate = [...document.querySelectorAll(candidateSelector)].find(visible);
        if (candidate) {
          primary = candidate.getBoundingClientRect();
          selector = candidateSelector;
          break;
        }
      }
      return {
        scrollWidth: Math.max(document.documentElement.scrollWidth, document.body?.scrollWidth || 0),
        viewportWidth: pageViewport.width,
        undersized: allClickables.filter((item) => item.width < 44 || item.height < 44),
        primary: primary ? { selector, top: Math.round(primary.top * 10) / 10, bottom: Math.round(primary.bottom * 10) / 10 } : null,
      };
    }, viewport);
    result.overflow = {
      scrollWidth: metrics.scrollWidth,
      viewportWidth: metrics.viewportWidth,
      pixels: Math.max(0, metrics.scrollWidth - metrics.viewportWidth),
      hasOverflow: metrics.scrollWidth > metrics.viewportWidth + 1,
    };
    result.undersized = metrics.undersized;
    if (metrics.primary) {
      result.primary = {
        status: metrics.primary.top < viewport.height && metrics.primary.bottom > 0 ? 'above_fold' : 'below_fold',
        selector: metrics.primary.selector,
        top: metrics.primary.top,
        bottom: metrics.primary.bottom,
      };
    }
  } catch (error) {
    result.error = error instanceof Error ? error.message : String(error);
  } finally {
    await page.close();
  }
  results.push(result);
  process.stdout.write(`mobile-sweep ${results.length}/${sitemapUrls.length}\r`);
}

await context.close();
await browser.close();
await new Promise((resolveServer) => server.close(resolveServer));

const overflowPages = results.filter((result) => result.overflow?.hasOverflow);
const undersizedPages = results.filter((result) => result.undersized.length > 0);
const aboveFoldPages = results.filter((result) => result.primary.status === 'above_fold');
const belowFoldPages = results.filter((result) => result.primary.status === 'below_fold');
const applicablePrimaryPages = results.filter((result) => result.primary.status !== 'not_applicable' && !result.error);
const errors = results.filter((result) => result.error);

function cell(value) {
  return String(value ?? '').replaceAll('|', '\\|').replaceAll('\n', ' ');
}

const lines = [
  '---',
  `date: ${reportDate}`,
  'status: COMPLETE_READONLY',
  'site: worthcalc.win',
  `viewport: ${viewport.width}x${viewport.height}`,
  '---',
  '',
  '# WorthCalc mobile sweep',
  '',
  `本機 build 的 sitemap-0.xml 共 ${sitemapUrls.length} 個 URL；Playwright Chromium 以 ${viewport.width}×${viewport.height} viewport 逐頁檢查。此掃描器是 S5 稽核工具，不納入 npm run verify。`,
  '',
  '## 結果摘要',
  '',
  `- 水平溢出：${overflowPages.length}/${results.length} 頁。`,
  `- 低於 44px 的可點擊控制：${undersizedPages.length}/${results.length} 頁。`,
  `- 有主要按鈕的頁面：${applicablePrimaryPages.length} 頁；首屏：${aboveFoldPages.length} 頁；首屏以下：${belowFoldPages.length} 頁。沒有主要計算按鈕的內容／索引頁標為 not_applicable。`,
  `- 導航／執行錯誤：${errors.length}/${results.length} 頁。`,
  '',
  '## 逐頁結果',
  '',
  '| # | URL | HTTP | overflow | max scroll px | undersized controls | primary button | error |',
  '|---:|---|---:|---|---:|---:|---|---|',
];

results.forEach((result, index) => {
  lines.push(`| ${index + 1} | ${cell(result.path)} | ${cell(result.status)} | ${result.overflow?.hasOverflow ? 'yes' : 'no'} | ${cell(result.overflow?.pixels)} | ${result.undersized.length} | ${cell(result.primary.status)} | ${cell(result.error)} |`);
});

if (overflowPages.length > 0) {
  lines.push('', '## 水平溢出明細', '');
  for (const result of overflowPages) lines.push(`- ${result.path}: ${result.overflow.pixels}px over (scrollWidth ${result.overflow.scrollWidth}px).`);
}

if (undersizedPages.length > 0) {
  lines.push('', '## 低於 44px 控制明細', '');
  for (const result of undersizedPages) {
    const sample = result.undersized.slice(0, 12).map((item) => `${item.tag}[${item.width}×${item.height}] ${item.label || '(no label)'}`).join('; ');
    lines.push(`- ${result.path}: ${result.undersized.length} 個；${sample}${result.undersized.length > 12 ? ' …' : ''}`);
  }
}

if (belowFoldPages.length > 0) {
  lines.push('', '## 主要按鈕未在首屏', '');
  for (const result of belowFoldPages) lines.push(`- ${result.path}: ${result.primary.selector} top=${result.primary.top}px.`);
}

if (errors.length > 0) {
  lines.push('', '## 錯誤明細', '');
  for (const result of errors) lines.push(`- ${result.path}: ${result.error}`);
}

lines.push('', '## 判定與限制', '', '- 這是本機靜態 build 的 layout smoke sweep，不等同於正式站部署或真實裝置實測。', '- 外部網路資源由掃描器阻擋，以避免第三方資源、廣告或分析請求改變結果；本機 build 內的頁面與資產仍照常載入。', '- 本報告只記錄 S5 要求的三項觀察，不會自動修改頁面或把此掃描加入 verify gate。');

mkdirSync(join(siteDir, 'docs', 'audits'), { recursive: true });
writeFileSync(reportPath, `${lines.join('\n')}\n`, 'utf8');
process.stdout.write(`\nmobile-sweep complete: ${results.length} URLs; overflow=${overflowPages.length}; undersized=${undersizedPages.length}; primaryAboveFold=${aboveFoldPages.length}; errors=${errors.length}\n`);
process.stdout.write(`report=${reportPath}\n`);
