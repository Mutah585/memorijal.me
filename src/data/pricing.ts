import { type Language, WHATSAPP_NUMBER } from '../i18n/translations.ts';
import type { LocaleSlug } from './seo-routes.ts';

export type SupportedCurrency = 'EUR' | 'GBP' | 'USD';

export const CURRENCY_RATES: Record<SupportedCurrency, { rate: number; symbol: string }> = {
  EUR: { rate: 1, symbol: '€' },
  GBP: { rate: 0.85, symbol: '£' },
  USD: { rate: 1.08, symbol: '$' },
};

export interface PricingPackageItem {
  id:
  | 'cremation_belgrade'
  | 'regional_road'
  | 'eu_ground'
  | 'air_cargo'
  | 'consular_clearance';
  basePriceEur: number;
  schemaName: string;
  schemaDescription: string;
  locales: Record<
    LocaleSlug,
    {
      title: string;
      badge: string;
      formattedPrice: string;
      subtext: string;
      clarification: string;
      ctaLabel: string;
      whatsappMessage: string;
    }
  >;
}

export interface FullServiceTariffItem {
  id: string;
  codeNum: string;
  basePriceEur: number;
  isGopZeroFee?: boolean;
  targetPath?: string;
  anchorId?: string;
  schemaName: string;
  schemaDescription: string;
  locales: Record<
    LocaleSlug,
    {
      title: string;
      badge: string;
      formattedPrice: string;
      scope: string;
      disbursementNote: string;
      whatsappMessage: string;
    }
  >;
}

export interface FullServiceTariffTier {
  tierId: 'tier1' | 'tier2' | 'tier3';
  badge: Record<LocaleSlug, string>;
  heading: Record<LocaleSlug, string>;
  subtitle: Record<LocaleSlug, string>;
  items: FullServiceTariffItem[];
}

const NBSP = '\u00A0';

/**
 * Formats a numeric EUR base amount into a compliant, open-ended "Starting From" string
 * without upper ceiling boundaries, using non-breaking spaces according to locale.
 */
export function formatStartingPrice(
  amount: number,
  localeInput: LocaleSlug | Language,
  currency: SupportedCurrency = 'EUR'
): string {
  const norm = localeInput.toLowerCase() as LocaleSlug;
  const { rate, symbol } = CURRENCY_RATES[currency];
  const converted =
    currency === 'EUR' ? amount : Math.round((amount * rate) / 10) * 10;

  if (norm === 'ru') {
    const formattedNum =
      converted >= 1000
        ? `${Math.floor(converted / 1000)}${NBSP}${String(converted % 1000).padStart(3, '0')}`
        : String(converted);
    return `От${NBSP}${formattedNum}${NBSP}${symbol}`;
  }
  if (norm === 'mne') {
    const formattedNum =
      converted >= 1000
        ? `${Math.floor(converted / 1000)}.${String(converted % 1000).padStart(3, '0')}`
        : String(converted);
    return `Od${NBSP}${formattedNum}${NBSP}${symbol}`;
  }
  // English ('en')
  const formattedNum = converted.toLocaleString('en-US');
  return `From${NBSP}${symbol}${formattedNum}`;
}

export function formatTariffItemPrice(
  item: FullServiceTariffItem,
  locale: LocaleSlug,
  currency: SupportedCurrency = 'EUR'
): string {
  if (item.isGopZeroFee) {
    const { symbol } = CURRENCY_RATES[currency];
    if (locale === 'ru') {
      return `От${NBSP}0${NBSP}${symbol} для семьи (прямой биллинг по GOP)`;
    }
    if (locale === 'mne') {
      return `Od${NBSP}0${NBSP}${symbol} za porodicu (Direktna GOP naplata)`;
    }
    return `From${NBSP}${symbol}0 for family (Direct GOP Billing)`;
  }
  if (currency === 'EUR') {
    return item.locales[locale].formattedPrice;
  }
  return formatStartingPrice(item.basePriceEur, locale, currency);
}

export const PRICING_CLARIFICATION_NOTE: Record<LocaleSlug, string> = {
  en: 'Exact quote depends on transit route and consular fees',
  ru: 'Окончательный расчет зависит от километража и консульских сборов',
  mne: 'Konačna cijena zavisi od stvarne kilometraže i konzularnih taksi',
};

export const PRICING_CTA_LABEL: Record<LocaleSlug, string> = {
  en: 'Request Exact Estimate',
  ru: 'Рассчитать точную смету',
  mne: 'Zatražite precizan proračun',
};

