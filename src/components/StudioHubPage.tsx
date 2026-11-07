import { useRef, useState, type MouseEvent } from 'react';
import { ArrowRight, ArrowUpRight, Check, Mail, MapPin, User } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { AppRoute } from '../routing';
import { FOCUS_RING } from './senear/hooks';

export const ECOGONG_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.gaborbanya1.ecogong';
export const STUDIO_CONTACT_EMAIL = 'gabba@gabba.bond';

type HomeLang = 'hu' | 'de' | 'en';
type HomeAppKey = 'senear' | 'ecogong' | 'junear';

interface AppCardCopy {
  tag: string;
  desc: string;
  features: [string, string, string];
  btn: string;
  badge?: string;
  jumpAria: string;
}

const HOME_COPY: Record<
  HomeLang,
  {
    subtitle: string;
    appsCta: string;
    contactCta: string;
    sectionTitle: string;
    apps: Record<HomeAppKey, AppCardCopy>;
    contactTitle: string;
    operatorLabel: string;
    address: string;
    emailBtn: string;
  }
> = {
  hu: {
    subtitle: 'Egyszerű, megbízható és reklámmentes alkalmazások családoknak és a mindennapokra.',
    appsCta: 'Alkalmazások',
    contactCta: 'Kapcsolat',
    sectionTitle: 'Alkalmazások',
    apps: {
      senear: {
        tag: 'Idősbarát Android kezelőfelület és családi biztonság',
        desc: 'Nagy fotós hívógombok, elállíthatatlan kezdőképernyő, csalóhívás-szűrő és távoli családi felügyelet meglévő Android telefonra.',
        features: [
          'Elállíthatatlan kioszk kezdőképernyő nagy fotós csempékkel',
          'Ismeretlen és csaló hívások automatikus blokkolása',
          'SOS segélyhívás élő GPS-szel és távoli családi felügyelettel',
        ],
        btn: 'SENEAR megnyitása',
        jumpAria: 'SENEAR – ugrás az alkalmazáskártyára',
      },
      ecogong: {
        tag: 'Minimalista meditációs visszaszámláló',
        desc: 'Letisztult meditációs időzítő gonggal és leborulás-számlálóval — zavaró elemek és reklámok nélkül.',
        features: [
          'Meditációs visszaszámláló tiszta gongjelzéssel',
          'Beépített leborulás- és ismétlésszámláló',
          '100% reklámmentes, offline és regisztráció nélkül működik',
        ],
        btn: 'Google Play',
        jumpAria: 'EcoGong – ugrás az alkalmazáskártyára',
      },
      junear: {
        badge: 'Fejlesztés alatt',
        tag: 'Digitális biztonság gyerekeknek',
        desc: 'Védett, életkorhoz igazított első telefonos felület gyerekeknek, átlátható szülői felügyelettel.',
        features: [
          'Szigorú kioszk zár — nem törölhető és nem kerülhető meg',
          'Csak szülők által jóváhagyott biztonságos híváslista',
          'Élő GPS-helyzet és átlátható szülői távfelügyelet',
        ],
        btn: 'Részletek',
        jumpAria: 'JUNEAR – ugrás az alkalmazáskártyára',
      },
    },
    contactTitle: 'Kapcsolat és Impresszum',
    operatorLabel: 'Üzemeltető: Bányai Gábor',
    address: '9400 Sopron, Ravazd utca 46., Magyarország (EU)',
    emailBtn: 'Írj nekünk: gabba@gabba.bond',
  },
  de: {
    subtitle: 'Einfache, zuverlässige und werbefreie Anwendungen für Familien und den Alltag.',
    appsCta: 'Anwendungen',
    contactCta: 'Kontakt',
    sectionTitle: 'Anwendungen',
    apps: {
      senear: {
        tag: 'Seniorenfreundliche Android-Oberfläche & Familienschutz',
        desc: 'Große Foto-Anruftasten, verstellgeschützter Startbildschirm, Anruffilter und Fernunterstützung für vorhandene Android-Handys.',
        features: [
          'Verstellgeschützter Kiosk-Startbildschirm mit großen Fototasten',
          'Automatische Blockierung unbekannter und betrügerischer Anrufe',
          'SOS-Notruf mit Live-GPS und Fernbetreuung für Angehörige',
        ],
        btn: 'SENEAR öffnen',
        jumpAria: 'SENEAR – zur Anwendungskarte springen',
      },
      ecogong: {
        tag: 'Minimalistischer Meditations-Timer',
        desc: 'Schlichter Countdown-Timer mit Gong und Niederwerfungszähler – ohne Ablenkung und komplett werbefrei.',
        features: [
          'Meditations-Countdown mit klarem Gongklang',
          'Integrierter Niederwerfungs- und Wiederholungszähler',
          '100 % werbefrei, offline und ohne Registrierung nutzbar',
        ],
        btn: 'Google Play',
        jumpAria: 'EcoGong – zur Anwendungskarte springen',
      },
      junear: {
        badge: 'In Entwicklung',
        tag: 'Digitale Sicherheit für Kinder',
        desc: 'Geschützte, altersgerechte Smartphone-Oberfläche für Kinder mit transparenter Elternbegleitung.',
        features: [
          'Strikte Kiosk-Sperre – geschützt vor Löschen und Umgehen',
          'Anrufe nur für von Eltern freigegebene Kontakte',
          'Live-GPS-Standort und transparente Elternbegleitung',
        ],
        btn: 'Details',
        jumpAria: 'JUNEAR – zur Anwendungskarte springen',
      },
    },
    contactTitle: 'Kontakt & Impressum',
    operatorLabel: 'Betreiber: Bányai Gábor',
    address: 'Ravazd utca 46, 9400 Sopron, Ungarn (EU)',
    emailBtn: 'E-Mail senden: gabba@gabba.bond',
  },
  en: {
    subtitle: 'Simple, dependable, and ad-free applications for families and everyday life.',
    appsCta: 'Applications',
    contactCta: 'Contact',
    sectionTitle: 'Applications',
    apps: {
      senear: {
        tag: 'Senior-friendly Android launcher & family safety',
        desc: 'Big photo call buttons, tamper-proof home screen, scam call blocker, and remote family care for any Android phone.',
        features: [
          'Tamper-proof kiosk home screen with large photo tiles',
          'Automatic blocking of unknown and scam callers',
          'One-tap SOS alert with live GPS & remote family care',
        ],
        btn: 'Open SENEAR',
        jumpAria: 'SENEAR — jump to application card',
      },
      ecogong: {
        tag: 'Minimalist meditation timer',
        desc: 'Distraction-free meditation countdown timer with gong chimes and prostration counter—100% ad-free.',
        features: [
          'Meditation countdown timer with authentic gong chimes',
          'Built-in prostration and repetition counter',
          '100% ad-free, offline, and works with zero sign-up',
        ],
        btn: 'Google Play',
        jumpAria: 'EcoGong — jump to application card',
      },
      junear: {
        badge: 'In Development',
        tag: 'Digital safety for kids',
        desc: 'Protected, age-appropriate first smartphone experience for children with transparent parental care.',
        features: [
          'Strict kiosk lock—cannot be bypassed or uninstalled',
          'Safe calling restricted to parent-approved contacts',
          'Live GPS location and transparent parental supervision',
        ],
        btn: 'Learn more',
        jumpAria: 'JUNEAR — jump to application card',
      },
    },
    contactTitle: 'Contact & Impressum',
    operatorLabel: 'Operator: Bányai Gábor',
    address: 'Ravazd utca 46, 9400 Sopron, Hungary (EU)',
    emailBtn: 'Email: gabba@gabba.bond',
  },
};

