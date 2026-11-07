import type { MouseEvent } from 'react';
import { ArrowUp, Mail, MapPin, User } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { AppRoute, buildRouteHref } from '../routing';
import { FOCUS_RING } from './senear/hooks';
import { getSenearFacebookGroupUrl, getSenearFacebookPageUrl } from './senear/senearContent';
import { ECOGONG_PLAY_URL, STUDIO_CONTACT_EMAIL } from './StudioHubPage';

interface FooterProps {
  onNavigate?: (route: AppRoute) => void;
  currentRoute?: AppRoute;
}

type FooterLang = 'hu' | 'de' | 'en';

const FOOTER_I18N: Record<
  FooterLang,
  {
    studioSubtitle: string;
    studioDesc: string;
    impressumHeading: string;
    operatorLabel: string;
    operatorValue: string;
    hqValue: string;
    productsHeading: string;
    studioHomeLabel: string;
    senearMicrositeLabel: string;
    senearSetupLabel: string;
    senearPageLabel: string;
    senearCommunityLabel: string;
    ecogongLabel: string;
    junearLabel: string;
    senearLegalHeading: string;
    privacyLabel: string;
    termsLabel: string;
    operationsLabel: string;
    deleteAccountLabel: string;
    rights: string;
    backToTop: string;
  }
> = {
  hu: {
    studioSubtitle: 'Európai Szoftver- és Termékstúdió',
    studioDesc:
      'Akadálymentes, adatvédelem-központú (Privacy by Design) digitális termékek családoknak, időseknek és a mindennapokra – az Európai Unióban tervezve és üzemeltetve.',
    impressumHeading: 'Impresszum és Üzemeltető',
    operatorLabel: 'Üzemeltető:',
    operatorValue: 'Bányai Gábor',
    hqValue: '9400 Sopron, Ravazd utca 46., Magyarország (Európai Unió)',
    productsHeading: 'Termékek és Közösség',
    studioHomeLabel: 'Gabba Bond Studio (Főoldal)',
    senearMicrositeLabel: 'SENEAR – Termékoldal',
    senearSetupLabel: 'SENEAR – Beállítási útmutató',
    senearPageLabel: 'SENEAR – Facebook-oldal',
    senearCommunityLabel: 'SENEAR – Közösség (Facebook)',
    ecogongLabel: 'EcoGong (Google Play)',
    junearLabel: 'JUNEAR (Fejlesztés alatt)',
    senearLegalHeading: 'SENEAR Jogi Dokumentumok',
    privacyLabel: 'GDPR Adatvédelmi Tájékoztató',
    termsLabel: 'Általános Szerződési Feltételek (ÁSZF)',
    operationsLabel: 'Működési és Adatkezelési Szabályzat',
    deleteAccountLabel: 'Fiók- és adattörlés (GDPR 17. cikk)',
    rights: 'Minden jog fenntartva.',
    backToTop: 'Vissza a tetejére',
  },
  de: {
    studioSubtitle: 'Europäisches Software- & Produktstudio',
    studioDesc:
      'Barrierefreie, datenschutzfreundliche (Privacy by Design) digitale Produkte für Familien, Senioren und den Alltag – entwickelt und betrieben in der Europäischen Union.',
    impressumHeading: 'Impressum & Betreiber',
    operatorLabel: 'Betreiber:',
    operatorValue: 'Bányai Gábor',
    hqValue: 'Ravazd utca 46, 9400 Sopron, Ungarn (Europäische Union)',
    productsHeading: 'Produkte & Community',
    studioHomeLabel: 'Gabba Bond Studio (Startseite)',
    senearMicrositeLabel: 'SENEAR – Produktseite',
    senearSetupLabel: 'SENEAR – Einrichtungsanleitung',
    senearPageLabel: 'SENEAR – Facebook-Seite',
    senearCommunityLabel: 'SENEAR – Community (Facebook)',
    ecogongLabel: 'EcoGong (Google Play)',
    junearLabel: 'JUNEAR (In Entwicklung)',
    senearLegalHeading: 'SENEAR Rechtsdokumente',
    privacyLabel: 'DSGVO-Datenschutzerklärung',
    termsLabel: 'Allgemeine Geschäftsbedingungen (AGB)',
    operationsLabel: 'Betriebs- & Transparenzrichtlinie',
    deleteAccountLabel: 'Konto- & Datenlöschung (Art. 17 DSGVO)',
    rights: 'Alle Rechte vorbehalten.',
    backToTop: 'Nach oben',
  },
  en: {
    studioSubtitle: 'European Software & Product Studio',
    studioDesc:
      'Accessible, high-trust digital products for families, seniors, and everyday life—engineered and hosted in the European Union with strict Privacy by Design.',
    impressumHeading: 'Studio Impressum & Operator',
    operatorLabel: 'Operator:',
    operatorValue: 'Bányai Gábor',
    hqValue: 'Ravazd utca 46, 9400 Sopron, Hungary (European Union)',
    productsHeading: 'Portfolio & Community',
    studioHomeLabel: 'Gabba Bond Studio (Home)',
    senearMicrositeLabel: 'SENEAR – Product Microsite',
    senearSetupLabel: 'SENEAR – Setup Guide',
    senearPageLabel: 'SENEAR – Facebook Page',
    senearCommunityLabel: 'SENEAR – Community (Facebook)',
    ecogongLabel: 'EcoGong (Google Play)',
    junearLabel: 'JUNEAR (In Development)',
    senearLegalHeading: 'SENEAR Legal & Transparency',
    privacyLabel: 'GDPR Privacy Notice',
    termsLabel: 'Terms of Service (ToS)',
    operationsLabel: 'Operational & Transparency Policy',
    deleteAccountLabel: 'Account & Data Deletion (GDPR Art. 17)',
    rights: 'All rights reserved.',
    backToTop: 'Back to top',
  },
};

