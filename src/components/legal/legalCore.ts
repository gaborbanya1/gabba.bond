import { AppRoute, LegalDocKind } from '../../routing';

export type LegalLang = 'hu' | 'de' | 'en';

export type LegalIconKey =
  | 'shield'
  | 'lock'
  | 'server'
  | 'trash'
  | 'eye'
  | 'scale'
  | 'smartphone'
  | 'database'
  | 'warning'
  | 'credit-card'
  | 'file-check'
  | 'activity'
  | 'phone-call'
  | 'users';

export interface LegalSectionItem {
  label?: string;
  text: string;
}

export interface LegalSubsection {
  subtitle: string;
  badge?: string;
  paragraphs?: string[];
  bullets?: LegalSectionItem[];
}

export interface LegalSection {
  id: string;
  number: string;
  title: string;
  icon?: LegalIconKey;
  isWarningBox?: boolean;
  intro?: string;
  paragraphs?: string[];
  subsections?: LegalSubsection[];
  bullets?: LegalSectionItem[];
  footerNote?: string;
}

export interface LegalSummaryCard {
  title: string;
  desc: string;
}

export interface ProductLegalScope {
  productId: string;
  productName: string;
  productRoute: AppRoute;
  packageOrDomain: Record<LegalLang, string>;
  routes: Record<LegalDocKind, AppRoute>;
  deleteAccountRoute?: AppRoute;
}

export interface LegalDocumentData {
  kind: LegalDocKind;
  shortTabLabel: string;
  breadcrumbCurrent: string;
  badges: [string, string, string];
  title: string;
  subtitle: string;
  effectiveDateValue: string;
  quickSummaryTitle: string;
  quickSummaryItems: LegalSummaryCard[];
  operatorSectionTitle: string;
  sections: LegalSection[];
}

export interface DeletionHeroData {
  badge: string;
  irreversibleBadge: string;
  title: string;
  subtitle: string;
  method1Title: string;
  method1Desc: string;
  method1Steps: string[];
  method2Title: string;
  method2Desc: string;
  method2Btn: string;
  whatDeletedTitle: string;
  whatDeletedItems: string[];
  irreversibleDesc: string;
}

export interface ProductLegalBundle {
  scope: ProductLegalScope;
  documents: Record<LegalLang, Record<LegalDocKind, LegalDocumentData>>;
  deletionHero?: Record<LegalLang, DeletionHeroData>;
}

// ============================================================================
// 80% SHARED GABBA OPERATOR & INFRASTRUCTURE CORE
// Strictly NO tax number displayed yet, per studio operator directive.
// ============================================================================

export const GABBA_STUDIO_OPERATOR = {
  email: 'gabba@gabba.bond',
  euRegionCode: 'europe-west1',
  byLang: {
    hu: {
      operatorLabel: 'Üzemeltető / Szolgáltató és Adatkezelő',
      operatorName: 'Bányai Gábor',
      hqLabel: 'Székhely és Joghatóság',
      hqValue: '9400 Sopron, Ravazd utca 46., Magyarország (Európai Unió)',
      emailLabel: 'Hivatalos és adatvédelmi e-mail',
      cloudLabel: 'EU Felhőinfrastruktúra (Adatfeldolgozó)',
      cloudValue: 'Google Ireland Limited — europe-west1 (Belgium, EU)',
      scopeLabel: 'Érintett termék és szolgáltatás',
    },
    de: {
      operatorLabel: 'Betreiber / Diensteanbieter & Verantwortlicher',
      operatorName: 'Bányai Gábor',
      hqLabel: 'Sitz & Rechtsordnung',
      hqValue: 'Ravazd utca 46, 9400 Sopron, Ungarn (Europäische Union)',
      emailLabel: 'Offizielle Kontakt- & Datenschutz-E-Mail',
      cloudLabel: 'EU-Cloud-Infrastruktur (Auftragsverarbeiter)',
      cloudValue: 'Google Ireland Limited — europe-west1 (Belgien, EU)',
      scopeLabel: 'Geltungsbereich (Produkt & Dienst)',
    },
    en: {
      operatorLabel: 'Operator / Service Provider & Data Controller',
      operatorName: 'Bányai Gábor',
      hqLabel: 'Headquarters & Jurisdiction',
      hqValue: 'Ravazd utca 46, 9400 Sopron, Hungary (European Union)',
      emailLabel: 'Official & Privacy Contact Email',
      cloudLabel: 'EU Cloud Infrastructure (Sub-Processor)',
      cloudValue: 'Google Ireland Limited — europe-west1 (Belgium, EU)',
      scopeLabel: 'Product & Service Scope',
    },
  },
} as const;

