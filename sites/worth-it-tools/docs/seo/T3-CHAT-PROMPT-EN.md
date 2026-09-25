# Prompt for Claude chat — US English briefs (paste the whole thing)

---

You are writing US-market English money briefs (Markdown + YAML front matter) for worthcalc.win. A separate engineering pass validates format, recomputes every worked example, and ships them.

There are two parts. **Do Part A first** — it fixes pages that are already scheduled.

## Rule #1: only numbers from official pages you opened in this conversation

1. Every figure (limits, rates, thresholds, dollar amounts) must come from a page you **opened with your web tool in this conversation**: `irs.gov`, `ssa.gov`, `cms.gov`, `medicare.gov`, `healthcare.gov`, `aspe.hhs.gov`, `treasurydirect.gov`, `trumpaccounts.gov`, `home.treasury.gov`, `studentaid.gov`, `consumerfinance.gov`, `federalreserve.gov`, `eia.gov`, `bls.gov`, `fdic.gov`, `dol.gov`, `ecfr.gov`, `congress.gov`, or another `.gov` primary source.
2. **Never** cite news, blogs, NerdWallet, Investopedia, calculator sites, or memory. Projections ("expected to be…") are not figures — don't use them.
3. `verifiedDate` = the date you opened that page. A URL you did not open must not appear in `sources`.
4. If you can't open an official page for a topic, **skip it** and say so at the end.
5. After each article, outside the file, add an **evidence table**:

   | Figure | Source URL | Exact sentence from the page (verbatim) |
   |---|---|---|

   Cover every official figure. Verbatim — it is used for human spot checks.

## Part A — fix and update scheduled pages

These files already exist on the site. For each one, return the **complete replacement file** for both `en` and `zh` (the zh file is the Traditional Chinese twin with the same `briefSlug`, same numbers, same sources). Keep `briefSlug`, `relatedTool`, `cluster` and `related` unless a fix requires otherwise.

| # | briefSlug | What's wrong / what to do | When | publishAt |
|---|---|---|---|---|
| A1 | `hsa-contribution-limits` | The current draft states 2026 limits as $4,300 / $8,550 — those are the **2025** limits. Rewrite with the official 2026 and 2027 limits (IRS Rev. Proc. 2025-19 and the 2027 Rev. Proc.), catch-up, and HDHP minimum deductibles. Keep the payroll-FICA angle. Set `draft: false`. | Now | 2026-10-17 |
| A2 | `overtime-vs-second-job` | The FAQ says overtime and a second job are taxed at the same marginal rate. For 2025–2028 the premium portion of qualified overtime is deductible (the IRS "no tax on overtime" guidance: cap, phase-out, what counts). Rework the math and FAQ so the comparison includes that deduction. Set `draft: false`. | Now | 2026-11-04 |
| A3 | `social-security-cola` | Currently about the 2026 COLA. SSA announces the 2027 COLA on 2026-10-14. Rewrite around the 2027 COLA from the SSA announcement, keep the Part B offset angle (use the 2026 Part B figure until CMS publishes 2027). | After 10-14 | 2026-10-21 |
| A4 | `standard-deduction` | Update to the 2027 standard deduction once the IRS publishes the tax-year 2027 inflation adjustments. If not yet published, don't guess — tell me and skip. | After IRS release | 2026-11-18 |
| A5 | `401k-contribution-limits` | Update to 2027 limits once the IRS announces them. Same rule: no projections. | After IRS release | 2026-11-19 |
| A6 | `medicare-part-b-premium` | Update to the 2027 Part B premium and deductible once CMS publishes them. | After CMS release | 2026-11-24 |

Titles for A3–A6 should lead with the new year's figure (e.g. "The 2027 COLA Is X% — …"). The URL has no year on purpose: the same page gets updated every year.

## Part B — new briefs (English only, 1 per day)

### Content rules

- US English. No investment advice, no forecasts. The site's stance: lay the arithmetic out so the reader can check it.
- **One search intent per article.** No variants (no separate single/married or per-state pages).
- **No year in the slug.** The page is updated each year in place.
- The competition on these topics is dozens of bare "XX calculator" sites. Win on what they skip: the formula shown, a worked example with real numbers, the phase-outs and exceptions, and "What would flip the answer".
- `limits` must include at least: a calculation, not financial/tax advice; no guarantee of eligibility/approval; not a substitute for a professional (CPA, advisor, the agency).
- Body: official-figures table, the formula (indented code block), one concrete worked example, "What would flip the answer". Length similar to the template.
- Say which tax year every figure belongs to.

### Front matter rules (wrong format = build failure)

