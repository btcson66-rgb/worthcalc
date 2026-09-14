---
date: 2026-09-15
status: COMPLETE_READONLY
site: worthcalc.win
---

# WorthCalc trailing-slash 45 筆線上實測

實測時間（本機）：2026-09-14T16:58:30.881Z。每筆均以 curl `-L --max-redirs 10 -H "Cache-Control: no-cache" -H "Pragma: no-cache"`，分別使用一般瀏覽器 UA 與 Googlebot UA；未使用應用程式快取。來源為 C:/Users/User/Downloads/keep-list-有曝光頁面.csv 的 45 筆 trailing_slash 非 yes URL。

## 結果摘要

- 一般 UA：{"301→200→200":45}。
- Googlebot UA：{"301→200→200":45}。
- UA 差異：0 筆。
- 所有結果均以最終 URL 判斷；報告若顯示 `301→200`，代表一跳 301 到結尾斜線後 200，不是 200 直出無斜線。

## 45 筆逐列結果

| # | 無斜線 URL | 一般 UA status chain | 一般 Location | 一般 final | 一般 hops | Googlebot status chain | Googlebot Location | Googlebot final | Googlebot hops | UA 差異 |
|---:|---|---|---|---:|---:|---|---|---:|---:|---|
| 1 | https://worthcalc.win/en/annual-fee-card-breakeven | 301→200 | https://worthcalc.win/en/annual-fee-card-breakeven/ | 200 https://worthcalc.win/en/annual-fee-card-breakeven/ | 1 | 301→200 | https://worthcalc.win/en/annual-fee-card-breakeven/ | 200 https://worthcalc.win/en/annual-fee-card-breakeven/ | 1 | no |
| 2 | https://worthcalc.win/en/tools/commute-cost | 301→200 | https://worthcalc.win/en/tools/commute-cost/ | 200 https://worthcalc.win/en/tools/commute-cost/ | 1 | 301→200 | https://worthcalc.win/en/tools/commute-cost/ | 200 https://worthcalc.win/en/tools/commute-cost/ | 1 | no |
| 3 | https://worthcalc.win/en/upfront-fees-financing-cost | 301→200 | https://worthcalc.win/en/upfront-fees-financing-cost/ | 200 https://worthcalc.win/en/upfront-fees-financing-cost/ | 1 | 301→200 | https://worthcalc.win/en/upfront-fees-financing-cost/ | 200 https://worthcalc.win/en/upfront-fees-financing-cost/ | 1 | no |
| 4 | https://worthcalc.win/en/tools/costco-membership | 301→200 | https://worthcalc.win/en/tools/costco-membership/ | 200 https://worthcalc.win/en/tools/costco-membership/ | 1 | 301→200 | https://worthcalc.win/en/tools/costco-membership/ | 200 https://worthcalc.win/en/tools/costco-membership/ | 1 | no |
| 5 | https://worthcalc.win/zh/tools/cashback-breakeven | 301→200 | https://worthcalc.win/zh/tools/cashback-breakeven/ | 200 https://worthcalc.win/zh/tools/cashback-breakeven/ | 1 | 301→200 | https://worthcalc.win/zh/tools/cashback-breakeven/ | 200 https://worthcalc.win/zh/tools/cashback-breakeven/ | 1 | no |
| 6 | https://worthcalc.win/en/contact | 301→200 | https://worthcalc.win/en/contact/ | 200 https://worthcalc.win/en/contact/ | 1 | 301→200 | https://worthcalc.win/en/contact/ | 200 https://worthcalc.win/en/contact/ | 1 | no |
| 7 | https://worthcalc.win/zh/changelog | 301→200 | https://worthcalc.win/zh/changelog/ | 200 https://worthcalc.win/zh/changelog/ | 1 | 301→200 | https://worthcalc.win/zh/changelog/ | 200 https://worthcalc.win/zh/changelog/ | 1 | no |
| 8 | https://worthcalc.win/en/pay-raise-vs-inflation-purchasing-power | 301→200 | https://worthcalc.win/en/pay-raise-vs-inflation-purchasing-power/ | 200 https://worthcalc.win/en/pay-raise-vs-inflation-purchasing-power/ | 1 | 301→200 | https://worthcalc.win/en/pay-raise-vs-inflation-purchasing-power/ | 200 https://worthcalc.win/en/pay-raise-vs-inflation-purchasing-power/ | 1 | no |
| 9 | https://worthcalc.win/en/true-hourly-wage-after-commuting-work-expenses | 301→200 | https://worthcalc.win/en/true-hourly-wage-after-commuting-work-expenses/ | 200 https://worthcalc.win/en/true-hourly-wage-after-commuting-work-expenses/ | 1 | 301→200 | https://worthcalc.win/en/true-hourly-wage-after-commuting-work-expenses/ | 200 https://worthcalc.win/en/true-hourly-wage-after-commuting-work-expenses/ | 1 | no |
| 10 | https://worthcalc.win/zh/privacy | 301→200 | https://worthcalc.win/zh/privacy/ | 200 https://worthcalc.win/zh/privacy/ | 1 | 301→200 | https://worthcalc.win/zh/privacy/ | 200 https://worthcalc.win/zh/privacy/ | 1 | no |
| 11 | https://worthcalc.win/en/zero-interest-installments-truth | 301→200 | https://worthcalc.win/en/zero-interest-installments-truth/ | 200 https://worthcalc.win/en/zero-interest-installments-truth/ | 1 | 301→200 | https://worthcalc.win/en/zero-interest-installments-truth/ | 200 https://worthcalc.win/en/zero-interest-installments-truth/ | 1 | no |
| 12 | https://worthcalc.win/en/terms | 301→200 | https://worthcalc.win/en/terms/ | 200 https://worthcalc.win/en/terms/ | 1 | 301→200 | https://worthcalc.win/en/terms/ | 200 https://worthcalc.win/en/terms/ | 1 | no |
| 13 | https://worthcalc.win/en/tools/credit-card-payoff | 301→200 | https://worthcalc.win/en/tools/credit-card-payoff/ | 200 https://worthcalc.win/en/tools/credit-card-payoff/ | 1 | 301→200 | https://worthcalc.win/en/tools/credit-card-payoff/ | 200 https://worthcalc.win/en/tools/credit-card-payoff/ | 1 | no |
| 14 | https://worthcalc.win/es/tools/commute-cost | 301→200 | https://worthcalc.win/es/tools/commute-cost/ | 200 https://worthcalc.win/es/tools/commute-cost/ | 1 | 301→200 | https://worthcalc.win/es/tools/commute-cost/ | 200 https://worthcalc.win/es/tools/commute-cost/ | 1 | no |
| 15 | https://worthcalc.win/de | 301→200 | https://worthcalc.win/de/ | 200 https://worthcalc.win/de/ | 1 | 301→200 | https://worthcalc.win/de/ | 200 https://worthcalc.win/de/ | 1 | no |
| 16 | https://worthcalc.win/en/tools/dti-calculator | 301→200 | https://worthcalc.win/en/tools/dti-calculator/ | 200 https://worthcalc.win/en/tools/dti-calculator/ | 1 | 301→200 | https://worthcalc.win/en/tools/dti-calculator/ | 200 https://worthcalc.win/en/tools/dti-calculator/ | 1 | no |
| 17 | https://worthcalc.win/es/tools/ev-vs-gas | 301→200 | https://worthcalc.win/es/tools/ev-vs-gas/ | 200 https://worthcalc.win/es/tools/ev-vs-gas/ | 1 | 301→200 | https://worthcalc.win/es/tools/ev-vs-gas/ | 200 https://worthcalc.win/es/tools/ev-vs-gas/ | 1 | no |
| 18 | https://worthcalc.win/en/subscription-creep | 301→200 | https://worthcalc.win/en/subscription-creep/ | 200 https://worthcalc.win/en/subscription-creep/ | 1 | 301→200 | https://worthcalc.win/en/subscription-creep/ | 200 https://worthcalc.win/en/subscription-creep/ | 1 | no |
| 19 | https://worthcalc.win/es/tools/installment-true-apr | 301→200 | https://worthcalc.win/es/tools/installment-true-apr/ | 200 https://worthcalc.win/es/tools/installment-true-apr/ | 1 | 301→200 | https://worthcalc.win/es/tools/installment-true-apr/ | 200 https://worthcalc.win/es/tools/installment-true-apr/ | 1 | no |
| 20 | https://worthcalc.win/en/full-commute-cost-including-time | 301→200 | https://worthcalc.win/en/full-commute-cost-including-time/ | 200 https://worthcalc.win/en/full-commute-cost-including-time/ | 1 | 301→200 | https://worthcalc.win/en/full-commute-cost-including-time/ | 200 https://worthcalc.win/en/full-commute-cost-including-time/ | 1 | no |
| 21 | https://worthcalc.win/en/tools/subscription-audit | 301→200 | https://worthcalc.win/en/tools/subscription-audit/ | 200 https://worthcalc.win/en/tools/subscription-audit/ | 1 | 301→200 | https://worthcalc.win/en/tools/subscription-audit/ | 200 https://worthcalc.win/en/tools/subscription-audit/ | 1 | no |
| 22 | https://worthcalc.win/es/pay-raise-vs-inflation-purchasing-power | 301→200 | https://worthcalc.win/es/pay-raise-vs-inflation-purchasing-power/ | 200 https://worthcalc.win/es/pay-raise-vs-inflation-purchasing-power/ | 1 | 301→200 | https://worthcalc.win/es/pay-raise-vs-inflation-purchasing-power/ | 200 https://worthcalc.win/es/pay-raise-vs-inflation-purchasing-power/ | 1 | no |
| 23 | https://worthcalc.win/en/tools/salary-converter | 301→200 | https://worthcalc.win/en/tools/salary-converter/ | 200 https://worthcalc.win/en/tools/salary-converter/ | 1 | 301→200 | https://worthcalc.win/en/tools/salary-converter/ | 200 https://worthcalc.win/en/tools/salary-converter/ | 1 | no |
| 24 | https://worthcalc.win/es/tools/cashback-breakeven | 301→200 | https://worthcalc.win/es/tools/cashback-breakeven/ | 200 https://worthcalc.win/es/tools/cashback-breakeven/ | 1 | 301→200 | https://worthcalc.win/es/tools/cashback-breakeven/ | 200 https://worthcalc.win/es/tools/cashback-breakeven/ | 1 | no |
| 25 | https://worthcalc.win/fr/tools/debt-strategy | 301→200 | https://worthcalc.win/fr/tools/debt-strategy/ | 200 https://worthcalc.win/fr/tools/debt-strategy/ | 1 | 301→200 | https://worthcalc.win/fr/tools/debt-strategy/ | 200 https://worthcalc.win/fr/tools/debt-strategy/ | 1 | no |
| 26 | https://worthcalc.win/en/tools/rent-vs-buy | 301→200 | https://worthcalc.win/en/tools/rent-vs-buy/ | 200 https://worthcalc.win/en/tools/rent-vs-buy/ | 1 | 301→200 | https://worthcalc.win/en/tools/rent-vs-buy/ | 200 https://worthcalc.win/en/tools/rent-vs-buy/ | 1 | no |
| 27 | https://worthcalc.win/en/ev-vs-gas-total-cost | 301→200 | https://worthcalc.win/en/ev-vs-gas-total-cost/ | 200 https://worthcalc.win/en/ev-vs-gas-total-cost/ | 1 | 301→200 | https://worthcalc.win/en/ev-vs-gas-total-cost/ | 200 https://worthcalc.win/en/ev-vs-gas-total-cost/ | 1 | no |
| 28 | https://worthcalc.win/en/privacy | 301→200 | https://worthcalc.win/en/privacy/ | 200 https://worthcalc.win/en/privacy/ | 1 | 301→200 | https://worthcalc.win/en/privacy/ | 200 https://worthcalc.win/en/privacy/ | 1 | no |
| 29 | https://worthcalc.win/es/tools/credit-card-payoff | 301→200 | https://worthcalc.win/es/tools/credit-card-payoff/ | 200 https://worthcalc.win/es/tools/credit-card-payoff/ | 1 | 301→200 | https://worthcalc.win/es/tools/credit-card-payoff/ | 200 https://worthcalc.win/es/tools/credit-card-payoff/ | 1 | no |
| 30 | https://worthcalc.win/zh/terms | 301→200 | https://worthcalc.win/zh/terms/ | 200 https://worthcalc.win/zh/terms/ | 1 | 301→200 | https://worthcalc.win/zh/terms/ | 200 https://worthcalc.win/zh/terms/ | 1 | no |
| 31 | https://worthcalc.win/zh/pay-raise-vs-inflation-purchasing-power | 301→200 | https://worthcalc.win/zh/pay-raise-vs-inflation-purchasing-power/ | 200 https://worthcalc.win/zh/pay-raise-vs-inflation-purchasing-power/ | 1 | 301→200 | https://worthcalc.win/zh/pay-raise-vs-inflation-purchasing-power/ | 200 https://worthcalc.win/zh/pay-raise-vs-inflation-purchasing-power/ | 1 | no |
| 32 | https://worthcalc.win/zh/cashback-caps-real-reward-rate | 301→200 | https://worthcalc.win/zh/cashback-caps-real-reward-rate/ | 200 https://worthcalc.win/zh/cashback-caps-real-reward-rate/ | 1 | 301→200 | https://worthcalc.win/zh/cashback-caps-real-reward-rate/ | 200 https://worthcalc.win/zh/cashback-caps-real-reward-rate/ | 1 | no |
| 33 | https://worthcalc.win/es/tools/rent-vs-buy | 301→200 | https://worthcalc.win/es/tools/rent-vs-buy/ | 200 https://worthcalc.win/es/tools/rent-vs-buy/ | 1 | 301→200 | https://worthcalc.win/es/tools/rent-vs-buy/ | 200 https://worthcalc.win/es/tools/rent-vs-buy/ | 1 | no |
| 34 | https://worthcalc.win/fr | 301→200 | https://worthcalc.win/fr/ | 200 https://worthcalc.win/fr/ | 1 | 301→200 | https://worthcalc.win/fr/ | 200 https://worthcalc.win/fr/ | 1 | no |
| 35 | https://worthcalc.win/zh/tools/installment-true-apr | 301→200 | https://worthcalc.win/zh/tools/installment-true-apr/ | 200 https://worthcalc.win/zh/tools/installment-true-apr/ | 1 | 301→200 | https://worthcalc.win/zh/tools/installment-true-apr/ | 200 https://worthcalc.win/zh/tools/installment-true-apr/ | 1 | no |
| 36 | https://worthcalc.win/zh/tools/commute-cost | 301→200 | https://worthcalc.win/zh/tools/commute-cost/ | 200 https://worthcalc.win/zh/tools/commute-cost/ | 1 | 301→200 | https://worthcalc.win/zh/tools/commute-cost/ | 200 https://worthcalc.win/zh/tools/commute-cost/ | 1 | no |
| 37 | https://worthcalc.win/de/tools/commute-cost | 301→200 | https://worthcalc.win/de/tools/commute-cost/ | 200 https://worthcalc.win/de/tools/commute-cost/ | 1 | 301→200 | https://worthcalc.win/de/tools/commute-cost/ | 200 https://worthcalc.win/de/tools/commute-cost/ | 1 | no |
| 38 | https://worthcalc.win/zh/tools/mortgage-payoff | 301→200 | https://worthcalc.win/zh/tools/mortgage-payoff/ | 200 https://worthcalc.win/zh/tools/mortgage-payoff/ | 1 | 301→200 | https://worthcalc.win/zh/tools/mortgage-payoff/ | 200 https://worthcalc.win/zh/tools/mortgage-payoff/ | 1 | no |
| 39 | https://worthcalc.win/zh/ev-vs-gas-total-cost | 301→200 | https://worthcalc.win/zh/ev-vs-gas-total-cost/ | 200 https://worthcalc.win/zh/ev-vs-gas-total-cost/ | 1 | 301→200 | https://worthcalc.win/zh/ev-vs-gas-total-cost/ | 200 https://worthcalc.win/zh/ev-vs-gas-total-cost/ | 1 | no |
| 40 | https://worthcalc.win/de/full-commute-cost-including-time | 301→200 | https://worthcalc.win/de/full-commute-cost-including-time/ | 200 https://worthcalc.win/de/full-commute-cost-including-time/ | 1 | 301→200 | https://worthcalc.win/de/full-commute-cost-including-time/ | 200 https://worthcalc.win/de/full-commute-cost-including-time/ | 1 | no |
| 41 | https://worthcalc.win/de/new-vs-used-car-total-cost | 301→200 | https://worthcalc.win/de/new-vs-used-car-total-cost/ | 200 https://worthcalc.win/de/new-vs-used-car-total-cost/ | 1 | 301→200 | https://worthcalc.win/de/new-vs-used-car-total-cost/ | 200 https://worthcalc.win/de/new-vs-used-car-total-cost/ | 1 | no |
| 42 | https://worthcalc.win/de/tools/ev-vs-gas | 301→200 | https://worthcalc.win/de/tools/ev-vs-gas/ | 200 https://worthcalc.win/de/tools/ev-vs-gas/ | 1 | 301→200 | https://worthcalc.win/de/tools/ev-vs-gas/ | 200 https://worthcalc.win/de/tools/ev-vs-gas/ | 1 | no |
| 43 | https://worthcalc.win/fr/tools/ev-vs-gas | 301→200 | https://worthcalc.win/fr/tools/ev-vs-gas/ | 200 https://worthcalc.win/fr/tools/ev-vs-gas/ | 1 | 301→200 | https://worthcalc.win/fr/tools/ev-vs-gas/ | 200 https://worthcalc.win/fr/tools/ev-vs-gas/ | 1 | no |
| 44 | https://worthcalc.win/de/tools/rent-vs-buy | 301→200 | https://worthcalc.win/de/tools/rent-vs-buy/ | 200 https://worthcalc.win/de/tools/rent-vs-buy/ | 1 | 301→200 | https://worthcalc.win/de/tools/rent-vs-buy/ | 200 https://worthcalc.win/de/tools/rent-vs-buy/ | 1 | no |
| 45 | https://worthcalc.win/de/ev-vs-gas-total-cost | 301→200 | https://worthcalc.win/de/ev-vs-gas-total-cost/ | 200 https://worthcalc.win/de/ev-vs-gas-total-cost/ | 1 | 301→200 | https://worthcalc.win/de/ev-vs-gas-total-cost/ | 200 https://worthcalc.win/de/ev-vs-gas-total-cost/ | 1 | no |

