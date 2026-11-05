import { useState, useEffect, useCallback } from 'react';
import {
  Language,
  ServiceType,
  RegionType,
  LocationType,
  translations,
} from './i18n/translations';
import {
  resolveRouteAndLocale,
  langToLocaleSlug,
  localeSlugToLang,
  buildLocalizedPath,
  LocaleSlug,
} from './data/seo-routes';
import { MetaManager } from './components/seo/MetaManager';
import { JsonLd } from './components/seo/JsonLd';
import { SeoHubNavigator } from './components/seo/SeoHubNavigator';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CoreServices } from './components/CoreServices';
import { PricingSection } from './components/PricingSection';
import { RouteEstimator } from './components/RouteEstimator';
import { ProcedureTimeline } from './components/ProcedureTimeline';
import { TrustAndDirector } from './components/TrustAndDirector';
import { Footer } from './components/Footer';
import { CoordinatorModal } from './components/CoordinatorModal';
import { MobileEmergencyBar } from './components/MobileEmergencyBar';
import { NotFound } from './pages/NotFound';
import { sanitizeInternalPath } from './utils/security';
import { CorridorPageTemplate } from './pages/templates/CorridorPageTemplate';
import { LocationPageTemplate } from './pages/templates/LocationPageTemplate';
import { DistressTriageView } from './components/DistressTriageView';
import { OfflineCallFallback } from './components/OfflineCallFallback';

const LANG_STORAGE_KEY = 'memorijal_lang';
const SUPPORTED_LOCALES: LocaleSlug[] = ['en', 'ru', 'mne'];

/**
 * Detect client language based on:
 * 1. Explicit user choice in localStorage ('ru' | 'en' | 'mne')
 * 2. navigator.languages / navigator.language preferences
 * 3. Fallback to 'en'
 */
function detectPreferredLocale(): LocaleSlug {
  if (typeof window === 'undefined') return 'en';

  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY)?.toLowerCase() as LocaleSlug;
    if (saved && SUPPORTED_LOCALES.includes(saved)) {
      return saved;
    }
  } catch {
    // Storage access may be blocked in strict private modes
  }

  const browserLangs =
    typeof navigator !== 'undefined'
      ? navigator.languages || [navigator.language || 'en']
      : ['en'];

  for (const rawLang of browserLangs) {
    if (!rawLang) continue;
    const code = rawLang.toLowerCase();

    // Russian & CIS languages
    if (
      code.startsWith('ru') ||
      code.startsWith('be') ||
      code.startsWith('kk') ||
      code.startsWith('uz') ||
      code.startsWith('ky')
    ) {
      return 'ru';
    }

    // Balkan / South Slavic languages (Montenegrin, Serbian, Bosnian, Croatian)
    if (
      code.startsWith('sr') ||
      code.startsWith('bs') ||
      code.startsWith('hr') ||
      code.startsWith('cnr') ||
      code.startsWith('me')
    ) {
      return 'mne';
    }

    // Explicit English
    if (code.startsWith('en')) {
      return 'en';
    }
  }

  // Universal international default
  return 'en';
}

