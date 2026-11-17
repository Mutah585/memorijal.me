export const COOKIE_CONSENT_STORAGE_KEY = 'memorijal_cookie_consent_v1';
export const COOKIE_CONSENT_VERSION = '1.0';

export interface CookieConsentRecord {
  version: string;
  timestamp: string;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function ensureGtag(): (...args: unknown[]) => void {
  if (typeof window === 'undefined') {
    return () => {};
  }
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };
  }
  return window.gtag;
}

export function getStoredCookieConsent(): CookieConsentRecord | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CookieConsentRecord>;
    if (
      parsed &&
      parsed.version === COOKIE_CONSENT_VERSION &&
      parsed.necessary === true &&
      typeof parsed.analytics === 'boolean' &&
      typeof parsed.marketing === 'boolean'
    ) {
      return {
        version: parsed.version,
        timestamp: typeof parsed.timestamp === 'string' ? parsed.timestamp : new Date().toISOString(),
        necessary: true,
        analytics: parsed.analytics,
        marketing: parsed.marketing,
      };
    }
    return null;
  } catch {
    return null;
  }
}

export function applyGoogleConsentUpdate(analytics: boolean, marketing: boolean): void {
  if (typeof window === 'undefined') return;
  const gtag = ensureGtag();
  gtag('consent', 'update', {
    ad_storage: marketing ? 'granted' : 'denied',
    ad_user_data: marketing ? 'granted' : 'denied',
    ad_personalization: marketing ? 'granted' : 'denied',
    analytics_storage: analytics ? 'granted' : 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
  });
}

export function saveCookieConsent(prefs: {
  analytics: boolean;
  marketing: boolean;
}): CookieConsentRecord {
  const record: CookieConsentRecord = {
    version: COOKIE_CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    necessary: true,
    analytics: Boolean(prefs.analytics),
    marketing: Boolean(prefs.marketing),
  };

  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(record));
    } catch {
      // Ignore storage errors in strict privacy browsers
    }
    applyGoogleConsentUpdate(record.analytics, record.marketing);
    window.dispatchEvent(
      new CustomEvent('memorijal:consent-updated', { detail: record })
    );
  }

  return record;
}

export function syncStoredConsentOnBoot(): CookieConsentRecord | null {
  const existing = getStoredCookieConsent();
  if (existing) {
    applyGoogleConsentUpdate(existing.analytics, existing.marketing);
  }
  return existing;
}
