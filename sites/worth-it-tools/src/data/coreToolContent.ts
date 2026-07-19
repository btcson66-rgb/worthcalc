import type { Locale } from '../consts';
import type { FaqItem } from '../lib/seo';

export interface CalculatorField {
  id: string;
  label: string;
  helper: string;
  value: number;
  min?: number;
  step?: number;
}

export interface CalculatorMetric {
  id: string;
  label: string;
}

export interface LocalizedCoreToolContent {
  kind: 'installment' | 'subscription';
  title: string;
  description: string;
  intro: string;
  currency: string;
  numberLocale: string;
  inputsHeading: string;
  verdictLabel: string;
  initialVerdict: string;
  invalidVerdict: string;
  favorableVerdict: string;
  unfavorableVerdict: string;
  fields: CalculatorField[];
  metrics: CalculatorMetric[];
  faq: FaqItem[];
  related: { title: string; path: string }[];
}

type EditorialLocale = Exclude<Locale, 'en' | 'zh'>;

export const coreToolContent: Partial<Record<EditorialLocale, Record<string, LocalizedCoreToolContent>>> = {
  es: {
    'installment-true-apr': {
      kind: 'installment',
      title: 'Calculadora de TAE real para compras a plazos',
      description: 'Convierte precio al contado, cuotas y comisiones de un pago aplazado en una tasa anual efectiva estimada y compárala con la TAE de la oferta.',
      intro: 'Compara el precio que pagarías hoy con todas las cuotas obligatorias. La calculadora descuenta los pagos mensuales y estima la tasa anual equivalente de esos flujos; así puedes detectar por qué una comisión plana o un supuesto 0 % puede costar más de lo que sugiere el anuncio.',
      currency: 'EUR',
      numberLocale: 'es-ES',
      inputsHeading: 'Datos de la oferta',
      verdictLabel: 'Lectura rápida',
      initialVerdict: 'Introduce el precio al contado y el calendario para estimar la tasa.',
      invalidVerdict: 'Revisa que el precio, el número de cuotas y el total pagado sean mayores que cero.',
      favorableVerdict: 'La tasa estimada es {apr}, por debajo de tu umbral de {threshold}. Comprueba ahora la TAE y el contrato oficial.',
      unfavorableVerdict: 'La tasa estimada es {apr}, por encima de tu umbral de {threshold}. El aplazamiento no supera tu filtro de coste.',
      fields: [
        { id: 'cash-price', label: 'Precio al contado', helper: 'Precio realmente disponible si pagas hoy.', value: 1200, min: 0, step: 10 },
        { id: 'installments', label: 'Número de cuotas mensuales', helper: 'Usa este modelo solo para cuotas iguales y vencidas.', value: 12, min: 1, step: 1 },
        { id: 'total-paid', label: 'Suma de todas las cuotas', helper: 'No incluyas aquí un gasto inicial que ya pongas abajo.', value: 1236, min: 0, step: 1 },
        { id: 'upfront-fee', label: 'Gasto pagado al contratar', helper: 'Comisión o coste obligatorio fuera de las cuotas.', value: 0, min: 0, step: 1 },
        { id: 'acceptable-apr', label: 'Umbral anual personal (%)', helper: 'Filtro de comparación, no recomendación.', value: 10, min: 0, step: 0.1 },
      ],
      metrics: [
        { id: 'apr', label: 'Tasa anual efectiva estimada' },
        { id: 'finance-cost', label: 'Coste monetario total' },
        { id: 'monthly-payment', label: 'Cuota mensual modelada' },
        { id: 'full-paid', label: 'Salida total incluida' },
      ],
      faq: [
        { question: '¿Esta tasa es la TAE legal del contrato?', answer: 'No necesariamente. Es una equivalencia matemática de cuotas mensuales iguales. La TAE legal aplica reglas sobre fechas, gastos, servicios obligatorios y supuestos; compárala con la ficha y la oferta de la entidad.' },
        { question: '¿Qué precio al contado debo usar?', answer: 'El importe que podrías pagar hoy por el mismo bien sin financiar, incluido cualquier descuento real por pago inmediato. No uses el precio recomendado si no es el precio disponible.' },
        { question: '¿Dónde pongo una comisión de apertura?', answer: 'Si se paga aparte al contratar, usa “gasto pagado al contratar”. Si está financiada y ya forma parte de las cuotas, no la vuelvas a sumar para evitar contarla dos veces.' },
        { question: '¿Sirve para cuotas semanales o un pago final?', answer: 'No con precisión. El modelo supone cuotas mensuales iguales al final de cada mes. Para fechas irregulares, primera cuota inmediata, carencia o cuota final necesitas los flujos con sus fechas exactas.' },
      ],
      related: [
        { title: 'Por qué un 0 % puede tener coste', path: '/zero-interest-installments-truth' },
        { title: 'Cómo cambian el coste las comisiones iniciales', path: '/upfront-fees-financing-cost' },
        { title: 'BNPL frente a cuotas de tarjeta', path: '/bnpl-vs-credit-card-installments' },
      ],
    },
    'subscription-audit': {
      kind: 'subscription',
      title: 'Calculadora de gastos en suscripciones y renovaciones',
      description: 'Normaliza cuotas mensuales, trimestrales y anuales para saber cuánto gastas en suscripciones al mes, al año y en cinco años.',
      intro: 'Reúne cargos que suelen aparecer en fechas distintas y conviértelos a un mismo periodo. En España conviene revisar no solo el precio promocional, sino también la fecha de renovación, el canal de baja y qué servicios sigues usando de verdad.',
      currency: 'EUR',
      numberLocale: 'es-ES',
      inputsHeading: 'Tu mapa de renovaciones',
      verdictLabel: 'Importe para revisar',
      initialVerdict: 'Introduce tus cargos y el coste mensual que sí utilizas.',
      invalidVerdict: 'Añade al menos un cargo recurrente para iniciar la auditoría.',
      favorableVerdict: 'Todo el coste normalizado está marcado como utilizado. Revisa aun así las próximas fechas de renovación.',
      unfavorableVerdict: 'Hay {reviewable} al mes sin uso confirmado, dentro de un total de {monthly}. Empieza por esos cargos antes de renovar.',
      fields: [
        { id: 'monthly-bills', label: 'Suscripciones cobradas cada mes', helper: 'Suma streaming, música, apps, nube y otros cargos mensuales.', value: 35, min: 0, step: 1 },
        { id: 'quarterly-renewals', label: 'Total cobrado cada trimestre', helper: 'Suma solo renovaciones que se repiten cada tres meses.', value: 24, min: 0, step: 1 },
        { id: 'annual-renewals', label: 'Total cobrado cada año', helper: 'Incluye software, membresías y planes anuales al precio de renovación.', value: 120, min: 0, step: 1 },
        { id: 'used-monthly-cost', label: 'Coste mensual que sí utilizas', helper: 'Valor mensual normalizado de los servicios que mantendrías hoy.', value: 30, min: 0, step: 1 },
      ],
      metrics: [
        { id: 'monthly-total', label: 'Coste mensual normalizado' },
        { id: 'yearly-total', label: 'Coste anual proyectado' },
        { id: 'five-year-total', label: 'Coste a cinco años sin subidas' },
        { id: 'reviewable', label: 'Coste mensual por justificar' },
      ],
      faq: [
        { question: '¿Cómo convierto una suscripción anual a coste mensual?', answer: 'Divide el precio de renovación anual entre 12. Usa el precio que se cobrará, no el descuento del primer año, y anota aparte la fecha límite para cancelar.' },
        { question: '¿La cifra a cinco años predice lo que pagaré?', answer: 'No. Proyecta los precios actuales durante 60 meses para mostrar escala. No incluye subidas, cambios de impuestos, divisa ni modificaciones del plan.' },
        { question: '¿Qué significa “coste mensual que sí utilizas”?', answer: 'Es la parte del total normalizado que asignas a servicios que usas y volverías a contratar hoy. La diferencia no ordena cancelar: señala qué cargos necesitan una decisión.' },
        { question: '¿Cómo doy de baja una renovación en España?', answer: 'Comprueba el contrato, la app o web y conserva confirmación. Si la contratación fue online, revisa también el mecanismo de baja ofrecido por el proveedor y cualquier plazo aplicable a tu caso.' },
      ],
      related: [
        { title: 'Cómo detectar el crecimiento silencioso de suscripciones', path: '/subscription-creep' },
        { title: 'Cuota mensual frente a pago anual', path: '/monthly-vs-annual-subscription' },
        { title: 'Punto de equilibrio de una membresía', path: '/paid-membership-break-even' },
      ],
    },
  },
  fr: {
    'installment-true-apr': {
      kind: 'installment',
      title: 'Calculateur de taux réel pour paiement en plusieurs fois',
      description: 'Transformez prix comptant, mensualités et frais d’un paiement fractionné en taux annuel effectif estimé à comparer au TAEG contractuel.',
      intro: 'Mettez face à face le prix comptant réellement accessible et toutes les échéances obligatoires. Le calcul actualise des mensualités égales et estime leur taux annuel : un moyen de voir pourquoi des frais forfaitaires ou un affichage « 0 % » peuvent masquer un coût.',
      currency: 'EUR',
      numberLocale: 'fr-FR',
      inputsHeading: 'Données de l’offre',
      verdictLabel: 'Lecture rapide',
      initialVerdict: 'Saisissez le prix comptant et l’échéancier pour obtenir une estimation.',
      invalidVerdict: 'Vérifiez que le prix, le nombre de mensualités et le total des échéances sont supérieurs à zéro.',
      favorableVerdict: 'Le taux estimé atteint {apr}, sous votre seuil de {threshold}. Contrôlez ensuite le TAEG et la fiche du prêteur.',
      unfavorableVerdict: 'Le taux estimé atteint {apr}, au-dessus de votre seuil de {threshold}. Le paiement fractionné échoue à votre filtre de coût.',
      fields: [
        { id: 'cash-price', label: 'Prix comptant', helper: 'Prix réellement proposé pour un paiement immédiat.', value: 900, min: 0, step: 10 },
        { id: 'installments', label: 'Nombre de mensualités', helper: 'Le modèle suppose des échéances égales à terme échu.', value: 12, min: 1, step: 1 },
        { id: 'total-paid', label: 'Total de toutes les mensualités', helper: 'N’ajoutez pas ici un frais initial saisi séparément.', value: 927, min: 0, step: 1 },
        { id: 'upfront-fee', label: 'Frais payés à la souscription', helper: 'Coût obligatoire réglé hors mensualités.', value: 0, min: 0, step: 1 },
        { id: 'acceptable-apr', label: 'Seuil annuel personnel (%)', helper: 'Seuil de comparaison, pas recommandation.', value: 10, min: 0, step: 0.1 },
      ],
      metrics: [
        { id: 'apr', label: 'Taux annuel effectif estimé' },
        { id: 'finance-cost', label: 'Coût monétaire total' },
        { id: 'monthly-payment', label: 'Mensualité modélisée' },
        { id: 'full-paid', label: 'Décaissement total' },
      ],
      faq: [
        { question: 'Ce résultat correspond-il au TAEG légal ?', answer: 'Pas nécessairement. Il s’agit d’une équivalence mathématique pour des mensualités égales. Le TAEG réglementaire suit des règles précises sur les dates, frais et services imposés ; la fiche précontractuelle reste la référence.' },
        { question: 'Quel prix comptant faut-il retenir ?', answer: 'Le prix réellement accessible aujourd’hui pour le même achat sans financement, avec une éventuelle remise immédiate. Un prix conseillé non disponible fausse la comparaison.' },
        { question: 'Où inscrire des frais de dossier ?', answer: 'S’ils sont réglés séparément lors de la souscription, utilisez le champ des frais initiaux. S’ils sont financés et déjà compris dans les mensualités, ne les additionnez pas une seconde fois.' },
        { question: 'Le calcul convient-il à un différé ou un ballon final ?', answer: 'Non avec précision. Il suppose des mensualités égales en fin de mois. Un premier paiement immédiat, une pause, des dates irrégulières ou une dernière échéance majorée exigent les flux datés exacts.' },
      ],
      related: [
        { title: 'Le vrai coût d’un paiement affiché à 0 %', path: '/zero-interest-installments-truth' },
        { title: 'Effet des frais initiaux sur le financement', path: '/upfront-fees-financing-cost' },
        { title: 'BNPL ou mensualités de carte', path: '/bnpl-vs-credit-card-installments' },
      ],
    },
    'subscription-audit': {
      kind: 'subscription',
      title: 'Calculateur de dépenses d’abonnements et de renouvellements',
      description: 'Ramenez prélèvements mensuels, trimestriels et annuels à un coût comparable par mois, par an et sur cinq ans.',
      intro: 'Rassemblez les abonnements prélevés à des dates différentes, puis distinguez les services réellement utilisés. En France, vérifiez le tarif après promotion, l’échéance, les modalités de résiliation et la confirmation reçue plutôt que de vous fier au seul prix d’appel.',
      currency: 'EUR',
      numberLocale: 'fr-FR',
      inputsHeading: 'Votre calendrier de prélèvements',
      verdictLabel: 'Montant à réexaminer',
      initialVerdict: 'Saisissez les prélèvements et la part mensuelle réellement utilisée.',
      invalidVerdict: 'Ajoutez au moins une dépense récurrente pour lancer l’audit.',
      favorableVerdict: 'Tout le coût normalisé est déclaré utilisé. Contrôlez malgré tout les prochaines échéances.',
      unfavorableVerdict: '{reviewable} par mois restent sans usage confirmé, sur {monthly}. Commencez par ces lignes avant reconduction.',
      fields: [
        { id: 'monthly-bills', label: 'Abonnements prélevés chaque mois', helper: 'Additionnez vidéo, musique, applications, cloud et autres mensualités.', value: 42, min: 0, step: 1 },
        { id: 'quarterly-renewals', label: 'Total prélevé chaque trimestre', helper: 'Uniquement les services renouvelés tous les trois mois.', value: 30, min: 0, step: 1 },
        { id: 'annual-renewals', label: 'Total prélevé chaque année', helper: 'Retenez le prochain prix de reconduction, pas le tarif de lancement.', value: 96, min: 0, step: 1 },
        { id: 'used-monthly-cost', label: 'Coût mensuel réellement utilisé', helper: 'Part normalisée des services que vous reprendriez aujourd’hui.', value: 38, min: 0, step: 1 },
      ],
      metrics: [
        { id: 'monthly-total', label: 'Coût mensuel normalisé' },
        { id: 'yearly-total', label: 'Coût annuel projeté' },
        { id: 'five-year-total', label: 'Coût sur cinq ans sans hausse' },
        { id: 'reviewable', label: 'Coût mensuel à justifier' },
      ],
      faq: [
        { question: 'Comment mensualiser un abonnement annuel ?', answer: 'Divisez le prix de la prochaine reconduction par 12. Notez séparément la date d’échéance et le délai de résiliation afin que la moyenne ne masque pas l’action à prendre.' },
        { question: 'La projection sur cinq ans est-elle une prévision ?', answer: 'Non. Elle multiplie le coût actuel par 60 pour rendre l’ordre de grandeur visible, sans hausse tarifaire, changement de formule, inflation ni effet de devise.' },
        { question: 'Que représente le coût réellement utilisé ?', answer: 'C’est la part mensuelle normalisée des services que vous utilisez et choisiriez encore. L’écart signale les lignes à vérifier ; il ne constitue pas une instruction automatique de résiliation.' },
        { question: 'Que vérifier pour résilier en France ?', answer: 'Consultez le contrat et l’espace client, utilisez le parcours de résiliation disponible et conservez la confirmation. Les règles exactes dépendent du contrat et du canal de souscription.' },
      ],
      related: [
        { title: 'Repérer l’accumulation silencieuse d’abonnements', path: '/subscription-creep' },
        { title: 'Paiement mensuel ou annuel', path: '/monthly-vs-annual-subscription' },
        { title: 'Seuil de rentabilité d’une adhésion payante', path: '/paid-membership-break-even' },
      ],
    },
  },
  de: {
    'installment-true-apr': {
      kind: 'installment',
      title: 'Effektiver-Jahreszins-Rechner für Ratenkauf',
      description: 'Barpreis, Monatsraten und Pflichtkosten einer Finanzierung in einen geschätzten effektiven Jahreszins umrechnen und mit dem Vertragswert vergleichen.',
      intro: 'Vergleichen Sie den heute verfügbaren Barpreis mit allen verpflichtenden Raten. Der Rechner diskontiert gleich hohe Monatszahlungen und schätzt daraus einen effektiven Jahreszins. So wird sichtbar, weshalb ein pauschaler Aufschlag oder eine beworbene 0%-Finanzierung trotzdem Geld kosten kann.',
      currency: 'EUR',
      numberLocale: 'de-DE',
      inputsHeading: 'Angaben aus dem Angebot',
      verdictLabel: 'Schnelle Einordnung',
      initialVerdict: 'Barpreis und Ratenplan eingeben, um den Jahreszins zu schätzen.',
      invalidVerdict: 'Barpreis, Ratenzahl und Summe der Raten müssen größer als null sein.',
      favorableVerdict: 'Der geschätzte Jahreszins beträgt {apr} und liegt unter Ihrer Schwelle von {threshold}. Prüfen Sie nun Pflichtangabe und Vertrag.',
      unfavorableVerdict: 'Der geschätzte Jahreszins beträgt {apr} und liegt über Ihrer Schwelle von {threshold}. Die Finanzierung besteht Ihren Kostenfilter nicht.',
      fields: [
        { id: 'cash-price', label: 'Heute verfügbarer Barpreis', helper: 'Preis für denselben Kauf ohne Finanzierung.', value: 2400, min: 0, step: 10 },
        { id: 'installments', label: 'Zahl der Monatsraten', helper: 'Das Modell nimmt gleich hohe nachschüssige Raten an.', value: 12, min: 1, step: 1 },
        { id: 'total-paid', label: 'Summe aller Monatsraten', helper: 'Separat gezahlte Anfangskosten hier nicht doppelt zählen.', value: 2472, min: 0, step: 1 },
        { id: 'upfront-fee', label: 'Kosten bei Vertragsabschluss', helper: 'Verpflichtende Zahlung außerhalb der Raten.', value: 0, min: 0, step: 1 },
        { id: 'acceptable-apr', label: 'Eigene Jahresschwelle (%)', helper: 'Vergleichsfilter, keine Empfehlung.', value: 10, min: 0, step: 0.1 },
      ],
      metrics: [
        { id: 'apr', label: 'Geschätzter effektiver Jahreszins' },
        { id: 'finance-cost', label: 'Gesamte Geldkosten' },
        { id: 'monthly-payment', label: 'Modellierte Monatsrate' },
        { id: 'full-paid', label: 'Gesamter Mittelabfluss' },
      ],
      faq: [
        { question: 'Ist die Schätzung der rechtliche effektive Jahreszins?', answer: 'Nicht zwingend. Sie ist eine mathematische Zahlungsstrom-Äquivalenz für gleiche Monatsraten. Die gesetzliche Pflichtangabe folgt Regeln zu Terminen, Kosten und Nebenleistungen; vergleichen Sie deshalb die Europäischen Standardinformationen.' },
        { question: 'Welcher Barpreis gehört in das Feld?', answer: 'Der Preis, den Sie heute für denselben Kauf ohne Finanzierung tatsächlich zahlen könnten, einschließlich eines echten Sofortrabatts. Ein nicht erhältlicher Listenpreis ist kein sinnvoller Vergleich.' },
        { question: 'Wie werden Abschlusskosten eingetragen?', answer: 'Separat bei Vertragsabschluss gezahlte Pflichtkosten gehören in das Feld für Anfangskosten. Sind sie finanziert und bereits in den Raten enthalten, dürfen sie nicht nochmals addiert werden.' },
        { question: 'Funktioniert der Rechner bei Schlussrate oder Zahlpause?', answer: 'Nicht genau. Das Modell unterstellt gleiche Monatsraten am Monatsende. Sofortrate, unregelmäßige Termine, tilgungsfreie Zeit, variable Zinsen oder Schlussrate brauchen einen vollständigen datierten Zahlungsplan.' },
      ],
      related: [
        { title: 'Warum eine 0%-Finanzierung Kosten haben kann', path: '/zero-interest-installments-truth' },
        { title: 'Anfangskosten und nutzbarer Kreditbetrag', path: '/upfront-fees-financing-cost' },
        { title: 'BNPL im Vergleich zur Kreditkartenrate', path: '/bnpl-vs-credit-card-installments' },
      ],
    },
    'subscription-audit': {
      kind: 'subscription',
      title: 'Abo-Kosten-Rechner für Monats- und Jahresverträge',
      description: 'Monatliche, vierteljährliche und jährliche Abozahlungen auf Monats-, Jahres- und Fünfjahreskosten umrechnen.',
      intro: 'Führen Sie unterschiedlich terminierte Verlängerungen in einer Zahl zusammen und trennen Sie genutzte Dienste von bloß weiterlaufenden Verträgen. In Deutschland zählen neben dem Aktionspreis besonders Verlängerungspreis, Kündigungsweg, Frist und Bestätigung.',
      currency: 'EUR',
      numberLocale: 'de-DE',
      inputsHeading: 'Ihre Verlängerungsübersicht',
      verdictLabel: 'Prüfbarer Betrag',
      initialVerdict: 'Laufende Zahlungen und den tatsächlich genutzten Monatsanteil eintragen.',
      invalidVerdict: 'Mindestens eine wiederkehrende Zahlung eintragen, um die Prüfung zu starten.',
      favorableVerdict: 'Die gesamten normalisierten Kosten sind als genutzt markiert. Prüfen Sie trotzdem die nächsten Verlängerungstermine.',
      unfavorableVerdict: '{reviewable} pro Monat sind nicht als genutzt bestätigt, bei insgesamt {monthly}. Prüfen Sie diese Verträge vor der Verlängerung.',
      fields: [
        { id: 'monthly-bills', label: 'Monatlich abgebuchte Abos', helper: 'Streaming, Musik, Apps, Cloud und weitere Monatsverträge addieren.', value: 40, min: 0, step: 1 },
        { id: 'quarterly-renewals', label: 'Summe je Quartal', helper: 'Nur Verlängerungen eintragen, die alle drei Monate fällig werden.', value: 27, min: 0, step: 1 },
        { id: 'annual-renewals', label: 'Summe je Jahr', helper: 'Den nächsten regulären Verlängerungspreis statt des Startangebots nutzen.', value: 132, min: 0, step: 1 },
        { id: 'used-monthly-cost', label: 'Tatsächlich genutzter Monatswert', helper: 'Normalisierter Anteil der Dienste, die Sie heute erneut wählen würden.', value: 35, min: 0, step: 1 },
      ],
      metrics: [
        { id: 'monthly-total', label: 'Normalisierte Monatskosten' },
        { id: 'yearly-total', label: 'Hochgerechnete Jahreskosten' },
        { id: 'five-year-total', label: 'Fünfjahreskosten ohne Preisanstieg' },
        { id: 'reviewable', label: 'Monatlich zu begründender Betrag' },
      ],
      faq: [
        { question: 'Wie rechne ich ein Jahresabo auf den Monat um?', answer: 'Teilen Sie den nächsten regulären Jahrespreis durch 12. Kündigungstermin und Frist bleiben separate Angaben, denn der Durchschnitt ersetzt keine rechtzeitige Handlung.' },
        { question: 'Sind die Fünfjahreskosten eine Prognose?', answer: 'Nein. Der aktuelle Monatswert wird mit 60 multipliziert, um die Größenordnung zu zeigen. Preisänderungen, Tarifwechsel, Inflation und Währungseffekte fehlen.' },
        { question: 'Was bedeutet tatsächlich genutzter Monatswert?', answer: 'Das ist der normalisierte Anteil der Dienste, die Sie wirklich nutzen und heute wieder buchen würden. Die Differenz markiert Prüfbedarf, nicht automatisch zu kündigende Verträge.' },
        { question: 'Was sollte ich bei einer Kündigung prüfen?', answer: 'Prüfen Sie Vertrag, Kundenkonto, Frist und angebotenen Kündigungsweg und bewahren Sie die Bestätigung auf. Die konkreten Rechte hängen von Vertrag und Abschlussweg ab.' },
      ],
      related: [
        { title: 'Schleichend wachsende Abo-Kosten erkennen', path: '/subscription-creep' },
        { title: 'Monatsabo oder Jahreszahlung', path: '/monthly-vs-annual-subscription' },
        { title: 'Break-even einer kostenpflichtigen Mitgliedschaft', path: '/paid-membership-break-even' },
      ],
    },
  },
};