export function App() {
  const initialPathname =
    typeof window !== 'undefined' ? window.location.pathname : '/en/';
  
  // When hitting root path "/", determine preferred locale
  const isRootLanding = initialPathname === '/' || initialPathname === '';
  const effectiveInitialLocale: LocaleSlug = isRootLanding
    ? detectPreferredLocale()
    : resolveRouteAndLocale(initialPathname).locale;

  const effectiveInitialPath = isRootLanding
    ? `/${effectiveInitialLocale}/`
    : initialPathname;

  const initialResolved = resolveRouteAndLocale(effectiveInitialPath);

  const [lang, setLangState] = useState<Language>(
    localeSlugToLang(initialResolved.locale)
  );
  const [currentRoute, setCurrentRoute] = useState(initialResolved.route);
  const [isNotFound, setIsNotFound] = useState(
    !isRootLanding && initialResolved.isNotFound
  );
  const [selectedService, setSelectedService] = useState<ServiceType>('cremation');
  const [selectedRegion, setSelectedRegion] = useState<RegionType>('eu_uk');
  const [selectedLocation, setSelectedLocation] = useState<LocationType>('boka');
  const [modalOpen, setModalOpen] = useState(false);
  const [isDistressMode, setIsDistressMode] = useState(false);

  const currentLocale = langToLocaleSlug(lang);
  const t = translations[lang];

  // Perform root path redirection if user hits "/" directly
  useEffect(() => {
    if (window.location.pathname === '/' || window.location.pathname === '') {
      const targetLocale = detectPreferredLocale();
      const targetPath = `/${targetLocale}/`;
      window.history.replaceState({}, '', targetPath + window.location.hash);
      const resolved = resolveRouteAndLocale(targetPath);
      setLangState(localeSlugToLang(resolved.locale));
      setCurrentRoute(resolved.route);
      setIsNotFound(false);
    }
  }, []);

  // Sync browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const resolved = resolveRouteAndLocale(path);
      setLangState(localeSlugToLang(resolved.locale));
      setCurrentRoute(resolved.route);
      setIsNotFound(path !== '/' && resolved.isNotFound);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigate to any localized path (e.g. '/en/repatriation/to-united-kingdom/')
  const handleNavigate = useCallback(
    (localizedPath: string, hash?: string) => {
      const safePath = sanitizeInternalPath(localizedPath);
      const resolved = resolveRouteAndLocale(safePath);
      setLangState(localeSlugToLang(resolved.locale));
      setCurrentRoute(resolved.route);
      setIsNotFound(safePath !== '/' && resolved.isNotFound);

      const safeHash =
        hash && /^#[a-zA-Z0-9_-]+$/.test(hash) ? hash : undefined;
      const nextUrl = safeHash ? `${safePath}${safeHash}` : safePath;
      if (window.location.pathname + window.location.hash !== nextUrl) {
        window.history.pushState({}, '', nextUrl);
      }

      if (safeHash) {
        setTimeout(() => {
          const id = safeHash.replace('#', '');
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    []
  );

  // Switch language and update current URL locale prefix seamlessly
  const handleSetLang = useCallback(
    (newLang: Language) => {
      setLangState(newLang);
      const newLocaleSlug = langToLocaleSlug(newLang);
      try {
        localStorage.setItem(LANG_STORAGE_KEY, newLocaleSlug);
      } catch {
        // Fallback for private modes
      }
      const nextPath = buildLocalizedPath(newLocaleSlug, currentRoute.path);
      setIsNotFound(false);
      if (window.location.pathname !== nextPath) {
        window.history.pushState({}, '', nextPath + window.location.hash);
      }
    },
    [currentRoute.path]
  );

  const handleSelectServiceFromPillar = (service: ServiceType) => {
    setSelectedService(service);
    const estimatorEl = document.getElementById('estimator');
    if (estimatorEl) {
      estimatorEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-porcelain text-slateDeep">
      {/* Technical SEO Head Manager & JSON-LD Rich Snippets */}
      <MetaManager locale={currentLocale} route={currentRoute} />
      <JsonLd locale={currentLocale} route={currentRoute} />

      {/* 1. Sticky Emergency Top Bar & Header */}
      <Navbar
        lang={lang}
        setLang={handleSetLang}
        t={t}
        onOpenModal={() => setModalOpen(true)}
        onNavigate={handleNavigate}
        isDistressMode={isDistressMode}
        onToggleDistressMode={() => setIsDistressMode((prev) => !prev)}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {isDistressMode ? (
          <DistressTriageView
            lang={lang}
            onExit={() => setIsDistressMode(false)}
            onOpenModal={() => setModalOpen(true)}
          />
        ) : isNotFound ? (
          <NotFound
            lang={lang}
            onNavigate={handleNavigate}
            onOpenModal={() => setModalOpen(true)}
          />
        ) : currentRoute.category === 'home' ? (
          <>
            {/* 2. Hero Section */}
            <Hero
              lang={lang}
              t={t}
              onOpenModal={() => setModalOpen(true)}
            />

            {/* 3. Core Services (3 Pillars) */}
            <CoreServices
              t={t}
              onSelectServiceForEstimator={handleSelectServiceFromPillar}
            />

            {/* 3b. Official Starting Package Tiers (5 Standard Service Packages) */}
            <PricingSection lang={lang} />

            {/* 4. Interactive Transparent Cost & Route Estimator */}
            <RouteEstimator
              lang={lang}
              t={t}
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              onOpenModalWithCurrentSelection={() => setModalOpen(true)}
            />

            {/* 5. Step-by-Step Procedure Timeline */}
            <ProcedureTimeline t={t} lang={lang} />

            {/* Programmatic SEO Hub Navigator (All 64 Routes / 9 Categories) */}
            <SeoHubNavigator
              locale={currentLocale}
              onNavigate={handleNavigate}
            />

            {/* 6 & 7. Trust, Licences, Hospital Partnerships & Director Personal Accountability Block */}
            <TrustAndDirector
              t={t}
              lang={lang}
              onOpenModal={() => setModalOpen(true)}
            />
          </>
        ) : (
          currentRoute.category === 'location' ||
          currentRoute.category === 'mortuary' ||
          currentRoute.category === 'cemetery' ? (
            <LocationPageTemplate
              locale={currentLocale}
              route={currentRoute}
              onNavigate={handleNavigate}
              onOpenModal={() => setModalOpen(true)}
            />
          ) : (
            <CorridorPageTemplate
              locale={currentLocale}
              route={currentRoute}
              onNavigate={handleNavigate}
              onOpenModal={() => setModalOpen(true)}
            />
          )
        )}
      </main>

      {/* 8. Footer */}
      {!isDistressMode && (
        <Footer
          lang={lang}
          t={t}
          onOpenModal={() => setModalOpen(true)}
          onNavigate={handleNavigate}
        />
      )}

      {/* Persistent Mobile 24/7 Emergency Bar (< 768px past hero) */}
      <MobileEmergencyBar lang={lang} />

      {/* Interactive Coordinator Case Dispatch Modal */}
      <CoordinatorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        lang={lang}
        t={t}
        initialService={selectedService}
        initialRegion={selectedRegion}
        initialLocation={selectedLocation}
      />

      {/* Network Offline / Mountain Blindspot Safeguard Banner */}
      <OfflineCallFallback locale={currentLocale} />
    </div>
  );
}

export default App;