## Layer evidence

- `worthcalc.win` DNS A records are Cloudflare edge addresses (`104.21.33.154`, `172.67.146.138`), so the custom-domain probe traverses Cloudflare.
- The custom-domain 301 carries `Server: cloudflare`, `CF-Cache-Status: DYNAMIC`, `x-github-request-id`, `x-github-edge-region`, `Via`, and GitHub/Fastly cache headers. The response is therefore a Cloudflare-proxied GitHub Pages response; no Cloudflare redirect-rule signature was observed in the headers.
- Direct equivalent path on `https://btcson66-rgb.github.io/worthcalc/` returns `Server: GitHub.com` and a 301 to the configured custom domain; the custom-domain request then performs the slash normalization. This is consistent with GitHub Pages static-directory canonicalization behind Cloudflare, not a repository `_redirects` file or a Cloudflare-only redirect.

Representative custom-domain response headers:

```text
HTTP/1.1 301 Moved Permanently
Server: cloudflare
location: https://worthcalc.win/en/annual-fee-card-breakeven/
x-github-request-id: 776E:1628E6:A7486:B1283:6AA8276E
x-github-edge-region: uksouth
via: 1.1 varnish
x-served-by: cache-sin-wsat1880034-SIN
cf-cache-status: DYNAMIC
HTTP/1.1 200 OK
Server: cloudflare
x-github-request-id: 4014:122CEC:EB4F7:F5544:6AA826FD
x-github-edge-region: southeastasia
via: 1.1 varnish
x-served-by: cache-sin-wsat1880034-SIN
cf-cache-status: DYNAMIC
```

