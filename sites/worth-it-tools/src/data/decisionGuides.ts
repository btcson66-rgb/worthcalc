import type { Locale } from '../consts';
import type { DecisionGuideContent } from '../types/decisionGuide';
import { capReachedAt, costcoTw, costcoUs, ntd, percent, savingsBreakeven, usd } from '../lib/rates';

const labels: Record<Locale, DecisionGuideContent['labels']> = {
  en: {
    directAnswer: 'Direct answer',
    inputs: 'Inputs to collect',
    formula: 'Formula',
    workedExample: 'Worked example',
    sensitivity: 'Sensitivity check',
    scenario: 'Scenario',
    changedInput: 'Changed input',
    result: 'Result',
    limitations: 'Limitations',
    sources: 'Sources and verification',
    lastVerified: 'Last verified',
  },
  zh: {
    directAnswer: '直接答案',
    inputs: '先準備這些資料',
    formula: '公式',
    workedExample: '完整算例',
    sensitivity: '敏感度檢查',
    scenario: '情境',
    changedInput: '變動條件',
    result: '結果',
    limitations: '限制',
    sources: '資料來源與查核',
    lastVerified: '最後查核',
  },
};

export const installmentGuides: Record<Locale, DecisionGuideContent> = {
  en: {
    id: 'installment-apr-method',
    labels: labels.en,
    directAnswer: 'A plan advertised at 0% has a real borrowing cost whenever the installment price exceeds the cash price or a mandatory fee is added. Compare the cash price with every required payment, then solve the monthly cash-flow rate. A 3% fee spread across 12 equal end-of-month payments produces an estimated effective annual rate of about 5.63%, not 3%.',
    inputs: ['Cash price available today, including any pay-now discount', 'Deposit or fee paid at signing', 'Amount and due date of every installment', 'Mandatory account, insurance, card, or service charges', 'Late-payment and post-promotional terms, kept outside the base case', 'The lender’s disclosed legal APR, TAE, TAEG, or effective annual rate'],
    formula: 'Solve r where: 0 = cash price − upfront fees − Σ(payment_t ÷ (1 + r)^t); estimated effective annual rate = ((1 + r)^12 − 1) × 100',
    workedExample: 'A product costs $1,200 now or 12 payments of $103. The plan collects $1,236, so the flat fee is $36 or 3% of the cash price. Solving $1,200 = Σ[$103 ÷ (1 + r)^t] for months 1–12 gives r ≈ 0.458% per month and an estimated effective annual rate of about 5.63%.',
    sensitivity: [
      { scenario: 'No fee', input: '12 × $100 on a $1,200 cash price', result: '0.00% estimated annual rate' },
      { scenario: '3% fee, shorter term', input: '6 × $206', result: 'About 10.71% estimated annual rate' },
      { scenario: '3% fee, base case', input: '12 × $103', result: 'About 5.63% estimated annual rate' },
      { scenario: '3% fee, longer term', input: '24 × $51.50', result: 'About 2.89% estimated annual rate' },
    ],
    cta: { label: 'Calculate the rate from your own payment schedule', href: '/en/tools/installment-true-apr/' },
    limitations: ['This is a cash-flow estimate, not a lender disclosure or a legal APR determination. Statutory methods can specify which charges, dates, tolerances, taxes, or optional products count.', 'Irregular first payments, deferred periods, refunds, balloon payments, and changing rates require the exact dated cash flows.', 'A low rate does not make a purchase affordable. Check the total monthly commitments and the consequences of a missed payment before signing.'],
    sources: [
      { label: 'CFPB Regulation Z § 1026.22 — determination of APR', href: 'https://www.consumerfinance.gov/rules-policy/regulations/1026/22/' },
      { label: 'CFPB — difference between interest rate and APR', href: 'https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-loan-interest-rate-and-the-apr-en-733/' },
    ],
    lastVerified: '2026-07-18',
  },
  zh: {
    id: 'installment-apr-method',
    labels: labels.zh,
    directAnswer: '只要分期總價高於現金價，或另收必要手續費，「0 利率」就不等於零成本。先用今天可成交的現金價，對照簽約當下與每一期的必要付款，再用現金流反推月利率。現金價加收 3%、分 12 期月底繳，估算有效年率約 5.63%，不是 3%。',
    inputs: ['今天可成交的現金價，包含付清可能取得的折扣', '簽約當下支付的頭期款、開辦費或固定手續費', '每一期金額、期數與真正扣款日', '強制搭售的帳戶、卡片、保險或服務費', '遲繳、優惠期結束與提前清償條款，先和基本情境分開', '發卡機構或融資方正式揭露的年利率與費用'],
    formula: '解出月利率 r：0 = 現金價 − 前期費用 − Σ（第 t 期付款 ÷ (1 + r)^t）；估算有效年率 = ((1 + r)^12 − 1) × 100',
    workedExample: '商品現金價 NT$36,000，分 12 期每期 NT$3,090，總付款 NT$37,080。表面多付 NT$1,080，等於現金價 3%；但本金逐月下降。解出 36,000 = 第 1 至 12 期付款的折現值後，月利率約 0.458%，估算有效年率約 5.63%。',
    sensitivity: [
      { scenario: '完全零費用', input: '12 期 × NT$3,000', result: '估算年率 0.00%' },
      { scenario: '3% 費用、6 期', input: '6 期 × NT$6,180', result: '估算年率約 10.71%' },
      { scenario: '3% 費用、12 期', input: '12 期 × NT$3,090', result: '估算年率約 5.63%' },
      { scenario: '3% 費用、24 期', input: '24 期 × NT$1,545', result: '估算年率約 2.89%' },
    ],
    cta: { label: '用自己的分期金額反推估算年率', href: '/zh/tools/installment-true-apr/' },
    limitations: ['這是簡化現金流的估算，不是發卡機構的法定利率揭露。哪些費用應納入、日期、容許誤差與契約分類，仍以適用法規及正式契約為準。', '首期付款日不規則、先享後付、尾款、退款、變動利率或提前清償時，必須使用每一筆實際日期與金額。', '估算年率低不代表負擔得起；簽約前仍要合併檢查所有分期月付與遲繳後果。'],
    sources: [
      { label: '金融監督管理委員會 — 信用卡分期付款服務作業規範', href: 'https://law.fsc.gov.tw/LawContent.aspx?id=GL000237&media=print' },
      { label: '金融監督管理委員會 — 信用卡定型化契約應記載事項', href: 'https://law.fsc.gov.tw/LawContent.aspx?id=FL049905&media=print' },
    ],
    lastVerified: '2026-07-18',
  },
};

export const upfrontFeeGuides: Partial<Record<Locale, DecisionGuideContent>> = {
  en: {
    id: 'upfront-fee-financing-cost-method',
    labels: labels.en,
    directAnswer: 'An upfront fee raises the cost of financing even when the monthly payment does not change. Compare the payment schedule with the cash you can actually use after required charges. On a $10,000, 24-payment offer at $450 per month, no fee means $10,000 of usable funds and an estimated effective annual rate of 7.76%. A 5% fee deducted at funding leaves $9,500 but keeps the same $450 payment, lifting the estimate to 13.39%.',
    inputs: ['Contract or financed amount before fees', 'Every origination, documentation, administration, insurance, or account charge required to obtain the offer', 'Whether each charge is deducted from proceeds, paid separately at signing, or added to principal', 'Exact amount and due date of every payment', 'Optional charges and late fees, kept outside the normal-payment case', 'The lender’s official APR and disclosure, used as the legal comparison figure'],
    formula: 'Usable funds = amount advanced − charges deducted or paid at funding. Solve monthly r: usable funds = Σ(post-funding payment_t ÷ (1 + r)^t). Estimated effective annual rate = ((1 + r)^12 − 1) × 100. Cash cost = post-funding payments − usable funds; equivalently, all outflows including a separately paid fee − gross advance.',
    workedExample: 'Offer A advances $10,000 and requires 24 payments of $450, for $10,800 total. With no fee, full-term cash cost is $800 and the estimated effective annual rate is 7.76%. Offer B shows the same amount and the same $450 payment but deducts a $500 origination fee. You can use only $9,500, still repay $10,800, and therefore bear $1,300 of cash cost; the estimated annual rate rises to 13.39%.',
    sensitivity: [
      { scenario: 'No upfront fee', input: '$10,000 usable; 24 × $450', result: '$800 cost; about 7.76% annually' },
      { scenario: '3% deducted fee', input: '$9,700 usable; 24 × $450', result: '$1,100 cost; about 11.06% annually' },
      { scenario: '5% deducted fee', input: '$9,500 usable; 24 × $450', result: '$1,300 cost; about 13.39% annually' },
      { scenario: '7.5% deducted fee', input: '$9,250 usable; 24 × $450', result: '$1,550 cost; about 16.47% annually' },
    ],
    cta: { label: 'Calculate the rate from your net proceeds and payment schedule', href: '/en/tools/installment-true-apr/' },
    limitations: ['This cash-flow estimate is educational and is not a legal APR calculation. Applicable rules decide which charges enter the finance charge, how dates are treated, and which tolerances apply.', 'Do not subtract a fee twice. If it is withheld from proceeds, reduce usable funds; if you receive the full amount and pay the fee separately, record the separate day-zero outflow instead.', 'Offers with different terms, collateral, variable rates, balloon payments, prepayment rules, or mandatory ancillary products require more than a one-line payment comparison. Affordability and approval risk are separate questions.'],
    sources: [
      { label: 'CFPB — fees on personal installment loans', href: 'https://www.consumerfinance.gov/ask-cfpb/do-personal-installment-loans-have-fees-en-2120/' },
      { label: 'CFPB — mortgage costs paid upfront or over time', href: 'https://www.consumerfinance.gov/ask-cfpb/what-costs-come-with-taking-out-a-mortgage-en-153/' },
      { label: 'CFPB — what an origination fee pays for and where it is disclosed', href: 'https://www.consumerfinance.gov/ask-cfpb/what-are-mortgage-origination-services-what-is-an-origination-fee-en-155/' },
    ],
    lastVerified: '2026-07-18',
  },
  zh: {
    id: 'upfront-fee-financing-cost-method',
    labels: labels.zh,
    directAnswer: '開辦費不會因為月付相同就消失；應比較扣除簽約當下必要費用後，真正可運用的資金。貸款名目 NT$300,000、36 期每期 NT$9,000 時，零開辦費的估算有效年率約 5.18%；若撥款時另付 NT$10,000、實際只留下 NT$290,000 可用，月付仍相同，估算有效年率會升到約 7.60%。',
    inputs: ['契約上的核貸與實際撥款金額', '開辦費、帳管費、信用查詢費、徵信費及取得貸款必要的其他費用', '費用是在撥款中扣除、簽約日另付，或被加進本金', '每期金額、總期數與第一期扣款日', '可自由選擇的保險或服務，以及遲繳費用，和正常履約情境分開', '銀行契約與廣告正式揭露的總費用年百分率'],
    formula: '實際可用資金 = 撥款金額 − 撥款日扣除或同日支付的必要費用。解出月利率 r：實際可用資金 = Σ（撥款後第 t 期付款 ÷ (1 + r)^t）。估算有效年率 = ((1 + r)^12 − 1) × 100；現金成本 = 撥款後總還款 − 實際可用資金，等同「包含同日另付費用的全部流出 − 原始撥款」。',
    workedExample: '方案 A 核貸並可用 NT$300,000，36 期各 NT$9,000，總還款 NT$324,000；全期現金成本 NT$24,000，估算有效年率約 5.18%。方案 B 的核貸額與月付完全相同，但撥款時支付 NT$10,000 開辦及必要費用，只留下 NT$290,000 可用；全期現金成本變成 NT$34,000，估算有效年率約 7.60%。',
    sensitivity: [
      { scenario: '無前置費用', input: '可用 NT$300,000；36 × NT$9,000', result: '成本 NT$24,000；估算年率約 5.18%' },
      { scenario: '費用 NT$5,000', input: '可用 NT$295,000；月付不變', result: '成本 NT$29,000；估算年率約 6.37%' },
      { scenario: '費用 NT$10,000', input: '可用 NT$290,000；月付不變', result: '成本 NT$34,000；估算年率約 7.60%' },
      { scenario: '費用 NT$15,000', input: '可用 NT$285,000；月付不變', result: '成本 NT$39,000；估算年率約 8.87%' },
    ],
    cta: { label: '輸入實拿金額與期款，反推自己的估算年率', href: '/zh/tools/installment-true-apr/' },
    limitations: ['這是現金流教育估算，不取代銀行依法揭露的總費用年百分率。正式口徑對納入費用、付款日期、基準日與變動條件有明確規則。', '費用只能計一次：若銀行從撥款扣除，就降低實際可用資金；若全額撥款後在同日另付，則記為同日現金流出，不要兩邊都扣。', '利率調整、寬限期、提前清償、綁約、保證人或擔保品等條件也會改變風險；月付負擔能力仍需單獨檢查。'],
    sources: [
      { label: '金管會 — 金融機構辦理消費者信用貸款收取相關手續費，應合理、公開、透明（103-08-05 金管銀合字第 10330002771 號函）', href: 'https://law.fsc.gov.tw/LawContent.aspx?id=GL001273' },
      { label: '金管會 — 銀行業暨保險業辦理消費者信用交易廣告應揭示總費用範圍及年百分率計算方式標準（94-08-15 金管銀（三）字第 0943000999 號；第 7、8 條）', href: 'https://law.fsc.gov.tw/LawContent.aspx?id=FL036733' },
      { label: '中華民國銀行公會 — 銀行消費者信用貸款手續費彙整表（每季更新；本頁查看的版本資料日期 115-06-30，2026-07-31 公告；在「消費者資訊 → 一般金融訊息」下載）', href: 'https://www.ba.org.tw/consumerGeneral/index' },
    ],
    lastVerified: '2026-10-17',
  },
};

export const bnplCardGuides: Partial<Record<Locale, DecisionGuideContent>> = {
  en: {
    id: 'bnpl-card-comparison-method',
    labels: labels.en,
    directAnswer: 'BNPL is not automatically cheaper than a credit-card installment plan. Compare the cash price, every scheduled payment, mandatory fees, the amount due in the next 30 days, and one missed-payment scenario. In this illustrative $600 purchase, four $150 BNPL payments cost $600 when paid on time, while six card installments of $104 cost $624. BNPL saves $24 in the base case but requires $300 by day 14 when the first payment is due at checkout.',
    inputs: ['Cash price and any discount lost by choosing financing', 'Payment due today, every later amount, and the exact cadence—weekly, biweekly, or monthly', 'Interest, installment fee, card fee, and every mandatory account or payment-method charge', 'Late fee, returned-payment or overdraft risk, default interest, collections, and account-blocking terms', 'Refund and dispute process, including whether scheduled debits continue during a return', 'All other BNPL and card payments due in the same 30-day window'],
    formula: 'Normal financing cost = mandatory upfront charges + Σ(scheduled payments) − cash price. 30-day payment load = Σ(all payments due in the next 30 days). Stress cost = normal financing cost + one contract late fee + one bank overdraft/NSF fee + any default interest entered by the user.',
    workedExample: 'A $600 purchase offers pay-in-four at $150 today and $150 every two weeks, or six monthly card installments of $104. On-time BNPL totals $600 and has $0 financing cost; the card plan totals $624 and costs $24. The trade-off is timing: BNPL takes $300 by day 14 and the full $600 by day 42, while the card plan spreads payments across six statement cycles. If the shopper enters an illustrative $15 BNPL late fee plus a $35 bank overdraft fee, BNPL rises to $650—$26 more than the card plan.',
    sensitivity: [
      { scenario: 'BNPL paid on time', input: '4 × $150; first payment today', result: '$600 total; $0 financing cost; $300 due by day 14' },
      { scenario: 'Card installment plan', input: '6 × $104 monthly', result: '$624 total; $24 financing cost' },
      { scenario: 'One BNPL late fee', input: 'User enters an illustrative $15 contract fee', result: '$615 total; still $9 below the card plan' },
      { scenario: 'Late fee plus overdraft', input: 'Illustrative $15 + $35 entered by user', result: '$650 total; $26 above the card plan' },
    ],
    cta: { label: 'Calculate the annualized cost of a regular installment schedule', href: '/en/tools/installment-true-apr/' },
    limitations: ['The fee amounts in the stress rows are user-entered illustrations, not market averages. Replace them with the provider agreement and your bank’s current fee schedule.', 'Pay-in-four products, longer-term BNPL loans, card installments, revolving balances, and deferred-interest promotions have different economics. Model the exact product rather than the checkout label.', 'The CFPB withdrew its 2024 BNPL interpretive rule on May 12, 2025. Do not assume a BNPL purchase has the same federal protections as a credit card; check the current contract and applicable law.', 'A lower financing cost does not make the purchase affordable. The comparison excludes the value of rewards unless they are certain, uncapped, and earned without carrying a balance.'],
    sources: [
      { label: 'CFPB — BNPL fees, overdraft risk, collections, and credit reporting', href: 'https://www.consumerfinance.gov/ask-cfpb/do-buy-now-pay-later-bnpl-loans-have-fees-en-2118/' },
      { label: 'CFPB — 2025 study of pay-in-four use and other unsecured debt', href: 'https://www.consumerfinance.gov/data-research/research-reports/consumer-use-of-buy-now-pay-later-and-other-unsecured-debt/' },
      { label: 'CFPB — 2024 BNPL interpretive rule withdrawal notice', href: 'https://www.consumerfinance.gov/compliance/compliance-resources/consumer-cards-resources/buy-now-pay-later-bnpl-products/' },
    ],
    lastVerified: '2026-07-18',
  },
  zh: {
    id: 'bnpl-card-comparison-method',
    labels: labels.zh,
    directAnswer: '先買後付不一定比信用卡分期便宜。要同時比較商品現金價、全部期款、30 天內實際扣款壓力，以及一次遲繳後的契約成本。這個 NT$12,000 示範中，BNPL 4 期各 NT$3,000、正常履約總付 NT$12,000；信用卡 6 期各 NT$2,050、總付 NT$12,300。BNPL 基本情境少 NT$300，但若第一期當場扣款、第二期在 30 天內到期，短期要先準備 NT$6,000。',
    inputs: ['商品一次付清價格，以及選分期會失去的折扣或回饋', '簽約當下、每一期的金額與確切扣款日', '利息、分期手續費、帳管費及綁定付款工具的必要費用', '違約金、遲延利息、催收、停用服務與銀行扣款失敗成本', '退貨、取消與爭議期間是否仍會繼續扣款', '同一月份其他信用卡分期、BNPL 與固定支出'],
    formula: '正常融資成本 = 簽約必要費用 + Σ（全部期款）− 商品現金價。30 天扣款壓力 = 未來 30 天內所有信用卡與 BNPL 到期金額合計。壓力情境成本 = 正常融資成本 + 契約違約金 + 遲延利息 + 使用者輸入的扣款失敗相關費用。',
    workedExample: '商品現金價 NT$12,000。BNPL 方案為簽約日先付 NT$3,000，再依契約付三期 NT$3,000，正常總額 NT$12,000；信用卡方案為 6 期各 NT$2,050，總額 NT$12,300。正常履約時 BNPL 少付 NT$300，但第一期若當場扣、下一期在 30 天內到期，當月先流出 NT$6,000。若把契約中的一次 NT$300 違約金作為示範輸入，兩者總額相同；再輸入 NT$200 遲延利息，BNPL 變成 NT$12,500，反而多 NT$200。',
    sensitivity: [
      { scenario: 'BNPL 正常履約', input: '4 × NT$3,000；首期當場付', result: '總付 NT$12,000；30 天內可能付 NT$6,000' },
      { scenario: '信用卡分 6 期', input: '6 × NT$2,050', result: '總付 NT$12,300；正常每期 NT$2,050' },
      { scenario: 'BNPL 一次違約金', input: '示範輸入 NT$300', result: '總付 NT$12,300；與信用卡方案相同' },
      { scenario: '違約金加遲延利息', input: '示範輸入 NT$300 + NT$200', result: '總付 NT$12,500；比信用卡多 NT$200' },
    ],
    cta: { label: '把自己的期款輸入分期年率工具', href: '/zh/tools/installment-true-apr/' },
    limitations: ['壓力情境的 NT$300 與 NT$200 只示範計算方式，不是市場平均。必須改填契約所載違約金、遲延利息與實際扣款規則。', '台灣金管會 2025 年提醒，BNPL 是應收債權轉讓後的分期服務，非金融特許業務，但本質仍是借貸並可能產生違約金、遲延利息及其他費用。不要把它當成單純付款按鈕。', '信用卡分期、循環信用與帳單一次付清是不同還款方式；若分期後未繳足當期應繳，必須另外依契約處理循環利息或違約後果。', '較低總額不等於負擔得起。回饋、點數或迎新禮只有在確定取得、不為了湊門檻多消費且不產生利息時才適合另列。'],
    sources: [
      { label: '金融監督管理委員會銀行局 — 2025 年先買後付（BNPL）提醒', href: 'https://www.banking.gov.tw/ch/home.jsp?dataserno=202501200001&dtable=News&id=540&mcustomize=news_view.jsp&parentpath=0%2C524%2C539' },
      { label: '金融監督管理委員會 — 信用卡分期付款服務作業規範', href: 'https://law.fsc.gov.tw/LawContent.aspx?id=GL000237&media=print' },
      { label: '金融監督管理委員會 — 信用卡定型化契約應記載事項', href: 'https://law.fsc.gov.tw/LawContent.aspx?id=FL049905&media=print' },
    ],
    lastVerified: '2026-07-18',
  },
};

export const monthlyAnnualGuides: Partial<Record<Locale, DecisionGuideContent>> = {
  en: {
    id: 'monthly-annual-subscription-method',
    labels: labels.en,
    directAnswer: 'Annual billing saves money only when you keep the service past its break-even month or the probability-weighted monthly cost is higher than the non-refundable annual price. At $15 monthly or $120 annually, eight paid months cost the same and the annual plan starts saving in month nine. If there is a 30% chance you stop after month four and a 70% chance you use all year, expected monthly billing is $144, so annual billing saves an expected $24—but it still loses $60 in the early-exit outcome.',
    inputs: ['Current monthly price after any trial or promotion', 'Annual price including tax and mandatory fees', 'Months you realistically expect to use the service', 'Probability of keeping it for the full year and a plausible early-cancel month', 'Prorated refund, pause, downgrade, or transfer terms', 'Renewal date, renewal price, cancellation method, and proof to retain'],
    formula: 'Simple break-even months = annual price ÷ monthly price. Expected monthly cost = p(full year) × 12M + (1 − p) × kM. Non-refundable annual cost = A. Full-year probability needed for annual to win = (A − kM) ÷ (12M − kM).',
    workedExample: 'A service is $15 a month or $120 for a non-refundable year. Simple break-even is $120 ÷ $15 = 8 months, so annual billing saves only from month nine. Suppose there is a 70% chance of using all 12 months and a 30% chance of cancelling after four. Expected monthly cost is 0.70 × $180 + 0.30 × $60 = $144. The annual plan costs $120 and saves $24 in expectation, but if the four-month outcome happens, monthly billing would have saved $60.',
    sensitivity: [
      { scenario: 'High early-cancel risk', input: '30% full year; otherwise stop after month 4', result: 'Expected monthly $96; monthly saves $24' },
      { scenario: 'Probability break-even', input: '50% full year; otherwise stop after month 4', result: 'Expected monthly $120; tie with annual' },
      { scenario: 'Base estimate', input: '70% full year; otherwise stop after month 4', result: 'Expected monthly $144; annual saves $24' },
      { scenario: 'Certain full-year use', input: '12 monthly payments', result: 'Monthly $180; annual saves $60' },
    ],
    cta: { label: 'Add the plan to your subscription audit', href: '/en/tools/subscription-audit/' },
    limitations: ['The probability model is a decision aid, not a forecast. Use a range if you cannot estimate retention confidently.', 'A monthly option may still have a minimum term, notice period, or price increase; annual plans may have prorated refunds. Use the actual contract.', 'Do not count an annual discount as savings if prepaying strains essential cash or if the service would be cheaper to pause and restart seasonally.'],
    sources: [
      { label: 'FTC Consumer Advice — free trials, auto-renewals, and negative-option subscriptions', href: 'https://consumer.ftc.gov/articles/getting-and-out-free-trials-auto-renewals-and-negative-option-subscriptions' },
      { label: 'Google Play Help — cancel, pause, or change a subscription', href: 'https://support.google.com/googleplay/answer/7018481?hl=en' },
      { label: 'Apple Support — cancel a subscription', href: 'https://support.apple.com/en-us/118428' },
    ],
    lastVerified: '2026-07-18',
  },
  zh: {
    id: 'monthly-annual-subscription-method',
    labels: labels.zh,
    directAnswer: '年繳不是看到折扣就一定省。先算年費等於幾個月月費，再把提前不用、不能按比例退款與一次付清的風險算進去。月費 NT$300、年費 NT$2,880 時，打平點是 9.6 個月，至少用到第 10 個月年繳才開始低於月繳。若有 80% 機率用滿一年、20% 機率第 4 個月停用，月繳期望成本為 NT$3,120，年繳期望省 NT$240；但真的第 4 個月停用時，月繳會少花 NT$1,680。',
    inputs: ['優惠期結束後的真正月費', '含稅與必要費用的年繳總額', '實際可能使用的月份，不用「希望會用」代替', '用滿一年機率與合理的提早停用月份', '能否按比例退費、暫停、降級或轉移', '下次扣款日、續約價、取消路徑與成功證明'],
    formula: '單純打平月數 = 年繳總額 ÷ 月費。月繳期望成本 = 用滿一年機率 p × 12M + (1 − p) × 提早停用月 k × M。不可退年繳成本 = A。年繳勝出的全年使用機率門檻 = (A − kM) ÷ (12M − kM)。',
    workedExample: '服務月費 NT$300，年繳 NT$2,880 且不按比例退費。單純打平是 2,880 ÷ 300 = 9.6 個月，所以用到第 10 個月才省。若 80% 機率用滿 12 個月、20% 機率第 4 個月停用，月繳期望成本 = 0.8 × NT$3,600 + 0.2 × NT$1,200 = NT$3,120，年繳期望省 NT$240；但提早停用情境下，月繳只付 NT$1,200。',
    sensitivity: [
      { scenario: '停用風險較高', input: '50% 用滿一年，否則第 4 個月停用', result: '月繳期望 NT$2,400；比年繳少 NT$480' },
      { scenario: '機率打平', input: '70% 用滿一年，否則第 4 個月停用', result: '月繳期望 NT$2,880；和年繳相同' },
      { scenario: '基準估計', input: '80% 用滿一年，否則第 4 個月停用', result: '月繳期望 NT$3,120；年繳省 NT$240' },
      { scenario: '確定使用一年', input: '月繳 12 次', result: '月繳 NT$3,600；年繳省 NT$720' },
    ],
    cta: { label: '把方案加入訂閱支出健檢', href: '/zh/tools/subscription-audit/' },
    limitations: ['機率是決策用假設，不是預測；不確定時要同時測試保守與樂觀情境。', '月繳可能仍有最低期間，年繳也可能允許部分退費；請以實際契約和平台畫面為準，沒有寫明的退費不要放進計算。', '若一次付年費會壓縮生活費或緊急預備金，就算期望成本較低，也不代表現金流適合。', '試算結果僅供參考，以平台條款與適用法規為準。'],
    sources: [
      { label: '行政院消費者保護會 — 電子商務消費者保護綱領（106-11-02 修正；第 10 點：自動續約應提示契約期限、收費金額、收款週期及取消方式）', href: 'https://cpc.ey.gov.tw/Page/960E744883E6A75D' },
      { label: '行政院消費者保護處 — 如何取消免費贈送或已訂閱的 APP', href: 'https://cpc.ey.gov.tw/Page/8644AFB8F5DCB8A3/a6cad45f-8418-4c7b-b999-9f833c96ef11' },
      { label: '全國法規資料庫 — 消費者保護法第 19 條（通訊交易七日解除權）', href: 'https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=J0170001&flno=19' },
      { label: '全國法規資料庫 — 通訊交易解除權合理例外情事適用準則第 2 條（一經提供即為完成之線上服務經事先同意者除外）', href: 'https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=J0170012' },
    ],
    lastVerified: '2026-10-17',
  },
};

