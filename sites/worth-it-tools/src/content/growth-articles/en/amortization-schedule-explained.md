---
contentType: article
articleSlug: "amortization-schedule-explained"
locale: "en"
title: "Amortization Schedule Explained: Principal, Interest, Balance, and Extra Payments"
description: "Learn how a fixed-payment amortization schedule splits principal and interest, why interest is heavier early, and how extra principal changes payoff timing and total interest."
relatedTool: "/en/tools/installment-true-apr/"
lastReviewed: "2026-08-30"
draft: false
packageId: "002"
seoTitle: "Amortization Schedule Explained: Formula, Examples, and Extra Payments"
robots: "index,follow"
canonical: "https://worthcalc.win/en/guides/amortization-schedule-explained/"
ogTitle: "Amortization Schedule Explained: The Payment Can Stay Flat While the Mix Changes"
ogDescription: "A $30,000 loan at 6% for 36 months has a payment of about $912.66, but the interest portion falls as principal declines. Follow the first rows."
ogImage: "/images/guides/amortization-schedule-explained-og.webp"
imageAlt: "amortization schedule principal interest balance chart"
breadcrumbLabel: "Amortization Schedule Explained: Principal, Interest, Balance, and Extra Payments"
---


# Amortization Schedule Explained: Principal, Interest, Balance, and Extra Payments

> **Quick answer:** In a typical fixed-rate, fully amortizing installment loan, the total scheduled payment can remain level while its composition changes. Interest is calculated from the outstanding principal, so early payments generally contain more interest; as principal falls, more of the same payment goes to principal.

An amortization table is not just paperwork. It answers practical questions: How much do I still owe if I sell in month 18? Why has the balance not fallen by the total amount I paid? How much interest could an extra principal payment avoid?

## 1. Fixed-payment formula

For principal `P`, periodic interest rate `r`, and `n` payments:

`Payment = P × r × (1+r)^n / ((1+r)^n - 1)`

For a nominal 6% annual rate using monthly periods:

`r = 0.06 / 12 = 0.005`

Real contracts can use different day-count or accrual conventions, so your lender’s schedule controls.

## 2. Worked example: $30,000, 6%, 36 months

Assumptions:

- principal: $30,000
- annual rate: 6%
- monthly rate: 0.5%
- term: 36 months

Payment is approximately **$912.66**.

Total scheduled payments are about:

`$912.66 × 36 = $32,855.76`

So the simplified total interest is approximately **$2,855.76** (rounding creates small differences from a lender schedule).

## 3. First payment

Interest:

`$30,000 × 0.5% = $150.00`

Principal paid:

`$912.66 - $150.00 = $762.66`

Ending balance:

`$30,000 - $762.66 = $29,237.34`

Month two calculates interest on the smaller balance:

`$29,237.34 × 0.5% ≈ $146.19`

So a slightly larger portion of the same payment goes to principal.

## 4. First three rows

| Month | Start balance | Payment | Interest | Principal | End balance |
|---:|---:|---:|---:|---:|---:|
| 1 | $30,000.00 | $912.66 | $150.00 | $762.66 | $29,237.34 |
| 2 | $29,237.34 | $912.66 | $146.19 | $766.47 | $28,470.87 |
| 3 | $28,470.87 | $912.66 | $142.35 | $770.31 | $27,700.56 |

The pattern—not the exact rounded cents—is the key: interest falls, principal rises.

## 5. “You pay all the interest first” is misleading

A common shortcut says early mortgage or loan payments are “all interest.” That is usually false for a standard amortizing loan. Early payments include principal; the interest share is simply larger because the balance is larger.

Read the actual schedule instead of relying on slogans.

## 6. What extra principal changes

If an extra payment is applied directly to principal, the next interest calculation starts from a smaller balance. Depending on the contract, that can:

- shorten the payoff date
- reduce future interest
- sometimes change the required payment after a formal recast

Do not assume an extra payment automatically lowers the next required payment. Some loans keep the scheduled payment unchanged and shorten the term.

## 7. Why term matters

Longer terms typically lower the payment because principal is spread over more periods, but they can increase total interest.

That creates a trade-off:

- shorter term → higher required payment, lower interest in many fixed-rate comparisons
- longer term → lower monthly burden, more time paying interest

The “best” term must fit both total cost and cash-flow resilience.

## 8. Use the schedule to answer real questions

### “I am selling after 18 months. What do I owe?”
Look at the remaining principal after payment 18, not original principal minus the sum of payments.

### “I have paid $10,000. Why is the balance down less than $10,000?”
Part of each payment covered interest and potentially other charges.

### “Would refinancing save money?”
Compare the **remaining** old schedule with the new schedule plus fees. Do not compare the original rate against the new rate in isolation.

### “What if I pay $100 extra each month?”
Recalculate every future period with the smaller balance or use an extra-payment model.

## 9. Amortizing payment vs. equal-principal payment

These are different structures.

### Level-payment amortization
Total payment tends to stay level; principal portion rises over time.

### Equal-principal structure
Principal reduction is fixed; interest declines, so the total payment generally starts higher and falls.

Always identify the structure before applying a formula.

## 10. Sensitivity: rate and term both reshape the table

For the same $30,000 principal:

- a higher interest rate raises interest in each early row
- a longer term generally reduces the scheduled payment but slows principal reduction
- a shorter term accelerates equity / principal payoff but demands more cash each month

This is why comparing only monthly payment can be deceptive.

## 11. Fees are not “principal and interest”

Origination charges, account fees, optional insurance, late charges, and prepayment penalties may exist outside the amortization math. APR can help standardize certain borrowing costs, but you still need the loan disclosure and contract.

