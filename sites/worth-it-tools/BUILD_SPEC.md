# WorthCalc 值不值得計算機 — Build Spec (v1)

Single source of truth for building this site. Written by the commander agent; executed by Codex (tool implementation) and Sonnet 5 (content).

## Concept

Bilingual (en + zh-TW) static tool site of **money-decision calculators** — every tool answers "is it worth it? / 值不值得？" with real math. Monetized via Google AdSense (finance = highest-RPM category). All computation is client-side JavaScript; no backend, no APIs.

- Positioning EN: "WorthCalc — free calculators that tell you if it's actually worth it."
- Positioning zh-TW: 「WorthCalc 值不值得計算機 — 花錢之前，先算一下。」
- SEO trend basis: evaluative queries ("is ___ worth it" +80% YoY, "___ to avoid" +150% YoY). zh-TW decision-calculator space is nearly uncontested.

## Tech ground rules

- Follow the existing pattern in `src/pages/en/tools/word-counter.astro` exactly: frontmatter (title, description, faq[], related[]), `ToolLayout`, inline `<script>` with TypeScript, `bindPersistentField` from `src/lib/storage` for inputs worth persisting.
- Each tool = one page in `src/pages/en/tools/<slug>.astro` AND one in `src/pages/zh/tools/<slug>.astro` (same slug, localized copy, localized defaults).
- Register every tool slug in `site.config.ts` `tools: []`. Remove `demo-tool` and the demo/example tool pages (`case-converter`, `word-counter`, `demo-landing`) from config and delete their files.
- All results must update live on input. Show a clear verdict line (e.g. "✅ Worth it — you save NT$3,240/year" / "❌ Not worth it at your usage level").
- Currency: EN pages default USD ($), zh pages default TWD (NT$). Currency is display-only formatting; math is identical.
- No external JS libraries. No CDN. Keep each page's script self-contained (shared pure functions may go in `src/lib/money.ts`).
- Mobile-first: inputs stacked, large tap targets, results sticky/prominent.
- Every tool page must pass `npm run build`, `npm run typecheck`, `npm run lint`.

## Tools (8) — slugs, logic, defaults

