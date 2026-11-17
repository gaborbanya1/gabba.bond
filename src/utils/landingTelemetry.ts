/**
 * First-party, cookie-free, GDPR-compliant telemetry for `/senear` and `/senear/setup`.
 *
 * - Stores ZERO cookies, ZERO localStorage/sessionStorage items, and ZERO PII/IP addresses.
 * - Captures attribution (`utm_source`, `utm_medium`, `utm_campaign`, `fbclid`, `gclid`,
 *   `document.referrer`, and Facebook/YouTube mobile in-app browser User-Agent markers)
 *   before SPA URL normalization strips query strings.
 * - Tracks active section reading time (`IntersectionObserver` + page visibility + idle guard),
 *   maximum scroll depth (%), exit/drop-off section, and click events (`data-telemetry-click`).
 * - Flushes one compact session document per visit to Cloud Firestore (`landing_sessions/{sessionId}`)
 *   using `fetch(..., { keepalive: true })`.
 */

export type TelemetryPageId = 'senear' | 'senear_setup';
export type TelemetrySource = 'youtube' | 'facebook' | 'google' | 'direct' | 'other';
export type TelemetryLang = 'hu' | 'de' | 'en';
export type TelemetryDevice = 'mobile' | 'tablet' | 'desktop';

interface AttributionInfo {
  source: TelemetrySource;
  medium: string;
  campaign: string;
  referrerHost: string;
}

let cachedAttribution: AttributionInfo | null = null;

function generateSessionId(): string {
  const ts = Date.now().toString(36);
  const randBytes = new Uint8Array(10);
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    crypto.getRandomValues(randBytes);
  } else {
    for (let i = 0; i < randBytes.length; i += 1) {
      randBytes[i] = Math.floor(Math.random() * 256);
    }
  }
  const randHex = Array.from(randBytes, (b) => b.toString(16).padStart(2, '0')).join('');
  return `sn_${ts}_${randHex}`.slice(0, 48);
}

function sanitizeShort(val: string | null | undefined, maxLen: number): string {
  if (!val) return '';
  return val.trim().replace(/[^\w\-./:@ ]+/g, '').slice(0, maxLen);
}

export function captureInitialAttribution(): AttributionInfo {
  if (cachedAttribution) return cachedAttribution;
  if (typeof window === 'undefined') {
    return { source: 'direct', medium: 'none', campaign: '', referrerHost: 'direct' };
  }

  const params = new URLSearchParams(window.location.search);
  const utmSource = (params.get('utm_source') || params.get('src') || params.get('source') || '').toLowerCase().trim();
  const utmMedium = sanitizeShort(params.get('utm_medium') || params.get('medium'), 64);
  const utmCampaign = sanitizeShort(
    params.get('utm_campaign') || params.get('campaign') || params.get('utm_content'),
    128
  );
  const hasFbclid = params.has('fbclid');
  const hasGclid = params.has('gclid') || params.has('wbraid') || params.has('gbraid');

  const ua = typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';
  const isFbInApp = /FBAN|FBAV|FB_IAB|FBIOS|Instagram/i.test(ua);
  const isYtInApp = /com\.google\.android\.youtube|YouTube/i.test(ua);

  let refHost = 'direct';
  try {
    if (document.referrer) {
      const url = new URL(document.referrer);
      if (url.hostname && url.hostname !== window.location.hostname) {
        refHost = sanitizeShort(url.hostname.toLowerCase().replace(/^www\./, ''), 128) || 'direct';
      }
    }
  } catch {
    refHost = 'direct';
  }

  let source: TelemetrySource = 'direct';
  let medium = utmMedium || 'none';

  if (
    utmSource.includes('youtube') ||
    utmSource === 'yt' ||
    refHost.includes('youtube.') ||
    refHost === 'youtu.be' ||
    isYtInApp
  ) {
    source = 'youtube';
    if (!utmMedium) medium = isYtInApp ? 'in_app_browser' : 'video';
    if (refHost === 'direct' && isYtInApp) refHost = 'youtube-in-app';
  } else if (
    utmSource.includes('facebook') ||
    utmSource === 'fb' ||
    utmSource.includes('instagram') ||
    hasFbclid ||
    refHost.includes('facebook.') ||
    refHost.includes('fb.com') ||
    refHost.includes('instagram.') ||
    isFbInApp
  ) {
    source = 'facebook';
    if (!utmMedium) medium = isFbInApp ? 'in_app_browser' : hasFbclid ? 'social_click' : 'social';
    if (refHost === 'direct' && (isFbInApp || hasFbclid)) refHost = isFbInApp ? 'fb-in-app' : 'facebook.com';
  } else if (
    utmSource.includes('google') ||
    hasGclid ||
    refHost.includes('google.')
  ) {
    source = 'google';
    if (!utmMedium) medium = hasGclid ? 'cpc' : 'organic';
  } else if (utmSource || refHost !== 'direct') {
    source = 'other';
    if (!utmMedium) medium = utmSource ? sanitizeShort(utmSource, 64) : 'referral';
  }

  cachedAttribution = {
    source,
    medium: medium || 'none',
    campaign: utmCampaign,
    referrerHost: refHost || 'direct',
  };
  return cachedAttribution;
}

