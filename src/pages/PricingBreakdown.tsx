import React, { useState } from 'react';
import {
  Shield,
  ChevronRight,
  ArrowLeft,
  Phone,
  MessageCircle,
  FileCheck,
  CheckCircle2,
  Coins,
  ArrowRight,
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
import {
  FULL_SERVICE_PRICING_TIERS,
  SupportedCurrency,
  formatTariffItemPrice,
  buildTariffItemWhatsAppHref,
  PRICING_CLARIFICATION_NOTE,
} from '../data/pricing';
import { LEGAL_CREDENTIALS, getCrpsPibDisplay } from '../config/legalCredentials';
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
  const [currency, setCurrency] = useState<SupportedCurrency>('EUR');

  const lang = localeSlugToLang(locale);
  const t = translations[lang];
  const page = route.locales[locale];
  const homePath = buildLocalizedPath(locale, '/');
  const servicesPath = buildLocalizedPath(locale, '/services/');
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
          servicesBtn: 'Каталог всех 12 направлений',
          catalogEyebrow: 'ПОЛНЫЙ ТАРИФНЫЙ РЕЕСТР АГЕНТСТВА (14 ПОЗИЦИЙ • 2026)',
          catalogTitle: 'Стартовые тарифы «От ... €» по всем услугам Memorijal d.o.o.',
          catalogSubtitle:
            'Все цены указаны как открытые базовые ориентиры без скрытых наценок. Официальные фискальные счета Черногории (EFI QR) выставляются в евро (EUR €) с четким разделением агентского вознаграждения Memorijal d.o.o. (KD 82.99) и транзитных расходов третьих лиц (prolazne stavke: авиатариф MAWB, госпошлины, услуги крематория и DOO Komunalno).',
          currencyLabel: 'Валюта ориентировочного расчета:',
          currencyNotice:
            'Официальное выставление счетов (SEPA / SWIFT IBAN и фискализация EFI QR) производится строго в евро (EUR €). Конвертация в GBP (£) и USD ($) носит справочный характер.',
          startingRateLabel: 'Базовый тариф',
          whatsappCardCta: 'Запросить расчет в WhatsApp',
          detailsLinkLabel: 'Описание процедуры',
          tableItem: 'Статья расходов / Государственная процедура',
          tableStatus: 'Статус включения',
          tableCost: 'Базовый тариф',
          fiscalFooter: `Memorijal d.o.o. (${LEGAL_CREDENTIALS.ACTIVITY_CODES_SHORT}) • ${getCrpsPibDisplay('ru')}`,
        }
      : locale === 'mne'
      ? {
          home: 'Početna',
          backToHome: 'Povratak na početnu',
          callBtn: 'Pozovite 24/7',
          whatsappBtn: 'Zatražite proračun (WhatsApp)',
          servicesBtn: 'Pregled svih 12 usluga',
          catalogEyebrow: 'KOMPLETAN CJENOVNIK AGENCIJE (14 STAVKI • 2026)',
          catalogTitle: 'Početne cijene ("Od ... €") za sve usluge Memorijal d.o.o.',
          catalogSubtitle:
            'Sve cijene su iskazane kao početni iznosi bez skrivenih marži. Zvanični crnogorski EFI QR fiskalni računi izdaju se u eurima (EUR €), uz jasno razdvajanje agencijske naknade za koordinaciju (KD 82.99) i prolaznih stavki trećih lica (prefakturisanje: avio-kargo MAWB, državne takse, krematorijum i DOO Komunalno).',
          currencyLabel: 'Valuta informativnog prikaza:',
          currencyNotice:
            'Zvanično fakturisanje (SEPA / SWIFT IBAN i EFI QR fiskalizacija) vrši se isključivo u eurima (EUR €). Prikaz u GBP (£) i USD ($) je informativnog karaktera.',
          startingRateLabel: 'Početna cijena',
          whatsappCardCta: 'Zatražite ponudu (WhatsApp)',
          detailsLinkLabel: 'Detalji procedure',
          tableItem: 'Stavka troškova / Zakonska procedura',
          tableStatus: 'Status u obračunu',
          tableCost: 'Početni iznos',
          fiscalFooter: `Memorijal d.o.o. (${LEGAL_CREDENTIALS.ACTIVITY_CODES_SHORT}) • ${getCrpsPibDisplay('mne')}`,
        }
      : {
          home: 'Home',
          backToHome: 'Return to Main Overview',
          callBtn: 'Call 24/7',
          whatsappBtn: 'Request Quote on WhatsApp',
          servicesBtn: 'Explore All 12 Services',
          catalogEyebrow: 'COMPLETE AGENCY TARIFF SCHEDULE (14 ITEMS • 2026)',
          catalogTitle: 'Open-Ended "Starting From" Rates Across All Agency Services',
          catalogSubtitle:
            'All tariffs are structured as transparent starting benchmarks with zero hidden markups. Official Montenegrin EFI QR fiscal invoices are issued in Euros (EUR €), strictly separating Memorijal d.o.o. coordination fees (KD 82.99) from third-party pass-through disbursements (prolazne stavke: airline MAWB freight, state duties, crematorium fees, and municipal DOO Komunalno charges).',
          currencyLabel: 'Reference Display Currency:',
          currencyNotice:
            'Official SEPA / SWIFT IBAN invoices and Montenegro Tax Administration EFI QR fiscal receipts are issued strictly in Euros (EUR €). GBP (£) and USD ($) figures are indicative.',
          startingRateLabel: 'Starting Rate',
          whatsappCardCta: 'Inquire via WhatsApp',
          detailsLinkLabel: 'Procedure Details',
          tableItem: 'Statutory Procedure / Cost Component',
          tableStatus: 'Inclusion Status',
          tableCost: 'Starting Rate',
          fiscalFooter: `Memorijal d.o.o. (${LEGAL_CREDENTIALS.ACTIVITY_CODES_SHORT}) • ${getCrpsPibDisplay('en')}`,
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

              <a
                href={servicesPath}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(servicesPath);
                }}
                className="inline-flex items-center gap-2 bg-white hover:bg-alabaster text-slateDeep font-semibold py-3 px-5 rounded-xl text-sm border border-stoneBorder transition-colors"
              >
                <span>{ui.servicesBtn}</span>
                <ArrowRight className="w-4 h-4 text-sapphire" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Complete 14-Item "Starting From" Tariff Matrix Across 3 Tiers + Multi-Currency Switcher */}
      <section
        id="full-service-tariffs"
        className="py-14 sm:py-18 bg-alabaster border-b border-stoneBorder"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header + Multi-Currency Toggle Bar */}
          <div className="bg-white rounded-2xl border border-stoneBorder p-6 sm:p-8 shadow-card space-y-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-3xl space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-sapphire">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span>{ui.catalogEyebrow}</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-slateDeep leading-tight">
                  {ui.catalogTitle}
                </h2>
                <p className="text-xs sm:text-sm text-slateMuted leading-relaxed">
                  {ui.catalogSubtitle}
                </p>
              </div>

              {/* Currency Switcher (EUR € | GBP £ | USD $) */}
              <div className="flex flex-col sm:items-end gap-2 shrink-0">
                <span className="text-xs font-semibold text-slateMuted inline-flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-sapphire" />
                  <span>{ui.currencyLabel}</span>
                </span>
                <div
                  role="group"
                  aria-label={ui.currencyLabel}
                  className="inline-flex rounded-xl bg-porcelain p-1 border border-stoneBorder"
                >
                  {(
                    [
                      { code: 'EUR', label: 'EUR €' },
                      { code: 'GBP', label: 'GBP £' },
                      { code: 'USD', label: 'USD $' },
                    ] as { code: SupportedCurrency; label: string }[]
                  ).map((curr) => {
                    const active = currency === curr.code;
                    return (
                      <button
                        key={curr.code}
                        type="button"
                        onClick={() => setCurrency(curr.code)}
                        className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                          active
                            ? 'bg-sapphire text-white shadow-2xs'
                            : 'text-slateDeep hover:bg-white'
                        }`}
                      >
                        {curr.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stoneBorder flex flex-wrap items-center justify-between gap-3 text-xs text-slateMuted">
              <span className="inline-flex items-center gap-1.5 font-medium text-slateDeep">
                <CheckCircle2 className="w-4 h-4 text-forest shrink-0" />
                <span>{ui.currencyNotice}</span>
              </span>
              <span className="font-mono text-[11px] text-warmStone">
                {ui.fiscalFooter}
              </span>
            </div>
          </div>

          {/* Render All 3 Tiers (14 Total Service Tariffs) */}
          {FULL_SERVICE_PRICING_TIERS.map((tier) => (
            <div key={tier.tierId} className="space-y-6">
              <div className="max-w-3xl">
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-sapphire bg-sapphire-subtle px-3 py-1 rounded-full border border-sapphire/15 mb-2.5">
                  {tier.badge[locale]}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-slateDeep">
                  {tier.heading[locale]}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-slateMuted leading-relaxed">
                  {tier.subtitle[locale]}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 items-stretch">
                {tier.items.map((item) => {
                  const loc = item.locales[locale];
                  const displayPrice = formatTariffItemPrice(
                    item,
                    locale,
                    currency
                  );
                  const waHref = buildTariffItemWhatsAppHref(item, locale);
                  const detailsHref = item.targetPath
                    ? `${buildLocalizedPath(locale, item.targetPath)}${
                        item.anchorId ? `#${item.anchorId}` : ''
                      }`
                    : undefined;

                  return (
                    <article
                      key={item.id}
                      id={`tariff-${item.id}`}
                      className="row-span-5 grid grid-rows-subgrid gap-y-0 h-full min-w-0 bg-white rounded-2xl border border-stoneBorder p-6 shadow-card hover:shadow-elevated transition-all"
                    >
                      {/* Row 1: Top Badge & Code */}
                      <div className="flex items-center justify-between gap-2 min-h-[28px]">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-porcelain border border-stoneBorder text-[11px] font-semibold text-sapphire max-w-full">
                          <CheckCircle2 className="w-3.5 h-3.5 text-forest shrink-0" />
                          <span className="min-w-0 break-words">{loc.badge}</span>
                        </span>
                        <span className="text-[11px] font-mono font-semibold text-warmStone shrink-0">
                          {LEGAL_CREDENTIALS.ACTIVITY_CODES_SHORT} • #{item.codeNum}
                        </span>
                      </div>

                      {/* Row 2: Service Title */}
                      <h4 className="mt-3 font-serif text-xl font-semibold text-slateDeep leading-snug break-words">
                        {loc.title}
                      </h4>

                      {/* Row 3: Open-Ended Starting Price */}
                      <div className="mt-4 pt-3.5 border-t border-stoneBorder">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-warmStone block">
                          {ui.startingRateLabel}
                        </span>
                        <p
                          className={`mt-1 font-serif font-bold text-sapphire tracking-tight ${
                            item.isGopZeroFee
                              ? 'text-lg sm:text-xl text-emerald-800'
                              : 'text-2xl sm:text-3xl'
                          }`}
                        >
                          {displayPrice}
                        </p>
                        <p className="mt-2 inline-flex items-start gap-1.5 text-[11px] text-slateMuted bg-porcelain px-2.5 py-1.5 rounded-lg border border-stoneBorder/80 leading-snug">
                          <FileCheck className="w-3.5 h-3.5 text-sapphire shrink-0 mt-0.5" />
                          <span>{loc.disbursementNote}</span>
                        </p>
                      </div>

                      {/* Row 4: Scope Description */}
                      <p className="mt-3.5 text-xs sm:text-sm text-slateMuted leading-relaxed">
                        {loc.scope}
                      </p>

                      {/* Row 5: Instant WhatsApp Inquiry CTA + Optional Details Link */}
                      <div className="mt-6 pt-4 border-t border-stoneBorder/70 space-y-2 self-end">
                        <a
                          href={waHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 bg-[#1E7B54] hover:bg-[#176343] text-white text-xs sm:text-sm font-semibold py-2.5 px-4 rounded-xl shadow-xs transition-colors"
                        >
                          <MessageCircle className="w-4 h-4 shrink-0" />
                          <span>{ui.whatsappCardCta}</span>
                        </a>

                        {detailsHref && (
                          <a
                            href={detailsHref}
                            onClick={(e) => {
                              e.preventDefault();
                              onNavigate(detailsHref);
                            }}
                            className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-slateMuted hover:text-sapphire py-1 transition-colors"
                          >
                            <span>{ui.detailsLinkLabel}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Bottom Statutory Clarification Bar */}
          <div className="p-4 rounded-xl bg-white border border-stoneBorder flex flex-wrap items-center justify-between gap-3 text-xs text-slateMuted">
            <span className="font-medium text-slateDeep">
              {ui.fiscalFooter}
            </span>
            <span>{PRICING_CLARIFICATION_NOTE[locale]}</span>
          </div>
        </div>
      </section>

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
