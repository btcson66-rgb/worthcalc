---
contentType: article
articleSlug: apr-vs-apy
locale: zh
title: "APR、APY、利率差在哪？借錢看 APR，存錢看 APY 的完整原因"
description: "APR 是年化借款成本指標，APY 反映存款利息與複利頻率；兩者不能直接當同一個「利率」看。用公式與範例拆解。"
relatedTool: /zh/tools/installment-true-apr/
lastReviewed: 2026-08-29
draft: false
---

# APR、APY、利率差在哪？借錢看 APR，存錢看 APY 的完整原因

**快速答案：**APR（Annual Percentage Rate）用來把借款成本年化，通常比單純 nominal interest rate 更接近「借這筆錢的標準化成本」，因為某些費用可能被納入；APY（Annual Percentage Yield）用於存款收益，反映利率與複利頻率。兩者都用百分比表示，但方向、法規目的與計算基礎不同，不能看到數字就直接比較高低。

## 利率、APR、APY 三個名詞回答不同問題

- **Interest rate／名目利率**：基礎的利息比例，不一定包含費用，也不一定反映複利後一整年的實際收益。
- **APR**：借款成本的年化比較指標。CFPB 對貸款的說明指出，APR 通常包含利率與特定額外費用，因此可能高於標示利率。
- **APY**：存款帳戶的年化收益率，Regulation DD 定義它反映利率與複利頻率對一年總利息的效果。

## 為什麼 5% 利率不一定等於 5% APY

如果存款年利率 5%，一年只計息一次，APY 接近 5%。若利息更頻繁複利，在其他條件相同下，APY 會略高於 nominal rate。

簡化公式：

`APY = (1 + r/n)^n − 1`

其中 r 是名目年利率，n 是一年複利次數。實際銀行揭露則應以金融機構依適用規則計算的 APY 為準，而不是自己用簡化公式取代官方揭露。

## 為什麼 APR 也不等於「每年真的多付這個百分比」

APR 是標準化比較工具，不是所有貸款情境的現金流預言。貸款期間、費用收取時間、提前還款、變動利率與實際餘額都會影響你最後支付的總金額。CFPB 特別提醒，APR 是比較不同借款成本的重要指標，但不能忽略 loan term 與其他條款。

## 範例：同樣寫 5%，方向完全不同

### 存款
銀行 A 標示名目利率 5%，按月複利，APY 可能略高於 5%。你應比較 APY、費用、最低餘額與提款條件。

### 借款
貸款 B 名目利率 5%，但有起始費用。其 APR 可能高於 5%，因為標準化借款成本不只看利息。

所以「APY 5.1%」與「APR 5.1%」即使數字一樣，也不是同一件事：一個描述可能賺到的存款利息，一個描述借款成本。

## 短期分期為什麼更需要看年化

一次性 3% 手續費看起來很小，但如果借款期間只有幾個月，把成本年化後可能比直覺高很多。WorthCalc 既有的 **Installment True APR Calculator** 就是用現金流與期間把「0 利率＋手續費」還原成可比較成本。

## 存款比較也不能只看 APY

APY 很重要，但你還要看：

- 利率是否固定或可變
- 是否需要最低餘額
- 是否只有新資金或特定層級適用
- 月費是否會抵消利息
- 定存／CD 是否有提前提款罰則
- 優惠是否只維持短期

Regulation DD 的設計目的之一，就是要求金融機構揭露 APY、利率、最低餘額與費用等條件，協助比較存款帳戶。

## APR 比較也要同期間、同產品類型

APR 對類似貸款很有價值，但若一個方案 36 個月、一個 84 個月，月付與總利息仍可能差很多。不要因為 APR 低一點，就忽略期間拉長後的總成本。

## FAQ

### APR 越低一定越好嗎？
對相同類型、相近條件的借款通常代表較低標準化成本，但仍要檢查期限、固定／變動利率、總付款與提前還款條款。

### APY 越高一定越好嗎？
收益率較高有利，但仍需檢查費用、最低餘額、提款限制與優惠期限。

