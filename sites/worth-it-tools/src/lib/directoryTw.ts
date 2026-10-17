/**
 * The three Traditional Chinese (Taiwan) directories: /zh/tools/, /zh/guides/ and /zh/money/.
 *
 * P2 batch 7 (2026-10-17). Before this file the three pages were generic indexes
 * built from the six English-origin topic ids, and they overlapped: /guides/ listed
 * every brief that /money/ also listed, and /tools/ listed calculators that /money/
 * hosts under its own URLs. Now each page of the site has exactly one primary
 * listing, by what the page is for, and all three directories group by the same
 * scenarios so a reader can move sideways between them:
 *
 *   tool       /zh/tools/   "I want to type my own numbers." The calculator is the first
 *                           thing on the page (the 16 pages under /tools/, plus the pages
 *                           P2 rebuilt around a calculator that live at other URLs).
 *   guide      /zh/guides/  "I want to understand how to compare the options." Explainers
 *                           and comparisons; some embed a calculator further down.
 *   reference  /zh/money/   "I want the current Taiwan rule, rate or subsidy." Dated,
 *                           sourced briefs; each one carries its own check date.
 *
 * The role is not a free choice. scripts/check-directory-tw.mjs reads dist/ and fails
 * the build when a `tool` page does not open with its form (or tool section), when a
 * `guide` / `reference` page does, when a sitemap content page is listed nowhere or
 * twice, or when an entry points at a stub, a noindex page or a URL outside the
 * disposition CSV's `keep` rows.
 *
 * Every `ask` carries no figures on purpose. A number belongs on the page that cites
 * its source and check date; a directory line that nobody re-verifies would go stale.
 */

export type DirectoryRole = 'tool' | 'guide' | 'reference';

export type DirectoryGroupId =
  | 'credit-installment'
  | 'membership-subscription'
  | 'transport-commute'
  | 'big-spending'
  | 'retirement-insurance'
  | 'savings-emergency'
  | 'income-tax';

export interface DirectoryGroup {
  id: DirectoryGroupId;
  heading: string;
  lead: string;
}

export interface DirectoryEntry {
  /** Absolute site path, trailing slash, e.g. `/zh/tools/commute-cost/`. */
  href: string;
  /** Short link text. The page's own H1 is longer; the check only compares sets, not wording. */
  title: string;
  /** One sentence: the question this page answers. */
  ask: string;
  role: DirectoryRole;
  group: DirectoryGroupId;
}

/** A `tool` page must put its form (or tool section) inside this many characters of main text. */
export const TOOL_FIRST_MAX_CHARS = 800;

export const directoryGroups: readonly DirectoryGroup[] = [
  {
    id: 'credit-installment',
    heading: '信用卡與分期',
    lead: '年費、回饋上限、分期手續費、循環利息、負債比與還債順序，用台灣的契約規範與利率上限來算。',
  },
  {
    id: 'membership-subscription',
    heading: '會員與訂閱',
    lead: '好市多、外送會員、健身房、訂閱與電信綁約，用台灣現行的會員費與契約規定來算回本。',
  },
  {
    id: 'transport-commute',
    heading: '交通與通勤',
    lead: '油錢、電費、牌照稅、國道 ETC、通勤月票與電動機車補助，把每月、每年的交通成本算清楚。',
  },
  {
    id: 'big-spending',
    heading: '大型支出',
    lead: '買房、房貸、買車，以及家電與手機的換新、維修和電費：把利息、稅費、補貼和一次性費用一起算。',
  },
  {
    id: 'retirement-insurance',
    heading: '退休與勞保勞退',
    lead: '勞退提繳、勞保老年給付、國民年金與健保費，依官方公布的級距與費率計算。',
  },
  {
    id: 'savings-emergency',
    heading: '儲蓄與緊急預備金',
    lead: '失業時的現金缺口、複利與通膨、不固定收入的預算，以及定存的規定。',
  },
  {
    id: 'income-tax',
    heading: '薪資與稅',
    lead: '時薪月薪年薪換算、加薪與通膨、真實時薪，以及年終獎金、扶養與扣除額對所得稅的影響。',
  },
];

