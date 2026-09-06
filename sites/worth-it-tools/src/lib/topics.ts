import type { ContentLocale, CoreLocale } from '../consts';
import { localizedPath } from '../i18n/utils';

/*
 * WorthCalc's topic architecture.
 *
 * Before 2026-09-05 the site had no topic layer at all: 1,207 URLs hung off a
 * homepage that listed every single guide (252 links on /en/ alone), and the
 * only other grouping was the flat `/tools/` and `/guides/` URL prefixes. That
 * is a sitemap, not an information architecture — it gives Google no signal
 * about which pages belong together, and it gives a reader no way to move
 * sideways from "is a Costco membership worth it" to the rest of the
 * membership maths.
 *
 * Six topics, derived from what the site actually publishes rather than from a
 * keyword list. Four of them are the decision clusters the homepage leads with
 * (PRIMARY_TOPIC_IDS); the other two are real but secondary surfaces.
 */
export const TOPIC_IDS = [
  'housing',
  'debt-credit',
  'transportation',
  'everyday',
  'memberships',
  'income-savings',
] as const;

export type TopicId = (typeof TOPIC_IDS)[number];

/** The four decision clusters the homepage leads with. */
export const PRIMARY_TOPIC_IDS: readonly TopicId[] = ['housing', 'debt-credit', 'transportation', 'everyday'];

/**
 * Locales that publish standalone hub pages.
 *
 * es/fr/de are frozen for new routes (see "i18n expansion policy" in
 * README.md): they had zero GSC impressions across 195 existing URLs, so
 * adding 18 more pages to them would be the exact mistake the freeze exists to
 * prevent. Those locales get the same topic grouping as headed sections on
 * their own `/tools/` and `/guides/` directories instead.
 */
export const HUB_LOCALES: readonly CoreLocale[] = ['en', 'zh'];

export function hasHubPages(locale: ContentLocale): boolean {
  return (HUB_LOCALES as readonly string[]).includes(locale);
}

export interface TopicCopy {
  /** Short name used in cards, breadcrumbs and section headings. */
  name: string;
  /** One line for a card. */
  blurb: string;
  /** Two sentences for the hub page and directory section intro. */
  intro: string;
}

