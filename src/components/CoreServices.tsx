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

interface CoreServicesProps {
  t: TranslationContent;
  onSelectServiceForEstimator: (service: ServiceType) => void;
}

export const CoreServices: React.FC<CoreServicesProps> = ({
  t,
  onSelectServiceForEstimator,
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
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {t.services.cards.map((card, index) => (
            <article
              key={card.id + index}
              className="bg-white rounded-2xl border border-stoneBorder shadow-card hover:shadow-elevated transition-all duration-200 flex flex-col justify-between p-7 sm:p-8"
            >
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

                {/* Mandatory Procedures Checklist */}
                <div className="mt-6 pt-6 border-t border-stoneBorder">
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
              </div>

              {/* Footer Legal Reference & Action Button */}
              <div className="mt-8 pt-5 border-t border-stoneBorder/80">
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
      </div>
    </section>
  );
};

