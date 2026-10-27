import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Copy,
  Globe2,
  HeartHandshake,
  Lock,
  MapPinned,
  MonitorSmartphone,
  Play,
  PhoneOff,
  PlayCircle,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Ban,
  CloudCog,
  Users,
  VolumeX,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { GooglePlayIcon } from '../GooglePlayIcon';
import type { AppRoute } from '../../routing';
import { CallFilterPhone } from './CallFilterPhone';
import { RemoteSetupStory } from './RemoteSetupStory';
import { FOCUS_RING, scrollToSection, useInViewOnce } from './hooks';
import { PLAY_STORE_URL, SENEAR_CONTENT, type SenearContent, type SenearLang } from './senearContent';
import './senear.css';

interface SenearLandingPageProps {
  onNavigate: (route: AppRoute) => void;
}

/** Real user reviews / Google Play ratings go here once they exist. Never add invented ones. */
interface Testimonial {
  quote: string;
  author: string;
  source: 'Google Play' | 'E-mail';
}
const TESTIMONIALS: Testimonial[] = [];

export function SenearLandingPage({ onNavigate }: SenearLandingPageProps) {
  const { language } = useLanguage();
  const lang: SenearLang = language === 'hu' || language === 'de' ? language : 'en';
  const c = SENEAR_CONTENT[lang];

  const rootRef = useRef<HTMLDivElement>(null);
  const heroCtaRef = useRef<HTMLAnchorElement>(null);
  const finalCtaRef = useRef<HTMLElement>(null);
  const [showSticky, setShowSticky] = useState(false);

  // Enable scroll-reveal styles only on the client (SSR / no-JS HTML stays fully visible).
  useEffect(() => {
    rootRef.current?.classList.add('sn-js');
  }, []);

  // Page title + meta description for this route (restored on leave).
  useEffect(() => {
    const prevTitle = document.title;
    const desc = document.querySelector('meta[name="description"]');
    const prevDesc = desc?.getAttribute('content') ?? '';
    document.title = c.meta.title;
    desc?.setAttribute('content', c.meta.description);
    return () => {
      document.title = prevTitle;
      desc?.setAttribute('content', prevDesc);
    };
  }, [c.meta.title, c.meta.description]);

  // Mobile sticky download bar: visible after the hero button, hidden again at the final CTA.
  useEffect(() => {
    const onScroll = () => {
      const hero = heroCtaRef.current?.getBoundingClientRect();
      const final = finalCtaRef.current?.getBoundingClientRect();
      if (!hero || !final) return;
      setShowSticky(hero.bottom < 0 && final.top > window.innerHeight);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div ref={rootRef} className="bg-[#FAF7F2] text-[#1F2421] overflow-x-clip">
      <Hero c={c} lang={lang} onNavigate={onNavigate} ctaRef={heroCtaRef} />
      <Scenarios c={c} />
      <Modes c={c} />
      <HowItWorks c={c} />
      <VideoSection c={c} />
      <Pricing c={c} />
      <TrustBar c={c} />
      {TESTIMONIALS.length > 0 && <Testimonials items={TESTIMONIALS} />}
      <Faq c={c} />
      <FinalCta c={c} onNavigate={onNavigate} sectionRef={finalCtaRef} />

      {/* Mobile sticky download button */}
      <div
        className={`sm:hidden fixed inset-x-0 bottom-0 z-40 px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/95 to-transparent transition-[transform,visibility] duration-300 ${
          showSticky ? 'visible translate-y-0' : 'invisible translate-y-full pointer-events-none'
        }`}
        aria-hidden={!showSticky}
      >
        <PlayButton label={c.sticky} className="w-full" tabIndex={showSticky ? 0 : -1} />
      </div>
    </div>
  );
}

/* =====================================================================
   Shared building blocks
   ===================================================================== */

function PlayButton({
  label,
  className = '',
  size = 'lg',
  tabIndex,
  anchorRef,
}: {
  label: string;
  className?: string;
  size?: 'lg' | 'md';
  tabIndex?: number;
  anchorRef?: React.Ref<HTMLAnchorElement>;
}) {
  return (
    <a
      ref={anchorRef}
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={tabIndex}
      className={`group inline-flex items-center justify-center gap-3 rounded-2xl bg-[#1B7A4E] font-bold text-white shadow-[0_12px_24px_-10px_rgba(27,122,78,0.6)] transition-all hover:bg-[#145E3B] hover:shadow-[0_16px_30px_-10px_rgba(27,122,78,0.7)] active:scale-[0.98] ${
        size === 'lg' ? 'min-h-14 px-6 text-base sm:text-[17px]' : 'min-h-12 px-5 text-base'
      } ${FOCUS_RING} ${className}`}
    >
      <GooglePlayIcon color="white" className="h-5 w-5 shrink-0 transition-transform group-hover:scale-110" />
      <span>{label}</span>
    </a>
  );
}

function Eyebrow({ children, tone = 'gold' }: { children: ReactNode; tone?: 'gold' | 'green' | 'light' }) {
  const color = tone === 'green' ? 'text-[#1B7A4E]' : tone === 'light' ? 'text-[#E8D5B0]' : 'text-[#7A5A2E]';
  return <p className={`text-sm font-bold uppercase tracking-[0.14em] ${color}`}>{children}</p>;
}

function SectionTitle({ id, eyebrow, title, subtitle, center = true }: { id?: string; eyebrow?: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-2xl space-y-3`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 id={id} className="font-heading text-[2rem] leading-[1.1] sm:text-[2.6rem] font-extrabold tracking-tight text-[#1F2421] text-balance">
        {title}
      </h2>
      {subtitle && <p className="text-lg leading-relaxed text-[#4A4744] text-pretty">{subtitle}</p>}
    </div>
  );
}

function Reveal({ children, className = '', as: Tag = 'div', delay = 0 }: { children: ReactNode; className?: string; as?: 'div' | 'li' | 'article'; delay?: number }) {
  const [ref, inView] = useInViewOnce<HTMLElement>(0.15);
  return (
    <Tag
      ref={ref as never}
      className={`sn-reveal ${inView ? 'is-in' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

function DrawCheck({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`sn-check shrink-0 ${className}`} aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#1B7A4E" />
      <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** "On a computer? Send it to yourself" – disclosure with QR code + copy link (desktop only). */
function SendToSelf({ c, tone = 'light' }: { c: SenearContent; tone?: 'light' | 'dark' }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const panelId = `send-self-${tone}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PLAY_STORE_URL);
    } catch {
      /* clipboard may be blocked – the URL is still visible for manual copy */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  };

  const dark = tone === 'dark';
  return (
    <div className="hidden md:block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className={`inline-flex min-h-11 items-center gap-2 rounded-lg text-[15px] font-semibold underline decoration-2 underline-offset-4 cursor-pointer ${
          dark ? 'text-[#E8D5B0] decoration-[#E8D5B0]/40 hover:decoration-[#E8D5B0]' : 'text-[#14593A] decoration-[#1B7A4E]/30 hover:decoration-[#1B7A4E]'
        } ${FOCUS_RING}`}
      >
        <MonitorSmartphone className="h-4 w-4" aria-hidden="true" />
        {c.sendSelf.toggle}
        <ArrowRight className={`h-4 w-4 transition-transform ${open ? 'rotate-90' : ''}`} aria-hidden="true" />
      </button>
      <div id={panelId} className={`step-accordion-collapse ${open ? 'is-expanded' : ''}`}>
        <div className="overflow-hidden">
          <div
            className={`mt-3 flex max-w-md items-center gap-4 rounded-2xl p-4 ${
              dark ? 'bg-white/10 ring-1 ring-white/15' : 'bg-white ring-1 ring-[#E8DFD4] shadow-sm'
            }`}
          >
            <img
              src="/senear-play-qr.png"
              alt={c.sendSelf.qrAlt}
              width={112}
              height={112}
              loading="lazy"
              className="h-28 w-28 shrink-0 rounded-xl bg-white p-1.5"
            />
            <div className="min-w-0 space-y-2 text-left">
              <p className={`font-bold ${dark ? 'text-white' : 'text-[#1F2421]'}`}>{c.sendSelf.title}</p>
              <p className={`text-[15px] leading-snug ${dark ? 'text-stone-200' : 'text-[#4A4744]'}`}>{c.sendSelf.desc}</p>
              <button
                type="button"
                onClick={copy}
                className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-3.5 text-[15px] font-bold cursor-pointer transition-colors ${
                  dark ? 'bg-white text-[#1F2421] hover:bg-[#F5F0EB]' : 'bg-[#EAF5EE] text-[#0F4D31] hover:bg-[#D9EEDF]'
                } ${FOCUS_RING}`}
              >
                {copied ? <Check className="h-4 w-4" strokeWidth={3} /> : <Copy className="h-4 w-4" />}
                <span aria-live="polite">{copied ? c.sendSelf.copied : c.sendSelf.copy}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =====================================================================
   1. HERO
   ===================================================================== */

function Hero({
  c,
  lang,
  onNavigate,
  ctaRef,
}: {
  c: SenearContent;
  lang: SenearLang;
  onNavigate: (route: AppRoute) => void;
  ctaRef: React.Ref<HTMLAnchorElement>;
}) {
  const outline = `inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-[#1B7A4E]/25 bg-white px-4 text-[15px] font-semibold text-[#1F2421] transition-all hover:border-[#1B7A4E] hover:bg-[#F1F8F3] hover:-translate-y-0.5 cursor-pointer ${FOCUS_RING}`;

  return (
    <section className="relative border-b border-[#E8DFD4] bg-gradient-to-b from-[#FBF9F5] via-[#F7F1E9] to-[#F3EBDF]">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-14 lg:pt-8 lg:pb-20">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-[#5C5A56]">
          <button type="button" onClick={() => onNavigate('home')} className={`rounded hover:text-[#1F2421] cursor-pointer ${FOCUS_RING}`}>
            {c.breadcrumbHome}
          </button>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="font-semibold text-[#1F2421]" aria-current="page">SENEAR</span>
        </nav>

        <div className="grid grid-cols-1 items-center gap-x-8 gap-y-10 lg:grid-cols-12 lg:grid-rows-[auto_auto] lg:gap-y-8">
          <div className="lg:col-span-7 lg:row-start-1 space-y-6">
            <div className="flex items-center gap-3">
              <img src="/logos/senear-logo.png" alt="" width={48} height={48} className="h-12 w-12 object-contain" />
              <div>
                <div className="font-heading text-2xl font-extrabold leading-none tracking-tight">SENEAR</div>
                <div className="mt-1 text-[15px] font-semibold text-[#7A5A2E]">{c.kicker}</div>
              </div>
            </div>

            <h1 className="font-heading text-[2.35rem] leading-[1.05] sm:text-5xl lg:text-[3.6rem] font-extrabold tracking-tight text-balance">
              {c.hero.title1}{' '}
              <span className="text-[#1B7A4E]">{c.hero.title2}</span>
            </h1>

            <p className="max-w-xl text-lg sm:text-xl leading-relaxed text-[#3F3C38] text-pretty">{c.hero.lead}</p>

            <div className="space-y-3 pt-1">
              <PlayButton label={c.hero.primaryCta} anchorRef={ctaRef} className="w-full sm:w-auto" />
              <p className="flex items-start gap-2 text-[15px] font-medium text-[#3F3C38]">
                <Smartphone className="mt-0.5 h-4 w-4 shrink-0 text-[#1B7A4E]" aria-hidden="true" />
                <span>{c.hero.androidNote}</span>
              </p>
              <SendToSelf c={c} />
            </div>
          </div>

          {/* On mobile the phone comes right after the main CTA; on desktop it spans both rows on the right. */}
          <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:row-span-2">
            <CallFilterPhone lang={lang} copy={c.hero} />
          </div>

          <div className="lg:col-span-7 lg:row-start-2 self-start">
            <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <a href="#igy-mukodik" onClick={(e) => { e.preventDefault(); scrollToSection('igy-mukodik'); }} className={outline}>
                <ArrowDown className="h-4 w-4 text-[#1B7A4E]" aria-hidden="true" />
                {c.hero.howBtn}
              </a>
              <a href="#kozelebbrol" onClick={(e) => { e.preventDefault(); scrollToSection('kozelebbrol'); }} className={outline}>
                <PlayCircle className="h-4 w-4 text-[#1B7A4E]" aria-hidden="true" />
                {c.hero.videoBtn}
              </a>
              <a href="/senear/setup" onClick={(e) => { e.preventDefault(); onNavigate('senear-setup'); }} className={outline}>
                <BookOpen className="h-4 w-4 text-[#1B7A4E]" aria-hidden="true" />
                {c.hero.guideBtn}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   2. SOUND FAMILIAR?
   ===================================================================== */

const SCENARIO_ICONS = { scam: PhoneOff, muted: VolumeX, distance: MapPinned } as const;

function Scenarios({ c }: { c: SenearContent }) {
  return (
    <section className="py-16 sm:py-24 bg-white" aria-labelledby="scenarios-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center space-y-3">
          <Eyebrow>{c.scenarios.eyebrow}</Eyebrow>
          <h2 id="scenarios-title" className="font-heading text-[2rem] sm:text-[2.6rem] leading-[1.1] font-extrabold tracking-tight">
            {c.scenarios.title}
          </h2>
        </div>

        {/* Subgrid: icon / quote / solution rows line up across the three cards */}
        <ul className="mt-12 grid gap-6 md:grid-cols-3 md:grid-rows-[auto_1fr_auto]">
          {c.scenarios.items.map((item, i) => {
            const Icon = SCENARIO_ICONS[item.icon];
            return (
              <Reveal
                as="li"
                key={item.icon}
                delay={i * 90}
                className="grid gap-5 rounded-3xl bg-[#FAF7F2] p-6 sm:p-7 md:row-span-3 md:grid-rows-subgrid"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#7A5A2E] shadow-[0_6px_16px_-8px_rgba(122,90,46,0.45)]">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <blockquote className="font-heading text-xl sm:text-[1.45rem] font-bold leading-snug text-[#1F2421] text-pretty">
                  {item.quote}
                </blockquote>
                <div className="rounded-2xl border-l-4 border-[#1B7A4E] bg-[#EAF5EE] p-4">
                  <p className="flex items-center gap-1.5 text-sm font-extrabold uppercase tracking-wide text-[#0F4D31]">
                    <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                    {c.scenarios.solutionLabel}
                  </p>
                  <p className="mt-1.5 text-base leading-relaxed text-[#1F2421]">{item.solution}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* =====================================================================
   3A. TWO MODES (no prices)
   ===================================================================== */

function Modes({ c }: { c: SenearContent }) {
  return (
    <section className="py-16 sm:py-24" aria-labelledby="modes-title">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center space-y-3">
          <Eyebrow>{c.modes.eyebrow}</Eyebrow>
          <h2 id="modes-title" className="font-heading text-[2rem] sm:text-[2.6rem] leading-[1.1] font-extrabold tracking-tight">
            {c.modes.title}
          </h2>
          <p className="text-lg leading-relaxed text-[#4A4744]">{c.modes.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {c.modes.items.map((mode, i) => {
            const free = i === 0;
            const Icon = free ? Smartphone : HeartHandshake;
            return (
              <Reveal as="article" key={mode.title} delay={i * 110} className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_18px_40px_-28px_rgba(31,36,33,0.4)] ring-1 ring-[#EDE4D8]">
                <div className="flex-1 p-6 sm:p-8">
                  <div className="flex items-center gap-4">
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white ${
                        free ? 'bg-[#1B7A4E]' : 'bg-gradient-to-br from-[#B08A55] to-[#7A5A2E]'
                      }`}
                    >
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-heading text-xl sm:text-2xl font-extrabold leading-tight">{mode.title}</h3>
                      <p className="text-base text-[#5C5A56]">{mode.body}</p>
                    </div>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {mode.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-base leading-snug text-[#1F2421]">
                        <DrawCheck className="mt-0.5 h-5 w-5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className={`flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-6 sm:px-8 py-4 font-extrabold ${
                    free ? 'bg-[#1B7A4E] text-white text-lg' : 'bg-[#F7EFE2] text-[#5E4521] text-base'
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    {free ? <Sparkles className="h-5 w-5" aria-hidden="true" /> : <Clock className="h-5 w-5" aria-hidden="true" />}
                    {mode.band}
                  </span>
                  {!free && (
                    <a
                      href="#arak"
                      onClick={(e) => { e.preventDefault(); scrollToSection('arak'); }}
                      className={`inline-flex min-h-11 items-center gap-1 whitespace-nowrap rounded-lg px-2 text-[15px] font-bold text-[#5E4521] underline decoration-2 underline-offset-4 hover:text-[#1F2421] ${FOCUS_RING}`}
                    >
                      {c.modes.pricesLink}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   4. HOW IT WORKS + TWO PHONES, ONE STORY (unified section)
   ===================================================================== */

const HOW_ICONS = [Smartphone, CloudCog, Users];

function HowItWorks({ c }: { c: SenearContent }) {
  const [open, setOpen] = useState(false);
  // Same container + grid for steps and spec columns, so the lists sit exactly under their step.
  const grid = 'grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8';

  return (
    <section
      id="igy-mukodik"
      className="scroll-mt-24 py-16 sm:py-24 bg-gradient-to-b from-[#F3EBDF] via-[#FAF7F2] to-white"
      aria-labelledby="how-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center space-y-3">
          <Eyebrow>{c.how.eyebrow}</Eyebrow>
          <h2 id="how-title" className="font-heading text-[2rem] sm:text-[2.6rem] leading-[1.1] font-extrabold tracking-tight text-balance">
            {c.how.title}
          </h2>
          <p className="text-lg leading-relaxed text-[#4A4744] text-pretty">{c.how.subtitle}</p>
        </div>

        {/* 3 steps */}
        <div className="relative mt-12">
          {/* Connector through the column centres: (100% - 2 gaps) / 6 from each side */}
          <div
            aria-hidden="true"
            className="absolute top-10 hidden h-0.5 md:block bg-[repeating-linear-gradient(90deg,#C5A880_0_10px,transparent_10px_18px)]"
            style={{ left: 'calc((100% - 4rem) / 6)', right: 'calc((100% - 4rem) / 6)' }}
          />
          <ol className={grid}>
            {c.how.steps.map((step, i) => {
              const Icon = HOW_ICONS[i];
              return (
                <Reveal as="li" key={step.title} delay={i * 100} className="relative flex flex-col items-center text-center">
                  <span className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white ring-2 ring-[#C5A880] shadow-[0_10px_24px_-12px_rgba(31,36,33,0.35)]">
                    <Icon className="h-9 w-9 text-[#1F2421]" aria-hidden="true" />
                    <span className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#1B7A4E] text-sm font-black text-white">
                      {i + 1}
                    </span>
                  </span>
                  <h3 className="mt-4 font-heading text-xl sm:text-2xl font-extrabold">{step.title}</h3>
                  <p className="mt-1.5 max-w-xs text-base leading-relaxed text-[#4A4744]">{step.desc}</p>
                </Reveal>
              );
            })}
          </ol>
        </div>

        {/* Live two-phone visual with real portraits */}
        <div className="mt-12 rounded-3xl bg-white/75 p-5 sm:p-8 ring-1 ring-[#E8DFD4] shadow-[0_18px_40px_-28px_rgba(31,36,33,0.35)]">
          <RemoteSetupStory copy={c.story} />
        </div>

        <p className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-base sm:text-lg text-[#1F2421]">
          <Clock className="h-5 w-5 text-[#7A5A2E]" aria-hidden="true" />
          <span className="font-semibold">{c.how.setupTime}</span>
          <a
            href="#kozelebbrol"
            onClick={(e) => { e.preventDefault(); scrollToSection('kozelebbrol'); }}
            className={`inline-flex min-h-11 items-center gap-1 rounded-lg font-bold text-[#14593A] underline decoration-2 underline-offset-4 ${FOCUS_RING}`}
          >
            {c.how.setupTimeLink}
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </a>
        </p>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="how-specs"
            className={`inline-flex min-h-12 items-center gap-2.5 rounded-2xl border-2 border-[#C5A880] bg-white px-5 text-base font-bold text-[#1F2421] transition-colors hover:bg-[#FBF5EA] cursor-pointer ${FOCUS_RING}`}
          >
            {open ? c.how.specsClose : c.how.specsOpen}
            <ChevronDown className={`h-5 w-5 text-[#7A5A2E] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
        </div>

        <div id="how-specs" className={`step-accordion-collapse ${open ? 'is-expanded' : ''}`}>
          <div className="overflow-hidden">
            <div className={`${grid} pt-10`}>
              {c.how.specs.map((list, i) => (
                <div key={c.how.specTitles[i]}>
                  <h4 className="flex items-center gap-2 border-b-2 border-[#EDE4D8] pb-3 font-heading text-lg font-extrabold">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1B7A4E] text-sm font-black text-white">{i + 1}</span>
                    {c.how.specTitles[i]}
                  </h4>
                  <ul className="mt-4 space-y-3">
                    {list.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-base leading-snug text-[#1F2421]">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#1B7A4E]" strokeWidth={3} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   5. VIDEO (chaptered, YouTube loaded on demand)
   ===================================================================== */

function VideoSection({ c }: { c: SenearContent }) {
  const v = c.video;
  const [active, setActive] = useState(0);
  const [start, setStart] = useState(v.chapters[0].seconds);
  const [playing, setPlaying] = useState(false);
  const [playKey, setPlayKey] = useState(0);
  const playerRef = useRef<HTMLDivElement>(null);

  // Reset when the language (and with it the video) changes.
  useEffect(() => {
    setActive(0);
    setStart(v.chapters[0].seconds);
    setPlaying(false);
  }, [v.videoId, v.chapters]);

  const play = (idx: number) => {
    setActive(idx);
    setStart(v.chapters[idx].seconds);
    setPlaying(true);
    setPlayKey((k) => k + 1);
    if (window.innerWidth < 1024) {
      playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="kozelebbrol" className="scroll-mt-24 py-16 sm:py-24" aria-labelledby="video-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center space-y-3">
          <Eyebrow>{v.eyebrow}</Eyebrow>
          <h2 id="video-title" className="font-heading text-[2rem] sm:text-[2.6rem] leading-[1.1] font-extrabold tracking-tight">
            {v.title}
          </h2>
          <p className="text-lg leading-relaxed text-[#4A4744]">{v.subtitle}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-4">
            <div ref={playerRef} className="relative aspect-video w-full overflow-hidden rounded-3xl bg-[#1F2421] shadow-xl">
              {playing ? (
                <iframe
                  key={`${v.videoId}-${start}-${playKey}`}
                  src={`https://www.youtube-nocookie.com/embed/${v.videoId}?start=${start}&autoplay=1&rel=0`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => play(active)}
                  className={`group absolute inset-0 h-full w-full cursor-pointer ${FOCUS_RING}`}
                  aria-label={`${v.title} – ${v.chapters[active].title}`}
                >
                  <img
                    src={`https://i.ytimg.com/vi/${v.videoId}/maxresdefault.jpg`}
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (!img.src.includes('hqdefault')) img.src = `https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg`;
                    }}
                    alt=""
                    width={1280}
                    height={720}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover opacity-85 transition-opacity group-hover:opacity-100"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#1B7A4E] text-white shadow-2xl transition-transform group-hover:scale-110">
                      <Play className="ml-1 h-9 w-9 fill-current" aria-hidden="true" />
                    </span>
                  </span>
                  <span className="absolute bottom-3 right-3 rounded-lg bg-black/70 px-2.5 py-1 text-sm font-bold text-white tabular-nums">
                    {v.duration}
                  </span>
                </button>
              )}
            </div>

            <div className="flex flex-col gap-2 text-[15px] text-[#3F3C38] sm:flex-row sm:gap-6">
              <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#C5A880]" aria-hidden="true" />{v.leftLegend}</span>
              <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#1B7A4E]" aria-hidden="true" />{v.rightLegend}</span>
            </div>

            <div className="rounded-2xl bg-[#F7EFE2] p-5">
              <h3 className="flex items-center gap-2 font-heading text-lg font-extrabold text-[#1F2421]">
                <ShieldCheck className="h-5 w-5 text-[#7A5A2E]" aria-hidden="true" />
                {v.permissionsTitle}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-[#3F3C38]">{v.permissions}</p>
            </div>
          </div>

          <div className="lg:col-span-4 overflow-hidden rounded-3xl bg-white ring-1 ring-[#EDE4D8] shadow-md">
            <div className="flex items-center justify-between gap-2 border-b border-[#EDE4D8] bg-[#FAF7F2] px-5 py-4">
              <h3 className="font-heading text-base font-extrabold">{v.listTitle}</h3>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-sm font-semibold text-[#5C5A56] ring-1 ring-[#EDE4D8]">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {v.duration}
              </span>
            </div>
            <ol className="max-h-[520px] space-y-1.5 overflow-y-auto p-3">
              {v.chapters.map((ch, idx) => {
                const isActive = active === idx;
                return (
                  <li key={ch.time}>
                    <button
                      type="button"
                      onClick={() => play(idx)}
                      aria-current={isActive ? 'step' : undefined}
                      className={`flex w-full items-start gap-3 rounded-2xl p-3 text-left transition-colors cursor-pointer ${
                        isActive ? 'bg-[#EAF5EE] ring-1 ring-[#1B7A4E]/40' : 'hover:bg-[#FAF7F2]'
                      } ${FOCUS_RING}`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black ${
                          isActive ? 'bg-[#1B7A4E] text-white' : 'bg-[#F3EBDF] text-[#5E4521]'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className="text-base font-bold leading-snug text-[#1F2421]">{ch.title}</span>
                          {ch.highlight && (
                            <span className="rounded-full bg-[#1B7A4E] px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-white">
                              {v.highlightLabel}
                            </span>
                          )}
                        </span>
                        <span className="mt-0.5 block text-[15px] leading-snug text-[#4A4744]">{ch.desc}</span>
                        <span className="mt-1 inline-flex items-center gap-1 font-mono text-sm font-bold text-[#7A5A2E]">
                          <Play className="h-3 w-3 fill-current" aria-hidden="true" />
                          {ch.time}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   3B. PRICING
   ===================================================================== */

function Pricing({ c }: { c: SenearContent }) {
  const p = c.pricing;
  const [yearly, setYearly] = useState(false);
  const perDay = yearly ? p.family.perDay.yearly : p.family.perDay.monthly;

  const planCard = 'flex flex-col rounded-3xl bg-white p-6 sm:p-8';
  const priceRow = 'mt-6 flex flex-wrap items-end gap-x-2';

  return (
    <section id="arak" className="scroll-mt-24 py-16 sm:py-24 bg-gradient-to-b from-[#FAF7F2] to-[#F3EBDF]" aria-labelledby="pricing-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center space-y-3">
          <Eyebrow>{p.eyebrow}</Eyebrow>
          <h2 id="pricing-title" className="font-heading text-[2rem] sm:text-[2.6rem] leading-[1.1] font-extrabold tracking-tight text-balance">
            {p.title}
          </h2>
          <p className="text-lg leading-relaxed text-[#4A4744]">{p.subtitle}</p>
        </div>

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3 lg:gap-5">
          {/* --- Free --- */}
          <Reveal as="article" className={`${planCard} ring-1 ring-[#E3DCD1] lg:my-6`}>
            <h3 className="font-heading text-2xl font-extrabold">{p.free.name}</h3>
            <p className="mt-1 text-base text-[#5C5A56]">{p.free.tagline}</p>
            <div className={priceRow}>
              <span className="whitespace-nowrap font-heading text-5xl font-black tracking-tight">{p.free.price}</span>
              <span className="pb-1.5 text-lg font-bold text-[#1B7A4E]">{p.free.priceSuffix}</span>
            </div>
            <PlanFeatures items={p.free.features} />
            <PlanLink label={p.free.cta} variant="outline" />
          </Reveal>

          {/* --- Family (recommended) --- */}
          <Reveal as="article" delay={90} className={`${planCard} relative z-10 ring-2 ring-[#1B7A4E] shadow-[0_30px_60px_-30px_rgba(27,122,78,0.55)]`}>
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#1B7A4E] px-4 py-1.5 text-sm font-extrabold uppercase tracking-wide text-white shadow-md">
              {p.recommended}
            </span>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="font-heading text-2xl font-extrabold">{p.family.name}</h3>
                <p className="mt-1 text-base text-[#5C5A56]">{p.family.tagline}</p>
              </div>
              <span className="rounded-full bg-[#F7EFE2] px-3 py-1 text-sm font-extrabold text-[#5E4521]">{p.family.trialBadge}</span>
            </div>

            {/* Monthly / yearly switch */}
            <div className="mt-6 relative grid grid-cols-2 rounded-full bg-[#F3EBDF] p-1" role="group" aria-label={`${p.monthly} / ${p.yearly}`}>
              <span
                aria-hidden="true"
                className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-white shadow-sm transition-transform duration-300 ease-out ${
                  yearly ? 'translate-x-full' : 'translate-x-0'
                }`}
              />
              {[false, true].map((isYearly) => (
                <button
                  key={String(isYearly)}
                  type="button"
                  aria-pressed={yearly === isYearly}
                  onClick={() => setYearly(isYearly)}
                  className={`relative z-10 min-h-11 rounded-full text-base font-bold transition-colors cursor-pointer ${
                    yearly === isYearly ? 'text-[#1F2421]' : 'text-[#5C5A56]'
                  } ${FOCUS_RING}`}
                >
                  {isYearly ? p.yearly : p.monthly}
                </button>
              ))}
            </div>

            <div className="mt-5" aria-live="polite">
              <div className="flex flex-wrap items-end gap-x-1.5">
                <span key={String(yearly)} className="sn-pop whitespace-nowrap font-heading text-5xl font-black tracking-tight tabular-nums">
                  {yearly ? p.family.priceYearly : p.family.priceMonthly}
                </span>
                <span className="pb-1.5 text-lg font-bold text-[#5C5A56]">{yearly ? p.family.suffixYearly : p.family.suffixMonthly}</span>
              </div>
              <div className="mt-4 flex items-center gap-4">
                {/* "Less than 50 Ft a day" typographic stamp */}
                <div className="-rotate-3 shrink-0 rounded-2xl border-2 border-dashed border-[#C5A880] bg-[#FBF5EA] px-3.5 py-2 text-center leading-none">
                  <span className="block text-xs font-bold uppercase tracking-wide text-[#5E4521]">{perDay[0]}</span>
                  <span className="mt-1 block whitespace-nowrap font-heading text-[1.7rem] font-black text-[#1F2421]">{perDay[1]}</span>
                  <span className="mt-0.5 block text-xs font-bold uppercase tracking-wide text-[#5E4521]">{perDay[2]}</span>
                </div>
                <p className="text-[15px] font-semibold leading-snug text-[#1B7A4E]">
                  {yearly ? p.family.yearlyNote : p.family.monthlyNote}
                </p>
              </div>
            </div>

            <PlanFeatures items={p.family.features} />
            <PlanLink label={p.family.cta} variant="filled" />
          </Reveal>

          {/* --- Lifetime --- */}
          <Reveal as="article" delay={180} className={`${planCard} ring-1 ring-[#E3DCD1] lg:my-6`}>
            <h3 className="font-heading text-2xl font-extrabold">{p.lifetime.name}</h3>
            <p className="mt-1 text-base text-[#5C5A56]">{p.lifetime.tagline}</p>
            <div className={priceRow}>
              <span className="whitespace-nowrap font-heading text-5xl font-black tracking-tight tabular-nums">{p.lifetime.price}</span>
              <span className="pb-1.5 text-lg font-bold text-[#5C5A56]">{p.lifetime.priceSuffix}</span>
            </div>
            <p className="mt-2 text-[15px] text-[#4A4744]">{p.lifetime.note}</p>
            <PlanFeatures items={p.lifetime.features} />
            <PlanLink label={p.lifetime.cta} variant="outline" />
          </Reveal>
        </div>

        <p className="mx-auto mt-10 flex max-w-3xl items-start justify-center gap-2.5 text-center text-base leading-relaxed text-[#3F3C38]">
          <Lock className="mt-1 h-4 w-4 shrink-0 text-[#7A5A2E]" aria-hidden="true" />
          <span>{p.trust}</span>
        </p>
      </div>
    </section>
  );
}

function PlanFeatures({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 flex-1 space-y-3 border-t border-[#EDE4D8] pt-6">
      {items.map((f) => (
        <li key={f} className="flex items-start gap-3 text-base leading-snug text-[#1F2421]">
          <DrawCheck className="mt-0.5 h-5 w-5" />
          <span>{f}</span>
        </li>
      ))}
    </ul>
  );
}

function PlanLink({ label, variant }: { label: string; variant: 'filled' | 'outline' }) {
  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl px-5 text-base font-bold transition-colors ${
        variant === 'filled'
          ? 'bg-[#1B7A4E] text-white hover:bg-[#145E3B]'
          : 'border-2 border-[#1B7A4E]/30 text-[#14593A] hover:border-[#1B7A4E] hover:bg-[#F1F8F3]'
      } ${FOCUS_RING}`}
    >
      <GooglePlayIcon color="white" className={`h-4 w-4 ${variant === 'filled' ? 'text-white' : 'text-[#1B7A4E]'}`} />
      {label}
    </a>
  );
}

/* =====================================================================
   6. TRUST BAR (+ slot for real reviews later)
   ===================================================================== */

const TRUST_ICONS = [Globe2, Ban, ShieldCheck];

function TrustBar({ c }: { c: SenearContent }) {
  return (
    <section aria-label={c.trustBar.label} className="border-y border-[#E8DFD4] bg-white">
      <ul className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 py-6">
        {c.trustBar.badges.map((b, i) => {
          const Icon = TRUST_ICONS[i];
          return (
            <li key={b} className="inline-flex items-center gap-2.5 text-base font-bold text-[#1F2421]">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F7EFE2] text-[#7A5A2E]">
                <Icon className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              {b}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** Renders only when real testimonials are added to TESTIMONIALS above. */
function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <section className="py-16 bg-white">
      <ul className="mx-auto grid max-w-5xl gap-6 px-4 md:grid-cols-2">
        {items.map((t) => (
          <li key={t.quote} className="rounded-3xl bg-[#FAF7F2] p-6">
            <blockquote className="text-lg leading-relaxed">{t.quote}</blockquote>
            <p className="mt-3 text-sm font-semibold text-[#5C5A56]">
              {t.author} · {t.source}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* =====================================================================
   7. FAQ (first item open by default)
   ===================================================================== */

function Faq({ c }: { c: SenearContent }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section id="gyik" className="scroll-mt-24 py-16 sm:py-24" aria-labelledby="faq-title">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionTitle id="faq-title" eyebrow={c.faq.eyebrow} title={c.faq.title} />
        <div className="mt-10 divide-y divide-[#E8DFD4] border-y border-[#E8DFD4]">
          {c.faq.items.map((item, idx) => {
            const open = openIdx === idx;
            const btnId = `faq-btn-${idx}`;
            const panelId = `faq-panel-${idx}`;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIdx(open ? null : idx)}
                    className={`flex w-full min-h-14 items-center justify-between gap-4 py-5 text-left font-heading text-lg sm:text-xl font-bold text-[#1F2421] cursor-pointer hover:text-[#14593A] ${FOCUS_RING}`}
                  >
                    <span>{item.q}</span>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                        open ? 'bg-[#1B7A4E] text-white' : 'bg-[#F3EBDF] text-[#5E4521]'
                      }`}
                    >
                      <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </span>
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={btnId} className={`step-accordion-collapse ${open ? 'is-expanded' : ''}`}>
                  <div className="overflow-hidden">
                    <p className="pb-6 pr-12 text-base sm:text-lg leading-relaxed text-[#3F3C38]">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   8. FINAL CTA
   ===================================================================== */

function FinalCta({
  c,
  onNavigate,
  sectionRef,
}: {
  c: SenearContent;
  onNavigate: (route: AppRoute) => void;
  sectionRef: React.Ref<HTMLElement>;
}) {
  return (
    <section ref={sectionRef} className="px-4 pb-20 sm:px-6 lg:px-8" aria-labelledby="final-title">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-[#1F2421] px-6 py-14 text-center text-white sm:px-12 sm:py-20">
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(197,168,128,0.35)_0%,transparent_70%)]"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(27,122,78,0.45)_0%,transparent_70%)]"
        />
        <div className="relative mx-auto max-w-2xl space-y-5">
          <h2 id="final-title" className="font-heading text-[2.2rem] leading-[1.08] sm:text-5xl font-extrabold tracking-tight text-balance">
            {c.finalCta.title}
          </h2>
          <p className="text-lg sm:text-xl leading-relaxed text-stone-200">{c.finalCta.text}</p>
          <div className="flex flex-col items-center gap-3 pt-2">
            <PlayButton label={c.hero.primaryCta} className="w-full sm:w-auto" />
            <p className="inline-flex items-center gap-2 text-base font-semibold text-[#E8D5B0]">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              {c.finalCta.trialNote}
            </p>
            <p className="text-[15px] text-stone-300">{c.hero.androidNote}</p>
          </div>
          <div className="flex flex-col items-center gap-2 pt-2">
            <SendToSelf c={c} tone="dark" />
            <a
              href="/senear/setup"
              onClick={(e) => { e.preventDefault(); onNavigate('senear-setup'); }}
              className={`inline-flex min-h-11 items-center gap-2 rounded-lg text-[15px] font-semibold text-white underline decoration-white/40 decoration-2 underline-offset-4 hover:decoration-white ${FOCUS_RING}`}
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              {c.finalCta.guideLink}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
