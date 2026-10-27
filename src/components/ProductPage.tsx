import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BellRing,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  CloudCog,
  HeartHandshake,
  HelpCircle,
  Lock,
  MapPin,
  MessageSquareQuote,
  Play,
  Radio,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  WifiOff,
  Baby,
  BookOpen,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { ProductShowcase3D, PRODUCT_ACCENT } from './ProductShowcase3D';
import { PhoneFrame, ScreenImage } from './PhoneFrame';
import { GooglePlayIcon } from './GooglePlayIcon';
import { getProductPhotos, getScreenshotSources } from '../data/productPhotos';
import { AppRoute, ProductKey } from '../routing';

type Lang = 'hu' | 'en' | 'de';

interface ProductCopy {
  kicker: string;
  heroTitle: string;
  heroText: string;
  chips: string[];
  primaryCta: string;
  benefitsTitle: string;
  benefitsSubtitle: string;
  howTitle: string;
  howSubtitle: string;
  how: { title: string; desc: string }[];
  spotlightTitle: string;
  spotlightSubtitle: string;
  bullets: string[][];
  ctaTitle: string;
  ctaText: string;
}

const COMMON: Record<Lang, { home: string; setup: string }> = {
  hu: { home: 'Főoldal', setup: 'Beállítási útmutató' },
  en: { home: 'Home', setup: 'Setup guide' },
  de: { home: 'Startseite', setup: 'Einrichtungsanleitung' },
};

interface VideoChapter {
  time: string;
  seconds: number;
  title: string;
  desc: string;
  badge?: string;
}

interface SenearVideoShowcase {
  videoId: string;
  badge: string;
  title: string;
  subtitle: string;
  leftPhoneLegend: string;
  rightPhoneLegend: string;
  chapterListTitle: string;
  totalDuration: string;
  chapters: VideoChapter[];
}

interface ScenarioCard {
  quote: string;
  solutionLabel: string;
  solution: string;
}

interface CorePillar {
  title: string;
  desc: string;
}

interface FaqItem {
  q: string;
  a: string;
}

interface SenearExtra {
  heroPrimaryDownloadBtn: string;
  heroHowLink: string;
  heroVideoLink: string;
  heroSetupLink: string;
  scenariosTitle: string;
  scenarios: ScenarioCard[];
  corePillars: CorePillar[];
  /** [0] = standalone (free), [1] = connected caregiver (premium) */
  modes: { title: string; body: string; priceLabel: string; badge: string }[];
  howSteps: { title: string; desc: string }[];
  setupTimeBanner: string;
  specsToggleBtn: string;
  specsHideBtn: string;
  featureTitles: string[];
  features: string[][];
  videoShowcase: SenearVideoShowcase;
  founderNote: {
    quote: string;
    author: string;
    role: string;
    badges: string[];
  };
  faqTitle: string;
  faqs: FaqItem[];
}

