import React from 'react';
import { MessageCircle, FileCheck, Shield, CheckCircle2 } from 'lucide-react';
import { Language } from '../i18n/translations';
import { langToLocaleSlug } from '../data/seo-routes';
import {
  STANDARD_PRICING_PACKAGES,
  PRICING_CLARIFICATION_NOTE,
  buildPackageWhatsAppHref,
} from '../data/pricing';

interface PricingSectionProps {
  lang: Language;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ lang }) => {
  const locale = langToLocaleSlug(lang);

  const sectionCopy =
    locale === 'ru'
      ? {
          eyebrow: 'ФИСКАЛЬНАЯ ПРОЗРАЧНОСТЬ И ОФИЦИАЛЬНЫЕ ТАРИФЫ (2026)',
          title: 'Базовые стартовые тарифы без скрытых комиссий',
          subtitle:
            'Каждая процедура оформляется официальным фискальным счетом Черногории (EFI QR) с прямой оплатой SEPA/SWIFT или по гарантийному письму страховой компании (GOP).',
          startingLabel: 'Базовый тариф пакета',
          fiscalNote:
            'Официальная регистрация DOO • PIB 03489217 • Прямой договор и фискальный чек EFI QR',
        }
      : locale === 'mne'
      ? {
          eyebrow: 'FISKALNA TRANSPARENTNOST I ZVANIČNE TARIFE (2026)',
          title: 'Početne cijene paketa bez skrivenih troškova',
          subtitle:
            'Svaka procedura se fakturiše uz zvanični crnogorski EFI QR fiskalni račun, SEPA/SWIFT IBAN uplatu ili direktno pokriće međunarodnog osiguranja (GOP).',
          startingLabel: 'Početna cijena paketa',
          fiscalNote:
            'Registrovani DOO • PIB 03489217 • Zvanični ugovor i EFI QR fiskalni račun',
        }
      : {
          eyebrow: 'FISCAL TRANSPARENCY & OFFICIAL TARIFF TIERS (2026)',
          title: 'Starting Package Rates with Zero Hidden Fees',
          subtitle:
            'Every case is itemized on an official Montenegrin EFI QR fiscal invoice, settled via corporate SEPA/SWIFT IBAN transfer or direct insurance Guarantee of Payment (GOP).',
          startingLabel: 'Starting Package Rate',
          fiscalNote:
            'Licensed Montenegrin DOO • PIB 03489217 • Official EFI QR Fiscal Invoice',
        };

  return (
    <section
      id="pricing-tiers"
      className="py-16 sm:py-22 bg-alabaster border-b border-stoneBorder"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-sapphire mb-3">
            <Shield className="w-4 h-4" />
            <span>{sectionCopy.eyebrow}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-slateDeep leading-tight">
            {sectionCopy.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slateMuted leading-relaxed">
            {sectionCopy.subtitle}
          </p>
        </div>

        {/*
          5 Standard Service Package Cards.
          Each card is a subgrid spanning 5 shared rows (badge / title / price / scope / CTA), so
          every row is sized to the tallest cell in the row of cards: titles, prices, scope text
          and CTA buttons align identically no matter how the copy wraps per locale or breakpoint.
        */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 items-stretch">
          {STANDARD_PRICING_PACKAGES.map((pkg, idx) => {
            const item = pkg.locales[locale];
            const isPrimary = idx === 0;
            return (
              <div
                key={pkg.id}
                className={`row-span-5 grid grid-rows-subgrid gap-y-0 h-full min-w-0 rounded-2xl border p-6 sm:p-7 transition-all bg-white shadow-card ${
                  isPrimary
                    ? 'border-sapphire/40 ring-1 ring-sapphire/15'
                    : 'border-stoneBorder'
                }`}
              >
                {/* Row 1: Package Badge */}
                <div className="min-h-[28px]">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-porcelain border border-stoneBorder text-[11px] font-semibold text-sapphire max-w-full">
                    <CheckCircle2 className="w-3.5 h-3.5 text-forest shrink-0" />
                    <span className="min-w-0 break-words">{item.badge}</span>
                  </div>
                </div>

                {/* Row 2: Package Title */}
                <h3 className="mt-4 font-serif text-xl sm:text-2xl font-semibold text-slateDeep leading-snug break-words">
                  {item.title}
                </h3>

                {/* Row 3: Headline Starting Price Tag */}
                <div className="mt-5 pt-4 border-t border-stoneBorder">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-warmStone block">
                    {sectionCopy.startingLabel}
                  </span>
                  <p className="mt-1 font-serif text-3xl sm:text-4xl font-bold text-sapphire tracking-tight">
                    {item.formattedPrice}
                  </p>
                  {/* Subtle Clarification Badge Under Price */}
                  <p className="mt-2 inline-flex items-start gap-1.5 text-[11px] text-slateMuted bg-porcelain px-2.5 py-1.5 rounded-lg border border-stoneBorder/80 leading-snug">
                    <FileCheck className="w-3.5 h-3.5 text-sapphire shrink-0 mt-0.5" />
                    <span>{item.clarification}</span>
                  </p>
                </div>

                {/* Row 4: Included Subtext (absorbs spare height) */}
                <p className="mt-4 text-xs sm:text-sm text-slateMuted leading-relaxed">
                  {item.subtext}
                </p>

                {/* Row 5: Direct WhatsApp Estimate CTA, pinned to the card bottom */}
                <div className="mt-6 pt-4 border-t border-stoneBorder/70 self-end">
                  <a
                    href={buildPackageWhatsAppHref(pkg, locale)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#1E7B54] hover:bg-[#176343] text-white text-xs sm:text-sm font-medium py-3 px-4 rounded-xl shadow-xs transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    <span>{item.ctaLabel}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Institutional Assistance & GOP Compliance Badge */}
        <div className="mt-8 bg-white rounded-2xl border border-stoneBorder p-6 sm:p-8 shadow-card">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sapphire mb-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>
                  {locale === 'ru'
                    ? 'Институциональный протокол со страховыми компаниями'
                    : locale === 'mne'
                    ? 'Institucionalni protokol sa osiguranjima'
                    : 'Institutional Travel Assistance Protocol'}
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slateDeep">
                {locale === 'ru'
                  ? 'Прямая работа по гарантийным письмам страховых компаний (GOP)'
                  : locale === 'mne'
                  ? 'Direktna saradnja putem garantnih pisama osiguranja (GOP)'
                  : 'Direct Settlement via Insurer Guarantee of Payment (GOP)'}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slateMuted leading-relaxed">
                {locale === 'ru'
                  ? 'Мы аккредитованы для прямого взаимодействия с международными ассистанс-службами Европы, Великобритании и СНГ. Семья полностью освобождена от предварительной оплаты при наличии действующего страхового полиса.'
                  : locale === 'mne'
                  ? 'Akreditovani smo za direktnu komunikaciju sa međunarodnim asistentskim kućama. Porodica je u potpunosti oslobođena plaćanja ukoliko preminulo lice posjeduje važeću polisu osiguranja.'
                  : 'Fully accredited for direct case settlement with global travel insurers and assistance companies worldwide. Families incur zero out-of-pocket expenses under an approved Guarantee of Payment.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto shrink-0 text-xs">
              <div className="p-3.5 rounded-xl bg-porcelain border border-stoneBorder">
                <span className="font-semibold text-sapphire block mb-1">
                  SEPA / SWIFT & EFI QR
                </span>
                <span className="text-slateMuted text-[11px] block">
                  {locale === 'ru'
                    ? 'Фискальные счета с QR-кодом Poreske uprave'
                    : locale === 'mne'
                    ? 'Fiskalni računi sa QR kodom Poreske uprave'
                    : 'Official Montenegrin Tax EFI QR invoicing'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-porcelain border border-stoneBorder">
                <span className="font-semibold text-emerald-700 block mb-1">
                  {locale === 'ru' ? '0 € из средств семьи' : locale === 'mne' ? '0 € trošak porodice' : '0 € Family Burden'}
                </span>
                <span className="text-slateMuted text-[11px] block">
                  {locale === 'ru'
                    ? 'Прямое покрытие полисом репатриации'
                    : locale === 'mne'
                    ? 'Direktno pokriće polisom osiguranja'
                    : 'Direct claim settlement under valid policy'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-porcelain border border-stoneBorder">
                <span className="font-semibold text-sapphire block mb-1">
                  Fluent English / RU / UA
                </span>
                <span className="text-slateMuted text-[11px] block">
                  {locale === 'ru'
                    ? 'Прямая связь с медицинскими аджастерами'
                    : locale === 'mne'
                    ? 'Direktna veza sa medicinskim dispečerima'
                    : 'Immediate coordination with claims adjusters'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Statutory Clarification Note */}
        <div className="mt-8 p-4 rounded-xl bg-white border border-stoneBorder flex flex-wrap items-center justify-between gap-3 text-xs text-slateMuted">
          <span className="font-medium text-slateDeep">
            {sectionCopy.fiscalNote}
          </span>
          <span>{PRICING_CLARIFICATION_NOTE[locale]}</span>
        </div>
      </div>
    </section>
  );
};

