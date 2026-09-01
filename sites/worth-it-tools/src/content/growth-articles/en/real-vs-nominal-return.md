---
contentType: article
articleSlug: "real-vs-nominal-return"
locale: "en"
title: "Real vs. Nominal Return: Measure Purchasing Power, Not Just Account Growth"
description: "Convert nominal return to real purchasing-power return, include inflation and fees consistently, and avoid mixing real and nominal planning assumptions."
relatedTool: "/en/tools/compound-growth/"
lastReviewed: "2026-08-30"
draft: false
packageId: "003"
seoTitle: "Real vs. Nominal Return: Inflation Math | WorthCalc"
robots: "index,follow"
canonical: "https://worthcalc.win/en/guides/real-vs-nominal-return/"
ogTitle: "Real vs. Nominal Return: What Happened to Purchasing Power?"
ogDescription: "Convert account growth into inflation-adjusted return and avoid double-counting inflation in long-term planning."
ogImage: "/images/guides/real-vs-nominal-return-en.webp"
imageAlt: "Real return formula relating nominal return and inflation to purchasing power"
breadcrumbLabel: "Real vs. Nominal Return"
---


# Real vs. Nominal Return: Measure Purchasing Power, Not Just Account Growth

## Direct Answer

Nominal return measures how much the account value changed in currency terms.

Real return measures how much **purchasing power** changed after inflation.

The exact relationship is:

> **Real return = (1 + nominal return) ÷ (1 + inflation rate) − 1**

If nominal return is 5% and inflation is 3%:

> 1.05 ÷ 1.03 − 1 = **1.94%**

The simple shortcut `5% - 3% = 2%` is close when rates are small, but it is not exact.

Investor.gov defines real return as return after accounting for inflation and notes that taxes and other factors may also matter depending on the context.

## 1. What nominal return tells you

Suppose $100,000 becomes $105,000 over one year.

Nominal return:

> ($105,000 - $100,000) ÷ $100,000 = **5%**

The account balance increased by $5,000.

That is a real change in dollars.

But if the same basket of goods that cost $100,000 last year now costs $103,000, the entire $5,000 increase did not become additional purchasing power.

## 2. Why subtraction is only an approximation

Returns and inflation compound multiplicatively.

The relationship is:

> **1 + nominal = (1 + real) × (1 + inflation)**

Rearranging:

> **real = (1 + nominal)/(1 + inflation) - 1**

### Example: 6% nominal, 2% inflation

> 1.06 ÷ 1.02 - 1 = **3.92%**

The shortcut gives 4%.

The difference is small for one year, but long-term planning is sensitive to repeated assumptions.

## 3. Three worked examples

### Example A: 6% nominal, 2% inflation

> Real return ≈ **3.92%**

### Example B: 5% nominal, 3% inflation

> Real return ≈ **1.94%**

### Example C: 3% nominal, 4% inflation

> 1.03 ÷ 1.04 - 1 ≈ **-0.96%**

This third case is important:

> Your account can grow in nominal dollars while your purchasing power falls.

## 4. Turn the percentages into dollars

Start with $100,000.

At a 5% nominal return:

> Ending balance = **$105,000**

At 3% inflation, maintaining last year's purchasing power requires roughly:

> $100,000 × 1.03 = **$103,000**

The ending balance is above the inflation-adjusted baseline, but the purchasing-power gain is much closer to $2,000 than the $5,000 nominal increase suggests.

## 5. Real return is not a forecast

The formula transforms assumptions. It does not generate them.

If you enter:

- 7% nominal return
- 2% inflation

the calculator can tell you the implied real return.

It cannot guarantee that investments will return 7% or inflation will be 2%.

A better planning process uses ranges.

For example:

- lower nominal return / higher inflation
- middle case
- higher nominal return / lower inflation

That creates sensitivity analysis rather than a false point forecast.

## 6. Inflation sensitivity at a constant 5% nominal return

| Inflation | Real return |
|---:|---:|
| 1% | 3.96% |
| 2% | 2.94% |
| 3% | 1.94% |
| 4% | 0.96% |
| 5% | 0.00% |
| 6% | -0.94% |

The same account performance can produce very different purchasing-power results.

This matters for retirement, education, housing goals and any other objective defined by future spending.

## 7. Fees can create a second adjustment

Suppose an investment has:

- Gross nominal return: 6%
- Annual cost effect: approximately 1%
- Net nominal return for a simplified example: about 5%
- Inflation: 3%

Real return based on the simplified 5% net figure:

> 1.05 ÷ 1.03 - 1 ≈ **1.94%**

If you simply compare 6% headline return with 3% inflation, you would overstate the purchasing-power result.

Real products have different fee structures, taxes and timing. The example is not a product recommendation. It demonstrates why return should be defined carefully before adjusting for inflation.

## 8. Taxes can matter too

Investor.gov notes that real return can be considered after inflation and taxes depending on the calculation.

For personal planning, decide what you are measuring:

- gross nominal return
- net-of-fee nominal return
- after-tax nominal return
- inflation-adjusted real return

