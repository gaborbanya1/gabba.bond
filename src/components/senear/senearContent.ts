/**
 * All visible copy of the SENEAR landing page (/senear), per language.
 * Business-relevant values (prices, trial length, platform requirement) live here,
 * so they can be reviewed in one place.
 */

export type SenearLang = 'hu' | 'en' | 'de';

export const SENEAR_PACKAGE_ID = 'bond.gabba.senear';
export const PLAY_STORE_URL = `https://play.google.com/store/apps/details?id=${SENEAR_PACKAGE_ID}`;
export const SENEAR_PAGE_URL = 'https://gabba.bond/senear';
export const SENEAR_OG_IMAGE = 'https://gabba.bond/screenshots/senear/senear-og-hu.jpg';

export interface VideoChapter {
  time: string;
  seconds: number;
  title: string;
  desc: string;
  highlight?: boolean;
}

export interface PricingPlan {
  name: string;
  tagline: string;
  features: string[];
  cta: string;
}

export interface SenearContent {
  meta: { title: string; description: string };
  breadcrumbHome: string;
  kicker: string;
  hero: {
    title1: string;
    title2: string;
    lead: string;
    primaryCta: string;
    androidNote: string;
    howBtn: string;
    videoBtn: string;
    guideBtn: string;
    phoneAlt: string;
    demoCaption: string;
    demo: {
      unknownTitle: string;
      unknownNumber: string;
      blocked: string;
      blockedHint: string;
      annaTitle: string;
      annaSub: string;
      allowed: string;
    };
  };
  sendSelf: {
    toggle: string;
    title: string;
    desc: string;
    copy: string;
    copied: string;
    qrAlt: string;
  };
  scenarios: {
    eyebrow: string;
    title: string;
    solutionLabel: string;
    items: { icon: 'scam' | 'muted' | 'distance'; quote: string; solution: string }[];
  };
  modes: {
    eyebrow: string;
    title: string;
    subtitle: string;
    pricesLink: string;
    items: { title: string; body: string; bullets: string[]; band: string }[];
  };
  story: {
    eyebrow: string;
    title: string;
    lead: string;
    familyPhoneLabel: string;
    seniorPhoneLabel: string;
    familyHeader: string;
    familyAvatar: string;
    familyStatus: string[];
    formTitle: string;
    photoLabel: string;
    nameLabel: string;
    nameValue: string;
    relationLabel: string;
    relationValue: string;
    numberLabel: string;
    numberValue: string;
    saveBtn: string;
    syncing: string;
    savedBtn: string;
    sosLabel: string;
    tiles: { name: string; rel: string; avatar: string }[];
    newTile: { name: string; rel: string; avatar: string };
    steps: string[];
    replay: string;
    note: string;
  };
  how: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: { title: string; desc: string }[];
    setupTime: string;
    setupTimeLink: string;
    specsOpen: string;
    specsClose: string;
    specTitles: string[];
    specs: string[][];
  };
  video: {
    eyebrow: string;
    title: string;
    subtitle: string;
    videoId: string;
    duration: string;
    listTitle: string;
    stepLabel: string;
    highlightLabel: string;
    leftLegend: string;
    rightLegend: string;
    permissionsTitle: string;
    permissions: string;
    chapters: VideoChapter[];
  };
  pricing: {
    eyebrow: string;
    title: string;
    subtitle: string;
    monthly: string;
    yearly: string;
    recommended: string;
    free: PricingPlan & { price: string; priceSuffix: string };
    family: PricingPlan & {
      trialBadge: string;
      trialSticker: [string, string];
      priceMonthlyOld: string;
      priceMonthly: string;
      suffixMonthly: string;
      priceYearlyOld: string;
      priceYearly: string;
      suffixYearly: string;
      yearlyNote: string;
      monthlyNote: string;
      perDay: { monthly: [string, string, string]; yearly: [string, string, string] };
    };
    lifetime: PricingPlan & {
      sticker: [string, string];
      priceOld: string;
      price: string;
      priceSuffix: string;
      splitStamp: [string, string, string];
      note: string;
    };
    trust: string;
  };
  trustBar: { label: string; badges: string[] };
  faq: { eyebrow: string; title: string; items: { q: string; a: string }[] };
  finalCta: { title: string; text: string; trialNote: string; guideLink: string };
  sticky: string;
}