### 1. `installment-true-apr` 分期付款真實利率計算機
Inputs: cash price, number of installments, payment per installment (or total with fee), any upfront fee.
Logic: solve IRR of the payment stream (Newton or bisection on monthly rate), output true APR %, total interest paid, verdict vs. a user-editable "acceptable APR" (default 10%).
EN keywords: installment plan true APR, BNPL real interest rate, 0% installment hidden cost.
zh keywords: 分期付款 利率 計算, 分期 0利率 陷阱, 信用卡分期 手續費 年利率.
FAQ must explain: why a "3% handling fee" ≠ 3% APR (it's roughly double, because principal declines).

### 2. `subscription-audit` 訂閱服務年費稽核
Inputs: dynamic rows (name, price, billing cycle monthly/quarterly/yearly, hours used per month optional).
Logic: totals per month / year / 5 years; cost-per-use if hours given; highlight the most expensive subscription; localStorage persistence of rows.
EN keywords: subscription cost calculator, how much am I spending on subscriptions.
zh keywords: 訂閱 花費 計算, Netflix Spotify 訂閱費 一年多少.

### 3. `costco-membership` 好市多會員回本計算機
Inputs: membership tier (EN: Gold Star $65 / Executive $130; zh: 金星 NT$1,350 / 商業 NT$1,150 / 黑鑽 NT$3,000 with 2% reward cap NT$10,000), monthly spend, executive/黑鑽 2% reward, assumed savings vs regular stores (editable, default 15%).
Logic: break-even monthly spend, annual net benefit, tier recommendation, verdict.
EN keywords: is costco membership worth it calculator, costco executive membership break even.
zh keywords: 好市多 會員 值得嗎, costco 黑鑽卡 回本, 好市多 年費 划算.

### 4. `escooter-vs-gas` 電動機車 vs 油車 TCO（EN: `ev-vs-gas` EV vs Gas Car TCO）
NOTE: different framing per locale, same slug `ev-vs-gas` for both, but zh copy/defaults target 電動機車 (Gogoro) vs 125cc 油車; EN targets EV vs gasoline car.
Inputs: purchase price both sides (incl. subsidy field), km per month, energy cost (zh: 電池資費月租 vs 油價+油耗; EN: $/kWh + efficiency vs $/gal + mpg), maintenance per year, years of ownership (default 5).
Logic: total cost of ownership both sides, per-km cost, break-even year if any, verdict.
zh keywords: gogoro 划算嗎, 電動機車 油車 比較, 電動機車 月租 vs 加油.
EN keywords: ev vs gas cost calculator, electric car worth it calculator.

### 5. `rent-vs-buy` 租屋 vs 買房計算機
Inputs: home price, down payment %, mortgage rate (zh default 2.2%, EN default 6.5%), loan years (30), monthly rent for equivalent home, rent growth %/yr, home appreciation %/yr, investment return on saved down payment %/yr, holding years.
Logic: net cost of buying (payments + costs − equity − appreciation) vs renting (rent − investment gains on down payment), crossover year, verdict. Keep the model simple and document assumptions on-page.
zh keywords: 租房 買房 計算機, 租不如買 試算, 房貸 租金 比較.
EN keywords: rent vs buy calculator.

### 6. `commute-cost` 通勤成本比較計算機
Inputs: distance km one-way, workdays/month, up to 4 modes with per-mode cost model (zh: 機車/汽車/捷運公車月票/Uber; EN: car/transit pass/rideshare/bike), parking, tolls.
Logic: monthly + yearly cost per mode, cheapest highlighted, time-cost optional (hourly wage × commute time).
zh keywords: 通勤 成本 計算, 機車 通勤 花費, TPASS 划算.
EN keywords: commute cost calculator.

### 7. `latte-factor` 外食自煮省錢計算機（EN: Daily Habit Cost Calculator）
Inputs: habit cost per time (default zh: NT$120 手搖+外食差額; EN: $6 latte), times per week, years, alternative cost (self-made), investment return % (default 5%).
Logic: yearly spend, N-year spend, and future value if invested instead (compound monthly). Verdict framed positively.
zh keywords: 每天一杯手搖 一年多少錢, 外食 自煮 省多少.
EN keywords: latte factor calculator, daily coffee cost calculator.

### 8. `cashback-breakeven` 信用卡回饋回本計算機
Inputs: annual fee, cashback % (up to 3 spending categories with different %), monthly spend per category, welcome bonus.
Logic: annual cashback vs fee, break-even monthly spend, net annual value, verdict; compare vs a no-fee 1% baseline card.
zh keywords: 信用卡 年費 值得嗎, 現金回饋 計算, 信用卡 回饋 比較.
EN keywords: is annual fee credit card worth it calculator, cashback break even.

## Shared lib

Create `src/lib/money.ts` with pure, unit-testable functions: `irrMonthly(cashflows: number[]): number`, `futureValue(monthly: number, annualRatePct: number, years: number): number`, `formatCurrency(value: number, locale: 'en'|'zh'): string`, plus anything reused by ≥2 tools. JSDoc every export.

## site.config.ts changes

- siteDescription EN-ish neutral: "Free money-decision calculators — find out if it's actually worth it. 值不值得，算了才知道。"
- defaultLocale: 'zh' is NOT desired — keep 'en' (higher-RPM audience lands on root).
- tools: the 8 slugs above. categories: ['spending-decisions', 'subscriptions-memberships', 'transport', 'housing', 'credit-finance'].
- navigation/footer: keep structure, no changes needed beyond defaults.

## Content responsibilities (Sonnet 5 scope — do NOT touch tool pages)

- `src/pages/{en,zh}/index.astro` hero + tool-grid intro copy (keep existing component structure, replace placeholder text).
- `about`, `privacy`, `terms`, `disclaimer`, `contact` for both locales: real, site-specific text (site name WorthCalc, client-side-only privacy story, finance-content disclaimer: "not financial advice / 本站僅供試算參考，非投資或財務建議"). AdSense-compliant privacy policy must mention Google AdSense third-party cookies once ads go live.
- 4 supporting articles (ArticleLayout) per locale under `src/pages/{en,zh}/`:
  1. `zero-interest-installments-truth` — 「0 利率分期」的真相 / The truth about 0% installments (links tool 1)
  2. `subscription-creep` — 訂閱通膨：你一年花多少 / Subscription creep audit guide (links tool 2)
  3. `costco-math` — 好市多會員的數學 / The math of warehouse memberships (links tool 3)
  4. `rent-vs-buy-guide` — 租屋買房怎麼想 / How to think about renting vs buying (links tool 5)
  Each ≥800 words, follows docs/seo-content-standard.md, FAQ section, links to its tool, tool page `related[]` links back (Codex leaves related[] pointing at these paths per this spec).
- changelog: one launch entry.

## Tool page copy standards (Codex writes these per-locale, from this spec)

Each tool page needs: 1-sentence meta description with primary keyword; short intro paragraph (2–3 sentences, primary keyword once, natural); labeled inputs with helper text; verdict area; "How it works / 計算方式" section explaining formula in plain words; 4–5 FAQ entries covering the keywords above; related[] links (sibling tools + its article).

## Definition of done

- `npm run build` zero errors; `npm run typecheck` clean; `npm run lint` clean; `npm run audit` PASS; `npm run check:links` clean.
- Every tool: correct math (spot-check: 12-month installment of 10,000 at "3% fee total" ⇒ true APR ≈ 5.6%; $65 Costco at 15% savings ⇒ break-even ≈ $36/mo spend), live updates, sensible defaults per locale, mobile usable at 375px.
- No leftover demo pages/slugs. No lorem ipsum anywhere.
