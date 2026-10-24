/**
 * Lightweight path-based router for the gabba.bond single page app.
 *
 *   /               -> home
 *   /senear         -> SENEAR product page
 *   /junear         -> JUNEAR product page
 *   /senear/setup   -> SENEAR setup guide
 *   /junear/setup   -> JUNEAR setup guide
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

export function resolveRoute(): AppRoute {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
  const hash = window.location.hash.toLowerCase();

  if (
    path === '/delete-account' ||
    path === '/data-deletion' ||
    path === '/senear/delete-account' ||
    path === '/senear/data-deletion'
  )
    return 'delete-account';

  if (
    path === '/privacy' ||
    path === '/privacy-policy' ||
    path === '/senear/privacy' ||
    path === '/senear/privacy-policy' ||
    path === '/adatvedelem' ||
    path === '/datenschutz'
  )
    return 'privacy';
  if (path === '/senear/setup' || path === '/senear/install') return 'senear-setup';
  if (path === '/junear/setup' || path === '/junear/install') return 'junear-setup';
  if (path === '/install' || path === '/install-guide' || path === '/setup') return 'senear-setup';
  if (path === '/senear') return 'senear';
  if (path === '/junear') return 'junear';

  if (hash === '#delete-account' || hash === '#data-deletion') return 'delete-account';
  if (hash === '#privacy' || hash === '#privacy-policy' || hash === '#gdpr') return 'privacy';
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
