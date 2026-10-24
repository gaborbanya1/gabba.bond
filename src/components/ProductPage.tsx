import React from 'react';
import {
  ArrowRight,
  BellRing,
  Check,
  ChevronRight,
  CloudCog,
  HeartHandshake,
  Lock,
  MapPin,
  Radio,
  ShieldCheck,
  Smartphone,
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

/**
 * SENEAR-only page extras: short "Why" block (standalone & free) and the
 * full feature list under each "How it works" step.
 */
interface SenearExtra {
  howButton: string;
  /** [0] = standalone (free), [1] = connected caregiver (premium) */
  modes: { title: string; body: string; badge: string }[];
  howDescs: string[];
  featureTitles: string[];
  features: string[][];
}

const SENEAR_EXTRA: Record<Lang, SenearExtra> = {
  hu: {
    howButton: 'Hogyan működik',
    modes: [
      {
        title: 'Önálló használat (Gondozott mód)',
        body: 'Ha a cél egy egyszerűen kezelhető, elállíthatatlan és védett telefon: az idős hozzátartozó egy tiszta felületet kap, ahol kizárólag az előre beállított személyeket tudja felhívni, és csak tőlük fogadhat hívást – így teljesen védett az ismeretlen zaklatóktól és telefonos csalóktól.',
        badge: 'Ingyenes — és mindig az is marad!',
      },
      {
        title: 'Gondozói összeköttetés (Teljes felügyelet)',
        body: 'Ha távolról is teljes biztonságban szeretné tudni idős szerettét: kösse össze a készülékét a saját telefonjával! Gondozóként valós időben láthatja a telefon állapotát (akkumulátor, térerő, helyadatok), távolról kezelheti a névjegyeket, és azonnali vészjelzést kap SOS gombnyomás vagy kapcsolatvesztés esetén.',
        badge: 'Gondozói előfizetéssel elérhető prémium védelem',
      },
    ],
    howDescs: [
      'Az idős hozzátartozó egy letisztult, 4 vagy akár 6 csempés, elállíthatatlan felületet kap.',
      'Egy 6-jegyű párosító kóddal a készülékek másodpercek alatt összekapcsolódnak (akár 6 családtagig).',
      'A családtag bármikor eléri a gondozott telefonját, azonnali riasztásokat kap, és távolról kezelheti a csempéket és emlékeztetőket.',
    ],
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
  },
  en: {
    howButton: 'How it works',
    modes: [
      {
        title: 'Standalone use (Senior mode)',
        body: 'If you want a simple, fail-safe and protected phone: your loved one gets a clean interface where they can only call — and only receive calls from — pre-approved people, fully protected from unknown harassers and phone scammers.',
        badge: 'Free — and it always will be!',
      },
      {
        title: 'Caregiver connection (Full supervision)',
        body: 'Want to know your loved one is safe, even from afar? Connect their device to your own phone! As a caregiver you see the phone’s status in real time (battery, signal, location), manage contacts remotely and get an instant alert on an SOS press or loss of connection.',
        badge: 'Premium protection with a caregiver subscription',
      },
    ],
    howDescs: [
      'Your elderly loved one gets a clean, fail-safe 4 or up to 6-tile interface.',
      'A 6-digit pairing code links the devices in seconds (up to 6 family members).',
      'Family members can reach the senior’s phone anytime, receive instant alerts, and manage tiles and reminders remotely.',
    ],
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
  },
  de: {
    howButton: 'So funktioniert es',
    modes: [
      {
        title: 'Eigenständige Nutzung (Senioren-Modus)',
        body: 'Wenn Sie ein einfach bedienbares, unverstellbares und geschütztes Telefon wünschen: Ihr Angehöriger erhält eine klare Oberfläche, über die er nur voreingestellte Personen anrufen und nur von ihnen Anrufe empfangen kann – vollständig geschützt vor unbekannten Belästigern und Telefonbetrügern.',
        badge: 'Kostenlos — und das bleibt auch so!',
      },
      {
        title: 'Betreuer-Verbindung (Volle Aufsicht)',
        body: 'Sie möchten Ihren Angehörigen auch aus der Ferne in Sicherheit wissen? Verbinden Sie sein Gerät mit Ihrem Telefon! Als Betreuer sehen Sie den Telefonstatus in Echtzeit (Akku, Empfang, Standort), verwalten Kontakte aus der Ferne und erhalten sofort einen Alarm bei SOS oder Verbindungsverlust.',
        badge: 'Premium-Schutz mit Betreuer-Abonnement',
      },
    ],
    howDescs: [
      'Ihr Angehöriger erhält eine klare, unverstellbare Oberfläche mit 4 oder bis zu 6 Kacheln.',
      'Ein 6-stelliger Kopplungscode verbindet die Geräte in Sekunden (für bis zu 6 Familienmitglieder).',
      'Familienmitglieder erreichen das Senioren-Telefon jederzeit, erhalten sofortige Alarme und verwalten Kacheln sowie Erinnerungen aus der Ferne.',
    ],
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
  },
};

const COPY: Record<ProductKey, Record<Lang, ProductCopy>> = {
  senear: {
    hu: {
      kicker: 'Idősbarát okostelefon-rendszer',
      heroTitle: 'Biztonság az időseknek. Nyugalom a családnak.',
      heroText:
        'A SENEAR egy egyszerű, elronthatatlan telefonfelület az idős hozzátartozónak, és egy távgondozói vezérlőpult a családnak — a két telefon folyamatos kapcsolatban áll egymással.',
      chips: [],
      primaryCta: 'Beállítási útmutató',
      benefitsTitle: 'Miért a SENEAR?',
      benefitsSubtitle: 'Négy alappillér, amely az idős felhasználó és a család mindennapjait is könnyebbé teszi.',
      howTitle: 'Így működik',
      howSubtitle: 'Két telefon, egy rendszer — percek alatt beállítható.',
      how: [
        {
          title: 'Gondozott telefonja',
          desc: 'Az idős hozzátartozó egy letisztult, 4 vagy akár 6 csempés, elállíthatatlan felületet kap.',
        },
        {
          title: 'Biztonságos összeköttetés',
          desc: 'Egy 6-jegyű párosító kóddal a készülékek másodpercek alatt összekapcsolódnak (akár 6 családtagig).',
        },
        {
          title: 'Gondozó telefonja',
          desc: 'A családtag bármikor eléri a gondozott telefonját, azonnali riasztásokat kap, és távolról kezelheti a csempéket és emlékeztetőket.',
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
        'SENEAR combines a simple, fail-safe phone interface for your elderly loved one with a remote caregiver dashboard for the family — both phones stay connected at all times.',
      chips: [],
      primaryCta: 'Setup guide',
      benefitsTitle: 'Why SENEAR?',
      benefitsSubtitle: 'Four core pillars that make everyday life easier for seniors and their families.',
      howTitle: 'How it works',
      howSubtitle: 'Two phones, one system — set up in minutes.',
      how: [
        {
          title: 'Senior’s phone',
          desc: 'Your elderly loved one gets a clean, fail-safe 4 or up to 6-tile interface.',
        },
        {
          title: 'Secure connection',
          desc: 'A 6-digit pairing code links the devices in seconds (up to 6 family members).',
        },
        {
          title: 'Caregiver’s phone',
          desc: 'Family members can reach the senior’s phone anytime, receive instant alerts, and manage tiles and reminders remotely.',
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
        'SENEAR verbindet eine einfache, unverstellbare Telefonoberfläche für Ihre Angehörigen mit einem Betreuer-Dashboard für die Familie — beide Telefone bleiben ständig verbunden.',
      chips: [],
      primaryCta: 'Einrichtungsanleitung',
      benefitsTitle: 'Warum SENEAR?',
      benefitsSubtitle: 'Vier Grundpfeiler, die den Alltag von Senioren und Familien erleichtern.',
      howTitle: 'So funktioniert es',
      howSubtitle: 'Zwei Telefone, ein System — in wenigen Minuten eingerichtet.',
      how: [
        {
          title: 'Senioren-Telefon',
          desc: 'Ihr Angehöriger erhält eine klare, unverstellbare Oberfläche mit 4 oder bis zu 6 Kacheln.',
        },
        {
          title: 'Sichere Verbindung',
          desc: 'Ein 6-stelliger Kopplungscode verbindet die Geräte in Sekunden (für bis zu 6 Familienmitglieder).',
        },
        {
          title: 'Betreuer-Telefon',
          desc: 'Familienmitglieder erreichen das Senioren-Telefon jederzeit, erhalten sofortige Alarme und verwalten Kacheln sowie Erinnerungen aus der Ferne.',
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

interface ProductPageProps {
  product: ProductKey;
  onNavigate: (route: AppRoute) => void;
  onContactClick: () => void;
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

  const benefits = [
    { title: tp.feature1Title, desc: tp.feature1Desc },
    { title: tp.feature2Title, desc: tp.feature2Desc },
    { title: tp.feature3Title, desc: tp.feature3Desc },
    { title: tp.feature4Title, desc: tp.feature4Desc },
  ];

  const SecondaryCta =
    product === 'senear' ? (
      <a
        href="https://play.google.com/store/apps/details?id=bond.gabba.senear"
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
      {/* HERO                                                              */}
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

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <PrimaryCta />
                {SecondaryCta}
                {senearExtra && (
                  <a
                    href="#igy-mukodik"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('igy-mukodik')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#10895F] hover:bg-[#0B6B4A] text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all group"
                  >
                    {senearExtra.howButton}
                    <ArrowRight className="w-4 h-4 rotate-90 transition-transform group-hover:translate-y-0.5" />
                  </a>
                )}
              </div>
            </div>

            <div className="lg:col-span-6">
              <ProductShowcase3D product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* BENEFITS                                                          */}
      {/* ================================================================= */}
      <section className={senearExtra ? 'py-16 sm:py-20' : 'py-20 sm:py-24'}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={c.benefitsTitle} subtitle={senearExtra ? '' : c.benefitsSubtitle} accent={accent.main} />
          {senearExtra ? (
            /* SENEAR: two use cases side by side — standalone (free) vs. caregiver connection (premium) */
            <div className="max-w-5xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {senearExtra.modes.map((mode, i) => {
                const premium = i === 1;
                const Icon = premium ? HeartHandshake : Smartphone;
                return (
                  <div
                    key={mode.title}
                    className="relative flex flex-col p-7 sm:p-8 rounded-3xl bg-white border-2 shadow-sm hover:shadow-lg transition-shadow text-left"
                    style={{ borderColor: premium ? `${accent.main}80` : 'rgba(16,137,95,0.3)' }}
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
                      <h3 className="font-heading text-lg sm:text-xl font-bold text-[#2C2C2C] leading-snug">{mode.title}</h3>
                    </div>
                    <p className="text-sm sm:text-base text-[#5C5A56] leading-relaxed mt-4 flex-1">{mode.body}</p>
                    <div className="mt-6">
                      {premium ? (
                        <div
                          className="flex items-center justify-center gap-2.5 w-full min-h-[80px] px-5 py-3 rounded-2xl border-2 border-[#A38053] text-white text-base sm:text-lg font-extrabold text-center leading-snug shadow-md"
                          style={{ background: 'linear-gradient(135deg, #C5A880 0%, #A38053 100%)' }}
                        >
                          <span aria-hidden="true" className="text-xl">★</span>
                          {mode.badge}
                        </div>
                      ) : (
                        <div
                          className="free-badge relative overflow-hidden flex items-center justify-center gap-3 w-full min-h-[80px] px-5 py-3 rounded-2xl border-2 border-[#0B6B4A] text-white text-lg sm:text-xl font-black text-center leading-snug tracking-tight"
                          style={{ background: 'linear-gradient(135deg, #12A06E 0%, #10895F 55%, #0B6B4A 100%)' }}
                        >
                          <span className="free-badge-shine absolute inset-0 pointer-events-none" aria-hidden="true" />
                          <span className="relative w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow">
                            <Check className="w-5 h-5 text-[#10895F]" strokeWidth={3.5} />
                          </span>
                          <span className="relative drop-shadow-sm">{mode.badge}</span>
                          <style>{`
                            .free-badge { animation: freeGlow 2.6s ease-in-out infinite; }
                            @keyframes freeGlow {
                              0%,100% { box-shadow: 0 8px 22px -8px rgba(16,137,95,.55), 0 0 0 0 rgba(16,137,95,.35); }
                              50% { box-shadow: 0 10px 28px -8px rgba(16,137,95,.7), 0 0 0 8px rgba(16,137,95,0); }
                            }
                            .free-badge-shine { background: linear-gradient(110deg, transparent 35%, rgba(255,255,255,.35) 50%, transparent 65%); transform: translateX(-120%); animation: freeShine 3.8s ease-in-out infinite; }
                            @keyframes freeShine { 0% { transform: translateX(-120%); } 45%,100% { transform: translateX(120%); } }
                            @media (prefers-reduced-motion: reduce) { .free-badge, .free-badge-shine { animation: none !important; } }
                          `}</style>
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
      {/* HOW IT WORKS                                                      */}
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
            {c.how.map((step, i) => {
              const Icon = HOW_ICONS[product][i];
              const desc = senearExtra ? senearExtra.howDescs[i] : step.desc;
              const features = senearExtra?.features[i];
              return (
                <div key={step.title} className="relative text-center flex flex-col items-center">
                  <div className="relative w-20 h-20 rounded-full bg-white border-2 flex items-center justify-center shadow-lg z-10" style={{ borderColor: accent.main }}>
                    <Icon className="w-9 h-9 text-[#2C2C2C]" />
                    <span
                      className="absolute -top-1 -right-1 w-7 h-7 rounded-full text-white text-xs font-black flex items-center justify-center shadow"
                      style={{ background: accent.main }}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold mt-5">{step.title}</h3>
                  <p className={`text-sm sm:text-base text-[#5C5A56] leading-relaxed mt-2 max-w-xs ${features ? 'md:min-h-[78px]' : ''}`}>{desc}</p>

                  {features && (
                    <div className="mt-6 w-full max-w-sm text-left bg-white rounded-2xl border border-[#E8DFD4] p-5 shadow-2xs">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C7355] mb-3.5">
                        {senearExtra!.featureTitles[i]}
                      </h4>
                      <ul className="space-y-2.5">
                        {features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5 text-sm text-[#2C2C2C] leading-snug">
                            <span className="w-5 h-5 rounded-full bg-[#10895F] text-white flex items-center justify-center shrink-0 mt-px">
                              <Check className="w-3 h-3" strokeWidth={3.5} />
                            </span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SCREEN SPOTLIGHT ROWS                                             */}
      {/* ================================================================= */}
      <section className="py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
        </div>
      </section>

      {/* ================================================================= */}
      {/* SETUP CTA                                                         */}
      {/* ================================================================= */}
      <section className="pb-24">
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
      <div className="mx-auto w-12 h-1 rounded-full" style={{ background: accent }} />
      <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#2C2C2C]">{title}</h2>
      {subtitle && <p className="text-base sm:text-lg text-[#5C5A56] leading-relaxed">{subtitle}</p>}
    </div>
  );
}