export interface LegalUiCopy {
  studioHome: string;
  docSwitcherAria: string;
  langSwitcherAria: string;
  printBtn: string;
  tocTitle: string;
  effectiveDateLabel: string;
  canonicalUrlLabel: string;
  anchorAriaPrefix: string;
  contactCardBadge: string;
  contactCardTitle: string;
  contactCardDesc: string;
  contactEmailBtn: string;
  deleteAccountBtn: string;
  backToProductBtn: (productName: string) => string;
  backToStudioBtn: string;
  otherDocsHeading: string;
}

export const LEGAL_UI_COPY: Record<LegalLang, LegalUiCopy> = {
  hu: {
    studioHome: 'gabba',
    docSwitcherAria: 'Jogi dokumentum kiválasztása',
    langSwitcherAria: 'Dokumentum nyelvének kiválasztása',
    printBtn: 'Nyomtatás / PDF mentés',
    tocTitle: 'Tartalomjegyzék (Gyorsugrás fejezetekre)',
    effectiveDateLabel: 'Hatálybalépés és legutóbbi frissítés:',
    canonicalUrlLabel: 'Hivatkozási URL:',
    anchorAriaPrefix: 'Közvetlen hivatkozás erre a szakaszra:',
    contactCardBadge: 'Közvetlen Üzemeltetői & GDPR Kapcsolat',
    contactCardTitle: 'Kérdése van, vagy jogait szeretné gyakorolni?',
    contactCardDesc:
      'Adatvédelmi megkeresés, számlázási/elállási nyilatkozat vagy adattörlési igény esetén írjon közvetlenül az Üzemeltetőnek (72 órán belüli adatvédelmi válaszadás), vagy használja az alkalmazáson belüli azonnali adattörlés gombot.',
    contactEmailBtn: 'Kapcsolatfelvétel: gabba@gabba.bond',
    deleteAccountBtn: 'Fiók- és adattörlési útmutató (/delete-account)',
    backToProductBtn: (name) => `Vissza a ${name} oldalra`,
    backToStudioBtn: 'Vissza a főoldalra',
    otherDocsHeading: 'Kapcsolódó hivatalos dokumentumok:',
  },
  de: {
    studioHome: 'gabba',
    docSwitcherAria: 'Rechtsdokument auswählen',
    langSwitcherAria: 'Dokumentensprache wählen',
    printBtn: 'Drucken / Als PDF speichern',
    tocTitle: 'Inhaltsverzeichnis (Schnellzugriff)',
    effectiveDateLabel: 'Inkrafttreten & Letzte Aktualisierung:',
    canonicalUrlLabel: 'Kanonische URL:',
    anchorAriaPrefix: 'Direktlink zu Abschnitt:',
    contactCardBadge: 'Direkter Betreiber- & DSGVO-Kontakt',
    contactCardTitle: 'Fragen oder Ausübung Ihrer Betroffenenrechte?',
    contactCardDesc:
      'Für Datenschutzanfragen, Widerrufserklärungen oder Löschungsanträge kontaktieren Sie den Betreiber direkt per E-Mail (Bearbeitung von DSGVO-Anfragen innerhalb von 72 Stunden) oder nutzen Sie die sofortige In-App-Löschung.',
    contactEmailBtn: 'Kontakt: gabba@gabba.bond',
    deleteAccountBtn: 'Anleitung zur Kontolöschung (/delete-account)',
    backToProductBtn: (name) => `Zurück zur ${name}-Produktseite`,
    backToStudioBtn: 'Zurück zur Startseite',
    otherDocsHeading: 'Weitere verbindliche Rechtsdokumente:',
  },
  en: {
    studioHome: 'gabba',
    docSwitcherAria: 'Select legal document',
    langSwitcherAria: 'Select document language',
    printBtn: 'Print / Save as PDF',
    tocTitle: 'Table of Contents (Section Anchors)',
    effectiveDateLabel: 'Effective Date & Last Updated:',
    canonicalUrlLabel: 'Canonical URL:',
    anchorAriaPrefix: 'Direct link to section:',
    contactCardBadge: 'Direct Operator & GDPR Contact',
    contactCardTitle: 'Questions, Legal Notices, or Data Erasure Requests?',
    contactCardDesc:
      'For GDPR inquiries, statutory withdrawal notices, or email-based account deletion, contact the Operator directly (72-hour response SLA for privacy requests) or trigger instant one-tap erasure inside the app.',
    contactEmailBtn: 'Contact Operator: gabba@gabba.bond',
    deleteAccountBtn: 'Account & Data Deletion Guide (/delete-account)',
    backToProductBtn: (name) => `Back to ${name} Page`,
    backToStudioBtn: 'Back to Home',
    otherDocsHeading: 'Related Official Documents:',
  },
};

