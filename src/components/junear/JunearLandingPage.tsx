import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Camera,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Gamepad2,
  Globe,
  GraduationCap,
  HeartHandshake,
  KeyRound,
  ListChecks,
  Lock,
  MapPin,
  MessageSquare,
  Phone,
  QrCode,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Usb,
  Users,
  Volume2,
  WifiOff,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { JUNEAR_CONTENT, type JunearLang } from './junearContent';

type SimThemeId =
  | 'OCEAN_BLUE'
  | 'FOREST_EMERALD'
  | 'SUNSET_CORAL'
  | 'COSMIC_VIOLET'
  | 'MIDNIGHT_CYBER';
type SimAgeTier = 'AGE_6_7' | 'AGE_8_9' | 'AGE_10_11' | 'AGE_12_14';
type SimLiteracyMode = 'SYMBOLS_ONLY' | 'EARLY_READER_CAPS' | 'STANDARD_TEXT';

const SIM_THEMES: {
  id: SimThemeId;
  label: string;
  swatch: string;
  phoneBg: string;
  headerBg: string;
  isDark: boolean;
}[] = [
  {
    id: 'OCEAN_BLUE',
    label: 'Ocean Blue',
    swatch: '#0077B5',
    phoneBg: '#F4F8FB',
    headerBg: '#0077B5',
    isDark: false,
  },
  {
    id: 'FOREST_EMERALD',
    label: 'Forest Emerald',
    swatch: '#1E6F30',
    phoneBg: '#F3FAF5',
    headerBg: '#1E6F30',
    isDark: false,
  },
  {
    id: 'SUNSET_CORAL',
    label: 'Sunset Coral',
    swatch: '#B44309',
    phoneBg: '#FFF8F3',
    headerBg: '#B44309',
    isDark: false,
  },
  {
    id: 'COSMIC_VIOLET',
    label: 'Cosmic Violet',
    swatch: '#7C3AED',
    phoneBg: '#F8F5FF',
    headerBg: '#7C3AED',
    isDark: false,
  },
  {
    id: 'MIDNIGHT_CYBER',
    label: 'Midnight Cyber',
    swatch: '#0F172A',
    phoneBg: '#0F172A',
    headerBg: '#1E293B',
    isDark: true,
  },
];

const SIM_AGES: SimAgeTier[] = ['AGE_6_7', 'AGE_8_9', 'AGE_10_11', 'AGE_12_14'];
const SIM_LITERACY: SimLiteracyMode[] = ['SYMBOLS_ONLY', 'EARLY_READER_CAPS', 'STANDARD_TEXT'];

function renderTileIcon(tileId: string, className = 'w-4 h-4') {
  switch (tileId) {
    case 'module_family_caller':
      return <Phone className={className} />;
    case 'module_timetable':
      return <Clock className={className} />;
    case 'module_tasks':
      return <ListChecks className={className} />;
    case 'module_safe_apps':
      return <BookOpen className={className} />;
    case 'module_gaming_hub':
      return <Gamepad2 className={className} />;
    case 'module_camera':
      return <Camera className={className} />;
    case 'module_friends_chat':
      return <MessageSquare className={className} />;
    default:
      return <MapPin className={className} />;
  }
}

function detectJunearLangFromUrl(): JunearLang | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const langParam = params.get('lang')?.toLowerCase();
  if (langParam === 'hu' || langParam === 'de' || langParam === 'en') {
    return langParam;
  }
  const path = window.location.pathname.toLowerCase();
  if (path.startsWith('/hu/') || path === '/hu') return 'hu';
  if (path.startsWith('/de/') || path === '/de') return 'de';
  if (path.startsWith('/en/') || path === '/en') return 'en';
  return null;
}

function resolveInitialJunearLang(contextLang: string): JunearLang {
  const fromUrl = detectJunearLangFromUrl();
  if (fromUrl) return fromUrl;
  if (contextLang === 'hu') return 'hu';
  if (contextLang === 'de') return 'de';
  return 'en';
}

