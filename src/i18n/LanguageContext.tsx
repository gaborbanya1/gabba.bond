import React, { createContext, useContext, useEffect } from 'react';
import { RTL_LANGUAGES, SUPPORTED_LANGUAGES, SupportedLanguage, TranslationData } from './types';
import { translations } from './translations';

interface LanguageContextType {
  language: SupportedLanguage;
  t: TranslationData;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/** Normalizes a BCP-47 tag to a supported 2-letter key (de-AT -> de, zh-CN -> zh, id -> in). */
function toSupported(tag: string | null | undefined): SupportedLanguage | null {
  if (!tag) return null;
  let code = tag.toLowerCase().split(/[-_]/)[0];
  if (code === 'id') code = 'in';
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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language] = React.useState<SupportedLanguage>(detectLanguage);
  const t = translations[language] ?? translations.en;

  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dir = RTL_LANGUAGES.includes(language) ? 'rtl' : 'ltr';
    if (t.pageTitle) document.title = t.pageTitle;
  }, [language, t]);

  return <LanguageContext.Provider value={{ language, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