Do not compare two figures with different definitions as if they were interchangeable.

## 9. The biggest modeling mistake: mixing real and nominal frameworks

Long-term financial models usually choose one of two approaches.

### Nominal framework
- Future spending is inflated into future dollars
- Growth assumptions are nominal

### Real framework
- Future spending stays expressed in today's purchasing power
- Growth assumptions are real

Both can work.

The problem occurs when you inflate the goal into future dollars **and** discount the return to a real rate without making corresponding adjustments. Inflation can effectively be counted twice.

Consistency matters more than the label.

## 10. Worked planning example

Assume a goal costs $100,000 today and is ten years away.

If you choose a nominal framework:

1. Inflate the $100,000 goal using a scenario inflation rate
2. Use a nominal investment-growth assumption
3. Solve for contributions

If you choose a real framework:

1. Keep the goal at $100,000 in today's purchasing power
2. Use a real growth assumption
3. Solve in real dollars

The two approaches should tell a coherent story if assumptions are handled consistently.

## 11. Where real return is especially useful

### Long-term savings goals
It keeps focus on what the money can buy.

### Wage growth
A 3% raise with 4% inflation may mean lower purchasing power.

### Fixed-income comparisons
A positive nominal yield can still produce a weak or negative real result.

### Retirement planning
Lifestyle purchasing power matters more than the number of nominal dollars alone.

## 12. What can reverse your conclusion?

### Inflation is higher than assumed
Real return falls.

### Fees are higher than assumed
Net nominal return falls before inflation is applied.

### The holding period is shorter
Long-run assumptions may become less relevant.

### Your goal has a different inflation rate than broad CPI
A specific cost category may grow faster or slower than the general consumer basket.

## 13. Decision checklist

- [ ] Confirm whether a quoted return is nominal or real
- [ ] Use the exact formula for verification
- [ ] Define whether fees are already included
- [ ] Define whether taxes are included
- [ ] Run multiple inflation cases
- [ ] Avoid using historical averages as guarantees
- [ ] Keep future goals and return assumptions in the same nominal/real framework

## 15. Advanced verification: keep the entire model in either nominal or real dollars

The biggest long-horizon modeling error is mixing units. If you inflate a future spending goal into future dollars but then discount or grow the portfolio using a real return, you can effectively account for inflation twice.

Use one framework consistently.

### Nominal framework

- future spending goal: future nominal dollars
- portfolio growth assumption: nominal return
- result: future dollars

### Real framework

- future spending goal: today's purchasing-power dollars
- portfolio growth assumption: real return
- result: today's dollars

Both approaches can work. Mixing them is the problem.

For example, with a 6% nominal return and 2.5% inflation:

> (1.06 ÷ 1.025) − 1 = **3.41% real return**

Simple subtraction gives 3.5%, which is a useful approximation for small rates. Over long compounding periods, however, the exact ratio formula is cleaner.

### Add investment costs consistently

Suppose a portfolio earns a hypothetical 6% gross nominal return and incurs 0.8% of annual costs. A simplified net nominal assumption is 5.2%. With 2.5% inflation:

> (1.052 ÷ 1.025) − 1 ≈ **2.63% real return**

That is much closer to the purchasing-power question than simply repeating the 6% headline return. Taxes can create another layer, but their effect depends on jurisdiction, account type, realization timing, and individual circumstances, so a general calculator should not pretend there is one universal after-tax rate.

### Inflation rising does not mechanically determine the investment result

Consider these hypothetical scenarios:

| Nominal return | Inflation | Approx. real return |
|---:|---:|---:|
| 5% | 2% | 2.94% |
| 5% | 4% | 0.96% |
| 8% | 4% | 3.85% |
| 2% | 4% | -1.92% |

The third row is an important counterexample: inflation is higher than in the first row, but the nominal return is also higher, so the real return is stronger. Real-return analysis compares two moving assumptions; it is not a rule that "higher inflation always means this portfolio will lose purchasing power."

### Real return is a comparison language, not a forecast

Investor.gov defines real return in terms of return after accounting for inflation and other effects on purchasing power. It does not provide a guaranteed future return. WorthCalc should therefore use real-return math to normalize assumptions—not to imply that a modeled investment outcome will occur.


## 16. Advanced planning example: today's dollars versus future dollars

A useful way to test whether you truly understand nominal and real modeling is to solve the same goal twice—once in future nominal dollars and once in today's purchasing-power dollars—and confirm that the logic is internally consistent.

Assume a household wants the purchasing power of **$100,000 today** for a goal 15 years from now. This is not an investment forecast; it is a unit-conversion exercise. If the planning inflation assumption is 2.5% per year, the future nominal price of that same purchasing-power target would be approximately:

> **$100,000 × (1.025)^15 ≈ $144,830**

Now there are two valid ways to structure the planning model.

| Framework | Goal amount used in the model | Return assumption used | What the result means |
|---|---:|---|---|
| Nominal | about $144,830 in year-15 dollars | nominal return | future nominal dollars |
| Real | $100,000 in today's dollars | real return | today's purchasing-power dollars |

