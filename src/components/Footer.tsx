import { ArrowUp } from 'lucide-react';
import { BRAND_INFO } from '../data/portfolioData';
import { useLanguage } from '../i18n/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FFFFFF] border-t border-[#C5A880]/30 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#F0EAE1]">
          
          {/* Brand info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span
                  className="font-heading font-extrabold text-2xl tracking-tight text-[#2C2C2C] lowercase"
                  style={{ letterSpacing: '-0.035em' }}
                >
                  gabba
                </span>
                <span className="w-2 h-2 rounded-full bg-[#C5A880] inline-block mb-1 shadow-2xs" />
              </div>
              <div className="h-4.5 w-px bg-[#C5A880]/30" />
              <span className="text-xs sm:text-sm font-medium tracking-wide text-[#8C7355]">
                {t.nav.slogan}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#5C5A56] leading-relaxed max-w-md">
              {t.footer.tagline}
            </p>

            <div className="flex items-center gap-2.5 text-xs text-[#6E6B65]">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-600" />
              <span>{t.footer.locationText}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C2C2C]">
              {t.footer.navHeading}
            </h4>
            <ul className="space-y-2 text-xs font-medium text-[#5C5A56]">
              <li>
                <a href="#projects" className="hover:text-[#2C2C2C] transition-colors">{t.footer.projectsLink}</a>
              </li>
              <li>
                <a href="#install-guide" className="hover:text-[#2C2C2C] transition-colors">{t.installGuide.heroTitle}</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#2C2C2C] transition-colors">{t.footer.contactLink}</a>
              </li>
            </ul>
          </div>

          {/* Specializations */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C2C2C]">
              {t.footer.expertiseHeading}
            </h4>
            <ul className="space-y-1.5 text-xs text-[#6E6B65]">
              <li>• {t.footer.exp1}</li>
              <li>• {t.footer.exp2}</li>
              <li>• {t.footer.exp3}</li>
              <li>• {t.footer.exp4}</li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C7355]">
          <p>© {new Date().getFullYear()} {BRAND_INFO.name}. {t.footer.rights}</p>
          
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 hover:text-[#2C2C2C] transition-colors cursor-pointer"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
