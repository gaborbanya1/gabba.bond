import type { MouseEvent } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Building2,
  Check,
  Clock,
  Compass,
  Globe2,
  HeartHandshake,
  Layers,
  Lock,
  Mail,
  MapPin,
  Server,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { AppRoute, buildRouteHref } from '../routing';
import { FOCUS_RING } from './senear/hooks';
import { PLAY_STORE_URL } from './senear/senearContent';
import { GooglePlayIcon } from './GooglePlayIcon';

export const ECOGONG_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.gaborbanya1.ecogong';
export const STUDIO_CONTACT_EMAIL = 'info@gabba.bond';

type HubLang = 'hu' | 'de' | 'en';

interface UpcomingCardCopy {
  id: string;
  badge: string;
  name: string;
  tagline: string;
  description: string;
  bullets: string[];
  ctaLabel: string;
  route?: AppRoute;
  href?: string;
  logoSrc?: string;
}

interface HubCopy {
  kicker: string;
  heroTitle1: string;
  heroTitleHighlight: string;
  heroLead: string;
  primaryCta: string;
  secondaryCta: string;
  impressumCta: string;
  pillars: { title: string; desc: string }[];
  showcaseBadge: string;
  showcaseCaption: string;
  portfolioEyebrow: string;
  portfolioTitle: string;
  portfolioSubtitle: string;
  senear: {
    badge: string;
    name: string;
    subtitle: string;
    description: string;
    bullets: string[];
    primaryBtn: string;
    setupBtn: string;
    playBtn: string;
    legalHeading: string;
    privacyLabel: string;
    termsLabel: string;
    opsLabel: string;
  };
  ecogong: {
    badge: string;
    name: string;
    subtitle: string;
    description: string;
    bullets: string[];
    playBtn: string;
  };
  upcoming: UpcomingCardCopy[];
  impressum: {
    eyebrow: string;
    title: string;
    subtitle: string;
    operatorLabel: string;
    operatorValue: string;
    hqLabel: string;
    hqValue: string;
    emailLabel: string;
    hostingLabel: string;
    hostingValue: string;
    complianceTitle: string;
    complianceBody: string;
    emailCta: string;
  };
}