### 信用卡 APR 會每天算嗎？
許多發卡機構使用 daily periodic rate 計算利息；應以你的合約與帳單為準。

### APR 可以和 APY 直接相減嗎？
不適合作為一般決策方法，因為一個是借款成本、一個是存款收益，現金流方向與規則不同。

### 為什麼房貸 APR 比利率高？
CFPB 說明房貸 APR 可能納入 points、broker fees 與其他取得貸款的費用，因此通常高於單純 interest rate。

## 來源與限制

APR 與 APY 的法規定義因產品與司法管轄區而異。本頁主要引用美國 CFPB Regulation Z／DD 作為英文金融術語的標準說明；台灣或其他市場請以當地銀行揭露與主管機關規則為準。

## APR、APY 都是「標準化」，但標準化的目的不同

APR 的政策目的在於讓信用成本可比較；APY 的政策目的在於讓存款收益可比較。這也是為什麼美國 Regulation Z 處理 credit，Regulation DD 處理 deposit accounts。兩者都不是廣告文案可以任意定義的行銷詞。

## 用同一組數字看複利差異

假設存款 nominal rate 5%，每月複利：

`(1 + 0.05/12)^12 − 1 ≈ 5.116%`

所以簡化 APY 約 5.12%。如果每年只計息一次，APY 接近 5%。這個例子只是教學；實際金融機構的 APY 應以正式揭露為準，尤其是 tiered rate、step-up rate、bonus 或特殊提款規則。

## 起始獎金不是 APY 的同義詞

有些存款帳戶提供 opening bonus。高額獎金可能讓第一年實際拿到的總金額看起來很高，但 Regulation DD 對 APY 與 bonus 有分開規則。消費者比較時應把一次性 bonus、持續 APY、最低存款與持有期分開，不要把一次性獎金年化後假裝是永久利率。

## Promotional APR 也要看結束後會發生什麼

信用卡 0% APR 可能只維持特定月份，之後回到 standard APR。比較 balance transfer 或分期時，要把轉帳費、promo length、promo 結束後餘額一起試算。0% 標題不代表整個交易成本一定是零。

## APR 也可能因產品不同而無法直接 apples-to-apples

固定房貸、ARM、HELOC、信用卡與短期貸款的現金流結構不同。CFPB 也提醒，在不同類型的房貸之間只看 APR 可能忽略變動利率風險。最安全的做法是先比較同類型、同期限與相近條件，再看總成本與風險條款。

## 一個借款比較 checklist

- APR 是否固定或可變？
- 起始費、points、origination fee 有多少？
- 貸款期數相同嗎？
- 總 finance charge 與 total of payments 是多少？
- 是否有提前清償限制？
- 月付降低是否只是因為期間被拉長？

## 一個存款比較 checklist

- APY 是否為目前有效的正式揭露？
- 是否為 promotional／introductory rate？
- 最低餘額與 tier 怎麼算？
- 有沒有月費、提款限制或 early withdrawal penalty？
- 高 APY 是否只適用部分餘額？

這兩張 checklist 比「看到最高百分比就選」更接近真正比較。

## Related WorthCalc pages

- https://worthcalc.win/zh/tools/installment-true-apr/
- https://worthcalc.win/zh/simple-vs-compound-interest/
- https://worthcalc.win/zh/loan-term-vs-total-interest/

若要進一步理解名目利率、有效年利率與台灣總費用年百分率的差異，可看有效利率完整解析。

[有效利率是什麼？名目利率、有效年利率與總費用年百分率別混在一起](/zh/guides/effective-interest-rate-explained/)

## Sources

- https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-loan-interest-rate-and-the-apr-en-733/
- https://www.consumerfinance.gov/rules-policy/regulations/1030/2/
- https://www.consumerfinance.gov/rules-policy/regulations/1030/2011-12-30/a/
- https://www.consumerfinance.gov/consumer-tools/credit-cards/answers/key-terms/

> WorthCalc 提供一般教育用途的試算與決策框架，不構成個人化財務、投資、稅務、法律、信用或貸款建議。實際行動前請核對最新合約、利率、費用與所在地規則。
