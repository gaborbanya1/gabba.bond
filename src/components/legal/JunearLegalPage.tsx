import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  JUNEAR_DELETION_HERO_CONTENT,
  JUNEAR_DOCUMENTS_BY_TYPE,
  JUNEAR_LEGAL_NAV_LABELS,
  type JunearLegalDocType,
  type JunearLegalLang,
  type JunearLegalSection,
  type JunearLegalTableData,
} from './junearLegalContent';

export type { JunearLegalDocType, JunearLegalLang };

export interface JunearLegalPageProps {
  docType?: JunearLegalDocType;
  focusDeletion?: boolean;
  initialLang?: JunearLegalLang;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onNavigate?: (route: any) => void;
  onBackToHome?: () => void;
  onBackToJunear?: () => void;
}

const DOC_CANONICAL_PATHS: Record<JunearLegalDocType, string> = {
  privacy: '/junear/privacy',
  terms: '/junear/terms',
  operations: '/junear/operations',
};

function detectJunearLangFromUrl(): JunearLegalLang | null {
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

function resolveInitialLegalLang(
  contextLang: string,
  explicitInitial?: JunearLegalLang
): JunearLegalLang {
  if (explicitInitial) return explicitInitial;
  const fromUrl = detectJunearLangFromUrl();
  if (fromUrl) return fromUrl;
  if (contextLang === 'hu') return 'hu';
  if (contextLang === 'de') return 'de';
  return 'en';
}

/* Crisp custom inline SVG vector icons (zero Unicode emojis, zero external icon coupling) */
function ShieldCheckSvg({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2.75L19.25 5.75V11.25C19.25 16.15 16.05 20.35 12 21.5C7.95 20.35 4.75 16.15 4.75 11.25V5.75L12 2.75Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9 12.2L11.1 14.3L15.3 10.1"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ScaleBalanceSvg({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3V20M8 20H16M5 7H19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M5 7L2.75 12.5C2.75 14 4 15 5.25 15C6.5 15 7.75 14 7.75 12.5L5 7Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path
        d="M19 7L16.25 12.5C16.25 14 17.5 15 18.75 15C20 15 21.25 14 21.25 12.5L19 7Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockClosedSvg({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="5" y="10.5" width="14" height="10" rx="2.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M8 10.5V7.5C8 5.29 9.79 3.5 12 3.5C14.21 3.5 16 5.29 16 7.5V10.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="15.5" r="1.4" fill="currentColor" />
    </svg>
  );
}

function ServerEuSvg({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3.5" y="4" width="17" height="6.5" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="3.5" y="13.5" width="17" height="6.5" rx="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="7.5" cy="7.25" r="1" fill="currentColor" />
      <circle cx="7.5" cy="16.75" r="1" fill="currentColor" />
      <path d="M11.5 7.25H16.5M11.5 16.75H16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SmartphoneMdmSvg({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="6.5" y="2.75" width="11" height="18.5" rx="2.5" stroke="currentColor" strokeWidth="2" />
      <path d="M10.5 18H13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function TrashPurgeSvg({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4.5 6.5H19.5M9.5 6.5V4.5C9.5 3.95 9.95 3.5 10.5 3.5H13.5C14.05 3.5 14.5 3.95 14.5 4.5V6.5M6.75 6.5L7.6 19.1C7.68 20.17 8.57 21 9.64 21H14.36C15.43 21 16.32 20.17 16.4 19.1L17.25 6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AlertGuardSvg({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3.75L20.5 19H3.5L12 3.75Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M12 9.5V13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="1" fill="currentColor" />
    </svg>
  );
}

function CheckCircleSvg({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M8.5 12.3L10.9 14.7L15.8 9.8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockWindowSvg({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.75" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 7.5V12.25L15.25 14.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailOutlineSvg({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.25" stroke="currentColor" strokeWidth="2" />
      <path
        d="M4.5 7L12 12.5L19.5 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MapPinOutlineSvg({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 21C16 16.8 18.5 13.6 18.5 9.75C18.5 6.16 15.59 3.25 12 3.25C8.41 3.25 5.5 6.16 5.5 9.75C5.5 13.6 8 16.8 12 21Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.75" r="2.25" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function GlobeOutlineSvg({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M3.5 12H20.5M12 3C14.5 5.6 15.8 8.7 15.8 12C15.8 15.3 14.5 18.4 12 21C9.5 18.4 8.2 15.3 8.2 12C8.2 8.7 9.5 5.6 12 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ChevronRightSvg({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M9 6L15 12L9 18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowLeftSvg({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M19 12H5M11 6L5 12L11 18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BookGuideSvg({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4.5 5.5C4.5 4.67 5.17 4 6 4H11.5V19H6C5.17 19 4.5 18.33 4.5 17.5V5.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M19.5 5.5C19.5 4.67 18.83 4 18 4H12.5V19H18C18.83 19 19.5 18.33 19.5 17.5V5.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function renderSectionIcon(iconKey?: JunearLegalSection['iconKey']) {
  switch (iconKey) {
    case 'controller':
    case 'law':
    case 'plans':
      return <ScaleBalanceSvg className="w-5 h-5" />;
    case 'residency':
    case 'inventory':
      return <ServerEuSvg className="w-5 h-5" />;
    case 'scope':
    case 'mdm':
    case 'cameraChat':
      return <SmartphoneMdmSvg className="w-5 h-5" />;
    case 'teacherWall':
    case 'antiBrick':
      return <AlertGuardSvg className="w-5 h-5" />;
    case 'retention':
    case 'schoolWindow':
      return <ClockWindowSvg className="w-5 h-5" />;
    case 'hmac':
      return <LockClosedSvg className="w-5 h-5" />;
    case 'rights':
    case 'deletion':
      return <TrashPurgeSvg className="w-5 h-5" />;
    default:
      return <ShieldCheckSvg className="w-5 h-5" />;
  }
}

function JunearLegalDataTable({ table }: { table: JunearLegalTableData }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#E8DFD4] bg-white shadow-2xs">
      <table className="w-full min-w-[680px] border-collapse text-left text-xs sm:text-sm">
        <thead>
          <tr className="bg-[#F5F0EB] border-b border-[#E8DFD4] text-[#1F2421]">
            {table.headers.map((header, idx) => (
              <th
                key={idx}
                scope="col"
                className="py-3.5 px-4 font-bold tracking-tight text-xs sm:text-sm align-top"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#EFE8DD]">
          {table.rows.map((row, rIdx) => (
            <tr key={rIdx} className="hover:bg-[#FAF8F5] transition-colors">
              {row.map((cell, cIdx) => (
                <td
                  key={cIdx}
                  className={`py-3.5 px-4 align-top leading-relaxed ${
                    cIdx === 0 ? 'font-semibold text-[#1F2421] w-[28%]' : 'text-[#4A4844]'
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function JunearLegalPage({
  docType = 'privacy',
  focusDeletion = false,
  initialLang,
  onNavigate,
  onBackToHome,
  onBackToJunear,
}: JunearLegalPageProps) {
  const langCtx = useLanguage() as {
    language: string;
    setLanguage?: (next: JunearLegalLang) => void;
  };

  const [activeDocType, setActiveDocType] = useState<JunearLegalDocType>(docType);
  const [activeFocusDeletion, setActiveFocusDeletion] = useState<boolean>(focusDeletion);
  const [activeLang, setActiveLang] = useState<JunearLegalLang>(() =>
    resolveInitialLegalLang(langCtx.language, initialLang)
  );

  useEffect(() => {
    setActiveDocType(docType);
    setActiveFocusDeletion(focusDeletion);
  }, [docType, focusDeletion]);

  useEffect(() => {
    if (!initialLang) {
      setActiveLang(resolveInitialLegalLang(langCtx.language));
    }
  }, [langCtx.language, initialLang]);

  const content =
    JUNEAR_DOCUMENTS_BY_TYPE[activeDocType][activeLang] ??
    JUNEAR_DOCUMENTS_BY_TYPE[activeDocType].hu;
  const navLabels = JUNEAR_LEGAL_NAV_LABELS[activeLang] ?? JUNEAR_LEGAL_NAV_LABELS.hu;
  const deletionHero =
    JUNEAR_DELETION_HERO_CONTENT[activeLang] ?? JUNEAR_DELETION_HERO_CONTENT.hu;

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.title = activeFocusDeletion ? deletionHero.metaTitle : content.metaTitle;
    document.documentElement.lang = activeLang;

    let descEl = document.querySelector('meta[name="description"]');
    if (!descEl) {
      descEl = document.createElement('meta');
      descEl.setAttribute('name', 'description');
      document.head.appendChild(descEl);
    }
    descEl.setAttribute(
      'content',
      activeFocusDeletion ? deletionHero.metaDescription : content.metaDescription
    );
  }, [
    activeLang,
    activeFocusDeletion,
    content.metaTitle,
    content.metaDescription,
    deletionHero.metaTitle,
    deletionHero.metaDescription,
  ]);

  useEffect(() => {
    if (typeof window !== 'undefined' && activeFocusDeletion) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [activeFocusDeletion]);

  const handleSelectLanguage = (nextLang: JunearLegalLang) => {
    setActiveLang(nextLang);
    if (langCtx.setLanguage) {
      langCtx.setLanguage(nextLang);
    }
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', nextLang);
      window.history.replaceState(null, '', url.pathname + url.search + url.hash);
    }
  };

  const syncLangParamInBrowserUrl = () => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    url.searchParams.set('lang', activeLang);
    window.history.replaceState(null, '', url.pathname + url.search + url.hash);
  };

  const goRoute = (targetRoute: string, fallbackHref: string) => {
    syncLangParamInBrowserUrl();
    if (onNavigate) {
      onNavigate(targetRoute);
      return;
    }
    if (targetRoute === 'home' && onBackToHome) {
      onBackToHome();
      return;
    }
    if (targetRoute === 'junear' && onBackToJunear) {
      onBackToJunear();
      return;
    }
    if (typeof window !== 'undefined') {
      window.location.href = fallbackHref;
    }
  };

  const langQuery = `?lang=${activeLang}`;

  const docTabs: {
    id: string;
    docType: JunearLegalDocType;
    isDeletion: boolean;
    route: string;
    label: string;
    href: string;
  }[] = [
    {
      id: 'privacy',
      docType: 'privacy',
      isDeletion: false,
      route: 'junear-privacy',
      label: navLabels.privacyTab,
      href: `${DOC_CANONICAL_PATHS.privacy}${langQuery}`,
    },
    {
      id: 'terms',
      docType: 'terms',
      isDeletion: false,
      route: 'junear-terms',
      label: navLabels.termsTab,
      href: `${DOC_CANONICAL_PATHS.terms}${langQuery}`,
    },
    {
      id: 'operations',
      docType: 'operations',
      isDeletion: false,
      route: 'junear-operations',
      label: navLabels.operationsTab,
      href: `${DOC_CANONICAL_PATHS.operations}${langQuery}`,
    },
    {
      id: 'delete-account',
      docType: 'privacy',
      isDeletion: true,
      route: 'junear-delete-account',
      label: navLabels.deletionTab,
      href: `/junear/delete-account${langQuery}`,
    },
  ];

  const handleTabSelect = (
    e: React.MouseEvent<HTMLAnchorElement>,
    tab: (typeof docTabs)[number]
  ) => {
    e.preventDefault();
    setActiveDocType(tab.docType);
    setActiveFocusDeletion(tab.isDeletion);
    syncLangParamInBrowserUrl();
    if (onNavigate) {
      onNavigate(tab.route);
    } else if (typeof window !== 'undefined') {
      window.history.pushState(null, '', tab.href);
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  };

  return (
    <div
      className="min-h-screen bg-[#FDFBF7] text-[#1F2421] selection:bg-[#0E6952]/20 selection:text-[#1F2421] overflow-x-clip break-words"
      style={{ fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-8 sm:space-y-10">
        {/* Top Bar: Breadcrumb + HU | DE | EN Switcher + Back to JUNEAR */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8DFD4] pb-5">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-[#7A5F43]"
          >
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                goRoute('home', '/');
              }}
              className="inline-flex items-center min-h-[28px] px-1.5 py-1 rounded-md hover:text-[#1F2421] transition-colors cursor-pointer"
            >
              {content.breadcrumbHome}
            </a>
            <ChevronRightSvg className="w-3.5 h-3.5" />
            <a
              href={`/junear${langQuery}`}
              onClick={(e) => {
                e.preventDefault();
                goRoute('junear', `/junear${langQuery}`);
              }}
              className="inline-flex items-center min-h-[28px] px-1.5 py-1 rounded-md hover:text-[#0E6952] font-bold transition-colors cursor-pointer"
            >
              {content.breadcrumbJunear}
            </a>
            <ChevronRightSvg className="w-3.5 h-3.5" />
            <span className="text-[#1F2421] font-bold px-1">
              {activeFocusDeletion ? navLabels.deletionTab : content.breadcrumbCurrent}
            </span>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <GlobeOutlineSvg className="w-3.5 h-3.5 text-[#0E6952]" />
              <span className="text-xs font-medium text-[#5C5A56]">{content.langSwitchLabel}</span>
              <div
                role="group"
                aria-label={content.langSwitchLabel}
                className="inline-flex flex-wrap rounded-xl bg-[#F0EAE1] p-0.5 border border-[#C5A880]/40"
              >
                {(['hu', 'de', 'en'] as const).map((code) => {
                  const isActive = activeLang === code;
                  const labels: Record<JunearLegalLang, string> = {
                    hu: 'HU · Magyar',
                    de: 'DE · Deutsch',
                    en: 'EN · English',
                  };
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => handleSelectLanguage(code)}
                      aria-pressed={isActive}
                      className={`inline-flex items-center min-h-[28px] px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#0E6952] text-white shadow-2xs'
                          : 'text-[#5C5A56] hover:text-[#1F2421]'
                      }`}
                    >
                      {labels[code]}
                    </button>
                  );
                })}
              </div>
            </div>

            <a
              href={`/junear${langQuery}`}
              onClick={(e) => {
                e.preventDefault();
                goRoute('junear', `/junear${langQuery}`);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white text-[#1F2421] border border-[#C5A880]/60 text-xs font-bold hover:bg-[#FAF8F5] transition-colors cursor-pointer"
            >
              <ArrowLeftSvg className="w-3.5 h-3.5 text-[#0E6952]" />
              <span>{navLabels.backToJunearBtn}</span>
            </a>
          </div>
        </div>

        {/* 4-Tab Legal & GDPR Art. 17 Document Switcher */}
        <nav
          aria-label={navLabels.docSwitcherLabel}
          className="rounded-2xl bg-[#F5F0EB] p-2 border border-[#E8DFD4] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2"
        >
          {docTabs.map((tab) => {
            const isCurrent = tab.isDeletion
              ? activeFocusDeletion
              : activeDocType === tab.docType && !activeFocusDeletion;
            return (
              <a
                key={tab.id}
                href={tab.href}
                aria-current={isCurrent ? 'page' : undefined}
                onClick={(e) => handleTabSelect(e, tab)}
                className={`text-center px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center ${
                  isCurrent
                    ? 'bg-[#0E6952] text-white shadow-xs'
                    : 'bg-white/90 text-[#3F3C38] hover:bg-white hover:text-[#1F2421] border border-[#E8DFD4]'
                }`}
              >
                {tab.label}
              </a>
            );
          })}
        </nav>

        {/* Dedicated GDPR Art. 17 Account & Child Data Deletion Hero (/junear/delete-account) */}
        {activeFocusDeletion && (
          <section
            id="junear-delete-account-instructions"
            className="bg-[#FFFDF9] bg-gradient-to-br from-[#FFFDF9] to-[#F5F0EB] rounded-3xl p-6 sm:p-8 border-2 border-[#0E6952]/45 shadow-md space-y-6"
          >
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0E6952] text-white">
                  <TrashPurgeSvg className="w-3.5 h-3.5" />
                  <span>{deletionHero.badge}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  <CheckCircleSvg className="w-3.5 h-3.5 text-amber-800" />
                  <span>{deletionHero.irreversibleBadge}</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2421] tracking-tight">
                {deletionHero.title}
              </h1>
              <p className="text-sm sm:text-base text-[#4A4844] leading-relaxed">
                {deletionHero.subtitle}
              </p>

              <div className="rounded-2xl bg-amber-50/90 border border-amber-300 p-4 flex items-start gap-3 text-xs sm:text-sm text-amber-950">
                <AlertGuardSvg className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">
                  {deletionHero.stepBeforeDeleteNote}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="rounded-2xl bg-white p-5 border border-[#E8DFD4] space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-[#1F2421] flex items-center gap-2">
                  <SmartphoneMdmSvg className="w-5 h-5 text-[#0E6952] shrink-0" />
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
                      <CheckCircleSvg className="w-4 h-4 text-[#0E6952] shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-white p-5 border border-[#E8DFD4] flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h2 className="text-base sm:text-lg font-bold text-[#1F2421] flex items-center gap-2">
                    <MailOutlineSvg className="w-5 h-5 text-[#7A5F43] shrink-0" />
                    <span>{deletionHero.method2Title}</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5C5A56] leading-relaxed">
                    {deletionHero.method2Desc}
                  </p>
                </div>
                <div>
                  <a
                    href="mailto:info@gabba.bond?subject=JUNEAR%20GDPR%20Art.17%20Account%20%26%20Child%20Data%20Deletion"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#1F2421] text-white text-xs sm:text-sm font-bold hover:bg-black transition-colors shadow-xs"
                  >
                    <MailOutlineSvg className="w-4 h-4 text-[#C5A880]" />
                    <span>{deletionHero.method2Btn}</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 border border-[#E8DFD4] space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-[#1F2421] flex items-center gap-2">
                <ServerEuSvg className="w-5 h-5 text-[#7A5F43] shrink-0" />
                <span>{deletionHero.whatDeletedTitle}</span>
              </h2>
              <ul className="space-y-2">
                {deletionHero.whatDeletedItems.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-xs sm:text-sm text-[#4A4844] leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0E6952] shrink-0 mt-2" />
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
        <header className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            {content.badges.map((badge, idx) => (
              <span
                key={idx}
                className={
                  idx === 0
                    ? 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-900 border border-emerald-300'
                    : 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-[#4A4844] border border-[#C5A880]/40'
                }
              >
                {idx === 0 && <ShieldCheckSvg className="w-3.5 h-3.5 text-[#0E6952]" />}
                <span>{badge}</span>
              </span>
            ))}
          </div>

          <div className="space-y-3">
            {activeFocusDeletion ? (
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2421] tracking-tight">
                {content.title}
              </h2>
            ) : (
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F2421] tracking-tight leading-tight">
                {content.title}
              </h1>
            )}
            <p className="text-xs sm:text-sm font-semibold text-[#7A5F43]">
              {content.effectiveDateLabel}{' '}
              <span className="text-[#1F2421] font-bold">{content.effectiveDateValue}</span>
              {' · '}
              {content.versionLabel}{' '}
              <span className="text-[#1F2421] font-bold">{content.versionValue}</span>
              {' · '}
              <span className="font-mono text-xs text-[#0E6952] font-bold">bond.gabba.junear</span>
            </p>
            <p className="text-sm sm:text-base text-[#4A4844] leading-relaxed max-w-4xl">
              {content.subtitle}
            </p>
          </div>
        </header>

        {/* Key Child-Safety Highlights Banner */}
        <section className="bg-[#1F2421] bg-gradient-to-br from-[#1F2421] to-[#132A23] text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-[#0E6952]/40 space-y-5">
          <div className="flex items-center gap-2.5">
            <LockClosedSvg className="w-5 h-5 text-[#C5A880]" />
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              {content.highlightsTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {content.highlights.map((item, idx) => (
              <div
                key={idx}
                className="bg-white/6 border border-white/12 rounded-2xl p-4 space-y-1.5"
              >
                <div className="flex items-center gap-2 text-[#E8D5B0] font-bold text-xs sm:text-sm">
                  <CheckCircleSvg className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{item.title}</span>
                </div>
                <p className="text-xs text-stone-200 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mandatory Operator & EU Data Controller Identification Box */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD4] shadow-2xs space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F5F0EB] text-[#0E6952] flex items-center justify-center font-bold shrink-0 border border-[#E8DFD4]">
              <ScaleBalanceSvg className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1F2421]">
              {content.operatorCard.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFD4]">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#7A5F43]">
                {content.operatorCard.nameLabel}
              </div>
              <div className="text-sm sm:text-base font-extrabold text-[#1F2421] mt-1">
                {content.operatorCard.nameValue}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFD4]">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#7A5F43]">
                {content.operatorCard.emailLabel}
              </div>
              <a
                href={`mailto:${content.operatorCard.emailValue}?subject=JUNEAR%20GDPR%20%26%20Legal%20Inquiry`}
                className="text-sm sm:text-base font-extrabold text-[#0E6952] hover:underline mt-1 inline-flex items-center gap-1.5"
              >
                <MailOutlineSvg className="w-4 h-4 shrink-0" />
                <span>{content.operatorCard.emailValue}</span>
              </a>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFD4]">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#7A5F43]">
                {content.operatorCard.addressLabel}
              </div>
              <div className="text-sm font-semibold text-[#1F2421] mt-1 inline-flex items-start gap-1.5">
                <MapPinOutlineSvg className="w-4 h-4 text-[#0E6952] shrink-0 mt-0.5" />
                <span>{content.operatorCard.addressValue}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFD4]">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#7A5F43]">
                {content.operatorCard.versionFieldLabel}
              </div>
              <div className="text-sm font-semibold text-[#1F2421] mt-1">
                {content.operatorCard.versionFieldValue}
              </div>
            </div>

            <div className="sm:col-span-2 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFD4]">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#7A5F43]">
                {content.operatorCard.scopeLabel}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-[#1F2421] mt-1">
                {content.operatorCard.scopeValue}
              </div>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <nav
          aria-label={content.tocTitle}
          className="bg-white rounded-2xl p-5 border border-[#E8DFD4] space-y-3"
        >
          <div className="text-xs font-bold uppercase tracking-wider text-[#7A5F43]">
            {content.tocTitle}
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs sm:text-sm font-semibold text-[#1F2421]">
            {content.sections.map((sec) => (
              <li key={sec.id}>
                <a
                  href={`#${sec.id}`}
                  className="inline-flex items-start gap-2 py-1 hover:text-[#0E6952] transition-colors"
                >
                  <span className="font-mono text-[#7A5F43] shrink-0">{sec.number}.</span>
                  <span>{sec.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Numbered Legal Sections */}
        <div className="space-y-6">
          {content.sections.map((sec) => (
            <section
              key={sec.id}
              id={sec.id}
              className={
                sec.isWarningBox
                  ? 'scroll-mt-24 bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border-2 border-amber-400/90 shadow-xs space-y-5'
                  : 'scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD4] shadow-2xs space-y-5'
              }
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 ${
                    sec.isWarningBox
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-emerald-50 text-[#0E6952] border border-emerald-200'
                  }`}
                >
                  {renderSectionIcon(sec.iconKey)}
                </div>
                <div className="space-y-1.5">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1F2421]">
                    {sec.number}. {sec.title}
                  </h2>
                  {sec.intro && (
                    <p className="text-sm sm:text-base text-[#4A4844] leading-relaxed">
                      {sec.intro}
                    </p>
                  )}
                </div>
              </div>

              {sec.paragraphs && (
                <div className="space-y-3">
                  {sec.paragraphs.map((para, pIdx) => (
                    <p key={pIdx} className="text-sm sm:text-base text-[#4A4844] leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              )}

              {sec.table && <JunearLegalDataTable table={sec.table} />}

              {sec.subsections && (
                <div className="grid grid-cols-1 gap-5 pt-1">
                  {sec.subsections.map((sub, sIdx) => (
                    <div
                      key={sIdx}
                      className="rounded-2xl p-5 sm:p-6 bg-[#FAF8F5] border border-[#E8DFD4] space-y-3.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-[#1F2421]">
                          {sub.subtitle}
                        </h3>
                        {sub.badge && (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-900 border border-emerald-200">
                            {sub.badge}
                          </span>
                        )}
                      </div>

                      {sub.paragraphs?.map((p, pIdx) => (
                        <p key={pIdx} className="text-xs sm:text-sm text-[#4A4844] leading-relaxed">
                          {p}
                        </p>
                      ))}

                      {sub.table && <JunearLegalDataTable table={sub.table} />}

                      {sub.bullets && (
                        <ul className="space-y-2.5 pt-1">
                          {sub.bullets.map((b, bIdx) => (
                            <li
                              key={bIdx}
                              className="text-xs sm:text-sm text-[#4A4844] leading-relaxed flex items-start gap-2.5"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#0E6952] shrink-0 mt-2" />
                              <span>
                                {b.label && (
                                  <strong className="text-[#1F2421] font-bold">{b.label} </strong>
                                )}
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
                <ul className="space-y-3.5 pt-1">
                  {sec.bullets.map((b, bIdx) => (
                    <li
                      key={bIdx}
                      className={`p-4 rounded-2xl text-xs sm:text-sm text-[#4A4844] leading-relaxed flex items-start gap-3 ${
                        sec.isWarningBox
                          ? 'bg-amber-50/80 border border-amber-200'
                          : 'bg-[#FAF8F5] border border-[#E8DFD4]/90'
                      }`}
                    >
                      {sec.isWarningBox ? (
                        <AlertGuardSvg className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircleSvg className="w-4 h-4 text-[#0E6952] shrink-0 mt-0.5" />
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
                <p className="text-xs text-[#6E6B65] italic pt-2 border-t border-[#F0EAE1]">
                  {sec.footerNote}
                </p>
              )}
            </section>
          ))}
        </div>

        {/* Bottom Contact & Back to JUNEAR CTA Card */}
        <section className="bg-[#F5F0EB] bg-gradient-to-br from-[#F5F0EB] to-[#EFE7DC] rounded-3xl p-6 sm:p-8 border-2 border-[#C5A880] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0E6952] text-white">
              <ShieldCheckSvg className="w-3.5 h-3.5" />
              <span>{content.ctaCard.badge}</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#1F2421]">
              {content.ctaCard.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#4A4844] leading-relaxed">
              {content.ctaCard.desc}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="mailto:info@gabba.bond?subject=JUNEAR%20Legal%20%26%20GDPR%20Inquiry"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1F2421] text-white text-xs sm:text-sm font-bold hover:bg-black transition-colors shadow-xs"
            >
              <MailOutlineSvg className="w-4 h-4 text-[#C5A880]" />
              <span>{content.ctaCard.emailBtn}</span>
            </a>

            <a
              href={`/junear${langQuery}`}
              onClick={(e) => {
                e.preventDefault();
                goRoute('junear', `/junear${langQuery}`);
              }}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white text-[#1F2421] border border-[#C5A880]/60 text-xs sm:text-sm font-bold hover:bg-[#FAF8F5] transition-colors cursor-pointer"
            >
              <ArrowLeftSvg className="w-4 h-4 text-[#0E6952]" />
              <span>{content.ctaCard.backToJunearBtn}</span>
            </a>

            <a
              href={`/junear/setup${langQuery}`}
              onClick={(e) => {
                e.preventDefault();
                goRoute('junear-setup', `/junear/setup${langQuery}`);
              }}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white text-[#1F2421] border border-[#C5A880]/60 text-xs sm:text-sm font-bold hover:bg-[#FAF8F5] transition-colors cursor-pointer"
            >
              <BookGuideSvg className="w-4 h-4 text-[#7A5F43]" />
              <span>{content.ctaCard.setupGuideBtn}</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default JunearLegalPage;
