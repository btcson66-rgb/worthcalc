import { LOCALE_HREFLANG, SITE, type CoreLocale } from '../consts';
import type { EntityJsonLdOptions, FaqItem } from './seo';
import { organizationId, webSiteId } from './seo';

interface HomeTool {
  icon: string;
  title: string;
  path: string;
  description: string;
}

interface HomeGuide {
  title: string;
  path: string;
  description: string;
}

interface HomeValue {
  heading: string;
  lead: string;
  items: { title: string; body: string }[];
}

interface HomeCategories {
  heading: string;
  lead: string;
  cta: string;
}

/** Copy for the section that hands the reader off to the two directories. */
interface HomeLibrary {
  heading: string;
  lead: string;
  calculators: string;
  guides: string;
  moreTopics: string;
}

interface HomeTrustSource {
  label: string;
  href: string;
}

interface HomeTrust {
  heading: string;
  methodHeading: string;
  method: string;
  sourcesHeading: string;
  sourcesLead: string;
  sources?: HomeTrustSource[];
  scopeHeading: string;
  scope: string;
  reviewedLabel: string;
  reviewedDate: string;
  reviewedDisplay: string;
  advice: string;
}

export interface HomeContent {
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  accent: string;
  headingSuffix: string;
  intro: string;
  badges: string[];
  entity?: EntityJsonLdOptions;
  value: HomeValue;
  categories: HomeCategories;
  library: HomeLibrary;
  trust: HomeTrust;
  toolsHeading: string;
  toolsLead: string;
  toolsCta: string;
  tools: HomeTool[];
  methodHeading: string;
  methodLead: string;
  methodSteps: string[];
  guidesHeading: string;
  guidesLead: string;
  guidesCta: string;
  guides: HomeGuide[];
  guidesMore: string;
  faqHeading: string;
  faq: FaqItem[];
}

