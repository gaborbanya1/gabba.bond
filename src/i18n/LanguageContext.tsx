import React, { createContext, useContext, useEffect } from 'react';
import { RTL_LANGUAGES, SUPPORTED_LANGUAGES, SupportedLanguage, TranslationData } from './types';
import { translations } from './translations';

interface LanguageContextType {
  language: SupportedLanguage;
  t: TranslationData;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/** Normalizes a BCP-47 tag to a supported 2-letter key (hu-HU -> hu, de-AT -> de, en-US -> en). */
function toSupported(tag: string | null | undefined): SupportedLanguage | null {
  if (!tag) return null;
  const code = tag.toLowerCase().split(/[-_]/)[0];
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(code) && Boolean(translations[code as SupportedLanguage])
    ? (code as SupportedLanguage)
    : null;
}

/**
 * Resolves active language strictly from the visitor's browser/OS preference list
 * (`navigator.languages` / `navigator.language`), falling back to English ('en').
 */
function detectBrowserLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'en';

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
  /** Forces a language during build-time SSR prerender where no browser exists. */
  initialLanguage?: SupportedLanguage;
}) {
  const [language, setLanguageState] = React.useState<SupportedLanguage>(
    () => initialLanguage ?? detectBrowserLanguage()
  );
  const effectiveLang: SupportedLanguage = translations[language] ? language : 'en';
  const t = translations[effectiveLang] ?? translations.en;

  useEffect(() => {
    if (initialLanguage) return;
    const syncBrowserLanguage = () => setLanguageState(detectBrowserLanguage());
    syncBrowserLanguage();
    window.addEventListener('languagechange', syncBrowserLanguage);
    return () => window.removeEventListener('languagechange', syncBrowserLanguage);
  }, [initialLanguage]);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = effectiveLang;
    root.dir = RTL_LANGUAGES.includes(effectiveLang) ? 'rtl' : 'ltr';
  }, [effectiveLang]);

  return (
    <LanguageContext.Provider value={{ language: effectiveLang, t }}>
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