export const topicCopy: Record<CoreLocale, Record<TopicId, TopicCopy>> = {
  en: {
    housing: {
      name: 'Housing & affordability',
      blurb: 'Rent or buy, what you can carry, and what a mortgage actually costs over the years you hold it.',
      intro: 'Housing decisions are decided by the holding period, not the monthly payment. These calculators and guides put buying costs, selling costs, rent, and the opportunity cost of your down payment on the same timeline.',
    },
    'debt-credit': {
      name: 'Debt & credit',
      blurb: 'True APR behind "0%" offers, payoff order, card fees, and how much debt your income supports.',
      intro: 'A lower monthly payment and a lower cost are different things. These pages recover the annualised cost hidden inside instalment plans, card fees, and refinancing offers, and show the debt-to-income ratio lenders actually read.',
    },
    transportation: {
      name: 'Transportation & ownership cost',
      blurb: 'EV against petrol, cost per mile, commuting including time, and what a car really costs to keep.',
      intro: 'A vehicle costs more than its purchase price and a commute costs more than fuel. These pages rebuild total cost of ownership from energy, depreciation, insurance, maintenance, and the hours the trip takes.',
    },
    everyday: {
      name: 'Everyday break-even',
      blurb: 'Cost per use, repair or replace, bulk buying, and the running cost of the things you already own.',
      intro: 'Most everyday money questions are one break-even away from an answer: how many uses, how many wears, how many cycles. These pages find the threshold and state what would move it.',
    },
    memberships: {
      name: 'Subscriptions & memberships',
      blurb: 'Membership fees, subscription creep, renewal traps, and the spend where a paid tier pays for itself.',
      intro: 'A membership is a fixed cost buying a variable benefit, so the answer depends on your usage, not on the headline discount. These pages find the eligible spend or visit count where the fee breaks even.',
    },
    'income-savings': {
      name: 'Income, savings & growth',
      blurb: 'Real hourly wage, raises against inflation, savings rate, emergency runway, and compound growth.',
      intro: 'Income and savings questions turn on definitions: which denominator, which period, which index. These pages fix the definition first, then run the arithmetic you can reproduce.',
    },
  },
  zh: {
    housing: {
      name: '住房與負擔能力',
      blurb: '租還是買、負擔得起多少、房貸在你實際持有的年數裡到底要付多少。',
      intro: '住房決策由持有期間決定，不是由月付金決定。這些計算機與指南把購入成本、賣出成本、租金與頭期款的機會成本放在同一條時間軸上比較。',
    },
    'debt-credit': {
      name: '債務與信用',
      blurb: '「零利率」背後的真實年利率、還款順序、卡片年費，以及收入能撐多少負債。',
      intro: '月付金比較低和總成本比較低是兩件事。這些頁面把分期方案、年費卡與轉貸方案裡被藏起來的年化成本還原出來，並算出銀行實際會看的負債收入比。',
    },
    transportation: {
      name: '交通與持有成本',
      blurb: '電車與油車、每公里成本、把時間算進去的通勤成本，以及養一台車真正的花費。',
      intro: '一台車的成本不只是車價，通勤的成本也不只是油錢。這些頁面用能源、折舊、保險、保養與通勤所佔用的時間，重新組出完整持有成本。',
    },
    everyday: {
      name: '日常回本門檻',
      blurb: '每次使用成本、修還是換、量販囤貨，以及家中既有物品的實際運轉成本。',
      intro: '大多數日常花錢問題，距離答案只差一個回本門檻：要用幾次、要穿幾次、要跑幾輪。這些頁面把門檻算出來，並說明什麼條件會讓結論翻轉。',
    },
    memberships: {
      name: '訂閱與會員',
      blurb: '會員費、訂閱堆積、續約陷阱，以及付費方案要消費多少才回本。',
      intro: '會員是用固定成本買浮動效益，答案取決於你的使用量，而不是廣告上的折扣幅度。這些頁面算出年費回本所需的合格消費金額或使用次數。',
    },
    'income-savings': {
      name: '收入、儲蓄與成長',
      blurb: '實質時薪、加薪與通膨、儲蓄率、緊急預備金月數，以及複利成長。',
      intro: '收入與儲蓄的問題常常卡在定義上：分母是什麼、期間怎麼取、用哪一個指數。這些頁面先把定義釘死，再做你可以自己重算一次的算術。',
    },
  },
  es: {
    housing: {
      name: 'Vivienda y capacidad de pago',
      blurb: 'Alquilar o comprar, cuánto puedes sostener y qué cuesta realmente una hipoteca durante los años que la mantienes.',
      intro: 'Las decisiones de vivienda las decide el horizonte de permanencia, no la cuota mensual. Estas herramientas y guías ponen en la misma línea temporal los gastos de compra, los de venta, el alquiler y el coste de oportunidad de la entrada.',
    },
    'debt-credit': {
      name: 'Deuda y crédito',
      blurb: 'TAE real detrás del «0 %», orden de amortización, cuotas de tarjeta y cuánta deuda soporta tu ingreso.',
      intro: 'Una cuota más baja y un coste más bajo no son lo mismo. Estas páginas recuperan el coste anualizado que esconden la financiación a plazos, las cuotas de tarjeta y las ofertas de refinanciación.',
    },
    transportation: {
      name: 'Movilidad y coste de uso',
      blurb: 'Eléctrico frente a gasolina, coste por kilómetro y desplazamiento al trabajo con el tiempo incluido.',
      intro: 'Un coche cuesta más que su precio y un trayecto cuesta más que el combustible. Estas páginas reconstruyen el coste total con energía, depreciación, seguro, mantenimiento y horas empleadas.',
    },
    everyday: {
      name: 'Punto de equilibrio cotidiano',
      blurb: 'Coste por uso, reparar o sustituir, compra a granel y coste de funcionamiento de lo que ya tienes.',
      intro: 'Casi toda pregunta doméstica sobre dinero está a un punto de equilibrio de su respuesta: cuántos usos, cuántas puestas, cuántos ciclos. Estas páginas calculan ese umbral y explican qué lo desplaza.',
    },
    memberships: {
      name: 'Suscripciones y membresías',
      blurb: 'Cuotas, acumulación de suscripciones, renovaciones y gasto necesario para que un plan de pago compense.',
      intro: 'Una membresía es un coste fijo que compra un beneficio variable, así que la respuesta depende de tu uso y no del descuento anunciado. Estas páginas calculan el gasto elegible o el número de visitas donde la cuota se recupera.',
    },
    'income-savings': {
      name: 'Ingresos, ahorro y crecimiento',
      blurb: 'Salario real por hora, subidas frente a inflación, tasa de ahorro y crecimiento compuesto.',
      intro: 'Las preguntas sobre ingresos y ahorro dependen de definiciones: qué denominador, qué periodo, qué índice. Estas páginas fijan primero la definición y después hacen una cuenta que puedes rehacer.',
    },
  },
  fr: {
    housing: {
      name: 'Logement et capacité d’achat',
      blurb: 'Louer ou acheter, ce que vous pouvez porter et ce qu’un crédit coûte sur la durée réelle de détention.',
      intro: 'Une décision de logement se joue sur la durée de détention, pas sur la mensualité. Ces outils et guides placent frais d’acquisition, frais de vente, loyer et coût d’opportunité de l’apport sur la même chronologie.',
    },
    'debt-credit': {
      name: 'Crédit et dettes',
      blurb: 'TAEG réel derrière le « 0 % », ordre de remboursement, cotisations de carte et endettement soutenable.',
      intro: 'Une mensualité plus faible et un coût plus faible sont deux choses différentes. Ces pages reconstituent le coût annualisé caché dans le paiement fractionné, les cartes à cotisation et les offres de rachat de crédit.',
    },
    transportation: {
      name: 'Mobilité et coût de détention',
      blurb: 'Électrique ou thermique, coût au kilomètre et trajet domicile-travail avec le temps compté.',
      intro: 'Une voiture coûte plus que son prix et un trajet coûte plus que le carburant. Ces pages reconstruisent le coût complet avec énergie, décote, assurance, entretien et heures immobilisées.',
    },
    everyday: {
      name: 'Seuils de rentabilité du quotidien',
      blurb: 'Coût par utilisation, réparer ou remplacer, achat en gros et coût d’usage de ce que vous possédez déjà.',
      intro: 'La plupart des questions d’argent du quotidien tiennent à un seuil : combien d’utilisations, combien de ports, combien de cycles. Ces pages calculent ce seuil et indiquent ce qui le déplace.',
    },
    memberships: {
      name: 'Abonnements et adhésions',
      blurb: 'Cotisations, abonnements qui s’accumulent, renouvellements et dépense à partir de laquelle une formule payante devient rentable.',
      intro: 'Une adhésion est un coût fixe qui achète un bénéfice variable : la réponse dépend de votre usage, pas de la remise affichée. Ces pages calculent la dépense éligible ou le nombre de visites qui amortit la cotisation.',
    },
    'income-savings': {
      name: 'Revenus, épargne et croissance',
      blurb: 'Salaire horaire réel, hausse face à l’inflation, taux d’épargne et intérêts composés.',
      intro: 'Les questions de revenu et d’épargne se jouent sur les définitions : quel dénominateur, quelle période, quel indice. Ces pages fixent d’abord la définition, puis font un calcul que vous pouvez refaire.',
    },
  },
  de: {
    housing: {
      name: 'Wohnen und Tragfähigkeit',
      blurb: 'Mieten oder kaufen, was tragbar ist und was ein Darlehen über die tatsächliche Haltedauer kostet.',
      intro: 'Wohnentscheidungen entscheidet die Haltedauer, nicht die Monatsrate. Diese Rechner und Ratgeber stellen Kaufnebenkosten, Verkaufskosten, Miete und die Opportunitätskosten des Eigenkapitals auf dieselbe Zeitachse.',
    },
    'debt-credit': {
      name: 'Kredit und Schulden',
      blurb: 'Effektivzins hinter „0 %“, Tilgungsreihenfolge, Kartengebühren und tragbare Verschuldung.',
      intro: 'Eine niedrigere Rate und niedrigere Kosten sind nicht dasselbe. Diese Seiten holen die jährlichen Kosten zurück, die in Ratenkauf, Jahresgebühren und Umschuldungsangeboten stecken.',
    },
    transportation: {
      name: 'Mobilität und Haltekosten',
      blurb: 'E-Auto oder Verbrenner, Kosten je Kilometer und Pendeln inklusive Zeitwert.',
      intro: 'Ein Auto kostet mehr als den Kaufpreis und Pendeln mehr als Kraftstoff. Diese Seiten bauen die Gesamtkosten aus Energie, Wertverlust, Versicherung, Wartung und gebundener Zeit auf.',
    },
    everyday: {
      name: 'Break-even im Alltag',
      blurb: 'Kosten je Nutzung, reparieren oder ersetzen, Großpackungen und laufende Kosten vorhandener Geräte.',
      intro: 'Die meisten Alltagsfragen zum Geld hängen an einem Schwellenwert: wie viele Nutzungen, wie viele Trageeinheiten, wie viele Zyklen. Diese Seiten berechnen die Schwelle und nennen, was sie verschiebt.',
    },
    memberships: {
      name: 'Abos und Mitgliedschaften',
      blurb: 'Beiträge, wachsende Abolisten, Verlängerungen und der Umsatz, ab dem ein Bezahltarif sich trägt.',
      intro: 'Eine Mitgliedschaft ist ein fixer Preis für einen variablen Nutzen; die Antwort hängt an Ihrer Nutzung, nicht am beworbenen Rabatt. Diese Seiten berechnen den anrechenbaren Umsatz oder die Besuchszahl, ab der sich der Beitrag trägt.',
    },
    'income-savings': {
      name: 'Einkommen, Sparen und Wachstum',
      blurb: 'Realer Stundenlohn, Gehalt gegen Inflation, Sparquote und Zinseszins.',
      intro: 'Fragen zu Einkommen und Sparen entscheiden sich an Definitionen: welcher Nenner, welcher Zeitraum, welcher Index. Diese Seiten legen die Definition fest und rechnen dann nachvollziehbar.',
    },
  },
};

