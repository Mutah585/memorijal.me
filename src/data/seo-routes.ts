import type { Language } from '../i18n/translations.ts';
import { CORRIDOR_ROUTES } from './seo-corridors.ts';
import { LOCATION_ROUTES, RESOURCE_ROUTES } from './seo-locations-resources.ts';
import { CLUSTER_ROUTES } from './seo-clusters-d.ts';

export type LocaleSlug = 'en' | 'ru' | 'mne';

export type RouteCategory =
  | 'home'
  | 'service'
  | 'corridor'
  | 'location'
  | 'resource'
  | 'mortuary'
  | 'transit'
  | 'assistance'
  | 'cemetery'
  | 'guide';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface WalkthroughStep {
  stepNumber: string;
  title: string;
  authority: string;
  timeframe: string;
  description: string;
}

export interface CostBreakdownItem {
  item: string;
  includedStatus: string;
  referenceCost: string;
  detail: string;
}

export interface SpecMatrix {
  transitTime: string;
  transportMode: string;
  consularTimeframe: string;
  embassyJurisdiction: string;
  morgueCatchment: string;
  requiredDocuments: string[];
  receivingRequirements: string[];
  estimatedTotalRange: string;
}

export interface LocalizedPageData {
  /** Under 60 chars SEO title */
  metaTitle: string;
  /** Under 155 chars SEO description */
  metaDescription: string;
  keywords: string[];
  breadcrumbLabel: string;
  eyebrow: string;
  h1: string;
  heroSubtitle: string;
  whatsappPrefill: string;
  emergencyBannerText: string;
  explainerHeading: string;
  explainerIntro: string;
  walkthroughSteps: WalkthroughStep[];
  matrixHeading: string;
  specs: SpecMatrix;
  costHeading: string;
  costSubtitle: string;
  costItems: CostBreakdownItem[];
  faqHeading: string;
  faqs: FAQItem[];
}

export interface SeoRouteEntry {
  id: string;
  category: RouteCategory;
  /** Path without locale prefix, e.g., '/repatriation/to-united-kingdom/' */
  path: string;
  priority: number;
  changefreq: 'daily' | 'weekly' | 'monthly';
  lastmod: string;
  locales: Record<LocaleSlug, LocalizedPageData>;
}

export const SITE_ORIGIN = 'https://memorijal.me';

export const langToLocaleSlug = (lang: Language): LocaleSlug => {
  if (lang === 'RU') return 'ru';
  if (lang === 'MNE') return 'mne';
  return 'en';
};

export const localeSlugToLang = (slug: LocaleSlug): Language => {
  if (slug === 'ru') return 'RU';
  if (slug === 'mne') return 'MNE';
  return 'EN';
};

/**
 * Helper to generate standardized statutory 5-step walkthroughs customized per corridor/city/service
 */
function buildWalkthrough(
  locale: LocaleSlug,
  contextName: string,
  embassyLoc: string,
  exitHub: string
): WalkthroughStep[] {
  if (locale === 'ru') {
    return [
      {
        stepNumber: '01',
        title: 'Муниципальная регистрация (Matičar / Opština)',
        authority: 'МВД и муниципальный ЗАГС Черногории',
        timeframe: '2 – 6 часов',
        description: `Выезд координатора по направлению «${contextName}», регистрация факта смерти в муниципальном реестре (Matični registar umrlih) и получение международного свидетельства Формы C по дистанционной доверенности.`,
      },
      {
        stepNumber: '02',
        title: 'Медицинское заключение и глубокое бальзамирование',
        authority: 'Клинический морг KCCG / Госпиталь Котора',
        timeframe: '12 – 24 часа',
        description:
          'Получение врачебного свидетельства о смерти (Potvrda o smrti), проведение танатопраксии (формалинового бальзамирования) и выдача сертификата об отсутствии инфекционной опасности.',
      },
      {
        stepNumber: '03',
        title: 'Герметичная опайка цинка (Lemljenje) и Sprovodnica',
        authority: 'Санитарная инспекция Минздрава Черногории',
        timeframe: 'День 2',
        description:
          'Опайка оцинкованного вкладыша оловянным припоем в присутствии государственного санитарного инспектора, установка свинцовой пломбы и выдача санитарного пропуска (Sprovodnica za prenos posmrtnih ostataka).',
      },
      {
        stepNumber: '04',
        title: 'Консульская легализация и судебный перевод',
        authority: embassyLoc,
        timeframe: '24 – 36 часов',
        description:
          'Проставление штампа Апостиль в суде, заверенный перевод судебного переводчика (Sudski tumač) и оформление консульского паспорта Laissez-Passer в посольстве страны назначения.',
      },
      {
        stepNumber: '05',
        title: 'Таможенный выпуск и отправка (Авиа Cargo HUM / Спецкатафалк)',
        authority: exitHub,
        timeframe: 'По расписанию рейса',
        description:
          'Приоритетное таможенное оформление по гуманитарному коридору, выпуск авианакладной MAWB Cargo HUM или прямой выезд специализированного рефрижераторного катафалка до места захоронения.',
      },
    ];
  }

  if (locale === 'mne') {
    return [
      {
        stepNumber: '01',
        title: 'Opštinska prijava smrti (Matičar / MUP)',
        authority: 'Matični registar umrlih u Crnoj Gori',
        timeframe: '2 – 6 sati',
        description: `Izlazak dežurnog koordinatora za „${contextName}“, upis činjenice smrti u matični registar i izdavanje međunarodnog izvoda na Obrascu C po ovjerenom punomoćju porodice.`,
      },
      {
        stepNumber: '02',
        title: 'Potvrda o smrti i tanatopraksija (Balzamovanje)',
        authority: 'KCCG Podgorica / Opšta bolnica Kotor',
        timeframe: '12 – 24 sata',
        description:
          'Preuzimanje medicinske Potvrde o smrti, zakonska sanitarna obrada i duboko balzamovanje uz sertifikat specijaliste sudske medicine o nezaraznosti.',
      },
      {
        stepNumber: '03',
        title: 'Hermetičko lemljenje cinka i Sprovodnica',
        authority: 'Uprava za inspekcijske poslove — Sanitarna inspekcija',
        timeframe: 'Dan 2',
        description:
          'Hermetičko lemljenje limenog (cink) uloška u prisustvu republičkog sanitarnog inspektora, stavljanje državnog pečata/plombe i izdavanje Sprovodnice za prenos umrlog lica.',
      },
      {
        stepNumber: '04',
        title: 'Konzularna sprovodnica i sudski tumač',
        authority: embassyLoc,
        timeframe: '24 – 36 sati',
        description:
          'Ovjera Apostille pečatom u osnovnom sudu, prevod ovlašćenog sudskog tumača i pribavljanje konzularnog Laissez-Passer dokumenta u ambasadi države odredišta.',
      },
      {
        stepNumber: '05',
        title: 'Carinski terminal i međunarodni transport',
        authority: exitHub,
        timeframe: 'Po redu leta / vožnje',
        description:
          'Prioritetna carinska špedicija na aerodromskom kargo terminalu (MAWB Cargo HUM) ili direktan prevoz specijalizovanim pogrebnim vozilom do odredišnog grada.',
      },
    ];
  }

  return [
    {
      stepNumber: '01',
      title: 'Municipal Civil Registration (Matičar & Opština)',
      authority: 'Montenegro Ministry of Interior & Civil Registry',
      timeframe: '2 – 6 Hours',
      description: `Immediate coordinator dispatch for ${contextName}, official registration in the Montenegrin Death Registry, and issuance of the multilingual Vienna Convention Form C extract via remote Power of Attorney.`,
    },
    {
      stepNumber: '02',
      title: 'Medical Death Certificate & Deep Embalming Protocol',
      authority: 'KCCG Podgorica / Kotor General Hospital Morgue',
      timeframe: '12 – 24 Hours',
      description:
        'Retrieval of the Medical Cause of Death Certificate (Potvrda o smrti), clinical refrigeration, and certified forensic embalming (thanatopraxy) with a non-contagious health clearance.',
    },
    {
      stepNumber: '03',
      title: 'Zinc Hermetic Soldering (Lemljenje) & Sprovodnica',
      authority: 'Montenegro Sanitary Inspection (Ministry of Health)',
      timeframe: 'Day 2',
      description:
        'Hermetic soldering of the zinc coffin liner in the physical presence of the Republic Sanitary Inspector, placement of the official state lead/wax seal, and issuance of the Sprovodnica transit pass.',
    },
    {
      stepNumber: '04',
      title: 'Destination Embassy Clearance & Court Translation',
      authority: embassyLoc,
      timeframe: '24 – 36 Hours',
      description:
        'Hague Apostille legalization at the Basic Court, sworn translation by a certified court interpreter (Sudski tumač), and diplomatic Mortuary Passport (Laissez-Passer) issuance.',
    },
    {
      stepNumber: '05',
      title: 'Airport Cargo Terminal (TGD/BEG) or Specialized Hearse Handover',
      authority: exitHub,
      timeframe: 'Scheduled Departure',
      description:
        'Priority customs export clearance, IATA Cargo HUM Master Air Waybill (MAWB) execution, or continuous two-driver climate-controlled road hearse delivery to the receiving funeral director.',
    },
  ];
}