export const gymCostGuides: Record<Locale, DecisionGuideContent> = {
  en: {
    id: 'gym-cost-per-visit-method',
    labels: labels.en,
    directAnswer: 'Gym cost per visit equals every unavoidable contract charge divided by the visits you will actually make. Include the joining fee, all monthly dues, mandatory service fees, and paid months you expect to miss. With a $49 joining fee, $45 monthly dues, a $5 monthly service fee, a 12-month term, two missed months, and five visits in each active month, total cost is $649 for 50 visits, or $12.98 per visit. Against an equivalent $18 drop-in visit, the membership needs at least four visits per active month and saves $251 in this scenario.',
    inputs: ['One-time joining, enrollment, or access-card fee', 'Monthly dues after any introductory price', 'Mandatory maintenance, facility, or service fee', 'Number of months you must pay under the contract', 'Paid months you realistically expect not to use', 'Visits per month during the remaining active months', 'Price of a genuinely equivalent drop-in, class pack, or community facility visit'],
    formula: 'Total membership cost = joining fee + contract months × (monthly dues + mandatory service fee). Active months = contract months − paid missed months. Total visits = active months × visits per active month. Cost per visit = total membership cost ÷ total visits. Break-even visits per active month = ceil(total membership cost ÷ (drop-in price × active months)).',
    workedExample: 'A gym charges $49 to join, $45 per month, and a mandatory $5 monthly facility fee for 12 months. You expect two paid months with no visits and five visits in each of the other ten months. Total cost is $49 + 12 × $50 = $649. Fifty visits cost $12.98 each. Equivalent $18 drop-ins would cost $900, so membership saves $251. Break-even is ceil($649 ÷ ($18 × 10)) = 4 visits in each active month.',
    sensitivity: [
      { scenario: 'Low attendance', input: '2 visits × 10 active months', result: '20 visits; $32.45 each; drop-ins save $289' },
      { scenario: 'First winning frequency', input: '4 visits × 10 active months', result: '40 visits; $16.23 each; membership saves $71' },
      { scenario: 'Planned attendance', input: '5 visits × 10 active months', result: '50 visits; $12.98 each; membership saves $251' },
      { scenario: 'No missed months', input: '5 visits × 12 months', result: '60 visits; $10.82 each; membership saves $431' },
    ],
    cta: { label: 'Calculate your real gym cost per visit', href: '#gym-cost-calculator' },
    limitations: ['Compare equivalent access: a drop-in may exclude classes, pool, childcare, lockers, or multiple locations that a membership includes.', 'Do not treat exercise or health benefits as cash savings. This calculation compares payment options for the same intended activity.', 'Cancellation, freezing, relocation, injury, renewal, and fee-change rights depend on the contract and applicable law; count only documented refunds or pauses.'],
    sources: [
      { label: 'FTC Consumer Advice — gym membership cancellation warning', href: 'https://consumer.ftc.gov/consumer-alerts/2025/08/la-fitness-made-it-difficult-people-cancel-gym-memberships-ftc-says' },
      { label: 'FTC Consumer Advice — auto-renewals and negative-option subscriptions', href: 'https://consumer.ftc.gov/articles/getting-and-out-free-trials-auto-renewals-and-negative-option-subscriptions' },
    ],
    lastVerified: '2026-07-19',
  },
  zh: {
    id: 'gym-cost-per-visit-method',
    labels: labels.zh,
    directAnswer: '健身房單次成本要把入會費、整段契約月費、必要設施費與「有繳費但沒去」的月份全部算進去，再除以實際到館次數。入會費 NT$1,200、月費 NT$1,288、每月設施費 NT$100、綁約 12 個月、其中 2 個月沒去，其餘每月 6 次時，總成本 NT$17,856、共 60 次，單次 NT$297.60（以上都是示範輸入，不是任何健身房的定價）。若同等單次票 NT$450，每個有效月份至少要去 4 次；此情境比單次票少 NT$9,144。',
    inputs: ['入會、建檔、門禁卡等一次性必要費用', '優惠期結束後真正會扣的月費', '每月必要設施、清潔或管理費', '契約要求付款的總月數', '預計仍會扣款但完全不去的月份', '其餘有效月份每月實際可到館次數', '內容相近的單次票、運動中心或課程套票單價'],
    formula: '會員總成本 = 入會費 + 契約月數 ×（月費 + 每月必要費）。有效月份 = 契約月數 − 繳費但未使用月份。總到館次數 = 有效月份 × 每月次數。單次成本 = 會員總成本 ÷ 總到館次數。每個有效月份最低回本次數 = 無條件進位〔會員總成本 ÷（單次替代價 × 有效月份）〕。',
    workedExample: '入會費 NT$1,200，月費 NT$1,288，另有每月 NT$100 設施費，契約共 12 個月。預估有 2 個月完全沒去，其餘 10 個月每月 6 次。總成本為 1,200 + 12 × 1,388 = NT$17,856；60 次的單次成本為 NT$297.60。同等單次票若為 NT$450，60 次需 NT$27,000，會員少 NT$9,144。最低回本是 17,856 ÷（450 × 10）無條件進位 = 每個有效月份 4 次。',
    sensitivity: [
      { scenario: '低出席', input: '2 次 × 10 個有效月份', result: '20 次；每次 NT$892.80；單次票少 NT$8,856' },
      { scenario: '剛跨過門檻', input: '4 次 × 10 個有效月份', result: '40 次；每次 NT$446.40；會員少 NT$144' },
      { scenario: '預計出席', input: '6 次 × 10 個有效月份', result: '60 次；每次 NT$297.60；會員少 NT$9,144' },
      { scenario: '全年無缺席月', input: '6 次 × 12 個月', result: '72 次；每次 NT$248；會員少 NT$14,544' },
    ],
    cta: { label: '用自己的費用與出席次數計算', href: '#gym-cost-calculator' },
    limitations: ['單次票與會員包含的團課、泳池、置物櫃、停車或跨店權限可能不同，必須比較相近服務。', '運動與健康效益不是現金回饋；本頁只比較相同運動計畫的付款方式。', '暫停、移轉、終止、退費與手續費的規定見本頁「契約規範」一節；實際金額以你簽的書面契約為準，只把書面確定的金額放入計算。', '試算結果僅供參考，以契約與主管機關公告為準。'],
    sources: [
      { label: '教育部 — 健身中心定型化契約應記載及不得記載事項（110-11-01 臺教授體部字第 1100039418D 號令修正，111-01-01 生效；行政院全球資訊網附件 PDF）', href: 'https://www.ey.gov.tw/File/11A27ED8536A6030?A=C' },
      { label: '教育部體育署 — 健身中心暨健身教練服務契約修法重點 Q&A（新聞稿，說明 111-01-01 施行）', href: 'https://www.moe.gov.tw/News_Content.aspx?Create=1&n=9E7AC85F1954DDA8&s=589C069641CD2DB2' },
    ],
    lastVerified: '2026-10-17',
  },
};

export const deliveryMembershipGuides: Record<Locale, DecisionGuideContent> = {
  en: {
    id: 'delivery-membership-break-even-method',
    labels: labels.en,
    directAnswer: 'A delivery membership is worth its annual fee only when savings on orders you already planned exceed the fee after minimum-order failures, service-fee differences, and extra spending. With a $96 annual fee, three unused months, two planned orders in each of nine active months, $4.99 of delivery-fee savings and $1.50 of service-fee savings on every eligible order, 18 eligible orders save $116.82 before the fee and $20.82 after it. Break-even is ceil($96 ÷ $6.49) = 15 eligible orders.',
    inputs: ['Annual or monthly membership fee at the next renewal', 'Months when you realistically expect no delivery orders', 'Orders already planned in each remaining active month', 'Share of those orders that meet the minimum basket and use an eligible merchant', 'Nonmember delivery charge minus member delivery charge for the same basket', 'Nonmember service fee minus member service fee at the same checkout', 'Extra food or other spend added only to reach the member minimum'],
    formula: 'Active months = 12 − unused months. Planned orders = active months × orders per active month. Eligible orders = planned orders × eligible-order rate. Net saving per eligible order = delivery-fee difference + service-fee difference − extra spend to reach the minimum. Annual benefit = eligible orders × net saving per eligible order. Net annual value = annual benefit − membership fee. Break-even eligible orders = ceil(membership fee ÷ net saving per eligible order).',
    workedExample: 'A membership costs $96 a year. You expect no orders in three months and two orders in each of the other nine, for 18 planned orders. All 18 are from eligible merchants and already exceed the minimum. The same checkout shows $4.99 less delivery fee and $1.50 less service fee, so each eligible order saves $6.49. Annual benefit is 18 × $6.49 = $116.82; after the fee, net value is $20.82. Break-even is 15 eligible orders.',
    sensitivity: [
      { scenario: 'One order per active month', input: '9 eligible orders × $6.49', result: '$58.41 benefit; membership loses $37.59' },
      { scenario: 'First winning order count', input: '15 eligible orders × $6.49', result: '$97.35 benefit; membership saves $1.35' },
      { scenario: 'Planned use', input: '18 eligible orders × $6.49', result: '$116.82 benefit; membership saves $20.82' },
      { scenario: 'Six orders miss the minimum', input: '12 eligible of 18 planned orders', result: '$77.88 benefit; membership loses $18.12' },
    ],
    cta: { label: 'Calculate your delivery-membership break-even', href: '#delivery-membership-calculator' },
    limitations: ['Use a same-restaurant, same-basket, same-time checkout comparison. Menu prices, taxes, small-order charges, distance, peak pricing, promotions, and availability can change independently of membership.', 'Tips are not membership savings when you would tip the same amount without membership. Count only the fee difference caused by the plan.', 'Eligible merchants, basket minimums, fee formulas, trials, renewals, cancellation, and refunds vary by provider and can change. Verify the current terms and your checkout before subscribing.'],
    sources: [
      { label: 'FTC Consumer Advice — free trials, auto-renewals, and negative-option subscriptions', href: 'https://consumer.ftc.gov/articles/getting-and-out-free-trials-auto-renewals-and-negative-option-subscriptions' },
      { label: 'Uber — Uber One membership terms for the United States', href: 'https://www.uber.com/legal/en/document/?name=uber-one-membership-terms&country=united-states&lang=en' },
    ],
    lastVerified: '2026-07-19',
  },
  zh: {
    id: 'delivery-membership-break-even-method',
    labels: labels.zh,
    directAnswer: '外送會員只有在「本來就會下單、符合指定店家與最低消費」的訂單節省大於會費時才回本。以下用示範輸入（不是任何平台的價格）：年費 NT$1,000、兩個月完全不用、其餘十個月每月 3 單、其中 80% 合格，共 24 筆合格訂單。若同一購物車每單少 NT$50 外送費與 NT$10 服務費，且不需多買湊門檻，每單淨省 NT$60、全年省 NT$1,440，扣會費後淨省 NT$440；最低需要 17 筆合格訂單。',
    inputs: ['下一期真正會扣的年費或月費總額（抄自平台的會員頁面或結帳畫面）', '旅遊、返鄉、自己煮或公司供餐而完全不用外送的月份', '其餘月份本來就會下的訂單數', '同時符合指定店家、指定品項與最低消費的訂單比例', '同店同餐點在非會員與會員結帳畫面的外送費差', '同一結帳畫面的平台／服務費差額', '只為湊最低消費而多買、最後沒吃完或原本不會買的金額'],
    formula: '有效月份 = 12 − 完全不用月份。預計訂單 = 有效月份 × 每月訂單數。合格訂單 = 預計訂單 × 合格比例。每筆合格訂單淨節省 = 外送費差 + 服務費差 − 湊門檻額外支出。全年利益 = 合格訂單 × 每單淨節省。年淨值 = 全年利益 − 會員費。最低回本合格訂單 = 無條件進位（會員費 ÷ 每單淨節省）。',
    workedExample: '示範輸入：會員年費 NT$1,000，預計有兩個月完全不用；其餘十個月每月原本就會下 3 單，共 30 單。估計 80% 符合指定店家與最低消費，所以是 24 筆合格訂單。同一餐廳、同一購物車比較後，會員少 NT$50 外送費及 NT$10 服務費，且不用多買湊門檻；每單淨省 NT$60。全年利益 24 × 60 = NT$1,440，扣會費淨省 NT$440；回本為 1,000 ÷ 60 無條件進位 = 17 單。',
    sensitivity: [
      { scenario: '低頻使用', input: '每月 1 單 × 10 月 × 80% 合格', result: '8 筆；利益 NT$480；會員少回收 NT$520' },
      { scenario: '合格比例下降', input: '30 單中只有 50% 合格', result: '15 筆；利益 NT$900；會員少回收 NT$100' },
      { scenario: '預計使用', input: '30 單中 80% 合格', result: '24 筆；利益 NT$1,440；會員淨省 NT$440' },
      { scenario: '每單多買 NT$25 湊門檻', input: '24 筆 × 每單淨省 NT$35', result: '利益 NT$840；會員少回收 NT$160' },
    ],
    cta: { label: '用自己的訂單與費用計算回本', href: '#delivery-membership-calculator' },
    limitations: ['一定要用同一店家、同一餐點、同一時間的兩個結帳畫面比；餐點售價、尖峰、距離、小額訂單費、促銷與可配送狀態都可能另行變動。', '小費若有會員也會照付，就不是會員節省；不要把整筆小費重複算成免運利益。', '指定店家、最低消費、試用、續約、取消與退費依平台當下條款和個別訂單而定，請以結帳及會員頁面為準。', '本頁沒有引用任何平台的方案價格：2026-10-17 查核時，foodpanda 與 Uber 的官方頁面無法從本站的查核環境打開，所以價格請自行從平台頁面抄入。', '試算結果僅供參考，以平台公告與條款為準。'],
    sources: [
      { label: '行政院消費者保護會 — 電子商務消費者保護綱領（106-11-02 修正；第 10 點：自動續約應提示契約期限、收費金額、收款週期及取消方式）', href: 'https://cpc.ey.gov.tw/Page/960E744883E6A75D' },
      { label: '行政院消費者保護處 — 如何取消免費贈送或已訂閱的 APP', href: 'https://cpc.ey.gov.tw/Page/8644AFB8F5DCB8A3/a6cad45f-8418-4c7b-b999-9f833c96ef11' },
    ],
    lastVerified: '2026-10-17',
  },
};

export const subscriptionGuides: Record<Locale, DecisionGuideContent> = {
  en: {
    id: 'subscription-audit-method',
    labels: labels.en,
    directAnswer: 'Put every recurring charge on the same annual basis, then divide each service by real usage. Monthly charges multiply by 12, quarterly charges by 4, and annual charges stay as listed. Review the annual and five-year totals; keep a service only when its future use justifies its future cost.',
    inputs: ['Twelve months of bank and card statements', 'App Store and Google Play subscription lists', 'Price and billing frequency for every service', 'Next renewal date and any notice period', 'Real uses or hours per month', 'A keep, downgrade, pause, or cancel decision'],
    formula: 'Annual cost = (monthly charges × 12) + (quarterly charges × 4) + annual charges; cost per use = annual cost ÷ annual uses',
    workedExample: 'Two monthly services cost $16.99 and $9.99, plus cloud storage billed at $79.99 a year. Annual cost is ($26.98 × 12) + $79.99 = $403.75; unchanged for five years, that is $2,018.75. If the $16.99 service is used only three times a month, it costs about $5.66 per use.',
    sensitivity: [
      { scenario: 'Current stack', input: '$26.98/month + $79.99/year', result: '$403.75/year' },
      { scenario: 'Cancel the $9.99 service', input: 'One monthly plan removed', result: '$283.87/year; $119.88 saved' },
      { scenario: '10% price rise', input: 'All prices increase 10%', result: '$444.13/year' },
    ],
    cta: { label: 'Audit your subscriptions in the calculator', href: '/en/tools/subscription-audit/' },
    limitations: ['Use the next renewal price, not an old promotional price.', 'Refunds, taxes, currency conversion, family sharing, and bundles can change the effective cost.', 'Past payments are sunk costs; the decision is whether the next billing period is worth buying.'],
    sources: [
      { label: 'Apple Support — cancel a subscription', href: 'https://support.apple.com/en-us/118428' },
      { label: 'Google Play Help — cancel, pause, or change a subscription', href: 'https://support.google.com/googleplay/answer/7018481?hl=en' },
    ],
    lastVerified: '2026-07-18',
  },
  zh: {
    id: 'subscription-audit-method',
    labels: labels.zh,
    directAnswer: '先把所有固定扣款換算成一年，再用實際使用時數算每小時成本。月費乘 12、季繳乘 4、年費照原價，加總後同時看一年與五年；判斷基準是「下一期還值不值得買」，不是過去已經付了多少。',
    inputs: ['完整 12 個月的信用卡與銀行明細', 'App Store、Google Play 與電信帳單的訂閱清單', '每項服務的價格與扣款週期', '下次續約日、綁約與取消期限', '每月真正使用的小時數', '保留、降級、暫停或取消的決定'],
    formula: '年成本 =（所有月費 × 12）+（所有季費 × 4）+ 所有年費；每小時使用成本 = 月成本 ÷ 每月使用小時',
    workedExample: '示範輸入（不是任何服務的價格）：兩項月繳服務分別是 NT$390（每月用 12 小時）與 NT$180（每月用 20 小時），另有一項年繳雲端空間 NT$690（每月用 2 小時）。月繳合計 570，年成本是（570 × 12）+ 690 = NT$7,530，等於每月 NT$627.5；價格不變的五年成本是 NT$37,650。NT$390 的服務每小時 NT$32.5，NT$180 的服務每小時 NT$9，雲端空間（690 ÷ 12 = NT$57.5 ÷ 2 小時）每小時 NT$28.75。',
    sensitivity: [
      { scenario: '目前組合', input: 'NT$570／月 + NT$690／年', result: 'NT$7,530／年；每月約 NT$627.5' },
      { scenario: '取消 NT$180 月費', input: '移除一項月繳訂閱', result: 'NT$5,370／年；省 NT$2,160' },
      { scenario: '全面漲價 10%', input: '所有價格增加一成', result: 'NT$8,283／年' },
    ],
    cta: { label: '打開訂閱支出健檢計算機', href: '/zh/tools/subscription-audit/' },
    limitations: ['請填下一期實際續約價，不要沿用已到期的首期優惠。', '家庭共享、電信綁約、跨區匯率、稅費與退款規則都可能改變有效成本。', '過去付款屬於沉沒成本；本次只判斷未來一期是否值得續。', '試算結果僅供參考，以各平台帳單與條款為準。'],
    sources: [
      { label: 'Apple 支援（台灣）— 取消 Apple 提供的訂閱項目', href: 'https://support.apple.com/zh-tw/118428' },
      { label: 'Google Play 說明 — 取消、暫停或變更 Google Play 的訂閱項目（解除安裝應用程式不會連帶取消訂閱項目）', href: 'https://support.google.com/googleplay/answer/7018481?hl=zh-Hant' },
      { label: '行政院消費者保護處 — 如何取消免費贈送或已訂閱的 APP', href: 'https://cpc.ey.gov.tw/Page/8644AFB8F5DCB8A3/a6cad45f-8418-4c7b-b999-9f833c96ef11' },
    ],
    lastVerified: '2026-10-17',
  },
};

export const annualFeeGuides: Record<Locale, DecisionGuideContent> = {
  en: {
    id: 'annual-fee-break-even-method',
    labels: labels.en,
    directAnswer: 'A rewards card with an annual fee breaks even only when the rewards above your realistic no-fee alternative cover the net fee. Divide the annual fee, after subtracting benefits you will certainly use, by the incremental reward rate. A $95 card earning 3% versus a 1.5% no-fee card needs about $6,333 of eligible annual spend; using 3% alone would understate the threshold by half.',
    inputs: ['Annual fee at renewal, including any authorized-user fee', 'Reward rate on purchases you already make and that actually qualify', 'Reward rate of the no-fee card you would otherwise use', 'Cash value of repeatable benefits you are certain to use', 'Category and annual reward caps, exclusions, and expiration rules', 'Interest, foreign-transaction, and redemption fees kept outside the reward calculation'],
    formula: 'Net annual fee = annual fee − guaranteed repeatable benefit value; incremental reward rate = fee-card rate − no-fee alternative rate; break-even eligible spend = net annual fee ÷ incremental reward rate',
    workedExample: 'A card costs $95 a year and earns 3% on eligible purchases. Your no-fee alternative earns 1.5%, so the incremental rate is 1.5 percentage points. With no guaranteed benefit value, break-even spend is $95 ÷ 0.015 = $6,333.33 a year, or about $527.78 a month. If the extra rewards are capped at $90, spending alone can never recover the full $95 fee.',
    sensitivity: [
      { scenario: 'Lower fee', input: '$75 fee; 1.5-point incremental rate', result: '$5,000 eligible spend' },
      { scenario: 'Base case', input: '$95 fee; 1.5-point incremental rate', result: '$6,333.33 eligible spend' },
      { scenario: 'Smaller rate edge', input: '$95 fee; 1-point incremental rate', result: '$9,500 eligible spend' },
      { scenario: 'Reward cap below fee', input: 'Extra rewards capped at $90', result: 'No spending-only break-even; at least $5 of certain benefits is still needed' },
    ],
    cta: { label: 'Calculate your own card break-even point', href: '#cashback-category-breakeven' },
    limitations: ['Do not count a one-time welcome bonus when deciding whether to renew. For the first year, include it only if the spending requirement fits purchases you already planned.', 'Point and mile values depend on the redemption you will actually make; do not use a promotional best-case valuation.', 'Paying interest or changing spending to chase rewards can overwhelm the result. This calculation assumes statement balances are paid in full and does not recommend a card.'],
    sources: [
      { label: 'Consumer Financial Protection Bureau — Terms of Credit Card Plans survey and comparison data', href: 'https://www.consumerfinance.gov/data-research/credit-card-data/terms-credit-card-plans-survey/' },
      { label: 'Consumer Financial Protection Bureau — How to find the best credit card', href: 'https://files.consumerfinance.gov/f/documents/cfpb_adult-fin-ed_how-to-find-the-best-credit-card.pdf' },
    ],
    lastVerified: '2026-07-18',
  },
  zh: {
    id: 'annual-fee-break-even-method',
    labels: labels.zh,
    directAnswer: '有年費信用卡是否回本，不能只拿總回饋和年費相比，而要看它比「你原本會用的免年費卡」多賺多少。先扣掉確定會用到、可重複取得的權益，再用淨年費除以增量回饋率。年費 NT$3,000、回饋 3%，若免年費替代卡也有 1%，真正門檻是 NT$3,000 ÷ 2% = NT$150,000 合格年消費。',
    inputs: ['續卡時真正會收的主卡、附卡年費', '原本就會發生且符合回饋資格的消費', '有年費卡與免年費替代卡的實際回饋率', '確定會使用、每年可重複取得的權益價值', '一般消費定義、指定通路、登錄、每月或年度回饋上限', '循環利息、海外交易、兌換與逾期費用，另列不藏在回饋裡'],
    formula: '淨年費 = 年費 − 確定使用的可重複權益價值；增量回饋率 = 年費卡回饋率 − 免年費替代卡回饋率；回本年消費 = 淨年費 ÷ 增量回饋率',
    workedExample: '年費 NT$3,000，合格消費回饋 3%，免年費替代卡回饋 1%，增量回饋率是 2 個百分點。若沒有可確定折抵的權益，回本門檻是 NT$3,000 ÷ 0.02 = NT$150,000／年，約 NT$12,500／月。若額外回饋全年最多只有 NT$2,400，無論刷多少都無法只靠回饋補足年費。',
    sensitivity: [
      { scenario: '年費較低', input: '年費 NT$2,000、增量回饋 2%', result: '合格年消費 NT$100,000' },
      { scenario: '基準情境', input: '年費 NT$3,000、增量回饋 2%', result: '合格年消費 NT$150,000' },
      { scenario: '增量回饋縮小', input: '年費 NT$3,000、增量回饋 1%', result: '合格年消費 NT$300,000' },
      { scenario: '回饋上限低於年費', input: '額外回饋上限 NT$2,400', result: '只靠刷卡無法回本；仍差 NT$600 的確定權益' },
    ],
    cta: { label: '用自己的年費與回饋率計算', href: '#cashback-category-breakeven' },
    limitations: ['續卡決策不要把一次性首刷禮算進去；新卡第一年也只計入不需額外消費就能達成的確定價值。', '點數與哩程要用自己真正能兌換的價值，不用廣告中的最高理論價。', '本計算假設每期全額繳清；循環利息、預借現金或為了回饋多花錢，可能立即吃掉所有回饋。內容不是信用卡推薦或財務建議。'],
    sources: [
      { label: '金融監督管理委員會 — 信用卡定型化契約應記載及不得記載事項（99-07-27 發布，103-09-12 修正，金管銀合字第 10300245320 號；應記載事項第五點、不得記載事項第七點）', href: 'https://law.fsc.gov.tw/LawContent.aspx?id=FL049905&media=print' },
      { label: '金融監督管理委員會 — 為保障消費者權益，有關信用卡、現金卡之利率與各項費用之揭露，請速依說明事項辦理（93-07-29 金管銀（四）字第 0934000595 號函）', href: 'https://law.fsc.gov.tw/LawContent.aspx?id=FE057261&media=print' },
    ],
    lastVerified: '2026-10-17',
  },
};