const SENEAR_EXTRA: Record<Lang, SenearExtra> = {
  hu: {
    heroPrimaryDownloadBtn: 'Letöltés a Google Playről – Ingyenes',
    heroHowLink: 'Hogyan működik? ↓',
    heroVideoLink: 'Beállítási videó (13 perc) ↓',
    heroSetupLink: 'Lépésről lépésre útmutató →',
    scenariosTitle: 'Ismerős helyzet?',
    scenarios: [
      {
        quote: '„A mamám 78 éves, és mindig felveszi a telefont az ismeretlen csalóknak.”',
        solutionLabel: 'Megoldás:',
        solution: 'A SENEAR hívásszűrője csak az általad jóváhagyott számokat engedi kicsörögni.',
      },
      {
        quote: '„Apukám véletlenül elállítja a telefont, lehalkítja, vagy elfelejti a gyógyszerét.”',
        solutionLabel: 'Megoldás:',
        solution:
          'Elállíthatatlan Kioszk képernyő, 100%-os kihangosított automatikus hívásfogadás és fényképes gyógyszeremlékeztető.',
      },
      {
        quote: '„Másik városban élek, és napközben is látni szeretném, hogy minden rendben van-e vele.”',
        solutionLabel: 'Megoldás:',
        solution:
          'Valós idejű töltöttség, gyógyszer-visszajelzés, GPS biztonsági zóna és ingyenes Wi-Fi hívás a saját telefonodon.',
      },
    ],
    corePillars: [
      {
        title: 'Elállíthatatlan Kioszk védelem',
        desc: 'Nincs félrenyomott menü, véletlen némítás vagy törölt alkalmazás.',
      },
      {
        title: '100%-os védelem a csalók ellen',
        desc: 'Csak az általad engedélyezett családtagok és ismerősök csörgethetik meg.',
      },
      {
        title: 'Távoli gondoskodás és SOS',
        desc: 'Élő akkumulátor, GPS biztonsági zóna, fotós gyógyszeremlékeztető és kihangosított hívás.',
      },
    ],
    modes: [
      {
        title: 'Csak egy egyszerű, védett telefon kell',
        body: 'Ha a cél egy egyszerűen kezelhető, elállíthatatlan és védett telefon: az idős hozzátartozó egy tiszta felületet kap, ahol kizárólag az előre beállított személyeket tudja felhívni, és csak tőlük fogadhat hívást – így teljesen védett az ismeretlen zaklatóktól és telefonos csalóktól.',
        priceLabel: 'Árazás • Önálló Gondozott mód',
        badge: '0 Ft – Örökké ingyenes és 100% reklámmentes',
      },
      {
        title: 'Én is látni akarom távolról, hogy jól van',
        body: 'Ha távolról is teljes biztonságban szeretnéd tudni idős szerettedet: kösd össze a készülékét a saját telefonoddal! Gondozóként valós időben látod a telefon állapotát (akkumulátor, térerő, helyadatok), távolról kezelheted a névjegyeket, és azonnali riasztást kapsz SOS vagy lemerülés esetén.',
        priceLabel: 'Árazás • Távgondozói összeköttetés',
        badge: '14 napig ingyenesen kipróbálható, utána 1 490 Ft / hó (vagy 14 900 Ft / év) • Bármikor lemondható',
      },
    ],
    howSteps: [
      {
        title: 'Telepítsd a szülőd telefonjára',
        desc: 'Bármilyen meglévő Android készülékre felteheted, otthoni Wi-Fi-n akár SIM-kártya nélkül is.',
      },
      {
        title: 'Párosítsd a 6 jegyű kóddal',
        desc: 'A szülő jóváhagyása után egyetlen kóddal összekapcsolhatod a két telefont.',
      },
      {
        title: 'Kezeld távolról, nyugodtan',
        desc: 'A saját mobilodról állíthatod be a fényképes hívógombokat, a gyógyszeremlékeztetőket és a GPS-zónát.',
      },
    ],
    setupTimeBanner:
      '⏱️ Mennyi idő a beállítás? Az első telepítés kb. 10–15 percet vesz igénybe az egyszeri Android biztonsági engedélyek (Kioszk védelem, automatikus kihangosítás) jóváhagyása miatt. A lenti videóban lépésről lépésre végigvezetünk rajta – utána pedig a telefon elállíthatatlan marad.',
    specsToggleBtn: 'Összes funkció és műszaki védelem megjelenítése (20+ funkció) ↓',
    specsHideBtn: 'Részletes funkciólista elrejtése ↑',
    featureTitles: [
      'Gondozott telefonjához tartozó funkciók',
      'Biztonságos összeköttetéshez tartozó funkciók',
      'Gondozó telefonjához tartozó funkciók',
    ],
    features: [
      [
        'Elállíthatatlan, zárolt Kioszk felület (akár önállóan, gondozó nélkül is működik)',
        '4 vagy akár 6 arcképes hívócsempe keresztnévvel, kapcsolattal és nem fogadott hívás („Keresett!”) jelzéssel',
        'Személyre szabható szöveg-, fotó- és telefonikon-méretek (3 fokozatban állítható vagy kikapcsolható)',
        'Hagyományos SIM-kártyás hívások (internet nélkül is) és SIM nélküli Wi-Fi hang- és videóhívások',
        'Automatikus kihangosítás 100%-os kezdő hangerővel, képernyőn állítható hangerőcsúszkával és a párhuzamos bejövő hívások néma blokkolásával beszélgetés közben',
        'Előre megírt gyors SMS-ek küldése és a bejövő SMS-ek óriásbetűs felugró kártyás megjelenítése',
        'Vészhelyzeti SOS hívás és automatikus GPS-helyzet SMS küldése',
        'Reggeli ébresztő és személyre szabott napi rutin emlékeztetők',
        'Kétlépcsős gyógyszeremlékeztető pontos adagolással és fotóval, egygombos „Bevettem” nyugtázással a gondozó felé',
      ],
      [
        'Gyors összekapcsolás 6-jegyű párosító kóddal',
        'Több gondozó egyidejű csatlakoztatása (akár 6 családtag) és automatikus hívócsempe-feltöltés párosításkor (1–6. helyre)',
        'Valós idejű állapotfrissítések és azonnali szinkronizálás biztonságos EU-s felhőn keresztül',
        'Megszakításbiztos működés: gyártó-specifikus akkumulátor-védelem és Watchdog (Xiaomi, Samsung, Huawei stb.)',
        'Banki szintű adatátvitel és végponti titkosítás (TLS 1.3 / AES-256)',
        'EU GDPR-konform adatkezelés kétoldalú hozzájárulással és bármikor elérhető, egygombos végleges adattörléssel',
      ],
      [
        'Azonnali értesítés a gondozott telefonjának ki- és bekapcsolásáról, valamint alacsony töltöttségéről (lemerülés előtt)',
        'Hang- és videóhívás a gondozott telefonjára — akár SIM-kártya nélkül is, Wi-Fi-n keresztül',
        'Automatikus hívásfogadás: a gondozó távolról, kihangosítva veheti fel a saját hívását a gondozott telefonján',
        'Távoli csengetési hangerő-visszaállítás maximumra (ha a készüléket véletlenül lehalkították)',
        'Távoli névjegy-, telefonszám- és fotócsere akár mind a 6 hívócsempén',
        'Távoli Hívási Engedélyek (Fehérlista) kezelése az ismeretlen és csaló (spam) hívók blokkolására',
        'Ébresztők és részletes gyógyszeremlékeztetők távoli beállítása, valós idejű „Bevettem” visszajelzéssel',
        'Otthoni Biztonsági Zóna (Geofencing) elhagyási/hazaérkezési riasztás és beépített élő mini-térkép egygombos Google Térkép navigációval',
      ],
    ],
    videoShowcase: {
      videoId: 'yLFO0MMnATo',
      badge: 'Lépésről lépésre videós útmutató',
      title: 'Teljes, 12 lépéses beállítási és működési útmutató',
      subtitle:
        'Bal oldalon a családtag távoli vezérlőpultja, jobb oldalon az idős hozzátartozó védett telefonja. Kattints bármelyik lépésre a listában, és ugorj egyből az adott funkcióhoz!',
      leftPhoneLegend: '📱 Bal oldali telefon: Gondozó (Családtag) távoli vezérlőpultja',
      rightPhoneLegend: '📱 Jobb oldali telefon: Gondozott (Idős) védett kioszk képernyője',
      chapterListTitle: 'Gyorsugrás a funkciókhoz (16)',
      totalDuration: '13:05 perc',
      chapters: [
        { time: '00:00', seconds: 0, title: 'Bevezetés – Mi a SENEAR?', desc: 'Két készülék, teljes nyugalom a családnak' },
        { time: '00:07', seconds: 7, title: '1. Alapbeállítások és Szerepkörök', desc: 'Gondozó és Gondozott mód kiválasztása' },
        { time: '00:37', seconds: 37, title: '2. Védett Kioszk Mód & Őrszem', desc: 'Véletlen elnavigálás elleni védelem bekapcsolása' },
        { time: '01:57', seconds: 117, title: '3. Készülékek párosítása', desc: 'Összekapcsolás 6 jegyű biztonsági kóddal' },
        { time: '03:08', seconds: 188, title: '4. Távoli vezérlőpult & Hívócsempék', desc: 'Fotók és gyorshívók távoli beállítása valós időben', badge: 'Népszerű' },
        { time: '04:17', seconds: 257, title: '4/6 csempés nézet & Látáskönnyítés', desc: 'Betűméret, arcképek és színek távoli finomhangolása' },
        { time: '05:41', seconds: 341, title: '5. Hívásszűrés & Csalók blokkolása', desc: 'Fehérlista: csak az engedélyezett számok csörögnek ki' },
        { time: '06:18', seconds: 378, title: '6. Automatikus hívásfogadás', desc: 'Érintés nélküli felvétel 100%-os kihangosítással', badge: 'Kiemelt' },
        { time: '06:55', seconds: 415, title: 'Manuális hívás & Félretárcsázás védelem', desc: 'Igen/Nem megerősítő ablak és nem fogadott hívás jelzés' },
        { time: '07:39', seconds: 459, title: '7. Nagybetűs SMS ablak', desc: 'Automatikusan felugró, jól olvasható üzenetek' },
        { time: '07:49', seconds: 469, title: '8. Napi rutinok és Ébresztők', desc: 'Időzített emlékeztetők küldése távolról' },
        { time: '08:25', seconds: 505, title: 'Fotós gyógyszeremlékeztető', desc: 'Gyógyszer fotója + adagolás + „Bevettem” visszajelzés', badge: 'Kiemelt' },
        { time: '09:47', seconds: 587, title: '9. GPS térkép & Elbóklászás riasztás', desc: 'Biztonsági zóna (Geofencing) és azonnali navigáció' },
        { time: '10:31', seconds: 631, title: 'PIN-védelem & SOS vészhelyzeti gomb', desc: 'Segélyhívás és automatikus GPS-koordinátás SMS' },
        { time: '11:03', seconds: 663, title: '10. Riasztási napló & Kikapcsolás-védelem', desc: 'Azonnali értesítés lemerülés vagy kikapcsolás esetén' },
        { time: '12:13', seconds: 733, title: 'Nagy gombos tárcsázó & Gyors SMS', desc: 'Előre beállított üzenetek küldése gépelés nélkül' },
      ],
    },
    founderNote: {
      quote:
        '„Miért készítettem a SENEAR-t? Olyan megoldást kerestem a családomnak, amihez nem kell drága, mégis bonyolult nyomógombos senior telefont venni, nem bombázza reklámokkal az időseket, és valódi biztonságot ad demencia vagy telefonos csalók esetén is. A SENEAR európai fejlesztés, 100%-ban reklámmentes és GDPR-konform.”',
      author: 'Bányai Gábor',
      role: 'alapító & fejlesztő (Gabba Labs)',
      badges: ['🇪🇺 Európai fejlesztés', '🛡️ 100% reklámmentes', '🔒 EU GDPR-konform'],
    },
    faqTitle: 'Gyakori kérdések (GYIK)',
    faqs: [
      {
        q: 'Milyen telefonokon működik a SENEAR?',
        a: 'A védett senior Kioszk módhoz Android 8.0 vagy újabb rendszerű telefon szükséges (az Apple iOS nem engedélyezi a kezdőképernyő ilyen szintű védelmét). A gondozói vezérlőpult szintén Android készüléken érhető el.',
      },
      {
        q: 'Kell SIM-kártya az idős hozzátartozó telefonjába?',
        a: 'Nem feltétlenül! Otthoni Wi-Fi-n SIM-kártya nélkül is működik az ingyenes SENEAR Wi-Fi hívás, a gyógyszeremlékeztető és a távoli felügyelet. Hagyományos telefonszámok hívásához és SMS-hez szükséges SIM-kártya (a 112-es segélyhívó SIM nélkül is működik).',
      },
      {
        q: 'Mit lát a gondozó, és kell-e hozzá az idős ember beleegyezése?',
        a: 'Igen, a két telefon párosítása csak az idős hozzátartozó készülékén történő kifejezett, GDPR-konform jóváhagyással indítható el. A gondozó látja az akkumulátorszintet, a gyógyszerbevétel visszaigazolását és (ha be van kapcsolva) a GPS-pozíciót, de nem látja a privát üzeneteket vagy beszélgetéseket. Minden adat egyetlen gombnyomással végleg törölhető.',
      },
      {
        q: 'Mi történik, ha lemondom a gondozói előfizetést?',
        a: 'Az idős hozzátartozó telefonja továbbra is teljes értékű, reklámmentes, védett Kioszk telefonként és csalószűrőként működik tovább, teljesen ingyen! Csak a távoli gondozói szinkronizáció szünetel.',
      },
      {
        q: 'Vissza lehet térni a hagyományos Android menübe?',
        a: 'Igen, a felső órára 5-ször koppintva, a 4 jegyű gondozói PIN-kód megadásával bármikor kikapcsolható a Kioszk mód.',
      },
      {
        q: 'Új telefont kell vennem, vagy jó a meglévő készülék is?',
        a: 'Nem kell új telefont venni! Bármilyen meglévő vagy fiókban lévő Android okostelefon (Samsung, Xiaomi, Redmi, Motorola, Huawei stb.) tökéletes hozzá, és gyári visszaállításra sincs szükség.',
      },
    ],
  },
  en: {
    heroPrimaryDownloadBtn: 'Download on Google Play — Free',
    heroHowLink: 'How it works? ↓',
    heroVideoLink: 'Setup video (13 min) ↓',
    heroSetupLink: 'Step-by-step setup guide →',
    scenariosTitle: 'Sound familiar?',
    scenarios: [
      {
        quote: '“My mom is 78 and always picks up calls from unknown phone scammers.”',
        solutionLabel: 'Solution:',
        solution:
          'SENEAR’s Call Whitelist only lets pre-approved family and trusted contacts ring through.',
      },
      {
        quote: '“My dad accidentally changes settings, mutes his phone, or forgets his medication.”',
        solutionLabel: 'Solution:',
        solution:
          'Fail-safe Kiosk screen, hands-free 100% speakerphone auto-answer, and photo medication reminders.',
      },
      {
        quote: '“I live in another city and want peace of mind knowing they are safe during the day.”',
        solutionLabel: 'Solution:',
        solution:
          'Real-time battery status, medication confirmation, GPS safe zone, and free Wi-Fi calls on your own phone.',
      },
    ],
    corePillars: [
      {
        title: 'Fail-safe Kiosk protection',
        desc: 'No accidental muting, deleted apps, or confusing menus.',
      },
      {
        title: '100% scammer blocking',
        desc: 'Only pre-approved family members and trusted contacts can ring through.',
      },
      {
        title: 'Remote care & SOS safety',
        desc: 'Live battery, GPS safe zone, photo medication reminders, and auto-speakerphone.',
      },
    ],
    modes: [
      {
        title: 'I just need a simple, protected phone',
        body: 'If you want a simple, fail-safe and protected phone: your loved one gets a clean interface where they can only call — and only receive calls from — pre-approved people, fully protected from unknown harassers and phone scammers.',
        priceLabel: 'Pricing • Standalone Senior Mode',
        badge: 'Free forever — €0 / month, 100% ad-free',
      },
      {
        title: 'I also want to see from afar that they’re okay',
        body: 'Want to know your loved one is safe, even from afar? Connect their device to your own phone! As a caregiver you see the phone’s status in real time (battery, signal, location), manage contacts remotely and get an instant alert on an SOS press or low battery.',
        priceLabel: 'Pricing • Remote Caregiver Connection',
        badge: '14-day free trial, then €3.99 / month (or €39.99 / year) • Cancel anytime',
      },
    ],
    howSteps: [
      {
        title: 'Install on your parent’s phone',
        desc: 'Works on any existing Android smartphone—even without a SIM card over home Wi-Fi.',
      },
      {
        title: 'Pair with a 6-digit code',
        desc: 'After the senior’s consent, link both phones in seconds using a one-time security code.',
      },
      {
        title: 'Manage remotely with peace of mind',
        desc: 'Set up photo speed-dial tiles, medication reminders, and GPS safe zones from your own phone.',
      },
    ],
    setupTimeBanner:
      '⏱️ How long does setup take? Initial setup takes about 10–15 minutes because Android requires one-time security permissions for Kiosk protection and auto-speakerphone. Our step-by-step video guides you through every tap—and once done, the phone cannot be accidentally misconfigured.',
    specsToggleBtn: 'Show all features & technical specifications (20+ features) ↓',
    specsHideBtn: 'Hide detailed feature specifications ↑',
    featureTitles: ['Senior’s phone features', 'Secure connection features', 'Caregiver’s phone features'],
    features: [
      [
        'Fail-safe, locked Kiosk interface (also works independently without a caregiver)',
        '4 or up to 6 photo call tiles with first name, relationship, and missed call (“Called you!”) indicator',
        'Customizable text, photo, and phone icon sizes (3-step adjustable or toggleable)',
        'Regular SIM calls (even offline) and SIM-free Wi-Fi voice & video calls',
        'Automatic speakerphone starting at 100% volume, on-screen volume slider, and silent blocking of parallel incoming calls during an active conversation',
        'One-tap pre-written quick SMS sending and giant-print incoming SMS popup cards',
        'Emergency SOS call and automatic GPS location SMS dispatch',
        'Morning wake-up alarm and personalized daily routine reminders',
        '2-step medication reminder with exact dosage instructions, photo, and one-tap “Taken / Done” confirmation to the caregiver',
      ],
      [
        'Fast device linking with a 6-digit pairing code',
        'Multi-caregiver support (up to 6 family members) & automatic speed-dial tile population upon pairing (Slots 1–6)',
        'Real-time status updates and instant synchronization through a secure EU cloud',
        'Interruption-proof operation: multi-brand battery optimization guard & Watchdog (Xiaomi, Samsung, Huawei, etc.)',
        'Bank-grade data transfer and end-to-end encryption (TLS 1.3 / AES-256)',
        'EU GDPR-compliant data handling with bilateral consent and one-tap permanent data deletion anytime',
      ],
      [
        'Instant alerts when the senior’s phone is switched on/off and before low battery depletion',
        'Voice and video calls to the senior’s phone — even without a SIM card over Wi-Fi',
        'Remote auto-answer: the caregiver can answer their own call on the senior’s phone, hands-free on speaker',
        'Remote ringtone max-volume restoration (if the phone was accidentally muted)',
        'Remote contact name, phone number, and photo replacement across all up to 6 call tiles',
        'Remote Call Permissions (Whitelist) management to block unknown and scam callers',
        'Remote setup of wake-up alarms and detailed medication reminders with real-time “Taken / Done” confirmation',
        'Home Safe Zone (Geofencing) exit/return alerts and built-in live mini-map with one-tap Google Maps navigation',
      ],
    ],
    videoShowcase: {
      videoId: '7UUD1rOxeOo',
      badge: 'Step-by-Step Video Guide',
      title: 'Complete 12-Step Setup & Feature Walkthrough',
      subtitle:
        'On the left is the family member’s remote dashboard, on the right is the senior loved one’s protected phone. Click any step in the list to jump straight to that feature!',
      leftPhoneLegend: '📱 Left phone: Caregiver (Family member) remote dashboard',
      rightPhoneLegend: '📱 Right phone: Senior (Loved one) protected kiosk screen',
      chapterListTitle: 'Quick jump to features (12)',
      totalDuration: '12:58 min',
      chapters: [
        {
          time: '00:00',
          seconds: 0,
          title: '1. Installation, Role Selection & Permissions',
          desc: 'Launch the SENEAR app on both phones, approve essential permissions (camera, location, microphone, notifications, phone calls, and SMS), then select **Caregiver** mode on the left phone and **Senior** mode on the right phone.',
        },
        {
          time: '00:24',
          seconds: 24,
          title: '2. Profile Details & Protected Kiosk System Permissions',
          desc: 'Enter Caregiver details (Mary Smith) to open the Caregiver Dashboard, then enter Senior details (John Smith) and enable the Kiosk system permissions step by step: *Appear on top*, *Modify system settings*, *Default Home app*, and *SENEAR Kiosk Guard* in Accessibility.',
        },
        {
          time: '01:45',
          seconds: 105,
          title: '3. Two Phones, One System – Instant Pairing',
          desc: "Open *My Seniors & Pairing* on the Caregiver's phone and *General Settings* on the Senior's phone. Consent to pairing to generate the 6-digit security code (TD6F4T), link both phones with one tap, then enable SMS notification access and disable battery optimization under *SMS & Battery Management*.",
        },
        {
          time: '02:52',
          seconds: 172,
          title: '4. Remote Photo, Contact & Tile Setup (4 or 6 Tiles)',
          desc: "Start the protected Kiosk mode on the Senior's phone. Remotely upload and crop portrait photos for Tiles 1–4 (Mary, Peter, Eva, George), switch to the **6-tile layout** (04:01) to add Eve and John, and remotely adjust icon, text, and photo sizes in real time under *Show Profile Photos* (04:46).",
          badge: 'Popular',
        },
        {
          time: '05:31',
          seconds: 331,
          title: '5. Call Permissions (Whitelist) & Scammer Protection',
          desc: 'Under *Call Permissions*, add trusted contacts (such as Kate and Andrew) who are allowed to call the senior in addition to the 6 main speed-dial tiles, while unknown numbers and phone scammers are automatically blocked.',
        },
        {
          time: '06:19',
          seconds: 379,
          title: '6. Free Wi-Fi Call, 100% Speakerphone Auto-Answer & Callback',
          desc: 'Remotely enable *Auto-answer* and *Auto-speaker* under *Advanced Call Settings* so incoming Wi-Fi calls are answered hands-free at 100% speakerphone volume with an on-screen volume slider. If auto-answer is off, missed calls display a red *Missed call!* badge on the tile for one-tap callback with *YES / NO* confirmation.',
          badge: 'Featured',
        },
        {
          time: '07:31',
          seconds: 451,
          title: '7. Senior-Friendly, Large-Print Incoming SMS Popup',
          desc: "Standard SMS text messages sent to the senior's phone automatically pop up in a high-contrast, large-print card on the Kiosk screen and can be closed with a single tap.",
        },
        {
          time: '07:34',
          seconds: 454,
          title: '8. Alarms, Photo Medication Reminders & Power Alerts',
          desc: 'Remotely schedule an 8:00 AM wake-up alarm and a photo medication reminder (*One vitamin drop in a glass of water*). At the scheduled time (08:40), the senior views the photo and taps *DONE / TAKEN* for instant confirmation. Also demonstrates *Notification Settings*, live power-off/restart and power-on push alerts, and *Alert History* (09:01).',
          badge: 'Featured',
        },
        {
          time: '09:51',
          seconds: 591,
          title: '9. Live Mini-Map, Safe Zone & SOS Emergency Call',
          desc: "Check the senior's live location on the built-in Google Maps mini-map, launch turn-by-turn navigation, and configure the Home Safe Zone with a custom wandering alert radius (100m–1000m). On the Kiosk screen, pressing the red *SOS CALL* button or any contact tile shows a clear *YES / NO* confirmation screen (10:31).",
        },
        {
          time: '10:43',
          seconds: 643,
          title: '10. Large-Button Free-Dial Keypad & Quick SMS',
          desc: 'Tap the keypad button in the bottom-right corner of the Kiosk screen to dial any phone number using the large-button keypad (10:52), or switch to the *SMS* tab (11:10) to send pre-written quick text messages (*Please call me!*) to family members without typing.',
        },
        {
          time: '11:23',
          seconds: 683,
          title: '11. Returning from Kiosk Mode to Local Caregiver Settings',
          desc: "Tap the top clock 5 times quickly on the senior's phone and enter the default 1234 PIN code (customizable anytime). Access all caregiver settings locally—including *Quick Messages Setup*, *Sound & Screen Settings* (ringer, speakerphone, automatic day/night brightness & volume sliders at 11:58), *Edit Contacts*, *Daily Routines*, and *SOS Configuration* with GPS emergency SMS contacts (12:21).",
        },
        {
          time: '12:37',
          seconds: 757,
          title: '12. Exiting Caregiver Settings to the Android Menu',
          desc: "Tap the red *Back to Phone Menu* button at the bottom of Caregiver Settings and select the phone's default Home app (*One UI Home*) to deactivate Kiosk mode and return to the standard Android menu. The protected Kiosk interface can be relaunched anytime via the SENEAR icon.",
        },
      ],
    },
    founderNote: {
      quote:
        '“Why I built SENEAR: I wanted a solution for my own family that didn’t require buying an expensive yet clunky physical senior phone, had zero ads, and offered real protection against phone scammers and wandering. SENEAR is built in Europe, 100% ad-free, and strictly GDPR-compliant.”',
      author: 'Gábor Bányai',
      role: 'Founder & Developer (Gabba Labs)',
      badges: ['🇪🇺 Built in Europe', '🛡️ 100% Ad-Free', '🔒 Strictly GDPR-Compliant'],
    },
    faqTitle: 'Frequently Asked Questions (FAQ)',
    faqs: [
      {
        q: 'Which phones does SENEAR support?',
        a: 'SENEAR runs on Android 8.0 or newer (Apple iOS does not allow deep Kiosk home-screen lock or auto-speakerphone control).',
      },
      {
        q: "Does the senior's phone need a SIM card?",
        a: 'Not necessarily! Over home Wi-Fi, free SENEAR Wi-Fi calls with paired caregivers, medication reminders, and remote management work even without a SIM card. A SIM card is only required for standard cellular calls and SMS.',
      },
      {
        q: 'What can the caregiver see, and is the senior’s consent required?',
        a: 'Yes. Pairing requires explicit GDPR-compliant consent on the senior’s device. The caregiver sees battery status, medication confirmations, and (if enabled) GPS location, but never private call audio. All data can be permanently deleted anytime.',
      },
      {
        q: 'What happens if I cancel the caregiver subscription?',
        a: 'Your loved one’s phone continues to work as a standalone, scammer-protected Kiosk phone for free forever! Only remote caregiver syncing pauses.',
      },
      {
        q: 'Can we exit Kiosk mode back to the normal Android menu?',
        a: 'Yes, anytime by tapping the top clock 5 times and entering the 4-digit caregiver PIN code.',
      },
      {
        q: 'Do I need to buy a new phone, or can we use an existing one?',
        a: 'No new hardware needed! Any existing or spare Android smartphone (Samsung, Xiaomi, Motorola, Pixel, etc.) works out of the box without a factory reset.',
      },
    ],
  },
  de: {
    heroPrimaryDownloadBtn: 'Bei Google Play laden – Kostenlos',
    heroHowLink: 'So funktioniert’s ↓',
    heroVideoLink: 'Einrichtungsvideo (13 Min.) ↓',
    heroSetupLink: 'Schritt-für-Schritt-Anleitung →',
    scenariosTitle: 'Kommt Ihnen das bekannt vor?',
    scenarios: [
      {
        quote: '„Meine Mutter ist 78 und geht immer bei unbekannten Telefonbetrügern ran.“',
        solutionLabel: 'Lösung:',
        solution: 'Die SENEAR-Whitelist lässt nur vorab genehmigte Kontakte durchklingeln.',
      },
      {
        quote: '„Mein Vater verstellt versehentlich das Handy, schaltet es stumm oder vergisst seine Medikamente.“',
        solutionLabel: 'Lösung:',
        solution:
          'Geschützter Kiosk-Bildschirm, automatische Rufannahme mit 100 % Lautsprecher und Foto-Medikamentenerinnerungen.',
      },
      {
        quote: '„Ich wohne in einer anderen Stadt und möchte sehen, ob tagsüber alles in Ordnung ist.“',
        solutionLabel: 'Lösung:',
        solution:
          'Echtzeit-Akkustatus, Medikamentenbestätigung, GPS-Sicherheitszone und kostenlose WLAN-Anrufe.',
      },
    ],
    corePillars: [
      {
        title: 'Unverstellbarer Kiosk-Schutz',
        desc: 'Kein versehentliches Stummschalten, Löschen von Apps oder Verirren in Menüs.',
      },
      {
        title: '100 % Schutz vor Telefonbetrügern',
        desc: 'Nur vorab freigegebene Familienmitglieder und Kontakte klingeln durch.',
      },
      {
        title: 'Fernbetreuung & SOS-Notruf',
        desc: 'Live-Akkustatus, GPS-Sicherheitszone, Foto-Medikamentenerinnerung und Freisprechen.',
      },
    ],
    modes: [
      {
        title: 'Ich brauche nur ein einfaches, geschütztes Telefon',
        body: 'Wenn Sie ein einfach bedienbares, unverstellbares und geschütztes Telefon wünschen: Ihr Angehöriger erhält eine klare Oberfläche, über die er nur voreingestellte Personen anrufen und nur von ihnen Anrufe empfangen kann – vollständig geschützt vor unbekannten Belästigern und Telefonbetrügern.',
        priceLabel: 'Preise • Eigenständiger Senioren-Modus',
        badge: 'Für immer kostenlos – 0 € / Monat, 100 % werbefrei',
      },
      {
        title: 'Ich möchte auch aus der Ferne sehen, dass alles gut ist',
        body: 'Sie möchten Ihren Angehörigen auch aus der Ferne in Sicherheit wissen? Verbinden Sie sein Gerät mit Ihrem Telefon! Als Betreuer sehen Sie den Telefonstatus in Echtzeit (Akku, Empfang, Standort), verwalten Kontakte aus der Ferne und erhalten sofort einen Alarm bei SOS oder schwachem Akku.',
        priceLabel: 'Preise • Fernbetreuer-Verbindung',
        badge: '14 Tage kostenlos testen, danach 3,99 € / Monat (oder 39,99 € / Jahr) • Jederzeit kündbar',
      },
    ],
    howSteps: [
      {
        title: 'Auf dem Handy der Eltern installieren',
        desc: 'Läuft auf jedem vorhandenen Android-Smartphone – über WLAN sogar ohne SIM-Karte.',
      },
      {
        title: 'Mit 6-stelligem Code koppeln',
        desc: 'Nach Zustimmung des Seniors verbinden Sie beide Telefone sofort per Sicherheitscode.',
      },
      {
        title: 'Entspannt aus der Ferne verwalten',
        desc: 'Richten Sie Foto-Kacheln, Medikamentenerinnerungen und GPS-Zonen vom eigenen Handy aus ein.',
      },
    ],
    setupTimeBanner:
      '⏱️ Wie lange dauert die Einrichtung? Die Ersteinrichtung dauert ca. 10–15 Minuten, da Android einmalige Sicherheitsberechtigungen für den Kiosk-Schutz benötigt. Unser Video führt Sie Schritt für Schritt durch – danach ist das Telefon verstell-sicher.',
    specsToggleBtn: 'Alle Funktionen & technische Details anzeigen (20+ Funktionen) ↓',
    specsHideBtn: 'Detaillierte Funktionsliste ausblenden ↑',
    featureTitles: ['Funktionen des Senioren-Telefons', 'Funktionen der sicheren Verbindung', 'Funktionen des Betreuer-Telefons'],
    features: [
      [
        'Unverstellbare, gesperrte Kiosk-Oberfläche (funktioniert bei Bedarf auch eigenständig ohne Betreuer)',
        '4 oder bis zu 6 Foto-Anrufkacheln mit Vorname, Beziehung und Anzeige verpasster Anrufe („Hat angerufen!“)',
        'Anpassbare Text-, Foto- und Telefonsymbolgrößen (3-stufig einstellbar oder ausblendbar)',
        'Klassische SIM-Anrufe (auch ohne Internet) sowie SIM-lose WLAN-Sprach- und Videoanrufe',
        'Automatische Freisprechfunktion mit 100 % Startlautstärke, Lautstärkeregler auf dem Bildschirm und lautloser Blockierung paralleler Anrufe während eines Gesprächs',
        'Vorgefertigte Schnell-SMS senden und eingehende SMS als Großschrift-Pop-up-Karte lesen',
        'SOS-Notruf und automatischer SMS-Versand mit GPS-Standort',
        'Morgendlicher Wecker und persönliche Tagesroutinen-Erinnerungen',
        '2-stufige Medikamentenerinnerung mit genauer Dosierung, Foto und Ein-Klick-Bestätigung („Eingenommen“) an den Betreuer',
      ],
      [
        'Schnelle Verbindung über einen 6-stelligen Kopplungscode',
        'Unterstützung für mehrere Betreuer (bis zu 6 Familienmitglieder) & automatische Kurzwahlkachel-Belegung beim Koppeln (Platz 1–6)',
        'Statusaktualisierungen in Echtzeit und sofortige Synchronisierung über eine sichere EU-Cloud',
        'Unterbrechungssicherer Betrieb: herstellerspezifischer Akku-Schutz & Watchdog (Xiaomi, Samsung, Huawei u.a.)',
        'Datenübertragung auf Bankniveau und Ende-zu-Ende-Verschlüsselung (TLS 1.3 / AES-256)',
        'EU-DSGVO-konforme Datenverarbeitung mit beidseitiger Einwilligung und endgültiger Ein-Klick-Datenlöschung jederzeit',
      ],
      [
        'Sofortige Benachrichtigung beim Ein- und Ausschalten des Senioren-Telefons sowie bei niedrigem Akkustand (vor dem Entladen)',
        'Sprach- und Videoanrufe zum Senioren-Telefon — auch ohne SIM-Karte über WLAN',
        'Automatische Rufannahme: Der Betreuer kann seinen eigenen Anruf am Senioren-Telefon aus der Ferne per Lautsprecher annehmen',
        'Fernwiederherstellung der maximalen Klingeltonlautstärke (falls das Gerät versehentlich stummgeschaltet wurde)',
        'Fernverwaltung von Namen, Telefonnummern und Fotos für bis zu 6 Anrufkacheln',
        'Fernverwaltung der Anrufberechtigungen (Whitelist) zur Blockierung unbekannter und betrügerischer (Spam-)Anrufer',
        'Ferneinrichtung von Weckern und detaillierten Medikamenten-Erinnerungen mit Echtzeit-Bestätigung („Eingenommen“)',
        'Sicherheitszonen-Warnungen (Geofencing) beim Verlassen/Zurückkehren sowie integrierte Live-Minikarte mit Ein-Klick-Navigation über Google Maps',
      ],
    ],
    videoShowcase: {
      videoId: '7UUD1rOxeOo',
      badge: 'Schritt-für-Schritt-Videoanleitung',
      title: 'Komplette 12-Schritte-Einrichtungsanleitung',
      subtitle:
        'Links sehen Sie das Fernsteuerungs-Dashboard des Familienmitglieds, rechts das geschützte Telefon des Angehörigen. Klicken Sie auf einen beliebigen Schritt in der Liste, um direkt zu dieser Funktion zu springen!',
      leftPhoneLegend: '📱 Linkes Telefon: Fernsteuerungs-Dashboard des Betreuers (Familienmitglied)',
      rightPhoneLegend: '📱 Rechtes Telefon: Geschützter Kiosk-Bildschirm des Seniors (Angehörigen)',
      chapterListTitle: 'Schnellzugriff auf Funktionen (12)',
      totalDuration: '12:58 Min.',
      chapters: [
        { time: '00:00', seconds: 0, title: '1. Installation, Rollenauswahl & Berechtigungen', desc: 'SENEAR auf beiden Telefonen starten, Berechtigungen freigeben und links **Betreuer**, rechts **Senior** wählen.' },
        { time: '00:24', seconds: 24, title: '2. Profildaten & Geschützte Kiosk-Systemberechtigungen', desc: 'Profil eingeben und Kiosk-Berechtigungen aktivieren: *Über anderen Apps*, *Systemeinstellungen*, *Start-App* und *SENEAR Kiosk Guard*.' },
        { time: '01:45', seconds: 105, title: '3. Zwei Telefone, Ein System – Sofortige Kopplung', desc: 'Kopplung mit dem 6-stelligen Sicherheitscode (TD6F4T) sowie SMS-Zugriff & Akku-Optimierung unter *SMS & Battery Management*.' },
        { time: '02:52', seconds: 172, title: '4. Fotos, Kontakte & Kachel-Einrichtung (4 oder 6 Kacheln)', desc: 'Fotos für Kacheln 1–4 aus der Ferne hochladen, auf **6-Kachel-Ansicht** (04:01) wechseln und Größen in Echtzeit anpassen (04:46).', badge: 'Beliebt' },
        { time: '05:31', seconds: 331, title: '5. Anrufberechtigungen (Whitelist) & Betrugsschutz', desc: 'Vertrauenswürdige Kontakte zur Whitelist hinzufügen, während unbekannte Nummern und Telefonbetrüger blockiert werden.' },
        { time: '06:19', seconds: 379, title: '6. Kostenloser WLAN-Anruf, 100 % Freisprechen & Rückruf', desc: '*Auto-Answer* und *Auto-Speaker* aktivieren (100 % Lautstärke) oder Rückruf über das rote *Missed call!*-Abzeichen mit *JA / NEIN*-Bestätigung.', badge: 'Highlight' },
        { time: '07:31', seconds: 451, title: '7. Seniorengerechtes Großschrift-SMS-Popup', desc: 'Eingehende SMS erscheinen automatisch als kontrastreiche Großschrift-Karte auf dem Kiosk-Bildschirm.' },
        { time: '07:34', seconds: 454, title: '8. Wecker, Foto-Medikamentenerinnerung & Strom-Alarme', desc: 'Wecker und Foto-Medikamentenerinnerung mit *DONE / TAKEN*-Bestätigung (08:40) sowie Push-Alarme beim Aus-/Einschalten (09:01).', badge: 'Highlight' },
        { time: '09:51', seconds: 591, title: '9. Live-Minikarte, Sicherheitszone & SOS-Notruf', desc: 'Live-Standort auf der Google-Maps-Minikarte, Sicherheitszone (100–1000 m) und roter *SOS CALL*-Button mit *JA / NEIN*-Bestätigung (10:31).' },
        { time: '10:43', seconds: 643, title: '10. Großtasten-Wählfeld & Schnell-SMS', desc: 'Freies Wählen über das Großtasten-Wählfeld (10:52) oder vorgefertigte Schnell-SMS (*Please call me!*) ohne Tippen senden (11:10).' },
        { time: '11:23', seconds: 683, title: '11. Vom Kiosk-Modus in die lokalen Betreuer-Einstellungen', desc: 'Oben 5-mal auf die Uhr tippen (PIN 1234): Schnellnachrichten, Ton & Bildschirm (11:58), Kontakte, Routinen und SOS-Konfiguration (12:21).' },
        { time: '12:37', seconds: 757, title: '12. Betreuer-Einstellungen zum Android-Menü verlassen', desc: 'Unten auf *Back to Phone Menu* tippen und Standard-Start-App (*One UI Home*) wählen, um zum normalen Android-Menü zurückzukehren.' },
      ],
    },
    founderNote: {
      quote:
        '„Warum ich SENEAR entwickelt habe: Ich suchte für meine eigene Familie nach einer Lösung ohne teures, umständliches Tastenhandy – komplett werbefrei und mit echtem Schutz vor Telefonbetrügern. SENEAR wird in Europa entwickelt, ist 100 % werbefrei und DSGVO-konform.“',
      author: 'Gábor Bányai',
      role: 'Gründer & Entwickler (Gabba Labs)',
      badges: ['🇪🇺 Entwickelt in Europa', '🛡️ 100 % Werbefrei', '🔒 Streng DSGVO-konform'],
    },
    faqTitle: 'Häufige Fragen (FAQ)',
    faqs: [
      {
        q: 'Auf welchen Handys läuft SENEAR?',
        a: 'SENEAR läuft auf Android 8.0 oder neuer (Apple iOS erlaubt keinen tiefen Kiosk-Schutz oder automatisches Freisprechen).',
      },
      {
        q: 'Braucht das Handy des Seniors eine SIM-Karte?',
        a: 'Nicht zwingend! Über das Heim-WLAN funktionieren kostenlose SENEAR-WLAN-Anrufe mit gekoppelten Betreuern, Medikamentenerinnerungen und die Fernverwaltung auch ohne SIM-Karte.',
      },
      {
        q: 'Was sieht der Betreuer und ist die Zustimmung des Seniors erforderlich?',
        a: 'Ja, die Kopplung erfordert die ausdrückliche DSGVO-konforme Zustimmung auf dem Gerät des Seniors. Alle Daten können jederzeit vollständig gelöscht werden.',
      },
      {
        q: 'Was passiert, wenn ich das Betreuer-Abo kündige?',
        a: 'Das Telefon Ihres Angehörigen funktioniert dauerhaft kostenlos als geschütztes Kiosk-Seniorenhandy weiter! Lediglich die Fernverwaltung pausiert.',
      },
      {
        q: 'Kann man den Kiosk-Modus wieder verlassen?',
        a: 'Ja, jederzeit durch 5-maliges Tippen auf die obere Uhr und Eingabe des 4-stelligen Betreuer-PIN-Codes.',
      },
      {
        q: 'Muss ich ein neues Handy kaufen oder reicht das vorhandene Gerät?',
        a: 'Kein Neukauf nötig! Jedes vorhandene Android-Smartphone (Samsung, Xiaomi, Motorola usw.) kann sofort und ohne Werksreset genutzt werden.',
      },
    ],
  },
};