export const directoryEntries: readonly DirectoryEntry[] = [
  // ---- 計算機：從輸入框開始 -------------------------------------------------
  { role: 'tool', group: 'credit-installment', href: '/zh/tools/installment-true-apr/', title: '信用卡分期試算', ask: '「零利率」、手續費分期和帳單分期，換算成年利率各是多少？' },
  { role: 'tool', group: 'credit-installment', href: '/zh/tools/credit-card-payoff/', title: '信用卡循環利息計算器', ask: '只繳最低應繳，利息一天算多少、要還多久、總共多付多少？' },
  { role: 'tool', group: 'credit-installment', href: '/zh/tools/cashback-breakeven/', title: '信用卡回饋打平計算機', ask: '年費卡每月要刷多少，才贏過免年費的基準卡？' },
  { role: 'tool', group: 'credit-installment', href: '/zh/tools/debt-strategy/', title: '雪球法 vs 雪崩法比較計算機', ask: '多筆債務先還哪一筆，清償日和總利息差多少？' },
  { role: 'tool', group: 'credit-installment', href: '/zh/tools/dti-calculator/', title: '負債比（DBR）與收支比計算機', ask: '信貸看的 DBR 倍數和房貸看的月付收入比，你各是多少？' },

  { role: 'tool', group: 'membership-subscription', href: '/zh/tools/costco-membership/', title: '好市多會員回本計算機', ask: '一年在好市多花多少，辦會員、升級黑鑽才算回本？' },
  { role: 'tool', group: 'membership-subscription', href: '/zh/tools/subscription-audit/', title: '訂閱支出健檢計算機', ask: '所有定期扣款加起來，一年、五年各花多少，哪些該取消？' },

  { role: 'tool', group: 'transport-commute', href: '/zh/tools/commute-cost/', title: '通勤成本計算機', ask: '騎機車、開車、搭大眾運輸或叫車，每公里和每年各花多少？' },
  { role: 'tool', group: 'transport-commute', href: '/zh/tools/ev-vs-gas/', title: '電動機車 vs 油車計算機', ask: '電動機車比油車貴的那一段，多久才能靠省下的能源費補回來？' },
  { role: 'tool', group: 'transport-commute', href: '/zh/tools/car-affordability/', title: '汽車負擔能力計算機', ask: '實領收入扣掉車貸、稅費、保險與停車後，買得起多貴的車？' },
  { role: 'tool', group: 'transport-commute', href: '/zh/home-vs-public-ev-charging-cost/', title: '家用與公共充電電費比較', ask: '家裡裝充電樁和用公共充電站，每度電、每月差多少，樁多久回本？' },

  { role: 'tool', group: 'big-spending', href: '/zh/tools/home-affordability/', title: '房屋負擔能力計算機', ask: '以你的收入、負債和頭期款，扣掉稅費與管理費後，買得起多少總價的房子？' },
  { role: 'tool', group: 'big-spending', href: '/zh/tools/mortgage-payoff/', title: '房貸試算', ask: '這筆房貸每月付多少、總利息多少，本息與本金平均攤還、寬限期和提前還款各差在哪？' },
  { role: 'tool', group: 'big-spending', href: '/zh/money/mortgage-refinance-break-even/', title: '房貸轉貸試算', ask: '轉貸要花的費用，要幾個月才能被省下的利息補回來？' },
  { role: 'tool', group: 'big-spending', href: '/zh/tools/appliance-electricity-cost/', title: '家電電費計算機', ask: '一台家電每小時、每天、每月的電費是多少？' },
  { role: 'tool', group: 'big-spending', href: '/zh/is-an-extended-warranty-worth-it/', title: '延長保固試算', ask: '在你設想的故障情境下，延長保固的價錢划不划算？' },
  { role: 'tool', group: 'big-spending', href: '/zh/repair-or-replace-decision-formula/', title: '維修還是換新試算', ask: '家電壞了，付維修費還是買新的，每個可使用月份的成本誰低？' },
  { role: 'tool', group: 'big-spending', href: '/zh/upgrade-your-phone-or-keep-it/', title: '手機換機或續用試算', ask: '手機該換還是繼續用，換算成每月成本差多少？' },

  { role: 'tool', group: 'retirement-insurance', href: '/zh/money/labor-pension-contribution-wage-table/', title: '勞退試算', ask: '以你的月薪、雇主提繳與自提，專戶每月提繳多少，累積到退休大約多少？' },
  { role: 'tool', group: 'retirement-insurance', href: '/zh/money/labor-insurance-old-age-lump-sum-vs-annuity/', title: '勞保老年年金試算', ask: '以你的年資、投保薪資和請領年齡，老年年金每月領多少，和一次請領比起來如何？' },

  { role: 'tool', group: 'savings-emergency', href: '/zh/emergency-fund-how-much/', title: '緊急預備金試算', ask: '失業給付領完之後，離職期間你還缺多少現金？' },
  { role: 'tool', group: 'savings-emergency', href: '/zh/tools/compound-growth/', title: '複利計算機', ask: '本金、每月投入、報酬率與通膨之下，幾年後有多少錢，要達成目標每月該存多少？' },
  { role: 'tool', group: 'savings-emergency', href: '/zh/tools/budget-builder/', title: '不固定收入預算建立器', ask: '收入忽高忽低，把年繳、季繳帳單攤平後，每個月該留多少？' },

  { role: 'tool', group: 'income-tax', href: '/zh/tools/salary-converter/', title: '時薪月薪年薪換算', ask: '時薪、月薪、年薪互相換算，算上加班與年終後的實際時薪是多少？' },

  // ---- 指南：先弄懂怎麼判斷 -------------------------------------------------
  { role: 'guide', group: 'credit-installment', href: '/zh/annual-fee-card-breakeven/', title: '信用卡年費要刷多少才回本', ask: '續年費卡，比起改用免年費卡，真正的回本刷卡額是多少？' },
  { role: 'guide', group: 'credit-installment', href: '/zh/cashback-caps-real-reward-rate/', title: '信用卡回饋上限怎麼算', ask: '「最高回饋」碰到每期上限之後，整期帳單的真正回饋率是多少？' },
  { role: 'guide', group: 'credit-installment', href: '/zh/bnpl-vs-credit-card-installments/', title: '先買後付 vs 信用卡分期', ask: '先買後付和信用卡分期，總成本、扣款時間和遲繳後果各差在哪？' },
  { role: 'guide', group: 'credit-installment', href: '/zh/upfront-fees-financing-cost/', title: '開辦費如何墊高貸款成本', ask: '月付一樣的兩筆貸款，扣掉開辦費之後，哪一筆的實際年利率比較高？' },
  { role: 'guide', group: 'credit-installment', href: '/zh/snowball-vs-avalanche/', title: '雪球法還是雪崩法', ask: '卡債、信貸一起還，先還利率最高的，還是先還餘額最小的？' },
  { role: 'guide', group: 'credit-installment', href: '/zh/how-to-calculate-dti/', title: '負債比怎麼算', ask: '銀行看的 DBR 倍數和房貸月付比，是兩種比率還是同一種？' },

  { role: 'guide', group: 'membership-subscription', href: '/zh/costco-math/', title: '好市多會員規則', ask: '好市多的家庭卡、借卡、升等、回饋金與退卡，官網和會員規章怎麼規定？' },
  { role: 'guide', group: 'membership-subscription', href: '/zh/monthly-vs-annual-subscription/', title: '訂閱月繳還是年繳', ask: '年繳有折扣，要用滿幾個月、提早取消的風險多大，才比月繳划算？' },
  { role: 'guide', group: 'membership-subscription', href: '/zh/delivery-membership-break-even/', title: '外送會員一年要用幾次才回本', ask: '外送平台的會員，一年要點幾次才抵得過會員費？' },
  { role: 'guide', group: 'membership-subscription', href: '/zh/gym-membership-cost-per-visit/', title: '健身房會員每次成本', ask: '月費加上入會費和沒去的月份，每次去健身房實際花多少？' },

  { role: 'guide', group: 'transport-commute', href: '/zh/full-commute-cost-including-time/', title: '通勤不只油錢：把時間也算進去', ask: '把通勤花掉的時間換成金額後，每月通勤的實際成本是多少？' },
  { role: 'guide', group: 'transport-commute', href: '/zh/average-commuting-cost/', title: '平均通勤成本與車馬費行情', ask: '找不到可靠的全國平均時，怎麼用自己的里程算出可比較的通勤基準？' },
  { role: 'guide', group: 'transport-commute', href: '/zh/work-from-home-vs-commuting-hidden-costs/', title: '在家工作還是通勤', ask: '居家、進公司或混合上班，每月的電費、交通和餐費各差多少？' },
  { role: 'guide', group: 'transport-commute', href: '/zh/true-cost-of-car-ownership/', title: '養車一個月多少錢', ask: '車貸月付之外，牌照稅、燃料費、保險、保養和停車一個月還要多少？' },
  { role: 'guide', group: 'transport-commute', href: '/zh/ev-vs-gas-total-cost/', title: '電動車和油車的五年總持有成本', ask: '購車、能源、稅費、保險和轉售價都算進去，電動車和油車五年誰比較便宜？' },

  { role: 'guide', group: 'big-spending', href: '/zh/rent-vs-buy-guide/', title: '租屋還是買房', ask: '房價、租金、利率和持有成本裡，哪些數字會改變租屋或買房的結論？' },
  { role: 'guide', group: 'big-spending', href: '/zh/rent-vs-buy-breakeven-year/', title: '買房住幾年才比租屋划算', ask: '買房要住到第幾年，累計成本才第一次不高於租屋？' },
  { role: 'guide', group: 'big-spending', href: '/zh/how-much-home-can-you-afford/', title: '購屋能力怎麼算', ask: '除了房貸月付，貸款成數、房屋稅、地價稅和管理費怎麼影響買得起的總價？' },
  { role: 'guide', group: 'big-spending', href: '/zh/extra-mortgage-payments-guide/', title: '房貸多繳划不划算', ask: '多繳房貸之前，要先確認銀行怎麼沖還本金、寬限期在付什麼、違約金怎麼收？' },
  { role: 'guide', group: 'big-spending', href: '/zh/new-vs-used-car-total-cost/', title: '新車還是中古車', ask: '折舊、維修、貸款利息和轉售價算進去，新車和中古車誰的持有成本低？' },
  { role: 'guide', group: 'big-spending', href: '/zh/car-lease-vs-buy-total-cost/', title: '租賃還是買車', ask: '簽約金、月租、超里程和還車費都算進去，租車和買車的總成本差多少？' },
  { role: 'guide', group: 'big-spending', href: '/zh/energy-efficient-appliance-payback/', title: '節能家電多久回本', ask: '貴一些的節能家電，靠省下的電費要幾年才補回價差？' },

  { role: 'guide', group: 'savings-emergency', href: '/zh/budget-with-irregular-income/', title: '收入不固定的月預算', ask: '接案或業績抽成的人，月預算怎麼抓才不會月底才發現錢不夠？' },

  { role: 'guide', group: 'income-tax', href: '/zh/hourly-vs-annual-salary/', title: '時薪換算年薪', ask: '時薪、月薪、年薪互相換算之前，稅前稅後、加班費倍率和基本工資要先分清楚什麼？' },
  { role: 'guide', group: 'income-tax', href: '/zh/pay-raise-vs-inflation-purchasing-power/', title: '加薪有追上通膨嗎', ask: '加薪之後，你的實質購買力是變多還是變少？' },
  { role: 'guide', group: 'income-tax', href: '/zh/true-hourly-wage-after-commuting-work-expenses/', title: '扣掉通勤後的真實時薪', ask: '扣掉通勤和工作支出、算進必要的時間，你一小時實際賺多少？' },

  // ---- 金錢速查：現行規則、費率與補助 -----------------------------------------
  { role: 'reference', group: 'membership-subscription', href: '/zh/money/phone-contract-subsidy-value/', title: '手機綁約補貼值多少', ask: '電信綁約送的手機補貼攤到每個月值多少，提前解約又要還多少？' },

  { role: 'reference', group: 'transport-commute', href: '/zh/money/tpass-commuter-pass-breakeven/', title: 'TPASS 通勤月票', ask: '通勤月票的價格，你每個月要搭幾趟才回本？' },
  { role: 'reference', group: 'transport-commute', href: '/zh/money/freeway-etc-commute-toll/', title: '國道 ETC 通勤費', ask: '每天開國道往返，套用優惠里程和 eTag 折扣後，一個月通行費多少？' },
  { role: 'reference', group: 'transport-commute', href: '/zh/money/car-road-fee-license-tax-fixed-cost/', title: '牌照稅與公路養管費', ask: '排氣量不同，一年要繳的牌照稅和公路養管費差多少？' },
  { role: 'reference', group: 'transport-commute', href: '/zh/money/e-scooter-subsidy-2026/', title: '電動機車補助', ask: '買電動機車，中央和縣市的補助加起來最多可以領多少？' },

  { role: 'reference', group: 'big-spending', href: '/zh/money/ac-energy-grade-payback/', title: '冷氣一級與三級的電費差', ask: '冷氣買能效一級而不是三級，省下的電費多久能補回價差？' },
  { role: 'reference', group: 'big-spending', href: '/zh/money/taipower-summer-rates-ac-bill/', title: '夏天開冷氣的電費', ask: '夏天多開冷氣，一個月會多出多少電費？' },
  { role: 'reference', group: 'big-spending', href: '/zh/money/taipower-summer-vs-non-summer-rates/', title: '夏月與非夏月電價', ask: '同樣的用電度數，夏月比非夏月多繳多少？' },
  { role: 'reference', group: 'big-spending', href: '/zh/money/taipower-time-of-use-vs-tiered/', title: '時間電價 vs 累進電價', ask: '改用時間電價，尖峰時段的用電占比要低於多少才划算？' },
  { role: 'reference', group: 'big-spending', href: '/zh/money/car-loan-vs-cash/', title: '車貸還是付現', ask: '買車貸款比付現多花多少，同樣的錢放定存又能賺多少？' },
  { role: 'reference', group: 'big-spending', href: '/zh/money/central-bank-rate-mortgage-payment/', title: '央行升息半碼，房貸月付增加多少', ask: '央行升息半碼、銀行同幅調升房貸利率，每月大約多繳多少？' },
  { role: 'reference', group: 'big-spending', href: '/zh/money/mortgage-grace-period-end-payment/', title: '房貸寬限期結束後的月付', ask: '寬限期一結束，房貸月付會跳多少，又多付了多少利息？' },
  { role: 'reference', group: 'big-spending', href: '/zh/money/mortgage-prepay-vs-invest/', title: '房貸提前還款還是放定存', ask: '手上多一筆錢，提前還房貸和放定存哪個賺得多？' },
  { role: 'reference', group: 'big-spending', href: '/zh/money/youth-home-loan-3-subsidy-value/', title: '新青安貸款的補貼值', ask: '新青安的利息補貼折合多少錢，不同貸款年限的利息又差多少？' },
  { role: 'reference', group: 'big-spending', href: '/zh/money/house-tax-owner-occupied-vs-non/', title: '房屋稅：自住與非自住', ask: '同一間房子，自住和非自住的房屋稅差多少？' },
  { role: 'reference', group: 'big-spending', href: '/zh/money/land-value-tax-owner-occupied-rate/', title: '地價稅自用住宅稅率', ask: '地價稅的自用住宅優惠稅率怎麼申請，錯過申請期限會怎樣？' },
  { role: 'reference', group: 'big-spending', href: '/zh/money/rent-subsidy-300b-amount/', title: '租金補貼可以領多少', ask: '中央租金補貼依地區和身分，每個月最多可以領多少？' },

  { role: 'reference', group: 'retirement-insurance', href: '/zh/money/labor-pension-voluntary-contribution-tax/', title: '勞退自提一年省多少稅', ask: '勞退自願提繳，一年可以省下多少所得稅？' },
  { role: 'reference', group: 'retirement-insurance', href: '/zh/money/national-pension-vs-labor-insurance/', title: '國民年金與勞保老年給付', ask: '國民年金和勞保老年給付，保費與月領金額怎麼比？' },
  { role: 'reference', group: 'retirement-insurance', href: '/zh/money/nhi-premium-insured-salary-grade/', title: '健保費怎麼算', ask: '上班族每月自付的健保費，怎麼從投保金額和眷屬人數算出來？' },
  { role: 'reference', group: 'retirement-insurance', href: '/zh/money/nhi-supplementary-premium/', title: '二代健保補充保費', ask: '獎金、兼職薪資、股利、利息和租金，在什麼條件下會被扣補充保費？' },
  { role: 'reference', group: 'retirement-insurance', href: '/zh/money/savings-insurance-irr/', title: '儲蓄險 IRR', ask: '儲蓄險每年繳多少、領回多少，換算成年化報酬是多少？' },

  { role: 'reference', group: 'savings-emergency', href: '/zh/money/time-deposit-early-withdrawal/', title: '定存中途解約', ask: '定存中途解約，會少拿多少利息？' },

  { role: 'reference', group: 'income-tax', href: '/zh/money/dependent-exemption-tax-savings/', title: '扶養親屬免稅額', ask: '多報一位扶養親屬，可以省下多少所得稅？' },
  { role: 'reference', group: 'income-tax', href: '/zh/money/itemized-vs-standard-deduction/', title: '列舉扣除還是標準扣除', ask: '綜合所得稅報稅時，選列舉扣除還是標準扣除比較省？' },
  { role: 'reference', group: 'income-tax', href: '/zh/money/year-end-bonus-withholding-tax/', title: '年終獎金的扣繳稅', ask: '年終獎金發下來時先被扣的稅，和最後要繳的稅是同一筆嗎？' },
];

