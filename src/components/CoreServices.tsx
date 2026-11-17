import React from 'react';
import {
  Shield,
  Plane,
  FileCheck,
  MapPin,
  Check,
  ArrowRight,
} from 'lucide-react';
import { ServiceType, TranslationContent } from '../i18n/translations';
import { LocaleSlug, buildLocalizedPath } from '../data/seo-routes';

interface CoreServicesProps {
  t: TranslationContent;
  locale: LocaleSlug;
  onSelectServiceForEstimator: (service: ServiceType) => void;
  onNavigate?: (localizedPath: string) => void;
}

export const CoreServices: React.FC<CoreServicesProps> = ({
  t,
  locale,
  onSelectServiceForEstimator,
  onNavigate,
}) => {
  const getIconForCard = (id: ServiceType, index: number) => {
    if (index === 0 || id === 'cremation') {
      return <MapPin className="w-6 h-6 text-sapphire stroke-[1.75]" />;
    }
    if (index === 1 || id === 'air_cargo') {
      return <Plane className="w-6 h-6 text-sapphire stroke-[1.75]" />;
    }
    return <FileCheck className="w-6 h-6 text-sapphire stroke-[1.75]" />;
  };

  return (
    <section
      id="services"
      className="py-16 sm:py-24 bg-porcelain border-b border-stoneBorder"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-sapphire mb-3">
            <Shield className="w-4 h-4" />
            <span>{t.services.eyebrow}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-semibold text-slateDeep leading-[1.18]">
            {t.services.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slateMuted leading-relaxed">
            {t.services.subtitle}
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-[auto_1fr_auto] gap-x-8 gap-y-8 items-stretch">
          {t.services.cards.map((card, index) => (
            <article
              key={card.id + index}
              className="bg-white rounded-2xl border border-stoneBorder shadow-card hover:shadow-elevated transition-all duration-200 flex flex-col justify-between h-full min-w-0 lg:row-span-3 lg:grid lg:grid-rows-subgrid lg:gap-y-0 p-7 sm:p-8"
            >
              {/* Row 1: Top Header & Narrative */}
              <div>
                {/* Top Icon & Pillar Badge */}
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-sapphire-subtle border border-sapphire/15 flex items-center justify-center shrink-0">
                    {getIconForCard(card.id, index)}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sapphire bg-sapphire-subtle px-3 py-1 rounded-full border border-sapphire/10">
                    {card.badge}
                  </span>
                </div>

                {/* Card Title & Subtitle */}
                <h3 className="font-serif text-2xl sm:text-[26px] font-semibold text-slateDeep leading-snug">
                  {card.title}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm font-semibold text-warmStone">
                  {card.subtitle}
                </p>

                {/* Main Description */}
                <p className="mt-4 text-sm sm:text-[15px] text-slateMuted leading-[1.68]">
                  {card.description}
                </p>
              </div>

              {/* Row 2: Divider + Mandatory Procedures Checklist */}
              <div className="mt-6 pt-5 border-t border-stoneBorder flex-grow">
                <p className="text-xs font-semibold uppercase tracking-wider text-slateDeep mb-3.5">
                  {t.services.includedLabel}
                </p>
                <ul className="space-y-2.5">
                  {card.highlights.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slateDeep/90 leading-relaxed"
                    >
                      <Check className="w-4 h-4 text-forest shrink-0 mt-0.5 stroke-[2.2]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Row 3: Footer Legal Reference & Action Button */}
              <div className="mt-8 pt-5 border-t border-stoneBorder/80 self-end">
                <p className="text-[11px] text-slateMuted italic mb-4">
                  {card.legalReference}
                </p>
                <button
                  type="button"
                  onClick={() => onSelectServiceForEstimator(card.id)}
                  className="w-full inline-flex items-center justify-between px-4 py-3 rounded-xl bg-alabaster hover:bg-sapphire hover:text-white text-slateDeep font-semibold text-sm border border-stoneBorder transition-colors group"
                >
                  <span>{t.services.inquireServiceCta}</span>
                  <ArrowRight className="w-4 h-4 text-sapphire group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Prominent CTA to Full 12-Service Agency Hub */}
        <div className="mt-10 flex justify-center">
          <a
            href={buildLocalizedPath(locale, '/services/')}
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate(buildLocalizedPath(locale, '/services/'));
              }
            }}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-sapphire hover:bg-sapphire-light text-white font-semibold text-sm shadow-sm transition-all group"
          >
            <span>
              {locale === 'ru'
                ? 'Посмотреть все 12 услуг агентства'
                : locale === 'mne'
                ? 'Sve 12 usluga agencije'
                : 'View All 12 Agency Services'}
            </span>
            <ArrowRight className="w-4 h-4 text-emerald-300 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

