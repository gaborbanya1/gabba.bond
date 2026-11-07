/**
 * Path, query, and hash-aware router for the gabba.bond Umbrella Architecture:
 *
 *   /                     -> Gabba Bond Root Studio Hub
 *   /senear               -> SENEAR product microsite
 *   /senear/setup         -> SENEAR step-by-step setup guide
 *   /senear/privacy       -> SENEAR GDPR Privacy Notice (Art. 13 & 14)
 *   /senear/terms         -> SENEAR Terms of Service (ÁSZF / AGB / ToS)
 *   /senear/operations    -> SENEAR Operational & Transparency Policy
 *   /delete-account       -> SENEAR Account & Data Deletion (GDPR Art. 17 & Google Play)
 *   /junear               -> JUNEAR teaser / product page
 *   /junear/setup         -> JUNEAR setup guide
 *
 * Also supports legacy paths (/privacy, /terms, /operations, /install) and
 * hash/query fallbacks (/senear#privacy, /senear#terms, /senear#operations, ?doc=...)
 * for Android onboarding checkboxes, Caregiver PWA, and Google Play Console links.
 */
export type AppRoute =
  | 'home'
  | 'senear'
  | 'junear'
  | 'senear-setup'
  | 'junear-setup'
  | 'senear-privacy'
  | 'senear-terms'
  | 'senear-operations'
  | 'delete-account'
  | 'legal-brief';

export type ProductKey = 'senear' | 'junear';
export type LegalDocKind = 'privacy' | 'terms' | 'operations';

export const ROUTE_PATHS: Record<AppRoute, string> = {
  home: '/',
  senear: '/senear',
  junear: '/junear',
  'senear-setup': '/senear/setup',
  'junear-setup': '/junear/setup',
  'senear-privacy': '/senear/privacy',
  'senear-terms': '/senear/terms',
  'senear-operations': '/senear/operations',
  'delete-account': '/delete-account',
  'legal-brief': '/ugyved',
};

export function buildRouteHref(
  route: AppRoute,
  lang?: 'hu' | 'de' | 'en' | null,
  hash?: string
): string {
  const base = ROUTE_PATHS[route];
  const qs = lang ? `?lang=${lang}` : '';
  const cleanHash = hash ? (hash.startsWith('#') ? hash : `#${hash}`) : '';
  return `${base}${qs}${cleanHash}`;
}

export function detectLangFromUrl(): 'en' | 'hu' | 'de' | null {
  if (typeof window === 'undefined') return null;
  const path = window.location.pathname.toLowerCase();
  const params = new URLSearchParams(window.location.search);
  const langParam = params.get('lang')?.toLowerCase().split(/[-_]/)[0];
  if (langParam === 'hu' || langParam === 'en' || langParam === 'de') {
    return langParam;
  }
  if (path.startsWith('/hu/') || path === '/hu' || path.includes('/adatvedelem') || path.includes('/aszf')) return 'hu';
  if (path.startsWith('/de/') || path === '/de' || path.includes('/datenschutz') || path.includes('/agb')) return 'de';
  if (path.startsWith('/en/') || path === '/en') return 'en';
  return null;
}