export const STANDARD_PRICING_PACKAGES: PricingPackageItem[] = [
  {
    id: 'cremation_belgrade',
    basePriceEur: 2200,
    schemaName: 'Turnkey Cremation in Belgrade',
    schemaDescription:
      'Starting price for cross-border transfer, cremation, and urn return',
    locales: {
      en: {
        title: 'Belgrade / Novi Sad Cremation Package ("Turnkey")',
        badge: 'Most Requested • Official State Crematorium',
        formattedPrice: `From${NBSP}€2,200`,
        subtext:
          'Includes morgue transfer, cross-border sanitary transit (Sprovodnica), cremation slot, and return of urn.',
        clarification: PRICING_CLARIFICATION_NOTE.en,
        ctaLabel: PRICING_CTA_LABEL.en,
        whatsappMessage:
          'Hello Memorijal d.o.o., I would like to request an exact estimate for the Belgrade/Novi Sad Turnkey Cremation Package (starting from €2,200).',
      },
      ru: {
        title: 'Пакет кремации в Белграде / Нови-Саде («Под ключ»)',
        badge: 'Государственный крематорий • Возврат урны',
        formattedPrice: `От${NBSP}2${NBSP}200${NBSP}€`,
        subtext:
          'Включает трансфер из морга, санитарный пропуск через границу (Sprovodnica), кремацию и возврат опечатанной урны.',
        clarification: PRICING_CLARIFICATION_NOTE.ru,
        ctaLabel: PRICING_CTA_LABEL.ru,
        whatsappMessage:
          'Здравствуйте, Memorijal d.o.o.! Прошу рассчитать точную смету по пакету кремации в Белграде «под ключ» (начальная оценка от 2 200 €).',
      },
      mne: {
        title: 'Paket kremacije u Beogradu / Novom Sadu ("Ključ u ruke")',
        badge: 'Državni krematorijum • Povrat urne',
        formattedPrice: `Od${NBSP}2.200${NBSP}€`,
        subtext:
          'Uključuje preuzimanje iz mrtvačnice, prekogranični sanitarni tranzit (Sprovodnica), termin kremacije i povrat urne.',
        clarification: PRICING_CLARIFICATION_NOTE.mne,
        ctaLabel: PRICING_CTA_LABEL.mne,
        whatsappMessage:
          'Poštovani Memorijal d.o.o., interesuje me paket kremacije u Beogradu "ključ u ruke" (početna procjena od 2.200 €). Molim za precizan proračun.',
      },
    },
  },
  {
    id: 'regional_road',
    basePriceEur: 2600,
    schemaName: 'Regional Road Repatriation (Serbia, BiH, North Macedonia)',
    schemaDescription:
      'Starting price for regional Balkan road repatriation, hermetic soldering, and consular transit permits',
    locales: {
      en: {
        title:
          'Regional Road Repatriation (Serbia / Bosnia & Herzegovina / North Macedonia)',
        badge: 'Direct Door-to-Door Balkan Hearse',
        formattedPrice: `From${NBSP}€2,600`,
        subtext:
          'Fixed rate base + per-km route calculation, hermetic soldering, consular transit permits.',
        clarification: PRICING_CLARIFICATION_NOTE.en,
        ctaLabel: PRICING_CTA_LABEL.en,
        whatsappMessage:
          'Hello Memorijal d.o.o., I would like to request an exact estimate for Regional Road Repatriation (starting from €2,600).',
      },
      ru: {
        title:
          'Региональная авторепатриация (Сербия / Босния и Герцеговина / Северная Македония)',
        badge: 'Спецтранспорт «от двери до двери»',
        formattedPrice: `От${NBSP}2${NBSP}600${NBSP}€`,
        subtext:
          'Базовый фиксированный тариф + расчет за км маршрута, герметичная опайка цинка, транзитные консульские разрешения.',
        clarification: PRICING_CLARIFICATION_NOTE.ru,
        ctaLabel: PRICING_CTA_LABEL.ru,
        whatsappMessage:
          'Здравствуйте, Memorijal d.o.o.! Интересует региональная авторепатриация по Балканам (начальная оценка от 2 600 €). Прошу рассчитать точную смету.',
      },
      mne: {
        title:
          'Regionalna drumska repatrijacija (Srbija / Bosna i Hercegovina / Sjeverna Makedonija)',
        badge: 'Direktni prevoz specijalnim vozilom',
        formattedPrice: `Od${NBSP}2.600${NBSP}€`,
        subtext:
          'Fiksna osnovica + obračun po kilometraži rute, hermetičko lemljenje sanduka i konzularne tranzitne dozvole.',
        clarification: PRICING_CLARIFICATION_NOTE.mne,
        ctaLabel: PRICING_CTA_LABEL.mne,
        whatsappMessage:
          'Poštovani Memorijal d.o.o., interesuje me regionalna drumska repatrijacija (početna procjena od 2.600 €). Molim za precizan proračun.',
      },
    },
  },
  {
    id: 'eu_ground',
    basePriceEur: 4200,
    schemaName:
      'EU Cross-Border Ground Repatriation (Germany, Austria, Poland, Hungary)',
    schemaDescription:
      'Starting price for dispatched certified partner carrier, EUR-6 customs transit compliance, and multilingual dossier',
    locales: {
      en: {
        title:
          'EU Cross-Border Ground Repatriation (Germany, Austria, Poland, Hungary)',
        badge: 'Schengen & EU Overland Corridor',
        formattedPrice: `From${NBSP}€4,200`,
        subtext:
          'Certified international partner carrier, EUR-6 customs transit compliance, multilingual dossier.',
        clarification: PRICING_CLARIFICATION_NOTE.en,
        ctaLabel: PRICING_CTA_LABEL.en,
        whatsappMessage:
          'Hello Memorijal d.o.o., I would like to request an exact estimate for EU Cross-Border Ground Repatriation (starting from €4,200).',
      },
      ru: {
        title:
          'Наземная репатриация в страны ЕС (Германия, Австрия, Польша, Венгрия)',
        badge: 'Международный коридор ЕС / Шенген',
        formattedPrice: `От${NBSP}4${NBSP}200${NBSP}€`,
        subtext:
          'Сертифицированный спецтранспорт лицензированного партнера EUR-6, соблюдение таможенного транзита ЕС, многоязычное досье.',
        clarification: PRICING_CLARIFICATION_NOTE.ru,
        ctaLabel: PRICING_CTA_LABEL.ru,
        whatsappMessage:
          'Здравствуйте, Memorijal d.o.o.! Интересует наземная репатриация в страны ЕС (начальная оценка от 4 200 €). Прошу рассчитать точную смету.',
      },
      mne: {
        title:
          'Međunarodna drumska repatrijacija u EU (Njemačka, Austrija, Poljska, Mađarska)',
        badge: 'EU / Šengen kopneni koridor',
        formattedPrice: `Od${NBSP}4.200${NBSP}€`,
        subtext:
          'Sertifikovano međunarodno specijalno vozilo licenciranog partnera EUR-6, carinska usklađenost za tranzit kroz EU i višejezični dosije.',
        clarification: PRICING_CLARIFICATION_NOTE.mne,
        ctaLabel: PRICING_CTA_LABEL.mne,
        whatsappMessage:
          'Poštovani Memorijal d.o.o., interesuje me drumska repatrijacija u zemlje EU (početna procjena od 4.200 €). Molim za precizan proračun.',
      },
    },
  },
  {
    id: 'air_cargo',
    basePriceEur: 4900,
    schemaName: 'International Air Cargo Repatriation (UK, EU, CIS / Worldwide)',
    schemaDescription:
      'Starting price for IATA HUM cargo booking, air coffin zinc liner, and consular clearance at Podgorica or Belgrade',
    locales: {
      en: {
        title:
          'International Air Cargo Repatriation (UK, EU, CIS / Worldwide)',
        badge: 'IATA Cargo HUM • Priority Air Waybill',
        formattedPrice: `From${NBSP}€4,900`,
        subtext:
          'IATA HUM cargo booking, air coffin zinc liner, consular clearance at Podgorica / Belgrade.',
        clarification: PRICING_CLARIFICATION_NOTE.en,
        ctaLabel: PRICING_CTA_LABEL.en,
        whatsappMessage:
          'Hello Memorijal d.o.o., I would like to request an exact estimate for International Air Cargo HUM Repatriation (starting from €4,900).',
      },
      ru: {
        title:
          'Международная авиарепатриация Cargo HUM (Великобритания, ЕС, СНГ / Весь мир)',
        badge: 'Авиакарго IATA HUM • Приоритетный вылет',
        formattedPrice: `От${NBSP}4${NBSP}900${NBSP}€`,
        subtext:
          'Бронирование авиакарго IATA HUM, авиационный гроб с цинковым вкладышем, консульское оформление в Подгорице / Белграде.',
        clarification: PRICING_CLARIFICATION_NOTE.ru,
        ctaLabel: PRICING_CTA_LABEL.ru,
        whatsappMessage:
          'Здравствуйте, Memorijal d.o.o.! Интересует международная авиарепатриация Cargo HUM (начальная оценка от 4 900 €). Прошу рассчитать точную смету.',
      },
      mne: {
        title:
          'Međunarodna avio-kargo repatrijacija (UK, EU, ZND / Cijeli svijet)',
        badge: 'IATA Cargo HUM • Prioritetni let',
        formattedPrice: `Od${NBSP}4.900${NBSP}€`,
        subtext:
          'IATA HUM kargo rezervacija, avio-sanduk sa pocinkovanim uloškom, konzularna ovjera u Podgorici / Beogradu.',
        clarification: PRICING_CLARIFICATION_NOTE.mne,
        ctaLabel: PRICING_CTA_LABEL.mne,
        whatsappMessage:
          'Poštovani Memorijal d.o.o., interesuje me međunarodna avio-kargo repatrijacija (početna procjena od 4.900 €). Molim za precizan proračun.',
      },
    },
  },
  {
    id: 'consular_clearance',
    basePriceEur: 450,
    schemaName:
      'Administrative & Consular Clearance Only (Sprovodnica & Permits)',
    schemaDescription:
      'Starting price for sanitary passes (Sprovodnica), consular mortuary passport, Apostille, and sworn court translations',
    locales: {
      en: {
        title:
          'Administrative & Consular Clearance Only (Sprovodnica & Permits)',
        badge: 'Statutory Documentation & Sealing Protocol',
        formattedPrice: `From${NBSP}€450`,
        subtext:
          'Form C international death certificate, Hague Apostille, sworn translation (Sudski tumač), and Republic Sanitary Pass (Sprovodnica).',
        clarification: PRICING_CLARIFICATION_NOTE.en,
        ctaLabel: PRICING_CTA_LABEL.en,
        whatsappMessage:
          'Hello Memorijal d.o.o., I would like to request an exact estimate for Administrative & Consular Clearance Only (starting from €450).',
      },
      ru: {
        title:
          'Административное и консульское оформление (Sprovodnica и разрешения)',
        badge: 'Юридическое досье по доверенности',
        formattedPrice: `От${NBSP}450${NBSP}€`,
        subtext:
          'Международное свидетельство о смерти (Форма C), апостиль, судебный перевод (Sudski tumač) и санитарный пропуск (Sprovodnica).',
        clarification: PRICING_CLARIFICATION_NOTE.ru,
        ctaLabel: PRICING_CTA_LABEL.ru,
        whatsappMessage:
          'Здравствуйте, Memorijal d.o.o.! Интересует административное и консульское оформление документов (начальная оценка от 450 €). Прошу рассчитать точную смету.',
      },
      mne: {
        title:
          'Samo administrativno i konzularno zastupanje (Sprovodnica i dozvole)',
        badge: 'Zakonska dokumentacija po punomoćju',
        formattedPrice: `Od${NBSP}450${NBSP}€`,
        subtext:
          'Međunarodni izvod iz matične knjige umrlih (Obrazac C), Apostille, sudski tumač i sanitarna sprovodnica.',
        clarification: PRICING_CLARIFICATION_NOTE.mne,
        ctaLabel: PRICING_CTA_LABEL.mne,
        whatsappMessage:
          'Poštovani Memorijal d.o.o., interesuje me administrativno i konzularno zastupanje / Sprovodnica (početna procjena od 450 €). Molim za precizan proračun.',
      },
    },
  },
];

