import { Language, WHATSAPP_NUMBER } from '../i18n/translations';
import { LocaleSlug } from './seo-routes';

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

const NBSP = '\u00A0';

/**
 * Formats a numeric EUR base amount into a compliant, open-ended "Starting From" string
 * without upper ceiling boundaries, using non-breaking spaces according to locale.
 */
export function formatStartingPrice(
  amount: number,
  localeInput: LocaleSlug | Language
): string {
  const norm = localeInput.toLowerCase() as LocaleSlug;
  if (norm === 'ru') {
    const formattedNum =
      amount >= 1000
        ? `${Math.floor(amount / 1000)}${NBSP}${String(amount % 1000).padStart(3, '0')}`
        : String(amount);
    return `От${NBSP}${formattedNum}${NBSP}€`;
  }
  if (norm === 'mne') {
    const formattedNum =
      amount >= 1000
        ? `${Math.floor(amount / 1000)}.${String(amount % 1000).padStart(3, '0')}`
        : String(amount);
    return `Od${NBSP}${formattedNum}${NBSP}€`;
  }
  // English ('en')
  const formattedNum = amount.toLocaleString('en-US');
  return `From${NBSP}€${formattedNum}`;
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
    basePriceEur: 1850,
    schemaName: 'Turnkey Cremation in Belgrade',
    schemaDescription:
      'Starting price for cross-border transfer, cremation, and urn return',
    locales: {
      en: {
        title: 'Belgrade / Novi Sad Cremation Package ("Turnkey")',
        badge: 'Most Requested • Official State Crematorium',
        formattedPrice: `From${NBSP}€1,850`,
        subtext:
          'Includes morgue transfer, cross-border sanitary transit (Sprovodnica), cremation slot, and return of urn.',
        clarification: PRICING_CLARIFICATION_NOTE.en,
        ctaLabel: PRICING_CTA_LABEL.en,
        whatsappMessage:
          'Hello Memorijal d.o.o., I would like to request an exact estimate for the Belgrade/Novi Sad Turnkey Cremation Package (starting from €1,850).',
      },
      ru: {
        title: 'Пакет кремации в Белграде / Нови-Саде («Под ключ»)',
        badge: 'Государственный крематорий • Возврат урны',
        formattedPrice: `От${NBSP}1${NBSP}850${NBSP}€`,
        subtext:
          'Включает трансфер из морга, санитарный пропуск через границу (Sprovodnica), кремацию и возврат опечатанной урны.',
        clarification: PRICING_CLARIFICATION_NOTE.ru,
        ctaLabel: PRICING_CTA_LABEL.ru,
        whatsappMessage:
          'Здравствуйте, Memorijal d.o.o.! Прошу рассчитать точную смету по пакету кремации в Белграде «под ключ» (начальная оценка от 1 850 €).',
      },
      mne: {
        title: 'Paket kremacije u Beogradu / Novom Sadu ("Ključ u ruke")',
        badge: 'Državni krematorijum • Povrat urne',
        formattedPrice: `Od${NBSP}1.850${NBSP}€`,
        subtext:
          'Uključuje preuzimanje iz mrtvačnice, prekogranični sanitarni tranzit (Sprovodnica), termin kremacije i povrat urne.',
        clarification: PRICING_CLARIFICATION_NOTE.mne,
        ctaLabel: PRICING_CTA_LABEL.mne,
        whatsappMessage:
          'Poštovani Memorijal d.o.o., interesuje me paket kremacije u Beogradu "ključ u ruke" (početna procjena od 1.850 €). Molim za precizan proračun.',
      },
    },
  },
  {
    id: 'regional_road',
    basePriceEur: 2400,
    schemaName: 'Regional Road Repatriation (Serbia, BiH, North Macedonia)',
    schemaDescription:
      'Starting price for regional Balkan road repatriation, hermetic soldering, and consular transit permits',
    locales: {
      en: {
        title:
          'Regional Road Repatriation (Serbia / Bosnia & Herzegovina / North Macedonia)',
        badge: 'Direct Door-to-Door Balkan Hearse',
        formattedPrice: `From${NBSP}€2,400`,
        subtext:
          'Fixed rate base + per-km route calculation, hermetic soldering, consular transit permits.',
        clarification: PRICING_CLARIFICATION_NOTE.en,
        ctaLabel: PRICING_CTA_LABEL.en,
        whatsappMessage:
          'Hello Memorijal d.o.o., I would like to request an exact estimate for Regional Road Repatriation (starting from €2,400).',
      },
      ru: {
        title:
          'Региональная авторепатриация (Сербия / Босния и Герцеговина / Северная Македония)',
        badge: 'Спецтранспорт «от двери до двери»',
        formattedPrice: `От${NBSP}2${NBSP}400${NBSP}€`,
        subtext:
          'Базовый фиксированный тариф + расчет за км маршрута, герметичная опайка цинка, транзитные консульские разрешения.',
        clarification: PRICING_CLARIFICATION_NOTE.ru,
        ctaLabel: PRICING_CTA_LABEL.ru,
        whatsappMessage:
          'Здравствуйте, Memorijal d.o.o.! Интересует региональная авторепатриация по Балканам (начальная оценка от 2 400 €). Прошу рассчитать точную смету.',
      },
      mne: {
        title:
          'Regionalna drumska repatrijacija (Srbija / Bosna i Hercegovina / Sjeverna Makedonija)',
        badge: 'Direktni prevoz specijalnim vozilom',
        formattedPrice: `Od${NBSP}2.400${NBSP}€`,
        subtext:
          'Fiksna osnovica + obračun po kilometraži rute, hermetičko lemljenje sanduka i konzularne tranzitne dozvole.',
        clarification: PRICING_CLARIFICATION_NOTE.mne,
        ctaLabel: PRICING_CTA_LABEL.mne,
        whatsappMessage:
          'Poštovani Memorijal d.o.o., interesuje me regionalna drumska repatrijacija (početna procjena od 2.400 €). Molim za precizan proračun.',
      },
    },
  },
  {
    id: 'eu_ground',
    basePriceEur: 3800,
    schemaName:
      'EU Cross-Border Ground Repatriation (Germany, Austria, Poland, Hungary)',
    schemaDescription:
      'Starting price for certified international hearse, EUR-6 customs transit compliance, and multilingual dossier',
    locales: {
      en: {
        title:
          'EU Cross-Border Ground Repatriation (Germany, Austria, Poland, Hungary)',
        badge: 'Schengen & EU Overland Corridor',
        formattedPrice: `From${NBSP}€3,800`,
        subtext:
          'Certified international hearse, EUR-6 customs transit compliance, multilingual dossier.',
        clarification: PRICING_CLARIFICATION_NOTE.en,
        ctaLabel: PRICING_CTA_LABEL.en,
        whatsappMessage:
          'Hello Memorijal d.o.o., I would like to request an exact estimate for EU Cross-Border Ground Repatriation (starting from €3,800).',
      },
      ru: {
        title:
          'Наземная репатриация в страны ЕС (Германия, Австрия, Польша, Венгрия)',
        badge: 'Международный коридор ЕС / Шенген',
        formattedPrice: `От${NBSP}3${NBSP}800${NBSP}€`,
        subtext:
          'Сертифицированный международный катафалк EUR-6, соблюдение таможенного транзита ЕС, многоязычное досье.',
        clarification: PRICING_CLARIFICATION_NOTE.ru,
        ctaLabel: PRICING_CTA_LABEL.ru,
        whatsappMessage:
          'Здравствуйте, Memorijal d.o.o.! Интересует наземная репатриация в страны ЕС (начальная оценка от 3 800 €). Прошу рассчитать точную смету.',
      },
      mne: {
        title:
          'Međunarodna drumska repatrijacija u EU (Njemačka, Austrija, Poljska, Mađarska)',
        badge: 'EU / Šengen kopneni koridor',
        formattedPrice: `Od${NBSP}3.800${NBSP}€`,
        subtext:
          'Sertifikovano međunarodno pogrebno vozilo EUR-6, carinska usklađenost za tranzit kroz EU i višejezični dosije.',
        clarification: PRICING_CLARIFICATION_NOTE.mne,
        ctaLabel: PRICING_CTA_LABEL.mne,
        whatsappMessage:
          'Poštovani Memorijal d.o.o., interesuje me drumska repatrijacija u zemlje EU (početna procjena od 3.800 €). Molim za precizan proračun.',
      },
    },
  },
  {
    id: 'air_cargo',
    basePriceEur: 4500,
    schemaName: 'International Air Cargo Repatriation (UK, EU, CIS / Worldwide)',
    schemaDescription:
      'Starting price for IATA HUM cargo booking, air coffin zinc liner, and consular clearance at Podgorica or Belgrade',
    locales: {
      en: {
        title:
          'International Air Cargo Repatriation (UK, EU, CIS / Worldwide)',
        badge: 'IATA Cargo HUM • Priority Air Waybill',
        formattedPrice: `From${NBSP}€4,500`,
        subtext:
          'IATA HUM cargo booking, air coffin zinc liner, consular clearance at Podgorica / Belgrade.',
        clarification: PRICING_CLARIFICATION_NOTE.en,
        ctaLabel: PRICING_CTA_LABEL.en,
        whatsappMessage:
          'Hello Memorijal d.o.o., I would like to request an exact estimate for International Air Cargo HUM Repatriation (starting from €4,500).',
      },
      ru: {
        title:
          'Международная авиарепатриация Cargo HUM (Великобритания, ЕС, СНГ / Весь мир)',
        badge: 'Авиакарго IATA HUM • Приоритетный вылет',
        formattedPrice: `От${NBSP}4${NBSP}500${NBSP}€`,
        subtext:
          'Бронирование авиакарго IATA HUM, авиационный гроб с цинковым вкладышем, консульское оформление в Подгорице / Белграде.',
        clarification: PRICING_CLARIFICATION_NOTE.ru,
        ctaLabel: PRICING_CTA_LABEL.ru,
        whatsappMessage:
          'Здравствуйте, Memorijal d.o.o.! Интересует международная авиарепатриация Cargo HUM (начальная оценка от 4 500 €). Прошу рассчитать точную смету.',
      },
      mne: {
        title:
          'Međunarodna avio-kargo repatrijacija (UK, EU, ZND / Cijeli svijet)',
        badge: 'IATA Cargo HUM • Prioritetni let',
        formattedPrice: `Od${NBSP}4${NBSP}500${NBSP}€`,
        subtext:
          'IATA HUM kargo rezervacija, avio-sanduk sa pocinkovanim uloškom, konzularna ovjera u Podgorici / Beogradu.',
        clarification: PRICING_CLARIFICATION_NOTE.mne,
        ctaLabel: PRICING_CTA_LABEL.mne,
        whatsappMessage:
          'Poštovani Memorijal d.o.o., interesuje me međunarodna avio-kargo repatrijacija (početna procjena od 4 500 €). Molim za precizan proračun.',
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

export function buildPackageWhatsAppHref(
  pkg: PricingPackageItem,
  locale: LocaleSlug
): string {
  const msg = pkg.locales[locale].whatsappMessage;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

