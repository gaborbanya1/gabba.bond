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
import { PLAY_STORE_URL } from './senear/senearContent';

/**
 * Generic product page. Since the SENEAR landing page has its own dedicated
 * component (components/senear/SenearLandingPage.tsx), this page is used for JUNEAR.
 */

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

const COPY: Record<ProductKey, Record<Lang, ProductCopy>> = {
  senear: {
    hu: {
      kicker: 'Idősbarát telefonrendszer Androidra',
      heroTitle: 'Egyszerű telefon az idős szüleidnek. Nyugalom neked.',
      heroText:
        'Nagy fotós hívógombok, zárolt kezdőképernyő, és csak az általad jóváhagyott számok hívhatják. Te pedig a saját telefonodról látod, hogy minden rendben van.',
      chips: [],
      primaryCta: 'Beállítási útmutató',
      benefitsTitle: 'Miért a SENEAR?',
      benefitsSubtitle: '',
      howTitle: 'Így működik',
      howSubtitle: '',
      how: [],
      spotlightTitle: 'Közelebbről',
      spotlightSubtitle: '',
      bullets: [],
      ctaTitle: 'Készen állsz a beállításra?',
      ctaText: '',
    },
    en: {
      kicker: 'Senior-friendly phone system for Android',
      heroTitle: 'A simple phone for your parents. Peace of mind for you.',
      heroText:
        'Large photo call buttons, a locked home screen, and only numbers you approve can call. And you see from your own phone that everything is okay.',
      chips: [],
      primaryCta: 'Setup guide',
      benefitsTitle: 'Why SENEAR?',
      benefitsSubtitle: '',
      howTitle: 'How it works',
      howSubtitle: '',
      how: [],
      spotlightTitle: 'A closer look',
      spotlightSubtitle: '',
      bullets: [],
      ctaTitle: 'Ready to set it up?',
      ctaText: '',
    },
    de: {
      kicker: 'Seniorenfreundliches Telefonsystem für Android',
      heroTitle: 'Ein einfaches Telefon für Ihre Eltern. Ruhe für Sie.',
      heroText:
        'Große Foto-Anruftasten, ein gesperrter Startbildschirm, und nur von Ihnen freigegebene Nummern können anrufen. Und Sie sehen auf Ihrem eigenen Handy, dass alles in Ordnung ist.',
      chips: [],
      primaryCta: 'Einrichtungsanleitung',
      benefitsTitle: 'Warum SENEAR?',
      benefitsSubtitle: '',
      howTitle: 'So funktioniert es',
      howSubtitle: '',
      how: [],
      spotlightTitle: 'Im Detail',
      spotlightSubtitle: '',
      bullets: [],
      ctaTitle: 'Bereit für die Einrichtung?',
      ctaText: '',
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
      {/* HERO */}
      <section className="relative bg-gradient-to-b from-[#FAFAFA] via-[#F8F5F1] to-[#F5F0EB] border-b border-[#C5A880]/20">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(#2C2C2C 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:pb-20">
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
              </div>
            </div>

            <div className="lg:col-span-6">
              <ProductShowcase3D product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={c.benefitsTitle} subtitle={c.benefitsSubtitle} accent={accent.main} />
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
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="igy-mukodik" className="scroll-mt-20 py-20 sm:py-24 bg-[#F5F0EB]/60 border-y border-[#C5A880]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={c.howTitle} subtitle={c.howSubtitle} accent={accent.main} />
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
            <div
              className="hidden md:block absolute top-10 left-[16%] right-[16%] h-0.5"
              style={{ background: `repeating-linear-gradient(90deg, ${accent.main} 0 10px, transparent 10px 18px)` }}
            />
            {c.how.map((step, i) => {
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
                  <p className="text-sm sm:text-base text-[#5C5A56] leading-relaxed mt-2 max-w-sm">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SPOTLIGHT */}
      <section id="kozelebbrol" className="scroll-mt-20 py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* SETUP CTA */}
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