const APP_META: {
  key: HomeAppKey;
  cardId: string;
  name: string;
  logoSrc: string;
  logoFitClass: string;
  floatClass: string;
  heroPositionClass: string;
}[] = [
  {
    key: 'senear',
    cardId: 'app-senear',
    name: 'SENEAR',
    logoSrc: '/logos/senear-logo.png',
    logoFitClass: 'object-contain p-2 bg-[#FAF8F5]',
    floatClass: 'gabba-logo-float-1',
    heroPositionClass: 'sm:-translate-y-3',
  },
  {
    key: 'ecogong',
    cardId: 'ecogong',
    name: 'EcoGong',
    logoSrc: '/logos/ecogong-logo.webp',
    logoFitClass: 'object-cover bg-white',
    floatClass: 'gabba-logo-float-2',
    heroPositionClass: 'sm:translate-y-5',
  },
  {
    key: 'junear',
    cardId: 'app-junear',
    name: 'JUNEAR',
    logoSrc: '/logos/junear-logo.png',
    logoFitClass: 'object-contain p-2 bg-[#FAF8F5]',
    floatClass: 'gabba-logo-float-3',
    heroPositionClass: 'sm:-translate-y-1',
  },
];

export interface StudioHubPageProps {
  onNavigate: (route: AppRoute) => void;
}