export const homeContent: Record<CoreLocale, HomeContent> = {
  en: {
    title: 'Transparent Calculators for Real Money Decisions',
    description:
      'WorthCalc turns money decisions into visible arithmetic. Every calculator states its formula, lets you replace the defaults with your own numbers, and says what it leaves out.',
    eyebrow: 'Break-even, total cost, and affordability, worked in the open',
    heading: 'Transparent calculators for ',
    accent: 'real money decisions',
    headingSuffix: '',
    intro:
      'Most money questions have a threshold hiding in them: the spend where a fee pays for itself, the year where buying beats renting, the number of uses that makes a purchase worth it. WorthCalc finds that threshold and shows the arithmetic that produced it.',
    badges: ['Transparent formulas', 'Editable assumptions', 'Browser-based'],
    entity: {
      description:
        'WorthCalc publishes transparent calculators and decision guides across six money topics: housing affordability, debt and credit, transportation and ownership cost, everyday break-evens, subscriptions and memberships, and income, savings and growth.',
      topics: [
        'Housing affordability and rent versus buy',
        'Debt, credit and true borrowing cost',
        'Transportation and total cost of ownership',
        'Everyday break-even and cost per use',
        'Subscriptions and membership break-even',
        'Income, savings rate and compound growth',
      ],
    },
    value: {
      heading: 'What WorthCalc is for',
      lead: 'A number you cannot check is not much better than a guess. These three rules decide what gets published here.',
      items: [
        {
          title: 'The formula is on the page',
          body: 'Every calculator states the arithmetic it runs and shows the intermediate figures, so you can verify the result rather than trust it.',
        },
        {
          title: 'The assumptions are yours to change',
          body: 'Defaults are editable examples, never market averages or quotes. Replace them with your own bill, contract, statement or offer.',
        },
        {
          title: 'The limits are written down',
          body: 'Each page names what it excludes — taxes, eligibility rules, contract terms — and which input would reverse the conclusion.',
        },
      ],
    },
    categories: {
      heading: 'Four decisions WorthCalc covers in depth',
      lead: 'Each area pairs the calculators that produce a number with the guides that explain what the number means.',
      cta: 'Open this topic',
    },
    library: {
      heading: 'Browse the whole library',
      lead: 'Two directories, both grouped by topic: one for the calculators, one for the written guides behind them.',
      calculators: 'All calculators',
      guides: 'All guides',
      moreTopics: 'More topics',
    },
    trust: {
      heading: 'Method, sources, and limits',
      methodHeading: 'Method',
      method:
        'Each calculator applies a visible formula to the values you enter, compares alternatives over the same period, and returns a break-even threshold, total cost, or ratio. Editable defaults are examples, not quotes or recommendations.',
      sourcesHeading: 'Data sources',
      sourcesLead:
        "Start with your own current contract, statement, bill, quote, paystub, and provider terms. The calculation frameworks link to these durable public sources already used by the site's supporting guides:",
      sources: [
        { label: 'Costco — Executive Rewards terms', href: 'https://www.costco.com/executive-rewards.html' },
        { label: 'Consumer Financial Protection Bureau — credit-card rewards program guidance', href: 'https://www.consumerfinance.gov/compliance/circulars/consumer-financial-protection-circular-2024-07-design-marketing-and-administration-of-credit-card-rewards-programs/' },
        { label: 'IRS Publication 463 — commuting and vehicle-expense boundaries', href: 'https://www.irs.gov/publications/p463' },
        { label: 'Consumer Financial Protection Bureau — debt-to-income ratio', href: 'https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-en-1791/' },
      ],
      scopeHeading: 'What the calculators include',
      scope:
        'A result includes only the inputs and categories named on that calculator. It does not automatically include every tax, fee, eligibility or underwriting rule, reward exclusion, route condition, employer benefit, financing term, or personal risk.',
      reviewedLabel: 'Homepage method last reviewed',
      reviewedDate: '2026-08-24',
      reviewedDisplay: 'August 24, 2026',
      advice:
        'WorthCalc provides general educational estimates. This is not financial advice, and no result predicts approval, guarantees savings, or replaces current terms or qualified professional advice.',
    },
    toolsHeading: 'Most-used calculators',
    toolsLead: 'Ten to start with. The full catalogue, grouped by topic, is on the calculator directory.',
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
        icon: '🛞',
        title: 'Cost Per Mile Calculator',
        path: '/tools/cost-per-mile',
        description: 'Calculate total car cost per mile, including energy, depreciation, insurance, maintenance, and fees.',
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
    methodHeading: 'A decision process you can audit',
    methodLead: 'A useful calculator shows what changes the answer instead of hiding a recommendation behind one default.',
    methodSteps: [
      'Start with the contract, bill, quote, or usage history—not a promotional headline.',
      'Compare alternatives over the same period and keep recoverable value separate from true cost.',
      'Change the uncertain inputs until the result flips; a fragile answer needs more evidence.',
      'Confirm current prices, taxes, eligibility, cancellation rules, and professional advice where the stakes require it.',
    ],
    guidesHeading: 'Popular decision guides',
    guidesLead: 'Use the deeper guides when one calculator is not enough. Each one exposes its formula, worked example, sensitivity cases, limitations, and source trail.',
    guidesCta: 'Read guide',
    guides: [
      { title: 'The truth about 0% installments', path: '/zero-interest-installments-truth', description: 'Separate the cash price, mandatory fees, lost discounts, and the real annualized cost.' },
      { title: 'Rent versus buy: the complete framework', path: '/rent-vs-buy-guide', description: 'Compare the same home and holding period, including sale proceeds and the opportunity cost of upfront cash.' },
      { title: 'EV versus gas total cost', path: '/ev-vs-gas-total-cost', description: 'Build the comparison from purchase, energy, insurance, maintenance, incentives, and resale.' },
      { title: 'Annual-fee card break-even', path: '/annual-fee-card-breakeven', description: 'Test renewal value against the no-fee card you could actually use, not against zero rewards.' },
      { title: 'True hourly wage after work costs', path: '/true-hourly-wage-after-commuting-work-expenses', description: 'Reprice a job with take-home pay, required time, commuting, and unreimbursed expenses.' },
      { title: 'Pay raise versus inflation', path: '/pay-raise-vs-inflation-purchasing-power', description: 'Use matching CPI periods to distinguish a nominal raise from a real purchasing-power change.' },
    ],
    guidesMore: 'Every guide, grouped by topic',
    faqHeading: 'Common questions about WorthCalc',
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
    title: '算得出來的金錢決策：公式透明的計算機',
    description:
      'WorthCalc 把金錢決策變成看得見的算式。每個計算機都寫出公式、讓你用自己的數字取代預設值，並說明它刻意不納入什麼。',
    eyebrow: '回本門檻、完整成本與負擔能力，全部攤開來算',
    heading: '算得出來的',
    accent: '金錢決策',
    headingSuffix: '：公式透明、假設可調',
    intro:
      '大多數金錢問題裡都藏著一個門檻：年費要刷多少才回本、第幾年買房才勝過租房、一件東西要用幾次才值得。WorthCalc 把那個門檻算出來，並把得到它的算式一起攤開。',
    badges: ['公式公開', '假設可調整', '瀏覽器本機試算'],
    entity: {
      description:
        'WorthCalc 提供公式透明的計算機與決策指南，涵蓋六個金錢主題：住房負擔能力、債務與信用、交通與持有成本、日常回本門檻、訂閱與會員，以及收入、儲蓄與成長。',
      topics: [
        '住房負擔能力與租買比較',
        '債務、信用與真實借貸成本',
        '交通與總持有成本',
        '日常回本門檻與每次使用成本',
        '訂閱與會員回本門檻',
        '收入、儲蓄率與複利成長',
      ],
    },
    value: {
      heading: 'WorthCalc 想解決的問題',
      lead: '一個你無法自己驗算的數字，和猜的差別不大。本站只出版符合這三條規則的內容。',
      items: [
        {
          title: '公式就寫在頁面上',
          body: '每個計算機都會寫出它執行的算式，並顯示中間數字，讓你可以自己核對結果，而不是只能相信它。',
        },
        {
          title: '假設由你決定',
          body: '預設值是可以修改的範例，不是市場平均值，也不是報價。請換成你自己的帳單、契約、對帳單或報價單。',
        },
        {
          title: '限制會寫清楚',
          body: '每一頁都會說明它不納入什麼——稅費、資格條件、契約條款——以及哪一個輸入值會讓結論翻轉。',
        },
      ],
    },
    categories: {
      heading: 'WorthCalc 深入整理的四個決策主題',
      lead: '每個主題都把算出數字的計算機，和解釋這個數字代表什麼的指南放在一起。',
      cta: '進入這個主題',
    },
    library: {
      heading: '瀏覽完整內容庫',
      lead: '兩份依主題分類的索引：一份是所有計算機，一份是它們背後的文字指南。',
      calculators: '全部計算機',
      guides: '全部指南',
      moreTopics: '更多主題',
    },
    trust: {
      heading: '計算方法、資料來源與限制',
      methodHeading: '計算方法',
      method:
        '每個計算機都把你輸入的數字帶入頁面公開的公式，在相同期間比較方案，並輸出回本門檻、總成本或比率。可調整的預設值只是示範，不是報價或建議。',
      sourcesHeading: '資料來源',
      sourcesLead:
        '應優先使用你手上的最新契約、帳單、報價、薪資單與業者條款。各主題的計算框架另引用本站既有指南使用的長期公開來源：',
      sources: [
        { label: 'Costco 好市多台灣 — 會員權益與方案', href: 'https://www.costco.com.tw/membership' },
        { label: '金融監督管理委員會 — 信用卡定型化契約規範', href: 'https://law.fsc.gov.tw/LawContent.aspx?id=FL049905&media=print' },
        { label: '交通部運輸研究所 — 通勤與行車成本分類', href: 'https://www.iot.gov.tw/zh_tw/archive/pub/reports/-59902021' },
        { label: '中華民國銀行公會 — 會員授信準則', href: 'https://www.ba.org.tw/Upload/Important/38c042e7-fa61-4bff-88c6-7dc5733f0d1e/%E6%8E%88%E4%BF%A1%E6%BA%96%E5%89%87%E5%85%A8%E6%96%8710701.pdf' },
      ],
      scopeHeading: '計算機會納入哪些項目',
      scope:
        '試算只會納入該計算機明列且由你輸入的項目；不會自動涵蓋所有稅費、資格或授信規則、回饋排除、路線條件、雇主補助、融資條款與個人風險。',
      reviewedLabel: '首頁方法最後審閱',
      reviewedDate: '2026-08-24',
      reviewedDisplay: '2026 年 8 月 24 日',
      advice:
        'WorthCalc 提供一般教育用途的估算。本頁不是財務建議，任何結果都不代表核准、不保證節省，也不能取代最新契約條款或合格專業人士的個別建議。',
    },
    toolsHeading: '最常用的計算機',
    toolsLead: '先從這十個開始。完整目錄依主題分類，放在計算機索引頁。',
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
        icon: '🛞',
        title: '每公里養車成本計算機',
        path: '/tools/cost-per-mile',
        description: '計算汽車或機車每公里總成本，拆出油電、折舊、保險、保養、輪胎與稅費。',
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
    methodHeading: '一套可以自行核對的決策流程',
    methodLead: '好用的計算機不應替你藏住假設，而要讓你看見答案在哪個條件下會翻轉。',
    methodSteps: [
      '先找合約、帳單、報價與實際使用紀錄，不拿廣告標語當輸入值。',
      '所有方案使用同一比較期間，並把可回收價值與真正支出分開。',
      '調整利率、使用次數、持有年限與轉售價，找出結論是否穩健。',
      '行動前再確認最新價格、資格、稅費、取消規則；重大決定應找合格專業人士。',
    ],
    guidesHeading: '熱門金錢決策指南',
    guidesLead: '需要比單一數字更完整的答案時，閱讀含公式、案例、敏感度、限制與官方來源的深度指南。',
    guidesCta: '閱讀指南',
    guides: [
      { title: '零利率分期真的零成本嗎？', path: '/zero-interest-installments-truth', description: '把現金價、必要手續費、放棄折扣與真實年化成本分開核對。' },
      { title: '租屋還是買房完整比較', path: '/rent-vs-buy-guide', description: '以同地段、同居住期間比較房貸利息、持有成本、期末淨值與頭期款機會成本。' },
      { title: '電動車與油車總持有成本', path: '/ev-vs-gas-total-cost', description: '從購車淨價、能源、保險、保養、補助與轉售價建立完整比較。' },
      { title: '信用卡年費回本門檻', path: '/annual-fee-card-breakeven', description: '把續卡價值與實際可申辦的免年費卡比較，而不是假設替代方案零回饋。' },
      { title: '扣除通勤與工作成本的真實時薪', path: '/true-hourly-wage-after-commuting-work-expenses', description: '用同一期實領、必要時間、通勤與未報銷支出重新比較工作。' },
      { title: '加薪有沒有跑贏通膨？', path: '/pay-raise-vs-inflation-purchasing-power', description: '使用相同期間 CPI，分清楚名目加薪與實質購買力變化。' },
    ],
    guidesMore: '全部指南，依主題分類',
    faqHeading: '關於 WorthCalc 的常見問題',
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
  es: {
    title: 'Calculadoras transparentes para decisiones de dinero',
    description: 'WorthCalc convierte una decisión de dinero en una cuenta que puedes revisar: cada calculadora muestra su fórmula, admite tus cifras y explica qué deja fuera.',
    eyebrow: 'Decisiones de dinero con cuentas claras',
    heading: 'Antes de pagar, calcula el ',
    accent: 'coste real',
    headingSuffix: '.',
    intro: 'Una cuota baja, un 0 % o un regalo de bienvenida no cuentan toda la historia. Introduce tus cifras y compara el coste total, el plazo y la alternativa real. Los cálculos se hacen en tu navegador, sin registro y sin enviar tus importes a WorthCalc.',
    badges: ['Sin registro', 'Datos en tu dispositivo', 'Uso gratuito'],
    value: {
      heading: 'Para qué sirve WorthCalc',
      lead: 'Una cifra que no puedes comprobar no vale mucho más que una intuición. Estas tres reglas deciden qué se publica aquí.',
      items: [
        { title: 'La fórmula está en la página', body: 'Cada calculadora indica la operación que ejecuta y muestra los pasos intermedios, para que compruebes el resultado en lugar de creerlo.' },
        { title: 'Los supuestos los cambias tú', body: 'Los valores iniciales son ejemplos editables, nunca medias del mercado ni ofertas. Sustitúyelos por tu factura, contrato, extracto o presupuesto.' },
        { title: 'Los límites están escritos', body: 'Cada página nombra lo que deja fuera —impuestos, requisitos, cláusulas— y qué dato invertiría la conclusión.' },
      ],
    },
    categories: {
      heading: 'Cuatro decisiones que WorthCalc trata a fondo',
      lead: 'Cada área reúne las calculadoras que producen la cifra y las guías que explican qué significa.',
      cta: 'Ver este tema',
    },
    library: {
      heading: 'Recorre toda la biblioteca',
      lead: 'Dos índices agrupados por tema: uno con las calculadoras y otro con las guías que hay detrás.',
      calculators: 'Todas las calculadoras',
      guides: 'Todas las guías',
      moreTopics: 'Más temas',
    },
    trust: {
      heading: 'Método, fuentes y límites',
      methodHeading: 'Método',
      method: 'Cada calculadora aplica una fórmula visible a los datos que introduces, compara alternativas durante el mismo plazo y devuelve un umbral de equilibrio, un coste total o una ratio. Los valores iniciales son ejemplos editables, no ofertas ni recomendaciones.',
      sourcesHeading: 'Referencias',
      sourcesLead: 'Empieza por tu contrato, factura, extracto, oferta o nómina vigentes. Para distinguir información de asesoramiento, estas referencias públicas ya se citan en las páginas legales del sitio:',
      sources: [
        { label: 'CNMV — qué es el asesoramiento en materia de inversión', href: 'https://www.cnmv.es/portal/inversor/asesoramiento?lang=es' },
        { label: 'CNMV — información que debe revisarse antes de decidir', href: 'https://www.cnmv.es/portal/inversor/decisiones-informarse?lang=es' },
      ],
      scopeHeading: 'Qué incluye el cálculo',
      scope: 'El resultado solo incluye las entradas y categorías que la calculadora nombra. No incorpora automáticamente todos los impuestos, requisitos de contratación, exclusiones de recompensa, condiciones de ruta, ayudas del empleador, cláusulas de financiación ni riesgos personales.',
      reviewedLabel: 'Método de la portada revisado por última vez',
      reviewedDate: '2026-09-05',
      reviewedDisplay: '5 de septiembre de 2026',
      advice: 'WorthCalc ofrece estimaciones educativas de carácter general. No es asesoramiento financiero: ningún resultado predice una aprobación, garantiza un ahorro ni sustituye las condiciones vigentes o el criterio de un profesional cualificado.',
    },
    toolsHeading: 'Calculadoras más usadas',
    toolsLead: 'Un punto de partida. El catálogo completo, agrupado por tema, está en el índice de calculadoras.',
    toolsCta: 'Abrir calculadora',
    tools: [
      { icon: '💳', title: 'Calculadora de TAE real de una compra a plazos', path: '/tools/installment-true-apr', description: 'Convierte comisión, entrada, descuento perdido y calendario de cuotas en un coste anual comparable.' },
      { icon: '📺', title: 'Auditor de suscripciones', path: '/tools/subscription-audit', description: 'Normaliza cobros mensuales, trimestrales y anuales y señala servicios cuyo uso aún no has comprobado.' },
      { icon: '🛒', title: 'Calculadora de rentabilidad de una membresía', path: '/tools/costco-membership', description: 'Compara cuota, ahorro real, desplazamiento, desperdicio y compras que no habrías hecho sin la membresía.' },
      { icon: '🚗', title: 'Coche eléctrico frente a gasolina: coste total', path: '/tools/ev-vs-gas', description: 'Compara precio neto, instalación de carga, energía, seguro, mantenimiento, impuestos y reventa.' },
      { icon: '🏠', title: 'Alquilar o comprar vivienda', path: '/tools/rent-vs-buy', description: 'Pon en el mismo horizonte entrada, hipoteca, gastos de compra y venta, alquiler y patrimonio final.' },
      { icon: '🚌', title: 'Coste completo de ir al trabajo', path: '/tools/commute-cost', description: 'Suma transporte, vehículo, aparcamiento, días presenciales y un valor de tiempo que tú decides.' },
      { icon: '☕', title: 'Gasto recurrente y ahorro potencial', path: '/tools/latte-factor', description: 'Distingue el gasto evitado del dinero que realmente transfieres y del rendimiento que solo es una hipótesis.' },
      { icon: '🎁', title: 'Punto de equilibrio de una tarjeta con cashback', path: '/tools/cashback-breakeven', description: 'Separa el primer año de la renovación y compara la tarjeta de cuota con una alternativa real sin cuota.' },
    ],
    methodHeading: 'Cómo tomar una decisión que puedas defender',
    methodLead: 'La respuesta útil no es un “sí” automático: es saber qué dato manda y a partir de qué cifra cambia el resultado.',
    methodSteps: [
      'Copia importes de la oferta, contrato, factura, extracto o historial de uso; no del titular publicitario.',
      'Compara alternativas durante el mismo plazo y no confundas devolución de capital o valor de reventa con gasto.',
      'Prueba un escenario prudente y otro desfavorable para localizar la TAE, uso, precio o plazo que invierte la conclusión.',
      'Antes de contratar, verifica TAE, comisiones, permanencia, derecho de desistimiento, fiscalidad y condiciones vigentes.',
    ],
    guidesHeading: 'Guías de decisiones financieras en España',
    guidesLead: 'Cada guía muestra respuesta directa, fórmula, ejemplo reproducible, sensibilidad, límites y fuentes oficiales o de consumo.',
    guidesCta: 'Leer la guía',
    guides: [
      { title: '¿Es verdad una financiación al 0 %?', path: '/zero-interest-installments-truth', description: 'Comprueba precio al contado, comisión, productos vinculados y TAE en vez de mirar solo la cuota.' },
      { title: 'Alquilar o comprar: comparación completa', path: '/rent-vs-buy-guide', description: 'Incluye ITP o IVA, gastos de formalización, hipoteca, mantenimiento, venta y coste de oportunidad.' },
      { title: 'Coste total del coche eléctrico y de gasolina', path: '/ev-vs-gas-total-cost', description: 'Usa consumo en kWh/100 km o l/100 km, tarifas reales, ayudas confirmadas y valor de reventa.' },
      { title: 'Tarjeta con cuota anual: gasto de equilibrio', path: '/annual-fee-card-breakeven', description: 'Valora límites, categorías, forma de canje, intereses y la tarjeta sin cuota disponible para ti.' },
      { title: 'Salario real por hora tras transporte y gastos', path: '/true-hourly-wage-after-commuting-work-expenses', description: 'Compara ofertas con nómina neta, tiempo necesario y costes no reembolsados del mismo periodo.' },
      { title: 'Subida salarial frente a inflación', path: '/pay-raise-vs-inflation-purchasing-power', description: 'Alinea fechas e IPC para calcular el cambio de poder adquisitivo, no solo el porcentaje nominal.' },
    ],
    guidesMore: 'Todas las guías, por tema',
    faqHeading: 'Preguntas frecuentes',
    faq: [
      { question: '¿Qué diferencia hay entre TIN, TAE y coste total?', answer: 'El TIN expresa el tipo nominal; la TAE anualiza el coste con la frecuencia de pagos y determinados gastos; el coste total muestra euros pagados. Para comparar ofertas necesitas revisar los tres y las condiciones del contrato.' },
      { question: '¿Las cifras de ejemplo son precios medios de España?', answer: 'No. Son escenarios editables para explicar el método. Sustitúyelos por una oferta, factura, tarifa, nómina o presupuesto vigente y prueba más de un escenario.' },
      { question: '¿WorthCalc guarda mis importes?', answer: 'Los cálculos se ejecutan en tu navegador. Algunas herramientas pueden recordar datos en el almacenamiento local de tu propio dispositivo, pero no envían los importes a un servidor propio de WorthCalc.' },
      { question: '¿El resultado sustituye a un asesor?', answer: 'No. Es una estimación general. Deuda, vivienda, impuestos, empleo e inversión pueden depender de circunstancias que una calculadora pública no conoce.' },
    ],
  },
  fr: {
    title: 'Calculateurs transparents pour vos décisions d’argent',
    description: 'WorthCalc transforme une décision d’argent en calcul vérifiable : chaque calculateur affiche sa formule, accepte vos chiffres et indique ce qu’il laisse de côté.',
    eyebrow: 'Décider avec un coût complet',
    heading: 'Avant de signer, calculez ce que cela ',
    accent: 'coûte vraiment',
    headingSuffix: '.',
    intro: 'Une mensualité, une remise ou une prime de bienvenue ne suffit pas pour comparer. Reconstituez le coût total, choisissez la même durée et testez l’hypothèse qui ferait basculer le résultat. Les montants restent dans votre navigateur, sans compte.',
    badges: ['Sans inscription', 'Calcul local', 'Accès gratuit'],
    value: {
      heading: 'À quoi sert WorthCalc',
      lead: 'Un chiffre que vous ne pouvez pas vérifier ne vaut guère mieux qu’une intuition. Trois règles décident de ce qui est publié ici.',
      items: [
        { title: 'La formule est sur la page', body: 'Chaque calculateur énonce l’opération qu’il effectue et montre les étapes intermédiaires, pour que vous puissiez contrôler le résultat au lieu de le croire.' },
        { title: 'Les hypothèses vous appartiennent', body: 'Les valeurs préremplies sont des exemples modifiables, jamais des moyennes de marché ni des offres. Remplacez-les par votre facture, contrat, relevé ou devis.' },
        { title: 'Les limites sont écrites', body: 'Chaque page nomme ce qu’elle exclut — fiscalité, conditions d’éligibilité, clauses — et l’hypothèse qui renverserait la conclusion.' },
      ],
    },
    categories: {
      heading: 'Quatre décisions traitées en profondeur',
      lead: 'Chaque thème réunit les calculateurs qui produisent le chiffre et les guides qui expliquent ce qu’il signifie.',
      cta: 'Voir ce thème',
    },
    library: {
      heading: 'Parcourir toute la bibliothèque',
      lead: 'Deux index classés par thème : l’un pour les calculateurs, l’autre pour les guides qui les accompagnent.',
      calculators: 'Tous les calculateurs',
      guides: 'Tous les guides',
      moreTopics: 'Autres thèmes',
    },
    trust: {
      heading: 'Méthode, références et limites',
      methodHeading: 'Méthode',
      method: 'Chaque calculateur applique une formule visible aux montants que vous saisissez, compare les options sur la même durée et renvoie un seuil de rentabilité, un coût complet ou un ratio. Les valeurs préremplies sont des exemples modifiables, pas des offres ni des recommandations.',
      sourcesHeading: 'Références',
      sourcesLead: 'Partez de votre contrat, facture, relevé, offre ou bulletin de paie en cours. Pour distinguer information et conseil, ces références publiques sont déjà citées dans les pages légales du site :',
      sources: [
        { label: 'AMF — obligations d’un conseiller en investissements financiers', href: 'https://www.amf-france.org/fr/espace-epargnants/savoir-bien-investir/choisir-un-professionnel/conseillers-en-investissements-financiers' },
        { label: 'AMF — vérifier frais, risques et documentation avant de décider', href: 'https://www.amf-france.org/fr/espace-epargnants/savoir-bien-investir/conseils-pratiques/bien-suivre-ses-placements' },
      ],
      scopeHeading: 'Ce que le calcul comprend',
      scope: 'Le résultat ne contient que les entrées et les postes nommés par le calculateur. Il n’intègre pas automatiquement l’ensemble des taxes, conditions d’éligibilité, exclusions de récompense, contraintes de trajet, avantages employeur, clauses de financement ou risques personnels.',
      reviewedLabel: 'Méthode de la page d’accueil vérifiée le',
      reviewedDate: '2026-09-05',
      reviewedDisplay: '5 septembre 2026',
      advice: 'WorthCalc fournit des estimations pédagogiques générales. Ce n’est pas un conseil financier : aucun résultat ne prédit une acceptation, ne garantit une économie ni ne remplace les conditions en vigueur ou l’avis d’un professionnel qualifié.',
    },
    toolsHeading: 'Calculateurs les plus utilisés',
    toolsLead: 'De quoi commencer. Le catalogue complet, classé par thème, se trouve sur l’index des calculateurs.',
    toolsCta: 'Ouvrir le calculateur',
    tools: [
      { icon: '💳', title: 'TAEG réel d’un paiement fractionné', path: '/tools/installment-true-apr', description: 'Transformez frais, apport, remise abandonnée et échéancier en taux annuel et coût en euros.' },
      { icon: '📺', title: 'Audit des abonnements', path: '/tools/subscription-audit', description: 'Ramenez les paiements mensuels, trimestriels et annuels à une même base et vérifiez l’usage réel.' },
      { icon: '🛒', title: 'Seuil de rentabilité d’une adhésion', path: '/tools/costco-membership', description: 'Ajoutez cotisation, économies réellement obtenues, trajet, gaspillage et achats déclenchés par l’adhésion.' },
      { icon: '🚗', title: 'Voiture électrique ou thermique : coût total', path: '/tools/ev-vs-gas', description: 'Comparez prix net, recharge, énergie, assurance, entretien, taxes et revente sur la même durée.' },
      { icon: '🏠', title: 'Louer ou acheter son logement', path: '/tools/rent-vs-buy', description: 'Mettez face à face apport, prêt, frais d’acquisition et de vente, loyer et patrimoine net final.' },
      { icon: '🚌', title: 'Coût complet du trajet domicile-travail', path: '/tools/commute-cost', description: 'Comptez transport, voiture, stationnement, jours de présence et, séparément, votre valeur du temps.' },
      { icon: '☕', title: 'Petite dépense récurrente et épargne', path: '/tools/latte-factor', description: 'Séparez la dépense évitée du versement réellement épargné et d’un rendement qui n’est jamais garanti.' },
      { icon: '🎁', title: 'Rentabilité d’une carte à cotisation', path: '/tools/cashback-breakeven', description: 'Isolez la prime de première année et comparez le renouvellement à une vraie carte sans cotisation.' },
    ],
    methodHeading: 'Une méthode de comparaison vérifiable',
    methodLead: 'Un bon résultat indique les pièces utilisées, les hypothèses incertaines et le seuil qui change la décision.',
    methodSteps: [
      'Relevez les chiffres dans l’offre, le contrat, la facture, le relevé ou l’historique d’usage, pas dans le slogan.',
      'Utilisez le même horizon pour chaque option et séparez les dépenses de la valeur récupérée à la revente.',
      'Testez un scénario prudent puis défavorable afin d’identifier le taux, l’usage, le prix ou la durée de bascule.',
      'Avant d’agir, vérifiez TAEG, frais, résiliation, rétractation, aides, fiscalité et conditions encore en vigueur.',
    ],
    guidesHeading: 'Guides de décision adaptés au contexte français',
    guidesLead: 'Chaque dossier fournit une réponse courte, la formule, un exemple refaisable, des scénarios, les limites et les sources.',
    guidesCta: 'Lire le guide',
    guides: [
      { title: 'Le vrai coût d’un financement à 0 %', path: '/zero-interest-installments-truth', description: 'Comparez prix comptant, frais, assurance éventuelle, mensualités et TAEG au lieu de retenir le seul 0 %.' },
      { title: 'Louer ou acheter : cadre complet', path: '/rent-vs-buy-guide', description: 'Intégrez frais de notaire, crédit, charges, entretien, revente et rendement possible de l’apport.' },
      { title: 'Coût total électrique contre thermique', path: '/ev-vs-gas-total-cost', description: 'Utilisez kWh/100 km, l/100 km, tarifs, assurance, bonus confirmé, entretien et revente.' },
      { title: 'Carte bancaire à cotisation : seuil annuel', path: '/annual-fee-card-breakeven', description: 'Tenez compte des plafonds, catégories, valeur de conversion, intérêts et meilleure carte gratuite accessible.' },
      { title: 'Salaire horaire réel après trajet et frais', path: '/true-hourly-wage-after-commuting-work-expenses', description: 'Comparez salaire net, temps nécessaire et dépenses professionnelles non remboursées sur la même période.' },
      { title: 'Hausse de salaire et inflation', path: '/pay-raise-vs-inflation-purchasing-power', description: 'Alignez les périodes de salaire et d’IPC pour mesurer la variation réelle du pouvoir d’achat.' },
    ],
    guidesMore: 'Tous les guides, par thème',
    faqHeading: 'Questions fréquentes',
    faq: [
      { question: 'Pourquoi comparer le TAEG et pas seulement le taux ou la mensualité ?', answer: 'Le TAEG vise à exprimer le coût annuel global du crédit avec les éléments prévus par la réglementation. La mensualité dépend aussi de la durée : une petite mensualité peut produire un coût total plus élevé.' },
      { question: 'Les exemples représentent-ils les prix moyens en France ?', answer: 'Non. Ils servent à rendre la formule vérifiable. Remplacez-les par votre offre, facture, tarif, fiche de paie ou devis, puis testez plusieurs scénarios.' },
      { question: 'Mes montants sont-ils enregistrés ?', answer: 'Le calcul s’effectue dans votre navigateur. Certains outils peuvent utiliser le stockage local de votre appareil, mais les montants ne sont pas transmis à un serveur propre à WorthCalc.' },
      { question: 'Puis-je décider uniquement avec le résultat ?', answer: 'Non. Il s’agit d’une estimation générale. Crédit, logement, fiscalité, emploi et investissement exigent parfois un professionnel capable d’étudier votre dossier.' },
    ],
  },
  de: {
    title: 'Transparente Rechner für echte Geldentscheidungen',
    description: 'WorthCalc macht aus einer Geldentscheidung eine nachprüfbare Rechnung: Jeder Rechner nennt seine Formel, nimmt Ihre Zahlen und benennt, was er weglässt.',
    eyebrow: 'Geldentscheidungen mit vollständigen Kosten',
    heading: 'Vor dem Abschluss den ',
    accent: 'echten Preis',
    headingSuffix: ' berechnen.',
    intro: 'Null-Prozent-Werbung, eine niedrige Rate oder ein Willkommensbonus zeigen selten die ganze Rechnung. Vergleichen Sie Gesamtkosten, denselben Zeitraum und eine echte Alternative. Alle Eingaben werden ohne Konto direkt im Browser verarbeitet.',
    badges: ['Ohne Anmeldung', 'Eingaben bleiben lokal', 'Kostenlos nutzbar'],
    value: {
      heading: 'Wofür WorthCalc da ist',
      lead: 'Eine Zahl, die Sie nicht nachprüfen können, ist kaum besser als ein Bauchgefühl. Drei Regeln entscheiden, was hier erscheint.',
      items: [
        { title: 'Die Formel steht auf der Seite', body: 'Jeder Rechner nennt die Rechenoperation und zeigt die Zwischenwerte, damit Sie das Ergebnis prüfen können, statt es zu glauben.' },
        { title: 'Die Annahmen gehören Ihnen', body: 'Vorgaben sind änderbare Beispiele, keine Marktdurchschnitte und keine Angebote. Ersetzen Sie sie durch Rechnung, Vertrag, Kontoauszug oder Kostenvoranschlag.' },
        { title: 'Die Grenzen sind benannt', body: 'Jede Seite nennt, was sie auslässt — Steuern, Voraussetzungen, Vertragsklauseln — und welche Eingabe das Ergebnis umkehren würde.' },
      ],
    },
    categories: {
      heading: 'Vier Entscheidungen, die WorthCalc vertieft',
      lead: 'Jeder Bereich verbindet die Rechner, die eine Zahl liefern, mit den Ratgebern, die erklären, was sie bedeutet.',
      cta: 'Thema öffnen',
    },
    library: {
      heading: 'Die gesamte Bibliothek durchsehen',
      lead: 'Zwei nach Thema gruppierte Verzeichnisse: eines für die Rechner, eines für die Ratgeber dahinter.',
      calculators: 'Alle Rechner',
      guides: 'Alle Ratgeber',
      moreTopics: 'Weitere Themen',
    },
    trust: {
      heading: 'Methode, Quellen und Grenzen',
      methodHeading: 'Methode',
      method: 'Jeder Rechner wendet eine sichtbare Formel auf Ihre Eingaben an, vergleicht Alternativen über denselben Zeitraum und liefert eine Break-even-Schwelle, Gesamtkosten oder eine Kennzahl. Vorgaben sind änderbare Beispiele, keine Angebote und keine Empfehlungen.',
      sourcesHeading: 'Quellen',
      sourcesLead: 'Beginnen Sie mit Ihrem aktuellen Vertrag, Ihrer Rechnung, Abrechnung oder Ihrem Angebot. Zur Abgrenzung von Information und Beratung sind diese amtlichen Quellen bereits auf den Rechtsseiten der Website zitiert:',
      sources: [
        { label: 'BaFin — Prospekte und Informationsblätter vor einer Anlageentscheidung', href: 'https://www.bafin.de/DE/Verbraucher/GeldanlageWertpapiere/Prospektpflicht/prospekte_artikel.html' },
        { label: 'BaFin — Kosten, Risiken und Geeignetheit bei Publikumsfonds', href: 'https://bafin.de/DE/Verbraucher/GeldanlageWertpapiere/Produkte/GeschlossenerPublikumsfonds/Geschlossener_Publikumsfonds_node.html' },
      ],
      scopeHeading: 'Was die Rechnung enthält',
      scope: 'Ein Ergebnis enthält nur die Eingaben und Positionen, die der jeweilige Rechner benennt. Steuern, Voraussetzungen, Bonusausschlüsse, Streckenbedingungen, Arbeitgeberleistungen, Finanzierungsklauseln und persönliche Risiken sind nicht automatisch berücksichtigt.',
      reviewedLabel: 'Methode der Startseite zuletzt geprüft',
      reviewedDate: '2026-09-05',
      reviewedDisplay: '5. September 2026',
      advice: 'WorthCalc liefert allgemeine, unverbindliche Lernrechnungen. Das ist keine Finanzberatung: Kein Ergebnis sagt eine Zusage voraus, garantiert eine Ersparnis oder ersetzt geltende Vertragsbedingungen oder qualifizierten Rat.',
    },
    toolsHeading: 'Meistgenutzte Rechner',
    toolsLead: 'Ein Einstieg. Der vollständige Katalog, nach Thema gruppiert, steht im Rechnerverzeichnis.',
    toolsCta: 'Rechner öffnen',
    tools: [
      { icon: '💳', title: 'Effektivzins bei Ratenkauf und 0-%-Finanzierung', path: '/tools/installment-true-apr', description: 'Rechnet Gebühren, Anzahlung, verlorenen Barrabatt und Ratenplan in Jahreszins und Eurokosten um.' },
      { icon: '📺', title: 'Abo-Kosten-Check', path: '/tools/subscription-audit', description: 'Vereinheitlicht monatliche, vierteljährliche und jährliche Abbuchungen und markiert ungeprüfte Nutzung.' },
      { icon: '🛒', title: 'Mitgliedschaft: Kosten und Break-even', path: '/tools/costco-membership', description: 'Berücksichtigt Beitrag, echte Ersparnis, Anfahrt, Verderb und Käufe, die sonst nicht entstanden wären.' },
      { icon: '🚗', title: 'E-Auto oder Benziner: Gesamtkosten', path: '/tools/ev-vs-gas', description: 'Vergleicht Nettokaufpreis, Ladepunkt, Strom oder Kraftstoff, Versicherung, Wartung und Restwert.' },
      { icon: '🏠', title: 'Mieten oder Kaufen', path: '/tools/rent-vs-buy', description: 'Stellt Eigenkapital, Darlehen, Kauf- und Verkaufskosten, Miete und Nettovermögen gegenüber.' },
      { icon: '🚌', title: 'Vollständige Pendelkosten', path: '/tools/commute-cost', description: 'Addiert Fahrzeug, ÖPNV, Parken, Präsenztage und einen separat gewählten persönlichen Zeitwert.' },
      { icon: '☕', title: 'Regelmäßige Ausgabe und mögliches Sparen', path: '/tools/latte-factor', description: 'Trennt vermiedene Ausgaben, tatsächlich angelegtes Geld und eine nicht garantierte Renditeannahme.' },
      { icon: '🎁', title: 'Kreditkarte mit Jahresgebühr: Break-even', path: '/tools/cashback-breakeven', description: 'Zählt den Startbonus nur im ersten Jahr und vergleicht die Verlängerung mit einer echten Gratis-Karte.' },
    ],
    methodHeading: 'Eine Entscheidung, die sich nachrechnen lässt',
    methodLead: 'Der Rechner soll kein Urteil verstecken, sondern zeigen, welche Annahme entscheidet und wo das Ergebnis kippt.',
    methodSteps: [
      'Zahlen aus Vertrag, Preisblatt, Rechnung, Kontoauszug oder Nutzungsverlauf übernehmen – nicht aus der Werbezeile.',
      'Alternativen über denselben Zeitraum vergleichen und rückholbaren Restwert von echten Ausgaben trennen.',
      'Vorsichtige und ungünstige Fälle testen, bis Zinssatz, Nutzung, Preis oder Haltedauer das Ergebnis umkehrt.',
      'Vor dem Abschluss Effektivzins, Gebühren, Kündigung, Widerruf, Förderung, Steuern und aktuelle Bedingungen prüfen.',
    ],
    guidesHeading: 'Entscheidungsratgeber für Deutschland',
    guidesLead: 'Jeder Ratgeber enthält Kurzantwort, Formel, nachrechenbares Beispiel, Szenarien, Grenzen und nachvollziehbare Quellen.',
    guidesCta: 'Ratgeber lesen',
    guides: [
      { title: 'Die Wahrheit über 0-%-Finanzierung', path: '/zero-interest-installments-truth', description: 'Barpreis, Gebühren, Zusatzprodukte, Rahmenkredit und effektiven Jahreszins gemeinsam prüfen.' },
      { title: 'Mieten oder Kaufen: vollständiger Vergleich', path: '/rent-vs-buy-guide', description: 'Kaufnebenkosten, Zinsen, Instandhaltung, Verkauf, Restschuld und Opportunitätskosten einbeziehen.' },
      { title: 'E-Auto gegen Benziner: Gesamtkosten', path: '/ev-vs-gas-total-cost', description: 'Mit kWh/100 km, l/100 km, tatsächlichen Tarifen, Förderung, Versicherung, Wartung und Restwert rechnen.' },
      { title: 'Jahresgebühr der Kreditkarte: Umsatzschwelle', path: '/annual-fee-card-breakeven', description: 'Limits, Kategorien, Einlösewert, Sollzinsen und die beste tatsächlich verfügbare Gratis-Karte vergleichen.' },
      { title: 'Echter Stundenlohn nach Pendeln und Arbeitskosten', path: '/true-hourly-wage-after-commuting-work-expenses', description: 'Nettoentgelt, gebundene Zeit und nicht erstattete Ausgaben desselben Zeitraums zusammenführen.' },
      { title: 'Gehaltserhöhung gegen Inflation', path: '/pay-raise-vs-inflation-purchasing-power', description: 'Passende Zeiträume des Verbraucherpreisindex verwenden und reale Kaufkraft statt nur Prozentwerte messen.' },
    ],
    guidesMore: 'Alle Ratgeber, nach Thema',
    faqHeading: 'Häufige Fragen',
    faq: [
      { question: 'Warum ist der effektive Jahreszins wichtiger als die Monatsrate?', answer: 'Die Rate hängt stark von der Laufzeit ab. Der effektive Jahreszins macht viele preisbestimmende Kreditkosten jährlich vergleichbar; zusätzlich sollten Gesamtbetrag, Barpreis und Vertragsbedingungen geprüft werden.' },
      { question: 'Sind die Beispielwerte deutsche Durchschnittspreise?', answer: 'Nein. Sie machen die Rechenmethode nachvollziehbar. Ersetzen Sie sie durch ein aktuelles Angebot, eine Rechnung, einen Tarif, eine Abrechnung oder einen Kostenvoranschlag.' },
      { question: 'Speichert WorthCalc meine Zahlen?', answer: 'Die Berechnung läuft im Browser. Einzelne Rechner können den lokalen Speicher Ihres Geräts nutzen, die eingegebenen Beträge werden aber nicht an einen eigenen WorthCalc-Server gesendet.' },
      { question: 'Ersetzt das Ergebnis eine Beratung?', answer: 'Nein. Es ist eine allgemeine Schätzung. Bei Kredit, Wohnen, Steuern, Arbeitsrecht oder Geldanlage kann eine qualifizierte Beratung mit vollständigen Unterlagen nötig sein.' },
    ],
  },
};

export interface HomeFeaturedItem {
  title: string;
  path: string;
}

export function homeJsonLd(locale: CoreLocale, site?: URL, featured?: readonly HomeFeaturedItem[]): object[] {
  const content = homeContent[locale];
  const origin = (site?.origin ?? SITE.url).replace(/\/$/, '');
  const pageUrl = locale === 'en' ? `${origin}/` : `${origin}/${locale}/`;
  // The ItemList has to describe what the page actually renders, so the caller
  // passes the same featured selection the homepage lays out.
  const featuredItems = featured ?? content.tools;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: content.title,
      description: content.description,
      url: pageUrl,
      inLanguage: LOCALE_HREFLANG[locale],
      // Point at the one WebSite entity SEO.astro emits instead of repeating an
      // anonymous copy of it, so a consumer resolves one site rather than two.
      isPartOf: { '@id': webSiteId(site) },
      publisher: { '@id': organizationId(site) },
      ...(content.entity?.topics?.length
        ? { about: content.entity.topics.map((name) => ({ '@type': 'Thing', name })) }
        : {}),
      ...(content.trust ? { dateModified: content.trust.reviewedDate } : {}),
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: featuredItems.length,
        itemListElement: featuredItems.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.title,
          url: `${origin}/${locale}${item.path}/`,
        })),
      },
    },
  ];
}