export function resolveLegalLang(lang: string): LegalLang {
  if (lang === 'hu' || lang === 'de') return lang;
  return 'en';
}

// ============================================================================
// 80% REUSABLE CORE CLAUSE BUILDERS (SHARED ACROSS ALL GABBA PRODUCTS)
// ============================================================================

export function buildCoreEuSecuritySection(
  lang: LegalLang,
  number: string,
  extraBullet?: LegalSectionItem
): LegalSection {
  if (lang === 'hu') {
    const bullets: LegalSectionItem[] = [
      {
        label: 'Kizárólagos Európai Uniós adattárolás (europe-west1 – Belgium):',
        text: 'Minden felhőalapú adatbázis (Firebase Cloud Firestore, Firebase Realtime Database) és szerveroldali háttérfolyamat (Cloud Functions v2, setGlobalOptions({ region: "europe-west1" })) kizárólag az Európai Unión belül (St. Ghislain, Belgium / EU adatközpont) fut és tárolódik.',
      },
      {
        label: 'Adatfeldolgozó (Sub-processor) és EU DPA megfelelőség:',
        text: 'A felhőinfrastruktúrát a Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Írország) biztosítja a Google Cloud Data Processing and Security Terms (GDPR 28. cikk szerinti adatfeldolgozói szerződés) hatálya alatt.',
      },
      {
        label: 'Titkosítás átvitel közben és nyugalmi állapotban:',
        text: 'Minden kliens–szerver kommunikáció HTTPS / TLS 1.3 protokollal, a közvetlen hang-/videókapcsolatok pedig végpontok közötti DTLS-SRTP titkosítással védettek. Minden tárolt felhőadat nyugalmi állapotban AES-256 titkosítással védett.',
      },
      {
        label: 'Zéró reklám, zéró profilalkotás és zéró adatértékesítés:',
        text: 'A gabba alkalmazások nem tartalmaznak reklám-SDK-kat vagy harmadik féltől származó viselkedéskövető kódokat, nem végeznek automatizált döntéshozatalt vagy profilalkotást (GDPR 22. cikk), és soha nem értékesítenek személyes adatokat.',
      },
    ];
    if (extraBullet) bullets.push(extraBullet);
    return {
      id: 'eu-residency-security',
      number,
      icon: 'server',
      title: 'EU-s adattárolás, adatfeldolgozók és technikai biztonság (GDPR 28., 32., 44. cikk)',
      intro:
        'A GDPR 32. cikkének megfelelően korszerű technikai és szervezési intézkedéseket (TOMs) alkalmazunk az adatok bizalmasságának, sértetlenségének és ellenállóképességének védelmére:',
      bullets,
    };
  }

  if (lang === 'de') {
    const bullets: LegalSectionItem[] = [
      {
        label: 'Ausschließliche Datenhaltung in der Europäischen Union (europe-west1 – Belgien):',
        text: 'Sämtliche Cloud-Datenbanken (Firebase Cloud Firestore, Realtime Database) und serverseitigen Funktionen (Cloud Functions v2 mit Region „europe-west1“) werden ausschließlich innerhalb der Europäischen Union (St. Ghislain, Belgien) betrieben.',
      },
      {
        label: 'Auftragsverarbeiter (Sub-Processor) nach Art. 28 DSGVO:',
        text: 'Als Infrastruktur-Auftragsverarbeiter fungiert die Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Irland) auf Grundlage des Google Cloud Data Processing Addendum (Art. 28 DSGVO).',
      },
      {
        label: 'Verschlüsselung bei Übertragung und Speicherung:',
        text: 'Jegliche Kommunikation ist über HTTPS / TLS 1.3 (sowie bei Echtzeitmedien über DTLS-SRTP) geschützt. Alle ruhenden Daten werden serverseitig mit AES-256 verschlüsselt.',
      },
      {
        label: 'Keine Werbung, kein Profiling und kein Datenverkauf:',
        text: 'Anwendungen von gabba enthalten keinerlei Werbe-SDKs oder Drittanbieter-Tracker, führen keine automatisierte Entscheidungsfindung (Art. 22 DSGVO) durch und veräußern niemals personenbezogene Daten.',
      },
    ];
    if (extraBullet) bullets.push(extraBullet);
    return {
      id: 'eu-residency-security',
      number,
      icon: 'server',
      title: 'EU-Datenhaltung, Auftragsverarbeiter & Technische Sicherheit (Art. 28, 32, 44 DSGVO)',
      intro:
        'Gemäß Art. 32 DSGVO setzen wir modernste technische und organisatorische Maßnahmen (TOMs) zum Schutz Ihrer Daten ein:',
      bullets,
    };
  }

  const bullets: LegalSectionItem[] = [
    {
      label: 'Strict EU Data Residency (europe-west1 – Belgium):',
      text: 'All cloud databases (Firebase Cloud Firestore, Realtime Database) and serverless functions (Cloud Functions v2 pinned to "europe-west1") are hosted and executed exclusively inside the European Union (St. Ghislain, Belgium).',
    },
    {
      label: 'Authorized Data Processor (GDPR Art. 28):',
      text: 'Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Ireland) acts as our cloud infrastructure processor governed by the Google Cloud Data Processing and Security Terms (GDPR Art. 28 DPA).',
    },
    {
      label: 'Encryption in Transit & at Rest:',
      text: 'All client-server traffic is encrypted via HTTPS / TLS 1.3 (and peer-to-peer media via DTLS-SRTP). All stored cloud data is encrypted at rest using AES-256.',
    },
    {
      label: 'Zero Advertising, Zero Profiling & Zero Data Selling:',
      text: 'gabba applications contain no advertising SDKs, no third-party behavioral trackers, perform no automated profiling (GDPR Art. 22), and never sell or rent personal data.',
    },
  ];
  if (extraBullet) bullets.push(extraBullet);
  return {
    id: 'eu-residency-security',
    number,
    icon: 'server',
    title: 'EU Data Residency, Sub-Processors & Technical Security (GDPR Art. 28, 32, 44)',
    intro:
      'We implement state-of-the-art Technical and Organizational Measures (TOMs) under GDPR Article 32 to guarantee confidentiality, integrity, and resilience:',
    bullets,
  };
}