export const rentBuyAssumptionGuides: Record<Locale, DecisionGuideContent> = {
  en: {
    id: 'rent-buy-assumptions-method',
    labels: labels.en,
    directAnswer: 'Rent versus buy is usually decided by a small set of assumptions, not by rent versus the mortgage payment alone. Use the same home, a defined holding period, mortgage interest rather than total principal-and-interest, purchase and sale costs, owner maintenance and taxes, rent growth, home appreciation, and the foregone return on upfront cash. If a modest change flips the result, the honest answer is that the financial choice is not robust.',
    inputs: ['Price and rent for genuinely comparable homes in the same area', 'Expected holding period and mortgage term', 'Down payment, quoted mortgage rate, and lender fees', 'Purchase, sale, tax, insurance, association, and maintenance costs', 'Annual rent growth and renter costs that are not included in rent', 'Home appreciation and the return assumed on cash kept by the renter'],
    formula: 'Owner net cost over N years ≈ purchase costs + mortgage interest paid + owner taxes/insurance/maintenance + selling costs − home appreciation gain + foregone investment gain on upfront cash; renter net cost ≈ cumulative rent and renter costs',
    workedExample: 'Illustrative five-year case: a $400,000 home, $80,000 down, $12,000 purchase costs, a $320,000 30-year mortgage at 6.5%, $6,000 a year of owner costs, 2% appreciation, 5% selling costs, and 5% opportunity return. Mortgage interest is about $100,912; appreciation gain $41,632; selling cost $22,082; foregone gain on $92,000 upfront cash $25,418. Estimated owner net cost is $148,779. Rent starting at $2,200 a month and growing 3% totals about $140,161, so renting is lower by about $8,618 in this scenario—not a prediction.',
    sensitivity: [
      { scenario: 'Base case', input: '5 years; 6.5% mortgage; 2% appreciation', result: 'Rent lower by about $8,618' },
      { scenario: 'Shorter stay', input: '3 years; other inputs unchanged', result: 'Rent lower by about $20,992' },
      { scenario: 'Lower mortgage rate', input: '5.5% instead of 6.5%', result: 'Buy lower by about $7,405' },
      { scenario: 'No appreciation', input: '0% instead of 2%', result: 'Rent lower by about $48,169' },
    ],
    cta: { label: 'Stress-test your own rent-versus-buy assumptions', href: '/en/rent-vs-buy-breakeven-year/' },
    limitations: ['The worked example is a transparent scenario, not a forecast of mortgage rates, rent, investment returns, taxes, or home prices.', 'Tax treatment, mortgage insurance, renovations, utilities, deductions, capital-gains rules, and monthly cash-flow investing vary by household and jurisdiction.', 'Use actual Loan Estimates, local taxes, insurance quotes, maintenance history, and comparable rent. The current calculator uses a simplified owner-cost allowance and does not replace professional financial, tax, legal, or real-estate advice.'],
    sources: [
      { label: 'Consumer Financial Protection Bureau — Loan Estimate explainer', href: 'https://www.consumerfinance.gov/owning-a-home/loan-estimate/' },
      { label: 'Consumer Financial Protection Bureau — all costs of buying a home', href: 'https://www.consumerfinance.gov/owning-a-home/what-are-all-costs-buying-home/' },
    ],
    lastVerified: '2026-07-18',
  },
  zh: {
    id: 'rent-buy-assumptions-method',
    labels: labels.zh,
    directAnswer: '租屋或買房不能只比月租與房貸月付。要用同區域、同坪數與屋況的房子，設定預計持有年限，再分開計算房貸利息、買賣交易成本、房屋稅與地價稅、管理修繕、租金成長、房價變動，以及頭期款沒有投資的機會成本。只要利率或房價漲幅稍微調整就翻盤，結論就應該是「結果不穩健」，不是硬選一邊。',
    inputs: ['內政部實價登錄中可比較的成交總價與租金，不混用不同屋齡、坪數或車位', '預計自住年限、貸款年限與可能出售時間', '頭期款、實際核貸利率、寬限期與貸款費用', '契稅、代書、仲介、房屋稅、地價稅、管理與修繕', '租金、管理費負擔、租金年增率與搬家成本', '房價年變動與租屋時保留資金的機會報酬率'],
    formula: '買房 N 年淨成本 ≈ 買入成本 + 累計房貸利息 + 持有稅費／保險／管理／修繕 + 賣出成本 − 房價增值 + 頭期款等前期資金的放棄報酬；租屋 N 年淨成本 ≈ 累計租金與租屋方負擔費用',
    workedExample: '示範七年情境：總價 NT$15,000,000、頭期款 NT$3,000,000、買入成本 NT$450,000，貸款 30 年、利率 2.2%，屋主持有成本每年 NT$200,000，房價年增 1.5%，出售成本為售價 4%，前期資金機會報酬 4%。七年房貸利息約 NT$1,689,567，增值約 NT$1,647,674，出售成本約 NT$665,907，放棄報酬約 NT$1,089,965，估算買房淨成本 NT$3,647,764。月租 NT$38,000、年增 2% 的累計租金約 NT$3,390,033；本情境租屋低約 NT$257,731，不代表未來價格。',
    sensitivity: [
      { scenario: '基準情境', input: '持有 7 年、利率 2.2%、房價年增 1.5%', result: '租屋低約 NT$257,731' },
      { scenario: '持有期縮短', input: '只住 4 年，其餘不變', result: '租屋低約 NT$678,795' },
      { scenario: '核貸利率較低', input: '1.8% 取代 2.2%', result: '買房低約 NT$56,980' },
      { scenario: '房價不變', input: '房價年變動 0%', result: '租屋低約 NT$1,839,498' },
    ],
    cta: { label: '用自己的房價、租金與年限做壓力測試', href: '/zh/rent-vs-buy-breakeven-year/' },
    limitations: ['所有數字都是公開公式的示範輸入，不是對台灣房價、租金、利率或投資報酬的預測。', '自住稅率、契稅、房地合一稅、仲介費、裝潢、車位、管理費與修繕因個案不同；應以契約、稅單與報價替換示範值。', '目前計算機用簡化屋主持有成本，未完整處理寬限期、變動利率、稅務與每月差額投資；結果不是購屋、投資、貸款、稅務或法律建議。'],
    sources: [
      { label: '內政部 — 不動產交易實價查詢服務網', href: 'https://lvr.land.moi.gov.tw/jsp/index.jsp' },
      { label: '財政部稅務入口網 — 房屋稅問答', href: 'https://www.etax.nat.gov.tw/etwmain/tax-info/understanding/tax-q-and-a/local/house-tax?page=1&size=10' },
    ],
    lastVerified: '2026-07-18',
  },
};

export const rentBuyBreakevenGuides: Record<Locale, DecisionGuideContent> = {
  en: {
    id: 'rent-buy-breakeven-year-method',
    labels: labels.en,
    directAnswer: 'There is no universal number of years before buying beats renting. The break-even year is the first planned sale year when the owner’s net cost—including purchase cash, mortgage payments, owner costs and selling costs, less net sale proceeds—is no higher than cumulative rent after the renter’s assumed return on cash kept invested. In the transparent example below, buying first moves below renting in year 7. With zero appreciation it moves to year 16, which is why “stay five years” is not a safe rule.',
    inputs: ['Price and rent for homes that offer the same location, space and condition', 'Down payment, buying costs, mortgage amount, rate, term and monthly payment', 'Annual property tax, insurance, association dues and necessary maintenance', 'Selling costs, mortgage balance and any prepayment charge at each possible exit year', 'Annual home-price change and rent growth tested as ranges rather than forecasts', 'After-cost opportunity return on the down payment and purchase cash', 'Maximum realistic holding period; do not extend the horizon just to force a crossover'],
    formula: 'For each year N: owner net cost = down payment + buying costs + mortgage payments through N + owner carrying costs − [home value at N × (1 − selling-cost rate) − remaining mortgage]. Renter net cost = rent paid through N − investment gain on upfront cash. The break-even year is the smallest N for which owner net cost ≤ renter net cost.',
    workedExample: 'A $400,000 home uses $80,000 down, $12,000 buying costs and a $320,000 30-year mortgage at 6.5%. Owner costs are $6,000 a year, selling costs 5%, appreciation 2%, comparable rent $2,200 a month growing 3%, and the upfront $92,000 has a 5% opportunity return. The mortgage payment is about $2,023. Buying remains about $819 higher after year 6, then reaches an estimated $156,731 net cost in year 7 versus $164,836 for renting: the first modeled crossover, by about $8,104.',
    sensitivity: [
      { scenario: 'Base case', input: '6.5% mortgage; 2% appreciation; 5% selling cost', result: 'First crossover in year 7' },
      { scenario: 'No appreciation', input: '0% instead of 2%; other inputs unchanged', result: 'First crossover moves to year 16' },
      { scenario: 'Lower mortgage rate', input: '5.5% instead of 6.5%', result: 'First crossover moves to year 5' },
      { scenario: 'Higher selling cost', input: '7% instead of 5%', result: 'First crossover moves to year 8' },
      { scenario: 'Higher comparable rent', input: '$2,500 instead of $2,200 a month', result: 'First crossover moves to year 5' },
    ],
    cta: { label: 'Test your own numbers in the break-even calculator below', href: '#rent-buy-breakeven-calculator' },
    limitations: ['The crossover is a property of the inputs, not a forecast or a recommendation to buy in that year.', 'The simplified calculator holds the mortgage rate constant, invests only the upfront cash, and does not model monthly cash-flow differences, taxes, deductions, mortgage insurance, renovations or capital-gains treatment.', 'Use the Loan Estimate and Closing Disclosure, local tax and insurance quotes, inspection findings, actual comparable rent and a sale-cost estimate. Model liquidity, job mobility and repair risk separately.', 'A crossover within the horizon does not prove that the purchase is affordable. Budget reserves and underwriting remain separate questions.'],
    sources: [
      { label: 'Consumer Financial Protection Bureau — length of stay and rent-versus-buy assumptions', href: 'https://www.consumerfinance.gov/owning-a-home/prepare/consider-whether-its-the-right-time-for-you-to-buy/' },
      { label: 'Consumer Financial Protection Bureau — Closing Disclosure and cash to close', href: 'https://www.consumerfinance.gov/owning-a-home/closing-disclosure/' },
      { label: 'Consumer Financial Protection Bureau — taxes, insurance, repairs and other owner costs', href: 'https://www.consumerfinance.gov/consumer-tools/mortgages/ready-to-buy-a-home/' },
    ],
    lastVerified: '2026-07-19',
  },
  zh: {
    id: 'rent-buy-breakeven-year-method',
    labels: labels.zh,
    directAnswer: '買房不是住滿固定五年或六年就一定比租屋划算。損益年分是第一個「在該年出售時，買房淨成本不高於租屋淨成本」的年份；買房端要扣掉清償房貸後的淨售屋款，租屋端則扣除頭期款與買入成本保留投資的報酬。以下透明算例到第 9 年才首次交叉；若房價零成長，30 年內都沒有交叉。台灣自住房地連續持有、設籍並居住滿 6 年的租稅門檻會改變出售稅負，但「滿 6 年」本身不是財務回本保證。',
    inputs: ['同區域、同坪數、屋齡、車位與屋況的成交總價及實際租金', '頭期款、契稅／印花稅／代書／仲介等買入現金，及核貸金額、利率與年限', '每年房屋稅、地價稅、管理費、保險與必要修繕', '預計出售年份的房貸餘額、仲介／代書／規費及可能的房地合一稅與土地增值稅', '房價年變動與租金年增率，至少測試下跌、持平與溫和成長', '頭期款與買入現金若未支出的稅後機會報酬', '實際可能自住的最長年限，不為了讓買房勝出而任意延長'],
    formula: '逐年計算 N：買房淨成本 = 頭期款 + 買入成本 + 截至 N 年的房貸月付 + 屋主持有成本 −［第 N 年房價 ×（1 − 賣出成本率）− 房貸餘額］；租屋淨成本 = 截至 N 年累計租金 − 前期現金的投資增值。最小且買房淨成本 ≤ 租屋淨成本的 N，就是模型損益年分。',
    workedExample: '示範總價 NT$15,000,000、頭期款 NT$3,000,000、買入成本 NT$450,000、貸款 30 年利率 2.2%，房貸月付約 NT$45,564。屋主持有成本每年 NT$200,000、出售成本 4%、房價年增 1.5%；可比月租 NT$38,000、年增 2%，前期 NT$3,450,000 的機會報酬 4%。第 8 年買房仍高於租屋；第 9 年買房淨成本約 NT$2,894,592，租屋約 NT$2,987,685，首次低約 NT$93,093。這是公式示範，不是房價或利率預測。',
    sensitivity: [
      { scenario: '基準情境', input: '利率 2.2%、房價年增 1.5%、出售成本 4%', result: '第 9 年首次交叉' },
      { scenario: '房價持平', input: '0% 取代 1.5%', result: '30 年內未交叉' },
      { scenario: '核貸利率較低', input: '1.8% 取代 2.2%', result: '第 7 年首次交叉' },
      { scenario: '出售成本較高', input: '6% 取代 4%', result: '第 11 年首次交叉' },
      { scenario: '可比租金較高', input: 'NT$45,000 取代 NT$38,000', result: '第 6 年首次交叉' },
    ],
    cta: { label: '用下方的損益年分計算機檢查同一組假設', href: '#rent-buy-breakeven-calculator' },
    limitations: ['模型損益年分不是房價、租金、利率或投資報酬預測，也不是叫你在該年買進或賣出。', '頁內計算器把出售稅費合併為成本率，沒有自動判定戶籍、自住、出租、取得日期、房地合一稅、土地增值稅、重購退稅或個別免稅額；必須用實際稅務資料替換。', '寬限期、變動利率、提前清償費、裝潢、重大修繕及每月現金流差額投資未完整建模。', '即使模型交叉，頭期款、緊急預備金、工作穩定與貸款負擔仍需分開判斷；本頁不提供購屋、投資、貸款、稅務或法律建議。'],
    sources: [
      { label: '我的 E 政府 — 2026 自住房地購買、持有、出售稅務整理', href: 'https://www.gov.tw/News_Content_26_597183' },
      { label: '財政部 — 房地合一稅個人制度與可列成本費用', href: 'https://www.mof.gov.tw/houseandland%20/multiplehtml/de144e74630c4ac59f2d84a068c889c9' },
      { label: '內政部 — 不動產交易實價查詢服務網', href: 'https://lvr.land.moi.gov.tw/jsp/index.jsp' },
    ],
    lastVerified: '2026-07-19',
  },
};

// 好市多這一段的每個數字都由 data/rates.json 推導。上一版把 NT$1,350 /
// NT$1,650 / NT$82,500 直接寫在字串裡，官方 2026 年調價後整段就變成錯的，
// 而且和同一頁另一個區塊互相矛盾。scripts/verify-rates.mjs 現在會擋下重演。
const twGold = costcoTw.tiers.gold_star;
const twExecutive = costcoTw.tiers.executive;
const twRewardRate = twExecutive.reward_rate;
const twRewardCap = twExecutive.reward_cap ?? 0;
const twDemoSavings = 0.15;
const twConservativeSavings = 0.08;

const usGold = costcoUs.tiers.gold_star;
const usExecutive = costcoUs.tiers.executive;
const usRewardRate = usExecutive.reward_rate;
const usRewardCap = usExecutive.reward_cap ?? 0;
const usDemoSavings = 0.15;
const usConservativeSavings = 0.08;

export const costcoGuides: Partial<Record<Locale, DecisionGuideContent>> = {
  en: {
    id: 'membership-break-even-method',
    labels: labels.en,
    directAnswer: `Run two separate tests. A basic membership breaks even when realistic shopping savings cover its fee. The ${usExecutive.name} upgrade breaks even when its extra ${percent(usRewardRate)} reward covers the extra fee. At current U.S. fees, the ${usd(costcoUs.upgrade_delta)} upgrade divided by ${percent(usRewardRate)} equals ${usd(costcoUs.breakeven_qualified_spend)} of eligible annual spend; purchases excluded from the reward must stay out of that figure.`,
    inputs: ['Annual fee for each tier', 'Eligible monthly spend', 'Savings versus the stores you would otherwise use', 'Reward rate, exclusions, and annual cap', 'Waste or impulse purchases caused by bulk shopping', 'Travel cost and time if the warehouse is out of the way'],
    formula: 'Basic break-even spend = annual fee ÷ realistic savings rate; upgrade break-even spend = extra annual fee ÷ extra eligible reward rate',
    workedExample: `At a ${percent(usDemoSavings)} savings assumption, ${usGold.name} breaks even at ${usd(usGold.annual_fee)} ÷ ${usDemoSavings} = ${usd(savingsBreakeven(usGold.annual_fee, usDemoSavings), 2)} a year. ${usExecutive.name} costs ${usd(costcoUs.upgrade_delta)} more and earns ${percent(usRewardRate)} on eligible spend, so it catches ${usGold.name} at ${usd(costcoUs.upgrade_delta)} ÷ ${usRewardRate} = ${usd(costcoUs.breakeven_qualified_spend)} a year. These answer different questions and should not be combined.`,
    sensitivity: [
      { scenario: 'Conservative basic tier', input: `${percent(usConservativeSavings)} savings`, result: `${usd(savingsBreakeven(usGold.annual_fee, usConservativeSavings), 2)}/year to cover a ${usd(usGold.annual_fee)} fee` },
      { scenario: 'Base case', input: `${percent(usDemoSavings)} savings`, result: `${usd(savingsBreakeven(usGold.annual_fee, usDemoSavings), 2)}/year to cover a ${usd(usGold.annual_fee)} fee` },
      { scenario: `${usExecutive.name} upgrade`, input: `${percent(usRewardRate)} reward on eligible spend`, result: `${usd(costcoUs.breakeven_qualified_spend)}/year to cover the extra ${usd(costcoUs.upgrade_delta)}` },
      { scenario: 'Reward cap reached', input: `${usd(usRewardCap)} annual cap`, result: `No further reward above ${usd(capReachedAt(usExecutive))} of eligible spend` },
    ],
    cta: { label: 'Test your own membership assumptions', href: '/en/tools/costco-membership/' },
    limitations: ['The savings rate is a user assumption, not a claim that every warehouse item is cheaper.', 'Reward exclusions, caps, taxes, fees, and tier terms can change; confirm current official terms.', 'Do not count spending you would make only because you bought the membership.'],
    sources: [
      { label: 'Costco Customer Service — Executive Membership', href: 'https://customerservice.costco.com/app/answers/detail/a_id/1205/' },
      { label: 'Costco — Executive Rewards terms', href: costcoUs.source },
    ],
    lastVerified: costcoUs.checked,
  },
  zh: {
    id: 'membership-break-even-method',
    labels: labels.zh,
    directAnswer: `要分開算兩題：基本會員是「實際價差省下的錢能否蓋過年費」；升級${twExecutive.name}則是「多出的回饋能否蓋過多付的年費」。請只計入符合回饋資格、而且原本就會購買的金額，不能為了湊回本而增加消費。`,
    inputs: ['各會員等級的最新年費', '真正符合回饋資格的月消費', '和原本常去商店相比的實際省錢比例', '回饋率、排除項目與年度上限', '大包裝造成的浪費或衝動購物', '繞路、停車與搬運的額外成本'],
    formula: '基本會員打平消費 = 年費 ÷ 實際省錢率；升級打平消費 = 多付年費 ÷ 多出的合格回饋率',
    workedExample: `假設基本會員年費 ${ntd(twGold.annual_fee)}、實際省錢率 ${percent(twDemoSavings)}，一年消費 ${ntd(savingsBreakeven(twGold.annual_fee, twDemoSavings))} 可打平。若升級多付 ${ntd(costcoTw.upgrade_delta)}、合格回饋率 ${percent(twRewardRate)}，則需要 ${ntd(costcoTw.breakeven_qualified_spend)} 的合格年消費才能靠回饋補回差額。兩個門檻回答不同問題，不可混為一談。`,
    sensitivity: [
      { scenario: '保守價差', input: `省錢率 ${percent(twConservativeSavings)}`, result: `基本年費 ${ntd(twGold.annual_fee)} 需年消費 ${ntd(savingsBreakeven(twGold.annual_fee, twConservativeSavings))}` },
      { scenario: '基準情境', input: `省錢率 ${percent(twDemoSavings)}`, result: `基本年費 ${ntd(twGold.annual_fee)} 需年消費 ${ntd(savingsBreakeven(twGold.annual_fee, twDemoSavings))}` },
      { scenario: `升級${twExecutive.name}`, input: `多付 ${ntd(costcoTw.upgrade_delta)}、回饋 ${percent(twRewardRate)}`, result: `合格年消費需 ${ntd(costcoTw.breakeven_qualified_spend)}` },
      { scenario: '回饋觸頂', input: `年度上限 ${ntd(twRewardCap)}`, result: `合格年消費超過 ${ntd(capReachedAt(twExecutive))} 後不再增加回饋` },
    ],
    cta: { label: '用自己的數字重算會員回本', href: '/zh/tools/costco-membership/' },
    limitations: ['省錢率是使用者假設，不代表每件商品都比其他通路便宜。', '年費、回饋上限、排除項目與會員條款可能變動，請以官方最新公告為準。', '只計算原本就會發生的消費；為回饋多買的支出不是收益。', '回饋只計入合格消費：官方常見問答列出 12 項不列入的消費（含會員費、Costco 購物卡儲值、停車費、西式餐飲部、加油站），計算前要先扣除政府課稅。'],
    sources: [
      { label: 'Costco 好市多台灣 — 會員權益與最新方案', href: costcoTw.source },
      { label: 'Costco 好市多台灣 — 黑鑽卡 2% 回饋金常見問答（不列入項目、累計期間）', href: 'https://www.costco.com.tw/CustomerServiceFAQExecutiveMembership2' },
      { label: 'Costco 好市多台灣 — 會員規章與條款（升等、降等、退費、回饋金核發）', href: 'https://www.costco.com.tw/member-privileges-conditions' },
      { label: 'Costco 官方 — Executive Rewards 條款', href: costcoUs.source },
    ],
    lastVerified: costcoTw.checked,
  },
};

