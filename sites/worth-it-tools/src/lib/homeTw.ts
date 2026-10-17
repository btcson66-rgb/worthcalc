/**
 * Copy and link list for the Traditional Chinese (Taiwan) homepage, served at `/`.
 *
 * SEO rebuild P1 (2026-10-15). Positioning: 「台灣人的金錢決策計算機」. The old
 * homepage was a general "transparent calculators" pitch with US sources and
 * Costco US links. This one lists only pages that are about Taiwan: Taiwan
 * regulators, tariffs, tax and insurance rules, Taiwan products. Every href
 * below is a page the disposition audit
 * (docs/audits/worthcalc-rebuild-p1-disposition-2026-10-15.csv) marks `keep`;
 * scripts/check-rebuild-p1.mjs fails the build if a link points anywhere else,
 * so the homepage cannot quietly start advertising a page that is slated for
 * rewriting or removal.
 *
 * Blurbs describe what the page answers. They deliberately carry no figures:
 * a number belongs on the page that cites its source and check date, not on a
 * homepage card that nobody re-verifies.
 */

export type HomeItemKind = 'calculator' | 'article';

export interface HomeTwItem {
  href: string;
  title: string;
  blurb: string;
  kind: HomeItemKind;
}

export interface HomeTwGroup {
  id: string;
  heading: string;
  lead: string;
  items: HomeTwItem[];
}