export function buildCoreSupervisoryAuthoritySection(lang: LegalLang, number: string): LegalSection {
  if (lang === 'hu') {
    return {
      id: 'supervisory-authority',
      number,
      icon: 'scale',
      title: 'Felügyeleti hatóságok és jogorvoslati lehetőségek (GDPR 77. és 79. cikk)',
      intro:
        'Amennyiben úgy ítéli meg, hogy személyes adatainak kezelése sérti a GDPR előírásait, jogosult panaszt tenni a lakóhelye, munkahelye vagy a vélt jogsértés helye szerinti uniós tagállam adatvédelmi hatóságánál, illetve bírósághoz fordulni:',
      bullets: [
        {
          label: 'Vezető felügyeleti hatóság (Magyarország – az Adatkezelő székhelye):',
          text: 'Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH) • Székhely: 1055 Budapest, Falk Miksa utca 9-11. • Postacím: 1363 Budapest, Pf. 9. • Telefon: +36 (1) 391-1400 • E-mail: ugyfelszolgalat@naih.hu • Honlap: https://www.naih.hu',
        },
        {
          label: 'Németország és Ausztria (DACH régió hatóságai):',
          text: 'Der Bundesbeauftragte für den Datenschutz und die Informationsfreiheit (BfDI – Graurheindorfer Str. 153, 53117 Bonn, https://www.bfdi.bund.de), az illetékes tartományi adatvédelmi hatóság (Landesdatenschutzbehörde), illetve Ausztriában az Österreichische Datenschutzbehörde (DSB – Barichgasse 40-42, 1030 Wien, https://www.dsb.gv.at).',
        },
        {
          label: 'További EU / EGT tagállamok hatóságai:',
          text: 'Az összes európai nemzeti adatvédelmi hatóság hivatalos listája elérhető az Európai Adatvédelmi Testület (EDPB) honlapján: https://edpb.europa.eu/about-edpb/about-edpb/members_hu',
        },
      ],
    };
  }

  if (lang === 'de') {
    return {
      id: 'supervisory-authority',
      number,
      icon: 'scale',
      title: 'Aufsichtsbehörden & Beschwerderecht (Art. 77 & 79 DSGVO)',
      intro:
        'Sie haben gemäß Art. 77 DSGVO das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, insbesondere in dem EU-Mitgliedstaat Ihres gewöhnlichen Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes:',
      bullets: [
        {
          label: 'Federführende Aufsichtsbehörde (Ungarn – Sitz des Verantwortlichen):',
          text: 'Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH) • Anschrift: 1055 Budapest, Falk Miksa utca 9-11., Ungarn • Postanschrift: 1363 Budapest, Pf. 9. • Telefon: +36 (1) 391-1400 • E-Mail: ugyfelszolgalat@naih.hu • Website: https://www.naih.hu',
        },
        {
          label: 'Aufsichtsbehörden in Deutschland & Österreich (DACH-Region):',
          text: 'Der Bundesbeauftragte für den Datenschutz und die Informationsfreiheit (BfDI – Graurheindorfer Str. 153, 53117 Bonn, https://www.bfdi.bund.de), die zuständige Landesdatenschutzbehörde Ihres Bundeslandes oder in Österreich die Österreichische Datenschutzbehörde (DSB – Barichgasse 40-42, 1030 Wien, https://www.dsb.gv.at).',
        },
        {
          label: 'Alle weiteren EU- / EWR-Mitgliedstaaten:',
          text: 'Ein vollständiges Verzeichnis aller europäischen Datenschutzbehörden finden Sie beim Europäischen Datenschutzausschuss (EDSA / EDPB): https://edpb.europa.eu/about-edpb/about-edpb/members_de',
        },
      ],
    };
  }

  return {
    id: 'supervisory-authority',
    number,
    icon: 'scale',
    title: 'Supervisory Authorities & Right to Lodge a Complaint (GDPR Art. 77 & 79)',
    intro:
      'If you believe that the processing of your personal data infringes the GDPR, you have the right to lodge a complaint with a supervisory authority in the EU Member State of your habitual residence, place of work, or place of the alleged infringement:',
    bullets: [
      {
        label: 'Lead Supervisory Authority (Hungary – Place of Establishment):',
        text: 'Hungarian National Authority for Data Protection and Freedom of Information (NAIH) • Address: 1055 Budapest, Falk Miksa utca 9-11., Hungary • Postal address: 1363 Budapest, Pf. 9. • Phone: +36 (1) 391-1400 • Email: ugyfelszolgalat@naih.hu • Website: https://www.naih.hu',
      },
      {
        label: 'Germany & Austria (DACH Region Authorities):',
        text: 'Der Bundesbeauftragte für den Datenschutz und die Informationsfreiheit (BfDI – Graurheindorfer Str. 153, 53117 Bonn, Germany, https://www.bfdi.bund.de), the competent State Data Protection Authority (Landesdatenschutzbehörde), or the Austrian Data Protection Authority (DSB – Barichgasse 40-42, 1030 Wien, https://www.dsb.gv.at).',
      },
      {
        label: 'All Other EU / EEA Member States:',
        text: 'A complete directory of national European Data Protection Authorities is available from the European Data Protection Board (EDPB): https://edpb.europa.eu/about-edpb/about-edpb/members_en',
      },
    ],
  };
}

