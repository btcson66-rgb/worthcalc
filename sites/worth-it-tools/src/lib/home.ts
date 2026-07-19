import { LOCALE_HREFLANG, SITE, type CoreLocale } from '../consts';
import type { FaqItem } from './seo';

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

export interface HomeContent {
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
  methodHeading: string;
  methodLead: string;
  methodSteps: string[];
  guidesHeading: string;
  guidesLead: string;
  guidesCta: string;
  guides: HomeGuide[];
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
    methodHeading: 'A decision process you can audit',
    methodLead: 'A useful calculator should show what changes the answer, not hide a recommendation behind one default.',
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
  es: {
    title: 'Calculadoras financieras gratis: TAE, cuotas, alquiler y ahorro',
    description: 'Calculadoras gratuitas para comparar TAE y cuotas, suscripciones, alquiler o compra, coche eléctrico, desplazamientos y tarjetas con datos de España.',
    eyebrow: 'Decisiones de dinero con cuentas claras',
    heading: 'Antes de pagar, calcula el ',
    accent: 'coste real',
    headingSuffix: '.',
    intro: 'Una cuota baja, un 0 % o un regalo de bienvenida no cuentan toda la historia. Introduce tus cifras y compara el coste total, el plazo y la alternativa real. Los cálculos se hacen en tu navegador, sin registro y sin enviar tus importes a WorthCalc.',
    badges: ['Sin registro', 'Datos en tu dispositivo', 'Uso gratuito'],
    toolsHeading: 'Calculadoras para decisiones cotidianas',
    toolsLead: 'Ocho herramientas en euros, escritas para conceptos que se usan en España como TAE, cuota, coste total, alquiler y consumo elegible.',
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
    seoHeading: 'Calculadoras de coste total para España',
    seoParagraphs: [
      'WorthCalc responde a búsquedas concretas como calcular la TAE de una financiación, saber si compensa una suscripción, comparar alquiler y compra o calcular el coste por kilómetro. No publica una cifra universal: cada herramienta deja visibles las variables y permite sustituir el ejemplo por tus documentos.',
      'En crédito, la cuota mensual no basta. La TAE sirve para comparar el coste anual de una oferta, pero también debes revisar importe total adeudado, comisiones, seguros o servicios vinculados y capacidad de pago durante todo el plazo. Las guías enlazan la metodología con fuentes como Banco de España y organismos de consumo.',
      'Los resultados son estimaciones educativas, no asesoramiento financiero, fiscal, jurídico, hipotecario ni de inversión. Confirma precios, contratos, impuestos y elegibilidad actuales. Tus entradas se procesan localmente en el navegador y no requieren una cuenta.',
    ],
    faqHeading: 'Preguntas frecuentes',
    faq: [
      { question: '¿Qué diferencia hay entre TIN, TAE y coste total?', answer: 'El TIN expresa el tipo nominal; la TAE anualiza el coste con la frecuencia de pagos y determinados gastos; el coste total muestra euros pagados. Para comparar ofertas necesitas revisar los tres y las condiciones del contrato.' },
      { question: '¿Las cifras de ejemplo son precios medios de España?', answer: 'No. Son escenarios editables para explicar el método. Sustitúyelos por una oferta, factura, tarifa, nómina o presupuesto vigente y prueba más de un escenario.' },
      { question: '¿WorthCalc guarda mis importes?', answer: 'Los cálculos se ejecutan en tu navegador. Algunas herramientas pueden recordar datos en el almacenamiento local de tu propio dispositivo, pero no envían los importes a un servidor propio de WorthCalc.' },
      { question: '¿El resultado sustituye a un asesor?', answer: 'No. Es una estimación general. Deuda, vivienda, impuestos, empleo e inversión pueden depender de circunstancias que una calculadora pública no conoce.' },
    ],
  },
  fr: {
    title: 'Calculateurs gratuits : TAEG, abonnements, logement et voiture',
    description: 'Calculez un TAEG réel, le coût des abonnements, louer ou acheter, voiture électrique ou thermique, trajet domicile-travail et carte à cotisation.',
    eyebrow: 'Décider avec un coût complet',
    heading: 'Avant de signer, calculez ce que cela ',
    accent: 'coûte vraiment',
    headingSuffix: '.',
    intro: 'Une mensualité, une remise ou une prime de bienvenue ne suffit pas pour comparer. Reconstituez le coût total, choisissez la même durée et testez l’hypothèse qui ferait basculer le résultat. Les montants restent dans votre navigateur, sans compte.',
    badges: ['Sans inscription', 'Calcul local', 'Accès gratuit'],
    toolsHeading: 'Calculateurs pour les choix qui engagent votre budget',
    toolsLead: 'Huit outils en euros, avec le vocabulaire utile en France : TAEG, mensualité, reste à payer, coût de détention et valeur récupérée.',
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
    seoHeading: 'Des calculateurs de coût total, pas des verdicts commerciaux',
    seoParagraphs: [
      'WorthCalc traite des recherches concrètes : calculer le TAEG d’un crédit, additionner ses abonnements, savoir s’il vaut mieux louer ou acheter, comparer une voiture électrique et thermique ou chiffrer un trajet domicile-travail. Les valeurs d’exemple expliquent la méthode ; elles ne sont pas présentées comme une moyenne française.',
      'Pour un crédit à la consommation, l’offre doit être lue avec ses mensualités, sa durée, son TAEG et son montant total dû. Une LOA, une carte ou un paiement fractionné peut ajouter des frais, conditions de restitution ou services qui ne figurent pas dans le prix d’appel. Les guides renvoient notamment aux sources publiques françaises pertinentes.',
      'Ces outils donnent des estimations pédagogiques, jamais un conseil financier, fiscal, juridique, immobilier ou d’investissement personnalisé. Confirmez les tarifs, contrats, droits et aides actuels. Les saisies restent dans le navigateur.',
    ],
    faqHeading: 'Questions fréquentes',
    faq: [
      { question: 'Pourquoi comparer le TAEG et pas seulement le taux ou la mensualité ?', answer: 'Le TAEG vise à exprimer le coût annuel global du crédit avec les éléments prévus par la réglementation. La mensualité dépend aussi de la durée : une petite mensualité peut produire un coût total plus élevé.' },
      { question: 'Les exemples représentent-ils les prix moyens en France ?', answer: 'Non. Ils servent à rendre la formule vérifiable. Remplacez-les par votre offre, facture, tarif, fiche de paie ou devis, puis testez plusieurs scénarios.' },
      { question: 'Mes montants sont-ils enregistrés ?', answer: 'Le calcul s’effectue dans votre navigateur. Certains outils peuvent utiliser le stockage local de votre appareil, mais les montants ne sont pas transmis à un serveur propre à WorthCalc.' },
      { question: 'Puis-je décider uniquement avec le résultat ?', answer: 'Non. Il s’agit d’une estimation générale. Crédit, logement, fiscalité, emploi et investissement exigent parfois un professionnel capable d’étudier votre dossier.' },
    ],
  },
  de: {
    title: 'Kostenlose Rechner für Effektivzins, Abos, Wohnen und Auto',
    description: 'Effektivzins, Ratenkauf, Abo-Kosten, Mieten oder Kaufen, E-Auto oder Benziner, Pendelkosten und Kreditkarten-Gebühr nachvollziehbar berechnen.',
    eyebrow: 'Geldentscheidungen mit vollständigen Kosten',
    heading: 'Vor dem Abschluss den ',
    accent: 'echten Preis',
    headingSuffix: ' berechnen.',
    intro: 'Null-Prozent-Werbung, eine niedrige Rate oder ein Willkommensbonus zeigen selten die ganze Rechnung. Vergleichen Sie Gesamtkosten, denselben Zeitraum und eine echte Alternative. Alle Eingaben werden ohne Konto direkt im Browser verarbeitet.',
    badges: ['Ohne Anmeldung', 'Eingaben bleiben lokal', 'Kostenlos nutzbar'],
    toolsHeading: 'Rechner für konkrete Alltagsentscheidungen',
    toolsLead: 'Acht Euro-Rechner mit den in Deutschland üblichen Größen: effektiver Jahreszins, Monatsrate, Gesamtkosten, Restwert und Break-even.',
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
    seoHeading: 'Gesamtkosten-Rechner für deutsche Verträge und Preise',
    seoParagraphs: [
      'WorthCalc beantwortet konkrete Suchfragen: Wie hoch ist der effektive Jahreszins einer Ratenzahlung, was kosten alle Abos, wann lohnt sich Kaufen statt Mieten oder wie teuer ist Pendeln wirklich? Beispielwerte erklären nur die Methode. Eigene Verträge, Rechnungen und Angebote bleiben die maßgebliche Grundlage.',
      'Bei einer Finanzierung sind Monatsrate und Null-Prozent-Hinweis nicht ausreichend. Entscheidend sind unter anderem Barpreis, Laufzeit, effektiver Jahreszins, Gesamtbetrag, Gebühren, Zusatzverträge und die Belastbarkeit des Haushalts über die gesamte Laufzeit. Die vertiefenden Seiten ordnen diese Punkte mit deutschen Verbraucher- und Behördenquellen ein.',
      'Die Ergebnisse sind unverbindliche Lernrechnungen und keine individuelle Finanz-, Steuer-, Rechts-, Immobilien- oder Anlageberatung. Preise, Bedingungen und Förderfähigkeit vor einer Entscheidung aktuell bestätigen. Eingaben verlassen den Browser nicht.',
    ],
    faqHeading: 'Häufige Fragen',
    faq: [
      { question: 'Warum ist der effektive Jahreszins wichtiger als die Monatsrate?', answer: 'Die Rate hängt stark von der Laufzeit ab. Der effektive Jahreszins macht viele preisbestimmende Kreditkosten jährlich vergleichbar; zusätzlich sollten Gesamtbetrag, Barpreis und Vertragsbedingungen geprüft werden.' },
      { question: 'Sind die Beispielwerte deutsche Durchschnittspreise?', answer: 'Nein. Sie machen die Rechenmethode nachvollziehbar. Ersetzen Sie sie durch ein aktuelles Angebot, eine Rechnung, einen Tarif, eine Abrechnung oder einen Kostenvoranschlag.' },
      { question: 'Speichert WorthCalc meine Zahlen?', answer: 'Die Berechnung läuft im Browser. Einzelne Rechner können den lokalen Speicher Ihres Geräts nutzen, die eingegebenen Beträge werden aber nicht an einen eigenen WorthCalc-Server gesendet.' },
      { question: 'Ersetzt das Ergebnis eine Beratung?', answer: 'Nein. Es ist eine allgemeine Schätzung. Bei Kredit, Wohnen, Steuern, Arbeitsrecht oder Geldanlage kann eine qualifizierte Beratung mit vollständigen Unterlagen nötig sein.' },
    ],
  },
};

export function homeJsonLd(locale: CoreLocale, site?: URL): object[] {
  const content = homeContent[locale];
  const origin = (site?.origin ?? SITE.url).replace(/\/$/, '');
  const pageUrl = locale === 'en' ? `${origin}/` : `${origin}/${locale}/`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: content.title,
      description: content.description,
      url: pageUrl,
      inLanguage: LOCALE_HREFLANG[locale],
      isPartOf: { '@type': 'WebSite', name: SITE.name, url: `${origin}/` },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: content.tools.length,
        itemListElement: content.tools.map((tool, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: tool.title,
          url: `${origin}/${locale}${tool.path}/`,
        })),
      },
    },
  ];
}
