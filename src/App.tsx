import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { NogondSimulatorModal } from './components/NogondSimulatorModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { SenearInstallGuidePage } from './components/SenearInstallGuidePage';
import { JunearSetupGuidePage } from './components/JunearSetupGuidePage';
import { ProductPage } from './components/ProductPage';
import { PrivacyPage } from './components/PrivacyPage';
import { ProjectItem } from './types';
import { LanguageProvider } from './i18n/LanguageContext';
import { AppRoute, ProductKey, ROUTE_PATHS, resolveRoute } from './routing';

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
};

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() => resolveRoute());
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isNogondDemoOpen, setIsNogondDemoOpen] = useState(false);

  // Normalize legacy URLs (/install, #install-guide, ...) to the canonical path once.
  useEffect(() => {
    const canonical = ROUTE_PATHS[route];
    const search = window.location.search || '';
    const hash = window.location.hash;
    const keepHash = route === 'home' && (hash === '#projects' || hash === '#contact');
    if (window.location.pathname !== canonical || (hash && !keepHash)) {
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
      <div className="min-h-screen bg-[#FAFAFA] text-[#2C2C2C] flex flex-col font-sans selection:bg-[#C5A880]/30 selection:text-[#1F2421]">
        <Navbar
          onContactClick={scrollToContact}
          onExploreProjects={scrollToProjects}
          onNavigate={navigate}
          currentRoute={route}
        />

        <main className="flex-1">
          {route === 'home' && (
            <>
              <Hero onViewProjects={scrollToProjects} onGetInTouch={scrollToContact} onOpenProduct={openProduct} />
              <Projects onOpenProduct={openProduct} />
              <Contact />
            </>
          )}

          {(route === 'senear' || route === 'junear') && (
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
        </main>

        <Footer onNavigate={navigate} />

        <NogondSimulatorModal isOpen={isNogondDemoOpen} onClose={() => setIsNogondDemoOpen(false)} />

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
