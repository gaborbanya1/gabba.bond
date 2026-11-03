import React, { createContext, useCallback, useContext, useEffect } from 'react';
import { RTL_LANGUAGES, SUPPORTED_LANGUAGES, SupportedLanguage, TranslationData } from './types';
import { translations } from './translations';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (next: SupportedLanguage) => void;
  t: TranslationData;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/** Normalizes a BCP-47 tag to a supported 2-letter key (de-AT -> de, zh-CN -> zh, in -> id). */
function toSupported(tag: string | null | undefined): SupportedLanguage | null {
  if (!tag) return null;
  let code = tag.toLowerCase().split(/[-_]/)[0];
  if (code === 'in') code = 'id';
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(code) ? (code as SupportedLanguage) : null;
}

/**
 * Picks the first supported language from the browser preference list.
 * An explicit `?lang=xx` URL parameter (useful for testing / sharing) takes precedence.
 * Falls back strictly to English.
 */
function detectLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'en';

  const fromParam = toSupported(new URLSearchParams(window.location.search).get('lang'));
  if (fromParam) return fromParam;

  const prefs = [...(navigator.languages ?? []), navigator.language];
  for (const tag of prefs) {
    const match = toSupported(tag);
    if (match) return match;
  }
  return 'en';
}

export function LanguageProvider({
  children,
  initialLanguage,
}: {
  children: React.ReactNode;
  /** Forces a language (used by the build-time prerender, where no browser is available). */
  initialLanguage?: SupportedLanguage;
}) {
  const [language, setLanguageState] = React.useState<SupportedLanguage>(() => initialLanguage ?? detectLanguage());
  const effectiveLang: SupportedLanguage = translations[language] ? language : 'en';
  const t = translations[effectiveLang] ?? translations.en;

  const setLanguage = useCallback((next: SupportedLanguage) => {
    setLanguageState(next);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', next);
      window.history.replaceState(null, '', url.pathname + url.search + url.hash);
    }
  }, []);

  // Sync language when browser back/forward navigates across ?lang= URLs.
  useEffect(() => {
    const onPopState = () => {
      const fromUrl = toSupported(new URLSearchParams(window.location.search).get('lang'));
      if (fromUrl) setLanguageState(fromUrl);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Document titles are set per route in App.tsx (and by the SENEAR landing page itself).
  useEffect(() => {
    const root = document.documentElement;
    root.lang = effectiveLang;
    root.dir = RTL_LANGUAGES.includes(effectiveLang) ? 'rtl' : 'ltr';
  }, [effectiveLang]);

  return <LanguageContext.Provider value={{ language: effectiveLang, setLanguage, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
