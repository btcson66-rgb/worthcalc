// worthcalc.win 線上修復驗收（任務 A）
// 對應 PR btcson66-rgb/worthcalc#122 / commit 730f368
//
// 用法：node verify-worthcalc-live.mjs
// 需要 playwright（沒有的話：npx playwright install chromium）
//
// 這是驗收腳本，不是開發工具。任何 FAIL 都要原樣回報，不要去改網站程式碼讓它變綠。
import { chromium } from 'playwright';

const BASE = 'https://worthcalc.win';
let fail = 0;
const check = (name, ok, detail = '') => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  ::  ' + detail : ''}`);
  if (!ok) fail++;
};

// 修復前在 375px 會橫向捲動的 25 個頁面（雲端本機重建產物實測值，單位 px）
const PREVIOUSLY_OVERFLOWING = [
  ['/en/guides/insurance-deductible-cash-reserve/', 350],
  ['/en/guides/annual-bills-cash-flow-low-point/', 150],
  ['/en/guides/debt-consolidation-break-even/', 146],
  ['/en/guides/financial-runway-months/', 142],
  ['/en/guides/amortization-schedule-explained/', 137],
  ['/en/emergency-fund-irregular-income/', 135],
  ['/en/guides/car-loan-60-vs-72-vs-84-early-exit/', 135],
  ['/en/guides/balance-transfer-break-even/', 103],
  ['/en/guides/cash-runway-before-quitting-job/', 90],
  ['/de/tools/mortgage-payoff/', 57],
  ['/de/is-an-extended-warranty-worth-it/', 45],
  ['/en/apr-vs-apy/', 43],
  ['/en/guides/auto-loan-negative-equity-rollover-cost/', 43],
  ['/en/guides/car-down-payment-vs-liquidity/', 43],
  ['/en/guides/high-vs-low-insurance-deductible-break-even/', 43],
  ['/de/terms/', 37],
  ['/en/guides/cash-flow-buffer-vs-emergency-fund/', 36],
  ['/de/privacy/', 29],
  ['/de/hourly-vs-annual-salary/', 24],
  ['/de/extra-mortgage-payments-guide/', 17],
  ['/de/delivery-membership-break-even/', 11],
  ['/de/is-costco-executive-membership-worth-it/', 10],
  ['/de/repair-or-replace-decision-formula/', 10],
  ['/de/budget-with-irregular-income/', 6],
  ['/de/upfront-fees-financing-cost/', 5],
];

const browser = await chromium.launch();

// ── 0. 先確認線上跑的是新版（若這裡就 FAIL，後面全部沒有意義：可能是 CDN 快取或部署沒生效）
{
  const ctx = await browser.newContext({ viewport: { width: 1000, height: 800 } });
  const page = await ctx.newPage();
  const resp = await page.goto(`${BASE}/en/tools/compound-growth/`, { waitUntil: 'domcontentloaded' });
  check('compound-growth 頁面回 200', resp.status() === 200, `HTTP ${resp.status()}`);
  await page.waitForTimeout(400);
  const max = await page.getAttribute('[data-field="years"]', 'max');
  check('線上是新版（years 欄位有 max="100"）', max === '100',
    `實際 max=${max ?? '(沒有這個屬性 → 線上還是舊版，先確認部署或 CDN 快取)'}`);
  await ctx.close();
}