export const commuteGuides: Partial<Record<Locale, DecisionGuideContent>> = {
  en: {
    id: 'commute-cost-method',
    labels: labels.en,
    directAnswer: 'Multiply round-trip distance by actual commute days and a per-distance vehicle cost, then add parking, tolls, and fares. Keep time value in a separate line so the cash budget and the broader life-cost comparison remain visible. Hybrid workers should count only days they travel.',
    inputs: ['One-way distance and actual commute days per month', 'Fuel or electricity plus maintenance and depreciation per mile or kilometer', 'Parking, tolls, passes, and rideshare fares', 'Door-to-door travel time for each option', 'Optional value per hour of non-working time', 'Employer reimbursements or commuter benefits'],
    formula: 'Monthly cash cost = (round-trip distance × commute days × cost per distance) + parking + tolls + fares; optional time cost = round-trip hours × commute days × chosen hourly value',
    workedExample: 'A 15-mile one-way drive is 30 miles a day. Over 20 commute days at a $0.75-per-mile planning rate, vehicle cost is 30 × 20 × $0.75 = $450 a month before parking and tolls. If the round trip takes one hour, valuing that time at $20 adds a separate $400 monthly time estimate.',
    sensitivity: [
      { scenario: 'Five office days a week', input: '20 commute days', result: '$450/month before parking and tolls' },
      { scenario: 'Three office days a week', input: '12 commute days', result: '$270/month on the same assumptions' },
      { scenario: 'Higher vehicle cost', input: '$0.90/mile over 20 days', result: '$540/month before fixed extras' },
    ],
    cta: { label: 'Compare car, transit, rideshare, and bike', href: '/en/tools/commute-cost/' },
    limitations: ['A tax mileage rate is not the same as your vehicle’s actual economic cost.', 'Insurance and registration may be fixed in the short run but still matter in a car-ownership decision.', 'Time has no universal cash value; show it separately and choose a value that fits the decision.'],
    sources: [
      { label: 'IRS — standard mileage rates (benchmark context)', href: 'https://www.irs.gov/tax-professionals/standard-mileage-rates' },
      { label: 'U.S. Bureau of Transportation Statistics', href: 'https://www.bts.gov/' },
    ],
    lastVerified: '2026-07-18',
  },
  zh: {
    id: 'commute-cost-method',
    labels: labels.zh,
    directAnswer: '用來回距離乘上實際通勤天數與每公里成本，再加停車、過路費、車票或叫車費。時間價值要另外列一行，才能同時看清現金支出與生活成本；混合辦公只填真正進公司的天數。',
    inputs: ['單程距離與每月實際通勤天數', '油電、保養、耗材與折舊換算的每公里成本', '停車、國道通行費、月票與叫車費', '各方案門到門的來回時間', '可選的每小時時間價值', '公司交通補助或可報帳金額'],
    formula: '每月現金成本 =（來回公里 × 通勤天數 × 每公里成本）+ 停車 + 過路費 + 票價；可選時間成本 = 來回時數 × 通勤天數 × 自訂時間價值',
    workedExample: '單程 15 公里、每月通勤 20 天、每公里用 NT$6 估算，車輛成本是 30 × 20 × 6 = NT$3,600。再加月停車 NT$1,500 與通行費 NT$500，現金成本為 NT$5,600。若每日來回 1 小時、時間價值設 NT$200，另列 NT$4,000，不和現金支出混在一起。',
    sensitivity: [
      { scenario: '每週進公司五天', input: '20 個通勤日', result: '車輛成本 NT$3,600／月，未含固定費' },
      { scenario: '每週進公司三天', input: '12 個通勤日', result: '同條件降為 NT$2,160／月' },
      { scenario: '車輛成本較高', input: '每公里 NT$8、20 天', result: '車輛成本 NT$4,800／月' },
    ],
    cta: { label: '比較機車、汽車、大眾運輸與叫車', href: '/zh/tools/commute-cost/' },
    limitations: ['每公里成本應盡量用自己的加油、充電、維修與折舊紀錄，不把示範值當成全國平均。', '短期內固定的保險與牌照費，在決定是否持有車輛時仍然重要。', '時間沒有唯一價格；可不填，或依這次決策自行設定並獨立呈現。'],
    sources: [
      { label: '中國石油 — 汽柴油各油品調整金額計算表（調價生效日期 2026/10/12；95 無鉛汽油每公升 32.7 元）', href: 'https://vipmbr.cpc.com.tw/mbwebs/showpriceajust.aspx' },
      { label: '經濟部能源署 — 電價及費率審議資訊揭露專區：電價表（最新一版為台灣電力公司114年下半年電價表，2025-10-03 公布）', href: 'https://www3.moeaea.gov.tw/ele102/Content/Messagess/contents.aspx?&MmmID=654246034110677254&MSID=1343206640732631102' },
    ],
    lastVerified: '2026-10-17',
  },
};

export const cashbackCapsGuides: Record<Locale, DecisionGuideContent> = {
  en: {
    id: 'cashback-caps-real-rate-method',
    labels: labels.en,
    directAnswer: 'A 5% category is not a 5% return on the whole card bill. Apply the headline rate only to category spend inside the stated cap, use the fallback rate above the cap, add rewards from other eligible purchases, and divide by all spending you are evaluating. With $2,100 in a 5% category capped at $1,500, $1,400 of other spend at 1.5%, and $250 excluded, rewards are $102: 2.91% of eligible purchases but only 2.72% of the $3,750 statement.',
    inputs: ['Analysis period that matches the cap: statement month, calendar quarter, or cardmember year', 'Spend that will actually code in the bonus category', 'Headline category rate and whether activation or enrollment is required', 'Eligible-spend cap or reward-dollar cap, converted to the same basis', 'Fallback rate after the cap is reached', 'Other eligible purchases and their earn rate', 'Excluded transactions, returns, credits, and any redemption haircut'],
    formula: 'Let B = category spend, C = eligible category-spend cap, rb = bonus rate, rf = fallback rate, O = other eligible spend, ro = other rate, and X = excluded spend. Rewards = min(B,C) × rb + max(B−C,0) × rf + O × ro. Eligible weighted rate = rewards ÷ (B+O). Whole-bill effective rate = rewards ÷ (B+O+X).',
    workedExample: 'During one quarter, category spend is $2,100. The card pays 5% on the first $1,500 and 1% after that. Other eligible purchases are $1,400 at 1.5%, while $250 is excluded. Rewards are $75 + $6 + $21 = $102. The eligible weighted rate is $102 ÷ $3,500 = 2.91%; the statement-wide rate is $102 ÷ $3,750 = 2.72%. Applying 5% to all $2,100 would overstate category rewards by $24.',
    sensitivity: [
      { scenario: 'Below the category cap', input: '$900 category; $1,400 other; $250 excluded', result: '$66 rewards; 2.59% whole-bill rate' },
      { scenario: 'Exactly at the cap', input: '$1,500 category; other inputs unchanged', result: '$96 rewards; 3.05% whole-bill rate' },
      { scenario: 'Base example', input: '$2,100 category; $600 earns only 1%', result: '$102 rewards; 2.72% whole-bill rate' },
      { scenario: 'Heavy spend above cap', input: '$3,000 category; other inputs unchanged', result: '$111 rewards; 2.39% whole-bill rate' },
    ],
    cta: { label: 'Compare the reward value with the card fee', href: '/en/annual-fee-card-breakeven/' },
    limitations: ['Merchant category coding is controlled by the payment network and acquirer, not by the name you see on the storefront. Confirm posted transactions instead of assuming every purchase qualifies.', 'A cap stated as reward dollars must be divided by the incremental or stated reward rate specified in the terms before it can be treated as a spend cap.', 'Returns, statement credits, account status, activation deadlines, redemption minimums, point devaluation, and program changes can reduce realized value.', 'Paying interest, late fees, or buying more to chase a category can erase rewards. This model measures rewards, not affordability, credit risk, or tax treatment.'],
    sources: [
      { label: 'CFPB — credit-card rewards program circular', href: 'https://www.consumerfinance.gov/compliance/circulars/consumer-financial-protection-circular-2024-07-design-marketing-and-administration-of-credit-card-rewards-programs/' },
      { label: 'CFPB — credit-card agreement database', href: 'https://www.consumerfinance.gov/credit-cards/agreements/' },
      { label: 'CFPB — when card terms and reward benefits may change', href: 'https://www.consumerfinance.gov/ask-cfpb/can-my-credit-card-company-change-the-terms-of-my-account-en-70/' },
    ],
    lastVerified: '2026-07-19',
  },
  zh: {
    id: 'cashback-caps-real-rate-method',
    labels: labels.zh,
    directAnswer: '標示 3% 不代表整期帳單都回饋 3%。先把指定消費切成「上限內 3%」和「超過後 1%」，再加其他一般消費，最後把零回饋項目也放回整期分母。本頁算例指定消費 NT$12,000、3% 上限只認 NT$7,500、超出回到 1%，另有一般消費 NT$8,000 與排除消費 NT$3,000；實拿 NT$350，合格消費加權回饋率 1.75%，整期帳單真正回饋率只有 1.52%。',
    inputs: ['上限週期是每期、每月、每季、活動期間或年度', '真正會被銀行系統認列的指定消費金額', '總回饋率與其中的基本／加碼回饋率', '回饋上限是點數、刷卡金，還是可套用的消費額', '超過上限後回到多少基本回饋', '其他一般消費及其回饋率', '稅費、學費、超商、儲值、分期或銀行公告的其他排除項目'],
    formula: '設 B 為指定消費、C 為可套用加碼的消費上限、rb 為上限內總回饋率、rf 為超限後回饋率、O 為其他一般消費、ro 為一般回饋率、X 為零回饋消費。總回饋 = min(B,C) × rb + max(B−C,0) × rf + O × ro；合格消費加權率 = 總回饋 ÷ (B+O)；整期真正回饋率 = 總回饋 ÷ (B+O+X)。',
    workedExample: '同一期有 NT$12,000 網路指定消費，總回饋 3%，但加碼部分的上限換算後只有前 NT$7,500 可用，超出回到 1%；其他一般消費 NT$8,000 回饋 1%，另有 NT$3,000 為排除項目。總回饋 = 7,500 × 3% + 4,500 × 1% + 8,000 × 1% = NT$350。用 NT$20,000 合格消費算是 1.75%，但對 NT$23,000 整期帳單只有 1.52%；直接拿 3% 乘全部指定消費會多算 NT$90。',
    sensitivity: [
      { scenario: '指定消費未達上限', input: '指定 NT$5,000；其他與排除不變', result: '回饋 NT$230；整期真正回饋率 1.44%' },
      { scenario: '剛好用滿上限', input: '指定 NT$7,500；其他與排除不變', result: '回饋 NT$305；整期真正回饋率 1.65%' },
      { scenario: '本頁基準', input: '指定 NT$12,000；其中 NT$4,500 回到 1%', result: '回饋 NT$350；整期真正回饋率 1.52%' },
      { scenario: '大量超過上限', input: '指定 NT$20,000；其他與排除不變', result: '回饋 NT$430；整期真正回饋率 1.39%' },
    ],
    cta: { label: '把實際回饋價值和年費一起比較', href: '/zh/annual-fee-card-breakeven/' },
    limitations: ['「指定通路」可能依商店請款名稱、MCC、支付路徑或授權／入帳日判斷；看到品牌名稱不等於銀行一定認列。', '若公告寫的是「加碼回饋上限 NT$150」，要先確認基本回饋是否另計，再用加碼率換算消費上限，不能把 NT$150 當成可刷金額。', '正附卡合併、逐筆四捨五入、登錄名額、退貨扣回、點數效期與兌換比例都可能使實拿不同。', '循環利息、違約金或為湊回饋增加的支出不屬收益；本模型不提供辦卡、借款、稅務或信用建議。'],
    sources: [
      { label: '金融監督管理委員會銀行局 — 信用卡業務機構管理辦法第 19 條', href: 'https://law.banking.gov.tw/chi/FLAW/FLAWDOC01.aspx?lno=19&lsid=FL006433' },
      { label: '玉山銀行 — 2026 U Bear 網路消費加碼上限與基本回饋', href: 'https://event.esunbank.com.tw/credit/ubear/index.html' },
      { label: '玉山銀行 — 信用卡一般消費排除項目公告', href: 'https://event.esunbank.com.tw/credit/notice/index.html' },
      { label: '國泰世華銀行 — CUBE 指定消費、一般回饋與排除條件', href: 'https://www.cathaybk.com.tw/cathaybk/promo/event/credit-card/product/CUBE_rights/index.html?Type=11&open=true' },
    ],
    lastVerified: '2026-07-19',
  },
};

export const evGasTcoGuides: Record<Locale, DecisionGuideContent> = {
  en: {
    id: 'ev-gas-total-cost-method',
    labels: labels.en,
    directAnswer: 'An EV is cheaper only when its all-in ownership cost over your actual holding period is lower. Compare two genuinely substitutable vehicles and count net purchase price, home-charging setup, electricity or gasoline, insurance quotes, maintenance, recurring taxes and fees, and resale proceeds. In the five-year example below, the EV costs $39,864 and the gas car $40,250—a narrow $386 EV advantage that disappears if electricity or resale assumptions change.',
    inputs: ['Out-the-door price for each comparable vehicle, including dealer charges and sales tax', 'Only an EV credit or rebate you are eligible for and expect to keep; otherwise enter zero', 'Home charger, electrical work, financing cost, registration and other one-time amounts not already in the price', 'Annual miles from odometer history, not an aspirational estimate', 'Your blended electricity price and charging losses; use the share of paid public charging you really expect', 'EPA or real-world kWh per 100 miles and mpg for the same driving mix', 'Separate insurance quotes, maintenance budget, annual taxes, registration and road charges', 'Conservative resale value for each exact model at the chosen ownership year'],
    formula: 'EV TCO = EV price − confirmed incentive + EV one-time costs + years × (electricity + insurance + maintenance + annual taxes/fees) − EV resale. Gas TCO = gas price + gas one-time costs + years × (gasoline + insurance + maintenance + annual taxes/fees) − gas resale. Electricity/year = miles × kWh/100 mi ÷ 100 × (1 + charging-loss rate) × $/kWh. Gasoline/year = miles ÷ mpg × $/gal.',
    workedExample: 'Comparable prices are $42,000 for the EV and $34,000 for the gas car, with no assumed credit. Add $1,800 versus $1,000 of one-time costs, drive 12,000 miles a year for five years, and use $0.18/kWh, 30 kWh/100 mi, 10% charging loss, $3.50/gal and 30 mpg. Annual energy is $713 versus $1,400. After insurance, maintenance, taxes and resale values of $22,000 and $17,000, TCO is $39,864 versus $40,250. The EV leads by only $386, so the decision is assumption-sensitive.',
    sensitivity: [
      { scenario: 'Base case', input: '$0.18/kWh, $3.50/gal, 12,000 mi/year, $22,000 EV resale', result: 'EV $39,864; gas $40,250; EV lower by $386' },
      { scenario: 'Higher charging price', input: 'Blended electricity rises to $0.30/kWh', result: 'EV $42,240; gas lower by $1,990' },
      { scenario: 'Higher gasoline price', input: 'Gasoline rises to $4.50/gal', result: 'Gas $42,250; EV lower by $2,386' },
      { scenario: 'Lower EV resale', input: 'Five-year EV resale falls to $18,000', result: 'EV $43,864; gas lower by $3,614' },
      { scenario: 'More driving', input: '18,000 mi/year; other inputs unchanged', result: 'EV $41,646; gas $43,750; EV lower by $2,104' },
    ],
    cta: { label: 'Use your own quotes in the full TCO calculator', href: '#ev-gas-tco-calculator' },
    limitations: ['The model compares money, not charging availability, range, towing, reliability, safety, emissions or whether the two vehicles meet the same needs.', 'Tax credits, utility rates, registration rules, insurance and resale markets change by date and location. Enter a benefit only after checking current eligibility and recapture rules.', 'Loan interest belongs in one-time or financing cost only if the compared prices are otherwise cash prices. Do not count the same sales tax, fee or charger twice.', 'Resale is uncertain and can dominate the result. Test a low-resale case and a shorter holding period before treating a small advantage as robust.'],
    sources: [
      { label: 'U.S. Department of Energy AFDC — Vehicle Cost Calculator methodology and custom inputs', href: 'https://afdc.energy.gov/calc/' },
      { label: 'U.S. Department of Energy AFDC — electric vehicles for consumers and operating-cost context', href: 'https://afdc.energy.gov/vehicles/electric-consumers' },
      { label: 'U.S. Department of Energy — location-specific fuel savings calculator', href: 'https://www.energy.gov/policy/articles/save-2200-year-driving-electric-vehicle' },
    ],
    lastVerified: '2026-07-19',
  },
  zh: {
    id: 'ev-gas-total-cost-method',
    labels: labels.zh,
    directAnswer: '電動車不會因為免燃料費或每公里電費低就自動比較省。應把同級、能取代彼此的兩台車，用實際成交價、家充建置、電費或油錢、保險、保養、牌照稅與汽車燃料使用費、持有年限及轉售價放進同一張現金流表。下方五年算例中，電動車總成本約 NT$1,107,644，油車約 NT$1,077,700，油車只低 NT$29,944；提高里程或降低電動車買價後就可能翻轉。',
    inputs: ['兩台同級車含選配、領牌及必要費用的實際成交價', '已核准且確定可取得的購車補助或減免；不確定就先填 0', '家用充電樁、電力增設、社區施工、貸款利息及其他未含在成交價的前期成本', '依過去里程或通勤路線估算的年行駛公里', '台電帳單級距、社區加價與公共充電占比加權後的每度電成本', '車款實際 kWh/100km、充電損耗，以及油車 L/100km', '兩車各自的保險報價、保養、輪胎、使用牌照稅與汽車燃料使用費', '預計第幾年賣車，以及同車型、里程與車況的保守轉售價'],
    formula: '電動車 TCO = 成交價 − 已確認補助 + 一次性成本 + 年數 ×（電費 + 保險 + 保養 + 年度稅費）− 轉售價。油車 TCO = 成交價 + 一次性成本 + 年數 ×（油錢 + 保險 + 保養 + 年度稅費）− 轉售價。年電費 = 年里程 × kWh/100km ÷ 100 ×（1 + 充電損耗率）× 每度電價；年油錢 = 年里程 × L/100km ÷ 100 × 每公升油價。',
    workedExample: '電動車成交價 NT$1,650,000、油車 NT$1,250,000，不預設補助；前期其他成本分別 NT$60,000 與 NT$20,000。每年 15,000km、持有五年，電動車 16.5kWh/100km、損耗 10%、加權電價 NT$3.5/kWh；油車 6.8L/100km、油價 NT$31/L。年能源成本約 NT$9,529 與 NT$31,620。再加入個別保險、保養、年度稅費及 NT$850,000／NT$650,000 轉售價後，電動車 TCO 約 NT$1,107,644，油車約 NT$1,077,700，油車低 NT$29,944。',
    sensitivity: [
      { scenario: '基本情境', input: '年里程 15,000km；電價 NT$3.5；油價 NT$31', result: '電動車 NT$1,107,644；油車低 NT$29,944' },
      { scenario: '電動車成交價較低', input: '電動車改為 NT$1,500,000', result: '電動車 NT$957,644；反而低 NT$120,056' },
      { scenario: '年里程較高', input: '每年 25,000km', result: '電動車 NT$1,139,406；比油車低 NT$43,694' },
      { scenario: '大量使用高價充電', input: '加權電價提高到 NT$6/kWh', result: '電動車 NT$1,141,675；油車低 NT$63,975' },
      { scenario: '電動車轉售較低', input: '五年轉售價改為 NT$750,000', result: '電動車 NT$1,207,644；油車低 NT$129,944' },
    ],
    cta: { label: '把自己的成交價、里程與稅費帶入完整計算器', href: '#ev-gas-tco-calculator' },
    limitations: ['地方政府可在法定期限內決定是否免徵電動車使用牌照稅；車籍地、車種與馬力仍要逐案確認，不能把某縣市優惠套到全台。', '現行法規列電動汽車免徵汽車燃料使用費，但制度、道路養護費或徵收方式可能調整；購車時應重新查核。', '家充能否施工、社區電價、快充比例、電池保固、輪胎規格與保費差異可能比平均能源成本更重要。', '轉售價不是保證。至少測試低轉售、提前換車與高公共充電三個情境；差額很小時不要宣稱必然省錢。'],
    sources: [
      { label: '財政部使用牌照稅法 — 電動車免稅授權期限至 119 年底', href: 'https://law-out.mof.gov.tw/LawContent.aspx?id=FL006130' },
      { label: '地方稅務局使用牌照稅專區 — 電動小客車馬力級距與地方免徵資訊', href: 'https://www.citax.gov.tw/VehicleLicenseTax/StaticPage/AboutLicenseTax' },
      { label: '交通部汽車燃料使用費徵收及分配辦法 — 電動汽車免徵條文', href: 'https://motclaw.motc.gov.tw/webMotcLaw2018/Law/ArticleContent?LawID=E0050036&type=-1' },
    ],
    lastVerified: '2026-07-19',
  },
};

export const evChargingCostGuides: Partial<Record<Locale, DecisionGuideContent>> = {
  en: {
    id: 'ev-home-public-charging-cost-method',
    labels: labels.en,
    directAnswer: 'An EV’s charging cost per mile depends on where its kWh come from, not the charger’s headline speed. Multiply vehicle consumption by annual miles, add energy lost between the meter and battery, price home, public AC and DC fast charging by their actual kWh shares, then add subscriptions and session or idle fees. In the example, a 70% home / 10% public AC / 20% DC mix costs about $1,118 a year or $0.093 per mile; charging the same driving entirely at home would cost about $634 or $0.053 per mile.',
    inputs: ['Annual miles from odometer or route history', 'Observed or rated kWh per 100 miles for the vehicle and driving conditions', 'Charging loss between the wall meter and battery; keep it separate from vehicle consumption', 'Share of delivered kWh—not number of sessions—from home, public AC and DC fast charging', 'Marginal delivered home electricity rate, including time-of-use period actually used', 'Public AC and DC price shown for your plan, roaming status and payment method', 'Charging-network membership paid because of the vehicle', 'Session, connection, parking and idle charges attributable to charging'],
    formula: 'Battery kWh/year = miles/year × kWh/100 mi ÷ 100. Grid kWh/year = battery kWh × (1 + charging-loss rate). Weighted rate = home share × home $/kWh + public AC share × AC $/kWh + DC share × DC $/kWh. Annual charging cost = grid kWh × weighted rate + 12 × monthly membership + annual session/idle fees. Cost/mile = annual charging cost ÷ annual miles.',
    workedExample: 'Drive 12,000 miles at 30 kWh/100 mi. The battery needs 3,600 kWh; with 10% charging loss, the meter or network must deliver 3,960 kWh. A 70% / 10% / 20% mix priced at $0.16, $0.30 and $0.55 per kWh has a weighted energy rate of $0.252/kWh. Add a $10 monthly membership: annual cost is $1,117.92, or $0.093/mile. At the same loss and $0.16 home rate, home-only energy would cost $633.60.',
    sensitivity: [
      { scenario: 'Home-only benchmark', input: '100% home at $0.16/kWh; no membership', result: '$634/year; $0.053/mile' },
      { scenario: 'Base mixed charging', input: '70% home, 10% AC, 20% DC; $10/month', result: '$1,118/year; $0.093/mile' },
      { scenario: 'Frequent fast charging', input: '50% home, 10% AC, 40% DC', result: '$1,427/year; $0.119/mile' },
      { scenario: 'Higher home tariff', input: 'Home rises to $0.25/kWh', result: '$1,368/year; $0.114/mile' },
      { scenario: 'Less efficient driving', input: '36 kWh/100 mi instead of 30', result: '$1,318/year; $0.110/mile' },
    ],
    cta: { label: 'Calculate your blended charging cost per mile', href: '#ev-charging-cost-calculator' },
    limitations: ['The calculator estimates energy and directly attributable charging fees. It does not include the purchase, installation or financing of home equipment, which belongs in a total-cost comparison.', 'Utility bills can include tiered rates, demand charges, taxes and fixed service charges. Use the incremental rate caused by charging; do not assign the whole household bill to the car.', 'A public price can change by network, membership, roaming provider, payment method, location, time, power, parking or idle time. Check the app or station display before each paid session.', 'Rated consumption can differ with temperature, speed, elevation, towing and battery conditioning. Replace it with measured wall-to-wheel data when available.'],
    sources: [
      { label: 'U.S. Department of Energy AFDC — charging electric vehicles at home and cost-per-mile inputs', href: 'https://afdc.energy.gov/fuels/electricity-charging-home' },
      { label: 'U.S. Department of Energy AFDC — charging electric vehicles in public', href: 'https://afdc.energy.gov/fuels/electricity-charging-public' },
      { label: 'U.S. Department of Energy AFDC — public fast charging normally costs more than home charging', href: 'https://afdc.energy.gov/vehicles/electric-consumers' },
    ],
    lastVerified: '2026-07-19',
  },
  zh: {
    id: 'ev-home-public-charging-cost-method',
    labels: labels.zh,
    directAnswer: '電動車每公里充電成本不能只拿車機顯示的耗電乘上家用電價。要先把行駛所需電量加上充電損耗，再依「實際充入的度數」分配家充、公共 AC 與 DC 快充占比，最後加上月費、啟動費、停車費與占位費。下方案例以 75% 家充、10% 公共 AC、15% DC 快充計算，一年約 NT$16,001、每公里約 NT$1.07；若同樣里程全部在家充且沒有月費，約 NT$8,712、每公里 NT$0.58。',
    inputs: ['依里程表或固定路線整理的年行駛公里', '車款在實際通勤、冷氣與高速情境下的 kWh/100km', '從電表到電池的充電損耗，不能和車機耗電重複計入', '家充、公共 AC、DC 快充各占充電度數的百分比，不是充電次數', '家中新增用電所在的台電級距、時間電價或社區公設轉售單價', '各公共充電營運商對會員、非會員及漫遊使用者顯示的每度費率', '因充電而申辦的會員月費', '啟動、計時、停車與逾時占位等一年實付費用'],
    formula: '電池年用電 = 年公里 × kWh/100km ÷ 100。電網年供電 = 電池年用電 ×（1 + 充電損耗率）。加權電價 = 家充占比 × 家充電價 + 公共 AC 占比 × AC 電價 + DC 快充占比 × DC 電價。年充電成本 = 電網年供電 × 加權電價 + 月費 × 12 + 年度啟動／停車／占位費。每公里成本 = 年充電成本 ÷ 年公里。',
    workedExample: '每年 15,000km、耗電 16.5kWh/100km，電池需要 2,475kWh；加上 10% 損耗後，電表與充電網路共供應 2,722.5 度。家充 75% × NT$3.2、公共 AC 10% × NT$8、DC 快充 15% × NT$12，加權每度 NT$5；再加每月 NT$199 會員費，年成本約 NT$16,001、每公里約 NT$1.07。若全部用 NT$3.2 家充且不付月費，年成本約 NT$8,712。',
    sensitivity: [
      { scenario: '全家充基準', input: '100% 家充、每度 NT$3.2、無月費', result: '每年 NT$8,712；每公里 NT$0.58' },
      { scenario: '基本混合情境', input: '75% 家充、10% AC、15% DC；月費 NT$199', result: '每年 NT$16,001；每公里 NT$1.07' },
      { scenario: '快充占比提高', input: '60% 家充、10% AC、30% DC', result: '每年 NT$19,594；每公里 NT$1.31' },
      { scenario: '家用邊際電價較高', input: '家充每度改為 NT$5', result: '每年 NT$19,676；每公里 NT$1.31' },
      { scenario: '取消用不到的月費', input: '費率不變、月費改為 0', result: '每年 NT$13,613；每公里 NT$0.91' },
    ],
    cta: { label: '用自己的台電帳單與快充占比計算每公里成本', href: '#ev-charging-cost-calculator' },
    limitations: ['範例費率只是展示算法，不代表台電或任何充電業者的現行報價。家用電價受級距、夏月、時間電價、獨立電表與社區計價方式影響；公共費率則由各營運商及場站訂定。', '交通部規範公共停車場應提供充電費率等資訊，但停車、充電、計時與逾時費可能分開收取。試算前要看場站頁面與付款確認畫面。', '家充設備、拉線、管委會工程與電力增設是一次性成本，本頁不攤提；比較買車總成本時應另行納入。', '車機耗電通常不等於電表度數。溫度、速度、胎壓、爬坡、電池預熱與充電效率都會造成差異，最好用連續數月帳單校正。'],
    sources: [
      { label: '台灣電力公司 — 電動車用電業務專區與電動車充換電設施電價資料', href: 'https://hc2.taipower.com.tw/umbraco/surface/Ini/CountAndRedirectUrl?nodeId=28664' },
      { label: '交通部 — 公共充電資料標準列出每度、計時、尖離峰與分級費率格式', href: 'https://www.motc.gov.tw/ch/app/data/doc?aplistdn=&detailNo=1347127224616095744&id=2563&module=bussiness&preview=&serno=97630c83-ef86-4554-8242-8d156a06476a&type=s' },
      { label: '交通部 — 電動汽車充電專用停車位及充電設施設置管理辦法', href: 'https://motclaw.motc.gov.tw/webMotcLaw2018/Law/ArticleContent?LawID=E0481000&type=1' },
    ],
    lastVerified: '2026-07-19',
  },
};

