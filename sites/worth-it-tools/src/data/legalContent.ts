import type { Locale } from '../consts';

export interface LegalSection {
  heading: string;
  paragraphs: string[];
  items?: string[];
}

export interface LegalPageContent {
  title: string;
  description: string;
  updated: string;
  intro: string[];
  sections: LegalSection[];
  emailLabel?: string;
}

type EditorialLocale = Exclude<Locale, 'en' | 'zh'>;

export const legalContent: Partial<Record<EditorialLocale, Record<string, LegalPageContent>>> = {
  es: {
    about: {
      title: 'Quién está detrás de WorthCalc y cómo revisamos las calculadoras',
      description: 'Conoce el criterio editorial, las pruebas y los límites de WorthCalc, una web independiente de calculadoras de decisiones económicas.',
      updated: '2026-07-19',
      intro: [
        'WorthCalc convierte preguntas como «¿me compensa?» en variables que se puedan revisar. No publicamos una respuesta universal: mostramos la fórmula, los datos que faltan y el punto en que cambia el resultado.',
        'La web es independiente y no pertenece a un banco, una financiera, una aseguradora ni una cadena comercial. Las ocho calculadoras principales y las 29 guías de decisión se pueden usar gratis y sin crear una cuenta.',
      ],
      sections: [
        { heading: 'Cómo elegimos un problema', paragraphs: ['Priorizamos decisiones repetidas en España —financiación, suscripciones, vivienda, movilidad, cuotas, tarjetas y coste del tiempo— donde comparar el precio anunciado con el coste completo aporta una respuesta útil. No creamos páginas de marcas solo para captar búsquedas.'] },
        { heading: 'Cómo se construye y se prueba', paragraphs: ['Cada calculadora separa entradas, fórmula, supuestos editables, salidas y límites. Los valores iniciales son ejemplos para entender la interfaz, nunca medias del mercado ni recomendaciones.'], items: ['Caso normal con números verificables', 'Punto cercano a cero o al umbral de rentabilidad', 'Entradas extremas, cero y decimales', 'Uso a 375 píxeles, etiquetas y mensajes de error', 'Fuentes oficiales y fecha de última comprobación cuando una regla puede cambiar'] },
        { heading: 'Qué ocurre con tus datos', paragraphs: ['El cálculo se ejecuta en el navegador. Los importes que introduces no se envían a un servidor propio de WorthCalc. Algunas herramientas pueden guardar valores en localStorage de tu dispositivo para recuperar una sesión; puedes borrarlos desde la herramienta o el navegador.'] },
        { heading: 'Qué no puede decidir la calculadora', paragraphs: ['El resultado no conoce tu liquidez, estabilidad laboral, fiscalidad, contrato completo, salud, responsabilidades familiares ni tolerancia al riesgo. Para deuda, vivienda, impuestos, seguros, inversión o derechos legales, confirma las condiciones vigentes y pide asesoramiento cualificado cuando corresponda.'] },
        { heading: 'Correcciones y transparencia', paragraphs: ['Si detectas una fórmula incorrecta, envía los datos usados, el resultado mostrado y el que esperabas. Revisamos errores reproducibles y registramos los cambios importantes en el historial del sitio.'] },
      ],
      emailLabel: 'Correo para incidencias y correcciones',
    },
  },
  fr: {
    about: {
      title: 'À propos de WorthCalc : méthode, indépendance et contrôles',
      description: 'Découvrez comment WorthCalc conçoit, teste et documente ses calculateurs de décisions financières du quotidien.',
      updated: '2026-07-19',
      intro: [
        'WorthCalc transforme une question vague — « est-ce vraiment rentable ? » — en hypothèses visibles. Le site ne donne pas une réponse valable pour tout le monde : il expose la formule, les données à vérifier et le seuil qui fait basculer le résultat.',
        'WorthCalc est indépendant d’une banque, d’un organisme de crédit, d’un assureur ou d’une enseigne. Les huit calculateurs principaux et les 29 guides de décision sont accessibles gratuitement, sans création de compte.',
      ],
      sections: [
        { heading: 'Les sujets que nous retenons', paragraphs: ['Nous privilégions les décisions courantes en France — crédit et paiement fractionné, abonnements, logement, mobilité, cartes, adhésions et valeur du temps — lorsqu’un coût complet est plus utile qu’un prix d’appel. Nous ne créons pas de pages de marque sans valeur de calcul propre.'] },
        { heading: 'Construction et contrôle d’un calculateur', paragraphs: ['Chaque outil distingue les entrées, la formule, les hypothèses modifiables, les sorties et les limites. Les valeurs préremplies illustrent l’interface ; elles ne constituent ni une moyenne de marché ni une recommandation.'], items: ['Scénario normal avec calcul reproductible', 'Cas proche de zéro ou du seuil de rentabilité', 'Valeurs extrêmes, nulles et décimales', 'Contrôle mobile à 375 px, libellés et messages', 'Source officielle et date de vérification pour toute donnée évolutive'] },
        { heading: 'Données saisies dans les outils', paragraphs: ['Les calculs s’effectuent dans le navigateur. WorthCalc ne reçoit pas les montants saisis sur un serveur applicatif propre. Certains outils peuvent conserver des valeurs dans le localStorage de l’appareil ; elles peuvent être effacées depuis l’outil ou les réglages du navigateur.'] },
        { heading: 'Ce que le résultat ne sait pas', paragraphs: ['Un calculateur ignore votre épargne de précaution, stabilité d’emploi, fiscalité complète, clauses contractuelles, santé, charges familiales et tolérance au risque. Pour un crédit, un logement, l’impôt, l’assurance, un placement ou un droit, vérifiez les conditions actuelles et consultez un professionnel compétent si nécessaire.'] },
        { heading: 'Signaler une erreur', paragraphs: ['Pour une correction utile, indiquez les entrées, le résultat affiché, le résultat attendu et l’appareil utilisé. Les erreurs reproductibles sont vérifiées et les changements importants figurent dans l’historique du site.'] },
      ],
      emailLabel: 'Adresse pour erreurs et corrections',
    },
  },
  de: {
    about: {
      title: 'Über WorthCalc: Rechenmethode, Unabhängigkeit und Prüfung',
      description: 'So entwickelt, testet und dokumentiert WorthCalc browserbasierte Rechner für alltägliche Geldentscheidungen.',
      updated: '2026-07-19',
      intro: [
        'WorthCalc zerlegt die Frage „Lohnt sich das?“ in überprüfbare Annahmen. Wir behaupten keine allgemeingültige Antwort, sondern zeigen Formel, fehlende Daten und den Punkt, an dem sich das Ergebnis ändert.',
        'Die Website ist unabhängig von Banken, Kreditgebern, Versicherern und Händlern. Acht Kernrechner und 29 ausführliche Entscheidungsleitfäden sind kostenlos und ohne Benutzerkonto nutzbar.',
      ],
      sections: [
        { heading: 'Welche Entscheidungen wir bearbeiten', paragraphs: ['Im Mittelpunkt stehen in Deutschland häufige Fragen zu Ratenzahlung, Abonnements, Wohnen, Mobilität, Mitgliedschaften, Karten und Zeitkosten. Eine Seite wird nur dann veröffentlicht, wenn sie mehr leistet als einen Preis oder eine Werbeaussage zu wiederholen.'] },
        { heading: 'Aufbau und Test eines Rechners', paragraphs: ['Jeder Rechner trennt Eingaben, Formel, veränderbare Annahmen, Ausgaben und Einschränkungen. Voreinstellungen erklären die Bedienung; sie sind weder Marktdurchschnitt noch persönliche Empfehlung.'], items: ['Normalfall mit nachvollziehbarer Rechnung', 'Grenzfall nahe null oder der Gewinnschwelle', 'Extreme, leere und dezimale Eingaben', 'Mobile Prüfung bei 375 px sowie verständliche Beschriftungen', 'Amtliche Quelle und Prüfdatum bei veränderlichen Regeln'] },
        { heading: 'Was mit Eingaben geschieht', paragraphs: ['Die Berechnung läuft im Browser. Beträge werden nicht an einen eigenen WorthCalc-Anwendungsserver übertragen. Einzelne Werkzeuge speichern Werte möglicherweise im localStorage des Geräts; diese lassen sich im Werkzeug oder über die Browser-Einstellungen löschen.'] },
        { heading: 'Was ein Ergebnis nicht entscheiden kann', paragraphs: ['Notgroschen, Beschäftigungssicherheit, persönliche Steuern, vollständige Vertragsklauseln, Gesundheit, Familie und Risikotoleranz kennt der Rechner nicht. Bei Kredit, Immobilie, Steuer, Versicherung, Anlage oder Rechtsanspruch sind aktuelle Bedingungen und gegebenenfalls qualifizierte Beratung nötig.'] },
        { heading: 'Fehler melden und Änderungen nachvollziehen', paragraphs: ['Nennen Sie für eine Prüfung Eingaben, angezeigtes und erwartetes Ergebnis sowie das verwendete Gerät. Reproduzierbare Fehler werden untersucht; wesentliche Änderungen werden im Änderungsprotokoll festgehalten.'] },
      ],
      emailLabel: 'E-Mail für Fehler und Korrekturen',
    },
  },
};
