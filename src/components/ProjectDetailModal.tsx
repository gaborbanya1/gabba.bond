import { useEffect } from 'react';
import { X, CheckCircle, Sparkles, TrendingUp } from 'lucide-react';
import { ProjectItem } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenDemo?: () => void;
}

const MODAL_I18N = {
  hu: {
    caseStudy: 'Architektúra Esettanulmány',
    overviewMission: 'Áttekintés & Célkitűzés',
    challenge: 'A Mérnöki Kihívás',
    solution: 'A gabba Megoldás',
    highlights: 'Műszaki & Architektúrális Főbb Pontok',
    impact: 'Mérhető Gyakorlati Hatás',
    techStack: 'Alkalmazott Technológiai Stack',
    engineeredBy: 'Fejlesztette: gabba',
    launchDemo: 'Interaktív Demó Indítása',
    close: 'Bezárás',
  },
  de: {
    caseStudy: 'Architektur-Fallstudie',
    overviewMission: 'Überblick & Mission',
    challenge: 'Die Technische Herausforderung',
    solution: 'Die gabba Lösung',
    highlights: 'Technische & Architektonische Highlights',
    impact: 'Messbare Produktionswirkung',
    techStack: 'Technologie-Stack',
    engineeredBy: 'Entwickelt von gabba',
    launchDemo: 'Interaktive Demo Starten',
    close: 'Schließen',
  },
  en: {
    caseStudy: 'Architecture Case Study',
    overviewMission: 'Overview & Mission',
    challenge: 'The Engineering Challenge',
    solution: 'The gabba Solution',
    highlights: 'Technical & Architectural Highlights',
    impact: 'Measurable Production Impact',
    techStack: 'Technology Stack',
    engineeredBy: 'Engineered by gabba',
    launchDemo: 'Launch Interactive Demo',
    close: 'Close',
  },
};

export function ProjectDetailModal({ project, onClose, onOpenDemo }: ProjectDetailModalProps) {
  const { language } = useLanguage();
  const m = MODAL_I18N[language] || MODAL_I18N.en;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#2C2C2C]/70 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-3xl bg-[#FFFFFF] rounded-2xl border border-[#C5A880]/50 shadow-2xl overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-[#F5F0EB] border-b border-[#C5A880]/30">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[#FFFFFF] text-[#A38053] border border-[#C5A880]/40">
                {project.category}
              </span>
              <span className="text-xs text-[#6E6B65]">{m.caseStudy}</span>
            </div>
            <h3 id="case-study-title" className="font-heading font-bold text-xl sm:text-2xl text-[#2C2C2C] mt-1">
              {project.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#5C5A56] hover:text-[#2C2C2C] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
            aria-label={m.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Subtitle & Summary */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#A38053]">{m.overviewMission}</h4>
            <p className="text-base text-[#2C2C2C] font-medium leading-relaxed">
              {project.subtitle}
            </p>
            <p className="text-sm text-[#5C5A56] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3] space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                <span>{m.challenge}</span>
              </h5>
              <p className="text-xs sm:text-sm text-[#5C5A56] leading-relaxed">
                {project.problemStatement}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#C5A880]/40 space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#A38053] flex items-center gap-1.5">
                <span>{m.solution}</span>
              </h5>
              <p className="text-xs sm:text-sm text-[#5C5A56] leading-relaxed">
                {project.solutionArchitecture}
              </p>
            </div>
          </div>

          {/* Key Architectural Highlights */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#2C2C2C]">
              {m.highlights}
            </h5>
            <div className="space-y-2">
              {project.keyHighlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-[#FFFFFF] border border-[#F0EAE1]">
                  <CheckCircle className="w-4 h-4 text-[#A38053] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-[#2C2C2C] leading-relaxed">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics Bento */}
          <div className="p-4 rounded-xl bg-[#F5F0EB]/60 border border-[#C5A880]/30 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A38053]">
              <TrendingUp className="w-4 h-4" />
              <span>{m.impact}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.metrics.map((metric, idx) => (
                <div key={idx} className="p-3 bg-[#FFFFFF] rounded-lg border border-[#E8DFD3] text-center">
                  <p className="text-lg sm:text-xl font-bold font-heading text-[#2C2C2C]">{metric.value}</p>
                  <p className="text-[11px] text-[#6E6B65] mt-0.5">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#2C2C2C]">{m.techStack}</h5>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-md text-xs font-medium bg-[#F5F0EB] text-[#2C2C2C] border border-[#C5A880]/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#F5F0EB] border-t border-[#C5A880]/30 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-[#6E6B65]">{m.engineeredBy}</span>
          <div className="flex items-center gap-3">
            {project.demoAvailable && onOpenDemo && (
              <button
                onClick={() => {
                  onClose();
                  onOpenDemo();
                }}
                className="px-4 py-2 rounded-lg bg-[#FFFFFF] hover:bg-[#F5F0EB] text-[#2C2C2C] text-xs font-semibold border border-[#C5A880] flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{m.launchDemo}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#2C2C2C] hover:bg-[#1A1A1A] text-[#FAFAFA] text-xs font-semibold cursor-pointer"
            >
              {m.close}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
