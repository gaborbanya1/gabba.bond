import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { NogondSimulatorModal } from './components/NogondSimulatorModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { SenearInstallGuidePage } from './components/SenearInstallGuidePage';
import { ProjectItem } from './types';
import { LanguageProvider } from './i18n/LanguageContext';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'install-guide'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#install' || hash === '#install-guide' || hash === '#installation') {
        return 'install-guide';
      }
    }
    return 'home';
  });

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isNogondDemoOpen, setIsNogondDemoOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#install' || hash === '#install-guide' || hash === '#installation') {
        setCurrentPage('install-guide');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#home' || hash === '' || hash === '#projects' || hash === '#contact') {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToInstallGuide = () => {
    setCurrentPage('install-guide');
    window.location.hash = '#install-guide';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    if (window.location.hash.includes('install')) {
      window.history.pushState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToContact = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const contactEl = document.querySelector('#contact');
        if (contactEl) {
          contactEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      return;
    }

    const contactEl = document.querySelector('#contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const projectsEl = document.querySelector('#projects');
        if (projectsEl) {
          projectsEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      return;
    }

    const projectsEl = document.querySelector('#projects');
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#FAFAFA] text-[#2C2C2C] flex flex-col font-sans selection:bg-[#C5A880]/30 selection:text-[#1F2421]">
        {/* Top Navbar with Language Switcher */}
        <Navbar
          onContactClick={scrollToContact}
          onExploreProjects={scrollToProjects}
          onInstallGuideClick={navigateToInstallGuide}
          onHomeClick={navigateToHome}
          currentPage={currentPage}
        />

        {/* Main Content Sections */}
        <main className="flex-1">
          {currentPage === 'home' ? (
            <>
              {/* 1. Hero Section */}
              <Hero
                onViewProjects={scrollToProjects}
                onGetInTouch={scrollToContact}
                onOpenNogondDemo={() => setIsNogondDemoOpen(true)}
              />

              {/* 2. Projects & Solutions: Stacked SENEAR & JUNEAR Tiles */}
              <Projects
                onSelectProject={(project) => setSelectedProject(project)}
                onOpenNogondDemo={() => setIsNogondDemoOpen(true)}
                onOpenInstallGuide={navigateToInstallGuide}
              />

              {/* 3. Contact Section */}
              <Contact />
            </>
          ) : (
            /* SENEAR Android Enterprise QR Provisioning Installation Guide Subpage */
            <SenearInstallGuidePage
              onBackToHome={navigateToHome}
              onOpenSimulator={() => setIsNogondDemoOpen(true)}
              onContactClick={scrollToContact}
            />
          )}
        </main>

        {/* Footer */}
        <Footer />

        {/* Interactive SENEAR Launcher Simulator Modal */}
        <NogondSimulatorModal
          isOpen={isNogondDemoOpen}
          onClose={() => setIsNogondDemoOpen(false)}
        />

        {/* Architectural Case Study Detail Modal */}
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