export function JunearLandingPage({ onNavigate }: { onNavigate: (route: any) => void }) {
  const { language } = useLanguage();
  const [lang, setLang] = useState<JunearLang>(() => resolveInitialJunearLang(language));
  const c = JUNEAR_CONTENT[lang];

  useEffect(() => {
    if (!detectJunearLangFromUrl()) {
      setLang(language === 'hu' || language === 'de' ? language : 'en');
    }
  }, [language]);

  const handleSelectLang = (nextLang: JunearLang) => {
    setLang(nextLang);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', nextLang);
      window.history.replaceState(null, '', url.pathname + url.search + url.hash);
    }
  };

  // Interactive Bento Phone Simulator State
  const [simTheme, setSimTheme] = useState<SimThemeId>('OCEAN_BLUE');
  const [simAge, setSimAge] = useState<SimAgeTier>('AGE_8_9');
  const [simLiteracy, setSimLiteracy] = useState<SimLiteracyMode>('STANDARD_TEXT');
  const [spokenPreview, setSpokenPreview] = useState<string>(() => c.simulator.tiles[0].ttsSample);

  // 3-Second Hold SOS Simulator State
  const [sosProgress, setSosProgress] = useState<number>(0);
  const [sosDispatched, setSosDispatched] = useState<boolean>(false);
  const sosTimerRef = useRef<number | null>(null);
  const sosStartRef = useRef<number>(0);

  // Screenshot Carousel & FAQ State
  const [activeScreenIdx, setActiveScreenIdx] = useState<number>(0);
  const [openFaqIdx, setOpenFaqIdx] = useState<number>(0);

  useEffect(() => {
    setSpokenPreview(c.simulator.tiles[0].ttsSample);
  }, [lang, c.simulator.tiles]);

  // Dynamic SEO / Document Title & HTML lang sync on client
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const prevTitle = document.title;
    const prevHtmlLang = document.documentElement.lang;
    document.title = c.meta.title;
    document.documentElement.lang = lang;
    const descEl = document.querySelector('meta[name="description"]');
    const prevDesc = descEl?.getAttribute('content') ?? null;
    descEl?.setAttribute('content', c.meta.description);
    return () => {
      document.title = prevTitle;
      if (prevHtmlLang) document.documentElement.lang = prevHtmlLang;
      if (descEl && prevDesc !== null) descEl.setAttribute('content', prevDesc);
    };
  }, [lang, c.meta.title, c.meta.description]);

  useEffect(() => {
    return () => {
      if (sosTimerRef.current !== null && typeof window !== 'undefined') {
        window.clearInterval(sosTimerRef.current);
      }
    };
  }, []);

  const startSosHold = () => {
    if (sosDispatched || typeof window === 'undefined') return;
    if (sosTimerRef.current !== null) window.clearInterval(sosTimerRef.current);
    sosStartRef.current = Date.now();
    sosTimerRef.current = window.setInterval(() => {
      const elapsed = Date.now() - sosStartRef.current;
      const pct = Math.min(100, Math.round((elapsed / 3000) * 100));
      setSosProgress(pct);
      if (pct >= 100) {
        if (sosTimerRef.current !== null) {
          window.clearInterval(sosTimerRef.current);
          sosTimerRef.current = null;
        }
        setSosDispatched(true);
      }
    }, 50);
  };

  const cancelSosHold = () => {
    if (sosTimerRef.current !== null && typeof window !== 'undefined') {
      window.clearInterval(sosTimerRef.current);
      sosTimerRef.current = null;
    }
    if (!sosDispatched) {
      setSosProgress(0);
    }
  };

  const scrollToSafeguards = () => {
    if (typeof document !== 'undefined') {
      document.getElementById('safeguards')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeThemeMeta = SIM_THEMES.find((t) => t.id === simTheme) || SIM_THEMES[0];
  const visibleTiles =
    simAge === 'AGE_6_7' ? c.simulator.tiles.slice(0, 6) : c.simulator.tiles;

  return (
    <div className="bg-[#FDFBF7] text-[#1F2421] overflow-x-clip">
      {/* =====================================================================
          1. HERO + INTERACTIVE LIVE JUNEAR BENTO PHONE SIMULATOR
         ===================================================================== */}
      <section className="relative border-b border-[#E8DFD4] bg-gradient-to-b from-[#FDFBF7] via-[#F8F5EE] to-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
          {/* Breadcrumb + Local JUNEAR Language Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-[#6E573D]"
            >
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="inline-flex items-center min-h-[32px] px-2.5 py-1 rounded-lg hover:text-[#1F2421] hover:bg-[#EFE9DF] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E6952]"
              >
                {c.breadcrumbHome}
              </button>
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="text-[#0E6952] font-bold px-1">JUNEAR</span>
            </nav>

            <div
              role="group"
              aria-label={
                lang === 'hu'
                  ? 'JUNEAR nyelvválasztó'
                  : lang === 'de'
                    ? 'JUNEAR Sprachauswahl'
                    : 'JUNEAR language selector'
              }
              className="inline-flex items-center gap-1 rounded-xl bg-white border border-[#D8CEBE] p-1 shadow-2xs"
            >
              {(['hu', 'de', 'en'] as const).map((code) => {
                const active = lang === code;
                const fullLabel =
                  code === 'hu' ? 'Magyar (HU)' : code === 'de' ? 'Deutsch (DE)' : 'English (EN)';
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => handleSelectLang(code)}
                    aria-pressed={active}
                    aria-label={fullLabel}
                    className={`inline-flex items-center justify-center min-h-[32px] min-w-[36px] px-2.5 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E6952] ${
                      active
                        ? 'bg-[#0E6952] text-white shadow-2xs'
                        : 'bg-transparent text-[#2C2C2C] hover:bg-[#F5F0EB]'
                    }`}
                  >
                    {code.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Brand, Badges, Headline, CTAs */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCEFEA] border border-[#9FD4C5] text-xs font-bold text-[#134236]">
                  <Globe className="w-3.5 h-3.5 text-[#0E6952]" />
                  {c.hero.euBadge}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F0EB] border border-[#C5A880]/60 text-xs font-bold text-[#4A3B28]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0E6952]" />
                  {c.hero.playBadge}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white border-2 border-[#E8DFD4] shadow-sm p-2 flex items-center justify-center shrink-0">
                  <img
                    src="/logos/junear-logo.png"
                    alt="JUNEAR official J logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-widest text-[#0E6952]">
                    JUNEAR • bond.gabba.junear
                  </div>
                  <div className="text-sm font-semibold text-[#5C5A56]">
                    Ages 6–14 • Android Kiosk + Parent & Teacher PWAs
                  </div>
                </div>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1F2421] leading-[1.12]">
                {c.hero.title}
              </h1>

              <p className="text-base sm:text-lg text-[#4D524F] leading-relaxed">
                {c.hero.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => onNavigate('junear-setup')}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#0E6952] hover:bg-[#0F6B53] text-white text-sm sm:text-base font-bold shadow-md transition-all cursor-pointer"
                >
                  <QrCode className="w-5 h-5" />
                  <span>{c.hero.primaryCta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('junear-usb-setup')}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-[#1F2421] hover:bg-black text-white text-sm font-bold transition-all cursor-pointer"
                >
                  <Usb className="w-4 h-4 text-[#C5A880]" />
                  <span>{c.hero.usbCta}</span>
                </button>

                <button
                  type="button"
                  onClick={scrollToSafeguards}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white border border-[#D8CEBE] hover:border-[#0E6952] text-xs sm:text-sm font-bold text-[#1F2421] transition-all cursor-pointer"
                >
                  <span>{c.hero.secondaryCta}</span>
                </button>
              </div>

              {/* Trust Pills */}
              <ul className="space-y-2 pt-2">
                {c.hero.trustPills.map((pill) => (
                  <li key={pill} className="flex items-center gap-2.5 text-sm font-medium text-[#3A3F3C]">
                    <span className="w-5 h-5 rounded-full bg-[#DCEFEA] text-[#0E6952] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    </span>
                    <span>{pill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Interactive Live JUNEAR Bento Phone Simulator */}
            <div className="lg:col-span-6 bg-white rounded-[2rem] border-2 border-[#E8DFD4] shadow-xl p-5 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#0E6952]">
                  <Sparkles className="w-3.5 h-3.5" />
                  {c.simulator.kicker}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F1FAF8] border border-[#9FD4C5] text-[11px] font-bold text-[#134236]">
                  <Volume2 className="w-3.5 h-3.5 text-[#0E6952]" />
                  {c.simulator.noemiVoiceBadge}
                </span>
              </div>

              {/* Interactive Controls: 5 Themes + 4 Age Tiers + 3 Literacy Modes */}
              <div className="space-y-3 bg-[#FAF7F2] rounded-2xl p-3.5 border border-[#E8DFD4]">
                {/* 5 Child Themes */}
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#7A6B56] mb-1.5">
                    {c.simulator.themeLabel}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {SIM_THEMES.map((th) => {
                      const active = simTheme === th.id;
                      return (
                        <button
                          key={th.id}
                          type="button"
                          onClick={() => setSimTheme(th.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                            active
                              ? 'bg-[#1F2421] text-white border-[#1F2421]'
                              : 'bg-white text-[#2C2C2C] border-[#D8CEBE] hover:border-[#0E6952]'
                          }`}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-white/40"
                            style={{ backgroundColor: th.swatch }}
                          />
                          <span>{th.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4 Age Tiers + 3 Literacy Modes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#7A6B56] mb-1">
                      {c.simulator.ageLabel}
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      {SIM_AGES.map((tier) => (
                        <button
                          key={tier}
                          type="button"
                          onClick={() => setSimAge(tier)}
                          className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            simAge === tier
                              ? 'bg-[#0E6952] text-white border-[#0E6952]'
                              : 'bg-white text-[#2C2C2C] border-[#D8CEBE]'
                          }`}
                        >
                          {c.simulator.ageLabels[tier]}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#7A6B56] mb-1">
                      {c.simulator.literacyLabel}
                    </div>
                    <div className="space-y-1">
                      {SIM_LITERACY.map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setSimLiteracy(mode)}
                          className={`w-full py-1 px-2.5 rounded-xl text-left text-[11px] font-bold border transition-all cursor-pointer ${
                            simLiteracy === mode
                              ? 'bg-[#0077B5] text-white border-[#0077B5]'
                              : 'bg-white text-[#2C2C2C] border-[#D8CEBE]'
                          }`}
                        >
                          {c.simulator.literacyLabels[mode]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Simulated JUNEAR Phone Frame */}
              <div
                className="rounded-[2rem] border-[6px] border-[#1F2421] shadow-inner overflow-hidden transition-colors duration-300"
                style={{ backgroundColor: activeThemeMeta.phoneBg }}
              >
                {/* Phone Top Greeting & Kiosk Shield Header */}
                <div
                  className="px-4 py-3 text-white flex items-center justify-between gap-2 transition-colors"
                  style={{ backgroundColor: activeThemeMeta.headerBg }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-white p-1 flex items-center justify-center shrink-0">
                      <img
                        src="/logos/junear-logo.png"
                        alt="J"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-extrabold leading-tight">
                        JUNEAR • Bence ({c.simulator.ageLabels[simAge]})
                      </div>
                      <div className="text-[10px] opacity-90">{c.simulator.kioskShieldBadge}</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-black/30 text-white text-[10px] font-mono font-bold">
                    84%
                  </span>
                </div>

                <div className="p-3.5 space-y-2.5">
                  {/* Age 6-7 Quick-Dial Family Portraits Strip */}
                  {simAge === 'AGE_6_7' && (
                    <div
                      className={`rounded-2xl p-2.5 border flex items-center justify-around gap-2 ${
                        activeThemeMeta.isDark
                          ? 'bg-[#162235] border-sky-500/30 text-white'
                          : 'bg-white border-emerald-200 text-slate-900'
                      }`}
                    >
                      {[
                        { label: 'ANYA', iso: 'HU +36', hex: '#0E6952' },
                        { label: 'APA', iso: 'AT +43', hex: '#1E6FD9' },
                        { label: 'NAGYMAMA', iso: 'DE +49', hex: '#7030A0' },
                      ].map((p) => (
                        <button
                          key={p.label}
                          type="button"
                          onClick={() => setSpokenPreview(c.simulator.tiles[0].ttsSample)}
                          className="flex flex-col items-center gap-1 cursor-pointer"
                        >
                          <span
                            className="w-9 h-9 rounded-full text-white flex items-center justify-center shadow-xs"
                            style={{ backgroundColor: p.hex }}
                          >
                            <Phone className="w-4 h-4" />
                          </span>
                          <span className="text-[10px] font-extrabold">{p.label}</span>
                          <span className="text-[9px] font-mono opacity-70">{p.iso}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Age 10-11 & 12-14 Top Timetable & Autonomous Quota Banner */}
                  {(simAge === 'AGE_10_11' || simAge === 'AGE_12_14') && (
                    <div
                      className={`rounded-2xl p-2.5 border space-y-1.5 ${
                        activeThemeMeta.isDark
                          ? 'bg-[#162235] border-sky-400/30 text-sky-100'
                          : 'bg-white border-amber-200 text-slate-800'
                      }`}
                    >
                      <div className="text-[11px] font-bold flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#CA7B08] shrink-0" />
                        <span className="truncate">{c.simulator.timetableBanner}</span>
                      </div>
                      <div className="text-[10px] font-semibold flex items-center justify-between gap-2">
                        <span>{c.simulator.quotaBarLabel}</span>
                        <span className="px-1.5 py-0.5 rounded bg-[#A83810] text-white font-bold">
                          75%
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Playful Multi-Color Bento Tile Grid */}
                  <div
                    className={`grid gap-2.5 ${
                      simAge === 'AGE_12_14' ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2'
                    }`}
                  >
                    {visibleTiles.map((tile) => {
                      const darkSurface = '#162235';
                      return (
                        <button
                          key={tile.id}
                          type="button"
                          onClick={() => setSpokenPreview(tile.ttsSample)}
                          className="rounded-2xl border-2 text-left overflow-hidden transition-transform active:scale-[0.98] cursor-pointer flex flex-col justify-between"
                          style={{
                            backgroundColor: activeThemeMeta.isDark ? darkSurface : '#FFFFFF',
                            borderColor: activeThemeMeta.isDark
                              ? `${tile.solidHex}88`
                              : tile.borderHex,
                          }}
                        >
                          {/* Pastel Rounded Header + Solid Accent Icon Circle */}
                          <div
                            className="px-3 py-2.5 rounded-b-2xl flex items-center justify-between"
                            style={{
                              backgroundColor: activeThemeMeta.isDark
                                ? `${tile.solidHex}33`
                                : tile.pastelHex,
                            }}
                          >
                            <span
                              className={`${
                                simLiteracy === 'SYMBOLS_ONLY' ? 'w-10 h-10 mx-auto' : 'w-8 h-8'
                              } rounded-full text-white flex items-center justify-center shadow-xs`}
                              style={{ backgroundColor: tile.solidHex }}
                            >
                              {renderTileIcon(
                                tile.id,
                                simLiteracy === 'SYMBOLS_ONLY' ? 'w-5 h-5' : 'w-4 h-4'
                              )}
                            </span>

                            {simLiteracy !== 'SYMBOLS_ONLY' && (
                              <Volume2
                                className="w-3.5 h-3.5 opacity-75"
                                style={{
                                  color: activeThemeMeta.isDark ? '#F8FAFC' : tile.solidHex,
                                }}
                              />
                            )}
                          </div>

                          {/* Tile Body */}
                          <div className="p-2.5 space-y-1.5">
                            {simLiteracy === 'SYMBOLS_ONLY' ? (
                              <div
                                className="w-full py-1 rounded-full text-center text-[10px] font-extrabold text-white"
                                style={{ backgroundColor: tile.solidHex }}
                              >
                                TTS
                              </div>
                            ) : simLiteracy === 'EARLY_READER_CAPS' ? (
                              <div
                                className={`text-xs font-black tracking-wide ${
                                  activeThemeMeta.isDark ? 'text-white' : 'text-slate-900'
                                }`}
                              >
                                {tile.caps}
                              </div>
                            ) : (
                              <>
                                <div
                                  className={`text-xs font-extrabold leading-tight ${
                                    activeThemeMeta.isDark ? 'text-white' : 'text-slate-900'
                                  }`}
                                >
                                  {tile.title}
                                </div>
                                {simAge !== 'AGE_12_14' && (
                                  <div
                                    className={`text-[10px] leading-snug line-clamp-1 ${
                                      activeThemeMeta.isDark ? 'text-slate-300' : 'text-slate-600'
                                    }`}
                                  >
                                    {tile.status}
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Live Spoken Voice Readout Bar */}
                  <div
                    className={`rounded-xl px-3 py-2 border text-[11px] font-semibold flex items-center gap-2 ${
                      activeThemeMeta.isDark
                        ? 'bg-slate-900/90 border-cyan-500/40 text-cyan-200'
                        : 'bg-[#F1FAF8] border-[#9FD4C5] text-[#134236]'
                    }`}
                  >
                    <Volume2 className="w-4 h-4 shrink-0 text-[#0E6952]" />
                    <span className="leading-snug">{spokenPreview}</span>
                  </div>

                  {/* 3-Second Continuous Press-and-Hold SOS Bar */}
                  <div className="pt-0.5">
                    {sosDispatched ? (
                      <div className="rounded-2xl bg-emerald-700 text-white px-3.5 py-2.5 flex items-center justify-between gap-2 text-xs font-extrabold">
                        <span>{c.simulator.sosDispatchedLabel}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setSosDispatched(false);
                            setSosProgress(0);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white text-emerald-900 text-[11px] font-bold cursor-pointer"
                        >
                          {c.simulator.sosResetBtn}
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onMouseDown={startSosHold}
                        onMouseUp={cancelSosHold}
                        onMouseLeave={cancelSosHold}
                        onTouchStart={startSosHold}
                        onTouchEnd={cancelSosHold}
                        className="relative w-full overflow-hidden rounded-2xl bg-[#DC2626] hover:bg-[#B91C1C] text-white py-2.5 px-4 text-xs font-extrabold tracking-wide select-none cursor-pointer shadow-sm"
                      >
                        <span
                          className="absolute inset-y-0 left-0 bg-amber-400/45 transition-all duration-75"
                          style={{ width: `${sosProgress}%` }}
                        />
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <ShieldAlert className="w-4 h-4" />
                          <span>
                            {sosProgress > 0
                              ? `${c.simulator.sosHoldingLabel} (${sosProgress}%)`
                              : c.simulator.sosIdleLabel}
                          </span>
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-center text-xs text-[#6E6B65] font-medium">
                {c.simulator.tapHint}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. SCHOOL LIFECYCLE SECTION (6 -> 14 YRS) & ORTHOGONAL LITERACY
         ===================================================================== */}
      <section className="py-16 sm:py-20 border-b border-[#E8DFD4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#0E6952]">
              {c.lifecycle.kicker}
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2421]">
              {c.lifecycle.title}
            </h2>
            <p className="text-base sm:text-lg text-[#5C5A56] leading-relaxed">
              {c.lifecycle.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {c.lifecycle.tiers.map((tier, idx) => {
              const accents = ['#0E6952', '#1756AD', '#8A5000', '#0F172A'];
              const accent = accents[idx % accents.length];
              return (
                <article
                  key={tier.tierKey}
                  className="rounded-3xl bg-white border-2 border-[#E8DFD4] p-6 flex flex-col justify-between space-y-4 shadow-2xs"
                >
                  <div className="space-y-3">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-extrabold text-white"
                      style={{ backgroundColor: accent }}
                    >
                      {tier.ageBadge}
                    </span>
                    <h3 className="font-heading text-lg font-extrabold text-[#1F2421]">
                      {tier.title}
                    </h3>
                    <p className="text-sm text-[#5C5A56] leading-relaxed">{tier.desc}</p>
                  </div>

                  <ul className="space-y-2 pt-3 border-t border-[#F0EAE1]">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs font-semibold text-[#2C2C2C]">
                        <Check className="w-4 h-4 text-[#0E6952] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          {/* Dyslexia & Natural Voice Callout */}
          <div className="rounded-3xl bg-[#F1FAF8] border-2 border-[#9FD4C5] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[#0E6952] text-white flex items-center justify-center shrink-0">
              <Volume2 className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-heading text-lg sm:text-xl font-extrabold text-[#134236]">
                {c.lifecycle.dyslexiaCalloutTitle}
              </h3>
              <p className="text-sm sm:text-base text-[#24453F] leading-relaxed">
                {c.lifecycle.dyslexiaCalloutBody}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. ALL 8+2 MODULAR BENTO SAFEGUARDS (#safeguards)
         ===================================================================== */}
      <section id="safeguards" className="scroll-mt-20 py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DFD4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#0E6952]">
              {c.safeguards.kicker}
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2421]">
              {c.safeguards.title}
            </h2>
            <p className="text-base sm:text-lg text-[#5C5A56]">{c.safeguards.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {c.safeguards.cards.map((card) => (
              <article
                key={card.id}
                className="rounded-3xl bg-white border-2 overflow-hidden shadow-2xs flex flex-col justify-between"
                style={{ borderColor: card.borderHex }}
              >
                <div>
                  <div
                    className="px-6 py-3.5 border-b flex items-center justify-between gap-2"
                    style={{ backgroundColor: card.pastelHex, borderColor: card.borderHex }}
                  >
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#1F2421]">
                      {card.badge}
                    </span>
                    <span
                      className="w-7 h-7 rounded-full text-white flex items-center justify-center"
                      style={{ backgroundColor: card.accentHex }}
                    >
                      <ShieldCheck className="w-4 h-4" />
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-heading text-lg sm:text-xl font-extrabold text-[#1F2421]">
                      {card.title}
                    </h3>
                    <p className="text-sm text-[#5C5A56] leading-relaxed">{card.desc}</p>
                  </div>
                </div>

                <div className="px-6 pb-6 space-y-2">
                  {card.highlights.map((hl) => (
                    <div
                      key={hl}
                      className="rounded-xl bg-[#FDFBF7] border border-[#E8DFD4] px-3.5 py-2.5 flex items-start gap-2.5 text-xs font-semibold text-[#2C2C2C]"
                    >
                      <Check
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: card.accentHex }}
                        strokeWidth={3}
                      />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. 4-ROLE ECOSYSTEM & STRICT TEACHER GDPR PRIVACY WALL
         ===================================================================== */}
      <section className="py-16 sm:py-20 border-b border-[#E8DFD4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#0E6952]">
              {c.roles.kicker}
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2421]">
              {c.roles.title}
            </h2>
            <p className="text-base sm:text-lg text-[#5C5A56]">{c.roles.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {c.roles.cards.map((role) => {
              const RoleIcon =
                role.id === 'coparent'
                  ? Users
                  : role.id === 'grandparent'
                    ? HeartHandshake
                    : role.id === 'teacher'
                      ? GraduationCap
                      : Smartphone;
              const roleBadgeBg =
                role.id === 'coparent'
                  ? '#005A8C'
                  : role.id === 'grandparent'
                    ? '#1B6B2B'
                    : role.id === 'teacher'
                      ? '#8A5000'
                      : '#0E6952';
              return (
                <article
                  key={role.id}
                  className="rounded-3xl bg-white border-2 border-[#E8DFD4] p-6 space-y-4 shadow-2xs"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span
                        className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold text-white"
                        style={{ backgroundColor: roleBadgeBg }}
                      >
                        {role.badge}
                      </span>
                      <h3 className="mt-2 font-heading text-xl font-extrabold text-[#1F2421]">
                        {role.title}
                      </h3>
                      <p className="text-xs font-bold text-[#6E573D]">{role.platform}</p>
                    </div>
                    <div
                      className="w-11 h-11 rounded-2xl text-white flex items-center justify-center shrink-0"
                      style={{ backgroundColor: roleBadgeBg }}
                    >
                      <RoleIcon className="w-5 h-5" />
                    </div>
                  </div>

                  <p className="text-sm text-[#5C5A56] leading-relaxed">{role.summary}</p>

                  <div className="space-y-2 pt-2">
                    {role.allowed.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-xs font-semibold text-[#1F2421]">
                        <Check className="w-4 h-4 text-[#0E6952] shrink-0 mt-0.5" strokeWidth={3} />
                        <span>{item}</span>
                      </div>
                    ))}
                    {role.blocked.map((b) => (
                      <div
                        key={b}
                        className="flex items-start gap-2 text-xs font-semibold text-rose-800 bg-rose-50/80 rounded-xl px-3 py-2 border border-rose-200"
                      >
                        <Lock className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Server-Enforced GDPR Access Matrix */}
          <div className="rounded-3xl bg-white border-2 border-[#E8DFD4] overflow-hidden shadow-2xs">
            <div className="bg-[#1F2421] text-white px-6 py-4 flex items-center justify-between gap-3 flex-wrap">
              <h3 className="font-heading text-base sm:text-lg font-bold">{c.roles.matrixTitle}</h3>
              <span className="text-xs font-mono text-[#C5A880]">
                firestore.rules + storage.rules (eur3)
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#FAF7F2] border-b border-[#E8DFD4] text-[#4A3B28]">
                    {c.roles.matrixHeaders.map((h) => (
                      <th key={h} className="py-3.5 px-4 font-extrabold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0EAE1]">
                  {c.roles.matrixRows.map((row) => (
                    <tr key={row.scope} className="hover:bg-[#FDFBF7]">
                      <td className="py-3.5 px-4 font-bold text-[#1F2421]">{row.scope}</td>
                      <td className="py-3.5 px-4 font-semibold text-[#005A8C]">{row.coparent}</td>
                      <td className="py-3.5 px-4 font-semibold text-[#1B6B2B]">{row.grandparent}</td>
                      <td className="py-3.5 px-4 font-semibold text-[#6E573D]">{row.teacher}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. NATIVE DEVICE OWNER MDM (3 MODES) & DUAL ANTI-BRICK ESCAPE HATCH
         ===================================================================== */}
      <section className="py-16 sm:py-20 bg-[#1F2421] text-white border-b border-[#2E3530]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#C5A880]">
              {c.mdmAndAntiBrick.kicker}
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold">
              {c.mdmAndAntiBrick.title}
            </h2>
            <p className="text-base sm:text-lg text-stone-300">{c.mdmAndAntiBrick.subtitle}</p>
          </div>

          {/* 3 Provisioning Modes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.mdmAndAntiBrick.modes.map((m, i) => {
              const ModeIcon = i === 0 ? Smartphone : i === 1 ? QrCode : Usb;
              return (
                <div
                  key={m.title}
                  className="rounded-3xl bg-white/5 border border-white/15 p-6 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-[#0E6952]/30 border border-[#0E6952] text-[11px] font-extrabold text-[#8CE6CE]">
                        {m.badge}
                      </span>
                      <ModeIcon className="w-5 h-5 text-[#C5A880]" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-white">{m.title}</h3>
                    <p className="text-sm text-stone-300 leading-relaxed">{m.desc}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onNavigate(m.targetRoute)}
                    className="inline-flex items-center justify-between gap-2 w-full px-4 py-3 rounded-xl bg-white text-[#1F2421] hover:bg-[#F5F0EB] text-xs font-extrabold transition-colors cursor-pointer"
                  >
                    <span>{m.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4 text-[#0E6952]" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Dual Anti-Brick Escape Hatch Guarantee */}
          <div className="rounded-3xl bg-gradient-to-br from-[#28312D] to-[#1A201D] border-2 border-[#C5A880]/50 p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-white">
                {c.mdmAndAntiBrick.antiBrickTitle}
              </h3>
              <p className="text-sm sm:text-base text-stone-300">
                {c.mdmAndAntiBrick.antiBrickSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="rounded-2xl bg-black/30 border border-white/10 p-5 space-y-2.5">
                <div className="flex items-center gap-2.5 text-[#8CE6CE] font-bold text-sm">
                  <KeyRound className="w-5 h-5" />
                  <span>{c.mdmAndAntiBrick.remoteCardTitle}</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {c.mdmAndAntiBrick.remoteCardDesc}
                </p>
              </div>

              <div className="rounded-2xl bg-black/30 border border-[#C5A880]/40 p-5 space-y-3">
                <div className="flex items-center gap-2.5 text-[#F6D5A8] font-bold text-sm">
                  <WifiOff className="w-5 h-5" />
                  <span>{c.mdmAndAntiBrick.offlineCardTitle}</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {c.mdmAndAntiBrick.offlineCardDesc}
                </p>
                <div className="inline-block px-3.5 py-1.5 rounded-xl bg-[#0E6952]/25 border border-[#0E6952] font-mono text-xs font-extrabold text-[#A7F3D0]">
                  {c.mdmAndAntiBrick.sampleOfflineCodeLabel}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. SCREENSHOT SHOWCASE CAROUSEL (/screenshots/junear/junear-{1..4}_{lang}.png)
         ===================================================================== */}
      <section className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DFD4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#0E6952]">
              {c.screenshots.kicker}
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2421]">
              {c.screenshots.title}
            </h2>
            <p className="text-base sm:text-lg text-[#5C5A56]">{c.screenshots.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              {c.screenshots.slides.map((s, idx) => {
                const selected = activeScreenIdx === idx;
                return (
                  <button
                    key={s.index}
                    type="button"
                    onClick={() => setActiveScreenIdx(idx)}
                    className={`w-full text-left p-5 rounded-3xl border-2 transition-all cursor-pointer ${
                      selected
                        ? 'bg-white border-[#0E6952] shadow-md'
                        : 'bg-white/60 border-[#E8DFD4] hover:border-[#C5A880]'
                    }`}
                  >
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#0E6952]">
                      {s.badge}
                    </div>
                    <div className="mt-1 font-heading text-base sm:text-lg font-extrabold text-[#1F2421]">
                      {s.title}
                    </div>
                    <p className="mt-1 text-xs sm:text-sm text-[#5C5A56]">{s.caption}</p>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {c.screenshots.slides.map((s, idx) => {
                const selected = activeScreenIdx === idx;
                return (
                  <button
                    key={s.index}
                    type="button"
                    aria-label={s.title}
                    onClick={() => setActiveScreenIdx(idx)}
                    className={`rounded-[1.6rem] border-4 overflow-hidden bg-[#1F2421] shadow-lg transition-all cursor-pointer min-h-[120px] ${
                      selected
                        ? 'border-[#0E6952] scale-[1.03]'
                        : 'border-[#1F2421] opacity-85 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={`/screenshots/junear/junear-${s.index}_${lang}.png`}
                      alt={s.title}
                      width={1080}
                      height={2400}
                      loading="lazy"
                      className="w-full h-auto block"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. TRANSPARENT FAMILY & SCHOOL PILOT PLANS
         ===================================================================== */}
      <section className="py-16 sm:py-20 border-b border-[#E8DFD4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#0E6952]">
              {c.pricing.kicker}
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2421]">
              {c.pricing.title}
            </h2>
            <p className="text-base sm:text-lg text-[#5C5A56]">{c.pricing.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {c.pricing.plans.map((plan) => (
              <article
                key={plan.planKey}
                className={`rounded-3xl p-5 border-2 flex flex-col justify-between space-y-5 ${
                  plan.featured
                    ? 'bg-[#1F2421] text-white border-[#0E6952] shadow-xl'
                    : 'bg-white text-[#1F2421] border-[#E8DFD4]'
                }`}
              >
                <div className="space-y-3">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                      plan.featured
                        ? 'bg-[#0E6952] text-white'
                        : 'bg-[#F1FAF8] text-[#0E6952]'
                    }`}
                  >
                    {plan.badge}
                  </span>
                  <h3 className="font-heading text-lg font-extrabold">{plan.name}</h3>
                  <div>
                    <div className="text-2xl font-extrabold">{plan.price}</div>
                    <div
                      className={`text-xs ${
                        plan.featured ? 'text-stone-300' : 'text-[#6E6B65]'
                      }`}
                    >
                      {plan.period}
                    </div>
                  </div>
                  <p
                    className={`text-xs leading-relaxed ${
                      plan.featured ? 'text-stone-300' : 'text-[#5C5A56]'
                    }`}
                  >
                    {plan.desc}
                  </p>
                </div>

                <ul className="space-y-2 pt-3 border-t border-current/10">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs font-semibold">
                      <Check className="w-4 h-4 text-[#0E6952] shrink-0 mt-0.5" strokeWidth={3} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="rounded-2xl bg-[#FAF7F2] border border-[#D8CEBE] px-4 py-3 text-xs sm:text-sm font-medium text-[#4D524F]">
            {c.pricing.gdprGateNote}
          </p>
        </div>
      </section>

      {/* =====================================================================
          8. PARENT & SCHOOL FAQ
         ===================================================================== */}
      <section className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DFD4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2 text-center">
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#0E6952]">
              {c.faq.kicker}
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#1F2421]">
              {c.faq.title}
            </h2>
            <p className="text-sm sm:text-base text-[#5C5A56]">{c.faq.subtitle}</p>
          </div>

          <div className="space-y-3">
            {c.faq.items.map((item, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={item.q}
                  className="rounded-2xl bg-white border border-[#E8DFD4] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-heading font-bold text-sm sm:text-base text-[#1F2421] cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#0E6952] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-[#5C5A56] leading-relaxed border-t border-[#F5F0EB] pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          9. FINAL CTA & MANDATORY JUNEAR GDPR ART. 8 LEGAL LINKS
         ===================================================================== */}
      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="rounded-[2.2rem] bg-[#0B4A39] bg-gradient-to-br from-[#0E6952] to-[#083B2D] text-white p-8 sm:p-12 text-center space-y-6 shadow-xl">
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white">
              {c.finalCta.title}
            </h2>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-white">
              {c.finalCta.subtitle}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('junear-setup')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-[#134236] font-extrabold text-sm hover:bg-emerald-50 transition-colors cursor-pointer"
              >
                <QrCode className="w-4 h-4 text-[#0E6952]" />
                <span>{c.finalCta.setupBtn}</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('junear-usb-setup')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#1F2421] text-white font-extrabold text-sm hover:bg-black transition-colors cursor-pointer"
              >
                <Usb className="w-4 h-4 text-[#C5A880]" />
                <span>{c.finalCta.usbBtn}</span>
              </button>
            </div>
          </div>

          {/* Explicit JUNEAR Legal Links Bar */}
          <div className="rounded-2xl bg-white border border-[#E8DFD4] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs font-bold text-[#5C5A56]">{c.finalCta.legalHeading}</div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onNavigate('junear-privacy')}
                className="inline-flex items-center min-h-[32px] px-3 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#DCEFEA] border border-[#D8CEBE] text-xs font-bold text-[#1F2421] cursor-pointer"
              >
                {c.finalCta.privacyLabel}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('junear-terms')}
                className="inline-flex items-center min-h-[32px] px-3 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#DCEFEA] border border-[#D8CEBE] text-xs font-bold text-[#1F2421] cursor-pointer"
              >
                {c.finalCta.termsLabel}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('junear-operations')}
                className="inline-flex items-center min-h-[32px] px-3 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#DCEFEA] border border-[#D8CEBE] text-xs font-bold text-[#1F2421] cursor-pointer"
              >
                {c.finalCta.operationsLabel}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('junear-delete-account')}
                className="inline-flex items-center min-h-[32px] px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-xs font-bold text-rose-900 cursor-pointer"
              >
                {c.finalCta.deleteLabel}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default JunearLandingPage;
