import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { AppRoute, productOfRoute } from '../routing';
import { PLAY_STORE_URL } from './senear/senearContent';
import { FOCUS_RING } from './senear/hooks';

interface NavbarProps {
  onContactClick: () => void;
  onExploreProjects: () => void;
  onNavigate: (route: AppRoute) => void;
  currentRoute: AppRoute;
}

export function Navbar({
  onExploreProjects,
  onNavigate,
  currentRoute,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { t, language } = useLanguage();
  const activeProduct = productOfRoute(currentRoute);

  const downloadLabel =
    language === 'hu'
      ? 'Letöltés'
      : language === 'de'
      ? 'Herunterladen'
      : 'Download';

  const navAriaLabel =
    language === 'hu'
      ? 'Fő navigáció'
      : language === 'de'
      ? 'Hauptnavigation'
      : 'Main navigation';

  const menuToggleLabel = mobileMenuOpen
    ? language === 'hu'
      ? 'Menü bezárása'
      : language === 'de'
      ? 'Menü schließen'
      : 'Close navigation menu'
    : language === 'hu'
    ? 'Menü megnyitása'
    : language === 'de'
    ? 'Menü öffnen'
    : 'Open navigation menu';

  const navLinks: { label: string; href: string; isCurrent: boolean; onClick: () => void }[] = [
    { label: t.nav.projects, href: '/#projects', isCurrent: currentRoute === 'home', onClick: onExploreProjects },
    { label: 'SENEAR', href: '/senear', isCurrent: activeProduct === 'senear', onClick: () => onNavigate('senear') },
    { label: 'JUNEAR', href: '/junear', isCurrent: activeProduct === 'junear', onClick: () => onNavigate('junear') },
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

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAFAFA]/90 backdrop-blur-md border-b border-[#C5A880]/20 transition-all print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Wordmark & Slogan */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => {
                if (currentRoute !== 'home') {
                  onNavigate('home');
                } else {
                  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
                  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
                }
              }}
              className={`inline-flex min-h-11 items-center gap-1.5 group rounded-lg px-1.5 text-left cursor-pointer ${FOCUS_RING}`}
            >
              <span
                className="font-heading font-extrabold text-[30px] pt-0 pb-[5px] tracking-tight text-[#2C2C2C] lowercase transition-colors group-hover:text-[#A38053]"
                style={{ letterSpacing: '-0.035em' }}
              >
                gabba
              </span>
              <span aria-hidden="true" className="w-2 h-2 rounded-full bg-[#C5A880] inline-block mb-1 shadow-2xs" />
            </button>

            <div aria-hidden="true" className="h-5 w-px bg-[#C5A880]/30 hidden lg:block" />

            <span className="text-[18px] font-medium tracking-wide text-[#7A5F43] hidden lg:inline-block">
              {t.nav.slogan}
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav aria-label={navAriaLabel} className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-current={link.isCurrent ? 'page' : undefined}
                onClick={(e) => handleNavAnchorClick(e, link.onClick)}
                className={`inline-flex min-h-11 items-center px-3.5 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  link.isCurrent
                    ? 'text-[#2C2C2C] bg-[#F5F0EB] font-semibold border border-[#C5A880]/50 shadow-2xs'
                    : 'text-[#5C5A56] hover:text-[#2C2C2C] hover:bg-[#F5F0EB]'
                } ${FOCUS_RING}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right Side: Direct Download CTA */}
          <div className="hidden md:flex items-center gap-2.5">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex min-h-11 items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#FAFAFA] bg-[#1B7A4E] hover:bg-[#145E3B] active:scale-98 rounded-xl shadow-xs transition-all border border-[#1B7A4E] cursor-pointer whitespace-nowrap ${FOCUS_RING}`}
            >
              <Download aria-hidden="true" focusable="false" className="w-4 h-4 text-white shrink-0" />
              <span>{downloadLabel}</span>
            </a>
          </div>

          {/* Mobile Right Controls: Menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
              aria-label={menuToggleLabel}
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
          className="md:hidden border-b border-[#C5A880]/30 bg-[#FAFAFA] px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in fade-in duration-200"
        >
          <nav aria-label={navAriaLabel} className="space-y-1">
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
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className={`w-full inline-flex min-h-11 items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[#FAFAFA] bg-[#1B7A4E] hover:bg-[#145E3B] rounded-xl shadow-xs whitespace-nowrap ${FOCUS_RING}`}
            >
              <Download aria-hidden="true" focusable="false" className="w-4 h-4 text-white shrink-0" />
              <span>{downloadLabel}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
