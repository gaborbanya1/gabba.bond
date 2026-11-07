import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { Menu, X, Download, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { SupportedLanguage } from '../i18n/types';
import { AppRoute, buildRouteHref, isLegalRoute, productOfRoute } from '../routing';
import { PLAY_STORE_URL } from './senear/senearContent';
import { FOCUS_RING } from './senear/hooks';

interface NavbarProps {
  onContactClick: () => void;
  onExploreProjects: () => void;
  onNavigate: (route: AppRoute) => void;
  currentRoute: AppRoute;
}

const LANG_OPTIONS: { code: SupportedLanguage; label: string; aria: string }[] = [
  { code: 'hu', label: 'HU', aria: 'Magyar nyelv (HU)' },
  { code: 'de', label: 'DE', aria: 'Deutsch (DE)' },
  { code: 'en', label: 'EN', aria: 'English (EN)' },
];

export function Navbar({
  onContactClick,
  onExploreProjects,
  onNavigate,
  currentRoute,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { language, setLanguage } = useLanguage();
  const activeLang: 'hu' | 'de' | 'en' = language === 'hu' || language === 'de' ? language : 'en';
  const activeProduct = productOfRoute(currentRoute);
  const isSenearContext = activeProduct === 'senear';

  const labels =
    activeLang === 'hu'
      ? {
          studioSubtitle: 'Gabba Bond Studio',
          portfolio: 'Portfólió',
          setupGuide: 'Beállítási útmutató',
          legalNav: 'Jogi dokumentumok',
          impressum: 'Impresszum',
          download: 'SENEAR letöltése',
          openSenear: 'SENEAR megnyitása',
          navAria: 'Fő navigáció',
          langAria: 'Oldal nyelvének kiválasztása',
          openMenu: 'Menü megnyitása',
          closeMenu: 'Menü bezárása',
        }
      : activeLang === 'de'
      ? {
          studioSubtitle: 'Gabba Bond Studio',
          portfolio: 'Portfolio',
          setupGuide: 'Einrichtungsanleitung',
          legalNav: 'Rechtliches',
          impressum: 'Impressum',
          download: 'SENEAR laden',
          openSenear: 'SENEAR öffnen',
          navAria: 'Hauptnavigation',
          langAria: 'Sprache wählen',
          openMenu: 'Menü öffnen',
          closeMenu: 'Menü schließen',
        }
      : {
          studioSubtitle: 'Gabba Bond Studio',
          portfolio: 'Portfolio',
          setupGuide: 'Setup Guide',
          legalNav: 'Legal & GDPR',
          impressum: 'Impressum',
          download: 'Download SENEAR',
          openSenear: 'Explore SENEAR',
          navAria: 'Main navigation',
          langAria: 'Select site language',
          openMenu: 'Open navigation menu',
          closeMenu: 'Close navigation menu',
        };

  const navLinks: { label: string; href: string; isCurrent: boolean; onClick: () => void }[] =
    isSenearContext
      ? [
          {
            label: 'Gabba Bond',
            href: buildRouteHref('home', activeLang),
            isCurrent: false,
            onClick: () => onNavigate('home'),
          },
          {
            label: 'SENEAR',
            href: buildRouteHref('senear', activeLang),
            isCurrent: currentRoute === 'senear',
            onClick: () => onNavigate('senear'),
          },
          {
            label: labels.setupGuide,
            href: buildRouteHref('senear-setup', activeLang),
            isCurrent: currentRoute === 'senear-setup',
            onClick: () => onNavigate('senear-setup'),
          },
          {
            label: labels.legalNav,
            href: buildRouteHref('senear-privacy', activeLang),
            isCurrent: isLegalRoute(currentRoute),
            onClick: () => onNavigate('senear-privacy'),
          },
        ]
      : [
          {
            label: labels.portfolio,
            href: buildRouteHref('home', activeLang, 'portfolio'),
            isCurrent: currentRoute === 'home',
            onClick: onExploreProjects,
          },
          {
            label: 'SENEAR',
            href: buildRouteHref('senear', activeLang),
            isCurrent: false,
            onClick: () => onNavigate('senear'),
          },
          {
            label: 'JUNEAR',
            href: buildRouteHref('junear', activeLang),
            isCurrent: activeProduct === 'junear',
            onClick: () => onNavigate('junear'),
          },
          {
            label: labels.impressum,
            href: buildRouteHref('home', activeLang, 'impressum'),
            isCurrent: false,
            onClick: onContactClick,
          },
        ];

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  const handleNavAnchorClick = (e: MouseEvent<HTMLAnchorElement>, fn: () => void) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    setMobileMenuOpen(false);
    fn();
  };

  const buildLangUrl = (code: SupportedLanguage) => {
    if (typeof window === 'undefined') return `?lang=${code}`;
    const path = window.location.pathname || '/';
    const hash = window.location.hash || '';
    return `${path}?lang=${code}${hash}`;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAFAFA]/92 backdrop-blur-md border-b border-[#C5A880]/25 transition-all print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3">
          {/* Brand Wordmark & Umbrella Studio Label */}
          <div className="flex items-center gap-3 sm:gap-3.5 shrink-0">
            <a
              href={buildRouteHref('home', activeLang)}
              onClick={(e) =>
                handleNavAnchorClick(e, () => {
                  if (currentRoute !== 'home') {
                    onNavigate('home');
                  } else {
                    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
                    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
                  }
                })
              }
              className={`inline-flex min-h-11 items-center gap-1.5 group rounded-lg px-1.5 text-left cursor-pointer ${FOCUS_RING}`}
            >
              <span
                className="font-heading font-extrabold text-[28px] sm:text-[30px] pt-0 pb-[4px] tracking-tight text-[#2C2C2C] lowercase transition-colors group-hover:text-[#A38053]"
                style={{ letterSpacing: '-0.035em' }}
              >
                gabba
              </span>
              <span aria-hidden="true" className="w-2 h-2 rounded-full bg-[#C5A880] inline-block mb-1 shadow-2xs" />
            </a>

            <div aria-hidden="true" className="h-5 w-px bg-[#C5A880]/30 hidden xl:block" />

            <span className="text-sm font-semibold tracking-wide text-[#7A5F43] hidden xl:inline-block">
              {labels.studioSubtitle}
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav aria-label={labels.navAria} className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-current={link.isCurrent ? 'page' : undefined}
                onClick={(e) => handleNavAnchorClick(e, link.onClick)}
                className={`inline-flex min-h-11 items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  link.isCurrent
                    ? 'text-[#2C2C2C] bg-[#F5F0EB] font-semibold border border-[#C5A880]/50 shadow-2xs'
                    : 'text-[#5C5A56] hover:text-[#2C2C2C] hover:bg-[#F5F0EB]'
                } ${FOCUS_RING}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right Side: Language Switcher (HU / DE / EN) + Context CTA */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            <div
              role="group"
              aria-label={labels.langAria}
              className="inline-flex items-center rounded-xl bg-[#F3EDE3] p-1 border border-[#DFD2BE]"
            >
              {LANG_OPTIONS.map((opt) => {
                const isSelected = activeLang === opt.code;
                return (
                  <a
                    key={opt.code}
                    href={buildLangUrl(opt.code)}
                    aria-label={opt.aria}
                    aria-current={isSelected ? 'true' : undefined}
                    onClick={(e) => {
                      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                      e.preventDefault();
                      setLanguage(opt.code);
                    }}
                    className={`inline-flex min-h-9 min-w-9 items-center justify-center px-2.5 py-1 rounded-lg text-xs font-extrabold transition-colors ${
                      isSelected
                        ? 'bg-white text-[#1F2421] shadow-2xs ring-1 ring-[#C5A880]/50'
                        : 'text-[#5C5A56] hover:text-[#1F2421]'
                    } ${FOCUS_RING}`}
                  >
                    {opt.label}
                  </a>
                );
              })}
            </div>

            {isSenearContext ? (
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex min-h-11 items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#FAFAFA] bg-[#1B7A4E] hover:bg-[#145E3B] rounded-xl shadow-xs transition-all border border-[#1B7A4E] cursor-pointer whitespace-nowrap ${FOCUS_RING}`}
              >
                <Download aria-hidden="true" focusable="false" className="w-4 h-4 text-white shrink-0" />
                <span>{labels.download}</span>
              </a>
            ) : (
              <a
                href={buildRouteHref('senear', activeLang)}
                onClick={(e) => handleNavAnchorClick(e, () => onNavigate('senear'))}
                className={`inline-flex min-h-11 items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#FAFAFA] bg-[#1B7A4E] hover:bg-[#145E3B] rounded-xl shadow-xs transition-all border border-[#1B7A4E] cursor-pointer whitespace-nowrap ${FOCUS_RING}`}
              >
                <span>{labels.openSenear}</span>
                <ArrowRight aria-hidden="true" focusable="false" className="w-4 h-4 text-white shrink-0" />
              </a>
            )}
          </div>

          {/* Mobile Right Controls: Compact Language Switcher + Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <div
              role="group"
              aria-label={labels.langAria}
              className="inline-flex items-center rounded-xl bg-[#F3EDE3] p-0.5 border border-[#DFD2BE]"
            >
              {LANG_OPTIONS.map((opt) => {
                const isSelected = activeLang === opt.code;
                return (
                  <button
                    key={opt.code}
                    type="button"
                    aria-label={opt.aria}
                    aria-pressed={isSelected}
                    onClick={() => setLanguage(opt.code)}
                    className={`inline-flex min-h-10 min-w-9 items-center justify-center px-2 rounded-lg text-xs font-extrabold cursor-pointer ${
                      isSelected
                        ? 'bg-white text-[#1F2421] shadow-2xs'
                        : 'text-[#5C5A56] hover:text-[#1F2421]'
                    } ${FOCUS_RING}`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
              aria-label={mobileMenuOpen ? labels.closeMenu : labels.openMenu}
              className={`inline-flex min-h-11 min-w-11 items-center justify-center p-2.5 rounded-xl text-[#2C2C2C] hover:bg-[#F5F0EB] border border-[#9A7B4F] cursor-pointer ${FOCUS_RING}`}
            >
              {mobileMenuOpen ? (
                <X aria-hidden="true" focusable="false" className="w-5 h-5" />
              ) : (
                <Menu aria-hidden="true" focusable="false" className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="md:hidden border-b border-[#C5A880]/30 bg-[#FAFAFA] px-4 pt-3 pb-6 space-y-3 shadow-lg"
        >
          <nav aria-label={labels.navAria} className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-current={link.isCurrent ? 'page' : undefined}
                onClick={(e) => handleNavAnchorClick(e, link.onClick)}
                className={`flex min-h-11 w-full items-center text-left px-3.5 py-2.5 text-base font-medium rounded-lg transition-colors cursor-pointer ${
                  link.isCurrent
                    ? 'text-[#2C2C2C] bg-[#F5F0EB] font-semibold'
                    : 'text-[#2C2C2C] hover:bg-[#F5F0EB]'
                } ${FOCUS_RING}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-2 border-t border-[#C5A880]/20">
            {isSenearContext ? (
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full inline-flex min-h-11 items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[#FAFAFA] bg-[#1B7A4E] hover:bg-[#145E3B] rounded-xl shadow-xs whitespace-nowrap ${FOCUS_RING}`}
              >
                <Download aria-hidden="true" focusable="false" className="w-4 h-4 text-white shrink-0" />
                <span>{labels.download}</span>
              </a>
            ) : (
              <a
                href={buildRouteHref('senear', activeLang)}
                onClick={(e) => handleNavAnchorClick(e, () => onNavigate('senear'))}
                className={`w-full inline-flex min-h-11 items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[#FAFAFA] bg-[#1B7A4E] hover:bg-[#145E3B] rounded-xl shadow-xs whitespace-nowrap ${FOCUS_RING}`}
              >
                <span>{labels.openSenear}</span>
                <ArrowRight aria-hidden="true" focusable="false" className="w-4 h-4 text-white shrink-0" />
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
