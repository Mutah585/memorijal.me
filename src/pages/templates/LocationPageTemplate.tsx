import React from 'react';
import {
  Phone,
  Shield,
  FileCheck,
  Clock,
  MapPin,
  Globe,
  MessageCircle,
  ChevronRight,
  CheckCircle2,
  Award,
  ArrowLeft,
  Building2,
  Printer,
} from 'lucide-react';
import {
  LocaleSlug,
  SeoRouteEntry,
  ALL_SEO_ROUTES,
  buildLocalizedPath,
} from '../../data/seo-routes';
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_NUMBER,
  OFFICIAL_EMAIL,
} from '../../i18n/translations';
import {
  PRICING_CLARIFICATION_NOTE,
  PRICING_CTA_LABEL,
} from '../../data/pricing';
import { FaqSection } from '../../components/FaqSection';

interface LocationPageTemplateProps {
  locale: LocaleSlug;
  route: SeoRouteEntry;
  onNavigate: (localizedPath: string) => void;
  onOpenModal: () => void;
}

export const LocationPageTemplate: React.FC<LocationPageTemplateProps> = ({
  locale,
  route,
  onNavigate,
  onOpenModal,
}) => {
  const page = route.locales[locale];

  const homePath = buildLocalizedPath(locale, '/');
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    page.whatsappPrefill
  )}`;

  const ui =
    locale === 'ru'
      ? {
          home: 'Главная',
          categoryLocations: 'Города и госпитали ЧГ',
          backToHome: 'Вернуться на главную',
          call247: 'Дежурный выезд 24/7',
          whatsappDispatch: 'Вызвать координатора в WhatsApp',
          requestQuote: 'Запросить расчет стоимости',
          hospitalBadge: 'ПРЯМОЙ БОЛЬНИЧНЫЙ И МУНИЦИПАЛЬНЫЙ ПРОТОКОЛ',
          specResponse: 'Скорость выезда и готовность',
          specMorgue: 'Базовый госпиталь и морг',
          specConsular: 'Консульская легализация',
          specEmbassy: 'Посольства и ведомства',
          specMode: 'Спецтранспорт и отправка',
          specBudget: 'Ориентировочная стоимость под ключ',
          reqDocsTitle: 'Документы для начала работы (по доверенности)',
          catchmentTitle: 'Охват населенных пунктов и маршруты вывоза',
          authorityLabel: 'Учреждение:',
          timeframeLabel: 'Срок этапа:',
          tableItem: 'Этап / Государственная процедура',
          tableStatus: 'Статус',
          tableCost: 'Базовый тариф',
          eeatBadge: 'ЛИЧНЫЙ КОНТРОЛЬ РУКОВОДИТЕЛЯ • MEMORIJAL D.O.O.',
          eeatName: 'Максим Коваленко (Maksym Kovalenko)',
          eeatRole: 'Исполнительный координатор • Тиват / Котор / Подгорица',
          eeatText:
            'Мы лично контролируем прием тела в морге, проведение судебно-медицинских и санитарных процедур, опайку цинка в присутствии республиканского инспектора и оформление в ЗАГСе без необходимости приезда родственников.',
          otherLocations: 'Другие города и больничные хабы Черногории',
          corridorsTitle: 'Международные направления репатриации из этого города',
        }
      : locale === 'mne'
      ? {
          home: 'Početna',
          categoryLocations: 'Opštine i bolnice u CG',
          backToHome: 'Povratak na početnu',
          call247: 'Dežurni poziv 24/7',
          whatsappDispatch: 'WhatsApp prijava slučaja',
          requestQuote: 'Zatražite pisanu specifikaciju',
          hospitalBadge: 'DIREKTNI BOLNIČKI I OPŠTINSKI PROTOKOL',
          specResponse: 'Brzina izlaska i rok realizacije',
          specMorgue: 'Nadležna bolnica i mrtvačnica',
          specConsular: 'Konzularna procedura',
          specEmbassy: 'Ambasade i konzulati',
          specMode: 'Transport i otprema',
          specBudget: 'Okvirni trošak po proceduri',
          reqDocsTitle: 'Potrebna dokumentacija (po punomoćju)',
          catchmentTitle: 'Pokrivena naselja i pravci transporta',
          authorityLabel: 'Nadležni organ:',
          timeframeLabel: 'Vremenski okvir:',
          tableItem: 'Stavka / Zakonska procedura',
          tableStatus: 'Status',
          tableCost: 'Okvirni iznos',
          eeatBadge: 'LIČNI NADZOR KOORDINATORA • MEMORIJAL D.O.O.',
          eeatName: 'Maksym Kovalenko',
          eeatRole: 'Izvršni koordinator • Tivat / Kotor / Podgorica',
          eeatText:
            'Svaki slučaj u bolnicama i opštinama Crne Gore nadzire se lično uz poštovanje zakonskih i sanitarnih propisa, izdavanje zvaničnog EFI fiskalnog računa i prihvatanje garancija međunarodnih osiguranja.',
          otherLocations: 'Ostale opštine i bolnički centri u Crnoj Gori',
          corridorsTitle: 'Međunarodni koridori repatrijacije iz ove opštine',
        }
      : {
          home: 'Home',
          categoryLocations: 'Montenegro Locations & Hospitals',
          backToHome: 'Back to Main Overview',
          call247: '24/7 Dispatch Line',
          whatsappDispatch: 'WhatsApp On-Site Dispatch',
          requestQuote: 'Request Formal Quote',
          hospitalBadge: 'DIRECT HOSPITAL MORTUARY & MUNICIPAL PROTOCOL',
          specResponse: 'Response & Completion Timeframe',
          specMorgue: 'Assigned Hospital & Clinical Morgue',
          specConsular: 'Consular & Court Legalization',
          specEmbassy: 'Diplomatic Missions',
          specMode: 'Removal & International Transit',
          specBudget: 'Reference Turnkey Cost Range',
          reqDocsTitle: 'Documents Required (Executed via Remote PoA)',
          catchmentTitle: 'Municipal Catchment & Dispatch Corridors',
          authorityLabel: 'Hospital / Authority:',
          timeframeLabel: 'Timeframe:',
          tableItem: 'Local & Statutory Procedure',
          tableStatus: 'Status',
          tableCost: 'Reference Tariff',
          eeatBadge: 'EXECUTIVE ON-SITE ACCOUNTABILITY • MEMORIJAL D.O.O.',
          eeatName: 'Maksym Kovalenko',
          eeatRole: 'Executive Coordinator • Tivat / Kotor / Podgorica',
          eeatText:
            'Our coastal and capital teams coordinate directly with hospital pathology departments, police inspectors, municipal civil registrars (Matičar), and the Republic Sanitary Inspector—providing families and insurers with complete peace of mind.',
          otherLocations: 'Other Montenegro Municipal & Hospital Hubs',
          corridorsTitle: 'International Repatriation Corridors from This Location',
        };

  const categoryText =
    route.category === 'mortuary'
      ? locale === 'ru'
        ? 'Больничные морги и судебная медицина'
        : locale === 'mne'
        ? 'Bolničke mrtvačnice i sudska medicina'
        : 'Hospital Mortuaries & Forensic Centers'
      : route.category === 'cemetery'
      ? locale === 'ru'
        ? 'Городские кладбища и капеллы (Groblja)'
        : locale === 'mne'
        ? 'Gradska groblja i kapele'
        : 'Municipal Cemeteries & Chapels'
      : ui.categoryLocations;

  const otherLocations = ALL_SEO_ROUTES.filter(
    (r) => r.category === route.category && r.id !== route.id
  );
  const corridors = ALL_SEO_ROUTES.filter((r) => r.category === 'corridor');

  return (
    <article className="bg-porcelain text-slateDeep">
      {/* Official Print Letterhead (Hidden on screen, visible only on print) */}
      <div className="hidden print:block print-letterhead print-header">
        <div className="flex justify-between items-center text-xs text-slate-700">
          <div>
            <span className="font-serif font-bold text-sm text-slate-900 block tracking-wider">MEMORIJAL D.O.O.</span>
            <span>Međunarodna repatrijacija i koordinacija • Crna Gora</span>
          </div>
          <div className="text-right text-[11px]">
            <span className="block font-semibold">PIB: 03489217 | Tel: {PHONE_DISPLAY} (24/7)</span>
            <span>{OFFICIAL_EMAIL} | memorijal.me</span>
          </div>
        </div>
      </div>

      {/* 1. SEMANTIC BREADCRUMBS */}
      <div className="bg-white border-b border-stoneBorder breadcrumbs-nav no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <nav
            aria-label="Breadcrumb"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
            className="text-xs text-slate-500 font-sans tracking-wide flex items-center gap-1.5 flex-wrap"
          >
            <span
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <a
                href={homePath}
                itemProp="item"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(homePath);
                }}
                className="hover:text-forest transition-colors font-medium"
              >
                <span itemProp="name">{ui.home}</span>
              </a>
              <meta itemProp="position" content="1" />
            </span>

            <span className="text-slate-300 select-none">/</span>

            <span
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="inline-flex items-center text-slate-500"
            >
              <span itemProp="name">{categoryText}</span>
              <meta itemProp="position" content="2" />
            </span>

            <span className="text-slate-300 select-none">/</span>

            <span
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="inline-flex items-center font-semibold text-slate-900"
              aria-current="page"
            >
              <span itemProp="name">{page.breadcrumbLabel}</span>
              <meta itemProp="position" content="3" />
            </span>
          </nav>

          <button
            type="button"
            onClick={() => onNavigate(homePath)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-forest transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{ui.backToHome}</span>
          </button>
        </div>
      </div>

      {/* 2. EMERGENCY ACTION BAR */}
      <div className="bg-forest-subtle border-b border-forest/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 text-slateDeep font-semibold">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forest opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-forest"></span>
            </span>
            <span>{page.emergencyBannerText}</span>
          </div>
          <a
            href={PHONE_HREF}
            className="text-forest font-bold hover:underline inline-flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{PHONE_DISPLAY}</span>
          </a>
        </div>
      </div>

      {/* 3. LOCATION HERO BANNER */}
      <header className="bg-gradient-to-b from-[#EEF3F8] via-[#F5F7FA] to-porcelain border-b border-stoneBorder py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stoneBorder shadow-sm">
              <MapPin className="w-4 h-4 text-sapphire shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-sapphire">
                {page.eyebrow}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[50px] font-semibold text-slateDeep leading-[1.15]">
              {page.h1}
            </h1>

            <p className="text-base sm:text-lg lg:text-[19px] text-slateMuted leading-[1.68]">
              {page.heroSubtitle}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2.5 bg-sapphire hover:bg-sapphire-light text-white font-semibold px-6 py-4 rounded-xl shadow-sm transition-all text-base"
              >
                <Phone className="w-5 h-5 text-emerald-300 shrink-0" />
                <span>
                  {ui.call247}: {PHONE_DISPLAY}
                </span>
              </a>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-forest hover:bg-forest-hover text-white font-semibold px-6 py-4 rounded-xl shadow-sm transition-all text-base"
              >
                <MessageCircle className="w-5 h-5 shrink-0" />
                <span>{ui.whatsappDispatch}</span>
              </a>

              <button
                type="button"
                onClick={onOpenModal}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-alabaster text-slateDeep border border-stoneBorder font-semibold px-5 py-4 rounded-xl shadow-sm transition-all text-sm sm:text-base"
              >
                <FileCheck className="w-4 h-4 text-sapphire" />
                <span>{ui.requestQuote}</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-alabaster text-slate-600 border border-stoneBorder font-medium px-4 py-4 rounded-xl shadow-sm transition-all text-sm no-print"
                title={
                  locale === 'ru'
                    ? 'Распечатать досье маршрута (PDF)'
                    : locale === 'mne'
                    ? 'Štampaj dosije rute (PDF)'
                    : 'Print Route Dossier (PDF)'
                }
              >
                <Printer className="w-4 h-4 text-slate-500" />
                <span>
                  {locale === 'ru'
                    ? 'Печать (PDF)'
                    : locale === 'mne'
                    ? 'Štampa (PDF)'
                    : 'Print (PDF)'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 4. CITY / HOSPITAL DATA MATRIX */}
      <section className="py-12 sm:py-16 bg-white border-b border-stoneBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-sapphire mb-3">
            <Building2 className="w-4 h-4" />
            <span>{ui.hospitalBadge}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-slateDeep">
            {page.matrixHeading}
          </h2>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-5 rounded-xl bg-porcelain border border-stoneBorder">
              <span className="text-xs font-semibold uppercase tracking-wider text-warmStone flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-sapphire" />
                {ui.specMorgue}
              </span>
              <p className="mt-2 font-serif text-lg sm:text-xl font-bold text-slateDeep">
                {page.specs.morgueCatchment}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-porcelain border border-stoneBorder">
              <span className="text-xs font-semibold uppercase tracking-wider text-warmStone flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-sapphire" />
                {ui.specResponse}
              </span>
              <p className="mt-2 text-sm sm:text-base font-semibold text-slateDeep">
                {page.specs.transitTime}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-porcelain border border-stoneBorder">
              <span className="text-xs font-semibold uppercase tracking-wider text-warmStone flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-sapphire" />
                {ui.specConsular}
              </span>
              <p className="mt-2 text-sm sm:text-base font-semibold text-slateDeep">
                {page.specs.consularTimeframe}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-porcelain border border-stoneBorder">
              <span className="text-xs font-semibold uppercase tracking-wider text-warmStone flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-sapphire" />
                {ui.specEmbassy}
              </span>
              <p className="mt-2 text-sm sm:text-base font-semibold text-slateDeep">
                {page.specs.embassyJurisdiction}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-porcelain border border-stoneBorder">
              <span className="text-xs font-semibold uppercase tracking-wider text-warmStone flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-sapphire" />
                {ui.specMode}
              </span>
              <p className="mt-2 text-sm sm:text-base font-semibold text-slateDeep">
                {page.specs.transportMode}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-sapphire text-white border border-sapphire">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                {ui.specBudget}
              </span>
              <p className="mt-2 font-serif text-xl font-bold text-white">
                {page.specs.estimatedTotalRange}
              </p>
              <p className="mt-1.5 text-[11px] text-slate-300 leading-snug">
                {PRICING_CLARIFICATION_NOTE[locale]}
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-alabaster border border-stoneBorder">
              <h3 className="text-xs font-bold uppercase tracking-wider text-sapphire mb-3">
                {ui.reqDocsTitle}
              </h3>
              <ul className="space-y-2">
                {page.specs.requiredDocuments.map((doc, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slateDeep"
                  >
                    <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-alabaster border border-stoneBorder">
              <h3 className="text-xs font-bold uppercase tracking-wider text-sapphire mb-3">
                {ui.catchmentTitle}
              </h3>
              <ul className="space-y-2">
                {page.specs.receivingRequirements.map((req, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slateDeep"
                  >
                    <MapPin className="w-4 h-4 text-sapphire shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. STRUCTURED EXPLAINER SECTION (H2) */}
      <section className="py-14 sm:py-20 bg-porcelain border-b border-stoneBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-slateDeep">
              {page.explainerHeading}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slateMuted leading-relaxed">
              {page.explainerIntro}
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {page.walkthroughSteps.map((step) => (
              <div
                key={step.stepNumber}
                className="bg-white rounded-2xl border border-stoneBorder p-6 sm:p-7 shadow-card flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4 max-w-3xl">
                  <div className="w-12 h-12 rounded-xl bg-sapphire text-white font-serif text-2xl font-bold flex items-center justify-center shrink-0">
                    {step.stepNumber}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-semibold text-slateDeep">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slateMuted leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="lg:w-72 shrink-0 bg-alabaster p-4 rounded-xl border border-stoneBorder space-y-1.5 text-xs">
                  <div>
                    <span className="text-warmStone font-semibold block">
                      {ui.authorityLabel}
                    </span>
                    <span className="text-slateDeep font-semibold">
                      {step.authority}
                    </span>
                  </div>
                  <div className="pt-1.5 border-t border-stoneBorder">
                    <span className="text-warmStone font-semibold block">
                      {ui.timeframeLabel}
                    </span>
                    <span className="text-sapphire font-bold">
                      {step.timeframe}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. COST TRANSPARENCY & INCLUDED ITEMS */}
      <section className="py-14 sm:py-20 bg-alabaster border-b border-stoneBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-slateDeep">
              {page.costHeading}
            </h2>
            <p className="mt-3 text-base text-slateMuted leading-relaxed">
              {page.costSubtitle}
            </p>
          </div>

          <div className="mt-8 bg-white rounded-2xl border border-stoneBorder shadow-card overflow-hidden">
            {/* Desktop Table View (≥ 768px) */}
            <div className="hidden md:block overflow-x-auto">
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
                    <tr key={idx} className="hover:bg-porcelain/60 transition-colors">
                      <td className="py-4 px-6">
                        <p className="font-semibold text-slateDeep">{row.item}</p>
                        <p className="text-xs text-slateMuted mt-1">{row.detail}</p>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 bg-forest-subtle text-forest font-semibold px-3 py-1 rounded-full text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {row.includedStatus}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-serif text-lg font-bold text-sapphire whitespace-nowrap">
                        {row.referenceCost}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Stacked Cards View (< 768px) */}
            <div className="md:hidden divide-y divide-stoneBorder p-4 space-y-4">
              {page.costItems.map((row, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-2.5 p-4 rounded-xl border border-stoneBorder bg-surface pt-4 first:pt-0 first:border-t-0"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-slateDeep text-sm leading-snug">
                      {row.item}
                    </p>
                    <span className="font-serif text-base font-bold text-sapphire shrink-0">
                      {row.referenceCost}
                    </span>
                  </div>

                  <p className="text-xs text-slateMuted leading-relaxed">
                    {row.detail}
                  </p>

                  <div className="pt-1 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 bg-forest-subtle text-forest font-semibold px-2.5 py-1 rounded-full text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {row.includedStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 bg-porcelain border-t border-stoneBorder flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-xs text-slateMuted flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-sapphire shrink-0" />
                <span>{PRICING_CLARIFICATION_NOTE[locale]}</span>
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1E7B54] hover:bg-[#176343] text-white text-xs sm:text-sm font-medium px-5 py-2.5 rounded-full shadow-xs transition-colors shrink-0"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>{PRICING_CTA_LABEL[locale]}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. DYNAMIC FAQ ACCORDION + REAL-TIME SEARCH */}
      <FaqSection
        heading={page.faqHeading}
        faqs={page.faqs}
        locale={locale}
      />

      {/* 8. E-E-A-T DIRECTOR ASSURANCE */}
      <section className="py-14 sm:py-16 bg-white border-b border-stoneBorder">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-sapphire text-white rounded-2xl p-7 sm:p-10 shadow-elevated grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-300">
                <Award className="w-4 h-4" />
                <span>{ui.eeatBadge}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-white">
                {ui.eeatName} — {ui.eeatRole}
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {ui.eeatText}
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono text-emerald-200">
                <span className="bg-white/10 px-3 py-1 rounded">PIB: 03489217</span>
                <span className="bg-white/10 px-3 py-1 rounded">PDV: 30/31-20948-4</span>
                <span className="bg-white/10 px-3 py-1 rounded">
                  {locale === 'ru'
                    ? 'Фискализация EFI QR'
                    : locale === 'mne'
                    ? 'EFI QR Fiskalizacija'
                    : 'EFI QR Fiscalization'}
                </span>
                <span className="bg-white/10 px-3 py-1 rounded">SWIFT / SEPA IBAN</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <a
                href={PHONE_HREF}
                className="w-full inline-flex items-center justify-center gap-2 bg-forest hover:bg-forest-hover text-white font-semibold py-3.5 px-5 rounded-xl text-sm transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{PHONE_DISPLAY}</span>
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-white text-sapphire hover:bg-alabaster font-semibold py-3.5 px-5 rounded-xl text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-forest" />
                <span>WhatsApp ({OFFICIAL_EMAIL})</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 9. INTERNAL CROSS-LINKING */}
      <section className="py-12 sm:py-16 bg-alabaster">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-sapphire mb-4 flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span>{ui.otherLocations}</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {otherLocations.map((item) => {
                const targetPath = buildLocalizedPath(locale, item.path);
                return (
                  <a
                    key={item.id}
                    href={targetPath}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(targetPath);
                    }}
                    className="bg-white hover:bg-sapphire hover:text-white text-slateDeep p-3.5 rounded-xl border border-stoneBorder text-xs sm:text-sm font-medium flex items-center justify-between transition-colors group"
                  >
                    <span>{item.locales[locale].breadcrumbLabel}</span>
                    <ChevronRight className="w-4 h-4 text-sapphire group-hover:text-white shrink-0" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-sapphire mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>{ui.corridorsTitle}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {corridors.map((item) => {
                const targetPath = buildLocalizedPath(locale, item.path);
                return (
                  <a
                    key={item.id}
                    href={targetPath}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(targetPath);
                    }}
                    className="bg-white hover:bg-sapphire hover:text-white text-slateDeep p-3.5 rounded-xl border border-stoneBorder text-xs sm:text-sm font-medium flex items-center justify-between transition-colors group"
                  >
                    <span>{item.locales[locale].breadcrumbLabel}</span>
                    <ChevronRight className="w-4 h-4 text-sapphire group-hover:text-white shrink-0" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};