- `contentType: brief`, `locale: "en"`, `draft: false`
- `briefSlug`: lowercase kebab-case, identical to the filename, no year
- `cluster`: one of `rates` / `protection` / `ownership` / `earning`
- `publishAt`: per the schedule below; `lastReviewed`: the date you wrote it
- `relatedTool`: one of these only, format `/en/tools/<slug>/`:
  `appliance-running-cost` `budget-builder` `car-affordability` `cashback-breakeven` `commute-cost` `compound-growth` `cost-per-mile` `costco-membership` `credit-card-payoff` `debt-strategy` `dti-calculator` `ev-vs-gas` `home-affordability` `installment-true-apr` `latte-factor` `mortgage-payoff` `rent-vs-buy` `salary-converter` `subscription-audit`
- `relatedToolLabel`: short lowercase tool name, e.g. "budget builder"
- `sources` ≥1 (each `label`, `url`, `verifiedDate` YYYY-MM-DD); `faq` ≥2; `limits` ≥3
- `related`: 2–3 briefs, format `/en/money/<slug>/` (slugs from this list or the existing list below)
- Title: put the search phrase first, keep it under ~60 characters.
- Description: under ~155 characters.
- Double-quote all YAML strings; use single quotes inside a string.

### Schedule and topics (in this order)

| publishAt | briefSlug | Topic | Official source | relatedTool | cluster |
|---|---|---|---|---|---|
| 2026-10-12 | medicare-part-d-out-of-pocket-cap | Part D out-of-pocket cap: what it saves a heavy-prescription year | CMS / medicare.gov | budget-builder | protection |
| 2026-10-13 | medicare-irmaa-brackets | IRMAA: the income cliff that raises Part B and D | CMS / SSA | budget-builder | protection |
| 2026-10-14 | no-tax-on-overtime-deduction | No tax on overtime: only the half-time premium counts | IRS | salary-converter | earning |
| 2026-10-15 | no-tax-on-tips-deduction | No tax on tips: cap, phase-out, who qualifies | IRS | salary-converter | earning |
| 2026-10-16 | car-loan-interest-deduction | Car loan interest deduction: US-assembled, $10,000 cap, phase-out | IRS | car-affordability | ownership |
| 2026-10-17 | senior-deduction-65 | The extra deduction at 65: what it's worth by bracket | IRS | budget-builder | earning |
| 2026-10-18 | aca-premium-tax-credit-cliff | ACA subsidy cliff at 400% FPL: $1 over, what it costs | healthcare.gov / IRS / ASPE poverty guidelines | budget-builder | protection |
| 2026-10-19 | salt-deduction-cap | SALT cap: when itemizing beats the standard deduction | IRS | home-affordability | ownership |
| 2026-10-20 | trump-account-vs-529 | Trump account vs 529: the $1,000 seed and where the next dollar goes | IRS / Treasury / trumpaccounts.gov | compound-growth | earning |
| 2026-10-21 | dependent-care-fsa-limit | Dependent care FSA vs the child care credit | IRS | budget-builder | earning |
| 2026-10-22 | rap-student-loan-payment | RAP student loan payment: the formula, step by step | studentaid.gov | debt-strategy | earning |
| 2026-10-23 | treasury-bills-vs-high-yield-savings | T-bills vs high-yield savings after state tax | TreasuryDirect / IRS | compound-growth | rates |
| 2026-10-24 | used-ev-after-tax-credit | Used EV math after the federal credits ended | IRS / energy.gov / fueleconomy.gov | ev-vs-gas | ownership |
| 2026-10-25 | capital-gains-zero-percent-bracket | The 0% capital gains bracket: how much gain is tax-free | IRS | compound-growth | earning |
| 2026-10-26 | tax-loss-harvesting-limit | Tax-loss harvesting: the $3,000 offset and the wash-sale rule | IRS Topic 409 / Pub 550 | compound-growth | earning |
| 2026-10-27 | required-minimum-distributions | Your first RMD: the amount, the deadline, the penalty | IRS | compound-growth | earning |
| 2026-10-28 | 401k-early-withdrawal-cost | Cashing out a 401(k) early: 10% plus tax, the real cost | IRS Topic 558 | compound-growth | earning |
| 2026-10-29 | roth-ira-income-limits | Roth IRA income phase-out: how much you can still put in | IRS | compound-growth | earning |
| 2026-10-30 | child-tax-credit | Child Tax Credit: amount, refundable part, phase-out | IRS | budget-builder | earning |
| 2026-10-31 | self-employment-tax | Self-employment tax: 15.3% on 92.35%, and the half you deduct | IRS Topic 554 | salary-converter | earning |
| 2026-11-01 | estimated-tax-safe-harbor | Quarterly estimated tax: the 100% / 110% safe harbor | IRS Pub 505 | budget-builder | earning |
| 2026-11-02 | sep-ira-vs-solo-401k | SEP IRA vs Solo 401(k): which lets you put away more | IRS | compound-growth | earning |
| 2026-11-03 | i-bonds-rate | I bonds: fixed rate + inflation rate, and the 1-year lock | TreasuryDirect | compound-growth | rates |
| 2026-11-04 | federal-tax-brackets | Federal tax brackets: marginal vs effective rate, worked through | IRS (use 2027 if released, else 2026) | salary-converter | earning |