export function buildCoreTermsDisputeSection(lang: LegalLang, number: string): LegalSection {
  if (lang === 'hu') {
    return {
      id: 'dispute-resolution',
      number,
      icon: 'scale',
      title: 'Irányadó jog, panaszkezelés és békéltető testületi eljárás',
      intro:
        'A Szolgáltató elkötelezett a felhasználói észrevételek gyors, békés és méltányos rendezése mellett:',
      bullets: [
        {
          label: 'Közvetlen ügyfélszolgálat és panaszkezelés:',
          text: 'Fogyasztói panaszát az gabba@gabba.bond e-mail-címen vagy postai úton (9400 Sopron, Ravazd utca 46.) terjesztheti elő. Az írásbeli panaszt a Szolgáltató érdemben megvizsgálja, és legkésőbb 30 napon belül írásban megválaszolja (Fgytv. 17/A. §).',
        },
        {
          label: 'Illetékes Békéltető Testület (Alternatív vitarendezés):',
          text: 'Amennyiben a fogyasztói jogvita a Szolgáltatóval folytatott egyeztetés során nem rendeződik, a Fogyasztó jogosult a lakóhelye vagy a Szolgáltató székhelye szerint illetékes békéltető testülethez fordulni: Győr-Moson-Sopron Vármegyei Kereskedelmi és Iparkamara mellett működő Békéltető Testület (Székhely: 9021 Győr, Szent István út 10/a. • Telefon: +36 96 520 217 • E-mail: bekeltetotestulet@gymskik.hu • Honlap: https://bekeltetesgyor.hu).',
        },
        {
          label: 'Alkalmazandó jog és uniós fogyasztóvédelem (Róma I. rendelet 6. cikk):',
          text: 'Jelen ÁSZF-re a magyar jog (különösen a Polgári Törvénykönyvről szóló 2013. évi V. törvény, az Ekertv. és a 45/2014. (II. 26.) Korm. rendelet) és az Európai Unió közvetlenül alkalmazandó jogszabályai irányadók. Ez a jogválasztás nem fosztja meg az Európai Unió más tagállamában (pl. Németországban vagy Ausztriában) szokásos tartózkodási hellyel rendelkező fogyasztót a saját állama kötelező fogyasztóvédelmi rendelkezései által biztosított védelemtől.',
        },
      ],
    };
  }

  if (lang === 'de') {
    return {
      id: 'dispute-resolution',
      number,
      icon: 'scale',
      title: 'Anwendbares Recht, Beschwerdemanagement & Streitbeilegung',
      intro:
        'Der Betreiber legt größten Wert auf eine transparente, faire und außergerichtliche Klärung von Kundenanliegen:',
      bullets: [
        {
          label: 'Direkter Kundensupport & Beschwerdebearbeitung:',
          text: 'Verbraucherbeschwerden können jederzeit per E-Mail an gabba@gabba.bond oder postalisch (Ravazd utca 46, 9400 Sopron, Ungarn) eingereicht werden. Schriftliche Beschwerden werden unverzüglich, spätestens jedoch innerhalb der gesetzlichen Frist von 30 Tagen, inhaltlich beantwortet.',
        },
        {
          label: 'Zuständige Verbraucherschlichtungsstelle:',
          text: 'Kommt keine einvernehmliche Lösung zustande, können sich Verbraucher an die nach dem Sitz des Betreibers zuständige Schlichtungsstelle wenden: Schlichtungsstelle bei der Industrie- und Handelskammer des Komitats Győr-Moson-Sopron (Győr-Moson-Sopron Vármegyei Békéltető Testület, Anschrift: Szent István út 10/a, 9021 Győr, Ungarn • E-Mail: bekeltetotestulet@gymskik.hu • Website: https://bekeltetesgyor.hu).',
        },
        {
          label: 'Anwendbares Recht & EU-Verbraucherschutz (Art. 6 Rom-I-VO):',
          text: 'Es gilt das Recht von Ungarn sowie das unmittelbar anwendbare Recht der Europäischen Union unter Ausschluss des UN-Kaufrechts. Bei Verbrauchern mit gewöhnlichem Aufenthalt in Deutschland, Österreich oder einem anderen EU-Mitgliedstaat bleiben die zwingenden Verbraucherschutzbestimmungen ihres Aufenthaltsstaates gemäß Art. 6 Abs. 2 der Verordnung (EG) Nr. 593/2008 (Rom I) uneingeschränkt unberührt.',
        },
      ],
    };
  }

  return {
    id: 'dispute-resolution',
    number,
    icon: 'scale',
    title: 'Governing Law, Consumer Complaints & Alternative Dispute Resolution',
    intro:
      'The Operator is committed to resolving user inquiries and consumer complaints promptly and amicably:',
    bullets: [
      {
        label: 'Direct Customer Support & Statutory 30-Day Complaint Handling:',
        text: 'You may submit any inquiry or formal consumer complaint by email to gabba@gabba.bond or by post (Ravazd utca 46, 9400 Sopron, Hungary). Formal written complaints are investigated on their merits and answered in writing within a maximum of 30 calendar days.',
      },
      {
        label: 'Competent Consumer Conciliation Board (ADR):',
        text: 'If a consumer dispute cannot be settled directly, consumers may initiate free out-of-court proceedings before the Conciliation Board of Győr-Moson-Sopron County (Győr-Moson-Sopron Vármegyei Békéltető Testület, Address: Szent István út 10/a, 9021 Győr, Hungary • Email: bekeltetotestulet@gymskik.hu • Web: https://bekeltetesgyor.hu) or their local EU national consumer ADR body.',
      },
      {
        label: 'Governing Law & Mandatory EU Consumer Protection (Rome I Art. 6):',
        text: 'These Terms are governed by the laws of Hungary and directly applicable European Union law. Pursuant to Article 6(2) of Regulation (EC) No 593/2008 (Rome I), this choice of law never deprives consumers habitually resident in another EU/EEA Member State of the protection afforded by mandatory provisions of the law of their country of residence.',
      },
    ],
  };
}
