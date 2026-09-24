import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';

const base = process.env.WORTHCALC_E2E_BASE || 'http://127.0.0.1:4321';
const out = new URL('../docs/full-audit-002/', import.meta.url);
mkdirSync(out, { recursive: true });
const slugs = [
  'home-affordability', 'mortgage-payoff', 'rent-vs-buy', 'cashback-breakeven',
  'credit-card-payoff', 'debt-strategy', 'dti-calculator', 'installment-true-apr',
  'car-affordability', 'commute-cost', 'cost-per-mile', 'ev-vs-gas', 'latte-factor',
  'costco-membership', 'subscription-audit', 'compound-growth', 'salary-converter', 'budget-builder',
];
const browser = await chromium.launch({ headless: true });
const rows = [];
for (const slug of slugs) {
  const row = { slug, checks: {}, errors: [] };
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, acceptDownloads: true });
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const page = await context.newPage();
  await page.addInitScript(() => { window.print = () => { window.__worthcalcPrinted = true; }; });
  page.on('pageerror', (error) => row.errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') row.errors.push(message.text()); });
  try {
    const response = await page.goto(`${base}/en/tools/${slug}/`, { waitUntil: 'domcontentloaded' });
    row.checks.route = response?.status() === 200;
    row.checks.render = await page.locator('h1').count() === 1;
    row.checks.mobile = await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 3);
    const growth = page.locator('[data-growth-calculator]');
    if (await growth.count()) {
      await page.locator('[data-action="example"]').first().click();
      row.checks.example = await page.locator('[data-growth-calculator] input[data-field]').first().inputValue() !== '';
      await page.locator('[data-action="calculate"]').first().click();
      row.checks.calculate = await page.locator('[data-metric]').first().innerText() !== '—';
      row.checks.no_nan = !(await growth.innerText()).includes('NaN');
      const set = async (id, value) => page.locator(`[data-growth-calculator] [data-field="${id}"]`).fill(String(value));
      const metric = async (id) => Number((await page.locator(`[data-metric="${id}"]`).innerText()).replace(/[^0-9.-]/g, ''));
      if (await page.locator('.growth-advanced summary').count()) await page.locator('.growth-advanced summary').click();
      if (slug === 'mortgage-payoff') {
        await set('balance', 1200); await set('annualRate', 0); await set('remainingMonths', 12);
        await set('scheduledPayment', 0); await set('extraMonthly', 0); await set('lumpAmount', 0);
        await page.locator('[data-action="calculate"]').first().click();
        row.checks.fixture = Math.abs(await metric('scheduledPaymentOut') - 100) < 0.01 && await metric('baselineMonths') === 12;
        await page.locator('[data-action="copy"]').first().click();
        row.checks.copy = (await page.evaluate(() => navigator.clipboard.readText())).includes('Mortgage');
        const download = page.waitForEvent('download');
        await page.locator('[data-action="csv"]').first().click();
        row.checks.csv = (await download).suggestedFilename() === 'mortgage-payoff.csv';
        await page.locator('[data-action="print"]').first().click();
        row.checks.print = await page.evaluate(() => window.__worthcalcPrinted === true);
      }
      if (slug === 'dti-calculator') {
        await set('grossIncome', 8000); await set('housingPayment', 2000);
        await set('otherDebt1', 400); await set('otherDebt2', 0);
        await page.locator('[data-action="calculate"]').first().click();
        row.checks.fixture = Math.abs(await metric('backEnd') - 30) < 0.01;
      }
      if (slug === 'credit-card-payoff') {
        await set('balance', 1200); await set('annualRate', 0); await set('monthlyPayment', 100);
        await page.locator('[data-field="mode"]').selectOption('fixed');
        await set('newCharges', 0); await set('promoRate', 0); await set('promoMonths', 0);
        await page.locator('[data-action="calculate"]').first().click();
        row.checks.fixture = await metric('payoffMonths') === 12 && Math.abs(await metric('totalInterest')) < 0.01;
      }
      await page.locator('[data-action="reset"]').first().click();
      await page.waitForTimeout(30); // The form reset handler clears metrics in a setTimeout.
      row.checks.reset = await page.locator('[data-metric]').first().innerText() === '—';
      await page.locator('[data-action="calculate"]').first().click();
      row.checks.validation = await page.locator('[data-field-error]').evaluateAll((nodes) => nodes.some((node) => node.textContent?.trim()));
      const input = page.locator('[data-growth-calculator] input[type=number]').first();
      await input.fill('-1');
      await page.locator('[data-action="calculate"]').first().click();
      row.checks.negative = await page.locator('[data-field-error]').evaluateAll((nodes) => nodes.some((node) => node.textContent?.trim()));
      if (slug === 'budget-builder') {
        await page.locator('[data-action="example"]').first().click();
        await page.locator('[data-action="calculate"]').first().click();
        row.checks.save = await page.evaluate(() => !!localStorage.getItem('worthcalc:budget-builder'));
        await page.reload({ waitUntil: 'domcontentloaded' });
        row.checks.restore = await page.locator('[data-growth-calculator] input[data-field]').first().inputValue() !== '';
        await page.locator('[data-action="reset"]').first().click();
        await page.waitForTimeout(30);
        row.checks.clear = await page.evaluate(() => !localStorage.getItem('worthcalc:budget-builder'));
      }
    } else {
      const input = page.locator('main input[type=number]').first();
      const verdict = page.locator('.result-panel .verdict, .result-panel .headline-result').first();
      row.checks.example = await input.count() > 0 && await input.inputValue() !== '';
      if (slug === 'costco-membership') {
        await page.locator('#eligible-annual-spend').fill('3000');
        await page.locator('#eligible-annual-spend').dispatchEvent('input');
      }
      await page.waitForTimeout(30);
      row.checks.calculate = await verdict.count() > 0 && !(await verdict.innerText()).includes('Enter ') && !(await verdict.innerText()).includes('NaN');
      const originalInput = await input.inputValue();
      await input.fill('0');
      await input.dispatchEvent('input');
      row.checks.edge = !(await verdict.innerText()).includes('NaN');
      await input.fill('-1');
      await input.dispatchEvent('input');
      row.checks.negative = !(await verdict.innerText()).includes('NaN');
      await input.fill('');
      await input.dispatchEvent('input');
      row.checks.validation = !(await verdict.innerText()).includes('NaN');
      await page.reload({ waitUntil: 'domcontentloaded' });
      row.checks.reset = await input.inputValue() === originalInput;
      row.checks.no_nan = !(await page.locator('main').innerText()).includes('NaN');
    }
    const zh = await page.goto(`${base}/zh/tools/${slug}/`, { waitUntil: 'domcontentloaded' });
    row.checks.locale = zh?.status() === 200 && (await page.locator('html').getAttribute('lang'))?.startsWith('zh');
  } catch (error) {
    row.errors.push(error.stack || String(error));
  }
  row.checks.console = row.errors.length === 0;
  row.pass = Object.values(row.checks).every(Boolean);
  rows.push(row);
  console.log(`${row.pass ? 'PASS' : 'FAIL'} ${slug} ${JSON.stringify(row.checks)}`);
  await context.close();
}
await browser.close();
writeFileSync(new URL('WORTHCALC-CALCULATOR-E2E-002.json', out), JSON.stringify({ base, rows }, null, 2));
if (rows.some((row) => !row.pass)) process.exitCode = 1;
