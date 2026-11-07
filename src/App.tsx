import { useState, useEffect, useCallback, lazy, Suspense, type ReactNode } from 'react';
import { Navbar } from './components/Navbar';
import { StudioHubPage } from './components/StudioHubPage';
import { Footer } from './components/Footer';
import { SenearLandingPage } from './components/senear/SenearLandingPage';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import {
  AppRoute,
  ROUTE_PATHS,
  isLegalRoute,
  legalDocOfRoute,
  resolveRoute,
} from './routing';

const SenearInstallGuidePage = lazy(() =>
  import('./components/SenearInstallGuidePage').then((m) => ({ default: m.SenearInstallGuidePage }))
);
const JunearSetupGuidePage = lazy(() =>
  import('./components/JunearSetupGuidePage').then((m) => ({ default: m.JunearSetupGuidePage }))
);
const ProductPage = lazy(() =>
  import('./components/ProductPage').then((m) => ({ default: m.ProductPage }))
);
const SenearLegalPage = lazy(() =>
  import('./components/legal/SenearLegalPage').then((m) => ({ default: m.SenearLegalPage }))
);
const LegalBriefPage = lazy(() =>
  import('./components/LegalBriefPage').then((m) => ({ default: m.LegalBriefPage }))
);

function Route({ element }: { path: string; element: ReactNode }) {
  return <>{element}</>;
}

const ROUTE_TITLES: Record<AppRoute, string> = {
  home: 'gabba — Technology, Bonded.',
  senear: 'SENEAR — gabba',
  junear: 'JUNEAR — gabba',
  'senear-setup': 'SENEAR Setup — gabba',
  'junear-setup': 'JUNEAR Setup — gabba',
  'senear-privacy': 'GDPR Privacy Notice — SENEAR · gabba',
  'senear-terms': 'Terms of Service (ÁSZF / AGB) — SENEAR · gabba',
  'senear-operations': 'Operational & Transparency Policy — SENEAR · gabba',
  'delete-account': 'Account & Data Deletion (GDPR) — SENEAR · gabba',
  'legal-brief': 'Ügyvédi Egyeztetési Kivonat — gabba.bond',
};

const ROUTE_ALIAS_HASHES = new Set([
  '#privacy',
  '#privacy-policy',
  '#gdpr',
  '#adatvedelem',
  '#datenschutz',
  '#terms',
  '#tos',
  '#terms-of-service',
  '#aszf',
  '#agb',
  '#operations',
  '#operational',
  '#operational-policy',
  '#mukodes',
  '#mukodesi-szabalyzat',
  '#delete-account',
  '#data-deletion',
  '#account-deletion',
  '#install',
  '#install-guide',
  '#installation',
  '#senear-setup',
  '#junear-setup',
  '#senear',
  '#junear',
]);

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
}

function normalizeLocationForRoute(targetRoute: AppRoute): string | null {
  const canonical = ROUTE_PATHS[targetRoute];
  const rawHash = window.location.hash;
  const lowerHash = rawHash.toLowerCase();
  const keepSectionHash = Boolean(rawHash && rawHash.length > 1 && !ROUTE_ALIAS_HASHES.has(lowerHash));
  const nextUrl = `${canonical}${keepSectionHash ? rawHash : ''}`;
  const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

  if (currentUrl !== nextUrl) {
    window.history.replaceState(null, '', nextUrl);
  }
  return keepSectionHash ? rawHash.slice(1) : null;
}

