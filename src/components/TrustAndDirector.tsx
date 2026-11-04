import React from 'react';
import {
  Shield,
  FileCheck,
  MapPin,
  Globe,
  Phone,
  CheckCircle2,
  Building,
  Award,
} from 'lucide-react';
import {
  TranslationContent,
  PHONE_DISPLAY,
  PHONE_HREF,
  OFFICIAL_EMAIL,
} from '../i18n/translations';

interface TrustAndDirectorProps {
  t: TranslationContent;
  onOpenModal: () => void;
}

export const TrustAndDirector: React.FC<TrustAndDirectorProps> = ({
  t,
  onOpenModal,
}) => {
  return (
    <>
      {/* SECTION 6: Trust, Licences & Institutional Partnerships */}
      <section
        id="credentials"
        className="py-16 sm:py-24 bg-alabaster border-b border-stoneBorder"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-sapphire mb-3">
              <Shield className="w-4 h-4" />
              <span>{t.trust.eyebrow}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-semibold text-slateDeep leading-[1.18]">
              {t.trust.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slateMuted leading-relaxed">
              {t.trust.subtitle}
            </p>
          </div>

          {/* Two-Column Grid: Institutional Partners & Regulatory Compliance */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left (7 cols): Hospitals, KCCG Podgorica, General Hospital Kotor, Embassies, Insurers */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-stoneBorder p-6 sm:p-8 shadow-card">
              <h3 className="text-sm font-bold uppercase tracking-wider text-sapphire mb-6 flex items-center gap-2">
                <Building className="w-4 h-4" />
                <span>{t.trust.institutionsTitle}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {t.trust.institutions.map((inst, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-xl bg-porcelain border border-stoneBorder flex flex-col justify-between"
                  >
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-warmStone uppercase tracking-wider mb-2">
                        <MapPin className="w-3.5 h-3.5 text-sapphire" />
                        <span>{inst.location}</span>
                      </div>
                      <h4 className="font-serif text-xl font-semibold text-slateDeep leading-snug">
                        {inst.name}
                      </h4>
                      <p className="mt-2 text-xs sm:text-sm text-slateMuted leading-relaxed">
                        {inst.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right (5 cols): Licensed DOO, EFI Fiscal Invoices & SWIFT/SEPA */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-stoneBorder p-6 sm:p-8 shadow-card flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-sapphire mb-6 flex items-center gap-2">
                  <FileCheck className="w-4 h-4" />
                  <span>{t.trust.complianceTitle}</span>
                </h3>

                <div className="space-y-5">
                  {t.trust.compliancePoints.map((point, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3.5 pb-5 last:pb-0 border-b last:border-b-0 border-stoneBorder"
                    >
                      <div className="w-8 h-8 rounded-lg bg-sapphire-subtle text-sapphire flex items-center justify-center shrink-0 mt-0.5">
                        <Shield className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-semibold text-slateDeep">
                          {point.title}
                        </h4>
                        <p className="mt-1 text-xs sm:text-sm text-slateMuted leading-relaxed">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Institutional Legal Notice Banner */}
          <div className="mt-8 bg-sapphire text-white rounded-2xl p-6 sm:p-8 shadow-card flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold uppercase tracking-widest mb-1.5">
                <Globe className="w-4 h-4" />
                <span>{t.trust.legalBanner.title}</span>
              </div>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                {t.trust.legalBanner.text}
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5 shrink-0">
              {t.trust.legalBanner.badges.map((badge, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 px-3.5 py-2 rounded-lg text-xs font-semibold text-white"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: Director / Personal Accountability Block (Maksym Kovalenko) */}
      <section
        id="director"
        className="py-16 sm:py-24 bg-porcelain border-b border-stoneBorder"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-stoneBorder shadow-elevated overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column (4 cols): Executive Identity & Credentials Panel */}
              <div className="lg:col-span-4 bg-sapphire text-white p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-stoneBorder">
                <div>
                  <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-300 mb-6">
                    <Award className="w-4 h-4" />
                    {t.director.eyebrow}
                  </span>

                  {/* Dignified Monogram Seal & Portrait Representation */}
                  <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-6 shadow-inner">
                    <span className="font-serif text-3xl font-bold tracking-wider text-white">
                      MK
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-white">
                    {t.director.name}
                  </h2>
                  <p className="mt-1.5 text-xs sm:text-sm font-medium text-emerald-200">
                    {t.director.role}
                  </p>
                  <p className="mt-3 text-xs text-slate-300 leading-relaxed pt-3 border-t border-white/15">
                    {t.director.credentials}
                  </p>
                  <div className="mt-3 pt-3 border-t border-white/15">
                    <span className="inline-flex items-start gap-1.5 text-[11px] text-emerald-200 leading-snug">
                      <Globe className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span>{t.director.languagesNotice}</span>
                    </span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/15">
                  <p className="text-[11px] uppercase tracking-wider text-slate-300">
                    {t.director.directContactLabel}
                  </p>
                  <a
                    href={PHONE_HREF}
                    className="mt-1 inline-flex items-center gap-2 text-lg font-bold text-white hover:text-emerald-200 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-emerald-300" />
                    <span>{PHONE_DISPLAY}</span>
                  </a>
                  <p className="text-xs text-slate-300 mt-1">{OFFICIAL_EMAIL}</p>
                </div>
              </div>

              {/* Right Column (8 cols): Personal Statement & Guarantees */}
              <div className="lg:col-span-8 p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
                <div>
                  <blockquote className="font-serif text-xl sm:text-2xl lg:text-[26px] text-slateDeep leading-[1.45] italic">
                    {t.director.quote}
                  </blockquote>

                  <p className="mt-6 text-sm sm:text-base text-slateMuted leading-[1.7]">
                    {t.director.secondaryParagraph}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-stoneBorder">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {t.director.guaranteeItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 bg-porcelain p-3.5 rounded-xl border border-stoneBorder"
                      >
                        <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                        <span className="text-xs text-slateDeep font-medium leading-snug">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Signature & CTA Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                    <div>
                      <span className="font-serif text-2xl italic text-sapphire font-semibold tracking-wide">
                        Maksym Kovalenko
                      </span>
                      <span className="block text-[11px] uppercase tracking-widest text-warmStone">
                        MEMORIJAL d.o.o. • Tivat / Podgorica
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={onOpenModal}
                      className="inline-flex items-center justify-center gap-2.5 bg-forest hover:bg-forest-hover text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-sm transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{t.director.primaryCtaOverride || t.hero.primaryCta}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

