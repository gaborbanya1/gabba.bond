import { useState } from 'react';
import { Menu, X, ArrowUpRight, Globe } from 'lucide-react';
import { useLanguage, LANGUAGE_OPTIONS } from '../i18n/LanguageContext';
import { SupportedLanguage } from '../i18n/types';

interface NavbarProps {
  onContactClick: () => void;
  onExploreProjects: () => void;
  onInstallGuideClick?: () => void;
  onHomeClick?: () => void;
  currentPage?: 'home' | 'install-guide';
}

export function Navbar({
  onContactClick,
  onExploreProjects,
  onInstallGuideClick,
  onHomeClick,
  currentPage = 'home',
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href === '#install-guide') {
      if (onInstallGuideClick) {
        onInstallGuideClick();
      }
      return;
    }

    if (currentPage === 'install-guide') {
      if (onHomeClick) {
        onHomeClick();
      }
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: t.nav.projects, href: '#projects', isCurrent: currentPage === 'home' },
    { label: t.nav.installGuide, href: '#install-guide', isCurrent: currentPage === 'install-guide' },
  ];

  const handleLangChange = (code: SupportedLanguage) => {
    setLanguage(code);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAFAFA]/90 backdrop-blur-md border-b border-[#C5A880]/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Wordmark & Slogan */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => {
                if (currentPage === 'install-guide' && onHomeClick) {
                  onHomeClick();
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="flex items-center gap-1.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-lg p-1 text-left cursor-pointer"
            >
              <span
                className="font-heading font-extrabold text-[30px] pt-0 pb-[5px] tracking-tight text-[#2C2C2C] lowercase transition-colors group-hover:text-[#A38053]"
                style={{ letterSpacing: '-0.035em' }}
              >
                gabba
              </span>
              <span className="w-2 h-2 rounded-full bg-[#C5A880] inline-block mb-1 shadow-2xs" />
            </button>

            <div className="h-5 w-px bg-[#C5A880]/30 hidden sm:block" />

            <span className="text-[18px] font-medium tracking-wide text-[#8C7355] hidden sm:inline-block">
              {t.nav.slogan}
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  link.isCurrent
                    ? 'text-[#2C2C2C] bg-[#F5F0EB] font-semibold border border-[#C5A880]/30 shadow-2xs'
                    : 'text-[#5C5A56] hover:text-[#2C2C2C] hover:bg-[#F5F0EB]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop Right Side: Language Switcher + Contact CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher Segmented Control */}
            <div className="flex items-center bg-[#F5F0EB] p-1 rounded-xl border border-[#C5A880]/30 shadow-2xs">
              <Globe className="w-3.5 h-3.5 text-[#8C7355] ml-1.5 mr-1" />
              {LANGUAGE_OPTIONS.map((opt) => {
                const isActive = language === opt.code;
                return (
                  <button
                    key={opt.code}
                    onClick={() => handleLangChange(opt.code)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#2C2C2C] text-[#FAFAFA] shadow-xs scale-102'
                        : 'text-[#6E6B65] hover:text-[#2C2C2C] hover:bg-white/60'
                    }`}
                    title={opt.label}
                  >
                    {opt.short}
                  </button>
                );
              })}
            </div>

            <button
              onClick={onContactClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#FAFAFA] bg-[#2C2C2C] hover:bg-[#1A1A1A] active:scale-98 rounded-xl shadow-xs transition-all border border-[#2C2C2C] cursor-pointer ml-1"
            >
              <span>{t.nav.getInTouch}</span>
              <ArrowUpRight className="w-4 h-4 text-[#C5A880]" />
            </button>
          </div>

          {/* Mobile Right Controls: Quick language toggle + Menu button */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Compact Mobile Language Switcher */}
            <div className="flex items-center bg-[#F5F0EB] p-0.5 rounded-lg border border-[#C5A880]/30">
              {LANGUAGE_OPTIONS.map((opt) => (
                <button
                  key={opt.code}
                  onClick={() => handleLangChange(opt.code)}
                  className={`px-2 py-1 text-[11px] font-bold rounded-md transition-all ${
                    language === opt.code
                      ? 'bg-[#2C2C2C] text-[#FAFAFA] shadow-2xs'
                      : 'text-[#6E6B65] hover:text-[#2C2C2C]'
                  }`}
                >
                  {opt.short}
                </button>
              ))}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-[#2C2C2C] hover:bg-[#F5F0EB] border border-[#C5A880]/30 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#C5A880]/30 bg-[#FAFAFA] px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in fade-in duration-200">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              className="w-full text-left px-3.5 py-2.5 text-base font-medium text-[#2C2C2C] hover:bg-[#F5F0EB] rounded-lg transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}

          {/* Mobile language picker in dropdown */}
          <div className="pt-2 pb-1 border-t border-[#C5A880]/20 flex items-center justify-between px-2">
            <span className="text-xs font-semibold text-[#8C7355] flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{t.nav.language}:</span>
            </span>
            <div className="flex items-center gap-1">
              {LANGUAGE_OPTIONS.map((opt) => (
                <button
                  key={opt.code}
                  onClick={() => {
                    handleLangChange(opt.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all ${
                    language === opt.code
                      ? 'bg-[#2C2C2C] text-white border-black font-bold'
                      : 'bg-[#F5F0EB] text-[#5C5A56] border-[#C5A880]/30'
                  }`}
                >
                  {opt.label} ({opt.short})
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-[#C5A880]/20">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onContactClick();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[#FAFAFA] bg-[#2C2C2C] rounded-xl shadow-xs"
            >
              <span>{t.nav.getInTouch}</span>
              <ArrowUpRight className="w-4 h-4 text-[#C5A880]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