export function Footer({ onNavigate }: FooterProps) {
  const { language } = useLanguage();
  const activeLang: FooterLang = language === 'hu' || language === 'de' ? language : 'en';
  const copy = FOOTER_I18N[activeLang];

  const scrollToTop = () => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  const handleSpaNav = (route: AppRoute) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (!onNavigate || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onNavigate(route);
  };

  const quickLinkClass = `inline-flex min-h-9 items-center rounded-md py-1 hover:text-[#2C2C2C] underline decoration-[#5C5A56]/35 underline-offset-4 hover:decoration-[#2C2C2C] transition-colors ${FOCUS_RING}`;

  return (
    <footer className="bg-[#FFFFFF] border-t border-[#C5A880]/30 py-12 sm:py-16 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#F0EAE1]">
          {/* Column 1: Gabba Bond Brand & Official Impressum */}
          <div className="md:col-span-5 space-y-4">
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
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#7A5F43]">
                {copy.studioSubtitle}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#5C5A56] leading-relaxed max-w-md">
              {copy.studioDesc}
            </p>

            {/* Official Operator & Impressum Box (No Tax Number Yet) */}
            <div className="rounded-2xl bg-[#FAF8F5] border border-[#E8DFD4] p-4 space-y-1.5 text-xs text-[#3F3C38]">
              <div className="font-bold uppercase tracking-wider text-[11px] text-[#7A5F43]">
                {copy.impressumHeading}
              </div>
              <div className="flex items-center gap-2 font-semibold text-[#1F2421]">
                <User aria-hidden="true" className="w-3.5 h-3.5 text-[#7A5F43] shrink-0" />
                <span>
                  {copy.operatorLabel} <strong>{copy.operatorValue}</strong>
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin aria-hidden="true" className="w-3.5 h-3.5 text-[#7A5F43] shrink-0 mt-0.5" />
                <span>{copy.hqValue}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail aria-hidden="true" className="w-3.5 h-3.5 text-[#1B7A4E] shrink-0" />
                <a
                  href={`mailto:${STUDIO_CONTACT_EMAIL}`}
                  className={`font-bold text-[#14593A] underline underline-offset-4 hover:text-[#1B7A4E] ${FOCUS_RING}`}
                >
                  {STUDIO_CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Product Portfolio & Community */}
          <div className="md:col-span-3 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#2C2C2C]">
              {copy.productsHeading}
            </h2>
            <ul className="space-y-0.5 text-xs font-medium text-[#5C5A56]">
              <li>
                <a href={buildRouteHref('home', activeLang)} onClick={handleSpaNav('home')} className={quickLinkClass}>
                  {copy.studioHomeLabel}
                </a>
              </li>
              <li>
                <a href={buildRouteHref('senear', activeLang)} onClick={handleSpaNav('senear')} className={quickLinkClass}>
                  {copy.senearMicrositeLabel}
                </a>
              </li>
              <li>
                <a
                  href={buildRouteHref('senear-setup', activeLang)}
                  onClick={handleSpaNav('senear-setup')}
                  className={quickLinkClass}
                >
                  {copy.senearSetupLabel}
                </a>
              </li>
              <li>
                <a
                  href={getSenearFacebookPageUrl(activeLang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={quickLinkClass}
                >
                  {copy.senearPageLabel}
                </a>
              </li>
              <li>
                <a
                  href={getSenearFacebookGroupUrl(activeLang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={quickLinkClass}
                >
                  {copy.senearCommunityLabel}
                </a>
              </li>
              <li>
                <a
                  href={ECOGONG_PLAY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={quickLinkClass}
                >
                  {copy.ecogongLabel}
                </a>
              </li>
              <li>
                <a href={buildRouteHref('junear', activeLang)} onClick={handleSpaNav('junear')} className={quickLinkClass}>
                  {copy.junearLabel}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: SENEAR 3 Separate Legal Documents + Account Deletion */}
          <div className="md:col-span-4 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#2C2C2C]">
              {copy.senearLegalHeading}
            </h2>
            <ul className="space-y-1 text-xs font-medium text-[#5C5A56]">
              <li>
                <a
                  href={buildRouteHref('senear-privacy', activeLang)}
                  onClick={handleSpaNav('senear-privacy')}
                  className={quickLinkClass}
                >
                  {copy.privacyLabel}
                </a>
              </li>
              <li>
                <a
                  href={buildRouteHref('senear-terms', activeLang)}
                  onClick={handleSpaNav('senear-terms')}
                  className={quickLinkClass}
                >
                  {copy.termsLabel}
                </a>
              </li>
              <li>
                <a
                  href={buildRouteHref('senear-operations', activeLang)}
                  onClick={handleSpaNav('senear-operations')}
                  className={quickLinkClass}
                >
                  {copy.operationsLabel}
                </a>
              </li>
              <li>
                <a
                  href={buildRouteHref('delete-account', activeLang)}
                  onClick={handleSpaNav('delete-account')}
                  className={quickLinkClass}
                >
                  {copy.deleteAccountLabel}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-[#7A5F43]">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1">
            <p>© {new Date().getFullYear()} Gabba Bond ({copy.operatorValue}). {copy.rights}</p>
            <span aria-hidden="true">·</span>
            <a
              href={buildRouteHref('senear-privacy', activeLang)}
              onClick={handleSpaNav('senear-privacy')}
              className={`inline-flex min-h-9 items-center rounded-md py-1.5 hover:text-[#2C2C2C] underline underline-offset-4 transition-colors ${FOCUS_RING}`}
            >
              {copy.privacyLabel}
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={buildRouteHref('senear-terms', activeLang)}
              onClick={handleSpaNav('senear-terms')}
              className={`inline-flex min-h-9 items-center rounded-md py-1.5 hover:text-[#2C2C2C] underline underline-offset-4 transition-colors ${FOCUS_RING}`}
            >
              {copy.termsLabel}
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={buildRouteHref('senear-operations', activeLang)}
              onClick={handleSpaNav('senear-operations')}
              className={`inline-flex min-h-9 items-center rounded-md py-1.5 hover:text-[#2C2C2C] underline underline-offset-4 transition-colors ${FOCUS_RING}`}
            >
              {copy.operationsLabel}
            </a>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className={`inline-flex min-h-9 items-center gap-1.5 rounded-md px-2 py-1.5 hover:text-[#2C2C2C] transition-colors cursor-pointer shrink-0 ${FOCUS_RING}`}
          >
            <span>{copy.backToTop}</span>
            <ArrowUp aria-hidden="true" focusable="false" className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
