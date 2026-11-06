import { useState, useEffect, useCallback, lazy, Suspense, type ReactNode } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { SenearLandingPage } from './components/senear/SenearLandingPage';
import { ProjectItem } from './types';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { AppRoute, ProductKey, ROUTE_PATHS, resolveRoute } from './routing';

// Route-level code splitting: these pages/modals are loaded only when needed,
// which keeps the initial bundle of the landing pages small.
const NogondSimulatorModal = lazy(() =>
  import('./components/NogondSimulatorModal').then((m) => ({ default: m.NogondSimulatorModal }))
);
const SenearInstallGuidePage = lazy(() =>
  import('./components/SenearInstallGuidePage').then((m) => ({ default: m.SenearInstallGuidePage }))
);
const JunearSetupGuidePage = lazy(() =>
  import('./components/JunearSetupGuidePage').then((m) => ({ default: m.JunearSetupGuidePage }))
);
const ProductPage = lazy(() => import('./components/ProductPage').then((m) => ({ default: m.ProductPage })));
const PrivacyPage = lazy(() => import('./components/PrivacyPage').then((m) => ({ default: m.PrivacyPage })));
const LegalBriefPage = lazy(() => import('./components/LegalBriefPage').then((m) => ({ default: m.LegalBriefPage })));

/**
 * Supported URL paths:
 * - /senear/setup & /senear/install -> SenearInstallGuidePage
 * - /privacy & /senear/privacy      -> PrivacyPage
 */
function Route({ element }: { path: string; element: ReactNode }) {
  return <>{element}</>;
}

const ROUTE_TITLES: Record<AppRoute, string> = {
  home: 'gabba — Technology, Bonded.',
  senear: 'SENEAR — gabba',
  junear: 'JUNEAR — gabba',
  'senear-setup': 'SENEAR Setup — gabba',
  'junear-setup': 'JUNEAR Setup — gabba',
  privacy: 'Privacy Policy (GDPR) — SENEAR · gabba',
  'delete-account': 'Account & Data Deletion (GDPR) — SENEAR · gabba',
  'legal-brief': 'Ügyvédi Egyeztetési Kivonat — gabba.bond',
};

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
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

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() => resolveRoute());
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isNogondDemoOpen, setIsNogondDemoOpen] = useState(false);

  // Normalize legacy URLs (/install, #install-guide, ?lang=...) to the canonical path once.
  useEffect(() => {
    const canonical = ROUTE_PATHS[route];
    const params = new URLSearchParams(window.location.search);
    params.delete('lang');
    const qs = params.toString();
    const search = qs ? `?${qs}` : '';
    const hash = window.location.hash;
    const keepHash = route === 'home' && (hash === '#projects' || hash === '#contact');
    if (window.location.pathname !== canonical || window.location.search !== search || (hash && !keepHash)) {
      window.history.replaceState(null, '', canonical + search + (keepHash ? hash : ''));
    }
    if (keepHash) {
      setTimeout(() => scrollToId(hash.slice(1)), 120);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onPop = () => setRoute(resolveRoute());
    window.addEventListener('popstate', onPop);
    window.addEventListener('hashchange', onPop);
    return () => {
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('hashchange', onPop);
    };
  }, []);

  useEffect(() => {
    // The SENEAR landing page manages its own localized title.
    if (route === 'senear') return;
    document.title = ROUTE_TITLES[route];
  }, [route]);

  const navigate = useCallback((next: AppRoute) => {
    const path = ROUTE_PATHS[next];
    const search = window.location.search || '';
    if (window.location.pathname !== path || window.location.hash) {
      window.history.pushState(null, '', path + search);
    }
    setRoute(next);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const goHomeAndScroll = (id: string) => {
    if (route !== 'home') {
      navigate('home');
      setTimeout(() => scrollToId(id), 80);
    } else {
      scrollToId(id);
    }
  };

  const scrollToContact = () => goHomeAndScroll('contact');
  const scrollToProjects = () => goHomeAndScroll('projects');
  const openProduct = (product: ProductKey) => navigate(product);

  return (
    <LanguageProvider>
      <div
        className={`min-h-screen bg-[#FAFAFA] text-[#2C2C2C] flex flex-col font-sans selection:bg-[#C5A880]/30 selection:text-[#1F2421] ${
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
          {route === 'home' && (
            <>
              <Hero onViewProjects={scrollToProjects} onGetInTouch={scrollToContact} onOpenProduct={openProduct} />
              <Projects onOpenProduct={openProduct} />
              <Contact />
            </>
          )}

          {route === 'senear' && <SenearLandingPage onNavigate={navigate} />}

          {route === 'junear' && (
            <ProductPage key={route} product={route} onNavigate={navigate} onContactClick={scrollToContact} />
          )}

          {route === 'senear-setup' && (
            <>
              {/* Supports both /senear/setup (Android app) and /senear/install */}
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
            </>
          )}

          {route === 'junear-setup' && <JunearSetupGuidePage onNavigate={navigate} onContactClick={scrollToContact} />}

          {(route === 'privacy' || route === 'delete-account') && (
            <>
              {/* Supports /privacy, /senear/privacy, /delete-account, and /data-deletion */}
              <Route
                path={route === 'delete-account' ? '/delete-account' : '/privacy'}
                element={
                  <PrivacyPage
                    onBackToHome={() => navigate('home')}
                    onBackToSenear={() => navigate('senear')}
                    focusDeletion={route === 'delete-account'}
                  />
                }
              />
            </>
          )}

          {route === 'legal-brief' && <LegalBriefPage />}
          </Suspense>
        </main>

        <div className={route === 'senear-setup' ? 'lg:hidden' : route === 'legal-brief' ? 'print:hidden' : ''}>
          <Footer onNavigate={navigate} />
        </div>

        {isNogondDemoOpen && (
          <Suspense fallback={null}>
            <NogondSimulatorModal isOpen={isNogondDemoOpen} onClose={() => setIsNogondDemoOpen(false)} />
          </Suspense>
        )}

        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onOpenDemo={() => {
            setSelectedProject(null);
            setIsNogondDemoOpen(true);
          }}
        />
      </div>
    </LanguageProvider>
  );
}