function buildStandardCosts(locale: LocaleSlug, freightLabel: string, freightRange: string): CostBreakdownItem[] {
  if (locale === 'ru') {
    return [
      {
        item: 'Государственные пошлины, Matičar, Апостиль и Sprovodnica',
        includedStatus: 'Включено в смету',
        referenceCost: 'From €180',
        detail: 'Все сборы ЗАГСа, судебный Апостиль и выезд республиканского санитарного инспектора.',
      },
      {
        item: 'Клиническая подготовка, бальзамирование и цинковый гроб (Lemljenje)',
        includedStatus: 'Включено по стандарту IATA',
        referenceCost: 'From €750',
        detail: 'Сертифицированный цинковый вкладыш, деревянный гроб/короб, герметичная опайка и пломба.',
      },
      {
        item: 'Судебные переводы (Sudski tumač) и консульский сбор',
        includedStatus: 'Включено под ключ',
        referenceCost: 'From €190',
        detail: 'Заверенный перевод всех медицинских и ЗАГС документов + оформление в посольстве.',
      },
      {
        item: freightLabel,
        includedStatus: 'Фиксируется по тарифу',
        referenceCost: freightRange,
        detail: 'Таможенная декларация, авианакладная Cargo HUM или километраж спецкатафалка без скрытых доплат.',
      },
    ];
  }

  if (locale === 'mne') {
    return [
      {
        item: 'Državne takse, Matičar, Apostille i Sanitarna Sprovodnica',
        includedStatus: 'Uključeno u obračun',
        referenceCost: 'From €180',
        detail: 'Sve administrativne takse opštine, suda i izlazak republičkog sanitarnog inspektora.',
      },
      {
        item: 'Higijenska priprema, balzamovanje i limeni uložak (Lemljenje)',
        includedStatus: 'Uključeno po IATA standardu',
        referenceCost: 'From €750',
        detail: 'Atestirani cink uložak, drveni sanduk, hermetičko lemljenje i državna plomba.',
      },
      {
        item: 'Ovjereni prevodi (Sudski tumač) i konzularna legalizacija',
        includedStatus: 'Uključeno po punomoćju',
        referenceCost: 'From €190',
        detail: 'Prevod medicinske dokumentacije i izvoda sa pečatom sudskog tumača i ambasade.',
      },
      {
        item: freightLabel,
        includedStatus: 'Fiksno po specifikaciji',
        referenceCost: freightRange,
        detail: 'Carinska špedicija, avio-tovarni list (AWB Cargo HUM) ili međunarodni drumski transport.',
      },
    ];
  }

  return [
    {
      item: 'Statutory State Fees, Civil Registry, Apostille & Sprovodnica',
      includedStatus: '100% Included',
      referenceCost: 'From €180',
      detail: 'Municipal death registration, court Hague Apostille stamps, and Republic Sanitary Inspector fee.',
    },
    {
      item: 'Forensic Embalming, Export Coffin & Hermetic Zinc Liner (Lemljenje)',
      includedStatus: 'IATA & Berlin Convention Compliant',
      referenceCost: 'From €750',
      detail: 'Certified zinc liner, solid export casket, hermetic soldering, and official sanitary wax/lead seal.',
    },
    {
      item: 'Sworn Court Translations (Sudski tumač) & Embassy Clearance',
      includedStatus: 'Executed via Remote PoA',
      referenceCost: 'From €190',
      detail: 'Certified legal translation of medical/civil records and diplomatic Laissez-Passer processing.',
    },
    {
      item: freightLabel,
      includedStatus: 'Transparent Itemized Rate',
      referenceCost: freightRange,
      detail: 'Customs brokerage, IATA Cargo HUM Air Waybill tariff, or dedicated two-driver hearse logistics.',
    },
  ];
}