const COPY: Record<ProductKey, Record<Lang, ProductCopy>> = {
  senear: {
    hu: {
      kicker: 'Idősbarát okostelefon-rendszer',
      heroTitle: 'Biztonság az időseknek. Nyugalom a családnak.',
      heroText:
        'Egyszerű, csalóbiztos telefon az idős szüleidnek – te pedig távolról is látod, hogy minden rendben van.',
      chips: [],
      primaryCta: 'Beállítási útmutató',
      benefitsTitle: 'Miért a SENEAR?',
      benefitsSubtitle: 'Három alappillér és átlátható, rugalmas használat a család igényei szerint.',
      howTitle: 'Így működik',
      howSubtitle: 'Két telefon, egy rendszer — 3 egyszerű lépésben.',
      how: [
        {
          title: 'Telepítsd a szülőd telefonjára',
          desc: 'Bármilyen meglévő Android készülékre felteheted, otthoni Wi-Fi-n akár SIM-kártya nélkül is.',
        },
        {
          title: 'Párosítsd a 6 jegyű kóddal',
          desc: 'A szülő jóváhagyása után egyetlen kóddal összekapcsolhatod a két telefont.',
        },
        {
          title: 'Kezeld távolról, nyugodtan',
          desc: 'A saját mobilodról állíthatod be a fényképes hívógombokat, a gyógyszeremlékeztetőket és a GPS-zónát.',
        },
      ],
      spotlightTitle: 'Közelebbről',
      spotlightSubtitle: 'Nézd meg, mit lát az idős felhasználó és mit a gondozó.',
      bullets: [
        ['4 vagy akár 6 nagy, fényképes gyorshívó csempe', 'Óriási, jól olvasható dátum és idő', 'Nincs zavaró menü vagy elállítható beállítás'],
        ['Kontaktok fényképpel és megnevezéssel', 'SOS szám és automatikus GPS SMS', 'Hívásszűrés ismeretlen és csaló hívók ellen'],
        ['Élő akkumulátor- és töltésállapot', 'Pontos helyzet élő mini-térképen és Google Térképen', 'Távolról élesíthető automatikus hívásfogadás'],
        ['Azonnali értesítés SOS esetén', 'Riasztás alacsony akkunál és ki-/bekapcsoláskor', 'Szűrhető eseménynapló'],
      ],
      ctaTitle: 'Készen állsz a beállításra?',
      ctaText:
        'Lépésről lépésre végigvezetünk a Gondozott és a Gondozó telefonjának beállításán — gyári visszaállítás és QR-kód nélkül.',
    },
    en: {
      kicker: 'Senior-friendly smartphone system',
      heroTitle: 'Safety for seniors. Peace of mind for families.',
      heroText:
        'A simple, scammer-proof phone for your aging parents — while you see from afar that everything is okay.',
      chips: [],
      primaryCta: 'Setup guide',
      benefitsTitle: 'Why SENEAR?',
      benefitsSubtitle: 'Three core pillars and transparent options tailored to your family.',
      howTitle: 'How it works',
      howSubtitle: 'Two phones, one system — in 3 simple steps.',
      how: [
        {
          title: 'Install on your parent’s phone',
          desc: 'Works on any existing Android smartphone—even without a SIM card over home Wi-Fi.',
        },
        {
          title: 'Pair with a 6-digit code',
          desc: 'After the senior’s consent, link both phones in seconds using a one-time security code.',
        },
        {
          title: 'Manage remotely with peace of mind',
          desc: 'Set up photo speed-dial tiles, medication reminders, and GPS safe zones from your own phone.',
        },
      ],
      spotlightTitle: 'A closer look',
      spotlightSubtitle: 'See what the senior sees — and what the caregiver sees.',
      bullets: [
        ['4 or up to 6 large photo speed-dial tiles', 'Huge, easy-to-read date and time', 'No confusing menus or settings to break'],
        ['Contacts with photos and labels', 'SOS number with automatic GPS SMS', 'Call filtering against unknown and scam callers'],
        ['Live battery and charging status', 'Exact location on live mini-map & Google Maps', 'Remotely enabled auto-answer on speaker'],
        ['Instant alert on SOS', 'Alerts on low battery and power on/off', 'Filterable event history'],
      ],
      ctaTitle: 'Ready to set it up?',
      ctaText: 'We guide you step by step through setting up both the Senior’s and the Caregiver’s phone — no factory reset, no QR code.',
    },
    de: {
      kicker: 'Seniorenfreundliches Smartphone-System',
      heroTitle: 'Sicherheit für Senioren. Ruhe für die Familie.',
      heroText:
        'Ein einfaches, betrugssicheres Telefon für Ihre älteren Eltern – während Sie aus der Ferne sehen, dass alles in Ordnung ist.',
      chips: [],
      primaryCta: 'Einrichtungsanleitung',
      benefitsTitle: 'Warum SENEAR?',
      benefitsSubtitle: 'Drei Grundpfeiler und transparente Optionen für Ihre Familie.',
      howTitle: 'So funktioniert es',
      howSubtitle: 'Zwei Telefone, ein System — in 3 einfachen Schritten.',
      how: [
        {
          title: 'Auf dem Handy der Eltern installieren',
          desc: 'Läuft auf jedem vorhandenen Android-Smartphone – über WLAN sogar ohne SIM-Karte.',
        },
        {
          title: 'Mit 6-stelligem Code koppeln',
          desc: 'Nach Zustimmung des Seniors verbinden Sie beide Telefone sofort per Sicherheitscode.',
        },
        {
          title: 'Entspannt aus der Ferne verwalten',
          desc: 'Richten Sie Foto-Kacheln, Medikamentenerinnerungen und GPS-Zonen vom eigenen Handy aus ein.',
        },
      ],
      spotlightTitle: 'Im Detail',
      spotlightSubtitle: 'Sehen Sie, was der Senior sieht — und was der Betreuer sieht.',
      bullets: [
        ['4 oder bis zu 6 große Foto-Kurzwahlkacheln', 'Riesige, gut lesbare Uhrzeit und Datum', 'Keine verwirrenden Menüs oder Einstellungen'],
        ['Kontakte mit Foto und Bezeichnung', 'SOS-Nummer mit automatischer GPS-SMS', 'Anruffilter gegen unbekannte und betrügerische Anrufer'],
        ['Live-Akku- und Ladestatus', 'Genauer Standort auf Live-Minikarte & Google Maps', 'Fernaktivierbare automatische Rufannahme'],
        ['Sofortige Benachrichtigung bei SOS', 'Alarm bei niedrigem Akku und Ein-/Ausschalten', 'Filterbares Ereignisprotokoll'],
      ],
      ctaTitle: 'Bereit für die Einrichtung?',
      ctaText: 'Wir führen Sie Schritt für Schritt durch die Einrichtung des Senioren- und des Betreuer-Telefons — ohne Werksreset und QR-Code.',
    },
  },
  junear: {
    hu: {
      kicker: 'Gyerekbiztos okostelefon-rendszer',
      heroTitle: 'Biztonságos első telefon. Nyugodt szülők.',
      heroText:
        'A JUNEAR egy gyerekbarát, szigorúan korlátozott telefonfelület a gyermeknek, és egy szülői vezérlőpult a szülőknek — élő helymeghatározással és csak engedélyezett hívókkal.',
      chips: ['Csak engedélyezett kontaktok', 'Élő GPS és biztonsági zónák', 'Internet nélkül is védett'],
      primaryCta: 'Beállítási útmutató',
      benefitsTitle: 'Miért a JUNEAR?',
      benefitsSubtitle: 'Biztonságos digitális környezet, amelyben a gyermek önállóan, a szülő pedig nyugodtan lehet.',
      howTitle: 'Így működik',
      howSubtitle: 'Két telefon, egy rendszer — a szülő mindig közel van.',
      how: [
        {
          title: 'Gyermek telefonja',
          desc: 'Játékos, mégis szigorúan zárolt felület: a gyermek csak a jóváhagyott alkalmazásokat és kontaktokat éri el.',
        },
        {
          title: 'Biztonságos összeköttetés',
          desc: 'Párosító kóddal a gyermek és a szülő telefonja azonnal összekapcsolódik, az adatok biztonságos felhőn keresztül szinkronizálódnak.',
        },
        {
          title: 'Szülő telefonja',
          desc: 'A szülő látja a gyermek helyzetét, a töltöttséget és a híváslistát, és értesítést kap zónaelhagyáskor.',
        },
      ],
      spotlightTitle: 'Közelebbről',
      spotlightSubtitle: 'Nézd meg, mit lát a gyermek és mit a szülő.',
      bullets: [
        ['Nagy, színes, könnyen érthető ikonok', 'Alkalmazások telepítése és törlése letiltva', 'Rendszerbeállítások elzárva'],
        ['Valós idejű helymeghatározás', 'Otthon és iskola biztonsági zóna', 'Értesítés a zóna elhagyásakor'],
        ['Akkumulátor és töltés állapota', 'Hívásnapló áttekintése', 'Korlátozások távoli módosítása'],
        ['Csak a szülők által engedélyezett számok', 'Fényképes, egyérintéses hívás', 'Ismeretlen hívók automatikus szűrése'],
      ],
      ctaTitle: 'Készen állsz a beállításra?',
      ctaText: 'Lépésről lépésre végigvezetünk a gyermek és a szülő telefonjának beállításán.',
    },
    en: {
      kicker: 'Child-safe smartphone system',
      heroTitle: 'A safe first phone. Relaxed parents.',
      heroText:
        'JUNEAR combines a kid-friendly, strictly restricted phone interface for your child with a parent dashboard — with live location and approved callers only.',
      chips: ['Approved contacts only', 'Live GPS and safe zones', 'Protected even offline'],
      primaryCta: 'Setup guide',
      benefitsTitle: 'Why JUNEAR?',
      benefitsSubtitle: 'A safe digital space where children can be independent and parents can relax.',
      howTitle: 'How it works',
      howSubtitle: 'Two phones, one system — parents are always near.',
      how: [
        {
          title: 'Child’s phone',
          desc: 'A playful yet strictly locked interface: your child can only reach approved apps and contacts.',
        },
        {
          title: 'Secure connection',
          desc: 'A pairing code instantly links the child’s and parent’s phones; data syncs through a secure cloud.',
        },
        {
          title: 'Parent’s phone',
          desc: 'Parents see location, battery and call log, and get notified when a safe zone is left.',
        },
      ],
      spotlightTitle: 'A closer look',
      spotlightSubtitle: 'See what the child sees — and what the parent sees.',
      bullets: [
        ['Large, colourful, easy-to-understand icons', 'Installing and removing apps is blocked', 'System settings are locked'],
        ['Real-time location', 'Home and school safe zones', 'Alert when a zone is left'],
        ['Battery and charging status', 'Call log overview', 'Change restrictions remotely'],
        ['Only parent-approved numbers', 'One-tap calling with photos', 'Unknown callers filtered automatically'],
      ],
      ctaTitle: 'Ready to set it up?',
      ctaText: 'We guide you step by step through setting up both the child’s and the parent’s phone.',
    },
    de: {
      kicker: 'Kindersicheres Smartphone-System',
      heroTitle: 'Ein sicheres erstes Handy. Entspannte Eltern.',
      heroText:
        'JUNEAR verbindet eine kinderfreundliche, streng eingeschränkte Telefonoberfläche mit einem Eltern-Dashboard — mit Live-Standort und nur erlaubten Anrufern.',
      chips: ['Nur erlaubte Kontakte', 'Live-GPS und Sicherheitszonen', 'Auch offline geschützt'],
      primaryCta: 'Einrichtungsanleitung',
      benefitsTitle: 'Warum JUNEAR?',
      benefitsSubtitle: 'Ein sicherer digitaler Raum, in dem Kinder selbstständig und Eltern entspannt sein können.',
      howTitle: 'So funktioniert es',
      howSubtitle: 'Zwei Telefone, ein System — die Eltern sind immer nah.',
      how: [
        {
          title: 'Kinder-Telefon',
          desc: 'Eine verspielte, aber streng gesperrte Oberfläche: Ihr Kind erreicht nur freigegebene Apps und Kontakte.',
        },
        {
          title: 'Sichere Verbindung',
          desc: 'Ein Kopplungscode verbindet Kinder- und Eltern-Telefon sofort; die Daten werden über eine sichere Cloud synchronisiert.',
        },
        {
          title: 'Eltern-Telefon',
          desc: 'Eltern sehen Standort, Akku und Anrufliste und werden beim Verlassen einer Zone benachrichtigt.',
        },
      ],
      spotlightTitle: 'Im Detail',
      spotlightSubtitle: 'Sehen Sie, was das Kind sieht — und was die Eltern sehen.',
      bullets: [
        ['Große, bunte, leicht verständliche Symbole', 'Installieren und Löschen von Apps gesperrt', 'Systemeinstellungen gesperrt'],
        ['Standort in Echtzeit', 'Sicherheitszonen für Zuhause und Schule', 'Benachrichtigung beim Verlassen einer Zone'],
        ['Akku- und Ladestatus', 'Übersicht der Anrufliste', 'Einschränkungen aus der Ferne ändern'],
        ['Nur von Eltern erlaubte Nummern', 'Anruf mit einem Fingertipp und Foto', 'Unbekannte Anrufer automatisch gefiltert'],
      ],
      ctaTitle: 'Bereit für die Einrichtung?',
      ctaText: 'Wir führen Sie Schritt für Schritt durch die Einrichtung des Kinder- und des Eltern-Telefons.',
    },
  },
};