/** Path of a topic hub, without the locale prefix. */
export function topicPath(topic: TopicId): string {
  return `/topics/${topic}`;
}

/**
 * Where a topic card should point for a given locale: the hub page where one
 * exists, otherwise the matching section of that locale's calculator directory.
 * Returns a complete site-relative href, anchor included, because an anchor
 * cannot survive being passed back through localizedPath().
 */
export function topicHref(locale: CoreLocale, topic: TopicId): string {
  return hasHubPages(locale)
    ? localizedPath(locale, topicPath(topic))
    : `${localizedPath(locale, '/tools')}#${topic}`;
}

/*
 * Slug → topic classification.
 *
 * Ordered rules over hyphen-separated tokens, not substrings: "gas" must match
 * `ev-vs-gas` without also catching `natural-gas-cost-per-therm-used`, and
 * "home" must not swallow `home-internet-cost-per-gb-used`. Overrides come
 * first for the handful of pages whose slug genuinely misleads the rules —
 * `true-hourly-wage-after-commuting-work-expenses` reads as commuting but is an
 * income page.
 */
const OVERRIDES: Record<string, TopicId> = {
  'true-hourly-wage-after-commuting-work-expenses': 'income-savings',
  'simple-vs-compound-interest': 'income-savings',
  'benefits-replacement-cost-vs-salary': 'income-savings',
  'remote-work-pay-cut-cash-break-even': 'income-savings',
  'relocation-higher-salary-break-even': 'income-savings',
  'childcare-return-to-work-break-even': 'income-savings',
  'fulltime-vs-parttime-childcare-break-even': 'income-savings',
  'costco-gas-detour-break-even': 'memberships',
  'mortgage-points-break-even': 'housing',
  'true-cost-of-home-service-plan': 'housing',
  'prepay-rent-discount-vs-liquidity': 'housing',
  'car-down-payment-vs-liquidity': 'transportation',
  'cash-vs-financing-car-liquidity': 'transportation',
  'trade-in-vs-private-sale-net-proceeds': 'transportation',
  'auto-loan-negative-equity-rollover-cost': 'transportation',
  'annual-vs-monthly-insurance-payment': 'everyday',
  'high-vs-low-insurance-deductible-break-even': 'everyday',
  'insurance-deductible-cash-reserve': 'income-savings',
  'ai-tool-realized-time-savings-break-even': 'memberships',
  'training-certification-break-even': 'income-savings',
  'freelance-minimum-billable-rate': 'income-savings',
};

