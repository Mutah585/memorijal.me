import React, { useEffect, useRef, useState } from 'react';
import { Shield, SlidersHorizontal, X, Lock, Check } from 'lucide-react';
import { LocaleSlug, buildLocalizedPath } from '../data/seo-routes';
import {
  getStoredCookieConsent,
  saveCookieConsent,
  syncStoredConsentOnBoot,
} from '../utils/cookieConsent';

export interface CookieConsentBannerProps {
  locale: LocaleSlug;
  isDistressMode?: boolean;
  onNavigate?: (localizedPath: string) => void;
  externalOpenSignal?: number;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  locale,
  isDistressMode = false,
  onNavigate,
  externalOpenSignal = 0,
}) => {
  const [hasSavedConsent, setHasSavedConsent] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return getStoredCookieConsent() !== null;
  });
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  const modalCloseBtnRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Sync stored consent state with Google Consent Mode v2 on initial mount
  useEffect(() => {
    const existing = syncStoredConsentOnBoot();
    if (existing) {
      setHasSavedConsent(true);
      setAnalyticsEnabled(existing.analytics);
      setMarketingEnabled(existing.marketing);
    } else {
      setHasSavedConsent(false);
      setAnalyticsEnabled(false);
      setMarketingEnabled(false);
    }
  }, []);

  // Re-open Preferences Modal when triggered from Footer or custom DOM event
  useEffect(() => {
    if (externalOpenSignal > 0) {
      const existing = getStoredCookieConsent();
      if (existing) {
        setAnalyticsEnabled(existing.analytics);
        setMarketingEnabled(existing.marketing);
      } else {
        setAnalyticsEnabled(false);
        setMarketingEnabled(false);
      }
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      setIsPreferencesOpen(true);
    }
  }, [externalOpenSignal]);

  useEffect(() => {
    const handleOpenEvent = () => {
      const existing = getStoredCookieConsent();
      if (existing) {
        setAnalyticsEnabled(existing.analytics);
        setMarketingEnabled(existing.marketing);
      } else {
        setAnalyticsEnabled(false);
        setMarketingEnabled(false);
      }
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      setIsPreferencesOpen(true);
    };

    window.addEventListener('memorijal:open-cookie-settings', handleOpenEvent);
    return () => {
      window.removeEventListener('memorijal:open-cookie-settings', handleOpenEvent);
    };
  }, []);

  // Keyboard Escape dismissal and focus management for Preferences Modal
  useEffect(() => {
    if (!isPreferencesOpen) return;

    const timer = window.setTimeout(() => {
      modalCloseBtnRef.current?.focus();
    }, 20);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsPreferencesOpen(false);
        previousFocusRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPreferencesOpen]);

  const privacyPath = buildLocalizedPath(locale, '/legal/privacy-gdpr/');

  const copy = {
    ru: {
      title: 'Конфиденциальность и файлы cookie',
      body: 'Мы используем строго необходимые технические хранилища браузера для сохранения выбранного языка и черновиков заявок. Аналитические и рекламные cookies подключаются только с вашего согласия.',
      privacyLink: 'Политика конфиденциальности (GDPR / ZZPL)',
      acceptAll: 'Принять все',
      necessaryOnly: 'Только необходимые',
      customize: 'Настроить',
      modalTitle: 'Центр управления конфиденциальностью и cookie',
      modalSubtitle:
        'Управляйте категориями локального хранения и аналитики в соответствии с GDPR ЕС/Великобритании, директивой ePrivacy и Законом Черногории ZZPL. Вы можете изменить выбор в любое время в подвале сайта.',
      savePrefs: 'Сохранить настройки',
      closeLabel: 'Закрыть настройки cookie',
      alwaysActive: 'Всегда активно',
      categories: {
        necessary: {
          title: '1. Строго необходимые (Технические)',
          desc: 'Сохранение выбранного языка (memorijal_lang), защита черновиков форм от потери (sessionStorage), кеш курсов валют ЕЦБ и запись вашего статуса согласия (memorijal_cookie_consent_v1).',
        },
        analytics: {
          title: '2. Аналитика и производительность',
          desc: 'Обезличенная статистика посещаемости и диагностика технических ошибок для улучшения стабильности сайта (Google Analytics 4: analytics_storage).',
        },
        marketing: {
          title: '3. Маркетинг и оценка конверсий',
          desc: 'Атрибуция экстренных обращений по телефону и WhatsApp в Google Ads (ad_storage, ad_user_data, ad_personalization). Отключено по умолчанию.',
        },
      },
    },
    mne: {
      title: 'Privatnost i podešavanja kolačića',
      body: 'Koristimo strogo neophodnu memoriju pregledača za čuvanje izabranog jezika i nacrta zahtjeva. Analitički i marketinški kolačići aktiviraju se isključivo uz vašu saglasnost.',
      privacyLink: 'Politika privatnosti (ZZPL / GDPR)',
      acceptAll: 'Prihvati sve',
      necessaryOnly: 'Samo neophodni',
      customize: 'Podešavanja',
      modalTitle: 'Centar za podešavanje privatnosti i kolačića',
      modalSubtitle:
        'Upravljajte kategorijama memorije pregledača u skladu sa EU/UK GDPR, ePrivacy direktivom i crnogorskim Zakonom o zaštiti podataka o ličnosti (ZZPL). Odluku možete promijeniti u bilo kom trenutku.',
      savePrefs: 'Sačuvaj podešavanja',
      closeLabel: 'Zatvori podešavanja kolačića',
      alwaysActive: 'Uvijek aktivno',
      categories: {
        necessary: {
          title: '1. Strogo neophodni (Tehnički)',
          desc: 'Čuvanje izabranog jezika (memorijal_lang), zaštita nacrta formi (sessionStorage), keš kursne liste ECB-a i evidencija vaše saglasnosti (memorijal_cookie_consent_v1).',
        },
        analytics: {
          title: '2. Analitika i performanse',
          desc: 'Anonimizovana statistika posjećenosti i dijagnostika grešaka radi stabilnosti sajta (Google Analytics 4: analytics_storage).',
        },
        marketing: {
          title: '3. Marketing i mjerenje konverzija',
          desc: 'Atribucija hitnih poziva i WhatsApp upita u Google Ads sistemu (ad_storage, ad_user_data, ad_personalization). Isključeno podrazumijevano.',
        },
      },
    },
    en: {
      title: 'Privacy & Cookie Preferences',
      body: 'We use strictly necessary browser storage to preserve your selected language and form drafts. Analytics and advertising cookies are activated only with your explicit consent.',
      privacyLink: 'Privacy Policy (ZZPL & GDPR)',
      acceptAll: 'Accept All',
      necessaryOnly: 'Necessary Only',
      customize: 'Customize',
      modalTitle: 'Privacy & Granular Cookie Preferences',
      modalSubtitle:
        'Manage browser storage and measurement categories in compliance with EU/UK GDPR, ePrivacy Directive, and Montenegro ZZPL. You can withdraw or update consent anytime from the footer.',
      savePrefs: 'Save Preferences',
      closeLabel: 'Close cookie preferences',
      alwaysActive: 'Always Active',
      categories: {
        necessary: {
          title: '1. Strictly Necessary (Technical)',
          desc: 'Preserves your language preference (memorijal_lang), protects form drafts against accidental loss (sessionStorage), caches ECB exchange rates, and stores this consent record (memorijal_cookie_consent_v1).',
        },
        analytics: {
          title: '2. Analytics & Performance',
          desc: 'Anonymized page performance and error diagnostics to maintain platform reliability (Google Analytics 4: analytics_storage).',
        },
        marketing: {
          title: '3. Marketing & Conversion Measurement',
          desc: 'Google Ads attribution for emergency call and WhatsApp inquiries (ad_storage, ad_user_data, ad_personalization). Disabled by default.',
        },
      },
    },
  }[locale];

  const handleAcceptAll = () => {
    saveCookieConsent({ analytics: true, marketing: true });
    setAnalyticsEnabled(true);
    setMarketingEnabled(true);
    setHasSavedConsent(true);
    setIsPreferencesOpen(false);
    previousFocusRef.current?.focus();
  };

  const handleNecessaryOnly = () => {
    saveCookieConsent({ analytics: false, marketing: false });
    setAnalyticsEnabled(false);
    setMarketingEnabled(false);
    setHasSavedConsent(true);
    setIsPreferencesOpen(false);
    previousFocusRef.current?.focus();
  };

  const handleSaveCustom = () => {
    saveCookieConsent({
      analytics: analyticsEnabled,
      marketing: marketingEnabled,
    });
    setHasSavedConsent(true);
    setIsPreferencesOpen(false);
    previousFocusRef.current?.focus();
  };

  const handleOpenCustomize = () => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const existing = getStoredCookieConsent();
    if (existing) {
      setAnalyticsEnabled(existing.analytics);
      setMarketingEnabled(existing.marketing);
    } else {
      setAnalyticsEnabled(false);
      setMarketingEnabled(false);
    }
    setIsPreferencesOpen(true);
  };

  const handleCloseModal = () => {
    setIsPreferencesOpen(false);
    previousFocusRef.current?.focus();
  };

  const showFloatingBanner =
    !hasSavedConsent && !isPreferencesOpen && !isDistressMode;

  if (!showFloatingBanner && !isPreferencesOpen) {
    return null;
  }

  return (
    <>
      {/* Layer 1: Non-Blocking Quiet Luxury Floating Card */}
      {showFloatingBanner && (
        <aside
          aria-label={copy.title}
          className="fixed bottom-[88px] left-3 right-3 z-40 md:bottom-5 md:left-5 md:right-auto md:max-w-[440px] rounded-2xl bg-white/95 backdrop-blur-md border border-stoneBorder shadow-elevated p-4 md:p-5 no-print"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-sapphire shrink-0" />
              <h2 className="font-serif text-base sm:text-lg font-semibold text-slateDeep leading-snug">
                {copy.title}
              </h2>
            </div>

            <p className="text-xs text-slateMuted leading-relaxed">
              {copy.body}{' '}
              <a
                href={privacyPath}
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate(privacyPath);
                  }
                }}
                className="font-semibold text-sapphire hover:underline underline-offset-2"
              >
                {copy.privacyLink}
              </a>
              .
            </p>

            {/* Symmetrical Equal-Prominence Actions (EDPB Anti-Dark-Pattern) */}
            <div className="pt-1 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="flex-1 min-w-[120px] min-h-[44px] px-3.5 py-2.5 rounded-xl bg-sapphire hover:bg-sapphire-light text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                {copy.acceptAll}
              </button>

              <button
                type="button"
                onClick={handleNecessaryOnly}
                className="flex-1 min-w-[120px] min-h-[44px] px-3.5 py-2.5 rounded-xl bg-porcelain hover:bg-alabaster text-slateDeep border border-sapphire/30 text-xs font-semibold transition-colors cursor-pointer"
              >
                {copy.necessaryOnly}
              </button>

              <button
                type="button"
                onClick={handleOpenCustomize}
                className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white hover:bg-porcelain text-slateDeep border border-stoneBorder text-xs font-semibold transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-sapphire shrink-0" />
                <span>{copy.customize}</span>
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Layer 2: Granular Privacy Preferences Center Modal */}
      {isPreferencesOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-preferences-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slateDeep/60 backdrop-blur-xs overflow-y-auto no-print"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-2xl border border-stoneBorder shadow-elevated max-w-xl w-full p-6 sm:p-7 space-y-5 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-stoneBorder pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-sapphire">
                  <Shield className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>GDPR • ePrivacy • ZZPL</span>
                </div>
                <h2
                  id="cookie-preferences-title"
                  className="font-serif text-xl sm:text-2xl font-semibold text-slateDeep leading-snug"
                >
                  {copy.modalTitle}
                </h2>
                <p className="text-xs text-slateMuted leading-relaxed">
                  {copy.modalSubtitle}
                </p>
              </div>

              <button
                ref={modalCloseBtnRef}
                type="button"
                onClick={handleCloseModal}
                aria-label={copy.closeLabel}
                className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-xl bg-porcelain hover:bg-alabaster text-slateDeep border border-stoneBorder transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 3 Granular Categories */}
            <div className="space-y-3">
              {/* Category 1: Strictly Necessary (Locked ON) */}
              <div className="p-4 rounded-xl bg-porcelain border border-stoneBorder flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-xs sm:text-sm font-semibold text-slateDeep">
                    {copy.categories.necessary.title}
                  </h3>
                  <p className="text-xs text-slateMuted leading-relaxed">
                    {copy.categories.necessary.desc}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-forest-subtle text-forest text-[11px] font-bold shrink-0">
                  <Lock className="w-3 h-3" />
                  <span>{copy.alwaysActive}</span>
                </span>
              </div>

              {/* Category 2: Analytics & Performance (Default OFF) */}
              <div className="p-4 rounded-xl bg-white border border-stoneBorder flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <label
                    htmlFor="cookie-toggle-analytics"
                    className="text-xs sm:text-sm font-semibold text-slateDeep cursor-pointer block"
                  >
                    {copy.categories.analytics.title}
                  </label>
                  <p className="text-xs text-slateMuted leading-relaxed">
                    {copy.categories.analytics.desc}
                  </p>
                </div>
                <button
                  id="cookie-toggle-analytics"
                  type="button"
                  role="switch"
                  aria-checked={analyticsEnabled}
                  aria-label={copy.categories.analytics.title}
                  onClick={() => setAnalyticsEnabled((prev) => !prev)}
                  className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <span
                    className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center ${
                      analyticsEnabled ? 'bg-forest justify-end' : 'bg-slate-300 justify-start'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-white shadow-xs flex items-center justify-center">
                      {analyticsEnabled && <Check className="w-3 h-3 text-forest" />}
                    </span>
                  </span>
                </button>
              </div>

              {/* Category 3: Marketing & Conversion Measurement (Default OFF) */}
              <div className="p-4 rounded-xl bg-white border border-stoneBorder flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <label
                    htmlFor="cookie-toggle-marketing"
                    className="text-xs sm:text-sm font-semibold text-slateDeep cursor-pointer block"
                  >
                    {copy.categories.marketing.title}
                  </label>
                  <p className="text-xs text-slateMuted leading-relaxed">
                    {copy.categories.marketing.desc}
                  </p>
                </div>
                <button
                  id="cookie-toggle-marketing"
                  type="button"
                  role="switch"
                  aria-checked={marketingEnabled}
                  aria-label={copy.categories.marketing.title}
                  onClick={() => setMarketingEnabled((prev) => !prev)}
                  className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <span
                    className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center ${
                      marketingEnabled ? 'bg-forest justify-end' : 'bg-slate-300 justify-start'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-white shadow-xs flex items-center justify-center">
                      {marketingEnabled && <Check className="w-3 h-3 text-forest" />}
                    </span>
                  </span>
                </button>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-3 border-t border-stoneBorder flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <button
                type="button"
                onClick={handleNecessaryOnly}
                className="min-h-[44px] px-4 py-2.5 rounded-xl bg-porcelain hover:bg-alabaster text-slateDeep border border-sapphire/30 text-xs font-semibold transition-colors cursor-pointer"
              >
                {copy.necessaryOnly}
              </button>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="min-h-[44px] px-4 py-2.5 rounded-xl bg-white hover:bg-porcelain text-slateDeep border border-stoneBorder text-xs font-semibold transition-colors cursor-pointer"
                >
                  {copy.savePrefs}
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="min-h-[44px] px-5 py-2.5 rounded-xl bg-sapphire hover:bg-sapphire-light text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  {copy.acceptAll}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
