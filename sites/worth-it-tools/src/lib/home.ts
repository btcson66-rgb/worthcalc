import type { CoreLocale } from '../consts';
import type { FaqItem } from './seo';

interface HomeTool {
  icon: string;
  title: string;
  path: string;
  description: string;
}

interface HomeContent {
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  accent: string;
  headingSuffix: string;
  intro: string;
  badges: string[];
  toolsHeading: string;
  toolsLead: string;
  toolsCta: string;
  tools: HomeTool[];
  seoHeading: string;
  seoParagraphs: string[];
  faqHeading: string;
  faq: FaqItem[];
}

export const homeContent: Record<CoreLocale, HomeContent> = {
  en: {
    title: "Free Calculators That Tell You If It's Worth It",
    description:
      'Free browser-based calculators for real money decisions: installments, subscriptions, Costco, EV vs. gas, rent vs. buy, commuting, daily habits, and cashback cards.',
    eyebrow: 'Money decisions, settled by math',
    heading: "Free calculators that tell you if it's ",
    accent: 'actually worth it',
    headingSuffix: '.',
    intro:
      'Before you sign up, sign the lease, or swipe the card, run the numbers. Every calculator does real math on real money decisions, right in your browser - no sign-up, no data sent anywhere, just a clear estimate.',
    badges: ['No sign-up', '100% private', 'Free forever'],
    toolsHeading: 'Calculators',
    toolsLead: 'Eight tools for the decisions people actually search "is it worth it?" about.',
    toolsCta: 'Open calculator',
    tools: [
      {
        icon: '💳',
        title: 'Installment True APR Calculator',
        path: '/tools/installment-true-apr',
        description: 'See the real interest rate hiding behind "0%" installment and BNPL plans.',
      },
      {
        icon: '📺',
        title: 'Subscription Audit Calculator',
        path: '/tools/subscription-audit',
        description: 'Add up every subscription and see what you really pay per month, year, and 5 years.',
      },
      {
        icon: '🛒',
        title: 'Costco Membership Calculator',
        path: '/tools/costco-membership',
        description: 'Find the monthly spend where a Gold Star or Executive membership pays for itself.',
      },
      {
        icon: '🚗',
        title: 'EV vs Gas Car TCO Calculator',
        path: '/tools/ev-vs-gas',
        description: 'Compare total cost of ownership - purchase, energy, maintenance - and the break-even year.',
      },
      {
        icon: '🏠',
        title: 'Rent vs Buy Calculator',
        path: '/tools/rent-vs-buy',
        description: 'Weigh mortgage, appreciation, and invested down payment against renting.',
      },
      {
        icon: '🚌',
        title: 'Commute Cost Calculator',
        path: '/tools/commute-cost',
        description: 'Compare car, transit, rideshare, and bike costs per month, including your time.',
      },
      {
        icon: '☕',
        title: 'Latte Factor Calculator',
        path: '/tools/latte-factor',
        description: 'What a daily habit really costs per year, and what it could grow to if invested.',
      },
      {
        icon: '🎁',
        title: 'Cashback Break-even Calculator',
        path: '/tools/cashback-breakeven',
        description: 'Check whether an annual-fee card beats a no-fee 1% card at your spending level.',
      },
    ],
    seoHeading: 'Worth-it calculators for everyday money choices',
    seoParagraphs: [
      'WorthCalc focuses on practical consumer decisions where a quick estimate can prevent an expensive mistake: installment plans, subscription creep, warehouse memberships, vehicles, housing, commuting, daily habits, and cashback cards.',
      'The calculators are informational estimates, not financial advice. You control the inputs, can change the assumptions, and should verify important prices, rates, fees, taxes, and terms before acting on the result.',
      'Every tool runs in your browser. WorthCalc does not require an account and does not send your calculator inputs to a custom backend server.',
    ],
    faqHeading: 'Homepage FAQ',
    faq: [
      {
        question: 'Are WorthCalc results financial advice?',
        answer:
          'No. The results are general informational estimates only. For major financial, tax, legal, debt, housing, or investment decisions, consult a qualified professional who can review your full situation.',
      },
      {
        question: 'Do the calculators send my numbers to a server?',
        answer:
          'No. The calculators run in your browser. Some tools may use browser localStorage so your own device can remember values, but the inputs are not uploaded to WorthCalc.',
      },
      {
        question: 'Why can my result differ from a real bill or offer?',
        answer:
          'Real-world prices, taxes, fees, interest rates, rewards rules, usage patterns, and promotional terms can change. Treat the output as a decision aid and confirm current terms with the provider.',
      },
      {
        question: 'Is WorthCalc free to use?',
        answer:
          'Yes. The calculators are free and do not require registration. The site may be supported by advertising, as explained in the privacy policy.',
      },
    ],
  },
  zh: {
    title: '值不值得計算機：花錢之前，先算一下',
    description:
      '免費的瀏覽器端計算機，專門回答「值不值得」：分期利率、訂閱花費、好市多會員、電動機車 vs 油車、租屋 vs 買房、通勤成本、手搖飲存錢、信用卡回饋。',
    eyebrow: '花錢決定，交給數字',
    heading: '花錢之前，',
    accent: '先算一下',
    headingSuffix: '。',
    intro:
      '分期划不划算、訂閱是不是在燒錢、好市多會員值不值得續、租屋還是買房比較好，這些問題不用憑感覺。所有計算都在你的瀏覽器本機完成，不需要註冊、資料不外傳，只給你一個清楚的估算方向。',
    badges: ['免註冊', '完全隱私', '永久免費'],
    toolsHeading: '計算機',
    toolsLead: '八個工具，專門回答大家真的會搜尋的「值不值得？」。',
    toolsCta: '開啟計算機',
    tools: [
      {
        icon: '💳',
        title: '分期付款真實 APR 計算機',
        path: '/tools/installment-true-apr',
        description: '看穿「0 利率」分期背後的真實年利率，手續費其實是幾 % 利息。',
      },
      {
        icon: '📺',
        title: '訂閱支出健檢計算機',
        path: '/tools/subscription-audit',
        description: '把 Netflix、Spotify 等訂閱加總，看每月、一年、五年到底花多少。',
      },
      {
        icon: '🛒',
        title: 'Costco 會員值不值得計算機',
        path: '/tools/costco-membership',
        description: '算出好市多金星、商業、黑鑽會員的回本消費門檻與年度淨效益。',
      },
      {
        icon: '🛵',
        title: '電動機車 vs 油車計算機',
        path: '/tools/ev-vs-gas',
        description: '比較 Gogoro 類電動機車與 125cc 油車的五年總持有成本與回本年。',
      },
      {
        icon: '🏠',
        title: '租屋 vs 買房計算機',
        path: '/tools/rent-vs-buy',
        description: '把房貸、房價增值、租金成長與頭期款投資報酬放在一起比較。',
      },
      {
        icon: '🚌',
        title: '通勤成本計算機',
        path: '/tools/commute-cost',
        description: '比較機車、汽車、大眾運輸與 Uber 的每月、每年通勤花費。',
      },
      {
        icon: '🧋',
        title: '拿鐵因子計算機',
        path: '/tools/latte-factor',
        description: '每天一杯手搖或咖啡，一年花多少？改成投資又會變多少？',
      },
      {
        icon: '🎁',
        title: '信用卡回饋打平計算機',
        path: '/tools/cashback-breakeven',
        description: '算出年費卡要刷多少才回本，並跟免年費 1% 回饋卡直接比較。',
      },
    ],
    seoHeading: '用估算工具處理日常金錢選擇',
    seoParagraphs: [
      'WorthCalc 聚焦在消費者每天會遇到的「值不值得」問題：分期付款、訂閱支出、賣場會員、交通工具、租屋買房、通勤、每日習慣，以及信用卡回饋。',
      '本站計算結果僅供一般資訊與估算參考，不是財務建議。你可以自行調整輸入值與假設，但在採取行動前，仍應確認最新價格、費率、稅費、合約條款與個人條件。',
      '每一個工具都在你的瀏覽器中執行。WorthCalc 不需要註冊帳號，也不會把你在計算機輸入的數字送到自訂後端伺服器。',
    ],
    faqHeading: '首頁常見問題',
    faq: [
      {
        question: 'WorthCalc 的結果是財務建議嗎？',
        answer:
          '不是。計算結果僅供一般資訊與估算參考。若涉及重大財務、稅務、法律、債務、房屋或投資決策，請諮詢能完整了解你情況的合格專業人士。',
      },
      {
        question: '計算機會把我的數字送到伺服器嗎？',
        answer:
          '不會。計算機在你的瀏覽器中執行。部分工具可能使用瀏覽器 localStorage，讓你的裝置記住輸入值，但資料不會上傳到 WorthCalc。',
      },
      {
        question: '為什麼結果可能和真實帳單或方案不同？',
        answer:
          '實際價格、稅費、利率、回饋規則、使用習慣和促銷條款都可能變動。請把結果當作決策輔助，重要條件仍要向服務提供者確認。',
      },
      {
        question: 'WorthCalc 可以免費使用嗎？',
        answer:
          '可以。所有計算機都免費使用，也不需要註冊。本站可能透過廣告支持營運，詳情請見隱私權政策。',
      },
    ],
  },
};
