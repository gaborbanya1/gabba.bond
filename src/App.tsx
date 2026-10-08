import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { NogondSimulatorModal } from './components/NogondSimulatorModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ProjectItem } from './types';
import { LanguageProvider } from './i18n/LanguageContext';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isNogondDemoOpen, setIsNogondDemoOpen] = useState(false);

  const scrollToContact = () => {
    const contactEl = document.querySelector('#contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
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
        />

        {/* Main Content Sections */}
        <main className="flex-1">
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
          />

          {/* 3. Contact Section */}
          <Contact />
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
