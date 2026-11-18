import type { SeoRouteEntry, LocalizedPageData } from './seo-routes.ts';

function makeLegalPageData(
  metaTitle: string,
  metaDescription: string,
  keywords: string[],
  breadcrumbLabel: string,
  eyebrow: string,
  h1: string,
  heroSubtitle: string
): LocalizedPageData {
  return {
    metaTitle,
    metaDescription,
    keywords,
    breadcrumbLabel,
    eyebrow,
    h1,
    heroSubtitle,
    whatsappPrefill:
      'Hello Memorijal d.o.o., I have a legal/compliance question regarding international repatriation coordination.',
    emergencyBannerText: 'Memorijal d.o.o. • Tivat, Montenegro • KD 82.99',
    explainerHeading: h1,
    explainerIntro: heroSubtitle,
    walkthroughSteps: [],
    matrixHeading: 'Statutory Compliance Summary',
    specs: {
      transitTime: '24/7 Duty Coordination',
      transportMode: 'Dispatched Licensed Partner Carriers (No In-House Fleet)',
      consularTimeframe: 'Per Embassy & Sanitary Inspection Schedules',
      embassyJurisdiction: 'Montenegro Jurisdiction (Osnovni sud u Kotoru / Privredni sud CG)',
      morgueCatchment: 'All Montenegro Municipalities',
      requiredDocuments: ['Mandate Agreement / Notarized Punomoćje'],
      receivingRequirements: ['Governing Law: Montenegro'],
      estimatedTotalRange: 'From €450 (Agency Coordination)',
    },
    costHeading: 'Fee & Disbursement Separation',
    costSubtitle: 'Agency coordination fee separated from third-party pass-through disbursements.',
    costItems: [],
    faqHeading: 'Legal & Compliance Questions',
    faqs: [
      {
        question: 'Does Memorijal d.o.o. operate its own hearses or retail funeral shop?',
        answer:
          'No. Memorijal d.o.o. operates strictly as an administrative, legal, and case coordination agency acting under client Power of Attorney (KD 82.99). Physical transport and zinc soldering are performed by licensed partner carriers.',
      },
      {
        question: 'What law governs the Mandate Agreement and privacy policy?',
        answer:
          'All agreements are governed by the material laws of Montenegro (including ZOO and ZZPL) alongside EU/UK GDPR safeguards, with exclusive jurisdiction of competent courts in Montenegro.',
      },
    ],
  };
}