export const SEO_ROUTES: SeoRouteEntry[] = [
  // ==========================================
  // 1. ROOT HOMEPAGE
  // ==========================================
  {
    id: 'home',
    category: 'home',
    path: '/',
    priority: 1.0,
    changefreq: 'daily',
    lastmod: '2026-11-03',
    locales: {
      en: {
        metaTitle: 'International Repatriation & Cremation Montenegro 24/7',
        metaDescription: 'Licensed 24/7 repatriation of remains & cremation from Montenegro (Tivat, Kotor, Budva, Podgorica) to UK, EU, CIS. Call +382 68 914 816.',
        keywords: [
          'Repatriation of human remains Montenegro',
          'Cremation services Montenegro Belgrade transfer',
          'Montenegro funeral assistance English speaking',
          'Zinc lined coffin sealing Montenegro sprovodnica',
        ],
        breadcrumbLabel: 'Home',
        eyebrow: 'OFFICIAL CONSULAR, SANITARY & LOGISTICAL ASSISTANCE',
        h1: 'Compassionate, Lawful & Swift International Repatriation from Montenegro.',
        heroSubtitle: 'We handle 100% of sanitary permits (Sprovodnica), consular procedures, zinc soldering, and international transport (Air Cargo & Road) to EU, UK, CIS, and cremation in Serbia.',
        whatsappPrefill: 'Hello Memorijal d.o.o., I need 24/7 coordinator assistance for international repatriation / cremation in Montenegro.',
        emergencyBannerText: 'Coordinator on site at Kotor, Tivat, Budva or Podgorica morgue within 60 minutes • 24/7 Dispatch',
        explainerHeading: 'End-to-End Statutory Repatriation Protocol in Montenegro',
        explainerIntro: 'Every international repatriation and cremation transfer is executed under Montenegrin public health law and bilateral consular treaties.',
        walkthroughSteps: buildWalkthrough('en', 'Montenegro', 'Foreign Embassies in Podgorica & Belgrade', 'Podgorica (TGD) / Tivat (TIV) & Border Crossings'),
        matrixHeading: 'Montenegro National Operations Matrix',
        specs: {
          transitTime: '24–48h Road (Balkans) / 36–72h Air Cargo HUM (EU/UK/CIS)',
          transportMode: 'IATA Cargo HUM Air Freight & Specialized Climate-Controlled Hearse',
          consularTimeframe: '24 – 36 Hours via Remote Power of Attorney',
          embassyJurisdiction: 'Embassies in Podgorica & Accredited Missions in Belgrade',
          morgueCatchment: 'KCCG Podgorica, Opšta bolnica Kotor, Bar, Budva, Tivat, Herceg Novi',
          requiredDocuments: ['Passport of the deceased', 'Remote Power of Attorney (Punomoćje)', 'Next-of-kin ID copy'],
          receivingRequirements: ['Receiving funeral home details or Belgrade Crematorium slot confirmation'],
          estimatedTotalRange: 'From €2,400',
        },
        costHeading: 'Transparent Statutory Cost Structure',
        costSubtitle: 'Official itemized EFI fiscal invoices accepted by European assistance insurers and state social funds.',
        costItems: buildStandardCosts('en', 'International Air Cargo HUM or Cross-Border Hearse Logistics', 'From €650'),
        faqHeading: 'Frequently Asked Questions — Repatriation in Montenegro',
        faqs: [
          {
            question: 'Does the family need to fly to Montenegro in person to arrange repatriation?',
            answer: 'No. Under Montenegrin administrative law, our legal coordinators execute 100% of hospital, police, municipal, sanitary, and embassy procedures via a bilingual remote Power of Attorney (Punomoćje).',
          },
          {
            question: 'Why is cremation performed in Belgrade or Novi Sad instead of Montenegro?',
            answer: 'Montenegro currently has no operating crematorium. We provide lawful cross-border transport to the state crematorium in Belgrade or Novi Sad, obtain the official Cremation Certificate, and return or ship the sealed urn internationally.',
          },
          {
            question: 'How fast can you collect the deceased from a hotel, residence, or hospital in Kotor, Budva, or Tivat?',
            answer: 'Our coastal and central duty teams respond 24/7 and arrive on site or at Kotor General Hospital / KCCG Podgorica within 60 minutes of your call.',
          },
          {
            question: 'Do you work directly with European travel insurance and assistance companies?',
            answer: 'Yes. We accept Guarantees of Payment (GOP) from international assistance companies and issue Montenegro Tax Administration EFI QR fiscal invoices for SEPA/SWIFT settlement.',
          },
        ],
      },
      ru: {
        metaTitle: 'Репатриация умерших и кремация в Черногории 24/7 | Груз 200',
        metaDescription: 'Официальная репатриация (Груз 200) и кремация из Черногории (Тиват, Будва, Котор, Подгорица) в РФ, Украину, ЕС. Сроки 24–72ч. +382 68 914 816.',
        keywords: [
          'Репатриация умерших из Черногории',
          'Груз 200 Черногория Россия самолетом',
          'Кремация в Сербии для граждан Черногории и РФ',
          'Умер человек в Будве Тивате что делать',
        ],
        breadcrumbLabel: 'Главная',
        eyebrow: 'ОФИЦИАЛЬНОЕ КОНСУЛЬСКОЕ, САНИТАРНОЕ И ЛОГИСТИЧЕСКОЕ СОПРОВОЖДЕНИЕ',
        h1: 'Бережная, законная и оперативная международная репатриация из Черногории.',
        heroSubtitle: 'Оформляем 100% санитарных разрешений (Sprovodnica), консульских документов, опайку цинка и перевозку (авиа Груз 200 / авто) в ЕС, Великобританию, СНГ, а также кремацию в Сербии.',
        whatsappPrefill: 'Здравствуйте, необходима круглосуточная консультация координатора Memorijal d.o.o. в Черногории.',
        emergencyBannerText: 'Прибытие координатора в морг Котора, Подгорицы, Будвы или Тивата в течение 60 минут • 24/7',
        explainerHeading: 'Полный государственный регламент репатриации из Черногории',
        explainerIntro: 'Все процедуры выполняются лицензированной службой Memorijal d.o.o. без необходимости приезда семьи в Черногорию.',
        walkthroughSteps: buildWalkthrough('ru', 'Черногория (все муниципалитеты)', 'Посольства в Подгорице и Белграде', 'Аэропорты TGD / TIV и пограничные терминалы'),
        matrixHeading: 'Оперативная матрица по Черногории',
        specs: {
          transitTime: '24–48ч авто (Балканы) / 36–72ч авиа Cargo HUM (ЕС, СНГ, UK)',
          transportMode: 'Авиаперевозка IATA Cargo HUM (Груз 200) и спецкатафалк',
          consularTimeframe: '24 – 36 часов по дистанционной доверенности',
          embassyJurisdiction: 'Посольства в Подгорице и Белграде',
          morgueCatchment: 'KCCG Подгорица, Больница Котора, Бар, Будва, Тиват, Херцег-Нови',
          requiredDocuments: ['Паспорт усопшего', 'Дистанционная доверенность (Punomoćje)', 'Копия документа родственника'],
          receivingRequirements: ['Данные принимающей ритуальной службы или бронь крематория в Белграде'],
          estimatedTotalRange: 'От 2 400 €',
        },
        costHeading: 'Прозрачная структура государственных и логистических расходов',
        costSubtitle: 'Официальные фискальные счета EFI с QR-кодом для страховых компаний и выплат.',
        costItems: buildStandardCosts('ru', 'Международный авиатариф Cargo HUM или спецкатафалк', 'От 650 €'),
        faqHeading: 'Частые вопросы — Репатриация и кремация в Черногории',
        faqs: [
          {
            question: 'Нужно ли родственникам лично прилетать в Черногорию для оформления документов?',
            answer: 'Нет. По дистанционной доверенности (Punomoćje) наши юристы самостоятельно получают медицинскую справку о смерти, выписку ЗАГС, Апостиль, переводы и разрешения посольства.',
          },
          {
            question: 'Как проводится кремация, если в Черногории нет крематория?',
            answer: 'Мы оформляем санитарный пропуск (Sprovodnica), перевозим усопшего в государственный крематорий Белграда или Нови-Сада и возвращаем опломбированную урну со всеми сертификатами для авиаперелета.',
          },
          {
            question: 'Как быстро дежурный координатор выезжает в Будву, Тиват, Котор или Подгорицу?',
            answer: 'Координатор выезжает незамедлительно в любое время суток и прибывает в госпиталь Котора или Клинический центр Подгорицы (KCCG) в течение 60 минут.',
          },
          {
            question: 'Работаете ли вы по страховым полисам для туристов и экспатов?',
            answer: 'Да, мы напрямую принимаем гарантийные письма (GOP) от европейских и международных страховых ассистансов, а также выставляем счета SEPA/SWIFT.',
          },
        ],
      },
      mne: {
        metaTitle: 'Međunarodna repatrijacija i kremacija Crna Gora 24/7',
        metaDescription: 'Licencirani prevoz pokojnika u inostranstvo, Sprovodnica, lemljenje cinka i kremacija u Beogradu. Tivat, Kotor, Budva, Podgorica. +382 68 914 816.',
        keywords: [
          'Prevoz pokojnika u inostranstvo Crna Gora',
          'Kremacija u Beogradu prevoz iz Crne Gore',
          'Sprovodnica za prenos umrlog lica zdravstvena inspekcija',
          'Limeni uložak lemljenje Kotor Podgorica',
        ],
        breadcrumbLabel: 'Početna',
        eyebrow: 'ZVANIČNA KONZULARNA, SANITARNA I LOGISTIČKA ASISTENCIJA',
        h1: 'Dostojanstvena, zakonita i brza međunarodna repatrijacija iz Crne Gore.',
        heroSubtitle: 'Preuzimamo 100% sanitarnih dozvola (Sprovodnica), konzularnih procedura, lemljenja cinka i međunarodnog transporta (Cargo HUM i drumski prevoz) za EU, UK, ZND i kremaciju u Srbiji.',
        whatsappPrefill: 'Poštovani, potrebna mi je hitna konsultacija koordinatora Memorijal d.o.o. u Crnoj Gori.',
        emergencyBannerText: 'Koordinator u bolničkoj kapeli Kotor / KCCG Podgorica u roku od 60 minuta • Dežurstvo 24/7',
        explainerHeading: 'Kompletna zakonska procedura repatrijacije u Crnoj Gori',
        explainerIntro: 'Svaki korak realizuje naš licencirani tim u skladu sa propisima Ministarstva zdravlja Crne Gore i međunarodnim konvencijama.',
        walkthroughSteps: buildWalkthrough('mne', 'Crna Gora', 'Ambasade u Podgorici i Beogradu', 'Aerodromi TGD / TIV i granični prelazi'),
        matrixHeading: 'Operativna specifikacija za Crnu Goru',
        specs: {
          transitTime: '24–48h drumski (Balkan) / 36–72h avio Cargo HUM (EU/UK/ZND)',
          transportMode: 'IATA Cargo HUM vazdušni transport i specijalno pogrebno vozilo',
          consularTimeframe: '24 – 36 sati putem daljinskog punomoćja',
          embassyJurisdiction: 'Ambasade u Podgorici i Beogradu',
          morgueCatchment: 'KCCG Podgorica, Opšta bolnica Kotor, Bar, Budva, Tivat, Herceg Novi',
          requiredDocuments: ['Pasoš preminulog lica', 'Ovjereno punomoćje porodice', 'Kopija identifikacionog dokumenta srodnika'],
          receivingRequirements: ['Podaci pogrebnog preduzeća u odredištu ili potvrda termina krematorijuma u Beogradu'],
          estimatedTotalRange: 'Od 2.400 €',
        },
        costHeading: 'Transparentna struktura zakonskih troškova',
        costSubtitle: 'Zvanični EFI fiskalni računi priznati od strane evropskih osiguranja i fondova PIO.',
        costItems: buildStandardCosts('mne', 'Međunarodni Cargo HUM avio-transport ili drumski prevoz', 'Od 650 €'),
        faqHeading: 'Često postavljana pitanja — Repatrijacija iz Crne Gore',
        faqs: [
          {
            question: 'Da li porodica mora lično dolaziti u Crnu Goru radi dokumentacije?',
            answer: 'Ne. Na osnovu dvojezičnog punomoćja završavamo sve procedure u bolnici, MUP-u, sudu, sanitarnoj inspekciji i ambasadi bez dolaska porodice.',
          },
          {
            question: 'Kako se organizuje kremacija s obzirom da u Crnoj Gori nema krematorijuma?',
            answer: 'Obezbjeđujemo bilateralnu Sprovodnicu, vršimo prevoz u državni krematorijum u Beogradu ili Novom Sadu i vraćamo zapečaćenu urnu sa svim međunarodnim dozvolama.',
          },
          {
            question: 'Koliko brzo izlazite na teren u Kotoru, Tivtu, Budvi ili Podgorici?',
            answer: 'Dežurni tim je dostupan 24/7 i pristupa u Opštu bolnicu Kotor ili KCCG Podgorica u roku od 60 minuta od poziva.',
          },
          {
            question: 'Da li sarađujete sa međunarodnim osiguravajućim kućama?',
            answer: 'Da, prihvatamo garancije plaćanja (GOP) stranih asistentskih kompanija i izdajemo zvanične EFI fiskalne račune za SEPA/SWIFT uplate.',
          },
        ],
      },
    },
  },

  // ==========================================
  // 2. SERVICE PILLAR HUBS (4 Pages)
  // ==========================================
  {
    id: 'service-air-cargo',
    category: 'service',
    path: '/services/repatriation-air-cargo/',
    priority: 0.9,
    changefreq: 'weekly',
    lastmod: '2026-11-03',
    locales: {
      en: {
        metaTitle: 'Air Cargo HUM Repatriation Montenegro | TGD & TIV 24/7',
        metaDescription: 'IATA Cargo HUM air repatriation from Podgorica (TGD) & Tivat (TIV). Hermetic zinc sealing, Sprovodnica & AWB booking in 36–72h. +382 68 914 816.',
        keywords: ['Air cargo repatriation Montenegro', 'IATA Cargo HUM Podgorica airport', 'Repatriation of remains from Montenegro by air', 'Zinc coffin sealing Montenegro'],
        breadcrumbLabel: 'Air Cargo Repatriation (Cargo HUM)',
        eyebrow: 'IATA CARGO HUM CERTIFIED AIR PROTOCOL',
        h1: 'International Air Cargo Repatriation (Cargo HUM) from Montenegro',
        heroSubtitle: 'Priority Air Waybill (MAWB) booking, forensic embalming, hermetic zinc soldering (lemljenje), and airport customs clearance from Podgorica (TGD), Tivat (TIV), Dubrovnik, or Belgrade hubs.',
        whatsappPrefill: 'Hello Memorijal d.o.o., I need an urgent quote for IATA Cargo HUM Air Repatriation from Montenegro.',
        emergencyBannerText: 'Coordinator on site at Kotor/Podgorica morgue within 60 minutes • Priority Airport Cargo Clearance',
        explainerHeading: 'Statutory IATA Cargo HUM Preparation & Airport Clearance',
        explainerIntro: 'Airlines require strict adherence to IATA Live Animals & Perishables / Human Remains (HUM) regulations before accepting a casket at Podgorica or Tivat cargo terminals.',
        walkthroughSteps: buildWalkthrough('en', 'IATA Air Cargo HUM Dispatch', 'Destination Embassy in Podgorica', 'Podgorica Airport (TGD) / Tivat (TIV) Cargo Terminal'),
        matrixHeading: 'Air Cargo HUM Technical Specification Matrix',
        specs: {
          transitTime: '36 – 72 Hours from Power of Attorney to Flight Departure',
          transportMode: 'IATA Cargo HUM Pressurized Aircraft Hold (Direct or via BEG/IST/VIE/FRA)',
          consularTimeframe: '24 – 36 Hours (Multilingual Form C + Apostille + Embassy Laissez-Passer)',
          embassyJurisdiction: 'Podgorica Consular Corps & Belgrade Accredited Embassies',
          morgueCatchment: 'All Montenegro Municipalities → KCCG Podgorica / Kotor Morgue Preparation',
          requiredDocuments: ['Deceased Passport', 'Signed Remote Power of Attorney', 'Receiving Funeral Home Contact at Destination Airport'],
          receivingRequirements: ['Licensed funeral director or customs broker listed as Consignee on Master Air Waybill (MAWB)'],
          estimatedTotalRange: 'From €2,400',
        },
        costHeading: 'Itemized Air Cargo HUM Cost Transparency',
        costSubtitle: 'Complete breakdown of mandatory airport security, customs forwarding, and sanitary fees.',
        costItems: buildStandardCosts('en', 'IATA Cargo HUM Air Freight, MAWB & Airport Terminal Handling', 'From €1,100'),
        faqHeading: 'FAQ — Air Cargo Repatriation from Montenegro',
        faqs: [
          {
            question: 'Which airports are used for Cargo HUM departures from Montenegro?',
            answer: 'Primary departures operate from Podgorica Airport (TGD) via Air Serbia, Austrian Airlines, and Turkish Airlines cargo networks. For wide-body or direct UK/EU connections, we also utilize Dubrovnik (DBV), Tirana (TIA), or Belgrade (BEG) with rapid diplomatic road feeder.',
          },
          {
            question: 'Do family members need to travel on the same flight as the deceased?',
            answer: 'No. Cargo HUM shipments travel under a dedicated Master Air Waybill (MAWB) consigned directly to your chosen funeral director in the destination country.',
          },
          {
            question: 'What is included in the hermetic zinc container requirement for air freight?',
            answer: 'Airlines mandate a galvanized zinc liner hermetically soldered (lemljenje) inside a wooden casket, inspected and lead-sealed by the Montenegro Sanitary Inspector, enclosed in a protective air-cargo outer packing case.',
          },
          {
            question: 'How quickly do we receive the Air Waybill (AWB) tracking number?',
            answer: 'As soon as the sanitary Sprovodnica is issued (typically within 24–36 hours), our licensed customs forwarder books the flight slot and sends you the live MAWB flight schedule.',
          },
        ],
      },
      ru: {
        metaTitle: 'Авиарепатриация (Груз 200 / Cargo HUM) из Черногории 24/7',
        metaDescription: 'Отправка Груза 200 самолетом из Подгорицы (TGD) и Тивата (TIV) в РФ, СНГ, ЕС. Опайка цинка, Спроводница и бронь AWB за 36–72ч. +382 68 914 816.',
        keywords: ['Груз 200 Черногория самолетом', 'Авиарепатриация из Черногории', 'Отправка тела самолетом Подгорица Тиват', 'Оцинковка гроба Черногория'],
        breadcrumbLabel: 'Авиарепатриация (Cargo HUM / Груз 200)',
        eyebrow: 'МЕЖДУНАРОДНЫЙ АВИАПРОТОКОЛ IATA CARGO HUM',
        h1: 'Международная авиарепатриация (Груз 200 / Cargo HUM) из Черногории',
        heroSubtitle: 'Полная подготовка к авиаперелету: бальзамирование, герметичная опайка цинка (lemljenje), санитарная Sprovodnica, таможенное оформление и выпуск авианакладной из Подгорицы (TGD) и Тивата (TIV).',
        whatsappPrefill: 'Здравствуйте, необходим расчет авиарепатриации (Груз 200 / Cargo HUM) из Черногории.',
        emergencyBannerText: 'Выезд координатора в морг Котора / Подгорицы в течение 60 минут • Приоритетное авиабронирование',
        explainerHeading: 'Государственный регламент подготовки Груза 200 к авиаперелету',
        explainerIntro: 'Для приема гроба на грузовой терминал аэропорта Подгорицы или Тивата требуется строгое соблюдение правил IATA Cargo HUM.',
        walkthroughSteps: buildWalkthrough('ru', 'Авиарепатриация IATA Cargo HUM', 'Консульский отдел в Подгорице', 'Грузовой терминал аэропорта Подгорица (TGD) / Белград (BEG)'),
        matrixHeading: 'Спецификация авиаперевозки Cargo HUM',
        specs: {
          transitTime: '36 – 72 часа с момента подписания доверенности до вылета',
          transportMode: 'Спецотсек воздушного судна IATA Cargo HUM (прямые и стыковочные рейсы через BEG/IST)',
          consularTimeframe: '24 – 36 часов (Форма C + Апостиль + Консульское разрешение)',
          embassyJurisdiction: 'Посольства в Подгорице и Белграде',
          morgueCatchment: 'Все города Черногории → Морг KCCG Подгорица / Госпиталь Котора',
          requiredDocuments: ['Загранпаспорт усопшего', 'Дистанционная доверенность от семьи', 'Реквизиты встречающей ритуальной службы'],
          receivingRequirements: ['Указание получателя (ритуальной службы или родственника) в авианакладной MAWB'],
          estimatedTotalRange: 'От 2 400 €',
        },
        costHeading: 'Прозрачная смета на авиарепатриацию (Груз 200)',
        costSubtitle: 'Фиксированная стоимость без скрытых аэропортовых или таможенных сборов.',
        costItems: buildStandardCosts('ru', 'Авиатариф IATA Cargo HUM, выпуск MAWB и терминальная обработка', 'От 1 100 €'),
        faqHeading: 'Частые вопросы — Отправка Груза 200 самолетом из Черногории',
        faqs: [
          {
            question: 'Через какие аэропорты выполняется отправка Груза 200 в РФ, СНГ и Европу?',
            answer: 'Основные вылеты осуществляются из аэропорта Подгорица (TGD) со стыковками через Белград (Air Serbia) или Стамбул (Turkish Airlines), а также из аэропортов Дубровника и Тираны для прямых рейсов в ЕС и Великобританию.',
          },
          {
            question: 'Нужен ли сопровождающий в самолете при отправке Груза 200?',
            answer: 'Нет, по стандарту IATA Cargo HUM отправка оформляется по грузовой авианакладной (MAWB) и не требует покупки авиабилета для сопровождающего.',
          },
          {
            question: 'Какие документы передаются вместе с цинковым гробом на борт самолета?',
            answer: 'В опломбированный пакет с авианакладной входят оригинал свидетельства о смерти с Апостилем и переводом, врачебная справка о бальзамировании, акт опайки цинка, санитарная Sprovodnica и разрешение консульства.',
          },
          {
            question: 'Можно ли оплатить авиарепатриацию за счет страховой компании?',
            answer: 'Да, мы работаем со всеми страховыми и ассистанс-компаниями напрямую по гарантии оплаты (GOP) или выдаем официальный счет EFI для 100% компенсации.',
          },
        ],
      },
      mne: {
        metaTitle: 'Avio repatrijacija (Cargo HUM) Crna Gora | Aerodrom TGD',
        metaDescription: 'IATA Cargo HUM vazdušni transport preminulih sa aerodroma Podgorica (TGD) i Tivat (TIV). Lemljenje cinka, Sprovodnica i AWB za 36–72h. +382 68 914 816.',
        keywords: ['Avio prevoz pokojnika Crna Gora', 'IATA Cargo HUM Podgorica', 'Lemljenje cinka za avion Crna Gora', 'Sprovodnica aerodrom Podgorica'],
        breadcrumbLabel: 'Avio repatrijacija (Cargo HUM)',
        eyebrow: 'SERTIFIKOVANI IATA CARGO HUM PROTOKOL',
        h1: 'Međunarodna avio repatrijacija (Cargo HUM) iz Crne Gore',
        heroSubtitle: 'Prioritetna rezervacija avio-tovarnog lista (MAWB), sudsko-medicinsko balzamovanje, hermetičko lemljenje cinka i carinska špedicija na aerodromu Podgorica (TGD) i Tivat (TIV).',
        whatsappPrefill: 'Poštovani, potreban mi je obračun za IATA Cargo HUM avio-repatrijaciju iz Crne Gore.',
        emergencyBannerText: 'Koordinator u mrtvačnici Kotor / KCCG Podgorica u roku od 60 minuta • Aerodromska špedicija 24/7',
        explainerHeading: 'Zakonska procedura pripreme za IATA Cargo HUM let',
        explainerIntro: 'Međunarodne avio-kompanije zahtijevaju strogu usklađenost sa IATA HUM pravilima prije prijema kovčega na kargo terminal.',
        walkthroughSteps: buildWalkthrough('mne', 'IATA Cargo HUM Avio Transport', 'Ambasada u Podgorici', 'Kargo terminal Aerodroma Podgorica (TGD)'),
        matrixHeading: 'Tehnička specifikacija za Cargo HUM transport',
        specs: {
          transitTime: '36 – 72 sata od ovjere punomoćja do polijetanja',
          transportMode: 'IATA Cargo HUM vazdušni transport (direktno ili preko habova BEG/IST/VIE/FRA)',
          consularTimeframe: '24 – 36 sati (Obrazac C + Apostille + Laissez-Passer)',
          embassyJurisdiction: 'Konzularna predstavništva u Podgorici i Beogradu',
          morgueCatchment: 'Sve opštine u Crnoj Gori → KCCG Podgorica / Opšta bolnica Kotor',
          requiredDocuments: ['Pasoš preminulog', 'Potpisano punomoćje', 'Podaci pogrebnog preduzeća na odredišnom aerodromu'],
          receivingRequirements: ['Ovlašćeno pogrebno preduzeće navedeno kao primalac (Consignee) na MAWB listu'],
          estimatedTotalRange: 'Od 2.400 €',
        },
        costHeading: 'Transparentna specifikacija troškova avio-repatrijacije',
        costSubtitle: 'Kompletan prikaz aerodromskih, špediterskih i sanitarnih troškova.',
        costItems: buildStandardCosts('mne', 'IATA Cargo HUM avio-prevoz, MAWB i aerodromska manipulacija', 'Od 1.100 €'),
        faqHeading: 'Česta pitanja — Avio repatrijacija iz Crne Gore',
        faqs: [
          {
            question: 'Sa kojih aerodroma se vrši Cargo HUM otprema?',
            answer: 'Primarni polasci realizuju se sa Aerodroma Podgorica (TGD), a po potrebi rute koristimo i aerodrome Tivat (TIV), Dubrovnik (DBV), Tirana (TIA) ili Beograd (BEG).',
          },
          {
            question: 'Da li član porodice mora letjeti istim avionom?',
            answer: 'Ne. Cargo HUM pošiljka putuje po samostalnom glavnom tovarnom listu (MAWB) i predaje se direktno pogrebnom preduzeću u zemlji odredišta.',
          },
          {
            question: 'Šta podrazumijeva obavezno pakovanje za avio-transport?',
            answer: 'Podrazumijeva hermetički zalemljen limeni uložak sa plombom sanitarnog inspektora, drveni kovčeg i spoljašnju zaštitnu transportnu oblogu po IATA standardu.',
          },
          {
            question: 'Kada dobijamo broj avio-tovarnog lista (AWB) za praćenje?',
            answer: 'Odmah nakon izdavanja sanitarne Sprovodnice naš špediter vrši rezervaciju leta i dostavlja Vam MAWB broj sa tačnim vremenom slijetanja.',
          },
        ],
      },
    },
  },

  {
    id: 'service-road',
    category: 'service',
    path: '/services/repatriation-road/',
    priority: 0.9,
    changefreq: 'weekly',
    lastmod: '2026-11-03',
    locales: {
      en: {
        metaTitle: 'European & Balkan Road Repatriation Montenegro 24/7',
        metaDescription: 'Door-to-door international hearse transport from Montenegro to Serbia, Bosnia, Croatia, Germany, Italy, Poland & Ukraine. Call +382 68 914 816.',
        keywords: ['Road repatriation Montenegro', 'International hearse transport Montenegro to Europe', 'Cross border funeral transport Balkans', 'Repatriation by road Montenegro'],
        breadcrumbLabel: 'Road Repatriation (Balkans & EU)',
        eyebrow: 'DOOR-TO-DOOR SPECIALIZED HEARSE LOGISTICS',
        h1: 'Regional Balkan & European Road Repatriation from Montenegro',
        heroSubtitle: 'Direct door-to-door transport by climate-controlled, EU-certified mortuary vehicles from any hospital in Montenegro directly to cemeteries or chapels across the Balkans, EU, and Eastern Europe.',
        whatsappPrefill: 'Hello Memorijal d.o.o., I need information on International Road Repatriation by hearse from Montenegro.',
        emergencyBannerText: 'Coordinator on site at Kotor/Podgorica morgue within 60 minutes • Two-Driver Continuous EU Transit',
        explainerHeading: 'Cross-Border Road Transit & Customs Corridor Protocol',
        explainerIntro: 'Road repatriation avoids flight connection delays and delivers the deceased directly to the hometown chapel or cemetery.',
        walkthroughSteps: buildWalkthrough('en', 'International Road Hearse Transit', 'Embassy Consular Section in Podgorica', 'Schengen & Balkan Priority Border Crossings (Debeli Brijeg / Dobrakovo)'),
        matrixHeading: 'Road Repatriation Transit Matrix',
        specs: {
          transitTime: '24–36h (Balkans) / 48–72h (Central & Western EU / Ukraine)',
          transportMode: 'Mercedes-Benz Specialized Refrigerated Mortuary Hearse (Two-Driver Crew)',
          consularTimeframe: '24 Hours for Bilateral Balkan Pass / 24–36h for Schengen Transit',
          embassyJurisdiction: 'Podgorica & Belgrade Consular Missions',
          morgueCatchment: 'Direct Pickup from Kotor, Tivat, Budva, Bar, Herceg Novi & KCCG Podgorica',
          requiredDocuments: ['Deceased Passport', 'Remote Power of Attorney', 'Exact Cemetery or Receiving Chapel Address'],
          receivingRequirements: ['Local cemetery burial permit or receiving funeral home confirmation'],
          estimatedTotalRange: 'From €2,400',
        },
        costHeading: 'Transparent Road Repatriation Cost Breakdown',
        costSubtitle: 'Fixed per-corridor pricing including highway tolls, border customs brokerage, and sanitary sealing.',
        costItems: buildStandardCosts('en', 'Dedicated Climate-Controlled Hearse, Border Customs & Highway Tolls', 'From €600'),
        faqHeading: 'FAQ — International Road Repatriation from Montenegro',
        faqs: [
          {
            question: 'When is road repatriation preferable to air cargo?',
            answer: 'Road transport is ideal for Serbia, Bosnia, Croatia, Slovenia, Italy, Austria, Germany, Poland, and Ukraine—delivering directly to the municipal chapel without intermediate airport transfers.',
          },
          {
            question: 'How do your vehicles pass Schengen and non-EU borders quickly?',
            answer: 'Diplomatic and sanitary mortuary transports holding an official Sprovodnica and Embassy Laissez-Passer receive priority customs clearance at border checkpoints.',
          },
          {
            question: 'Are vehicles equipped with refrigeration for summer transit?',
            answer: 'Transport is executed using certified, temperature-controlled specialized funeral vehicles of our accredited licensed partner carriers under direct Memorijal case dispatch and supervision.',
          },
          {
            question: 'Do you provide live GPS updates during the road journey?',
            answer: 'Yes, the family and receiving funeral director receive live milestone notifications at departure, border crossings, and final arrival.',
          },
        ],
      },
      ru: {
        metaTitle: 'Авторепатриация из Черногории в Европу, Сербию и СНГ 24/7',
        metaDescription: 'Перевозка умерших спецкатафалком «от двери до двери» из Черногории в Сербию, ЕС, Украину и страны Балтии. Без перегрузок. +382 68 914 816.',
        keywords: ['Авторепатриация из Черногории', 'Перевозка тела катафалком Черногория Европа', 'Груз 200 автотранспортом Черногория', 'Доставка умершего из Черногории в Украину ЕС'],
        breadcrumbLabel: 'Авторепатриация (Балканы, ЕС, СНГ)',
        eyebrow: 'СПЕЦИАЛИЗИРОВАННЫЙ РЕФРИЖЕРАТОРНЫЙ ТРАНСПОРТ «ОТ ДВЕРИ ДО ДВЕРИ»',
        h1: 'Международная авторепатриация из Черногории по Балканам и Европе',
        heroSubtitle: 'Прямая адресная доставка усопшего сертифицированным катафалком с климат-контролем из любого города Черногории непосредственно к месту прощания или захоронения в Сербии, странах ЕС и Украине.',
        whatsappPrefill: 'Здравствуйте, необходим расчет авторепатриации катафалком из Черногории.',
        emergencyBannerText: 'Выезд координатора в морг Котора / Подгорицы за 60 минут • Экипаж из 2 водителей без задержек',
        explainerHeading: 'Регламент трансграничной перевозки спецкатафалком',
        explainerIntro: 'Наземная репатриация позволяет доставить гроб сразу в родной город без промежуточных аэропортовых терминалов.',
        walkthroughSteps: buildWalkthrough('ru', 'Международная авторепатриация', 'Консульские отделы в Подгорице', 'Пограничные переходы Дебели-Бриег (Хорватия/ЕС) и Добраково (Сербия)'),
        matrixHeading: 'Матрица сроков и параметров авторепатриации',
        specs: {
          transitTime: '24–36ч (Сербия/Балканы) / 48–72ч (ЕС и Украина)',
          transportMode: 'Специализированный катафалк-рефрижератор Mercedes-Benz (2 водителя)',
          consularTimeframe: '24 часа (Балканы) / 24–36 часов (Шенген и Украина)',
          embassyJurisdiction: 'Посольства в Подгорице и Белграде',
          morgueCatchment: 'Прямой выезд из Котора, Тивата, Будвы, Бара, Херцег-Нови и KCCG Подгорица',
          requiredDocuments: ['Паспорт усопшего', 'Дистанционная доверенность', 'Точный адрес морга, храма или кладбища назначения'],
          receivingRequirements: ['Подтверждение принимающей стороны в городе назначения'],
          estimatedTotalRange: 'От 2 400 €',
        },
        costHeading: 'Прозрачная стоимость авторепатриации под ключ',
        costSubtitle: 'Все дорожные сборы, таможенное оформление и санитарный пакет включены в договор.',
        costItems: buildStandardCosts('ru', 'Рейс специализированного катафалка, таможенный транзит и дорожные сборы', 'От 600 €'),
        faqHeading: 'Частые вопросы — Авторепатриация из Черногории',
        faqs: [
          {
            question: 'В какие страны выгоднее и быстрее везти спецкатафалком, чем самолетом?',
            answer: 'В Сербию, Боснию, Хорватию, Италию, Австрию, Германию, Польшу, Чехию и Украину наземный спецтранспорт доставляет напрямую в нужный город без ожидания грузовых авиарейсов.',
          },
          {
            question: 'Как проходят границы ЕС и Шенгенской зоны?',
            answer: 'Специализированный ритуальный транспорт со Спроводницей Минздрава ЧГ и консульским пропуском Laissez-Passer проходит границу в приоритетном порядке без очереди.',
          },
          {
            question: 'Оборудованы ли автомобили холодильными установками?',
            answer: 'Транспортировка осуществляется на сертифицированном спецтранспорте аккредитованных лицензированных партнеров-перевозчиков под нашим прямым диспетчерским контролем.',
          },
          {
            question: 'Как отслеживается движение автомобиля по маршруту?',
            answer: 'Координатор круглосуточно передает семье геолокацию и уведомления о прохождении ключевых границ.',
          },
        ],
      },
      mne: {
        metaTitle: 'Međunarodni drumski prevoz pokojnika iz Crne Gore 24/7',
        metaDescription: 'Prevoz preminulih specijalnim pogrebnim vozilom iz Crne Gore za Srbiju, BiH, Hrvatsku, Njemačku, Austriju, Italiju i EU. +382 68 914 816.',
        keywords: ['Prevoz pokojnika u inostranstvo Crna Gora', 'Međunarodni pogrebni prevoz Kotor Podgorica', 'Prevoz umrlih za Srbiju i EU', 'Sprovodnica za drumski prevoz'],
        breadcrumbLabel: 'Drumska repatrijacija (Balkan & EU)',
        eyebrow: 'SPECIJALIZOVANI PREVOZ „OD VRATA DO VRATA“',
        h1: 'Regionalna balkanska i evropska drumska repatrijacija iz Crne Gore',
        heroSubtitle: 'Direktan prevoz atestiranim klimatizovanim pogrebnim vozilima iz bilo koje bolnice u Crnoj Gori direktno do gradske kapele ili groblja u Srbiji, BiH, Hrvatskoj, EU i Istočnoj Evropi.',
        whatsappPrefill: 'Poštovani, potreban mi je obračun za međunarodni drumski prevoz pokojnika iz Crne Gore.',
        emergencyBannerText: 'Koordinator u kapeli Kotor / KCCG Podgorica za 60 minuta • Posada sa dva vozača za EU rute',
        explainerHeading: 'Protokol prekograničnog drumskog transporta i carine',
        explainerIntro: 'Drumski prevoz omogućava direktnu isporuku do mjesta sahrane bez aerodromskih pretovara.',
        walkthroughSteps: buildWalkthrough('mne', 'Međunarodni drumski transport', 'Konzularna odjeljenja u Podgorici', 'Granični prelazi Debeli Brijeg (EU) i Dobrakovo (Srbija)'),
        matrixHeading: 'Specifikacija drumskog prevoza po regionima',
        specs: {
          transitTime: '24–36h (Srbija, BiH, Hrvatska) / 48–72h (Njemačka, Austrija, Švajcarska, EU)',
          transportMode: 'Specijalizovano pogrebno vozilo Mercedes-Benz sa rashladnim uređajem',
          consularTimeframe: '24 sata (Region) / 24–36 sati (EU / Šengen)',
          embassyJurisdiction: 'Ambasade u Podgorici i Beogradu',
          morgueCatchment: 'Preuzimanje iz Kotora, Tivta, Budve, Bara, Herceg Novog i KCCG Podgorica',
          requiredDocuments: ['Pasoš preminulog', 'Ovjereno punomoćje', 'Tačna adresa groblja ili kapele u odredištu'],
          receivingRequirements: ['Potvrda lokalnog pogrebnog preduzeća ili uprave groblja'],
          estimatedTotalRange: 'Od 2.400 €',
        },
        costHeading: 'Transparentni troškovi međunarodnog drumskog prevoza',
        costSubtitle: 'Fiksna cijena po ruti uključujući putarine, graničnu špediciju i sanitarnu opremu.',
        costItems: buildStandardCosts('mne', 'Međunarodni transport specijalnim vozilom, putarine i carina', 'Od 600 €'),
        faqHeading: 'Česta pitanja — Drumski prevoz pokojnika iz Crne Gore',
        faqs: [
          {
            question: 'Za koje države je drumski prevoz najbrža opcija?',
            answer: 'Za Srbiju, Bosnu i Hercegovinu, Hrvatsku, Sloveniju, Italiju, Austriju, Njemačku, Švajcarsku i Poljsku drumski prevoz obezbjeđuje direktnu dostavu na adresu kapele.',
          },
          {
            question: 'Da li pogrebno vozilo čeka u koloni na granici?',
            answer: 'Ne. Vozilo sa zvaničnom Sprovodnicom Ministarstva zdravlja i konzularnom dozvolom ima prioritetni režim prelaska na svim graničnim prelazima.',
          },
          {
            question: 'Da li su vozila opremljena rashladnim komorama?',
            answer: 'Prevoz se obavlja sertifikovanim specijalnim pogrebnim vozilima licenciranih partnerskih prevoznika pod direktnim operativnim nadzorom agencije Memorijal.',
          },
          {
            question: 'Da li porodica dobija obavještenja tokom puta?',
            answer: 'Da, koordinator Vas redovno obavještava o polasku, prelasku granica i tačnom vremenu dolaska.',
          },
        ],
      },
    },
  },

  {
    id: 'service-cremation',
    category: 'service',
    path: '/services/cremation-serbia/',
    priority: 0.95,
    changefreq: 'weekly',
    lastmod: '2026-11-03',
    locales: {
      en: {
        metaTitle: 'Cremation Services Montenegro | Belgrade Transfer & Urn',
        metaDescription: 'Official cremation for Montenegro via Belgrade/Novi Sad state crematorium. Full transport, permits & sealed urn return in 48–72h. +382 68 914 816.',
        keywords: ['Cremation services Montenegro Belgrade transfer', 'Cremation in Montenegro', 'Belgrade crematorium transfer from Montenegro', 'Urn repatriation Montenegro'],
        breadcrumbLabel: 'Cremation in Serbia (Belgrade / Novi Sad)',
        eyebrow: 'OFFICIAL BILATERAL MONTENEGRO–SERBIA CREMATION PROTOCOL',
        h1: 'Cremation Services for Montenegro via Belgrade & Novi Sad State Crematoriums',
        heroSubtitle: 'Because Montenegro has no operating crematorium, we execute the complete lawful transfer to Belgrade or Novi Sad, priority state cremation, and return or international air dispatch of the hermetically sealed urn.',
        whatsappPrefill: 'Hello Memorijal d.o.o., I need assistance with Cremation in Serbia (Belgrade) from Montenegro.',
        emergencyBannerText: 'Coordinator on site at Kotor/Podgorica morgue within 60 minutes • Priority Belgrade Crematorium Slot',
        explainerHeading: 'How Lawful Cremation Works When a Death Occurs in Montenegro',
        explainerIntro: 'Our team manages the entire cross-border sanitary and customs procedure between Montenegro and the Republic of Serbia without requiring family members to travel to Belgrade.',
        walkthroughSteps: buildWalkthrough('en', 'Cross-Border Cremation Transfer to Belgrade', 'Embassy of Serbia & Citizenship Embassy in Podgorica', 'Dobrakovo Border Customs & JKP Pogrebne Usluge Belgrade Crematorium'),
        matrixHeading: 'Belgrade & Novi Sad Cremation Protocol Matrix',
        specs: {
          transitTime: '48 – 72 Hours Total (Collection → Cremation → Sealed Urn Return)',
          transportMode: 'Dedicated Cross-Border Hearse to Belgrade + Secured Urn Courier / Air Cabin',
          consularTimeframe: '24 Hours (Bilateral Sprovodnica & Cremation Authorization)',
          embassyJurisdiction: 'Consulate of Serbia in Podgorica / Herceg Novi & National Embassy',
          morgueCatchment: 'Tivat, Kotor, Budva, Bar, Herceg Novi, Podgorica & Northern Municipalities',
          requiredDocuments: ['Deceased Passport', 'Notarized Cremation Authorization & PoA from Next of Kin', 'Medical Cause of Death Certificate'],
          receivingRequirements: ['Urn can be delivered anywhere in Montenegro, handed over in Belgrade, or cleared for airline carry-on'],
          estimatedTotalRange: 'From €1,850',
        },
        costHeading: 'Complete Cremation Transfer Cost Breakdown',
        costSubtitle: 'Transparent all-inclusive package covering Montenegro permits, Serbia customs, and Belgrade Crematorium fees.',
        costItems: buildStandardCosts('en', 'Cross-Border Hearse to Belgrade, State Crematorium Fee & Sealed Urn Return', 'From €850'),
        faqHeading: 'FAQ — Cremation Services for Montenegro',
        faqs: [
          {
            question: 'Is there any crematorium inside Montenegro?',
            answer: 'No. Montenegro currently does not have a crematorium. All official cremations for residents, expats, and tourists who pass away in Montenegro are performed at the state crematoriums in Belgrade (Lešće) or Novi Sad, Serbia.',
          },
          {
            question: 'Can we fly home with the urn in the airplane cabin after cremation?',
            answer: 'Yes. We provide a non-metallic/X-ray-compliant sealed cinerary urn accompanied by a multilingual Cremation Certificate, Sanitary Urn Pass, and Apostilled Death Certificate accepted by all international airlines for cabin transport.',
          },
          {
            question: 'Can you ship the urn directly to the UK, Germany, Russia, or USA?',
            answer: 'Yes. If family members are not in Montenegro, we handle the entire cremation by Power of Attorney and dispatch the sealed urn via diplomatic/air cargo courier or personal courier to your home country.',
          },
          {
            question: 'What documents are required from the next of kin to authorize cremation in Belgrade?',
            answer: 'Serbian law requires explicit written authorization from the closest next of kin (spouse, child, or parent) alongside proof of kinship (marriage or birth certificate). We prepare the bilingual authorization form for you within 2 hours.',
          },
        ],
      },
      ru: {
        metaTitle: 'Кремация в Сербии (Белград) из Черногории 24/7',
        metaDescription: 'Официальная кремация для умерших в Черногории через гос. крематорий Белграда. Все разрешения, перевозка и возврат урны за 48–72ч. +382 68 914 816.',
        keywords: ['Кремация в Сербии для граждан Черногории и РФ', 'Кремация в Черногории цена', 'Перевозка на кремацию в Белград из Черногории', 'Отправка урны с прахом из Черногории'],
        breadcrumbLabel: 'Кремация в Сербии (Белград / Нови-Сад)',
        eyebrow: 'ОФИЦИАЛЬНЫЙ МЕЖГОСУДАРСТВЕННЫЙ ПРОТОКОЛ ЧЕРНОГОРИЯ — СЕРБИЯ',
        h1: 'Официальная кремация в Сербии (Белград / Нови-Сад) с доставкой из Черногории',
        heroSubtitle: 'Так как в Черногории нет собственного крематория, мы полностью организуем законную перевозку в государственный крематорий Белграда или Нови-Сада, кремацию и возврат опломбированной урны с документами для вылета.',
        whatsappPrefill: 'Здравствуйте, необходима организация кремации в Белграде из Черногории под ключ.',
        emergencyBannerText: 'Выезд координатора в морг Котора / Подгорицы за 60 минут • Приоритетная бронь крематория Белграда',
        explainerHeading: 'Порядок проведения официальной кремации при смерти в Черногории',
        explainerIntro: 'Мы берем на себя все пограничные, таможенные и консульские формальности между Черногорией и Сербией без поездки родственников в Белград.',
        walkthroughSteps: buildWalkthrough('ru', 'Трансфер на кремацию в Белград', 'Консульство Сербии и посольство гражданства в Подгорице', 'Таможня Добраково и государственный крематорий JKP Pogrebne usluge Белград'),
        matrixHeading: 'Регламент и сроки кремации через Белград',
        specs: {
          transitTime: '48 – 72 часа под ключ (Забор из морга → Кремация в Белграде → Возврат урны)',
          transportMode: 'Спецкатафалк до Белграда + курьерская доставка опломбированной урны',
          consularTimeframe: '24 часа (Санитарная Sprovodnica и разрешение на кремацию)',
          embassyJurisdiction: 'Консульство Сербии в Подгорице / Херцег-Нови и национальное посольство',
          morgueCatchment: 'Тиват, Котор, Будва, Бар, Херцег-Нови, Подгорица и север ЧГ',
          requiredDocuments: ['Паспорт усопшего', 'Заявление-доверенность на кремацию от близкого родственника', 'Документ, подтверждающий родство'],
          receivingRequirements: ['Передача урны в Черногории, в Белграде или отправка авиа в РФ/Украину/ЕС'],
          estimatedTotalRange: 'От 1 850 €',
        },
        costHeading: 'Полная смета на кремацию в Белграде из Черногории',
        costSubtitle: 'Прозрачный фиксированный пакет без скрытых таможенных и пограничных доплат.',
        costItems: buildStandardCosts('ru', 'Спецтранспорт Черногория–Белград, сбор гос. крематория и возврат урны', 'От 850 €'),
        faqHeading: 'Частые вопросы — Кремация для умерших в Черногории',
        faqs: [
          {
            question: 'Почему кремация проводится в Белграде, а не в Черногории?',
            answer: 'На территории Черногории нет действующего крематория. Ближайшие государственные сертифицированные крематории находятся в Сербии (Белград и Нови-Сад).',
          },
          {
            question: 'Можно ли перевезти урну с прахом в ручной клади самолета?',
            answer: 'Да. Мы выдаем герметично опломбированную урну, рентген-прозрачную капсулу, международное свидетельство о смерти с Апостилем, справку о кремации и санитарный сертификат для беспрепятственного провоза в салоне самолета.',
          },
          {
            question: 'Можете ли вы провести кремацию и отправить урну без нашего приезда в Черногорию?',
            answer: 'Да, 100% процедуры выполняется по дистанционной доверенности. После кремации мы можем доставить урну в Россию, Украину, страны ЕС или передать вашему представителю.',
          },
          {
            question: 'Какие документы нужны от родственников для разрешения на кремацию в Сербии?',
            answer: 'Требуется согласие ближайшего родственника (супруг, дети, родители) и копия свидетельства о браке или рождении для подтверждения родства. Мы помогаем оформить и перевести эти документы за 1 день.',
          },
        ],
      },
      mne: {
        metaTitle: 'Kremacija u Srbiji (Beograd / Novi Sad) iz Crne Gore 24/7',
        metaDescription: 'Zvanična organizacija kremacije u Beogradu i Novom Sadu sa prevozom iz Crne Gore, Sprovodnicom i povratom urne za 48–72h. +382 68 914 816.',
        keywords: ['Kremacija u Beogradu prevoz iz Crne Gore', 'Kremacija Crna Gora cijena', 'Prevoz pokojnika na kremaciju Beograd', 'Dozvola za prenos urne Crna Gora'],
        breadcrumbLabel: 'Kremacija u Srbiji (Beograd / Novi Sad)',
        eyebrow: 'ZVANIČNI MEĐUDRŽAVNI PROTOKOL CRNA GORA — SRBIJA',
        h1: 'Organizacija kremacije u Beogradu i Novom Sadu sa prevozom iz Crne Gore',
        heroSubtitle: 'Budući da u Crnoj Gori ne postoji krematorijum, preuzimamo kompletan zakonski prevoz u državni krematorijum u Beogradu ili Novom Sadu, prioritetan termin kremacije i povrat zapečaćene urne.',
        whatsappPrefill: 'Poštovani, potrebna mi je organizacija kremacije u Beogradu sa prevozom iz Crne Gore.',
        emergencyBannerText: 'Koordinator u kapeli Kotor / KCCG Podgorica za 60 minuta • Prioritetan termin u Beogradu',
        explainerHeading: 'Zakonska procedura kremacije kada smrt nastupi u Crnoj Gori',
        explainerIntro: 'Naš tim završava sve sanitarne, carinske i konzularne procedure između Crne Gore i Srbije bez obaveze putovanja porodice u Beograd.',
        walkthroughSteps: buildWalkthrough('mne', 'Prekogranični prevoz na kremaciju u Beograd', 'Konzulat Republike Srbije i matična ambasada', 'Carina Dobrakovo i JKP Pogrebne usluge Beograd'),
        matrixHeading: 'Specifikacija procedure kremacije u Beogradu',
        specs: {
          transitTime: '48 – 72 sata ukupno (Preuzimanje → Kremacija → Povrat zapečaćene urne)',
          transportMode: 'Specijalno pogrebno vozilo do Beograda + dostava urne ili avio-sertifikat',
          consularTimeframe: '24 sata (Bilateralna Sprovodnica i ovjera saglasnosti za kremaciju)',
          embassyJurisdiction: 'Konzulat Srbije u Podgorici / Herceg Novom i strane ambasade',
          morgueCatchment: 'Tivat, Kotor, Budva, Bar, Herceg Novi, Podgorica i sjeverne opštine',
          requiredDocuments: ['Pasoš preminulog', 'Ovjerena saglasnost najbližeg srodnika za kremaciju', 'Dokaz o srodstvu (izvod iz MKV ili MKR)'],
          receivingRequirements: ['Predaja urne u Crnoj Gori, u Beogradu ili priprema za unos u avion'],
          estimatedTotalRange: 'Od 1.850 €',
        },
        costHeading: 'Transparentni troškovi kremacije u Beogradu sa prevozom iz CG',
        costSubtitle: 'Kompletan paket bez skrivenih carinskih ili administrativnih troškova.',
        costItems: buildStandardCosts('mne', 'Prevoz Crna Gora–Beograd, taksa državnog krematorijuma i povrat urne', 'Od 850 €'),
        faqHeading: 'Česta pitanja — Kremacija u Beogradu iz Crne Gore',
        faqs: [
          {
            question: 'Zašto se prevoz vrši u Beograd ili Novi Sad?',
            answer: 'U Crnoj Gori ne postoji krematorijum, pa se sve zvanične kremacije vrše u državnim krematorijumima u Beogradu (Lešće) ili Novom Sadu uz bilateralnu Sprovodnicu.',
          },
          {
            question: 'Da li se urna može unijeti u putničku kabinu aviona?',
            answer: 'Da. Izdajemo hermetički zapečaćenu urnu sa višejezičnom Potvrdom o kremaciji i sanitarnom dozvolom koju prihvataju sve međunarodne avio-kompanije.',
          },
          {
            question: 'Da li porodica mora ići za Beograd?',
            answer: 'Ne. Cjelokupnu proceduru prevoza, kremacije i povrata urne u Crnu Goru (ili slanja u inostranstvo) obavljamo po ovjerenom punomoćju.',
          },
          {
            question: 'Koji dokument je neophodan za odobrenje kremacije u Srbiji?',
            answer: 'Neophodna je pisana saglasnost najbližeg srodnika (supružnik, dijete ili roditelj) uz dokaz o srodstvu. Naš pravni tim priprema dvojezični obrazac odmah po pozivu.',
          },
        ],
      },
    },
  },

  {
    id: 'service-legal',
    category: 'service',
    path: '/services/legal-consular/',
    priority: 0.9,
    changefreq: 'weekly',
    lastmod: '2026-11-03',
    locales: {
      en: {
        metaTitle: 'Sanitary Sprovodnica, Zinc Sealing & Consular Permits MNE',
        metaDescription: 'Montenegro Sanitary Pass (Sprovodnica), hermetic zinc soldering (lemljenje), Apostille & Embassy clearances in Podgorica via remote PoA. +382 68 914 816.',
        keywords: ['Zinc lined coffin sealing Montenegro sprovodnica', 'Sprovodnica Montenegro sanitary permit', 'Consular mortuary passport Podgorica', 'Death certificate apostille Montenegro'],
        breadcrumbLabel: 'Sanitary Sprovodnica & Consular Legalization',
        eyebrow: 'STATUTORY LEGAL, SANITARY & DIPLOMATIC CLEARANCE',
        h1: 'Sanitary Passes (Sprovodnica), Hermetic Zinc Sealing & Consular Permits in Montenegro',
        heroSubtitle: 'Complete remote execution of Montenegrin death certificates, Hague Apostille stamps, sworn court translations (Sudski tumač), sanitary inspection seals, and Embassy Laissez-Passer clearances in Podgorica.',
        whatsappPrefill: 'Hello Memorijal d.o.o., I need assistance with Sprovodnica, Consular Permits & Legalization in Montenegro.',
        emergencyBannerText: '100% Remote Execution via Power of Attorney • Direct Representation at All Podgorica Embassies',
        explainerHeading: 'Mandatory Legal & Sanitary Clearances for International Repatriation',
        explainerIntro: 'No human remains or cinerary urn may cross the Montenegrin border without simultaneous validation from the Ministry of Interior, Ministry of Health Sanitary Inspection, and the destination Embassy.',
        walkthroughSteps: buildWalkthrough('en', 'Consular & Sanitary Legalization', 'All Foreign Embassies in Podgorica & Belgrade', 'Republic Sanitary Inspection & Customs Administration'),
        matrixHeading: 'Statutory Documentation & Legalization Matrix',
        specs: {
          transitTime: '24 – 48 Hours for Complete Legal & Sanitary Dossier',
          transportMode: 'Diplomatic Document Courier & Inspector On-Site Attendance',
          consularTimeframe: 'Same-Day / 24h at Podgorica Embassies',
          embassyJurisdiction: 'UK, Germany, France, Italy, Poland, Russia, Ukraine, Serbia, Turkey, USA',
          morgueCatchment: 'Physical Inspector Sealing at Kotor Morgue & KCCG Podgorica',
          requiredDocuments: ['Passport of the Deceased', 'Signed Bilingual Power of Attorney (Punomoćje)', 'Next-of-Kin Identification'],
          receivingRequirements: ['Compliance with Strasbourg Agreement (1973) & Berlin Convention'],
          estimatedTotalRange: 'Included in Full Repatriation or From €450 Standalone Legal Package',
        },
        costHeading: 'Statutory Legal, Sanitary & Translation Fee Schedule',
        costSubtitle: 'Every state fee and court translation receipt is itemized on your official EFI fiscal invoice.',
        costItems: buildStandardCosts('en', 'Full Consular Representation & Republic Sanitary Inspector Sealing Protocol', 'From €350'),
        faqHeading: 'FAQ — Sprovodnica, Zinc Sealing & Consular Permits in Montenegro',
        faqs: [
          {
            question: 'What is a "Sprovodnica za prenos posmrtnih ostataka"?',
            answer: 'The Sprovodnica is the mandatory official Sanitary Mortuary Pass issued by the Montenegro Administration for Inspection Affairs (Sanitary Inspection) authorizing human remains to cross international borders.',
          },
          {
            question: 'How does the Republic Sanitary Inspector verify hermetic zinc soldering (lemljenje)?',
            answer: 'Our licensed technician solders the zinc coffin liner hermetically in the morgue while the Republic Sanitary Inspector witnesses the procedure and affixes an official numbered state lead/wax seal.',
          },
          {
            question: 'What if the deceased’s country does not have an Embassy in Podgorica?',
            answer: 'Several countries accredit their Embassy in Belgrade to cover Montenegro. Because we operate daily between Podgorica and Belgrade, our Belgrade diplomatic coordinator obtains the consular permit within 24 hours.',
          },
          {
            question: 'Can you obtain extra original Death Certificates with Apostille for bank and estate matters?',
            answer: 'Yes. We routinely obtain multiple international Form C extracts and Apostilled copies with sworn English, German, Russian, or French translations for probate and insurance settlement.',
          },
        ],
      },
      ru: {
        metaTitle: 'Спроводница (Sprovodnica), опайка цинка и консульства в ЧГ',
        metaDescription: 'Оформление санитарной Спроводницы, свидетельства о смерти с Апостилем, опайки цинка (lemljenje) и разрешений посольств в Подгорице. +382 68 914 816.',
        keywords: ['Справка о смерти и спровдница в Санитарной инспекции Черногории', 'Оцинковка гроба и пайка Черногория', 'Консульское разрешение на вывоз тела Черногория', 'Апостиль свидетельства о смерти Черногория'],
        breadcrumbLabel: 'Санитарная Sprovodnica и консульства',
        eyebrow: 'ЮРИДИЧЕСКОЕ, САНИТАРНОЕ И КОНСУЛЬСКОЕ ОФОРМЛЕНИЕ ПО ДОВЕРЕННОСТИ',
        h1: 'Санитарный пропуск (Sprovodnica), опайка цинка и консульская легализация в Черногории',
        heroSubtitle: '100% дистанционное получение свидетельства о смерти, штампов Апостиль, переводов судебных переводчиков (Sudski tumač), акта герметичной опайки цинка и разрешений посольств в Подгорице.',
        whatsappPrefill: 'Здравствуйте, необходима помощь с оформлением документов о смерти и Спроводницы в Черногории.',
        emergencyBannerText: 'Полное оформление без приезда родственников • Прямая работа со всеми посольствами в Подгорице',
        explainerHeading: 'Обязательные государственные документы для пересечения границы',
        explainerIntro: 'Вывоз тела или урны из Черногории требует одновременного согласования МВД, Санитарной инспекции Минздрава и консульского отдела посольства.',
        walkthroughSteps: buildWalkthrough('ru', 'Юридическая и санитарная легализация', 'Посольства РФ, Украины, ЕС, Великобритании и США в Подгорице', 'Санитарная инспекция и Таможенное управление ЧГ'),
        matrixHeading: 'Регламент оформления документов о смерти в Черногории',
        specs: {
          transitTime: '24 – 48 часов на сбор полного пакета оригиналов',
          transportMode: 'Курьерское сопровождение в судах, Минздраве и посольствах',
          consularTimeframe: 'День в день / 24 часа в посольствах в Подгорице',
          embassyJurisdiction: 'РФ, Украина, Германия, Великобритания, Франция, Польша, Сербия, Турция, Италия',
          morgueCatchment: 'Присутствие санитарного инспектора в моргах Котора и KCCG Подгорица',
          requiredDocuments: ['Паспорт усопшего', 'Двуязычная доверенность (Punomoćje)', 'Копия паспорта родственника'],
          receivingRequirements: ['Полное соответствие Страсбургскому соглашению и правилам таможни ЕАЭС/ЕС'],
          estimatedTotalRange: 'Включено в пакет репатриации или От 450 € отдельно',
        },
        costHeading: 'Тарифы на государственные пошлины, цинкование и переводы',
        costSubtitle: 'Каждая пошлина подтверждается официальными квитанциями и фискальным счетом EFI.',
        costItems: buildStandardCosts('ru', 'Консульское сопровождение и протокол пломбирования санитарным инспектором', 'От 350 €'),
        faqHeading: 'Частые вопросы — Спроводница и опайка цинка в Черногории',
        faqs: [
          {
            question: 'Что такое «Спроводница» (Sprovodnica za prenos umrlog lica)?',
            answer: 'Это главный государственный санитарный документ, выдаваемый Санитарной инспекцией Черногории после осмотра и пломбирования цинкового гроба, без которого таможня не выпустит груз через границу или в аэропорт.',
          },
          {
            question: 'Как проходит процедура опайки цинка (lemljenje) и опломбирования?',
            answer: 'Наш специалист производит герметичную опайку оцинкованного вкладыша в морге в присутствии государственного санитарного инспектора, который ставит номерную государственную пломбу.',
          },
          {
            question: 'Можете ли вы получить дополнительные дубликаты свидетельства о смерти с Апостилем для наследства?',
            answer: 'Да, по вашей доверенности мы сразу заказываем несколько оригиналов свидетельства о смерти с Апостилем и нотариальным переводом для оформления наследства, банков и страховых выплат на родине.',
          },
          {
            question: 'Что делать, если в деле назначена судебно-медицинская экспертиза (обдукция) в KCCG Подгорица?',
            answer: 'Наши юристы напрямую взаимодействуют с прокуратурой и отделением судебной медицины KCCG, ускоряя выдачу врачебного свидетельства о смерти сразу после завершения экспертизы.',
          },
        ],
      },
      mne: {
        metaTitle: 'Sanitarna Sprovodnica i lemljenje cinka Crna Gora 24/7',
        metaDescription: 'Pribavljanje sanitarne Sprovodnice, hermetičko lemljenje limenog sanduka, Apostille i konzularne dozvole u Podgorici po punomoćju. +382 68 914 816.',
        keywords: ['Sprovodnica za prenos umrlog lica zdravstvena inspekcija', 'Limeni uložak lemljenje Kotor Podgorica', 'Međunarodni izvod iz matične knjige umrlih Crna Gora', 'Konzularna sprovodnica Podgorica'],
        breadcrumbLabel: 'Sanitarna Sprovodnica i konzulati',
        eyebrow: 'ZAKONSKA, SANITARNA I KONZULARNA PROCEDURA PO PUNOMOĆJU',
        h1: 'Sanitarne Sprovodnice, hermetičko lemljenje cinka i konzularne dozvole u Crnoj Gori',
        heroSubtitle: 'Kompletno zastupanje pred matičnim službama MUP-a, osnovnim sudovima (Apostille), sudskim tumačima, Republičkom sanitarnom inspekcijom i stranim ambasadama u Podgorici i Beogradu.',
        whatsappPrefill: 'Poštovani, potrebna mi je asistencija oko Sprovodnice, lemljenja cinka i konzularnih dozvola.',
        emergencyBannerText: '100% završavanje po punomoćju • Direktno zastupanje u svim ambasadama u Podgorici',
        explainerHeading: 'Obavezne zakonske i sanitarne dozvole za prelazak granice',
        explainerIntro: 'Prenos posmrtnih ostataka preko granice Crne Gore zahtijeva usklađeno rješenje Sanitarne inspekcije i sprovodnicu ambasade.',
        walkthroughSteps: buildWalkthrough('mne', 'Sanitarna i konzularna legalizacija', 'Sve ambasade u Podgorici i Beogradu', 'Republička sanitarna inspekcija i Uprava carina CG'),
        matrixHeading: 'Specifikacija pravne i sanitarne dokumentacije',
        specs: {
          transitTime: '24 – 48 sati za kompletiranje svih dozvola',
          transportMode: 'Pravno zastupanje i izlazak sanitarnog inspektora na lice mjesta',
          consularTimeframe: 'Istog dana / u roku od 24h u ambasadama u Podgorici',
          embassyJurisdiction: 'Srbija, UK, Njemačka, Francuska, Italija, Poljska, Rusija, Ukrajina, Turska',
          morgueCatchment: 'Plombiranje u kapeli Opšte bolnice Kotor i KCCG Podgorica',
          requiredDocuments: ['Pasoš preminulog lica', 'Potpisano punomoćje', 'Kopija ličnog dokumenta srodnika'],
          receivingRequirements: ['Usklađenost sa Strazburškim sporazumom i carinskim propisima'],
          estimatedTotalRange: 'Uključeno u repatrijaciju ili Od 450 € samostalno',
        },
        costHeading: 'Pregled administrativnih, sanitarnih i prevodilačkih troškova',
        costSubtitle: 'Sve takse su transparentno iskazane na zvaničnom EFI fiskalnom računu.',
        costItems: buildStandardCosts('mne', 'Konzularno zastupanje i protokol plombiranja sa sanitarnim inspektorom', 'Od 350 €'),
        faqHeading: 'Česta pitanja — Sprovodnica i lemljenje cinka u Crnoj Gori',
        faqs: [
          {
            question: 'Šta je Sprovodnica za prenos posmrtnih ostataka?',
            answer: 'Sprovodnica je zvanično rješenje koje izdaje Republička sanitarna inspekcija Crne Gore nakon kontrole hermetičkog lemljenja limenog sanduka i predstavlja obavezan dokument na graničnom prelazu ili aerodromu.',
          },
          {
            question: 'Kako se vrši hermetičko lemljenje cinka i stavljanje plombe?',
            answer: 'Naš ovlašćeni tim vrši lemljenje limenog uloška u bolničkoj kapeli u prisustvu sanitarnog inspektora, koji potom postavlja zvaničnu državnu plombu.',
          },
          {
            question: 'Možete li izvaditi više primjeraka međunarodnog izvoda o smrti za ostavinski postupak?',
            answer: 'Da, po Vašem punomoćju pribavljamo više originala Izvoda iz matične knjige umrlih (Obrazac C) sa Apostille pečatom i prevodom sudskog tumača.',
          },
          {
            question: 'Šta ako je naložena sudsko-medicinska obdukcija u KCCG Podgorica?',
            answer: 'Naši koordinatori su u direktnom kontaktu sa Centrom za sudsku medicinu KCCG i tužilaštvom kako bi se dokumentacija preuzela odmah po završetku obdukcije.',
          },
        ],
      },
    },
  },
];

