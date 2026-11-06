import { useEffect, useState } from 'react';
import {
  Scale,
  CheckSquare,
  Square,
  Printer,
  ExternalLink,
  Layers,
  ShieldAlert,
  FileText,
  Building2,
  Lock,
  Baby,
  Award,
  RotateCcw,
  ChevronRight,
  StickyNote,
} from 'lucide-react';

interface BriefItem {
  id: string;
  title: string;
  detail: string;
  tag?: string;
  tagTone?: 'critical' | 'important' | 'info';
}

interface BriefSection {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  icon: 'context' | 'ev' | 'arch' | 'aszf' | 'liability' | 'gdpr' | 'junear' | 'ip';
  items: BriefItem[];
}

const STORAGE_CHECKS_KEY = 'gabba_legal_brief_checks_v1';
const STORAGE_NOTES_KEY = 'gabba_legal_brief_notes_v1';

const BRIEF_SECTIONS: BriefSection[] = [
  {
    id: 'alaphelyzet',
    number: '1',
    title: 'Kiinduló helyzet és üzleti modell (gyors kontextus)',
    subtitle:
      'Egyéni vállalkozóként több saját szoftvertermék (mobilapp + jövőbeli webes PWA) fejlesztése és nemzetközi B2C értékesítése a gabba.bond ernyőmárka alatt.',
    icon: 'context',
    items: [
      {
        id: 'ctx-1',
        title: 'Üzemeltetői forma és székhely',
        detail:
          'Tervezett forma: Bányai Gábor egyéni vállalkozó, székhely: 9400 Sopron, Ravazd utca 46., Magyarország (EU). Kapcsolat: gabba@gabba.bond. Jelenleg a weboldalon még nincs adószám / EV nyilvántartási szám feltüntetve (az EV indításakor kerül be).',
        tag: 'Alapadatok',
        tagTone: 'info',
      },
      {
        id: 'ctx-2',
        title: 'Ernyőoldal (gabba.bond) vs. saját termékek (SENEAR, JUNEAR, jövőbeli appok)',
        detail:
          'A gabba.bond főoldal szoftverstúdióként / ernyőmárkaként működik (egyedi architektúra/fejlesztési megkeresések + saját termékportfólió). Első éles termék: SENEAR (gabba.bond/senear, Android csomag: bond.gabba.senear). Második tervezett termék: JUNEAR (gabba.bond/junear – gyerekeknek szóló felügyeleti rendszer), később pedig további önálló appok is várhatók.',
      },
      {
        id: 'ctx-3',
        title: 'SENEAR két üzemmódja és bevételi modellje (Freemium + SaaS)',
        detail:
          'A) Önálló idős mód (Örökké ingyenes): csak az idős szülő telefonján fut (zárolt nagy gombos kezdőképernyő, hívásszűrés, lokális SOS SMS), 0 felhős adattovábbítással. B) Családi távoli összekötés (14 nap ingyen, utána fizetős): két Android készülék (és készülő webes PWA iPhone-os családtagoknak) összekötése. Árazás euróban: 7,99 € / hó, 59,99 € / év, vagy 149 € egyszeri „Örökös” hozzáférés (fizetés jelenleg Google Play Billingen keresztül).',
        tag: 'B2C előfizetés',
        tagTone: 'important',
      },
      {
        id: 'ctx-4',
        title: 'Célpiac és 3 nyelvű működés (HU, EN, DE)',
        detail:
          'A weboldal és az alkalmazás magyar, angol és német nyelven érhető el; kiemelt célpiac Magyarország mellett a DACH régió (Németország, Ausztria) és az EU.',
      },
    ],
  },
  {
    id: 'ev-teaor',
    number: '2',
    title: 'Egyéni vállalkozás (EV), TEÁOR ’25 / ÖVTJ ’25 kódok és EU-s adózás',
    subtitle:
      'A 2025. január 1-től hatályos új ÖVTJ ’25 / TEÁOR ’25 tevékenységi körök és a nemzetközi app-értékesítés sajátosságai.',
    icon: 'ev',
    items: [
      {
        id: 'ev-1',
        title: 'Javasolt ÖVTJ ’25 (TEÁOR ’25) tevékenységi körök felvétele',
        detail:
          '• 582901 – Egyéb szoftverkiadás (TEÁOR ’25: 5829) → saját fejlesztésű mobilappok és SaaS előfizetések/licencek saját számlás kiadása, értékesítése.\n• 621001 – Számítógépes programozás m.n.s. (TEÁOR ’25: 6210, régi 6201) → mobilappok, weboldalak, rendszerek fejlesztése (saját + esetleges megbízásos munka).\n• 631001 – Egyéb adatbázis-szolgáltatás / adatfeldolgozás, web-hoszting (TEÁOR ’25: 6310, régi 6311) → felhőalapú SaaS / PWA szinkronizáció üzemeltetése.\n• 622001 – Számítástechnikai tanácsadás (TEÁOR ’25: 6220, régi 6202) → ha architektúra / IT tanácsadás is számlázásra kerül.\nKérdés: Melyik legyen a főtevékenység (582901 vs. 621001)? (Átalányadózásnál mindegyik 45%-os költséghányadú).',
        tag: 'TEÁOR ’25 / ÖVTJ ’25',
        tagTone: 'important',
      },
      {
        id: 'ev-2',
        title: 'EU közösségi adószám (HUxxxxxxxx) igénylése már az EV indításakor',
        detail:
          'A Google Play bevételeket az írországi Google Commerce Limited / Google Ireland Limited folyósítja, és a Google Cloud / Firebase számlák is Írországból érkeznek. Alanyi ÁFA-mentes (AAM) EV-ként is kötelező már az első kifizetés/számla előtt az EU közösségi adószám igénylése és az A60-as összesítő nyilatkozat (könyvelővel összehangolandó).',
        tag: 'Kritikus induláskor',
        tagTone: 'critical',
      },
      {
        id: 'ev-3',
        title: 'Google Play (Merchant of Record) vs. jövőbeli webes PWA közvetlen fizetés (pl. Stripe)',
        detail:
          'Google Playen keresztüli vásárlásnál a Google a „Merchant of Record” (ő számítja fel és vallja be a vásárló országa szerinti EU ÁFÁ-t a B2C fogyasztók után). Ha viszont a készülő iPhone/webes PWA változatban közvetlen bankkártyás fizetés (pl. Stripe) indul B2C magánszemélyeknek, ott belép a fogyasztói e-számlázás és 10 000 € EU-s bevétel felett az EU OSS (One-Stop Shop) ÁFA-rendszer (érdemes-e ott inkább Merchant of Record szolgáltatót – pl. Paddle / Lemon Squeezy – használni Stripe helyett?).',
        tag: 'Stratégiai döntés',
        tagTone: 'important',
      },
    ],
  },
  {
    id: 'architektura',
    number: '3',
    title: 'Weboldal- és jogi dokumentum-architektúra (Főoldal vs. Termékaloldalak)',
    subtitle:
      'Hogyan válasszuk szét tisztán a gabba.bond általános céges/stúdió tájékoztatóit a SENEAR, JUNEAR és jövőbeli termékek saját GDPR + ÁSZF oldalaitól?',
    icon: 'arch',
    items: [
      {
        id: 'arch-1',
        title: '1. szint – Központi („Umbrella”) jogi oldalak a gabba.bond főoldalon',
        detail:
          '• gabba.bond/impressum → Közös Impresszum minden termékhez (EV kötelező adatai + tárhelyszolgáltató: Google Ireland Ltd. – Firebase Hosting).\n• gabba.bond/privacy → Általános weboldal adatkezelési tájékoztató (kapcsolatfelvételi űrlap, sütimentes működés, általános GDPR 15–22. cikk szerinti jogok, NAIH) + átlátható kártyás elágazás az egyes termékek saját adatvédelmi tájékoztatóira.\n• gabba.bond/terms → Általános Keret-ÁSZF (vagy elágazás a termék-ÁSZF-ekre).',
        tag: 'Javasolt felépítés',
        tagTone: 'important',
      },
      {
        id: 'arch-2',
        title: '2. szint – Termékspecifikus jogi aloldalak (/senear/*, /junear/*, /ujtermek/*)',
        detail:
          'Minden termék saját alútvonalon kapja meg a rá vonatkozó részletes dokumentumokat:\n• SENEAR: /senear/privacy, /senear/terms, /senear/delete-account\n• JUNEAR: /junear/privacy, /junear/terms, /junear/delete-account\nA weboldal lábléce (Footer) kontextusérzékenyen az adott termék jogi linkjeit mutatja, amikor a látogató az adott termékoldalon jár.',
      },
      {
        id: 'arch-3',
        title: 'Ügyvédi kérdés: Egy közös Keret-ÁSZF termékmellékletekkel, vagy külön ÁSZF termékenként?',
        detail:
          'Melyik tisztább és karbantarthatóbb jogilag több B2C szoftverterméknél?\n• A opció: Közös Keret-ÁSZF (előfizetés, elállás, számlázás, panaszkezelés, irányadó jog) + termékenkénti Különös Feltételek / Melléklet (SENEAR vészjelzési kizárások, JUNEAR szülői szabályok).\n• B opció: Teljesen különálló, önmagában is kerek /senear/terms és /junear/terms dokumentum.',
        tag: 'Döntendő az ügyvéddel',
        tagTone: 'critical',
      },
      {
        id: 'arch-4',
        title: 'Technikai átállás a Google Play Console-ban',
        detail:
          'Amíg a Google Play Console adatbiztonsági adatlapján vagy az éles Android appban a /privacy és /delete-account szerepel, átálláskor a Play Console-ban frissíteni kell a linkeket /senear/privacy és /senear/delete-account címekre (a /delete-account-on pedig addig is közvetlenül elérhető marad a SENEAR törlési felület).',
      },
    ],
  },
  {
    id: 'aszf',
    number: '4',
    title: 'Hiányzó ÁSZF / Terms of Service / AGB megalkotása (HU, EN, DE)',
    subtitle:
      'Jelenleg csak Adatkezelési Tájékoztató (/privacy) és Adattörlési oldal (/delete-account) van élesben – az ÁSZF pótlása kötelező.',
    icon: 'aszf',
    items: [
      {
        id: 'aszf-1',
        title: '3 nyelvű ÁSZF (HU / EN / DE) és irányadó nyelv / jog kikötése',
        detail:
          'Mivel a landing oldal és az app magyarul, angolul és németül is értékesít fogyasztóknak (B2C), mindhárom nyelven szükséges-e a teljes ÁSZF? Kiírható-e a magyar jog irányadó jogként (Róma I. rendelet 6. cikk szerinti kötelező helyi fogyasztóvédelmi minimumszabályok fenntartásával), és melyik nyelv legyen az irányadó értelmezési vita esetén?',
        tag: 'Kötelező hiánypótlás',
        tagTone: 'critical',
      },
      {
        id: 'aszf-2',
        title: '14 napos ingyenes próbaidőszak és fogyasztói elállási jog (45/2014. Korm. r.)',
        detail:
          'Hogyan kell pontosan megfogalmazni a 14 napos elállási tájékoztatót (Widerrufsbelehrung) előfizetéses mobilalkalmazásnál, illetve egyszeri vásárlásnál, ha a teljesítés a fogyasztó kifejezett kérésére azonnal megkezdődik, és a tranzakció a Google Play rendszerén fut keresztül?',
        tag: 'EU / DACH fogyasztóvédelem',
        tagTone: 'important',
      },
      {
        id: 'aszf-3',
        title: 'Az „Örökös” (Lifetime – 149 €) csomag pontos jogi körülhatárolása',
        detail:
          'Egyéni vállalkozóként kritikus rögzíteni az ÁSZF-ben, hogy a 149 €-s „Örökös / Lifetime” díj nem korlátlan emberi élettartamra szóló felhőüzemeltetési kötelezettséget jelent, hanem a SENEAR adott szoftvertermékének kereskedelmi támogatási életciklusára (supported product lifetime) szóló egyszeri hozzáférést, ésszerű előzetes felmondási/megszüntetési értesítési idővel (pl. min. 6–12 hónap) vagy időarányos visszatérítési szabállyal.',
        tag: 'Kiemelt kockázatvédelem',
        tagTone: 'critical',
      },
      {
        id: 'aszf-4',
        title: 'Kellékszavatosság digitális szolgáltatásoknál (373/2021. Korm. r. / EU 2019/770 irányelv)',
        detail:
          'Folyamatos felhőszolgáltatás (Connected Mode) esetén kötelező frissítések, rendelkezésre állás (best-effort SLA), karbantartási ablakok, valamint a panaszkezelés és a Győr-Moson-Sopron Vármegyei Békéltető Testület pontos feltüntetése.',
      },
      {
        id: 'aszf-5',
        title: 'Szerződéskötés technikai módja (Clickwrap regisztrációkor)',
        detail:
          'Az Android appban (és később a PWA-ban) a Gondozói regisztrációkor és az előfizetés megkezdése előtt kifejezett, előre be nem pipált jelölőnégyzettel + verziózott UTC időbélyeggel kell rögzíteni az ÁSZF elfogadását.',
      },
    ],
  },
  {
    id: 'felelosseg',
    number: '5',
    title: 'Felelősségkorlátozás és Orvostechnikai Eszköz (MDR) kizárás',
    subtitle:
      'Idősgondozási, SOS vészjelző és gyógyszeremlékeztető funkciók miatt a legfontosabb védelmi bástya az egyéni vállalkozó korlátlan felelőssége mellett.',
    icon: 'liability',
    items: [
      {
        id: 'liab-1',
        title: 'EU MDR (2017/745) orvostechnikai eszköz és 24/7 segélyhívó (112 / Hausnotruf) kizárása',
        detail:
          'A Privacy Policy 9. pontjában már szerepel, de az ÁSZF-ben szerződéses feltételként is rögzíteni kell: a SENEAR kommunikációs és napi rutin segédalkalmazás, NEM orvostechnikai eszköz, nem végez diagnózist, és NEM helyettesíti a 112-es segélyhívót, az orvosi felügyeletet vagy a minősített német/osztrák „Hausnotruf” távfelügyeletet.',
        tag: 'Életvédelmi fókusz',
        tagTone: 'critical',
      },
      {
        id: 'liab-2',
        title: 'Szolgáltatás tárgyának pontos definiálása (Ptk. 6:152. § & német BGB § 309 Nr. 7)',
        detail:
          'Mivel sem a magyar Ptk., sem a német jog nem engedi kizárni az életet, testi épséget vagy egészséget megkárosító szerződésszegésért való felelősséget, az ügyvéddel úgy kell meghatározni a szolgáltatás szerződéses tárgyát, hogy a SENEAR kötelezettsége kizárólag a szoftveres értesítési kísérlet elindítására terjed ki – amely külső tényezőktől (mobilhálózat, Wi-Fi, GPS vétel, SIM-egyenleg, akkumulátor, illetve Xiaomi/Samsung/Huawei gyártói akkukímélő korlátozások) függ, így vészhelyzet elhárítását a szoftver nem garantálhatja.',
        tag: 'Ügyvédi szövegezés kell',
        tagTone: 'critical',
      },
      {
        id: 'liab-3',
        title: 'Egyéni vállalkozó korlátlan vagyoni felelőssége vs. szakmai felelősségbiztosítás / Kft.',
        detail:
          'Mivel az egyéni vállalkozó teljes magánvagyonával felel, érdemes megkérdezni az ügyvédet: 1) mikortól indokolt egyszemélyes Kft.-re váltani a korlátolt felelősség miatt, illetve 2) addig is érdemes-e IT / szoftverfejlesztői szakmai felelősségbiztosítást kötni?',
        tag: 'Vagyonvédelem',
        tagTone: 'important',
      },
      {
        id: 'liab-4',
        title: 'Családtag (Gondozó) jognyilatkozata és visszaélésszerű megfigyelés tilalma',
        detail:
          'A Gondozó szerződésben vállalja, hogy az Idős kifejezett tudtával és hozzájárulásával (vagy hivatalos gondnokaként / törvényes képviselőjeként) párosítja a telefont. Jogellenes vagy titkos nyomkövetésért a teljes jogi felelősség a Gondozót terheli.',
      },
    ],
  },
  {
    id: 'gdpr-audit',
    number: '6',
    title: 'Meglévő SENEAR GDPR tájékoztató (/privacy) validálása és belső iratok',
    subtitle:
      'A weboldalon már élő, részletes 3 nyelvű adatkezelési tájékoztató szakmai átnézése és a NAIH által kért háttérdokumentumok.',
    icon: 'gdpr',
    items: [
      {
        id: 'gdpr-1',
        title: 'GDPR 9. cikk (egészségügyi vonatkozás) és kétoldalú hozzájárulási kapu ellenőrzése',
        detail:
          'A SENEAR-ban mindkét féltől kifejezett hozzájárulást kérünk (Senior oldalon „Elfogadom” gomb fedi fel a 6 jegyű kódot, Gondozó oldalon jognyilatkozat pipálása kötelező, UTC időbélyeggel mentve). Megfelelő-e a jelenlegi /privacy szövegezés (kifejezett hozzájárulás – 6(1)(a) & 9(2)(a), szerződés teljesítése – 6(1)(b), létfontosságú érdek SOS-nél – 6(1)(d) & 9(2)(c))? Mi a helyes eljárás cselekvőképességében korlátozott / demens idős hozzátartozó esetén?',
        tag: 'GDPR 9. cikk',
        tagTone: 'critical',
      },
      {
        id: 'gdpr-2',
        title: 'Kötelező belső dokumentumok elkészítése „fiókba” (DPIA & ROPA)',
        detail:
          'NAIH vizsgálat esetén nem elég a publikus /privacy oldal! Sérülékeny érintettek (idősek, később gyerekek) + GPS helyadat + vészjelzés miatt szükséges-e írásos Adatvédelmi Hatásvizsgálat (DPIA – GDPR 35. cikk), Adatkezelési Tevékenységek Nyilvántartása (ROPA – GDPR 30. cikk) és Érdekmérlegelési Teszt (LIA – a crash logokhoz / hívásszűréshez)? Kell-e DPO, vagy rögzíthető annak mellőzése?',
        tag: 'NAIH megfelelés',
        tagTone: 'important',
      },
      {
        id: 'gdpr-3',
        title: 'Adatfeldolgozók (EU europe-west1 Firebase + FormSubmit.co a weboldalon)',
        detail:
          'Az alkalmazás minden felhőfunkciója 100%-ban az EU-ban (Google Cloud europe-west1 – Belgium) fut. A gabba.bond főoldali kapcsolatfelvételi űrlap viszont jelenleg a FormSubmit.co szolgáltatást használja – érdemes-e ezt kiváltani saját, EU-s Firebase Cloud Function e-mail továbbítóra, hogy a főoldalon se legyen EU-n kívüli adatfeldolgozó?',
      },
    ],
  },
  {
    id: 'junear',
    number: '7',
    title: 'JUNEAR (gyermekvédelmi app) és jövőbeli termékek előkészítése',
    subtitle:
      'Kiskorúak személyes adatainak kezelésére vonatkozó szigorúbb EU-s és Google Play előírások.',
    icon: 'junear',
    items: [
      {
        id: 'jun-1',
        title: 'GDPR 8. cikk és eltérő nemzeti korhatárok (HU/DE: 16 év, AT: 14 év)',
        detail:
          'Gyermekeknek szánt alkalmazásnál hogyan kell jogszerűen dokumentálni a szülői felügyelet gyakorlójának hozzájárulását (igazolt szülői hozzájárulás – GDPR 8. cikk), figyelembe véve az eltérő EU-tagállami korhatárokat?',
        tag: 'Gyermekvédelem',
        tagTone: 'important',
      },
      {
        id: 'jun-2',
        title: 'Külön /junear/privacy és /junear/terms dokumentumok előkészítése',
        detail:
          'A Google Play Families Policy megköveteli a gyermekekre szabott, világos adatvédelmi tájékoztatót és a hirdetési azonosítók / viselkedésalapú követés teljes tilalmát (a kétszintű weboldal-architektúra ezt tisztán kiszolgálja).',
      },
    ],
  },
  {
    id: 'impresszum-ip',
    number: '8',
    title: 'Impresszum, Közösségi Média és Védjegyoltalom',
    subtitle:
      'Magyar Ekertv. 4. §, német/osztrák Impressumspflicht és a márkanevek védelme.',
    icon: 'ip',
    items: [
      {
        id: 'ip-1',
        title: 'Kötelező Impresszum tartalom (Magyarország + DACH piac)',
        detail:
          'A láblécbe kerülő /impressum oldal kötelező elemei az EV indulásakor: teljes név („Bányai Gábor e.v.”), székhely (9400 Sopron, Ravazd utca 46.), EV nyilvántartási szám, nyilvántartó hatóság, adószám + EU közösségi adószám, kamarai tagság (MKIK / Győr-Moson-Sopron Vármegyei KIK), e-mail, telefonszám, valamint a tárhelyszolgáltató adatai (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Írország). Kell-e még bármi a német DDG § 5 miatt?',
        tag: 'Impresszum',
        tagTone: 'important',
      },
      {
        id: 'ip-2',
        title: 'Facebook oldal és Facebook Közösség (GDPR 26. cikk közös adatkezelés)',
        detail:
          'A weboldal láblécéből nyílik a SENEAR hivatalos Facebook-oldala és közösségi csoportja (HU/EN/DE). Szükséges-e az általános adatkezelési tájékoztatóba felvenni a Meta Platforms Ireland Ltd.-vel fennálló közös adatkezelési klauzulát (Page Insights)?',
      },
      {
        id: 'ip-3',
        title: 'Márkanév- és védjegyvédelem (gabba, SENEAR, JUNEAR)',
        detail:
          'Érdemes-e védjegykutatást és SZTNH (magyar) vagy EUIPO (európai uniós – az EU SME Fund keretében 75%-os díjvisszatérítéssel!) szóvédjegy-bejelentést indítani a SENEAR és JUNEAR nevekre a nemzetközi terjeszkedés előtt?',
        tag: 'Szellemi tulajdon',
        tagTone: 'info',
      },
    ],
  },
];