interface Rule {
  topic: TopicId;
  /** Whole hyphen-separated tokens. */
  tokens?: string[];
  /** Substrings of the slug, for multi-word signals. */
  phrases?: string[];
}

const RULES: Rule[] = [
  {
    topic: 'memberships',
    tokens: ['costco', 'membership', 'memberships', 'subscription', 'subscriptions', 'streaming', 'coworking', 'gym', 'trial', 'renewal', 'seat', 'prepaid', 'delivery', 'course', 'class'],
    phrases: ['annual-vs-monthly-billing', 'monthly-vs-annual', 'pause-vs-cancel', 'family-plan', 'free-trial', 'introductory-discount', 'minimum-spend-fee-waiver', 'recurring-costs', 'unused-membership', 'annual-plan-cancellation', 'software-add-on', 'software-seat', 'event-ticket', 'true-cost-of-convenience', 'true-cost-of-upgrade-feature', 'one-time-switching-cost'],
  },
  {
    topic: 'transportation',
    tokens: ['car', 'cars', 'ev', 'vehicle', 'commute', 'commuting', 'mile', 'mileage', 'transit', 'parking', 'lease', 'auto', 'rideshare', 'bike'],
    phrases: ['ev-vs-gas', 'ev-charging', 'return-to-office', 'work-from-home', 'rental-car', 'cost-per-mile', 'trade-in'],
  },
  {
    topic: 'housing',
    tokens: ['rent', 'rents', 'renting', 'mortgage', 'housing', 'house', 'apartment', 'landlord', 'hoa'],
    phrases: ['home-affordability', 'how-much-home-can-you-afford', 'home-can-you-afford'],
  },
  {
    topic: 'debt-credit',
    tokens: ['debt', 'loan', 'loans', 'credit', 'apr', 'apy', 'installment', 'installments', 'bnpl', 'financing', 'snowball', 'avalanche', 'dti', 'amortization', 'consolidation', 'payoff', 'refinance', 'cashback', 'interest'],
    phrases: ['balance-transfer', 'annual-fee-card', 'upfront-fees', 'zero-interest', 'buy-now-pay-later', 'fixed-vs-variable-rate', 'cash-discount-vs-financing', 'minimum-payment', 'debt-to-assets'],
  },
  {
    topic: 'income-savings',
    tokens: ['salary', 'wage', 'income', 'raise', 'inflation', 'compound', 'savings', 'saving', 'emergency', 'budget', 'runway', 'freelance', 'bonus', 'benefits', 'childcare', 'sinking', 'liquidity', 'nominal', 'windfall', 'bills', 'billing', 'quitting', '72'],
    phrases: ['net-worth', 'purchasing-power', 'savings-rate', 'cash-flow', 'rule-of-72', 'real-vs-nominal', 'cost-of-delaying', 'lifestyle-creep', 'personal-liquidity'],
  },
];

const tokenize = (slug: string) => slug.split('-');

/** Resolve a locale-free page path (or bare slug) to its topic. */
export function classifyTopic(pathOrSlug: string): TopicId {
  const segments = pathOrSlug.split('/').filter(Boolean);
  const slug = segments.at(-1) ?? '';
  const override = OVERRIDES[slug];
  if (override) return override;

  const tokens = new Set(tokenize(slug));
  for (const rule of RULES) {
    if (rule.tokens?.some((token) => tokens.has(token))) return rule.topic;
    if (rule.phrases?.some((phrase) => slug.includes(phrase))) return rule.topic;
  }
  return 'everyday';
}
