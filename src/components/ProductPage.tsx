import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BellRing,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  CloudCog,
  Copy,
  HeartHandshake,
  HelpCircle,
  MessageSquareQuote,
  Play,
  QrCode,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  Baby,
  BookOpen,
  Lock,
  MapPin,
  Radio,
  WifiOff,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { ProductShowcase3D, PRODUCT_ACCENT } from './ProductShowcase3D';
import { PhoneFrame, ScreenImage } from './PhoneFrame';
import { GooglePlayIcon } from './GooglePlayIcon';
import { getProductPhotos, getScreenshotSources } from '../data/productPhotos';
import { AppRoute, ProductKey } from '../routing';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.nogond.app';

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

interface FaqItem {
  q: string;
  a: string;
}

interface PricingTierItem {
  label: string;
  price: string;
  note?: string;
}

interface SenearModeCard {
  title: string;
  body: string;
  priceLabel: string;
  badge: string;
  trialBadge?: string;
  pricingTiers?: PricingTierItem[];
  reassurance?: string;
}

interface SenearExtra {
  heroPrimaryDownloadBtn: string;
  androidRequirementNote: string;
  heroHowLink: string;
  heroVideoLink: string;
  heroSetupLink: string;
  desktopQrTitle: string;
  desktopQrDesc: string;
  copyLinkBtn: string;
  copiedLinkBtn: string;
  mobileFloatingCta: string;
  scenariosTitle: string;
  scenarios: ScenarioCard[];
  /** [0] = standalone (free), [1] = connected family member (premium) */
  modes: SenearModeCard[];
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
    androidRequirementNote: 'Android 8.0+ készülékekre (a családtag telefonja is Android legyen)',
    heroHowLink: 'Hogyan működik? ↓',
    heroVideoLink: 'Beállítási videó (13 perc) ↓',
    heroSetupLink: 'Lépésről lépésre útmutató →',
    desktopQrTitle: 'Gépről nézed az oldalt?',
    desktopQrDesc: 'Olvasd be a QR-kódot az Android telefonoddal a letöltéshez, vagy másold ki a linket:',
    copyLinkBtn: 'Link másolása telefonra küldéshez',
    copiedLinkBtn: '✓ Link a vágólapra másolva!',
    mobileFloatingCta: 'Letöltés a Google Playről (Android 8.0+)',
    scenariosTitle: 'Ismerős helyzet?',
    scenarios: [
      {
        quote: '„A mamám 78 éves, és mindig felveszi a telefont az ismeretlen csalóknak.”',
        solutionLabel: 'Megoldás:',
        solution:
          'Csak az általad jóváhagyott számok hívhatják – az ismeretlen és csaló számok nem csörögnek ki.',
      },
      {
        quote: '„Apukám véletlenül elállítja a telefont, lehalkítja, vagy elfelejti a gyógyszerét.”',
        solutionLabel: 'Megoldás:',
        solution:
          'Zárolt, egyszerű kezdőképernyő, automatikus kihangosított hívásfogadás és fényképes gyógyszeremlékeztető.',
      },
      {
        quote: '„Másik városban élek, és napközben is látni szeretném, hogy minden rendben van-e vele.”',
        solutionLabel: 'Megoldás:',
        solution:
          'Élő akkumulátorszint, gyógyszer-visszajelzés, GPS biztonsági zóna és ingyenes Wi-Fi hívás a saját telefonodon.',
      },
    ],
    modes: [
      {
        title: 'Csak egy egyszerű, védett telefon kell',
        body: 'Ha a cél egy könnyen kezelhető, védett telefon: az idős szülő vagy nagyszülő egy zárolt, egyszerű kezdőképernyőt kap, ahol csak az előre beállított családtagokat és ismerősöket tudja felhívni, és csak az általad jóváhagyott számok csörgethetik meg.',
        priceLabel: 'Árazás • Önálló használat (idős szülő telefonján)',
        badge: '0 Ft – Örökké ingyenes és reklámmentes',
      },
      {
        title: 'Én is látni akarom távolról, hogy jól van',
        body: 'Ha távolról is biztonságban szeretnéd tudni idős szerettedet: kapcsold össze a készülékét a saját Android telefonoddal! Családtagként élőben látod a telefon állapotát (akkumulátor, térerő, helyadatok), távolról beállíthatod a fényképes hívógombokat, és azonnali értesítést kapsz SOS hívás vagy alacsony töltöttség esetén.',
        priceLabel: 'Árazás • Családi távoli összeköttetés',
        badge: '🎁 14 napig teljesen ingyen kipróbálható',
        trialBadge: '🎁 14 napig teljesen ingyen kipróbálható',
        pricingTiers: [
          {
            label: 'Havi előfizetés:',
            price: '1 490 Ft / hó',
            note: '(kevesebb mint napi 50 Ft)',
          },
          {
            label: 'Éves előfizetés (~28% kedvezmény):',
            price: '12 900 Ft / év',
            note: '(~1 075 Ft / hó)',
          },
          {
            label: 'Egyszeri „Örökös” feloldás:',
            price: '29 900 Ft',
            note: '(egyszeri díj, havidíj nélkül – egy bolti nyomógombos senior telefon áráért)',
          },
        ],
        reassurance:
          'Fizetés biztonságosan a Google Playen keresztül, kizárólag a családtag telefonján (az idős szülő készülékén soha nem jelenik meg fizetési ablak). Bármikor egy kattintással lemondható.',
      },
    ],
    howSteps: [
      {
        title: 'Telepítsd a szülőd telefonjára',
        desc: 'Bármilyen meglévő Android 8.0+ készülékre felteheted, otthoni Wi-Fi-n akár SIM-kártya nélkül is.',
      },
      {
        title: 'Párosítsd a 6 jegyű kóddal',
        desc: 'A szülő jóváhagyása után egyetlen kóddal összekapcsolhatod a két Android telefont.',
      },
      {
        title: 'Kezeld távolról, nyugodtan',
        desc: 'A saját mobilodról állíthatod be a fényképes hívógombokat, a gyógyszeremlékeztetőket és a GPS-zónát.',
      },
    ],
    setupTimeBanner:
      '⏱️ Mennyi idő a beállítás? Az első telepítés kb. 10–15 percet vesz igénybe az egyszeri Android biztonsági engedélyek (a zárolt kezdőképernyő és az automatikus kihangosítás) jóváhagyása miatt. A lenti videóban lépésről lépésre végigvezetünk rajta – utána a beállítások védettek maradnak a véletlen elállítástól.',
    specsToggleBtn: 'Összes funkció és műszaki védelem megjelenítése (20+ funkció) ↓',
    specsHideBtn: 'Részletes funkciólista elrejtése ↑',
    featureTitles: [
      'Az idős szülő telefonjának funkciói',
      'Biztonságos családi összeköttetés',
      'A családtag telefonjának funkciói',
    ],
    features: [
      [
        'Zárolt, egyszerű kezdőképernyő (akár önállóan, második telefon nélkül is használható)',
        '4 vagy akár 6 nagy fényképes hívógomb keresztnévvel és nem fogadott hívás („Keresett!”) jelzéssel',
        'Személyre szabható szöveg-, fotó- és telefonikon-méretek (3 fokozatban állítható vagy kikapcsolható)',
        'Hagyományos SIM-kártyás hívások (internet nélkül is) és SIM nélküli Wi-Fi hang- és videóhívások',
        'Automatikus kihangosítás teljes kezdő hangerővel, képernyőn állítható hangerőcsúszkával és a párhuzamos bejövő hívások néma blokkolásával beszélgetés közben',
        'Előre megírt gyors SMS-ek küldése és a bejövő SMS-ek óriásbetűs felugró kártyás megjelenítése',
        'Vészhelyzeti SOS hívás és automatikus GPS-helyzet SMS küldése',
        'Reggeli ébresztő és személyre szabott napi rutin emlékeztetők',
        'Kétlépcsős gyógyszeremlékeztető pontos adagolással és fotóval, egygombos „Bevettem” nyugtázással a családtag felé',
      ],
      [
        'Gyors összekapcsolás 6-jegyű párosító kóddal',
        'Több családtag egyidejű csatlakoztatása (akár 6 fő) és automatikus hívógomb-feltöltés párosításkor (1–6. helyre)',
        'Valós idejű állapotfrissítések és azonnali szinkronizálás biztonságos EU-s felhőn keresztül',
        'Megbízható háttérműködés: gyártó-specifikus akkumulátor-védelem (Xiaomi, Samsung, Huawei stb.)',
        'Titkosított adatátvitel (TLS 1.3 / AES-256)',
        'EU GDPR-konform adatkezelés kétoldalú hozzájárulással és bármikor elérhető, egygombos végleges adattörléssel',
      ],
      [
        'Azonnali értesítés az idős szülő telefonjának ki- és bekapcsolásáról, valamint alacsony töltöttségéről (lemerülés előtt)',
        'Hang- és videóhívás a szülő telefonjára — akár SIM-kártya nélkül is, Wi-Fi-n keresztül',
        'Automatikus hívásfogadás: a családtag távolról, kihangosítva kapcsolódhat be, ha a szülő nem tudja felvenni',
        'Távoli csengetési hangerő-visszaállítás maximumra (ha a készüléket véletlenül lehalkították)',
        'Távoli névjegy-, telefonszám- és fotócsere akár mind a 6 hívógombon',
        'Távoli Hívási Engedélyek (Fehérlista): csak az általad jóváhagyott számok csörgethetik meg a telefont',
        'Ébresztők és részletes gyógyszeremlékeztetők távoli beállítása, valós idejű „Bevettem” visszajelzéssel',
        'Otthoni Biztonsági Zóna elhagyási/hazaérkezési értesítés és beépített élő mini-térkép egygombos Google Térkép navigációval',
      ],
    ],
    videoShowcase: {
      videoId: 'yLFO0MMnATo',
      badge: 'Lépésről lépésre videós bemutató',
      title: 'Teljes beállítási és működési bemutató videó',
      subtitle:
        'Bal oldalon a családtag távoli vezérlőpultja, jobb oldalon az idős szülő zárolt, egyszerű kezdőképernyője. Kattints bármelyik témakörre a listában, és ugorj egyből az adott részhez!',
      leftPhoneLegend: '📱 Bal oldali telefon: Családtag távoli vezérlőpultja',
      rightPhoneLegend: '📱 Jobb oldali telefon: Idős szülő zárolt, egyszerű kezdőképernyője',
      chapterListTitle: 'Ugrás a bemutató fejezeteihez',
      totalDuration: '13:05 perc',
      chapters: [
        { time: '00:00', seconds: 0, title: 'Bevezetés – Mi a SENEAR?', desc: 'Két készülék, közös nyugalom a családnak' },
        { time: '00:07', seconds: 7, title: 'Alapbeállítások és szerepkörök', desc: 'Családtag és idős szülő mód kiválasztása' },
        { time: '00:37', seconds: 37, title: 'Zárolt, egyszerű kezdőképernyő', desc: 'Véletlen elállítás elleni védelem bekapcsolása' },
        { time: '01:57', seconds: 117, title: 'Két telefon párosítása', desc: 'Összekapcsolás 6 jegyű biztonsági kóddal' },
        { time: '03:08', seconds: 188, title: 'Távoli vezérlőpult & fotós hívógombok', desc: 'Fotók és gyorshívók távoli beállítása valós időben', badge: 'Népszerű' },
        { time: '04:17', seconds: 257, title: '4 vagy 6 gombos nézet & látáskönnyítés', desc: 'Betűméret, arcképek és színek távoli finomhangolása' },
        { time: '05:41', seconds: 341, title: 'Hívásszűrés ismeretlen számok ellen', desc: 'Csak az általad jóváhagyott számok csörögnek ki' },
        { time: '06:18', seconds: 378, title: 'Automatikus, kihangosított hívásfogadás', desc: 'Érintés nélküli felvétel maximális hangerővel', badge: 'Kiemelt' },
        { time: '06:55', seconds: 415, title: 'Hívásmegerősítés & nem fogadott hívás', desc: 'Igen/Nem megerősítő ablak és „Keresett!” jelzés' },
        { time: '07:39', seconds: 459, title: 'Nagybetűs SMS ablak', desc: 'Automatikusan felugró, jól olvasható üzenetek' },
        { time: '07:49', seconds: 469, title: 'Napi rutinok és ébresztők', desc: 'Időzített emlékeztetők küldése távolról' },
        { time: '08:25', seconds: 505, title: 'Fotós gyógyszeremlékeztető', desc: 'Gyógyszer fotója + adagolás + „Bevettem” visszajelzés', badge: 'Kiemelt' },
        { time: '09:47', seconds: 587, title: 'GPS térkép & biztonsági zóna', desc: 'Otthoni zóna és azonnali navigáció' },
        { time: '10:31', seconds: 631, title: 'PIN-védelem & SOS vészhelyzeti gomb', desc: 'Segélyhívás és automatikus GPS-koordinátás SMS' },
        { time: '11:03', seconds: 663, title: 'Értesítési napló & lemerülés-jelzés', desc: 'Azonnali értesítés lemerülés vagy kikapcsolás esetén' },
        { time: '12:13', seconds: 733, title: 'Nagy gombos tárcsázó & gyors SMS', desc: 'Előre beállított üzenetek küldése gépelés nélkül' },
      ],
    },
    founderNote: {
      quote:
        '„Miért készítettem a SENEAR-t? Olyan megoldást kerestem a családomnak, amihez nem kell drága, mégis bonyolult nyomógombos senior telefont venni, nem zavarja reklámokkal az időseket, és valódi védelmet ad a telefonos csalók vagy az eltévedés ellen. A SENEAR európai fejlesztés, reklámmentes és GDPR-konform.”',
      author: 'Bányai Gábor',
      role: 'alapító & fejlesztő (Gabba Labs)',
      badges: ['🇪🇺 Európai fejlesztés', '🛡️ Reklámmentes', '🔒 EU GDPR-konform'],
    },
    faqTitle: 'Gyakori kérdések (GYIK)',
    faqs: [
      {
        q: 'Mit lát a családtag, és kell-e hozzá az idős szülő beleegyezése?',
        a: 'Igen, a két telefon összekapcsolása csak az idős szülő készülékén történő kifejezett, GDPR-konform jóváhagyással indítható el. A családtag látja az akkumulátorszintet, a gyógyszerbevétel visszaigazolását és (ha be van kapcsolva) a GPS-pozíciót, de nem látja a privát üzeneteket és nem hallja a beszélgetéseket. Minden adat bármikor egyetlen gombnyomással végleg törölhető.',
      },
      {
        q: 'Milyen telefonokon működik a SENEAR? iPhone-on is elérhető?',
        a: 'Mind az idős szülő, mind a családtag telefonjának Android 8.0 vagy újabb rendszerűnek kell lennie (Samsung, Xiaomi, Redmi, Motorola, Honor, Pixel stb.). Az Apple iOS nem engedélyezi a kezdőképernyő ilyen szintű zárolását és a távoli kihangosítást.',
      },
      {
        q: 'Hogyan működik a 14 napos próbaidőszak és a fizetés? Megjelenik bármilyen fizetési ablak a szülőm telefonján?',
        a: 'Soha. A szülő telefonján a SENEAR reklám- és fizetésmentes felületként működik. A 14 napos ingyenes próbaidőszakot követően a családtag a saját telefonján, a Google Playen keresztül választhat a havi (1 490 Ft), a kedvezményes éves (12 900 Ft) vagy a havidíjmentes, egyszeri örökös feloldás (29 900 Ft) között.',
      },
      {
        q: 'Mi történik, ha lemondom a családi előfizetést?',
        a: 'Az idős szülő telefonja továbbra is teljes értékű, reklámmentes, zárolt kezdőképernyős telefonként és hívásszűrőként működik tovább, teljesen ingyen! Csak a távoli szinkronizáció szünetel.',
      },
      {
        q: 'Kell SIM-kártya az idős hozzátartozó telefonjába?',
        a: 'Nem feltétlenül! Otthoni Wi-Fi-n SIM-kártya nélkül is működik az ingyenes SENEAR Wi-Fi hívás, a gyógyszeremlékeztető és a távoli beállítás. Hagyományos telefonszámok hívásához és SMS-hez szükséges SIM-kártya (a 112-es segélyhívó SIM nélkül is működik).',
      },
      {
        q: 'Vissza lehet térni a hagyományos Android menübe?',
        a: 'Igen, a felső órára 5-ször koppintva, a 4 jegyű PIN-kód megadásával bármikor kikapcsolható a zárolt kezdőképernyő.',
      },
      {
        q: 'Új telefont kell vennem, vagy jó a meglévő készülék is?',
        a: 'Nem kell új telefont venni! Bármilyen meglévő vagy fiókban lévő Android okostelefon tökéletes hozzá, és gyári visszaállításra sincs szükség.',
      },
    ],
  },
  en: {
    heroPrimaryDownloadBtn: 'Download on Google Play — Free',
    androidRequirementNote: 'For Android 8.0+ devices (the family member’s phone also needs Android)',
    heroHowLink: 'How it works? ↓',
    heroVideoLink: 'Setup video (13 min) ↓',
    heroSetupLink: 'Step-by-step setup guide →',
    desktopQrTitle: 'Viewing on a computer?',
    desktopQrDesc: 'Scan the QR code with your Android phone to download, or copy the link to send to yourself:',
    copyLinkBtn: 'Copy link to send to phone',
    copiedLinkBtn: '✓ Link copied to clipboard!',
    mobileFloatingCta: 'Download on Google Play (Android 8.0+)',
    scenariosTitle: 'Sound familiar?',
    scenarios: [
      {
        quote: '“My mom is 78 and always picks up calls from unknown phone scammers.”',
        solutionLabel: 'Solution:',
        solution:
          'Only numbers you approve can ring through — unknown and scam callers are silently blocked.',
      },
      {
        quote: '“My dad accidentally changes settings, mutes his phone, or forgets his medication.”',
        solutionLabel: 'Solution:',
        solution:
          'Locked, simple home screen, hands-free speakerphone auto-answer, and photo medication reminders.',
      },
      {
        quote: '“I live in another city and want peace of mind knowing they are safe during the day.”',
        solutionLabel: 'Solution:',
        solution:
          'Real-time battery status, medication confirmation, GPS safe zone, and free Wi-Fi calls on your own phone.',
      },
    ],
    modes: [
      {
        title: 'I just need a simple, protected phone',
        body: 'If you want an easy-to-use, protected phone: your parent or grandparent gets a locked, simple home screen where they can only call pre-configured family members and only approved numbers can ring through.',
        priceLabel: 'Pricing • Standalone Use (Parent’s Phone)',
        badge: 'Free forever — €0 / month, ad-free',
      },
      {
        title: 'I also want to see from afar that they’re okay',
        body: 'Want peace of mind from afar? Link their device to your own Android phone! As a family member you see live phone status (battery, signal, location), manage photo speed-dial buttons remotely, and receive instant alerts on SOS calls or low battery.',
        priceLabel: 'Pricing • Family Remote Connection',
        badge: '🎁 14-day free trial included',
        trialBadge: '🎁 14-day free trial included',
        pricingTiers: [
          {
            label: 'Monthly plan:',
            price: '€4.99 / month',
          },
          {
            label: 'Annual plan (Save ~33%):',
            price: '€39.99 / year',
            note: '(~€3.33 / month)',
          },
          {
            label: 'One-Time Lifetime Unlock:',
            price: '€79.99',
            note: '(single payment, no monthly fees — for the price of a basic physical senior phone)',
          },
        ],
        reassurance:
          'Billed securely via Google Play in your local currency on the family member’s phone only (your parent’s screen never shows payment prompts). Cancel anytime with one tap.',
      },
    ],
    howSteps: [
      {
        title: 'Install on your parent’s phone',
        desc: 'Works on any existing Android 8.0+ smartphone—even without a SIM card over home Wi-Fi.',
      },
      {
        title: 'Pair with a 6-digit code',
        desc: 'After your parent’s consent, link both Android phones in seconds using a one-time security code.',
      },
      {
        title: 'Manage remotely with peace of mind',
        desc: 'Set up photo speed-dial buttons, medication reminders, and GPS safe zones from your own phone.',
      },
    ],
    setupTimeBanner:
      '⏱️ How long does setup take? Initial setup takes about 10–15 minutes because Android requires one-time security permissions for the locked home screen and auto-speakerphone. Our video walks you through every tap — and once set, the phone stays protected from accidental changes.',
    specsToggleBtn: 'Show all features & technical specifications (20+ features) ↓',
    specsHideBtn: 'Hide detailed feature list ↑',
    featureTitles: [
      'Features on the Parent’s Phone',
      'Secure Family Connection',
      'Features on the Family Member’s Phone',
    ],
    features: [
      [
        'Locked, simple home screen (also works standalone without a second phone)',
        '4 or up to 6 large photo speed-dial buttons with first name and missed-call (“Missed call!”) badge',
        'Customizable text, photo, and phone-icon sizes (3 adjustable levels or hidden)',
        'Standard SIM cellular calls (works offline) plus SIM-free Wi-Fi voice and video calls',
        'Automatic speakerphone at maximum starting volume, on-screen volume slider, and silent blocking of parallel incoming calls during an active conversation',
        'Pre-written quick SMS sending and large-print pop-up cards for incoming text messages',
        'Emergency SOS call and automatic GPS location SMS dispatch',
        'Morning wake-up alarm and personalized daily routine reminders',
        '2-step medication reminder with exact dosage and photo, plus one-tap “Taken” confirmation sent to family',
      ],
      [
        'Instant linking via a 6-digit pairing code',
        'Multi-family support (up to 6 family members) & automatic speed-dial button assignment on pairing (slots 1–6)',
        'Real-time status updates and instant cloud sync hosted in the EU',
        'Reliable background operation: manufacturer-specific battery protection (Xiaomi, Samsung, Huawei, etc.)',
        'Encrypted data transmission (TLS 1.3 / AES-256)',
        'EU GDPR-compliant privacy with bilateral consent and one-tap permanent data deletion anytime',
      ],
      [
        'Instant notifications when your parent’s phone powers on/off or drops to low battery (before it dies)',
        'Voice and video calls to your parent’s phone — even without a SIM card over Wi-Fi',
        'Auto-answer: remotely connect on speakerphone if your parent cannot reach the phone',
        'Remote ringer volume restoration to maximum (if the device was accidentally muted)',
        'Remote name, phone number, and photo updates across all 6 speed-dial buttons',
        'Remote Call Whitelist management so only approved numbers can ring through',
        'Remote scheduling of alarms and photo medication reminders with real-time “Taken” confirmation',
        'Home Safe Zone (Geofencing) departure/arrival alerts and built-in live mini-map with one-tap Google Maps navigation',
      ],
    ],
    videoShowcase: {
      videoId: '7UUD1rOxeOo',
      badge: 'Step-by-step video walkthrough',
      title: 'Complete Setup & Feature Walkthrough Video',
      subtitle:
        "On the left is the family member's remote dashboard; on the right is your parent's locked, simple home screen. Click any chapter in the list to jump straight to that moment in the video!",
      leftPhoneLegend: '📱 Left phone: Family member’s remote dashboard',
      rightPhoneLegend: '📱 Right phone: Parent’s locked, simple home screen',
      chapterListTitle: 'Jump to video chapters',
      totalDuration: '12:58 min',
      chapters: [
        {
          time: '00:00',
          seconds: 0,
          title: '1. Installation, Role Selection & Permissions',
          desc: 'Open SENEAR on both phones, grant initial permissions, and select **Caregiver** on the left phone and **Senior** on the right phone.',
        },
        {
          time: '00:24',
          seconds: 24,
          title: '2. Profile Details & Protected Home Screen Permissions',
          desc: "Enter profile details and enable the one-time Android protections on the parent's phone: *Appear on top*, *Modify system settings*, *Default Home app*, and *SENEAR Kiosk Guard* in Accessibility.",
        },
        {
          time: '01:45',
          seconds: 105,
          title: '3. Two Phones, One System – Instant Pairing',
          desc: 'Pair the two devices using the 6-digit security code (TD6F4T), then enable SMS notification access and unrestricted battery mode.',
        },
        {
          time: '02:52',
          seconds: 172,
          title: '4. Photos, Contacts & Speed-Dial Setup (4 or 6 Buttons)',
          desc: 'Upload family photos for speed-dial buttons 1–4, switch between **4-button and 6-button view** (04:01), and adjust photo, name, and phone icon sizes in real time (04:46).',
          badge: 'Popular',
        },
        {
          time: '05:31',
          seconds: 331,
          title: '5. Call Permissions (Whitelist) & Scammer Blocking',
          desc: 'Add trusted contacts to the Call Whitelist so only approved numbers can ring through while unknown scam callers are blocked.',
        },
        {
          time: '06:19',
          seconds: 379,
          title: '6. Free Wi-Fi Call, Hands-Free Auto-Answer & Callback',
          desc: 'Enable *Auto-Answer* and *Auto-Speaker* so incoming family calls connect hands-free at full volume (06:40), or call back via the red *Missed call!* badge.',
          badge: 'Featured',
        },
        {
          time: '07:31',
          seconds: 451,
          title: '7. Senior-Friendly Large-Print Incoming SMS Popup',
          desc: "Standard SMS text messages sent to the parent's phone automatically pop up in a high-contrast, large-print card.",
        },
        {
          time: '07:34',
          seconds: 454,
          title: '8. Alarms, Photo Medication Reminders & Power Alerts',
          desc: 'Remotely schedule a wake-up alarm and a photo medication reminder (*One vitamin drop in a glass of water*) with instant *DONE / TAKEN* confirmation (08:40) and power-off/on push alerts (09:01).',
          badge: 'Featured',
        },
        {
          time: '09:51',
          seconds: 591,
          title: '9. Live Mini-Map, Safe Zone & SOS Emergency Call',
          desc: "Check live location on the built-in Google Maps mini-map, configure the Home Safe Zone (100m–1000m), and see the red *SOS CALL* button with *YES / NO* confirmation (10:31).",
        },
        {
          time: '10:43',
          seconds: 643,
          title: '10. Large-Button Free-Dial Keypad & Quick SMS',
          desc: 'Dial any phone number using the large-button keypad (10:52) or switch to the *SMS* tab (11:10) to send pre-written quick text messages (*Please call me!*) without typing.',
        },
        {
          time: '11:23',
          seconds: 683,
          title: '11. Accessing Local Settings via the 5-Tap PIN',
          desc: "Tap the top clock 5 times quickly on the parent's phone and enter the 4-digit PIN (default 1234) to access local sound, screen, contact, routine, and SOS settings.",
        },
        {
          time: '12:37',
          seconds: 757,
          title: '12. Returning to the Standard Android Menu',
          desc: "Tap *Back to Phone Menu* at the bottom of settings and select the phone's default Home app (*One UI Home*) to return to the standard Android interface anytime.",
        },
      ],
    },
    founderNote: {
      quote:
        '“Why I built SENEAR: I wanted a solution for my own family that didn’t require buying an expensive yet clunky physical senior phone, had zero ads, and offered real protection against phone scammers and wandering. SENEAR is built in Europe, ad-free, and strictly GDPR-compliant.”',
      author: 'Gábor Bányai',
      role: 'Founder & Developer (Gabba Labs)',
      badges: ['🇪🇺 Built in Europe', '🛡️ Ad-Free', '🔒 Strictly GDPR-Compliant'],
    },
    faqTitle: 'Frequently Asked Questions (FAQ)',
    faqs: [
      {
        q: 'What can the family member see, and is my parent’s consent required?',
        a: 'Yes. Pairing requires explicit GDPR-compliant consent on your parent’s device. The family member sees battery status, medication confirmations, and (if enabled) GPS location, but never private messages or call audio. All data can be permanently deleted with one tap anytime.',
      },
      {
        q: 'Which phones does SENEAR support? Does it work on iPhone?',
        a: 'Both the parent’s phone and the family member’s phone need Android 8.0 or newer (Samsung, Xiaomi, Redmi, Motorola, Honor, Pixel, etc.). Apple iOS does not allow home-screen locking or remote auto-speakerphone control.',
      },
      {
        q: 'How does the 14-day trial and billing work? Will my parent ever see a payment screen?',
        a: 'Never. Your parent’s phone stays free of ads and payment prompts. After the 14-day free trial, the family member can choose on their own phone via Google Play between the monthly plan (€4.99), discounted annual plan (€39.99), or one-time lifetime unlock (€79.99, shown in your local Google Play currency).',
      },
      {
        q: 'What happens if I cancel the family subscription?',
        a: 'Your parent’s phone continues to work as a standalone, locked-screen senior phone and call filter for free forever! Only remote syncing pauses.',
      },
      {
        q: "Does my parent's phone need a SIM card?",
        a: 'Not necessarily! Over home Wi-Fi, free SENEAR Wi-Fi calls with paired family members, medication reminders, and remote management work even without a SIM card. A SIM card is only required for standard cellular calls and SMS.',
      },
      {
        q: 'Can we exit back to the normal Android menu?',
        a: 'Yes, anytime by tapping the top clock 5 times and entering the 4-digit PIN code.',
      },
      {
        q: 'Do I need to buy a new phone, or can we use an existing one?',
        a: 'No new hardware needed! Any existing or spare Android smartphone works out of the box without a factory reset.',
      },
    ],
  },
  de: {
    heroPrimaryDownloadBtn: 'Bei Google Play laden – Kostenlos',
    androidRequirementNote: 'Für Android 8.0+ Geräte (auch das Handy des Familienmitglieds benötigt Android)',
    heroHowLink: 'So funktioniert’s ↓',
    heroVideoLink: 'Einrichtungsvideo (13 Min.) ↓',
    heroSetupLink: 'Schritt-für-Schritt-Anleitung →',
    desktopQrTitle: 'Sie schauen am Computer?',
    desktopQrDesc: 'Scannen Sie den QR-Code mit Ihrem Android-Handy zum Herunterladen oder kopieren Sie den Link:',
    copyLinkBtn: 'Link fürs Handy kopieren',
    copiedLinkBtn: '✓ Link in die Zwischenablage kopiert!',
    mobileFloatingCta: 'Bei Google Play laden (Android 8.0+)',
    scenariosTitle: 'Kommt Ihnen das bekannt vor?',
    scenarios: [
      {
        quote: '„Meine Mutter ist 78 und geht immer bei unbekannten Telefonbetrügern ran.“',
        solutionLabel: 'Lösung:',
        solution:
          'Nur von Ihnen freigegebene Nummern klingeln durch – unbekannte Anrufer und Betrüger werden lautlos blockiert.',
      },
      {
        quote: '„Mein Vater verstellt versehentlich das Handy, schaltet es stumm oder vergisst seine Medikamente.“',
        solutionLabel: 'Lösung:',
        solution:
          'Gesperrter, einfacher Startbildschirm, automatische Rufannahme per Lautsprecher und Foto-Medikamentenerinnerungen.',
      },
      {
        quote: '„Ich wohne in einer anderen Stadt und möchte sehen, ob tagsüber alles in Ordnung ist.“',
        solutionLabel: 'Lösung:',
        solution:
          'Echtzeit-Akkustatus, Medikamentenbestätigung, GPS-Sicherheitszone und kostenlose WLAN-Anrufe.',
      },
    ],
    modes: [
      {
        title: 'Ich brauche nur ein einfaches, geschütztes Telefon',
        body: 'Wenn Sie ein einfach bedienbares, geschütztes Telefon wünschen: Ihre Eltern oder Großeltern erhalten einen gesperrten, einfachen Startbildschirm, über den sie nur voreingestellte Personen anrufen können und nur freigegebene Nummern durchklingeln.',
        priceLabel: 'Preise • Eigenständige Nutzung (Handy der Eltern)',
        badge: 'Für immer kostenlos – 0 € / Monat, werbefrei',
      },
      {
        title: 'Ich möchte auch aus der Ferne sehen, dass alles gut ist',
        body: 'Sie möchten Ihre Eltern auch aus der Ferne in Sicherheit wissen? Verbinden Sie das Gerät mit Ihrem eigenen Android-Telefon! Als Familienmitglied sehen Sie den Telefonstatus in Echtzeit (Akku, Empfang, Standort), verwalten Foto-Anruftasten aus der Ferne und erhalten sofort eine Nachricht bei SOS oder schwachem Akku.',
        priceLabel: 'Preise • Familien-Fernverbindung',
        badge: '🎁 14 Tage kostenlos testen',
        trialBadge: '🎁 14 Tage kostenlos testen',
        pricingTiers: [
          {
            label: 'Monatsabo:',
            price: '4,99 € / Monat',
          },
          {
            label: 'Jahresabo (~33 % sparen):',
            price: '39,99 € / Jahr',
            note: '(~3,33 € / Monat)',
          },
          {
            label: 'Einmalige lebenslange Lizenz:',
            price: '79,99 €',
            note: '(Einmalzahlung ohne Monatsgebühr – zum Preis eines einfachen Tasten-Seniorenhandys)',
          },
        ],
        reassurance:
          'Sichere Abrechnung über Google Play ausschließlich auf dem Smartphone des Familienmitglieds (auf dem Gerät Ihrer Eltern erscheinen niemals Zahlungshinweise). Jederzeit mit einem Klick kündbar.',
      },
    ],
    howSteps: [
      {
        title: 'Auf dem Handy der Eltern installieren',
        desc: 'Läuft auf jedem vorhandenen Android 8.0+ Smartphone – über WLAN sogar ohne SIM-Karte.',
      },
      {
        title: 'Mit 6-stelligem Code koppeln',
        desc: 'Nach Zustimmung Ihrer Eltern verbinden Sie beide Android-Telefone sofort per Sicherheitscode.',
      },
      {
        title: 'Entspannt aus der Ferne verwalten',
        desc: 'Richten Sie Foto-Tasten, Medikamentenerinnerungen und GPS-Zonen vom eigenen Handy aus ein.',
      },
    ],
    setupTimeBanner:
      '⏱️ Wie lange dauert die Einrichtung? Die Ersteinrichtung dauert ca. 10–15 Minuten, da Android einmalige Sicherheitsberechtigungen für den gesperrten Startbildschirm und das automatische Freisprechen benötigt. Unser Video führt Sie Schritt für Schritt durch – danach bleibt das Telefon vor versehentlichem Verstellen geschützt.',
    specsToggleBtn: 'Alle Funktionen & technische Details anzeigen (20+ Funktionen) ↓',
    specsHideBtn: 'Detaillierte Funktionsliste ausblenden ↑',
    featureTitles: [
      'Funktionen auf dem Handy der Eltern',
      'Sichere Familienverbindung',
      'Funktionen auf dem Handy des Familienmitglieds',
    ],
    features: [
      [
        'Gesperrter, einfacher Startbildschirm (funktioniert bei Bedarf auch eigenständig ohne zweites Telefon)',
        '4 oder bis zu 6 große Foto-Anruftasten mit Vorname und Anzeige verpasster Anrufe („Hat angerufen!“)',
        'Anpassbare Text-, Foto- und Telefonsymbolgrößen (3-stufig einstellbar oder ausblendbar)',
        'Klassische SIM-Anrufe (auch ohne Internet) sowie SIM-lose WLAN-Sprach- und Videoanrufe',
        'Automatische Freisprechfunktion mit voller Startlautstärke, Lautstärkeregler auf dem Bildschirm und lautloser Blockierung paralleler Anrufe während eines Gesprächs',
        'Vorgefertigte Schnell-SMS senden und eingehende SMS als Großschrift-Pop-up-Karte lesen',
        'SOS-Notruf und automatischer SMS-Versand mit GPS-Standort',
        'Morgendlicher Wecker und persönliche Tagesroutinen-Erinnerungen',
        '2-stufige Medikamentenerinnerung mit genauer Dosierung, Foto und Ein-Klick-Bestätigung („Eingenommen“) an die Familie',
      ],
      [
        'Schnelle Verbindung über einen 6-stelligen Kopplungscode',
        'Unterstützung für mehrere Familienmitglieder (bis zu 6 Personen) & automatische Kurzwahl-Belegung beim Koppeln (Platz 1–6)',
        'Statusaktualisierungen in Echtzeit und sofortige Synchronisierung über eine sichere EU-Cloud',
        'Zuverlässiger Hintergrundbetrieb: herstellerspezifischer Akku-Schutz (Xiaomi, Samsung, Huawei u.a.)',
        'Verschlüsselte Datenübertragung (TLS 1.3 / AES-256)',
        'EU-DSGVO-konforme Datenverarbeitung mit beidseitiger Einwilligung und endgültiger Ein-Klick-Datenlöschung jederzeit',
      ],
      [
        'Sofortige Benachrichtigung beim Ein- und Ausschalten des Elterntelefons sowie bei niedrigem Akkustand (vor dem Entladen)',
        'Sprach- und Videoanrufe zum Handy der Eltern — auch ohne SIM-Karte über WLAN',
        'Automatische Rufannahme: Das Familienmitglied kann seinen Anruf am Elterntelefon aus der Ferne per Lautsprecher verbinden',
        'Fernwiederherstellung der maximalen Klingeltonlautstärke (falls das Gerät versehentlich stummgeschaltet wurde)',
        'Fernverwaltung von Namen, Telefonnummern und Fotos für bis zu 6 Anruftasten',
        'Fernverwaltung der Anrufberechtigungen (Whitelist): Nur freigegebene Nummern klingeln durch',
        'Ferneinrichtung von Weckern und Foto-Medikamentenerinnerungen mit Echtzeit-Bestätigung („Eingenommen“)',
        'Sicherheitszonen-Benachrichtigungen beim Verlassen/Zurückkehren sowie integrierte Live-Minikarte mit Ein-Klick-Navigation über Google Maps',
      ],
    ],
    videoShowcase: {
      videoId: '7UUD1rOxeOo',
      badge: 'Schritt-für-Schritt-Videoanleitung',
      title: 'Komplettes Einrichtungs- und Funktionsvideo',
      subtitle:
        'Links sehen Sie das Fernsteuerungs-Dashboard des Familienmitglieds, rechts den gesperrten, einfachen Startbildschirm Ihrer Eltern. Klicken Sie auf ein Kapitel in der Liste, um direkt zu dieser Stelle zu springen!',
      leftPhoneLegend: '📱 Linkes Telefon: Fernsteuerungs-Dashboard des Familienmitglieds',
      rightPhoneLegend: '📱 Rechtes Telefon: Gesperrter, einfacher Startbildschirm der Eltern',
      chapterListTitle: 'Direkt zu den Videokapiteln springen',
      totalDuration: '12:58 Min.',
      chapters: [
        { time: '00:00', seconds: 0, title: '1. Installation, Rollenauswahl & Berechtigungen', desc: 'SENEAR auf beiden Telefonen starten, Berechtigungen freigeben und links **Betreuer**, rechts **Senior** wählen.' },
        { time: '00:24', seconds: 24, title: '2. Profildaten & Startbildschirm-Schutz', desc: 'Profil eingeben und Berechtigungen aktivieren: *Über anderen Apps*, *Systemeinstellungen*, *Start-App* und *SENEAR Kiosk Guard*.' },
        { time: '01:45', seconds: 105, title: '3. Zwei Telefone, Ein System – Sofortige Kopplung', desc: 'Kopplung mit dem 6-stelligen Sicherheitscode (TD6F4T) sowie SMS-Zugriff & Akku-Optimierung.' },
        { time: '02:52', seconds: 172, title: '4. Fotos, Kontakte & Tasten-Einrichtung (4 oder 6 Tasten)', desc: 'Fotos für Tasten 1–4 aus der Ferne hochladen, auf **6-Tasten-Ansicht** (04:01) wechseln und Größen in Echtzeit anpassen (04:46).', badge: 'Beliebt' },
        { time: '05:31', seconds: 331, title: '5. Anrufberechtigungen (Whitelist) & Schutz vor Betrügern', desc: 'Vertrauenswürdige Kontakte freigeben, sodass unbekannte Nummern und Telefonbetrüger nicht durchklingeln.' },
        { time: '06:19', seconds: 379, title: '6. Kostenloser WLAN-Anruf, Freisprechen & Rückruf', desc: '*Auto-Answer* und *Auto-Speaker* aktivieren oder Rückruf über das rote *Missed call!*-Abzeichen mit *JA / NEIN*-Bestätigung.', badge: 'Highlight' },
        { time: '07:31', seconds: 451, title: '7. Seniorengerechtes Großschrift-SMS-Popup', desc: 'Eingehende SMS erscheinen automatisch als kontrastreiche Großschrift-Karte auf dem Bildschirm.' },
        { time: '07:34', seconds: 454, title: '8. Wecker, Foto-Medikamentenerinnerung & Strom-Alarme', desc: 'Wecker und Foto-Medikamentenerinnerung mit *DONE / TAKEN*-Bestätigung (08:40) sowie Push-Meldungen beim Aus-/Einschalten (09:01).', badge: 'Highlight' },
        { time: '09:51', seconds: 591, title: '9. Live-Minikarte, Sicherheitszone & SOS-Notruf', desc: 'Live-Standort auf der Google-Maps-Minikarte, Sicherheitszone (100–1000 m) und roter *SOS CALL*-Button mit *JA / NEIN*-Bestätigung (10:31).' },
        { time: '10:43', seconds: 643, title: '10. Großtasten-Wählfeld & Schnell-SMS', desc: 'Freies Wählen über das Großtasten-Wählfeld (10:52) oder vorgefertigte Schnell-SMS (*Please call me!*) ohne Tippen senden (11:10).' },
        { time: '11:23', seconds: 683, title: '11. Lokale Einstellungen per 5-maligem Tippen öffnen', desc: 'Oben 5-mal auf die Uhr tippen (PIN 1234): Schnellnachrichten, Ton & Bildschirm (11:58), Kontakte, Routinen und SOS-Konfiguration (12:21).' },
        { time: '12:37', seconds: 757, title: '12. Zurück zum normalen Android-Menü', desc: 'Unten auf *Back to Phone Menu* tippen und Standard-Start-App (*One UI Home*) wählen, um jederzeit zum normalen Android-Menü zurückzukehren.' },
      ],
    },
    founderNote: {
      quote:
        '„Warum ich SENEAR entwickelt habe: Ich suchte für meine eigene Familie nach einer Lösung ohne teures, umständliches Tastenhandy – komplett werbefrei und mit echtem Schutz vor Telefonbetrügern. SENEAR wird in Europa entwickelt, ist werbefrei und DSGVO-konform.“',
      author: 'Gábor Bányai',
      role: 'Gründer & Entwickler (Gabba Labs)',
      badges: ['🇪🇺 Entwickelt in Europa', '🛡️ Werbefrei', '🔒 Streng DSGVO-konform'],
    },
    faqTitle: 'Häufige Fragen (FAQ)',
    faqs: [
      {
        q: 'Was sieht das Familienmitglied und ist die Zustimmung meiner Eltern erforderlich?',
        a: 'Ja, die Kopplung erfordert die ausdrückliche DSGVO-konforme Zustimmung auf dem Gerät Ihrer Eltern. Das Familienmitglied sieht Akkustand, Medikamentenbestätigungen und (falls aktiviert) den GPS-Standort, jedoch niemals private Nachrichten oder Gesprächsinhalte. Alle Daten können jederzeit mit einem Klick gelöscht werden.',
      },
      {
        q: 'Auf welchen Handys läuft SENEAR? Funktioniert es auch auf dem iPhone?',
        a: 'Sowohl das Handy Ihrer Eltern als auch das Smartphone des Familienmitglieds benötigen Android 8.0 oder neuer (Samsung, Xiaomi, Redmi, Motorola, Honor, Pixel usw.). Apple iOS erlaubt keine solche Startbildschirm-Sperre oder automatische Freisprech-Steuerung.',
      },
      {
        q: 'Wie funktionieren die 14-tägige Testphase und die Abrechnung? Sieht mein Elternteil jemals ein Zahlungsfenster?',
        a: 'Niemals. Das Handy Ihrer Eltern bleibt frei von Werbung und Zahlungshinweisen. Nach der 14-tägigen Testphase wählt das Familienmitglied auf seinem eigenen Smartphone über Google Play zwischen Monatsabo (4,99 €), Jahresabo (39,99 €) oder einmaliger lebenslanger Lizenz (79,99 €).',
      },
      {
        q: 'Was passiert, wenn ich das Familien-Abo kündige?',
        a: 'Das Telefon Ihrer Eltern funktioniert dauerhaft kostenlos als geschütztes Seniorenhandy mit Anruffilter weiter! Lediglich die Fernverwaltung pausiert.',
      },
      {
        q: 'Braucht das Handy meiner Eltern eine SIM-Karte?',
        a: 'Nicht zwingend! Über das Heim-WLAN funktionieren kostenlose SENEAR-WLAN-Anrufe mit gekoppelten Familienmitgliedern, Medikamentenerinnerungen und die Fernverwaltung auch ohne SIM-Karte.',
      },
      {
        q: 'Kann man wieder zum normalen Android-Menü zurückkehren?',
        a: 'Ja, jederzeit durch 5-maliges Tippen auf die obere Uhr und Eingabe des 4-stelligen PIN-Codes.',
      },
      {
        q: 'Muss ich ein neues Handy kaufen oder reicht das vorhandene Gerät?',
        a: 'Kein Neukauf nötig! Jedes vorhandene Android-Smartphone kann sofort und ohne Werksreset genutzt werden.',
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
        'Egyszerű, védett kezdőképernyő az idős szüleidnek, ahol csak a jóváhagyott számok csörögnek ki – te pedig távolról is látod, hogy minden rendben van.',
      chips: [],
      primaryCta: 'Beállítási útmutató',
      benefitsTitle: 'Miért a SENEAR?',
      benefitsSubtitle: 'Válaszd a családodnak megfelelő működést — önállóan ingyen, vagy távoli összeköttetéssel.',
      howTitle: 'Így működik',
      howSubtitle: 'Két Android telefon, egy rendszer — 3 egyszerű lépésben.',
      how: [
        {
          title: 'Telepítsd a szülőd telefonjára',
          desc: 'Bármilyen meglévő Android 8.0+ készülékre felteheted, otthoni Wi-Fi-n akár SIM-kártya nélkül is.',
        },
        {
          title: 'Párosítsd a 6 jegyű kóddal',
          desc: 'A szülő jóváhagyása után egyetlen kóddal összekapcsolhatod a két Android telefont.',
        },
        {
          title: 'Kezeld távolról, nyugodtan',
          desc: 'A saját mobilodról állíthatod be a fényképes hívógombokat, a gyógyszeremlékeztetőket és a GPS-zónát.',
        },
      ],
      spotlightTitle: 'Közelebbről',
      spotlightSubtitle: 'Nézd meg, mit lát az idős szülő és mit a családtag.',
      bullets: [
        ['4 vagy akár 6 nagy, fényképes gyorshívó gomb', 'Óriási, jól olvasható dátum és idő', 'Nincs zavaró menü vagy véletlenül elállítható beállítás'],
        ['Kontaktok fényképpel és megnevezéssel', 'SOS szám és automatikus GPS SMS', 'Hívásszűrés: csak a jóváhagyott számok csörögnek ki'],
        ['Élő akkumulátor- és töltésállapot', 'Pontos helyzet élő mini-térképen és Google Térképen', 'Távolról élesíthető automatikus hívásfogadás'],
        ['Azonnali értesítés SOS esetén', 'Jelzés alacsony akkunál és ki-/bekapcsoláskor', 'Szűrhető eseménynapló'],
      ],
      ctaTitle: 'Készen állsz a beállításra?',
      ctaText:
        'Lépésről lépésre végigvezetünk az idős szülő és a családtag telefonjának beállításán — gyári visszaállítás nélkül.',
    },
    en: {
      kicker: 'Senior-friendly smartphone system',
      heroTitle: 'Safety for seniors. Peace of mind for families.',
      heroText:
        'A simple, locked home screen for your aging parents where only approved numbers ring through — while you see from afar that everything is okay.',
      chips: [],
      primaryCta: 'Setup guide',
      benefitsTitle: 'Why SENEAR?',
      benefitsSubtitle: 'Choose the mode that fits your family — free standalone use or remote family connection.',
      howTitle: 'How it works',
      howSubtitle: 'Two Android phones, one system — in 3 simple steps.',
      how: [
        {
          title: 'Install on your parent’s phone',
          desc: 'Works on any existing Android 8.0+ smartphone—even without a SIM card over home Wi-Fi.',
        },
        {
          title: 'Pair with a 6-digit code',
          desc: 'After your parent’s consent, link both Android phones in seconds using a one-time security code.',
        },
        {
          title: 'Manage remotely with peace of mind',
          desc: 'Set up photo speed-dial buttons, medication reminders, and GPS safe zones from your own phone.',
        },
      ],
      spotlightTitle: 'A closer look',
      spotlightSubtitle: 'See what your parent sees — and what the family member sees.',
      bullets: [
        ['4 or up to 6 large photo speed-dial buttons', 'Huge, easy-to-read date and time', 'No confusing menus or settings to break'],
        ['Contacts with photos and labels', 'SOS number with automatic GPS SMS', 'Call whitelist: only approved numbers ring through'],
        ['Live battery and charging status', 'Exact location on live mini-map & Google Maps', 'Remotely enabled auto-answer on speaker'],
        ['Instant alert on SOS', 'Alerts on low battery and power on/off', 'Filterable event history'],
      ],
      ctaTitle: 'Ready to set it up?',
      ctaText: 'We guide you step by step through setting up both your parent’s and your own Android phone — no factory reset needed.',
    },
    de: {
      kicker: 'Seniorenfreundliches Smartphone-System',
      heroTitle: 'Sicherheit für Senioren. Ruhe für die Familie.',
      heroText:
        'Ein einfacher, gesperrter Startbildschirm für Ihre älteren Eltern, bei dem nur freigegebene Nummern durchklingeln – während Sie aus der Ferne sehen, dass alles in Ordnung ist.',
      chips: [],
      primaryCta: 'Einrichtungsanleitung',
      benefitsTitle: 'Warum SENEAR?',
      benefitsSubtitle: 'Wählen Sie den passenden Modus für Ihre Familie — kostenlos eigenständig oder mit Fernverbindung.',
      howTitle: 'So funktioniert es',
      howSubtitle: 'Zwei Android-Telefone, ein System — in 3 einfachen Schritten.',
      how: [
        {
          title: 'Auf dem Handy der Eltern installieren',
          desc: 'Läuft auf jedem vorhandenen Android 8.0+ Smartphone – über WLAN sogar ohne SIM-Karte.',
        },
        {
          title: 'Mit 6-stelligem Code koppeln',
          desc: 'Nach Zustimmung Ihrer Eltern verbinden Sie beide Android-Telefone sofort per Sicherheitscode.',
        },
        {
          title: 'Entspannt aus der Ferne verwalten',
          desc: 'Richten Sie Foto-Tasten, Medikamentenerinnerungen und GPS-Zonen vom eigenen Handy aus ein.',
        },
      ],
      spotlightTitle: 'Im Detail',
      spotlightSubtitle: 'Sehen Sie, was Ihre Eltern sehen — und was das Familienmitglied sieht.',
      bullets: [
        ['4 oder bis zu 6 große Foto-Kurzwahltasten', 'Riesige, gut lesbare Uhrzeit und Datum', 'Keine verwirrenden Menüs oder Einstellungen'],
        ['Kontakte mit Foto und Bezeichnung', 'SOS-Nummer mit automatischer GPS-SMS', 'Anruffilter: Nur freigegebene Nummern klingeln durch'],
        ['Live-Akku- und Ladestatus', 'Genauer Standort auf Live-Minikarte & Google Maps', 'Fernaktivierbare automatische Rufannahme'],
        ['Sofortige Benachrichtigung bei SOS', 'Meldung bei niedrigem Akku und Ein-/Ausschalten', 'Filterbares Ereignisprotokoll'],
      ],
      ctaTitle: 'Bereit für die Einrichtung?',
      ctaText: 'Wir führen Sie Schritt für Schritt durch die Einrichtung beider Android-Telefone — ohne Werksreset.',
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
        ['Játékos, mégis korlátozott kezdőképernyő', 'Nincs böngésző, áruház vagy idegen app', 'Nem törölhető és nem kerülhető meg'],
        ['Valós idejű GPS-pozíció', 'Biztonsági zónák (iskola, otthon)', 'Azonnali értesítés zónaelhagyáskor'],
        ['Töltöttség és hangerő távoli ellenőrzése', 'Hívásnapló és engedélyezett kontaktok', 'Távolról módosítható szabályok'],
        ['Csak a szülők által jóváhagyott számok', 'Idegen hívók automatikus blokkolása', 'Egyérintéses szülőhívás'],
      ],
      ctaTitle: 'Készen állsz a beállításra?',
      ctaText: 'Lépésről lépésre végigvezetünk a Gyermek és a Szülő telefonjának beállításán.',
    },
    en: {
      kicker: 'Child-safe smartphone system',
      heroTitle: 'A safe first phone. Calm parents.',
      heroText:
        'JUNEAR gives your child a playful, strictly locked phone interface and gives parents a remote console — with live GPS, safe zones and whitelisted callers only.',
      chips: ['Approved contacts only', 'Live GPS & safe zones', 'Protected even offline'],
      primaryCta: 'Setup guide',
      benefitsTitle: 'Why JUNEAR?',
      benefitsSubtitle: 'A safe digital environment where children gain independence and parents keep peace of mind.',
      howTitle: 'How it works',
      howSubtitle: 'Two phones, one system — parents are always near.',
      how: [
        {
          title: 'Child’s phone',
          desc: 'A playful yet strictly locked launcher: the child can only reach approved apps and contacts.',
        },
        {
          title: 'Secure cloud link',
          desc: 'A pairing code links the child’s and parent’s phones in seconds; state syncs through a secure cloud.',
        },
        {
          title: 'Parent’s phone',
          desc: 'Parents see live location, battery and call list, and receive instant alerts when leaving a safe zone.',
        },
      ],
      spotlightTitle: 'A closer look',
      spotlightSubtitle: 'See what the child sees — and what the parent sees.',
      bullets: [
        ['Playful yet restricted home screen', 'No browser, app store or unknown apps', 'Cannot be uninstalled or bypassed'],
        ['Real-time GPS location', 'Safe zones (school, home)', 'Instant alert on leaving a zone'],
        ['Remote battery and ringer check', 'Call log and approved contacts', 'Remotely adjustable rules'],
        ['Only parent-approved numbers', 'Unknown callers blocked automatically', 'One-tap call to parents'],
      ],
      ctaTitle: 'Ready to set it up?',
      ctaText: 'We guide you step by step through setting up both the Child’s and the Parent’s phone.',
    },
    de: {
      kicker: 'Kindersicheres Smartphone-System',
      heroTitle: 'Ein sicheres erstes Handy. Entspannte Eltern.',
      heroText:
        'JUNEAR bietet Ihrem Kind eine spielerische, streng geschützte Oberfläche und den Eltern eine Fernkonsole — mit Live-GPS, Sicherheitszonen und nur freigegebenen Kontakten.',
      chips: ['Nur erlaubte Kontakte', 'Live-GPS & Sicherheitszonen', 'Auch offline geschützt'],
      primaryCta: 'Einrichtungsanleitung',
      benefitsTitle: 'Warum JUNEAR?',
      benefitsSubtitle: 'Eine sichere digitale Umgebung, in der Kinder selbstständig sind und Eltern beruhigt bleiben.',
      howTitle: 'So funktioniert es',
      howSubtitle: 'Zwei Telefone, ein System — die Eltern sind immer nah.',
      how: [
        {
          title: 'Kinder-Telefon',
          desc: 'Spielerische, aber streng gesperrte Oberfläche: Das Kind erreicht nur freigegebene Apps und Kontakte.',
        },
        {
          title: 'Sichere Verbindung',
          desc: 'Per Kopplungscode verbinden sich Kinder- und Eltern-Telefon sofort über eine sichere Cloud.',
        },
        {
          title: 'Eltern-Telefon',
          desc: 'Eltern sehen Standort, Akku und Anrufliste und erhalten sofort eine Warnung beim Verlassen einer Zone.',
        },
      ],
      spotlightTitle: 'Im Detail',
      spotlightSubtitle: 'Sehen Sie, was das Kind sieht — und was die Eltern sehen.',
      bullets: [
        ['Spielerischer, aber geschützter Startbildschirm', 'Kein Browser, Store oder fremde Apps', 'Nicht löschbar und nicht umgehbar'],
        ['Echtzeit-GPS-Standort', 'Sicherheitszonen (Schule, Zuhause)', 'Sofort-Alarm beim Verlassen'],
        ['Akku- und Klingeltonprüfung aus der Ferne', 'Anrufliste und erlaubte Kontakte', 'Fernsteuerbare Regeln'],
        ['Nur von Eltern freigegebene Nummern', 'Fremde Anrufer automatisch blockiert', 'Ein-Tipp-Anruf zu den Eltern'],
      ],
      ctaTitle: 'Bereit für die Einrichtung?',
      ctaText: 'Wir führen Sie Schritt für Schritt durch die Einrichtung des Kinder- und Eltern-Telefons.',
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
  const photos = getProductPhotos(product, t, lang);
  const setupRoute: AppRoute = product === 'senear' ? 'senear-setup' : 'junear-setup';
  const senearExtra = product === 'senear' ? SENEAR_EXTRA[lang] : null;

  const [activeSeconds, setActiveSeconds] = useState<number>(0);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);
  const [activeChapterIdx, setActiveChapterIdx] = useState<number>(0);
  const [playKey, setPlayKey] = useState<number>(0);
  const [showAllSpecs, setShowAllSpecs] = useState<boolean>(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [showMobileFloatingCta, setShowMobileFloatingCta] = useState<boolean>(false);
  const videoPlayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveSeconds(0);
    setActiveChapterIdx(0);
    setAutoPlay(false);
  }, [lang]);

  // Dynamic page title & OpenGraph meta updates for /senear
  useEffect(() => {
    if (product !== 'senear') return;
    const title =
      lang === 'hu'
        ? 'SENEAR – Biztonság az időseknek, nyugalom a családnak (Android 8.0+)'
        : lang === 'de'
        ? 'SENEAR – Sicherheit für Senioren, Ruhe für die Familie (Android 8.0+)'
        : 'SENEAR — Safety for seniors, peace of mind for families (Android 8.0+)';
    const desc = c.heroText;
    document.title = title;
    const setMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute('content', content);
    };
    setMeta('meta[name="description"]', desc);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', desc);
  }, [product, lang, c.heroText]);

  // Show floating mobile Download bar after scrolling past Hero
  useEffect(() => {
    if (product !== 'senear') return;
    const onScroll = () => {
      setShowMobileFloatingCta(window.scrollY > 460);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [product]);

  const handleCopyShareLink = async () => {
    const shareUrl = 'https://gabba.bond/senear';
    try {
      if (navigator.share && window.innerWidth < 768) {
        await navigator.share({ title: 'SENEAR', text: c.heroText, url: shareUrl });
        return;
      }
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    } catch {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

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
        href={PLAY_STORE_URL}
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
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-4">
                <img src={`/logos/${product}-logo.png`} alt={`${name} logo`} className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
                <div>
                  <div className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight leading-none">{name}</div>
                  <div className="text-sm font-semibold text-[#8C7355] mt-1.5">
                    {audience} · {c.kicker}
                  </div>
                </div>
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.3rem] font-bold tracking-tight leading-[1.1]">
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
                <div className="space-y-3.5 pt-1">
                  {/* Single Prominent Primary CTA: Google Play Download (Never truncated) */}
                  <div className="space-y-2">
                    <a
                      href={PLAY_STORE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-4 rounded-2xl font-bold text-sm sm:text-base bg-[#1B7A4E] hover:bg-[#145E3B] text-white shadow-lg hover:shadow-xl active:scale-99 transition-all whitespace-nowrap"
                    >
                      <GooglePlayIcon color="white" className="w-5 h-5 shrink-0 text-white" />
                      <span>{senearExtra.heroPrimaryDownloadBtn}</span>
                    </a>

                    {/* Upfront Android 8.0+ Requirement Line */}
                    <p className="text-xs sm:text-[13px] font-medium text-[#6E6B65]">
                      📱 {senearExtra.androidRequirementNote}
                    </p>
                  </div>

                  {/* Clean Secondary Text Anchor Links */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold text-[#5C5A56] pt-0.5">
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

                  {/* Desktop Visitor Helper: QR Code + Copy Link to Send to Phone */}
                  <div className="hidden sm:flex items-center gap-4 p-3.5 rounded-2xl bg-white/90 border border-[#E8DFD4] shadow-2xs max-w-xl">
                    <img
                      src="/senear-play-qr.png"
                      alt="Google Play QR code"
                      className="w-16 h-16 rounded-xl border border-[#E8DFD4] shrink-0 bg-white p-1"
                    />
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#2C2C2C]">
                        <QrCode className="w-3.5 h-3.5 text-[#8C7355]" />
                        <span>{senearExtra.desktopQrTitle}</span>
                      </div>
                      <p className="text-xs text-[#5C5A56] leading-snug">{senearExtra.desktopQrDesc}</p>
                      <button
                        type="button"
                        onClick={handleCopyShareLink}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF6F0] hover:bg-[#F0E7DA] border border-[#D8C3A5] text-xs font-bold text-[#2C2C2C] transition-colors cursor-pointer"
                      >
                        <Copy className="w-3 h-3 text-[#8C7355]" />
                        <span>{copiedLink ? senearExtra.copiedLinkBtn : senearExtra.copyLinkBtn}</span>
                      </button>
                    </div>
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
      {/* 3. WHY SENEAR? (2 HUMAN MODE CARDS WITH TRANSPARENT PRICING)      */}
      {/* ================================================================= */}
      <section className={senearExtra ? 'py-16 sm:py-20' : 'py-20 sm:py-24'}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={c.benefitsTitle} subtitle={c.benefitsSubtitle} accent={accent.main} />
          {senearExtra ? (
            <div className="max-w-5xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <div className="w-full rounded-2xl bg-[#FAF6F0] border border-[#D8C3A5] px-5 py-4 text-left select-text space-y-3">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C7355]">
                              {mode.priceLabel}
                            </span>
                            {mode.trialBadge && (
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#10895F]/12 text-[#0B6B4A] text-xs font-extrabold">
                                {mode.trialBadge}
                              </span>
                            )}
                          </div>
                          {mode.pricingTiers ? (
                            <ul className="space-y-2 border-t border-[#E6D7C3] pt-2.5">
                              {mode.pricingTiers.map((tier) => (
                                <li key={tier.label} className="text-xs sm:text-sm text-[#2C2C2C] leading-snug">
                                  <span className="font-bold text-[#2C2C2C]">{tier.label}</span>{' '}
                                  <span className="font-extrabold text-[#0B6B4A]">{tier.price}</span>
                                  {tier.note && (
                                    <span className="italic text-[#5C5A56]"> {tier.note}</span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div className="text-sm sm:text-base font-extrabold text-[#2C2C2C] leading-snug">
                              {mode.badge}
                            </div>
                          )}
                          {mode.reassurance && (
                            <p className="text-[11px] sm:text-xs text-[#5C5A56] leading-relaxed border-t border-[#E6D7C3] pt-2.5">
                              {mode.reassurance}
                            </p>
                          )}
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
      {/* 5. COMPLETE SETUP & FEATURE WALKTHROUGH VIDEO                     */}
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
            {/* Founder's Note Card with Real Photo */}
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

                <div className="flex items-center gap-3.5 pt-3 border-t border-[#F0EAE1]">
                  <img
                    src="/founder-avatar.png"
                    alt={senearExtra.founderNote.author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#C5A880] shadow-xs shrink-0"
                  />
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

            {/* FAQ (GYIK) Accordion — #1 Question (Privacy & Consent) Open by Default */}
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
      <section className="py-16 sm:py-20 pb-28 sm:pb-20">
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
                    href={PLAY_STORE_URL}
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

      {/* Floating Mobile Download CTA Bar */}
      {senearExtra && showMobileFloatingCta && (
        <div className="sm:hidden fixed bottom-3 inset-x-3 z-40">
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-[#1B7A4E] text-white font-bold text-sm shadow-2xl border border-white/20 whitespace-nowrap"
          >
            <GooglePlayIcon color="white" className="w-4 h-4 shrink-0 text-white" />
            <span>{senearExtra.mobileFloatingCta}</span>
          </a>
        </div>
      )}
    </div>
  );
}

function SectionHeader({ title, subtitle, accent }: { title: string; subtitle?: string; accent: string }) {
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