function SectionIcon({ kind }: { kind: BriefSection['icon'] }) {
  switch (kind) {
    case 'context':
      return <FileText className="w-5 h-5" />;
    case 'ev':
      return <Building2 className="w-5 h-5" />;
    case 'arch':
      return <Layers className="w-5 h-5" />;
    case 'aszf':
      return <Scale className="w-5 h-5" />;
    case 'liability':
      return <ShieldAlert className="w-5 h-5" />;
    case 'gdpr':
      return <Lock className="w-5 h-5" />;
    case 'junear':
      return <Baby className="w-5 h-5" />;
    case 'ip':
      return <Award className="w-5 h-5" />;
  }
}

function TagBadge({ label, tone = 'info' }: { label: string; tone?: BriefItem['tagTone'] }) {
  const styles =
    tone === 'critical'
      ? 'bg-red-50 text-red-800 border-red-200'
      : tone === 'important'
      ? 'bg-amber-50 text-amber-900 border-amber-200'
      : 'bg-emerald-50 text-emerald-800 border-emerald-200';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${styles}`}>
      {label}
    </span>
  );
}

export function LegalBriefPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const raw = window.localStorage.getItem(STORAGE_CHECKS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const [notes, setNotes] = useState<Record<string, string>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const raw = window.localStorage.getItem(STORAGE_NOTES_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  // Prevent search engine indexing of this working consultation brief
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  const toggleItem = (id: string) => {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        window.localStorage.setItem(STORAGE_CHECKS_KEY, JSON.stringify(next));
      } catch {
        // ignore storage quota errors
      }
      return next;
    });
  };

  const updateNote = (sectionId: string, value: string) => {
    setNotes((prev) => {
      const next = { ...prev, [sectionId]: value };
      try {
        window.localStorage.setItem(STORAGE_NOTES_KEY, JSON.stringify(next));
      } catch {
        // ignore storage quota errors
      }
      return next;
    });
  };

  const resetAll = () => {
    if (!window.confirm('Biztosan törlöd az összes pipát és helyi jegyzetet erről az eszközről?')) return;
    setChecked({});
    setNotes({});
    try {
      window.localStorage.removeItem(STORAGE_CHECKS_KEY);
      window.localStorage.removeItem(STORAGE_NOTES_KEY);
    } catch {
      // ignore
    }
  };

  const totalItems = BRIEF_SECTIONS.reduce((sum, s) => sum + s.items.length, 0);
  const completedItems = BRIEF_SECTIONS.reduce(
    (sum, s) => sum + s.items.filter((i) => checked[i.id]).length,
    0
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#2C2C2C] print:bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 print:py-2 print:px-0 print:space-y-5">
        {/* Top Control Bar (hidden on print) */}
        <div className="print:hidden flex flex-wrap items-center justify-between gap-3 bg-white rounded-2xl p-4 border border-[#E8DFD4] shadow-2xs">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#5C5A56]">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B7A4E] text-white font-bold">
              <CheckSquare className="w-3.5 h-3.5 shrink-0" />
              <span>
                {completedItems} / {totalItems} pont átbeszélve
              </span>
            </span>
            <span className="text-[#6E6B65]">
              A pipák és jegyzetek automatikusan mentődnek ezen a böngészőn.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2C2C2C] text-white text-xs font-bold hover:bg-[#1F2421] transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
              <span>Nyomtatás / PDF mentés</span>
            </button>
            <button
              type="button"
              onClick={resetAll}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FAF8F5] text-[#5C5A56] border border-[#E8DFD4] text-xs font-semibold hover:text-[#2C2C2C] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 shrink-0" />
              <span>Alaphelyzet</span>
            </button>
          </div>
        </div>

        {/* Document Header */}
        <header className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD4] shadow-2xs space-y-4 print:border-b print:rounded-none print:p-0 print:pb-4 print:shadow-none">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#7A5F43]">
            <span>Ügyvédi Egyeztetési Kivonat</span>
            <span>·</span>
            <span>gabba.bond &amp; NEAR Ökoszisztéma (SENEAR / JUNEAR)</span>
          </div>

          <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-[#2C2C2C] tracking-tight">
            Jogi, Adatvédelmi és Vállalkozási Egyeztetési Segédlet
          </h1>

          <p className="text-sm sm:text-base text-[#5C5A56] leading-relaxed max-w-4xl">
            Strukturált napirend az egyéni vállalkozás elindításához, a többtermékes weboldal-architektúra
            (ernyőoldal + termékaloldalak) kialakításához, a 3 nyelvű ÁSZF megalkotásához és a meglévő GDPR
            dokumentáció validálásához.
          </p>

          {/* Live Reference Links for the Meeting */}
          <div className="pt-2 flex flex-wrap items-center gap-2 print:hidden">
            <span className="text-xs font-bold text-[#2C2C2C] mr-1">Jelenleg éles oldalak megnyitása:</span>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-[#E8DFD4] text-xs font-semibold text-[#2C2C2C] hover:border-[#8C7355]"
            >
              <span>gabba.bond (Főoldal)</span>
              <ExternalLink className="w-3 h-3 text-[#8C7355]" />
            </a>
            <a
              href="/senear?lang=hu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-[#E8DFD4] text-xs font-semibold text-[#2C2C2C] hover:border-[#8C7355]"
            >
              <span>/senear (Termékoldal)</span>
              <ExternalLink className="w-3 h-3 text-[#8C7355]" />
            </a>
            <a
              href="/privacy?lang=hu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-[#E8DFD4] text-xs font-semibold text-[#2C2C2C] hover:border-[#8C7355]"
            >
              <span>/privacy (Jelenlegi GDPR)</span>
              <ExternalLink className="w-3 h-3 text-[#8C7355]" />
            </a>
            <a
              href="/delete-account?lang=hu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-[#E8DFD4] text-xs font-semibold text-[#2C2C2C] hover:border-[#8C7355]"
            >
              <span>/delete-account (Adattörlés)</span>
              <ExternalLink className="w-3 h-3 text-[#8C7355]" />
            </a>
          </div>
        </header>

        {/* Visual 2-Layer Legal Architecture Blueprint */}
        <section className="bg-gradient-to-br from-[#2C2C2C] to-[#1F2421] text-white rounded-3xl p-6 sm:p-8 border border-[#C5A880]/40 space-y-5 print:bg-white print:text-[#2C2C2C] print:border print:border-gray-300 print:p-4">
          <div className="flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-[#C5A880] print:text-[#2C2C2C] shrink-0" />
            <h2 className="font-heading text-lg sm:text-xl font-bold">
              Javasolt Kétszintű Jogi Architektúra (Ernyőoldal + Termékspecifikus Aloldalak)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="rounded-2xl bg-white/10 print:bg-gray-50 p-4 border border-white/15 print:border-gray-300 space-y-2">
              <div className="font-bold text-[#E8D5B0] print:text-[#2C2C2C] uppercase tracking-wider text-xs">
                1. Szint — Központi (gabba.bond főoldal)
              </div>
              <p className="text-stone-200 print:text-[#5C5A56] leading-relaxed">
                Minden termékre és a vállalkozásra közösen érvényes alapdokumentumok (HU / EN / DE):
              </p>
              <ul className="space-y-1.5 text-stone-100 print:text-[#2C2C2C]">
                <li className="flex items-start gap-1.5">
                  <ChevronRight className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <span>
                    <strong>/impressum</strong> — EV adatok, székhely, adószám, kamara, Firebase tárhely
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <ChevronRight className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <span>
                    <strong>/privacy</strong> — Weboldal GDPR (kapcsolati űrlap) + termékválasztó linkek
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <ChevronRight className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <span>
                    <strong>/terms</strong> — Általános Keret-ÁSZF (vagy központi ÁSZF-választó)
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white/10 print:bg-gray-50 p-4 border border-white/15 print:border-gray-300 space-y-2">
              <div className="font-bold text-emerald-300 print:text-[#1B7A4E] uppercase tracking-wider text-xs">
                2. Szint — Termékspecifikus Aloldalak (skálázható sablon)
              </div>
              <p className="text-stone-200 print:text-[#5C5A56] leading-relaxed">
                Minden alkalmazás saját, izolált jogi csomagot kap (Google Play Console-ba is ez kerül):
              </p>
              <ul className="space-y-1.5 text-stone-100 print:text-[#2C2C2C]">
                <li className="flex items-start gap-1.5">
                  <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>/senear/privacy</strong> · <strong>/senear/terms</strong> ·{' '}
                    <strong>/senear/delete-account</strong>
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>/junear/privacy</strong> · <strong>/junear/terms</strong> ·{' '}
                    <strong>/junear/delete-account</strong>
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>/&lt;uj-termek&gt;/privacy</strong> · <strong>/&lt;uj-termek&gt;/terms</strong> (bármikor
                    bővíthető)
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Checklist Sections */}
        <div className="space-y-6 print:space-y-5">
          {BRIEF_SECTIONS.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD4] shadow-2xs space-y-5 print:rounded-xl print:p-4 print:shadow-none print:break-inside-avoid-page"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#F5F0EB] text-[#7A5F43] flex items-center justify-center shrink-0 mt-0.5 print:border print:border-gray-300">
                  <SectionIcon kind={section.icon} />
                </div>
                <div className="space-y-1">
                  <h2 className="font-heading text-lg sm:text-2xl font-bold text-[#2C2C2C]">
                    {section.number}. {section.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5C5A56] leading-relaxed">{section.subtitle}</p>
                </div>
              </div>

              <ul className="space-y-3">
                {section.items.map((item) => {
                  const isDone = Boolean(checked[item.id]);
                  return (
                    <li
                      key={item.id}
                      className={`rounded-2xl p-4 border transition-colors ${
                        isDone
                          ? 'bg-emerald-50/50 border-emerald-300/80'
                          : 'bg-[#FAF8F5] border-[#E8DFD4]'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleItem(item.id)}
                        className="w-full text-left flex items-start gap-3 cursor-pointer"
                      >
                        {isDone ? (
                          <CheckSquare className="w-5 h-5 text-[#1B7A4E] shrink-0 mt-0.5" />
                        ) : (
                          <Square className="w-5 h-5 text-[#8C7355] shrink-0 mt-0.5" />
                        )}
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`text-sm sm:text-base font-bold ${
                                isDone ? 'line-through text-[#5C5A56]' : 'text-[#2C2C2C]'
                              }`}
                            >
                              {item.title}
                            </span>
                            {item.tag && <TagBadge label={item.tag} tone={item.tagTone} />}
                          </div>
                          <p className="text-xs sm:text-sm text-[#5C5A56] leading-relaxed whitespace-pre-line">
                            {item.detail}
                          </p>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Per-section lawyer notes (persisted strictly in local browser storage) */}
              <div className={`pt-1 ${notes[section.id] ? '' : 'print:hidden'}`}>
                <label
                  htmlFor={`note-${section.id}`}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#7A5F43] mb-1.5"
                >
                  <StickyNote className="w-3.5 h-3.5 shrink-0" />
                  <span>Jegyzet / Ügyvéd válasza ehhez a blokkhoz:</span>
                </label>
                <textarea
                  id={`note-${section.id}`}
                  rows={2}
                  value={notes[section.id] || ''}
                  onChange={(e) => updateNote(section.id, e.target.value)}
                  placeholder="Ide írhatod az ügyvéddel megbeszélt döntést (csak ezen a gépen/böngészőben tárolódik)..."
                  className="w-full rounded-xl border border-[#E8DFD4] bg-white px-3.5 py-2 text-xs sm:text-sm text-[#2C2C2C] placeholder:text-[#8C8881] focus:outline-2 focus:outline-[#1B7A4E]"
                />
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LegalBriefPage;