const HUB_COPY: Record<HubLang, HubCopy> = {
  hu: {
    kicker: 'GABBA BOND · EURÓPAI SZOFTVER- ÉS TERMÉKSTÚDIÓ',
    heroTitle1: 'Akadálymentes, megbízható digitális termékek',
    heroTitleHighlight: 'családoknak, időseknek és a mindennapokra.',
    heroLead:
      'A Gabba Bond az Európai Unióban tervezett, reklámmentes és adatvédelem-központú (Privacy by Design) alkalmazásokat épít – átlátható, termékspecifikus működéssel és valódi emberi fókusszal.',
    primaryCta: 'Termékportfólió megtekintése',
    secondaryCta: 'SENEAR termékoldal',
    impressumCta: 'Impresszum és kapcsolat',
    pillars: [
      {
        title: '100% EU-s fejlesztés és adattárolás',
        desc: 'Magyarországi központ, európai felhőinfrastruktúra (europe-west1, Belgium).',
      },
      {
        title: 'Akadálymentes és hibatűrő UX',
        desc: 'WCAG 2.1 AA kontraszt, tiszta felületek időseknek, családoknak és gyakorlóknak.',
      },
      {
        title: 'Reklámmentes működés',
        desc: 'Zéró hirdetési SDK, zéró viselkedésalapú követés vagy adatértékesítés.',
      },
    ],
    showcaseBadge: 'Zászlóshajó ökoszisztéma · SENEAR',
    showcaseCaption: 'Dedikált termék-aloldalak önálló útmutatóval és 3 pilléres jogi dokumentációval.',
    portfolioEyebrow: 'TERMÉKPORTFÓLIÓ · UMBRELLA ARCHITEKTÚRA',
    portfolioTitle: 'Megjelent és készülő alkalmazásaink',
    portfolioSubtitle:
      'Minden Gabba Bond termék önálló funkcionalitással és dedikált dokumentációval épül be a közös európai stúdió-keretrendszerbe.',
    senear: {
      badge: 'Kiemelt zászlóshajó · Android & Családi Gondoskodás',
      name: 'SENEAR',
      subtitle: 'Idősbarát okostelefon-kezelőfelület és távoli családi felügyeleti ökoszisztéma',
      description:
        'Meglévő Android 8.0+ telefont alakít át egyszerű, zárolt, nagy fotós kezdőképernyővé az idős szülőnek, miközben a családtag távolról látja az akkumulátort és a helyzetet, beállítja a hívógombokat és a gyógyszeremlékeztetőket.',
      bullets: [
        'Zárolt, elállíthatatlan kezdőképernyő nagy fotós hívógombokkal és ismeretlen/csaló hívások néma blokkolásával',
        'Dedikált SOS gomb automatikus GPS-koordinátás SMS-sel és azonnali családi értesítéssel',
        'Távoli névjegy-, hangerő- és napi rutin / gyógyszeremlékeztető kezelés Wi-Fi hang- és videóhívással',
        'Az idős telefonján örökké ingyenes · a családi összekötés 14 napig ingyen kipróbálható',
      ],
      primaryBtn: 'SENEAR termékoldal megnyitása',
      setupBtn: 'Lépésről lépésre útmutató',
      playBtn: 'Google Play adatlap',
      legalHeading: 'SENEAR jogi dokumentumok:',
      privacyLabel: 'GDPR Adatvédelmi Tájékoztató',
      termsLabel: 'Általános Szerződési Feltételek (ÁSZF)',
      opsLabel: 'Működési és Adatkezelési Szabályzat',
    },
    ecogong: {
      badge: 'Elérhető a Google Playen · Meditáció és Fókusz',
      name: 'EcoGong',
      subtitle: 'Minimalista meditációs visszaszámláló és leborulás-számláló',
      description:
        'Letisztult, zavaró tényezőktől mentes gyakorlótárs elmélyüléshez, légzőgyakorlatokhoz és leborulások számlálásához – természetes hangtál- és gongjelzésekkel, 100%-ban offline működéssel.',
      bullets: [
        'Akusztikus hangtál- és gong-intervallumok finom vizuális visszaszámlálóval',
        'Érintésalapú leborulás- és ismétlésszámláló napi gyakorláshoz',
        '100% offline, fiókregisztráció, hirdetések és adatgyűjtés nélkül',
      ],
      playBtn: 'Megnyitás a Google Playen',
    },
    upcoming: [
      {
        id: 'junear',
        badge: 'Fejlesztés alatt · NEAR Családi Ökoszisztéma',
        name: 'JUNEAR',
        tagline: 'Biztonságos első telefon-környezet gyermekeknek',
        description:
          'A SENEAR technológiai alapjaira épülő, figyelemelterelés-mentes Android kezdőképernyő és szülői biztonsági zóna rendszer gyermekek számára.',
        bullets: [
          'Csak a szülő által jóváhagyott hívók és alkalmazások',
          'Iskolai fókuszidő és biztonságos hazaérkezés jelzése',
          'GDPR 8. cikk és Google Play Families szabvány szerinti tervezés',
        ],
        ctaLabel: 'JUNEAR előzetes megtekintése',
        route: 'junear',
        logoSrc: '/logos/junear-logo.png',
      },
      {
        id: 'studio-lab',
        badge: 'Készülő termékek · Skálázható Microsite Keret',
        name: 'Gabba Bond Studio Lab',
        tagline: 'Jövőbeli B2C és B2B célszoftverek',
        description:
          'Új, egyetlen problémát kiválóan megoldó mindennapi és üzleti segédprogramok előkészítés alatt – mindegyik saját gabba.bond/<termék> aloldallal és átlátható adatkezeléssel.',
        bullets: [
          'Moduláris webes és natív Android / PWA architektúra',
          'Egységes 80% stúdió-alap + 20% termékspecifikus jogi keret',
          'Nyitott szakmai együttműködésekre és tesztelői visszajelzésekre',
        ],
        ctaLabel: 'Kapcsolatfelvétel: info@gabba.bond',
        href: `mailto:${STUDIO_CONTACT_EMAIL}`,
      },
    ],
    impressum: {
      eyebrow: 'IMPRESSZUM ÉS ÜZEMELTETŐI ADATOK',
      title: 'Hivatalos stúdió- és kapcsolati adatok',
      subtitle:
        'A gabba.bond ernyőoldalt és a hozzá tartozó digitális termékeket az Európai Unió jogszabályainak megfelelően üzemeltetjük.',
      operatorLabel: 'Üzemeltető / Adatkezelő',
      operatorValue: 'Bányai Gábor',
      hqLabel: 'Székhely és joghatóság',
      hqValue: '9400 Sopron, Ravazd utca 46., Magyarország (Európai Unió)',
      emailLabel: 'Hivatalos e-mail kapcsolat',
      hostingLabel: 'Felhő- és tárhelyszolgáltató',
      hostingValue: 'Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Írország – Firebase Hosting, EU)',
      complianceTitle: 'Átlátható többtermékes jogi felépítés',
      complianceBody:
        'Minden önálló alkalmazásunk dedikált Adatvédelmi Tájékoztatóval (GDPR), Általános Szerződési Feltételekkel (ÁSZF) és Működési Szabályzattal rendelkezik az adott termék saját aloldalán.',
      emailCta: 'Üzenet küldése (info@gabba.bond)',
    },
  },

  de: {
    kicker: 'GABBA BOND · EUROPÄISCHES SOFTWARE- & PRODUKTSTUDIO',
    heroTitle1: 'Barrierefreie, vertrauenswürdige digitale Produkte',
    heroTitleHighlight: 'für Familien, Senioren und den Alltag.',
    heroLead:
      'Gabba Bond entwickelt in der Europäischen Union werbefreie Anwendungen nach dem Prinzip „Privacy by Design“ – mit klarer Alltagstauglichkeit, höchster Zuverlässigkeit und transparenter Dokumentation.',
    primaryCta: 'Produktportfolio entdecken',
    secondaryCta: 'SENEAR Produktseite',
    impressumCta: 'Impressum & Kontakt',
    pillars: [
      {
        title: '100 % EU-Entwicklung & Datenhaltung',
        desc: 'Sitz in Ungarn (EU), Cloud-Infrastruktur strikt in europe-west1 (Belgien).',
      },
      {
        title: 'Barrierefreie, fehlersichere UX',
        desc: 'WCAG 2.1 AA Kontraste und klare Bedienung für Senioren, Familien und Praktizierende.',
      },
      {
        title: 'Garantiert werbefrei',
        desc: 'Keine Werbe-SDKs, kein Verhaltens-Tracking und kein Weiterverkauf von Daten.',
      },
    ],
    showcaseBadge: 'Flaggschiff-Ökosystem · SENEAR',
    showcaseCaption: 'Eigenständige Produkt-Microsites mit Schritt-für-Schritt-Anleitung und 3-teiliger Rechtsdokumentation.',
    portfolioEyebrow: 'PRODUKTPORTFOLIO · UMBRELLA-ARCHITEKTUR',
    portfolioTitle: 'Veröffentlichte & kommende Anwendungen',
    portfolioSubtitle:
      'Jedes Produkt von Gabba Bond besitzt eine klar abgegrenzte Produktseite sowie eigene Datenschutz-, AGB- und Betriebsrichtlinien.',
    senear: {
      badge: 'Flaggschiff-Produkt · Android & Familienfürsorge',
      name: 'SENEAR',
      subtitle: 'Seniorengerechter Smartphone-Launcher & Fernbetreuungs-Ökosystem für Familien',
      description:
        'Verwandelt ein vorhandenes Android-8.0+-Handy in einen gesperrten Startbildschirm mit großen Foto-Anruftasten für Eltern oder Großeltern – während Angehörige Kontakte, Lautstärke und Erinnerungen aus der Ferne verwalten.',
      bullets: [
        'Gesperrter Startbildschirm mit großen Foto-Anruftasten und lautloser Blockierung unbekannter Anrufer',
        'Große rote SOS-Taste mit automatischer GPS-SMS und sofortiger Benachrichtigung der Familie',
        'Fernverwaltung von Kontakten, Lautstärke und Medikamenten-/Tagesroutinen inkl. WLAN-Audio-/Videoanruf',
        'Auf dem Handy der Eltern dauerhaft kostenlos · Familienfunktionen 14 Tage gratis testen',
      ],
      primaryBtn: 'SENEAR Produktseite öffnen',
      setupBtn: 'Schritt-für-Schritt-Anleitung',
      playBtn: 'Bei Google Play ansehen',
      legalHeading: 'SENEAR Rechtsdokumente:',
      privacyLabel: 'DSGVO-Datenschutzerklärung',
      termsLabel: 'Allgemeine Geschäftsbedingungen (AGB)',
      opsLabel: 'Betriebs- & Transparenzrichtlinie',
    },
    ecogong: {
      badge: 'Verfügbar bei Google Play · Meditation & Achtsamkeit',
      name: 'EcoGong',
      subtitle: 'Minimalistischer Meditations-Countdown & Niederwerfungszähler',
      description:
        'Ein ruhiger, ablenkungsfreier Begleiter für Meditation, Atemübungen und Niederwerfungen – mit authentischen Klangschalen- und Gong-Signalen sowie 100 % Offline-Betrieb.',
      bullets: [
        'Natürliche Klangschalen- und Gong-Intervalle mit sanftem Countdown',
        'Taktiler Niederwerfungs- und Wiederholungszähler für die tägliche Praxis',
        '100 % offline, ohne Benutzerkonto, ohne Werbung und ohne Datenerhebung',
      ],
      playBtn: 'Bei Google Play öffnen',
    },
    upcoming: [
      {
        id: 'junear',
        badge: 'In Entwicklung · NEAR Familien-Ökosystem',
        name: 'JUNEAR',
        tagline: 'Sichere erste Smartphone-Umgebung für Kinder',
        description:
          'Ablenkungsfreier Android-Startbildschirm und Sicherheitszonen-Begleiter für Kinder auf Basis der bewährten NEAR-Architektur.',
        bullets: [
          'Nur von den Eltern freigegebene Kontakte und Apps',
          'Schul-Fokuszeiten und sichere Standort-Benachrichtigungen',
          'Konzipiert nach Art. 8 DSGVO und Google Play Families-Richtlinien',
        ],
        ctaLabel: 'JUNEAR Vorschau ansehen',
        route: 'junear',
        logoSrc: '/logos/junear-logo.png',
      },
      {
        id: 'studio-lab',
        badge: 'Kommende Produkte · Modulare Microsite-Plattform',
        name: 'Gabba Bond Studio Lab',
        tagline: 'Künftige barrierefreie B2C- & B2B-Werkzeuge',
        description:
          'Weitere fokussierte Alltags- und Fachanwendungen in Vorbereitung – jeweils unter eigener gabba.bond/<produkt>-Adresse mit klar getrennter Rechtsdokumentation.',
        bullets: [
          'Modulare Web-, PWA- und native Android-Architektur',
          'Einheitliches 80 % Studio-Kernrecht + 20 % Produktspezifik',
          'Offen für Kooperationen und Pilotprojekte',
        ],
        ctaLabel: 'Kontakt: info@gabba.bond',
        href: `mailto:${STUDIO_CONTACT_EMAIL}`,
      },
    ],
    impressum: {
      eyebrow: 'IMPRESSUM & BETREIBERANGABEN',
      title: 'Offizielle Studio- & Kontaktinformationen',
      subtitle:
        'Die Plattform gabba.bond und die zugehörigen Softwareprodukte werden nach den Rechtsvorschriften der Europäischen Union betrieben.',
      operatorLabel: 'Betreiber / Verantwortlicher',
      operatorValue: 'Bányai Gábor',
      hqLabel: 'Sitz & Rechtsordnung',
      hqValue: 'Ravazd utca 46, 9400 Sopron, Ungarn (Europäische Union)',
      emailLabel: 'Offizieller E-Mail-Kontakt',
      hostingLabel: 'Cloud- & Hosting-Dienstleister',
      hostingValue: 'Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Irland – Firebase Hosting, EU)',
      complianceTitle: 'Transparente Mehrprodukt-Rechtsarchitektur',
      complianceBody:
        'Für jedes Softwareprodukt stehen auf der jeweiligen Produkt-Subseite drei klar getrennte Dokumente bereit: Datenschutzerklärung (DSGVO), Allgemeine Geschäftsbedingungen (AGB) und Betriebsrichtlinie.',
      emailCta: 'E-Mail senden (info@gabba.bond)',
    },
  },

  en: {
    kicker: 'GABBA BOND · EUROPEAN SOFTWARE & PRODUCT STUDIO',
    heroTitle1: 'Accessible, high-trust digital products',
    heroTitleHighlight: 'for families, seniors, and everyday life.',
    heroLead:
      'Gabba Bond designs and engineers distraction-free, Privacy-by-Design applications in the European Union—combining tactile simplicity, resilient engineering, and transparent legal architecture.',
    primaryCta: 'Explore Product Portfolio',
    secondaryCta: 'Open SENEAR Microsite',
    impressumCta: 'Impressum & Contact',
    pillars: [
      {
        title: '100% Engineered & Hosted in the EU',
        desc: 'Headquartered in Hungary (EU) with cloud infrastructure pinned to europe-west1 (Belgium).',
      },
      {
        title: 'Accessible, Fail-Safe UX',
        desc: 'WCAG 2.1 AA contrast and calm interfaces crafted for seniors, families, and daily practice.',
      },
      {
        title: 'Zero Ads · Zero Dark Patterns',
        desc: 'No advertising SDKs, no behavioral profiling, and zero personal data monetization.',
      },
    ],
    showcaseBadge: 'Flagship Ecosystem · SENEAR',
    showcaseCaption: 'Dedicated product microsites backed by step-by-step video guides and 3-pillar legal transparency.',
    portfolioEyebrow: 'PRODUCT PORTFOLIO · UMBRELLA ARCHITECTURE',
    portfolioTitle: 'Released & Upcoming Products',
    portfolioSubtitle:
      'Every Gabba Bond product lives in a modular ecosystem—combining shared European security standards with dedicated product microsites.',
    senear: {
      badge: 'Featured Flagship · Android & Family Care',
      name: 'SENEAR',
      subtitle: 'Senior Smartphone Launcher & Remote Family Caregiver Ecosystem',
      description:
        'Turns any existing Android 8.0+ smartphone into a calm, locked home screen with large photo call buttons for older parents—while family members remotely manage contacts, volume, battery alerts, and daily medication reminders.',
      bullets: [
        'Locked, simple home screen with large photo speed-dial tiles and silent unknown/scam call blocking',
        'Dedicated SOS button with automatic GPS SMS and instant family push alerts',
        'Remote contact, ringer volume, and daily routine / medication reminders plus encrypted Wi-Fi audio/video calls',
        'Free forever on the senior’s phone · 14-day free trial for connected family features',
      ],
      primaryBtn: 'Open SENEAR Microsite',
      setupBtn: 'Step-by-step setup guide',
      playBtn: 'View on Google Play',
      legalHeading: 'SENEAR legal documents:',
      privacyLabel: 'GDPR Privacy Notice',
      termsLabel: 'Terms of Service (ToS)',
      opsLabel: 'Operational & Transparency Policy',
    },
    ecogong: {
      badge: 'Released on Google Play · Mindfulness & Practice',
      name: 'EcoGong',
      subtitle: 'Minimalist Meditation Countdown Timer & Prostration Counter',
      description:
        'A calm, distraction-free companion for meditation sessions, breathwork, and prostration counting—featuring resonant singing bowl and gong intervals with 100% offline operation.',
      bullets: [
        'Authentic singing bowl and gong interval cues with a clean visual countdown',
        'Tactile prostration and repetition counter built for daily contemplative practice',
        '100% offline—no account required, zero ads, and zero personal data collection',
      ],
      playBtn: 'Get it on Google Play',
    },
    upcoming: [
      {
        id: 'junear',
        badge: 'In Development · NEAR Family Ecosystem',
        name: 'JUNEAR',
        tagline: 'Safe, Distraction-Free First Phone Environment for Kids',
        description:
          'Built on the proven NEAR architecture to give children a calm Android launcher with parent-approved contacts and safe-zone peace of mind.',
        bullets: [
          'Parent-approved speed-dial contacts and distraction-free screen lock',
          'School focus hours and safe arrival notifications',
          'Engineered around GDPR Art. 8 & Google Play Families standards',
        ],
        ctaLabel: 'Preview JUNEAR Concept',
        route: 'junear',
        logoSrc: '/logos/junear-logo.png',
      },
      {
        id: 'studio-lab',
        badge: 'Upcoming Ecosystem · Plug-In Microsite Ready',
        name: 'Gabba Bond Studio Lab',
        tagline: 'Future Accessible B2C & B2B Digital Tools',
        description:
          'Focused utility and workflow tools currently in R&D—designed so each new product launches cleanly under its own gabba.bond/<product> microsite.',
        bullets: [
          'Modular native Android & Progressive Web App (PWA) stack',
          'Unified 80% studio legal core + 20% product-specific transparency annex',
          'Open for European partnerships, pilot testing, and inquiries',
        ],
        ctaLabel: 'Contact: info@gabba.bond',
        href: `mailto:${STUDIO_CONTACT_EMAIL}`,
      },
    ],
    impressum: {
      eyebrow: 'STUDIO IMPRESSUM & OPERATOR INFORMATION',
      title: 'Official Operator & Contact Details',
      subtitle:
        'gabba.bond and all applications in the Gabba Bond portfolio are engineered and operated in the European Union.',
      operatorLabel: 'Operator / Data Controller',
      operatorValue: 'Bányai Gábor',
      hqLabel: 'Headquarters / Jurisdiction',
      hqValue: 'Ravazd utca 46, 9400 Sopron, Hungary (European Union)',
      emailLabel: 'Official Contact Email',
      hostingLabel: 'Cloud & Web Hosting Provider',
      hostingValue: 'Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Ireland — Firebase Hosting, EU)',
      complianceTitle: 'Modular Multi-Product Legal Transparency',
      complianceBody:
        'Each connected application provides three dedicated legal documents on its microsite: GDPR Privacy Notice, Terms of Service, and Operational & Transparency Policy.',
      emailCta: 'Email Studio (info@gabba.bond)',
    },
  },
};

