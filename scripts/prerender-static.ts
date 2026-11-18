import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  ALL_SEO_ROUTES,
  SITE_ORIGIN,
  buildFullCanonicalUrl,
  buildLocalizedPath,
  type LocaleSlug,
  type SeoRouteEntry,
} from '../src/data/seo-routes.ts';
import { ALL_SERVICE_TARIFF_ITEMS } from '../src/data/pricing.ts';
import {
  LEGAL_CREDENTIALS,
  PHONE_DISPLAY,
  PHONE_E164,
  OFFICIAL_EMAIL,
} from '../src/config/legalCredentials.ts';
import { safeJsonLdSerialize } from '../src/utils/security.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOCALES: LocaleSlug[] = ['en', 'ru', 'mne'];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getCategoryLabel(route: SeoRouteEntry, locale: LocaleSlug): string {
  if (route.category === 'corridor') {
    return locale === 'ru'
      ? 'Международные коридоры репатриации'
      : locale === 'mne'
      ? 'Međunarodni koridori repatrijacije'
      : 'International Repatriation Corridors';
  }
  if (route.category === 'location') {
    return locale === 'ru'
      ? 'Города и госпитали Черногории'
      : locale === 'mne'
      ? 'Opštine i bolnice u Crnoj Gori'
      : 'Montenegro Municipal & Hospital Hubs';
  }
  if (route.category === 'mortuary') {
    return locale === 'ru'
      ? 'Больничные морги и судебная медицина'
      : locale === 'mne'
      ? 'Bolničke mrtvačnice i sudska medicina'
      : 'Hospital Mortuaries & Forensic Centers';
  }
  if (route.category === 'transit') {
    return locale === 'ru'
      ? 'Пограничные переходы и карго-терминалы'
      : locale === 'mne'
      ? 'Granični prelazi i kargo terminali'
      : 'Border Crossings & Cargo Hubs';
  }
  if (route.category === 'assistance') {
    return locale === 'ru'
      ? 'Страховые и ассистанс-компании (GOP)'
      : locale === 'mne'
      ? 'Osiguravajuće i asistentske kuće (GOP)'
      : 'Travel Insurance & Assistance Partners';
  }
  if (route.category === 'cemetery') {
    return locale === 'ru'
      ? 'Городские кладбища и капеллы (Groblja)'
      : locale === 'mne'
      ? 'Gradska groblja i kapele'
      : 'Municipal Cemeteries & Chapels';
  }
  if (route.category === 'service' || route.category === 'services_hub') {
    return locale === 'ru'
      ? 'Специализированные услуги'
      : locale === 'mne'
      ? 'Specijalizovane usluge'
      : 'Core Repatriation & Cremation Services';
  }
  if (route.category === 'legal') {
    return locale === 'ru'
      ? 'Правовая информация и комплаенс'
      : locale === 'mne'
      ? 'Pravne informacije i usklađenost'
      : 'Legal & Regulatory Compliance';
  }
  return locale === 'ru'
    ? 'Информация и регламент'
    : locale === 'mne'
    ? 'Informacije i pravilnik'
    : 'Statutory Guides & Resources';
}

function buildRouteJsonLdScripts(locale: LocaleSlug, route: SeoRouteEntry): string {
  const pageData = route.locales[locale];
  const canonicalUrl = buildFullCanonicalUrl(locale, route.path);
  const homeUrl = buildFullCanonicalUrl(locale, '/');
  const homeLabel =
    locale === 'ru' ? 'Главная' : locale === 'mne' ? 'Početna' : 'Home';
  const categoryLabel = getCategoryLabel(route, locale);

  const isMortuaryRoute =
    route.category === 'mortuary' ||
    route.path.startsWith('/mortuary/') ||
    route.id.includes('mortuary') ||
    route.id.includes('opsta-bolnica') ||
    route.id.includes('kccg');

  const offerItems = ALL_SERVICE_TARIFF_ITEMS.map((item) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: item.schemaName,
      description: item.schemaDescription,
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
  }));

  const localBusinessSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Organization'],
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
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Memorijal d.o.o. Agency Services (KD 82.99)',
      itemListElement: offerItems,
    },
    makesOffer: offerItems,
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

  const scripts: string[] = [
    `<script type="application/ld+json" data-prerender-jsonld="true">${safeJsonLdSerialize(localBusinessSchema)}</script>`,
    `<script type="application/ld+json" data-prerender-jsonld="true">${safeJsonLdSerialize(breadcrumbSchema)}</script>`,
    `<script type="application/ld+json" data-prerender-jsonld="true">${safeJsonLdSerialize(faqSchema)}</script>`,
  ];

  if (pageData.walkthroughSteps.length > 0) {
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
    scripts.push(
      `<script type="application/ld+json" data-prerender-jsonld="true">${safeJsonLdSerialize(howToSchema)}</script>`
    );
  }

  return scripts.join('\n    ');
}