export const newUsedCarGuides: Partial<Record<Locale, DecisionGuideContent>> = {
  en: {
    id: 'new-used-car-tco-method',
    labels: labels.en,
    directAnswer: 'A used car is not automatically cheaper and a new car is not automatically safer financially. Compare both over the same holding period: transaction price and fees, interest accrued while you own it, expected repairs, and resale value. In this five-year example the used car costs about $26,735 versus $26,774 for the new car—a difference of only $39. If the modeled $5,000 major repair actually occurs, used-car cost rises to about $30,235 and the new car is lower by roughly $3,461.',
    inputs: ['Actual out-the-door price for each car, including dealer and government fees', 'Down payment, APR and loan term for each offer—not just the monthly payment', 'Planned holding period and the balance still owed when the car may be sold', 'Routine maintenance and repair budget for each car', 'Cost and evidence-based probability of one major used-car repair', 'Conservative resale value at the end of the same holding period', 'Vehicle-history report, open-recall check, warranty scope and independent inspection findings'],
    formula: 'TCO during holding period = purchase price + transaction fees + interest accrued during holding + routine repairs + (major-repair cost × probability, for the expected case) − resale value. Loan balance at sale is shown separately because sale proceeds must first retire that debt. Downside used-car TCO replaces the probability-weighted repair with the full repair cost.',
    workedExample: 'Hold both cars for five years. New: $36,000 price, $3,000 fees, $6,000 down, 4.9% APR for 60 months, $500 repairs per year and $19,000 resale. Interest is about $4,274 and TCO is $26,774. Used: $24,000 price, $2,500 fees, $6,000 down, 8.5% APR, $1,200 repairs per year, $12,000 resale, plus a 30% chance of a $5,000 major repair. Interest is about $4,735 and expected TCO is $26,735—only $39 lower. If the full repair occurs, used-car TCO is $30,235.',
    sensitivity: [
      { scenario: 'Used-car financing improves', input: 'Used APR falls from 8.5% to 5.5%', result: 'Used expected TCO about $24,994; used lower by about $1,780' },
      { scenario: 'Used-car resale disappoints', input: 'Used resale falls from $12,000 to $9,000', result: 'Used expected TCO about $29,735; new lower by about $2,961' },
      { scenario: 'New-car discount', input: 'New transaction price falls by $2,000', result: 'New TCO about $24,774; new lower by about $1,961' },
      { scenario: 'Sell after three years', input: 'New resale $26,000; used resale $16,500', result: 'New about $18,040 vs used $18,994; new lower by about $954, with loan balances still due' },
      { scenario: 'Major used repair occurs', input: 'Replace 30% expected value with the full $5,000 repair', result: 'Used downside TCO about $30,235; new lower by about $3,461' },
    ],
    cta: { label: 'Compare your two car offers and repair scenario', href: '#new-used-car-tco-calculator' },
    limitations: ['The repair probability is a scenario, not a forecast. Base it on an independent inspection, model-specific service history, mileage and documented condition.', 'History reports can reveal title, mileage or damage records but do not replace a mechanical inspection. Confirm open recalls separately and get every dealer promise in writing.', 'Resale value is uncertain and can dominate a short holding period. Use a conservative offer or multiple current trade-in quotes, then test a lower value.', 'Insurance, fuel or electricity, tax and registration are excluded only when they are genuinely similar between the two candidates. Add their differences for a full ownership comparison.', 'This is an educational cash-flow model, not a vehicle, credit, legal or safety recommendation.'],
    sources: [
      { label: 'Federal Trade Commission — Buying a Used Car From a Dealer', href: 'https://consumer.ftc.gov/articles/buying-used-car-dealer' },
      { label: 'Federal Trade Commission — vehicle history, NMVTIS and open-recall checks', href: 'https://consumer.ftc.gov/features/feature-0040-used-cars' },
      { label: 'Consumer Financial Protection Bureau — compare APR, amount financed, finance charge and total payments', href: 'https://consumerfinance.gov/archive/blog/dont-get-taken-ride-protect-yourself-auto-loan-you-cant-afford/' },
    ],
    lastVerified: '2026-07-19',
  },
  zh: {
    id: 'new-used-car-tco-method',
    labels: labels.zh,
    directAnswer: '新車或中古車不能只比車價，也不能用「中古車一定省」當結論。要在同一持有年限下比較成交價與規費、持有期間已付利息、預期維修及轉售價，並把中古車重大維修真的發生時另列。本文五年案例的新車總成本約 NT$617,188，中古車期望成本約 NT$621,978，新車只少約 NT$4,790；若 NT$150,000 的重大維修真的發生，中古車下行情境約 NT$726,978，新車則少約 NT$109,790。',
    inputs: ['新車與中古車的實際成交總價、領牌規費、手續費及需自付的附加項目', '兩筆貸款各自的頭期款、總費用年百分率或年利率、期數與費用', '預計持有幾年，以及提前賣車時仍未償還的貸款餘額', '依里程、車齡與保養紀錄估的年度耗材及維修預算', '一項重大維修的可能金額與情境機率', '同一年限、同里程假設下的保守轉售價', '定型化契約記載的里程、用途、重大事故與瑕疵，以及監理里程紀錄與第三方檢查'],
    formula: '持有期間總成本 = 成交價 + 規費／手續費 + 持有期間已付利息 + 例行維修 +（中古車重大維修金額 × 情境機率）− 期末轉售價。賣車時貸款餘額另外顯示，因為售車款必須先清償；中古車下行情境則把機率加權值換成完整重大維修金額。',
    workedExample: '持有五年。新車成交 NT$1,050,000、規費 NT$30,000、頭期 NT$250,000、貸款 60 期年利率 2.88%，每年維修保養 NT$15,000、期末轉售 NT$600,000；利息約 NT$62,188，總成本約 NT$617,188。中古車成交 NT$550,000、規費 NT$35,000、頭期 NT$200,000、貸款年利率 6.5%，每年維修 NT$45,000、轉售 NT$300,000，再加 30% 機率的 NT$150,000 重大維修；利息約 NT$66,978，期望總成本約 NT$621,978。兩者僅差約 NT$4,790。',
    sensitivity: [
      { scenario: '中古車保養狀況較好', input: '年度維修從 NT$45,000 降至 NT$30,000', result: '中古車約 NT$546,978；比新車低約 NT$70,210' },
      { scenario: '重大維修真的發生', input: '不再用 30% 加權，完整支出 NT$150,000', result: '中古車約 NT$726,978；新車低約 NT$109,790' },
      { scenario: '中古車轉售少 NT$100,000', input: '轉售從 NT$300,000 降為 NT$200,000', result: '中古車期望成本約 NT$721,978；新車低約 NT$104,790' },
      { scenario: '新車成交折讓 NT$50,000', input: '其他條件不變', result: '新車約 NT$567,188；比中古車低約 NT$54,790' },
    ],
    cta: { label: '輸入兩份報價與中古車維修風險重算', href: '#new-used-car-tco-calculator' },
    limitations: ['重大維修機率只是壓力測試，不是故障預測；應依車型通病、里程、原廠保養紀錄、第三方檢查與技師估價設定。', '行政院中古汽車買賣定型化契約要求揭露的里程、用途與重大事故等資料很重要，但書面揭露仍不能取代實車檢查與試駕。', '監理服務網可查檢驗里程紀錄作為核對線索，但無法證明每次保養、事故或里程都完整。', '貸款比較應使用銀行或融資公司提供的實際總費用資料；本文不把示範利率當成市場平均。', '若兩車的保險、油電、牌照燃料費不同，必須另加差額。本頁是一般教育試算，不是購車、融資、法律或安全建議。'],
    sources: [
      { label: '行政院消費者保護會 — 中古汽車買賣定型化契約', href: 'https://www.ey.gov.tw/Page/DFB720D019CCCB0A/7fc289d0-0b02-4d85-8800-fae8f459d4a7' },
      { label: '行政院消費者保護會 — 契約應記載里程、用途、重大事故與權利事項', href: 'https://www.ey.gov.tw/File/CA5B26EA2977D16A?A=C' },
      { label: '交通部公路局 — 車輛檢驗里程紀錄查詢說明', href: 'https://www.thb.gov.tw/News_Content.aspx?n=87&s=48139&sms=13235' },
      { label: '金融監督管理委員會 — 汽車貸款總費用年百分率相關規範', href: 'https://law.fsc.gov.tw/LawContent.aspx?id=FL036733' },
    ],
    lastVerified: '2026-07-19',
  },
};

export const carLeaseBuyGuides: Partial<Record<Locale, DecisionGuideContent>> = {
  en: {
    id: 'car-lease-buy-total-cost-method',
    labels: labels.en,
    directAnswer: 'Compare a lease return and a financed purchase over the same number of months. The lease must include amount due at signing, all payments, insurance and maintenance not included, excess-mile charges, disposition and expected return fees. The purchase must include out-the-door price, interest accrued, insurance, maintenance and resale value. In this 36-month example, leasing costs $28,650 and buying costs about $28,542—a difference of only $108. The answer flips with mileage or resale, so neither monthly payment is a verdict.',
    inputs: ['Same vehicle or two truly equivalent vehicles and the same comparison term', 'Lease amount due at signing, monthly payment, taxes and fees without double-counting the first payment', 'Annual mileage allowance, realistic miles and contractual excess-mile price', 'Insurance, scheduled maintenance, tires and repairs not included in the lease payment', 'Disposition, acquisition, early-termination, excess-wear and missing-equipment terms', 'Lease residual or purchase-option price and an independent end-market estimate', 'Purchase out-the-door price, down payment, APR, loan term and required products', 'Purchase insurance, maintenance and conservative resale value at the same month and mileage'],
    formula: 'Lease-return cost = due at signing + monthly payment × months + nonincluded insurance/maintenance + max(actual distance − allowed distance, 0) × excess rate + expected return/end fees. Buy cost = out-the-door price + interest accrued during the same months + insurance/maintenance − resale value. Purchase-option gap = expected lease-end market value − option price; it is shown separately and is not assumed in the return scenario.',
    workedExample: 'Over 36 months, the lease has $3,000 due at signing, $475 monthly, $1,800 insurance and $300 maintenance per year, 10,000 miles allowed but 12,000 expected, $0.25 per excess mile and $750 end fees. Lease cost is $28,650, including $1,500 mileage. Buying costs $40,000 plus $3,500 fees, financed after $7,000 down at 6.5% for 60 months; add $1,900 insurance and $700 maintenance per year and subtract $28,000 resale. Interest accrued is about $5,242 and buy cost $28,542—only $108 lower, with about $16,032 still owed at month 36.',
    sensitivity: [
      { scenario: 'Drive within lease allowance', input: '10,000 miles/year instead of 12,000', result: 'Lease $27,150; lease lower by about $1,392' },
      { scenario: 'Drive 15,000 miles/year', input: '15,000 miles/year at $0.25 excess', result: 'Lease $30,900; buy lower by about $2,358 before mileage affects resale' },
      { scenario: 'Lower purchase resale', input: 'Buy resale falls from $28,000 to $25,000', result: 'Buy about $31,542; lease lower by about $2,892' },
      { scenario: 'Lease buyout is above market', input: '$24,000 option versus $22,500 estimated market', result: 'Option is $1,500 above estimate; returning may be cheaper, subject to return fees' },
    ],
    cta: { label: 'Compare your lease sheet and purchase quote', href: '#car-lease-buy-calculator' },
    limitations: ['A lease’s advertised monthly payment can exclude due-at-signing cash, taxes, registration, insurance, acquisition or disposition fees. Use the signed disclosure schedule.', 'Unused miles normally do not create an automatic credit unless the contract says so. High mileage can also reduce a purchased car’s resale, so revise resale in the matching scenario.', 'Closed-end and open-end leases allocate residual-value risk differently. This calculator models a return lease with stated end fees, not every open-end liability.', 'Early termination can be very expensive and is not modeled as a probability. If the planned term is uncertain, obtain the contractual termination formula and test it separately.', 'This is an educational comparison, not a vehicle, lease, loan, tax, insurance or legal recommendation.'],
    sources: [
      { label: 'Consumer Financial Protection Bureau — leasing versus buying a car', href: 'https://www.consumerfinance.gov/ask-cfpb/what-should-i-know-about-leasing-versus-buying-a-car-en-815/' },
      { label: 'Federal Trade Commission — Financing or Leasing a Car', href: 'https://consumer.ftc.gov/articles/financing-or-leasing-car' },
      { label: 'Consumer Financial Protection Bureau — Regulation M consumer-lease disclosures', href: 'https://www.consumerfinance.gov/rules-policy/regulations/1013/' },
    ],
    lastVerified: '2026-07-19',
  },
  zh: {
    id: 'car-lease-buy-total-cost-method',
    labels: labels.zh,
    directAnswer: '台灣個人長租、租賃或買車不能只比「每月多少」。長租要加簽約前期款、全部月租、未包含的保險與保養、超里程、還車車損及其他期末費用；買車要加成交規費、持有期間貸款利息、保險保養，再扣同時間與里程的轉售價。本文 36 個月案例長租約 NT$913,000，買車約 NT$730,585，買車低約 NT$182,415；但若買車轉售只剩 NT$700,000，長租反而低約 NT$17,585。',
    inputs: ['同級車與相同 36／48／60 個月比較期間', '長租簽約金、保證金是否可退、月租、稅費與交車費', '契約約定每年或全期里程、預計里程與每公里超里程費', '租金是否含強制險、第三人責任險、車體險、保養、輪胎、稅費與代車', '還車車況認定、修復、缺件、清潔、逾期與提前終止費', '租期末買回價／殘值與同車況市場估值；純長租可能沒有約定買回權', '買車含領牌成交價、頭期、利率或總費用年百分率、期數與必要產品', '買車保險、保養及同月份、同里程的保守轉售價'],
    formula: '長租還車成本 = 簽約前期款 + 月租 × 月數 + 未包含的保險／保養 + max(實際里程 − 約定里程, 0) × 超里程單價 + 預估還車／期末費。買車成本 = 成交總價 + 同期間已付利息 + 保險／保養 − 期末轉售價。買回價差 = 租期末市場估值 − 契約買回價，獨立顯示，不預設一定買回。',
    workedExample: '比較 36 個月。長租簽約前期款 NT$100,000、月租 NT$18,000，每年保險 NT$30,000、保養已含所以填 0；每年約定 15,000km、實際 18,000km、超里程 NT$5/km，預估還車費 NT$30,000。長租總成本 NT$913,000，其中超里程 NT$45,000。買車成交 NT$1,350,000、規費 NT$40,000、頭期 NT$300,000、貸款 60 期年利率 3.2%，每年保險 NT$30,000、保養 NT$25,000，36 個月轉售 NT$900,000；期間利息約 NT$75,585，買車成本約 NT$730,585，低約 NT$182,415，但尚有約 NT$457,001 貸款餘額要由售車款清償。',
    sensitivity: [
      { scenario: '里程未超約定', input: '每年 15,000km', result: '長租 NT$868,000；買車仍低約 NT$137,415' },
      { scenario: '買車轉售較差', input: '36 個月轉售從 NT$900,000 降為 NT$700,000', result: '買車約 NT$930,585；長租反而低約 NT$17,585' },
      { scenario: '長租月租較低', input: '月租從 NT$18,000 降為 NT$16,000', result: '長租 NT$841,000；買車仍低約 NT$110,415' },
      { scenario: '買回價高於市場', input: '契約買回 NT$850,000；市場估值 NT$800,000', result: '買回價高 NT$50,000；還車與買回要分開評估' },
    ],
    cta: { label: '把長租契約與買車報價帶入重算', href: '#car-lease-buy-calculator' },
    limitations: ['台灣「長租」「租賃」「以租代購」可能是不同契約。是否取得所有權、期末是否能買回、費用和風險都要以書面條款為準。', '交通部小客車租賃定型化契約會記載租金、保險、里程、車況與還車等事項；個別長期方案還需逐欄確認超里程、保養、輪胎及提前終止。', '保證金若依約可全額返還，不是成本但會占用現金；若可能被抵扣，應把合理的扣款情境列入期末費。', '買車轉售價必須反映同里程。長租超里程會被收費，買車高里程則通常透過較低收購價付出成本。', '本頁是一般教育試算，不是租賃、購車、融資、保險、稅務或法律建議。'],
    sources: [
      { label: '行政院消費者保護會 — 小客車租賃定型化契約應記載及不得記載事項', href: 'https://www.ey.gov.tw/Page/DFB720D019CCCB0A/9a938b28-15c4-43e2-b293-2d5f9fbd3ebd' },
      { label: '交通部 — 小客車租賃定型化契約範本與附表', href: 'https://motclaw.motc.gov.tw/webMotcLaw2018/SLaw/Content?soid=4955' },
      { label: '行政院 — 契約範本的保險、車損與租賃期間責任', href: 'https://www.ey.gov.tw/File/607ED018AADD5BB2?A=C' },
    ],
    lastVerified: '2026-07-19',
  },
};

export const commuteFullCostGuides: Partial<Record<Locale, DecisionGuideContent>> = {
  en: {
    id: 'commute-full-cost-method',
    labels: labels.en,
    directAnswer: 'A commute costs more than gas or a transit ticket. Add energy, maintenance, depreciation, fares, parking, tolls and monthly fixed costs, then subtract employer reimbursement. Show travel time separately and assign it a personal value only if useful; it is not automatically equal to your wage. In this 20-day driving example, cash cost is $532, 20 hours of travel valued at $10 per hour add $200, and the optional full monthly cost is $732, or $36.60 per commute day.',
    inputs: ['Actual office days in a typical month, not a generic 22-day assumption', 'Round-trip miles from route history and days with detours or multiple sites', 'Fuel or electricity cost per mile using current price and observed efficiency', 'Maintenance, tires and repair reserve per mile', 'Depreciation attributable to additional mileage, kept separate from the loan payment', 'Transit fare or pass, parking, tolls and other daily or monthly charges', 'Employer transit, parking or mileage reimbursement actually received', 'Door-to-door minutes including walking, waiting, transfers and parking search', 'Optional personal value per hour, including a zero-value cash-only view'],
    formula: 'Monthly cash cost = commute days × [round-trip distance × (energy + maintenance + depreciation per distance) + daily fare + parking/tolls] + monthly fixed commute costs − reimbursement. Monthly commute hours = days × round-trip minutes ÷ 60. Optional full cost = cash cost + commute hours × chosen personal time value.',
    workedExample: 'Drive 20 days a month, 30 miles round trip. Energy is $0.12/mile, maintenance $0.10 and mileage-related depreciation $0.20; parking/tolls are $8/day and fixed insurance/registration allocated to the commute is $120/month. Distance cost is $252 and other cash cost $280, for $532 cash. Sixty minutes a day equals 20 hours; at a deliberately chosen $10/hour, time adds $200. Full cost is $732, or $36.60 per office day.',
    sensitivity: [
      { scenario: 'Cash-only view', input: 'Time value $0/hour', result: '$532/month; time remains 20 hours rather than disappearing' },
      { scenario: 'Parking removed', input: '$0 instead of $8/day', result: '$572 full cost; $160 lower' },
      { scenario: 'Ten office days', input: '10 instead of 20 days', result: '$426 full cost; fixed $120 makes per-day cost rise to $42.60' },
      { scenario: 'Higher energy price', input: '$0.18 instead of $0.12 per mile', result: '$768 full cost; $36 higher' },
    ],
    cta: { label: 'Calculate your commute cash and time cost', href: '#commute-full-cost-calculator' },
    limitations: ['The IRS business mileage rate is designed for eligible business use and reimbursement, not a universal estimate of a personal commute or an automatic commuter deduction.', 'Do not add a full loan payment and full depreciation: principal becomes vehicle value. Use mileage-related depreciation or a total ownership allocation, not both.', 'Time value is a preference or scenario input. Travel time is not automatically lost wages, and productive or enjoyable transit time may deserve a different value.', 'Remote-work, housing and tax decisions need separate analysis. This estimate does not recommend a home, job, route, vehicle or tax position.'],
    sources: [
      { label: 'IRS 2026 — standard mileage rate and included fixed/variable-cost study boundary', href: 'https://www.irs.gov/irb/2026-04_IRB' },
      { label: 'IRS Publication 463 — commuting, actual vehicle expenses, parking and tolls', href: 'https://www.irs.gov/publications/p463' },
      { label: 'U.S. DOT — travel-time valuation is an analytical range, not simply hourly pay', href: 'https://www.transportation.gov/office-policy/transportation-policy/revised-departmental-guidance-valuation-travel-time-economic' },
    ],
    lastVerified: '2026-07-19',
  },
  zh: {
    id: 'commute-full-cost-method',
    labels: labels.zh,
    directAnswer: '每月通勤成本不只油錢。應把能源、保養輪胎、里程造成的折舊、車票、停車、通行與固定費用相加，再扣公司補助；通勤時間另外列出，只有在需要比較方案時才由你自行設定每小時價值，不能直接等同薪資。本例每月 22 天、每日來回 24km，現金成本 NT$5,488；25.7 小時若以每小時 NT$150 作情境，完整成本約 NT$9,338，平均每個通勤日 NT$424.5。',
    inputs: ['實際每月進公司天數與臨時加班／跨點日數', '導航或里程表的每日來回公里，不用單程數字誤乘', '中油當期油價或充電實付價，以及自己車況的實際油耗／電耗', '每公里保養、輪胎與維修準備金', '因通勤里程增加而產生的折舊，不和車貸本金重複', '大眾運輸票價／月票、停車、國道通行與轉乘費', '公司實際補助，不能把尚未申請的制度先當收入', '門到門時間，含步行、等車、轉乘、塞車與找車位', '自行選擇的時間價值；同時保留填 0 的純現金結果'],
    formula: '每月現金成本 = 通勤天數 ×［來回公里 ×（每公里能源＋保養＋折舊）＋每日票價＋停車／通行］＋每月固定通勤費 − 補助。每月通勤時數 = 天數 × 每日來回分鐘 ÷ 60。選擇性完整成本 = 現金成本＋通勤時數 × 自訂時間價值。',
    workedExample: '每月 22 天、每日來回 24km。能源 NT$2.1/km、保養 NT$1.4/km、里程折舊 NT$2.5/km，停車 NT$60/天，另分攤固定費 NT$1,000。距離成本 NT$3,168，其他現金成本 NT$2,320，合計 NT$5,488。每日 70 分鐘等於每月約 25.7 小時；自訂 NT$150/小時時，時間情境 NT$3,850，完整成本 NT$9,338。',
    sensitivity: [
      { scenario: '只看現金', input: '時間價值設 NT$0', result: '每月 NT$5,488；25.7 小時仍另外顯示' },
      { scenario: '不分攤里程折舊', input: '折舊從 NT$2.5/km 改為 0', result: '完整成本 NT$8,018；少 NT$1,320' },
      { scenario: '混合辦公 15 天', input: '每月 15 個通勤日', result: '完整成本約 NT$6,685；固定費使每次成本不會等比例下降' },
      { scenario: '公司補助月票', input: '每月補助 NT$1,200', result: '完整成本 NT$8,138' },
    ],
    cta: { label: '計算自己的通勤現金與時間成本', href: '#commute-full-cost-calculator' },
    limitations: ['油價、電價、票價與停車費會變動，請用帳單與查價日資料，不把本頁算例當市場平均。', '車貸本金與折舊不能全額重複相加；若採完整持有成本分攤，就不要再另加同一段折舊。', '交通規劃的時間價值是方案比較參數，不代表每分鐘都能換成薪水；可用 0、低、基準三種情境。', '本頁不替你決定工作、住所、運具、報稅或補助資格。'],
    sources: [
      { label: '交通部運輸研究所 — 私人運具一般化成本含時間、油耗、停車與通行', href: 'https://www.iot.gov.tw/uploads/column_entry_file/file/6811deff085777d9c6ecec58/114-006-1477.pdf' },
      { label: '交通部運輸研究所 — 行車成本含燃油、維修、停車、稅捐、保險與折舊', href: 'https://www.iot.gov.tw/zh_tw/archive/pub/reports/-59902021' },
      { label: '台灣中油 — 當日汽柴油零售參考價格', href: 'https://www.cpc.com.tw/default.aspx' },
    ],
    lastVerified: '2026-07-19',
  },
};