interface StudioHubPageProps {
  onNavigate: (route: AppRoute) => void;
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
}

export function StudioHubPage({ onNavigate }: StudioHubPageProps) {
  const { language } = useLanguage();
  const lang: HubLang = language === 'hu' || language === 'de' ? language : 'en';
  const c = HUB_COPY[lang];

  const handleSpaLink = (route: AppRoute) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onNavigate(route);
  };

  return (
    <div className="bg-[#FAFAFA] text-[#2C2C2C]">
      {/* ================================================================
          1. STUDIO HERO
         ================================================================ */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-18 sm:pb-24 lg:pt-22 lg:pb-28 bg-gradient-to-b from-[#FAFAFA] via-[#F8F5F0] to-[#F3EDE3] border-b border-[#C5A880]/25">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(#2C2C2C 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#C5A880]/20 blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 -left-40 w-80 h-80 rounded-full bg-[#1B7A4E]/10 blur-3xl pointer-events-none"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Column: Studio Mission */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#C5A880]/45 shadow-2xs">
                <Globe2 aria-hidden="true" className="w-3.5 h-3.5 text-[#1B7A4E] shrink-0" />
                <span className="text-xs font-extrabold tracking-wider uppercase text-[#5E4521]">
                  {c.kicker}
                </span>
              </div>

              <h1 className="font-heading text-3xl sm:text-5xl lg:text-[3.35rem] font-extrabold tracking-tight text-[#1F2421] leading-[1.1] text-balance">
                {c.heroTitle1}{' '}
                <span className="text-[#1B7A4E]">{c.heroTitleHighlight}</span>
              </h1>

              <p className="text-base sm:text-lg text-[#4A4744] leading-relaxed max-w-2xl">
                {c.heroLead}
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => scrollToSection('portfolio')}
                  className={`inline-flex min-h-12 items-center justify-center gap-2.5 px-6 py-3 rounded-2xl bg-[#1F2421] text-white text-sm sm:text-base font-bold hover:bg-[#111513] transition-all shadow-sm cursor-pointer ${FOCUS_RING}`}
                >
                  <span>{c.primaryCta}</span>
                  <ArrowRight aria-hidden="true" className="w-4 h-4 text-[#C5A880] shrink-0" />
                </button>

                <a
                  href={buildRouteHref('senear', lang)}
                  onClick={handleSpaLink('senear')}
                  className={`inline-flex min-h-12 items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#1B7A4E] text-white text-sm sm:text-base font-bold hover:bg-[#145E3B] transition-all shadow-sm ${FOCUS_RING}`}
                >
                  <span>{c.secondaryCta}</span>
                  <ArrowRight aria-hidden="true" className="w-4 h-4 shrink-0" />
                </a>

                <button
                  type="button"
                  onClick={() => scrollToSection('impressum')}
                  className={`inline-flex min-h-12 items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-[#2C2C2C] border border-[#9A7B4F] text-sm sm:text-base font-semibold hover:bg-[#F5F0EB] transition-colors cursor-pointer ${FOCUS_RING}`}
                >
                  <span>{c.impressumCta}</span>
                </button>
              </div>

              {/* 3 Studio Trust Pillars */}
              <div className="pt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#C5A880]/30">
                {c.pillars.map((p) => (
                  <div key={p.title} className="space-y-1">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1F2421]">
                      <ShieldCheck aria-hidden="true" className="w-4 h-4 text-[#1B7A4E] shrink-0" />
                      <span>{p.title}</span>
                    </div>
                    <p className="text-xs text-[#5C5A56] leading-relaxed pl-6">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Studio Ecosystem Snapshot Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-[2rem] bg-white p-6 sm:p-7 border border-[#E2D8C8] shadow-[0_24px_50px_-24px_rgba(31,36,33,0.22)] space-y-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF5EE] text-[#14593A] text-xs font-extrabold">
                    <Sparkles aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                    <span>{c.showcaseBadge}</span>
                  </span>
                  <span className="text-xs font-bold text-[#7A5F43]">EU · GDPR</span>
                </div>

                <div className="grid grid-cols-12 gap-4 items-center bg-[#FAF7F2] rounded-2xl p-4 border border-[#EDE4D8]">
                  <div className="col-span-5 flex justify-center">
                    <img
                      src={`/screenshots/senear/hero-${lang}.webp`}
                      alt="SENEAR"
                      width={220}
                      height={440}
                      className="w-28 sm:w-32 rounded-2xl shadow-md ring-2 ring-[#1F2421]"
                    />
                  </div>
                  <div className="col-span-7 space-y-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src="/logos/senear-logo.png"
                        alt="SENEAR logo"
                        className="w-9 h-9 object-contain shrink-0"
                      />
                      <div>
                        <div className="font-heading text-lg font-extrabold text-[#1F2421] leading-none">
                          SENEAR
                        </div>
                        <div className="text-xs font-semibold text-[#7A5F43] mt-0.5">
                          Android 8.0+ · Family Care
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-[#4A4744] leading-relaxed">
                      {c.showcaseCaption}
                    </p>
                    <a
                      href={buildRouteHref('senear', lang)}
                      onClick={handleSpaLink('senear')}
                      className={`inline-flex min-h-10 items-center gap-1.5 text-xs font-extrabold text-[#14593A] underline underline-offset-4 hover:text-[#1B7A4E] ${FOCUS_RING}`}
                    >
                      <span>gabba.bond/senear</span>
                      <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Secondary Released App Mini-Strip: EcoGong */}
                <a
                  href={ECOGONG_PLAY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between gap-3 rounded-2xl bg-[#FAF7F2] px-4 py-3 border border-[#EDE4D8] hover:border-[#9A7B4F] transition-colors ${FOCUS_RING}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src="/logos/ecogong-logo.webp"
                      alt="EcoGong"
                      className="w-10 h-10 rounded-xl object-contain bg-white border border-[#E8DFD4] p-1 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-extrabold text-[#1F2421] truncate">EcoGong</div>
                      <div className="text-xs text-[#5C5A56] truncate">{c.ecogong.subtitle}</div>
                    </div>
                  </div>
                  <ArrowUpRight aria-hidden="true" className="w-4 h-4 text-[#7A5F43] shrink-0" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          2. PRODUCT PORTFOLIO GRID (#portfolio)
         ================================================================ */}
      <section id="portfolio" className="scroll-mt-24 py-18 sm:py-24 lg:py-28 border-b border-[#E8DFD4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-[#7A5F43]">
              <Layers aria-hidden="true" className="w-3.5 h-3.5 text-[#1B7A4E]" />
              <span>{c.portfolioEyebrow}</span>
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#1F2421] tracking-tight">
              {c.portfolioTitle}
            </h2>
            <p className="text-base sm:text-lg text-[#5C5A56] leading-relaxed">
              {c.portfolioSubtitle}
            </p>
          </div>

          {/* 2A. FEATURED FLAGSHIP CARD: SENEAR */}
          <article className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-white via-[#FAF7F2] to-[#F2ECE1] border-2 border-[#1B7A4E] p-6 sm:p-10 shadow-[0_22px_50px_-28px_rgba(27,122,78,0.35)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              <div className="lg:col-span-8 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1B7A4E] text-white text-xs font-extrabold">
                    <HeartHandshake aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                    <span>{c.senear.badge}</span>
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src="/logos/senear-logo.png"
                    alt="SENEAR logo"
                    className="w-14 h-14 sm:w-16 sm:h-16 object-contain shrink-0"
                  />
                  <div>
                    <h3 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#1F2421] tracking-tight">
                      {c.senear.name}
                    </h3>
                    <p className="text-sm sm:text-base font-bold text-[#14593A] mt-0.5">
                      {c.senear.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#3F3C38] leading-relaxed max-w-3xl">
                  {c.senear.description}
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {c.senear.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 rounded-2xl bg-white/85 p-3.5 border border-[#E5DCCE] text-xs sm:text-sm font-medium text-[#1F2421]"
                    >
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-[#1B7A4E] text-white flex items-center justify-center shrink-0">
                        <Check aria-hidden="true" className="w-3 h-3" strokeWidth={3} />
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Primary & Secondary SENEAR Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href={buildRouteHref('senear', lang)}
                    onClick={handleSpaLink('senear')}
                    className={`inline-flex min-h-12 items-center justify-center gap-2.5 px-6 py-3 rounded-2xl bg-[#1B7A4E] text-white text-sm sm:text-base font-bold hover:bg-[#145E3B] transition-colors shadow-sm ${FOCUS_RING}`}
                  >
                    <span>{c.senear.primaryBtn}</span>
                    <ArrowRight aria-hidden="true" className="w-4 h-4 shrink-0" />
                  </a>

                  <a
                    href={buildRouteHref('senear-setup', lang)}
                    onClick={handleSpaLink('senear-setup')}
                    className={`inline-flex min-h-12 items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-[#1F2421] border-2 border-[#529172] text-sm font-bold hover:border-[#1B7A4E] hover:bg-[#F1F8F3] transition-colors ${FOCUS_RING}`}
                  >
                    <BookOpen aria-hidden="true" className="w-4 h-4 text-[#1B7A4E] shrink-0" />
                    <span>{c.senear.setupBtn}</span>
                  </a>

                  <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex min-h-12 items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white text-[#2C2C2C] border border-[#9A7B4F] text-sm font-semibold hover:bg-[#F5F0EB] transition-colors ${FOCUS_RING}`}
                  >
                    <GooglePlayIcon className="w-4 h-4 shrink-0" />
                    <span>{c.senear.playBtn}</span>
                  </a>
                </div>

                {/* Direct Links to SENEAR's 3 Modular Legal Documents */}
                <div className="pt-3 border-t border-[#E2D8C8] flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                  <span className="font-bold text-[#5C5A56]">{c.senear.legalHeading}</span>
                  <a
                    href={buildRouteHref('senear-privacy', lang)}
                    onClick={handleSpaLink('senear-privacy')}
                    className={`inline-flex min-h-9 items-center font-semibold text-[#14593A] underline underline-offset-4 hover:text-[#1B7A4E] ${FOCUS_RING}`}
                  >
                    {c.senear.privacyLabel}
                  </a>
                  <span aria-hidden="true" className="text-[#C5A880]">·</span>
                  <a
                    href={buildRouteHref('senear-terms', lang)}
                    onClick={handleSpaLink('senear-terms')}
                    className={`inline-flex min-h-9 items-center font-semibold text-[#14593A] underline underline-offset-4 hover:text-[#1B7A4E] ${FOCUS_RING}`}
                  >
                    {c.senear.termsLabel}
                  </a>
                  <span aria-hidden="true" className="text-[#C5A880]">·</span>
                  <a
                    href={buildRouteHref('senear-operations', lang)}
                    onClick={handleSpaLink('senear-operations')}
                    className={`inline-flex min-h-9 items-center font-semibold text-[#14593A] underline underline-offset-4 hover:text-[#1B7A4E] ${FOCUS_RING}`}
                  >
                    {c.senear.opsLabel}
                  </a>
                </div>
              </div>

              {/* Right Preview Phone */}
              <div className="lg:col-span-4 flex justify-center">
                <a
                  href={buildRouteHref('senear', lang)}
                  onClick={handleSpaLink('senear')}
                  aria-label={c.senear.primaryBtn}
                  className={`group block rounded-[2.2rem] p-2 transition-transform duration-300 hover:-translate-y-1.5 ${FOCUS_RING}`}
                >
                  <img
                    src={`/screenshots/senear/hero-${lang}.webp`}
                    alt="SENEAR"
                    width={280}
                    height={560}
                    loading="lazy"
                    className="w-56 sm:w-64 rounded-[2rem] shadow-2xl ring-4 ring-[#1F2421]"
                  />
                </a>
              </div>
            </div>
          </article>

          {/* 2B. ECOSYSTEM GRID: ECOGONG (RELEASED) + UPCOMING PRODUCTS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {/* Released App Card: EcoGong */}
            <article
              id="ecogong"
              className="scroll-mt-28 flex flex-col justify-between rounded-3xl bg-white p-6 sm:p-7 border-2 border-[#7A8F6B] shadow-xs space-y-6"
            >
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF5EB] text-[#2F4F28] text-xs font-extrabold border border-[#C8D9BD]">
                  <Clock aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                  <span>{c.ecogong.badge}</span>
                </span>

                <div className="flex items-center gap-3.5">
                  <img
                    src="/logos/ecogong-logo.webp"
                    alt="EcoGong logo"
                    loading="lazy"
                    className="w-13 h-13 rounded-2xl object-contain bg-[#FAF7F2] border border-[#E8DFD4] p-1.5 shrink-0"
                  />
                  <div>
                    <h3 className="font-heading text-2xl font-extrabold text-[#1F2421]">
                      {c.ecogong.name}
                    </h3>
                    <p className="text-xs font-bold text-[#3F5E36] mt-0.5">
                      {c.ecogong.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-[#4A4744] leading-relaxed">
                  {c.ecogong.description}
                </p>

                <ul className="space-y-2 pt-1">
                  {c.ecogong.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-xs sm:text-sm text-[#2C2C2C]">
                      <Check aria-hidden="true" className="w-4 h-4 text-[#3F5E36] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <a
                  href={ECOGONG_PLAY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex min-h-11 items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#2C3E28] text-white text-sm font-bold hover:bg-[#1E2B1B] transition-colors ${FOCUS_RING}`}
                >
                  <GooglePlayIcon className="w-4 h-4 shrink-0" />
                  <span>{c.ecogong.playBtn}</span>
                  <ArrowUpRight aria-hidden="true" className="w-4 h-4 shrink-0" />
                </a>
              </div>
            </article>

            {/* Upcoming Ecosystem Cards */}
            {c.upcoming.map((card) => (
              <article
                key={card.id}
                className="flex flex-col justify-between rounded-3xl bg-[#FAF7F2] p-6 sm:p-7 border border-[#E2D8C8] space-y-6"
              >
                <div className="space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#7A5F43] text-xs font-bold border border-[#DFD2BE]">
                    <Compass aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                    <span>{card.badge}</span>
                  </span>

                  <div className="flex items-center gap-3.5">
                    {card.logoSrc ? (
                      <img
                        src={card.logoSrc}
                        alt={`${card.name} logo`}
                        loading="lazy"
                        className="w-12 h-12 object-contain shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-2xl bg-white border border-[#E2D8C8] flex items-center justify-center text-[#7A5F43] shrink-0">
                        <Layers aria-hidden="true" className="w-6 h-6" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-[#1F2421]">
                        {card.name}
                      </h3>
                      <p className="text-xs font-bold text-[#7A5F43] mt-0.5">{card.tagline}</p>
                    </div>
                  </div>

                  <p className="text-sm text-[#4A4744] leading-relaxed">{card.description}</p>

                  <ul className="space-y-2 pt-1">
                    {card.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-xs sm:text-sm text-[#3F3C38]">
                        <Check aria-hidden="true" className="w-4 h-4 text-[#7A5F43] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  {card.route ? (
                    <a
                      href={buildRouteHref(card.route, lang)}
                      onClick={handleSpaLink(card.route)}
                      className={`w-full inline-flex min-h-11 items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#1F2421] border border-[#9A7B4F] text-sm font-bold hover:bg-[#F3ECE0] transition-colors ${FOCUS_RING}`}
                    >
                      <span>{card.ctaLabel}</span>
                      <ArrowRight aria-hidden="true" className="w-4 h-4 text-[#7A5F43] shrink-0" />
                    </a>
                  ) : (
                    <a
                      href={card.href}
                      className={`w-full inline-flex min-h-11 items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#1F2421] border border-[#9A7B4F] text-sm font-bold hover:bg-[#F3ECE0] transition-colors ${FOCUS_RING}`}
                    >
                      <Mail aria-hidden="true" className="w-4 h-4 text-[#7A5F43] shrink-0" />
                      <span>{card.ctaLabel}</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          3. OFFICIAL STUDIO IMPRESSUM & CONTACT (#impressum / #contact)
         ================================================================ */}
      <section id="impressum" className="scroll-mt-24 py-18 sm:py-24 bg-[#F5F0EB]/60">
        <div id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-white p-6 sm:p-10 border border-[#E2D8C8] shadow-xs space-y-8">
            <div className="max-w-3xl space-y-2.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-[#7A5F43]">
                <Building2 aria-hidden="true" className="w-3.5 h-3.5 text-[#1B7A4E]" />
                <span>{c.impressum.eyebrow}</span>
              </span>
              <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-[#1F2421] tracking-tight">
                {c.impressum.title}
              </h2>
              <p className="text-sm sm:text-base text-[#5C5A56] leading-relaxed">
                {c.impressum.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-2xl bg-[#FAF7F2] p-5 border border-[#E8DFD4] space-y-1.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#7A5F43]">
                  {c.impressum.operatorLabel}
                </div>
                <div className="text-base font-extrabold text-[#1F2421]">
                  {c.impressum.operatorValue}
                </div>
              </div>

              <div className="rounded-2xl bg-[#FAF7F2] p-5 border border-[#E8DFD4] space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#7A5F43]">
                  <MapPin aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                  <span>{c.impressum.hqLabel}</span>
                </div>
                <div className="text-sm font-semibold text-[#1F2421] leading-snug">
                  {c.impressum.hqValue}
                </div>
              </div>

              <div className="rounded-2xl bg-[#FAF7F2] p-5 border border-[#E8DFD4] space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#7A5F43]">
                  <Mail aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                  <span>{c.impressum.emailLabel}</span>
                </div>
                <a
                  href={`mailto:${STUDIO_CONTACT_EMAIL}`}
                  className={`inline-flex min-h-9 items-center text-base font-extrabold text-[#14593A] underline underline-offset-4 hover:text-[#1B7A4E] ${FOCUS_RING}`}
                >
                  {STUDIO_CONTACT_EMAIL}
                </a>
              </div>

              <div className="rounded-2xl bg-[#FAF7F2] p-5 border border-[#E8DFD4] space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#7A5F43]">
                  <Server aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                  <span>{c.impressum.hostingLabel}</span>
                </div>
                <div className="text-xs font-medium text-[#3F3C38] leading-relaxed">
                  {c.impressum.hostingValue}
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-[#1F2421] text-white p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#E8D5B0]">
                  <Lock aria-hidden="true" className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{c.impressum.complianceTitle}</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                  {c.impressum.complianceBody}
                </p>
              </div>
              <a
                href={`mailto:${STUDIO_CONTACT_EMAIL}`}
                className="inline-flex min-h-11 items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B7A4E] hover:bg-[#145E3B] text-white text-sm font-bold transition-colors shrink-0"
              >
                <Mail aria-hidden="true" className="w-4 h-4 shrink-0" />
                <span>{c.impressum.emailCta}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default StudioHubPage;
