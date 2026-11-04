import React from 'react';
import {
  Clock,
  MapPin,
  Plane,
  FileCheck,
  Shield,
  MessageCircle,
  CheckCircle2,
  Globe,
  Building2,
  Send,
} from 'lucide-react';
import {
  Language,
  ServiceType,
  RegionType,
  LocationType,
  TranslationContent,
  WHATSAPP_NUMBER,
} from '../i18n/translations';

interface RouteEstimatorProps {
  lang: Language;
  t: TranslationContent;
  selectedService: ServiceType;
  setSelectedService: (s: ServiceType) => void;
  selectedRegion: RegionType;
  setSelectedRegion: (r: RegionType) => void;
  selectedLocation: LocationType;
  setSelectedLocation: (l: LocationType) => void;
  onOpenModalWithCurrentSelection: () => void;
}

export const RouteEstimator: React.FC<RouteEstimatorProps> = ({
  lang,
  t,
  selectedService,
  setSelectedService,
  selectedRegion,
  setSelectedRegion,
  selectedLocation,
  setSelectedLocation,
  onOpenModalWithCurrentSelection,
}) => {
  const serviceKeys: ServiceType[] = ['cremation', 'air_cargo', 'road_transport'];
  const regionKeys: RegionType[] = ['balkans', 'eu_uk', 'cis_east'];
  const locationKeys: LocationType[] = ['boka', 'podgorica', 'coast_south', 'north'];

  const currentMatrix = t.estimator.matrix[selectedService][selectedRegion];
  const serviceInfo = t.estimator.services[selectedService];
  const regionInfo = t.estimator.regions[selectedRegion];
  const locationInfo = t.estimator.locations[selectedLocation];

  // Build prefilled WhatsApp message with selected parameters
  const buildWhatsAppHref = () => {
    let text = '';
    if (lang === 'RU') {
      text = `Здравствуйте, Memorijal d.o.o.! Меня интересует репатриация / процедура (${serviceInfo.label}) для направления ${regionInfo.label}, начальная оценка ${currentMatrix.priceRange.toLowerCase()}.\n• Местонахождение в ЧГ: ${locationInfo.label}\n• Расчетный срок: ${currentMatrix.timeframe}\nПрошу рассчитать точную смету.`;
    } else if (lang === 'MNE') {
      text = `Poštovani Memorijal d.o.o., interesuje me repatrijacija za ${regionInfo.label}, početna procjena ${currentMatrix.priceRange.toLowerCase()}.\n• Usluga: ${serviceInfo.label}\n• Lokacija u CG: ${locationInfo.label}\n• Okvirni rok: ${currentMatrix.timeframe}\nMolim za precizan proračun.`;
    } else {
      text = `Hello Memorijal d.o.o. Coordinator, I am inquiring about repatriation to ${regionInfo.label}, starting estimate ${currentMatrix.priceRange.toLowerCase()}.\n• Service: ${serviceInfo.label}\n• Collection in Montenegro: ${locationInfo.label}\n• Estimated Timeframe: ${currentMatrix.timeframe}\nPlease provide an exact estimate.`;
    }
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section
      id="estimator"
      className="py-16 sm:py-24 bg-alabaster border-b border-stoneBorder"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-sapphire mb-3">
            <Clock className="w-4 h-4" />
            <span>{t.estimator.eyebrow}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-semibold text-slateDeep leading-[1.18]">
            {t.estimator.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slateMuted leading-relaxed">
            {t.estimator.subtitle}
          </p>
        </div>

        {/* Main Interactive Grid */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (6 cols): Interactive Step Selectors */}
          <div className="lg:col-span-6 space-y-6">
            {/* STEP 1: Select Service */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stoneBorder shadow-card">
              <h3 className="text-sm font-bold uppercase tracking-wider text-sapphire mb-4 flex items-center gap-2">
                <Plane className="w-4 h-4" />
                <span>{t.estimator.step1Title}</span>
              </h3>
              <div className="space-y-3" role="radiogroup" aria-label={t.estimator.step1Title}>
                {serviceKeys.map((key) => {
                  const item = t.estimator.services[key];
                  const isSelected = selectedService === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedService(key)}
                      role="radio"
                      aria-checked={isSelected}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'bg-sapphire-subtle border-sapphire ring-1 ring-sapphire shadow-sm'
                          : 'bg-white hover:bg-porcelain border-stoneBorder'
                      }`}
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold text-slateDeep text-sm sm:text-base">
                            {item.label}
                          </span>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-white border border-stoneBorder text-warmStone">
                            {item.tag}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slateMuted mt-1">
                          {item.shortDesc}
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected
                            ? 'border-sapphire bg-sapphire text-white'
                            : 'border-stoneBorder bg-white'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: Select Destination Region */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stoneBorder shadow-card">
              <h3 className="text-sm font-bold uppercase tracking-wider text-sapphire mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>{t.estimator.step2Title}</span>
              </h3>
              <div className="space-y-3" role="radiogroup" aria-label={t.estimator.step2Title}>
                {regionKeys.map((key) => {
                  const item = t.estimator.regions[key];
                  const isSelected = selectedRegion === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedRegion(key)}
                      role="radio"
                      aria-checked={isSelected}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'bg-sapphire-subtle border-sapphire ring-1 ring-sapphire shadow-sm'
                          : 'bg-white hover:bg-porcelain border-stoneBorder'
                      }`}
                    >
                      <div>
                        <p className="font-semibold text-slateDeep text-sm sm:text-base">
                          {item.label}
                        </p>
                        <p className="text-xs text-slateMuted mt-1">
                          {item.countries}
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected
                            ? 'border-sapphire bg-sapphire text-white'
                            : 'border-stoneBorder bg-white'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 3: Select Collection Municipality in Montenegro */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stoneBorder shadow-card">
              <h3 className="text-sm font-bold uppercase tracking-wider text-sapphire mb-4 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                <span>{t.estimator.step3Title}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label={t.estimator.step3Title}>
                {locationKeys.map((key) => {
                  const item = t.estimator.locations[key];
                  const isSelected = selectedLocation === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedLocation(key)}
                      role="radio"
                      aria-checked={isSelected}
                      className={`text-left p-3.5 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-sapphire-subtle border-sapphire ring-1 ring-sapphire'
                          : 'bg-white hover:bg-porcelain border-stoneBorder'
                      }`}
                    >
                      <p className="font-semibold text-slateDeep text-xs sm:text-sm">
                        {item.label}
                      </p>
                      <p className="text-[11px] text-slateMuted mt-0.5">
                        {item.facility}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column (6 cols): Live Estimator Output & Breakdown Panel */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-stoneBorder shadow-elevated overflow-hidden">
              {/* Top Institutional Banner */}
              <div className="bg-sapphire text-white p-6 sm:p-7">
                <div className="flex items-center justify-between gap-2 text-xs font-semibold uppercase tracking-widest text-slate-200">
                  <span>{t.estimator.output.summaryHeader}</span>
                  <Shield className="w-4 h-4 text-emerald-300 shrink-0" />
                </div>

                {/* Selected Route Pill */}
                <p className="mt-2 font-serif text-2xl sm:text-3xl font-semibold text-white">
                  {serviceInfo.label}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-200">
                  <span className="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded">
                    <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                    {locationInfo.label}
                  </span>
                  <span>→</span>
                  <span className="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded">
                    <Globe className="w-3.5 h-3.5 text-emerald-300" />
                    {regionInfo.label}
                  </span>
                </div>

                {/* Key Output Metrics: Timeframe & Reference Cost */}
                <div className="mt-6 pt-5 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-xl p-4">
                    <span className="text-[11px] uppercase tracking-wider text-slate-200 block">
                      {t.estimator.output.timeframeLabel}
                    </span>
                    <span className="font-serif text-xl sm:text-2xl font-bold text-white mt-1 block">
                      {currentMatrix.timeframe}
                    </span>
                  </div>

                  <div className="bg-white/10 rounded-xl p-4">
                    <span className="text-[11px] uppercase tracking-wider text-slate-200 block">
                      {lang === 'RU'
                        ? 'Ориентировочные расходы:'
                        : lang === 'MNE'
                        ? 'Procijenjeni troškovi:'
                        : 'Estimated cost:'}
                    </span>
                    <span className="font-serif text-xl sm:text-2xl font-bold text-emerald-300 mt-1 block">
                      {currentMatrix.priceRange}
                    </span>
                    <span className="text-[10px] text-slate-300 mt-1 block">
                      {lang === 'RU'
                        ? 'Окончательный расчет зависит от километража и консульских сборов'
                        : lang === 'MNE'
                        ? 'Konačna cijena zavisi od stvarne kilometraže i konzularnih taksi'
                        : 'Exact quote depends on transit route and consular fees'}
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-[11px] text-slate-200 flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                  <span>{t.estimator.output.billingNote}</span>
                </p>
              </div>

              {/* Body: Route Corridor, Included Procedures & Legal Documents */}
              <div className="p-6 sm:p-7 space-y-6">
                {/* Route Corridor */}
                <div className="bg-porcelain p-3.5 rounded-xl border border-stoneBorder text-xs sm:text-sm text-slateDeep font-medium">
                  {currentMatrix.routeSummary}
                </div>

                {/* Included Procedures */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slateDeep mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-forest" />
                    <span>{t.estimator.output.proceduresTitle}</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {currentMatrix.procedures.map((proc, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-slateMuted leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-sapphire mt-2 shrink-0" />
                        <span>{proc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Official Documents Delivered */}
                <div className="pt-4 border-t border-stoneBorder">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slateDeep mb-3 flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-sapphire" />
                    <span>{t.estimator.output.documentChecklistTitle}</span>
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {currentMatrix.documentsIssued.map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs sm:text-sm text-slateDeep bg-alabaster/70 px-3 py-2 rounded-lg border border-stoneBorder/70"
                      >
                        <FileCheck className="w-3.5 h-3.5 text-sapphire shrink-0" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTAs: Direct WhatsApp with Prefilled Params & Formal Modal */}
                <div className="pt-4 border-t border-stoneBorder flex flex-col sm:flex-row gap-3">
                  <a
                    href={buildWhatsAppHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-forest hover:bg-forest-hover text-white font-semibold py-3.5 px-5 rounded-xl shadow-sm transition-all text-sm"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    <span>{t.estimator.output.whatsappBtn}</span>
                  </a>

                  <button
                    type="button"
                    onClick={onOpenModalWithCurrentSelection}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-sapphire hover:bg-sapphire-light text-white font-semibold py-3.5 px-5 rounded-xl shadow-sm transition-all text-sm"
                  >
                    <Send className="w-4 h-4 shrink-0" />
                    <span>{t.estimator.output.modalBtn}</span>
                  </button>
                </div>

                <p className="text-[11px] text-slateMuted leading-relaxed">
                  {t.estimator.output.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