export const LEGAL_ROUTES: SeoRouteEntry[] = [
  {
    id: 'legal-terms',
    category: 'legal',
    path: '/legal/terms-of-service/',
    priority: 0.4,
    changefreq: 'monthly',
    lastmod: '2026-11-17',
    locales: {
      en: makeLegalPageData(
        'Terms of Service & Mandate Agreement | Memorijal d.o.o.',
        'Public Offer, Mandate Agreement (ZOO CG Art. 842–863), pricing disclaimer, liability cap, and Montenegro jurisdiction for Memorijal d.o.o.',
        ['Memorijal Terms of Service', 'Mandate Agreement Montenegro', 'Repatriation Legal Terms'],
        'Terms of Service & Mandate',
        'PUBLIC OFFER • MANDATE AGREEMENT • ZOO MONTENEGRO',
        'Public Offer, Mandate Agreement & Terms of Service',
        'Opšti uslovi poslovanja i Ugovor o nalogu — Governing agency coordination, pass-through disbursements, urgent consumer waiver, and exclusive Montenegrin jurisdiction.'
      ),
      ru: makeLegalPageData(
        'Публичная оферта и договор поручения | Memorijal d.o.o.',
        'Публичная оферта, агентский договор поручения (ст. 842–863 ZOO ЧГ), порядок расчетов, ограничение ответственности и юрисдикция Черногории.',
        ['Публичная оферта Memorijal', 'Договор поручения Черногория', 'Условия оказания услуг'],
        'Публичная оферта и оговорки',
        'ПУБЛИЧНАЯ ОФЕРТА • ДОГОВОР ПОРУЧЕНИЯ • ПРАВО ЧЕРНОГОРИИ',
        'Публичная оферта, Договор поручения и Общие условия',
        'Регулирует агентское представительство по доверенности (Punomoćje), транзитные расходы, форс-мажор и отказ от 14-дневного отзыва при срочном выезде.'
      ),
      mne: makeLegalPageData(
        'Opšti uslovi i Ugovor o nalogu | Memorijal d.o.o.',
        'Javna ponuda, Ugovor o nalogu (ZOO CG čl. 842–863), prefakturisanje troškova, ograničenje odgovornosti i nadležnost suda u Crnoj Gori.',
        ['Opšti uslovi poslovanja Memorijal', 'Ugovor o nalogu Crna Gora'],
        'Opšti uslovi i Ugovor o nalogu',
        'JAVNA PONUDA • UGOVOR O NALOGU • ZOO CRNA GORA',
        'Javna ponuda, Ugovor o nalogu i Opšti uslovi poslovanja',
        'Uređuje agencijsko zastupanje po punomoćju, prolazne stavke, višu silu trećih strana i isključivu nadležnost suda u Crnoj Gori.'
      ),
    },
  },
  {
    id: 'legal-privacy',
    category: 'legal',
    path: '/legal/privacy-gdpr/',
    priority: 0.4,
    changefreq: 'monthly',
    lastmod: '2026-11-17',
    locales: {
      en: makeLegalPageData(
        'Privacy Policy (ZZPL & EU/UK GDPR) | Memorijal d.o.o.',
        'Personal Data Protection under Montenegro ZZPL and EU/UK GDPR, Recital 27 deceased data confidentiality, cross-border transfers, and zero server storage.',
        ['Memorijal Privacy Policy', 'GDPR Montenegro Repatriation', 'ZZPL Data Protection'],
        'Privacy Policy (ZZPL & GDPR)',
        'DATA PROTECTION • ZZPL MONTENEGRO & EU/UK GDPR',
        'Privacy Policy, Data Protection & Cross-Border Transfers',
        'Dual-regime compliance notice explaining GDPR Recital 27, Art. 6 lawful bases, Art. 49 cross-border transfers, and local browser-only draft storage.'
      ),
      ru: makeLegalPageData(
        'Политика конфиденциальности (GDPR/ZZPL) | Memorijal',
        'Защита персональных данных по закону Черногории ZZPL и EU/UK GDPR, трансграничная передача документов и локальная обработка в браузере.',
        ['Политика конфиденциальности Memorijal', 'GDPR Черногория', 'Защита данных ZZPL'],
        'Политика конфиденциальности (GDPR)',
        'ЗАЩИТА ДАННЫХ • ZZPL ЧЕРНОГОРИИ И EU/UK GDPR',
        'Политика конфиденциальности и трансграничной передачи данных',
        'Регламент обработки данных заявителей и умерших (Recital 27 GDPR), трансграничной передачи в Сербию/ЕС/СНГ и локального хранения без серверных БД.'
      ),
      mne: makeLegalPageData(
        'Politika privatnosti (ZZPL i GDPR) | Memorijal d.o.o.',
        'Zaštita podataka o ličnosti shodno ZZPL Crne Gore i EU/UK GDPR uredbi, prekogranični prenos dokumenata i lokalna obrada u pregledaču.',
        ['Politika privatnosti Memorijal', 'ZZPL Crna Gora', 'GDPR'],
        'Politika privatnosti (ZZPL / GDPR)',
        'ZAŠTITA PODATAKA • ZZPL CRNE GORE I EU/UK GDPR',
        'Politika privatnosti, zaštita podataka i prekogranični prenos',
        'Dvostruka usklađenost sa ZZPL i GDPR (tačka 27 Preambule, čl. 6 i 49), bez čuvanja nacrta na serveru.'
      ),
    },
  },
  {
    id: 'legal-disclosure',
    category: 'legal',
    path: '/legal/regulatory-disclosure/',
    priority: 0.4,
    changefreq: 'monthly',
    lastmod: '2026-11-17',
    locales: {
      en: makeLegalPageData(
        'Statutory Agency & Consumer Disclosure | Memorijal d.o.o.',
        'Agency coordination model (KD 82.99), non-carrier, non-retail & non-medical disclaimer, subcontractor liability, and consumer rights notice.',
        ['Memorijal Regulatory Disclosure', 'KD 82.99 Montenegro', 'Agency Model Disclosure'],
        'Regulatory & Agency Disclosure',
        'STATUTORY DISCLOSURE • NON-CARRIER • NON-RETAIL • NON-MEDICAL',
        'Statutory Agency Disclosure & Consumer Rights Notice',
        'Pravno obavještenje o agencijskom modelu — Clarifying KD 82.99 agency status, non-VAT status (Art. 42), licensed partner execution, and consumer rights.'
      ),
      ru: makeLegalPageData(
        'Раскрытие агентской модели (KD 82.99) | Memorijal d.o.o.',
        'Официальное раскрытие агентской модели (KD 82.99), отсутствие автопарка, магазина и медлицензии, ответственность субподрядчиков.',
        ['Правовое раскрытие Memorijal', 'Агентская модель KD 82.99', 'Права потребителей Черногория'],
        'Агентская модель и оговорки',
        'РЕГУЛЯТОРНОЕ РАСКРЫТИЕ • KD 82.99 • БЕЗ АВТОПАРКА И МАГАЗИНА',
        'Официальное раскрытие агентской модели и прав потребителей',
        'Четкое разграничение статуса координационного агентства (без собственного автопарка, розничной торговли и медицинской практики) и лицензированных подрядчиков.'
      ),
      mne: makeLegalPageData(
        'Pravno obavještenje o agencijskom modelu | Memorijal d.o.o.',
        'Zakonsko obavještenje o šifri djelatnosti KD 82.99, odsustvu sopstvenog voznog parka i maloprodaje, odgovornosti podizvođača i pravima potrošača.',
        ['Pravno obavještenje Memorijal', 'Agencijski model KD 82.99', 'Zaštita potrošača CG'],
        'Obavještenje o agencijskom modelu',
        'ZAKONSKO OBAVJEŠTENJE • KD 82.99 • AGENCIJSKI MODEL',
        'Zakonsko obavještenje o agencijskom modelu i ograničenju odgovornosti',
        'Pravno razgraničenje između koordinacione agencije Memorijal d.o.o. (bez sopstvenog voznog parka, prodavnice i medicine) i licenciranih prevoznika.'
      ),
    },
  },
];