function buildSemanticPrehydrationShell(locale: LocaleSlug, route: SeoRouteEntry): string {
  const pageData = route.locales[locale];
  const homePath = buildLocalizedPath(locale, '/');
  const servicesPath = buildLocalizedPath(locale, '/services/');
  const pricingPath = buildLocalizedPath(locale, '/pricing-breakdown/');
  const contactPath = buildLocalizedPath(locale, '/contact/');

  const specsHtml = `
      <dl>
        <dt>Transit / Turnaround</dt><dd>${escapeHtml(pageData.specs.transitTime)}</dd>
        <dt>Transport / Execution Mode</dt><dd>${escapeHtml(pageData.specs.transportMode)}</dd>
        <dt>Consular &amp; Sanitary Timeframe</dt><dd>${escapeHtml(pageData.specs.consularTimeframe)}</dd>
        <dt>Jurisdiction &amp; Authority</dt><dd>${escapeHtml(pageData.specs.embassyJurisdiction)}</dd>
        <dt>Morgue &amp; Municipal Catchment</dt><dd>${escapeHtml(pageData.specs.morgueCatchment)}</dd>
        <dt>Starting Estimate</dt><dd>${escapeHtml(pageData.specs.estimatedTotalRange)}</dd>
      </dl>`;

  const stepsHtml =
    pageData.walkthroughSteps.length > 0
      ? `<section>
        <h2>${escapeHtml(pageData.explainerHeading)}</h2>
        <p>${escapeHtml(pageData.explainerIntro)}</p>
        <ol>
          ${pageData.walkthroughSteps
            .map(
              (s) =>
                `<li><strong>${escapeHtml(s.stepNumber)}. ${escapeHtml(s.title)}</strong>: ${escapeHtml(s.description)} (${escapeHtml(s.authority)} — ${escapeHtml(s.timeframe)})</li>`
            )
            .join('\n          ')}
        </ol>
      </section>`
      : '';

  const pricingHtml =
    route.path === '/pricing-breakdown/' || route.path === '/services/' || route.path === '/'
      ? `<section>
        <h2>${escapeHtml(pageData.costHeading)}</h2>
        <ul>
          ${ALL_SERVICE_TARIFF_ITEMS.map((item) => {
            const loc = item.locales[locale];
            return `<li><strong>${escapeHtml(loc.title)}</strong>: ${escapeHtml(loc.formattedPrice)} — ${escapeHtml(loc.scope)}</li>`;
          }).join('\n          ')}
        </ul>
      </section>`
      : '';

  const faqsHtml =
    pageData.faqs.length > 0
      ? `<section>
        <h2>${escapeHtml(pageData.faqHeading)}</h2>
        ${pageData.faqs
          .map(
            (f) =>
              `<article><h3>${escapeHtml(f.question)}</h3><p>${escapeHtml(f.answer)}</p></article>`
          )
          .join('\n        ')}
      </section>`
      : '';

  return `<main class="sr-only" data-prerender-shell="true">
      <article>
        <p>${escapeHtml(pageData.eyebrow)}</p>
        <h1>${escapeHtml(pageData.h1)}</h1>
        <p>${escapeHtml(pageData.heroSubtitle)}</p>
        <p>${escapeHtml(LEGAL_CREDENTIALS.COMPANY_NAME)} • ${escapeHtml(LEGAL_CREDENTIALS.HEADQUARTERS)} • ${escapeHtml(LEGAL_CREDENTIALS.ACTIVITY_CODES_SHORT)} • 24/7: <a href="tel:${PHONE_E164}">${escapeHtml(PHONE_DISPLAY)}</a> • <a href="mailto:${OFFICIAL_EMAIL}">${escapeHtml(OFFICIAL_EMAIL)}</a></p>
        ${specsHtml}
        ${stepsHtml}
        ${pricingHtml}
        ${faqsHtml}
        <nav aria-label="Primary Static Links">
          <a href="${homePath}">Home</a> |
          <a href="${servicesPath}">Services (${escapeHtml(LEGAL_CREDENTIALS.ACTIVITY_CODES_SHORT)})</a> |
          <a href="${pricingPath}">Pricing Breakdown</a> |
          <a href="${contactPath}">24/7 Contact</a>
        </nav>
      </article>
    </main>`;
}