// Capture immediately on module load before SPA history.replaceState runs
if (typeof window !== 'undefined') {
  captureInitialAttribution();
}

function detectDeviceType(): TelemetryDevice {
  if (typeof window === 'undefined') return 'desktop';
  const w = window.innerWidth || 1024;
  if (w < 768) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
}

function isAutomatedBot(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return true;
  const win = window as Window & { __SENEAR_FORCE_TELEMETRY__?: boolean };
  if (win.__SENEAR_FORCE_TELEMETRY__ === true) return false;
  const ua = navigator.userAgent || '';
  if (/bot|crawl|spider|slurp|bingpreview|facebookexternalhit|whatsapp|telegrambot|Lighthouse|HeadlessChrome/i.test(ua)) {
    return true;
  }
  return Boolean(navigator.webdriver);
}

function resolveFirestoreProjectId(): string {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    if (params.get('env') === 'dev') return 'nogond-senear-dev';
  }
  return 'nogond-834ed';
}

export function startSenearLandingTelemetry(opts: {
  page: TelemetryPageId;
  lang: TelemetryLang;
  rootEl: HTMLElement | null;
}): () => void {
  if (typeof window === 'undefined' || !opts.rootEl || isAutomatedBot()) {
    return () => {};
  }

  const attribution = captureInitialAttribution();
  const projectId = resolveFirestoreProjectId();
  const sessionId = generateSessionId();
  const startedAtMs = Date.now();
  const deviceType = detectDeviceType();

  const sectionDwell: Record<string, number> = {};
  const reachedSet = new Set<string>(['hero']);
  const clicks: Record<string, number> = {};

  let currentSection = 'hero';
  let lastSection = 'hero';
  let totalActiveSec = 0;
  let maxScrollPct = 10;
  let convertedPlayClick = false;
  let convertedSetupClick = false;
  let primaryCtaTarget = '';
  let lastInteractionAt = Date.now();
  let dirty = true;

  const markInteraction = () => {
    lastInteractionAt = Date.now();
  };

  const updateScrollDepth = () => {
    markInteraction();
    const docEl = document.documentElement;
    const scrollTop = window.scrollY || docEl.scrollTop || 0;
    const viewportH = window.innerHeight || docEl.clientHeight || 800;
    const fullH = Math.max(docEl.scrollHeight || 1, viewportH);
    const pct = Math.min(100, Math.max(5, Math.round(((scrollTop + viewportH) / fullH) * 100)));
    if (pct > maxScrollPct) {
      maxScrollPct = pct;
      dirty = true;
    }
  };

  const flushToFirestore = () => {
    if (!dirty) return;
    dirty = false;
    const updatedAtMs = Date.now();
    const docName = `projects/${projectId}/databases/(default)/documents/landing_sessions/${sessionId}`;
    const endpoint = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:commit`;

    const payload = {
      writes: [
        {
          update: {
            name: docName,
            fields: {
              sessionId: { stringValue: sessionId },
              page: { stringValue: opts.page },
              source: { stringValue: attribution.source },
              medium: { stringValue: attribution.medium.slice(0, 64) },
              campaign: { stringValue: attribution.campaign.slice(0, 128) },
              referrerHost: { stringValue: attribution.referrerHost.slice(0, 128) },
              lang: { stringValue: opts.lang },
              deviceType: { stringValue: deviceType },
              startedAtMs: { integerValue: String(startedAtMs) },
              updatedAtMs: { integerValue: String(updatedAtMs) },
              totalActiveSec: { integerValue: String(Math.min(7200, totalActiveSec)) },
              maxScrollPct: { integerValue: String(Math.min(100, Math.max(0, maxScrollPct))) },
              lastSection: { stringValue: lastSection.slice(0, 64) },
              reachedSectionsCsv: { stringValue: Array.from(reachedSet).join(',').slice(0, 512) },
              sectionDwellJson: { stringValue: JSON.stringify(sectionDwell).slice(0, 2048) },
              clicksJson: { stringValue: JSON.stringify(clicks).slice(0, 4096) },
              convertedPlayClick: { booleanValue: convertedPlayClick },
              convertedSetupClick: { booleanValue: convertedSetupClick },
              primaryCtaTarget: { stringValue: primaryCtaTarget.slice(0, 64) },
            },
          },
        },
      ],
    };

    try {
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    } catch {
      // Ignore network errors silently so user experience is never affected
    }
  };

  // Observe visible sections
  const visibleRatios = new Map<string, number>();
  const observer =
    typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              const secId = (entry.target as HTMLElement).dataset.telemetrySection;
              if (!secId) continue;
              if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
                visibleRatios.set(secId, entry.intersectionRatio);
                if (!reachedSet.has(secId)) {
                  reachedSet.add(secId);
                  dirty = true;
                }
              } else {
                visibleRatios.delete(secId);
              }
            }

            let bestSec = currentSection;
            let bestRatio = -1;
            visibleRatios.forEach((ratio, secId) => {
              if (ratio > bestRatio) {
                bestRatio = ratio;
                bestSec = secId;
              }
            });
            if (bestRatio > 0 && bestSec !== currentSection) {
              currentSection = bestSec;
              lastSection = bestSec;
              dirty = true;
            }
          },
          { threshold: [0.2, 0.45, 0.7] }
        )
      : null;

  const sectionEls = opts.rootEl.querySelectorAll<HTMLElement>('[data-telemetry-section]');
  sectionEls.forEach((el) => observer?.observe(el));

  // Delegated click listener for any element with `data-telemetry-click`
  const onRootClick = (e: MouseEvent) => {
    markInteraction();
    const target = (e.target as HTMLElement | null)?.closest?.('[data-telemetry-click]') as HTMLElement | null;
    if (!target) return;
    const clickId = target.dataset.telemetryClick;
    if (!clickId) return;

    clicks[clickId] = (clicks[clickId] || 0) + 1;
    if (clickId.startsWith('cta_play_')) {
      convertedPlayClick = true;
      if (!primaryCtaTarget) primaryCtaTarget = clickId;
    } else if (
      clickId.startsWith('cta_setup_') ||
      clickId === 'cta_iphone_webapp' ||
      clickId === 'cta_send_to_self'
    ) {
      convertedSetupClick = true;
      if (!primaryCtaTarget) primaryCtaTarget = clickId;
    }
    dirty = true;
    flushToFirestore();
  };

  opts.rootEl.addEventListener('click', onRootClick, { capture: true });
  window.addEventListener('scroll', updateScrollDepth, { passive: true });
  window.addEventListener('pointerdown', markInteraction, { passive: true });
  window.addEventListener('keydown', markInteraction, { passive: true });

  // 1-second active reading clock (pauses when tab is hidden or user is idle > 30s)
  const tickInterval = window.setInterval(() => {
    if (document.visibilityState === 'hidden') return;
    if (Date.now() - lastInteractionAt > 30_000) return;

    totalActiveSec += 1;
    sectionDwell[currentSection] = (sectionDwell[currentSection] || 0) + 1;
    lastSection = currentSection;
    dirty = true;
  }, 1000);

  // Periodic flush every 15s when dirty + initial arrival flush after 2s
  const initialFlushTimer = window.setTimeout(() => {
    updateScrollDepth();
    dirty = true;
    flushToFirestore();
  }, 2000);

  const periodicFlushInterval = window.setInterval(() => {
    if (dirty && document.visibilityState === 'visible') {
      flushToFirestore();
    }
  }, 15000);

  const onVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      dirty = true;
      flushToFirestore();
    }
  };
  const onPageHide = () => {
    dirty = true;
    flushToFirestore();
  };

  document.addEventListener('visibilitychange', onVisibilityChange);
  window.addEventListener('pagehide', onPageHide);

  return () => {
    window.clearTimeout(initialFlushTimer);
    window.clearInterval(tickInterval);
    window.clearInterval(periodicFlushInterval);
    observer?.disconnect();
    opts.rootEl?.removeEventListener('click', onRootClick, { capture: true });
    window.removeEventListener('scroll', updateScrollDepth);
    window.removeEventListener('pointerdown', markInteraction);
    window.removeEventListener('keydown', markInteraction);
    document.removeEventListener('visibilitychange', onVisibilityChange);
    window.removeEventListener('pagehide', onPageHide);
    dirty = true;
    flushToFirestore();
  };
}