## 12. Extra-payment workflow

Before paying extra:

1. obtain the current principal balance
2. confirm current interest rate
3. identify remaining term
4. read prepayment terms
5. verify extra funds are applied to principal
6. model the original remaining schedule
7. model the extra-payment schedule
8. compare interest saved, payoff date, and liquidity left over

## 13. Common mistakes

### Dividing principal by the number of months
That does not reproduce a level-payment amortization schedule.

### Applying the annual rate directly each month
Convert to the correct periodic rate only if the contract’s accrual convention supports that simplification.

### Restarting from the original principal when evaluating a current loan
Use the **current** outstanding balance and remaining term.

### Ignoring rounding
A lender’s final payment can differ by a few cents or dollars because of daily accrual and rounding.

## 14. Connect it to WorthCalc

Use WorthCalc’s loan and payoff tools to compare payment, total cost, and alternative terms. For an existing loan, enter the **remaining balance**, not the original amount, when modeling decisions from today forward.

### Checklist

- [ ] I know the amortization structure.
- [ ] I know whether the rate is fixed or variable.
- [ ] I have the current principal balance.
- [ ] I can identify interest and principal in each row.
- [ ] I compare total cost, not only monthly payment.
- [ ] I have checked prepayment terms before sending extra money.
- [ ] Refinancing comparisons include new fees.

## 15. Compare loans at a future checkpoint, not only at final payoff

If you expect to sell, refinance, or move before the scheduled end date, compare the **remaining balance at that date**. A 72-month loan may have an appealing payment, but after 24 months it can leave substantially more principal outstanding than a 48-month loan.

Create checkpoints at months 12, 24, and 36. For each option record:

- cumulative payments made
- cumulative interest paid
- principal reduced
- remaining balance

This turns a long-term amortization table into a decision tool for your actual holding period.

## 16. Timing matters for extra payments

An extra $2,000 payment in month 3 generally avoids more future interest than the same $2,000 paid in month 30, because it reduces principal earlier. But the early payment also removes liquidity earlier.

When testing extra-payment strategies, model both **amount and date**. If your calculator supports only one extra-payment month, run several scenarios. The change in payoff date and total interest will show how sensitive the decision is to timing.

## 17. Calculate cumulative interest, not just current-month interest

A single row can make a loan look cheap because the interest amount is small in dollars. Add a cumulative-interest column so each checkpoint answers, “How much financing cost have I paid so far?”

For a comparison between two loans, record cumulative interest at months 12, 24, and the expected payoff or sale date. This is especially useful when one option has a lower payment but a longer term.

## 18. Separate scheduled payoff from actual payoff behavior

An amortization table assumes every scheduled payment arrives as modeled. Late payments, skipped payments, fees, rate changes, or additional principal can make the actual balance differ from the original table.

For an existing loan, reconcile your model against the current lender statement before making a decision. If your spreadsheet says the balance should be $18,400 but the statement says $18,950, do not force the statement into your model—find the cause first. Possible reasons include timing, daily interest, fees, payment allocation, or a different rate convention.

This reconciliation step is what turns a theoretical amortization exercise into a reliable decision model.


## 19. Use lender payoff quotes for transaction decisions

A modeled balance is excellent for planning, but a refinance, sale, or full payoff should use the lender's official payoff quote for the relevant date. Accrued daily interest and fees can make that amount differ from the statement principal.

## FAQ

### Why is interest higher at the beginning?
Because a typical amortizing loan charges periodic interest on the outstanding principal, which is largest at the start.

### Does a fixed payment mean fixed interest every month?
No. The total scheduled payment may stay fixed while the interest/principal mix changes.

### Does an extra payment always save interest?
If it reduces principal earlier, it generally reduces future interest under a standard structure, but fees and contract rules can change the net benefit.

### Is the amortization schedule the same as APR?
No. The schedule shows period-by-period cash allocation; APR is an annualized borrowing-cost disclosure/comparison metric.

### Can I build the table in a spreadsheet?
Yes. Use the payment formula and repeat `interest = opening balance × periodic rate`, `principal = payment - interest`, and `ending balance = opening balance - principal`, then reconcile to your lender statement.

Use the amortization schedule to compare not only monthly savings but also the remaining balance at 12, 24, and 36 months after a refinance.

[refinance break-even](/en/guides/loan-refinance-break-even/)

Use 12-, 24-, and 36-month remaining balances to catch consolidation offers that lower payment mainly by extending the term.

[remaining-balance comparison](/en/guides/debt-consolidation-break-even/)

A promotional balance should be tracked against its deadline rather than treated like a standard long-term amortizing loan.

[promo payoff schedule](/en/guides/balance-transfer-break-even/)

## Sources and limitations

Amortization concepts are aligned with CFPB consumer explanations. Examples assume a simplified fixed-rate monthly schedule and are educational, not a loan quote or contract interpretation.

### Official references
- [CFPB: What is amortization and how could it affect my auto loan?](https://www.consumerfinance.gov/ask-cfpb/what-is-amortization-and-how-could-it-affect-my-auto-loan-en-771/)
- [CFPB: How do mortgage lenders calculate monthly payments?](https://www.consumerfinance.gov/ask-cfpb/how-do-mortgage-lenders-calculate-monthly-payments-en-1965/)

## Related WorthCalc guides

- [Loan Term vs. Monthly Payment](/en/loan-term-monthly-payment-vs-total-interest/)
- [APR vs. APY](/en/apr-vs-apy/)
- [Installment True APR](/en/tools/installment-true-apr/)