export const wfhCommuteGuides: Partial<Record<Locale, DecisionGuideContent>> = {
  en: {
    id: 'wfh-commute-hidden-cost-method',
    labels: labels.en,
    directAnswer: 'Work from home is cheaper only when removed commute and office-day costs exceed additional home energy, food, equipment, connectivity and space after reimbursements. Compare incremental costs, not entire household bills. In this example, all-home cash is $250 per month and all-office cash is $860, so home is $610 lower. A 12-home/8-office hybrid costs $614 cash plus an optional $80 for eight commute hours.',
    inputs: ['Actual paid workdays and home-work days in one normal month', 'Incremental heating, cooling, lighting and equipment electricity per home day', 'Home-day meals compared with what you would eat anyway', 'Work-only internet upgrade, coworking, supplies and equipment amortization', 'Employer home-office reimbursement actually received', 'Door-to-door commute cash, office meal premium and office-only incidentals per day', 'Parking pass, transit pass, wardrobe care or other monthly office fixed cost', 'Employer commute or office reimbursement actually received', 'Round-trip commute minutes and an optional personal time value, including zero'],
    formula: 'All-home cash = workdays × (home energy + home food + home daily other) + home fixed costs − home reimbursement. All-office cash = workdays × (commute + office food premium + office daily other) + office fixed costs − office reimbursement. Hybrid cash applies each daily block to its actual days and adds fixed costs that remain. Optional full hybrid cost = hybrid cash + office days × commute hours/day × personal time value.',
    workedExample: 'For 20 workdays, home costs are $2.50 energy, $6 food and $1 other per day plus $60 fixed: $250 all-home. Office costs are $18 commute, $14 food and $3 other per day plus $160 fixed: $860 all-office. With 12 home days and eight office days, both fixed blocks remain, so hybrid cash is $614. Eight hours of commute at a chosen $10/hour make the optional hybrid comparison $694.',
    sensitivity: [
      { scenario: 'Cash only', input: 'Time value $0/hour', result: 'Hybrid remains $614; eight hours remain visible' },
      { scenario: 'No office parking pass', input: 'Office fixed cost falls from $160 to $0', result: 'All-office $700; hybrid $454' },
      { scenario: 'High home HVAC month', input: 'Home energy rises from $2.50 to $7/day', result: 'All-home $340; hybrid $668 cash' },
      { scenario: 'Two office days instead of eight', input: '18 home days, two office days', result: 'Hybrid cash $387; optional full $407' },
    ],
    cta: { label: 'Compare your remote, office and hybrid month', href: '#wfh-commute-calculator' },
    limitations: ['Only incremental costs belong in the comparison. Baseline rent, internet and meals should not be assigned entirely to work unless the alternative removes them.', 'The IRS says employees are not eligible for the federal home office deduction. Self-employment, state rules and employer accountable plans need separate review.', 'Reimbursements, benefits and labor rules depend on employer and location. Enter cash actually received rather than an assumed entitlement.', 'Time value is a personal sensitivity, not guaranteed earnings.'],
    sources: [
      { label: 'IRS — employees are not eligible for the home office deduction', href: 'https://www.irs.gov/newsroom/how-small-business-owners-can-deduct-their-home-office-from-their-taxes' },
      { label: 'IRS Publication 15-B (2026) — qualified transportation benefits', href: 'https://www.irs.gov/publications/p15b' },
      { label: 'US Department of Energy — computer energy and power management', href: 'https://www.energy.gov/cmei/femp/purchasing-energy-efficient-computers' },
      { label: 'US DOT — travel-time valuation requires scenario assumptions', href: 'https://www.transportation.gov/office-policy/transportation-policy/revised-departmental-guidance-valuation-travel-time-economic' },
    ],
    lastVerified: '2026-07-19',
  },
  zh: {
    id: 'wfh-commute-hidden-cost-method',
    labels: labels.zh,
    directAnswer: '在家工作是否較省，要看省下的交通、停車、進公司餐食差額與時間，是否大於新增的冷暖氣、照明、網路升級、設備與空間成本，再扣實領補助。不要把整張家庭帳單歸給工作。此算例全居家每月 NT$3,480，全進公司 NT$8,900，居家少 NT$5,420；14 天居家、8 天進公司的混合現金為 NT$6,360，另有 9.3 小時通勤。',
    inputs: ['一個正常月份的工作日、居家日與實際進公司日', '居家工作新增的冷氣、照明、電腦與螢幕用電', '居家餐食與原本就會吃的餐食差額', '工作才需要的網路升級、耗材、設備攤提或共用工作空間', '公司核定且真正入帳的居家補助', '每個進公司日的交通、停車、通行與餐食差額', '月票、停車月租、服裝整理等不隨天數消失的固定費', '公司真正支付的通勤、供餐或辦公補助', '每日門到門來回分鐘與可設為 0 的個人時間價值'],
    formula: '全居家現金 = 工作日 ×（居家能源＋居家餐食＋其他每日增量）＋居家固定費 − 居家補助。全進公司現金 = 工作日 ×（通勤＋餐食增量＋其他每日成本）＋進公司固定費 − 辦公補助。混合現金依各自實際天數計算，再加仍存在的固定費。選擇性完整成本 = 混合現金＋進公司日 × 每日通勤小時 × 自訂時間價值。',
    workedExample: '22 個工作日，居家每日能源 NT$35、餐食 NT$90、其他 NT$15，固定費 NT$400，全居家為 NT$3,480。進公司每日交通 NT$180、餐食差額 NT$150、其他 NT$20，固定費 NT$1,200，全進公司 NT$8,900。14 天居家與 8 天進公司時兩邊固定費仍在，混合現金 NT$6,360；70 分鐘×8 天為 9.3 小時，以 NT$150/小時計算的選擇性完整成本為 NT$7,760。',
    sensitivity: [
      { scenario: '只看現金', input: '時間價值 NT$0', result: '混合成本 NT$6,360，9.3 小時仍顯示' },
      { scenario: '取消停車月租', input: '進公司固定費 NT$1,200 改 0', result: '全進公司 NT$7,700；混合 NT$5,160' },
      { scenario: '夏月冷氣增加', input: '居家能源每日 NT$35 改 NT$90', result: '全居家 NT$4,690；混合 NT$7,130' },
      { scenario: '每月只進公司 2 天', input: '居家 20 天、進公司 2 天', result: '混合現金 NT$5,100；選擇性完整 NT$5,450' },
    ],
    cta: { label: '用自己的居家、進公司與混合天數試算', href: '#wfh-commute-calculator' },
    limitations: ['台電電價有級距、季節與帳期，請用增量用電與真正邊際價格，不要把平均家庭帳單全部列入。', '勞動部居家工作職業安全衛生參考指引說明設備與風險管理方向，但不替個別契約創造固定補助金額。', '月票、停車位或網路方案可能在混合辦公仍完整收費，必須依能否取消或降級判斷。', '時間情境不是保證收入，也不是加班費或工資計算。'],
    sources: [
      { label: '勞動部 — 居家工作職業安全衛生參考指引', href: 'https://laws.mol.gov.tw/FLAW/PrintFLAWDOC01.aspx?flno=3&id=FL096766' },
      { label: '台電 — 住宅夏月與級距電價說明', href: 'https://hc1.taipower.com.tw/2289/2363/2388/2389/10732/normalPost' },
      { label: '台電 — 各類電價表及計算範例', href: 'https://hc2.taipower.com.tw/2289/2406/2437/51029/46920/50398/normalPost' },
      { label: '交通部運輸研究所 — 通勤與行車成本分類', href: 'https://www.iot.gov.tw/zh_tw/archive/pub/reports/-59902021' },
    ],
    lastVerified: '2026-07-19',
  },
};

export const repairReplaceGuides: Partial<Record<Locale, DecisionGuideContent>> = {
  en: {
    id: 'repair-replace-method', labels: labels.en,
    directAnswer: 'Repair when its expected cost per reliable month is below the net replacement cost per useful month, unless safety, warranty, parts or downtime overrides the math. Do not rely on a universal repair-cost percentage. In this example, repair costs an expected $418 over 36 months, or $11.61/month; replacement costs $1,250 net over 96 months, or $13.02/month. Repair is lower by $1.41/month and the current quote must stay near or below the $301 break-even level.',
    inputs: ['Written repair quote still avoidable', 'Reliable months the repaired item is expected to add', 'Low/base/high chance of the same or related failure recurring', 'Future cost if that failure occurs', 'Old item’s incremental monthly energy or operating cost versus replacement', 'Replacement out-the-door price with delivery, setup, tax, transfer or data migration', 'Real trade-in, salvage or resale offer for the current item', 'Useful months expected from a like-for-like replacement', 'Warranty, parts, recall, safety and downtime facts kept beside the calculation'],
    formula: 'Expected repair-path cost = quote + recurrence probability × recurrence cost + extra monthly energy × repaired-life months. Repair monthly equivalent = expected repair cost ÷ repaired-life months. Net replacement = purchase + required fees − current-item value. Replacement monthly equivalent = net replacement ÷ replacement-life months. Break-even quote = repaired-life months × replacement monthly equivalent − expected recurrence − energy penalty.',
    workedExample: 'A repair quote is $250 and is expected to add 36 months. A 20% recurrence chance on a $300 future repair adds $60; $3/month extra energy adds $108. Expected repair-path cost is $418, or $11.61/month. A $1,200 replacement plus $100 setup less $50 resale costs $1,250 over 96 months, or $13.02/month. Repair wins by $1.41/month; its quote break-even is about $301.',
    sensitivity: [{ scenario: 'Low recurrence', input: '5% instead of 20%', result: 'Repair $10.36/month' }, { scenario: 'Short repair life', input: '18 instead of 36 months', result: 'Repair $20.22/month; replacement wins' }, { scenario: 'No energy penalty', input: '$0 instead of $3/month', result: 'Repair $8.61/month' }, { scenario: 'Higher repair quote', input: '$350', result: 'Repair $14.39/month; replacement wins' }],
    cta: { label: 'Compare your written repair quote with replacement', href: '#repair-replace-calculator' },
    limitations: ['Probability and remaining life are user scenarios, not model-specific failure statistics.', 'Safety-critical failures, recalls, water/fire damage, unavailable parts or unreliable diagnosis can rule out repair regardless of monthly cost.', 'A car needs financing, insurance, downtime, resale and the condition of other systems; a phone needs data, battery, security-update and trade-in terms.', 'Already-paid nonrefundable diagnostic fees are sunk unless the choices treat them differently.'],
    sources: [{ label: 'FTC — read warranty repair, replacement and service-contract terms', href: 'https://consumer.ftc.gov/articles/warranties' }, { label: 'European Commission — repair obligations, parts and indicative prices', href: 'https://commission.europa.eu/law/law-topic/consumer-protection-law/directive-repair-goods_en' }, { label: 'CPSC — check recalls before continued use or repair', href: 'https://www.cpsc.gov/Recalls' }], lastVerified: '2026-07-19',
  },
  zh: {
    id: 'repair-replace-method', labels: labels.zh,
    directAnswer: '維修路徑的「每個可靠使用月期望成本」低於換新淨成本／新品可用月數時，維修才有成本優勢；安全、保固、零件或停用風險可以優先否決。不要套固定成數。此算例維修期望成本 NT$10,250、30 個月平均 NT$341.7；換新淨成本 NT$32,000、84 個月平均 NT$381，維修每月少約 NT$39.3，維修報價約 NT$7,179 是損益上限。',
    inputs: ['尚未支付且可選擇的書面維修報價', '修後合理預期可穩定使用月數', '依診斷設定的低／中／高再故障機率', '再故障時可能再付金額', '舊品相對新品每月多出的能源或運行費', '新品成交、運送、安裝、資料移轉、稅費或過戶', '可實現的舊品折抵、殘值或轉售報價', '同級新品合理預期使用月數', '保固、召回、零件、安全與停用時間'],
    formula: '維修期望成本 = 報價＋再故障機率×再故障支出＋每月多耗能源×修後月數。維修月成本 = 維修期望成本÷修後月數。換新淨成本 = 新品與必要費用−舊品可實現價值。換新月成本 = 換新淨成本÷新品月數。維修報價上限 = 修後月數×換新月成本−期望再故障−能源差。',
    workedExample: '維修 NT$6,000，預期延長 30 個月；25% 機率再花 NT$5,000，期望值 NT$1,250；每月多耗 NT$100，共 NT$3,000。維修路徑 NT$10,250，平均 NT$341.7/月。新品 NT$32,000 加 NT$1,000、扣 NT$1,000 折抵，84 個月平均 NT$381/月。維修每月少 NT$39.3，報價損益上限約 NT$7,179。',
    sensitivity: [{ scenario: '低再故障', input: '10% 而非 25%', result: '維修約 NT$316.7/月' }, { scenario: '只延長 15 個月', input: '其餘不變', result: '維修約 NT$583.3/月，換新較低' }, { scenario: '無能源差', input: '每月 NT$0', result: '維修約 NT$241.7/月' }, { scenario: '報價 NT$9,000', input: '其餘不變', result: '維修約 NT$441.7/月，換新較低' }],
    cta: { label: '用書面報價比較維修與換新', href: '#repair-replace-calculator' },
    limitations: ['再故障機率與剩餘壽命是使用者情境，不是系統捏造的型號統計。', '安全性故障、召回、泡水、火損、零件停產或診斷不明時，成本低也不代表適合維修。', '車輛需另算貸款、保險、停駛、殘值與其他老化系統；手機需另看資料、電池、安全更新與折抵條款。', '已付且兩方案都拿不回的檢測費是沉沒成本。'],
    sources: [{ label: '行政院消保處 — 手機送修應確認保固、費用與先報價同意', href: 'https://cpc.ey.gov.tw/Page/8644AFB8F5DCB8A3/286ce994-7f56-4290-8482-4c819dc863f0' }, { label: '經濟部公告《電器買賣定型化契約應記載及不得記載事項》（行政院網站全文：中文保證書、保固期間內的維修責任、送修三次未修復可請求返還價金或更換）', href: 'https://www.ey.gov.tw/File/622D89D9A3A1ADED' }, { label: '行政院消保處 — 永續消費與合理維修權益政策', href: 'https://cpc.ey.gov.tw/Page/77067C04C7989DA8' }], lastVerified: '2026-10-17',
  },
};

export const extendedWarrantyGuides: Partial<Record<Locale, DecisionGuideContent>> = {
  en: {
    id: 'extended-warranty-method', labels: labels.en,
    directAnswer: 'An extended warranty is financially favorable only when the contract price is below the expected repair cost it actually removes after deductibles, claim fees, exclusions, payout limits and existing coverage. Do not borrow a generic failure rate. In this scenario a $199 plan, 25% user-estimated failure chance, 80% claim approval, $600 repair, $75 deductible and $25 claim cost produces $105 expected plan payout but $249 total expected cost with the plan versus $150 self-funded. Self-funding is lower by $99; break-even failure probability is about 49.8%.',
    inputs: ['Full contract price, including financing cost if bundled into a loan', 'Failure probability during the non-overlapping coverage period, entered as low/base/high scenarios', 'Claim approval probability after every exclusion, maintenance rule and documentation requirement', 'Typical repair amount for a covered failure', 'Deductible per visit, item or claim', 'Shipping, diagnosis, travel, rental or other claim costs not reimbursed', 'Per-claim and aggregate payout caps', 'Manufacturer warranty, card benefits, retailer rights and home/auto insurance that may duplicate coverage', 'Cancellation, transfer, provider solvency and repair-network terms'],
    formula: 'Plan payout on an approved failure = min(payout cap, max(0, repair cost − deductible)). Expected self-funded cost = failure probability × repair cost. Expected cost with plan = plan price + failure probability × [approval probability × (repair cost − plan payout + claim costs) + denial probability × repair cost]. Net plan value = self-funded expected cost − plan expected cost. Break-even failure probability = plan price ÷ [approval probability × (plan payout − claim costs)].',
    workedExample: 'Plan price $199; failure chance 25%; approval 80%; repair $600; deductible $75; claim cost $25; cap $1,000. Approved payout is $525 and expected payout is $105. Self-funding is $150 expected. With the plan, expected total cost is $199 + 25% × [80% × $100 + 20% × $600] = $249. Self-funding is lower by $99. The plan needs about a 49.8% failure chance to break even under these assumptions.',
    sensitivity: [{ scenario: 'Low failure', input: '10% instead of 25%', result: 'Plan net value −$159' }, { scenario: 'Break-even failure', input: '49.8%', result: 'Plan and self-funding roughly equal' }, { scenario: 'More exclusions', input: '50% approval', result: 'Break-even failure about 79.6%' }, { scenario: 'No deductible or claim cost', input: '$0 and $0', result: 'Break-even failure about 41.5%' }],
    cta: { label: 'Test your contract’s exclusions and deductible', href: '#extended-warranty-calculator' },
    limitations: ['The calculator does not supply a model failure rate; use documented model history or deliberately wide scenarios.', 'One representative failure is modeled. Multiple claims, replacement-only benefits, depreciation schedules and aggregate limits need separate scenarios.', 'Risk tolerance and cash-flow protection can matter even when expected value is negative, but they do not make the expected-value result positive.', 'A service contract can duplicate a manufacturer warranty or other benefit and can be administered by a third party.'],
    sources: [{ label: 'FTC — extended-warranty costs, deductibles, exclusions, limits and claims', href: 'https://consumer.ftc.gov/articles/extended-warranties-and-service-contracts' }, { label: 'FTC — auto service contracts are not federal warranties and can duplicate coverage', href: 'https://consumer.ftc.gov/consumer-alerts/2023/03/what-know-about-auto-service-contracts-extended-warranty-scams' }, { label: 'FTC — used-car service contract questions and cancellation terms', href: 'https://consumer.ftc.gov/articles/buying-used-car-dealer' }], lastVerified: '2026-07-19',
  },
  zh: {
    id: 'extended-warranty-method', labels: labels.zh,
    directAnswer: '延長保固只有在「保單／服務契約價格」低於扣除自負額、申請費、除外、上限與既有保固重疊後真正省下的期望維修費時，才有正期望值。不要捏造商品故障率。此情境方案 NT$3,990、期間故障 30%、核准 75%、維修 NT$12,000、自負額 NT$1,000、申請成本 NT$300，期望給付 NT$2,475；買方案期望總成本 NT$5,182.5，自行準備維修金 NT$3,600，後者少 NT$1,582.5，損益故障率約 49.7%。',
    inputs: ['方案完整價格；若併入分期還要計入融資成本', '扣除原廠／法定保固重疊後期間的低／中／高故障機率', '讀完除外、保養與文件條件後的理賠／履約核准率', '一次符合保障故障的代表性維修金額', '每次、每件或每個維修據點的自負額', '檢測、寄送、到府、交通或代用設備等未補償成本', '單次與累計給付／維修上限', '原廠保固、信用卡權益、業者品質保證及其他保險重疊', '終止退費、移轉、維修網、履約業者與文件期限'],
    formula: '核准時方案給付 = min(給付上限, max(0, 維修費−自負額))。自行準備期望成本 = 故障機率×維修費。買方案期望總成本 = 方案價格＋故障機率×[核准率×(維修費−方案給付＋申請成本)＋拒絕率×維修費]。方案淨值 = 自行準備期望成本−買方案期望總成本。損益故障率 = 方案價格÷[核准率×(方案給付−申請成本)]。',
    workedExample: '方案 NT$3,990；故障 30%；核准 75%；維修 NT$12,000；自負額 NT$1,000；申請成本 NT$300；上限 NT$15,000。核准給付 NT$11,000，期望給付 NT$2,475。自行準備期望 NT$3,600；買方案期望為 NT$3,990＋30%×[75%×NT$1,300＋25%×NT$12,000] = NT$5,182.5。自行準備少 NT$1,582.5；損益故障率約 49.7%。',
    sensitivity: [{ scenario: '低故障', input: '15% 而非 30%', result: '方案淨值約 −NT$2,786.3' }, { scenario: '損益故障率', input: '49.7%', result: '兩方案期望成本約相同' }, { scenario: '除外較多', input: '核准率 50%', result: '損益故障率約 74.6%' }, { scenario: '零自負額與申請費', input: '都為 NT$0', result: '損益故障率約 44.3%' }],
    cta: { label: '把合約除外與自負額放進試算', href: '#extended-warranty-calculator' },
    limitations: ['計算器不提供特定型號故障率；找不到可靠資料時應使用寬幅情境。', '模型以一次代表性故障計算，多次維修、折舊換機、累計上限與耗材另做情境。', '負期望值仍可能換得現金流穩定，但不能把風險偏好說成方案會賺。', '業者品質保證、原廠保固與付費延長服務是不同承諾，先確認實際義務人。'],
    sources: [{ label: '行政院消保處 — 品質保證為獨立擔保，業者應依內容負責（引消費者保護法第 25 條與施行細則第 26 條）', href: 'https://cpc.ey.gov.tw/Page/CCE4BC34D558A28A/c96be4f9-f94d-4f5f-89a8-0ebe7dc0fda0' }, { label: '行政院消保會 — 電子商務應揭露總價、保固、售後、終止與經常費用', href: 'https://cpc.ey.gov.tw/Page/960E744883E6A75D' }, { label: '行政院消保處 — 倡導合理保固年限、可修復資訊與多元維修', href: 'https://cpc.ey.gov.tw/Page/77067C04C7989DA8' }, { label: '全國法規資料庫 — 消費者保護法（第 25 條 書面保證書）、施行細則（第 26 條）與民法（第 354、356、359、365 條 瑕疵擔保）', href: 'https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=J0170001' }, { label: '經濟部公告《電器買賣定型化契約應記載及不得記載事項》（行政院網站全文）', href: 'https://www.ey.gov.tw/File/622D89D9A3A1ADED' }], lastVerified: '2026-10-17',
  },
};

export const phoneUpgradeGuides: Partial<Record<Locale, DecisionGuideContent>> = {
  en: {
    id: 'phone-keep-upgrade-method', labels: labels.en,
    directAnswer: 'Keep the current phone when its repair cost, remaining value loss and present service plan produce a lower normalized monthly cost than the net upgrade price plus the new plan. In this example, repairing for $200 and using the phone 18 more months costs $53.33 per month including service; a $999 phone with fees, transfer, $250 trade-in, later resale and a higher plan costs $69.69 per month over 36 months. Keeping is lower by $16.36 per month. The upgrade would need about $839 of trade-in value to break even under these inputs.',
    inputs: ['Repair quote and any diagnosis, shipping or temporary-phone cost', 'Realistic remaining usable months after repair, not the original design life', 'Expected resale or recycling value of the current phone after keeping it', 'Guaranteed trade-in value today and every condition, return and timing requirement', 'New phone out-the-door price after tax and mandatory charges', 'Activation, accessories, protection or financing fees that exist only after upgrading', 'Paid or time-valued data backup, transfer, authentication reset and setup work', 'Current and replacement monthly service-plan prices on the same data/tax basis', 'Expected new-phone holding months and conservative resale value at the end'],
    formula: 'Keep device cost per month = (repair cost − current-phone resale after keeping) ÷ remaining usable months. Upgrade device cost per month = (new-phone price + upgrade fees + data-transfer cost − trade-in today − new-phone resale later) ÷ new holding months. Add each service plan to get full monthly cost. Break-even trade-in = new-phone price + fees + transfer − later resale − new holding months × (keep full monthly cost − new plan monthly cost).',
    workedExample: 'Repair $200; 18 remaining months; current phone resale later $50; current plan $45/month. Keep device cost is ($200−$50)÷18 = $8.33 and full monthly cost is $53.33. New phone $999, fees $50, transfer $30, trade-in $250, later resale $300, new plan $55 and 36-month hold. Upgrade device cost is $529÷36 = $14.69 and full monthly cost is $69.69. Keeping is lower by $16.36/month; break-even trade-in is about $839.',
    sensitivity: [{ scenario: 'No repair needed', input: 'Repair falls from $200 to $0', result: 'Keep full cost $42.22/month' }, { scenario: 'Short remaining life', input: '18 months falls to nine', result: 'Keep full cost $61.67/month' }, { scenario: 'Same service plan', input: 'New plan $55 falls to $45', result: 'Upgrade full cost $59.69/month' }, { scenario: 'Higher trade-in', input: '$250 rises to $600', result: 'Upgrade full cost $59.97/month' }],
    cta: { label: 'Compare repair, trade-in and both phone plans', href: '#phone-keep-upgrade-calculator' },
    limitations: ['The two options can have different holding periods, so the model normalizes cost per month. It does not predict the exact date either phone will fail.', 'Trade-in quotes can fall after inspection and may be bill credits spread over many months. Enter the guaranteed economic value you will actually keep.', 'Service plans must be compared on the same basis, including taxes, autopay rules, device credits and early-exit consequences.', 'Performance, camera, security updates, accessibility and safety can justify an upgrade but need an explicit nonfinancial decision.'],
    sources: [{ label: 'FTC — back up, remove SIM or storage, reset and disconnect accounts before trading a phone', href: 'https://consumer.ftc.gov/consumer-alerts/2019/11/upgrading-your-phone-4-things-you-should-do-first' }, { label: 'FCC — handset unlocking and financing commitments', href: 'https://docs.fcc.gov/public/attachments/FCC-24-77A1_Rcd.pdf' }], lastVerified: '2026-07-19',
  },
  zh: {
    id: 'phone-keep-upgrade-method', labels: labels.zh,
    directAnswer: '手機該修還是換，應把維修後可再用月數、舊機晚點殘值，與新機實付價、舊機折抵、換機費用、資料移轉及資費差額全部換算成每月成本。此情境維修 NT$4,500、再用 18 個月、之後舊機值 NT$1,000，加現行月租後為每月 NT$793.4；換 NT$30,000 新機並計入費用、移轉、NT$6,000 折抵、三年後殘值與較高資費後為每月 NT$1,293.4。續用每月少 NT$500。',
    inputs: ['維修報價、檢測費、寄送與備用機成本', '維修後保守估計可再安全使用的月數', '續用到期後舊機可實現的二手或回收價值', '現在舊換新的確定折抵額，以及外觀、功能、期限與門號條件', '新機含稅、必要配件與不得取消費用的完整實付價', '啟用、保護、分期、提早解約或方案綁定成本', '備份、資料移轉、雙重驗證與應用程式重設的現金或時間成本', '現行與新方案相同流量及稅費基礎下的月租', '預計持有新機月數與期末保守二手價'],
    formula: '續用設備月成本 =（維修費−續用後舊機殘值）÷剩餘使用月數。換機設備月成本 =（新機價＋換機費＋資料移轉−立即折抵−新機期末殘值）÷新機持有月數。各自再加月租得到完整月成本。損益折抵額 = 新機價＋換機費＋移轉−期末殘值−新機月數×（續用完整月成本−新資費月租）。',
    workedExample: '維修 NT$4,500，可再用 18 個月，之後殘值 NT$1,000，現行月租 NT$599。設備月成本為 NT$194.4，完整月成本 NT$793.4。新機 NT$30,000、費用 NT$1,000、資料移轉 NT$800、立即折抵 NT$6,000、36 個月後殘值 NT$8,000、新月租 NT$799；設備月成本 NT$494.4，完整月成本 NT$1,293.4。續用每月少 NT$500。',
    sensitivity: [{ scenario: '不需維修', input: '維修 NT$4,500 改 0', result: '續用完整月成本 NT$543.4' }, { scenario: '只再用九個月', input: '18 個月改九個月', result: '續用完整月成本 NT$987.9' }, { scenario: '資費不變', input: '新月租 NT$799 改 NT$599', result: '換機完整月成本 NT$1,093.4' }, { scenario: '折抵提高', input: 'NT$6,000 改 NT$12,000', result: '換機完整月成本 NT$1,126.8' }],
    cta: { label: '比較維修、折抵、資料移轉與兩種資費', href: '#phone-keep-upgrade-calculator' },
    limitations: ['兩方案持有期可能不同，工具以每月正規化比較，不能預測手機確切故障日期。', '折抵可能經檢測調降或分月回饋；只填真正可保留且不因提前離開而失去的價值。', '維修前先確認保固、檢測費、零件、資料與報價同意（行政院消保處的送修注意事項）。', '資費與折抵條件以業者的書面說明為準，本頁不內建任何業者的價格。', '安全更新停止、無障礙需求或工作必要功能可能凌駕純金額結果。'],
    sources: [{ label: '行政院消保處 — 手機送修前備份、IMEI、個資、保固與報價同意', href: 'https://cpc.ey.gov.tw/Page/8644AFB8F5DCB8A3/286ce994-7f56-4290-8482-4c819dc863f0' }], lastVerified: '2026-10-17',
  },
};

