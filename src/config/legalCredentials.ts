import type { LocaleSlug } from '../data/seo-routes';

export const PHONE_DISPLAY = '+382 68 934 904';
export const PHONE_E164 = '+38268934904';
export const PHONE_HREF = 'tel:+38268934904';
export const WHATSAPP_RAW = '38268934904';
export const OFFICIAL_EMAIL = 'office@memorijal.me';
export const EMAIL_HREF = 'mailto:office@memorijal.me';

export const LEGAL_CREDENTIALS = {
  COMPANY_NAME: 'Memorijal d.o.o.',
  HEADQUARTERS: 'Tivat, Crna Gora (Montenegro)',
  ACTIVITY_CODES:
    'KD 2010: 82.99 (Pretežna djelatnost — Ostale poslovne pomoćne uslužne djelatnosti) & 52.29 (Ostale prateće djelatnosti u saobraćaju / špedicija)',
  ACTIVITY_CODES_SHORT: 'KD 82.99 / 52.29',
  /**
   * Set to the issued PIB string once CRPS Podgorica registration is finalized,
   * or leave null to display the compliant pending-registration notice.
   */
  ISSUED_PIB: null as string | null,
  CRPS_STATUS: {
    en: 'Registration with CRPS Podgorica in progress / PIB & EFI fiscalization assigned upon issuance',
    ru: 'Регистрация в CRPS Подгорицы в процессе / PIB и фискализация EFI присваиваются по факту выдачи',
    mne: 'Registracija kod CRPS Podgorica u toku / PIB i EFI fiskalizacija se dodjeljuju po izdavanju',
  } satisfies Record<LocaleSlug, string>,
  VAT_STATUS: {
    en: 'Not a VAT (PDV) payer pursuant to Art. 42 of the Law on Value Added Tax of Montenegro (Zakon o porezu na dodatu vrijednost)',
    ru: 'Не является плательщиком НДС (PDV) согласно ст. 42 Закона о налоге на добавленную стоимость Черногории (Zakon o porezu na dodatu vrijednost)',
    mne: 'Nije obveznik PDV-a shodno članu 42 Zakona o porezu na dodatu vrijednost Crne Gore',
  } satisfies Record<LocaleSlug, string>,
  EFFECTIVE_DATE: {
    en: 'November 2026',
    ru: 'Ноябрь 2026 г.',
    mne: 'Novembar 2026.',
  } satisfies Record<LocaleSlug, string>,
} as const;

export function getCrpsPibDisplay(locale: LocaleSlug): string {
  if (LEGAL_CREDENTIALS.ISSUED_PIB) {
    return `PIB: ${LEGAL_CREDENTIALS.ISSUED_PIB}`;
  }
  return LEGAL_CREDENTIALS.CRPS_STATUS[locale];
}