// ── 1. 缺陷 1：年數上限
for (const loc of ['en', 'zh']) {
  const ctx = await browser.newContext({ viewport: { width: 1000, height: 800 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/${loc}/tools/compound-growth/`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(400);

  const setFields = (vals) => page.evaluate((v) => {
    for (const [k, val] of Object.entries(v)) {
      const el = document.querySelector(`[data-field="${k}"]`);
      if (el) { el.value = String(val); el.dispatchEvent(new Event('input', { bubbles: true })); }
    }
  }, vals);

  // 極端值：修復前這個輸入會凍住分頁 30 秒以上
  await setFields({ initialPrincipal: 10000, monthlyContribution: 500, returnRate: 6, feeRate: 0.5,
                    inflationRate: 2.5, years: 999999999, contributionGrowth: 2, targetAmount: 250000 });
  const t0 = Date.now();
  let froze = false;
  try { await page.click('[data-action="calculate"]', { timeout: 10000 }); }
  catch { froze = true; }
  const ms = Date.now() - t0;
  await page.waitForTimeout(300);
  const txt1 = await page.evaluate(() => document.body.innerText);
  check(`[${loc}] years=999999999 不會凍住分頁`, !froze && ms < 3000, `${ms}ms`);
  check(`[${loc}] years=999999999 畫面沒有 ∞ 或 NaN`, !txt1.includes('∞') && !txt1.includes('NaN'));
  check(`[${loc}] years=999999999 有標示欄位錯誤`,
    (await page.locator('[data-field-wrap="years"].has-error').count()) === 1);

  // 修復前這個輸入會顯示 $∞ 與 $NaN
  await setFields({ years: 50000 });
  await page.click('[data-action="calculate"]');
  await page.waitForTimeout(300);
  const txt2 = await page.evaluate(() => document.body.innerText);
  check(`[${loc}] years=50000 畫面沒有 ∞ 或 NaN`, !txt2.includes('∞') && !txt2.includes('NaN'));

  // 正常值必須照常算得出來（確認沒有把功能一起擋掉）
  await page.click('[data-action="example"]');
  await page.waitForTimeout(250);
  await page.click('[data-action="calculate"]');
  await page.waitForTimeout(500);
  const bal = await page.evaluate(() => document.querySelector('[data-metric="endingBalance"]')?.textContent ?? '');
  check(`[${loc}] 範例值照常計算`, /\d/.test(bal) && !/NaN|∞|^—$/.test(bal.trim()), bal);

  // ── 2. 缺陷 2：結果區的標籤與數值要分開
  const metric = await page.evaluate(() => {
    const m = document.querySelector('.metric');
    if (!m) return null;
    const s = m.querySelector('span'), st = m.querySelector('strong');
    return {
      spanDisplay: getComputedStyle(s).display,
      border: getComputedStyle(m).borderTopWidth,
      spanBottom: Math.round(s.getBoundingClientRect().bottom),
      strongTop: Math.round(st.getBoundingClientRect().top),
    };
  });
  check(`[${loc}] 結果卡片的標籤與數值分行`,
    metric !== null && metric.spanDisplay === 'block' && metric.border !== '0px' && metric.strongTop >= metric.spanBottom,
    JSON.stringify(metric));
  await ctx.close();
}

// ── 3. 缺陷 3：文章表格要有框線並自己橫捲
{
  const ctx = await browser.newContext({ viewport: { width: 1000, height: 800 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en/guides/debt-consolidation-break-even/`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(400);
  const st = await page.evaluate(() => {
    const t = document.querySelector('.prose table');
    if (!t) return null;
    const th = t.querySelector('th');
    return { display: getComputedStyle(t).display, overflowX: getComputedStyle(t).overflowX,
             thBorder: getComputedStyle(th).borderBottomWidth, thPadding: getComputedStyle(th).paddingTop };
  });
  check('文章表格有框線', st !== null && st.thBorder !== '0px', JSON.stringify(st));
  check('文章表格自己橫捲', st !== null && st.overflowX === 'auto' && st.display === 'block');
  await ctx.close();
}

// ── 4. 缺陷 4：375px 不得橫向捲動
{
  const ctx = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
  const bad = [];
  for (const [path, was] of PREVIOUSLY_OVERFLOWING) {
    const page = await ctx.newPage();
    try {
      const resp = await page.goto(BASE + path, { waitUntil: 'domcontentloaded', timeout: 30000 });
      if (resp.status() !== 200) { bad.push(`${path} HTTP ${resp.status()}`); await page.close(); continue; }
      await page.waitForTimeout(200);
      const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      if (over > 1) bad.push(`${path} 仍溢位 +${over}px（修復前 +${was}px）`);
    } catch (e) {
      bad.push(`${path} 載入失敗: ${e.message.split('\n')[0]}`);
    }
    await page.close();
  }
  check(`375px 下 ${PREVIOUSLY_OVERFLOWING.length} 個原本會橫捲的頁面全部歸零`, bad.length === 0, bad.join(' | '));
  await ctx.close();
}

// ── 5. 只有線上驗得了的兩項：GA4 與 AdSense 的值是 GitHub Actions 在 build 時注入的，
//      本機 npm run build 一定拿不到（雲端 dry run 就是在這兩項 FAIL，屬正常）。
//      所以這兩項是這支腳本非得在 worthcalc.win 上跑一次的理由。
//      GA4 若 FAIL，代表 repo variable WORTHCALC_GA_ID 沒設或被清掉——那是真的問題，要回報。
{
  const ctx = await browser.newContext({ viewport: { width: 1000, height: 800 } });
  const page = await ctx.newPage();
  const hosts = new Set();
  page.on('request', (r) => { try { hosts.add(new URL(r.url()).host); } catch { return; } });
  await page.goto(`${BASE}/en/tools/compound-growth/`, { waitUntil: 'networkidle', timeout: 45000 });
  await page.waitForTimeout(1500);
  const html = await page.content();
  check('GA4 有載入（PUBLIC_GA_ID 確實有設）',
    [...hosts].some((h) => h.includes('googletagmanager')) || html.includes('googletagmanager'),
    [...hosts].join(', '));
  check('AdSense loader 有出現（ca-pub-9117672212804270）',
    html.includes('ca-pub-9117672212804270'));
  await ctx.close();
}

await browser.close();
console.log(fail === 0
  ? '\n全部通過：PR #122 的五項修復都確認在線上生效。'
  : `\n${fail} 項 FAIL。請原樣回報上面的實際值，不要自行修改網站程式碼。`);
process.exit(fail === 0 ? 0 : 1);
