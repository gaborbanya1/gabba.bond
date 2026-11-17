export type JunearLang = 'hu' | 'de' | 'en';

export const JUNEAR_PACKAGE_ID = 'bond.gabba.junear';
export const JUNEAR_PAGE_URL = 'https://gabba.bond/junear';
export const JUNEAR_OG_IMAGE = 'https://gabba.bond/screenshots/junear/junear-og.png';

export interface JunearSafeguardCard {
  id: string;
  badge: string;
  title: string;
  desc: string;
  highlights: string[];
  accentHex: string;
  pastelHex: string;
  borderHex: string;
}

export interface JunearRoleCard {
  id: 'child' | 'coparent' | 'grandparent' | 'teacher';
  badge: string;
  title: string;
  platform: string;
  summary: string;
  allowed: string[];
  blocked: string[];
  accentHex: string;
}

export interface JunearPlanCard {
  planKey: 'trial' | 'monthly' | 'yearly' | 'lifetime' | 'school_pilot';
  badge: string;
  name: string;
  price: string;
  period: string;
  desc: string;
  features: string[];
  featured?: boolean;
}

export interface JunearScreenSlide {
  index: 1 | 2 | 3 | 4;
  badge: string;
  title: string;
  caption: string;
}

export interface JunearContent {
  meta: {
    title: string;
    description: string;
  };
  breadcrumbHome: string;
  hero: {
    euBadge: string;
    playBadge: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    usbCta: string;
    secondaryCta: string;
    trustPills: string[];
  };
  simulator: {
    kicker: string;
    themeLabel: string;
    ageLabel: string;
    literacyLabel: string;
    noemiVoiceBadge: string;
    kioskShieldBadge: string;
    timetableBanner: string;
    quotaBarLabel: string;
    sosIdleLabel: string;
    sosHoldingLabel: string;
    sosDispatchedLabel: string;
    sosResetBtn: string;
    tapHint: string;
    ageLabels: Record<'AGE_6_7' | 'AGE_8_9' | 'AGE_10_11' | 'AGE_12_14', string>;
    literacyLabels: Record<'SYMBOLS_ONLY' | 'EARLY_READER_CAPS' | 'STANDARD_TEXT', string>;
    tiles: {
      id: string;
      title: string;
      caps: string;
      status: string;
      ttsSample: string;
      solidHex: string;
      pastelHex: string;
      borderHex: string;
    }[];
  };
  lifecycle: {
    kicker: string;
    title: string;
    subtitle: string;
    dyslexiaCalloutTitle: string;
    dyslexiaCalloutBody: string;
    tiers: {
      tierKey: string;
      ageBadge: string;
      title: string;
      desc: string;
      features: string[];
    }[];
  };
  safeguards: {
    kicker: string;
    title: string;
    subtitle: string;
    cards: JunearSafeguardCard[];
  };
  roles: {
    kicker: string;
    title: string;
    subtitle: string;
    cards: JunearRoleCard[];
    matrixTitle: string;
    matrixHeaders: [string, string, string, string];
    matrixRows: { scope: string; coparent: string; grandparent: string; teacher: string }[];
  };
  mdmAndAntiBrick: {
    kicker: string;
    title: string;
    subtitle: string;
    modes: {
      badge: string;
      title: string;
      desc: string;
      ctaLabel: string;
      targetRoute: 'junear-setup' | 'junear-usb-setup';
    }[];
    antiBrickTitle: string;
    antiBrickSubtitle: string;
    remoteCardTitle: string;
    remoteCardDesc: string;
    offlineCardTitle: string;
    offlineCardDesc: string;
    sampleOfflineCodeLabel: string;
  };
  screenshots: {
    kicker: string;
    title: string;
    subtitle: string;
    slides: JunearScreenSlide[];
  };
  pricing: {
    kicker: string;
    title: string;
    subtitle: string;
    gdprGateNote: string;
    plans: JunearPlanCard[];
  };
  faq: {
    kicker: string;
    title: string;
    subtitle: string;
    items: { q: string; a: string }[];
  };
  finalCta: {
    title: string;
    subtitle: string;
    setupBtn: string;
    usbBtn: string;
    legalHeading: string;
    privacyLabel: string;
    termsLabel: string;
    operationsLabel: string;
    deleteLabel: string;
  };
}

