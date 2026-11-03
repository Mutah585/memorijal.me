import React from 'react';
import {
  Phone,
  Shield,
  FileCheck,
  Clock,
  MapPin,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
} from 'lucide-react';
import {
  Language,
  TranslationContent,
  PHONE_DISPLAY,
  WHATSAPP_NUMBER,
} from '../i18n/translations';

interface HeroProps {
  lang: Language;
  t: TranslationContent;
  onOpenModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, t, onOpenModal }) => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    lang === 'RU'
      ? 'Здравствуйте, необходима срочная консультация координатора Memorijal d.o.o. в Черногории.'
      : lang === 'MNE'
        ? 'Poštovani, potrebna je hitna konsultacija koordinatora Memorijal d.o.o. u Crnoj Gori.'
        : 'Hello, I need urgent assistance from a Memorijal d.o.o. coordinator in Montenegro.'
  )}`;

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-porcelain border-b border-stoneBorder"
    >
      {/* Serene Panoramic Montenegro Coastline & Mountains Morning Haze Backdrop */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        {/* Soft Morning Sky & Adriatic Mist Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, #EEF3F8 0%, #F5F7FA 48%, #F9F9FB 100%)',
          }}
        />

        {/* Panoramic Boka Kotorska Mountains & Serene Water Horizon SVG */}
        <svg
          className="absolute bottom-0 left-0 w-full h-[380px] sm:h-[460px] lg:h-[540px] object-cover opacity-80"
          viewBox="0 0 1600 540"
          fill="none"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="skyGlow" x1="800" y1="0" x2="800" y2="380" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#DCE6F1" stopOpacity="0.45" />
              <stop offset="65%" stopColor="#E9EEF4" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#F9F9FB" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="mountainFar" x1="800" y1="90" x2="800" y2="420" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#B8C8DA" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#E6ECF2" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="mountainMid" x1="800" y1="150" x2="800" y2="450" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#94ACC4" stopOpacity="0.34" />
              <stop offset="100%" stopColor="#DCE4EE" stopOpacity="0.08" />
            </linearGradient>
            <linearGradient id="mountainNear" x1="800" y1="220" x2="800" y2="490" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1E3A5F" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#F9F9FB" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="adriaticWater" x1="800" y1="390" x2="800" y2="540" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C9D8E8" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#F9F9FB" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          {/* Soft Morning Sun Disc in Haze */}
          <circle cx="1180" cy="145" r="95" fill="url(#skyGlow)" />

          {/* Distant Lovćen & Orjen Ridges */}
          <path
            d="M0 320L140 250L290 275L470 165L650 230L840 135L1030 215L1220 150L1410 225L1600 180V460H0V320Z"
            fill="url(#mountainFar)"
          />

          {/* Midground Boka Bay Fjord Slopes */}
          <path
            d="M0 355L190 285L360 325L560 220L760 295L980 205L1170 280L1370 235L1600 290V480H0V355Z"
            fill="url(#mountainMid)"
          />

          {/* Soft Morning Mist Layer */}
          <rect x="0" y="290" width="1600" height="95" fill="#F9F9FB" fillOpacity="0.45" />

          {/* Foreground Coastal Headlands (Perast / Tivat / Kotor Silhouette) */}
          <path
            d="M0 385L120 350L280 375L450 320L670 385L910 340L1130 380L1340 330L1600 370V510H0V385Z"
            fill="url(#mountainNear)"
          />

          {/* Calm Adriatic Water Reflection Lines */}
          <rect x="0" y="395" width="1600" height="145" fill="url(#adriaticWater)" />
          <line x1="180" y1="425" x2="540" y2="425" stroke="#1E3A5F" strokeOpacity="0.08" strokeWidth="1.5" />
          <line x1="780" y1="445" x2="1280" y2="445" stroke="#1E3A5F" strokeOpacity="0.08" strokeWidth="1.5" />
          <line x1="420" y1="470" x2="960" y2="470" stroke="#8C8275" strokeOpacity="0.1" strokeWidth="1" />
        </svg>
      </div>

      {/* Main Hero Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column (7 cols): Headline, Subheadline, Primary CTAs, Trust Metrics */}
          <div className="lg:col-span-7 space-y-6">
            {/* Institutional Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-stoneBorder shadow-sm">
              <Shield className="w-4 h-4 text-sapphire shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-sapphire">
                {t.hero.eyebrow}
              </span>
            </div>

            {/* Dignified Serif Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[52px] font-semibold text-slateDeep leading-[1.14] tracking-tight">
              {t.hero.headline}
            </h1>

            {/* Reassuring High-Clarity Subheadline */}
            <p className="text-base sm:text-lg lg:text-[19px] text-slateMuted leading-[1.68] max-w-2xl font-normal">
              {t.hero.subheadline}
            </p>

            {/* Primary CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                type="button"
                onClick={onOpenModal}
                className="inline-flex items-center justify-center gap-3 bg-forest hover:bg-forest-hover text-white font-semibold px-6 py-4 rounded-xl shadow-sm transition-all text-base"
              >
                <Phone className="w-5 h-5 shrink-0" />
                <span>{t.hero.primaryCta}</span>
              </button>

              <a
                href="#process"
                className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-alabaster text-slateDeep border border-stoneBorder font-semibold px-6 py-4 rounded-xl shadow-sm transition-all text-base"
              >
                <span>{t.hero.secondaryCta}</span>
                <ArrowRight className="w-4 h-4 text-sapphire" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-sapphire hover:text-sapphire-light px-3 py-3 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-forest" />
                <span className="underline underline-offset-4">{t.hero.whatsappDirect}</span>
              </a>
            </div>

            {/* Key Reassurance Metrics Bar */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-stoneBorder/90">
              <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-stoneBorder shadow-card">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slateMuted">
                  <Clock className="w-4 h-4 text-sapphire shrink-0" />
                  <span>{t.hero.trustMetrics.timeLabel}</span>
                </div>
                <p className="mt-1.5 font-serif text-2xl font-bold text-slateDeep">
                  {t.hero.trustMetrics.timeValue}
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-stoneBorder shadow-card">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slateMuted">
                  <FileCheck className="w-4 h-4 text-sapphire shrink-0" />
                  <span>{t.hero.trustMetrics.presenceLabel}</span>
                </div>
                <p className="mt-1.5 font-serif text-2xl font-bold text-slateDeep">
                  {t.hero.trustMetrics.presenceValue}
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-stoneBorder shadow-card">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slateMuted">
                  <Shield className="w-4 h-4 text-sapphire shrink-0" />
                  <span>{t.hero.trustMetrics.complianceLabel}</span>
                </div>
                <p className="mt-1.5 font-serif text-2xl font-bold text-slateDeep">
                  {t.hero.trustMetrics.complianceValue}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Serene Adriatic Visual Window + Institutional Protocol Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-stoneBorder shadow-elevated overflow-hidden">
              {/* Top Panoramic Coastal Header Artwork (Montenegro Morning Mist) */}
              <div className="relative h-44 sm:h-48 bg-gradient-to-b from-[#DCE6F2] via-[#E9EFF6] to-[#F4F5F6] overflow-hidden border-b border-stoneBorder">
                <svg
                  className="absolute inset-0 w-full h-full object-cover"
                  viewBox="0 0 600 220"
                  fill="none"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Soft morning light over Boka Kotorska */}
                  <circle cx="460" cy="58" r="44" fill="#FFFDF9" fillOpacity="0.7" />
                  {/* Distant Durmitor / Lovćen peaks */}
                  <path
                    d="M0 145L85 92L175 118L290 58L410 112L515 74L600 105V220H0V145Z"
                    fill="#9EB3C9"
                    fillOpacity="0.38"
                  />
                  {/* Midground Fjord Ridge */}
                  <path
                    d="M0 165L125 118L240 148L365 98L485 142L600 120V220H0V165Z"
                    fill="#1E3A5F"
                    fillOpacity="0.22"
                  />
                  {/* Morning Haze Band */}
                  <rect x="0" y="138" width="600" height="32" fill="#F9F9FB" fillOpacity="0.55" />
                  {/* Calm Bay Horizon */}
                  <path
                    d="M0 172L165 154L330 174L490 156L600 168V220H0V172Z"
                    fill="#1E3A5F"
                    fillOpacity="0.35"
                  />
                  <rect x="0" y="176" width="600" height="44" fill="#DCE6F1" fillOpacity="0.65" />
                </svg>

                {/* Geographic Caption Pill */}
                <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md text-slateDeep text-xs font-medium px-3 py-1 rounded-full border border-stoneBorder/80 shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-sapphire" />
                    {t.hero.captionTitle}
                  </span>
                </div>

                {/* Bottom Overlay Title */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slateDeep/90 bg-white/85 backdrop-blur-md px-3.5 py-2 rounded-lg border border-stoneBorder/70">
                  <span className="font-semibold text-sapphire">{t.hero.protocolCard.header}</span>
                  <span className="inline-flex items-center gap-1.5 text-forest font-semibold">
                    <span className="w-2 h-2 rounded-full bg-forest"></span>
                    {t.hero.protocolCard.status}
                  </span>
                </div>
              </div>

              {/* Protocol Checklist Items */}
              <div className="p-6 space-y-4">
                {t.hero.protocolCard.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 pb-4 last:pb-0 border-b last:border-b-0 border-stoneBorder/70"
                  >
                    <div className="w-7 h-7 rounded-full bg-sapphire-subtle text-sapphire flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold text-slateDeep">
                        {item.label}
                      </h2>
                      <p className="text-xs sm:text-sm text-slateMuted mt-0.5 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Direct Coordinator Call Box inside Protocol Card */}
                <div className="mt-4 pt-4 border-t border-stoneBorder bg-alabaster/70 -mx-6 -mb-6 p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-warmStone">
                        {t.topBar.emergencyLine}
                      </p>
                      <p className="text-base font-bold text-slateDeep mt-0.5">
                        {PHONE_DISPLAY}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={onOpenModal}
                      className="inline-flex items-center justify-center gap-2 bg-sapphire hover:bg-sapphire-light text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{t.hero.primaryCta}</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-slateMuted mt-3 pt-2.5 border-t border-stoneBorder/80">
                    {t.hero.protocolCard.footerNote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
