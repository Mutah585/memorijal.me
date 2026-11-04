import React from 'react';
import {
  Phone,
  Shield,
  Plane,
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
  localeSlugToLang,
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
import { PricingSection } from '../../components/PricingSection';
import { FaqSection } from '../../components/FaqSection';

interface CorridorPageTemplateProps {
  locale: LocaleSlug;
  route: SeoRouteEntry;
  onNavigate: (localizedPath: string) => void;
  onOpenModal: () => void;
}

export const CorridorPageTemplate: React.FC<CorridorPageTemplateProps> = ({
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

  const uiLabels =
    locale === 'ru'
      ? {
          home: 'Главная',
          categoryCorridor: 'Международные коридоры',
          categoryService: 'Услуги',
          categoryResource: 'Информация и тарифы',
          backToHome: 'Вернуться на главную панель',
          call247: 'Позвонить 24/7',
          whatsappDispatch: 'Написать в WhatsApp (предзаполнено)',
          requestQuote: 'Запросить письменную смету',
          authorityLabel: 'Уполномоченный орган:',
          timeframeLabel: 'Нормативный срок:',
          specTransit: 'Срок транспортировки',
          specMode: 'Вид транспорта',
          specConsular: 'Консульские сроки в Подгорице',
          specEmbassy: 'Дипломатическое ведомство',
          specMorgue: 'Охват моргов в Черногории',
          specPrice: 'Стартовый тариф под ключ',
          reqDocsTitle: 'Необходимые документы от семьи (дистанционно)',
          recReqTitle: 'Условия приема в стране назначения',
          tableItem: 'Статья расходов / Государственная процедура',
          tableStatus: 'Статус включения',
          tableCost: 'Базовый тариф',
          eeatBadge: 'ПЕРСОНАЛЬНЫЙ КОНТРОЛЬ И ЛИЦЕНЗИЯ DOO (E-E-A-T)',
          eeatName: 'Максим Коваленко (Maksym Kovalenko)',
          eeatRole: 'Исполнительный координатор • Memorijal d.o.o. Montenegro',
          eeatText:
            'Каждое международное дело проверяется и контролируется лично от момента поступления тела в морг Котора или KCCG Подгорицы до пересечения границы или выдачи урны. Мы работаем строго по государственному фискальному счету (EFI QR) и принимаем оплату SEPA/SWIFT или гарантии страховых компаний (GOP).',
          specBadge: 'ОФИЦИАЛЬНАЯ ЛОГИСТИЧЕСКАЯ И КОНСУЛЬСКАЯ СПЕЦИФИКАЦИЯ',
          efiBadge: 'Фискализация EFI QR',
          relatedCorridors: 'Другие международные коридоры репатриации',
          relatedLocations: 'Муниципальные и больничные хабы в Черногории',
        }
      : locale === 'mne'
      ? {
          home: 'Početna',
          categoryCorridor: 'Međunarodni koridori',
          categoryService: 'Usluge',
          categoryResource: 'Informacije i cjenovnik',
          backToHome: 'Povratak na početnu stranicu',
          call247: 'Pozovite 24/7',
          whatsappDispatch: 'WhatsApp kontakt (sa parametrima)',
          requestQuote: 'Zatražite pisanu ponudu',
          authorityLabel: 'Nadležna institucija:',
          timeframeLabel: 'Zakonski rok:',
          specTransit: 'Vrijeme transporta',
          specMode: 'Vrsta prevoza',
          specConsular: 'Konzularni rok u Podgorici',
          specEmbassy: 'Nadležna ambasada / konzulat',
          specMorgue: 'Bolničke mrtvačnice u CG',
          specPrice: 'Početna cijena paketa',
          reqDocsTitle: 'Potrebna dokumentacija od porodice (po punomoćju)',
          recReqTitle: 'Uslovi prijema u državi odredišta',
          tableItem: 'Stavka troškova / Zakonska procedura',
          tableStatus: 'Status u obračunu',
          tableCost: 'Početni iznos',
          eeatBadge: 'LIČNA ODGOVORNOST I DOO LICENCA (E-E-A-T)',
          eeatName: 'Maksym Kovalenko',
          eeatRole: 'Izvršni koordinator • Memorijal d.o.o. Crna Gora',
          eeatText:
            'Svaki međunarodni slučaj nadzire se lično od prijema u Opštu bolnicu Kotor ili KCCG Podgorica do konačnog dolaska u zemlju odredišta. Poslujemo kao registrovani DOO u Crnoj Gori (PIB: 03489217) uz zvaničnu EFI fiskalizaciju i SEPA/SWIFT IBAN plaćanja.',
          specBadge: 'ZVANIČNA LOGISTIČKA I KONZULARNA SPECIFIKACIJA',
          efiBadge: 'EFI QR Fiskalizacija',
          relatedCorridors: 'Drugi međunarodni koridori repatrijacije',
          relatedLocations: 'Opštinski i bolnički centri u Crnoj Gori',
        }
      : {
          home: 'Home',
          categoryCorridor: 'Repatriation Corridors',
          categoryService: 'Core Services',
          categoryResource: 'Resources & Transparency',
          backToHome: 'Return to Main Overview',
          call247: 'Call 24/7 Hotline',
          whatsappDispatch: 'Direct WhatsApp (Prefilled)',
          requestQuote: 'Request Written Quote',
          authorityLabel: 'Competent Authority:',
          timeframeLabel: 'Statutory Timeframe:',
          specTransit: 'Estimated Transit Time',
          specMode: 'Transport Modality',
          specConsular: 'Podgorica Consular Timeframe',
          specEmbassy: 'Diplomatic Mission',
          specMorgue: 'Montenegro Morgue Catchment',
          specPrice: 'Starting Package Rate',
          reqDocsTitle: 'Required Family Documents (Executed Remotely)',
          recReqTitle: 'Destination Airport / Cemetery Receiving Protocol',
          tableItem: 'Statutory Procedure / Cost Component',
          tableStatus: 'Inclusion Status',
          tableCost: 'Starting Rate',
          eeatBadge: 'E-E-A-T EXECUTIVE ASSURANCE & LICENSED DOO ENTITY',
          eeatName: 'Maksym Kovalenko',
          eeatRole: 'Executive Coordinator • Memorijal d.o.o. Montenegro',
          eeatText:
            'Every cross-border repatriation and Belgrade cremation case is personally supervised from hospital mortuary release in Kotor or KCCG Podgorica through final handover. Memorijal d.o.o. is a licensed Montenegrin corporate entity (PIB: 03489217) issuing official EFI QR fiscal invoices for insurance and SEPA/SWIFT settlement.',
          specBadge: 'OFFICIAL LOGISTICS & CONSULAR SPECIFICATION',
          efiBadge: 'EFI QR Fiscalization',
          relatedCorridors: 'Other International Repatriation Corridors',
          relatedLocations: 'Montenegro Municipal & Hospital Hubs',
        };

  const categoryText =
    route.category === 'corridor'
      ? uiLabels.categoryCorridor
      : route.category === 'service'
      ? uiLabels.categoryService
      : route.category === 'transit'
      ? locale === 'ru'
        ? 'Пограничные переходы и карго-терминалы'
        : locale === 'mne'
        ? 'Granični prelazi i kargo terminali'
        : 'Border Crossings & Cargo Hubs'
      : route.category === 'assistance'
      ? locale === 'ru'
        ? 'Страховые и ассистанс-компании (GOP)'
        : locale === 'mne'
        ? 'Osiguravajuće i asistentske kuće (GOP)'
        : 'Travel Insurance & Assistance Partners'
      : uiLabels.categoryResource;

  const corridorLinks = ALL_SEO_ROUTES.filter(
    (r) => r.category === 'corridor' && r.id !== route.id
  );
  const locationLinks = ALL_SEO_ROUTES.filter((r) => r.category === 'location');

  return (
    <article className="bg-porcelain text-slateDeep">
      {/* 1. SEMANTIC BREADCRUMBS WITH MICRODATA */}
      <div className="bg-white border-b border-stoneBorder">
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
              className="inline-flex items-center"
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
                <span itemProp="name">{uiLabels.home}</span>
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
            <span>{uiLabels.backToHome}</span>
          </button>
        </div>
      </div>

      {/* 2. EMERGENCY ACTION BAR (60-Minute Morgue Response Guarantee) */}
      <div className="bg-sapphire-subtle border-b border-sapphire/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 text-sapphire font-semibold">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forest opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-forest"></span>
            </span>
            <span>{page.emergencyBannerText}</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <a
              href={PHONE_HREF}
              className="text-sapphire hover:underline inline-flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5 text-forest" />
              <span>{PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3. HERO BANNER (Search Intent H1 + Direct 24/7 Call & Prefilled WhatsApp) */}
      <header className="relative bg-gradient-to-b from-[#EEF3F8] via-[#F5F7FA] to-porcelain border-b border-stoneBorder py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stoneBorder shadow-sm">
              <Globe className="w-4 h-4 text-sapphire shrink-0" />
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

            {/* Primary CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2.5 bg-sapphire hover:bg-sapphire-light text-white font-semibold px-6 py-4 rounded-xl shadow-sm transition-all text-base"
              >
                <Phone className="w-5 h-5 text-emerald-300 shrink-0" />
                <span>
                  {uiLabels.call247}: {PHONE_DISPLAY}
                </span>
              </a>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-forest hover:bg-forest-hover text-white font-semibold px-6 py-4 rounded-xl shadow-sm transition-all text-base"
              >
                <MessageCircle className="w-5 h-5 shrink-0" />
                <span>{uiLabels.whatsappDispatch}</span>
              </a>

              <button
                type="button"
                onClick={onOpenModal}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-alabaster text-slateDeep border border-stoneBorder font-semibold px-5 py-4 rounded-xl shadow-sm transition-all text-sm sm:text-base"
              >
                <FileCheck className="w-4 h-4 text-sapphire" />
                <span>{uiLabels.requestQuote}</span>
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

      {/* 4. CORRIDOR / SERVICE DATA MATRIX (SPEC GRID) */}
      <section className="py-12 sm:py-16 bg-white border-b border-stoneBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-sapphire mb-3">
            <Plane className="w-4 h-4" />
            <span>{uiLabels.specBadge}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-slateDeep">
            {page.matrixHeading}
          </h2>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-5 rounded-xl bg-porcelain border border-stoneBorder">
              <span className="text-xs font-semibold uppercase tracking-wider text-warmStone flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-sapphire" />
                {uiLabels.specTransit}
              </span>
              <p className="mt-2 font-serif text-xl font-bold text-slateDeep">
                {page.specs.transitTime}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-porcelain border border-stoneBorder">
              <span className="text-xs font-semibold uppercase tracking-wider text-warmStone flex items-center gap-1.5">
                <Plane className="w-4 h-4 text-sapphire" />
                {uiLabels.specMode}
              </span>
              <p className="mt-2 text-sm sm:text-base font-semibold text-slateDeep">
                {page.specs.transportMode}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-porcelain border border-stoneBorder">
              <span className="text-xs font-semibold uppercase tracking-wider text-warmStone flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-sapphire" />
                {uiLabels.specConsular}
              </span>
              <p className="mt-2 text-sm sm:text-base font-semibold text-slateDeep">
                {page.specs.consularTimeframe}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-porcelain border border-stoneBorder">
              <span className="text-xs font-semibold uppercase tracking-wider text-warmStone flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-sapphire" />
                {uiLabels.specEmbassy}
              </span>
              <p className="mt-2 text-sm sm:text-base font-semibold text-slateDeep">
                {page.specs.embassyJurisdiction}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-porcelain border border-stoneBorder">
              <span className="text-xs font-semibold uppercase tracking-wider text-warmStone flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-sapphire" />
                {uiLabels.specMorgue}
              </span>
              <p className="mt-2 text-sm sm:text-base font-semibold text-slateDeep">
                {page.specs.morgueCatchment}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-sapphire text-white border border-sapphire">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                {uiLabels.specPrice}
              </span>
              <p className="mt-2 font-serif text-xl font-bold text-white">
                {page.specs.estimatedTotalRange}
              </p>
              <p className="mt-1.5 text-[11px] text-slate-300 leading-snug">
                {PRICING_CLARIFICATION_NOTE[locale]}
              </p>
            </div>
          </div>

          {/* Required Family Documents & Receiving Requirements */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-alabaster border border-stoneBorder">
              <h3 className="text-xs font-bold uppercase tracking-wider text-sapphire mb-3">
                {uiLabels.reqDocsTitle}
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
                {uiLabels.recReqTitle}
              </h3>
              <ul className="space-y-2">
                {page.specs.receivingRequirements.map((req, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slateDeep"
                  >
                    <FileCheck className="w-4 h-4 text-sapphire shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* IATA Airport Cabin Urn Security Notice Card */}
          <div className="mt-6 p-6 rounded-2xl bg-white border border-stoneBorder shadow-card">
            <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-sapphire mb-3">
              <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {locale === 'ru'
                  ? 'Регламент IATA: перевозка урны с прахом в ручной клади самолёта'
                  : locale === 'mne'
                  ? 'IATA protokol: prevoz urne sa pepelom u ručnom prtljagu aviona'
                  : 'IATA Protocol: Carriage of Cremated Remains in Aircraft Cabin'}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slateDeep">
              <div className="p-3.5 rounded-xl bg-porcelain border border-stoneBorder">
                <span className="font-semibold text-sapphire block mb-1">
                  {locale === 'ru'
                    ? '1. Рентгенопрозрачный материал'
                    : locale === 'mne'
                    ? '1. Rendgenski propustan materijal'
                    : '1. Radiotransparent Material'}
                </span>
                <p className="text-slateMuted leading-relaxed">
                  {locale === 'ru'
                    ? 'Материал урны (дерево, камень, композит) обязан беспрепятственно просвечиваться на интроскопе безопасности в TGD, TIV, BEG.'
                    : locale === 'mne'
                    ? 'Urna od drveta, kamena ili kompozita mora biti provjerljiva na aerodromskom skeneru bez otvaranja (TGD, TIV, BEG).'
                    : 'Urn material (wood, stone, composite) must allow clear X-ray screening at TGD, TIV, and BEG airport security checkpoints.'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-porcelain border border-stoneBorder">
                <span className="font-semibold text-sapphire block mb-1">
                  {locale === 'ru'
                    ? '2. Пломбировка и сертификат'
                    : locale === 'mne'
                    ? '2. Pečat i potvrda o kremaciji'
                    : '2. Crematorium Seal & Certificate'}
                </span>
                <p className="text-slateMuted leading-relaxed">
                  {locale === 'ru'
                    ? 'Обязательно наличие заводской пломбы крематория и официального свидетельства (Potvrda o kremaciji) с апостилем.'
                    : locale === 'mne'
                    ? 'Obavezno postojanje fabričkog pečata krematorijuma i zvanične potvrde o kremaciji sa prevodom.'
                    : 'Factory seal and official Certificate of Cremation (Potvrda o kremaciji) with consular translation are mandatory.'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-porcelain border border-stoneBorder">
                <span className="font-semibold text-sapphire block mb-1">
                  {locale === 'ru'
                    ? '3. Без грузовых наценок авиакомпаний'
                    : locale === 'mne'
                    ? '3. Bez teretnih doplata avio-kompanija'
                    : '3. Zero Airline Cargo Surcharges'}
                </span>
                <p className="text-slateMuted leading-relaxed">
                  {locale === 'ru'
                    ? 'Урна перевозится пассажиром в салоне самолёта как ручная кладь без оформления дорогостоящего авиа-груза Cargo HUM.'
                    : locale === 'mne'
                    ? 'Urnu putnik nosi lično u putničku kabinu bez potrebe za plaćanjem skupog teretnog Cargo HUM transporta.'
                    : 'Urn is safely transported as unchecked cabin baggage by the passenger without expensive Cargo HUM airway fees.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. STRUCTURED EXPLAINER SECTION (H2 — 5-Step Statutory Walkthrough) */}
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
                      {uiLabels.authorityLabel}
                    </span>
                    <span className="text-slateDeep font-semibold">
                      {step.authority}
                    </span>
                  </div>
                  <div className="pt-1.5 border-t border-stoneBorder">
                    <span className="text-warmStone font-semibold block">
                      {uiLabels.timeframeLabel}
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

      {/* 6. COST TRANSPARENCY & WHAT IS INCLUDED (H2) */}
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
                    <th className="py-4 px-6 font-semibold">{uiLabels.tableItem}</th>
                    <th className="py-4 px-6 font-semibold">{uiLabels.tableStatus}</th>
                    <th className="py-4 px-6 font-semibold">{uiLabels.tableCost}</th>
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

      {(route.id === 'pricing-breakdown' ||
        route.id === 'guide-cremation-costs-belgrade') && (
        <PricingSection lang={localeSlugToLang(locale)} />
      )}

      {/* 7. DYNAMIC FAQ SECTION (H2 + Accordion UI + Real-Time Filter) */}
      <FaqSection
        heading={page.faqHeading}
        faqs={page.faqs}
        locale={locale}
      />

      {/* 8. E-E-A-T DIRECTOR ASSURANCE & TRUST BADGE */}
      <section className="py-14 sm:py-16 bg-white border-b border-stoneBorder">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-sapphire text-white rounded-2xl p-7 sm:p-10 shadow-elevated grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-300">
                <Award className="w-4 h-4" />
                <span>{uiLabels.eeatBadge}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-white">
                {uiLabels.eeatName} — {uiLabels.eeatRole}
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {uiLabels.eeatText}
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono text-emerald-200">
                <span className="bg-white/10 px-3 py-1 rounded">PIB: 03489217</span>
                <span className="bg-white/10 px-3 py-1 rounded">PDV: 30/31-20948-4</span>
                <span className="bg-white/10 px-3 py-1 rounded">{uiLabels.efiBadge}</span>
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

      {/* 9. INTERNAL CROSS-LINKING HUB */}
      <section className="py-12 sm:py-16 bg-alabaster">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-sapphire mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>{uiLabels.relatedCorridors}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {corridorLinks.map((item) => {
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
              <Building2 className="w-4 h-4" />
              <span>{uiLabels.relatedLocations}</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {locationLinks.map((item) => {
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

