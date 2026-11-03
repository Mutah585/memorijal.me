import React from 'react';
import { Phone, FileCheck, Shield, Plane, Clock, CheckCircle2 } from 'lucide-react';
import { TranslationContent } from '../i18n/translations';

interface ProcedureTimelineProps {
  t: TranslationContent;
}

export const ProcedureTimeline: React.FC<ProcedureTimelineProps> = ({ t }) => {
  const stepIcons = [
    <Phone className="w-5 h-5 text-sapphire" />,
    <FileCheck className="w-5 h-5 text-sapphire" />,
    <Shield className="w-5 h-5 text-sapphire" />,
    <Plane className="w-5 h-5 text-sapphire" />,
  ];

  return (
    <section
      id="process"
      className="py-16 sm:py-24 bg-porcelain border-b border-stoneBorder"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Remote Assurance Pill */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-sapphire mb-3">
              <Clock className="w-4 h-4" />
              <span>{t.timeline.eyebrow}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-semibold text-slateDeep leading-[1.18]">
              {t.timeline.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slateMuted leading-relaxed">
              {t.timeline.subtitle}
            </p>
          </div>

          <div className="inline-flex items-center gap-2.5 bg-forest-subtle text-forest border border-forest/20 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shrink-0">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{t.timeline.remoteAssuranceBadge}</span>
          </div>
        </div>

        {/* 4-Step Timeline Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 relative">
          {t.timeline.steps.map((step, index) => (
            <div
              key={step.number}
              className="bg-white rounded-2xl border border-stoneBorder p-6 sm:p-7 shadow-card flex flex-col justify-between relative group hover:border-sapphire/40 transition-colors"
            >
              <div>
                {/* Step Number & Timeframe Pill */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <div className="flex items-center gap-2.5">
                    <span className="font-serif text-3xl font-bold text-sapphire leading-none">
                      {step.number}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-sapphire-subtle flex items-center justify-center">
                      {stepIcons[index]}
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-warmStone bg-alabaster px-2.5 py-1 rounded-md border border-stoneBorder">
                    <Clock className="w-3 h-3 text-sapphire" />
                    {step.timeframe}
                  </span>
                </div>

                {/* Step Title */}
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-slateDeep leading-snug">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="mt-3 text-xs sm:text-sm text-slateMuted leading-[1.68]">
                  {step.description}
                </p>
              </div>

              {/* Deliverable Footer */}
              <div className="mt-6 pt-4 border-t border-stoneBorder">
                <div className="flex items-start gap-2 text-xs font-semibold text-sapphire">
                  <FileCheck className="w-4 h-4 shrink-0 mt-0.5 text-forest" />
                  <span>{step.deliverable}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