If the hypothetical nominal return is 6% and inflation is 2.5%, the exact real-return assumption is about 3.41%:

> **(1.06 ÷ 1.025) − 1 ≈ 3.41%**

The important point is not that either 6%, 2.5%, or 3.41% will occur. They are scenario inputs. The point is that the units must match. A nominal target belongs with a nominal growth assumption; a today's-dollar target belongs with a real growth assumption.

### A common double-counting error

Suppose someone inflates the $100,000 goal to $144,830, but then also uses the 3.41% real return to project the portfolio. Inflation has effectively been incorporated on both sides of the model. The result may look sophisticated because every input has a percentage attached to it, yet the framework is inconsistent.

The opposite error can also occur: keeping the goal at $100,000 in today's dollars while projecting the portfolio with a 6% nominal return. That silently assumes the future $100,000 will buy what $100,000 buys today.

A practical audit question is therefore:

> **Are both sides of this calculation expressed in the same kind of dollars?**

If you cannot answer that clearly, stop before trusting the output.

## 17. Run a return-and-inflation sensitivity grid instead of one forecast

Long-horizon plans are especially vulnerable to false precision. Rather than enter one return and one inflation rate and treat the result as a prediction, test a range of combinations.

For example:

| Nominal return scenario | Inflation scenario | Exact real return |
|---:|---:|---:|
| 4% | 2% | about 1.96% |
| 4% | 4% | 0.00% |
| 6% | 2% | about 3.92% |
| 6% | 4% | about 1.92% |
| 8% | 3% | about 4.85% |

This grid answers a better planning question than “What will my real return be?” It asks: **How much does the plan depend on the spread between nominal growth and inflation?**

If a savings goal works only in the most optimistic cell, the issue is not that the formula is wrong. The plan may simply have little margin for error. Possible responses include increasing contributions, extending the time horizon, lowering the target, or treating the result as a scenario that needs periodic review. Those are planning levers, not investment recommendations.

## 18. Know when real-return math is useful—and when it is not the main question

Real-return math is powerful when the decision is fundamentally about future purchasing power: retirement spending, a long-term education fund, or comparing growth over many years. It is less useful as the primary lens for a near-term bill stated in fixed nominal dollars.

For example, if a contract says you owe $20,000 twelve months from now, the contractual obligation is $20,000. You may still care about inflation in a broader financial plan, but you should not “inflation-adjust” the legal payoff amount unless the contract itself does so.

Likewise, a fixed-rate loan balance and scheduled payment are nominal contractual cash flows. Real-value analysis can help economists compare purchasing power over time, but a borrower still needs enough nominal cash to make the actual payment due.

This distinction prevents another common mistake: using a useful economic concept in a context where the immediate decision is actually about contractual cash flow.

## 19. A five-step audit before using a real-return result

Before relying on a real-return calculation, verify all five items:

1. **Return basis:** Is the quoted return gross or net of recurring fees?
2. **Inflation basis:** Are you using a broad CPI assumption or a goal-specific cost assumption?
3. **Dollar basis:** Is the goal expressed in today's dollars or future nominal dollars?
4. **Tax basis:** Are both compared return figures on the same before-tax or after-tax basis?
5. **Scenario status:** Are the inputs clearly labeled as assumptions rather than promises?

If one item is ambiguous, the calculated percentage can be mathematically correct but decision-usefulness can still be poor. That is why WorthCalc's preferred workflow is to expose assumptions, vary uncertain inputs, and inspect what changes the conclusion instead of presenting one point estimate as truth.

## 14. How to use WorthCalc

Use **Compound Growth & Savings Goal** to create nominal growth scenarios.

Then convert the nominal return to a real return with:

> **(1 + nominal)/(1 + inflation) - 1**

If you are planning a future purchase, pair this page with WorthCalc's **Inflation-Adjusted Savings Goal** guide.

The objective is not to predict the exact future. It is to see how dependent your plan is on purchasing-power assumptions.

## FAQ

### Is real return just nominal return minus inflation?
That is a common approximation. The exact formula is `(1 + nominal)/(1 + inflation) - 1`.

### Can real return be negative when the account gained money?
Yes. If inflation exceeds nominal growth, purchasing power can decline.

### What inflation rate should I use?
There is no guaranteed future inflation rate. Use multiple scenarios rather than pretending one estimate is certain.

### Does real return include taxes?
It depends on the definition. Be explicit about whether your nominal return is before or after taxes and fees.

### Can real return tell me which investment to buy?
No. It is a purchasing-power measurement framework, not a security-selection tool.

When the goal is stated in today’s purchasing power, keep the inflation framework consistent before comparing delayed starts.

[delay a savings goal](/en/guides/cost-of-delaying-savings-goal/)

## Sources and limitations

Investor.gov — Real Return:
https://www.investor.gov/introduction-investing/investing-basics/glossary/real-return

This guide is general financial education. It does not forecast returns or inflation and does not recommend investments.