export const JUNEAR_CONTENT: Record<JunearLang, JunearContent> = {
  hu: {
    meta: {
      title: 'JUNEAR — Gyermekbiztos első okostelefon (6–14 év) | EU GDPR & Szülői Védőháló | gabba',
      description:
        'Európai (eur3), 100% Google Play Families konform biztonságos gyermektelefon-ökoszisztéma 6–14 éveseknek: 4 korcsoport, diszlexiabarát olvasási módok természetes magyar női hanggal (Noémi), 2+ társszülő, nagyszülői fotófal, tanórai fókusz és kettős Anti-Brick védelem.',
    },
    breadcrumbHome: 'Főoldal',
    hero: {
      euBadge: 'EU (eur3) Adatközpont • GDPR 8. cikk Konform',
      playBadge: '100% Google Play Families • 0% AD_ID & Reklám',
      title: 'Biztonságos első okostelefon, amely együtt nő a gyermekeddel 6-tól 14 éves korig.',
      subtitle:
        'Játékos, színes Bento kezdőképernyő a gyermeknek — egyenrangú PWA vezérlőpult mindkét szülőnek, olvasási fotófal a nagyszülőknek, és szigorú GDPR-fallal védett tanórai fókusz az iskolának.',
      primaryCta: 'Beállítási útmutató (QR & PWA)',
      usbCta: 'WebUSB 1-kattintásos telepítő',
      secondaryCta: '8+2 védelmi modul felfedezése',
      trustPills: [
        'E.164 családi hívólista (+36 / +43 / +49)',
        'Natív Device Owner MDM (Accessibility trükkök nélkül)',
        'Offline 8 jegyű HMAC vészfeloldó kód SIM nélkül is',
      ],
    },
    simulator: {
      kicker: 'ÉLŐ INTERAKTÍV TELEFON-SZIMULÁTOR — PRÓBÁLD KI KATTINTÁSSAL',
      themeLabel: '5 gyermek által választható téma',
      ageLabel: '4 életkori szint (AgeTier)',
      literacyLabel: '3 független olvasási mód',
      noemiVoiceBadge: 'Stúdióminőségű magyar női hang (Noémi) aktív',
      kioskShieldBadge: 'Device Owner Kioszk Aktív (5x érintés = Offline kód)',
      timetableBanner: 'Következő óra: Matematika (204. terem) • Felszerelés: körző',
      quotaBarLabel: 'Gaming HUB keret: 45 / 60 perc (+15p leckével)',
      sosIdleLabel: 'TARTSD NYOMVA 3 MP-IG — SOS VÉSZJELZÉS',
      sosHoldingLabel: 'SOS indítása folyamatban... tartsd nyomva!',
      sosDispatchedLabel: 'SOS riasztás + élő GPS elküldve Anya és Apa telefonjára!',
      sosResetBtn: 'Alaphelyzet',
      tapHint: 'Kattints bármelyik színes Bento csempére a felolvasás előnézetéhez!',
      ageLabels: {
        AGE_6_7: '6–7 év',
        AGE_8_9: '8–9 év',
        AGE_10_11: '10–11 év',
        AGE_12_14: '12–14 év',
      },
      literacyLabels: {
        SYMBOLS_ONLY: 'Szimbólumok + Noémi hang',
        EARLY_READER_CAPS: 'NAGYBETŰS olvasó',
        STANDARD_TEXT: 'Normál (Outfit)',
      },
      tiles: [
        {
          id: 'module_family_caller',
          title: 'Családi Hívó',
          caps: 'CSALÁD HÍVÁS',
          status: 'Anya, Apa, Nagymama (+36/+43/+49)',
          ttsSample: 'Noémi: „Családi Hívó. Érintsd meg Anya, Apa vagy Nagymama hívásához!”',
          solidHex: '#148467',
          pastelHex: '#DCEFEA',
          borderHex: '#9FD4C5',
        },
        {
          id: 'module_timetable',
          title: 'Órarend',
          caps: 'ÓRAREND',
          status: '5 tanóra • 204-es terem',
          ttsSample: 'Noémi: „Órarend. Következő tanóra: Matematika a kétszáznégyes teremben.”',
          solidHex: '#CA7B08',
          pastelHex: '#F6E7CC',
          borderHex: '#E5C185',
        },
        {
          id: 'module_tasks',
          title: 'Feladatok',
          caps: 'FELADATOK +15P',
          status: '1 kész lecke = +15 perc játék',
          ttsSample: 'Noémi: „Feladatok és leckék. Ha elkészülsz, plusz tizenöt perc játékidőt kapsz!”',
          solidHex: '#1E6FD9',
          pastelHex: '#DCEBFC',
          borderHex: '#9EC3F5',
        },
        {
          id: 'module_safe_apps',
          title: 'Oktató Appok',
          caps: 'OKTATÓ APPOK',
          status: 'Duolingo, GeoGebra, Szótár',
          ttsSample: 'Noémi: „Biztonságos oktató alkalmazások: Duolingo, Szótár és Számológép.”',
          solidHex: '#7030A0',
          pastelHex: '#E6DCF5',
          borderHex: '#C2ACE6',
        },
        {
          id: 'module_gaming_hub',
          title: 'Gaming HUB',
          caps: 'JÁTÉK IDŐ',
          status: '45 perc maradt ma',
          ttsSample: 'Noémi: „Gaming Hub. Ma még negyvenöt perc szabad játékidőd van.”',
          solidHex: '#DE5B29',
          pastelHex: '#FCE2D7',
          borderHex: '#F2B49B',
        },
        {
          id: 'module_camera',
          title: 'Kamera & Fotó',
          caps: 'KAMERA',
          status: 'Küldés a családnak (<=250 KB)',
          ttsSample: 'Noémi: „Kamera. A képeid a telefonon maradnak, amíg meg nem nyomod a Küldés a családnak gombot.”',
          solidHex: '#118473',
          pastelHex: '#D8EFEA',
          borderHex: '#9AD2C7',
        },
        {
          id: 'module_friends_chat',
          title: 'Barátok Chat',
          caps: 'BARÁTOK',
          status: 'Kettős szülői kézfogás (2/2)',
          ttsSample: 'Noémi: „Barátok Chat. Csak a szülők által jóváhagyott barátokkal beszélgethetsz.”',
          solidHex: '#BF3475',
          pastelHex: '#FADCEB',
          borderHex: '#EBA7C8',
        },
        {
          id: 'module_safety',
          title: 'Biztonsági Zóna',
          caps: 'BIZTONSÁG',
          status: 'Otthon zóna • Akku: 84%',
          ttsSample: 'Noémi: „Biztonsági zóna rendben: Otthon vagy, a töltöttség nyolcvannégy százalék.”',
          solidHex: '#2B8A3E',
          pastelHex: '#DCF2E1',
          borderHex: '#A1D8AD',
        },
      ],
    },
    lifecycle: {
      kicker: 'ISKOLAI ÉLETÚT 6-TÓL 14 ÉVES KORIG',
      title: 'Nem „bébitelefon”: a felület együtt érik a gyermekeddel, miközben a védelem 100%-os marad.',
      subtitle:
        'A JUNEAR különválasztja a vizuális korcsoportot (AgeTier) és az olvasási segítséget (LiteracyMode) — így egyetlen gyermeknek sem kell szégyellnie a telefonját az osztálytársak előtt.',
      dyslexiaCalloutTitle: 'Diszlexiabarát, stigma-mentes szétválasztás + természetes „Noémi” magyar női hang',
      dyslexiaCalloutBody:
        'Egy 9–10 éves, olvasási nehézséggel küzdő gyermek is használhatja a kortársainak szóló Bento elrendezést Szimbólum + Hangos felolvasás vagy NAGYBETŰS móddal. A 52 előre rögzített, meleg tónusú magyar női hangklip (Noémi) internet nélkül is azonnal megszólal, online pedig Google WaveNet női hang egészíti ki.',
      tiers: [
        {
          tierKey: 'AGE_6_7',
          ageBadge: '6–7 év • Első osztály',
          title: 'Óriás vektorikonok & Családi gyorshívó sáv',
          desc: 'Olvasni még tanuló elsősöknek: nagy érintési felületek, kör alakú családi hívógombok, hangüzenetek és vektormatricák.',
          features: ['Szimbólum + Noémi felolvasás', '1-érintéses Anya / Apa / Nagymama hívás', '3 mp nyomva tartásos SOS sáv'],
        },
        {
          tierKey: 'AGE_8_9',
          ageBadge: '8–9 év • Alsó tagozat',
          title: 'Játékos, többszínű 2 oszlopos Bento kártyák',
          desc: 'Minden modul saját vidám pasztell fejlécet és élénk gombot kap, miközben az idegen appok és böngészők zárva maradnak.',
          features: ['8 elkülönített színkódolt modul', 'Házi feladat -> +15 perc játékidő jutalom', 'Kettős szülői kézfogásos barát-chat'],
        },
        {
          tierKey: 'AGE_10_11',
          ageBadge: '10–11 év • Felső tagozat kezdete',
          title: 'Órarend sáv teremszámmal & Önálló időkeret',
          desc: 'Önálló közlekedéshez és tanuláshoz: élő következő tanóra sáv, felszerelés-emlékeztető és átlátható napi Gaming kvótagyűrű.',
          features: ['Teremszám és határidő sáv felül', '+15 perc extra idő kérése indoklással', 'Otthon és Iskola geofence zónák'],
        },
        {
          tierKey: 'AGE_12_14',
          ageBadge: '12–14 év • Tinédzser mód',
          title: 'Kompakt widgetek & Midnight Cyber sötét téma',
          desc: 'Modern, letisztult sötét felület (#0F172A + neon cián), amely tiszteletben tartja a kiskamasz autonómiáját a szülői védőhálón belül.',
          features: ['Midnight Cyber sötét dizájn', 'Kompakt órarend, feladat és képernyőidő gyűrű', 'Private DNS családi webszűrés'],
        },
      ],
    },
    safeguards: {
      kicker: '8 ALAP + 2 BŐVÍTŐ VÉDELMI MODUL',
      title: 'Minden gyermekvédelmi réteg külön-külön kapcsolható, tanórán pedig automatikusan szűrt.',
      subtitle:
        'Nincs rejtett kiskapu, nincs reklám-azonosító (AD_ID), és nincs megkerülhető akadálymentesítési trükk.',
      cards: [
        {
          id: 'caller',
          badge: '1. MODUL • KOMMUNIKÁCIÓ',
          title: 'E.164 Családi Fehérlista & Sürgősségi Szülői Áttörés',
          desc: 'Csak a szülők által engedélyezett +36, +43 és +49 számok hívhatók, az idegen és csaló hívásokat a telefon hangtalanul elutasítja.',
          highlights: [
            'Sopron–Burgenland védelem: az osztrák +43650 / +43670 számok sosem íródnak át +36-ra',
            '2x Sürgősségi Áttörés: ha Anya vagy Apa 3 percen belül másodszor hív, néma módban is csörög',
          ],
          accentHex: '#148467',
          pastelHex: '#DCEFEA',
          borderHex: '#9FD4C5',
        },
        {
          id: 'timetable',
          badge: '2. MODUL • NAPIREND',
          title: 'Iskolai Órarend & 1-Érintéses Szünidő / Betegnap Felülbírálat',
          desc: 'Napi és heti órarend teremszámokkal és torna/rajz felszerelés-emlékeztetővel, esti alvászárral összehangolva.',
          highlights: [
            'Tanítási időben automatikus fókusz mód',
            'Szülői 1-érintéses Szünidő / Betegszabadság kapcsoló azonnal feloldja az iskolai zárat',
          ],
          accentHex: '#CA7B08',
          pastelHex: '#F6E7CC',
          borderHex: '#E5C185',
        },
        {
          id: 'tasks',
          badge: '3. MODUL • MOTIVÁCIÓ',
          title: 'Feladatok & +15 / +20 Perc Gaming Jutalom Motor',
          desc: 'A elvégzett házi feladat és házimunka szülői jóváhagyás után automatikusan növeli a gyermek aznapi Gaming HUB egyenlegét.',
          highlights: [
            'Lecke-kapu: amíg a kötelező lecke nincs kész, a Gaming HUB zárva marad',
            'Automatikus vagy fényképes/üzenetes szülői jóváhagyás',
          ],
          accentHex: '#1E6FD9',
          pastelHex: '#DCEBFC',
          borderHex: '#9EC3F5',
        },
        {
          id: 'gaming',
          badge: '4–5. MODUL • APPOK & KVÓTA',
          title: 'Biztonságos Oktató Appok vs. 5-Kapus Gaming HUB',
          desc: 'A Duolingo, GeoGebra és Szótár tanuláshoz mindig elérhető, míg a játékok szigorúan külön időkeret-gyűrű mögött futnak.',
          highlights: [
            '5-szintű kapu: <=15% Akku -> Tanóra Fókusz -> Lecke -> Alvászár (20:00–07:00) -> Napi perc kvóta',
            '1-érintéses „+15 perc kérés” közvetlenül a szülők PWA felületére',
          ],
          accentHex: '#DE5B29',
          pastelHex: '#FCE2D7',
          borderHex: '#F2B49B',
        },
        {
          id: 'camera',
          badge: '6. MODUL • ADATVÉDELEM',
          title: 'Helyi Kamera — Nulla Automatikus Felhő-Feltöltés',
          desc: 'A gyermek fotói kizárólag a telefon memóriájában maradnak, amíg ő maga rá nem nyom a „Küldés a családnak” gombra.',
          highlights: [
            'Automatikus veszteséges WebP tömörítés garantált <= 250 KB méretkorláttal (eur3)',
            'Tanárok a családi fotókhoz technológiailag sem férhetnek hozzá (!isTeacherRole)',
          ],
          accentHex: '#118473',
          pastelHex: '#D8EFEA',
          borderHex: '#9AD2C7',
        },
        {
          id: 'chat',
          badge: '7. MODUL • BARÁTOK',
          title: 'Kettős Szülői Kézfogásos Chat (Double-Parent Handshake)',
          desc: 'Két gyermek csak akkor válthat üzenetet, ha MINDKÉT család Társszülő Adminja kriptográfiailag jóváhagyta a barátságot.',
          highlights: [
            'Valós idejű szűrő blokkol minden webcímet (URL/TLD) és 7+ jegyű telefonszámot',
            '6–7 éveseknél kizárólag hangüzenet és egyedi vektormatricák',
          ],
          accentHex: '#BF3475',
          pastelHex: '#FADCEB',
          borderHex: '#EBA7C8',
        },
        {
          id: 'safety',
          badge: '8. MODUL • FIZIKAI BIZTONSÁG',
          title: '3 mp SOS Sáv, Geofence Zónák & <= 15% Akku Túlélő Mód',
          desc: 'Folyamatos 3000 ms nyomva tartást igénylő vészjelző (nulla zsebhívás), Otthon/Iskola zónafigyelés és automatikus vész-energiatakarékosság.',
          highlights: [
            '15% töltöttség alatt a telefon automatikusan lezár minden játékot, hogy maradjon akku SOS-re és szülői hívásra',
            '20% töltöttségnél vagy töltőre dugva automatikusan visszaáll',
          ],
          accentHex: '#2B8A3E',
          pastelHex: '#DCF2E1',
          borderHex: '#A1D8AD',
        },
        {
          id: 'extensions',
          badge: '9–10. BŐVÍTŐHELY • DNS & OLVASÁS',
          title: 'Natív Private DNS Webszűrő & Háromnyelvű Olvasás Edző',
          desc: 'Rendszerszintű DevicePolicyManager családi biztonságos keresés (Private DNS) és interaktív magyar/német/angol szövegértő gyakorló.',
          highlights: [
            'VPN-trükk nélkül, natív Android Enterprise DNS szűréssel',
            'Életkorhoz igazított rövid történetek Noémi felolvasásával és kérdésekkel',
          ],
          accentHex: '#3B4CCA',
          pastelHex: '#DFE3FA',
          borderHex: '#AEB7EE',
        },
      ],
    },
    roles: {
      kicker: '4 SZEREPKÖR • SZIGORÚ GDPR ADATVÉDELMI FALAK',
      title: 'A család összekapcsolódik — de minden felnőtt pontosan csak annyit lát, amennyi rá tartozik.',
      subtitle:
        'A Firebase EU (eur3) biztonsági szabályok (firestore.rules & storage.rules) szerverszinten garantálják a jogosultságok szétválasztását.',
      cards: [
        {
          id: 'coparent',
          badge: 'coParentUids • 2+ EGYENRANGÚ ADMIN',
          title: 'Társszülők (Anya & Apa)',
          platform: 'iOS / Android / Asztali PWA',
          summary: 'Teljes, szimmetrikus felügyeleti jog mindkét szülőnek — külön előfizetés és másodrendű fiók nélkül.',
          allowed: [
            'E.164 hívólista, feladatok, játékidő-kvóták és alvászár kezelése',
            'Kettős kézfogásos barát-jóváhagyás és élő GPS / SOS riasztások',
            '1-érintéses Szünidő / Betegnap felülbírálat és Anti-Brick vészfeloldás',
          ],
          blocked: ['Üzemeltetői fizetős csomag-átírás szerveroldali jogosultság nélkül'],
          accentHex: '#0077B5',
        },
        {
          id: 'grandparent',
          badge: 'familyMemberUids • OLVASÁSI FAL',
          title: 'Nagyszülők & Családtagok',
          platform: 'Védett Webes Olvasási Fal',
          summary: 'Örömteli családi kapcsolat bonyolult beállítások nélkül: csak a gyermek által megosztott képek és gyorshívás.',
          allowed: [
            'Gyermek által „Küldés a családnak” gombbal megosztott WebP fotók (<= 250 KB)',
            'Jóváhagyott családi gyorshívó kártyák közvetlen tárcsázással',
          ],
          blocked: [
            '0% hozzáférés az élő GPS koordinátákhoz és SOS telemetriához',
            '0% hozzáférés a kioszk szabályokhoz és az Offline feloldó kulcshoz',
          ],
          accentHex: '#2E9E43',
        },
        {
          id: 'teacher',
          badge: 'teacherUids • classCode (pl. SOPRON-3A)',
          title: 'Osztálytermi Pedagógus',
          platform: 'Tanári Fókusz Konzol PWA',
          summary: 'Kizárólag a szülő által engedélyezett tanítási időablakban (pl. H–P 07:45–15:30) segíti a nyugodt tanórát.',
          allowed: [
            'Tanórai Fókusz Zár be/kikapcsolása tanítási időben (ha nincs Szünidő mód)',
            '45 perces ideiglenes oktató-app feloldás (Kahoot!, Duolingo, GeoGebra)',
          ],
          blocked: [
            'SOHA nem lát GPS pozíciót, családi fotót (!isTeacherRole), telefonszámot, hívásnaplót vagy chatet',
            'Nem oldhat fel szülő által globálisan tiltólistára tett alkalmazást',
          ],
          accentHex: '#CA7B08',
        },
        {
          id: 'child',
          badge: 'childUid • VÉDETT AUTONÓMIA',
          title: 'Gyermek (6–14 év)',
          platform: 'Natív Android Kioszk & MDM',
          summary: 'Saját maga választhat színtémát, teljesíthet feladatokat extra játékidőért, és dönthet saját fotói megosztásáról.',
          allowed: [
            '5 színtéma szabad kiválasztása és +15 perc játékidő kérése',
            'Explicit fotómegosztás a családdal és 3 mp SOS segélykérés',
          ],
          blocked: [
            'Kioszk elhagyása, idegen APK telepítése, gyári visszaállítás vagy hívólista szerkesztése',
          ],
          accentHex: '#7C3AED',
        },
      ],
      matrixTitle: 'Szerveroldali GDPR Hozzáférési Mátrix (eur3)',
      matrixHeaders: ['Adatkör / Jogosultság', 'Társszülők (2+)', 'Nagyszülők', 'Pedagógus (classCode)'],
      matrixRows: [
        { scope: 'Élő GPS helyzet, Geofence & SOS napló', coparent: 'Teljes hozzáférés', grandparent: 'Tiltva (0%)', teacher: 'Tiltva (0%)' },
        { scope: 'Családi WebP fotófal (<= 250 KB)', coparent: 'Olvasás & kezelés', grandparent: 'Csak olvasás', teacher: 'Tiltva (!isTeacherRole)' },
        { scope: 'E.164 telefonszámok, hívásnapló & Chat', coparent: 'Teljes felügyelet', grandparent: 'Saját gyorshívó', teacher: 'Tiltva (0%)' },
        { scope: 'Tanórai Fókusz & 45p oktató app (H–P 07:45–15:30)', coparent: '1-Tap felülbírálat', grandparent: 'Tiltva (0%)', teacher: 'Engedélyezett (ha nincs Szünidő)' },
        { scope: 'Anti-Brick távoli & Offline 8 jegyű feloldókód', coparent: 'Kizárólagos jog', grandparent: 'Tiltva (0%)', teacher: 'Tiltva (0%)' },
      ],
    },
    mdmAndAntiBrick: {
      kicker: 'NATÍV ANDROID ENTERPRISE MDM & KETTŐS ANTI-BRICK GARANCIA',
      title: '100% valódi védelem gyári visszaállítás nélkül is — és garantált szülői vészkijárat offline módban.',
      subtitle:
        'A JUNEAR nem használ sebezhető AccessibilityService kattintás-szimulációt: a hivatalos Android DevicePolicyManager API-ra épül.',
      modes: [
        {
          badge: '1. MÓD • LEGGYORSABB',
          title: 'Google Play Alap Védelem',
          desc: 'Kezdőképernyő-rögzítés (LockTask), E.164 hívásszűrés, időkeret és feladat-motor normál telepítéssel 2 perc alatt.',
          ctaLabel: 'Lépések megtekintése',
          targetRoute: 'junear-setup',
        },
        {
          badge: '2. MÓD • ÚJ TELEFONHOZ',
          title: '6-Érintéses Gyári QR (Device Owner)',
          desc: 'Új vagy visszaállított Android készülék üdvözlőképernyőjén 6 érintéssel beolvasható QR-kód teljes eltávolítás-védelemmel.',
          ctaLabel: 'QR beüzemelési útmutató',
          targetRoute: 'junear-setup',
        },
        {
          badge: '3. MÓD • ADATVESZTÉS NÉLKÜL',
          title: 'Böngészős WebUSB Varázsló (/junear/usb-setup)',
          desc: 'Meglévő telefonon gyári törlés és parancssor nélkül aktiválja a Device Owner módot közvetlenül Chrome/Edge böngészőből USB-C kábellel.',
          ctaLabel: 'WebUSB varázsló leírása',
          targetRoute: 'junear-usb-setup',
        },
      ],
      antiBrickTitle: 'Kötelező Kettős Anti-Brick Szülői Vésznyitó (Soha nem ragadhat zárolva a telefon!)',
      antiBrickSubtitle:
        'Minden szülő jogos félelme: „Mi történik, ha elromlik a Wi-Fi vagy nincs térerő a hegyekben, és azonnal fel kell oldanom a gyermek telefonját?” A JUNEAR két független útvonalat ad:',
      remoteCardTitle: '1. Útvonal: 1-Kattintásos Távoli Felhő Feloldás (REMOTE_RELEASE)',
      remoteCardDesc:
        'A Szülői PWA-ból küldött parancs azonnal feloldja a LockTask módot, az alkalmazás-felfüggesztéseket és a Device Owner korlátozásokat, amint a készülék online.',
      offlineCardTitle: '2. Útvonal: 100% Offline 8 Jegyű HMAC-SHA256 Mesterkód',
      offlineCardDesc:
        '0% Wi-Fi, 0% mobilnet és SIM-kártya nélkül is működik! Érintsd meg 5-ször a gyermek képernyőjén a Kioszk Pajzs ikont, és írd be a Szülői PWA-ban látható napi RFC 4226 8 jegyű kódot (+/- 1 UTC nap óraeltérés-tűréssel).',
      sampleOfflineCodeLabel: 'Élő kriptográfiai példa (HMAC-SHA256): 7977-7033',
    },
    screenshots: {
      kicker: 'VALÓDI FELÜLETEK ELŐNÉZETE',
      title: 'Nézd meg a JUNEAR ökoszisztéma mind a 4 pillérét',
      subtitle: 'Többszínű gyermek Bento kezdőképernyő, életkori szintek, Társszülő PWA és Tanári Fókusz Konzol.',
      slides: [
        {
          index: 1,
          badge: 'GYERMEK KIOSZK',
          title: 'Többszínű Bento Kezdőképernyő & 3 mp SOS',
          caption: '8 színkódolt védett modul, családi gyorshívó és véletlen érintés ellen védett SOS sáv.',
        },
        {
          index: 2,
          badge: 'ÉLETKOR & MOTIVÁCIÓ',
          title: '4 Korcsoport, Noémi Hang & +15p Jutalom',
          caption: '6–14 éves korig skálázódó felület, diszlexiabarát olvasási módok és lecke-jutalom motor.',
        },
        {
          index: 3,
          badge: 'CSALÁDI VÉDŐHÁLÓ',
          title: 'Társszülő PWA, Geofence & Nagyszülői Fotófal',
          caption: 'Egyenrangú Anya/Apa adminisztráció, biztonsági zónák és <= 250 KB WebP családi fotófal.',
        },
        {
          index: 4,
          badge: 'ISKOLA & BIZTONSÁG',
          title: 'SOPRON-3A Tanári Fókusz & Offline 8 Jegyű Kód',
          caption: 'GDPR-fallal védett tanórai fókusz konzol és 100% offline Anti-Brick mesterkód.',
        },
      ],
    },
    pricing: {
      kicker: 'ÁTLÁTHATÓ CSALÁDI ÉS ISKOLAI CSOMAGOK',
      title: 'Egyetlen előfizetés a teljes családnak — reklámok és adatértékesítés nélkül.',
      subtitle: 'Minden csomag tartalmazza a 2+ egyenrangú Társszülő Admin hozzáférést és a Nagyszülői fotófalat.',
      gdprGateNote:
        'A 14 napos ingyenes próbaidőszak (trial) a kötelező, előre be nem jelölt GDPR 8. cikk szerinti szülői felügyeleti nyilatkozat elfogadása után azonnal aktiválódik.',
      plans: [
        {
          planKey: 'trial',
          badge: 'KOCKÁZATMENTES KEZDÉS',
          name: '14 Napos Családi Próba',
          price: '0 Ft',
          period: '14 napig, kártya nélkül',
          desc: 'Próbáld ki az összes védelmi modult, a 6-érintéses QR/WebUSB beüzemelést és a Szülői PWA-t.',
          features: ['Minden 8+2 Bento modul aktív', '2+ Társszülő + Nagyszülői fal', 'Kettős Anti-Brick védelem'],
        },
        {
          planKey: 'monthly',
          badge: 'RUGALMAS HAVI',
          name: 'Családi Havi',
          price: '2 490 Ft',
          period: '/ hó / család',
          desc: 'Bármikor lemondható havi védelem több gyermek és több szülő összehangolására.',
          features: ['Akár 6 Társszülő & 10 családtag', 'Élő Geofence & SOS értesítések', 'EU (eur3) felhő szinkron'],
        },
        {
          planKey: 'yearly',
          badge: 'LEGNÉPSZERŰBB (-33%)',
          name: 'Családi Éves',
          price: '19 900 Ft',
          period: '/ év (csak 1 658 Ft / hó)',
          desc: 'Teljes tanéven és nyári szüneten átívelő védelem a legjobb ár-érték aránnyal.',
          features: ['Minden Családi Havi funkció', '1-érintéses Szünidő / Betegnap mód', 'Elsőbbségi szülői támogatás'],
          featured: true,
        },
        {
          planKey: 'lifetime',
          badge: 'EGYSZERI DÍJ',
          name: 'Családi Örökös (6->14 év)',
          price: '59 900 Ft',
          period: 'egyszeri díj, havidíj nélkül',
          desc: 'Első osztálytól a nyolcadikos ballagásig — egyszer fizeted ki, végigkíséri a gyermeket.',
          features: ['Örökös hozzáférés minden frissítéshez', '4 korcsoport váltás 6-tól 14 évesig', '0 Ft további havidíj'],
        },
        {
          planKey: 'school_pilot',
          badge: 'ISKOLÁKNAK & OSZTÁLYOKNAK',
          name: 'Iskolai Pilot (school_pilot)',
          price: 'Díjmentes',
          period: 'partner általános iskoláknak',
          desc: 'Tanári Fókusz Konzol osztályfőnököknek (classCode) teljes GDPR adatvédelmi fallal.',
          features: ['45 perces oktató-app feloldás', 'Tanórai Fókusz Zár (H–P időablak)', 'Garantált 0% hozzáférés magánadatokhoz'],
        },
      ],
    },
    faq: {
      kicker: 'GYAKRAN ISMÉTELT SZÜLŐI & ISKOLAI KÉRDÉSEK',
      title: 'Minden, amit a biztonságos első telefonról tudni érdemes',
      subtitle: 'Őszinte technikai válaszok szülőknek, nagyszülőknek és pedagógusoknak.',
      items: [
        {
          q: 'Kell-e gyári visszaállítást (factory reset) csinálnom a gyermek meglévő telefonján?',
          a: 'Nem kötelező! A /junear/usb-setup oldalon elérhető Böngészős WebUSB Varázslóval Chrome vagy Edge böngészőből, egyetlen USB-C kábellel adatvesztés nélkül is aktiválhatod a teljes Device Owner védelmet (a beállítás idejére ideiglenesen eltávolított Google-fiók mellett). Új telefon esetén a 6-érintéses QR-kód a leggyorsabb.',
        },
        {
          q: 'Mi történik, ha nincs internet vagy lemerül a SIM-kártya, és azonnal fel akarom oldani a telefont?',
          a: 'Erre szolgál a Kötelező Kettős Anti-Brick Vésznyitó 2. útvonala: érintsd meg gyorsan 5-ször a gyermek képernyőjén a Kioszk Pajzs jelvényt, és írd be a saját Szülői PWA-dban megjelenő 8 jegyű HMAC-SHA256 mesterkódot. A matematikai ellenőrzés 100%-ban offline fut le.',
        },
        {
          q: 'Elolvashatja-e a tanár a gyermek üzeneteit, fotóit vagy láthatja-e a GPS helyzetét?',
          a: 'Soha. A Firebase EU (eur3) biztonsági szabályok (firestore.rules és storage.rules !isTeacherRole) szerverszinten tiltják a tanárok hozzáférését a GPS-hez, fotókhoz, névjegyekhez, hívásnaplóhoz és chatekhez. A tanár kizárólag a szülő által megadott tanítási időablakban (allowedSchoolWindow) kapcsolhat tanórai fókuszt vagy 45 perces tanuló-app feloldást.',
        },
        {
          q: 'Mi történik, ha a gyermek beteg és otthon marad hétköznap délelőtt?',
          a: 'Bármelyik Társszülő 1 érintéssel bekapcsolhatja a „Szünidő / Betegszabadság” módot a Szülői PWA-ban. Ez azonnal felfüggeszti az osztálytermi fókusz zárat, így az otthon pihenő gyermeket nem zárja le távolról az iskolai órarend.',
        },
        {
          q: 'Működik-e a Szülői Központ iPhone-ról (iOS) is, ha a gyermeknek Android telefonja van?',
          a: 'Igen! Míg a gyermek védett telefonja natív Androidon fut, a JUNEAR Szülői Központ modern Progressive Web App (PWA), amely iPhone-on (Safari kezdőképernyőre téve), Androidon és asztali gépen is teljes értékűen működik.',
        },
        {
          q: 'Hogyan működik az osztrák (+43) és magyar (+36) telefonszámok kezelése a határ mentén?',
          a: 'A JUNEAR speciális Sopron–Burgenland–Németország E.164 normalizálóval rendelkezik: helyesen kezeli a belföldi 06 / 0 előhívókat, és soha nem írja át az osztrák +43 650 (Magenta) vagy +43 670 (Spusu) számokat magyar +36-os számra.',
        },
      ],
    },
    finalCta: {
      title: 'Állítsd be a biztonságos első telefont nyugodt szívvel.',
      subtitle:
        'Válaszd a 6-érintéses gyári QR-kódot új készülékhez, vagy a böngészős WebUSB varázslót meglévő telefonhoz.',
      setupBtn: 'Teljes Beállítási Útmutató megnyitása',
      usbBtn: 'WebUSB Telepítő (/junear/usb-setup)',
      legalHeading: 'JUNEAR Kötelező EU GDPR 8. cikk szerinti jogi dokumentumok (Bányai Gábor • 9400 Sopron):',
      privacyLabel: 'Adatkezelési Tájékoztató (GDPR 8. cikk)',
      termsLabel: 'Általános Szerződési Feltételek (ÁSZF)',
      operationsLabel: 'Működési és Gyermekvédelmi Szabályzat',
      deleteLabel: 'Fiók- és Gyermekadat-törlés (GDPR 17. cikk)',
    },
  },
  de: {
    meta: {
      title: 'JUNEAR — Kindersicheres erstes Smartphone (6–14 Jahre) | EU-DSGVO & Eltern-Schutznetz | gabba',
      description:
        'Europäisches (eur3), 100% Google-Play-Families-konformes Kinder-Smartphone-Ökosystem für 6–14 Jahre: 4 Altersstufen, legastheniefreundliche Lesemodi, 2+ Co-Parents, Großeltern-Fotowand, Schul-Fokus und dualer Anti-Brick-Notausgang.',
    },
    breadcrumbHome: 'Startseite',
    hero: {
      euBadge: 'EU-Rechenzentrum (eur3) • DSGVO Art. 8 Konform',
      playBadge: '100% Google Play Families • 0% AD_ID & Werbung',
      title: 'Das sichere erste Smartphone, das von 6 bis 14 Jahren mit Ihrem Kind mitwächst.',
      subtitle:
        'Farbenfrohe Bento-Oberfläche für das Kind — gleichberechtigtes PWA-Cockpit für beide Elternteile, geschützte Fotowand für Großeltern und DSGVO-getrennter Unterrichtsfokus für Schulen.',
      primaryCta: 'Einrichtungsanleitung (QR & PWA)',
      usbCta: 'WebUSB 1-Klick-Einrichtung',
      secondaryCta: '8+2 Schutzmodule entdecken',
      trustPills: [
        'Grenzüberschreitende E.164-Whitelist (+43 / +49 / +36)',
        'Nativer Device-Owner-MDM (ohne Accessibility-Tricks)',
        'Offline 8-stelliger HMAC-Notfallcode auch ohne SIM',
      ],
    },
    simulator: {
      kicker: 'INTERAKTIVER LIVE-TELEFON-SIMULATOR — DIREKT AUSPROBIEREN',
      themeLabel: '5 wählbare Kinder-Farbthemen',
      ageLabel: '4 Altersstufen (AgeTier)',
      literacyLabel: '3 unabhängige Lesemodi',
      noemiVoiceBadge: 'Natürliche Sprachausgabe (Noémi / WaveNet Female) aktiv',
      kioskShieldBadge: 'Device-Owner-Kiosk aktiv (5x Tippen = Offline-Code)',
      timetableBanner: 'Nächste Stunde: Mathematik (Raum 204) • Zirkel mitnehmen',
      quotaBarLabel: 'Gaming-Kontingent: 45 / 60 Min. (+15m durch Hausaufgabe)',
      sosIdleLabel: '3 SEK. GEDRÜCKT HALTEN — SOS-NOTRUF',
      sosHoldingLabel: 'SOS wird ausgelöst... weiter halten!',
      sosDispatchedLabel: 'SOS-Alarm + Live-GPS an Mama & Papa gesendet!',
      sosResetBtn: 'Zurücksetzen',
      tapHint: 'Tippen Sie auf eine farbige Bento-Kachel für die Sprachvorschau!',
      ageLabels: {
        AGE_6_7: '6–7 J.',
        AGE_8_9: '8–9 J.',
        AGE_10_11: '10–11 J.',
        AGE_12_14: '12–14 J.',
      },
      literacyLabels: {
        SYMBOLS_ONLY: 'Symbole + Stimme',
        EARLY_READER_CAPS: 'GROSSBUCHSTABEN',
        STANDARD_TEXT: 'Standard (Outfit)',
      },
      tiles: [
        {
          id: 'module_family_caller',
          title: 'Familien-Anruf',
          caps: 'ANRUFEN',
          status: 'Mama, Papa, Oma (+43/+49/+36)',
          ttsSample: 'Sprachausgabe: „Familien-Telefon. Tippe hier, um Mama, Papa oder Oma anzurufen.“',
          solidHex: '#148467',
          pastelHex: '#DCEFEA',
          borderHex: '#9FD4C5',
        },
        {
          id: 'module_timetable',
          title: 'Stundenplan',
          caps: 'STUNDENPLAN',
          status: '5 Stunden • Raum 204',
          ttsSample: 'Sprachausgabe: „Stundenplan. Nächste Stunde Mathematik in Raum zweihundertvier.“',
          solidHex: '#CA7B08',
          pastelHex: '#F6E7CC',
          borderHex: '#E5C185',
        },
        {
          id: 'module_tasks',
          title: 'Aufgaben',
          caps: 'AUFGABEN +15M',
          status: 'Hausaufgabe = +15 Min. Bonus',
          ttsSample: 'Sprachausgabe: „Aufgaben. Erledigte Hausaufgaben bringen fünfzehn Bonusminuten!“',
          solidHex: '#1E6FD9',
          pastelHex: '#DCEBFC',
          borderHex: '#9EC3F5',
        },
        {
          id: 'module_safe_apps',
          title: 'Lern-Apps',
          caps: 'LERN-APPS',
          status: 'Duolingo, GeoGebra, Lexikon',
          ttsSample: 'Sprachausgabe: „Sichere Lern-Apps: Duolingo, GeoGebra und Wörterbuch.“',
          solidHex: '#7030A0',
          pastelHex: '#E6DCF5',
          borderHex: '#C2ACE6',
        },
        {
          id: 'module_gaming_hub',
          title: 'Gaming HUB',
          caps: 'SPIELZEIT',
          status: '45 Min. heute übrig',
          ttsSample: 'Sprachausgabe: „Gaming Hub. Du hast heute noch fünfundvierzig Minuten Spielzeit.“',
          solidHex: '#DE5B29',
          pastelHex: '#FCE2D7',
          borderHex: '#F2B49B',
        },
        {
          id: 'module_camera',
          title: 'Kamera & Fotos',
          caps: 'KAMERA',
          status: 'An Familie senden (<=250 KB)',
          ttsSample: 'Sprachausgabe: „Kamera. Fotos werden nur geteilt, wenn du auf An Familie senden tippst.“',
          solidHex: '#118473',
          pastelHex: '#D8EFEA',
          borderHex: '#9AD2C7',
        },
        {
          id: 'module_friends_chat',
          title: 'Freunde-Chat',
          caps: 'FREUNDE',
          status: 'Doppel-Freigabe aktiv (2/2)',
          ttsSample: 'Sprachausgabe: „Freunde-Chat mit doppelter Eltern-Freigabe und Link-Schutz.“',
          solidHex: '#BF3475',
          pastelHex: '#FADCEB',
          borderHex: '#EBA7C8',
        },
        {
          id: 'module_safety',
          title: 'Sicherheitszone',
          caps: 'SICHERHEIT',
          status: 'Zuhause • Akku: 84%',
          ttsSample: 'Sprachausgabe: „Sicherheitszone Zuhause aktiv, Akkustand vierundachtzig Prozent.“',
          solidHex: '#2B8A3E',
          pastelHex: '#DCF2E1',
          borderHex: '#A1D8AD',
        },
      ],
    },
    lifecycle: {
      kicker: 'SCHULZEIT-BEGLEITER VON 6 BIS 14 JAHREN',
      title: 'Kein „Babyhandy“: Die Oberfläche reift mit Ihrem Kind, während der Schutz lückenlos bleibt.',
      subtitle:
        'Alterslayout (AgeTier) und Lesehilfe (LiteracyMode) sind komplett entkoppelt — ideal bei Lese-Rechtschreib-Schwäche ohne jedes Stigma.',
      dyslexiaCalloutTitle: 'Entkoppelte Lesemodi + warme weibliche Sprachausgabe',
      dyslexiaCalloutBody:
        'Auch ein 10-jähriges Kind mit Legasthenie kann das moderne Layout seiner Altersgruppe mit reinen Symbolen + Sprachausgabe oder Großbuchstaben kombinieren.',
      tiers: [
        {
          tierKey: 'AGE_6_7',
          ageBadge: '6–7 Jahre • Volksschule Start',
          title: 'Große Vektor-Kacheln & Familien-Schnellwahl',
          desc: 'Für Erstklässler: riesige Symbole, direkte Foto-Kurzwahl zu den Eltern und reine Sprach-/Sticker-Nachrichten.',
          features: ['Symbole + Vorlesestimme', '1-Tap Mama / Papa / Oma Anruf', '3-Sekunden-Halte-SOS'],
        },
        {
          tierKey: 'AGE_8_9',
          ageBadge: '8–9 Jahre • Grundstufe',
          title: 'Farbenfrohes 2-Spalten-Bento-Raster',
          desc: 'Jedes Modul trägt seine eigene fröhliche Pastell- und Akzentfarbe ohne offene Browser oder App-Stores.',
          features: ['8 farbcodierte Schutzmodule', 'Hausaufgaben -> +15 Min. Spielbonus', 'Doppel-Freigabe im Freunde-Chat'],
        },
        {
          tierKey: 'AGE_10_11',
          ageBadge: '10–11 Jahre • Mittelstufe',
          title: 'Stundenplan-Banner & eigenes Zeitbudget',
          desc: 'Mit Raumnummern, Materialerinnerungen und transparentem Tagesring für den Gaming HUB.',
          features: ['Raumnummern & Fristen im Kopfbereich', '+15 Min. Anfrage mit Begründung', 'Zuhause- & Schul-Geofence'],
        },
        {
          tierKey: 'AGE_12_14',
          ageBadge: '12–14 Jahre • Teen-Modus',
          title: 'Kompakte Top-Widgets & Midnight Cyber Dark-Theme',
          desc: 'Cooles dunkles Design (#0F172A + Neon-Cyan), das Teenagern Selbstständigkeit im geschützten Rahmen gibt.',
          features: ['Midnight Cyber Dunkelmodus', 'Kompakter Screen-Time-Ring', 'Nativer Private-DNS-Webfilter'],
        },
      ],
    },
    safeguards: {
      kicker: '8 KERNMODULE + 2 ERWEITERUNGEN',
      title: 'Jede Schutzschicht einzeln steuerbar — im Unterricht automatisch gefiltert.',
      subtitle: 'Keine Werbe-ID (AD_ID), kein Profiling und kein Missbrauch der Android-Bedienungshilfen.',
      cards: [
        {
          id: 'caller',
          badge: 'MODUL 1 • TELEFONIE',
          title: 'E.164 Familien-Whitelist & Dringender Eltern-Durchbruch',
          desc: 'Nur freigegebene +43, +49 und +36 Nummern kommen durch; unbekannte Nummern werden lautlos abgewiesen.',
          highlights: [
            'Österreich-Schutz: +43650 (Magenta) & +43670 (Spusu) Nummern bleiben exakt erhalten',
            '2x Notfall-Durchbruch: Ruft ein Elternteil binnen 3 Min. zweimal an, klingelt es trotz Lautlos-Modus',
          ],
          accentHex: '#148467',
          pastelHex: '#DCEFEA',
          borderHex: '#9FD4C5',
        },
        {
          id: 'timetable',
          badge: 'MODUL 2 • ALLTAG',
          title: 'Stundenplan & 1-Tap Ferien-/Krankheitstag-Schalter',
          desc: 'Unterrichtszeiten, Räume und Turnbeutel-Erinnerungen perfekt abgestimmt mit der Nachtruhe.',
          highlights: [
            'Automatischer Fokus während der Unterrichtszeit',
            '1-Tap Eltern-Übersteuerung hebt bei Krankheit oder Ferien jede Schulsperre sofort auf',
          ],
          accentHex: '#CA7B08',
          pastelHex: '#F6E7CC',
          borderHex: '#E5C185',
        },
        {
          id: 'tasks',
          badge: 'MODUL 3 • MOTIVATION',
          title: 'Aufgaben-Checkliste & +15 / +20 Min. Gaming-Belohnung',
          desc: 'Bestätigte Hausaufgaben schreiben dem Kind sofort zusätzliche Spielminuten gut.',
          highlights: [
            'Hausaufgaben-Sperre vor dem Gaming HUB',
            'Sofort-Freigabe oder Eltern-Bestätigung per PWA',
          ],
          accentHex: '#1E6FD9',
          pastelHex: '#DCEBFC',
          borderHex: '#9EC3F5',
        },
        {
          id: 'gaming',
          badge: 'MODUL 4–5 • APPS & ZEIT',
          title: 'Sichere Lern-Apps vs. 5-Stufen Gaming HUB',
          desc: 'Duolingo, GeoGebra und Wörterbuch bleiben verfügbar, Spiele laufen strikt im Tageskontingent.',
          highlights: [
            '5 Sperrstufen: <=15% Akku -> Schulfokus -> Hausaufgaben -> Nachtruhe -> Tageskontingent',
            '1-Tap „+15 Min. Anfrage“ direkt an beide Elternteile',
          ],
          accentHex: '#DE5B29',
          pastelHex: '#FCE2D7',
          borderHex: '#F2B49B',
        },
        {
          id: 'camera',
          badge: 'MODUL 6 • PRIVATSPHÄRE',
          title: 'Lokale Kamera — Null Auto-Upload in die Cloud',
          desc: 'Fotos bleiben lokal auf dem Gerät, bis das Kind bewusst auf „An Familie senden“ tippt.',
          highlights: [
            'Garantierte <= 250 KB WebP-Komprimierung im EU-Speicher (eur3)',
            'Technisch gesperrt für Lehrkräfte (!isTeacherRole in storage.rules)',
          ],
          accentHex: '#118473',
          pastelHex: '#D8EFEA',
          borderHex: '#9AD2C7',
        },
        {
          id: 'chat',
          badge: 'MODUL 7 • FREUNDE',
          title: 'Freunde-Chat mit Doppelter Eltern-Freigabe',
          desc: 'Chats zwischen zwei Kindern öffnen sich erst, wenn die Eltern BEIDER Familien aktiv zustimmen.',
          highlights: [
            'Blockiert automatisch Weblinks (URLs) und Telefonnummern ab 7 Ziffern',
            'Für 6–7 Jahre ausschließlich Sprachnachrichten und Vektor-Sticker',
          ],
          accentHex: '#BF3475',
          pastelHex: '#FADCEB',
          borderHex: '#EBA7C8',
        },
        {
          id: 'safety',
          badge: 'MODUL 8 • NOTFALLSCHUTZ',
          title: '3-Sekunden-SOS, Geofence & <= 15% Akku-Notmodus',
          desc: '3000 ms Halte-SOS gegen Hosentaschen-Anrufe, Sicherheitszonen und automatischer Energiespar-Schutz.',
          highlights: [
            'Ab <= 15% Akku werden Spiele gesperrt, damit Reserve für SOS & Elternanrufe bleibt',
            'Automatische Rückkehr ab 20% Akkustand oder am Ladegerät',
          ],
          accentHex: '#2B8A3E',
          pastelHex: '#DCF2E1',
          borderHex: '#A1D8AD',
        },
        {
          id: 'extensions',
          badge: 'SLOTS 9–10 • DNS & LESEN',
          title: 'Private-DNS-Webfilter & Dreisprachiger Lese-Coach',
          desc: 'Nativer DevicePolicyManager Safe-Search-DNS-Filter und interaktives Lesetraining (HU/DE/EN).',
          highlights: [
            'Systemweiter Familienschutz ohne instabile VPN-Apps',
            'Altersgerechte Lesetexte mit Verständnisfragen',
          ],
          accentHex: '#3B4CCA',
          pastelHex: '#DFE3FA',
          borderHex: '#AEB7EE',
        },
      ],
    },
    roles: {
      kicker: '4 ROLLEN • STRENGE DSGVO-SCHUTZMAUERN',
      title: 'Familie und Schule verbunden — mit klaren Datenschutzgrenzen für jede Rolle.',
      subtitle: 'Serverseitig durchgesetzt in Firebase EU (eur3) über firestore.rules und storage.rules.',
      cards: [
        {
          id: 'coparent',
          badge: 'coParentUids • 2+ GLEICHBERECHTIGT',
          title: 'Co-Parents (Mama & Papa)',
          platform: 'iOS / Android / Desktop PWA',
          summary: 'Volle, gleichberechtigte Admin-Rechte für beide Elternteile auf jedem Endgerät.',
          allowed: [
            'E.164-Whitelist, Aufgaben, Spielzeitkontingente & Schlafenszeit',
            'Doppel-Freigabe für Kinderfreunde sowie Live-GPS & SOS',
            '1-Tap Ferien-/Krankheitsmodus & Anti-Brick-Notfreigabe',
          ],
          blocked: ['Manuelle Lizenz-Überschreibung ohne Operator-Rechte'],
          accentHex: '#0077B5',
        },
        {
          id: 'grandparent',
          badge: 'familyMemberUids • LESEWAND',
          title: 'Großeltern & Verwandte',
          platform: 'Geschützte Familien-Lesewand',
          summary: 'Teilhabe am Familienleben ohne komplizierte Menüs: geteilte Kinderfotos und Direktwahl.',
          allowed: [
            'Vom Kind aktiv geteilte WebP-Fotos (<= 250 KB)',
            'Freigegebene Familien-Kurzwahlkarten',
          ],
          blocked: [
            '0% Zugriff auf Live-GPS-Standorte und SOS-Alarme',
            '0% Zugriff auf MDM-Regeln und Offline-Entsperrcodes',
          ],
          accentHex: '#2E9E43',
        },
        {
          id: 'teacher',
          badge: 'teacherUids • classCode (z.B. SOPRON-3A)',
          title: 'Klassenlehrkraft',
          platform: 'Lehrer-Fokus-Konsole PWA',
          summary: 'Wirkt ausschließlich innerhalb des erlaubten Schulfensters (z.B. Mo–Fr 07:45–15:30).',
          allowed: [
            'Unterrichts-Fokussperre im Schulfenster (sofern kein Ferienmodus aktiv)',
            '45-Minuten-Freigabe für Lern-Apps (Kahoot!, Duolingo, GeoGebra)',
          ],
          blocked: [
            'NIEMALS Zugriff auf GPS, Fotos (!isTeacherRole), Kontakte, Anrufe oder Chats',
            'Kann elternseitig gesperrte Apps nicht entsperren',
          ],
          accentHex: '#CA7B08',
        },
        {
          id: 'child',
          badge: 'childUid • GESCHÜTZTE AUTONOMIE',
          title: 'Kind (6–14 Jahre)',
          platform: 'Nativer Android-Kiosk & MDM',
          summary: 'Wählt sein Farbthema selbst, sammelt Bonuszeit und teilt Fotos bewusst mit der Familie.',
          allowed: [
            '5 Farbthemen wählen & +15 Min. Spielzeit anfragen',
            'Bewusstes Fototeilen & 3-Sekunden-SOS-Notruf',
          ],
          blocked: ['Kiosk beenden, fremde APKs installieren oder Werksreset ausführen'],
          accentHex: '#7C3AED',
        },
      ],
      matrixTitle: 'Serverseitige DSGVO-Zugriffsmatrix (eur3)',
      matrixHeaders: ['Datenbereich', 'Co-Parents (2+)', 'Großeltern', 'Lehrkraft (classCode)'],
      matrixRows: [
        { scope: 'Live-GPS, Sicherheitszonen & SOS', coparent: 'Vollzugriff', grandparent: 'Gesperrt (0%)', teacher: 'Gesperrt (0%)' },
        { scope: 'Familien-Fotowand (WebP <= 250 KB)', coparent: 'Lesen & Verwalten', grandparent: 'Nur Lesen', teacher: 'Gesperrt (!isTeacherRole)' },
        { scope: 'E.164 Rufnummern, Anrufliste & Chats', coparent: 'Volle Aufsicht', grandparent: 'Eigene Kurzwahl', teacher: 'Gesperrt (0%)' },
        { scope: 'Schulfokus & 45m Lern-Apps (Mo–Fr 07:45–15:30)', coparent: '1-Tap Override', grandparent: 'Gesperrt (0%)', teacher: 'Erlaubt (außer Ferien)' },
        { scope: 'Anti-Brick Remote & Offline 8-Stellen-Code', coparent: 'Exklusiv', grandparent: 'Gesperrt (0%)', teacher: 'Gesperrt (0%)' },
      ],
    },
    mdmAndAntiBrick: {
      kicker: 'NATIVER DEVICE-OWNER-MDM & DUALE ANTI-BRICK-GARANTIE',
      title: 'Echter Schutz auch ohne Werksreset — inklusive 100% Offline-Notausgang für Eltern.',
      subtitle: 'Offizielle Android Enterprise DevicePolicyManager APIs statt umgehbarer Bedienungshilfen.',
      modes: [
        {
          badge: 'MODUS 1 • SCHNELLSTART',
          title: 'Google Play Standard-Schutz',
          desc: 'Startbildschirm-Pinning, E.164-Anruffilter, Aufgaben-Bonus und Spielzeit-Ring in 2 Minuten eingerichtet.',
          ctaLabel: 'Schritte ansehen',
          targetRoute: 'junear-setup',
        },
        {
          badge: 'MODUS 2 • NEUGERÄT',
          title: '6-Tap Werks-QR (Device Owner)',
          desc: 'Auf neuen oder zurückgesetzten Telefonen aktiviert 6-maliges Tippen am Willkommensbildschirm den vollen Schutz.',
          ctaLabel: 'QR-Anleitung öffnen',
          targetRoute: 'junear-setup',
        },
        {
          badge: 'MODUS 3 • OHNE DATENVERLUST',
          title: 'Browser-WebUSB-Assistent (/junear/usb-setup)',
          desc: 'Aktiviert Device Owner auf bestehenden Geräten direkt im Chrome/Edge-Browser per USB-C ohne Werksreset.',
          ctaLabel: 'WebUSB-Einrichtung',
          targetRoute: 'junear-usb-setup',
        },
      ],
      antiBrickTitle: 'Duales Anti-Brick Notfall-Entsperrsystem (Kein Aussperren möglich!)',
      antiBrickSubtitle:
        'Was passiert ohne WLAN oder Mobilfunk im Urlaub? JUNEAR bietet Eltern immer zwei unabhängige Rettungswege:',
      remoteCardTitle: 'Pfad 1: 1-Klick Remote-Freigabe (REMOTE_RELEASE)',
      remoteCardDesc:
        'Hebt über die Eltern-PWA sofort LockTask, App-Sperren und Device-Owner-Restriktionen auf, sobald das Handy online ist.',
      offlineCardTitle: 'Pfad 2: 100% Offline 8-Stelliger HMAC-SHA256 Mastercode',
      offlineCardDesc:
        'Funktioniert ohne WLAN, ohne mobile Daten und ohne SIM-Karte! Tippen Sie 5x auf das Kiosk-Schild am Kindergerät und geben Sie den RFC 4226 8-Stellen-Code ein.',
      sampleOfflineCodeLabel: 'Kryptografisches Beispiel (HMAC-SHA256): 7977-7033',
    },
    screenshots: {
      kicker: 'EINBLICK IN ALLE 4 OBERFLÄCHEN',
      title: 'So sieht das JUNEAR-Ökosystem im Alltag aus',
      subtitle: 'Farbenfroher Kinder-Kiosk, Altersstufen, Co-Parent-PWA und Lehrer-Fokus-Konsole.',
      slides: [
        {
          index: 1,
          badge: 'KINDER-KIOSK',
          title: 'Mehrfarbiger Bento-Startbildschirm & 3s SOS',
          caption: '8 farbcodierte Module, Familien-Schnellwahl und fehlalarmsichere SOS-Leiste.',
        },
        {
          index: 2,
          badge: 'ALTER & BONUS',
          title: '4 Altersstufen, Vorlesestimme & +15m Bonus',
          caption: 'Wächst von 6 bis 14 Jahren mit — inklusive entkoppelter Lesehilfe und Hausaufgaben-Belohnung.',
        },
        {
          index: 3,
          badge: 'ELTERN & FAMILIE',
          title: 'Co-Parent PWA, Geofence & Großeltern-Wand',
          caption: 'Gleichberechtigte Elternverwaltung, Sicherheitszonen und <= 250 KB WebP-Fotowand.',
        },
        {
          index: 4,
          badge: 'SCHULE & NOTFALL',
          title: 'SOPRON-3A Lehrer-Konsole & Offline-Mastercode',
          caption: 'DSGVO-geschützter Unterrichtsfokus und 8-stelliger Offline-Entsperrcode.',
        },
      ],
    },
    pricing: {
      kicker: 'TRANSPARENTE FAMILIEN- & SCHULTARIFE',
      title: 'Ein Tarif für die ganze Familie — garantiert werbefrei und ohne Datenverkauf.',
      subtitle: 'Alle Tarife beinhalten 2+ gleichberechtigte Co-Parent-Admins und die Großeltern-Lesewand.',
      gdprGateNote:
        'Die 14-tägige Testphase (trial) startet nach der ausdrücklichen elterlichen Einwilligung gemäß DSGVO Artikel 8.',
      plans: [
        {
          planKey: 'trial',
          badge: 'KOSTENLOS STARTEN',
          name: '14 Tage Familien-Test',
          price: '0 €',
          period: '14 Tage unverbindlich',
          desc: 'Alle Schutzmodule, QR/WebUSB-Setup und Eltern-PWA ohne Risiko testen.',
          features: ['Alle 8+2 Bento-Module', '2+ Co-Parents + Großeltern-Wand', 'Dualer Anti-Brick-Schutz'],
        },
        {
          planKey: 'monthly',
          badge: 'FLEXIBEL MONATLICH',
          name: 'Familie Monatlich',
          price: '6,49 €',
          period: '/ Monat / Familie',
          desc: 'Jederzeit kündbarer Komplettschutz für Kinder und Familie.',
          features: ['Bis zu 6 Co-Parents & 10 Verwandte', 'Live-Geofence & SOS-Alarme', 'EU (eur3) Cloud-Sync'],
        },
        {
          planKey: 'yearly',
          badge: 'EMPFEHLUNG (-33%)',
          name: 'Familie Jährlich',
          price: '49,90 €',
          period: '/ Jahr (nur 4,16 € / Monat)',
          desc: 'Sorgenfreier Begleiter durch das gesamte Schuljahr und die Ferien.',
          features: ['Alle Monats-Funktionen inklusive', '1-Tap Ferien- & Krankheitsmodus', 'Prioritäts-Elternsupport'],
          featured: true,
        },
        {
          planKey: 'lifetime',
          badge: 'EINMALZAHLUNG',
          name: 'Familie Lifetime (6->14 J.)',
          price: '149 €',
          period: 'einmalig, keine Folgekosten',
          desc: 'Einmal zahlen — von der Einschulung bis zum Teenageralter komplett abgedeckt.',
          features: ['Dauerhafter Vollzugang & Updates', 'Alle 4 Altersstufen inklusive', 'Keine monatlichen Gebühren'],
        },
        {
          planKey: 'school_pilot',
          badge: 'FÜR SCHULKLASSEN',
          name: 'Schul-Pilot (school_pilot)',
          price: 'Kostenfrei',
          period: 'für Partnerschulen',
          desc: 'Lehrer-Fokus-Konsole (classCode) mit strenger DSGVO-Datenschutzmauer.',
          features: ['45-Min. Lern-App-Freigabe', 'Unterrichts-Fokussperre (Mo–Fr)', 'Garantiert 0% Zugriff auf Privatdaten'],
        },
      ],
    },
    faq: {
      kicker: 'HÄUFIGE FRAGEN VON ELTERN & SCHULEN',
      title: 'Wichtige Antworten rund um Sicherheit, Einrichtung & Datenschutz',
      subtitle: 'Klar und transparent erklärt für Familien im DACH- & Grenzraum.',
      items: [
        {
          q: 'Muss ich das bestehende Handy meines Kindes auf Werkseinstellungen zurücksetzen?',
          a: 'Nein! Über /junear/usb-setup aktiviert der Browser-WebUSB-Assistent in Chrome oder Edge per USB-C-Kabel den vollen Device-Owner-Schutz ohne Datenverlust (lediglich Google-Konten werden für den Setup-Moment kurz abgemeldet). Bei Neugeräten geht der 6-Tap-QR-Code noch schneller.',
        },
        {
          q: 'Was passiert ohne WLAN oder SIM-Karte, wenn ich das Gerät sofort entsperren muss?',
          a: 'Tippen Sie am Kindergerät 5-mal auf das Kiosk-Schild-Abzeichen und geben Sie den 8-stelligen HMAC-SHA256-Mastercode aus Ihrer Eltern-PWA ein. Die Prüfung erfolgt zu 100% offline auf dem Gerät.',
        },
        {
          q: 'Können Lehrkräfte den Standort, Fotos oder Nachrichten meines Kindes einsehen?',
          a: 'Niemals. Die Firebase-Sicherheitsregeln (eur3, !isTeacherRole) blockieren jeden Lehrerzugriff auf GPS, Fotos, Kontakte, Anruflisten und Chats. Lehrkräfte können nur innerhalb des Schulfensters den Unterrichtsfokus oder 45-Minuten-Lern-Apps schalten.',
        },
        {
          q: 'Was, wenn mein Kind krank zu Hause bleibt?',
          a: 'Ein Tipp auf „Ferien- / Krankheitstag“ in der Eltern-PWA setzt alle Schulsperren sofort außer Kraft.',
        },
        {
          q: 'Funktioniert die Eltern-Zentrale auch auf dem iPhone (iOS)?',
          a: 'Ja! Die JUNEAR Eltern-Zentrale läuft als Progressive Web App (PWA) direkt auf iOS (Safari zum Home-Bildschirm), Android und am Desktop.',
        },
        {
          q: 'Werden österreichische (+43), deutsche (+49) und ungarische (+36) Nummern sauber getrennt?',
          a: 'Ja, der E.164-Normalisierer schützt insbesondere +43 650 (Magenta) und +43 670 (Spusu) vor jeder Fehlkonvertierung im Grenzgebiet.',
        },
      ],
    },
    finalCta: {
      title: 'Starten Sie jetzt mit einem sicheren ersten Smartphone.',
      subtitle: '6-Tap-QR für neue Telefone oder 1-Klick-WebUSB im Browser ohne Datenverlust.',
      setupBtn: 'Zur Einrichtungsanleitung',
      usbBtn: 'WebUSB-Assistent (/junear/usb-setup)',
      legalHeading: 'JUNEAR Pflichtdokumente gemäß EU-DSGVO Art. 8 (Bányai Gábor • 9400 Sopron, EU):',
      privacyLabel: 'Datenschutzerklärung (DSGVO Art. 8)',
      termsLabel: 'Allgemeine Geschäftsbedingungen (AGB)',
      operationsLabel: 'Betriebs- & Kinderschutzrichtlinie',
      deleteLabel: 'Konto- & Kinderdaten-Löschung (DSGVO Art. 17)',
    },
  },
  en: {
    meta: {
      title: 'JUNEAR — Child-Safe First Smartphone (Ages 6–14) | EU GDPR & Family Safety Net | gabba',
      description:
        'European (eur3), 100% Google Play Families compliant safe smartphone ecosystem for ages 6–14: 4 age tiers, decoupled dyslexia-friendly literacy modes, 2+ equal Co-Parents, Grandparent photo wall, Classroom Focus, and Dual Anti-Brick protection.',
    },
    breadcrumbHome: 'Home',
    hero: {
      euBadge: 'EU Data Residency (eur3) • GDPR Art. 8 Compliant',
      playBadge: '100% Google Play Families • 0% AD_ID & Ads',
      title: 'The safe first smartphone that grows with your child from age 6 to 14.',
      subtitle:
        'A playful multi-color Bento phone for your child — paired with an equal Co-Parent PWA for both parents, a read-only photo wall for grandparents, and a GDPR-walled classroom focus console for teachers.',
      primaryCta: 'Setup Guide (QR & PWA)',
      usbCta: 'WebUSB 1-Click Setup',
      secondaryCta: 'Explore 8+2 Safeguards',
      trustPills: [
        'Cross-border E.164 whitelist (+36 / +43 / +49)',
        'Native Device Owner MDM (zero Accessibility abuse)',
        'Offline 8-digit HMAC master unlock code (no SIM needed)',
      ],
    },
    simulator: {
      kicker: 'INTERACTIVE LIVE PHONE SIMULATOR — CLICK TO EXPLORE',
      themeLabel: '5 child-selectable themes',
      ageLabel: '4 Age Tiers (AgeTier)',
      literacyLabel: '3 decoupled reading modes',
      noemiVoiceBadge: 'Natural Hungarian female voice (Noémi) + WaveNet TTS active',
      kioskShieldBadge: 'Device Owner Kiosk Active (5-tap = Offline Unlock)',
      timetableBanner: 'Next lesson: Mathematics (Room 204) • Pack compass',
      quotaBarLabel: 'Gaming HUB quota: 45 / 60 min (+15m via homework)',
      sosIdleLabel: 'PRESS & HOLD 3 SEC — EMERGENCY SOS',
      sosHoldingLabel: 'Keep holding 3 seconds to dispatch SOS...',
      sosDispatchedLabel: 'SOS alert + live GPS sent to Mom & Dad!',
      sosResetBtn: 'Reset',
      tapHint: 'Click any playful colored Bento tile to preview spoken voice guidance!',
      ageLabels: {
        AGE_6_7: 'Ages 6–7',
        AGE_8_9: 'Ages 8–9',
        AGE_10_11: 'Ages 10–11',
        AGE_12_14: 'Ages 12–14',
      },
      literacyLabels: {
        SYMBOLS_ONLY: 'Symbols + Voice',
        EARLY_READER_CAPS: 'UPPERCASE Reader',
        STANDARD_TEXT: 'Standard (Outfit)',
      },
      tiles: [
        {
          id: 'module_family_caller',
          title: 'Family Caller',
          caps: 'CALL FAMILY',
          status: 'Mom, Dad, Grandma (+36/+43/+49)',
          ttsSample: 'Voice: “Family Caller. Tap here to call Mom, Dad, or Grandma!”',
          solidHex: '#148467',
          pastelHex: '#DCEFEA',
          borderHex: '#9FD4C5',
        },
        {
          id: 'module_timetable',
          title: 'Timetable',
          caps: 'TIMETABLE',
          status: '5 lessons • Room 204',
          ttsSample: 'Voice: “School Timetable. Next class is Mathematics in Room 204.”',
          solidHex: '#CA7B08',
          pastelHex: '#F6E7CC',
          borderHex: '#E5C185',
        },
        {
          id: 'module_tasks',
          title: 'Tasks & Chores',
          caps: 'TASKS +15M',
          status: '1 homework = +15 min play',
          ttsSample: 'Voice: “Tasks and Homework. Complete your task to earn 15 bonus play minutes!”',
          solidHex: '#1E6FD9',
          pastelHex: '#DCEBFC',
          borderHex: '#9EC3F5',
        },
        {
          id: 'module_safe_apps',
          title: 'Safe Study Apps',
          caps: 'STUDY APPS',
          status: 'Duolingo, GeoGebra, Dictionary',
          ttsSample: 'Voice: “Safe Educational Apps: Duolingo, GeoGebra, and Dictionary.”',
          solidHex: '#7030A0',
          pastelHex: '#E6DCF5',
          borderHex: '#C2ACE6',
        },
        {
          id: 'module_gaming_hub',
          title: 'Gaming HUB',
          caps: 'GAMING HUB',
          status: '45 min left today',
          ttsSample: 'Voice: “Gaming Hub. You have forty-five minutes of playtime left today.”',
          solidHex: '#DE5B29',
          pastelHex: '#FCE2D7',
          borderHex: '#F2B49B',
        },
        {
          id: 'module_camera',
          title: 'Safe Camera',
          caps: 'CAMERA',
          status: 'Send to Family (<=250 KB WebP)',
          ttsSample: 'Voice: “Camera. Photos stay private on your phone unless you tap Send to Family.”',
          solidHex: '#118473',
          pastelHex: '#D8EFEA',
          borderHex: '#9AD2C7',
        },
        {
          id: 'module_friends_chat',
          title: 'Friends Chat',
          caps: 'FRIENDS',
          status: 'Double Handshake (2/2)',
          ttsSample: 'Voice: “Friends Chat. Approved by both families with URL protection.”',
          solidHex: '#BF3475',
          pastelHex: '#FADCEB',
          borderHex: '#EBA7C8',
        },
        {
          id: 'module_safety',
          title: 'Safe Geofence',
          caps: 'SAFETY ZONE',
          status: 'Home Zone • Battery: 84%',
          ttsSample: 'Voice: “Safe Zone active: inside Home zone, battery at eighty-four percent.”',
          solidHex: '#2B8A3E',
          pastelHex: '#DCF2E1',
          borderHex: '#A1D8AD',
        },
      ],
    },
    lifecycle: {
      kicker: 'SCHOOL LIFECYCLE FROM AGE 6 TO 14',
      title: 'Never babyish: the UI matures with your child while technical safeguards stay airtight.',
      subtitle:
        'JUNEAR decouples visual AgeTier from reading assistance (LiteracyMode) — empowering neurodiverse and dyslexic learners with zero classroom stigma.',
      dyslexiaCalloutTitle: 'Orthogonal Age & Literacy Modes + Warm Offline Studio Voice',
      dyslexiaCalloutBody:
        'An older child with dyslexia can combine the sleek 10–11 or 12–14 Bento layout with Symbols + Tap-to-Speak or UPPERCASE labels, backed by 52 studio-natural Hungarian female voice clips (Noémi) offline and Google WaveNet Female synthesis online.',
      tiers: [
        {
          tierKey: 'AGE_6_7',
          ageBadge: 'Ages 6–7 • First Grade',
          title: 'Giant Vector Tiles & Family Quick-Dial Strip',
          desc: 'Built for early readers: oversized touch targets, circular family speed-dial portraits, and voice/vector-sticker messaging.',
          features: ['Symbols + Tap-to-Speak readout', '1-tap Mom / Dad / Grandma calling', '3-second continuous hold SOS bar'],
        },
        {
          tierKey: 'AGE_8_9',
          ageBadge: 'Ages 8–9 • Primary Years',
          title: 'Playful Multi-Color 2-Column Bento Grid',
          desc: 'Every module shines in its own distinct pastel header and solid accent pill — with zero open web browsers or app stores.',
          features: ['8 color-coded Bento modules', 'Homework -> +15 min Gaming reward', 'Double-Parent Handshake peer chat'],
        },
        {
          tierKey: 'AGE_10_11',
          ageBadge: 'Ages 10–11 • Upper Primary',
          title: 'Timetable Banner & Autonomous Quota Ring',
          desc: 'Designed for independent school commutes: room numbers, equipment reminders, and transparent daily Gaming HUB budget.',
          features: ['Live room number & deadline banner', '+15 min extension request flow', 'Home & School Haversine geofences'],
        },
        {
          tierKey: 'AGE_12_14',
          ageBadge: 'Ages 12–14 • Teen Mode',
          title: 'Compact Top Widgets & Midnight Cyber Dark Theme',
          desc: 'Sleek dark slate (#0F172A + neon cyan) aesthetic respecting pre-teen autonomy inside a tamper-proof Device Owner shell.',
          features: ['Midnight Cyber dark palette', 'Compact timetable & screen-time ring', 'Native Private DNS safe-search'],
        },
      ],
    },
    safeguards: {
      kicker: '8 CORE + 2 EXTENSION SAFEGUARD MODULES',
      title: 'Every child-safety module is individually toggleable and automatically filtered during school hours.',
      subtitle: 'Zero AD_ID tracking, zero ads, and zero fragile AccessibilityService workarounds.',
      cards: [
        {
          id: 'caller',
          badge: 'MODULE 1 • VOICE',
          title: 'E.164 Family Whitelist & Urgent Parent Breakthrough',
          desc: 'Only parent-approved +36, +43, and +49 numbers can call or be called; unknown/scam numbers are silently rejected.',
          highlights: [
            'Sopron HU/AT border guard: preserves Austrian +43650 / +43670 prefixes without rewriting',
            '2x Urgent Breakthrough: a 2nd Co-Parent call within 3 minutes rings even on silent/school focus',
          ],
          accentHex: '#148467',
          pastelHex: '#DCEFEA',
          borderHex: '#9FD4C5',
        },
        {
          id: 'timetable',
          badge: 'MODULE 2 • SCHEDULE',
          title: 'School Timetable & 1-Tap Vacation / Sick-Day Override',
          desc: 'Daily lessons, room numbers, and equipment reminders coordinated seamlessly with nightly bedtime locks.',
          highlights: [
            'Automatic weekday lesson focus',
            '1-Tap Vacation / Sick-Day switch lets Co-Parents suspend school locks instantly',
          ],
          accentHex: '#CA7B08',
          pastelHex: '#F6E7CC',
          borderHex: '#E5C185',
        },
        {
          id: 'tasks',
          badge: 'MODULE 3 • REWARDS',
          title: 'Homework Checklist & +15 / +20 Min Gaming Reward Engine',
          desc: 'Completed homework and chores verified by a Co-Parent automatically credit bonus minutes to Gaming HUB.',
          highlights: [
            'Homework Gate blocks games until mandatory study tasks are completed',
            'Supports instant auto-approve or Co-Parent review',
          ],
          accentHex: '#1E6FD9',
          pastelHex: '#DCEBFC',
          borderHex: '#9EC3F5',
        },
        {
          id: 'gaming',
          badge: 'MODULES 4–5 • APPS & QUOTA',
          title: 'Safe Educational Apps vs. 5-Gate Gaming HUB',
          desc: 'Duolingo, GeoGebra, and Dictionary stay accessible for learning while games sit behind a strict 5-gate evaluator.',
          highlights: [
            '5-Gate chain: <=15% Battery -> School Focus -> Homework -> Bedtime -> Daily Quota',
            '1-tap “+15 min request” sent straight to both Co-Parents',
          ],
          accentHex: '#DE5B29',
          pastelHex: '#FCE2D7',
          borderHex: '#F2B49B',
        },
        {
          id: 'camera',
          badge: 'MODULE 6 • PRIVACY',
          title: 'Local-First Camera — Zero Auto-Upload',
          desc: 'Photos remain strictly local on the device until the child explicitly taps “Send to Family”.',
          highlights: [
            'Iterative WebP compression guaranteed <= 250 KB in EU Storage (eur3)',
            'Cryptographically & rule-blocked from classroom teachers (!isTeacherRole)',
          ],
          accentHex: '#118473',
          pastelHex: '#D8EFEA',
          borderHex: '#9AD2C7',
        },
        {
          id: 'chat',
          badge: 'MODULE 7 • PEER CHAT',
          title: 'Double-Parent Handshake Friends Chat',
          desc: 'Two children can chat ONLY after Co-Parents from BOTH families explicitly approve the friendship.',
          highlights: [
            'Blocks all URLs/TLDs and 7+ digit phone numbers in real time',
            'Ages 6–7 & Symbols mode use voice notes and custom vector stickers only',
          ],
          accentHex: '#BF3475',
          pastelHex: '#FADCEB',
          borderHex: '#EBA7C8',
        },
        {
          id: 'safety',
          badge: 'MODULE 8 • PHYSICAL SAFETY',
          title: '3s Hold SOS Bar, Geofences & <= 15% Battery Survival Mode',
          desc: 'Pocket-dial-proof 3000 ms press-and-hold SOS bar, Home/School safe zones, and automatic low-battery survival.',
          highlights: [
            'At <= 15% unplugged battery, non-essential apps lock to preserve power for SOS & parent calls',
            'Recovers automatically at >= 20% charge or when plugged in',
          ],
          accentHex: '#2B8A3E',
          pastelHex: '#DCF2E1',
          borderHex: '#A1D8AD',
        },
        {
          id: 'extensions',
          badge: 'SLOTS 9–10 • DNS & LITERACY',
          title: 'Native Private DNS WebFilter & Trilingual Reading Coach',
          desc: 'System-level DevicePolicyManager Private DNS safe-search and guided HU/DE/EN reading comprehension coach.',
          highlights: [
            'Zero VPN battery drain — enforced natively via Android Enterprise',
            'Age-adaptive stories with spoken guidance and comprehension checks',
          ],
          accentHex: '#3B4CCA',
          pastelHex: '#DFE3FA',
          borderHex: '#AEB7EE',
        },
      ],
    },
    roles: {
      kicker: '4 ROLES • STRICT GDPR PRIVACY WALLS',
      title: 'Bridging Home, Extended Family & Classroom — with zero privacy leaks.',
      subtitle: 'Enforced server-side in Firebase EU (eur3) via firestore.rules and storage.rules.',
      cards: [
        {
          id: 'coparent',
          badge: 'coParentUids • 2+ EQUAL ADMINS',
          title: 'Co-Parents (Mom & Dad)',
          platform: 'iOS / Android / Desktop PWA',
          summary: 'Symmetric administrative authority for both parents across iPhone, Android, and desktop browsers.',
          allowed: [
            'Full control over E.164 whitelist, tasks, gaming quotas & bedtime',
            'Double-Parent Handshake approvals, live GPS & SOS alerts',
            '1-Tap Vacation / Sick-Day override & Dual Anti-Brick unlock',
          ],
          blocked: ['Paid plan escalation without server/operator verification'],
          accentHex: '#0077B5',
        },
        {
          id: 'grandparent',
          badge: 'familyMemberUids • READ-ONLY WALL',
          title: 'Grandparents & Extended Family',
          platform: 'Protected Read-Only Family Wall',
          summary: 'Warm family connection without complex settings: child-shared photos and one-tap calling.',
          allowed: [
            'View child-approved WebP photos (<= 250 KB) on the Family Wall',
            'One-tap calling via approved Speed-Dial cards',
          ],
          blocked: [
            '0% access to live GPS coordinates or SOS telemetry',
            '0% access to MDM policies or Offline Master Unlock secrets',
          ],
          accentHex: '#2E9E43',
        },
        {
          id: 'teacher',
          badge: 'teacherUids • classCode (e.g. SOPRON-3A)',
          title: 'Classroom Teacher',
          platform: 'Teacher Focus Console PWA',
          summary: 'Operates strictly inside parent-configured allowedSchoolWindow (e.g. Mon–Fri 07:45–15:30).',
          allowed: [
            'Toggle Classroom Focus Lock during school window (when not on Vacation)',
            'Grant 45-minute educational app unlocks (Kahoot!, Duolingo, GeoGebra)',
          ],
          blocked: [
            'ZERO read/write access to GPS, photos (!isTeacherRole), contacts, call logs, or chats',
            'Cannot unlock packages blacklisted by Co-Parents',
          ],
          accentHex: '#CA7B08',
        },
        {
          id: 'child',
          badge: 'childUid • PROTECTED AUTONOMY',
          title: 'Child (Ages 6–14)',
          platform: 'Native Android Kiosk & MDM',
          summary: 'Chooses color themes, earns bonus gaming minutes through tasks, and controls photo sharing.',
          allowed: [
            'Select among 5 color themes & request +15 min playtime',
            'Explicit “Send to Family” photo sharing & 3s SOS dispatch',
          ],
          blocked: ['Exiting kiosk, sideloading APKs, factory reset, or editing whitelist'],
          accentHex: '#7C3AED',
        },
      ],
      matrixTitle: 'Server-Enforced GDPR Access Matrix (eur3)',
      matrixHeaders: ['Data / Control Scope', 'Co-Parents (2+)', 'Grandparents', 'Teacher (classCode)'],
      matrixRows: [
        { scope: 'Live GPS, Geofences & SOS Log', coparent: 'Full Access', grandparent: 'Blocked (0%)', teacher: 'Blocked (0%)' },
        { scope: 'Shared Family Photo Wall (WebP <= 250 KB)', coparent: 'Read & Manage', grandparent: 'Read-Only', teacher: 'Blocked (!isTeacherRole)' },
        { scope: 'E.164 Contacts, Call History & Peer Chat', coparent: 'Full Oversight', grandparent: 'Own Speed-Dial', teacher: 'Blocked (0%)' },
        { scope: 'School Focus & 45m Study Apps (07:45–15:30)', coparent: '1-Tap Override', grandparent: 'Blocked (0%)', teacher: 'Allowed (unless Vacation)' },
        { scope: 'Anti-Brick Remote & Offline 8-Digit Code', coparent: 'Exclusive', grandparent: 'Blocked (0%)', teacher: 'Blocked (0%)' },
      ],
    },
    mdmAndAntiBrick: {
      kicker: 'NATIVE DEVICE OWNER MDM & DUAL ANTI-BRICK GUARANTEE',
      title: 'True tamper-proof protection without factory reset — plus a guaranteed offline parent escape hatch.',
      subtitle: 'Built 100% on official Android Enterprise DevicePolicyManager APIs with zero AccessibilityService abuse.',
      modes: [
        {
          badge: 'MODE 1 • FASTEST',
          title: 'Play Store Standard Setup',
          desc: 'Home Launcher pinning, E.164 call screening, homework rewards, and quota rings in 2 minutes.',
          ctaLabel: 'View Setup Steps',
          targetRoute: 'junear-setup',
        },
        {
          badge: 'MODE 2 • FRESH PHONE',
          title: '6-Tap Factory QR (Device Owner)',
          desc: 'Tap 6 times on a fresh or reset Android welcome screen to enroll full unremovable Device Owner protection.',
          ctaLabel: 'Open QR Guide',
          targetRoute: 'junear-setup',
        },
        {
          badge: 'MODE 3 • ZERO DATA WIPE',
          title: 'Browser WebUSB Wizard (/junear/usb-setup)',
          desc: 'Activate Device Owner on an existing phone directly from Chrome/Edge over USB-C with zero factory reset and zero CLI tools.',
          ctaLabel: 'Open WebUSB Guide',
          targetRoute: 'junear-usb-setup',
        },
      ],
      antiBrickTitle: 'Mandatory Dual Anti-Brick Escape Hatch (Your child’s phone can never stay stuck locked!)',
      antiBrickSubtitle:
        'What if Wi-Fi goes down or there is zero cell reception on a mountain trip? JUNEAR guarantees two independent parent unlock paths:',
      remoteCardTitle: 'Path 1: 1-Click Remote Cloud Release (REMOTE_RELEASE)',
      remoteCardDesc:
        'Dispatched from the Parent PWA to immediately clear LockTask, app suspensions, and Device Owner restrictions whenever online.',
      offlineCardTitle: 'Path 2: 100% Offline 8-Digit HMAC-SHA256 Master Unlock Code',
      offlineCardDesc:
        'Works with zero Wi-Fi, zero mobile data, and zero SIM card! Tap the Kiosk Shield badge 5 times on the child phone and enter the daily RFC 4226 8-digit code (+/- 1 UTC day drift tolerance).',
      sampleOfflineCodeLabel: 'Live Cryptographic Vector (HMAC-SHA256): 7977-7033',
    },
    screenshots: {
      kicker: 'ECOSYSTEM SCREENSHOT SHOWCASE',
      title: 'Explore all 4 pillars of JUNEAR',
      subtitle: 'Multi-color Child Bento Home, Age & Literacy progression, Co-Parent PWA, and Classroom Focus Console.',
      slides: [
        {
          index: 1,
          badge: 'CHILD KIOSK',
          title: 'Multi-Color Bento Home & 3s Hold SOS',
          caption: '8 distinct color-coded modules, family speed-dial strip, and pocket-dial-proof SOS bar.',
        },
        {
          index: 2,
          badge: 'LIFECYCLE & REWARDS',
          title: '4 Age Tiers, Studio Voice & +15m Rewards',
          caption: 'Scales from age 6 to 14 with decoupled literacy support and homework bonus minutes.',
        },
        {
          index: 3,
          badge: 'CO-PARENTS & GRANDPARENTS',
          title: 'Parent PWA, Safe Geofence & WebP Family Wall',
          caption: 'Equal Co-Parent admin parity, Haversine safe zones, and <= 250 KB WebP photo sharing.',
        },
        {
          index: 4,
          badge: 'CLASSROOM & ANTI-BRICK',
          title: 'SOPRON-3A Teacher Console & Offline Unlock',
          caption: 'GDPR-isolated classroom focus lock and 8-digit offline HMAC master unlock.',
        },
      ],
    },
    pricing: {
      kicker: 'TRANSPARENT FAMILY & SCHOOL PLANS',
      title: 'One fair plan for your whole family — zero ads, zero data brokering.',
      subtitle: 'Every family plan includes 2+ equal Co-Parent Admins and the Extended Family Photo Wall.',
      gdprGateNote:
        'The 14-day free trial unlocks immediately after completing the mandatory unchecked-by-default GDPR Article 8 parental authority declaration.',
      plans: [
        {
          planKey: 'trial',
          badge: 'RISK-FREE START',
          name: '14-Day Family Trial',
          price: '€0',
          period: 'for 14 days, no card required',
          desc: 'Experience all 8+2 Bento safeguards, QR/WebUSB provisioning, and the Co-Parent PWA.',
          features: ['All 8+2 Bento modules unlocked', '2+ Co-Parents + Grandparent Wall', 'Dual Anti-Brick protection'],
        },
        {
          planKey: 'monthly',
          badge: 'FLEXIBLE MONTHLY',
          name: 'Family Monthly',
          price: '€6.49',
          period: '/ month / family',
          desc: 'Cancel-anytime protection across your family devices.',
          features: ['Up to 6 Co-Parents & 10 relatives', 'Live Geofence & SOS alerts', 'EU (eur3) cloud sync'],
        },
        {
          planKey: 'yearly',
          badge: 'MOST POPULAR (-33%)',
          name: 'Family Yearly',
          price: '€49.90',
          period: '/ year (€4.16 / month)',
          desc: 'Full school-year and summer vacation coverage at the best annual value.',
          features: ['Everything in Family Monthly', '1-Tap Vacation & Sick-Day override', 'Priority family support'],
          featured: true,
        },
        {
          planKey: 'lifetime',
          badge: 'ONE-TIME PAYMENT',
          name: 'Family Lifetime (Ages 6->14)',
          price: '€149',
          period: 'one-time, zero recurring fees',
          desc: 'From first grade through eighth grade graduation with a single payment.',
          features: ['Lifetime access & feature updates', 'All 4 Age Tiers (6 to 14)', 'Zero monthly subscriptions'],
        },
        {
          planKey: 'school_pilot',
          badge: 'FOR SCHOOLS & CLASSES',
          name: 'School Pilot (school_pilot)',
          price: 'Free',
          period: 'for partner primary schools',
          desc: 'Classroom Focus Console for teachers (classCode) behind a strict GDPR privacy wall.',
          features: ['45-min educational app unlocks', 'Weekday Classroom Focus Lock', 'Guaranteed 0% access to private data'],
        },
      ],
    },
    faq: {
      kicker: 'PARENT & SCHOOL FAQ',
      title: 'Answers to every technical & privacy question',
      subtitle: 'Clear engineering guarantees for parents, grandparents, and educators.',
      items: [
        {
          q: 'Do I have to factory-reset my child’s existing phone?',
          a: 'No! Using the Browser WebUSB Wizard (/junear/usb-setup) in Chrome or Edge over a USB-C cable, you can activate full Device Owner protection without wiping photos or data (accounts are only temporarily signed out during the 60-second handshake). On a brand-new phone, 6-Tap QR provisioning is even faster.',
        },
        {
          q: 'What if there is no Wi-Fi or cell signal and I need to unlock the phone immediately?',
          a: 'Tap the Kiosk Shield badge 5 times on the child’s screen and enter the 8-digit HMAC-SHA256 Master Unlock Code displayed in your Parent PWA. Verification runs 100% offline with zero internet or SIM card required.',
        },
        {
          q: 'Can my child’s teacher see their GPS location, photos, contacts, or chats?',
          a: 'Never. Firebase EU (eur3) security rules (firestore.rules and storage.rules !isTeacherRole) block teachers from reading GPS, sharedPhotos, contacts, call logs, and chats. Teachers can only toggle Classroom Focus or grant 45-minute study app unlocks within your allowedSchoolWindow.',
        },
        {
          q: 'What happens when my child stays home sick on a Tuesday morning?',
          a: 'Either Co-Parent taps the 1-Tap “Vacation / Sick-Day Mode” toggle in the Parent PWA, immediately suspending all classroom focus locks.',
        },
        {
          q: 'Can Co-Parents manage JUNEAR from an iPhone (iOS)?',
          a: 'Yes! While the child kiosk runs natively on Android, the JUNEAR Parent Hub is a responsive Progressive Web App (PWA) working seamlessly on iOS (Add to Home Screen), Android, and desktop.',
        },
        {
          q: 'How does cross-border calling work between Hungary (+36), Austria (+43), and Germany (+49)?',
          a: 'JUNEAR includes a specialized E.164 normalizer with a Sopron HU/AT border safeguard so Austrian +43 650 / +43 670 numbers are never mis-normalized into +36.',
        },
      ],
    },
    finalCta: {
      title: 'Set up your child’s safe first phone with complete peace of mind.',
      subtitle: 'Choose 6-Tap Factory QR for new phones or the zero-wipe Browser WebUSB Wizard for existing phones.',
      setupBtn: 'Open Full Setup Guide',
      usbBtn: 'WebUSB Wizard (/junear/usb-setup)',
      legalHeading: 'Mandatory JUNEAR EU GDPR Art. 8 Legal Documents (Bányai Gábor • 9400 Sopron, EU):',
      privacyLabel: 'Privacy Notice (GDPR Art. 8)',
      termsLabel: 'Terms of Service',
      operationsLabel: 'Operations & Child Safety Policy',
      deleteLabel: 'Account & Child Data Deletion (GDPR Art. 17)',
    },
  },
};