export const SENEAR_CONTENT: Record<SenearLang, SenearContent> = {
  // ===================================================================
  // HUNGARIAN (primary)
  // ===================================================================
  hu: {
    meta: {
      title: 'SENEAR – Egyszerű telefon a szüleidnek, nyugalom neked | Android',
      description:
        'Zárolt, egyszerű kezdőképernyő nagy fotós hívógombokkal az idős szüleidnek. Csak az általad jóváhagyott számok hívhatják, te pedig távolról látod, hogy jól van. Ingyenes, Android 8.0+.',
    },
    breadcrumbHome: 'Főoldal',
    kicker: 'Idősbarát telefonrendszer Androidra',
    hero: {
      title1: 'Egyszerű telefon a szüleidnek.',
      title2: 'Nyugalom neked.',
      lead: 'Nagy fotós hívógombok, zárolt kezdőképernyő, és csak az általad jóváhagyott számok hívhatják. Te pedig a saját telefonodról látod, hogy minden rendben van.',
      primaryCta: 'Letöltés a Google Playről – Ingyenes',
      androidNote: 'Android 8.0+ készülékekre (a családtag telefonja is Android legyen)',
      howBtn: 'Hogyan működik?',
      videoBtn: 'Beállítási videó (13 perc)',
      guideBtn: 'Lépésről lépésre útmutató',
      phoneAlt:
        'A SENEAR zárolt, egyszerű kezdőképernyője: négy nagy, fotós hívógomb (Anna, Péter, András, Gyula – mintaadatok) és alul egy piros SOS gomb.',
      demoCaption: 'Ismeretlen szám? Meg sem csörren. Anna hívása átjön.',
      demo: {
        unknownTitle: 'Ismeretlen szám',
        unknownNumber: '+36 30 ··· ····',
        blocked: 'Blokkolva',
        blockedHint: 'a telefon meg sem csörren',
        annaTitle: 'Anna hív',
        annaSub: 'jóváhagyott szám',
        allowed: 'Átengedve',
      },
    },
    sendSelf: {
      toggle: 'Gépen nézed? Küldd el magadnak',
      title: 'Nyisd meg a telefonodon',
      desc: 'Olvasd be a QR-kódot az Android telefonod kamerájával, vagy másold ki a linket, és küldd el magadnak.',
      copy: 'Link másolása',
      copied: 'Link kimásolva',
      qrAlt: 'QR-kód a SENEAR Google Play oldalához',
    },
    scenarios: {
      eyebrow: 'Ha te is aggódsz értük…',
      title: 'Ismerős helyzet?',
      solutionLabel: 'Megoldás',
      items: [
        {
          icon: 'scam',
          quote: '„Anyu mindig felveszi az ismeretlen számokat. Félek, hogy egyszer egy csaló hívja.”',
          solution: 'Csak az általad jóváhagyott számok hívhatják. Az ismeretlen hívó meg sem csörren.',
        },
        {
          icon: 'muted',
          quote: '„Apu véletlenül lenémítja a telefont, aztán napokig nem érem el.”',
          solution: 'Zárolt, egyszerű kezdőképernyő, amit nem lehet véletlenül elállítani. A hangerőt távolról is visszaállíthatod.',
        },
        {
          icon: 'distance',
          quote: '„Másik városban élek. Csak tudni szeretném, hogy jól van.”',
          solution: 'A saját telefonodon látod az akkumulátort, a helyzetét és a gyógyszer-visszajelzést, és értesítést kapsz, ha SOS-t nyom.',
        },
      ],
    },
    modes: {
      eyebrow: 'Miért a SENEAR?',
      title: 'Két mód, ahogy használhatod',
      subtitle: 'Kezdheted egyedül a szülőd telefonjával, és később bármikor összekötheted a sajátoddal.',
      pricesLink: 'Árak megtekintése',
      items: [
        {
          title: 'Csak az idős szülő telefonja',
          body: 'Egyetlen telefon, második készülék nélkül.',
          bullets: [
            'Zárolt, egyszerű kezdőképernyő nagy fotós hívógombokkal',
            'Csak az általad jóváhagyott számok hívhatják',
            'Nagy SOS gomb és automatikus GPS-es SMS',
            'Reklámmentes',
          ],
          band: 'Örökké ingyenes',
        },
        {
          title: 'Családi távoli összekötés',
          body: 'A szülőd telefonja összekapcsolódik a te Android telefonoddal.',
          bullets: [
            'Élő állapot: akkumulátor, térerő, hely',
            'Értesítés SOS-ről, lemerülésről, kikapcsolásról',
            'Gyógyszeremlékeztető „Bevettem” visszajelzéssel',
            'Hívógombok és hívásszűrés beállítása távolról',
          ],
          band: '14 napig ingyen kipróbálható',
        },
      ],
    },
    story: {
      eyebrow: 'Két telefon, egy történet',
      title: 'Te beállítod. Ő már látja.',
      lead: 'Új hívógombot adsz hozzá a saját telefonodon, és pár másodperc múlva ott van a szülőd kezdőképernyőjén. Neki semmit nem kell csinálnia.',
      familyPhoneLabel: 'A te telefonod',
      seniorPhoneLabel: 'Anyu telefonja',
      familyHeader: 'Anyu',
      familyAvatar: '/screenshots/senear/avatar-senior.webp',
      familyStatus: ['82%', 'Otthon', 'Online'],
      formTitle: 'Új hívógomb · 4. csempe',
      photoLabel: 'Fotó kiválasztva',
      nameLabel: 'Név',
      nameValue: 'Gyula',
      relationLabel: 'Kapcsolat',
      relationValue: 'Szomszéd',
      numberLabel: 'Telefonszám',
      numberValue: '+36 20 ··· ····',
      saveBtn: 'Mentés',
      syncing: 'Küldés…',
      savedBtn: 'Elmentve',
      sosLabel: 'SOS HÍVÁS',
      tiles: [
        { name: 'Anna', rel: 'Lánya', avatar: '/screenshots/senear/avatar-anna.webp' },
        { name: 'Péter', rel: 'Fia', avatar: '/screenshots/senear/avatar-peter.webp' },
        { name: 'András', rel: 'Orvos', avatar: '/screenshots/senear/avatar-andras.webp' },
      ],
      newTile: { name: 'Gyula', rel: 'Szomszéd', avatar: '/screenshots/senear/avatar-gyula.webp' },
      steps: ['Megadod a nevet, számot és fotót', 'Elmented a saját telefonodon', 'Megjelenik a szülőd telefonján'],
      replay: 'Újra',
      note: 'Szemléltető animáció mintaadatokkal.',
    },
    how: {
      eyebrow: 'Így működik · Két telefon, egy történet',
      title: 'Három lépés – te beállítod, ő már látja.',
      subtitle: 'Nem kell új telefon, elég két Android készülék. Új hívógombot adsz hozzá a saját telefonodon, és pár másodperc múlva ott van a szülőd kezdőképernyőjén.',
      steps: [
        {
          title: 'Telepítsd a szülőd telefonjára',
          desc: 'Bármilyen meglévő Android 8.0+ telefonra, otthoni Wi-Fi-n akár SIM-kártya nélkül is.',
        },
        {
          title: 'Kösd össze egy 6 jegyű kóddal',
          desc: 'A szülőd jóváhagyja a saját telefonján, és a két készülék összekapcsolódik.',
        },
        {
          title: 'Kezeld távolról, nyugodtan',
          desc: 'A saját telefonodról állítod be a fotós hívógombokat, emlékeztetőket és a biztonsági zónát.',
        },
      ],
      setupTime: 'Az első beállítás kb. 10–15 perc. A videó lépésről lépésre végigvezet.',
      setupTimeLink: 'Videó megnyitása',
      specsOpen: 'Részletes funkciólista megnyitása',
      specsClose: 'Részletes funkciólista bezárása',
      specTitles: ['A szülőd telefonján', 'A két telefon között', 'A te telefonodon'],
      specs: [
        [
          'Zárolt, egyszerű kezdőképernyő (második telefon nélkül is használható)',
          '4 vagy 6 nagy, fotós hívógomb névvel és „Keresett!” jelzéssel',
          'Állítható szöveg-, fotó- és ikonméret',
          'SIM-kártyás hívás, valamint SIM nélküli Wi-Fi hang- és videóhívás',
          'Automatikus kihangosítás, képernyőn állítható hangerővel',
          'Előre megírt gyors SMS-ek, nagybetűs bejövő üzenetek',
          'SOS hívás és automatikus GPS-es SMS',
          'Ébresztő és napi emlékeztetők',
          'Fotós gyógyszeremlékeztető „Bevettem” gombbal',
        ],
        [
          'Összekapcsolás 6 jegyű kóddal, a szülőd jóváhagyásával',
          'Akár több családtag is csatlakozhat',
          'Valós idejű szinkron EU-s szervereken',
          'Gyártóspecifikus akkumulátor-beállítások (Samsung, Xiaomi, Huawei stb.)',
          'Titkosított adatátvitel (TLS)',
          'GDPR-konform adatkezelés, egygombos végleges adattörlés',
        ],
        [
          'Értesítés ki- és bekapcsoláskor, alacsony töltöttségnél',
          'Hang- és videóhívás a szülőd telefonjára Wi-Fi-n is',
          'Távolról bekapcsolható automatikus, kihangosított hívásfogadás',
          'A csengetés hangerejének visszaállítása távolról',
          'Hívógombok neve, száma és fotója távolról',
          'Hívásszűrés: a jóváhagyott számok listája távolról',
          'Ébresztők és gyógyszeremlékeztetők visszajelzéssel',
          'Otthoni biztonsági zóna és élő mini-térkép',
        ],
      ],
    },
    video: {
      eyebrow: 'Nézd végig 13 percben',
      title: 'A teljes beállítás 10 lépésben',
      subtitle: 'Kattints egy lépésre, és a videó ott folytatódik. Bal oldalon a te telefonod, jobb oldalon a szülődé.',
      videoId: 'yLFO0MMnATo',
      duration: '13:05',
      listTitle: 'A videó 10 lépése',
      stepLabel: 'lépés',
      highlightLabel: 'Kiemelt',
      leftLegend: 'Bal oldali telefon: a családtag telefonja',
      rightLegend: 'Jobb oldali telefon: az idős szülő telefonja',
      permissionsTitle: 'Miért kér engedélyeket az Android?',
      permissions:
        'Az első beállításnál az Android néhány egyszeri engedélyt kér: megjelenés más alkalmazások felett, alapértelmezett kezdőképernyő, kisegítő lehetőség és az akkumulátor-optimalizálás kikapcsolása. Ezek kellenek ahhoz, hogy a kezdőképernyő zárolt maradjon, és a hívások automatikusan kihangosítva induljanak. A videó mindegyiken végigvezet. Az alkalmazásban a családtag szerepköre „Gondozó”, az idős szülőé „Gondozott” néven szerepel.',
      chapters: [
        { time: '00:07', seconds: 7, title: 'Telepítés és szerepkörök', desc: 'Telepítés mindkét telefonra, az alapengedélyek jóváhagyása, majd a két szerepkör kiválasztása.' },
        { time: '00:37', seconds: 37, title: 'Zárolt, egyszerű kezdőképernyő', desc: 'Az egyszeri Android-engedélyek, hogy a kezdőképernyőt ne lehessen véletlenül elállítani.' },
        { time: '01:57', seconds: 117, title: 'A két telefon összekötése', desc: 'Párosítás 6 jegyű kóddal, SMS-értesítések és akkumulátor-beállítás.' },
        { time: '03:08', seconds: 188, title: 'Fotós hívógombok távolról', desc: 'Fotók és számok feltöltése, 4 vagy 6 gombos nézet (04:17), méretek finomhangolása.' },
        { time: '05:41', seconds: 341, title: 'Hívásszűrés', desc: 'Csak a jóváhagyott számok csörögnek ki, az ismeretlen hívók nem jutnak át.' },
        { time: '06:18', seconds: 378, title: 'Automatikus, kihangosított hívásfogadás', desc: 'Felvétel érintés nélkül, kihangosítva, valamint Igen/Nem megerősítés és „Keresett!” jelzés (06:55).', highlight: true },
        { time: '07:39', seconds: 459, title: 'Nagybetűs SMS', desc: 'A bejövő üzenetek automatikusan, jól olvashatóan ugranak fel.' },
        { time: '07:49', seconds: 469, title: 'Ébresztők és gyógyszeremlékeztető', desc: 'Emlékeztetők távolról, fotós gyógyszeremlékeztető „Bevettem” visszajelzéssel (08:25).', highlight: true },
        { time: '09:47', seconds: 587, title: 'Biztonsági zóna és SOS', desc: 'Otthoni zóna és navigáció, PIN-védelem és SOS gomb GPS-es SMS-sel (10:31).' },
        { time: '11:03', seconds: 663, title: 'Értesítések, tárcsázó, gyors SMS', desc: 'Értesítés lemerülésről és kikapcsolásról, nagy gombos tárcsázó és gyors SMS (12:13).' },
      ],
    },
    pricing: {
      eyebrow: 'Árak',
      title: 'Az idős szülő telefonja mindig ingyenes.',
      subtitle: 'Csak a családi távoli összekötésért fizetsz, és azt is 14 napig ingyen kipróbálhatod.',
      monthly: 'Havi',
      yearly: 'Éves',
      recommended: 'Ajánlott',
      free: {
        name: 'Ingyenes',
        tagline: 'Az idős szülő telefonja önállóan',
        price: '0 Ft',
        priceSuffix: 'örökké',
        features: [
          'Zárolt, egyszerű kezdőképernyő',
          'Nagy fotós hívógombok',
          'Csak a jóváhagyott számok hívhatják',
          'SOS gomb GPS-es SMS-sel',
          'Reklámmentes',
        ],
        cta: 'Ingyenes letöltés',
      },
      family: {
        name: 'Családi összekötés',
        tagline: 'A szülőd telefonja + a te telefonod',
        trialBadge: '14 nap ingyen',
        trialSticker: ['14 NAP', 'INGYEN'] as [string, string],
        priceMonthlyOld: '3 490 Ft',
        priceMonthly: '2 490 Ft',
        suffixMonthly: '/ hó',
        priceYearlyOld: '29 900 Ft',
        priceYearly: '19 900 Ft',
        suffixYearly: '/ év',
        yearlyNote: '4 hónap ajándék · csak ~1 658 Ft / hó',
        monthlyNote: 'Bevezető ár · Bármikor lemondható',
        perDay: { monthly: ['kevesebb, mint', '85 Ft', 'naponta'], yearly: ['kb.', '55 Ft', 'naponta'] },
        features: [
          'Minden, ami az Ingyenesben',
          'Élő akkumulátor, térerő és hely',
          'Értesítés SOS-ről és lemerülésről',
          'Gyógyszeremlékeztető visszajelzéssel',
          'Hívógombok és hívásszűrés távolról',
          'Wi-Fi hang- és videóhívás',
        ],
        cta: 'Kipróbálom 14 napig ingyen',
      },
      lifetime: {
        name: 'Örökös',
        tagline: 'Családi összekötés, havidíj nélkül',
        sticker: ['2', 'SZEMÉLYNEK'] as [string, string],
        priceOld: '89 900 Ft',
        price: '59 900 Ft',
        priceSuffix: '/ egyszeri díj',
        splitStamp: ['fejenként csak', '29 950 Ft', 'elfelezve'] as [string, string, string],
        note: '2 gondozónak (pl. fia és lánya is megkapja) – a család összedobhatja!',
        features: ['Két gondozó örökös összekapcsolása', 'Nincs havi vagy éves díj', 'Egyszer fizetsz, a Google Playen keresztül'],
        cta: 'Letöltés',
      },
      trust:
        'Biztonságos fizetés a Google Playen keresztül, kizárólag a gondozó telefonján (az idős szülő készülékén soha nem jelenik meg fizetési ablak). Bármikor egy kattintással lemondható.',
    },
    trustBar: { label: 'Amire számíthatsz', badges: ['Európai fejlesztés', 'Reklámmentes', 'GDPR-konform'] },
    faq: {
      eyebrow: 'GYIK',
      title: 'Gyakori kérdések',
      items: [
        {
          q: 'Mit lát a családtag, és kell-e hozzá az idős ember beleegyezése?',
          a: 'Igen, kell. A két telefon csak akkor kapcsolódik össze, ha az idős szülő a saját telefonján kifejezetten jóváhagyja. Ezután a családtag látja az akkumulátor töltöttségét, a gyógyszerbevétel visszajelzését és (ha be van kapcsolva) a helyzetet. Privát üzeneteket nem lát, és a beszélgetéseket sem hallja. Minden adat bármikor egy gombnyomással véglegesen törölhető.',
        },
        {
          q: 'Milyen telefonokon működik? iPhone-on is?',
          a: 'Mindkét telefonnak Android 8.0 vagy újabb rendszerűnek kell lennie (pl. Samsung, Xiaomi, Motorola, Honor, Pixel). iPhone-on nem működik, mert az iOS nem engedi a kezdőképernyő ilyen zárolását és a hívások automatikus kihangosítását.',
        },
        {
          q: 'Hogyan működik a 14 napos próbaidőszak és a fizetés? Megjelenik bármilyen fizetési ablak a szülőm telefonján?',
          a: 'Soha. A szülő telefonján a SENEAR 100%-ban reklám- és fizetésmentes felületként működik. A 14 napos ingyenes próbaidőszakot követően a gondozó a saját telefonján, a Google Playen keresztül választhat a bevezető árú havi (3 490 Ft helyett 2 490 Ft / hó) vagy a kedvezményes éves előfizetés (29 900 Ft helyett 19 900 Ft / év, azaz ~1 658 Ft / hó) között.',
        },
        {
          q: 'Mi történik, ha lemondom az előfizetést?',
          a: 'A szülőd telefonja ugyanúgy működik tovább ingyen: zárolt, egyszerű kezdőképernyő, hívásszűrés, SOS. Csak a távoli összekötés áll le.',
        },
        {
          q: 'Kell SIM-kártya a szülőm telefonjába?',
          a: 'Nem feltétlenül. Otthoni Wi-Fi-n SIM-kártya nélkül is működik a két telefon közötti Wi-Fi hívás, az emlékeztetők és a távoli beállítás. Hagyományos telefonszámok hívásához és SMS-hez SIM-kártya kell.',
        },
        {
          q: 'Vissza lehet térni a megszokott Android menübe?',
          a: 'Igen, bármikor. Koppints ötször a felső órára, add meg a 4 jegyű PIN-kódot, és kiléphetsz a zárolt kezdőképernyőről.',
        },
        {
          q: 'Új telefont kell vennem?',
          a: 'Nem. Bármilyen meglévő Android 8.0+ telefon megfelel, gyári visszaállítás sem kell.',
        },
      ],
    },
    finalCta: {
      title: 'Hogy te is nyugodtan aludhass.',
      text: 'Telepítsd ma a szüleid telefonjára. Az alap mindig ingyenes.',
      trialNote: '14 nap ingyenes próba a családi funkciókhoz',
      guideLink: 'Lépésről lépésre útmutató',
    },
    sticky: 'Letöltés – Ingyenes',
  },

  // ===================================================================
  // ENGLISH
  // ===================================================================
  en: {
    meta: {
      title: 'SENEAR – A simple phone for your parents, peace of mind for you | Android',
      description:
        'A locked, simple home screen with large photo call buttons for your aging parents. Only numbers you approve can call them, and you see from afar that they are okay. Free, Android 8.0+.',
    },
    breadcrumbHome: 'Home',
    kicker: 'Senior-friendly phone system for Android',
    hero: {
      title1: 'A simple phone for your parents.',
      title2: 'Peace of mind for you.',
      lead: 'Large photo call buttons, a locked home screen, and only numbers you approve can call. And you see from your own phone that everything is okay.',
      primaryCta: 'Download on Google Play – Free',
      androidNote: 'For Android 8.0+ devices (the family member’s phone also needs Android)',
      howBtn: 'How it works',
      videoBtn: 'Setup video (13 min)',
      guideBtn: 'Step-by-step guide',
      phoneAlt:
        'The SENEAR locked, simple home screen: four large photo call buttons (Anna, Peter, Eva, George – sample data) and a red SOS button at the bottom.',
      demoCaption: 'Unknown number? It never rings. Anna’s call comes through.',
      demo: {
        unknownTitle: 'Unknown number',
        unknownNumber: '+44 7··· ······',
        blocked: 'Blocked',
        blockedHint: 'the phone never rings',
        annaTitle: 'Anna is calling',
        annaSub: 'approved number',
        allowed: 'Allowed',
      },
    },
    sendSelf: {
      toggle: 'On a computer? Send it to yourself',
      title: 'Open it on your phone',
      desc: 'Scan the QR code with your Android phone’s camera, or copy the link and send it to yourself.',
      copy: 'Copy link',
      copied: 'Link copied',
      qrAlt: 'QR code for the SENEAR Google Play page',
    },
    scenarios: {
      eyebrow: 'If you worry about them too…',
      title: 'Sound familiar?',
      solutionLabel: 'Solution',
      items: [
        {
          icon: 'scam',
          quote: '“Mom always picks up unknown numbers. I’m afraid one day it’ll be a scammer.”',
          solution: 'Only numbers you approve can call her. Unknown callers never ring through.',
        },
        {
          icon: 'muted',
          quote: '“Dad accidentally mutes his phone, and then I can’t reach him for days.”',
          solution: 'A locked, simple home screen that can’t be changed by accident. You can restore the ringer volume remotely.',
        },
        {
          icon: 'distance',
          quote: '“I live in another city. I just want to know they’re okay.”',
          solution: 'See battery, location and medication confirmations on your own phone, and get notified if they press SOS.',
        },
      ],
    },
    modes: {
      eyebrow: 'Why SENEAR?',
      title: 'Two ways to use it',
      subtitle: 'Start with just your parent’s phone, and connect your own whenever you like.',
      pricesLink: 'See pricing',
      items: [
        {
          title: 'Just your parent’s phone',
          body: 'One phone, no second device needed.',
          bullets: [
            'Locked, simple home screen with large photo call buttons',
            'Only numbers you approve can call',
            'Large SOS button with automatic GPS text message',
            'Ad-free',
          ],
          band: 'Free forever',
        },
        {
          title: 'Family remote connection',
          body: 'Your parent’s phone connects to your own Android phone.',
          bullets: [
            'Live status: battery, signal, location',
            'Notifications for SOS, low battery, power off',
            'Medication reminders with “Taken” confirmation',
            'Set call buttons and call filtering remotely',
          ],
          band: 'Try it free for 14 days',
        },
      ],
    },
    story: {
      eyebrow: 'Two phones, one story',
      title: 'You set it up. They already see it.',
      lead: 'Add a new call button on your own phone, and a few seconds later it appears on your parent’s home screen. They don’t have to do a thing.',
      familyPhoneLabel: 'Your phone',
      seniorPhoneLabel: 'Mom’s phone',
      familyHeader: 'Mom',
      familyAvatar: '/screenshots/senear/avatar-senior.webp',
      familyStatus: ['82%', 'Home', 'Online'],
      formTitle: 'New call button · #4',
      photoLabel: 'Photo selected',
      nameLabel: 'Name',
      nameValue: 'George',
      relationLabel: 'Relation',
      relationValue: 'Neighbor',
      numberLabel: 'Phone number',
      numberValue: '+44 7··· ······',
      saveBtn: 'Save',
      syncing: 'Sending…',
      savedBtn: 'Saved',
      sosLabel: 'SOS CALL',
      tiles: [
        { name: 'Anna', rel: 'Daughter', avatar: '/screenshots/senear/avatar-anna.webp' },
        { name: 'Peter', rel: 'Son', avatar: '/screenshots/senear/avatar-peter.webp' },
        { name: 'Eva', rel: 'Doctor', avatar: '/screenshots/senear/avatar-eva.webp' },
      ],
      newTile: { name: 'George', rel: 'Neighbor', avatar: '/screenshots/senear/avatar-gyula.webp' },
      steps: ['You enter name, number and photo', 'You save it on your phone', 'It appears on your parent’s phone'],
      replay: 'Replay',
      note: 'Illustrative animation with sample data.',
    },
    how: {
      eyebrow: 'How it works · Two phones, one story',
      title: 'Three steps – you set it up, they already see it.',
      subtitle: 'No new phone needed, two Android devices are enough. Add a new call button on your own phone and a few seconds later it appears on your parent’s home screen.',
      steps: [
        {
          title: 'Install it on your parent’s phone',
          desc: 'Any existing Android 8.0+ phone, even without a SIM card on home Wi-Fi.',
        },
        {
          title: 'Connect with a 6-digit code',
          desc: 'Your parent approves it on their phone, and the two devices are linked.',
        },
        {
          title: 'Manage remotely, calmly',
          desc: 'Set up photo call buttons, reminders and the safe zone from your own phone.',
        },
      ],
      setupTime: 'First setup takes about 10–15 minutes. The video walks you through every step.',
      setupTimeLink: 'Open the video',
      specsOpen: 'Open the detailed feature list',
      specsClose: 'Close the detailed feature list',
      specTitles: ['On your parent’s phone', 'Between the two phones', 'On your phone'],
      specs: [
        [
          'Locked, simple home screen (works without a second phone)',
          '4 or 6 large photo call buttons with names and a “Missed call!” badge',
          'Adjustable text, photo and icon size',
          'SIM calls plus SIM-free Wi-Fi voice and video calls',
          'Automatic speakerphone with on-screen volume control',
          'Pre-written quick texts, large-print incoming messages',
          'SOS call and automatic GPS text message',
          'Alarm and daily reminders',
          'Photo medication reminder with a “Taken” button',
        ],
        [
          'Linking with a 6-digit code, approved by your parent',
          'Several family members can connect',
          'Real-time sync on EU servers',
          'Manufacturer-specific battery settings (Samsung, Xiaomi, Huawei, etc.)',
          'Encrypted data transfer (TLS)',
          'GDPR-compliant, one-tap permanent data deletion',
        ],
        [
          'Notifications on power off/on and low battery',
          'Voice and video calls to your parent’s phone, also over Wi-Fi',
          'Remotely enabled automatic, hands-free call answering',
          'Restore ringer volume remotely',
          'Call button names, numbers and photos remotely',
          'Call filtering: manage the approved numbers remotely',
          'Alarms and medication reminders with confirmation',
          'Home safe zone and live mini-map',
        ],
      ],
    },
    video: {
      eyebrow: 'Watch it in 13 minutes',
      title: 'The complete setup in 12 steps',
      subtitle: 'Click a step and the video jumps there. Your phone is on the left, your parent’s on the right.',
      videoId: '7UUD1rOxeOo',
      duration: '12:58',
      listTitle: 'The 12 steps of the video',
      stepLabel: 'Step',
      highlightLabel: 'Featured',
      leftLegend: 'Left phone: the family member’s phone',
      rightLegend: 'Right phone: the parent’s phone',
      permissionsTitle: 'Why does Android ask for permissions?',
      permissions:
        'During first setup Android asks for a few one-time permissions: display over other apps, default home app, accessibility service and turning off battery optimization. They keep the home screen locked and let calls start on speaker automatically. The video walks you through each one. In the app, the family member role is called “Caregiver” and the parent’s role “Senior”.',
      chapters: [
        { time: '00:00', seconds: 0, title: 'Installation, roles & permissions', desc: 'Open SENEAR on both phones, grant the first permissions and choose the two roles.' },
        { time: '00:24', seconds: 24, title: 'Profile & home screen protection', desc: 'Enter profile details and turn on the one-time Android protections on your parent’s phone.' },
        { time: '01:45', seconds: 105, title: 'Two phones, one system', desc: 'Pair the devices with the 6-digit code, then allow SMS notifications and battery settings.' },
        { time: '02:52', seconds: 172, title: 'Photos & call buttons (4 or 6)', desc: 'Upload photos for the call buttons, switch to the 6-button view (04:01) and adjust sizes (04:46).' },
        { time: '05:31', seconds: 331, title: 'Call filtering', desc: 'Add trusted contacts so only approved numbers ring through.' },
        { time: '06:19', seconds: 379, title: 'Wi-Fi calls & hands-free answering', desc: 'Turn on auto-answer and speaker, or call back via the red “Missed call!” badge.', highlight: true },
        { time: '07:31', seconds: 451, title: 'Large-print text messages', desc: 'Incoming texts pop up automatically in a high-contrast, large-print card.' },
        { time: '07:34', seconds: 454, title: 'Alarms & medication reminders', desc: 'Remote alarms and photo medication reminders with “Taken” confirmation (08:40), plus power alerts (09:01).', highlight: true },
        { time: '09:51', seconds: 591, title: 'Mini-map, safe zone & SOS', desc: 'Live location, home safe zone (100–1000 m) and the SOS button with YES/NO confirmation (10:31).' },
        { time: '10:43', seconds: 643, title: 'Large keypad & quick texts', desc: 'Dial any number on the large keypad (10:52) or send pre-written quick texts (11:10).' },
        { time: '11:23', seconds: 683, title: 'Local settings with the PIN', desc: 'Tap the clock 5 times and enter the PIN to change sound, screen, contacts and SOS settings.' },
        { time: '12:37', seconds: 757, title: 'Back to the normal Android menu', desc: 'Tap “Back to Phone Menu” and pick the default home app to leave the locked home screen.' },
      ],
    },
    pricing: {
      eyebrow: 'Pricing',
      title: 'Your parent’s phone is always free.',
      subtitle: 'You only pay for the family remote connection, and you can try it free for 14 days.',
      monthly: 'Monthly',
      yearly: 'Yearly',
      recommended: 'Recommended',
      free: {
        name: 'Free',
        tagline: 'Your parent’s phone on its own',
        price: '€0',
        priceSuffix: 'forever',
        features: [
          'Locked, simple home screen',
          'Large photo call buttons',
          'Only approved numbers can call',
          'SOS button with GPS text message',
          'Ad-free',
        ],
        cta: 'Free download',
      },
      family: {
        name: 'Family connection',
        tagline: 'Your parent’s phone + your phone',
        trialBadge: '14 days free',
        trialSticker: ['14 DAYS', 'FREE'] as [string, string],
        priceMonthlyOld: '€9.99',
        priceMonthly: '€7.99',
        suffixMonthly: '/ month',
        priceYearlyOld: '€79.99',
        priceYearly: '€59.99',
        suffixYearly: '/ year',
        yearlyNote: '4 months free · only ~€4.99 / month',
        monthlyNote: 'Introductory price · Cancel anytime',
        perDay: { monthly: ['less than', '27¢', 'a day'], yearly: ['about', '16¢', 'a day'] },
        features: [
          'Everything in Free',
          'Live battery, signal and location',
          'Notifications for SOS and low battery',
          'Medication reminders with confirmation',
          'Call buttons and call filtering remotely',
          'Wi-Fi voice and video calls',
        ],
        cta: 'Try it free for 14 days',
      },
      lifetime: {
        name: 'Lifetime',
        tagline: 'Family link, no monthly or annual fees',
        sticker: ['FOR 2', 'PEOPLE'] as [string, string],
        priceOld: '€199.00',
        price: '€149.00',
        priceSuffix: '/ once',
        splitStamp: ['just', '€74.50', 'each'] as [string, string, string],
        note: 'For 2 caregivers (e.g. both son and daughter) – split the one-time cost!',
        features: ['Lifetime access for 2 caregivers', 'No monthly or annual fees', 'Pay once securely via Google Play'],
        cta: 'Download',
      },
      trust:
        'Billed securely via Google Play in your local currency on the caregiver’s phone only (your parent’s screen never shows payment prompts). Cancel anytime with one tap.',
    },
    trustBar: { label: 'What you can count on', badges: ['Built in Europe', 'Ad-free', 'GDPR-compliant'] },
    faq: {
      eyebrow: 'FAQ',
      title: 'Frequently asked questions',
      items: [
        {
          q: 'What can the family member see, and does the senior need to agree?',
          a: 'Yes, they do. The two phones only connect if your parent explicitly approves it on their own phone. After that you see the battery level, medication confirmations and (if enabled) location. You never see private messages or hear conversations. All data can be permanently deleted with one tap at any time.',
        },
        {
          q: 'Which phones does it work on? iPhone too?',
          a: 'Both phones need Android 8.0 or newer (e.g. Samsung, Xiaomi, Motorola, Honor, Pixel). It doesn’t work on iPhone, because iOS doesn’t allow this kind of home screen lock or automatic speakerphone.',
        },
        {
          q: 'How does the 14-day trial and billing work? Will my parent ever see a payment screen?',
          a: 'Never. Your parent’s phone stays 100% free of ads and payment prompts. After the 14-day free trial, the caregiver can choose on their own phone via Google Play between the introductory monthly plan (€7.99/mo instead of €9.99) or the discounted annual plan (€59.99/yr instead of €79.99 — just ~€4.99/mo, shown in your local Google Play currency).',
        },
        {
          q: 'What happens if I cancel?',
          a: 'Your parent’s phone keeps working for free: locked, simple home screen, call filtering, SOS. Only the remote connection stops.',
        },
        {
          q: 'Does my parent’s phone need a SIM card?',
          a: 'Not necessarily. On home Wi-Fi, calls between the two phones, reminders and remote settings work without a SIM. Regular phone calls and texts need a SIM card.',
        },
        {
          q: 'Can we go back to the normal Android menu?',
          a: 'Yes, anytime. Tap the clock at the top five times, enter the 4-digit PIN, and you can leave the locked home screen.',
        },
        {
          q: 'Do I need to buy a new phone?',
          a: 'No. Any existing Android 8.0+ phone works, no factory reset needed.',
        },
      ],
    },
    finalCta: {
      title: 'So you can sleep peacefully too.',
      text: 'Install it on your parent’s phone today. The basics are always free.',
      trialNote: '14-day free trial for the family features',
      guideLink: 'Step-by-step guide',
    },
    sticky: 'Download – Free',
  },

  // ===================================================================
  // GERMAN
  // ===================================================================
  de: {
    meta: {
      title: 'SENEAR – Ein einfaches Telefon für Ihre Eltern, Ruhe für Sie | Android',
      description:
        'Ein gesperrter, einfacher Startbildschirm mit großen Foto-Anruftasten für Ihre älteren Eltern. Nur von Ihnen freigegebene Nummern können anrufen, und Sie sehen aus der Ferne, dass alles in Ordnung ist. Kostenlos, Android 8.0+.',
    },
    breadcrumbHome: 'Startseite',
    kicker: 'Seniorenfreundliches Telefonsystem für Android',
    hero: {
      title1: 'Ein einfaches Telefon für Ihre Eltern.',
      title2: 'Ruhe für Sie.',
      lead: 'Große Foto-Anruftasten, ein gesperrter Startbildschirm, und nur von Ihnen freigegebene Nummern können anrufen. Und Sie sehen auf Ihrem eigenen Handy, dass alles in Ordnung ist.',
      primaryCta: 'Bei Google Play laden – Kostenlos',
      androidNote: 'Für Android 8.0+ Geräte (auch das Handy des Familienmitglieds braucht Android)',
      howBtn: 'So funktioniert’s',
      videoBtn: 'Einrichtungsvideo (13 Min.)',
      guideBtn: 'Schritt-für-Schritt-Anleitung',
      phoneAlt:
        'Der gesperrte, einfache Startbildschirm von SENEAR: vier große Foto-Anruftasten (Anna, Peter, Eva, George – Beispieldaten) und unten eine rote SOS-Taste.',
      demoCaption: 'Unbekannte Nummer? Es klingelt gar nicht erst. Annas Anruf kommt durch.',
      demo: {
        unknownTitle: 'Unbekannte Nummer',
        unknownNumber: '+49 15··· ······',
        blocked: 'Blockiert',
        blockedHint: 'es klingelt gar nicht erst',
        annaTitle: 'Anna ruft an',
        annaSub: 'freigegebene Nummer',
        allowed: 'Durchgestellt',
      },
    },
    sendSelf: {
      toggle: 'Am Computer? Schicken Sie es sich selbst',
      title: 'Auf dem Handy öffnen',
      desc: 'Scannen Sie den QR-Code mit der Kamera Ihres Android-Handys oder kopieren Sie den Link und schicken Sie ihn sich selbst.',
      copy: 'Link kopieren',
      copied: 'Link kopiert',
      qrAlt: 'QR-Code zur Google-Play-Seite von SENEAR',
    },
    scenarios: {
      eyebrow: 'Wenn Sie sich auch Sorgen machen…',
      title: 'Kommt Ihnen das bekannt vor?',
      solutionLabel: 'Lösung',
      items: [
        {
          icon: 'scam',
          quote: '„Mama geht bei jeder unbekannten Nummer ran. Ich habe Angst, dass es irgendwann ein Betrüger ist.“',
          solution: 'Nur von Ihnen freigegebene Nummern können sie anrufen. Unbekannte Anrufer klingeln gar nicht erst durch.',
        },
        {
          icon: 'muted',
          quote: '„Papa schaltet sein Handy versehentlich stumm, und dann erreiche ich ihn tagelang nicht.“',
          solution: 'Ein gesperrter, einfacher Startbildschirm, der sich nicht versehentlich verstellen lässt. Die Klingellautstärke stellen Sie aus der Ferne wieder her.',
        },
        {
          icon: 'distance',
          quote: '„Ich wohne in einer anderen Stadt. Ich möchte einfach wissen, dass es ihnen gut geht.“',
          solution: 'Akku, Standort und Medikamentenbestätigung auf Ihrem eigenen Handy, und eine Nachricht, wenn SOS gedrückt wird.',
        },
      ],
    },
    modes: {
      eyebrow: 'Warum SENEAR?',
      title: 'Zwei Arten, es zu nutzen',
      subtitle: 'Beginnen Sie nur mit dem Handy Ihrer Eltern und verbinden Sie Ihr eigenes, wann immer Sie möchten.',
      pricesLink: 'Preise ansehen',
      items: [
        {
          title: 'Nur das Handy Ihrer Eltern',
          body: 'Ein Telefon, kein zweites Gerät nötig.',
          bullets: [
            'Gesperrter, einfacher Startbildschirm mit großen Foto-Anruftasten',
            'Nur freigegebene Nummern können anrufen',
            'Große SOS-Taste mit automatischer GPS-SMS',
            'Werbefrei',
          ],
          band: 'Für immer kostenlos',
        },
        {
          title: 'Familien-Fernverbindung',
          body: 'Das Handy Ihrer Eltern verbindet sich mit Ihrem eigenen Android-Handy.',
          bullets: [
            'Live-Status: Akku, Empfang, Standort',
            'Nachricht bei SOS, schwachem Akku, Ausschalten',
            'Medikamentenerinnerung mit „Eingenommen“-Bestätigung',
            'Anruftasten und Anruffilter aus der Ferne',
          ],
          band: '14 Tage kostenlos testen',
        },
      ],
    },
    story: {
      eyebrow: 'Zwei Telefone, eine Geschichte',
      title: 'Sie richten es ein. Sie sehen es sofort.',
      lead: 'Fügen Sie auf Ihrem Handy eine neue Anruftaste hinzu, und wenige Sekunden später erscheint sie auf dem Startbildschirm Ihrer Eltern. Sie müssen nichts tun.',
      familyPhoneLabel: 'Ihr Handy',
      seniorPhoneLabel: 'Mamas Handy',
      familyHeader: 'Mama',
      familyAvatar: '/screenshots/senear/avatar-senior.webp',
      familyStatus: ['82%', 'Zuhause', 'Online'],
      formTitle: 'Neue Anruftaste · Nr. 4',
      photoLabel: 'Foto ausgewählt',
      nameLabel: 'Name',
      nameValue: 'George',
      relationLabel: 'Beziehung',
      relationValue: 'Nachbar',
      numberLabel: 'Telefonnummer',
      numberValue: '+49 15··· ······',
      saveBtn: 'Speichern',
      syncing: 'Senden…',
      savedBtn: 'Gespeichert',
      sosLabel: 'SOS-ANRUF',
      tiles: [
        { name: 'Anna', rel: 'Tochter', avatar: '/screenshots/senear/avatar-anna.webp' },
        { name: 'Peter', rel: 'Sohn', avatar: '/screenshots/senear/avatar-peter.webp' },
        { name: 'Eva', rel: 'Ärztin', avatar: '/screenshots/senear/avatar-eva.webp' },
      ],
      newTile: { name: 'George', rel: 'Nachbar', avatar: '/screenshots/senear/avatar-gyula.webp' },
      steps: ['Name, Nummer und Foto eingeben', 'Auf Ihrem Handy speichern', 'Erscheint auf dem Handy Ihrer Eltern'],
      replay: 'Nochmal',
      note: 'Veranschaulichende Animation mit Beispieldaten.',
    },
    how: {
      eyebrow: 'So funktioniert’s · Zwei Telefone, eine Geschichte',
      title: 'Drei Schritte – Sie richten es ein, sie sehen es sofort.',
      subtitle: 'Kein neues Handy nötig, zwei Android-Geräte genügen. Fügen Sie auf Ihrem Handy eine neue Anruftaste hinzu, und Sekunden später erscheint sie auf dem Startbildschirm Ihrer Eltern.',
      steps: [
        {
          title: 'Auf dem Handy Ihrer Eltern installieren',
          desc: 'Jedes vorhandene Android-8.0+-Handy, im Heim-WLAN sogar ohne SIM-Karte.',
        },
        {
          title: 'Mit einem 6-stelligen Code verbinden',
          desc: 'Ihre Eltern bestätigen auf ihrem Handy, und die beiden Geräte sind verbunden.',
        },
        {
          title: 'Entspannt aus der Ferne verwalten',
          desc: 'Foto-Anruftasten, Erinnerungen und die Sicherheitszone richten Sie auf Ihrem Handy ein.',
        },
      ],
      setupTime: 'Die Ersteinrichtung dauert ca. 10–15 Minuten. Das Video führt Sie Schritt für Schritt durch.',
      setupTimeLink: 'Video öffnen',
      specsOpen: 'Ausführliche Funktionsliste öffnen',
      specsClose: 'Ausführliche Funktionsliste schließen',
      specTitles: ['Auf dem Handy Ihrer Eltern', 'Zwischen den beiden Handys', 'Auf Ihrem Handy'],
      specs: [
        [
          'Gesperrter, einfacher Startbildschirm (auch ohne zweites Handy nutzbar)',
          '4 oder 6 große Foto-Anruftasten mit Namen und „Hat angerufen!“-Hinweis',
          'Einstellbare Text-, Foto- und Symbolgröße',
          'SIM-Anrufe sowie WLAN-Sprach- und Videoanrufe ohne SIM',
          'Automatisches Freisprechen mit Lautstärkeregler auf dem Bildschirm',
          'Vorgefertigte Schnell-SMS, eingehende Nachrichten in Großschrift',
          'SOS-Anruf und automatische GPS-SMS',
          'Wecker und tägliche Erinnerungen',
          'Foto-Medikamentenerinnerung mit „Eingenommen“-Taste',
        ],
        [
          'Verbindung per 6-stelligem Code, von Ihren Eltern bestätigt',
          'Mehrere Familienmitglieder können sich verbinden',
          'Echtzeit-Synchronisierung auf EU-Servern',
          'Herstellerspezifische Akku-Einstellungen (Samsung, Xiaomi, Huawei usw.)',
          'Verschlüsselte Datenübertragung (TLS)',
          'DSGVO-konform, endgültige Datenlöschung mit einem Klick',
        ],
        [
          'Nachricht beim Aus-/Einschalten und bei schwachem Akku',
          'Sprach- und Videoanrufe zum Handy Ihrer Eltern, auch über WLAN',
          'Aus der Ferne aktivierbare automatische Rufannahme mit Lautsprecher',
          'Klingellautstärke aus der Ferne wiederherstellen',
          'Namen, Nummern und Fotos der Anruftasten aus der Ferne',
          'Anruffilter: freigegebene Nummern aus der Ferne verwalten',
          'Wecker und Medikamentenerinnerungen mit Bestätigung',
          'Sicherheitszone zu Hause und Live-Minikarte',
        ],
      ],
    },
    video: {
      eyebrow: 'In 13 Minuten erklärt',
      title: 'Die komplette Einrichtung in 12 Schritten',
      subtitle: 'Klicken Sie auf einen Schritt, und das Video springt dorthin. Links Ihr Handy, rechts das Ihrer Eltern.',
      videoId: '7UUD1rOxeOo',
      duration: '12:58',
      listTitle: 'Die 12 Schritte des Videos',
      stepLabel: 'Schritt',
      highlightLabel: 'Highlight',
      leftLegend: 'Linkes Handy: das Handy des Familienmitglieds',
      rightLegend: 'Rechtes Handy: das Handy der Eltern',
      permissionsTitle: 'Warum fragt Android nach Berechtigungen?',
      permissions:
        'Bei der Ersteinrichtung fragt Android nach einigen einmaligen Berechtigungen: Einblendung über anderen Apps, Standard-Start-App, Bedienungshilfe und Deaktivierung der Akku-Optimierung. Damit bleibt der Startbildschirm gesperrt und Anrufe starten automatisch mit Lautsprecher. Das Video führt Sie durch jede einzelne. In der App heißt die Rolle des Familienmitglieds „Caregiver“ und die der Eltern „Senior“.',
      chapters: [
        { time: '00:00', seconds: 0, title: 'Installation, Rollen & Berechtigungen', desc: 'SENEAR auf beiden Handys öffnen, erste Berechtigungen erteilen und die beiden Rollen wählen.' },
        { time: '00:24', seconds: 24, title: 'Profil & Startbildschirm-Schutz', desc: 'Profildaten eingeben und die einmaligen Android-Schutzfunktionen auf dem Handy Ihrer Eltern aktivieren.' },
        { time: '01:45', seconds: 105, title: 'Zwei Handys, ein System', desc: 'Kopplung mit dem 6-stelligen Code, danach SMS-Zugriff und Akku-Einstellungen.' },
        { time: '02:52', seconds: 172, title: 'Fotos & Anruftasten (4 oder 6)', desc: 'Fotos für die Anruftasten hochladen, 6-Tasten-Ansicht (04:01) und Größen anpassen (04:46).' },
        { time: '05:31', seconds: 331, title: 'Anruffilter', desc: 'Vertrauenswürdige Kontakte freigeben, damit nur diese Nummern durchklingeln.' },
        { time: '06:19', seconds: 379, title: 'WLAN-Anruf & Freisprechen', desc: 'Automatische Rufannahme und Lautsprecher aktivieren oder über das rote „Missed call!“-Symbol zurückrufen.', highlight: true },
        { time: '07:31', seconds: 451, title: 'SMS in Großschrift', desc: 'Eingehende SMS erscheinen automatisch als kontrastreiche Großschrift-Karte.' },
        { time: '07:34', seconds: 454, title: 'Wecker & Medikamentenerinnerung', desc: 'Wecker und Foto-Medikamentenerinnerung mit Bestätigung (08:40) sowie Ein-/Aus-Meldungen (09:01).', highlight: true },
        { time: '09:51', seconds: 591, title: 'Minikarte, Sicherheitszone & SOS', desc: 'Live-Standort, Sicherheitszone (100–1000 m) und SOS-Taste mit JA/NEIN-Bestätigung (10:31).' },
        { time: '10:43', seconds: 643, title: 'Großes Tastenfeld & Schnell-SMS', desc: 'Jede Nummer über das große Tastenfeld wählen (10:52) oder vorgefertigte Schnell-SMS senden (11:10).' },
        { time: '11:23', seconds: 683, title: 'Lokale Einstellungen per PIN', desc: '5-mal auf die Uhr tippen und PIN eingeben, um Ton, Bildschirm, Kontakte und SOS einzustellen.' },
        { time: '12:37', seconds: 757, title: 'Zurück zum normalen Android-Menü', desc: '„Back to Phone Menu“ tippen und die Standard-Start-App wählen, um den gesperrten Startbildschirm zu verlassen.' },
      ],
    },
    pricing: {
      eyebrow: 'Preise',
      title: 'Das Handy Ihrer Eltern ist immer kostenlos.',
      subtitle: 'Sie zahlen nur für die Familien-Fernverbindung, und die können Sie 14 Tage kostenlos testen.',
      monthly: 'Monatlich',
      yearly: 'Jährlich',
      recommended: 'Empfohlen',
      free: {
        name: 'Kostenlos',
        tagline: 'Das Handy Ihrer Eltern allein',
        price: '0 €',
        priceSuffix: 'für immer',
        features: [
          'Gesperrter, einfacher Startbildschirm',
          'Große Foto-Anruftasten',
          'Nur freigegebene Nummern können anrufen',
          'SOS-Taste mit GPS-SMS',
          'Werbefrei',
        ],
        cta: 'Kostenlos laden',
      },
      family: {
        name: 'Familien-Verbindung',
        tagline: 'Handy Ihrer Eltern + Ihr Handy',
        trialBadge: '14 Tage gratis',
        trialSticker: ['14 TAGE', 'GRATIS'] as [string, string],
        priceMonthlyOld: '9,99 €',
        priceMonthly: '7,99 €',
        suffixMonthly: '/ Monat',
        priceYearlyOld: '79,99 €',
        priceYearly: '59,99 €',
        suffixYearly: '/ Jahr',
        yearlyNote: '4 Monate gratis · nur ~4,99 € / Monat',
        monthlyNote: 'Einführungspreis · Jederzeit kündbar',
        perDay: { monthly: ['weniger als', '27 Cent', 'am Tag'], yearly: ['ca.', '16 Cent', 'am Tag'] },
        features: [
          'Alles aus Kostenlos',
          'Live-Akku, Empfang und Standort',
          'Nachricht bei SOS und schwachem Akku',
          'Medikamentenerinnerung mit Bestätigung',
          'Anruftasten und Anruffilter aus der Ferne',
          'WLAN-Sprach- und Videoanrufe',
        ],
        cta: '14 Tage kostenlos testen',
      },
      lifetime: {
        name: 'Lebenslang',
        tagline: 'Familien-Kopplung, ohne Monats- oder Jahresgebühren',
        sticker: ['FÜR 2', 'PERSONEN'] as [string, string],
        priceOld: '199,00 €',
        price: '149,00 €',
        priceSuffix: '/ Einmalzahlung',
        splitStamp: ['nur', '74,50 €', 'pro Person'] as [string, string, string],
        note: 'Für 2 Betreuer inklusive (z. B. Sohn und Tochter) – durch zwei Geschwister teilbar!',
        features: ['Lebenslanger Zugriff für 2 Betreuer', 'Keine Monats- oder Jahresgebühren', 'Einmalige Zahlung über Google Play'],
        cta: 'Herunterladen',
      },
      trust:
        'Sichere Abrechnung über Google Play ausschließlich auf dem Smartphone des Betreuers (auf dem Gerät Ihrer Eltern erscheinen niemals Zahlungshinweise). Jederzeit mit einem Klick kündbar.',
    },
    trustBar: { label: 'Darauf können Sie sich verlassen', badges: ['Entwickelt in Europa', 'Werbefrei', 'DSGVO-konform'] },
    faq: {
      eyebrow: 'FAQ',
      title: 'Häufige Fragen',
      items: [
        {
          q: 'Was sieht das Familienmitglied, und muss die ältere Person zustimmen?',
          a: 'Ja. Die beiden Handys verbinden sich nur, wenn Ihre Eltern es auf ihrem eigenen Handy ausdrücklich bestätigen. Danach sehen Sie den Akkustand, Medikamentenbestätigungen und (falls aktiviert) den Standort. Private Nachrichten sehen Sie nie, Gespräche hören Sie nicht mit. Alle Daten lassen sich jederzeit mit einem Klick endgültig löschen.',
        },
        {
          q: 'Auf welchen Handys läuft es? Auch auf dem iPhone?',
          a: 'Beide Handys brauchen Android 8.0 oder neuer (z. B. Samsung, Xiaomi, Motorola, Honor, Pixel). Auf dem iPhone läuft es nicht, weil iOS eine solche Startbildschirm-Sperre und automatisches Freisprechen nicht erlaubt.',
        },
        {
          q: 'Wie funktionieren die 14-tägige Testphase und die Abrechnung? Sieht mein Elternteil jemals ein Zahlungsfenster?',
          a: 'Niemals. Das Handy Ihres Angehörigen bleibt zu 100 % frei von Werbung und Zahlungshinweisen. Nach der 14-tägigen Testphase wählt der Betreuer auf seinem eigenen Smartphone über Google Play zwischen dem Monatsabo zum Einführungspreis (7,99 € statt 9,99 €) oder dem vergünstigten Jahresabo (59,99 € statt 79,99 € – nur ~4,99 € / Monat).',
        },
        {
          q: 'Was passiert, wenn ich kündige?',
          a: 'Das Handy Ihrer Eltern funktioniert kostenlos weiter: gesperrter, einfacher Startbildschirm, Anruffilter, SOS. Nur die Fernverbindung endet.',
        },
        {
          q: 'Braucht das Handy meiner Eltern eine SIM-Karte?',
          a: 'Nicht unbedingt. Im Heim-WLAN funktionieren Anrufe zwischen den beiden Handys, Erinnerungen und die Fernverwaltung auch ohne SIM. Für normale Anrufe und SMS ist eine SIM-Karte nötig.',
        },
        {
          q: 'Kann man zum normalen Android-Menü zurück?',
          a: 'Ja, jederzeit. Tippen Sie fünfmal auf die Uhr oben, geben Sie die 4-stellige PIN ein, und Sie verlassen den gesperrten Startbildschirm.',
        },
        {
          q: 'Muss ich ein neues Handy kaufen?',
          a: 'Nein. Jedes vorhandene Android-8.0+-Handy reicht, ein Zurücksetzen auf Werkseinstellungen ist nicht nötig.',
        },
      ],
    },
    finalCta: {
      title: 'Damit auch Sie ruhig schlafen können.',
      text: 'Installieren Sie es noch heute auf dem Handy Ihrer Eltern. Die Grundfunktionen sind immer kostenlos.',
      trialNote: '14 Tage kostenlos testen für die Familienfunktionen',
      guideLink: 'Schritt-für-Schritt-Anleitung',
    },
    sticky: 'Laden – Kostenlos',
  },
};
