import { chromium } from 'playwright';
import { build } from 'esbuild';
import { mkdirSync, writeFileSync, readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const fixture = resolve(root, 'dist/__audit-gate-002');
const output = resolve(root, 'docs/full-audit-002');
mkdirSync(fixture, { recursive: true });
mkdirSync(output, { recursive: true });
await build({ entryPoints: [resolve(root, 'src/lib/downloadGate.ts')], outfile: resolve(fixture, 'gate.js'), bundle: true, format: 'esm', platform: 'browser' });
writeFileSync(resolve(fixture, 'index.html'), `<!doctype html><html lang="en"><head><title>Gate E2E fixture</title></head><body>
<button id="download">Export TXT</button><div id="mount"></div><span id="fallback"></span>
<script type="module">
import {requestGatedDownload} from './gate.js';
const labels={title:'Email export',desc:'Enter email',emailPlaceholder:'Email',submit:'Send',sending:'Sending',sentEmail:'Sent to {email}',sentLocal:'Downloaded locally',invalidEmail:'Invalid email',privacyNote:'Email is used for delivery',changeEmail:'Change email'};
document.querySelector('#download').onclick=()=>requestGatedDownload({tool:'fixture',labels,anchor:document.querySelector('#mount'),getFile:()=>({blob:new Blob(['fixture text'],{type:'text/plain'}),filename:'fixture.txt'}),fallback:()=>{document.querySelector('#fallback').textContent='fallback';const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['fixture text']));a.download='fixture.txt';a.click();URL.revokeObjectURL(a.href)}});
</script></body></html>`);
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ acceptDownloads: true });
const page = await context.newPage();
const base = process.env.WORTHCALC_E2E_BASE || 'http://127.0.0.1:4321';
const checks = {};
await page.route('https://roomfeng.win/api/download-gate', route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true, delivery: 'email' }) }));
await page.goto(`${base}/__audit-gate-002/`);
await page.locator('#download').click();
checks.panel = await page.locator('.wc-gate input[type=email]').count() === 1;
await page.locator('.wc-gate input[type=email]').fill('invalid');
await page.locator('.wc-gate button[type=submit]').click();
checks.invalid_email = (await page.locator('.wc-gate-status').innerText()).includes('Invalid');
await page.locator('.wc-gate input[type=email]').fill('audit@example.test');
await page.locator('.wc-gate button[type=submit]').click();
await page.waitForFunction(() => document.querySelector('.wc-gate-status')?.textContent?.includes('Sent to audit@example.test'));
checks.email_gate = await page.evaluate(() => localStorage.getItem('wc_gate_email') === 'audit@example.test');
await page.evaluate(() => localStorage.removeItem('wc_gate_email'));
await page.unrouteAll();
await page.route('https://roomfeng.win/api/download-gate', route => route.abort());
await page.reload();
await page.locator('#download').click();
await page.locator('.wc-gate input[type=email]').fill('audit@example.test');
const download = page.waitForEvent('download');
await page.locator('.wc-gate button[type=submit]').click();
checks.failure_fallback = (await download).suggestedFilename() === 'fixture.txt' && await page.locator('#fallback').innerText() === 'fallback';
const pageSources = [];
function walk(folder) {
  for (const entry of readdirSync(folder, { withFileTypes: true })) {
    const path = resolve(folder, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (entry.name.endsWith('.astro')) pageSources.push(path);
  }
}
walk(resolve(root, 'src/pages'));
checks.no_production_page_import = pageSources.every(path => !/ExportButtons|requestGatedDownload/.test(readFileSync(path, 'utf8')));
const calculatorSlugs = ['home-affordability', 'mortgage-payoff', 'rent-vs-buy', 'cashback-breakeven', 'credit-card-payoff', 'debt-strategy', 'dti-calculator', 'installment-true-apr', 'car-affordability', 'commute-cost', 'cost-per-mile', 'ev-vs-gas', 'latte-factor', 'costco-membership', 'subscription-audit', 'compound-growth', 'salary-converter', 'budget-builder'];
const entryCounts = { production: 0, candidate: 0 };
const httpReadbacks = {};
for (const [surface, origin] of Object.entries({ production: 'https://worthcalc.win', candidate: base })) {
  httpReadbacks[surface] = await Promise.all(calculatorSlugs.map(async slug => {
    const response = await fetch(`${origin}/en/tools/${slug}/`, { signal: AbortSignal.timeout(20000) });
    const html = await response.text();
    const entries = (html.match(/data-export-actions|class="wc-gate"/g) || []).length;
    entryCounts[surface] += entries;
    return { slug, status: response.status, entries };
  }));
}
checks.no_live_email_export_entry = Object.values(httpReadbacks).every(rows => rows.every(row => row.status === 200 && row.entries === 0));
const privacy = {};
for (const locale of ['en', 'zh']) {
  await page.goto(`${base}/${locale}/privacy/`, { waitUntil: 'domcontentloaded' });
  privacy[locale] = await page.locator('main').innerText();
}
checks.privacy_current_feature = /newsletter/i.test(privacy.en) && /Brevo/i.test(privacy.en)
  && /電子報/.test(privacy.zh) && /Brevo/.test(privacy.zh)
  && !/send the file to my inbox|send the exported file to my inbox/i.test(privacy.en)
  && !/把.*檔案寄到信箱/.test(privacy.zh);
await browser.close();
writeFileSync(resolve(output, 'WORTHCALC-EXPORT-GATE-E2E-002.json'), JSON.stringify({ base, entryCounts, httpReadbacks, checks, pass: Object.values(checks).every(Boolean) }, null, 2));
console.log(JSON.stringify(checks));
if (Object.values(checks).some(value => !value)) process.exitCode = 1;