function resolveDocToken(token: string | null | undefined): AppRoute | null {
  if (!token) return null;
  const t = token.toLowerCase().replace(/^#+/, '').trim();
  if (
    t === 'delete-account' ||
    t === 'data-deletion' ||
    t === 'account-deletion'
  ) {
    return 'delete-account';
  }
  if (
    t === 'privacy' ||
    t === 'privacy-policy' ||
    t === 'gdpr' ||
    t === 'adatvedelem' ||
    t === 'datenschutz'
  ) {
    return 'senear-privacy';
  }
  if (
    t === 'terms' ||
    t === 'tos' ||
    t === 'terms-of-service' ||
    t === 'aszf' ||
    t === 'agb'
  ) {
    return 'senear-terms';
  }
  if (
    t === 'operations' ||
    t === 'operational-policy' ||
    t === 'operational' ||
    t === 'mukodes' ||
    t === 'mukodesi-szabalyzat'
  ) {
    return 'senear-operations';
  }
  return null;
}

export function isLegalRoute(route: AppRoute): boolean {
  return (
    route === 'senear-privacy' ||
    route === 'senear-terms' ||
    route === 'senear-operations' ||
    route === 'delete-account'
  );
}

export function legalDocOfRoute(route: AppRoute): LegalDocKind | null {
  if (route === 'senear-privacy' || route === 'delete-account') return 'privacy';
  if (route === 'senear-terms') return 'terms';
  if (route === 'senear-operations') return 'operations';
  return null;
}

export function routeOfLegalDoc(doc: LegalDocKind): AppRoute {
  if (doc === 'privacy') return 'senear-privacy';
  if (doc === 'terms') return 'senear-terms';
  return 'senear-operations';
}

export function resolveRoute(): AppRoute {
  if (typeof window === 'undefined') return 'home';
  const rawPath = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
  // Strip optional leading language prefix (/hu, /en, /de)
  const path = rawPath.replace(/^\/(hu|en|de)(?=\/|$)/, '') || '/';
  const hash = window.location.hash.toLowerCase();
  const params = new URLSearchParams(window.location.search);

  // 1. Explicit legal path matches first (so in-page section hashes like /senear/terms#liability work)
  if (
    path === '/delete-account' ||
    path === '/data-deletion' ||
    path === '/account-deletion' ||
    path === '/senear/delete-account' ||
    path === '/senear/data-deletion' ||
    path.startsWith('/delete-account/') ||
    path.endsWith('/delete-account') ||
    path.endsWith('/data-deletion')
  ) {
    return 'delete-account';
  }

  if (
    path === '/senear/privacy' ||
    path === '/privacy' ||
    path === '/privacy-policy' ||
    path === '/senear/privacy-policy' ||
    path === '/adatvedelem' ||
    path === '/datenschutz' ||
    path.startsWith('/privacy/') ||
    path.endsWith('/privacy') ||
    path.endsWith('/privacy-policy') ||
    path.endsWith('/adatvedelem') ||
    path.endsWith('/datenschutz')
  ) {
    return 'senear-privacy';
  }

  if (
    path === '/senear/terms' ||
    path === '/terms' ||
    path === '/tos' ||
    path === '/terms-of-service' ||
    path === '/aszf' ||
    path === '/agb' ||
    path === '/senear/tos' ||
    path === '/senear/aszf' ||
    path === '/senear/agb' ||
    path.endsWith('/terms') ||
    path.endsWith('/terms-of-service') ||
    path.endsWith('/aszf') ||
    path.endsWith('/agb')
  ) {
    return 'senear-terms';
  }

  if (
    path === '/senear/operations' ||
    path === '/operations' ||
    path === '/operational-policy' ||
    path === '/mukodesi-szabalyzat' ||
    path === '/senear/operational-policy' ||
    path === '/senear/mukodes' ||
    path.endsWith('/operations') ||
    path.endsWith('/operational-policy') ||
    path.endsWith('/mukodesi-szabalyzat')
  ) {
    return 'senear-operations';
  }

  if (path === '/ugyved' || path === '/legal-brief' || path === '/jog') {
    return 'legal-brief';
  }

  if (path === '/senear/setup' || path === '/senear/install') return 'senear-setup';
  if (path === '/junear/setup' || path === '/junear/install') return 'junear-setup';
  if (path === '/install' || path === '/install-guide' || path === '/setup') return 'senear-setup';

  // 2. Query & hash fallbacks (e.g. /senear#privacy, /senear#terms, /senear#operations, ?doc=terms)
  const queryLegal = resolveDocToken(params.get('doc') || params.get('legal') || params.get('policy'));
  if (queryLegal) return queryLegal;

  const hashLegal = resolveDocToken(hash);
  if (hashLegal) return hashLegal;

  // 3. Product & guide routes
  if (path === '/senear') return 'senear';
  if (path === '/junear') return 'junear';

  if (hash === '#install' || hash === '#install-guide' || hash === '#installation' || hash === '#senear-setup') {
    return 'senear-setup';
  }
  if (hash === '#junear-setup') return 'junear-setup';
  if (hash === '#senear') return 'senear';
  if (hash === '#junear') return 'junear';

  return 'home';
}

export function productOfRoute(route: AppRoute): ProductKey | null {
  if (
    route === 'senear' ||
    route === 'senear-setup' ||
    route === 'senear-privacy' ||
    route === 'senear-terms' ||
    route === 'senear-operations' ||
    route === 'delete-account'
  ) {
    return 'senear';
  }
  if (route === 'junear' || route === 'junear-setup') return 'junear';
  return null;
}