## Build-side evidence

- `astro.config` already uses `trailingSlash: 'always'`.
- `public/_redirects`: absent. GitHub Pages does not support `_redirects`; no `_redirects` workaround was added.
- Built route shape is directory plus `index.html`; no same-route `.html` sibling is emitted for the sampled paths.
- The 45 no-slash forms are not in the local sitemap or disposition table; the slash forms are the canonical route inventory members.
- Full built-output scan covered 1,285 HTML files: 0 no-slash internal route references across emitted absolute URLs, 0 in canonical, 0 in hreflang, 0 URL-valued meta tags, and 0 in JSON-LD. The 304 sitemap `<loc>` values also contain 0 no-slash routes.

## 判定

**歷史殘留，不是目前站上產生器持續產生。** 證據是 45/45 一跳 301 到結尾斜線、一般 UA 與 Googlebot 完全一致、local source/build metadata 使用結尾斜線、`public/_redirects` 不存在，且本次掃描未發現無斜線輸出目標。這次不移除 301、不改 canonical／hreflang／sitemap／robots 功能。

## 限制

- Cloudflare Page Rule／Redirect Rule／Bulk Redirect 的控制台設定未由本機 repo 憑證讀取；結論依 DNS、雙 UA curl、GitHub Pages 直連對照與 build 產物證據判定。
- response `Date`／cache headers 是邊緣服務器回應證據；`Cache-Control: no-cache` 已送出，但不能把 HTTP edge cache header 解讀成 Google 已重新處理。
