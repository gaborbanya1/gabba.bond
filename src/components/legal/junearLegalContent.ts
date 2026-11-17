export type JunearLegalLang = 'hu' | 'de' | 'en';
export type JunearLegalDocType = 'privacy' | 'terms' | 'operations';

export interface JunearLegalBulletItem {
  label?: string;
  text: string;
}

export interface JunearLegalTableData {
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface JunearLegalSubsection {
  subtitle: string;
  badge?: string;
  paragraphs?: string[];
  bullets?: JunearLegalBulletItem[];
  table?: JunearLegalTableData;
}

export type JunearSectionIconKey =
  | 'controller'
  | 'consent'
  | 'residency'
  | 'inventory'
  | 'teacherWall'
  | 'cameraChat'
  | 'retention'
  | 'rights'
  | 'scope'
  | 'plans'
  | 'roles'
  | 'mdm'
  | 'antiBrick'
  | 'law'
  | 'safeguards'
  | 'schoolWindow'
  | 'sosBattery'
  | 'hmac'
  | 'deletion';

export interface JunearLegalSection {
  id: string;
  number: string;
  title: string;
  iconKey?: JunearSectionIconKey;
  isWarningBox?: boolean;
  intro?: string;
  paragraphs?: string[];
  bullets?: JunearLegalBulletItem[];
  table?: JunearLegalTableData;
  subsections?: JunearLegalSubsection[];
  footerNote?: string;
}

export interface JunearLegalDocumentContent {
  metaTitle: string;
  metaDescription: string;
  breadcrumbHome: string;
  breadcrumbJunear: string;
  breadcrumbCurrent: string;
  badges: string[];
  title: string;
  subtitle: string;
  effectiveDateLabel: string;
  effectiveDateValue: string;
  versionLabel: string;
  versionValue: string;
  langSwitchLabel: string;
  tocTitle: string;
  operatorCard: {
    heading: string;
    nameLabel: string;
    nameValue: string;
    addressLabel: string;
    addressValue: string;
    emailLabel: string;
    emailValue: string;
    versionFieldLabel: string;
    versionFieldValue: string;
    scopeLabel: string;
    scopeValue: string;
  };
  highlightsTitle: string;
  highlights: { title: string; desc: string }[];
  sections: JunearLegalSection[];
  ctaCard: {
    badge: string;
    title: string;
    desc: string;
    emailBtn: string;
    backToJunearBtn: string;
    setupGuideBtn: string;
  };
}

export interface JunearDeletionHeroContent {
  badge: string;
  irreversibleBadge: string;
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  stepBeforeDeleteNote: string;
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

export const JUNEAR_OPERATOR_METADATA = {
  operatorName: 'Bányai Gábor',
  registeredAddress: '9400 Sopron, Ravazd utca 46., Magyarország (Európai Unió)',
  contactEmail: 'info@gabba.bond',
  policyVersion: '1.0',
  effectiveDateIso: '2026-11-15',
  packageId: 'bond.gabba.junear',
  firebaseRegion: 'eur3 (europe-west)',
} as const;

export const JUNEAR_LEGAL_NAV_LABELS: Record<
  JunearLegalLang,
  {
    docSwitcherLabel: string;
    privacyTab: string;
    termsTab: string;
    operationsTab: string;
    deletionTab: string;
    backToJunearBtn: string;
  }
> = {
  hu: {
    docSwitcherLabel: 'JUNEAR Jogi és Gyermekvédelmi Dokumentumok',
    privacyTab: 'Adatvédelmi Tájékoztató (GDPR 8. cikk)',
    termsTab: 'Általános Szerződési Feltételek (ÁSZF)',
    operationsTab: 'Működési és Gyermekvédelmi Szabályzat',
    deletionTab: 'Fiók- és Adattörlés (GDPR 17. cikk)',
    backToJunearBtn: 'Vissza a JUNEAR oldalra',
  },
  de: {
    docSwitcherLabel: 'JUNEAR Rechts- & Kinderschutzdokumente',
    privacyTab: 'Datenschutzerklärung (DSGVO Art. 8)',
    termsTab: 'Allgemeine Geschäftsbedingungen (AGB)',
    operationsTab: 'Betriebs- & Kinderschutzrichtlinie',
    deletionTab: 'Konto- & Datenlöschung (DSGVO Art. 17)',
    backToJunearBtn: 'Zurück zur JUNEAR-Seite',
  },
  en: {
    docSwitcherLabel: 'JUNEAR Legal & Child-Safety Documents',
    privacyTab: 'Privacy Notice (GDPR Art. 8)',
    termsTab: 'Terms of Service (ToS)',
    operationsTab: 'Operational & Child-Safety Policy',
    deletionTab: 'Account & Data Deletion (GDPR Art. 17)',
    backToJunearBtn: 'Back to JUNEAR',
  },
};

export const JUNEAR_DELETION_HERO_CONTENT: Record<JunearLegalLang, JunearDeletionHeroContent> = {
  hu: {
    badge: 'GDPR 17. cikk & Google Play Families — Fiók- és Gyermekadat-törlés',
    irreversibleBadge: '72 órás végrehajtási garancia (eur3)',
    title: 'JUNEAR Fiók és Gyermekprofil Végleges Törlése',
    subtitle:
      'A szülői felügyeleti jog gyakorlója (Társszülő) bármikor, indokolás nélkül kérheti a JUNEAR családi fiók, a gyermekprofilok, a megosztott WebP családi fotók és minden kapcsolódó eur3 felhőadat végleges és visszaállíthatatlan törlését.',
    metaTitle: 'JUNEAR Fiók- és Adattörlés (GDPR 17. cikk) | gabba',
    metaDescription:
      'Hivatalos GDPR 17. cikk szerinti fiók- és gyermekadat-törlési eljárás a JUNEAR (bond.gabba.junear) biztonságos gyermektelefon ökoszisztémához.',
    stepBeforeDeleteNote:
      'Fontos biztonsági lépés törlés előtt: ha a gyermek készülékén aktív a Device Owner MDM mód, először kattintson a Szülői PWA-ban a „Távoli MDM feloldás (REMOTE_RELEASE)” gombra (vagy használja az 5-érintéses Offline 8 jegyű mesterkódot), hogy a telefon normál gyári állapotba térjen vissza.',
    method1Title: '1. módszer: Önkiszolgáló törlés a JUNEAR Szülői PWA-ból',
    method1Desc:
      'Bejelentkezett Társszülőként közvetlenül az alkalmazáson belül kezdeményezheti a készülék feloldását és a teljes adatállomány törlését:',
    method1Steps: [
      'Nyissa meg a JUNEAR Szülői PWA felületet, és az Anti-Brick biztonsági panelen válassza a „Távoli MDM feloldás (REMOTE_RELEASE)” parancsot a gyermek készülékének azonnali felszabadításához.',
      'Lépjen a Családi Beállítások -> Adatvédelem és GDPR menüpontba, majd válassza a „Gyermekprofil és családi fiók végleges törlése” műveletet.',
      'Erősítse meg a törlést: a rendszer azonnal törli az eur3 Firestore dokumentumokat és a Cloud Storage WebP fotókat.',
    ],
    method2Title: '2. módszer: Hivatalos e-mailes adattörlési kérelem (alkalmazás nélkül is)',
    method2Desc:
      'Ha már eltávolította az alkalmazást, vagy közvetlenül az adatkezelőtől kéri a törlést, küldjön üzenetet a regisztrált szülői e-mail címről az info@gabba.bond címre. A kérelmet legfeljebb 72 órán belül (de legkésőbb a GDPR szerinti 30 napon belül) teljesítjük és írásban visszaigazoljuk.',
    method2Btn: 'Adattörlési kérelem küldése — info@gabba.bond',
    whatDeletedTitle: 'Milyen adatok törlődnek véglegesen az EU (eur3) szerverekről?',
    whatDeletedItems: [
      'A szülői és nagyszülői felhasználói profilok (users/{uid}), valamint a teljes családi alapdokumentum (families/{familyId}).',
      'Minden gyermekprofil (children/{childId}), E.164 engedélyezett névjegylista (whitelist), órarend, feladatok, játékidő-kvóták és biztonsági zónák.',
      'A Double-Parent Handshake baráti kapcsolatok (friendships) és üzenetek, valamint az iskolai összekapcsolás (schoolLink/config és schoolSession/live).',
      'Az összes megosztott családi fénykép (<= 250 KB image/webp) az eur3 Firebase Cloud Storage tárhelyről, valamint a titkosított offline feloldó kulcs (secrets/offlineUnlock).',
    ],
    irreversibleDesc:
      'A törlés végleges és visszaállíthatatlan. Jogszabályi megőrzési kötelezettség kizárólag a számviteli törvény hatálya alá eső számlabizonylatokra (8 év) vonatkozik, amelyek gyermekprofil-adatot vagy helyadatot soha nem tartalmaznak.',
  },
  de: {
    badge: 'DSGVO Art. 17 & Google Play Families — Konto- & Kinderdatenlöschung',
    irreversibleBadge: '72-Stunden-Löschgarantie (EU eur3)',
    title: 'Endgültige Löschung von JUNEAR-Konto und Kinderprofilen',
    subtitle:
      'Sorgeberechtigte Eltern (Co-Parents) können jederzeit ohne Angabe von Gründen die vollständige und unwiderrufliche Löschung des Familienkontos, sämtlicher Kinderprofile, geteilter WebP-Familienfotos und aller zugehörigen Daten in der EU-Region eur3 verlangen.',
    metaTitle: 'JUNEAR Konto- & Datenlöschung (DSGVO Art. 17) | gabba',
    metaDescription:
      'Offizielles Verfahren zur Konto- und Kinderdatenlöschung gemäß DSGVO Art. 17 für das sichere Kindertelefon-Ökosystem JUNEAR (bond.gabba.junear).',
    stepBeforeDeleteNote:
      'Wichtiger Sicherheitshinweis vor der Kontolöschung: Falls auf dem Kindertelefon der Device-Owner-MDM-Schutz aktiv ist, lösen Sie bitte zuerst in der Eltern-PWA die „Fernfreigabe (REMOTE_RELEASE)“ aus (oder nutzen Sie den 8-stelligen Offline-Mastercode per 5-Tap auf das Schild-Symbol), damit das Smartphone vollständig entsperrt wird.',
    method1Title: 'Methode 1: Selbstständige Löschung in der JUNEAR Eltern-PWA',
    method1Desc:
      'Angemeldete Co-Parents können die Gerätefreigabe und vollständige Datenlöschung direkt in der Web-App durchführen:',
    method1Steps: [
      'Öffnen Sie die JUNEAR Eltern-PWA und senden Sie im Anti-Brick-Bereich den Befehl „REMOTE_RELEASE“, um alle MDM-Richtlinien auf dem Kindergerät sofort aufzuheben.',
      'Öffnen Sie Familieneinstellungen -> Datenschutz & DSGVO und wählen Sie „Kinderprofil & Familienkonto endgültig löschen“.',
      'Nach Bestätigung werden sämtliche Firestore-Dokumente und Cloud-Storage-WebP-Fotos in der EU-Region eur3 kaskadierend gelöscht.',
    ],
    method2Title: 'Methode 2: Löschantrag per E-Mail (auch ohne installierte App)',
    method2Desc:
      'Senden Sie eine kurze Nachricht von Ihrer registrierten Eltern-E-Mail-Adresse an info@gabba.bond. Wir führen die vollständige Löschung innerhalb von 72 Stunden (spätestens innerhalb der gesetzlichen Monatsfrist nach Art. 12 Abs. 3 DSGVO) durch und bestätigen sie schriftlich.',
    method2Btn: 'Löschantrag senden — info@gabba.bond',
    whatDeletedTitle: 'Welche Daten werden endgültig aus der EU-Cloud (eur3) entfernt?',
    whatDeletedItems: [
      'Eltern- und Großeltern-Kontodatensätze (users/{uid}) sowie das gesamte Familiendokument (families/{familyId}).',
      'Alle Kinderprofile (children/{childId}), E.164-Rufnummern-Whitelists, Stundenpläne, Hausaufgaben, Spielzeitkontingente und Geofence-Zonen.',
      'Sämtliche Double-Parent-Handshake-Freundschaften (friendships), Kindernachrichten sowie Schulverknüpfungen (schoolLink/config & schoolSession/live).',
      'Alle geteilten Familienfotos (<= 250 KB image/webp) im eur3 Cloud Storage sowie das isolierte Offline-Entsperrgeheimnis (secrets/offlineUnlock).',
    ],
    irreversibleDesc:
      'Die Löschung ist endgültig und nicht wiederherstellbar. Gesetzliche Aufbewahrungspflichten betreffen ausschließlich steuerrechtliche Rechnungsbelege (8 Jahre), welche keinerlei Kinder- oder Standortdaten enthalten.',
  },
  en: {
    badge: 'GDPR Art. 17 & Google Play Families — Account & Child Data Deletion',
    irreversibleBadge: '72-Hour EU (eur3) Purge SLA',
    title: 'Permanent Deletion of JUNEAR Account & Child Profiles',
    subtitle:
      'Legal guardians (Co-Parents) may request the permanent, irreversible deletion of their JUNEAR family account, all child profiles, shared WebP family photos, and all associated EU (eur3) cloud records at any time without stating a reason.',
    metaTitle: 'JUNEAR Account & Child Data Deletion (GDPR Art. 17) | gabba',
    metaDescription:
      'Official GDPR Article 17 account and child data deletion procedure for the JUNEAR (bond.gabba.junear) safe child phone ecosystem.',
    stepBeforeDeleteNote:
      'Important Anti-Brick step prior to deletion: if the child’s Android phone is enrolled in Device Owner MDM mode, trigger "Remote MDM Release (REMOTE_RELEASE)" in the Parent PWA first (or enter the 8-digit Offline Master Unlock Code via 5 taps on the Kiosk Shield) so the device cleanly exits management before wiping cloud records.',
    method1Title: 'Method 1: Self-Service Deletion Inside JUNEAR Parent PWA',
    method1Desc:
      'Signed-in Co-Parents can un-enroll the child device and purge all family records directly from the Parent Console:',
    method1Steps: [
      'Open the JUNEAR Parent PWA and click "Remote MDM Release (REMOTE_RELEASE)" in the Anti-Brick panel so the child phone immediately clears all DevicePolicyManager restrictions.',
      'Navigate to Family Settings -> Privacy & GDPR and select "Permanently Delete Child Profile & Family Account".',
      'Confirm deletion: all eur3 Firestore documents and Cloud Storage WebP photos are purged immediately.',
    ],
    method2Title: 'Method 2: Direct DPO Email Request (No App Required)',
    method2Desc:
      'If you no longer have access to the app, send an email from your registered parent address to info@gabba.bond. We execute the complete cascade purge within 72 hours (and always within the statutory 30-day GDPR window) and send written confirmation.',
    method2Btn: 'Send Deletion Request — info@gabba.bond',
    whatDeletedTitle: 'What Data Is Permanently Purged from EU (eur3) Infrastructure?',
    whatDeletedItems: [
      'Co-Parent and Extended Family user records (users/{uid}) and the root family document (families/{familyId}).',
      'All child profiles (children/{childId}), E.164 contact whitelists, school timetables, tasks, Gaming HUB quotas, and safe-zone geofences.',
      'All Double-Parent Handshake friendships (friendships), peer chat messages, and classroom links (schoolLink/config & schoolSession/live).',
      'Every shared family photo (<= 250 KB image/webp) in eur3 Cloud Storage plus the isolated offline unlock secret (secrets/offlineUnlock).',
    ],
    irreversibleDesc:
      'Deletion is permanent and irreversible. Statutory retention applies strictly to accounting invoices (8 years under Hungarian/EU tax law), which never contain child telemetry, photos, or location data.',
  },
};

export const JUNEAR_PRIVACY_CONTENT: Record<JunearLegalLang, JunearLegalDocumentContent> = {
  hu: {
    metaTitle: 'JUNEAR Adatvédelmi Tájékoztató (GDPR 8., 13. és 14. cikk) | gabba',
    metaDescription:
      'Hivatalos GDPR 8. cikk szerinti gyermek-adatvédelmi tájékoztató a JUNEAR (bond.gabba.junear) biztonságos európai gyermektelefon ökoszisztémához: eur3 adattárolás, 0% AD_ID és szigorú tanári adatvédelmi fal.',
    breadcrumbHome: 'gabba',
    breadcrumbJunear: 'JUNEAR',
    breadcrumbCurrent: 'Adatvédelmi Tájékoztató',
    badges: [
      'GDPR 8., 13. és 14. cikk — Gyermekvédelmi Adatkezelés',
      '100% EU Adattárolás (eur3)',
      '0% AD_ID & Google Play Families Megfelelés',
    ],
    title: 'JUNEAR Adatvédelmi Tájékoztató és GDPR 8. cikk Szülői Hozzájárulási Keretrendszer',
    subtitle:
      'Jelen Adatvédelmi Tájékoztató részletesen és közérthetően rögzíti, hogyan kezeli és védi Bányai Gábor adatkezelő a 6–14 éves gyermekek, a Társszülők, a Nagyszülők és a Pedagógusok személyes adatait a JUNEAR (bond.gabba.junear) ökoszisztémában, kizárólag az Európai Unió területén (eur3).',
    effectiveDateLabel: 'Hatálybalépés napja:',
    effectiveDateValue: '2026. november 15.',
    versionLabel: 'Szabályzat verziója:',
    versionValue: '1.0',
    langSwitchLabel: 'Nyelv:',
    tocTitle: 'Tartalomjegyzék — Adatvédelmi Tájékoztató',
    operatorCard: {
      heading: 'Adatkezelő és EU Adatvédelmi Kapcsolattartó Hivatalos Adatai',
      nameLabel: 'Üzemeltető / Adatkezelő',
      nameValue: JUNEAR_OPERATOR_METADATA.operatorName,
      addressLabel: 'Bejegyzett székhely',
      addressValue: JUNEAR_OPERATOR_METADATA.registeredAddress,
      emailLabel: 'Adatvédelmi / DPO kapcsolat',
      emailValue: JUNEAR_OPERATOR_METADATA.contactEmail,
      versionFieldLabel: 'Szabályzat verzió / EU régió',
      versionFieldValue: 'v1.0 · Firebase EU multi-régió (eur3 / europe-west)',
      scopeLabel: 'Tárgyi hatály',
      scopeValue:
        'JUNEAR Android Gyermek Kioszk & MDM App (bond.gabba.junear), Szülői/Nagyszülői PWA, Tanári Fókusz Konzol PWA és gabba.bond/junear',
    },
    highlightsTitle: 'Négy Alapvető JUNEAR Gyermekvédelmi Garancia',
    highlights: [
      {
        title: '100% EU (eur3) Adatrezidencia',
        desc: 'Minden adatbázis- és tárhelyművelet kizárólag az Európai Unió eur3 (europe-west) régiójában fut, élesen elkülönített junear-prod és junear-dev környezettel.',
      },
      {
        title: '0% AD_ID és Hirdetésmentesség',
        desc: 'Az AndroidManifest.xml fizikailag eltávolítja az AD_ID jogosultságot (tools:node="remove"). Nincs hirdetés, viselkedésprofilozás vagy adatértékesítés.',
      },
      {
        title: 'Helyi-Elsődleges Kamera (<= 250 KB)',
        desc: 'Nincs automatikus felhőszinkron: a gyermek fotói a készüléken maradnak, és csak a „Küldés a családnak” gomb megnyomásakor töltődnek fel <= 250 KB WebP formátumban.',
      },
      {
        title: 'Szigorú Tanári GDPR Adatvédelmi Fal',
        desc: 'A pedagógusok 0% hozzáféréssel rendelkeznek a GPS helyadatokhoz, fotókhoz, névjegyekhez, hívásnaplókhoz és családi/baráti chatekhez.',
      },
    ],
    sections: [
      {
        id: 'gdpr-art8-parental-consent',
        number: '1',
        title: 'GDPR 8. cikk szerinti Ellenőrzött Szülői Hozzájárulás (Aktiválási Kapu)',
        iconKey: 'consent',
        intro:
          'Mivel a JUNEAR kifejezetten 6 és 14 év közötti gyermekek biztonságos digitális önállóságát szolgálja, egyetlen gyermekprofil vagy eszköz sem aktiválható a szülői felügyeleti jog gyakorlójának előzetes, kifejezett nyilatkozata nélkül.',
        bullets: [
          {
            label: 'Alapértelmezetten be nem jelölt hozzájárulási kapu:',
            text: 'Mind az Android alkalmazásban (GdprOnboardingScreen), mind a Szülői PWA-ban (GdprConsentGate) a továbblépés műszakilag blokkolt, amíg a szülő saját kezűleg be nem jelöli a GDPR 8. cikk szerinti szülői felügyeleti jogról szóló nyilatkozatot.',
          },
          {
            label: 'Független, nyelvhelyes jogi hivatkozások:',
            text: 'A hozzájárulási képernyőn az ÁSZF (/junear/terms?lang=hu|de|en), az Adatvédelmi Tájékoztató (/junear/privacy?lang=hu|de|en) és a Működési Szabályzat (/junear/operations?lang=hu|de|en) önálló külső lapon nyitható meg anélkül, hogy a jelölőnégyzetet automatikusan kipipálná.',
          },
          {
            label: 'Auditált hozzájárulási naplómezők:',
            text: 'A rendszer kizárólag a jogszerűség igazolásához szükséges 5 mezőt rögzíti: legalAccepted: true, parentalAuthorityDeclared: true, legalAcceptedAt (ISO-8601 UTC időbélyeg), legalPolicyVersion: "1.0", valamint legalAcceptedLang ("hu" | "de" | "en").',
          },
        ],
      },
      {
        id: 'eu-data-residency-and-zero-adid',
        number: '2',
        title: 'Kizárólagos Európai Uniós Adattárolás (eur3) és Google Play Families Megfelelés',
        iconKey: 'residency',
        paragraphs: [
          'A JUNEAR teljes szerveroldali infrastruktúrája (Cloud Firestore, Firebase Cloud Storage és hitelesítési végpontok) az Európai Unión belül, a Google Cloud eur3 (europe-west) adatközpontjaiban üzemel. A fejlesztői (junear-dev) és az éles (junear-prod) környezet kriptográfiailag és projekt-szinten teljesen izolált.',
          'A Google Play Családok (Families) irányelveinek megfelelően a JUNEAR alkalmazásból a com.google.android.gms.permission.AD_ID jogosultság fordítási szinten eltávolításra került. Nem alkalmazunk harmadik féltől származó reklám-SDK-t, analitikai nyomkövetőt, ujjlenyomat-képzést vagy gyermekprofilozást.',
        ],
      },
      {
        id: 'data-minimization-inventory',
        number: '3',
        title: 'Adatminimalizálás és a Kezelt Személyes Adatok Tételes Köre',
        iconKey: 'inventory',
        intro:
          'A GDPR 5. cikk (1) bekezdés c) pontja szerinti adattakarékosság elve alapján kizárólag a gyermekvédelmi funkciók működéséhez elengedhetetlen adatokat kezeljük:',
        table: {
          headers: ['Adatkategória', 'Kezelt mezők és műszaki korlátok', 'Jogalap (GDPR 6. és 8. cikk)'],
          rows: [
            [
              'Szülői / Felnőtt fiókadatok',
              'UID, e-mail cím, szerepkör (coParentUids, familyMemberUids, teacherUids), választott nyelv (hu/de/en), GDPR 8. cikk hozzájárulási időbélyeg.',
              'Szerződés teljesítése — GDPR 6. cikk (1) b)',
            ],
            [
              'Gyermekprofil és Olvasási mód',
              'Keresztnév/becenév, életkori sáv (AGE_6_7 .. AGE_12_14), ettől független olvasási mód (SYMBOLS_ONLY, EARLY_READER_CAPS, STANDARD_TEXT), választott színtéma. A Noémi magyar női TTS felolvasás helyben a készüléken fut.',
              'Szülői hozzájárulás — GDPR 6. cikk (1) a) és 8. cikk',
            ],
            [
              'E.164 Névjegylista (Whitelist)',
              'Szülő által jóváhagyott +36 / +43 / +49 telefonszámok (határ menti Sopron +43650/+43670 védelemmel). Ismeretlen hívók csendes szűrése a készüléken történik.',
              'Szülői hozzájárulás & gyermek védelme — GDPR 8. cikk',
            ],
            [
              'Helyi Kamera & Családi Fotófal',
              'A fényképek alapértelmezetten LOCAL_ONLY státuszban a telefonon maradnak. Csak a gyermek kifejezett „Küldés a családnak” érintésére töltődik fel <= 250 KB image/webp kép.',
              'Kifejezett érintetti/szülői hozzájárulás — GDPR 8. cikk',
            ],
            [
              'Double-Parent Handshake Chat',
              'Baráti üzenetváltás kizárólag mindkét család Társszülőjének jóváhagyása (approvedByParentA && approvedByParentB) után; URL-ek és telefonszámok automatikus szűrésével.',
              'Kettős szülői hozzájárulás — GDPR 8. cikk',
            ],
            [
              'Geofence, SOS & Akkumulátor védelem',
              'Otthon/Iskola biztonsági zóna állapot, 3 másodperces SOS riasztás és <= 15% túlélő mód telemetria — kizárólag a Társszülők számára olvasható.',
              'Létfontosságú gyermekbiztonsági érdek & hozzájárulás',
            ],
          ],
        },
      },
      {
        id: 'role-isolation-and-teacher-privacy-wall',
        number: '4',
        title: 'Szerepkör-Izoláció és a Szigorú Tanári GDPR Adatvédelmi Fal',
        iconKey: 'teacherWall',
        isWarningBox: true,
        intro:
          'A JUNEAR biztonsági architektúrája (firebase/firestore.rules és storage.rules) kriptográfiai szabályokkal választja szét a Társszülők, a Nagyszülők és a Pedagógusok hozzáférési körét:',
        table: {
          headers: ['Felnőtt szerepkör', 'Engedélyezett műveletek', 'Kriptográfiailag tiltott (PERMISSION_DENIED) adatkörök'],
          rows: [
            [
              'Társszülők (coParentUids — 2+ egyenrangú admin)',
              'Teljes felügyelet: E.164 whitelist, Double-Parent Handshake, feladatok jóváhagyása, 1-érintéses Szünidő/Betegnap felülbírálat, Geofence, Anti-Brick feloldás.',
              'Más családok adataihoz nincs hozzáférés.',
            ],
            [
              'Tágabb Család / Nagyszülők (familyMemberUids)',
              'Csak olvasható Családi Fotófal (<= 250 KB WebP) és előre jóváhagyott gyorstárcsázó hívás/üzenet.',
              '0% hozzáférés MDM szabályokhoz, GPS helyadatokhoz, baráti chatekhez és az offline feloldó titokhoz (secrets/offlineUnlock).',
            ],
            [
              'Osztályfőnök / Pedagógus (teacherUids — classCode)',
              'Kizárólag az allowedSchoolWindow tanítási időablakon belül (és ha vacationOrSickMode == false): 5 mezős schoolSession/live írása (Tanórai Fókusz Zár + 45 perces oktató app feloldás).',
              'SZIGORÚ 0% HOZZÁFÉRÉS: GPS/helyadatok, Családi Fotók (!isTeacherRole), névjegyek/telefonszámok, hívásnapló, baráti/családi chatek, otthoni órarend és offline feloldókód.',
            ],
          ],
        },
      },
      {
        id: 'camera-and-peer-chat-safeguards',
        number: '5',
        title: 'Kamera Adatvédelem és Double-Parent Handshake Üzenetküldés',
        iconKey: 'cameraChat',
        bullets: [
          {
            label: 'Zéró automatikus fotófeltöltés:',
            text: 'A JUNEAR kamera modul soha nem szinkronizál háttérben fényképeket a felhőbe. A gyermek által készített képek helyi tárhely-korláttal a készüléken maradnak. Amikor a gyermek tudatosan megérinti a „Küldés a családnak” gombot, a kép helyben <= 250 KB méretű WebP formátumba tömörül, és kizárólag a család tagjai számára válik láthatóvá.',
          },
          {
            label: 'Kettős szülői kézfogás (Double-Parent Handshake):',
            text: 'Gyermekek közötti baráti kapcsolat nem jöhet létre egyoldalúan: mindkét család Társszülőjének kifejezett digitális jóváhagyása szükséges. A csevegőmotor blokkolja a webes linkeket (URL/TLD) és a telefonszámokat, a 6–7 éves (vagy SYMBOLS_ONLY) korosztály számára pedig kizárólag hangüzenetet és egyedi vektormatricákat engedélyez.',
          },
        ],
      },
      {
        id: 'data-retention-schedule',
        number: '6',
        title: 'Adatmegőrzési Időtartamok',
        iconKey: 'retention',
        bullets: [
          {
            label: 'Aktív családi és gyermekprofil adatok:',
            text: 'A szülői szerződés fennállásáig, illetve a Társszülő általi törlési kérelemig (GDPR 17. cikk) őrizzük meg az eur3 régióban.',
          },
          {
            label: 'Megosztott családi fotók és tanórai munkamenetek:',
            text: 'A megosztott fotók bármikor egyenként törölhetők a Szülői PWA-ból; a schoolSession/live tanórai állapotdokumentum minden módosításkor felülíródik (nem épít megfigyelési naplót).',
          },
          {
            label: 'Számviteli bizonylatok:',
            text: 'Fizetős előfizetés esetén a számlázási bizonylatokat a 2000. évi C. törvény 169. § (2) bekezdése alapján 8 évig őrizzük meg, gyermekadatoktól teljesen elkülönítve.',
          },
        ],
      },
      {
        id: 'parental-rights-and-authorities',
        number: '7',
        title: 'Szülői és Érintetti Jogok, Felügyeleti Hatóságok (NAIH / DSB / BfDI)',
        iconKey: 'rights',
        paragraphs: [
          'A szülői felügyeleti jog gyakorlóját (és életkorának megfelelően a gyermeket) megilleti a hozzáféréshez (GDPR 15. cikk), a helyesbítéshez (16. cikk), a végleges törléshez / „elfeledtetéshez” (17. cikk — elérhető a /junear/delete-account oldalon), az adatkezelés korlátozásához (18. cikk), az adathordozhatósághoz (20. cikk), valamint a hozzájárulás bármikori visszavonásához (7. cikk (3) bek.) való jog.',
          'Minden megkeresést az info@gabba.bond címen fogadunk és érdemben megválaszolunk. Jogorvoslattal élhet a Nemzeti Adatvédelmi és Információszabadság Hatóságnál (NAIH — 1055 Budapest, Falk Miksa utca 9–11., ugyfelszolgalat@naih.hu), Ausztriában az Österreichische Datenschutzbehörde (DSB — dsb@dsb.gv.at), Németországban pedig az illetékes tartományi adatvédelmi hatóság vagy a BfDI előtt.',
        ],
      },
    ],
    ctaCard: {
      badge: 'EU GDPR 8. cikk Gyermekvédelmi Kapcsolat',
      title: 'Kérdése van gyermeke adatainak védelmével kapcsolatban?',
      desc: 'Írjon közvetlenül az adatkezelőnek az info@gabba.bond címre — magyar, német vagy angol nyelven készséggel válaszolunk.',
      emailBtn: 'Írás az info@gabba.bond címre',
      backToJunearBtn: 'Vissza a JUNEAR oldalra',
      setupGuideBtn: 'Beállítási útmutató megnyitása',
    },
  },
  de: {
    metaTitle: 'JUNEAR Datenschutzerklärung (DSGVO Art. 8, 13 & 14) | gabba',
    metaDescription:
      'Offizielle DSGVO Art. 8 Kinder-Datenschutzerklärung für das sichere europäische Kindertelefon-Ökosystem JUNEAR (bond.gabba.junear): 100% EU-Datenhaltung (eur3), 0% AD_ID & strikte Lehrer-Datenschutzmauer.',
    breadcrumbHome: 'gabba',
    breadcrumbJunear: 'JUNEAR',
    breadcrumbCurrent: 'Datenschutzerklärung',
    badges: [
      'DSGVO Art. 8, 13 & 14 — Kinderschutz-Datenschutz',
      '100% EU-Speicherung (eur3)',
      '0% AD_ID & Google Play Families Konform',
    ],
    title: 'JUNEAR Datenschutzerklärung & DSGVO Art. 8 Eltern-Einwilligungsrahmen',
    subtitle:
      'Diese Datenschutzerklärung erläutert transparent, wie der Verantwortliche Bányai Gábor personenbezogene Daten von Kindern (6–14 Jahre), Eltern (Co-Parents), Großeltern und Lehrkräften innerhalb des JUNEAR-Ökosystems (bond.gabba.junear) ausschließlich in der Europäischen Union (eur3) verarbeitet und schützt.',
    effectiveDateLabel: 'Gültig ab:',
    effectiveDateValue: '15. November 2026',
    versionLabel: 'Richtlinienversion:',
    versionValue: '1.0',
    langSwitchLabel: 'Sprache:',
    tocTitle: 'Inhaltsverzeichnis — Datenschutzerklärung',
    operatorCard: {
      heading: 'Verantwortlicher & EU-Datenschutzkontakt (DSGVO Art. 13)',
      nameLabel: 'Betreiber / Verantwortlicher',
      nameValue: JUNEAR_OPERATOR_METADATA.operatorName,
      addressLabel: 'Eingetragene Anschrift',
      addressValue: JUNEAR_OPERATOR_METADATA.registeredAddress,
      emailLabel: 'Datenschutz / DPO-Kontakt',
      emailValue: JUNEAR_OPERATOR_METADATA.contactEmail,
      versionFieldLabel: 'Version / EU-Cloud-Region',
      versionFieldValue: 'v1.0 · Firebase EU Multi-Region (eur3 / europe-west)',
      scopeLabel: 'Geltungsbereich',
      scopeValue:
        'JUNEAR Android Kinder-Kiosk & MDM App (bond.gabba.junear), Eltern-/Großeltern-PWA, Lehrer-Fokuskonsole PWA & gabba.bond/junear',
    },
    highlightsTitle: 'Vier Zentrale JUNEAR-Kinderschutzgarantien',
    highlights: [
      {
        title: '100% EU-Datenhaltung (eur3)',
        desc: 'Sämtliche Datenbanken und Medienspeicher laufen ausschließlich in der EU-Region eur3 (europe-west) mit strikter Trennung zwischen junear-prod und junear-dev.',
      },
      {
        title: '0% AD_ID & Werbefreiheit',
        desc: 'Die Berechtigung AD_ID ist im AndroidManifest.xml technisch entfernt (tools:node="remove"). Keine Werbung, kein Tracking, kein Profiling.',
      },
      {
        title: 'Local-First-Kamera (<= 250 KB)',
        desc: 'Kein automatischer Cloud-Upload: Fotos bleiben lokal auf dem Kindergerät und werden nur nach aktivem Tippen auf „An Familie senden“ als <= 250 KB WebP geteilt.',
      },
      {
        title: 'Strikte Lehrer-DSGVO-Mauer',
        desc: 'Lehrkräfte haben technisch 0% Zugriff auf GPS-Standorte, Familienfotos, Rufnummern, Anruflisten oder Familien-/Freunde-Chats.',
      },
    ],
    sections: [
      {
        id: 'gdpr-art8-parental-consent',
        number: '1',
        title: 'Verifizierte Elterliche Einwilligung nach Art. 8 DSGVO (Aktivierungsschranke)',
        iconKey: 'consent',
        intro:
          'Da JUNEAR speziell für Kinder im Alter von 6 bis 14 Jahren konzipiert ist, kann kein Kinderprofil und kein Endgerät ohne vorherige ausdrückliche Erklärung der elterlichen Sorgeberechtigung aktiviert werden.',
        bullets: [
          {
            label: 'Standardmäßig deaktiviertes Kontrollkästchen:',
            text: 'Sowohl in der Android-App (GdprOnboardingScreen) als auch in der Eltern-PWA (GdprConsentGate) bleibt die Aktivierung gesperrt, bis der Elternteil die Sorgeberechtigung nach Art. 8 DSGVO aktiv bestätigt.',
          },
          {
            label: 'Drei unabhängige, sprachbewusste Rechtslinks:',
            text: 'AGB (/junear/terms?lang=hu|de|en), Datenschutzerklärung (/junear/privacy?lang=hu|de|en) und Betriebsrichtlinie (/junear/operations?lang=hu|de|en) öffnen sich separat in einem neuen Tab, ohne das Einwilligungsfeld umzuschalten.',
          },
          {
            label: 'Nachweispflichtige Einwilligungsfelder:',
            text: 'Gespeichert werden exakt: legalAccepted: true, parentalAuthorityDeclared: true, legalAcceptedAt (ISO-8601 UTC), legalPolicyVersion: "1.0" sowie legalAcceptedLang ("hu" | "de" | "en").',
          },
        ],
      },
      {
        id: 'eu-data-residency-and-zero-adid',
        number: '2',
        title: 'Ausschließliche EU-Datenhaltung (eur3) & Google Play Families Richtlinie',
        iconKey: 'residency',
        paragraphs: [
          'Alle Cloud-Dienste von JUNEAR (Cloud Firestore und Cloud Storage) werden ausschließlich innerhalb der Europäischen Union in der Google-Cloud-Region eur3 (europe-west) betrieben. Entwicklungs- (junear-dev) und Produktionsumgebung (junear-prod) sind vollständig voneinander isoliert.',
          'Gemäß der Google Play Families Richtlinie entfernt JUNEAR die Werbe-ID (com.google.android.gms.permission.AD_ID) bereits beim Build-Prozess. Es werden keinerlei Werbe-SDKs, Verhaltensanalysen oder Datenbroker eingesetzt.',
        ],
      },
      {
        id: 'data-minimization-inventory',
        number: '3',
        title: 'Datenminimierung & Übersicht der Verarbeiteten Datenkategorien',
        iconKey: 'inventory',
        intro:
          'Nach dem Grundsatz der Datenminimierung (Art. 5 Abs. 1 lit. c DSGVO) erhebt JUNEAR ausschließlich Daten, die für den Schutz des Kindes technisch erforderlich sind:',
        table: {
          headers: ['Datenkategorie', 'Felder & Technische Schutzgrenzen', 'Rechtsgrundlage (Art. 6 & 8 DSGVO)'],
          rows: [
            [
              'Eltern- & Erwachsenenkonten',
              'UID, E-Mail-Adresse, Rolle (coParentUids, familyMemberUids, teacherUids), Sprachwahl (hu/de/en), DSGVO-Art.-8-Zeitstempel.',
              'Vertragserfüllung — Art. 6 Abs. 1 lit. b DSGVO',
            ],
            [
              'Kinderprofil & Lesemodus',
              'Vorname/Rufname, Altersstufe (AGE_6_7 .. AGE_12_14) entkoppelt vom Lesemodus (SYMBOLS_ONLY, EARLY_READER_CAPS, STANDARD_TEXT), Farbthema. Sprachausgabe (inkl. ungarischer Stimme Noémi / Deutsch / Englisch) läuft lokal auf dem Gerät.',
              'Elterliche Einwilligung — Art. 6 Abs. 1 lit. a & Art. 8 DSGVO',
            ],
            [
              'E.164 Rufnummern-Whitelist',
              'Freigegebene +36 / +43 / +49 Kontakte (inkl. Grenzschutz Sopron/Burgenland für +43650/+43670). Unbekannte Nummern werden lokal lautlos abgewiesen.',
              'Elterliche Einwilligung & Kinderschutz — Art. 8 DSGVO',
            ],
            [
              'Lokale Kamera & Familien-Fotowand',
              'Fotos verbleiben standardmäßig LOCAL_ONLY auf dem Telefon. Nur bei aktivem Tippen des Kindes auf „An Familie senden“ erfolgt ein Upload als <= 250 KB image/webp.',
              'Ausdrückliche Einwilligung — Art. 8 DSGVO',
            ],
            [
              'Double-Parent Handshake Chat',
              'Kinder-Chat nur nach Freigabe durch Co-Parents beider Familien (approvedByParentA && approvedByParentB); automatische Sperre für URLs und Telefonnummern.',
              'Doppelte Elterneinwilligung — Art. 8 DSGVO',
            ],
            [
              'Geofence, 3-Sek.-SOS & Akku-Notmodus',
              'Sicherheitszonen, 3-Sekunden-Halte-SOS und <= 15% Akku-Überlebensmodus — ausschließlich für Co-Parents einsehbar.',
              'Kindersicherheit & elterliche Einwilligung',
            ],
          ],
        },
      },
      {
        id: 'role-isolation-and-teacher-privacy-wall',
        number: '4',
        title: 'Rollenisolation & Strikte DSGVO-Datenschutzmauer für Lehrkräfte',
        iconKey: 'teacherWall',
        isWarningBox: true,
        intro:
          'Durch firebase/firestore.rules und storage.rules trennt JUNEAR die Zugriffsrechte zwischen Eltern, Großeltern und Schule kryptografisch:',
        table: {
          headers: ['Rolle', 'Erlaubte Zugriffe', 'Technisch gesperrte Bereiche (PERMISSION_DENIED)'],
          rows: [
            [
              'Co-Parents (coParentUids — 2+ gleichberechtigte Eltern)',
              'Volle Hoheit über Kontakte, Double-Parent Handshake, Aufgaben, 1-Tap Ferien-/Krankmodus, Geofence & Anti-Brick-Freigabe.',
              'Kein Zugriff auf fremde Familien.',
            ],
            [
              'Erweiterte Familie / Großeltern (familyMemberUids)',
              'Lesezugriff auf die geteilte Familien-Fotowand (<= 250 KB WebP) sowie freigegebene Kurzwahl-Anrufe.',
              '0% Zugriff auf MDM-Regeln, GPS-Standort, Freunde-Chats und Offline-Entsperrgeheimnis (secrets/offlineUnlock).',
            ],
            [
              'Lehrkräfte (teacherUids — gekoppelt per classCode)',
              'Ausschließlich innerhalb von allowedSchoolWindow (und nur wenn vacationOrSickMode == false): Schreiben des 5-Felder-Dokuments schoolSession/live (Fokussperre + 45-Min.-Lern-Apps).',
              'STRIKT 0% ZUGRIFF: GPS-Standort, Familienfotos (!isTeacherRole), Telefonbuch/Whitelist, Anruflisten, Chats, Heim-Stundenpläne & Offline-Mastercode.',
            ],
          ],
        },
      },
      {
        id: 'camera-and-peer-chat-safeguards',
        number: '5',
        title: 'Kameraschutz & Double-Parent-Handshake-Kommunikation',
        iconKey: 'cameraChat',
        bullets: [
          {
            label: 'Kein automatischer Foto-Upload:',
            text: 'Aufnahmen des Kindes werden niemals automatisch in die Cloud geladen. Erst wenn das Kind bewusst „An Familie senden“ wählt, wird das Bild lokal auf maximal 250 KB im WebP-Format komprimiert und ausschließlich für Co-Parents und freigeschaltete Großeltern bereitgestellt.',
          },
          {
            label: 'Doppelte Elternfreigabe im Kinder-Chat:',
            text: 'Kontakte zwischen Gleichaltrigen setzen zwingend die Bestätigung beider Elternhäuser voraus. Links (URLs/TLDs) und 7+-stellige Ziffernfolgen werden gefiltert; für 6–7-Jährige (bzw. SYMBOLS_ONLY) sind nur Sprachnachrichten und Vektor-Sticker aktiviert.',
          },
        ],
      },
      {
        id: 'data-retention-schedule',
        number: '6',
        title: 'Speicherdauer & Löschfristen',
        iconKey: 'retention',
        bullets: [
          {
            label: 'Familien- und Kinderprofildaten:',
            text: 'Speicherung in eur3 nur für die Dauer der aktiven Nutzung bzw. bis zum Löschauftrag eines Co-Parents gemäß Art. 17 DSGVO.',
          },
          {
            label: 'Geteilte Fotos & Unterrichtssitzungen:',
            text: 'Geteilte WebP-Fotos können jederzeit einzeln entfernt werden; schoolSession/live überschreibt lediglich 5 Statusfelder ohne Verhaltenshistorie.',
          },
          {
            label: 'Rechnungsunterlagen:',
            text: 'Gesetzliche steuerrechtliche Aufbewahrung von 8 Jahren ausschließlich für Abrechnungsbelege ohne jegliche Kinderprofildaten.',
          },
        ],
      },
      {
        id: 'parental-rights-and-authorities',
        number: '7',
        title: 'Betroffenen- & Elternrechte sowie Aufsichtsbehörden (DSB / BfDI / NAIH)',
        iconKey: 'rights',
        paragraphs: [
          'Sorgeberechtigte Eltern haben jederzeit das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), unverzügliche Löschung (Art. 17 — abrufbar unter /junear/delete-account), Einschränkung (Art. 18), Datenübertragbarkeit (Art. 20) sowie Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO).',
          'Anfragen richten Sie bitte an info@gabba.bond. Zudem besteht ein Beschwerderecht bei den zuständigen EU-Datenschutzaufsichtsbehörden, insbesondere der NAIH (Ungarn, ugyfelszolgalat@naih.hu), der Österreichischen Datenschutzbehörde (DSB, dsb@dsb.gv.at) sowie den deutschen Landesdatenschutzbehörden bzw. dem BfDI.',
        ],
      },
    ],
    ctaCard: {
      badge: 'EU DSGVO Art. 8 Kinderschutzkontakt',
      title: 'Fragen zum Datenschutz Ihres Kindes oder Ihrer Schule?',
      desc: 'Schreiben Sie direkt an den Verantwortlichen unter info@gabba.bond — wir antworten persönlich auf Deutsch, Ungarisch oder Englisch.',
      emailBtn: 'E-Mail an info@gabba.bond',
      backToJunearBtn: 'Zurück zur JUNEAR-Seite',
      setupGuideBtn: 'Einrichtungsanleitung öffnen',
    },
  },
  en: {
    metaTitle: 'JUNEAR Privacy Notice (GDPR Art. 8, 13 & 14) | gabba',
    metaDescription:
      'Official GDPR Article 8 Child Privacy Notice for the JUNEAR (bond.gabba.junear) European safe child phone ecosystem: 100% EU data residency (eur3), zero AD_ID, and strict Teacher GDPR Privacy Wall.',
    breadcrumbHome: 'gabba',
    breadcrumbJunear: 'JUNEAR',
    breadcrumbCurrent: 'Privacy Notice',
    badges: [
      'GDPR Art. 8, 13 & 14 — Child Privacy Protection',
      '100% EU Data Residency (eur3)',
      '0% AD_ID & Google Play Families Compliant',
    ],
    title: 'JUNEAR Privacy Notice & GDPR Article 8 Parental Consent Framework',
    subtitle:
      'This Privacy Notice explains clearly and transparently how data controller Bányai Gábor processes and safeguards personal data of children aged 6–14, Co-Parents, Extended Family members, and Classroom Teachers across the JUNEAR (bond.gabba.junear) ecosystem exclusively inside the European Union (eur3).',
    effectiveDateLabel: 'Effective Date:',
    effectiveDateValue: 'November 15, 2026',
    versionLabel: 'Policy Version:',
    versionValue: '1.0',
    langSwitchLabel: 'Language:',
    tocTitle: 'Table of Contents — Privacy Notice',
    operatorCard: {
      heading: 'Official Operator & EU Data Controller Identification',
      nameLabel: 'Operator / Data Controller',
      nameValue: JUNEAR_OPERATOR_METADATA.operatorName,
      addressLabel: 'Registered EU Address',
      addressValue: JUNEAR_OPERATOR_METADATA.registeredAddress,
      emailLabel: 'Privacy / DPO Inquiries',
      emailValue: JUNEAR_OPERATOR_METADATA.contactEmail,
      versionFieldLabel: 'Policy Version / EU Region',
      versionFieldValue: 'v1.0 · Firebase EU Multi-Region (eur3 / europe-west)',
      scopeLabel: 'Ecosystem Scope',
      scopeValue:
        'JUNEAR Android Child Kiosk & MDM App (bond.gabba.junear), Co-Parent/Grandparent PWA, Classroom Teacher Focus Console PWA & gabba.bond/junear',
    },
    highlightsTitle: 'Four Core JUNEAR Child-Privacy Guarantees',
    highlights: [
      {
        title: '100% EU (eur3) Residency',
        desc: 'All Firestore databases and Storage buckets run exclusively in the European Union (eur3 / europe-west) across isolated junear-prod and junear-dev projects.',
      },
      {
        title: 'Zero AD_ID & Zero Profiling',
        desc: 'com.google.android.gms.permission.AD_ID is stripped in AndroidManifest.xml (tools:node="remove"). Zero ads, zero behavioral analytics, zero data brokers.',
      },
      {
        title: 'Local-First Camera (<= 250 KB)',
        desc: 'Zero auto-upload: child photos stay LOCAL_ONLY on the phone unless the child explicitly taps "Send to Family", compressing to <= 250 KB WebP.',
      },
      {
        title: 'Strict Teacher GDPR Wall',
        desc: 'Classroom teachers have cryptographically enforced 0% access to child GPS, family photos, phone whitelists, call logs, or peer/family chats.',
      },
    ],
    sections: [
      {
        id: 'gdpr-art8-parental-consent',
        number: '1',
        title: 'Verifiable Parental Consent Under GDPR Article 8 (Pre-Activation Gate)',
        iconKey: 'consent',
        intro:
          'Because JUNEAR is engineered for children aged 6 to 14, no child profile or device can be activated without prior, explicit declaration of parental responsibility by the legal guardian.',
        bullets: [
          {
            label: 'Unchecked-by-default activation gate:',
            text: 'Both Android (GdprOnboardingScreen) and the Co-Parent PWA (GdprConsentGate) block progression until the parent actively ticks the GDPR Article 8 Parental Responsibility declaration.',
          },
          {
            label: 'Three independent language-aware legal links:',
            text: 'Terms (/junear/terms?lang=hu|de|en), Privacy (/junear/privacy?lang=hu|de|en), and Operations (/junear/operations?lang=hu|de|en) open independently in a new tab without toggling the consent checkbox.',
          },
          {
            label: 'Persisted compliance audit fields:',
            text: 'Strictly five audit fields are recorded: legalAccepted: true, parentalAuthorityDeclared: true, legalAcceptedAt (ISO-8601 UTC), legalPolicyVersion: "1.0", and legalAcceptedLang ("hu" | "de" | "en").',
          },
        ],
      },
      {
        id: 'eu-data-residency-and-zero-adid',
        number: '2',
        title: '100% European Union Data Residency (eur3) & Google Play Families Compliance',
        iconKey: 'residency',
        paragraphs: [
          'Every JUNEAR serverless database and object storage bucket operates exclusively inside the European Union on Google Cloud eur3 (europe-west) infrastructure, strictly separating development (junear-dev) and production (junear-prod) environments.',
          'In full compliance with the Google Play Families Policy, JUNEAR explicitly strips com.google.android.gms.permission.AD_ID at manifest merge time. No third-party advertising networks, cross-app trackers, or behavioral profiling SDKs are permitted anywhere in the codebase.',
        ],
      },
      {
        id: 'data-minimization-inventory',
        number: '3',
        title: 'Data Minimization & Complete Inventory of Processed Data',
        iconKey: 'inventory',
        intro:
          'Under GDPR Article 5(1)(c) data minimization, JUNEAR processes strictly the minimum technical fields required to deliver child safety and multi-adult coordination:',
        table: {
          headers: ['Data Category', 'Fields & Technical Safeguards', 'GDPR Legal Basis (Arts. 6 & 8)'],
          rows: [
            [
              'Adult Role Accounts',
              'UID, email, role assignment (coParentUids, familyMemberUids, teacherUids), preferred language (hu/de/en), GDPR Art. 8 consent audit record.',
              'Contract performance — Art. 6(1)(b)',
            ],
            [
              'Child Profile & Literacy Mode',
              'First name/nickname, AgeTier (AGE_6_7 .. AGE_12_14) decoupled from LiteracyMode (SYMBOLS_ONLY, EARLY_READER_CAPS, STANDARD_TEXT), color theme. On-device TTS (including Hungarian female voice Noémi) executes locally.',
              'Verifiable parental consent — Art. 6(1)(a) & Art. 8',
            ],
            [
              'E.164 Contact Whitelist',
              'Parent-approved +36 / +43 / +49 numbers (with Sopron +43650/+43670 cross-border safeguard). Unknown callers are screened silently on-device.',
              'Parental consent & child safety — Art. 8',
            ],
            [
              'Local Camera & Family Photo Wall',
              'Photos stay strictly LOCAL_ONLY on-device by default. Only when the child taps "Send to Family" is an <= 250 KB image/webp uploaded.',
              'Explicit child action & parental consent — Art. 8',
            ],
            [
              'Double-Parent Handshake Chat',
              'Peer chat enabled strictly after Co-Parents from both families approve (approvedByParentA && approvedByParentB); URLs and 7+ digit phone numbers are blocked.',
              'Dual parental consent — Art. 8',
            ],
            [
              'Geofence, 3s SOS & Battery Survival',
              'Home/School safe-zone status, 3-second hold SOS alerts, and <= 15% Battery Survival state — readable strictly by coParentUids.',
              'Vital child-safety interest & parental consent',
            ],
          ],
        },
      },
      {
        id: 'role-isolation-and-teacher-privacy-wall',
        number: '4',
        title: 'Multi-Adult Role Isolation & Strict Classroom Teacher GDPR Privacy Wall',
        iconKey: 'teacherWall',
        isWarningBox: true,
        intro:
          'JUNEAR enforces cryptographic role boundaries in firebase/firestore.rules and storage.rules across Co-Parents, Extended Family, and Classroom Teachers:',
        table: {
          headers: ['Adult Role', 'Authorized Scope', 'Cryptographically Forbidden Scopes (PERMISSION_DENIED)'],
          rows: [
            [
              'Co-Parents (coParentUids — 2+ Equal Admins)',
              'Full read/write over E.164 whitelist, Double-Parent Handshake, homework rewards, 1-Tap Vacation/Sick-Day override, geofences & Anti-Brick unlock.',
              'Zero access to other families.',
            ],
            [
              'Extended Family / Grandparents (familyMemberUids)',
              'Read-only Family Photo Wall (<= 250 KB WebP) and approved whitelist calling.',
              'Zero access to MDM policies, GPS coordinates, peer chats, or secrets/offlineUnlock.',
            ],
            [
              'Classroom Teacher (teacherUids — via classCode)',
              'Strictly within allowedSchoolWindow when vacationOrSickMode == false: writes ONLY the narrow 5-field schoolSession/live doc (Focus Lock + 45-min educational app unlock).',
              'STRICT 0% ACCESS: GPS/location, sharedPhotos (!isTeacherRole), phone numbers/whitelist, call logs, peer/family chats, home schedules & offline unlock secret.',
            ],
          ],
        },
      },
      {
        id: 'camera-and-peer-chat-safeguards',
        number: '5',
        title: 'Local-First Camera & Double-Parent Handshake Messaging Safeguards',
        iconKey: 'cameraChat',
        bullets: [
          {
            label: 'Zero background photo sync:',
            text: 'The JUNEAR camera module never auto-uploads child photos. Unshared photos remain strictly LOCAL_ONLY under a local storage cap. Tapping "Send to Family" compresses the image on-device to <= 250 KB image/webp enforced by storage.rules.',
          },
          {
            label: 'Double-Parent Handshake peer messaging:',
            text: 'No child-to-child chat channel can exist until Co-Parents of both families approve the friendship. Outgoing messages are filtered to block web URLs/TLDs and phone numbers, while ages 6–7 (and SYMBOLS_ONLY mode) use safe voice notes and vector stickers only.',
          },
        ],
      },
      {
        id: 'data-retention-schedule',
        number: '6',
        title: 'Data Retention & Automated Minimization',
        iconKey: 'retention',
        bullets: [
          {
            label: 'Active family & child records:',
            text: 'Retained in eur3 only while the family account remains active or until a Co-Parent exercises erasure under GDPR Article 17.',
          },
          {
            label: 'Shared family photos & live classroom sessions:',
            text: 'Shared WebP photos can be deleted individually at any time; schoolSession/live overwrites strictly 5 live state fields without building a classroom surveillance log.',
          },
          {
            label: 'Statutory tax invoices:',
            text: 'Billing invoices are retained for 8 years under applicable EU/Hungarian accounting law and contain zero child profile or telemetry data.',
          },
        ],
      },
      {
        id: 'parental-rights-and-authorities',
        number: '7',
        title: 'Parental & Data Subject Rights and EU Supervisory Authorities',
        iconKey: 'rights',
        paragraphs: [
          'Legal guardians (and children, age-appropriately) hold the right of access (Art. 15), rectification (Art. 16), erasure / right to be forgotten (Art. 17 — available at /junear/delete-account), restriction (Art. 18), data portability (Art. 20), and withdrawal of consent at any time (Art. 7(3)).',
          'All requests are handled directly via info@gabba.bond. You also have the right to lodge a complaint with your national EU Data Protection Authority, including NAIH in Hungary (ugyfelszolgalat@naih.hu), DSB in Austria (dsb@dsb.gv.at), or BfDI / state authorities in Germany.',
        ],
      },
    ],
    ctaCard: {
      badge: 'EU GDPR Art. 8 Privacy Support',
      title: 'Questions about child privacy or school pilot compliance?',
      desc: 'Contact data controller Bányai Gábor directly at info@gabba.bond in Hungarian, German, or English.',
      emailBtn: 'Email info@gabba.bond',
      backToJunearBtn: 'Back to JUNEAR',
      setupGuideBtn: 'Open Setup Guide',
    },
  },
};

export const JUNEAR_TERMS_CONTENT: Record<JunearLegalLang, JunearLegalDocumentContent> = {
  hu: {
    metaTitle: 'JUNEAR Általános Szerződési Feltételek (ÁSZF) | gabba',
    metaDescription:
      'Hivatalos Általános Szerződési Feltételek (ÁSZF) a JUNEAR (bond.gabba.junear) gyermektelefon ökoszisztémához: licenccsomagok, szerepkörök, natív MDM és Kettős Anti-Brick garancia.',
    breadcrumbHome: 'gabba',
    breadcrumbJunear: 'JUNEAR',
    breadcrumbCurrent: 'Általános Szerződési Feltételek (ÁSZF)',
    badges: [
      'JUNEAR ÁSZF v1.0',
      'Családi & Iskolai Pilot Licencek',
      'Kötelező Kettős Anti-Brick Vésznyitó Garancia',
    ],
    title: 'JUNEAR Általános Szerződési Feltételek (ÁSZF)',
    subtitle:
      'Jelen ÁSZF szabályozza a Bányai Gábor által üzemeltetett JUNEAR (bond.gabba.junear) biztonságos gyermektelefon szoftverökoszisztéma igénybevételének feltételeit a Társszülők, a Tágabb Családtagok és az Iskolai Pedagógusok számára.',
    effectiveDateLabel: 'Hatálybalépés napja:',
    effectiveDateValue: '2026. november 15.',
    versionLabel: 'Dokumentum verziója:',
    versionValue: '1.0',
    langSwitchLabel: 'Nyelv:',
    tocTitle: 'Tartalomjegyzék — ÁSZF',
    operatorCard: {
      heading: 'Szolgáltató / Üzemeltető Hivatalos Adatai',
      nameLabel: 'Szolgáltató neve',
      nameValue: JUNEAR_OPERATOR_METADATA.operatorName,
      addressLabel: 'Székhely (Európai Unió)',
      addressValue: JUNEAR_OPERATOR_METADATA.registeredAddress,
      emailLabel: 'Ügyfélszolgálat & Jogi kapcsolat',
      emailValue: JUNEAR_OPERATOR_METADATA.contactEmail,
      versionFieldLabel: 'ÁSZF verzió / Alkalmazás azonosító',
      versionFieldValue: 'v1.0 · bond.gabba.junear (EU eur3)',
      scopeLabel: 'Szolgáltatási elemek',
      scopeValue:
        'JUNEAR Android Gyermek App, Szülői és Nagyszülői PWA, Tantermi Fókusz Konzol PWA és WebUSB/QR telepítő eszközök',
    },
    highlightsTitle: 'Az ÁSZF Legfontosabb Szülői és Intézményi Garanciái',
    highlights: [
      {
        title: 'Átlátható 6-féle Licencmodell',
        desc: 'Kipróbálási (trial), havi, éves, élettartam (lifetime), valamint vip_free és iskolai pilot (school_pilot) jogosultságok rejtett költségek nélkül.',
      },
      {
        title: '2+ Egyenrangú Társszülő',
        desc: 'Közös szülői felügyeletre tervezve: mindkét szülő teljes értékű adminisztrátor iOS, Android vagy asztali böngészőből.',
      },
      {
        title: '100% Szabványos Android MDM',
        desc: 'Hivatalos Android Enterprise DevicePolicyManager API-k — zéró AccessibilityService visszaélés vagy képernyő-lehallgatás.',
      },
      {
        title: 'Előfizetéstől Független Vésznyitó',
        desc: 'A Távoli feloldás és az Offline 8 jegyű mesterkód lejárt előfizetés vagy internetkapcsolat hiánya esetén is örökre ingyenes és működőképes marad.',
      },
    ],
    sections: [
      {
        id: 'service-scope-and-eligibility',
        number: '1',
        title: 'A Szolgáltatás Tárgya és Jogosultsági Feltételek',
        iconKey: 'scope',
        paragraphs: [
          'A JUNEAR egy 6–14 éves gyermekek számára fejlesztett védett Android kezdőképernyő (Bento Launcher), natív Device Owner MDM keretrendszer, E.164 hívásszűrő, valamint a hozzá kapcsolódó Szülői/Nagyszülői és Tanári webalkalmazás (PWA).',
          'Családi fiókot kizárólag 18. életévét betöltött, cselekvőképes szülő vagy törvényes gyám hozhat létre, aki a GDPR 8. cikk szerint büntetőjogi és polgári jogi felelőssége tudatában nyilatkozik szülői felügyeleti jogáról.',
        ],
      },
      {
        id: 'licensing-and-plan-types',
        number: '2',
        title: 'Előfizetési Csomagok (planType), Díjszabás és 14 Napos Elállási Jog',
        iconKey: 'plans',
        intro:
          'A JUNEAR jogosultsági motorja hat kanonikus csomagtípust (families/{familyId}.planType) támogat a családi és iskolai használathoz:',
        table: {
          headers: ['planType kulcs', 'Megnevezés', 'Jogosultsági kör és számlázási jelleg'],
          rows: [
            [
              'trial',
              'Ingyenes próbaidőszak',
              'Teljes funkcionalitású kipróbálás automatikus terhelés vagy bankkártya-kényszer nélkül.',
            ],
            [
              'monthly',
              'Havi családi előfizetés',
              'Rugalmas havi megújuló hozzáférés a család összes regisztrált gyermekprofiljához és Társszülőjéhez.',
            ],
            [
              'yearly',
              'Éves családi előfizetés',
              'Kedvezményes éves díjú teljes családi csomag (Társszülők + Nagyszülői Fotófal + Iskolai összekapcsolás).',
            ],
            [
              'lifetime',
              'Egyszeri díjas örökös licenc',
              'Egyszeri díjfizetéssel megváltott, időkorlát nélküli családi jogosultság a teljes 6–14 éves iskolai ciklusra.',
            ],
            [
              'vip_free',
              'Üzemeltetői díjmentes jogosultság',
              'Az üzemeltető által egyedileg biztosított, fizetési token nélküli teljes családi hozzáférés.',
            ],
            [
              'school_pilot',
              'Iskolai / Osztálytermi Pilot',
              'Oktatási intézmények és partnerosztályok számára biztosított díjmentes vagy intézményi pilot jogosultság.',
            ],
          ],
        },
        footerNote:
          'Fogyasztói elállási jog: az EU 2011/83/EU irányelve és a 45/2014. (II. 26.) Korm. rendelet alapján a fogyasztót a vásárlástól számított 14 napon belül indokolás nélküli elállási jog illeti meg (info@gabba.bond, illetve Google Play vásárlás esetén a Google Play előfizetés-kezelő felületén).',
      },
      {
        id: 'multi-adult-responsibilities',
        number: '3',
        title: 'Társszülők, Nagyszülők és Pedagógusok Felelősségi Köre',
        iconKey: 'roles',
        bullets: [
          {
            label: 'Társszülők (coParentUids):',
            text: 'Felelősek az E.164 engedélyezett hívószámok pontos megadásáért, a baráti kapcsolatok (Double-Parent Handshake) ellenőrzéséért, a Szünidő/Betegnap kapcsoló kezeléséért, valamint a 8 jegyű Offline feloldó mesterkód biztonságos megőrzéséért.',
          },
          {
            label: 'Tágabb Család / Nagyszülők (familyMemberUids):',
            text: 'Kizárólag a Társszülők meghívásával csatlakozhatnak; jogosultságuk a gyermek által megosztott fotók megtekintésére és a jóváhagyott családi kapcsolattartásra korlátozódik.',
          },
          {
            label: 'Pedagógusok (teacherUids):',
            text: 'Az osztálykódot (classCode, pl. SOPRON-3A) kizárólag oktatási célra, az intézményi házirenddel összhangban használhatják a megadott allowedSchoolWindow tanítási időszakban. Kötelesek tiszteletben tartani a szülői betegszabadság-felülbírálatot és a szülői alkalmazás-tiltólistát.',
          },
        ],
      },
      {
        id: 'native-mdm-and-provisioning-scope',
        number: '4',
        title: 'Natív Android Enterprise MDM Hatály és a 3 Telepítési Mód',
        iconKey: 'mdm',
        paragraphs: [
          'A JUNEAR nem alkalmaz visszaélésszerű kisegítő lehetőségeket (AccessibilityService) sem kattintásszimulációra, sem képernyőtartalom olvasására. A készülékvédelem kizárólag a hivatalos Android DevicePolicyManager keretrendszerre épül (JunearDeviceAdminReceiver: LockTask rögzítés, alkalmazás-elrejtés, Private DNS biztonságos keresés).',
          'A szülő három telepítési szint közül választhat: (A) Google Play Standard Launcher mód, (B) 6-érintéses gyári visszaállítású QR Device Owner telepítés új készülékre, vagy (C) Böngészős WebUSB telepítő (/junear/usb-setup) meglévő telefonra adatvesztés nélkül.',
        ],
      },
      {
        id: 'mandatory-dual-anti-brick-guarantee',
        number: '5',
        title: 'Kötelező Kettős Anti-Brick Vésznyitó Garancia (Készülék-Visszaállítási Jog)',
        iconKey: 'antiBrick',
        isWarningBox: true,
        intro:
          'Szerződéses gyermekbiztonsági alapelvünk, hogy a JUNEAR soha, semmilyen műszaki hiba, szerverleállás vagy lejárt előfizetés miatt nem teheti használhatatlanná („brickelheti”) a család tulajdonát képező telefont:',
        bullets: [
          {
            label: '1. útvonal — Távoli 1-kattintásos feloldás (REMOTE_RELEASE):',
            text: 'Bármely Társszülő a Szülői PWA-ból egyetlen gombnyomással kiadhatja a REMOTE_RELEASE parancsot, amely azonnal törli az összes korlátozást, visszaállítja az állapotsort és meghívja a clearDeviceOwnerApp() rendszerhívást.',
          },
          {
            label: '2. útvonal — 100% Offline 8-jegyű HMAC-SHA256 Mester Feloldókód:',
            text: 'Wi-Fi, mobilinternet és SIM-kártya nélkül is bármikor feloldható a készülék a Kioszk Pajzs ikon 5-szöri megérintésével és a Szülői PWA-ban megjelenő 8 jegyű napi HMAC-kód beírásával a beépített billentyűzeten.',
          },
        ],
      },
      {
        id: 'liability-and-governing-law',
        number: '6',
        title: 'Felelősségkorlátozás és Irányadó Jog',
        iconKey: 'law',
        paragraphs: [
          'A JUNEAR digitális támogató és védelmi szoftvereszköz, amely nem helyettesíti a személyes szülői vagy pedagógusi felügyeletet, és nem minősül hatósági segélyhívó szolgáltatásnak. Élet- vagy vagyonbiztonságot veszélyeztető vészhelyzetben mindig a 112-es egységes európai segélyhívó számot kell hívni (amelyet a JUNEAR hívásszűrője minden üzemmódban korlátozás nélkül átenged).',
          'Jelen ÁSZF-re Magyarország és az Európai Unió joga irányadó, a fogyasztó lakóhelye szerinti kötelező európai fogyasztóvédelmi szabályok sérelme nélkül.',
        ],
      },
    ],
    ctaCard: {
      badge: 'ÁSZF & Iskolai Pilot Tájékoztatás',
      title: 'Iskolai pilotot indítana vagy licenckérdése van?',
      desc: 'Vegye fel velünk a kapcsolatot az info@gabba.bond címen — segítünk a családi vagy tantermi bevezetésben.',
      emailBtn: 'Kapcsolat: info@gabba.bond',
      backToJunearBtn: 'Vissza a JUNEAR oldalra',
      setupGuideBtn: 'Telepítési útmutató megnyitása',
    },
  },
  de: {
    metaTitle: 'JUNEAR Allgemeine Geschäftsbedingungen (AGB) | gabba',
    metaDescription:
      'Offizielle Allgemeine Geschäftsbedingungen (AGB) für das sichere Kindertelefon-Ökosystem JUNEAR (bond.gabba.junear): Lizenzmodelle, Rollenpflichten, natives MDM & doppelte Anti-Brick-Garantie.',
    breadcrumbHome: 'gabba',
    breadcrumbJunear: 'JUNEAR',
    breadcrumbCurrent: 'Allgemeine Geschäftsbedingungen (AGB)',
    badges: [
      'JUNEAR AGB v1.0',
      'Familien- & Schul-Pilot-Lizenzen',
      'Verbindliche Dual-Anti-Brick-Garantie',
    ],
    title: 'JUNEAR Allgemeine Geschäftsbedingungen (AGB)',
    subtitle:
      'Diese AGB regeln die Nutzung des von Bányai Gábor betriebenen sicheren Kindertelefon-Ökosystems JUNEAR (bond.gabba.junear) durch sorgeberechtigte Eltern (Co-Parents), Großeltern und Lehrkräfte.',
    effectiveDateLabel: 'Gültig ab:',
    effectiveDateValue: '15. November 2026',
    versionLabel: 'Dokumentversion:',
    versionValue: '1.0',
    langSwitchLabel: 'Sprache:',
    tocTitle: 'Inhaltsverzeichnis — AGB',
    operatorCard: {
      heading: 'Anbieterkennzeichnung & Vertragspartner',
      nameLabel: 'Anbieter / Betreiber',
      nameValue: JUNEAR_OPERATOR_METADATA.operatorName,
      addressLabel: 'Anschrift (Europäische Union)',
      addressValue: JUNEAR_OPERATOR_METADATA.registeredAddress,
      emailLabel: 'Support & Rechtskontakt',
      emailValue: JUNEAR_OPERATOR_METADATA.contactEmail,
      versionFieldLabel: 'AGB-Version / Paket-ID',
      versionFieldValue: 'v1.0 · bond.gabba.junear (EU eur3)',
      scopeLabel: 'Leistungsumfang',
      scopeValue:
        'JUNEAR Android Kinder-App, Eltern-/Großeltern-PWA, Lehrer-Fokuskonsole PWA sowie WebUSB/QR-Einrichtungswerkzeuge',
    },
    highlightsTitle: 'Vertragliche Kernversprechen für Familien & Schulen',
    highlights: [
      {
        title: '6 Transparente Lizenztypen',
        desc: 'Klare Stufen: trial, monthly, yearly, lifetime sowie vip_free und school_pilot ohne versteckte Kostenfallen.',
      },
      {
        title: '2+ Gleichberechtigte Co-Parents',
        desc: 'Für gemeinsame Elternverantwortung entwickelt — plattformunabhängig per PWA auf iPhone, Android und Desktop.',
      },
      {
        title: '100% Offizielles Android MDM',
        desc: 'Nutzung offizieller Android-Enterprise-APIs (DevicePolicyManager) ohne missbräuchliche AccessibilityServices.',
      },
      {
        title: 'Unbedingte Anti-Brick-Freigabe',
        desc: 'Fernentsperrung und 8-stelliger Offline-Mastercode funktionieren dauerhaft kostenlos — auch ohne aktives Abo oder Internet.',
      },
    ],
    sections: [
      {
        id: 'service-scope-and-eligibility',
        number: '1',
        title: 'Vertragsgegenstand & Nutzungsberechtigung',
        iconKey: 'scope',
        paragraphs: [
          'JUNEAR umfasst einen geschützten Bento-Launcher und nativen Device-Owner-MDM-Schutz für Android-Kindergeräte (6–14 Jahre), eine E.164-Anrufabschirmung sowie rollenisolierte Web-Apps für Eltern, Großeltern und Lehrkräfte.',
          'Ein Familienkonto darf ausschließlich von volljährigen Erziehungsberechtigten angelegt werden, die gemäß Art. 8 DSGVO ihre elterliche Verantwortung verbindlich erklären.',
        ],
      },
      {
        id: 'licensing-and-plan-types',
        number: '2',
        title: 'Lizenzmodelle (planType), Abrechnung & 14-tägiges EU-Widerrufsrecht',
        iconKey: 'plans',
        intro:
          'Die Lizenzsteuerung unterstützt sechs kanonische Tarifstufen (families/{familyId}.planType):',
        table: {
          headers: ['planType', 'Tarifbezeichnung', 'Leistungsumfang & Abrechnung'],
          rows: [
            [
              'trial',
              'Kostenlose Testphase',
              'Unverbindlicher Funktionstest ohne automatische Kostenfalle.',
            ],
            [
              'monthly',
              'Monatliches Familien-Abo',
              'Monatlich kündbarer Vollzugang für Co-Parents, Kinderprofile und Großeltern-Fotowand.',
            ],
            [
              'yearly',
              'Jährliches Familien-Abo',
              'Vergünstigter Jahrestarif inklusive aller Sicherheitsmodule und Schulkopplung.',
            ],
            [
              'lifetime',
              'Einmalige Lifetime-Lizenz',
              'Einmalzahlung für dauerhafte Familiennutzung über die gesamte Schulzeit (6–14 Jahre).',
            ],
            [
              'vip_free',
              'Betreiber-Freischaltung (VIP)',
              'Manuell durch den Betreiber gewährte kostenfreie Vollberechtigung.',
            ],
            [
              'school_pilot',
              'Schul- & Klassen-Pilotprojekt',
              'Institutionelle Freischaltung für teilnehmende Pilotschulen und Schulklassen.',
            ],
          ],
        },
        footerNote:
          'EU-Verbraucherwiderrufsrecht: Verbrauchern steht gemäß EU-Richtlinie 2011/83/EU ein 14-tägiges Widerrufsrecht ab Vertragsschluss ohne Angabe von Gründen zu (per E-Mail an info@gabba.bond bzw. bei Google-Play-Käufen direkt über die Google-Play-Abonnementverwaltung).',
      },
      {
        id: 'multi-adult-responsibilities',
        number: '3',
        title: 'Pflichten von Co-Parents, Großeltern und Lehrkräften',
        iconKey: 'roles',
        bullets: [
          {
            label: 'Co-Parents (coParentUids):',
            text: 'Verantworten die Pflege der E.164-Kontakt-Whitelist, die Prüfung von Double-Parent-Handshake-Anfragen, die Aktivierung des Ferien-/Krankheitsmodus sowie die sichere Aufbewahrung des Offline-Entsperrcodes.',
          },
          {
            label: 'Großeltern & Verwandte (familyMemberUids):',
            text: 'Erhalten ausschließlich nach Einladung durch Co-Parents Lesezugriff auf freigegebene Familienfotos sowie erlaubte Familienanrufe.',
          },
          {
            label: 'Lehrkräfte (teacherUids):',
            text: 'Nutzen den Klassencode (classCode) ausschließlich zu Unterrichtszwecken innerhalb des definierten allowedSchoolWindow und respektieren elterliche Krankmeldungen sowie globale App-Sperrlisten.',
          },
        ],
      },
      {
        id: 'native-mdm-and-provisioning-scope',
        number: '4',
        title: 'Natives Android-Enterprise-MDM & Drei Bereitstellungsmodi',
        iconKey: 'mdm',
        paragraphs: [
          'JUNEAR verzichtet vollständig auf zweckentfremdete Eingabehilfen (AccessibilityService). Alle Schutzfunktionen basieren ausschließlich auf offiziellen Android-DevicePolicyManager-Schnittstellen (LockTask-Modus, App-Ausblendung, Private-DNS-Jugendschutzfilter).',
          'Eltern wählen frei zwischen (A) Play-Store-Standardmodus, (B) 6-Tap-Werksreset-QR-Provisionierung oder (C) datenerhaltender Browser-WebUSB-Einrichtung (/junear/usb-setup).',
        ],
      },
      {
        id: 'mandatory-dual-anti-brick-guarantee',
        number: '5',
        title: 'Verbindliche Dual-Anti-Brick-Garantie (Jederzeitige Gerätefreigabe)',
        iconKey: 'antiBrick',
        isWarningBox: true,
        intro:
          'JUNEAR garantiert vertraglich, dass ein Familiengerät niemals dauerhaft gesperrt („gebrickt“) werden kann — unabhängig vom Abonnementstatus oder der Netzverbindung:',
        bullets: [
          {
            label: 'Pfad 1 — 1-Klick-Fernfreigabe (REMOTE_RELEASE):',
            text: 'Jeder Co-Parent kann in der Eltern-PWA jederzeit REMOTE_RELEASE auslösen, wodurch sämtliche Beschränkungen aufgehoben und clearDeviceOwnerApp() ausgeführt werden.',
          },
          {
            label: 'Pfad 2 — 100% Offline 8-stelliger HMAC-SHA256 Mastercode:',
            text: 'Durch 5-maliges Tippen auf das Schutzschild-Abzeichen am Kindergerät lässt sich das Telefon komplett ohne WLAN, Mobilfunk oder SIM-Karte per 8-stelligem Tagescode sofort entsperren.',
          },
        ],
      },
      {
        id: 'liability-and-governing-law',
        number: '6',
        title: 'Haftungshinweise & Anwendbares Recht',
        iconKey: 'law',
        paragraphs: [
          'JUNEAR unterstützt Familien technisch, ersetzt jedoch weder die persönliche Aufsichtspflicht noch öffentliche Notrufdienste. Kurzrufnummern des europäischen Notrufs (112, 104, 105, 107, 144) bleiben jederzeit frei wählbar.',
          'Es gilt das Recht der Europäischen Union und Ungarns unter Wahrung sämtlicher zwingender Verbraucherschutzvorschriften des Wohnsitzstaates der Familie.',
        ],
      },
    ],
    ctaCard: {
      badge: 'AGB & Schulpilot-Anfragen',
      title: 'Möchten Sie JUNEAR an Ihrer Schule oder in Ihrer Familie testen?',
      desc: 'Kontaktieren Sie uns direkt unter info@gabba.bond für Familienlizenzen oder kostenfreie school_pilot-Projekte.',
      emailBtn: 'Kontakt: info@gabba.bond',
      backToJunearBtn: 'Zurück zur JUNEAR-Seite',
      setupGuideBtn: 'Einrichtung öffnen',
    },
  },
  en: {
    metaTitle: 'JUNEAR Terms of Service (ToS) | gabba',
    metaDescription:
      'Official Terms of Service for the JUNEAR (bond.gabba.junear) safe child phone ecosystem: 6 planType license tiers, multi-adult responsibilities, native Android MDM, and Mandatory Dual Anti-Brick Guarantee.',
    breadcrumbHome: 'gabba',
    breadcrumbJunear: 'JUNEAR',
    breadcrumbCurrent: 'Terms of Service',
    badges: [
      'JUNEAR ToS v1.0',
      'Family & School Pilot Licensing',
      'Mandatory Dual Anti-Brick Guarantee',
    ],
    title: 'JUNEAR Terms of Service (ToS)',
    subtitle:
      'These Terms of Service govern the use of the JUNEAR (bond.gabba.junear) safe child phone software ecosystem operated by Bányai Gábor across Co-Parents, Extended Family members, and Classroom Teachers.',
    effectiveDateLabel: 'Effective Date:',
    effectiveDateValue: 'November 15, 2026',
    versionLabel: 'Document Version:',
    versionValue: '1.0',
    langSwitchLabel: 'Language:',
    tocTitle: 'Table of Contents — Terms of Service',
    operatorCard: {
      heading: 'Service Provider & Legal Operator',
      nameLabel: 'Operator Name',
      nameValue: JUNEAR_OPERATOR_METADATA.operatorName,
      addressLabel: 'Registered EU Address',
      addressValue: JUNEAR_OPERATOR_METADATA.registeredAddress,
      emailLabel: 'Support & Legal Contact',
      emailValue: JUNEAR_OPERATOR_METADATA.contactEmail,
      versionFieldLabel: 'ToS Version / Package ID',
      versionFieldValue: 'v1.0 · bond.gabba.junear (EU eur3)',
      scopeLabel: 'Covered Applications',
      scopeValue:
        'JUNEAR Android Child App, Co-Parent & Grandparent PWA, Classroom Teacher Focus Console PWA & WebUSB/QR Provisioning Tools',
    },
    highlightsTitle: 'Core Contractual Commitments to Families & Schools',
    highlights: [
      {
        title: '6 Transparent License Tiers',
        desc: 'Supports trial, monthly, yearly, lifetime, vip_free, and school_pilot plans with zero dark patterns.',
      },
      {
        title: '2+ Equal Co-Parent Admins',
        desc: 'Built for modern co-parenting across iOS, Android, and Desktop browsers with equal administrative rights.',
      },
      {
        title: '100% Official Android MDM',
        desc: 'Uses official Android Enterprise DevicePolicyManager APIs — zero AccessibilityService abuse or screen scraping.',
      },
      {
        title: 'Unconditional Anti-Brick Right',
        desc: 'Remote release and the 8-digit Offline Master Unlock Code remain permanently free and functional regardless of subscription status.',
      },
    ],
    sections: [
      {
        id: 'service-scope-and-eligibility',
        number: '1',
        title: 'Ecosystem Scope & Guardian Eligibility',
        iconKey: 'scope',
        paragraphs: [
          'JUNEAR provides a protected Android Bento Launcher, native Device Owner MDM enforcement, E.164 call screening for children aged 6–14, and role-isolated Progressive Web Applications for Co-Parents, Extended Family, and Classroom Teachers.',
          'Family accounts may only be created by adults aged 18 or older holding lawful parental responsibility under GDPR Article 8.',
        ],
      },
      {
        id: 'licensing-and-plan-types',
        number: '2',
        title: 'Subscription Plans (planType), Billing & 14-Day EU Withdrawal Right',
        iconKey: 'plans',
        intro:
          'JUNEAR supports six canonical entitlement states stored on families/{familyId}.planType:',
        table: {
          headers: ['planType Key', 'Plan Name', 'Entitlement Scope & Billing Model'],
          rows: [
            [
              'trial',
              'Free Family Trial',
              'Full-featured evaluation period with zero automatic charge traps.',
            ],
            [
              'monthly',
              'Monthly Family Plan',
              'Flexible month-to-month access for Co-Parents, child profiles, and Grandparent Photo Wall.',
            ],
            [
              'yearly',
              'Annual Family Plan',
              'Discounted yearly entitlement covering all multi-adult roles and classroom linking.',
            ],
            [
              'lifetime',
              'One-Time Lifetime License',
              'Single purchase unlocking full family features across the entire 6–14 age lifecycle.',
            ],
            [
              'vip_free',
              'Operator VIP Entitlement',
              'Direct operator-granted complimentary family license without payment token requirements.',
            ],
            [
              'school_pilot',
              'Classroom / School Pilot',
              'Institutional pilot license enabling full classroom and family coordination for partner schools.',
            ],
          ],
        },
        footerNote:
          'EU Consumer Right of Withdrawal: Under EU Directive 2011/83/EU, consumers may withdraw from a digital subscription purchase within 14 days without giving any reason by contacting info@gabba.bond (or directly via Google Play Subscriptions for Play Billing purchases).',
      },
      {
        id: 'multi-adult-responsibilities',
        number: '3',
        title: 'Responsibilities of Co-Parents, Extended Family & Classroom Teachers',
        iconKey: 'roles',
        bullets: [
          {
            label: 'Co-Parents (coParentUids):',
            text: 'Responsible for curating the E.164 phone whitelist, reviewing Double-Parent Handshake peer requests, toggling Vacation/Sick-Day overrides when appropriate, and keeping the Offline Master Unlock secret accessible to guardians.',
          },
          {
            label: 'Extended Family (familyMemberUids):',
            text: 'May join strictly by Co-Parent invitation for read-only Family Photo Wall viewing and approved family calling.',
          },
          {
            label: 'Classroom Teachers (teacherUids):',
            text: 'Must use classCode links exclusively for legitimate classroom instruction within allowedSchoolWindow, respecting Co-Parent Vacation/Sick-Day overrides and global app blacklists.',
          },
        ],
      },
      {
        id: 'native-mdm-and-provisioning-scope',
        number: '4',
        title: 'Native Android Enterprise MDM Scope & Three Provisioning Tiers',
        iconKey: 'mdm',
        paragraphs: [
          'JUNEAR never uses Android AccessibilityService to simulate taps or read screen contents. All kiosk and app-visibility rules use official Android Enterprise DevicePolicyManager APIs via JunearDeviceAdminReceiver.',
          'Guardians may choose (A) Play Store Standard mode, (B) 6-Tap Factory-Reset QR Device Owner enrollment, or (C) Zero-Reset Browser WebUSB provisioning (/junear/usb-setup).',
        ],
      },
      {
        id: 'mandatory-dual-anti-brick-guarantee',
        number: '5',
        title: 'Mandatory Dual Anti-Brick Escape Hatch Guarantee',
        iconKey: 'antiBrick',
        isWarningBox: true,
        intro:
          'As a non-negotiable child-safety invariant, JUNEAR guarantees that a family’s phone can never be locked out due to server downtime, lost connectivity, or expired subscriptions:',
        bullets: [
          {
            label: 'Path 1 — 1-Click Remote Firestore Release (REMOTE_RELEASE):',
            text: 'Any Co-Parent can dispatch REMOTE_RELEASE from the Parent PWA to clear all UserManager restrictions, un-hide apps, exit LockTask, and execute clearDeviceOwnerApp().',
          },
          {
            label: 'Path 2 — 100% Offline 8-Digit HMAC-SHA256 Master Unlock Code:',
            text: 'Tapping the Kiosk Shield 5 times opens a built-in numeric keypad accepting the deterministic 8-digit daily HMAC code — working with zero Wi-Fi, zero mobile data, and zero SIM card.',
          },
        ],
      },
      {
        id: 'liability-and-governing-law',
        number: '6',
        title: 'Limitation of Liability & Governing Law',
        iconKey: 'law',
        paragraphs: [
          'JUNEAR is a supportive digital safety platform and does not replace active parental supervision or public emergency services. Emergency short codes (112, 104, 105, 107, 144) are preserved unconditionally across all modes.',
          'These Terms are governed by the laws of Hungary and the European Union, without prejudice to mandatory consumer protection rights in your EU country of residence.',
        ],
      },
    ],
    ctaCard: {
      badge: 'Licensing & School Pilot Desk',
      title: 'Launching a Classroom Pilot or Family Setup?',
      desc: 'Reach out to info@gabba.bond for school_pilot onboarding or multi-parent licensing support.',
      emailBtn: 'Contact info@gabba.bond',
      backToJunearBtn: 'Back to JUNEAR',
      setupGuideBtn: 'Open Setup Guide',
    },
  },
};

export const JUNEAR_OPERATIONS_CONTENT: Record<JunearLegalLang, JunearLegalDocumentContent> = {
  hu: {
    metaTitle: 'JUNEAR Működési és Gyermekvédelmi Szabályzat | gabba',
    metaDescription:
      'A JUNEAR (bond.gabba.junear) műszaki és gyermekvédelmi működési szabályzata: a 8+2 Bento védelmi modul, allowedSchoolWindow tanári korlátok, 15% akkumulátor túlélő mód, 3 mp SOS, Offline HMAC algoritmus és GDPR 17. cikk adattörlés.',
    breadcrumbHome: 'gabba',
    breadcrumbJunear: 'JUNEAR',
    breadcrumbCurrent: 'Működési és Gyermekvédelmi Szabályzat',
    badges: [
      'Működési & Gyermekvédelmi Szabályzat v1.0',
      '8+2 Moduláris Bento Védelmi Pajzs',
      'Kriptográfiai Ellenőrizhetőség',
    ],
    title: 'JUNEAR Működési és Gyermekvédelmi Szabályzat',
    subtitle:
      'Jelen műszaki és működési szabályzat átláthatóan dokumentálja a JUNEAR 8 alap + 2 bővíthető gyermekvédelmi moduljának működését, az iskolai időablak (allowedSchoolWindow) szabályait, a 3 másodperces SOS riasztást, a 15%-os Akkumulátor Túlélő Módot, a 8 jegyű Offline HMAC vésznyitó architektúrát és a GDPR 17. cikk szerinti adattörlési protokollt.',
    effectiveDateLabel: 'Hatálybalépés napja:',
    effectiveDateValue: '2026. november 15.',
    versionLabel: 'Műszaki specifikáció verziója:',
    versionValue: '1.0',
    langSwitchLabel: 'Nyelv:',
    tocTitle: 'Tartalomjegyzék — Működési Szabályzat',
    operatorCard: {
      heading: 'Rendszerüzemeltető és Gyermekvédelmi Felelős',
      nameLabel: 'Üzemeltető',
      nameValue: JUNEAR_OPERATOR_METADATA.operatorName,
      addressLabel: 'Bejegyzett székhely',
      addressValue: JUNEAR_OPERATOR_METADATA.registeredAddress,
      emailLabel: 'Műszaki / Adatvédelmi bejelentések',
      emailValue: JUNEAR_OPERATOR_METADATA.contactEmail,
      versionFieldLabel: 'Verzió / Régió',
      versionFieldValue: 'v1.0 · eur3 (junear-prod / junear-dev)',
      scopeLabel: 'Ellenőrzött komponensek',
      scopeValue:
        'SafeguardEvaluators (Kotlin), OfflineUnlockCodec (RFC 4226 HMAC-SHA256), schoolWindowGuard & CEL Security Rules',
    },
    highlightsTitle: 'Determinisztikus Műszaki Védelmi Pillérek',
    highlights: [
      {
        title: '8+2 Izolált Bento Modul',
        desc: 'Minden gyermekfunkció önálló JunearBentoModule szerződés mögött fut, életkori sávtól független olvasási móddal.',
      },
      {
        title: '5-Kapu Gaming HUB Szűrő',
        desc: 'Játék csak akkor nyílik meg, ha az akkumulátor >15%, nincs tanóra, kész a házi feladat, nincs alvásidő és van napi kvóta.',
      },
      {
        title: '3 mp SOS & 15% Túlélő Mód',
        desc: 'Véletlen zsebhívás ellen védett 3000 ms SOS sáv és automatikus <= 15% akkumulátor-kímélő védelmi üzemmód.',
      },
      {
        title: 'RFC 4226 Offline Mesterkód',
        desc: 'Hálózatfüggetlen HMAC-SHA256 8 jegyű feloldókód ±1 UTC nap toleranciával és 60 mp brute-force védelemmel.',
      },
    ],
    sections: [
      {
        id: 'eight-safeguards-architecture',
        number: '1',
        title: 'A 8 Alap + 2 Bővítő Gyermekvédelmi Modul (JunearBentoModule) Működése',
        iconKey: 'safeguards',
        intro:
          'A JUNEAR kezdőképernyő minden csempéje determinisztikus védelmi szabályok szerint működik, az életkori sávtól (6–7, 8–9, 10–11, 12–14 év) függetlenül választható olvasási móddal (SYMBOLS_ONLY + Noémi TTS, EARLY_READER_CAPS, STANDARD_TEXT):',
        table: {
          headers: ['Modul azonosító', 'Gyermekvédelmi működés és korlát', 'Tanórai Fókusz alatt'],
          rows: [
            [
              '1. module_family_caller',
              'E.164 (+36/+43/+49) whitelist tárcsázó, ismeretlen hívások csendes blokkolása és Sürgős Szülői Áttörés (Urgent Breakthrough: 180 mp-en belüli 2. Társszülői hívás hangos jelzése).',
              'Engedélyezett (szülői vészhívás)',
            ],
            [
              '2. module_timetable',
              'Napi/heti órarend teremszámokkal és felszerelés-emlékeztetőkkel + 1-érintéses Szülői Szünidő / Betegnap felülbírálat.',
              'Engedélyezett',
            ],
            [
              '3. module_tasks',
              'Házi feladat és házimunka lista szülői jóváhagyással és automatikus +15 / +20 perc Gaming HUB jutalomjóváírással.',
              'Engedélyezett',
            ],
            [
              '4. module_safe_apps',
              'Szülő/tanár által engedélyezett reklámmentes tanulási eszközök (pl. Duolingo, GeoGebra, Szótár).',
              'Engedélyezett',
            ],
            [
              '5. module_gaming_hub',
              '5-lépcsős kapuval védett játéksáv (Akkumulátor -> Tanórai Fókusz -> Házi feladat -> Alvásidő -> Napi perc kvóta) + „+15 perc kérés” folyamattal.',
              'Blokkolt',
            ],
            [
              '6. module_camera',
              'Helyi tárhely-korlátos kamera automatikus feltöltés nélkül; csak a „Küldés a családnak” gomb tömörít <= 250 KB image/webp képet.',
              'Blokkolt',
            ],
            [
              '7. module_friends_chat',
              'Double-Parent Handshake csevegés URL/telefonszám szűrővel; 6–7 éveseknek kizárólag hangüzenet és vektormatrica.',
              'Blokkolt',
            ],
            [
              '8. module_safety',
              'Haversine-alapú Otthon/Iskola biztonsági zóna (Geofence), 3 mp SOS sáv és <= 15% Akkumulátor Túlélő Mód.',
              'Engedélyezett',
            ],
            [
              '9–10. Bővítő modulok',
              'module_dns_webfilter (DevicePolicyManager Private DNS biztonságos keresés) és module_reading_coach (háromnyelvű olvasásfejlesztő).',
              'Engedélyezett (háttér / oktatás)',
            ],
          ],
        },
      },
      {
        id: 'allowed-school-window-governance',
        number: '2',
        title: 'Tantermi Időablak (allowedSchoolWindow) és Pedagógusi Korlátok',
        iconKey: 'schoolWindow',
        bullets: [
          {
            label: 'Szigorú időbeli korlátozás:',
            text: 'A Tanári Fókusz Konzol kizárólag a szülő és az iskola által rögzített allowedSchoolWindow időablakon belül (pl. Hétfő–Péntek 07:45–15:30, Europe/Budapest) jogosult tanórai állapotot írni. Délután, este és hétvégén minden tanári vezérlő automatikusan zárolt.',
          },
          {
            label: '1-Érintéses Szülői Szünidő / Betegnap Elsőbbség:',
            text: 'Ha a Társszülő bekapcsolja a vacationOrSickMode kapcsolót (pl. a gyermek otthon lábadozik), mind a kliensoldali schoolWindowGuard, mind a szerveroldali firestore.rules azonnal megtagadja a tanórai fókusz zár alkalmazását az adott gyermekre.',
          },
          {
            label: '45 perces ideiglenes oktató app feloldás és szülői tiltólista:',
            text: 'A pedagógus 45 perces visszaszámlálóval feloldhat jóváhagyott tanórai alkalmazásokat (Kahoot!, Duolingo, GeoGebra, Redmenta, Szótár), azonban a szülő által globálisan tiltott csomagnevek (blacklist_{pkg}) soha nem oldhatók fel.',
          },
        ],
      },
      {
        id: 'sos-and-battery-survival-protocol',
        number: '3',
        title: '3 Másodperces SOS Riasztási Protokoll és <= 15% Akkumulátor Túlélő Mód',
        iconKey: 'sosBattery',
        bullets: [
          {
            label: 'Folyamatos 3000 ms nyomva tartás (SOS sáv):',
            text: 'A képernyő alján elhelyezett nagy kontrasztú SOS sáv megszakítás nélküli 3 másodperces érintést igényel vizuális folyamatjelzővel. Ez kiszűri a véletlen zsebben történő megnyomásokat, vészhelyzetben viszont azonnal értesíti a Társszülőket.',
          },
          {
            label: 'Automatikus <= 15% Akkumulátor Túlélő Mód (20%-os hiszterézissel):',
            text: 'Amikor a töltőre nem csatlakoztatott készülék töltöttsége 15% vagy az alá csökken, a BatterySurvivalEvaluator automatikusan felfüggeszti a nagy energiaigényű modulokat (Gaming HUB, kamera), hogy a gyermek hazaérkezéséig biztosítsa a szülői elérhetőséget és az SOS hívást. A normál üzemmód töltéskor vagy >= 20% töltöttségnél áll vissza.',
          },
        ],
      },
      {
        id: 'offline-hmac-unlock-specification',
        number: '4',
        title: 'A 8-Jegyű Offline HMAC-SHA256 Vésznyitó Műszaki Architektúrája',
        iconKey: 'hmac',
        paragraphs: [
          'Az Anti-Brick biztonsági garancia alapja a determinisztikus OfflineUnlockCodec, amely azonos kriptográfiai eredményt számít ki az Android készüléken (Kotlin) és a Szülői PWA-ban (WebCrypto TypeScript) bárminemű hálózati kapcsolat nélkül.',
          'A megosztott mestertitok normalizálva a készülék EncryptedSharedPreferences tárolójában, valamint a szigorúan izolált children/{childId}/secrets/offlineUnlock útvonalon tárolódik (amelyhez sem nagyszülő, sem pedagógus nem férhet hozzá). A rendszer a "JUNEAR-UNLOCK-V1:" + utcEpochDay üzenetből HMAC-SHA256 lenyomatot képez, majd RFC 4226 dinamikus csonkolással állítja elő a 8 jegyű kódot, konstans idejű összehasonlítással (±1 UTC nap óraeltérés-tűréssel és 5 hibás próbálkozás után 60 másodperces helyi várakoztatással).',
        ],
      },
      {
        id: 'gdpr-art17-deletion-workflow',
        number: '5',
        title: 'GDPR 17. cikk Fiók- és Gyermekadat-törlési Munkafolyamat (/junear/delete-account)',
        iconKey: 'deletion',
        bullets: [
          {
            label: '1. lépés — Készülék felszabadítása (Anti-Brick feloldás):',
            text: 'Törlés előtt a Társszülő a REMOTE_RELEASE paranccsal vagy az Offline 8 jegyű kóddal eltávolítja a Device Owner korlátozásokat a gyermek telefonjáról.',
          },
          {
            label: '2. lépés — Kaskádolt eur3 adattörlés:',
            text: 'A Szülői PWA-ban indított törlés vagy az info@gabba.bond címre küldött kérelem hatására 72 órán belül véglegesen törlődik a families/{familyId} fa, az összes children/{childId} alkollekció, a baráti kapcsolatok, az iskolai munkamenetek és az összes Cloud Storage WebP fotó.',
          },
          {
            label: 'Dedikált törlési oldal:',
            text: 'A részletes lépésről lépésre útmutató bármikor elérhető közvetlenül a https://gabba.bond/junear/delete-account címen (vagy a fenti „Fiók- és Adattörlés” fülre kattintva).',
          },
        ],
      },
    ],
    ctaCard: {
      badge: 'Gyermekvédelmi & Műszaki Átláthatóság',
      title: 'Kérdése van a védelmi modulok működésével vagy adattörléssel kapcsolatban?',
      desc: 'Írjon az info@gabba.bond címre, vagy tekintse meg a lépésről lépésre telepítési útmutatót.',
      emailBtn: 'Kapcsolat: info@gabba.bond',
      backToJunearBtn: 'Vissza a JUNEAR oldalra',
      setupGuideBtn: 'Beállítási útmutató megnyitása',
    },
  },
  de: {
    metaTitle: 'JUNEAR Betriebs- & Kinderschutzrichtlinie | gabba',
    metaDescription:
      'Technische Betriebs- und Kinderschutzrichtlinie für JUNEAR (bond.gabba.junear): 8+2 Bento-Schutzmodule, allowedSchoolWindow-Grenzen, 15% Akku-Überlebensmodus, 3-Sek.-SOS, Offline-HMAC-Architektur & DSGVO Art. 17 Datenlöschung.',
    breadcrumbHome: 'gabba',
    breadcrumbJunear: 'JUNEAR',
    breadcrumbCurrent: 'Betriebs- & Kinderschutzrichtlinie',
    badges: [
      'Betriebs- & Kinderschutzrichtlinie v1.0',
      '8+2 Modulare Bento-Schutzschilde',
      'Kryptografisch Verifizierbar',
    ],
    title: 'JUNEAR Betriebs- und Kinderschutzrichtlinie',
    subtitle:
      'Diese Richtlinie dokumentiert transparent die Funktionsweise der 8 Kern- und 2 Erweiterungsmodule von JUNEAR, die technischen Grenzen des Unterrichtsfensters (allowedSchoolWindow), den 15%-Akku-Überlebensmodus, den 3-Sekunden-SOS-Notruf, das 8-stellige Offline-HMAC-Notfallverfahren sowie den Löschprozess nach Art. 17 DSGVO.',
    effectiveDateLabel: 'Gültig ab:',
    effectiveDateValue: '15. November 2026',
    versionLabel: 'Spezifikationsversion:',
    versionValue: '1.0',
    langSwitchLabel: 'Sprache:',
    tocTitle: 'Inhaltsverzeichnis — Betriebsrichtlinie',
    operatorCard: {
      heading: 'Systembetreiber & Kinderschutzverantwortlicher',
      nameLabel: 'Betreiber',
      nameValue: JUNEAR_OPERATOR_METADATA.operatorName,
      addressLabel: 'Eingetragene Anschrift',
      addressValue: JUNEAR_OPERATOR_METADATA.registeredAddress,
      emailLabel: 'Technik- & Datenschutzkontakt',
      emailValue: JUNEAR_OPERATOR_METADATA.contactEmail,
      versionFieldLabel: 'Version / EU-Region',
      versionFieldValue: 'v1.0 · eur3 (junear-prod / junear-dev)',
      scopeLabel: 'Geprüfte Sicherheitsmodule',
      scopeValue:
        'SafeguardEvaluators (Kotlin), OfflineUnlockCodec (RFC 4226 HMAC-SHA256), schoolWindowGuard & CEL Security Rules',
    },
    highlightsTitle: 'Deterministische Schutzmechanismen im Überblick',
    highlights: [
      {
        title: '8+2 Isolierte Bento-Module',
        desc: 'Jede Kinderfunktion läuft hinter einem modularen JunearBentoModule-Vertrag mit entkoppeltem Alters- und Lesemodus.',
      },
      {
        title: '5-Stufen Gaming-HUB-Schranke',
        desc: 'Spiele starten nur bei >15% Akku, außerhalb des Unterrichtsfokus, erledigten Aufgaben, außerhalb der Schlafenszeit und freiem Tageskontingent.',
      },
      {
        title: '3-Sek.-SOS & 15% Akku-Schutz',
        desc: 'Taschenanruf-sichere 3000-ms-SOS-Leiste und automatischer Energiespar-Überlebensmodus ab <= 15% Akkustand.',
      },
      {
        title: 'RFC 4226 Offline-Mastercode',
        desc: 'Netzwerkfreier 8-stelliger HMAC-SHA256-Entsperrcode mit ±1-UTC-Tagestoleranz und lokalem Ratenbegrenzer.',
      },
    ],
    sections: [
      {
        id: 'eight-safeguards-architecture',
        number: '1',
        title: 'Technische Funktionsweise der 8 Kern- + 2 Erweiterungsmodule',
        iconKey: 'safeguards',
        intro:
          'Alle Kacheln des JUNEAR-Startbildschirms kombinieren vier Altersstufen (6–7, 8–9, 10–11, 12–14 Jahre) diskriminierungsfrei mit drei Lesemodi (SYMBOLS_ONLY + Sprachausgabe, EARLY_READER_CAPS, STANDARD_TEXT):',
        table: {
          headers: ['Modul-ID', 'Schutzfunktion & Technische Grenze', 'Im Unterrichtsfokus'],
          rows: [
            [
              '1. module_family_caller',
              'E.164 (+36/+43/+49) Whitelist-Telefonie, lautlose Abweisung fremder Anrufer & dringender Eltern-Durchbruch (2. Elternanruf binnen 180 Sek.).',
              'Erlaubt (Eltern-Notruf)',
            ],
            [
              '2. module_timetable',
              'Tages-/Wochenstundenplan mit Raumnummern & Materialhinweisen + 1-Tap Eltern-Ferien-/Krankmodus.',
              'Erlaubt',
            ],
            [
              '3. module_tasks',
              'Hausaufgaben- & Pflichtenliste mit Elternbestätigung und automatischer +15/+20 Min. Spielzeitbelohnung.',
              'Erlaubt',
            ],
            [
              '4. module_safe_apps',
              'Von Eltern/Lehrkräften freigegebene werbefreie Lernwerkzeuge (z. B. Duolingo, GeoGebra, Wörterbuch).',
              'Erlaubt',
            ],
            [
              '5. module_gaming_hub',
              'Streng getrennter Spielbereich mit 5-Stufen-Prüfung (Akku -> Unterrichtsfokus -> Hausaufgaben -> Schlafenszeit -> Tageslimit) & „+15 Min. anfragen“.',
              'Gesperrt',
            ],
            [
              '6. module_camera',
              'Speicherbegrenzte Kamera ohne Auto-Upload; nur „An Familie senden“ erzeugt ein <= 250 KB WebP-Foto.',
              'Gesperrt',
            ],
            [
              '7. module_friends_chat',
              'Double-Parent-Handshake-Chat mit URL-/Rufnummernblockade; für 6–7 Jahre nur Sprachnotizen & Vektor-Sticker.',
              'Gesperrt',
            ],
            [
              '8. module_safety',
              'Haversine-Geofence (Zuhause/Schule), 3-Sek.-SOS-Leiste & automatischer <= 15% Akku-Überlebensmodus.',
              'Erlaubt',
            ],
            [
              '9–10. Erweiterungs-Slots',
              'module_dns_webfilter (DevicePolicyManager Private-DNS-SafeSearch) & module_reading_coach (dreisprachiger Lesetrainer).',
              'Erlaubt (Hintergrund / Lernen)',
            ],
          ],
        },
      },
      {
        id: 'allowed-school-window-governance',
        number: '2',
        title: 'Unterrichtsfenster (allowedSchoolWindow) & Technische Lehrergrenzen',
        iconKey: 'schoolWindow',
        bullets: [
          {
            label: 'Harte Zeitfenstersperre:',
            text: 'Lehrkräfte können ausschließlich innerhalb des konfigurierten allowedSchoolWindow (z. B. Mo–Fr 07:45–15:30) Aktionen auslösen. Nachmittags, abends und am Wochenende ist die Lehrerkonsole vollständig gesperrt.',
          },
          {
            label: 'Vorrang des elterlichen Ferien-/Krankheitsmodus:',
            text: 'Aktiviert ein Co-Parent vacationOrSickMode, überspringen sowohl schoolWindowGuard als auch die Firestore-Sicherheitsregeln dieses Kind sofort.',
          },
          {
            label: '45-Minuten-Lern-App-Timer & Eltern-Sperrliste:',
            text: 'Temporäre Unterrichtsfreigaben (Kahoot!, Duolingo, GeoGebra, Redmenta, Wörterbuch) laufen automatisch nach 45:00 Minuten ab und können niemals elterliche Paket-Sperrlisten (blacklist_{pkg}) übersteuern.',
          },
        ],
      },
      {
        id: 'sos-and-battery-survival-protocol',
        number: '3',
        title: '3-Sekunden-SOS-Notrufprotokoll & <= 15% Akku-Überlebensmodus',
        iconKey: 'sosBattery',
        bullets: [
          {
            label: 'Unterbrechungsfreies 3000-ms-Halten:',
            text: 'Die SOS-Leiste erfordert ein durchgehendes Halten über 3 Sekunden mit animiertem Fortschrittsbalken, sodass Fehlalarme in der Schultasche vermieden werden.',
          },
          {
            label: 'Akku-Überlebensmodus bei <= 15% (Erholung ab >= 20%):',
            text: 'Fällt der ungeladene Akku auf 15% oder darunter, sperrt JUNEAR automatisch energieintensive Module (Gaming HUB, Kamera), damit das Kind für Elternanrufe und SOS auf dem Heimweg erreichbar bleibt.',
          },
        ],
      },
      {
        id: 'offline-hmac-unlock-specification',
        number: '4',
        title: 'Kryptografische Architektur des 8-stelligen Offline-HMAC-Mastercodes',
        iconKey: 'hmac',
        paragraphs: [
          'Der OfflineUnlockCodec berechnet auf Android (Kotlin) und in der Eltern-PWA (WebCrypto TypeScript) identische 8-stellige Tagescodes vollständig ohne Internetverbindung.',
          'Aus dem isoliert unter children/{childId}/secrets/offlineUnlock gespeicherten Geheimnis und der Nachricht "JUNEAR-UNLOCK-V1:" + utcEpochDay wird per HMAC-SHA256 und dynamischer RFC-4226-Kürzung ein 8-stelliger Code abgeleitet (zeitkonstanter Vergleich über ±1 UTC-Tag, 60 Sekunden Sperrzeit nach 5 Fehlversuchen).',
        ],
      },
      {
        id: 'gdpr-art17-deletion-workflow',
        number: '5',
        title: 'Konto- und Kinderdatenlöschung nach Art. 17 DSGVO (/junear/delete-account)',
        iconKey: 'deletion',
        bullets: [
          {
            label: 'Schritt 1 — Anti-Brick-Gerätefreigabe:',
            text: 'Vor dem Löschen hebt der Elternteil den Device-Owner-Schutz per REMOTE_RELEASE oder 8-stelligem Offline-Code auf.',
          },
          {
            label: 'Schritt 2 — Kaskadierende eur3-Löschung binnen 72 Stunden:',
            text: 'Über die Eltern-PWA oder per E-Mail an info@gabba.bond werden sämtliche Firestore-Sammlungen und Cloud-Storage-WebP-Fotos unwiderruflich gelöscht (Direktzugang unter /junear/delete-account).',
          },
        ],
      },
    ],
    ctaCard: {
      badge: 'Kinderschutz- & Techniktransparenz',
      title: 'Fragen zur Sicherheitsarchitektur oder zur Datenlöschung?',
      desc: 'Schreiben Sie an info@gabba.bond oder öffnen Sie die interaktive Einrichtungsanleitung.',
      emailBtn: 'E-Mail an info@gabba.bond',
      backToJunearBtn: 'Zurück zur JUNEAR-Seite',
      setupGuideBtn: 'Einrichtung öffnen',
    },
  },
  en: {
    metaTitle: 'JUNEAR Operational & Child-Safety Policy | gabba',
    metaDescription:
      'Technical Operational & Child-Safety Policy for JUNEAR (bond.gabba.junear): 8+2 Bento safeguards, allowedSchoolWindow classroom boundaries, 15% Battery Survival Mode, 3s SOS dispatch, Offline HMAC unlock architecture & GDPR Art. 17 deletion.',
    breadcrumbHome: 'gabba',
    breadcrumbJunear: 'JUNEAR',
    breadcrumbCurrent: 'Operational & Child-Safety Policy',
    badges: [
      'Operational & Child-Safety Policy v1.0',
      '8+2 Modular Bento Safeguards',
      'Cryptographically Verifiable',
    ],
    title: 'JUNEAR Operational & Child-Safety Policy',
    subtitle:
      'This policy documents the exact technical operation of JUNEAR’s 8 core + 2 extension safeguards, allowedSchoolWindow classroom boundaries, 15% Battery Survival Mode, 3-second SOS dispatch, Offline 8-digit HMAC unlock specification, and the GDPR Article 17 account & child data deletion procedure.',
    effectiveDateLabel: 'Effective Date:',
    effectiveDateValue: 'November 15, 2026',
    versionLabel: 'Specification Version:',
    versionValue: '1.0',
    langSwitchLabel: 'Language:',
    tocTitle: 'Table of Contents — Operational Policy',
    operatorCard: {
      heading: 'System Operator & Child-Safety Governance',
      nameLabel: 'Operator',
      nameValue: JUNEAR_OPERATOR_METADATA.operatorName,
      addressLabel: 'Registered EU Address',
      addressValue: JUNEAR_OPERATOR_METADATA.registeredAddress,
      emailLabel: 'Technical & Safety Contact',
      emailValue: JUNEAR_OPERATOR_METADATA.contactEmail,
      versionFieldLabel: 'Version / EU Region',
      versionFieldValue: 'v1.0 · eur3 (junear-prod / junear-dev)',
      scopeLabel: 'Verified Subsystems',
      scopeValue:
        'SafeguardEvaluators (Kotlin), OfflineUnlockCodec (RFC 4226 HMAC-SHA256), schoolWindowGuard & CEL Security Rules',
    },
    highlightsTitle: 'Deterministic Child-Safety Pillars',
    highlights: [
      {
        title: '8+2 Isolated Bento Modules',
        desc: 'Every child-facing tile implements JunearBentoModule with AgeTier decoupled from LiteracyMode for stigma-free accessibility.',
      },
      {
        title: '5-Gate Gaming HUB Engine',
        desc: 'Evaluates Battery Survival -> School Focus -> Homework Completion -> Bedtime Lock -> Daily Minute Quota before launching games.',
      },
      {
        title: '3s SOS & 15% Survival Mode',
        desc: 'Pocket-dial-proof 3000 ms press-and-hold SOS bar plus automatic <= 15% Battery Survival protection.',
      },
      {
        title: 'RFC 4226 Offline Master Code',
        desc: 'Zero-network 8-digit HMAC-SHA256 unlock code with ±1 UTC day tolerance and 60s brute-force cooldown.',
      },
    ],
    sections: [
      {
        id: 'eight-safeguards-architecture',
        number: '1',
        title: 'Technical Breakdown of the 8 Core + 2 Extension Safeguards',
        iconKey: 'safeguards',
        intro:
          'Every child-facing feature operates behind an isolated safeguard boundary, pairing 4 Age Tiers (6–7, 8–9, 10–11, 12–14) orthogonally with 3 Literacy Modes (SYMBOLS_ONLY + Noémi/DE/EN TTS, EARLY_READER_CAPS, STANDARD_TEXT):',
        table: {
          headers: ['Module ID', 'Safeguard Mechanism & Boundary', 'During School Focus'],
          rows: [
            [
              '1. module_family_caller',
              'E.164 (+36/+43/+49) whitelist dialer, silent unknown-caller screening & Urgent Co-Parent Breakthrough (2nd parent call within 180s rings through).',
              'Allowed (Parent emergency)',
            ],
            [
              '2. module_timetable',
              'Daily/weekly timetable with room numbers & equipment reminders + 1-Tap Co-Parent Vacation/Sick-Day override.',
              'Allowed',
            ],
            [
              '3. module_tasks',
              'Daily homework & chore checklist with parent verification crediting +15 / +20 min Gaming HUB rewards.',
              'Allowed',
            ],
            [
              '4. module_safe_apps',
              'Parent/teacher whitelisted ad-free learning tools (Duolingo, GeoGebra, Dictionary, Calculator).',
              'Allowed',
            ],
            [
              '5. module_gaming_hub',
              'Separated Gaming HUB gated by 5 priority checks (Battery -> School Focus -> Homework -> Bedtime -> Quota) + "+15 min" request flow.',
              'Blocked',
            ],
            [
              '6. module_camera',
              'Local-storage-capped camera with zero auto-upload; explicit "Send to Family" compresses to <= 250 KB image/webp.',
              'Blocked',
            ],
            [
              '7. module_friends_chat',
              'Double-Parent Handshake peer chat blocking URLs & 7+ digit phone numbers; voice/vector stickers only for 6–7.',
              'Blocked',
            ],
            [
              '8. module_safety',
              'Haversine Home/School safe-zone geofencing, 3-second hold SOS bar & <= 15% Battery Survival Mode.',
              'Allowed',
            ],
            [
              '9–10. Extension Slots',
              'module_dns_webfilter (DevicePolicyManager Private DNS safe-search) & module_reading_coach (trilingual guided reading coach).',
              'Allowed (Background / Study)',
            ],
          ],
        },
      },
      {
        id: 'allowed-school-window-governance',
        number: '2',
        title: 'allowedSchoolWindow Classroom Boundaries & Parental Precedence',
        iconKey: 'schoolWindow',
        bullets: [
          {
            label: 'Hard time-window boundary:',
            text: 'Classroom Teacher consoles can act strictly within allowedSchoolWindow (e.g. Mon–Fri 07:45–15:30 Europe/Budapest). Evenings and weekends hard-lock all teacher controls automatically.',
          },
          {
            label: '1-Tap Co-Parent Vacation / Sick-Day Override:',
            text: 'Whenever a Co-Parent enables vacationOrSickMode, both client-side schoolWindowGuard and server-side firestore.rules immediately block classroom focus writes for that child.',
          },
          {
            label: '45-minute educational app unlock & Parent Global Blacklist:',
            text: 'Temporary unlocks for curated classroom tools (Kahoot!, Duolingo, GeoGebra, Redmenta, Dictionary) auto-expire at 00:00 and never override parent-blacklisted Android packages (blacklist_{pkg}).',
          },
        ],
      },
      {
        id: 'sos-and-battery-survival-protocol',
        number: '3',
        title: '3-Second Continuous Hold SOS Dispatch & <= 15% Battery Survival Mode',
        iconKey: 'sosBattery',
        bullets: [
          {
            label: '3000 ms continuous press-and-hold SOS bar:',
            text: 'Requiring an uninterrupted 3-second hold with smooth visual progress eliminates accidental pocket dials while dispatching immediate high-priority SOS alerts to Co-Parents when genuinely needed.',
          },
          {
            label: 'Automatic <= 15% Battery Survival Mode (20% recovery hysteresis):',
            text: 'When unplugged battery drops to <= 15%, BatterySurvivalEvaluator automatically suspends high-drain modules (Gaming HUB, Camera) so voice calling and SOS reachability survive until the child gets home safely.',
          },
        ],
      },
      {
        id: 'offline-hmac-unlock-specification',
        number: '4',
        title: 'Cryptographic Specification of the Offline 8-Digit HMAC-SHA256 Master Unlock',
        iconKey: 'hmac',
        paragraphs: [
          'OfflineUnlockCodec computes identical 8-digit unlock codes across Android Kotlin and Parent PWA WebCrypto TypeScript with zero internet or cellular dependency.',
          'Using the normalized secret stored in EncryptedSharedPreferences and isolated at children/{childId}/secrets/offlineUnlock (inaccessible to Extended Family and Teachers), the codec computes HMAC_SHA256(UTF8(normalizedSecret), UTF8("JUNEAR-UNLOCK-V1:" + utcEpochDay)) with RFC 4226 dynamic truncation, verifying constant-time across [utcEpochDay - 1, utcEpochDay, utcEpochDay + 1] with a 60-second cooldown after 5 failed attempts.',
        ],
      },
      {
        id: 'gdpr-art17-deletion-workflow',
        number: '5',
        title: 'GDPR Article 17 Account & Child Data Deletion Procedure (/junear/delete-account)',
        iconKey: 'deletion',
        bullets: [
          {
            label: 'Step 1 — Anti-Brick Device Release:',
            text: 'Before wiping cloud records, the Co-Parent dispatches REMOTE_RELEASE or enters the 8-digit Offline Master Code so the phone cleanly exits Device Owner management.',
          },
          {
            label: 'Step 2 — 72-Hour Cascade Purge in eur3:',
            text: 'Self-service deletion in Parent PWA or email request to info@gabba.bond permanently purges families/{familyId}, all children/{childId} subcollections, friendships, school sessions, and Cloud Storage WebP photos (accessible directly via /junear/delete-account).',
          },
        ],
      },
    ],
    ctaCard: {
      badge: 'Child-Safety & Operational Transparency',
      title: 'Need technical details or assistance with data deletion?',
      desc: 'Contact info@gabba.bond directly or explore the step-by-step JUNEAR Setup Guide.',
      emailBtn: 'Email info@gabba.bond',
      backToJunearBtn: 'Back to JUNEAR',
      setupGuideBtn: 'Open Setup Guide',
    },
  },
};

export const JUNEAR_DOCUMENTS_BY_TYPE: Record<
  JunearLegalDocType,
  Record<JunearLegalLang, JunearLegalDocumentContent>
> = {
  privacy: JUNEAR_PRIVACY_CONTENT,
  terms: JUNEAR_TERMS_CONTENT,
  operations: JUNEAR_OPERATIONS_CONTENT,
};
