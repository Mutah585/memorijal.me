import React from 'react';
import {
  Globe,
  MapPin,
  Plane,
  FileCheck,
  ChevronRight,
  Building2,
  Shield,
} from 'lucide-react';
import {
  LocaleSlug,
  ALL_SEO_ROUTES,
  buildLocalizedPath,
} from '../../data/seo-routes';

interface SeoHubNavigatorProps {
  locale: LocaleSlug;
  onNavigate: (localizedPath: string) => void;
}

export const SeoHubNavigator: React.FC<SeoHubNavigatorProps> = ({
  locale,
  onNavigate,
}) => {
  const serviceRoutes = ALL_SEO_ROUTES.filter((r) => r.category === 'service');
  const corridorRoutes = ALL_SEO_ROUTES.filter((r) => r.category === 'corridor');
  const locationRoutes = ALL_SEO_ROUTES.filter((r) => r.category === 'location');
  const resourceRoutes = ALL_SEO_ROUTES.filter((r) => r.category === 'resource');

  const labels =
    locale === 'ru'
      ? {
          eyebrow: 'МЕЖДУНАРОДНЫЕ КОРИДОРЫ, ГОСПИТАЛИ И РЕГЛАМЕНТЫ',
          title: 'Выберите направление репатриации, город в Черногории или специализированный регламент',
          subtitle:
            'Каждая страница содержит точные сроки консульского оформления в Подгорице, тарифную сетку, требования к документам и ответы на частые вопросы по конкретной стране или муниципалитету.',
          corridorsHeader: '9 основных международных коридоров репатриации',
          locationsHeader: 'Муниципальные и больничные хабы в Черногории (выезд 30–60 мин)',
          servicesHeader: 'Профильные регламенты и виды процедур',
          resourcesHeader: 'Правовые инструкции, тарифы и лицензии (E-E-A-T)',
        }
      : locale === 'mne'
      ? {
          eyebrow: 'MEĐUNARODNI KORIDORI, BOLNICE I ZAKONSKI PROTOKOLI',
          title: 'Odaberite državu odredišta, opštinu u Crnoj Gori ili specijalizovanu proceduru',
          subtitle:
            'Svaka stranica sadrži detaljnu specifikaciju rokova, konzularnih procedura u Podgorici, bolničkih mrtvačnica i transparentnih troškova.',
          corridorsHeader: '9 primarnih međunarodnih koridora repatrijacije',
          locationsHeader: 'Opštinski i bolnički centri u Crnoj Gori (izlazak 30–60 min)',
          servicesHeader: 'Specijalizovane usluge i zakonski protokoli',
          resourcesHeader: 'Vodiči, struktura troškova i E-E-A-T garancije',
        }
      : {
          eyebrow: 'INTERNATIONAL CORRIDORS, HOSPITAL HUBS & STATUTORY GUIDES',
          title: 'Dedicated Country Corridors, Montenegro Hospital Hubs & Legal Guides',
          subtitle:
            'Select a specific destination country, Montenegrin municipality, or statutory procedure to inspect exact Embassy processing times, transit schedules, itemized costs, and local FAQs.',
          corridorsHeader: '9 Primary International Repatriation Corridors',
          locationsHeader: 'Montenegro Municipal & Hospital Catchment Hubs (30–60 Min Response)',
          servicesHeader: 'Specialized Statutory Service Hubs',
          resourcesHeader: 'Transparency, Step-by-Step Guides & E-E-A-T Credentials',
        };

  return (
    <section
      id="seo-directory"
      className="py-16 sm:py-24 bg-porcelain border-b border-stoneBorder"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-sapphire mb-3">
            <Globe className="w-4 h-4" />
            <span>{labels.eyebrow}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-semibold text-slateDeep leading-[1.18]">
            {labels.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slateMuted leading-relaxed">
            {labels.subtitle}
          </p>
        </div>

        {/* 1. The 9 Primary Destination Corridors */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-sapphire mb-4 flex items-center gap-2">
            <Plane className="w-4 h-4" />
            <span>{labels.corridorsHeader}</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {corridorRoutes.map((route) => {
              const data = route.locales[locale];
              const href = buildLocalizedPath(locale, route.path);
              return (
                <a
                  key={route.id}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(href);
                  }}
                  className="bg-white hover:border-sapphire rounded-xl border border-stoneBorder p-5 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-serif text-xl font-semibold text-slateDeep group-hover:text-sapphire transition-colors">
                        {data.breadcrumbLabel}
                      </span>
                      <ChevronRight className="w-4 h-4 text-sapphire shrink-0 transition-transform group-hover:translate-x-0.5" />
                    </div>
                    <p className="mt-1.5 text-xs text-slateMuted line-clamp-2">
                      {data.specs.transitTime} • {data.specs.embassyJurisdiction}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-stoneBorder/70 flex items-center justify-between text-[11px] font-mono text-warmStone">
                    <span>{href}</span>
                    <span className="font-sans font-semibold text-sapphire">
                      {data.specs.estimatedTotalRange.split('(')[0].trim()}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* 2. The 6 Montenegro Municipal & Hospital Hubs */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-sapphire mb-4 flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            <span>{labels.locationsHeader}</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {locationRoutes.map((route) => {
              const data = route.locales[locale];
              const href = buildLocalizedPath(locale, route.path);
              return (
                <a
                  key={route.id}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(href);
                  }}
                  className="bg-white hover:border-sapphire rounded-xl border border-stoneBorder p-5 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-2 font-serif text-xl font-semibold text-slateDeep group-hover:text-sapphire transition-colors">
                        <MapPin className="w-4 h-4 text-sapphire shrink-0" />
                        {data.breadcrumbLabel}
                      </span>
                      <ChevronRight className="w-4 h-4 text-sapphire shrink-0 transition-transform group-hover:translate-x-0.5" />
                    </div>
                    <p className="mt-1.5 text-xs text-slateMuted line-clamp-2">
                      {data.specs.morgueCatchment}
                    </p>
                  </div>
                  <span className="mt-3 pt-2 border-t border-stoneBorder/70 text-[11px] font-mono text-warmStone block">
                    {href}
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        {/* 3. Specialized Service Hubs & Resource / Legal Pages */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-sapphire mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>{labels.servicesHeader}</span>
            </h3>
            <div className="space-y-3">
              {serviceRoutes.map((route) => {
                const data = route.locales[locale];
                const href = buildLocalizedPath(locale, route.path);
                return (
                  <a
                    key={route.id}
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(href);
                    }}
                    className="bg-white hover:border-sapphire rounded-xl border border-stoneBorder p-4 shadow-card flex items-center justify-between gap-3 group transition-all"
                  >
                    <div>
                      <p className="font-serif text-lg font-semibold text-slateDeep group-hover:text-sapphire">
                        {data.breadcrumbLabel}
                      </p>
                      <span className="text-[11px] font-mono text-warmStone">
                        {href}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-sapphire shrink-0" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-sapphire mb-4 flex items-center gap-2">
              <FileCheck className="w-4 h-4" />
              <span>{labels.resourcesHeader}</span>
            </h3>
            <div className="space-y-3">
              {resourceRoutes.map((route) => {
                const data = route.locales[locale];
                const href = buildLocalizedPath(locale, route.path);
                return (
                  <a
                    key={route.id}
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(href);
                    }}
                    className="bg-white hover:border-sapphire rounded-xl border border-stoneBorder p-4 shadow-card flex items-center justify-between gap-3 group transition-all"
                  >
                    <div>
                      <p className="font-serif text-lg font-semibold text-slateDeep group-hover:text-sapphire">
                        {data.breadcrumbLabel}
                      </p>
                      <span className="text-[11px] font-mono text-warmStone">
                        {href}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-sapphire shrink-0" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

