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
    terms: {
      title: 'Condiciones de uso de WorthCalc',
      description: 'Reglas para utilizar gratis las calculadoras de WorthCalc, límites del resultado, usos no permitidos y derechos del consumidor que permanecen intactos.',
      updated: '2026-07-19',
      intro: ['Estas condiciones regulan el uso gratuito de WorthCalc. Al abrir una calculadora aceptas utilizarla de forma lícita y entender sus límites. No tienes que crear una cuenta ni pagar para ejecutar los cálculos publicados.'],
      sections: [
        { heading: 'Qué servicio recibes', paragraphs: ['WorthCalc ofrece fórmulas, ejemplos y guías generales para comparar costes, cuotas, tiempo y umbrales. El resultado se genera con los datos que introduces y los supuestos visibles; no es una oferta de crédito, una tasación, una promesa de ahorro ni asesoramiento financiero, fiscal o jurídico individual.'] },
        { heading: 'Tu comprobación antes de decidir', paragraphs: ['Revisa unidades, periodo, impuestos, comisiones, moneda y condiciones del contrato real. Un precio, tipo, ayuda pública o regla legal puede cambiar después de la fecha indicada. Para una decisión con deuda, vivienda, inversión, seguros o consecuencias legales, contrasta la documentación vigente y recurre a una persona profesional cuando sea necesario.'] },
        { heading: 'Uso permitido y usos que bloquearemos', paragraphs: ['Puedes usar y enlazar las calculadoras para fines personales, educativos o de evaluación interna. No puedes intentar alterar el servicio, evitar controles de seguridad, enviar tráfico automatizado que degrade la web, introducir código malicioso, presentar el contenido como una certificación oficial ni copiar de forma sustancial la marca, el diseño o el código para explotar un servicio confundible.'] },
        { heading: 'Disponibilidad, errores y responsabilidad', paragraphs: ['Procuramos probar las fórmulas y corregir fallos reproducibles, pero un servicio gratuito puede cambiar, quedar temporalmente indisponible o contener errores. En la medida permitida por la ley aplicable, no respondemos de una decisión tomada sin verificar los datos y el contrato correspondiente. Nada de estas condiciones excluye una responsabilidad que la ley no permita limitar, ni reduce derechos imperativos de consumidores y usuarios.'] },
        { heading: 'Propiedad, enlaces y publicidad', paragraphs: ['La marca WorthCalc, el diseño, los textos originales y el código pertenecen a su titular salvo indicación distinta. Los enlaces externos conducen a servicios con condiciones propias. La publicidad puede financiar la web, pero un anuncio no forma parte del resultado y no implica que WorthCalc recomiende al anunciante.'] },
        { heading: 'Cambios y contacto', paragraphs: ['Podemos modificar estas condiciones para reflejar nuevas funciones, normas o riesgos. La fecha superior identifica la versión; un cambio material se publicará en esta página y solo regirá desde su entrada en vigor. Si una cláusula no pudiera aplicarse, las restantes seguirán vigentes en la medida permitida.'] },
      ],
      emailLabel: 'Consultas sobre estas condiciones',
      sourcesHeading: 'Referencia española para interpretar tus derechos',
      sources: [
        { label: 'BOE — Ley General para la Defensa de los Consumidores y Usuarios, artículos 80 a 89', href: 'https://www.boe.es/buscar/act.php?id=BOE-A-2007-20555' },
      ],
    },
    contact: {
      title: 'Contacto con WorthCalc: errores, fuentes y propuestas',
      description: 'Cómo informar de un cálculo incorrecto, una fuente desactualizada, un problema móvil o una propuesta editorial o comercial a WorthCalc.',
      updated: '2026-07-19',
      intro: ['WorthCalc es un proyecto independiente y atiende por correo, sin formulario ni cuenta de soporte. Leemos los mensajes relacionados con la exactitud de las calculadoras, la calidad editorial, la accesibilidad y las colaboraciones transparentes.'],
      sections: [
        { heading: 'Cómo enviar un error de cálculo reproducible', paragraphs: ['Indica la URL exacta, idioma, valores introducidos, resultado mostrado y resultado esperado. Añade moneda, periodo y si usaste coma o punto decimal. Una captura puede ayudar, pero copia también los números en texto para que podamos repetir la fórmula.'], items: ['Modelo y versión del navegador o sistema', 'Ancho aproximado de pantalla si el problema es visual', 'Pasos desde que abres la página hasta que aparece el fallo', 'Fuente oficial y fecha si señalas un dato desactualizado'] },
        { heading: 'Protege tus datos al escribir', paragraphs: ['No envíes DNI, pasaporte, contraseña, dirección completa, número de tarjeta, cuenta bancaria, nómina ni contrato sin anonimizar. Para revisar la matemática normalmente bastan cifras ficticias con la misma estructura. Si el mensaje trata de una suscripción de correo, menciona únicamente la dirección que utilizaste y la acción solicitada.'] },
        { heading: 'Ideas de calculadoras y mejoras', paragraphs: ['Una propuesta útil describe la decisión, quién la toma en España, los costes que suelen ocultarse, la fórmula posible y una fuente pública. Priorizamos problemas repetibles con variables editables; no creamos una página de marca para repetir una campaña ni publicamos una cifra comercial sin poder verificarla.'] },
        { heading: 'Colaboraciones, publicidad y prensa', paragraphs: ['Identifica organización, objetivo, contraprestación y cualquier vínculo comercial. No aceptamos que una empresa compre el resultado de una calculadora, elimine una limitación relevante o convierta publicidad en recomendación editorial. Un contacto no garantiza respuesta, publicación ni acuerdo.'] },
        { heading: 'Qué no ofrece este buzón', paragraphs: ['No es un servicio de asesoramiento personal, reclamaciones urgentes ni soporte de una entidad financiera. No podemos decidir si debes contratar un préstamo, comprar una vivienda o invertir. Si hay fraude, riesgo inmediato, vencimiento legal o disputa contractual, utiliza los canales oficiales y profesionales competentes de tu jurisdicción.'] },
        { heading: 'Plazo y seguimiento', paragraphs: ['El equipo es pequeño: revisamos todos los mensajes pertinentes, pero no prometemos respuesta individual ni plazo fijo. Los errores reproducibles y las correcciones con fuente tienen prioridad. Si corregimos algo importante, actualizamos la fecha o el historial del sitio para que el cambio sea visible.'] },
      ],
      emailLabel: 'Correo de contacto',
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
    terms: {
      title: 'Conditions d’utilisation de WorthCalc',
      description: 'Conditions applicables aux calculateurs gratuits WorthCalc : portée des résultats, usages interdits, disponibilité et droits impératifs des consommateurs.',
      updated: '2026-07-19',
      intro: ['Les présentes conditions encadrent l’accès gratuit à WorthCalc. Utiliser un calculateur suppose un usage licite et la compréhension de ses limites. Aucun compte ni paiement n’est requis pour exécuter les outils publiés.'],
      sections: [
        { heading: 'Nature du service', paragraphs: ['WorthCalc fournit des formules, exemples et guides généraux pour comparer coûts, échéances, temps et seuils de rentabilité. Le résultat dépend de vos saisies et des hypothèses affichées ; il ne constitue ni une offre de crédit, ni une estimation contractuelle, ni une promesse d’économie, ni un conseil financier, fiscal ou juridique personnalisé.'] },
        { heading: 'Vérifications qui vous reviennent', paragraphs: ['Contrôlez les unités, la période, les taxes, frais, devises et clauses de votre contrat. Un tarif, taux, dispositif public ou texte applicable peut évoluer après la date de vérification. Avant une décision portant sur une dette, un logement, un placement, une assurance ou un droit, consultez les documents à jour et un professionnel qualifié si la situation l’exige.'] },
        { heading: 'Usages admis et comportements interdits', paragraphs: ['Vous pouvez utiliser et citer les outils à titre personnel, pédagogique ou pour une analyse interne. Il est interdit de perturber le service, contourner une mesure de sécurité, envoyer un trafic automatisé dégradant, injecter un code malveillant, présenter un résultat comme une certification officielle ou reprendre substantiellement la marque, l’interface ou le code afin d’exploiter un service créant une confusion.'] },
        { heading: 'Disponibilité, erreur et responsabilité', paragraphs: ['Nous testons les formules et examinons les anomalies reproductibles, mais un service gratuit peut évoluer, être interrompu ou comporter une erreur. Dans les limites autorisées, WorthCalc ne répond pas d’une décision prise sans contrôle des données et du contrat pertinent. Aucune clause ne supprime une responsabilité qui ne peut légalement être exclue, ni les droits impératifs dont bénéficie un consommateur.'] },
        { heading: 'Propriété, liens et publicité', paragraphs: ['La marque WorthCalc, le graphisme, les textes originaux et le code appartiennent à leur titulaire, sauf mention contraire. Les sites liés appliquent leurs propres conditions. Une publicité peut financer le site, mais elle est distincte du calcul et sa présence ne vaut pas recommandation de l’annonceur.'] },
        { heading: 'Révision des conditions', paragraphs: ['Ces conditions peuvent être adaptées à une nouvelle fonction, une règle ou un risque. La date en tête indique la version ; une modification substantielle sera publiée ici et s’appliquera pour l’avenir. Si une stipulation est inapplicable, les autres restent valables dans la mesure permise.'] },
      ],
      emailLabel: 'Question relative aux conditions',
      sourcesHeading: 'Repère français sur les clauses de consommation',
      sources: [
        { label: 'DGCCRF — clauses abusives, clarté et droits du consommateur', href: 'https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques/clauses-abusives-12-clauses-interdites-et-10-clauses-dont-il-faut-demontrer-la-legitimite' },
      ],
    },
    contact: {
      title: 'Contacter WorthCalc : calcul, source ou proposition',
      description: 'La méthode pour signaler un calcul erroné, une donnée obsolète, un défaut mobile ou proposer un sujet ou un partenariat à WorthCalc.',
      updated: '2026-07-19',
      intro: ['WorthCalc est un site indépendant qui échange directement par e-mail, sans compte de support. Nous lisons les messages portant sur l’exactitude des calculs, les sources, l’accessibilité, la qualité éditoriale et les collaborations clairement identifiées.'],
      sections: [
        { heading: 'Rendre une anomalie reproductible', paragraphs: ['Précisez l’URL, la langue, chaque valeur saisie, le résultat affiché et celui attendu. Indiquez la devise, la période et le séparateur décimal. Une capture peut compléter le signalement, mais recopiez les nombres en texte afin que la formule puisse être rejouée.'], items: ['Navigateur, appareil et version si vous les connaissez', 'Largeur d’écran approximative pour un défaut d’affichage', 'Étapes entre l’ouverture de la page et l’erreur', 'Source publique et date lorsqu’une valeur semble dépassée'] },
        { heading: 'Ne transmettez pas de données sensibles', paragraphs: ['N’envoyez ni pièce d’identité, mot de passe, adresse complète, carte bancaire, IBAN, bulletin de paie ou contrat non anonymisé. Des chiffres fictifs reproduisant la structure suffisent généralement à tester le calcul. Pour une inscription e-mail, limitez-vous à l’adresse utilisée et à l’action demandée.'] },
        { heading: 'Suggérer un calculateur ou une amélioration', paragraphs: ['Une bonne proposition décrit la décision rencontrée en France, les coûts souvent oubliés, les variables modifiables, une formule possible et une source officielle. Nous privilégions les problèmes récurrents qui appellent une comparaison ; une page de marque ou une affirmation promotionnelle non vérifiable n’est pas un sujet éditorial.'] },
        { heading: 'Presse, publicité et partenariat', paragraphs: ['Présentez l’organisation, l’objectif, la contrepartie et tout lien commercial. Un partenaire ne peut pas acheter le résultat d’un calculateur, masquer une limite importante ou transformer une annonce en avis éditorial. Un message n’emporte ni réponse garantie, ni publication, ni accord.'] },
        { heading: 'Ce que cette adresse ne remplace pas', paragraphs: ['Cette boîte n’est ni un conseil financier personnalisé, ni un service d’urgence, ni le support d’une banque. Nous ne pouvons pas choisir à votre place un crédit, un logement ou un placement. En cas de fraude, d’échéance juridique, de litige contractuel ou de danger immédiat, contactez les services officiels ou un professionnel compétent.'] },
        { heading: 'Traitement et suivi', paragraphs: ['L’équipe étant réduite, chaque message pertinent est lu sans délai de réponse garanti. Les erreurs reproductibles et corrections accompagnées d’une source sont prioritaires. Une correction importante est datée ou inscrite au journal des modifications afin de rester vérifiable.'] },
      ],
      emailLabel: 'Adresse de contact',
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
    terms: {
      title: 'Nutzungsbedingungen für WorthCalc',
      description: 'Regeln für die kostenlosen WorthCalc-Rechner: Aussagegrenzen, zulässige Nutzung, Verfügbarkeit, Haftung und zwingende Verbraucherrechte.',
      updated: '2026-07-19',
      intro: ['Diese Bedingungen gelten für die kostenlose Nutzung von WorthCalc. Wer einen Rechner aufruft, verpflichtet sich zu einer rechtmäßigen Nutzung und berücksichtigt die beschriebenen Grenzen. Für veröffentlichte Berechnungen sind weder Konto noch Zahlung erforderlich.'],
      sections: [
        { heading: 'Gegenstand des Angebots', paragraphs: ['WorthCalc stellt Formeln, Beispiele und allgemeine Leitfäden bereit, um Kosten, Raten, Zeitaufwand und Gewinnschwellen zu vergleichen. Das Ergebnis entsteht aus Ihren Eingaben und sichtbaren Annahmen. Es ist weder Kreditangebot noch verbindliche Bewertung, Sparzusage oder persönliche Finanz-, Steuer- beziehungsweise Rechtsberatung.'] },
        { heading: 'Prüfung vor einer Entscheidung', paragraphs: ['Kontrollieren Sie Einheit, Zeitraum, Steuer, Gebühr, Währung und den vollständigen Vertrag. Preise, Zinssätze, Förderungen oder Vorschriften können sich nach dem angegebenen Prüfdatum ändern. Bei Schulden, Immobilien, Anlage, Versicherung oder Rechtsfolgen sind aktuelle Unterlagen und bei Bedarf qualifizierte Beratung heranzuziehen.'] },
        { heading: 'Erlaubte und unzulässige Nutzung', paragraphs: ['Die Rechner dürfen privat, in der Bildung und für interne Vergleiche verwendet und verlinkt werden. Untersagt sind Eingriffe in den Betrieb, Umgehung von Schutzmaßnahmen, belastender automatisierter Abruf, Schadcode, die Darstellung eines Ergebnisses als amtliche Bescheinigung sowie die wesentliche Übernahme von Marke, Gestaltung oder Code für einen verwechslungsfähigen Dienst.'] },
        { heading: 'Verfügbarkeit, Fehler und Haftungsgrenzen', paragraphs: ['Wir testen Formeln und untersuchen reproduzierbare Fehler. Ein kostenloser Dienst kann dennoch geändert, vorübergehend unterbrochen oder fehlerhaft sein. Soweit rechtlich zulässig, haftet WorthCalc nicht für eine Entscheidung, bei der Eingaben und maßgeblicher Vertrag ungeprüft blieben. Zwingende Haftung — insbesondere soweit sie nach § 309 BGB nicht ausgeschlossen werden darf — und unabdingbare Verbraucherrechte bleiben unberührt.'] },
        { heading: 'Rechte an Inhalten, Links und Werbung', paragraphs: ['Marke, Gestaltung, Originaltexte und Code von WorthCalc stehen ihrem jeweiligen Rechteinhaber zu, soweit nichts anderes genannt ist. Verlinkte Angebote haben eigene Bedingungen. Werbung kann die Website finanzieren, ist jedoch vom Rechenergebnis getrennt und bedeutet keine Empfehlung des Werbetreibenden.'] },
        { heading: 'Änderungen und Teilunwirksamkeit', paragraphs: ['Wir können die Bedingungen an neue Funktionen, Vorschriften oder Risiken anpassen. Das Datum oben kennzeichnet die Fassung; wesentliche Änderungen werden auf dieser Seite für die Zukunft veröffentlicht. Sollte eine Regel unwirksam sein, bleiben die übrigen Regeln im gesetzlich zulässigen Umfang bestehen.'] },
      ],
      emailLabel: 'Fragen zu den Nutzungsbedingungen',
      sourcesHeading: 'Deutsche gesetzliche Einordnung',
      sources: [
        { label: 'Bundesministerium der Justiz — § 309 BGB, Klauselverbote und Haftungsgrenzen', href: 'https://www.gesetze-im-internet.de/bgb/__309.html' },
      ],
    },
    contact: {
      title: 'WorthCalc kontaktieren: Rechenfehler, Quelle oder Vorschlag',
      description: 'So melden Sie einen falschen Rechenweg, veraltete Daten, mobile Darstellungsfehler oder einen redaktionellen beziehungsweise geschäftlichen Vorschlag.',
      updated: '2026-07-19',
      intro: ['WorthCalc ist ein unabhängiges Projekt und beantwortet Anliegen direkt per E-Mail, ohne Supportkonto. Gelesen werden Hinweise zu Rechengenauigkeit, Quellen, Barrierearmut, redaktioneller Qualität und transparent gekennzeichneten Kooperationen.'],
      sections: [
        { heading: 'Einen Fehler nachvollziehbar melden', paragraphs: ['Nennen Sie genaue URL, Sprache, sämtliche Eingaben, angezeigtes und erwartetes Ergebnis. Ergänzen Sie Währung, Zeitraum und Dezimaltrennzeichen. Ein Bildschirmfoto kann helfen; schreiben Sie die Zahlen zusätzlich als Text, damit wir die Formel reproduzieren können.'], items: ['Browser, Gerät und Version, soweit bekannt', 'Ungefähre Bildschirmbreite bei einem Layoutfehler', 'Schritte vom Seitenaufruf bis zum Fehler', 'Amtliche Quelle und Datum bei einem veralteten Wert'] },
        { heading: 'Persönliche Daten schützen', paragraphs: ['Senden Sie keine Ausweisnummer, Passwörter, vollständige Adresse, Karten- oder Kontonummer, Gehaltsabrechnung oder einen nicht anonymisierten Vertrag. Für einen Rechentest reichen meist erfundene Zahlen mit derselben Struktur. Bei einem Newsletter-Anliegen genügen die verwendete E-Mail-Adresse und die gewünschte Maßnahme.'] },
        { heading: 'Neuen Rechner oder Verbesserung vorschlagen', paragraphs: ['Ein hilfreicher Vorschlag beschreibt eine in Deutschland wiederkehrende Entscheidung, übersehene Kosten, veränderbare Größen, eine mögliche Formel und eine öffentliche Quelle. Vorrang haben nachvollziehbare Vergleiche. Reine Markenseiten und ungeprüfte Werbeaussagen sind kein redaktionelles Thema.'] },
        { heading: 'Presse, Werbung und Zusammenarbeit', paragraphs: ['Nennen Sie Organisation, Zweck, Gegenleistung und geschäftliche Verbindung. Niemand kann ein gewünschtes Rechenergebnis kaufen, eine wesentliche Einschränkung entfernen lassen oder Werbung als redaktionelle Empfehlung ausgeben. Eine Anfrage garantiert weder Antwort noch Veröffentlichung oder Vertrag.'] },
        { heading: 'Wofür die Adresse nicht gedacht ist', paragraphs: ['Das Postfach ist keine persönliche Finanzberatung, Notfallstelle oder Bankhotline. Wir entscheiden nicht über Kredit, Immobilie oder Anlage einer einzelnen Person. Bei Betrug, akuter Gefahr, Rechtsfrist oder Vertragsstreit sind zuständige Behörden und qualifizierte Beratung vor Ort die richtigen Anlaufstellen.'] },
        { heading: 'Bearbeitung und Nachweis', paragraphs: ['Das Team ist klein. Relevante Nachrichten werden gelesen, eine individuelle Antwort oder feste Frist können wir nicht zusagen. Reproduzierbare Fehler und belegte Korrekturen haben Vorrang. Wesentliche Änderungen erhalten ein neues Prüfdatum oder einen Eintrag im Änderungsprotokoll.'] },
      ],
      emailLabel: 'Kontaktadresse',
    },
  },
};
