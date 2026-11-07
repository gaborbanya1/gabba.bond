import type { MouseEvent } from 'react';
import { ArrowRight, ArrowUpRight, Mail, MapPin, User } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { AppRoute } from '../routing';
import { FOCUS_RING } from './senear/hooks';

export const ECOGONG_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.gaborbanya1.ecogong';
export const STUDIO_CONTACT_EMAIL = 'gabba@gabba.bond';

type HomeLang = 'hu' | 'de' | 'en';

const HOME_COPY: Record<
  HomeLang,
  {
    subtitle: string;
    appsCta: string;
    contactCta: string;
    sectionTitle: string;
    senearTag: string;
    senearDesc: string;
    senearBtn: string;
    ecogongTag: string;
    ecogongDesc: string;
    ecogongBtn: string;
    junearBadge: string;
    junearTag: string;
    junearDesc: string;
    junearBtn: string;
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
    senearTag: 'Idősbarát Android kezelőfelület és családi biztonság',
    senearDesc:
      'Nagy fotós hívógombok, elállíthatatlan kezdőképernyő, csalóhívás-szűrő és távoli családi felügyelet meglévő Android telefonra.',
    senearBtn: 'SENEAR megnyitása',
    ecogongTag: 'Minimalista meditációs visszaszámláló',
    ecogongDesc:
      'Letisztult meditációs időzítő gonggal és leborulás-számlálóval — zavaró elemek és reklámok nélkül.',
    ecogongBtn: 'Google Play',
    junearBadge: 'Fejlesztés alatt',
    junearTag: 'Digitális biztonság gyerekeknek',
    junearDesc:
      'Védett, életkorhoz igazított első telefonos felület gyerekeknek, átlátható szülői felügyelettel.',
    junearBtn: 'Részletek',
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
    senearTag: 'Seniorenfreundliche Android-Oberfläche & Familienschutz',
    senearDesc:
      'Große Foto-Anruftasten, verstellgeschützter Startbildschirm, Anruffilter und Fernunterstützung für vorhandene Android-Handys.',
    senearBtn: 'SENEAR öffnen',
    ecogongTag: 'Minimalistischer Meditations-Timer',
    ecogongDesc:
      'Schlichter Countdown-Timer mit Gong und Niederwerfungszähler – ohne Ablenkung und komplett werbefrei.',
    ecogongBtn: 'Google Play',
    junearBadge: 'In Entwicklung',
    junearTag: 'Digitale Sicherheit für Kinder',
    junearDesc:
      'Geschützte, altersgerechte Smartphone-Oberfläche für Kinder mit transparenter Elternbegleitung.',
    junearBtn: 'Details',
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
    senearTag: 'Senior-friendly Android launcher & family safety',
    senearDesc:
      'Big photo call buttons, tamper-proof home screen, scam call blocker, and remote family care for any Android phone.',
    senearBtn: 'Open SENEAR',
    ecogongTag: 'Minimalist meditation timer',
    ecogongDesc:
      'Distraction-free meditation countdown timer with gong chimes and prostration counter—100% ad-free.',
    ecogongBtn: 'Google Play',
    junearBadge: 'In Development',
    junearTag: 'Digital safety for kids',
    junearDesc:
      'Protected, age-appropriate first smartphone experience for children with transparent parental care.',
    junearBtn: 'Learn more',
    contactTitle: 'Contact & Impressum',
    operatorLabel: 'Operator: Bányai Gábor',
    address: 'Ravazd utca 46, 9400 Sopron, Hungary (EU)',
    emailBtn: 'Email: gabba@gabba.bond',
  },
};

export interface StudioHubPageProps {
  onNavigate: (route: AppRoute) => void;
}

