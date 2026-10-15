# Money briefs held back by the SEO rebuild (P1-WC, 2026-10-15)

Work order P1-WC, section A: no unreviewed page may go live while the site is being rebuilt. Every money brief whose `publishAt` is later than **2026-10-15** now has `draft: true` in its frontmatter, so `getStaticPaths` never emits it (no HTML, no sitemap entry, no internal link). The nightly `schedule` trigger in `.github/workflows/deploy-worthcalc.yml` is removed as well.

69 files = 44 English + 25 Traditional Chinese, covering 44 distinct slug/date pairs. Nothing else about the briefs changed: `publishAt` keeps its original value so the original plan is still readable.

To release one: a human sets that file's `draft: false` in a reviewed PR (and, for a Chinese brief, only after it is marked `keep` in `worthcalc-rebuild-p1-disposition-2026-10-15.csv` or a successor). The English files stay `noindex` whatever their draft state.

| publishAt | slug | en | zh |
| --- | --- | :-: | :-: |
| 2026-10-16 | `car-loan-interest-deduction` | held | - |
| 2026-10-17 | `hsa-contribution-limits` | held | held |
| 2026-10-17 | `senior-deduction-65` | held | - |
| 2026-10-18 | `aca-premium-tax-credit-cliff` | held | - |
| 2026-10-19 | `salt-deduction-cap` | held | - |
| 2026-10-19 | `student-loan-rate-2026` | held | held |
| 2026-10-20 | `trump-account-vs-529` | held | - |
| 2026-10-21 | `dependent-care-fsa-limit` | held | - |
| 2026-10-21 | `roth-vs-traditional-break-even` | held | held |
| 2026-10-21 | `social-security-cola` | held | held |
| 2026-10-22 | `rap-student-loan-payment` | held | - |
| 2026-10-22 | `term-vs-whole-life-cost` | held | held |
| 2026-10-23 | `disability-insurance-break-even` | held | held |
| 2026-10-23 | `treasury-bills-vs-high-yield-savings` | held | - |
| 2026-10-24 | `salary-raise-vs-bonus` | held | held |
| 2026-10-24 | `used-ev-after-tax-credit` | held | - |
| 2026-10-25 | `capital-gains-zero-percent-bracket` | held | - |
| 2026-10-25 | `student-loan-degree-roi` | held | held |
| 2026-10-26 | `ira-vs-401k-priority-2026` | held | held |
| 2026-10-26 | `tax-loss-harvesting-limit` | held | - |
| 2026-10-27 | `hsa-vs-fsa-decision` | held | held |
| 2026-10-27 | `required-minimum-distributions` | held | - |
| 2026-10-28 | `401k-early-withdrawal-cost` | held | - |
| 2026-10-28 | `gas-vs-ev-cost-per-mile-2026` | held | held |
| 2026-10-29 | `internet-plan-cost-2026` | held | held |
| 2026-10-29 | `roth-ira-income-limits` | held | - |
| 2026-10-30 | `child-tax-credit` | held | - |
| 2026-10-30 | `umbrella-insurance-break-even` | held | held |
| 2026-10-31 | `dental-insurance-vs-cash` | held | held |
| 2026-10-31 | `self-employment-tax` | held | - |
| 2026-11-01 | `estimated-tax-safe-harbor` | held | - |
| 2026-11-01 | `home-improvement-roi-before-selling` | held | held |
| 2026-11-02 | `car-repair-vs-trade-in` | held | held |
| 2026-11-02 | `sep-ira-vs-solo-401k` | held | - |
| 2026-11-03 | `rent-increase-move-or-stay` | held | held |
| 2026-11-04 | `federal-tax-brackets` | held | - |
| 2026-11-04 | `overtime-vs-second-job` | held | held |
| 2026-11-05 | `phone-upgrade-trade-in-timing` | held | held |
| 2026-11-06 | `gym-membership-vs-pay-per-visit` | held | held |
| 2026-11-07 | `savings-vs-cd-2026` | held | held |
| 2026-11-08 | `inflation-adjusted-raise-2026` | held | held |
| 2026-11-18 | `standard-deduction` | held | held |
| 2026-11-19 | `401k-contribution-limits` | held | held |
| 2026-11-24 | `medicare-part-b-premium` | held | held |
