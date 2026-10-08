import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage, TranslationData } from './types';
import { translations } from './translations';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationData;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'gabba_preferred_language';

export const LANGUAGE_OPTIONS: { code: SupportedLanguage; label: string; short: string; flag: string }[] = [
  { code: 'en', label: 'English', short: 'EN', flag: 'EN' },
  { code: 'hu', label: 'Magyar', short: 'HU', flag: 'HU' },
  { code: 'de', label: 'Deutsch', short: 'DE', flag: 'DE' },
];

function detectInitialLanguage(): SupportedLanguage {
  // 1. Check URL parameters, e.g. ?lang=hu or ?lang=de or ?lang=en
  if (typeof window !== 'undefined' && window.location) {
    const params = new URLSearchParams(window.location.search);
    const paramLang = params.get('lang')?.toLowerCase();
    if (paramLang === 'hu' || paramLang === 'de' || paramLang === 'en') {
      return paramLang;
    }
  }

  // 2. Check LocalStorage
  if (typeof window !== 'undefined' && window.localStorage) {
    const saved = localStorage.getItem(STORAGE_KEY)?.toLowerCase();
    if (saved === 'hu' || saved === 'de' || saved === 'en') {
      return saved as SupportedLanguage;
    }
  }

  // 3. Check browser language settings (navigator.languages and navigator.language)
  if (typeof navigator !== 'undefined') {
    const userLangs = [
      ...(Array.isArray(navigator.languages) ? navigator.languages : []),
      navigator.language,
    ].filter(Boolean);

    for (const lang of userLangs) {
      const lower = lang.toLowerCase();
      if (lower.startsWith('hu')) return 'hu';
      if (lower.startsWith('de')) return 'de';
      if (lower.startsWith('en')) return 'en';
    }
  }

  // Default fallback
  return 'en';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>(detectInitialLanguage);

  useEffect(() => {
    // Set document lang attribute for accessibility and SEO
    document.documentElement.lang = language;

    // Update document title and OpenGraph tags dynamically based on active language
    const currentT = translations[language] || translations.en;
    if (currentT.pageTitle) {
      document.title = currentT.pageTitle;
    }
  }, [language]);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_KEY, lang);
    }
    // Optionally update or keep url param
    if (typeof window !== 'undefined' && window.history) {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', lang);
      window.history.replaceState({}, '', url.toString());
    }
  };

  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
