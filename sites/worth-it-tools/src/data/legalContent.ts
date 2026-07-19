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
  sourcesHeading?: string;
  sources?: { label: string; href: string }[];
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
    privacy: {
      title: 'Política de privacidad de WorthCalc',
      description: 'Qué datos trata WorthCalc, cómo funcionan las calculadoras locales, el correo, la analítica, la publicidad y tus opciones de privacidad.',
      updated: '2026-07-19',
      intro: ['Esta política explica por capas qué ocurre con los datos al visitar WorthCalc. La idea esencial es sencilla: los números introducidos en una calculadora se procesan en el navegador y no se envían a un servidor propio de WorthCalc. Los servicios externos de correo, analítica o publicidad sí pueden tratar datos técnicos según su función y configuración.'],
      sections: [
        { heading: 'Datos de las calculadoras y almacenamiento local', paragraphs: ['Precios, salarios, deudas, kilómetros y demás importes se calculan con JavaScript en tu dispositivo. Algunas herramientas guardan valores en localStorage para recuperarlos al volver; ese almacenamiento pertenece al navegador y puedes borrarlo desde la herramienta o desde la configuración de datos del sitio. No adjuntamos esos importes a un perfil de usuario.'] },
        { heading: 'Correo y entrega de archivos', paragraphs: ['Solo recogemos una dirección cuando la escribes voluntariamente para recibir novedades o un archivo exportado. El formulario usa un punto de entrega compartido y el proveedor Brevo. Se puede tratar la dirección, el sitio y el nombre de la calculadora para realizar el envío y gestionar la baja. El contenido exportado se usa para la entrega solicitada y WorthCalc no lo utiliza para personalizar una recomendación. Cada comunicación comercial debe ofrecer una forma de darse de baja.'] },
        { heading: 'Analítica y registros técnicos', paragraphs: ['WorthCalc puede cargar Google Analytics para conocer visitas agregadas, páginas usadas y errores de experiencia. El alojamiento, la red de distribución y los servicios de seguridad también pueden generar registros técnicos como fecha, URL solicitada, navegador, dirección IP o resultado de la petición. Esos registros no contienen los campos internos de las calculadoras.'] },
        { heading: 'Publicidad, cookies y consentimiento', paragraphs: ['La web puede mostrar Google AdSense. Google y sus socios pueden usar cookies, almacenamiento local, identificadores y datos de la petición para entregar, limitar frecuencia, proteger contra fraude y medir anuncios; la personalización depende de la región, la configuración y las decisiones de consentimiento disponibles. Puedes revisar o retirar opciones en el mensaje de privacidad cuando se muestre, borrar cookies en el navegador y usar la configuración de anuncios de Google. Bloquear cookies publicitarias no impide hacer los cálculos.'] },
        { heading: 'Tus derechos y solicitudes', paragraphs: ['Cuando el RGPD sea aplicable, puedes solicitar acceso, rectificación, supresión, limitación, oposición o portabilidad en las condiciones legales correspondientes, retirar un consentimiento sin afectar el tratamiento previo y reclamar ante la autoridad de control. Para localizar una suscripción indica la dirección utilizada; nunca envíes por correo contraseñas, números completos de tarjeta ni datos sensibles. La AEPD recuerda que el derecho de acceso se ejerce ante el responsable del tratamiento.'] },
        { heading: 'Conservación, menores y cambios', paragraphs: ['Conservamos los datos de correo mientras exista la suscripción o sean necesarios para la entrega, las obligaciones aplicables y la gestión de bajas. Los plazos de terceros se rigen por sus políticas. WorthCalc no se dirige a menores y no solicita deliberadamente datos de menores en las calculadoras. Cualquier cambio material se reflejará en la fecha de actualización de esta página.'] },
      ],
      emailLabel: 'Contacto de privacidad y solicitudes',
      sourcesHeading: 'Controles y referencias oficiales',
      sources: [
        { label: 'AEPD — derecho de acceso y demás derechos de la persona interesada', href: 'https://www.aepd.es/derechos-y-deberes/conoce-tus-derechos/derecho-de-acceso' },
        { label: 'Google — cómo usa datos en sitios y aplicaciones de sus socios', href: 'https://policies.google.com/technologies/partner-sites?hl=es' },
        { label: 'Google — configuración de anuncios y personalización', href: 'https://adssettings.google.com/' },
      ],
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
    privacy: {
      title: 'Politique de confidentialité de WorthCalc',
      description: 'Données des calculateurs, stockage local, e-mail, mesure d’audience, publicité, cookies et droits applicables sur WorthCalc.',
      updated: '2026-07-19',
      intro: ['Cette politique décrit concrètement les traitements liés à WorthCalc. Les montants saisis dans un calculateur restent traités dans le navigateur et ne sont pas envoyés à un serveur applicatif propre à WorthCalc. Les prestataires d’e-mail, de mesure, d’hébergement ou de publicité peuvent toutefois traiter des données techniques pour leur service.'],
      sections: [
        { heading: 'Calculs et stockage sur l’appareil', paragraphs: ['Prix, revenus, dettes, distances et hypothèses sont calculés localement en JavaScript. Certains outils utilisent le localStorage pour restaurer les valeurs lors d’une prochaine visite. Ces données restent dans le navigateur et peuvent être supprimées depuis l’outil ou les paramètres du site. Elles ne sont pas associées par WorthCalc à un compte utilisateur.'] },
        { heading: 'E-mail, newsletter et fichier demandé', paragraphs: ['Une adresse n’est recueillie que si vous la fournissez volontairement pour une newsletter ou l’envoi d’un export. Le formulaire passe par un point de collecte partagé et le prestataire Brevo ; l’adresse, le site et le nom de l’outil peuvent être traités pour assurer l’envoi et la désinscription. L’export demandé sert à cette livraison et n’est pas utilisé pour établir un conseil financier personnalisé.'] },
        { heading: 'Mesure d’audience et journaux techniques', paragraphs: ['WorthCalc peut charger Google Analytics afin de comprendre les visites agrégées, les pages consultées et les problèmes d’expérience. L’hébergement, le réseau de diffusion et les protections de sécurité peuvent aussi produire des journaux comportant date, URL, navigateur, adresse IP ou résultat HTTP. Les champs internes du calculateur ne figurent pas dans ces journaux.'] },
        { heading: 'Publicité, traceurs et choix', paragraphs: ['Le site peut afficher Google AdSense. Google et ses partenaires peuvent utiliser cookies, stockage local, identifiants et données de requête pour diffuser, plafonner, sécuriser et mesurer les annonces. La personnalisation dépend du territoire, des réglages et des choix présentés. Vous pouvez modifier ou retirer un choix dans le message de confidentialité lorsqu’il est disponible, effacer les traceurs du navigateur et consulter les paramètres publicitaires Google. Refuser les traceurs publicitaires n’empêche pas les calculs locaux.'] },
        { heading: 'Exercer vos droits', paragraphs: ['Lorsque le RGPD s’applique, les droits peuvent comprendre accès, rectification, effacement, limitation, opposition et portabilité, sous leurs conditions légales, ainsi que le retrait du consentement et la réclamation auprès de l’autorité compétente. La CNIL indique qu’une demande d’accès, de rectification ou d’effacement doit en principe être adressée d’abord à l’organisme qui gère le fichier. Précisez l’adresse utilisée pour une inscription et n’envoyez jamais de mot de passe ni de numéro de carte complet.'] },
        { heading: 'Durée, mineurs et mise à jour', paragraphs: ['Les données d’e-mail sont conservées pendant la souscription ou la durée nécessaire à l’envoi, aux obligations applicables et à la gestion d’une opposition. Les prestataires appliquent leurs propres durées documentées. WorthCalc ne vise pas les enfants et ne demande pas volontairement leurs données dans les calculateurs. La date en tête de page signale toute révision de la politique.'] },
      ],
      emailLabel: 'Contact confidentialité et demandes',
      sourcesHeading: 'Droits et réglages officiels',
      sources: [
        { label: 'CNIL — droits de la personne concernée, accès, rectification et effacement', href: 'https://www.cnil.fr/fr/reglement-europeen-protection-donnees/chapitre3' },
        { label: 'Google — utilisation des données sur les sites et applications partenaires', href: 'https://policies.google.com/technologies/partner-sites?hl=fr' },
        { label: 'Google — paramètres des annonces', href: 'https://adssettings.google.com/' },
      ],
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
    privacy: {
      title: 'Datenschutzerklärung von WorthCalc',
      description: 'Rechnerdaten, lokaler Speicher, E-Mail, Reichweitenmessung, Werbung, Cookies und Datenschutzrechte bei WorthCalc.',
      updated: '2026-07-19',
      intro: ['Diese Erklärung beschreibt die Datenverarbeitung bei WorthCalc in verständlichen Schichten. Zahlen in den Rechnern werden im Browser verarbeitet und nicht an einen eigenen WorthCalc-Anwendungsserver gesendet. E-Mail-, Analyse-, Hosting-, Sicherheits- oder Werbedienste können jedoch technische Daten für ihren jeweiligen Zweck verarbeiten.'],
      sections: [
        { heading: 'Rechnereingaben und lokaler Speicher', paragraphs: ['Preise, Einkommen, Schulden, Strecken und Annahmen werden per JavaScript auf dem Gerät berechnet. Einige Werkzeuge speichern Werte im localStorage, damit eine Eingabe nach dem Neuladen erhalten bleibt. Dieser Speicher lässt sich im Werkzeug oder in den Website-Daten des Browsers löschen. WorthCalc verbindet diese Beträge nicht mit einem Benutzerkonto.'] },
        { heading: 'E-Mail, Newsletter und Dateiversand', paragraphs: ['Eine E-Mail-Adresse wird nur verarbeitet, wenn Sie sie freiwillig für Neuigkeiten oder den Versand eines Exports eingeben. Das Formular nutzt einen gemeinsamen Endpunkt und Brevo; Adresse, Website und Rechnername können für Versand und Abmeldung verarbeitet werden. Die angeforderte Exportdatei dient der Zustellung und wird nicht zur Personalisierung einer Finanzempfehlung verwendet. Marketing-E-Mails sollen eine Abmeldemöglichkeit enthalten.'] },
        { heading: 'Analyse und technische Protokolle', paragraphs: ['WorthCalc kann Google Analytics laden, um zusammengefasste Besuche, verwendete Seiten und Darstellungsprobleme zu verstehen. Hosting, Auslieferungsnetz und Sicherheitsdienste können technische Protokolle mit Zeitpunkt, URL, Browser, IP-Adresse oder HTTP-Ergebnis erzeugen. Die Eingabefelder innerhalb eines Rechners sind darin nicht enthalten.'] },
        { heading: 'Werbung, Cookies und Einwilligungswahl', paragraphs: ['Die Website kann Google AdSense anzeigen. Google und Partner können Cookies, lokalen Speicher, Kennungen und Anfragedaten nutzen, um Anzeigen bereitzustellen, Häufigkeit zu begrenzen, Missbrauch zu erkennen und Leistung zu messen. Personalisierung richtet sich nach Region, Einstellungen und verfügbaren Einwilligungsentscheidungen. Sie können die Auswahl im Datenschutzhinweis ändern oder widerrufen, sofern dieser angeboten wird, Browserdaten löschen und die Google-Anzeigeneinstellungen nutzen. Die lokalen Rechner funktionieren auch ohne Werbe-Cookies.'] },
        { heading: 'Betroffenenrechte', paragraphs: ['Soweit die DSGVO gilt, können je nach Voraussetzungen Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch und Datenübertragbarkeit sowie der Widerruf einer Einwilligung und eine Beschwerde bei der zuständigen Aufsicht bestehen. Die BfDI erläutert, dass Auskunft beim Verantwortlichen über gespeicherte oder verarbeitete Daten verlangt werden kann. Nennen Sie für eine Newsletter-Anfrage die verwendete Adresse, aber senden Sie keine Passwörter, vollständigen Kartennummern oder besonderen Daten.'] },
        { heading: 'Speicherdauer, Minderjährige und Änderungen', paragraphs: ['E-Mail-Daten werden während der Anmeldung beziehungsweise so lange gespeichert, wie es für Versand, Pflichten und Sperrlistenverwaltung nötig ist. Drittanbieter bestimmen weitere Fristen in ihren Richtlinien. WorthCalc richtet sich nicht gezielt an Kinder und verlangt in den Rechnern keine Angaben von Minderjährigen. Wesentliche Änderungen werden über das Aktualisierungsdatum kenntlich gemacht.'] },
      ],
      emailLabel: 'Datenschutzkontakt und Anfragen',
      sourcesHeading: 'Amtliche Rechte und Einstellungen',
      sources: [
        { label: 'BfDI — Betroffenenrechte nach der DSGVO', href: 'https://www.bfdi.bund.de/DE/Buerger/Basiswissen/Betroffenenrechte/BetroffenenRechte_node.html' },
        { label: 'Google — Datennutzung auf Websites und Apps von Partnern', href: 'https://policies.google.com/technologies/partner-sites?hl=de' },
        { label: 'Google — Einstellungen für Werbung', href: 'https://adssettings.google.com/' },
      ],
    },
  },
};