export const roleMeta: Record<DirectoryRole, { dir: string; name: string; short: string; job: string }> = {
  tool: {
    dir: '/zh/tools/',
    name: '全部計算機',
    short: '計算機',
    job: '想直接輸入自己的數字、馬上看到結果',
  },
  guide: {
    dir: '/zh/guides/',
    name: '全部指南',
    short: '指南',
    job: '想先弄懂怎麼比較、哪些數字會改變答案',
  },
  reference: {
    dir: '/zh/money/',
    name: '金錢速查',
    short: '速查',
    job: '想查台灣現行的規則、費率與補助，並確認數字的查核日期',
  },
};

export const entriesByRole = (role: DirectoryRole): DirectoryEntry[] => directoryEntries.filter((entry) => entry.role === role);

export const entryForHref = (href: string): DirectoryEntry | undefined => directoryEntries.find((entry) => entry.href === href);

export const groupById = (id: DirectoryGroupId): DirectoryGroup => directoryGroups.find((group) => group.id === id)!;

/**
 * Where a page sits: its directory, scenario group and the anchor of that group.
 * Used by the topic strip at the foot of every content page.
 */
export function directoryLocation(href: string): { role: DirectoryRole; group: DirectoryGroup; anchor: string } | undefined {
  const entry = entryForHref(href);
  if (!entry) return undefined;
  return { role: entry.role, group: groupById(entry.group), anchor: `${roleMeta[entry.role].dir}#${entry.group}` };
}