/**
 * Complete 14-item "Starting From" tariff schedule across 3 tiers for /{lang}/pricing-breakdown/
 */
export const FULL_SERVICE_PRICING_TIERS: FullServiceTariffTier[] = [
  {
    tierId: 'tier1',
    badge: {
      en: 'CORE REPATRIATION & MEMORIAL SERVICES',
      ru: 'ОСНОВНЫЕ УСЛУГИ РЕПАТРИАЦИИ И ЗАХОРОНЕНИЯ',
      mne: 'OSNOVNE USLUGE REPATRIJACIJE I SAHRANE',
    },
    heading: {
      en: 'Core Repatriation, Turnkey Cremation & Municipal Memorials',
      ru: 'Международная репатриация, кремация в Сербии и местные церемонии',
      mne: 'Međunarodna repatrijacija, kremacija u Srbiji i lokalne ceremonije',
    },
    subtitle: {
      en: 'Open-ended starting rates under KD 82.99. Physical hearse transport, zinc soldering, and municipal Komunalno cemetery works are itemized as pass-through disbursements (prolazne stavke).',
      ru: 'Открытые стартовые тарифы по коду KD 82.99. Услуги лицензированного спецтранспорта, опайки цинка и муниципальных предприятий Komunalno выделяются в смете как транзитные расходы (prolazne stavke).',
      mne: 'Početne cijene u okviru šifre KD 82.99. Fizički prevoz, lemljenje cinka i usluge JKP Komunalno iskazuju se kao prolazne stavke (prefakturisanje).',
    },
    items: [
      {
        id: 'consular_sanitary_clearance',
        codeNum: '01',
        basePriceEur: 450,
        targetPath: '/services/legal-consular/',
        schemaName: 'Consular & Sanitary Clearance Only (Sprovodnica & Punomoćje)',
        schemaDescription:
          'Starting price for standalone sanitary Sprovodnica, Form C death certificate, and Power of Attorney execution',
        locales: {
          en: {
            title: 'Consular & Sanitary Clearance Only (Sprovodnica & Punomoćje)',
            badge: 'Standalone Legal & Sanitary Dossier',
            formattedPrice: `From${NBSP}€450`,
            scope:
              'Remote Power of Attorney (Punomoćje), International Death Certificate (Form C), Republic Sanitary Inspector sealing protocol, and Sprovodnica transit pass.',
            disbursementNote: 'State stamp duties & court translation fees itemized at cost',
            whatsappMessage:
              'Hello Memorijal d.o.o., I would like a quote for Consular & Sanitary Clearance Only (Sprovodnica & Punomoćje — From €450).',
          },
          ru: {
            title: 'Консульское и санитарное оформление (Sprovodnica и Punomoćje)',
            badge: 'Автономный пакет документов',
            formattedPrice: `От${NBSP}450${NBSP}€`,
            scope:
              'Дистанционная доверенность (Punomoćje), международное свидетельство о смерти (Форма C), выезд санитарного инспектора и оформление Sprovodnica.',
            disbursementNote: 'Госпошлины и судебные переводы оплачиваются по квитанциям',
            whatsappMessage:
              'Здравствуйте, Memorijal d.o.o.! Прошу рассчитать смету на консульское и санитарное оформление Sprovodnica и Punomoćje (От 450 €).',
          },
          mne: {
            title: 'Konzularno i sanitarno zastupanje (Sprovodnica i Punomoćje)',
            badge: 'Samostalni pravni i sanitarni paket',
            formattedPrice: `Od${NBSP}450${NBSP}€`,
            scope:
              'Zastupanje po punomoćju (Punomoćje), međunarodni izvod Obrazac C, prisustvo republičkog sanitarnog inspektora i izdavanje Sprovodnice.',
            disbursementNote: 'Državne i konzularne takse obračunavaju se po priznanicama',
            whatsappMessage:
              'Poštovani Memorijal d.o.o., molim za ponudu za konzularno i sanitarno zastupanje — Sprovodnica i Punomoćje (Od 450 €).',
          },
        },
      },
      {
        id: 'local_municipal_burial',
        codeNum: '02',
        basePriceEur: 950,
        targetPath: '/services/local-burial-coordination/',
        schemaName: 'Local Municipal Burial Coordination in Montenegro (DOO Komunalno)',
        schemaDescription:
          'Starting price for local municipal burial coordination with DOO Komunalno across Montenegro',
        locales: {
          en: {
            title: 'Local Municipal Burial Coordination in Montenegro (DOO Komunalno)',
            badge: 'Municipal Cemetery Partner Model',
            formattedPrice: `From${NBSP}€950`,
            scope:
              'Full representation with municipal DOO Komunalno (Tivat, Kotor, Budva, Podgorica, Bar), Matičar registry, coffin selection, and Orthodox, Catholic, Islamic, or civil rites.',
            disbursementNote: 'Municipal grave plot concession & Komunalno tariffs passed through at cost',
            whatsappMessage:
              'Hello Memorijal d.o.o., I would like a quote for Local Municipal Burial Coordination in Montenegro (DOO Komunalno — From €950).',
          },
          ru: {
            title: 'Координация местных похорон в Черногории (DOO Komunalno)',
            badge: 'Муниципальные кладбища Черногории',
            formattedPrice: `От${NBSP}950${NBSP}€`,
            scope:
              'Полное сопровождение в муниципальных службах DOO Komunalno (Тиват, Котор, Будва, Подгорица, Бар), ЗАГСе, подбор атрибутики и проведение религиозного или гражданского обряда.',
            disbursementNote: 'Тарифы кладбища Komunalno оплачиваются по официальному прейскуранту',
            whatsappMessage:
              'Здравствуйте, Memorijal d.o.o.! Прошу рассчитать смету на координацию местных похорон в Черногории через DOO Komunalno (От 950 €).',
          },
          mne: {
            title: 'Koordinacija lokalne sahrane u Crnoj Gori (DOO Komunalno)',
            badge: 'Opštinska groblja • Komunalno',
            formattedPrice: `Od${NBSP}950${NBSP}€`,
            scope:
              'Kompletna koordinacija sa opštinskim DOO Komunalno (Tivat, Kotor, Budva, Podgorica, Bar), Matičarem, pogrebnom opremom i vjerskim ili građanskim obredom.',
            disbursementNote: 'Grobne takse Komunalnog preduzeća prenose se po zvaničnom cjenovniku',
            whatsappMessage:
              'Poštovani Memorijal d.o.o., molim za ponudu za koordinaciju lokalne sahrane u Crnoj Gori — DOO Komunalno (Od 950 €).',
          },
        },
      },
      {
        id: 'boka_bay_sea_scattering',
        codeNum: '03',
        basePriceEur: 1200,
        targetPath: '/services/local-burial-coordination/',
        schemaName: 'Boka Bay Sea Ash Scattering Ceremony (Yacht Charter & Eco-Floristry)',
        schemaDescription:
          'Starting price for chartered memorial vessel ash scattering in the Bay of Kotor with GPS certificate',
        locales: {
          en: {
            title: 'Boka Bay Sea Ash Scattering Ceremony (Yacht Charter & Eco-Floristry)',
            badge: 'Adriatic Maritime Memorial • GPS Certificate',
            formattedPrice: `From${NBSP}€1,200`,
            scope:
              'Private motor yacht or vessel charter in the Bay of Kotor / open Adriatic, biodegradable urn or eco-floristry, maritime protocol, and official GPS Coordinates Memorial Certificate.',
            disbursementNote: 'Custom vessel class & catering options available on request',
            whatsappMessage:
              'Hello Memorijal d.o.o., I would like a quote for the Boka Bay Sea Ash Scattering Ceremony (From €1,200).',
          },
          ru: {
            title: 'Морская церемония развеивания праха в Боке (фрахт яхты и эко-флористика)',
            badge: 'Морской мемориал • Сертификат GPS',
            formattedPrice: `От${NBSP}1${NBSP}200${NBSP}€`,
            scope:
              'Индивидуальный фрахт яхты или катера в Боко-Которском заливе / открытой Адриатике, биоразлагаемая урна и эко-флористика, морской протокол и памятный сертификат с точными GPS-координатами.',
            disbursementNote: 'Класс судна и число гостей согласуются индивидуально',
            whatsappMessage:
              'Здравствуйте, Memorijal d.o.o.! Интересует морская церемония развеивания праха в Боко-Которском заливе (От 1 200 €).',
          },
          mne: {
            title: 'Ceremonija prosipanja pepela u Boki (najam jahte i eko-floristika)',
            badge: 'Pomorski memorijal • GPS sertifikat',
            formattedPrice: `Od${NBSP}1.200${NBSP}€`,
            scope:
              'Najam plovila/jahte u Bokokotorskom zalivu ili otvorenom moru, biorazgradiva urna, eko-cvjetni aranžman i izdavanje zvaničnog sertifikata sa GPS koordinatama.',
            disbursementNote: 'Klasa plovila i broj članova porodice po izboru klijenta',
            whatsappMessage:
              'Poštovani Memorijal d.o.o., molim za ponudu za ceremoniju prosipanja pepela u Bokokotorskom zalivu (Od 1.200 €).',
          },
        },
      },
      {
        id: 'turnkey_cremation_serbia',
        codeNum: '04',
        basePriceEur: 2200,
        targetPath: '/services/cremation-serbia/',
        schemaName: 'Turnkey Cremation in Serbia (Belgrade / Novi Sad) with Urn Return',
        schemaDescription:
          'Starting price for cross-border transfer to Belgrade or Novi Sad State Crematorium and sealed urn return',
        locales: {
          en: {
            title: 'Turnkey Cremation in Serbia (Belgrade / Novi Sad) with Urn Return',
            badge: 'Official State Crematorium • 3–5 Days',
            formattedPrice: `From${NBSP}€2,200`,
            scope:
              'Hospital collection in Montenegro, bilateral Montenegro/Serbia Sprovodnica permits, licensed partner hearse transfer to Belgrade/Novi Sad State Crematorium, cremation slot, and sealed cabin-compliant urn return.',
            disbursementNote: 'Includes state crematorium tariff & border sanitary clearance',
            whatsappMessage:
              'Hello Memorijal d.o.o., I would like an exact estimate for Turnkey Cremation in Serbia with Urn Return (From €2,200).',
          },
          ru: {
            title: 'Кремация в Сербии (Белград / Нови-Сад) «под ключ» с возвратом урны',
            badge: 'Государственный крематорий • 3–5 дней',
            formattedPrice: `От${NBSP}2${NBSP}200${NBSP}€`,
            scope:
              'Забор тела из морга в ЧГ, двусторонние санитарные пропуски Sprovodnica, доставка спецтранспортом партнера в госкрематорий Белграда/Нови-Сада, кремация и возврат опломбированной урны.',
            disbursementNote: 'Включает государственный тариф крематория и транзитные пошлины',
            whatsappMessage:
              'Здравствуйте, Memorijal d.o.o.! Прошу рассчитать точную смету на кремацию в Сербии «под ключ» с возвратом урны (От 2 200 €).',
          },
          mne: {
            title: 'Kremacija u Srbiji (Beograd / Novi Sad) "ključ u ruke" sa povratom urne',
            badge: 'Državni krematorijum • 3–5 dana',
            formattedPrice: `Od${NBSP}2.200${NBSP}€`,
            scope:
              'Preuzimanje iz kapele u CG, bilateralne Sprovodnice, prevoz licenciranim vozilom do državnog krematorijuma u Beogradu/Novom Sadu, termin kremacije i povrat zapečaćene urne.',
            disbursementNote: 'Uključena taksa državnog krematorijuma i granična dokumentacija',
            whatsappMessage:
              'Poštovani Memorijal d.o.o., molim za proračun za kremaciju u Srbiji "ključ u ruke" sa povratom urne (Od 2.200 €).',
          },
        },
      },
      {
        id: 'regional_overland_repatriation',
        codeNum: '05',
        basePriceEur: 2600,
        targetPath: '/services/repatriation-road/',
        schemaName: 'Regional Overland Repatriation (Serbia, BiH, Croatia, Albania)',
        schemaDescription:
          'Starting price for regional Balkan road repatriation via accredited licensed hearse carrier',
        locales: {
          en: {
            title: 'Regional Overland Repatriation (Serbia, BiH, Croatia, Albania)',
            badge: 'Direct Door-to-Door Balkan Corridor',
            formattedPrice: `From${NBSP}€2,600`,
            scope:
              'Sanitary preparation, hermetic zinc coffin soldering (lemljenje), Republic Sanitary Inspector seal, bilateral consular Sprovodnica, and direct climate-controlled partner hearse delivery.',
            disbursementNote: 'Final distance calculated per exact destination municipality (km)',
            whatsappMessage:
              'Hello Memorijal d.o.o., I would like an exact estimate for Regional Overland Repatriation (From €2,600).',
          },
          ru: {
            title: 'Региональная авторепатриация (Сербия, Босния и Герцеговина, Хорватия, Албания)',
            badge: 'Спецтранспорт по Балканам «от двери до двери»',
            formattedPrice: `От${NBSP}2${NBSP}600${NBSP}€`,
            scope:
              'Санитарная подготовка, герметичная опайка цинкового вкладыша (lemljenje), пломба санитарного инспектора, консульская Sprovodnica и прямая доставка лицензированным спецкатафалком.',
            disbursementNote: 'Итоговый расчет зависит от точного километража до города назначения',
            whatsappMessage:
              'Здравствуйте, Memorijal d.o.o.! Прошу рассчитать точную смету на региональную авторепатриацию по Балканам (От 2 600 €).',
          },
          mne: {
            title: 'Regionalna drumska repatrijacija (Srbija, BiH, Hrvatska, Albanija)',
            badge: 'Direktan prevoz kroz region',
            formattedPrice: `Od${NBSP}2.600${NBSP}€`,
            scope:
              'Sanitarna priprema, hermetičko lemljenje cinka, državna plomba inspektora, konzularne Sprovodnice i direktan prevoz specijalnim vozilom licenciranog partnera.',
            disbursementNote: 'Konačni obračun zavisi od tačne kilometraže do grada odredišta',
            whatsappMessage:
              'Poštovani Memorijal d.o.o., molim za proračun za regionalnu drumsku repatrijaciju (Od 2.600 €).',
          },
        },
      },
      {
        id: 'eu_ukraine_ground_repatriation',
        codeNum: '06',
        basePriceEur: 4200,
        targetPath: '/services/repatriation-road/',
        schemaName: 'EU & Ukraine Cross-Border Ground Repatriation',
        schemaDescription:
          'Starting price for cross-border road repatriation to EU member states and Ukraine',
        locales: {
          en: {
            title: 'EU & Ukraine Cross-Border Ground Repatriation',
            badge: 'Schengen, EU & Ukraine Two-Driver Corridor',
            formattedPrice: `From${NBSP}€4,200`,
            scope:
              'EUR-6 certified two-driver mortuary carrier, full Schengen/EU customs transit clearance (Debeli Brijeg / Horgos), hermetic zinc casket, Apostilled Form C dossier, and Embassy Laissez-Passer.',
            disbursementNote: 'Route-specific highway tolls, ferry & customs transit fees itemized',
            whatsappMessage:
              'Hello Memorijal d.o.o., I would like an exact estimate for EU & Ukraine Cross-Border Ground Repatriation (From €4,200).',
          },
          ru: {
            title: 'Наземная репатриация в страны ЕС и Украину',
            badge: 'Международный коридор ЕС / Шенген / Украина',
            formattedPrice: `От${NBSP}4${NBSP}200${NBSP}€`,
            scope:
              'Спецтранспорт партнера стандарта EUR-6 с экипажем из двух водителей, таможенный транзит ЕС/Шенген, герметичный цинковый гроб, апостилированное досье Формы C и разрешение посольства.',
            disbursementNote: 'Расчет зависит от страны назначения и пограничного коридора',
            whatsappMessage:
              'Здравствуйте, Memorijal d.o.o.! Прошу рассчитать точную смету на наземную репатриацию в ЕС / Украину (От 4 200 €).',
          },
          mne: {
            title: 'Međunarodna drumska repatrijacija u zemlje EU i Ukrajinu',
            badge: 'EU / Šengen i Ukrajina kopneni koridor',
            formattedPrice: `Od${NBSP}4.200${NBSP}€`,
            scope:
              'Sertifikovano vozilo EUR-6 sa dva vozača, carinski tranzit kroz EU/Šengen, hermetički pocinkovani sanduk, Apostille dokumentacija i sprovodnica ambasade.',
            disbursementNote: 'Obračun prema državi odredišta i tranzitnoj ruti',
            whatsappMessage:
              'Poštovani Memorijal d.o.o., molim za proračun za drumsku repatrijaciju u EU / Ukrajinu (Od 4.200 €).',
          },
        },
      },
      {
        id: 'international_air_cargo_hum',
        codeNum: '07',
        basePriceEur: 4900,
        targetPath: '/services/repatriation-air-cargo/',
        schemaName: 'International Air Cargo Repatriation (IATA Cargo HUM / Груз 200)',
        schemaDescription:
          'Starting price for international IATA Cargo HUM air repatriation from Podgorica or Belgrade',
        locales: {
          en: {
            title: 'International Air Cargo Repatriation (IATA Cargo HUM / Груз 200)',
            badge: 'Priority MAWB Air Freight • Worldwide',
            formattedPrice: `From${NBSP}€4,900`,
            scope:
              'Forensic formalin embalming (tanatopraksija), IATA-compliantwooden casket with 0.6–0.8 mm soldered zinc liner & pressure valve, export customs declaration, and priority MAWB booking from TGD / BEG.',
            disbursementNote: 'Airline Cargo HUM volumetric weight tariff billed per official MAWB',
            whatsappMessage:
              'Hello Memorijal d.o.o., I would like an exact estimate for International Air Cargo Repatriation (IATA Cargo HUM — From €4,900).',
          },
          ru: {
            title: 'Международная авиарепатриация (IATA Cargo HUM / Груз 200)',
            badge: 'Приоритетный вылет MAWB • Весь мир',
            formattedPrice: `От${NBSP}4${NBSP}900${NBSP}€`,
            scope:
              'Судебно-медицинское бальзамирование (tanatopraksija), авиационный гроб с оцинкованным вкладышем 0.6–0.8 мм и барометрическим клапаном, таможенная декларация и бронирование авианакладной MAWB из TGD / BEG.',
            disbursementNote: 'Авиатариф IATA HUM рассчитывается по весу и объему согласно MAWB',
            whatsappMessage:
              'Здравствуйте, Memorijal d.o.o.! Прошу рассчитать точную смету на международную авиарепатриацию IATA Cargo HUM / Груз 200 (От 4 900 €).',
          },
          mne: {
            title: 'Međunarodna avio-repatrijacija (IATA Cargo HUM / Gruz 200)',
            badge: 'Prioritetni avio-kargo MAWB • Cijeli svijet',
            formattedPrice: `Od${NBSP}4.900${NBSP}€`,
            scope:
              'Sudsko-medicinsko balzamovanje (tanatopraksija), avio-sanduk sa pocinkovanim uloškom 0.6–0.8 mm i ventilom, izvozna carinska deklaracija i MAWB rezervacija sa aerodroma TGD / BEG.',
            disbursementNote: 'Avio-tarifa IATA HUM obračunava se prema težini i zapremini po MAWB listu',
            whatsappMessage:
              'Poštovani Memorijal d.o.o., molim za proračun za međunarodnu avio-repatrijaciju IATA Cargo HUM (Od 4.900 €).',
          },
        },
      },
    ],
  },
  {
    tierId: 'tier2',
    badge: {
      en: 'LEGAL, INSURANCE B2B & FAMILY CONCIERGE',
      ru: 'ЮРИДИЧЕСКИЙ, СТРАХОВОЙ И СЕМЕЙНЫЙ КОНСЬЕРЖ',
      mne: 'PRAVNI, OSIGURAVAJUĆI B2B I PORODIČNI KONSIJERŽ',
    },
    heading: {
      en: 'Apostille Legalization, Insurer GOP Billing & Family Support',
      ru: 'Легализация документов, прямой биллинг по GOP и поддержка семьи',
      mne: 'Apostille legalizacija, direktna GOP naplata i podrška porodici',
    },
    subtitle: {
      en: 'Executed under notarized Power of Attorney (Punomoćje) or direct Guarantee of Payment (GOP) from international travel insurers.',
      ru: 'Выполняется по нотариальной доверенности (Punomoćje) либо по прямому гарантийному письму (GOP) международных страховых и ассистанс-компаний.',
      mne: 'Realizuje se po ovjerenom punomoćju (Punomoćje) ili direktnoj garanciji plaćanja (GOP) međunarodnih osiguravajućih kuća.',
    },
    items: [
      {
        id: 'apostille_court_translations',
        codeNum: '08',
        basePriceEur: 250,
        targetPath: '/services/legal-consular/',
        schemaName: 'Apostille, Court-Certified Translations (Sudski tumač) & Embassy Dossier',
        schemaDescription:
          'Starting price for Hague Apostille stamps, sworn court translations, and duplicate Form C death extracts for probate',
        locales: {
          en: {
            title: 'Apostille, Court-Certified Translations (Sudski tumač) & Embassy Dossier',
            badge: 'Probate, Banking & Consular Legalization',
            formattedPrice: `From${NBSP}€250`,
            scope:
              'Procurement of extra original Form C death certificates, Basic Court Hague Apostille verification, sworn translations (EN / RU / DE / FR / PL / UA), and DHL dispatch for inheritance/banking abroad.',
            disbursementNote: 'Per-document court & interpreter tariffs itemized on receipt',
            whatsappMessage:
              'Hello Memorijal d.o.o., I need a quote for Apostille, Court-Certified Translations (Sudski tumač) & Embassy Dossier (From €250).',
          },
          ru: {
            title: 'Апостиль, судебные переводы (Sudski tumač) и консульское досье',
            badge: 'Для наследства, банков и посольств',
            formattedPrice: `От${NBSP}250${NBSP}€`,
            scope:
              'Истребование дополнительных оригиналов свидетельства о смерти (Форма C), проставление судебного штампа Апостиль, заверенные переводы (Sudski tumač) и экспресс-отправка наследникам.',
            disbursementNote: 'Судебные пошлины и полистный перевод оплачиваются по квитанциям',
            whatsappMessage:
              'Здравствуйте, Memorijal d.o.o.! Нужен расчет стоимости на Апостиль, судебные переводы Sudski tumač и досье (От 250 €).',
          },
          mne: {
            title: 'Apostille ovjera, prevodi sudskog tumača i konzularni dosije',
            badge: 'Za ostavinski postupak, banke i ambasade',
            formattedPrice: `Od${NBSP}250${NBSP}€`,
            scope:
              'Pribavljanje dodatnih originala Izvoda iz matične knjige umrlih (Obrazac C), ovjera pečatom Apostille u osnovnom sudu, prevodi sudskog tumača i slanje nasljednicima.',
            disbursementNote: 'Sudske takse i prevod po stranici obračunavaju se po tarifi',
            whatsappMessage:
              'Poštovani Memorijal d.o.o., molim za ponudu za Apostille ovjeru, prevode sudskog tumača i konzularni dosije (Od 250 €).',
          },
        },
      },
      {
        id: 'insurer_gop_direct_billing',
        codeNum: '09',
        basePriceEur: 0,
        isGopZeroFee: true,
        targetPath: '/assistance/direct-insurer-invoice/',
        schemaName: 'Insurer Guarantee of Payment (GOP) Direct Case Management',
        schemaDescription:
          'Cashless repatriation and cremation case management under international travel insurance Guarantee of Payment (GOP)',
        locales: {
          en: {
            title: 'Insurer Guarantee of Payment (GOP) Direct Case Management',
            badge: 'Allianz • AXA • Europ Assistance • Balt • Savitar',
            formattedPrice: `From${NBSP}€0 for family (Direct GOP Billing)`,
            scope:
              'Complete medical report retrieval, policy verification, and direct B2B SEPA/SWIFT EFI QR fiscal invoicing to your travel insurer or assistance provider with zero upfront cost to the family.',
            disbursementNote: '100% settled directly with the insurer within approved policy limit',
            whatsappMessage:
              'Hello Memorijal d.o.o., we have a valid travel insurance policy and need Direct GOP Case Management (From €0 for family).',
          },
          ru: {
            title: 'Прямое ведение дела по гарантии страховой компании (GOP)',
            badge: 'Allianz • AXA • Europ Assistance • Balt • Savitar',
            formattedPrice: `От${NBSP}0${NBSP}€ для семьи (прямой биллинг по GOP)`,
            scope:
              'Запрос медицинских заключений для страховой, согласование сметы с ассистансом и выставление прямого фискального счета EFI QR (SEPA/SWIFT) без предварительных затрат со стороны семьи.',
            disbursementNote: '100% прямая оплата страховой компанией в рамках лимита полиса',
            whatsappMessage:
              'Здравствуйте, Memorijal d.o.o.! У нас есть страховой полис, требуется прямое ведение дела по гарантии GOP (От 0 € для семьи).',
          },
          mne: {
            title: 'Direktno vođenje slučaja po garanciji osiguranja (GOP)',
            badge: 'Allianz • AXA • Europ Assistance • Balt • Savitar',
            formattedPrice: `Od${NBSP}0${NBSP}€ za porodicu (Direktna GOP naplata)`,
            scope:
              'Pribavljanje medicinske dokumentacije za osiguravača, usaglašavanje troškovnika sa asistentskom kućom i direktno EFI QR fakturisanje bez troškova za porodicu.',
            disbursementNote: '100% direktno pokriće od strane osiguravajuće kuće u okviru polise',
            whatsappMessage:
              'Poštovani Memorijal d.o.o., posjedujemo polisu putnog osiguranja i potrebna nam je direktna GOP realizacija (Od 0 € za porodicu).',
          },
        },
      },
      {
        id: 'family_travel_concierge',
        codeNum: '10',
        basePriceEur: 350,
        targetPath: '/services/',
        schemaName: 'Family Travel Concierge, Live Farewell Stream & Memorial Catering',
        schemaDescription:
          'Starting price for family airport transfers, chapel viewing, encrypted live farewell streaming, and memorial reception coordination',
        locales: {
          en: {
            title: 'Family Travel Concierge, Live Farewell Stream & Memorial Catering',
            badge: 'In-Person or Remote Farewell Support',
            formattedPrice: `From${NBSP}€350`,
            scope:
              'Airport meet-and-greet at TIV/TGD, hotel accommodation booking, private chapel viewing, encrypted HD live video stream for relatives abroad, and memorial reception catering.',
            disbursementNote: 'Hotel rooms, venue rental & catering menus passed through at cost',
            whatsappMessage:
              'Hello Memorijal d.o.o., I would like a quote for Family Travel Concierge, Live Farewell Stream & Memorial Catering (From €350).',
          },
          ru: {
            title: 'Семейный тревел-консьерж, онлайн-трансляция прощания и поминальный обед',
            badge: 'Очное или дистанционное прощание',
            formattedPrice: `От${NBSP}350${NBSP}€`,
            scope:
              'Встреча родственников в аэропортах TIV/TGD, размещение в отеле, прощание в капелле, закрытая зашифрованная видеотрансляция церемонии для близких за рубежом и организация поминальной трапезы.',
            disbursementNote: 'Отель, зал и меню ресторана оплачиваются по чекам заведений',
            whatsappMessage:
              'Здравствуйте, Memorijal d.o.o.! Интересует семейный консьерж, онлайн-трансляция прощания и организация поминального обеда (От 350 €).',
          },
          mne: {
            title: 'Porodični putni konsijerž, video-prenos oproštaja i memorijalni ručak',
            badge: 'Podrška porodici i online prenos',
            formattedPrice: `Od${NBSP}350${NBSP}€`,
            scope:
              'Doček srodnika na aerodromima TIV/TGD, smještaj, termin oproštaja u kapeli, zaštićeni video-prenos ceremonije za rodbinu u inostranstvu i organizacija memorijalnog ručka.',
            disbursementNote: 'Troškovi hotela i restorana prenose se po stvarnom računu',
            whatsappMessage:
              'Poštovani Memorijal d.o.o., molim za ponudu za porodični konsijerž, video-prenos oproštaja i memorijalni ručak (Od 350 €).',
          },
        },
      },
    ],
  },
  {
    tierId: 'tier3',
    badge: {
      en: 'EXPAT ESTATE, VEHICLE, PET & DIGITAL LEGACY',
      ru: 'ИМУЩЕСТВО ЭКСПАТОВ, АВТО, ПИТОМЦЫ И ЦИФРОВОЙ СЕЙФ',
      mne: 'IMOVINA STRANACA, VOZILA, LJUBIMCI I DIGITALNI SEF',
    },
    heading: {
      en: 'Expat Property Handover, Vehicle Custody, Pets & Pre-Need Digital Safe',
      ru: 'Опись недвижимости, хранение авто, возврат питомцев и Цифровой сейф',
      mne: 'Primopredaja nekretnina, čuvanje vozila, ljubimci i Digitalni sef',
    },
    subtitle: {
      en: 'Specialized non-medical administrative & legal services under KD 82.99 protecting expat assets and heirs in Montenegro.',
      ru: 'Специализированные не-медицинские административные и юридические услуги по коду KD 82.99 для защиты активов и наследников резидентов в Черногории.',
      mne: 'Specijalizovane administrativne i pravne usluge pod šifrom KD 82.99 za zaštitu imovine i nasljednika stranih državljana u Crnoj Gori.',
    },
    items: [
      {
        id: 'expat_estate_clearance',
        codeNum: '11',
        basePriceEur: 490,
        targetPath: '/services/local-burial-coordination/',
        schemaName: 'Expat Estate Clearance, Inventory & DHL Personal Effects Dispatch',
        schemaDescription:
          'Starting price for apartment inventorying, lease/utility closure, and insured DHL dispatch of personal effects to heirs',
        locales: {
          en: {
            title: 'Expat Estate Clearance, Inventory & DHL Personal Effects Dispatch',
            badge: 'Apartment Handover & Heir Inventory',
            formattedPrice: `From${NBSP}€490`,
            scope:
              'Video-documented inventory of personal effects in rented or owned residences (Tivat, Kotor, Budva, Podgorica), insured DHL dispatch of valuables/documents to heirs, utility & lease termination.',
            disbursementNote: 'DHL shipping, packing materials & cleaning billed per carrier receipt',
            whatsappMessage:
              'Hello Memorijal d.o.o., I need a quote for Expat Estate Clearance, Inventory & DHL Personal Effects Dispatch (From €490).',
          },
          ru: {
            title: 'Опись имущества экспата, закрытие аренды и отправка личных вещей DHL',
            badge: 'Передача апартаментов и ценностей наследникам',
            formattedPrice: `От${NBSP}490${NBSP}€`,
            scope:
              'Акт описи имущества с фото/видеофиксацией в апартаментах (Тиват, Котор, Будва, Подгорица), застрахованная отправка ценностей, ноутбуков и документов наследникам через DHL, расторжение аренды и ЖКУ.',
            disbursementNote: 'Тарифы DHL, упаковка и клининг оплачиваются по чекам подрядчиков',
            whatsappMessage:
              'Здравствуйте, Memorijal d.o.o.! Прошу рассчитать смету на опись имущества экспата, закрытие аренды и отправку вещей DHL (От 490 €).',
          },
          mne: {
            title: 'Popis imovine stranaca, raskid zakupa i DHL slanje ličnih stvari',
            badge: 'Primopredaja stana i zaštita dragocjenosti',
            formattedPrice: `Od${NBSP}490${NBSP}€`,
            scope:
              'Zapisnički popis ličnih stvari uz foto/video dokumentaciju u stanu (Tivat, Kotor, Budva, Podgorica), osigurano DHL slanje dokumenata i dragocjenosti nasljednicima, odjava zakupa i komunalija.',
            disbursementNote: 'Troškovi DHL-a, pakovanja i čišćenja prenose se po računima',
            whatsappMessage:
              'Poštovani Memorijal d.o.o., molim za ponudu za popis imovine, raskid zakupa stana i DHL slanje stvari nasljednicima (Od 490 €).',
          },
        },
      },
      {
        id: 'vehicle_yacht_custody',
        codeNum: '12',
        basePriceEur: 390,
        targetPath: '/services/local-burial-coordination/',
        schemaName: 'Vehicle / Yacht Custody Storage, EU Driver Transfer or Brokerage',
        schemaDescription:
          'Starting price for guarded vehicle/vessel storage, customs custody, and EU driver return or brokerage coordination',
        locales: {
          en: {
            title: 'Vehicle / Yacht Custody Storage, EU Driver Transfer or Brokerage',
            badge: 'Guarded Parking, Marina & EU Return',
            formattedPrice: `From${NBSP}€390`,
            scope:
              'Immediate retrieval of the deceased’s car or vessel, placement in 24/7 guarded parking or marina berth, customs regime protection, and licensed driver return to the EU or local brokerage.',
            disbursementNote: 'Daily parking/marina fees & driver fuel/tolls passed through at cost',
            whatsappMessage:
              'Hello Memorijal d.o.o., I need a quote for Vehicle / Yacht Custody Storage or EU Driver Transfer (From €390).',
          },
          ru: {
            title: 'Охраняемое хранение авто / яхты, перегон в ЕС или брокерское сопровождение',
            badge: 'Автостоянка, марина и возврат в ЕС',
            formattedPrice: `От${NBSP}390${NBSP}€`,
            scope:
              'Эвакуация и постановка автомобиля или катера на круглосуточно охраняемый паркинг / в марину, контроль таможенного режима временного ввоза и перегон лицензированным водителем в ЕС либо продажа по поручению.',
            disbursementNote: 'Суточная стоянка, топливо и дорожные сборы — по фактическим чекам',
            whatsappMessage:
              'Здравствуйте, Memorijal d.o.o.! Интересует хранение автомобиля / яхты и координация перегона в ЕС (От 390 €).',
          },
          mne: {
            title: 'Obezbijeđeno čuvanje vozila / jahte, prevoz u EU ili posredovanje',
            badge: 'Parking nadzor, marina i povrat u EU',
            formattedPrice: `Od${NBSP}390${NBSP}€`,
            scope:
              'Preuzimanje automobila ili plovila, smještaj na obezbijeđeni parking 24/7 ili u marinu, regulisanje carinskog statusa i organizacija povratka vozila u EU putem licenciranog vozača.',
            disbursementNote: 'Troškovi parkinga/marine, goriva i putarina po stvarnom obračunu',
            whatsappMessage:
              'Poštovani Memorijal d.o.o., molim za ponudu za čuvanje vozila / jahte i koordinaciju povratka u EU (Od 390 €).',
          },
        },
      },
      {
        id: 'pet_relocation_clearance',
        codeNum: '13',
        basePriceEur: 650,
        targetPath: '/services/local-burial-coordination/',
        schemaName: 'International Pet Relocation & Veterinary Passport Clearance',
        schemaDescription:
          'Starting price for temporary pet boarding, microchip/rabies certificate verification, and international pet return to relatives',
        locales: {
          en: {
            title: 'International Pet Relocation & Veterinary Passport Clearance',
            badge: 'Veterinary Care & Safe Family Reunion',
            formattedPrice: `From${NBSP}€650`,
            scope:
              'Emergency pickup and warm boarding for dogs/cats left behind, veterinary clinical check, microchip & rabies titer verification, export health certificate, and accompanied flight/road transport to heirs.',
            disbursementNote: 'Veterinary clinic fees, IATA crate & airline pet ticket at cost',
            whatsappMessage:
              'Hello Memorijal d.o.o., I need a quote for International Pet Relocation & Veterinary Passport Clearance (From €650).',
          },
          ru: {
            title: 'Международная перевозка домашних питомцев и ветеринарный паспорт',
            badge: 'Передержка, ветконтроль и доставка семье',
            formattedPrice: `От${NBSP}650${NBSP}€`,
            scope:
              'Экстренный забор и теплая передержка собак/кошек усопшего, осмотр у ветеринара, проверка микрочипа и титров антител, экспортный ветсертификат и авиа/авто доставка питомца родственникам за границу.',
            disbursementNote: 'Услуги ветклиники, бокс IATA и авиабилет питомца — по чекам',
            whatsappMessage:
              'Здравствуйте, Memorijal d.o.o.! Нужна помощь с оформлением ветпаспорта и перевозкой домашнего питомца семье за границу (От 650 €).',
          },
          mne: {
            title: 'Međunarodni prevoz kućnih ljubimaca i veterinarski pasoš',
            badge: 'Privremeni smještaj i bezbjedan povratak',
            formattedPrice: `Od${NBSP}650${NBSP}€`,
            scope:
              'Hitno preuzimanje i briga o kućnim ljubimcima, veterinarski pregled, provjera mikročipa i titra antitijela, izvozni veterinarski sertifikat i avionski ili drumski prevoz do porodice u inostranstvu.',
            disbursementNote: 'Troškovi veterinara, IATA transportera i karte po stvarnom računu',
            whatsappMessage:
              'Poštovani Memorijal d.o.o., molim za ponudu za veterinarsku dokumentaciju i prevoz kućnog ljubimca porodici (Od 650 €).',
          },
        },
      },
      {
        id: 'pre_need_digital_safe_capsules',
        codeNum: '14',
        basePriceEur: 190,
        targetPath: '/services/',
        anchorId: 'pre-need-vault',
        schemaName: 'Pre-Need Lifetime Mandate, Protected Legacy Instructions & Time Capsules',
        schemaDescription:
          'Starting price for lifetime legal directives (Ugovor o nalogu, čl. 842–863 ZOO CG), protected archive of sealed instructions for designated heirs, and scheduled time capsules',
        locales: {
          en: {
            title: 'Pre-Need Lifetime Mandate, Protected Legacy Instructions & Time Capsules',
            badge: 'Lifetime Mandate • Protected Archive',
            formattedPrice: `From${NBSP}€190`,
            scope:
              'Lifetime legal directives held under a civil mandate (Ugovor o nalogu, čl. 842–863 ZOO CG), protected archive of sealed instructions and legacy records transmitted to designated heirs strictly upon presentation of an official death certificate, plus scheduled video/letter time capsules.',
            disbursementNote: 'One-time setup or annual fiduciary custody mandate',
            whatsappMessage:
              'Hello Memorijal d.o.o., I would like information and a quote for the Pre-Need Lifetime Mandate, Protected Legacy Instructions & Time Capsules (From €190).',
          },
          ru: {
            title: 'Прижизненное волеизъявление (Pre-Need), защищённый архив инструкций и Капсулы времени',
            badge: 'Прижизненный мандат • Защищённый архив',
            formattedPrice: `От${NBSP}190${NBSP}€`,
            scope:
              'Прижизненные юридические распоряжения по договору поручения (Ugovor o nalogu, čl. 842–863 ZOO CG), защищённый архив запечатанных инструкций и памятных материалов для передачи назначенным наследникам строго после предъявления официального свидетельства о смерти, а также отложенная доставка видео-наследия и писем близким.',
            disbursementNote: 'Единоразовая регистрация поручения и защищенного архива инструкций',
            whatsappMessage:
              'Здравствуйте, Memorijal d.o.o.! Интересует Прижизненное волеизъявление (Pre-Need), защищённый архив инструкций и Капсулы времени (От 190 €).',
          },
          mne: {
            title: 'Pre-Need doživotno punomoćje, zaštićena arhiva uputstava i Vremenske kapsule',
            badge: 'Doživotni nalog • Zaštićena arhiva',
            formattedPrice: `Od${NBSP}190${NBSP}€`,
            scope:
              'Doživotne pravne instrukcije po ugovoru o nalogu (Ugovor o nalogu, čl. 842–863 ZOO CG), zaštićena arhiva zapečaćenih uputstava koja se predaju imenovanim nasljednicima isključivo po podnošenju zvaničnog izvoda iz matične knjige umrlih, kao i odložena isporuka video-poruka porodici.',
            disbursementNote: 'Jednokratna uspostava ugovora o nalogu i zaštićene arhive uputstava',
            whatsappMessage:
              'Poštovani Memorijal d.o.o., interesuje me Pre-Need doživotno punomoćje, zaštićena arhiva uputstava i Vremenske kapsule (Od 190 €).',
          },
        },
      },
    ],
  },
];

export const ALL_SERVICE_TARIFF_ITEMS: FullServiceTariffItem[] =
  FULL_SERVICE_PRICING_TIERS.flatMap((tier) => tier.items);

export function buildPackageWhatsAppHref(
  pkg: PricingPackageItem,
  locale: LocaleSlug
): string {
  const msg = pkg.locales[locale].whatsappMessage;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export function buildTariffItemWhatsAppHref(
  item: FullServiceTariffItem,
  locale: LocaleSlug
): string {
  const msg = item.locales[locale].whatsappMessage;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
