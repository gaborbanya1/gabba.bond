import React, { createContext, useCallback, useContext, useEffect } from 'react';
import { RTL_LANGUAGES, SUPPORTED_LANGUAGES, SupportedLanguage, TranslationData } from './types';
import { translations } from './translations';
import { detectLangFromUrl } from '../routing';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage, options?: { syncUrl?: boolean }) => void;
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
 * Resolves active language with priority:
 * 1. Explicit URL parameter (`?lang=hu|de|en`) or localized path prefix
 * 2. Active browser/device language (`navigator.languages[0]` or `navigator.language`)
 * 3. English ('en') fallback
 */
function detectLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'en';

  const urlLang = detectLangFromUrl();
  if (urlLang) return urlLang;

  const primaryTag = navigator.languages?.[0] || navigator.language;
  return toSupported(primaryTag) ?? 'en';
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

  const setLanguage = useCallback((next: SupportedLanguage, options?: { syncUrl?: boolean }) => {
    const valid: SupportedLanguage = translations[next] ? next : 'en';
    setLanguageState(valid);

    if (typeof window !== 'undefined' && (options?.syncUrl ?? true)) {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', valid);
      window.history.replaceState(null, '', url.pathname + url.search + url.hash);
    }
  }, []);

  // Keep in sync with browser back/forward (?lang=...) and OS language changes (when no ?lang= override is active).
  useEffect(() => {
    if (initialLanguage) return;
    const syncLanguage = () => {
      setLanguageState(detectLanguage());
    };
    syncLanguage();
    window.addEventListener('popstate', syncLanguage);
    window.addEventListener('languagechange', syncLanguage);
    return () => {
      window.removeEventListener('popstate', syncLanguage);
      window.removeEventListener('languagechange', syncLanguage);
    };
  }, [initialLanguage]);

  // Document titles are set per route in App.tsx (and by the SENEAR landing page itself).
  useEffect(() => {
    const root = document.documentElement;
    root.lang = effectiveLang;
    root.dir = RTL_LANGUAGES.includes(effectiveLang) ? 'rtl' : 'ltr';
  }, [effectiveLang]);

  return (
    <LanguageContext.Provider value={{ language: effectiveLang, setLanguage, t }}>
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