function renderStaticRouteHtml(
  templateHtml: string,
  locale: LocaleSlug,
  route: SeoRouteEntry
): string {
  const pageData = route.locales[locale];
  const htmlLang = locale === 'mne' ? 'sr-Latn-ME' : locale;
  const ogLocale =
    locale === 'ru' ? 'ru_RU' : locale === 'mne' ? 'sr_ME' : 'en_GB';

  const canonicalUrl = buildFullCanonicalUrl(locale, route.path);
  const enUrl = buildFullCanonicalUrl('en', route.path);
  const ruUrl = buildFullCanonicalUrl('ru', route.path);
  const mneUrl = buildFullCanonicalUrl('mne', route.path);

  const jsonLdScripts = buildRouteJsonLdScripts(locale, route);
  const semanticShell = buildSemanticPrehydrationShell(locale, route);

  const seoHeadInjection = `    <meta name="keywords" content="${escapeHtml(pageData.keywords.join(', '))}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="en" href="${enUrl}" />
    <link rel="alternate" hreflang="ru" href="${ruUrl}" />
    <link rel="alternate" hreflang="sr-ME" href="${mneUrl}" />
    <link rel="alternate" hreflang="x-default" href="${enUrl}" />
    <meta property="og:title" content="${escapeHtml(pageData.metaTitle)}" />
    <meta property="og:description" content="${escapeHtml(pageData.metaDescription)}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Memorijal d.o.o. — International Repatriation &amp; Cremation Montenegro" />
    <meta property="og:locale" content="${ogLocale}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(pageData.metaTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(pageData.metaDescription)}" />
    ${jsonLdScripts}`;

  let html = templateHtml;

  // 1. Replace <html lang="en"
  html = html.replace(
    /<html\s+lang="[^"]*"/,
    `<html lang="${htmlLang}"`
  );

  // 2. Replace <title>...</title>
  html = html.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeHtml(pageData.metaTitle)}</title>`
  );

  // 3. Replace <meta name="description" ... />
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeHtml(pageData.metaDescription)}" />\n${seoHeadInjection}`
  );

  // 4. Inject semantic pre-hydration shell inside <div id="root"></div>
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${semanticShell}</div>`
  );

  return html;
}

function main() {
  const distDir = path.resolve(__dirname, '..', 'dist');
  const templatePath = path.join(distDir, 'index.html');

  if (!fs.existsSync(templatePath)) {
    throw new Error(
      `[SSG Prerender] dist/index.html not found at ${templatePath}. Run "vite build" first.`
    );
  }

  const templateHtml = fs.readFileSync(templatePath, 'utf-8');
  let generatedCount = 0;

  for (const route of ALL_SEO_ROUTES) {
    for (const locale of LOCALES) {
      const localizedHtml = renderStaticRouteHtml(templateHtml, locale, route);
      const relativeDir =
        route.path === '/'
          ? locale
          : path.join(locale, ...route.path.split('/').filter(Boolean));
      const targetDir = path.join(distDir, relativeDir);
      fs.mkdirSync(targetDir, { recursive: true });
      const targetFile = path.join(targetDir, 'index.html');
      fs.writeFileSync(targetFile, localizedHtml, 'utf-8');
      generatedCount++;
    }
  }

  // Also enrich root dist/index.html with default English home route metadata
  const rootHomeRoute = ALL_SEO_ROUTES.find((r) => r.path === '/') ?? ALL_SEO_ROUTES[0];
  fs.writeFileSync(
    templatePath,
    renderStaticRouteHtml(templateHtml, 'en', rootHomeRoute),
    'utf-8'
  );

  console.log(
    `[SSG Prerender] Pre-rendered ${generatedCount} static HTML pages (${ALL_SEO_ROUTES.length} routes × ${LOCALES.length} locales) + root dist/index.html`
  );
}

main();
