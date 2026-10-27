/**
 * Lightweight path-based router for the gabba.bond single page app.
 *
 *   /                -> home
 *   /senear          -> SENEAR product page
 *   /junear          -> JUNEAR product page
 *   /senear/setup    -> SENEAR setup guide
 *   /junear/setup    -> JUNEAR setup guide
 *   /privacy         -> SENEAR Privacy Policy (GDPR)
 *   /delete-account  -> SENEAR Account & Data Deletion (GDPR Art. 17 & Google Play)
 *
 * Legacy URLs (/install, /install-guide, #install-guide, ...) are mapped to /senear/setup.
 */
export type AppRoute = 'home' | 'senear' | 'junear' | 'senear-setup' | 'junear-setup' | 'privacy' | 'delete-account';
export type ProductKey = 'senear' | 'junear';

export const ROUTE_PATHS: Record<AppRoute, string> = {
  home: '/',
  senear: '/senear',
  junear: '/junear',
  'senear-setup': '/senear/setup',
  'junear-setup': '/junear/setup',
  privacy: '/privacy',
  'delete-account': '/delete-account',
};

export function detectLangFromUrl(): 'en' | 'hu' | 'de' | null {
  if (typeof window === 'undefined') return null;
  const path = window.location.pathname.toLowerCase();
  const params = new URLSearchParams(window.location.search);
  const langParam = params.get('lang')?.toLowerCase();
  if (langParam === 'hu' || langParam === 'en' || langParam === 'de') {
    return langParam;
  }
  if (path.startsWith('/hu/') || path === '/hu' || path.includes('/adatvedelem')) return 'hu';
  if (path.startsWith('/de/') || path === '/de' || path.includes('/datenschutz')) return 'de';
  if (path.startsWith('/en/') || path === '/en') return 'en';
  return null;
}

export function resolveRoute(): AppRoute {
  if (typeof window === 'undefined') return 'home';
  const rawPath = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
  // Strip optional leading language prefix (/hu, /en, /de)
  const path = rawPath.replace(/^\/(hu|en|de)(?=\/|$)/, '') || '/';
  const hash = window.location.hash.toLowerCase();

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
    path === '/privacy' ||
    path === '/privacy-policy' ||
    path === '/senear/privacy' ||
    path === '/senear/privacy-policy' ||
    path === '/adatvedelem' ||
    path === '/datenschutz' ||
    path.startsWith('/privacy/') ||
    path.endsWith('/privacy') ||
    path.endsWith('/privacy-policy') ||
    path.endsWith('/adatvedelem') ||
    path.endsWith('/datenschutz')
  ) {
    return 'privacy';
  }

  if (path === '/senear/setup' || path === '/senear/install') return 'senear-setup';
  if (path === '/junear/setup' || path === '/junear/install') return 'junear-setup';
  if (path === '/install' || path === '/install-guide' || path === '/setup') return 'senear-setup';
  if (path === '/senear') return 'senear';
  if (path === '/junear') return 'junear';

  if (hash === '#delete-account' || hash === '#data-deletion' || hash === '#account-deletion') return 'delete-account';
  if (hash === '#privacy' || hash === '#privacy-policy' || hash === '#gdpr' || hash === '#adatvedelem' || hash === '#datenschutz') return 'privacy';
  if (hash === '#install' || hash === '#install-guide' || hash === '#installation' || hash === '#senear-setup')
    return 'senear-setup';
  if (hash === '#junear-setup') return 'junear-setup';
  if (hash === '#senear') return 'senear';
  if (hash === '#junear') return 'junear';

  return 'home';
}

export function productOfRoute(route: AppRoute): ProductKey | null {
  if (route === 'senear' || route === 'senear-setup' || route === 'privacy' || route === 'delete-account') return 'senear';
  if (route === 'junear' || route === 'junear-setup') return 'junear';
  return null;
}
