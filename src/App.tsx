import React, { useState, useEffect } from 'react';
import {
  Language,
  ServiceType,
  RegionType,
  LocationType,
  translations,
} from './i18n/translations';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CoreServices } from './components/CoreServices';
import { RouteEstimator } from './components/RouteEstimator';
import { ProcedureTimeline } from './components/ProcedureTimeline';
import { TrustAndDirector } from './components/TrustAndDirector';
import { Footer } from './components/Footer';
import { CoordinatorModal } from './components/CoordinatorModal';

export function App() {
  const [lang, setLang] = useState<Language>('EN');
  const [selectedService, setSelectedService] = useState<ServiceType>('cremation');
  const [selectedRegion, setSelectedRegion] = useState<RegionType>('eu_uk');
  const [selectedLocation, setSelectedLocation] = useState<LocationType>('boka');
  const [modalOpen, setModalOpen] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = t.meta.langCode;
  }, [t.meta.langCode]);

  const handleSelectServiceFromPillar = (service: ServiceType) => {
    setSelectedService(service);
    const estimatorEl = document.getElementById('estimator');
    if (estimatorEl) {
      estimatorEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-porcelain text-slateDeep">
      {/* 1. Sticky Emergency Top Bar & Header */}
      <Navbar
        lang={lang}
        setLang={setLang}
        t={t}
        onOpenModal={() => setModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
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

        {/* 6 & 7. Trust, Licences, Hospital Partnerships & Director Personal Accountability Block */}
        <TrustAndDirector
          t={t}
          onOpenModal={() => setModalOpen(true)}
        />
      </main>

      {/* 8. Footer */}
      <Footer
        lang={lang}
        t={t}
        onOpenModal={() => setModalOpen(true)}
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

