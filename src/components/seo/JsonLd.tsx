import React from 'react';
import {
  LocaleSlug,
  SeoRouteEntry,
  SITE_ORIGIN,
  buildFullCanonicalUrl,
} from '../../data/seo-routes';
import { ALL_SERVICE_TARIFF_ITEMS } from '../../data/pricing';
import { safeJsonLdSerialize } from '../../utils/security';
import {
  LEGAL_CREDENTIALS,
  PHONE_E164,
  OFFICIAL_EMAIL,
} from '../../config/legalCredentials';

interface JsonLdProps {
  locale: LocaleSlug;
  route: SeoRouteEntry;
}

export const JsonLd: React.FC<JsonLdProps> = ({ locale, route }) => {
  const pageData = route.locales[locale];
  const canonicalUrl = buildFullCanonicalUrl(locale, route.path);
  const homeUrl = buildFullCanonicalUrl(locale, '/');

  const homeLabel =
    locale === 'ru' ? 'Главная' : locale === 'mne' ? 'Početna' : 'Home';

  const categoryLabel =
    route.category === 'corridor'
      ? locale === 'ru'
        ? 'Международные коридоры репатриации'
        : locale === 'mne'
        ? 'Međunarodni koridori repatrijacije'
        : 'International Repatriation Corridors'
      : route.category === 'location'
      ? locale === 'ru'
        ? 'Города и госпитали Черногории'
        : locale === 'mne'
        ? 'Opštine i bolnice u Crnoj Gori'
        : 'Montenegro Municipal & Hospital Hubs'
      : route.category === 'mortuary'
      ? locale === 'ru'
        ? 'Больничные морги и судебная медицина'
        : locale === 'mne'
        ? 'Bolničke mrtvačnice i sudska medicina'
        : 'Hospital Mortuaries & Forensic Centers'
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
      : route.category === 'cemetery'
      ? locale === 'ru'
        ? 'Городские кладбища и капеллы (Groblja)'
        : locale === 'mne'
        ? 'Gradska groblja i kapele'
        : 'Municipal Cemeteries & Chapels'
      : route.category === 'service' || route.category === 'services_hub'
      ? locale === 'ru'
        ? 'Специализированные услуги'
        : locale === 'mne'
        ? 'Specijalizovane usluge'
        : 'Core Repatriation & Cremation Services'
      : route.category === 'legal'
      ? locale === 'ru'
        ? 'Правовая информация и комплаенс'
        : locale === 'mne'
        ? 'Pravne informacije i usklađenost'
        : 'Legal & Regulatory Compliance'
      : locale === 'ru'
      ? 'Информация и регламент'
      : locale === 'mne'
      ? 'Informacije i pravilnik'
      : 'Statutory Guides & Resources';

  // Check if route belongs to mortuary category or path
  const isMortuaryRoute =
    route.category === 'mortuary' ||
    route.path.startsWith('/mortuary/') ||
    route.id.includes('mortuary') ||
    route.id.includes('opsta-bolnica') ||
    route.id.includes('kccg');

  const orgTypes = ['FuneralService', 'ProfessionalService'];

  // 1. Organization / FuneralService & ProfessionalService Schema
  const funeralServiceSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': orgTypes,
    '@id': `${SITE_ORIGIN}/#organization`,
    name: 'Memorijal d.o.o. — International Repatriation & Cremation Montenegro',
    legalName: LEGAL_CREDENTIALS.COMPANY_NAME,
    url: canonicalUrl,
    logo: 'https://memorijal.me/assets/branding/emblem-crest.png',
    image: 'https://memorijal.me/assets/branding/emblem-crest.png',
    telephone: PHONE_E164,
    email: OFFICIAL_EMAIL,
    priceRange: 'from €190',
    ...(LEGAL_CREDENTIALS.ISSUED_PIB ? { taxID: LEGAL_CREDENTIALS.ISSUED_PIB } : {}),
    description:
      'Authorized international repatriation coordination agency in Montenegro dispatching accredited licensed carriers, hermetic zinc soldering, consular clearances, and IATA Cargo HUM air bookings.',
    knowsAbout: isMortuaryRoute
      ? [
          'International Repatriation Coordination',
          'Dispatched Licensed Carrier Logistics',
          'Sanitary Inspection',
          'Hermetic Zinc Soldering',
          'Forensic Autopsy Clearance',
          'Air Cargo HUM Transport',
        ]
      : [
          'International Repatriation Coordination',
          'Dispatched Licensed Carrier Logistics',
          'Sanitary Transit Permits (Sprovodnica)',
          'Consular Laissez-Passer Mortuaire',
          'IATA Cargo HUM Air Freight',
        ],
    makesOffer: ALL_SERVICE_TARIFF_ITEMS.map((item) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: item.schemaName,
      },
      price: String(item.basePriceEur),
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: String(item.basePriceEur),
        priceCurrency: 'EUR',
      },
      availability: 'https://schema.org/InStock',
      validFrom: '2026-01-01',
      description: item.schemaDescription,
    })),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tivat',
      addressRegion: 'Boka Kotorska',
      addressCountry: 'ME',
    },
    areaServed: [
      'Montenegro',
      'Budva',
      'Kotor',
      'Tivat',
      'Podgorica',
      'Bar',
      'Herceg Novi',
      'United Kingdom',
      'Germany',
      'Switzerland',
      'Netherlands',
      'Sweden',
      'Norway',
      'Serbia',
      'Poland',
      'France',
      'Italy',
      'Turkey',
      'Ukraine',
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '24:00',
      },
    ],
    founder: {
      '@type': 'Person',
      name: 'Maksym Kovalenko',
      jobTitle: 'Executive Coordinator',
    },
    director: {
      '@type': 'Person',
      name: 'Maksym Kovalenko',
      jobTitle: 'Executive Coordinator',
    },
    availableLanguage: ['en', 'ru', 'sr-Latn-ME', 'uk'],
  };

  // 2. BreadcrumbList Schema
  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: homeLabel,
      item: homeUrl,
    },
  ];

  if (route.path !== '/') {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: categoryLabel,
      item: `${homeUrl}#seo-directory`,
    });
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 3,
      name: pageData.breadcrumbLabel,
      item: canonicalUrl,
    });
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems,
  };

  // 3. FAQPage Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pageData.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  // 4. HowTo Schema (Statutory Repatriation / Cremation Workflow)
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: pageData.explainerHeading,
    description: pageData.explainerIntro,
    totalTime: 'PT48H',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'EUR',
      value: pageData.specs.estimatedTotalRange,
    },
    step: pageData.walkthroughSteps.map((s, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: `${s.stepNumber}. ${s.title}`,
      text: `${s.description} (${s.authority} — ${s.timeframe})`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLdSerialize(funeralServiceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLdSerialize(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLdSerialize(faqSchema),
        }}
      />
      {pageData.walkthroughSteps.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLdSerialize(howToSchema),
          }}
        />
      )}
    </>
  );
};