export const homeTw = {
  title: '台灣人的金錢決策計算機',
  description:
    '台灣在地的金錢決策計算機：信用卡年費與分期真實成本、好市多與會員回本、通勤與購車成本、房貸與房屋稅、勞保勞退與健保。頁面標明引用的官方來源與查核日期。',
  eyebrow: '台灣的費率、法規與官方公告，攤開來算',
  heading: '台灣人的',
  accent: '金錢決策計算機',
  intro:
    '信用卡要刷多少才回本、0 利率分期到底多貴、房貸寬限期結束月付跳多少、勞退自提划不划算——這些問題的答案取決於台灣的法規、費率與官方公告，國外的計算機幫不上忙。WorthCalc 把公式攤開來，讓你用自己的數字重算，並在頁面上標明引用的官方來源與查核日期。',
  badges: ['台灣在地費率與法規', '官方來源＋查核日期', '公式公開、瀏覽器本機試算'],
  groupsHeading: '依你正在煩惱的事找',
  groupsLead:
    '以下只列出有台灣在地內容、數字有官方來源與查核日期的頁面。計算機標示為「計算機」，其餘是帶算例的說明文章。',
  groups: [
    {
      id: 'credit-installment',
      heading: '信用卡與分期',
      lead: '年費、回饋上限、分期手續費、循環利息與還債順序，用台灣的契約規範與利率上限來算。',
      items: [
        {
          href: '/zh/annual-fee-card-breakeven/',
          title: '信用卡年費要刷多少才回本',
          blurb: '拿年費卡跟你原本會用的免年費卡比，多賺多少，才是真正的回本門檻。',
          kind: 'article',
        },
        {
          href: '/zh/cashback-caps-real-reward-rate/',
          title: '信用卡回饋上限怎麼算',
          blurb: '把「最高 3%」拆成上限內與超過上限，再放回整期帳單，算出真正回饋率。',
          kind: 'article',
        },
        {
          href: '/zh/tools/installment-true-apr/',
          title: '信用卡分期試算：零利率陷阱',
          blurb: '把分期手續費與放棄的現金價折扣，換算成總費用年百分率。',
          kind: 'calculator',
        },
        {
          href: '/zh/bnpl-vs-credit-card-installments/',
          title: '先買後付 vs 信用卡分期',
          blurb: '比較總成本、扣款時間與遲繳後果，不只看每期金額。',
          kind: 'article',
        },
        {
          href: '/zh/upfront-fees-financing-cost/',
          title: '開辦費與手續費如何墊高分期成本',
          blurb: '核貸額與月付都一樣，扣掉開辦費後真正拿到的錢與年利率差多少。',
          kind: 'article',
        },
        {
          href: '/zh/tools/credit-card-payoff/',
          title: '信用卡循環利息計算器：日息、15% 上限與最低應繳',
          blurb: '輸入帳單餘額與你卡片的實際利率，算日息，並比較只繳最低應繳與固定金額要還多久、付多少利息。',
          kind: 'calculator',
        },
        {
          href: '/zh/snowball-vs-avalanche/',
          title: '卡債、信貸一起還：雪球法還是雪崩法',
          blurb: '多筆債務同時要還，先還利率最高還是餘額最小，總利息差多少。',
          kind: 'article',
        },
        {
          href: '/zh/tools/debt-strategy/',
          title: '雪球法 vs 雪崩法比較計算機',
          blurb: '輸入每一筆負債的餘額、利率與最低付款，並排比較兩種還法。',
          kind: 'calculator',
        },
      ],
    },
    {
      id: 'membership-subscription',
      heading: '會員與訂閱',
      lead: '好市多與電信綁約，用台灣現行的會員費與方案來算回本。',
      items: [
        {
          href: '/zh/tools/costco-membership/',
          title: '好市多會員回本計算機',
          blurb: '分開算「辦不辦會員」與「要不要升級黑鑽卡」，並扣掉加油、菸酒等不計回饋的項目。',
          kind: 'calculator',
        },
        {
          href: '/zh/costco-math/',
          title: '好市多會員的數學：年費怎麼算才回本',
          blurb: '台灣三種會員的回本模型，以及簡單模型沒算到的兩件事。',
          kind: 'article',
        },
        {
          href: '/zh/money/phone-contract-subsidy-value/',
          title: '手機綁約補貼值多少',
          blurb: '把電信綁約的手機補貼與月租差額放在同一個算式裡比較。',
          kind: 'article',
        },
      ],
    },
    {
      id: 'transport-commute',
      heading: '交通與通勤',
      lead: '油錢、電費、牌照稅、國道 ETC 與大眾運輸月票，把每月、每年的通勤成本算清楚。',
      items: [
        {
          href: '/zh/tools/commute-cost/',
          title: '通勤成本計算機',
          blurb: '機車、汽車（含電動車）、大眾運輸、計程車與單車的每月、每年通勤花費。',
          kind: 'calculator',
        },
        {
          href: '/zh/full-commute-cost-including-time/',
          title: '通勤不只油錢：把時間也算進成本',
          blurb: '每月通勤的現金成本加上通勤時間的價值。',
          kind: 'article',
        },
        {
          href: '/zh/average-commuting-cost/',
          title: '平均通勤成本與車馬費行情',
          blurb: '不用虛構平均數，改用你自己的距離與車種算出可比較的基準。',
          kind: 'article',
        },
        {
          href: '/zh/work-from-home-vs-commuting-hidden-costs/',
          title: '在家工作還是通勤：每月隱藏成本',
          blurb: '比較居家、進公司與混合辦公的電費、交通與其他成本。',
          kind: 'article',
        },
        {
          href: '/zh/money/tpass-commuter-pass-breakeven/',
          title: 'TPASS 通勤月票划不划算',
          blurb: '月票價格除以你的單程票價，就是要搭幾趟才回本。',
          kind: 'article',
        },
        {
          href: '/zh/money/freeway-etc-commute-toll/',
          title: '國道 ETC 通勤費怎麼算',
          blurb: '依高公局的計程收費方式（優惠里程與 eTag 折扣），算出每天往返與每個月的國道通行費。',
          kind: 'article',
        },
        {
          href: '/zh/money/car-road-fee-license-tax-fixed-cost/',
          title: '養車的固定稅費：牌照稅與燃料使用費',
          blurb: '排氣量不同，一年的牌照稅與燃料使用費差多少。',
          kind: 'article',
        },
        {
          href: '/zh/true-cost-of-car-ownership/',
          title: '養車一個月多少錢',
          blurb: '牌照稅、燃料費、強制險都算進去，才是真正的月成本。',
          kind: 'article',
        },
        {
          href: '/zh/ev-vs-gas-total-cost/',
          title: '電動車和油車的五年總持有成本',
          blurb: '購車、能源、稅費、保險與轉售價放在一起比較。',
          kind: 'article',
        },
        {
          href: '/zh/home-vs-public-ev-charging-cost/',
          title: '家用充電 vs 公共充電的電費',
          blurb: '依台電電價與充電業者費率，比較每月充電花費。',
          kind: 'article',
        },
      ],
    },
    {
      id: 'big-spending',
      heading: '大型支出',
      lead: '買房、房貸、買車：把房貸利息、稅費與政策補貼，連同一次性費用一起算。',
      items: [
        {
          href: '/zh/rent-vs-buy-guide/',
          title: '租屋還是買房：真正會改變答案的數字',
          blurb: '房價、租金、利率與持有成本中，哪些數字會翻轉結論。',
          kind: 'article',
        },
        {
          href: '/zh/rent-vs-buy-breakeven-year/',
          title: '買房住幾年才比租屋划算',
          blurb: '逐年比較買房與租屋的淨成本，找出第一個買房不高於租屋的年份。',
          kind: 'article',
        },
        {
          href: '/zh/how-much-home-can-you-afford/',
          title: '購屋能力怎麼算',
          blurb: '房貸成數、央行信用管制、房屋稅與地價稅都要算進去。',
          kind: 'article',
        },
        {
          href: '/zh/tools/home-affordability/',
          title: '房屋負擔能力計算機',
          blurb: '依你設定的住房月預算，反推把房貸、稅費與管理費都算進去之後負擔得起的房價。',
          kind: 'calculator',
        },
        {
          href: '/zh/tools/mortgage-payoff/',
          title: '房貸試算計算機',
          blurb: '算月付與總利息，比較本息與本金平均攤還、寬限期的利息差，以及提前還款與違約金。',
          kind: 'calculator',
        },
        {
          href: '/zh/money/youth-home-loan-3-subsidy-value/',
          title: '新青安貸款的補貼值多少',
          blurb: '比較貸款年限與利息補貼，算出實際省下與多付的利息。',
          kind: 'article',
        },
        {
          href: '/zh/money/mortgage-grace-period-end-payment/',
          title: '房貸寬限期結束，月付會跳多少',
          blurb: '寬限期結束改付本息，月付金額的變化怎麼算。',
          kind: 'article',
        },
        {
          href: '/zh/money/house-tax-owner-occupied-vs-non/',
          title: '房屋稅：自住與非自住差多少',
          blurb: '同一間房子，稅率與稅額會因為自住或非自住而不同。',
          kind: 'article',
        },
        {
          href: '/zh/new-vs-used-car-total-cost/',
          title: '新車還是中古車',
          blurb: '折舊、維修、貸款與轉售價的持有成本比較。',
          kind: 'article',
        },
        {
          href: '/zh/car-lease-vs-buy-total-cost/',
          title: '租賃還是買車',
          blurb: '總成本、里程限制與轉售風險怎麼算。',
          kind: 'article',
        },
      ],
    },
    {
      id: 'retirement-insurance',
      heading: '退休與勞保勞退',
      lead: '勞退提繳、勞保老年給付、國民年金與健保費，依官方公布的級距與費率計算。',
      items: [
        {
          href: '/zh/money/labor-pension-contribution-wage-table/',
          title: '勞退試算計算機',
          blurb: '先對月提繳工資分級表，再乘雇主與自提的提繳率，估專戶累積。',
          kind: 'calculator',
        },
        {
          href: '/zh/money/labor-pension-voluntary-contribution-tax/',
          title: '勞退自提 6% 一年省多少稅',
          blurb: '自提金額可從當年度所得中扣除，節稅金額取決於你的稅率級距。',
          kind: 'article',
        },
        {
          href: '/zh/money/labor-insurance-old-age-lump-sum-vs-annuity/',
          title: '勞保老年年金試算計算機',
          blurb: '兩個公式取高、提前減給與延後增給，並比較一次請領。',
          kind: 'calculator',
        },
        {
          href: '/zh/money/national-pension-vs-labor-insurance/',
          title: '國民年金與勞保老年給付',
          blurb: '兩種制度的保費與月領金額怎麼比較。',
          kind: 'article',
        },
        {
          href: '/zh/money/nhi-premium-insured-salary-grade/',
          title: '健保費怎麼算',
          blurb: '依投保金額級距與眷屬人數，算出自付的健保保費。',
          kind: 'article',
        },
        {
          href: '/zh/money/nhi-supplementary-premium/',
          title: '二代健保補充保費怎麼算',
          blurb: '獎金、兼職薪資、股利、利息與租金等所得，在什麼條件下要扣補充保費。',
          kind: 'article',
        },
        {
          href: '/zh/money/savings-insurance-irr/',
          title: '儲蓄險 IRR 怎麼算',
          blurb: '用繳費與領回的現金流，算出儲蓄險實際的年化報酬。',
          kind: 'article',
        },
      ],
    },
  ] as HomeTwGroup[],
  moreHeading: '找不到你的問題？',
  moreLead: '這兩個索引列出站上所有計算機與金錢速查，包含上方沒有列出、仍在整理中的頁面。',
  methodHeading: '數字怎麼查核',
  method:
    '每一頁引用的利率、費率、稅額與級距，都會在頁面的「資料來源」列出官方公告的連結與我們查看的日期，頁首與頁尾也標示該頁的最後查核日期。沒有列出資料來源的頁面，只用算術與你輸入的數字。計算機全部在你的瀏覽器本機執行，不會把你輸入的數字傳到伺服器。',
  authorLead: '作者與審核',
  authorBody:
    'Benson Lai 負責計算機的開發與內容審核。作者頁說明他在本站做什麼、數字如何查核、錯誤如何更正與回報；本站不列出任何學歷、證照或職稱。',
  disclaimerLead: '不構成財務建議：',
  disclaimer:
    '本站的說明與試算只是一般資訊與估算，不是財務、投資、稅務、保險或法律建議，也不保證任何結果。重大決定前，請核對官方公告與你自己的契約，並諮詢合格專業人士。',
  faqHeading: '常見問題',
  faq: [
    {
      question: '計算機的結果是財務建議嗎？',
      answer:
        '不是。結果只是依你輸入的數字與頁面公開的公式算出的估計。涉及重大財務、稅務、法律、債務、房屋或投資的決定，請諮詢能完整了解你情況的合格專業人士。',
    },
    {
      question: '計算機會把我的數字送到伺服器嗎？',
      answer:
        '不會。計算機在你的瀏覽器中執行。部分工具可能使用瀏覽器的 localStorage 讓你的裝置記住輸入值，但資料不會上傳到 WorthCalc。',
    },
    {
      question: '為什麼結果可能和實際帳單或方案不同？',
      answer:
        '利率、費率、稅額、回饋規則與促銷條款都會變動。請以頁面標示的查核日期判斷新舊，並向銀行、保險公司或主管機關確認當下的條件。',
    },
    {
      question: '發現數字錯了怎麼辦？',
      answer:
        '請到聯絡頁寄信回報，附上頁面網址、你輸入的數字與預期的結果。我們會重新查核該頁，更正後更新頁面的最後查核日期。',
    },
  ],
};
