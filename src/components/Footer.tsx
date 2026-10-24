import { ArrowUp, ShieldCheck } from 'lucide-react';
import { BRAND_INFO } from '../data/portfolioData';
import { useLanguage } from '../i18n/LanguageContext';
import { AppRoute } from '../routing';

interface FooterProps {
  onNavigate?: (route: AppRoute) => void;
}

const FOOTER_GDPR_I18N = {
  en: {
    linkLabel: 'Privacy Policy (GDPR)',
    cardBadge: 'GDPR (EU) 2016/679',
    cardTitle: 'SENEAR Privacy Policy & EU GDPR Compliance',
    cardDesc:
      '100% EU data residency (europe-west1 – Belgium), bilateral prior consent gate, P2P encrypted WebRTC calls with instant signaling wipe, GPS minimization, and one-tap Right to Erasure (Art. 17 GDPR).',
    cardBtn: 'Read Full Privacy Policy →',
  },
  hu: {
    linkLabel: 'Adatkezelési Tájékoztató (Privacy Policy)',
    cardBadge: 'GDPR (EU) 2016/679',
    cardTitle: 'SENEAR Adatkezelési Tájékoztató & EU GDPR Megfelelőség',
    cardDesc:
      '100% EU-s adattárolás (europe-west1 – Belgium), kétoldalú előzetes hozzájárulási kapu, végponti titkosítású P2P hívások azonnali jelzéstörléssel, GPS-minimalizálás és egynyomásos végleges adattörlés (GDPR 17. cikk).',
    cardBtn: 'Teljes Adatkezelési Tájékoztató (Privacy Policy) →',
  },
  de: {
    linkLabel: 'Datenschutzerklärung (Privacy Policy)',
    cardBadge: 'DSGVO (EU) 2016/679',
    cardTitle: 'SENEAR Datenschutzerklärung & EU-DSGVO-Konformität',
    cardDesc:
      '100 % EU-Datenhaltung (europe-west1 – Belgien), beidseitige Einwilligungs-Schranke, P2P-verschlüsselte WebRTC-Anrufe mit sofortiger Signalisierungslöschung, GPS-Minimierung und sofortige Datenlöschung (Art. 17 DSGVO).',
    cardBtn: 'Vollständige Datenschutzerklärung (Privacy Policy) →',
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPrivacy = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('privacy');
    }
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
                <a href="/#projects" className="hover:text-[#2C2C2C] transition-colors">{t.footer.projectsLink}</a>
              </li>
              <li>
                <a href="/senear" className="hover:text-[#2C2C2C] transition-colors">SENEAR</a>
                {' · '}
                <a href="/senear/setup" className="hover:text-[#2C2C2C] transition-colors">{t.nav.installGuide}</a>
              </li>
              <li>
                <a href="/junear" className="hover:text-[#2C2C2C] transition-colors">JUNEAR</a>
                {' · '}
                <a href="/junear/setup" className="hover:text-[#2C2C2C] transition-colors">{t.nav.installGuide}</a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-[#2C2C2C] transition-colors">{t.footer.contactLink}</a>
              </li>
              <li>
                <a
                  href="/privacy"
                  onClick={handleOpenPrivacy}
                  className="hover:text-emerald-800 text-emerald-700 font-bold transition-colors inline-flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{gdprText.linkLabel}</span>
                </a>
              </li>
              <li>
                <a
                  href="https://nogond-834ed.web.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2C2C2C] text-[#8C7355] font-semibold transition-colors inline-flex items-center gap-1"
                >
                  <span>SENEAR Admin Dashboard ↗</span>
                </a>
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

        {/* Dedicated GDPR & Privacy Policy Footer Section */}
        <div className="py-6 border-b border-[#F0EAE1]">
          <div className="rounded-2xl bg-[#FAF8F5] border border-[#E8DFD4] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>{gdprText.cardBadge}</span>
                </span>
                <h5 className="text-xs sm:text-sm font-bold text-[#2C2C2C]">
                  {gdprText.cardTitle}
                </h5>
              </div>
              <p className="text-xs text-[#5C5A56] leading-relaxed">
                {gdprText.cardDesc}
              </p>
            </div>

            <a
              href="/privacy"
              onClick={handleOpenPrivacy}
              className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#2C2C2C] text-white text-xs font-bold hover:bg-[#1F2421] transition-colors shadow-2xs"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{gdprText.cardBtn}</span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C7355]">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1">
            <p>© {new Date().getFullYear()} {BRAND_INFO.name}. {t.footer.rights}</p>
            <span>·</span>
            <a
              href="/privacy"
              onClick={handleOpenPrivacy}
              className="font-semibold text-[#2C2C2C] hover:text-emerald-700 underline underline-offset-4 transition-colors"
            >
              {gdprText.linkLabel}
            </a>
          </div>
          
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
