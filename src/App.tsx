import React, { useState, useEffect, useCallback } from 'react';
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
} from './data/seo-routes';
import { MetaManager } from './components/seo/MetaManager';
import { JsonLd } from './components/seo/JsonLd';
import { SeoHubNavigator } from './components/seo/SeoHubNavigator';
import { CorridorPageTemplate } from './pages/templates/CorridorPageTemplate';
import { LocationPageTemplate } from './pages/templates/LocationPageTemplate';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CoreServices } from './components/CoreServices';
import { RouteEstimator } from './components/RouteEstimator';
import { ProcedureTimeline } from './components/ProcedureTimeline';
import { TrustAndDirector } from './components/TrustAndDirector';
import { Footer } from './components/Footer';
import { CoordinatorModal } from './components/CoordinatorModal';

export function App() {
  const initialResolved = resolveRouteAndLocale(
    typeof window !== 'undefined' ? window.location.pathname : '/en/'
  );

  const [lang, setLangState] = useState<Language>(
    localeSlugToLang(initialResolved.locale)
  );
  const [currentRoute, setCurrentRoute] = useState(initialResolved.route);
  const [selectedService, setSelectedService] = useState<ServiceType>('cremation');
  const [selectedRegion, setSelectedRegion] = useState<RegionType>('eu_uk');
  const [selectedLocation, setSelectedLocation] = useState<LocationType>('boka');
  const [modalOpen, setModalOpen] = useState(false);

  const currentLocale = langToLocaleSlug(lang);
  const t = translations[lang];

  // Sync browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const resolved = resolveRouteAndLocale(window.location.pathname);
      setLangState(localeSlugToLang(resolved.locale));
      setCurrentRoute(resolved.route);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigate to any localized path (e.g. '/en/repatriation/to-united-kingdom/')
  const handleNavigate = useCallback(
    (localizedPath: string, hash?: string) => {
      const resolved = resolveRouteAndLocale(localizedPath);
      setLangState(localeSlugToLang(resolved.locale));
      setCurrentRoute(resolved.route);

      const nextUrl = hash ? `${localizedPath}${hash}` : localizedPath;
      if (window.location.pathname + window.location.hash !== nextUrl) {
        window.history.pushState({}, '', nextUrl);
      }

      if (hash) {
        setTimeout(() => {
          const id = hash.replace('#', '');
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
      const nextPath = buildLocalizedPath(newLocaleSlug, currentRoute.path);
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
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentRoute.category === 'home' ? (
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
            <ProcedureTimeline t={t} />

            {/* Programmatic SEO Hub Navigator (9 Corridors, 6 Locations, Services & Guides) */}
            <SeoHubNavigator
              locale={currentLocale}
              onNavigate={handleNavigate}
            />

            {/* 6 & 7. Trust, Licences, Hospital Partnerships & Director Personal Accountability Block */}
            <TrustAndDirector
              t={t}
              onOpenModal={() => setModalOpen(true)}
            />
          </>
        ) : currentRoute.category === 'location' ? (
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
        )}
      </main>

      {/* 8. Footer */}
      <Footer
        lang={lang}
        t={t}
        onOpenModal={() => setModalOpen(true)}
        onNavigate={handleNavigate}
      />

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
    </div>
  );
}

export default App;
