import React from 'react';
import {
  Shield,
  ChevronRight,
  ArrowLeft,
  Phone,
  MessageCircle,
  FileCheck,
} from 'lucide-react';
import {
  LocaleSlug,
  SeoRouteEntry,
  buildLocalizedPath,
  localeSlugToLang,
} from '../data/seo-routes';
import {
  ServiceType,
  RegionType,
  LocationType,
  translations,
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_NUMBER,
} from '../i18n/translations';
import { PricingSection } from '../components/PricingSection';
import { RouteEstimator } from '../components/RouteEstimator';
import { RemoteSavingsEstimator } from '../components/RemoteSavingsEstimator';
import { MortuaryTimeTracker } from '../components/MortuaryTimeTracker';
import { FaqSection } from '../components/FaqSection';

interface PricingBreakdownProps {
  locale: LocaleSlug;
  route: SeoRouteEntry;
  selectedService: ServiceType;
  setSelectedService: (s: ServiceType) => void;
  selectedRegion: RegionType;
  setSelectedRegion: (r: RegionType) => void;
  selectedLocation: LocationType;
  setSelectedLocation: (l: LocationType) => void;
  onNavigate: (localizedPath: string) => void;
  onOpenModal: () => void;
}

export const PricingBreakdown: React.FC<PricingBreakdownProps> = ({
  locale,
  route,
  selectedService,
  setSelectedService,
  selectedRegion,
  setSelectedRegion,
  selectedLocation,
  setSelectedLocation,
  onNavigate,
  onOpenModal,
}) => {
  const lang = localeSlugToLang(locale);
  const t = translations[lang];
  const page = route.locales[locale];
  const homePath = buildLocalizedPath(locale, '/');
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    page.whatsappPrefill
  )}`;

  const ui =
    locale === 'ru'
      ? {
          home: 'Главная',
          backToHome: 'Вернуться на главную',
          callBtn: 'Позвонить 24/7',
          whatsappBtn: 'Запросить смету в WhatsApp',
          tableItem: 'Статья расходов / Государственная процедура',
          tableStatus: 'Статус включения',
          tableCost: 'Базовый тариф',
        }
      : locale === 'mne'
      ? {
          home: 'Početna',
          backToHome: 'Povratak na početnu',
          callBtn: 'Pozovite 24/7',
          whatsappBtn: 'Zatražite proračun (WhatsApp)',
          tableItem: 'Stavka troškova / Zakonska procedura',
          tableStatus: 'Status u obračunu',
          tableCost: 'Početni iznos',
        }
      : {
          home: 'Home',
          backToHome: 'Return to Main Overview',
          callBtn: 'Call 24/7',
          whatsappBtn: 'Request Quote on WhatsApp',
          tableItem: 'Statutory Procedure / Cost Component',
          tableStatus: 'Inclusion Status',
          tableCost: 'Starting Rate',
        };

  return (
    <article className="bg-porcelain text-slateDeep">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-stoneBorder breadcrumbs-nav no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <nav
            aria-label="Breadcrumb"
            className="text-xs text-slate-500 font-sans tracking-wide flex items-center gap-1.5 flex-wrap"
          >
            <a
              href={homePath}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(homePath);
              }}
              className="hover:text-sapphire transition-colors font-medium"
            >
              {ui.home}
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slateDeep font-semibold">
              {page.breadcrumbLabel}
            </span>
          </nav>

          <button
            type="button"
            onClick={() => onNavigate(homePath)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-forest transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{ui.backToHome}</span>
          </button>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#EEF3F8] via-[#F5F7FA] to-porcelain border-b border-stoneBorder py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stoneBorder shadow-sm">
              <Shield className="w-4 h-4 text-sapphire shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-sapphire">
                {page.eyebrow}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-semibold text-slateDeep leading-[1.15]">
              {page.h1}
            </h1>

            <p className="text-base sm:text-lg text-slateMuted leading-relaxed">
              {page.heroSubtitle}
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 bg-sapphire hover:bg-sapphire-light text-white font-semibold py-3 px-5 rounded-xl text-sm shadow-xs transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>
                  {ui.callBtn} ({PHONE_DISPLAY})
                </span>
              </a>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-forest hover:bg-forest-hover text-white font-semibold py-3 px-5 rounded-xl text-sm shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{ui.whatsappBtn}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Full 5-Package Starting Tariff Grid */}
      <PricingSection lang={lang} />

      {/* Interactive Route & Live Currency Estimator (EUR / GBP / USD) */}
      <RouteEstimator
        lang={lang}
        t={t}
        selectedService={selectedService}
        setSelectedService={setSelectedService}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        onOpenModalWithCurrentSelection={onOpenModal}
      />

      {/* Remote Savings & Mortuary Accrual Trackers */}
      <section className="py-12 bg-porcelain border-b border-stoneBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <RemoteSavingsEstimator locale={locale} />
          <MortuaryTimeTracker locale={locale} />
        </div>
      </section>

      {/* Itemized Statutory Cost Breakdown Table */}
      <section className="py-14 sm:py-16 bg-alabaster border-b border-stoneBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-slateDeep">
              {page.costHeading}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slateMuted">
              {page.costSubtitle}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-stoneBorder shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-sapphire text-white text-xs uppercase tracking-wider">
                    <th className="py-4 px-6 font-semibold">{ui.tableItem}</th>
                    <th className="py-4 px-6 font-semibold">{ui.tableStatus}</th>
                    <th className="py-4 px-6 font-semibold">{ui.tableCost}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stoneBorder text-xs sm:text-sm">
                  {page.costItems.map((row, idx) => (
                    <tr key={idx} className="hover:bg-porcelain/70">
                      <td className="py-4 px-6">
                        <span className="font-semibold text-slateDeep block">
                          {row.item}
                        </span>
                        <span className="text-xs text-slateMuted block mt-0.5">
                          {row.detail}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-forest bg-forest-subtle px-2.5 py-1 rounded-full">
                          <FileCheck className="w-3.5 h-3.5" />
                          {row.includedStatus}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-semibold text-slateDeep whitespace-nowrap">
                        {row.referenceCost}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection heading={page.faqHeading} faqs={page.faqs} locale={locale} />
    </article>
  );
};