export const appliancePaybackGuides: Partial<Record<Locale, DecisionGuideContent>> = {
  en: {
    id: 'appliance-payback-method', labels: labels.en,
    directAnswer: 'An efficient appliance pays back only when its net price premium is recovered by energy savings within the years you realistically expect to keep it. Use the two labels’ kWh on the same test basis, your marginal electricity rate and your use frequency. In this washer scenario, the efficient model costs $300 more but receives a $50 rebate. Saving 0.6 kWh across 250 cycles at $0.18/kWh saves $27/year; the $250 premium pays back in 9.26 years and produces only $20 net saving over ten years.',
    inputs: ['Standard and efficient out-the-door prices for equal capacity and features', 'Rebate or tax benefit that is current, eligible and actually claimable', 'Difference in labelled kWh per cycle or per year on the same test basis', 'Cycles or uses per year; use one annual cycle when entering an annual kWh difference', 'Marginal electricity price, not the whole-bill average when rates are tiered', 'Expected years kept before sale, failure or household move', 'Water, fuel, maintenance and installation differences in a separate scenario', 'Financing cost and any rebate timing'],
    formula: 'Net efficient premium = max(0, efficient price−standard price−eligible rebate). Annual energy saving = kWh difference per use×uses per year×electricity rate. Simple payback years = net premium÷annual energy saving. Lifetime net saving = annual energy saving×years kept−net premium. If label units differ, convert them before calculating.',
    workedExample: 'Standard washer $700; efficient washer $1,000; eligible rebate $50; difference 0.6 kWh/cycle; 250 cycles/year; electricity $0.18/kWh; ten-year hold. Premium = $250. Annual saving = 0.6×250×$0.18 = $27. Payback = 9.26 years. Ten-year net saving = $270−$250 = $20.',
    sensitivity: [{ scenario: 'Low use', input: '150 instead of 250 cycles', result: '$16.20/year; 15.43-year payback' }, { scenario: 'Higher marginal rate', input: '$0.30 instead of $0.18/kWh', result: '$45/year; 5.56-year payback' }, { scenario: 'No rebate', input: '$50 becomes $0', result: '11.11-year payback' }, { scenario: 'Six-year hold', input: 'Ten years becomes six', result: '−$88 lifetime net saving' }],
    cta: { label: 'Calculate payback from your labels and utility rate', href: '#appliance-payback-calculator' },
    limitations: ['EnergyGuide estimates use standardized assumptions; your cost changes with utility rate and use.', 'Compare equal capacity, cycle and performance. A larger model can use more total energy despite a better efficiency class.', 'Simple payback ignores discounting and uncertainty. Run short-life and high/low-rate cases.', 'Do not count an expired, geographically unavailable or tax-ineligible incentive.'],
    sources: [{ label: 'US Department of Energy — EnergyGuide supports meaningful annual operating-cost comparisons', href: 'https://www.energy.gov/topics/affordable-energy-consumers' }, { label: 'ENERGY STAR — savings calculators use location and equipment inputs', href: 'https://www.energystar.gov/products/heating_cooling/guide/savings-calculator/standalone' }, { label: 'DOE Energy Saver — actual cost depends on utility rates and use', href: 'https://www.energy.gov/sites/default/files/2022-08/energy-saver-guide-2022.pdf' }], lastVerified: '2026-07-19',
  },
  zh: {
    id: 'appliance-payback-method', labels: labels.zh,
    directAnswer: '節能家電是否回本，要用同一測試基準的耗電差、家庭實際使用頻率與邊際電價，判斷節能機種的淨價差能否在預計持有期內收回。此洗衣機情境高效率機種多 NT$6,000、真正可領補助 NT$2,000，每次少 0.6 度、每年 250 次、每度 NT$3.5，年省 NT$525；淨價差 NT$4,000 約 7.62 年回本，十年淨省 NT$1,250。',
    inputs: ['同容量、功能與安裝條件下的一般及節能機種完整實付價', '目前有效、確定符合資格且能實領的補助或退稅', '同一標示／測試基準的每次或每年耗電量差', '家庭每年實際運轉次數；若直接填年耗電差則次數填 1', '依台電級距與季節估計的增量邊際電價', '預計安全持有年數，而非保固或廣告年限', '用水、瓦斯、耗材、維護與安裝差額另做情境', '分期利息與補助入帳時間'],
    formula: '節能淨價差 = max(0, 節能機價−一般機價−合格補助)。年節電金額 = 每次耗電差×每年次數×每度邊際電價。簡單回本年數 = 淨價差÷年節電。持有期淨節省 = 年節電×持有年數−淨價差。不同標示單位必須先換成同一基準。',
    workedExample: '一般洗衣機 NT$18,000、節能機 NT$24,000、合格補助 NT$2,000；每次少 0.6 度、每年 250 次、每度 NT$3.5、持有十年。淨價差 NT$4,000；年省 0.6×250×NT$3.5 = NT$525；回本 7.62 年；十年淨省 NT$1,250。',
    sensitivity: [{ scenario: '低頻使用', input: '250 次改 150 次', result: '年省 NT$315；12.7 年回本' }, { scenario: '較高邊際電價', input: '每度 NT$5', result: '年省 NT$750；5.33 年回本' }, { scenario: '沒有補助', input: '補助 NT$2,000 改 0', result: '11.43 年回本' }, { scenario: '只持有六年', input: '十年改六年', result: '持有期淨值 −NT$850' }],
    cta: { label: '用能源標示、使用次數與台電邊際電價試算', href: '#appliance-payback-calculator' },
    limitations: ['節能標章與能源效率分級不是同一個價格承諾；以特定型號登錄資料與有效日期為準。', '台電有季節、級距與帳期，應估新增或省下那一度的邊際價格。', '容量、洗淨、乾燥、噪音與使用模式不同時，標示耗電不能直接硬比。', '補助可能已廢止或有期間與品項限制，不得沿用過期金額。'],
    sources: [{ label: '經濟部能源署 — 節能標章產品登錄含年耗電量與效率資料', href: 'https://service.moea.gov.tw/EE501/content?pid=899C55A9D9D94E91A8D26E2C27163F21' }, { label: '經濟部 — 洗衣機節能標章能源效率測試與標示方法', href: 'https://law.moea.gov.tw/LawContent.aspx?id=FL038553' }, { label: '台電 — 住宅夏月與級距電價說明', href: 'https://hc1.taipower.com.tw/2289/2363/2388/2389/10732/normalPost' }], lastVerified: '2026-07-19',
  },
};

export const costPerUseGuides: Partial<Record<Locale, DecisionGuideContent>> = {
  en: {
    id: 'cost-per-use-method', labels: labels.en,
    directAnswer: 'An expensive item is worth buying only if its net ownership cost divided by realistic uses is below the best alternative per use. Include maintenance, consumables and resale, then replace expected uses with actual uses after purchase. In this scenario, $2,500 purchase + $300 maintenance + $200 consumables − $800 resale = $2,200 net. At 500 expected uses it looks like $4.40/use, but at 200 actual uses it is $11/use, above an $8 rental or service alternative. It needs 275 uses to break even.',
    inputs: ['Out-the-door purchase price and financing cost', 'Scheduled maintenance, repair reserve and mandatory service', 'Consumables needed because the item is owned', 'Conservative resale value net of platform, shipping and refurbishment fees', 'Expected uses based on calendar and behavior, not aspiration', 'Actual uses tracked after purchase', 'Comparable rental, membership, service or borrowing cost per use', 'Capacity, quality, availability and travel differences between owning and the alternative'],
    formula: 'Net ownership cost = purchase + maintenance + consumables − net resale. Expected cost per use = net ownership cost÷expected uses. Actual cost per use = net ownership cost÷actual uses. Break-even uses = net ownership cost÷alternative cost per use. Keep purchase price and future variable costs separate when use changes them.',
    workedExample: 'Purchase $2,500, maintenance $300, consumables $200, resale $800: net $2,200. At 500 expected uses, $4.40/use. At 200 actual uses, $11/use. An $8 alternative costs less at current use. Break-even is $2,200÷$8 = 275 uses.',
    sensitivity: [{ scenario: 'Resale disappoints', input: '$800 becomes $400', result: '$13/use at 200 uses; break-even 325' }, { scenario: 'High use', input: '200 becomes 400 uses', result: '$5.50/use; ownership wins' }, { scenario: 'Maintenance doubles', input: '$300 becomes $600', result: '$12.50/use at 200 uses' }, { scenario: 'Cheaper alternative', input: '$8 becomes $6/use', result: 'Break-even 366.7 uses' }],
    cta: { label: 'Calculate expected, actual and break-even uses', href: '#cost-per-use-calculator' },
    limitations: ['Expected uses are vulnerable to optimism. Use a calendar-based base case and a low-use case.', 'Resale is uncertain and must be net of selling costs and condition deductions.', 'Quality, availability, privacy, learning and convenience can differ; document them rather than turning them into hidden dollars.', 'Past cost is sunk after purchase. For a keep-or-sell decision, compare only future cash flows and current resale.'],
    sources: [{ label: 'FTC — warranties and service contracts include maintenance, fees and transfer limits', href: 'https://consumer.ftc.gov/articles/extended-warranties-and-service-contracts' }, { label: 'FTC — marketplace condition, shipping, returns and seller terms', href: 'https://consumer.ftc.gov/articles/buying-online-marketplace' }], lastVerified: '2026-07-19',
  },
  zh: {
    id: 'cost-per-use-method', labels: labels.zh,
    directAnswer: '高價物品是否值得買，應把完整購買、維護與耗材成本扣掉保守淨轉售，再除以真實使用次數，與租用、共享或服務替代價比較。此情境 NT$60,000 購買＋NT$8,000 維護＋NT$4,000 耗材−NT$15,000 淨轉售 = NT$57,000；原估 600 次看似每次 NT$95，實際 200 次為 NT$285，仍略低於每次 NT$300 替代方案；至少使用 190 次才打平。',
    inputs: ['含稅、運送、安裝與分期成本的完整購買價', '定期保養、維修準備金與必要服務', '因持有而產生的耗材', '扣除平台、寄送、整理與議價後的保守淨轉售', '用行事曆與既有行為估計的預期使用次數', '購買後持續記錄的實際使用次數', '同品質租用、共享、課程或服務的每次替代成本', '可用性、交通、隱私、品質與時間差異另列'],
    formula: '持有淨成本 = 購買＋維護＋耗材−淨轉售。預期每次成本 = 持有淨成本÷預期次數。實際每次成本 = 持有淨成本÷實際次數。損益使用次數 = 持有淨成本÷替代方案每次成本。會隨使用量增加的耗材不可當固定成本。',
    workedExample: '購買 NT$60,000、維護 NT$8,000、耗材 NT$4,000、淨轉售 NT$15,000，淨成本 NT$57,000。預期 600 次為 NT$95／次；實際 200 次為 NT$285／次。替代方案 NT$300／次，持有目前每次少 NT$15；損益點 190 次。',
    sensitivity: [{ scenario: '轉售下降', input: 'NT$15,000 改 NT$8,000', result: '200 次時 NT$320／次，轉為替代較省' }, { scenario: '只用 100 次', input: '200 改 100', result: 'NT$570／次' }, { scenario: '維護增加', input: 'NT$8,000 改 NT$15,000', result: 'NT$320／次' }, { scenario: '替代價 NT$200', input: 'NT$300 改 NT$200', result: '損益 285 次' }],
    cta: { label: '計算預期、實際與損益使用次數', href: '#cost-per-use-calculator' },
    limitations: ['預期次數容易受「買了就會常用」偏誤影響，至少要有低使用情境。', '轉售必須扣除平台費、運送、整新、時間與檢測折價。', '品質、隱私、學習曲線與便利不能假裝成精準現金，應另外寫出判斷。', '買後成本已沉沒；是否繼續持有應改比未來費用與現在可賣價格。'],
    sources: [{ label: '行政院消保會 — 電商應揭露總價、品質保證、保固與售後服務', href: 'https://cpc.ey.gov.tw/Page/960E744883E6A75D' }, { label: '行政院消保會 — 鼓勵耐用、可維修、可升級與共享使用', href: 'https://cpc.ey.gov.tw/File/D8F44455EA1584C6?A=C' }], lastVerified: '2026-07-19',
  },
};

export const bulkBuyingGuides: Partial<Record<Locale, DecisionGuideContent>> = {
  en: {
    id: 'bulk-buying-effective-unit-cost', labels: labels.en,
    directAnswer: 'A bulk pack is cheaper only when its effective unit cost is lower after spoilage, expiry, membership, delivery and storage. Compare usable quantity, not label quantity. In this scenario a small pack costs $5 for 1 unit with 5% waste, or $5.26 per usable unit. A 10-unit bulk pack costs $40, but 15% waste plus $2 allocated membership and $1 storage makes it $43÷8.5 = $5.06 per usable unit. Bulk saves only $1.76 across the usable 8.5 units; at 25% waste it rises to $5.73 and loses.',
    inputs: ['Small-pack final price and net quantity in one consistent unit', 'Realistic small-pack waste or spoilage percentage', 'Bulk-pack final price and quantity', 'Bulk waste based on consumption rate before use-by or quality loss', 'Only the share of membership fee caused by or allocated to this purchase', 'Delivery, handling and minimum-order cost not shared with the small option', 'Extra containers, freezer space, electricity or paid storage', 'Whether the package can be split safely without changing storage instructions'],
    formula: 'Usable quantity = label quantity×(1−waste%). Effective unit cost = (price+allocated membership+shipping+storage)÷usable quantity. Bulk savings for the bulk usable quantity = small effective unit cost×bulk usable quantity−bulk total cost. Use the same weight, volume or count on both sides.',
    workedExample: 'Small: $5÷(1×95%) = $5.26 per usable unit. Bulk: ($40+$2 membership+$1 storage)÷(10×85%) = $5.06. Buying the same 8.5 usable units in small packs would cost $44.74, so bulk saves $1.76—not the $10 suggested by sticker unit prices.',
    sensitivity: [{ scenario: 'Bulk waste reaches 25%', input: '15% becomes 25%', result: '$5.73 per usable unit; small pack wins' }, { scenario: 'Membership is already sunk', input: '$2 allocation becomes $0', result: '$4.82 per usable unit; bulk saves $3.74' }, { scenario: 'Need paid delivery', input: 'Add $8 shipping', result: '$6.00 per usable unit; small pack wins' }, { scenario: 'Household uses all 10 units', input: '15% waste becomes 0%', result: '$4.30 per unit; bulk saves $9.63' }],
    cta: { label: 'Compare effective unit cost and waste', href: '#bulk-buy-calculator' },
    limitations: ['Waste is a behavior and storage estimate, not a universal product rate; test a higher-waste case.', 'Do not treat a full annual membership as caused by one item if it would be paid anyway; allocate consistently.', 'Use-by dates and storage directions are safety constraints, not variables to extend for a cheaper result.', 'Cash tied up, transport effort and unavailable storage may matter even when the arithmetic favors bulk.'],
    sources: [{ label: 'FoodSafety.gov — FoodKeeper storage guidance by food and beverage', href: 'https://www.foodsafety.gov/keep-food-safe/foodkeeper-app' }, { label: 'FoodSafety.gov — cold storage and safe shopping guidance', href: 'https://www.foodsafety.gov/people-at-risk' }], lastVerified: '2026-07-19',
  },
  zh: {
    id: 'bulk-buying-effective-unit-cost', labels: labels.zh,
    directAnswer: '大包裝只有在「可實際用完的有效單價」較低時才省。必須把耗損、有效日期、會員分攤、運費與額外保存成本算進分子，用可用數量而非標示數量當分母。此情境小包 NT$120、耗損 5%，每可用單位 NT$126.32；大包 10 單位 NT$900、耗損 20%，另加會員分攤 NT$60 與保存 NT$40，為 NT$1,000÷8 = NT$125。大包總共只省 NT$10.53；耗損升到 25% 就變 NT$133.33，反而較貴。',
    inputs: ['小包含稅最終價與相同單位的淨重、容量或數量', '小包實際耗損或未用完比例', '大包含稅最終價與標示數量', '依家庭消耗速度與有效日期估的大包耗損', '這次購買合理分攤的會員費，不把整年一律塞進單品', '未與其他採買共用的運費、低消與處理費', '分裝容器、冷凍／冷藏空間、電費或付費倉儲', '開封後保存條件及是否能安全分裝'],
    formula: '可用數量 = 標示數量×（1−耗損率）。有效單價 =（商品價＋會員分攤＋運費＋保存成本）÷可用數量。大包總節省 = 小包有效單價×大包可用數量−大包總成本。兩邊必須換成同一重量、容量或件數。',
    workedExample: '小包：NT$120÷（1×95%）= 每可用單位 NT$126.32。大包：（NT$900+NT$60+NT$40）÷（10×80%）= NT$125。若用小包取得相同 8 個可用單位需 NT$1,010.53，所以大包只省 NT$10.53，不是標價看起來的 NT$300。',
    sensitivity: [{ scenario: '大包耗損 25%', input: '20% 改 25%', result: '每可用單位 NT$133.33，小包較省' }, { scenario: '會員費本來就會繳', input: '分攤 NT$60 改 NT$0', result: '每可用單位 NT$117.50，大包省 NT$70.53' }, { scenario: '另付運費 NT$100', input: '運費 0 改 NT$100', result: '每可用單位 NT$137.50，小包較省' }, { scenario: '全部用完', input: '耗損 20% 改 0%', result: '每單位 NT$100，大包省 NT$263.16' }],
    cta: { label: '比較耗損後有效單價', href: '#bulk-buy-calculator' },
    limitations: ['耗損率要依家庭紀錄與保存能力估，不是商品固定屬性。', '會員費只採一致且可解釋的分攤方式；已決定續會的費用與因單品才入會不同。', '有效日期成立於指定保存條件；不可為了讓算式好看而自行延長。', '占用現金、搬運與冰箱空間即使不易定價，也應另列。'],
    sources: [{ label: '食藥署 2026 — 留意有效日期、依效期適量選購與按標示保存', href: 'https://www.fda.gov.tw/tc/PublishOtherEpaperContent.aspx?id=1601&r=943405802&tid=5487' }, { label: '食藥署 — 有效日期以特定儲存條件成立，並應檢查包裝完整', href: 'https://www.fda.gov.tw/tc/newsContent.aspx?cid=5049&id=23882' }], lastVerified: '2026-07-19',
  },
};

export const mealPrepGuides: Partial<Record<Locale, DecisionGuideContent>> = {
  en: {
    id: 'meal-prep-vs-takeout-cost', labels: labels.en,
    directAnswer: 'Compare meal prep and takeout per equivalent serving, including ingredient waste, batch extras, active planning and cooking time, delivery, tip, transport and ordering time. Here, $36 ingredients with 10% waste, $6 containers/energy and 2 hours valued at $18 total $81.60 for 8 servings, or $10.20 each. One comparable takeout meal costs $18 food + $4 delivery + $3 tip + 0.25 hour = $29.50. Across 12 meals, prep is $231.60 lower—but only if all eight servings are safely stored and eaten.',
    inputs: ['Ingredient checkout cost for the full batch', 'Unused ingredients and uneaten servings as a waste percentage', 'Oil, seasoning, containers, cooking energy and other batch extras', 'Active shopping, preparation, cooking and cleanup time', 'Personal time value shown separately from cash', 'Number of safe, comparable servings actually eaten', 'Takeout food price for the same meal quality and size', 'Delivery, service charge, tip, pickup transport and parking', 'Ordering, pickup and waiting time', 'Monthly frequency being compared'],
    formula: 'Home cost per serving = [ingredients×(1+waste%)+batch extras+home hours×time value]÷servings eaten. Takeout cost per serving = [food+delivery+tip+transport+takeout hours×time value]÷takeout servings. Monthly difference = (takeout per serving−home per serving)×compared meals.',
    workedExample: 'Home: [$36×1.10+$6+2×$18]÷8 = $10.20/serving. Takeout: [$18+$4+$3+$0+0.25×$18]÷1 = $29.50. Difference $19.30 each; for 12 comparable meals, $231.60. Cash-only home is $5.70 versus cash-only takeout $25, so keep time valuation visible rather than hiding it.',
    sensitivity: [{ scenario: 'Only four servings eaten', input: '8 becomes 4', result: '$20.40/home serving; still lower, much narrower' }, { scenario: 'Time valued at $40/hour', input: '$18 becomes $40', result: '$15.70 home vs $35 takeout' }, { scenario: 'Pickup with no delivery or tip', input: '$4 and $3 become $0', result: '$22.50 takeout; monthly gap $147.60' }, { scenario: 'Ingredient waste reaches 35%', input: '10% becomes 35%', result: '$11.33/home serving' }],
    cta: { label: 'Compare home and takeout per serving', href: '#meal-prep-calculator' },
    limitations: ['Compare equivalent portions and nutrition; a restaurant entrée and a small home portion are not one-for-one.', 'Time value is a scenario, not cash automatically earned by ordering takeout.', 'Servings discarded or kept beyond safe storage must not stay in the denominator.', 'Special equipment and reusable containers should be allocated over realistic uses, not charged forever or ignored.'],
    sources: [{ label: 'USDA FSIS — leftovers refrigerate 3–4 days or freeze, with safe cooling and reheating', href: 'https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety' }, { label: 'FoodSafety.gov — cooked leftovers, prompt refrigeration and cold-storage guidance', href: 'https://www.foodsafety.gov/people-at-risk' }], lastVerified: '2026-07-19',
  },
  zh: {
    id: 'meal-prep-vs-takeout-cost', labels: labels.zh,
    directAnswer: '自煮與外食要換成同品質每份成本，並同時列出食材耗損、批次耗材、主動採買／備餐／清洗時間，以及餐價、外送、交通與等待。此情境食材 NT$1,200、耗損 10%、容器能源 NT$200、3 小時以 NT$200 計，10 份共 NT$2,120，即每份 NT$212。外食餐 NT$250＋外送 NT$50＋等待 0.25 小時 NT$50 = NT$350。每月比較 20 餐，自煮低 NT$2,760；前提是 10 份都安全保存並吃完。',
    inputs: ['整批食材結帳金額', '未使用食材與未吃完份數的耗損率', '油、調味、容器、瓦斯／電與批次額外成本', '採買、分裝、烹調與清潔的主動時間', '另列的個人時間價值，不混成現金支出', '實際安全保存且吃完的同等份數', '同份量與品質的外食或外送餐價', '外送費、服務費、小費、取餐交通與停車', '下單、等候與取餐時間', '每月比較餐數'],
    formula: '自煮每份 = [食材×（1+耗損率）+批次額外成本+自煮時間×時間價值]÷實際吃完份數。外食每份 = [餐價+外送+小費+交通+等候時間×時間價值]÷外食份數。每月差額 =（外食每份−自煮每份）×比較餐數。',
    workedExample: '自煮：[NT$1,200 × 1.10 + NT$200 + 3 × NT$200] ÷ 10 = NT$212／份。外食：[NT$250 + NT$50 + NT$0 + NT$0 + 0.25 × NT$200] ÷ 1 = NT$350。每份差 NT$138，20 餐差 NT$2,760。只看現金時自煮 NT$152、外食 NT$300，應與含時間結果分開顯示。',
    sensitivity: [{ scenario: '只吃完 6 份', input: '10 改 6', result: '自煮 NT$353.33／份，外食轉為較低' }, { scenario: '時間價值 NT$400', input: 'NT$200 改 NT$400', result: '自煮 NT$272、外食 NT$400' }, { scenario: '自取免外送', input: '外送 NT$50 改 0', result: '外食 NT$300，每月差 NT$1,760' }, { scenario: '耗損 30%', input: '10% 改 30%', result: '自煮 NT$236／份' }],
    cta: { label: '比較自煮與外食每份成本', href: '#meal-prep-calculator' },
    limitations: ['份量、營養與品質要相近，不能用小份家常菜硬比大份餐廳餐。', '時間價值是情境成本，不代表叫外送就能實際多賺同額收入。', '未吃完或無法安全保存的份數不得保留在分母。', '批次備餐若超出冰箱容量，應減少份數或納入冷凍與容器成本。'],
    sources: [{ label: '食藥署 2026 — 大量備餐後 2 小時內冷藏／冷凍，復熱中心 70°C 以上', href: 'https://www.fda.gov.tw/TC/newsContent.aspx?cid=4&id=31422' }, { label: '食藥署 — 食品應充分加熱並在 2 小時內食用或冷藏冷凍', href: 'https://www.fda.gov.tw/tc/siteContent.aspx?sid=2572' }], lastVerified: '2026-07-19',
  },
};

