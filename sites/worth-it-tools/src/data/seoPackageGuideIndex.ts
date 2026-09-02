import { seoPackageGuides } from './seoPackages002to005';

const card = (locale: 'en' | 'zh', slug: string, description?: string, title?: string) => {
  const meta = seoPackageGuides[locale + '/' + slug];
  if (!meta) throw new Error('Missing guide metadata for ' + locale + '/' + slug);
  return {
    title: title ?? meta.title,
    path: '/guides/' + slug,
    description: description ?? meta.excerpt,
  };
};

export const seoPackageGuideContent = {
  en: {
    groups: [
      {
        heading: 'Cash Flow, Balance Sheet, and Borrowing Mechanics',
        intro: 'Go beyond a monthly budget. These guides map cash timing, irregular annual bills, household leverage, amortization, and the implied cost hidden inside a cash discount versus financing offer.',
        cards: [
          card('en', 'cash-flow-buffer-vs-emergency-fund'),
          card('en', 'debt-to-assets-ratio-personal'),
          card('en', 'amortization-schedule-explained'),
          card('en', 'cash-discount-vs-financing'),
          card('en', 'annual-bills-monthly-equivalent'),
        ],
      },
      {
        heading: 'Break-even decisions need a time horizon, not just a lower monthly number',
        intro: 'These guides turn common “which option is cheaper?” questions into transparent cash-flow tests. Compare upfront cost, monthly savings, liquidity, early-exit risk, and the conditions that would reverse the conclusion before treating a lower rate or payment as the better deal.',
        cards: [
          card('en', 'car-down-payment-vs-liquidity'),
          card('en', 'insurance-deductible-cash-reserve'),
          card('en', 'mortgage-points-break-even'),
          card('en', 'rent-increase-vs-moving-break-even'),
          card('en', 'windfall-debt-vs-cash-allocation'),
        ],
      },
      {
        heading: 'Cash-flow stress tests and second-order break-even decisions',
        intro: 'These guides keep the variable that can reverse a simple answer visible: early-exit balance, dated cash runway, annual-bill timing, fixed-cost capacity, cancellation risk, realized utilization, replacement cost, and clawback.',
        cards: [
          card('en', 'auto-loan-negative-equity-rollover-cost'),
          card('en', 'cash-runway-before-quitting-job'),
          card('en', 'annual-bills-cash-flow-low-point'),
          card('en', 'post-debt-payoff-lifestyle-creep'),
        ],
      },
    ],
    additions: [
      card('en', 'personal-liquidity-ratio'),
      card('en', 'loan-refinance-break-even'),
      card('en', 'fixed-vs-variable-rate'),
      card('en', 'real-vs-nominal-return'),
      card('en', 'financial-runway-months'),
      card('en', 'debt-consolidation-break-even'),
      card('en', 'balance-transfer-break-even'),
      card('en', 'mortgage-recast-vs-refinance-vs-extra-principal'),
      card('en', 'sinking-fund-by-deadline'),
      card('en', 'cost-of-delaying-savings-goal'),
    ],
    featured: {
      heading: 'Find the break-even before you optimize the payment',
      intro: 'A lower rate, lower rent, or larger down payment can improve one number while weakening another. Use WorthCalc to test the full cash-flow trade-off before deciding.',
    },
  },
  zh: {
    groups: [
      {
        heading: '現金流與財務安全：先讓帳戶撐得住，再談最佳化',
        intro: '月收入大於月支出，不代表每一天都有足夠現金。這組指南把現金流緩衝、緊急預備金、年度支出與手上現金拆成不同工作，幫你找出真正需要保留的流動資金，而不是套用單一比例。',
        cards: [
          card('zh', 'cash-flow-buffer-vs-emergency-fund', '用付款日期找出正常月份的最低餘額，再另外處理真正的財務衝擊。', '現金流緩衝 vs 緊急預備金'),
          card('zh', 'how-much-cash-to-keep', '四層現金法：日常週轉、日期緩衝、緊急儲備、已知短期支出。', '手上應該留多少現金？'),
          card('zh', 'annual-expenses-monthly-equivalent', '用 annual/12 與 catch-up 公式處理保費、稅金、學費與維修。', '年度支出怎麼換算每月預算？'),
        ],
      },
      {
        heading: '看懂利率與貸款：不要只比較一個百分比',
        intro: '名目利率、有效年利率、總費用年百分率、月付款與總利息回答的是不同問題。這組指南直接拆公式與現金流，讓你知道「月付變低」到底換來什麼成本。',
        cards: [
          card('zh', 'effective-interest-rate-explained', '分清 nominal、EAR 與法規 APR／總費用年百分率。', '有效利率是什麼？'),
          card('zh', 'amortization-schedule-explained', '逐期拆本金、利息與剩餘餘額。', '貸款攤還表怎麼看？'),
          card('zh', 'extra-payment-personal-loan', '省息還要扣違約金與流動性成本。', '信貸提前還款划算嗎？'),
          card('zh', 'cash-discount-vs-financing', '把放棄折扣放到付款時間線，用 IRR 估算隱含融資成本。', '現金折扣 vs 分期'),
        ],
      },
      {
        heading: '不只看淨資產總數：追蹤槓桿、變動來源與 recurring cost',
        intro: '',
        cards: [
          card('zh', 'debt-to-assets-ratio-personal', '和 DTI／DBR 分開看。', '個人負債資產比'),
          card('zh', 'net-worth-tracking-frequency', '固定估值日，比每天盯市值更重要。', '淨資產多久算一次？'),
          card('zh', 'subscription-opportunity-cost', '分開直接支出與假設性未來價值。', '訂閱的機會成本'),
        ],
      },
      {
        heading: '把「看起來比較便宜」改成「持有到某一天真的比較便宜」',
        intro: '這一組 WorthCalc 指南專門處理容易被月付、優惠利率、頭期款或單一比例誤導的決策。每頁都把一次性成本、未來現金流、流動性與結論反轉條件放進同一個模型，讓你能用自己的數字驗證，而不是套市場平均或固定百分比。',
        cards: [
          card('zh', 'car-down-payment-vs-liquidity'),
          card('zh', 'insurance-deductible-cash-reserve'),
          card('zh', 'lifestyle-inflation-raise-capture'),
          card('zh', 'monthly-extra-vs-annual-lump-sum'),
          card('zh', 'mortgage-fee-rate-break-even'),
          card('zh', 'principal-equal-vs-payment-equal-amortization'),
          card('zh', 'rent-increase-vs-moving-break-even'),
          card('zh', 'shared-expenses-income-split'),
          card('zh', 'step-rate-loan-total-cost'),
          card('zh', 'windfall-debt-vs-cash-allocation'),
        ],
      },
      {
        heading: '現金流壓力測試與會讓答案反轉的第二層變數',
        intro: '這些指南把簡單公式容易忽略的變數攤開：提前退出本金、日期現金跑道、年度帳單低點、固定支出承受力、取消風險、實際可計費利用率、福利替代成本與 Clawback。',
        cards: [
          card('zh', 'car-loan-60-72-84-early-exit'),
          card('zh', 'cash-vs-car-loan-liquidity-adjusted'),
          card('zh', 'base-salary-vs-bonus-fixed-cost-capacity'),
          card('zh', 'annual-plan-cancellation-risk-break-even'),
        ],
      },
    ],
    additions: [
      card('zh', 'minimum-cash-balance-checking'),
      card('zh', 'personal-liquidity-ratio'),
      card('zh', 'debt-paydown-interest-vs-cashflow'),
      card('zh', 'loan-refinance-break-even'),
      card('zh', 'fixed-vs-variable-rate-scenario'),
      card('zh', 'monthly-payment-affordability-vs-total-cost'),
      card('zh', 'real-vs-nominal-return'),
      card('zh', 'inflation-adjusted-savings-goal'),
      card('zh', 'financial-runway-months'),
      card('zh', 'paycheck-budgeting-limitations'),
      card('zh', 'emergency-fund-rebuild-after-use'),
      card('zh', 'sinking-fund-by-deadline'),
      card('zh', 'debt-consolidation-break-even'),
      card('zh', 'balance-transfer-fee-break-even'),
      card('zh', 'mortgage-recast-vs-refinance-vs-prepay'),
      card('zh', 'interest-only-period-total-cost'),
      card('zh', 'down-payment-vs-post-purchase-liquidity'),
      card('zh', 'fixed-cost-ratio-personal-budget'),
      card('zh', 'cost-of-delaying-savings-goal'),
      card('zh', 'promo-apr-payoff-deadline'),
    ],
    featured: {
      heading: '先算回本，再看月付',
      intro: '房貸費用、車貸頭期、搬家、獎金與保險現金準備，不是看到「比較低」就代表比較划算。用 WorthCalc 把持有期、現金安全墊與總成本一起算。',
    },
  },
} as const;