const BENEFIT_ICONS: Record<ProductKey, React.ComponentType<{ className?: string }>[]> = {
  senear: [Radio, HeartHandshake, Lock, WifiOff],
  junear: [Lock, HeartHandshake, MapPin, WifiOff],
};

const HOW_ICONS: Record<ProductKey, React.ComponentType<{ className?: string }>[]> = {
  senear: [Smartphone, CloudCog, Users],
  junear: [Baby, CloudCog, Users],
};

const PILLAR_ICONS = [Lock, ShieldCheck, HeartHandshake];

interface ProductPageProps {
  product: ProductKey;
  onNavigate: (route: AppRoute) => void;
  onContactClick: () => void;
}

function renderInlineFormatting(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-[#1F2421]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={i} className="italic font-medium text-[#2C2C2C]">
          {part.slice(1, -1)}
        </em>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function ProductPage({ product, onNavigate, onContactClick }: ProductPageProps) {
  const { language, t } = useLanguage();
  const lang = (['hu', 'en', 'de'].includes(language) ? language : 'en') as Lang;
  const c = COPY[product][lang];
  const common = COMMON[lang];
  const accent = PRODUCT_ACCENT[product];
  const name = product.toUpperCase();
  const tp = product === 'senear' ? t.senear : t.junear;
  const audience = product === 'senear' ? t.nearSection.appSeniorLabel : t.nearSection.appJuniorLabel;
  const photos = getProductPhotos(product, t);
  const setupRoute: AppRoute = product === 'senear' ? 'senear-setup' : 'junear-setup';
  const senearExtra = product === 'senear' ? SENEAR_EXTRA[lang] : null;

  const [activeSeconds, setActiveSeconds] = useState<number>(0);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);
  const [activeChapterIdx, setActiveChapterIdx] = useState<number>(0);
  const [playKey, setPlayKey] = useState<number>(0);
  const [showAllSpecs, setShowAllSpecs] = useState<boolean>(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const videoPlayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveSeconds(0);
    setActiveChapterIdx(0);
    setAutoPlay(false);
  }, [lang]);

  const handleChapterClick = (seconds: number, idx: number) => {
    setActiveSeconds(seconds);
    setActiveChapterIdx(idx);
    setAutoPlay(true);
    setPlayKey((prev) => prev + 1);
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      videoPlayerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const benefits = [
    { title: tp.feature1Title, desc: tp.feature1Desc },
    { title: tp.feature2Title, desc: tp.feature2Desc },
    { title: tp.feature3Title, desc: tp.feature3Desc },
    { title: tp.feature4Title, desc: tp.feature4Desc },
  ];

  const SecondaryCta =
    product === 'senear' ? (
      <a
        href="https://play.google.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white text-[#2C2C2C] text-sm font-semibold border border-[#C5A880]/60 hover:bg-[#F5F0EB] shadow-xs transition-all"
      >
        <GooglePlayIcon className="w-4 h-4" />
        {t.senear.btnSimulator}
      </a>
    ) : (
      <button
        type="button"
        onClick={onContactClick}
        className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white text-[#2C2C2C] text-sm font-semibold border border-[#C5A880]/60 hover:bg-[#F5F0EB] shadow-xs transition-all cursor-pointer"
      >
        <BellRing className="w-4 h-4" style={{ color: accent.main }} />
        {t.junear.btnMoreInfo}
      </button>
    );

  const PrimaryCta = ({ large = false }: { large?: boolean }) => (
    <button
      type="button"
      onClick={() => onNavigate(setupRoute)}
      className={`inline-flex items-center gap-2.5 rounded-xl bg-[#2C2C2C] text-white font-semibold hover:bg-black shadow-md hover:shadow-lg transition-all cursor-pointer group ${
        large ? 'px-7 py-4 text-base' : 'px-6 py-3.5 text-sm'
      }`}
    >
      <BookOpen className="w-4 h-4" style={{ color: accent.soft }} />
      {c.primaryCta}
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" style={{ color: accent.soft }} />
    </button>
  );

  return (
    <div className="bg-[#FAFAFA] text-[#2C2C2C] overflow-x-clip">
      {/* ================================================================= */}
      {/* 1. HERO                                                           */}
      {/* ================================================================= */}
      <section className="relative bg-gradient-to-b from-[#FAFAFA] via-[#F8F5F1] to-[#F5F0EB] border-b border-[#C5A880]/20">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(#2C2C2C 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:pb-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs font-medium text-[#8C7355] mb-8">
            <button type="button" onClick={() => onNavigate('home')} className="hover:text-[#2C2C2C] cursor-pointer">
              {common.home}
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#2C2C2C] font-semibold">{name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-7">
              <div className="flex items-center gap-4">
                <img src={`/logos/${product}-logo.png`} alt={`${name} logo`} className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
                <div>
                  <div className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight leading-none">{name}</div>
                  <div className="text-sm font-semibold text-[#8C7355] mt-1.5">
                    {audience} · {c.kicker}
                  </div>
                </div>
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight leading-[1.1]">
                {c.heroTitle}
              </h1>
              <p className="text-base sm:text-lg text-[#5C5A56] leading-relaxed max-w-xl">{c.heroText}</p>

              {c.chips.length > 0 && (
                <div className="flex flex-wrap gap-2.5">
                  {c.chips.map((chip) => (
                    <span
                      key={chip}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border text-xs font-semibold text-[#4A4744] shadow-2xs"
                      style={{ borderColor: `${accent.main}66` }}
                    >
                      <Check className="w-3.5 h-3.5" style={{ color: accent.main }} strokeWidth={3} />
                      {chip}
                    </span>
                  ))}
                </div>
              )}

              {senearExtra ? (
                <div className="space-y-4 pt-1">
                  {/* Single Prominent Primary CTA: Google Play Download (Never truncated) */}
                  <div>
                    <a
                      href="https://play.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-4 rounded-2xl font-bold text-sm sm:text-base bg-[#1B7A4E] hover:bg-[#145E3B] text-white shadow-lg hover:shadow-xl active:scale-99 transition-all whitespace-nowrap"
                    >
                      <GooglePlayIcon color="white" className="w-5 h-5 shrink-0 text-white" />
                      <span>{senearExtra.heroPrimaryDownloadBtn}</span>
                    </a>
                  </div>

                  {/* Clean Secondary Text Anchor Links */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold text-[#5C5A56]">
                    <a
                      href="#igy-mukodik"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('igy-mukodik')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className="hover:text-[#1B7A4E] underline decoration-[#C5A880]/60 underline-offset-4 transition-colors"
                    >
                      {senearExtra.heroHowLink}
                    </a>
                    <span className="text-[#C5A880]" aria-hidden="true">·</span>
                    <a
                      href="#kozelebbrol"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('kozelebbrol')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className="hover:text-[#1B7A4E] underline decoration-[#C5A880]/60 underline-offset-4 transition-colors"
                    >
                      {senearExtra.heroVideoLink}
                    </a>
                    <span className="text-[#C5A880]" aria-hidden="true">·</span>
                    <button
                      type="button"
                      onClick={() => onNavigate(setupRoute)}
                      className="hover:text-[#1B7A4E] underline decoration-[#C5A880]/60 underline-offset-4 transition-colors cursor-pointer"
                    >
                      {senearExtra.heroSetupLink}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <PrimaryCta />
                  {SecondaryCta}
                </div>
              )}
            </div>

            <div className="lg:col-span-6">
              <ProductShowcase3D product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 2. "WHO IS IT FOR?" / "SOUND FAMILIAR?" (3 RELATABLE SCENARIOS)   */}
      {/* ================================================================= */}
      {senearExtra && (
        <section className="py-14 sm:py-16 bg-white border-b border-[#E8DFD4]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#2C2C2C]">
                {senearExtra.scenariosTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {senearExtra.scenarios.map((sc, idx) => (
                <div
                  key={idx}
                  className="flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-[#FAF8F5] border border-[#E8DFD4] shadow-2xs hover:shadow-md transition-shadow"
                >
                  <div className="space-y-3">
                    <MessageSquareQuote className="w-6 h-6 text-[#A38053]" />
                    <p className="font-heading text-base sm:text-lg font-bold italic text-[#2C2C2C] leading-snug">
                      {sc.quote}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#E8DFD4] text-sm text-[#4A4744] leading-relaxed">
                    <span className="inline-flex items-center gap-1.5 font-extrabold text-[#10895F] mr-1.5">
                      <Check className="w-4 h-4 stroke-[3]" />
                      {sc.solutionLabel}
                    </span>
                    <span>{sc.solution}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================= */}
      {/* 3. WHY SENEAR? (3 CORE PILLARS + 2 HUMAN MODE CARDS WITH PRICING) */}
      {/* ================================================================= */}
      <section className={senearExtra ? 'py-16 sm:py-20' : 'py-20 sm:py-24'}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={c.benefitsTitle} subtitle={c.benefitsSubtitle} accent={accent.main} />
          {senearExtra ? (
            <>
              {/* 3 Concise Core Pillars */}
              <div className="max-w-5xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
                {senearExtra.corePillars.map((pillar, i) => {
                  const PillarIcon = PILLAR_ICONS[i] || ShieldCheck;
                  return (
                    <div
                      key={pillar.title}
                      className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#E8DFD4] shadow-2xs"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs"
                        style={{ background: `linear-gradient(135deg, ${accent.main}, #2C2C2C)` }}
                      >
                        <PillarIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-heading text-base font-bold text-[#2C2C2C] leading-snug">
                          {pillar.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#5C5A56] leading-relaxed mt-1">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 2 Large Mode Cards with Transparent Non-Button Pricing Panels */}
              <div className="max-w-5xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {senearExtra.modes.map((mode, i) => {
                  const premium = i === 1;
                  const Icon = premium ? HeartHandshake : Smartphone;
                  return (
                    <div
                      key={mode.title}
                      className="relative flex flex-col p-7 sm:p-8 rounded-3xl bg-white border-2 shadow-sm hover:shadow-lg transition-shadow text-left"
                      style={{ borderColor: premium ? `${accent.main}80` : 'rgba(16,137,95,0.35)' }}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-white shadow-md"
                          style={{
                            background: premium
                              ? `linear-gradient(135deg, ${accent.main}, #2C2C2C)`
                              : 'linear-gradient(135deg, #10895F, #0B6B4A)',
                          }}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="font-heading text-lg sm:text-xl font-bold text-[#2C2C2C] leading-snug">
                          {mode.title}
                        </h3>
                      </div>
                      <p className="text-sm sm:text-base text-[#5C5A56] leading-relaxed mt-4 flex-1">
                        {mode.body}
                      </p>

                      {/* Clean Non-Clickable Info/Price Panel */}
                      <div className="mt-6">
                        {premium ? (
                          <div className="w-full rounded-2xl bg-[#FAF6F0] border border-[#D8C3A5] px-5 py-4 text-left select-text">
                            <div className="text-[11px] font-bold uppercase tracking-wider text-[#8C7355] mb-1">
                              {mode.priceLabel}
                            </div>
                            <div className="text-sm sm:text-base font-extrabold text-[#2C2C2C] leading-snug">
                              {mode.badge}
                            </div>
                          </div>
                        ) : (
                          <div className="w-full rounded-2xl bg-[#EEF8F3] border border-[#10895F]/35 px-5 py-4 text-left select-text">
                            <div className="text-[11px] font-bold uppercase tracking-wider text-[#0B6B4A] mb-1">
                              {mode.priceLabel}
                            </div>
                            <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold text-[#0B6B4A] leading-snug">
                              <Check className="w-4 h-4 shrink-0 stroke-[3]" />
                              <span>{mode.badge}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              {benefits.map((b, i) => {
                const Icon = BENEFIT_ICONS[product][i];
                return (
                  <div
                    key={b.title}
                    className="group relative p-7 rounded-3xl bg-white border border-[#E8DFD4] hover:border-transparent shadow-2xs hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div
                      className="absolute inset-x-0 top-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: `linear-gradient(90deg, ${accent.main}, ${accent.soft})` }}
                    />
                    <div className="flex items-start gap-5">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 text-white shadow-md transition-transform group-hover:scale-110"
                        style={{ background: `linear-gradient(135deg, ${accent.main}, #2C2C2C)` }}
                      >
                        <Icon className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-bold">{b.title}</h3>
                        <p className="text-sm sm:text-base text-[#5C5A56] leading-relaxed mt-2">{b.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ================================================================= */}
      {/* 4. HOW IT WORKS (3 SIMPLE STEPS + SETUP TIME + COLLAPSIBLE SPECS) */}
      {/* ================================================================= */}
      <section id="igy-mukodik" className="scroll-mt-20 py-20 sm:py-24 bg-[#F5F0EB]/60 border-y border-[#C5A880]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={c.howTitle} subtitle={c.howSubtitle} accent={accent.main} />
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
            {/* Connecting line */}
            <div
              className="hidden md:block absolute top-10 left-[16%] right-[16%] h-0.5"
              style={{ background: `repeating-linear-gradient(90deg, ${accent.main} 0 10px, transparent 10px 18px)` }}
            />
            {(senearExtra ? senearExtra.howSteps : c.how).map((step, i) => {
              const Icon = HOW_ICONS[product][i];
              return (
                <div key={step.title} className="relative text-center flex flex-col items-center">
                  <div
                    className="relative w-20 h-20 rounded-full bg-white border-2 flex items-center justify-center shadow-lg z-10"
                    style={{ borderColor: accent.main }}
                  >
                    <Icon className="w-9 h-9 text-[#2C2C2C]" />
                    <span
                      className="absolute -top-1 -right-1 w-7 h-7 rounded-full text-white text-xs font-black flex items-center justify-center shadow"
                      style={{ background: accent.main }}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold mt-5 text-[#2C2C2C]">{step.title}</h3>
                  <p className="text-sm sm:text-base text-[#5C5A56] leading-relaxed mt-2 max-w-sm">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {senearExtra && (
            <div className="max-w-4xl mx-auto mt-12 space-y-6">
              {/* Honest Setup Time Callout Banner */}
              <div className="rounded-2xl bg-white border border-[#D8C3A5] p-5 sm:p-6 shadow-xs text-sm sm:text-base text-[#2C2C2C] leading-relaxed text-center">
                {senearExtra.setupTimeBanner}
              </div>

              {/* Collapsible Accordion Button for 20+ Technical Features */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowAllSpecs((prev) => !prev)}
                  aria-expanded={showAllSpecs}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white hover:bg-[#FAF6F0] text-[#2C2C2C] font-bold text-sm border border-[#C5A880] shadow-xs transition-all cursor-pointer"
                >
                  <span>{showAllSpecs ? senearExtra.specsHideBtn : senearExtra.specsToggleBtn}</span>
                </button>
              </div>

              {/* Expandable 3-Column Feature & Technical Specs Grid */}
              {showAllSpecs && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 animate-in fade-in duration-200">
                  {senearExtra.features.map((featureGroup, i) => (
                    <div
                      key={senearExtra.featureTitles[i]}
                      className="w-full text-left bg-white rounded-2xl border border-[#E8DFD4] p-5 shadow-2xs"
                    >
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C7355] mb-3.5">
                        {senearExtra.featureTitles[i]}
                      </h4>
                      <ul className="space-y-2.5">
                        {featureGroup.map((f) => (
                          <li key={f} className="flex items-start gap-2.5 text-sm text-[#2C2C2C] leading-snug">
                            <span className="w-5 h-5 rounded-full bg-[#10895F] text-white flex items-center justify-center shrink-0 mt-px">
                              <Check className="w-3 h-3" strokeWidth={3.5} />
                            </span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ================================================================= */}
      {/* 5. COMPLETE 12-STEP SETUP & FEATURE WALKTHROUGH VIDEO             */}
      {/* ================================================================= */}
      <section id="kozelebbrol" className="scroll-mt-20 py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {senearExtra ? (
            <>
              {/* Section Header */}
              <div className="text-center max-w-3xl mx-auto space-y-3.5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F0EB] border border-[#C5A880]/50 text-xs font-bold uppercase tracking-wider text-[#8C7355]">
                  <Play className="w-3.5 h-3.5 fill-current" style={{ color: accent.main }} />
                  {senearExtra.videoShowcase.badge}
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#2C2C2C]">
                  {senearExtra.videoShowcase.title}
                </h2>
                <p className="text-base sm:text-lg text-[#5C5A56] leading-relaxed">
                  {senearExtra.videoShowcase.subtitle}
                </p>
              </div>

              {/* 12-Column Responsive Layout */}
              <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* A) Left Side (lg:col-span-8) — Video Player & Split-Screen Legend */}
                <div className="lg:col-span-8 space-y-4">
                  <div
                    ref={videoPlayerRef}
                    className="relative aspect-video w-full rounded-3xl overflow-hidden bg-[#1F2421] border-2 border-[#E8DFD4] shadow-xl"
                  >
                    <iframe
                      key={`${senearExtra.videoShowcase.videoId}-${activeSeconds}-${autoPlay}-${playKey}`}
                      src={`https://www.youtube.com/embed/${senearExtra.videoShowcase.videoId}?start=${activeSeconds}&autoplay=${autoPlay ? 1 : 0}&rel=0`}
                      title={senearExtra.videoShowcase.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>

                  {/* 2-Column Split-Screen Visual Legend Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white border border-[#E8DFD4] shadow-2xs">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ background: accent.main }}
                      />
                      <span className="text-xs sm:text-sm font-semibold text-[#2C2C2C] leading-snug">
                        {senearExtra.videoShowcase.leftPhoneLegend}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white border border-[#E8DFD4] shadow-2xs">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10895F] shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-[#2C2C2C] leading-snug">
                        {senearExtra.videoShowcase.rightPhoneLegend}
                      </span>
                    </div>
                  </div>
                </div>

                {/* B) Right Side (lg:col-span-4) — Clickable Chapter List */}
                <div className="lg:col-span-4 rounded-3xl bg-white border border-[#E8DFD4] shadow-md overflow-hidden flex flex-col">
                  {/* Chapter List Header */}
                  <div className="px-5 py-4 bg-[#F5F0EB]/80 border-b border-[#E8DFD4] flex items-center justify-between gap-2">
                    <span className="font-heading text-sm sm:text-base font-bold text-[#2C2C2C]">
                      {senearExtra.videoShowcase.chapterListTitle}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#E8DFD4] text-xs font-semibold text-[#8C7355] shrink-0">
                      <Clock className="w-3.5 h-3.5" />
                      {senearExtra.videoShowcase.totalDuration}
                    </span>
                  </div>

                  {/* Scrollable Chapters */}
                  <div className="max-h-[420px] overflow-y-auto p-3 space-y-2">
                    {senearExtra.videoShowcase.chapters.map((chapter, idx) => {
                      const isActive = activeChapterIdx === idx;
                      const isHighlightBadge =
                        chapter.badge === 'Kiemelt' ||
                        chapter.badge === 'Featured' ||
                        chapter.badge === 'Highlight';
                      return (
                        <button
                          key={chapter.time}
                          type="button"
                          onClick={() => handleChapterClick(chapter.seconds, idx)}
                          className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 group ${
                            isActive
                              ? 'bg-[#F5F0EB] border-[#C5A880] shadow-xs'
                              : 'bg-[#FAFAFA] hover:bg-[#F5F0EB]/50 border-transparent hover:border-[#E8DFD4]'
                          }`}
                        >
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-mono text-xs font-bold shrink-0 mt-0.5 transition-colors ${
                              isActive
                                ? 'bg-[#2C2C2C] text-white'
                                : 'bg-white border border-[#E8DFD4] text-[#8C7355] group-hover:border-[#C5A880] group-hover:text-[#2C2C2C]'
                            }`}
                          >
                            <Play className="w-2.5 h-2.5 fill-current" />
                            {chapter.time}
                          </span>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span
                                className={`text-sm font-bold leading-snug ${
                                  isActive ? 'text-[#2C2C2C]' : 'text-[#2C2C2C] group-hover:text-black'
                                }`}
                              >
                                {chapter.title}
                              </span>
                              {chapter.badge && (
                                <span
                                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                                    isHighlightBadge
                                      ? 'bg-[#10895F] text-white'
                                      : 'bg-[#C5A880]/30 text-[#6E563A] border border-[#C5A880]/60'
                                  }`}
                                >
                                  {chapter.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[#5C5A56] leading-relaxed mt-0.5">
                              {renderInlineFormatting(chapter.desc)}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <SectionHeader title={c.spotlightTitle} subtitle={c.spotlightSubtitle} accent={accent.main} />
              <div className="mt-16 space-y-20 sm:space-y-24">
                {photos.map((photo, i) => {
                  const reversed = i % 2 === 1;
                  return (
                    <div
                      key={photo.id}
                      className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-16`}
                    >
                      <div className="relative shrink-0">
                        <div
                          className="absolute inset-0 -m-10 rounded-full pointer-events-none"
                          style={{ background: `radial-gradient(circle, rgba(${accent.glow},0.22) 0%, transparent 70%)` }}
                        />
                        <div className="absolute -bottom-6 left-8 right-8 h-6 rounded-full bg-black/30 blur-xl" />
                        <PhoneFrame highlighted accent={accent.main} className="relative w-[240px] h-[497px] sm:w-[270px] sm:h-[560px]">
                          <ScreenImage sources={getScreenshotSources(product, photo.baseName, language)} alt={photo.title} />
                        </PhoneFrame>
                      </div>

                      <div className="flex-1 space-y-5 text-center md:text-left">
                        <span
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2C2C2C] text-xs font-bold uppercase tracking-wider"
                          style={{ color: accent.soft }}
                        >
                          <span className="font-mono">0{i + 1}</span> · {photo.badge}
                        </span>
                        <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">{photo.title}</h3>
                        <p className="text-base sm:text-lg text-[#5C5A56] leading-relaxed">{photo.subtitle}</p>
                        <ul className="space-y-3 pt-1 inline-block text-left">
                          {(c.bullets[i] || []).map((b) => (
                            <li key={b} className="flex items-start gap-3 text-sm sm:text-base font-medium text-[#2C2C2C]">
                              <span
                                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-white mt-0.5"
                                style={{ background: accent.main }}
                              >
                                <Check className="w-3.5 h-3.5" strokeWidth={3} />
                              </span>
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ================================================================= */}
      {/* 6. TRUST / FOUNDER'S NOTE & FAQ (GYIK)                            */}
      {/* ================================================================= */}
      {senearExtra && (
        <section className="py-16 sm:py-20 bg-[#F5F0EB]/60 border-t border-[#C5A880]/20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {/* Founder's Note Card */}
            <div className="rounded-3xl bg-white border-2 border-[#D8C3A5] p-7 sm:p-10 shadow-md">
              <div className="flex flex-col gap-5">
                <div className="flex flex-wrap items-center gap-2">
                  {senearExtra.founderNote.badges.map((b) => (
                    <span
                      key={b}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-[#FAF6F0] border border-[#E8DFD4] text-xs font-bold text-[#6E563A]"
                    >
                      {b}
                    </span>
                  ))}
                </div>

                <blockquote className="font-heading text-base sm:text-lg lg:text-xl font-medium italic text-[#2C2C2C] leading-relaxed">
                  {senearExtra.founderNote.quote}
                </blockquote>

                <div className="flex items-center gap-3 pt-2 border-t border-[#F0EAE1]">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                    style={{ background: `linear-gradient(135deg, ${accent.main}, #2C2C2C)` }}
                  >
                    BG
                  </div>
                  <div>
                    <div className="font-heading text-sm sm:text-base font-extrabold text-[#2C2C2C]">
                      {senearExtra.founderNote.author}
                    </div>
                    <div className="text-xs sm:text-sm text-[#6E6B65]">
                      {senearExtra.founderNote.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ (GYIK) Accordion */}
            <div className="space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E8DFD4] text-xs font-bold uppercase tracking-wider text-[#8C7355]">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>FAQ</span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#2C2C2C]">
                  {senearExtra.faqTitle}
                </h2>
              </div>

              <div className="space-y-3">
                {senearExtra.faqs.map((item, idx) => {
                  const isOpen = openFaqIdx === idx;
                  return (
                    <div
                      key={item.q}
                      className="rounded-2xl bg-white border border-[#E8DFD4] shadow-2xs overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        className="w-full px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-4 hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                      >
                        <span className="font-heading text-sm sm:text-base font-bold text-[#2C2C2C] leading-snug">
                          {item.q}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-[#8C7355] shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-5 pt-1 text-sm sm:text-base text-[#5C5A56] leading-relaxed border-t border-[#F5F0EB]">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================================================================= */}
      {/* SETUP CTA                                                         */}
      {/* ================================================================= */}
      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2C2C2C] to-[#1F2421] text-white p-10 sm:p-14 text-center shadow-2xl">
            <div
              className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none"
              style={{ background: `radial-gradient(circle, rgba(${accent.glow},0.35) 0%, transparent 70%)` }}
            />
            <div className="relative space-y-5">
              <ShieldCheck className="w-12 h-12 mx-auto" style={{ color: accent.soft }} />
              <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">{c.ctaTitle}</h2>
              <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl mx-auto">{c.ctaText}</p>
              <div className="pt-3 flex flex-wrap justify-center gap-3">
                {senearExtra && (
                  <a
                    href="https://play.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl bg-[#1B7A4E] hover:bg-[#145E3B] text-white text-base font-bold shadow-lg transition-all whitespace-nowrap"
                  >
                    <GooglePlayIcon color="white" className="w-5 h-5 shrink-0 text-white" />
                    <span>{senearExtra.heroPrimaryDownloadBtn}</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => onNavigate(setupRoute)}
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl text-[#1F2421] text-base font-bold shadow-lg hover:brightness-105 transition-all cursor-pointer group"
                  style={{ background: accent.soft }}
                >
                  <BookOpen className="w-5 h-5" />
                  {name} · {common.setup}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ title, subtitle, accent }: { title: string; subtitle: string; accent: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto space-y-3">
      <div className="inline-flex items-center gap-2">
        <Sparkles className="w-4 h-4" style={{ color: accent }} />
        <span className="h-0.5 w-10 rounded-full" style={{ background: accent }} />
      </div>
      <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">{title}</h2>
      {subtitle && <p className="text-base sm:text-lg text-[#5C5A56] leading-relaxed">{subtitle}</p>}
    </div>
  );
}
