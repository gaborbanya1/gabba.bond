import { useEffect, type MouseEvent } from 'react';
import {
  Activity,
  AlertTriangle,
  Building2,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Database,
  Eye,
  FileCheck2,
  Hash,
  Lock,
  Mail,
  MapPin,
  PhoneCall,
  Printer,
  Scale,
  Server,
  ShieldCheck,
  Smartphone,
  Trash2,
  Users,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { SupportedLanguage } from '../../i18n/types';
import { AppRoute, LegalDocKind, ROUTE_PATHS, buildRouteHref } from '../../routing';
import { FOCUS_RING } from '../senear/hooks';
import {
  GABBA_STUDIO_OPERATOR,
  LEGAL_UI_COPY,
  LegalIconKey,
  LegalLang,
  ProductLegalBundle,
  resolveLegalLang,
} from './legalCore';

export interface LegalPageLayoutProps {
  bundle: ProductLegalBundle;
  activeDoc: LegalDocKind;
  focusDeletion?: boolean;
  onNavigate?: (route: AppRoute) => void;
}

const DOC_ORDER: LegalDocKind[] = ['privacy', 'terms', 'operations'];

const LANG_SWITCH_ITEMS: { code: SupportedLanguage; label: string; aria: string }[] = [
  { code: 'hu', label: 'HU', aria: 'Magyar (HU)' },
  { code: 'de', label: 'DE', aria: 'Deutsch (DE)' },
  { code: 'en', label: 'EN', aria: 'English (EN)' },
];

function renderSectionIcon(icon: LegalIconKey | undefined) {
  switch (icon) {
    case 'smartphone':
      return <Smartphone aria-hidden="true" className="w-5 h-5" />;
    case 'scale':
      return <Scale aria-hidden="true" className="w-5 h-5" />;
    case 'database':
      return <Database aria-hidden="true" className="w-5 h-5" />;
    case 'eye':
      return <Eye aria-hidden="true" className="w-5 h-5" />;
    case 'server':
      return <Server aria-hidden="true" className="w-5 h-5" />;
    case 'trash':
      return <Trash2 aria-hidden="true" className="w-5 h-5" />;
    case 'warning':
      return <AlertTriangle aria-hidden="true" className="w-5 h-5" />;
    case 'credit-card':
      return <CreditCard aria-hidden="true" className="w-5 h-5" />;
    case 'file-check':
      return <FileCheck2 aria-hidden="true" className="w-5 h-5" />;
    case 'activity':
      return <Activity aria-hidden="true" className="w-5 h-5" />;
    case 'phone-call':
      return <PhoneCall aria-hidden="true" className="w-5 h-5" />;
    case 'users':
      return <Users aria-hidden="true" className="w-5 h-5" />;
    case 'lock':
      return <Lock aria-hidden="true" className="w-5 h-5" />;
    default:
      return <ShieldCheck aria-hidden="true" className="w-5 h-5" />;
  }
}

export function LegalPageLayout({
  bundle,
  activeDoc,
  focusDeletion = false,
  onNavigate,
}: LegalPageLayoutProps) {
  const { language, setLanguage } = useLanguage();
  const activeLang: LegalLang = resolveLegalLang(language);
  const ui = LEGAL_UI_COPY[activeLang];
  const operator = GABBA_STUDIO_OPERATOR.byLang[activeLang];
  const docsForLang = bundle.documents[activeLang];
  const doc = docsForLang[activeDoc];
  const deletionHero = bundle.deletionHero?.[activeLang];

  const activeRoute: AppRoute = focusDeletion && bundle.scope.deleteAccountRoute
    ? bundle.scope.deleteAccountRoute
    : bundle.scope.routes[activeDoc];

  const canonicalUrl = `https://gabba.bond${ROUTE_PATHS[activeRoute]}?lang=${activeLang}`;

  // Scroll to hash section if present, or scroll top when switching documents / deletion focus
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const rawHash = window.location.hash.replace(/^#+/, '');
    if (rawHash && !['privacy', 'terms', 'operations', 'aszf', 'agb', 'gdpr'].includes(rawHash.toLowerCase())) {
      const target = document.getElementById(rawHash);
      if (target) {
        const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        setTimeout(() => target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }), 60);
        return;
      }
    }
    if (focusDeletion) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [activeDoc, focusDeletion]);

  const handleSpaRoute = (route: AppRoute) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (!onNavigate || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onNavigate(route);
  };

  const scrollToAnchor = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${id}`);
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#2C2C2C] print:bg-white print:text-black">
      {/* =====================================================================
          STICKY TOP LEGAL SUB-NAVIGATION BAR (3 Docs + HU/DE/EN + Print/PDF)
          ===================================================================== */}
      <div className="sticky top-20 z-30 w-full bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#DFD2BE] shadow-2xs print:hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2.5">
            {/* 3 Legal Document Switcher Tabs */}
            <nav
              aria-label={ui.docSwitcherAria}
              className="flex items-center gap-1.5 overflow-x-auto pb-0.5 lg:pb-0"
            >
              {DOC_ORDER.map((kind) => {
                const targetRoute = bundle.scope.routes[kind];
                const itemDoc = docsForLang[kind];
                const isSelected = activeDoc === kind && !focusDeletion;
                return (
                  <a
                    key={kind}
                    href={buildRouteHref(targetRoute, activeLang)}
                    aria-current={isSelected ? 'page' : undefined}
                    onClick={handleSpaRoute(targetRoute)}
                    className={`inline-flex min-h-10 items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-[#1F2421] text-white shadow-xs'
                        : 'bg-white text-[#3F3C38] border border-[#DFD2BE] hover:bg-[#F3EDE3] hover:text-[#1F2421]'
                    } ${FOCUS_RING}`}
                  >
                    <span>{itemDoc.shortTabLabel}</span>
                  </a>
                );
              })}
            </nav>

            {/* Language Switcher (HU / DE / EN) + Print / Save as PDF */}
            <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2 shrink-0">
              <div
                role="group"
                aria-label={ui.langSwitcherAria}
                className="inline-flex items-center rounded-xl bg-white p-0.5 border border-[#DFD2BE]"
              >
                {LANG_SWITCH_ITEMS.map((opt) => {
                  const isCurrentLang = activeLang === opt.code;
                  return (
                    <button
                      key={opt.code}
                      type="button"
                      aria-label={opt.aria}
                      aria-pressed={isCurrentLang}
                      onClick={() => setLanguage(opt.code)}
                      className={`inline-flex min-h-9 min-w-9 items-center justify-center px-2.5 py-1 rounded-lg text-xs font-extrabold cursor-pointer transition-colors ${
                        isCurrentLang
                          ? 'bg-[#1B7A4E] text-white shadow-2xs'
                          : 'text-[#5C5A56] hover:text-[#1F2421] hover:bg-[#F5F0EB]'
                      } ${FOCUS_RING}`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => window.print()}
                className={`inline-flex min-h-10 items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-[#1F2421] border border-[#9A7B4F] text-xs font-bold hover:bg-[#F5F0EB] transition-colors cursor-pointer ${FOCUS_RING}`}
              >
                <Printer aria-hidden="true" className="w-3.5 h-3.5 text-[#7A5F43] shrink-0" />
                <span>{ui.printBtn}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Legal Document Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-10 print:max-w-none print:px-0 print:py-2 print:space-y-5">
        {/* Print-Only Official Document Masthead */}
        <div className="hidden print:block border-b-2 border-black pb-4 space-y-1 text-xs text-black">
          <div className="font-bold uppercase tracking-wider">
            Gabba Bond Studio · {bundle.scope.productName} — Official Legal Document
          </div>
          <div>
            <strong>{operator.operatorLabel}:</strong> {operator.operatorName} · {operator.hqValue} ·{' '}
            {GABBA_STUDIO_OPERATOR.email}
          </div>
          <div>
            <strong>{ui.canonicalUrlLabel}</strong> {canonicalUrl} ·{' '}
            <strong>{ui.effectiveDateLabel}</strong> {doc.effectiveDateValue}
          </div>
        </div>

        {/* Breadcrumb Trail (Screen Only) */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-[#7A5F43] border-b border-[#E8DFD4] pb-4 print:hidden"
        >
          <a
            href={buildRouteHref('home', activeLang)}
            onClick={handleSpaRoute('home')}
            className={`hover:text-[#1F2421] underline-offset-4 hover:underline rounded-sm px-0.5 ${FOCUS_RING}`}
          >
            {ui.studioHome}
          </a>
          <ChevronRight aria-hidden="true" className="w-3.5 h-3.5" />
          <a
            href={buildRouteHref(bundle.scope.productRoute, activeLang)}
            onClick={handleSpaRoute(bundle.scope.productRoute)}
            className={`hover:text-[#1F2421] underline-offset-4 hover:underline rounded-sm px-0.5 ${FOCUS_RING}`}
          >
            {bundle.scope.productName}
          </a>
          <ChevronRight aria-hidden="true" className="w-3.5 h-3.5" />
          <span className="text-[#1F2421] font-bold">
            {focusDeletion && deletionHero ? deletionHero.title : doc.breadcrumbCurrent}
          </span>
        </nav>

        {/* Dedicated Top Account & Data Deletion View (/delete-account) */}
        {focusDeletion && deletionHero && (
          <section
            id="delete-account-instructions"
            className="scroll-mt-36 bg-gradient-to-br from-[#FFFDF9] to-[#F5F0EB] rounded-3xl p-6 sm:p-8 border-2 border-[#C5A880] shadow-sm space-y-6 print:bg-white print:border-gray-400 print:shadow-none print:break-inside-avoid"
          >
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#1B7A4E] text-white print:bg-transparent print:text-black print:border print:border-black">
                  <Trash2 aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                  <span>{deletionHero.badge}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-950 border border-amber-300">
                  <CheckCircle2 aria-hidden="true" className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                  <span>{deletionHero.irreversibleBadge}</span>
                </span>
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2421] tracking-tight">
                {deletionHero.title}
              </h1>
              <p className="text-sm sm:text-base text-[#4A4743] leading-relaxed">
                {deletionHero.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="rounded-2xl bg-white p-5 border border-[#E8DFD4] space-y-3">
                <h2 className="font-heading text-base sm:text-lg font-bold text-[#1F2421] flex items-center gap-2">
                  <Smartphone aria-hidden="true" className="w-5 h-5 text-[#1B7A4E] shrink-0" />
                  <span>{deletionHero.method1Title}</span>
                </h2>
                <p className="text-xs sm:text-sm text-[#5C5A56] leading-relaxed">
                  {deletionHero.method1Desc}
                </p>
                <ul className="space-y-2 pt-1">
                  {deletionHero.method1Steps.map((step, idx) => (
                    <li
                      key={idx}
                      className="text-xs sm:text-sm text-[#1F2421] leading-relaxed flex items-start gap-2.5 bg-[#FAF8F5] p-3 rounded-xl border border-[#E8DFD4]"
                    >
                      <CheckCircle2 aria-hidden="true" className="w-4 h-4 text-[#1B7A4E] shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-white p-5 border border-[#E8DFD4] flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h2 className="font-heading text-base sm:text-lg font-bold text-[#1F2421] flex items-center gap-2">
                    <Mail aria-hidden="true" className="w-5 h-5 text-[#7A5F43] shrink-0" />
                    <span>{deletionHero.method2Title}</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5C5A56] leading-relaxed">
                    {deletionHero.method2Desc}
                  </p>
                </div>
                <div>
                  <a
                    href={`mailto:${GABBA_STUDIO_OPERATOR.email}?subject=SENEAR%20Account%20and%20Data%20Deletion%20Request`}
                    className={`inline-flex min-h-11 items-center gap-2 px-4 py-3 rounded-xl bg-[#1F2421] text-white text-xs sm:text-sm font-bold hover:bg-[#2C2C2C] transition-colors shadow-xs ${FOCUS_RING}`}
                  >
                    <Mail aria-hidden="true" className="w-4 h-4 text-[#C5A880] shrink-0" />
                    <span>{deletionHero.method2Btn}</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 border border-[#E8DFD4] space-y-3">
              <h2 className="font-heading text-base sm:text-lg font-bold text-[#1F2421] flex items-center gap-2">
                <Database aria-hidden="true" className="w-5 h-5 text-[#7A5F43] shrink-0" />
                <span>{deletionHero.whatDeletedTitle}</span>
              </h2>
              <ul className="space-y-2">
                {deletionHero.whatDeletedItems.map((item, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-[#4A4743] leading-relaxed flex items-start gap-2">
                    <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#1B7A4E] shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 border-t border-[#F0EAE1] text-xs sm:text-sm font-semibold text-[#1F2421]">
                {deletionHero.irreversibleDesc}
              </div>
            </div>
          </section>
        )}

        {/* Document Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 print:hidden">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E9F5EE] text-[#14593A] border border-[#B7DFC9]">
              <ShieldCheck aria-hidden="true" className="w-3.5 h-3.5 text-[#1B7A4E] shrink-0" />
              <span>{doc.badges[0]}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-[#4A4743] border border-[#DFD2BE]">
              <Server aria-hidden="true" className="w-3.5 h-3.5 text-[#7A5F43] shrink-0" />
              <span>{doc.badges[1]}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-[#4A4743] border border-[#DFD2BE]">
              <FileCheck2 aria-hidden="true" className="w-3.5 h-3.5 text-[#7A5F43] shrink-0" />
              <span>{doc.badges[2]}</span>
            </span>
          </div>

          <div className="space-y-2.5">
            {focusDeletion ? (
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2421] tracking-tight">
                {doc.title}
              </h2>
            ) : (
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F2421] tracking-tight">
                {doc.title}
              </h1>
            )}
            <p className="text-xs sm:text-sm font-semibold text-[#7A5F43] print:text-black">
              {ui.effectiveDateLabel}{' '}
              <span className="text-[#1F2421] font-bold">{doc.effectiveDateValue}</span>
              {' · '}
              <span className="text-[#5C5A56] font-normal break-all">{canonicalUrl}</span>
            </p>
            <p className="text-sm sm:text-base text-[#4A4743] leading-relaxed max-w-4xl print:text-black">
              {doc.subtitle}
            </p>
          </div>
        </header>

        {/* Key Highlights Summary Box */}
        <section className="bg-gradient-to-br from-[#2C2C2C] to-[#1F2421] text-white rounded-3xl p-6 sm:p-8 shadow-md border border-[#C5A880]/40 space-y-5 print:bg-white print:from-white print:to-white print:text-black print:border-gray-300 print:shadow-none print:p-4 print:break-inside-avoid">
          <div className="flex items-center gap-2.5">
            <Lock aria-hidden="true" className="w-5 h-5 text-[#C5A880] print:text-black" />
            <h2 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-white print:text-black">
              {doc.quickSummaryTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {doc.quickSummaryItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white/6 border border-white/12 rounded-2xl p-4 space-y-1.5 print:bg-white print:border-gray-300"
              >
                <div className="flex items-center gap-2 text-[#E5CFA8] font-bold text-xs sm:text-sm print:text-black">
                  <CheckCircle2 aria-hidden="true" className="w-4 h-4 text-emerald-400 shrink-0 print:text-black" />
                  <span>{item.title}</span>
                </div>
                <p className="text-xs text-stone-200 leading-relaxed print:text-black">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Table of Contents (Section Anchor Pills — Screen Only) */}
        <nav
          aria-label={ui.tocTitle}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8DFD4] space-y-3 print:hidden"
        >
          <div className="text-xs font-extrabold uppercase tracking-wider text-[#7A5F43]">
            {ui.tocTitle}
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href="#operator"
              onClick={scrollToAnchor('operator')}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#FAF8F5] text-[#2C2C2C] border border-[#E8DFD4] hover:bg-[#F0EAE1] transition-colors ${FOCUS_RING}`}
            >
              <span className="font-bold text-[#7A5F43]">1.</span>
              <span>{operator.operatorLabel}</span>
            </a>
            {doc.sections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                onClick={scrollToAnchor(sec.id)}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#FAF8F5] text-[#2C2C2C] border border-[#E8DFD4] hover:bg-[#F0EAE1] transition-colors ${FOCUS_RING}`}
              >
                <span className="font-bold text-[#7A5F43]">{sec.number}.</span>
                <span>{sec.title.split('(')[0].trim()}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* ===================================================================
            SECTION 1: 80% CORE GABBA BOND STUDIO OPERATOR & IMPRESSUM CARD
            (Strictly NO tax number displayed yet)
            =================================================================== */}
        <section
          id="operator"
          className="scroll-mt-40 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD4] shadow-2xs space-y-5 print:border-gray-300 print:shadow-none print:p-4 print:break-inside-avoid"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#F5F0EB] text-[#7A5F43] flex items-center justify-center font-bold shrink-0 print:hidden">
                <Building2 aria-hidden="true" className="w-5 h-5" />
              </div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#1F2421]">
                {doc.operatorSectionTitle}
              </h2>
            </div>
            <a
              href="#operator"
              onClick={scrollToAnchor('operator')}
              aria-label={`${ui.anchorAriaPrefix} ${doc.operatorSectionTitle}`}
              className={`p-1.5 rounded-lg text-[#7A5F43] hover:text-[#1F2421] hover:bg-[#F5F0EB] print:hidden ${FOCUS_RING}`}
            >
              <Hash aria-hidden="true" className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFD4] print:bg-white print:border-gray-300">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#7A5F43]">
                {operator.operatorLabel}
              </div>
              <div className="text-sm sm:text-base font-bold text-[#1F2421] mt-1">
                {operator.operatorName}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFD4] print:bg-white print:border-gray-300">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#7A5F43]">
                {operator.hqLabel}
              </div>
              <div className="text-sm font-semibold text-[#1F2421] mt-1 flex items-start gap-1.5">
                <MapPin aria-hidden="true" className="w-4 h-4 text-[#7A5F43] shrink-0 mt-0.5 print:hidden" />
                <span>{operator.hqValue}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFD4] print:bg-white print:border-gray-300">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#7A5F43]">
                {operator.emailLabel}
              </div>
              <a
                href={`mailto:${GABBA_STUDIO_OPERATOR.email}`}
                className={`text-sm sm:text-base font-bold text-[#14593A] underline underline-offset-4 hover:text-[#1B7A4E] mt-1 inline-flex items-center gap-1.5 print:text-black ${FOCUS_RING}`}
              >
                <Mail aria-hidden="true" className="w-4 h-4 shrink-0 print:hidden" />
                <span>{GABBA_STUDIO_OPERATOR.email}</span>
              </a>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFD4] print:bg-white print:border-gray-300">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#7A5F43]">
                {operator.cloudLabel}
              </div>
              <div className="text-sm font-semibold text-[#1F2421] mt-1">
                {operator.cloudValue}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFD4] sm:col-span-2 print:bg-white print:border-gray-300">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#7A5F43]">
                {operator.scopeLabel}
              </div>
              <div className="text-sm font-semibold text-[#1F2421] mt-1">
                {bundle.scope.packageOrDomain[activeLang]}
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTIONS 2..N: MODULAR CORE + PRODUCT SECTIONS WITH ANCHOR IDS
            =================================================================== */}
        <div className="space-y-6 print:space-y-4">
          {doc.sections.map((sec) => (
            <section
              key={sec.id}
              id={sec.id}
              className={
                sec.isWarningBox
                  ? 'scroll-mt-40 bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border-2 border-amber-400/90 shadow-xs space-y-5 print:bg-white print:border-black print:shadow-none print:p-4 print:break-inside-avoid'
                  : 'scroll-mt-40 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD4] shadow-2xs space-y-5 print:border-gray-300 print:shadow-none print:p-4 print:break-inside-avoid'
              }
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 print:hidden ${
                      sec.isWarningBox
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-[#F5F0EB] text-[#7A5F43]'
                    }`}
                  >
                    {renderSectionIcon(sec.icon)}
                  </div>
                  <div className="space-y-1.5">
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#1F2421]">
                      {sec.number}. {sec.title}
                    </h2>
                    {sec.intro && (
                      <p className="text-sm sm:text-base text-[#4A4743] leading-relaxed print:text-black">
                        {sec.intro}
                      </p>
                    )}
                  </div>
                </div>

                <a
                  href={`#${sec.id}`}
                  onClick={scrollToAnchor(sec.id)}
                  aria-label={`${ui.anchorAriaPrefix} ${sec.title}`}
                  className={`p-1.5 rounded-lg text-[#7A5F43] hover:text-[#1F2421] hover:bg-[#F5F0EB] shrink-0 print:hidden ${FOCUS_RING}`}
                >
                  <Hash aria-hidden="true" className="w-4 h-4" />
                </a>
              </div>

              {sec.paragraphs && sec.paragraphs.length > 0 && (
                <div className="space-y-3">
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-xs sm:text-sm text-[#4A4743] leading-relaxed print:text-black">
                      {p}
                    </p>
                  ))}
                </div>
              )}

              {sec.subsections && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                  {sec.subsections.map((sub, sIdx) => (
                    <div
                      key={sIdx}
                      className="rounded-2xl p-5 bg-[#FAF8F5] border border-[#E8DFD4] space-y-3 print:bg-white print:border-gray-300 print:p-3.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-heading text-base sm:text-lg font-bold text-[#1F2421]">
                          {sub.subtitle}
                        </h3>
                        {sub.badge && (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E9F5EE] text-[#14593A] border border-[#B7DFC9] print:border-gray-400 print:text-black print:bg-transparent">
                            {sub.badge}
                          </span>
                        )}
                      </div>
                      {sub.paragraphs?.map((p, pIdx) => (
                        <p key={pIdx} className="text-xs sm:text-sm text-[#4A4743] leading-relaxed print:text-black">
                          {p}
                        </p>
                      ))}
                      {sub.bullets && (
                        <ul className="space-y-2.5 pt-1">
                          {sub.bullets.map((b, bIdx) => (
                            <li
                              key={bIdx}
                              className="text-xs sm:text-sm text-[#4A4743] leading-relaxed flex items-start gap-2 print:text-black"
                            >
                              <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#1B7A4E] shrink-0 mt-2" />
                              <span>
                                {b.label && <strong className="text-[#1F2421] font-bold">{b.label} </strong>}
                                {b.text}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {sec.bullets && (
                <ul className="space-y-3 pt-1">
                  {sec.bullets.map((b, bIdx) => (
                    <li
                      key={bIdx}
                      className={`p-4 rounded-2xl text-xs sm:text-sm text-[#4A4743] leading-relaxed flex items-start gap-3 print:bg-white print:border-gray-300 print:text-black print:p-3 ${
                        sec.isWarningBox
                          ? 'bg-amber-50/75 border border-amber-200'
                          : 'bg-[#FAF8F5] border border-[#E8DFD4]/90'
                      }`}
                    >
                      {sec.isWarningBox ? (
                        <AlertTriangle
                          aria-hidden="true"
                          className="w-4 h-4 text-amber-800 shrink-0 mt-0.5 print:hidden"
                        />
                      ) : (
                        <CheckCircle2
                          aria-hidden="true"
                          className="w-4 h-4 text-[#1B7A4E] shrink-0 mt-0.5 print:hidden"
                        />
                      )}
                      <div>
                        {b.label && (
                          <strong className="text-[#1F2421] font-bold block sm:inline mb-0.5 sm:mb-0">
                            {b.label}{' '}
                          </strong>
                        )}
                        <span>{b.text}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {sec.footerNote && (
                <p className="text-xs text-[#5C5A56] pt-2 border-t border-[#F0EAE1]">{sec.footerNote}</p>
              )}
            </section>
          ))}
        </div>

        {/* ===================================================================
            BOTTOM ACTION, CROSS-DOCUMENT SWITCHER & GDPR CONTACT CARD
            =================================================================== */}
        <section
          id="account-deletion"
          className="scroll-mt-40 bg-gradient-to-br from-[#F5F0EB] to-[#EFE7DC] rounded-3xl p-6 sm:p-8 border-2 border-[#C5A880] space-y-6 print:hidden"
        >
          <div className="space-y-2.5 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#1B7A4E] text-white">
              <ShieldCheck aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
              <span>{ui.contactCardBadge}</span>
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#1F2421]">
              {ui.contactCardTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#4A4743] leading-relaxed">
              {ui.contactCardDesc}
            </p>
          </div>

          {/* Cross-links to the 3 Legal Docs + Delete Account */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#7A5F43]">
              {ui.otherDocsHeading}
            </div>
            <div className="flex flex-wrap gap-2">
              {DOC_ORDER.map((kind) => {
                const targetRoute = bundle.scope.routes[kind];
                const isCurrent = activeDoc === kind && !focusDeletion;
                return (
                  <a
                    key={kind}
                    href={buildRouteHref(targetRoute, activeLang)}
                    onClick={handleSpaRoute(targetRoute)}
                    className={`inline-flex min-h-10 items-center px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                      isCurrent
                        ? 'bg-[#1F2421] text-white'
                        : 'bg-white text-[#1F2421] border border-[#C5A880]/70 hover:bg-[#FAF8F5]'
                    } ${FOCUS_RING}`}
                  >
                    {docsForLang[kind].shortTabLabel}
                  </a>
                );
              })}

              {bundle.scope.deleteAccountRoute && (
                <a
                  href={buildRouteHref(bundle.scope.deleteAccountRoute, activeLang)}
                  onClick={handleSpaRoute(bundle.scope.deleteAccountRoute)}
                  className={`inline-flex min-h-10 items-center px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                    focusDeletion
                      ? 'bg-[#1F2421] text-white'
                      : 'bg-white text-[#1F2421] border border-[#C5A880]/70 hover:bg-[#FAF8F5]'
                  } ${FOCUS_RING}`}
                >
                  {ui.deleteAccountBtn}
                </a>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href={`mailto:${GABBA_STUDIO_OPERATOR.email}?subject=${encodeURIComponent(`${bundle.scope.productName} Legal / GDPR Request`)}`}
              className={`inline-flex min-h-11 items-center gap-2 px-5 py-3 rounded-xl bg-[#1F2421] text-white text-xs sm:text-sm font-bold hover:bg-[#2C2C2C] transition-colors shadow-xs ${FOCUS_RING}`}
            >
              <Mail aria-hidden="true" className="w-4 h-4 text-[#C5A880] shrink-0" />
              <span>{ui.contactEmailBtn}</span>
            </a>

            <a
              href={buildRouteHref(bundle.scope.productRoute, activeLang)}
              onClick={handleSpaRoute(bundle.scope.productRoute)}
              className={`inline-flex min-h-11 items-center gap-2 px-4 py-3 rounded-xl bg-white text-[#1F2421] border border-[#9A7B4F] text-xs sm:text-sm font-semibold hover:bg-[#FAF8F5] transition-colors ${FOCUS_RING}`}
            >
              <span>{ui.backToProductBtn(bundle.scope.productName)}</span>
            </a>

            <a
              href={buildRouteHref('home', activeLang)}
              onClick={handleSpaRoute('home')}
              className={`inline-flex min-h-11 items-center gap-2 px-4 py-3 rounded-xl bg-white text-[#1F2421] border border-[#9A7B4F] text-xs sm:text-sm font-semibold hover:bg-[#FAF8F5] transition-colors ${FOCUS_RING}`}
            >
              <span>{ui.backToStudioBtn}</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