**Do not duplicate** existing English briefs: 401k-contribution-limits, airline-points-cash-value, auto-loan-rate-by-credit-score-2026, buy-now-or-wait-price-increase, car-repair-vs-trade-in, childcare-cost-2026, credit-card-apr-2026, credit-score-points-dollar-value, dental-insurance-vs-cash, disability-insurance-break-even, electricity-price-per-kwh-2026, emergency-fund-size-2026, employer-match-vs-debt-payoff, gas-vs-ev-cost-per-mile-2026, gym-membership-vs-pay-per-visit, heat-pump-payback-2026, home-improvement-roi-before-selling, home-warranty-break-even, hsa-contribution-limits, hsa-vs-fsa-decision, idle-cash-cost-2026, inflation-adjusted-raise-2026, insurance-deductible-break-even, internet-plan-cost-2026, ira-vs-401k-priority-2026, irs-mileage-rate-2026, lease-buyout-break-even, medicare-part-b-premium, mortgage-rate-2026-payment-impact, mortgage-refinance-break-even, moving-for-a-job-full-cost, overtime-vs-second-job, pay-off-car-loan-early-or-invest, pet-insurance-break-even, phone-upgrade-trade-in-timing, pmi-removal-timing, rent-increase-move-or-stay, rental-car-insurance-decline, roth-vs-traditional-break-even, salary-raise-vs-bonus, savings-vs-cd-2026, should-i-file-an-insurance-claim, side-hustle-true-hourly-rate, social-security-cola, solar-payback-2026, standard-deduction, streaming-prices-2026, student-loan-degree-roi, student-loan-rate-2026, term-vs-whole-life-cost, tsa-precheck-break-even, umbrella-insurance-break-even.
Also existing pages: credit card minimum payment trap, extra mortgage payments, mortgage points break-even, rent vs buy, rule of 72, true cost of car ownership, how much home can you afford, APR vs APY, snowball vs avalanche.

## Output

- Part A in one reply (only the items whose official figures are out; say which are pending).
- Part B in 4 batches of 6; one reply per batch; wait for "continue".
- Each batch: a zip of the files, plus one BATCH markdown file with each file and its evidence table:

  ````
  ### File: <slug>.md
  ```markdown
  (full file)
  ```
  **Evidence**
  | Figure | Source URL | Exact sentence |
  ````

- At the end: a summary table — publishAt | slug | topic | official source URLs.

## Template (structure and tone — replace every bracket)

```markdown
---
contentType: brief
briefSlug: "[slug]"
locale: "en"
cluster: "[cluster]"
title: "[Search phrase first]: [the key number] — [the catch]"
description: "[One or two sentences with the official figures and what the page works out.]"
answer: "[3–4 sentences a reader could quote: the official figures with their tax year, the worked result, and the condition that changes it.]"
publishAt: "[YYYY-MM-DD]"
lastReviewed: "[YYYY-MM-DD]"
relatedTool: "/en/tools/[tool]/"
relatedToolLabel: "[tool name]"
formula: "[plain-text formula]"
limits:
  - "This is a calculation, not tax or financial advice. [Eligibility conditions this page cannot check.]"
  - "[What the figure excludes or where it changes.] Eligibility is decided by [agency]; this page does not guarantee it."
  - "[Where the rules can change; confirm with the agency or a CPA before acting.]"
sources:
  - label: "[Agency] — [page title]"
    url: "[official URL you opened]"
    verifiedDate: "[YYYY-MM-DD]"
faq:
  - q: "[Real question people search]"
    a: "[Direct answer with the number.]"
  - q: "[Second question]"
    a: "[Direct answer.]"
related:
  - "/en/money/[slug]/"
  - "/en/money/[slug]/"
draft: false
---

## The [year] figures

| | [year] |
| --- | ---: |
| [item] | **[figure]** |

## The formula

    [formula]

## Worked example

[Concrete numbers, every step shown.]

## What would flip the answer

- **[Condition].** [How it changes the result.]
- **[Condition].** [How it changes the result.]
```