export function StudioHubPage({ onNavigate }: StudioHubPageProps) {
  const { language, t } = useLanguage();
  const activeLang: HomeLang = language === 'hu' || language === 'de' ? language : 'en';
  const copy = HOME_COPY[activeLang];

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

  return (
    <div className="bg-[#FAFAFA] text-[#2C2C2C]">
      {/* Simple, Clean Hero */}
      <section className="pt-14 pb-16 sm:pt-20 sm:pb-22 bg-gradient-to-b from-[#FAFAFA] via-[#F8F5F1] to-[#F5F0EB] border-b border-[#C5A880]/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2C2C2C] leading-[1.12]">
            {t.hero.titlePrefix}{' '}
            <span className="relative inline-block text-[#2C2C2C]">
              <span className="relative z-10">{t.hero.titleHighlight}</span>
              <span aria-hidden="true" className="absolute bottom-1.5 left-0 w-full h-3 bg-[#C5A880]/30 -z-10 rounded-xs" />
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#5C5A56] max-w-2xl mx-auto leading-relaxed">
            {copy.subtitle}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
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
              className={`inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-[#2C2C2C] text-sm font-semibold border border-[#C5A880]/60 hover:bg-[#F5F0EB] transition-colors ${FOCUS_RING}`}
            >
              <span>{copy.contactCta}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Simple 3-Product Grid */}
      <section id="projects" className="scroll-mt-24 py-14 sm:py-20 border-b border-[#E8DFD4]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#2C2C2C] tracking-tight">
            {copy.sectionTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. SENEAR */}
            <article className="rounded-3xl bg-white border-2 border-[#1B7A4E]/45 p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-6">
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
                    <p className="text-xs font-semibold text-[#14593A]">{copy.senearTag}</p>
                  </div>
                </div>
                <p className="text-sm text-[#5C5A56] leading-relaxed">{copy.senearDesc}</p>
              </div>

              <div>
                <a
                  href="/senear"
                  onClick={handleSpaNav('senear')}
                  className={`w-full inline-flex min-h-11 items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1B7A4E] hover:bg-[#145E3B] text-white text-sm font-bold transition-colors ${FOCUS_RING}`}
                >
                  <span>{copy.senearBtn}</span>
                  <ArrowRight aria-hidden="true" className="w-4 h-4 shrink-0" />
                </a>
              </div>
            </article>

            {/* 2. EcoGong */}
            <article
              id="ecogong"
              className="rounded-3xl bg-white border border-[#E8DFD4] p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-6"
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
                    <p className="text-xs font-semibold text-[#7A5F43]">{copy.ecogongTag}</p>
                  </div>
                </div>
                <p className="text-sm text-[#5C5A56] leading-relaxed">{copy.ecogongDesc}</p>
              </div>

              <div>
                <a
                  href={ECOGONG_PLAY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex min-h-11 items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#2C2C2C] hover:bg-[#1A1A1A] text-white text-sm font-semibold transition-colors ${FOCUS_RING}`}
                >
                  <span>{copy.ecogongBtn}</span>
                  <ArrowUpRight aria-hidden="true" className="w-4 h-4 text-[#C5A880] shrink-0" />
                </a>
              </div>
            </article>

            {/* 3. JUNEAR */}
            <article className="rounded-3xl bg-white border border-[#E8DFD4] p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-6">
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
                      <p className="text-xs font-semibold text-[#7A5F43]">{copy.junearTag}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#F5F0EB] text-[#7A5F43] border border-[#DFD2BE] shrink-0">
                    {copy.junearBadge}
                  </span>
                </div>
                <p className="text-sm text-[#5C5A56] leading-relaxed">{copy.junearDesc}</p>
              </div>

              <div>
                <a
                  href="/junear"
                  onClick={handleSpaNav('junear')}
                  className={`w-full inline-flex min-h-11 items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FAF8F5] hover:bg-[#F0EAE1] text-[#2C2C2C] border border-[#C5A880]/60 text-sm font-semibold transition-colors ${FOCUS_RING}`}
                >
                  <span>{copy.junearBtn}</span>
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
