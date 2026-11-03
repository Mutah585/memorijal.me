import React from 'react';
import {
  LocaleSlug,
  SeoRouteEntry,
  SITE_ORIGIN,
  buildFullCanonicalUrl,
} from '../../data/seo-routes';

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
      : route.category === 'service'
      ? locale === 'ru'
        ? 'Специализированные услуги'
        : locale === 'mne'
        ? 'Specijalizovane usluge'
        : 'Core Repatriation & Cremation Services'
      : locale === 'ru'
      ? 'Информация и регламент'
      : locale === 'mne'
      ? 'Informacije i pravilnik'
      : 'Statutory Guides & Resources';

  // 1. Organization / FuneralService & EmergencyService Schema
  const funeralServiceSchema = {
    '@context': 'https://schema.org',
    '@type': ['FuneralService', 'EmergencyService'],
    '@id': `${SITE_ORIGIN}/#organization`,
    name: 'Memorijal d.o.o. — International Repatriation & Cremation Montenegro',
    legalName: 'Memorijal d.o.o.',
    url: canonicalUrl,
    telephone: '+38268914816',
    email: 'dispatch@memorijal.me',
    priceRange: '€€€',
    taxID: '03489217',
    vatID: '30/31-20948-4',
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
          __html: JSON.stringify(funeralServiceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
    </>
  );
};

