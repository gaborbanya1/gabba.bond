import type { MouseEvent } from 'react';
import { ArrowUp } from 'lucide-react';
import { BRAND_INFO } from '../data/portfolioData';
import { useLanguage } from '../i18n/LanguageContext';
import { AppRoute } from '../routing';
import { FOCUS_RING } from './senear/hooks';

interface FooterProps {
  onNavigate?: (route: AppRoute) => void;
}

const FOOTER_GDPR_I18N = {
  en: {
    privacyLabel: 'Privacy Policy',
    deleteAccountLabel: 'Data Deletion',
  },
  hu: {
    privacyLabel: 'Adatkezelési Tájékoztató',
    deleteAccountLabel: 'Adattörlés',
  },
  de: {
    privacyLabel: 'Datenschutzerklärung',
    deleteAccountLabel: 'Datenlöschung',
  },
};

export function Footer({ onNavigate }: FooterProps) {
  const { t, language } = useLanguage();
  const gdprText =
    language === 'hu'
      ? FOOTER_GDPR_I18N.hu
      : language === 'de'
      ? FOOTER_GDPR_I18N.de
      : FOOTER_GDPR_I18N.en;

  const scrollToTop = () => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  const handleSpaNav = (route: AppRoute) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (!onNavigate || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onNavigate(route);
  };

  const quickLinkClass = `inline-flex min-h-9 items-center rounded-md py-1.5 hover:text-[#2C2C2C] underline decoration-[#5C5A56]/35 underline-offset-4 hover:decoration-[#2C2C2C] transition-colors ${FOCUS_RING}`;

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
                <span aria-hidden="true" className="w-2 h-2 rounded-full bg-[#C5A880] inline-block mb-1 shadow-2xs" />
              </div>
              <div aria-hidden="true" className="h-4.5 w-px bg-[#C5A880]/30" />
              <span className="text-xs sm:text-sm font-medium tracking-wide text-[#7A5F43]">
                {t.nav.slogan}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#5C5A56] leading-relaxed max-w-md">
              {t.footer.tagline}
            </p>

            <div className="flex items-center gap-2.5 text-xs text-[#6E6B65]">
              <span aria-hidden="true" className="inline-block w-2 h-2 rounded-full bg-emerald-600" />
              <span>{t.footer.locationText}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#2C2C2C]">
              {t.footer.navHeading}
            </h2>
            <ul className="space-y-0.5 text-xs font-medium text-[#5C5A56]">
              <li>
                <a href="/#projects" className={quickLinkClass}>
                  {t.footer.projectsLink}
                </a>
              </li>
              <li>
                <a href="/senear" onClick={handleSpaNav('senear')} className={quickLinkClass}>
                  SENEAR
                </a>
              </li>
              <li>
                <a href="/senear/setup" onClick={handleSpaNav('senear-setup')} className={quickLinkClass}>
                  SENEAR – {t.nav.installGuide}
                </a>
              </li>
              <li>
                <a href="/junear" onClick={handleSpaNav('junear')} className={quickLinkClass}>
                  JUNEAR
                </a>
              </li>
              <li>
                <a href="/junear/setup" onClick={handleSpaNav('junear-setup')} className={quickLinkClass}>
                  JUNEAR – {t.nav.installGuide}
                </a>
              </li>
              <li>
                <a href="/#contact" className={quickLinkClass}>
                  {t.footer.contactLink}
                </a>
              </li>
            </ul>
          </div>

          {/* Specializations */}
          <div className="md:col-span-3 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#2C2C2C]">
              {t.footer.expertiseHeading}
            </h2>
            <ul className="space-y-1.5 text-xs text-[#6E6B65]">
              <li>• {t.footer.exp1}</li>
              <li>• {t.footer.exp2}</li>
              <li>• {t.footer.exp3}</li>
              <li>• {t.footer.exp4}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A5F43]">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1">
            <p>© {new Date().getFullYear()} {BRAND_INFO.name}. {t.footer.rights}</p>
            <span aria-hidden="true">·</span>
            <a
              href="/privacy"
              onClick={handleSpaNav('privacy')}
              className={`inline-flex min-h-9 items-center rounded-md py-1.5 hover:text-[#2C2C2C] underline underline-offset-4 transition-colors ${FOCUS_RING}`}
            >
              {gdprText.privacyLabel}
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="/delete-account"
              onClick={handleSpaNav('delete-account')}
              className={`inline-flex min-h-9 items-center rounded-md py-1.5 hover:text-[#2C2C2C] underline underline-offset-4 transition-colors ${FOCUS_RING}`}
            >
              {gdprText.deleteAccountLabel}
            </a>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className={`inline-flex min-h-9 items-center gap-1.5 rounded-md px-2 py-1.5 hover:text-[#2C2C2C] transition-colors cursor-pointer ${FOCUS_RING}`}
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp aria-hidden="true" focusable="false" className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
