import { useState } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { AppRoute, productOfRoute } from '../routing';

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
  const { t, language } = useLanguage();
  const activeProduct = productOfRoute(currentRoute);

  const downloadLabel =
    language === 'hu'
      ? 'Letöltés'
      : language === 'de'
      ? 'Herunterladen'
      : 'Download';

  const navLinks: { label: string; isCurrent: boolean; onClick: () => void }[] = [
    { label: t.nav.projects, isCurrent: currentRoute === 'home', onClick: onExploreProjects },
    { label: 'SENEAR', isCurrent: activeProduct === 'senear', onClick: () => onNavigate('senear') },
    { label: 'JUNEAR', isCurrent: activeProduct === 'junear', onClick: () => onNavigate('junear') },
  ];

  const handleLinkClick = (fn: () => void) => {
    setMobileMenuOpen(false);
    fn();
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAFAFA]/90 backdrop-blur-md border-b border-[#C5A880]/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Wordmark & Slogan */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => {
                if (currentRoute !== 'home') {
                  onNavigate('home');
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
                onClick={() => handleLinkClick(link.onClick)}
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

          {/* Desktop Right Side: Direct Download CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://play.google.com/store/apps/details?id=com.nogond.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#FAFAFA] bg-[#1B7A4E] hover:bg-[#145E3B] active:scale-98 rounded-xl shadow-xs transition-all border border-[#1B7A4E] cursor-pointer ml-1 whitespace-nowrap"
            >
              <Download className="w-4 h-4 text-white shrink-0" />
              <span>{downloadLabel}</span>
            </a>
          </div>

          {/* Mobile Right Controls: Menu button */}
          <div className="flex items-center gap-2 md:hidden">
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
              onClick={() => handleLinkClick(link.onClick)}
              className="w-full text-left px-3.5 py-2.5 text-base font-medium text-[#2C2C2C] hover:bg-[#F5F0EB] rounded-lg transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}

          <div className="pt-2 border-t border-[#C5A880]/20">
            <a
              href="https://play.google.com/store/apps/details?id=com.nogond.app"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[#FAFAFA] bg-[#1B7A4E] hover:bg-[#145E3B] rounded-xl shadow-xs whitespace-nowrap"
            >
              <Download className="w-4 h-4 text-white shrink-0" />
              <span>{downloadLabel}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