export const ALL_SEO_ROUTES: SeoRouteEntry[] = [
  ...SEO_ROUTES,
  ...CORRIDOR_ROUTES,
  ...LOCATION_ROUTES,
  ...RESOURCE_ROUTES,
  ...CLUSTER_ROUTES,
];

export function buildLocalizedPath(locale: LocaleSlug, routePath: string): string {
  const normalized = routePath.startsWith('/') ? routePath : `/${routePath}`;
  const withTrailing = normalized.endsWith('/') ? normalized : `${normalized}/`;
  if (withTrailing === '/') {
    return `/${locale}/`;
  }
  return `/${locale}${withTrailing}`;
}

export function buildFullCanonicalUrl(locale: LocaleSlug, routePath: string): string {
  return `${SITE_ORIGIN}${buildLocalizedPath(locale, routePath)}`;
}

export function resolveRouteAndLocale(pathname: string): {
  locale: LocaleSlug;
  route: SeoRouteEntry;
  isNotFound: boolean;
} {
  const clean = (pathname || '/').trim() || '/';
  const segments = clean.split('/').filter(Boolean);

  let locale: LocaleSlug = 'en';
  let restSegments = segments;
  let hasValidLocalePrefix = segments.length === 0;

  if (segments[0] === 'en' || segments[0] === 'ru' || segments[0] === 'mne') {
    locale = segments[0];
    restSegments = segments.slice(1);
    hasValidLocalePrefix = true;
  }

  const normalizedRoutePath =
    restSegments.length === 0 ? '/' : `/${restSegments.join('/')}/`;

  const matched = ALL_SEO_ROUTES.find((r) => r.path === normalizedRoutePath);

  return {
    locale,
    route: matched ?? ALL_SEO_ROUTES[0],
    isNotFound: !hasValidLocalePrefix || !matched,
  };
}