export function StudioHubPage({ onNavigate }: StudioHubPageProps) {
  const { language, t } = useLanguage();
  const activeLang: HomeLang = language === 'hu' || language === 'de' ? language : 'en';
  const copy = HOME_COPY[activeLang];

  const [focusedApp, setFocusedApp] = useState<HomeAppKey | null>(null);
  const [pulseApp, setPulseApp] = useState<HomeAppKey | null>(null);

  const cardRefs = useRef<Record<HomeAppKey, HTMLElement | null>>({
    senear: null,
    ecogong: null,
    junear: null,
  });
  const ctaRefs = useRef<Record<HomeAppKey, HTMLAnchorElement | null>>({
    senear: null,
    ecogong: null,
    junear: null,
  });

  const handleSpaNav = (route: AppRoute) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onNavigate(route);
  };

  const scrollToSection = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  const jumpToAppCard = (appKey: HomeAppKey) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();

    const cardEl = cardRefs.current[appKey];
    const ctaEl = ctaRefs.current[appKey];
    if (!cardEl) return;

    setFocusedApp(appKey);
    setPulseApp(appKey);

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    cardEl.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });

    // Move keyboard & cursor focus onto the target app's primary button without snapping scroll
    ctaEl?.focus({ preventScroll: true });
    window.setTimeout(() => {
      ctaEl?.focus({ preventScroll: true });
    }, reduced ? 0 : 480);

    window.setTimeout(() => {
      setPulseApp((current) => (current === appKey ? null : current));
    }, 1600);
  };

  const getCardClasses = (appKey: HomeAppKey, isFlagship = false) => {
    const isFocused = focusedApp === appKey;
    const isPulsing = pulseApp === appKey;
    const borderClass = isFocused
      ? 'border-2 border-[#1B7A4E] ring-4 ring-[#1B7A4E]/20 shadow-lg -translate-y-1'
      : isFlagship
        ? 'border-2 border-[#1B7A4E]/45 shadow-xs hover:border-[#1B7A4E]/75 hover:shadow-md'
        : 'border border-[#E8DFD4] shadow-xs hover:border-[#C5A880] hover:shadow-md';

    return `rounded-3xl bg-white p-6 sm:p-7 flex flex-col justify-between gap-6 transition-all duration-300 ${borderClass} ${
      isPulsing ? 'gabba-card-arrival' : ''
    }`;
  };

  return (
    <div className="bg-[#FAFAFA] text-[#2C2C2C]">
      {/* 2-Column Hero: Left Slogan + Right Moving App Logos */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-18 sm:pb-22 bg-gradient-to-b from-[#FAFAFA] via-[#F8F5F1] to-[#F5F0EB] border-b border-[#C5A880]/20">
        {/* Soft warm ambient glow behind the right logo cluster */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 w-[28rem] h-[28rem] rounded-full bg-[#C5A880]/18 blur-3xl"
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Slogan, Subtitle, CTAs */}
            <div className="lg:col-span-6 flex flex-col items-start text-left space-y-5">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.35rem] font-bold tracking-tight text-[#2C2C2C] leading-[1.12]">
                {t.hero.titlePrefix}{' '}
                <span className="relative inline-block text-[#2C2C2C]">
                  <span className="relative z-10">{t.hero.titleHighlight}</span>
                  <span
                    aria-hidden="true"
                    className="absolute bottom-1.5 left-0 w-full h-3 bg-[#C5A880]/30 -z-10 rounded-xs"
                  />
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#5C5A56] max-w-xl leading-relaxed">
                {copy.subtitle}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <a
                  href="#projects"
                  onClick={scrollToSection('projects')}
                  className={`inline-flex min-h-11 items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-[#2C2C2C] text-[#FAFAFA] text-sm font-semibold hover:bg-[#1A1A1A] transition-colors ${FOCUS_RING}`}
                >
                  <span>{copy.appsCta}</span>
                  <ArrowRight aria-hidden="true" className="w-4 h-4 text-[#C5A880]" />
                </a>

                <a
                  href="#contact"
                  onClick={scrollToSection('contact')}
                  className={`inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-[#2C2C2C] text-sm font-semibold border border-[#9A7B4F]/60 hover:bg-[#F5F0EB] transition-colors ${FOCUS_RING}`}
                >
                  <span>{copy.contactCta}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Floating Interactive App Logos */}
            <div className="lg:col-span-6 flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-lg py-4 sm:py-6 flex items-center justify-center">
                {/* Subtle decorative orbital ring */}
                <div
                  aria-hidden="true"
                  className="hidden sm:block pointer-events-none absolute w-72 h-72 rounded-full border border-dashed border-[#C5A880]/40"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute w-56 h-56 rounded-full bg-gradient-to-tr from-[#1B7A4E]/10 via-[#C5A880]/15 to-transparent blur-2xl"
                />

                <div className="relative z-10 grid grid-cols-3 gap-3.5 sm:gap-6 items-center w-full">
                  {APP_META.map((app) => {
                    const appCopy = copy.apps[app.key];
                    const isSelected = focusedApp === app.key;
                    return (
                      <div key={app.key} className={`flex justify-center ${app.heroPositionClass}`}>
                        <a
                          href={`#${app.cardId}`}
                          onClick={jumpToAppCard(app.key)}
                          aria-label={appCopy.jumpAria}
                          className={`${app.floatClass} group flex flex-col items-center gap-2.5 p-2 rounded-3xl cursor-pointer transition-transform duration-300 hover:scale-105 ${FOCUS_RING}`}
                        >
                          <div
                            className={`relative w-22 h-22 sm:w-28 sm:h-28 rounded-[1.75rem] bg-white p-2 shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 flex items-center justify-center ${
                              isSelected
                                ? 'border-2 border-[#1B7A4E] ring-4 ring-[#1B7A4E]/20'
                                : app.key === 'senear'
                                  ? 'border-2 border-[#1B7A4E]/45 group-hover:border-[#1B7A4E]'
                                  : 'border-2 border-[#DFD2BE] group-hover:border-[#9A7B4F]'
                            }`}
                          >
                            <img
                              src={app.logoSrc}
                              alt=""
                              width={96}
                              height={96}
                              className={`w-full h-full rounded-2xl ${app.logoFitClass}`}
                            />
                          </div>

                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/95 border border-[#E2D6C5] shadow-2xs font-heading text-xs sm:text-sm font-bold text-[#2C2C2C] group-hover:border-[#1B7A4E] group-hover:text-[#14593A] transition-colors">
                            {app.name}
                          </span>
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes gabbaFloatA {
            0%, 100% { transform: translate3d(0, 0px, 0) rotate(0deg); }
            50% { transform: translate3d(0, -11px, 0) rotate(-1.2deg); }
          }
          @keyframes gabbaFloatB {
            0%, 100% { transform: translate3d(0, 0px, 0) rotate(0deg); }
            50% { transform: translate3d(0, -13px, 0) rotate(1.4deg); }
          }
          @keyframes gabbaFloatC {
            0%, 100% { transform: translate3d(0, 0px, 0) rotate(0deg); }
            50% { transform: translate3d(0, -9px, 0) rotate(-1deg); }
          }
          @keyframes gabbaCardArrival {
            0% { transform: translateY(-4px) scale(1); }
            45% { transform: translateY(-6px) scale(1.018); }
            100% { transform: translateY(-4px) scale(1); }
          }
          .gabba-logo-float-1 {
            animation: gabbaFloatA 5.6s ease-in-out infinite;
          }
          .gabba-logo-float-2 {
            animation: gabbaFloatB 6.4s ease-in-out infinite;
            animation-delay: -2.1s;
          }
          .gabba-logo-float-3 {
            animation: gabbaFloatC 6.9s ease-in-out infinite;
            animation-delay: -4.2s;
          }
          .gabba-logo-float-1:hover,
          .gabba-logo-float-2:hover,
          .gabba-logo-float-3:hover,
          .gabba-logo-float-1:focus-visible,
          .gabba-logo-float-2:focus-visible,
          .gabba-logo-float-3:focus-visible {
            animation-play-state: paused;
          }
          .gabba-card-arrival {
            animation: gabbaCardArrival 650ms cubic-bezier(0.22, 1, 0.36, 1);
          }
          @media (prefers-reduced-motion: reduce) {
            .gabba-logo-float-1,
            .gabba-logo-float-2,
            .gabba-logo-float-3,
            .gabba-card-arrival {
              animation: none !important;
            }
          }
        `}</style>
      </section>

      {/* 3-Application Grid with 3 Green-Check Features Each */}
      <section id="projects" className="scroll-mt-24 py-14 sm:py-20 border-b border-[#E8DFD4]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#2C2C2C] tracking-tight">
            {copy.sectionTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. SENEAR */}
            <article
              id="app-senear"
              ref={(el) => {
                cardRefs.current.senear = el;
              }}
              onFocus={() => setFocusedApp('senear')}
              onClick={() => setFocusedApp('senear')}
              className={`scroll-mt-28 ${getCardClasses('senear', true)}`}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src="/logos/senear-logo.png"
                    alt=""
                    width={52}
                    height={52}
                    className="w-13 h-13 rounded-2xl object-contain bg-[#FAF8F5] p-1 border border-[#E8DFD4] shrink-0"
                  />
                  <div>
                    <h3 className="font-heading text-xl font-extrabold text-[#1F2421]">SENEAR</h3>
                    <p className="text-xs font-semibold text-[#14593A]">{copy.apps.senear.tag}</p>
                  </div>
                </div>

                <p className="text-sm text-[#5C5A56] leading-relaxed">{copy.apps.senear.desc}</p>

                <ul className="pt-2 border-t border-[#F0EAE1] space-y-2.5">
                  {copy.apps.senear.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-[#2C2C2C] leading-snug">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 w-5 h-5 rounded-full bg-[#1B7A4E] text-white flex items-center justify-center shrink-0"
                      >
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </span>
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <a
                  ref={(el) => {
                    ctaRefs.current.senear = el;
                  }}
                  href="/senear"
                  onClick={handleSpaNav('senear')}
                  className={`w-full inline-flex min-h-11 items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1B7A4E] hover:bg-[#145E3B] text-white text-sm font-bold transition-colors ${FOCUS_RING}`}
                >
                  <span>{copy.apps.senear.btn}</span>
                  <ArrowRight aria-hidden="true" className="w-4 h-4 shrink-0" />
                </a>
              </div>
            </article>

            {/* 2. EcoGong */}
            <article
              id="ecogong"
              ref={(el) => {
                cardRefs.current.ecogong = el;
              }}
              onFocus={() => setFocusedApp('ecogong')}
              onClick={() => setFocusedApp('ecogong')}
              className={`scroll-mt-28 ${getCardClasses('ecogong')}`}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src="/logos/ecogong-logo.webp"
                    alt=""
                    width={52}
                    height={52}
                    className="w-13 h-13 rounded-2xl object-cover bg-white border border-[#E8DFD4] shrink-0"
                  />
                  <div>
                    <h3 className="font-heading text-xl font-extrabold text-[#1F2421]">EcoGong</h3>
                    <p className="text-xs font-semibold text-[#7A5F43]">{copy.apps.ecogong.tag}</p>
                  </div>
                </div>

                <p className="text-sm text-[#5C5A56] leading-relaxed">{copy.apps.ecogong.desc}</p>

                <ul className="pt-2 border-t border-[#F0EAE1] space-y-2.5">
                  {copy.apps.ecogong.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-[#2C2C2C] leading-snug">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 w-5 h-5 rounded-full bg-[#1B7A4E] text-white flex items-center justify-center shrink-0"
                      >
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </span>
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <a
                  ref={(el) => {
                    ctaRefs.current.ecogong = el;
                  }}
                  href={ECOGONG_PLAY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex min-h-11 items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#2C2C2C] hover:bg-[#1A1A1A] text-white text-sm font-semibold transition-colors ${FOCUS_RING}`}
                >
                  <span>{copy.apps.ecogong.btn}</span>
                  <ArrowUpRight aria-hidden="true" className="w-4 h-4 text-[#C5A880] shrink-0" />
                </a>
              </div>
            </article>

            {/* 3. JUNEAR */}
            <article
              id="app-junear"
              ref={(el) => {
                cardRefs.current.junear = el;
              }}
              onFocus={() => setFocusedApp('junear')}
              onClick={() => setFocusedApp('junear')}
              className={`scroll-mt-28 ${getCardClasses('junear')}`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3.5">
                    <img
                      src="/logos/junear-logo.png"
                      alt=""
                      width={52}
                      height={52}
                      className="w-13 h-13 rounded-2xl object-contain bg-[#FAF8F5] p-1 border border-[#E8DFD4] shrink-0"
                    />
                    <div>
                      <h3 className="font-heading text-xl font-extrabold text-[#1F2421]">JUNEAR</h3>
                      <p className="text-xs font-semibold text-[#7A5F43]">{copy.apps.junear.tag}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#F5F0EB] text-[#7A5F43] border border-[#DFD2BE] shrink-0">
                    {copy.apps.junear.badge}
                  </span>
                </div>

                <p className="text-sm text-[#5C5A56] leading-relaxed">{copy.apps.junear.desc}</p>

                <ul className="pt-2 border-t border-[#F0EAE1] space-y-2.5">
                  {copy.apps.junear.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-[#2C2C2C] leading-snug">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 w-5 h-5 rounded-full bg-[#1B7A4E] text-white flex items-center justify-center shrink-0"
                      >
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </span>
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <a
                  ref={(el) => {
                    ctaRefs.current.junear = el;
                  }}
                  href="/junear"
                  onClick={handleSpaNav('junear')}
                  className={`w-full inline-flex min-h-11 items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FAF8F5] hover:bg-[#F0EAE1] text-[#2C2C2C] border border-[#9A7B4F]/60 text-sm font-semibold transition-colors ${FOCUS_RING}`}
                >
                  <span>{copy.apps.junear.btn}</span>
                  <ArrowRight aria-hidden="true" className="w-4 h-4 text-[#7A5F43] shrink-0" />
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Simple Contact & Impressum Strip */}
      <section id="contact" className="scroll-mt-24 py-14 sm:py-18 bg-[#F5F0EB]/60">
        <div id="impressum" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white border border-[#E8DFD4] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2.5">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#2C2C2C]">
                {copy.contactTitle}
              </h2>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#4A4743]">
                <span className="inline-flex items-center gap-2 font-semibold text-[#2C2C2C]">
                  <User aria-hidden="true" className="w-4 h-4 text-[#7A5F43] shrink-0" />
                  {copy.operatorLabel}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin aria-hidden="true" className="w-4 h-4 text-[#7A5F43] shrink-0" />
                  {copy.address}
                </span>
              </div>
            </div>

            <div className="shrink-0">
              <a
                href={`mailto:${STUDIO_CONTACT_EMAIL}`}
                className={`inline-flex min-h-11 items-center gap-2.5 px-5 py-3 rounded-xl bg-[#2C2C2C] hover:bg-[#1A1A1A] text-white text-sm font-semibold transition-colors ${FOCUS_RING}`}
              >
                <Mail aria-hidden="true" className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>{copy.emailBtn}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