export function SkipToMainLink() {
  const { language } = useLanguage();
  const label =
    language === 'hu'
      ? 'Ugrás a fő tartalomra'
      : language === 'de'
      ? 'Zum Hauptinhalt springen'
      : 'Skip to main content';

  return (
    <a
      href="#main-content"
      onClick={(e) => {
        const main = document.getElementById('main-content');
        if (!main) return;
        e.preventDefault();
        main.focus({ preventScroll: true });
        const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        main.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      }}
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-xl focus:bg-[#1B7A4E] focus:px-4 focus:py-2.5 focus:text-sm focus:font-bold focus:text-white focus:outline-2 focus:outline-offset-2 focus:outline-[#1F2421]"
    >
      {label}
    </a>
  );
}

function LocalizedTitleSync({ route }: { route: AppRoute }) {
  const { t } = useLanguage();
  useEffect(() => {
    if (route === 'senear') return;
    document.title = route === 'home' ? t.pageTitle : ROUTE_TITLES[route];
  }, [route, t]);
  return null;
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() => resolveRoute());

  useEffect(() => {
    const sectionAnchor = normalizeLocationForRoute(route);
    if (sectionAnchor) {
      setTimeout(() => scrollToId(sectionAnchor), 120);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onPop = () => {
      const next = resolveRoute();
      setRoute((prev) => {
        const sectionAnchor = normalizeLocationForRoute(next);
        if (prev !== next && !sectionAnchor) {
          window.scrollTo({ top: 0, behavior: 'auto' });
        } else if (sectionAnchor) {
          setTimeout(() => scrollToId(sectionAnchor), 80);
        }
        return next;
      });
    };
    window.addEventListener('popstate', onPop);
    window.addEventListener('hashchange', onPop);
    return () => {
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('hashchange', onPop);
    };
  }, []);

  const navigate = useCallback((next: AppRoute) => {
    const path = ROUTE_PATHS[next];
    if (window.location.pathname !== path || window.location.search || window.location.hash) {
      window.history.pushState(null, '', path);
    }
    setRoute(next);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const goHomeAndScroll = (id: string) => {
    if (route !== 'home') {
      navigate('home');
      setTimeout(() => scrollToId(id), 90);
    } else {
      scrollToId(id);
    }
  };

  const scrollToContact = () => goHomeAndScroll('contact');
  const scrollToProjects = () => goHomeAndScroll('projects');

  const activeLegalDoc = legalDocOfRoute(route);

  return (
    <LanguageProvider>
      <LocalizedTitleSync route={route} />
      <div
        className={`min-h-screen bg-[#FAFAFA] text-[#2C2C2C] flex flex-col font-sans selection:bg-[#C5A880]/30 selection:text-[#1F2421] print:bg-white ${
          route === 'senear-setup' ? 'lg:h-screen lg:overflow-hidden' : ''
        }`}
      >
        <SkipToMainLink />

        <Navbar
          onContactClick={scrollToContact}
          onExploreProjects={scrollToProjects}
          onNavigate={navigate}
          currentRoute={route}
        />

        <main
          id="main-content"
          tabIndex={-1}
          className={`flex-1 focus:outline-none ${route === 'senear-setup' ? 'lg:min-h-0 lg:overflow-hidden' : ''}`}
        >
          <Suspense fallback={<div className="min-h-[70vh]" aria-busy="true" />}>
            {route === 'home' && <StudioHubPage onNavigate={navigate} />}

            {route === 'senear' && <SenearLandingPage onNavigate={navigate} />}

            {route === 'junear' && (
              <ProductPage key={route} product={route} onNavigate={navigate} onContactClick={scrollToContact} />
            )}

            {route === 'senear-setup' && (
              <Route
                path="/senear/setup"
                element={
                  <SenearInstallGuidePage
                    onBackToHome={() => navigate('home')}
                    onBackToProduct={() => navigate('senear')}
                    onContactClick={scrollToContact}
                  />
                }
              />
            )}

            {route === 'junear-setup' && (
              <JunearSetupGuidePage onNavigate={navigate} onContactClick={scrollToContact} />
            )}

            {isLegalRoute(route) && activeLegalDoc && (
              <Route
                path={ROUTE_PATHS[route]}
                element={
                  <SenearLegalPage
                    activeDoc={activeLegalDoc}
                    focusDeletion={route === 'delete-account'}
                    onNavigate={navigate}
                  />
                }
              />
            )}

            {route === 'legal-brief' && <LegalBriefPage />}
          </Suspense>
        </main>

        <div className={route === 'senear-setup' ? 'lg:hidden' : ''}>
          <Footer onNavigate={navigate} currentRoute={route} />
        </div>
      </div>
    </LanguageProvider>
  );
}