export const reusableGuides: Partial<Record<Locale, DecisionGuideContent>> = {
  en: { id:'reusable-break-even',labels:labels.en,directAnswer:'A reusable item is financially cheaper only after its purchase cost has been spread over enough actual uses and its cleaning and consumables stay below the disposable cost per use. With a $25 reusable, $0.15 cleaning, $0.05 consumables and 100 uses, cost is $0.45/use versus $0.50 disposable. Break-even is $25÷($0.50−$0.20) = 83.33 uses. At 50 uses the reusable costs $0.70 and loses. This is a money calculation; it does not prove a broad environmental benefit.',inputs:['Reusable purchase and required accessories','Actual uses before loss, damage, hygiene retirement or replacement','Water, energy and cleaning-product cost per use','Filters, liners or other reusable-only consumables per use','Disposable item price per comparable use including delivery','Whether performance, capacity and hygiene instructions are comparable','Replacement parts and end-of-life value if material','Product-specific evidence for any environmental claim'],formula:'Reusable cost/use = [initial cost+uses×(cleaning/use+consumables/use)]÷uses. Disposable cost/use = delivered disposable price per use. Break-even uses = initial cost÷[disposable/use−reusable variable cost/use], only when disposable cost exceeds reusable variable cost.',workedExample:'Reusable: [$25+100×($0.15+$0.05)]÷100 = $0.45/use. Disposable: $0.50/use. Break-even: $25÷($0.50−$0.20) = 83.33 uses. At 50 uses, reusable = $0.70/use, so the planned lifetime—not the word reusable—decides the result.',sensitivity:[{scenario:'Only 50 uses',input:'100 becomes 50',result:'$0.70/use; disposable wins'},{scenario:'Cleaning doubles',input:'$0.15 becomes $0.30',result:'$0.60/use at 100; disposable wins'},{scenario:'Disposable price $0.35',input:'$0.50 becomes $0.35',result:'Break-even 166.67 uses'},{scenario:'200 uses',input:'100 becomes 200',result:'$0.33/use; reusable saves $35 total'}],cta:{label:'Calculate reusable break-even uses',href:'#reusable-calculator'},limitations:['Use actual, product-appropriate cleaning instructions rather than assuming zero cleaning cost.','Loss, damage or hygiene retirement can end the usable life before the design maximum.','A cheaper financial result does not establish lower emissions, waste or other environmental impact.','Do not compare different capacity, safety or performance as if each were one identical use.'],sources:[{label:'FTC Green Guides — broad environmental benefit claims require specific, reliable substantiation',href:'https://www.ftc.gov/business-guidance/resources/environmental-claims-summary-green-guides'},{label:'FTC consumer guidance — green marketing claims must be truthful and qualified',href:'https://consumer.ftc.gov/articles/eco-friendly-and-green-marketing-claims'}],lastVerified:'2026-07-19' },
  zh: { id:'reusable-break-even',labels:labels.zh,directAnswer:'重複使用用品只有在實際使用次數足以攤提初始成本，且每次清洗與耗材低於一次性單價時才回本。此情境購入 NT$600，每次清洗 NT$3、耗材 NT$2，實際 100 次為 NT$11／次；一次性用品 NT$12／次。損益點為 NT$600÷（NT$12−NT$5）= 85.71 次。若只用 50 次，重複用品為 NT$17／次而落敗。這是金錢模型，不代表已證明整體環境效益。',inputs:['重複用品購入價與必要配件','遺失、損壞、衛生汰換前的實際使用次數','每次水、電與清潔劑成本','濾芯、內襯等重複用品專屬耗材','相同容量與用途的一次性用品交付單價','清洗方式、容量、功能與衛生條件是否可比','零件更換與殘值（若顯著）','任何環境宣稱的產品別生命週期證據'],formula:'重複用品每次成本 = [初始成本+次數×（每次清洗+每次耗材）]÷次數。一次性每次成本 = 每次完整購入價。損益次數 = 初始成本÷（一次性每次−重複用品每次變動成本），僅在一次性單價高於變動成本時成立。',workedExample:'重複用品：[NT$600+100×（NT$3+NT$2）]÷100 = NT$11／次；一次性 NT$12／次。損益點 NT$600÷（NT$12−NT$5）= 85.71 次。若只用 50 次，則為 NT$17／次，證明「可重複」本身不是回本保證。',sensitivity:[{scenario:'只用 50 次',input:'100 改 50',result:'NT$17／次，一次性較省'},{scenario:'清洗升到 NT$6',input:'NT$3 改 NT$6',result:'100 次為 NT$14，一次性較省'},{scenario:'一次性只要 NT$9',input:'NT$12 改 NT$9',result:'損益 150 次'},{scenario:'使用 200 次',input:'100 改 200',result:'NT$8／次，累計省 NT$800'}],cta:{label:'計算重複使用真正回本次數',href:'#reusable-calculator'},limitations:['清洗成本要依商品與官方指示，不能假設為零。','遺失、損壞、衛生汰換可能讓實際壽命低於設計值。','金錢較省不等於整體碳排、用水或廢棄物必然較低。','容量、安全與效果不同的產品不可硬當同一次使用。'],sources:[{label:'環境部法規 — 循環杯定義為店家提供、可重複清洗使用的容器與杯蓋',href:'https://oaout.moenv.gov.tw/law/LawContent.aspx?id=GL007806'},{label:'環境部 — 一次用飲料杯與循環杯制度的官方定義',href:'https://hwms.moenv.gov.tw/dispUploadBox/PJ-EPATW/Files/2635.pdf'}],lastVerified:'2026-07-19' },
};

export const pricePerWearGuides: Partial<Record<Locale, DecisionGuideContent>> = {
  en: {
    id: 'price-per-wear', labels: labels.en,
    directAnswer: 'Price per wear is net ownership cost divided by actual wears: (purchase + care and repair − net resale) ÷ wears. A $120 jacket worn 80 times, with $0.80 care per wear and $20 net resale, costs ($120+$64−$20)÷80 = $2.05 per wear. A $2.50-per-wear alternative is cheaper until 58.82 wears, but more expensive after that. Count logged wears, not an aspirational wardrobe lifetime.',
    inputs: ['Purchase price after non-refundable discounts and delivery', 'Actual wears already logged or realistically planned', 'Cleaning cost per wear, including dry cleaning when required', 'Repairs, waterproofing, insoles and other maintenance', 'Net resale proceeds after platform fees, shipping and cleaning', 'A comparable alternative cost per wear', 'Fit, comfort, dress-code and weather constraints that limit use', 'Durability evidence such as seam, sole, fabric and care requirements'],
    formula: 'Price per wear = [purchase + care per wear × wears − net resale] ÷ wears. Break-even wears versus an alternative = (purchase − net resale) ÷ (alternative price per wear − care per wear), only when the alternative exceeds ongoing care.',
    workedExample: 'Jacket: [$120 + $0.80 × 80 − $20] ÷ 80 = $2.05/wear. Alternative: $2.50/wear. Break-even = ($120−$20) ÷ ($2.50−$0.80) = 58.82 wears. At only 40 wears, the jacket costs $3.30/wear and loses.',
    sensitivity: [{ scenario: 'Only 40 wears', input: '80 becomes 40', result: '$3.30/wear; alternative wins' }, { scenario: 'No resale', input: '$20 becomes $0', result: '$2.30/wear at 80' }, { scenario: 'Dry-clean care $2', input: '$0.80 becomes $2', result: '$3.25/wear at 80' }, { scenario: '120 wears', input: '80 becomes 120', result: '$1.63/wear' }],
    cta: { label: 'Calculate price per actual wear', href: '#price-per-wear-calculator' },
    limitations: ['Do not count a day when the item was packed, listed or merely owned as a wear.', 'Net resale is uncertain; use zero unless a realistic after-fee buyer market exists.', 'Care instructions can materially change ownership cost and useful life.', 'Compare equivalent warmth, safety, fit and occasion—not unrelated garments or shoes.'],
    sources: [{ label: 'FTC — clothing care instructions require a reasonable basis and cover the useful life', href: 'https://www.ftc.gov/business-guidance/resources/clothes-captioning-complying-care-labeling-rule' }, { label: 'FTC Care Labeling Rule — labels state regular care needed for ordinary use', href: 'https://www.ftc.gov/legal-library/browse/rules/care-labeling-textile-wearing-apparel-certain-piece-goods-text' }], lastVerified: '2026-07-19',
  },
  zh: {
    id: 'price-per-wear', labels: labels.zh,
    directAnswer: '每次穿著成本＝（購入價＋穿著期間清潔維護－實際淨轉售）÷實際穿著次數。外套購入 NT$3,000、每次清潔 NT$30、穿 60 次、扣除平台費與整理後淨售 NT$600，為（3,000＋1,800－600）÷60＝NT$70／次；替代方案 NT$100／次，損益約 34.29 次。若只穿 20 次則為 NT$150／次，不能用「預計穿很多年」代替真實次數。',
    inputs: ['折扣與不退運費後的實付購入價', '已記錄或有合理情境支持的實際穿著次數', '依洗標計算的水洗、烘乾或專業維護費', '修補、鞋底、鞋墊、防水與保養支出', '扣平台費、寄送與售前整理後的淨轉售', '同等用途替代品的每次成本', '尺寸、舒適、場合、季節與穿搭限制', '縫線、布料、鞋底與洗標所反映的耐用條件'],
    formula: '每次穿著成本＝[購入價＋每次維護×次數－淨轉售]÷實際穿著次數。相對替代方案損益次數＝（購入價－淨轉售）÷（替代方案每次成本－本品每次維護），僅在替代每次高於維護費時成立。',
    workedExample: '外套：[NT$3,000＋NT$30×60－NT$600]÷60＝NT$70／次。替代方案 NT$100／次。損益＝（3,000－600）÷（100－30）＝34.29 次。若只穿 20 次，成本升為 NT$150／次。',
    sensitivity: [{ scenario: '只穿 20 次', input: '60 改 20', result: 'NT$150／次，替代方案較省' }, { scenario: '賣不掉', input: '淨轉售 NT$600 改 0', result: 'NT$80／次' }, { scenario: '每次專業維護 NT$80', input: 'NT$30 改 NT$80', result: 'NT$120／次' }, { scenario: '穿 100 次', input: '60 改 100', result: 'NT$54／次' }],
    cta: { label: '計算衣鞋實際每次穿著成本', href: '#price-per-wear-calculator' },
    limitations: ['放在衣櫃、帶出門但沒穿，不算一次穿著。', '轉售價應扣平台費、運費與整理費；沒有可信市場就填零。', '台灣服飾標示含洗燙處理方法，清潔方式會改變成本與壽命。', '保暖、安全、尺寸與場合不同的衣鞋不可硬做同等比較。'],
    sources: [{ label: '經濟部服飾標示基準 — 應標纖維、尺寸及水洗／漂白／乾燥／熨燙／專業維護', href: 'https://law.moea.gov.tw/LawContent.aspx?id=GL000482' }, { label: '經濟部標準檢驗局 — 服飾標示與洗標制度', href: 'https://www.bsmi.gov.tw/wSite/ct?xItem=105514&ctNode=1510&mp=1' }], lastVerified: '2026-07-19',
  },
};

export const trueHourlyWageGuides: Partial<Record<Locale, DecisionGuideContent>> = {
  en: {
    id: 'true-hourly-wage', labels: labels.en,
    directAnswer: 'True hourly wage for a personal job decision is (take-home pay − unreimbursed work costs) ÷ (paid hours + unpaid work time + commuting time). For the same month, $4,000 gross and 160 paid hours advertise $25/hour, but $3,100 take-home minus $350 of commuting, required supplies and incremental work meals over 190 committed hours equals $14.47/hour. This is not the FLSA regular rate and does not decide what time an employer must pay.',
    inputs: ['Gross pay for one defined pay period', 'Actual take-home pay from the same paystub, not a generic tax estimate', 'Paid hours matching that pay period', 'Required pre-shift, post-shift, email, training or preparation time not already counted', 'Round-trip ordinary commute time for the same period', 'Unreimbursed transport, parking, tolls and required work travel', 'Required clothing, tools, licensing, phone or home-office cost after reimbursement', 'Incremental work-meal cost above what you would otherwise spend', 'A personal target hourly amount for the verdict'],
    formula: 'True take-home hourly = (take-home pay − unreimbursed work costs) ÷ (paid hours + unpaid work hours + commute hours). Headline gross hourly = gross pay ÷ paid hours. Use the same pay period throughout.',
    workedExample: 'Month: $4,000 gross ÷ 160 paid hours = $25 gross/hour. True: ($3,100 take-home − $350 costs) ÷ (160 paid + 10 unpaid + 20 commute) = $2,750 ÷ 190 = $14.47/hour. Against a personal $15 target, it falls short.',
    sensitivity: [{ scenario: 'Commute only 5 hours', input: '20 becomes 5', result: '$15.71/hour; clears $15 target' }, { scenario: 'Costs reimbursed down to $100', input: '$350 becomes $100', result: '$15.79/hour' }, { scenario: 'Unpaid work 25 hours', input: '10 becomes 25', result: '$13.41/hour' }, { scenario: 'Take-home $3,350', input: '$3,100 becomes $3,350', result: '$15.79/hour' }],
    cta: { label: 'Calculate true take-home hourly value', href: '#true-hourly-calculator' },
    limitations: ['This personal opportunity-cost denominator is not a legal wage or overtime calculation.', 'DOL says ordinary home-to-work travel is generally not FLSA work time, while travel between job sites can be work time.', 'If off-the-clock activity may be compensable, record it separately and seek official or legal guidance rather than treating nonpayment as settled.', 'Subtract only costs caused by the job and not reimbursed; use incremental meal cost, not the full cost of eating.'],
    sources: [{ label: 'U.S. Department of Labor Fact Sheet 22 — hours worked, off-the-clock activity and travel boundaries', href: 'https://www.dol.gov/agencies/whd/fact-sheets/22-flsa-hours-worked?lang=en' }, { label: 'IRS — gross pay is before deductions; net or take-home pay is after deductions', href: 'https://apps.irs.gov/app/understandingTaxes/hows/tax_tutorials/mod01/tt_mod01_03.jsp' }], lastVerified: '2026-07-19',
  },
  zh: {
    id: 'true-hourly-wage', labels: labels.zh,
    directAnswer: '個人求職比較用的真實時薪＝（同一期實領工資－未報銷工作成本）÷（有薪工時＋未納入工時的必要時間＋通勤時間）。月應發 NT$60,000、160 小時看似 NT$375／小時；同月實領 NT$52,000，扣 NT$5,000 通勤、必要用品與額外餐費，再除以 160＋8＋22＝190 小時，為 NT$247.37／小時。這不是勞基法加班或最低工資認定公式。',
    inputs: ['同一計薪期間的應發工資總額', '同一期薪資單的實際發給金額', '該期已計薪工時', '交接、信件、著裝、訓練或準備等必要時間', '同期間每日往返通勤總時數', '未報銷交通、停車、過路與公務移動成本', '未報銷的制服、工具、證照、手機與設備', '因工作增加的餐費差額，而非整餐價格', '自己的最低可接受真實時薪目標'],
    formula: '真實實領時薪＝（實際發給－未報銷工作成本）÷（有薪工時＋未計薪必要時間＋通勤）。表面稅前時薪＝應發工資÷有薪工時；所有數字必須是同一期。',
    workedExample: '月應發 NT$60,000÷160＝NT$375／小時。真實值＝（NT$52,000－NT$5,000）÷（160＋8＋22）＝NT$47,000÷190＝NT$247.37／小時，低於個人目標 NT$250。',
    sensitivity: [{ scenario: '通勤降到 10 小時', input: '22 改 10', result: 'NT$264.04／小時，超過目標' }, { scenario: '未報銷成本只剩 NT$2,000', input: 'NT$5,000 改 2,000', result: 'NT$263.16／小時' }, { scenario: '必要未計薪時間 20 小時', input: '8 改 20', result: 'NT$232.67／小時' }, { scenario: '實領 NT$55,000', input: 'NT$52,000 改 55,000', result: 'NT$263.16／小時' }],
    cta: { label: '計算通勤與支出後真實時薪', href: '#true-hourly-calculator' },
    limitations: ['這是個人時間與現金決策模型，不是法定工資、加班費或最低工資算法。', '勞動部把受雇主指揮監督、提供或等待提供勞務的時間定義為工作時間；疑似短付應另行保存證據。', '薪資單應區分議定總額、給付、扣除與實際發給；不要用網路平均扣除率代替本人數字。', '只扣工作造成且未獲報銷的增量支出，餐費只算相對平常吃飯多出的部分。'],
    sources: [{ label: '勞動部 — 工作時間為受雇主指揮監督下提供或等待提供勞務的時間；正常工時每日 8 小時、每週 40 小時（頁面更新日期 2025-12-24）', href: 'https://www.mol.gov.tw/1607/28162/28166/28218/28226/30382/post' }, { label: '勞動部 — 薪資單須列工資總額、各給付、扣除與實際發給金額', href: 'https://www.mol.gov.tw/1607/28690/2282/2284/2290/7168/post' }, { label: '勞動部 — 歷年最低工資：115 年 1 月 1 日起每月 29,500 元、每小時 196 元（114 年 10 月 21 日發布）', href: 'https://www.mol.gov.tw/1607/28162/28166/28180/70460/76761/76833/post' }, { label: '勞動部 — 何謂最低工資：月薪與時薪的適用對象，數額只含正常工作時間的工資（頁面更新日期 2026-04-21）', href: 'https://www.mol.gov.tw/1607/28690/2282/2284/2290/7121/post' }, { label: '全國法規資料庫 — 勞動基準法第 24 條（平日延長工時工資加給）', href: 'https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=24' }, { label: '全國法規資料庫 — 勞動基準法第 30 條（正常工時；雇主應置備出勤紀錄，逐日記載至分鐘，保存五年）', href: 'https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=N0030001&flno=30' }], lastVerified: '2026-10-17',
  },
};

export const raiseInflationGuides: Partial<Record<Locale, DecisionGuideContent>> = {
  en: {
    id: 'raise-inflation', labels: labels.en,
    directAnswer: 'A raise beats inflation only when (1 + raise rate) ÷ (1 + inflation rate) − 1 is positive. A $70,000 salary with a 4% raise becomes $72,800, but with 5% inflation its real change is 1.04÷1.05−1 = −0.95%; the new salary buys about what $69,333.33 bought before. Subtracting 5% from 4% gives a useful shortcut, but the ratio is the exact compounded result.',
    inputs: ['Old gross pay for one consistent annual, monthly or hourly period', 'Nominal raise percentage, excluding bonuses unless they recur', 'Official CPI change for the same start and end periods', 'Whether the CPI is annual average, year-over-year month or another index comparison', 'Base pay, hours and benefits that changed alongside the raise', 'Take-home impact if taxes, deductions or contributions changed', 'Personal spending categories that materially differ from the CPI basket'],
    formula: 'New nominal pay = old pay × (1 + raise%). Exact real change = [(1 + raise%) ÷ (1 + inflation%) − 1] × 100. New pay in old-period dollars = new nominal pay ÷ (1 + inflation%).',
    workedExample: '$70,000 × 1.04 = $72,800 nominal. Real change = (1.04÷1.05−1)×100 = −0.95%. Purchasing-power equivalent = $72,800÷1.05 = $69,333.33 in old-period dollars, so the raise did not preserve purchasing power in this scenario.',
    sensitivity: [{ scenario: 'Raise equals inflation', input: '5% raise; 5% inflation', result: '0.00% real change; $70,000 old-dollar equivalent' }, { scenario: 'Raise 6%, inflation 5%', input: 'Raise becomes 6%', result: '+0.95% real; $70,666.67 equivalent' }, { scenario: 'Inflation only 3%', input: 'Inflation becomes 3%', result: '+0.97% real; $70,679.61 equivalent' }, { scenario: 'No raise, inflation 5%', input: 'Raise becomes 0%', result: '−4.76% real; $66,666.67 equivalent' }],
    cta: { label: 'Compare your raise with matching CPI', href: '#raise-inflation-calculator' },
    limitations: ['Use CPI observations with the same time boundary as the raise; do not mix a monthly change with an annual raise.', 'BLS annual calculator values use calendar-year averages, while the current year uses the latest monthly index, so record the exact method and retrieval date.', 'CPI describes an average urban consumer basket, not your personal cost-of-living change.', 'This gross-pay comparison excludes taxes, benefits, hours, bonuses and promotion risk unless you analyze them separately.'],
    sources: [{ label: 'U.S. Bureau of Labor Statistics — CPI Inflation Calculator and period method', href: 'https://www.bls.gov/data/inflation_calculator_inside.htm' }, { label: 'BLS — mathematical calculations for CPI ratios and purchasing power', href: 'https://www.bls.gov/cpi/factsheets/cpi-math-calculations.pdf' }], lastVerified: '2026-07-19',
  },
  zh: {
    id: 'raise-inflation', labels: labels.zh,
    directAnswer: '加薪是否追上通膨，要看精確實質變動＝（1＋加薪率）÷（1＋同期間 CPI 漲幅）－1。月薪 NT$60,000 加薪 3% 變 NT$61,800；若使用主計總處 2026 年 6 月 CPI 年增 2.60% 作為同期間情境，實質增加約 0.39%，新薪的舊期購買力約 NT$60,233.92。3%－2.6%=0.4% 只是近似值。',
    inputs: ['加薪前同一口徑的月薪、年薪或時薪', '只算固定本薪的名目加薪率，非固定獎金另列', '與加薪起訖完全相同的官方 CPI 漲跌幅', '採全年平均、同月年增或任兩月指數比的明確口徑', '工時、津貼、勞健保、勞退與其他福利是否同時改變', '扣繳與自付額改變後的實領影響', '個人住房、交通、育兒等支出是否偏離平均 CPI 權重'],
    formula: '新名目薪資＝舊薪×（1＋加薪率）。精確實質變動率＝[（1＋加薪率）÷（1＋通膨率）－1]×100。以舊期價格表示的新薪購買力＝新薪÷（1＋通膨率）。',
    workedExample: 'NT$60,000×1.03＝NT$61,800。若同期間 CPI 漲 2.60%，實質變動＝（1.03÷1.026－1）×100＝+0.39%；舊期購買力＝NT$61,800÷1.026＝NT$60,233.92。例中加薪略高於平均物價，而不是多出完整 3%。',
    sensitivity: [{ scenario: '加薪等於通膨', input: '加薪 2.6%；CPI 2.6%', result: '實質 0%；舊期購買力 NT$60,000' }, { scenario: '加薪只有 2%', input: '3% 改 2%', result: '實質 −0.58%；約 NT$59,649.12' }, { scenario: '通膨升到 4%', input: '2.6% 改 4%', result: '實質 −0.96%；約 NT$59,423.08' }, { scenario: '加薪 5%', input: '3% 改 5%', result: '實質 +2.34%；約 NT$61,403.51' }],
    cta: { label: '用同期間 CPI 檢查加薪購買力', href: '#raise-inflation-calculator' },
    limitations: ['2026 年 6 月 2.60% 只是有日期的年增情境；實算時請自行輸入與加薪期間一致的官方值。', '主計總處換算工具可比較任兩時點或全年平均，兩種口徑不可混用。', 'CPI 是一般家庭平均消費籃，不等於每個人的生活成本變化。', '本頁比較稅前固定薪資；實領、獎金、工時與福利要另做完整薪酬比較。'],
    sources: [{ label: '中華民國統計資訊網 — CPI 任兩時點漲跌與購買力換算', href: 'https://www.stat.gov.tw/cpi2.aspx?n=4583' }, { label: '主計總處 — 2026 年 6 月 CPI 年增 2.60%，發布日 2026-07-07', href: 'https://www.stat.gov.tw/News.aspx?n=2668&sms=10980' }], lastVerified: '2026-07-19',
  },
};
