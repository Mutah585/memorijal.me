import React, { useState } from 'react';
import { Phone, MessageCircle, Menu, X, Check, Copy } from 'lucide-react';
import {
  Language,
  TranslationContent,
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_NUMBER,
} from '../i18n/translations';
import { langToLocaleSlug, buildLocalizedPath } from '../data/seo-routes';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationContent;
  onOpenModal: () => void;
  onNavigate?: (localizedPath: string, hash?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  t,
  onOpenModal,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const languages: Language[] = ['EN', 'RU', 'MNE'];
  const currentLocale = langToLocaleSlug(lang);
  const homePath = buildLocalizedPath(currentLocale, '/');

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(PHONE_DISPLAY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAnchorOrRoute = (e: React.MouseEvent, hash: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(homePath, hash);
      setMobileMenuOpen(false);
    }
  };

  const handleRouteClick = (e: React.MouseEvent, routeSlug: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(buildLocalizedPath(currentLocale, routeSlug));
      setMobileMenuOpen(false);
    }
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    lang === 'RU'
      ? 'Здравствуйте, мне необходима консультация координатора Memorijal d.o.o. по вопросу репатриации / кремации в Черногории.'
      : lang === 'MNE'
      ? 'Poštovani, potrebna mi je konsultacija koordinatora Memorijal d.o.o. povodom međunarodne repatrijacije / kremacije.'
      : 'Hello, I require assistance from a Memorijal d.o.o. coordinator regarding repatriation / cremation in Montenegro.'
  )}`;

  // Top Bar Localized Copy
  const topBarBadge =
    lang === 'RU'
      ? 'Дежурная линия 24/7'
      : lang === 'MNE'
      ? 'Dežurna linija 24/7'
      : '24/7 Dispatch Line';

  const topBarLicense =
    lang === 'RU'
      ? 'Лицензированная служба репатриации и кремации • Черногория'
      : lang === 'MNE'
      ? 'Licencirana služba repatrijacije i kremacije • Crna Gora'
      : 'Licensed Repatriation & Cremation Service • Montenegro';

  const topBarCoordinatorLabel =
    lang === 'RU'
      ? 'Координатор 24/7 (Тиват и Подгорица):'
      : lang === 'MNE'
      ? 'Koordinator 24/7 (Tivat i Podgorica):'
      : 'Coordinator 24/7 (Tivat & Podgorica):';

  // Navigation Labels (Quiet Luxury / Swiss minimal alignment)
  const navLabels = {
    services: lang === 'RU' ? 'Услуги' : lang === 'MNE' ? 'Usluge' : 'Services',
    calculator:
      lang === 'RU'
        ? 'Калькулятор маршрута'
        : lang === 'MNE'
        ? 'Kalkulator rute'
        : 'Route Calculator',
    corridors:
      lang === 'RU'
        ? 'Страны и Города'
        : lang === 'MNE'
        ? 'Zemlje i Gradovi'
        : 'Countries & Cities',
    rates: lang === 'RU' ? 'Тарифы' : lang === 'MNE' ? 'Tarife' : 'Rates',
    instructions:
      lang === 'RU' ? 'Инструкции' : lang === 'MNE' ? 'Instrukcije' : 'Instructions',
    management:
      lang === 'RU' ? 'Руководитель' : lang === 'MNE' ? 'Rukovoditelj' : 'Management',
  };

  const emergencyCtaLabel =
    lang === 'RU'
      ? 'Экстренная связь 24/7'
      : lang === 'MNE'
      ? 'Hitni kontakt 24/7'
      : 'Emergency Contact 24/7';

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#E5E7EB]">
      {/* 1. Compact "Dežurna linija 24/7" Top Bar (Fixed 32px height on desktop, hidden on narrow mobile viewports) */}
      <div className="hidden md:block h-8 bg-[#162B49] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between text-[11px] leading-none">
          {/* Left & Center-Left: Pulsing 24/7 Badge + Desaturated Silver-Blue Jurisdiction */}
          <div className="flex items-center gap-3.5 min-w-0">
            <span className="inline-flex items-center gap-1.5 font-medium tracking-wide text-white shrink-0">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-80"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#269E6B]"></span>
              </span>
              <span>{topBarBadge}</span>
            </span>
            <span className="text-white/20 select-none">|</span>
            <span className="text-[#B8C7D9] font-normal tracking-wide truncate">
              {topBarLicense}
            </span>
          </div>

          {/* Center-Right & Far Right: Coordinator 24/7 Phone + Copy + WhatsApp 24/7 Pill */}
          <div className="flex items-center gap-3 shrink-0 ml-4">
            <div className="flex items-center gap-1.5">
              <span className="hidden lg:inline text-[#B8C7D9] font-normal">
                {topBarCoordinatorLabel}
              </span>
              <a
                href={PHONE_HREF}
                className="font-medium text-white hover:text-emerald-200 transition-colors tracking-wide"
                aria-label={`${t.topBar.callCta} ${PHONE_DISPLAY}`}
              >
                {PHONE_DISPLAY}
              </a>
              <button
                onClick={handleCopyPhone}
                type="button"
                title={
                  lang === 'RU'
                    ? 'Скопировать номер телефона'
                    : lang === 'MNE'
                    ? 'Kopiraj broj telefona'
                    : 'Copy phone number'
                }
                className="p-0.5 rounded hover:bg-white/10 text-[#B8C7D9] hover:text-white transition-colors"
                aria-label={
                  lang === 'RU'
                    ? 'Скопировать экстренный номер телефона'
                    : lang === 'MNE'
                    ? 'Kopiraj hitni broj telefona'
                    : 'Copy emergency phone number'
                }
              >
                {copied ? (
                  <Check className="w-3 h-3 text-emerald-300" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-[#D8E6F5] hover:text-white font-medium px-2.5 py-1 rounded-full text-[11px] leading-none transition-colors border border-white/10"
            >
              <MessageCircle className="w-3 h-3 shrink-0" />
              <span>WhatsApp 24/7</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Quiet Luxury / Swiss Minimal Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[74px] gap-4">
          {/* Left: Optically Balanced 1:1 Brand Crest & Semantic DOM Typography */}
          <a
            href={homePath}
            onClick={(e) => handleAnchorOrRoute(e, '#top')}
            className="flex items-center gap-2.5 sm:gap-3 md:gap-3.5 select-none group focus:outline-none shrink-0"
          >
            <div className="relative flex items-center justify-center shrink-0 w-[34px] h-[34px] md:w-[38px] md:h-[38px]">
              <img
                src="/assets/branding/emblem-crest.svg"
                alt={
                  lang === 'RU'
                    ? 'Герб Memorijal d.o.o.'
                    : lang === 'MNE'
                    ? 'Memorijal Grb'
                    : 'Memorijal d.o.o. Crest'
                }
                width={38}
                height={38}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-contain translate-y-[0.5px] transition-opacity duration-200 group-hover:opacity-90"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-serif text-[18px] sm:text-[19px] md:text-[21px] tracking-[0.14em] font-semibold text-slate-900 leading-none">
                MEMORIJAL
              </span>
              <span className="text-[9px] md:text-[10px] tracking-[0.22em] text-slate-500 uppercase font-sans font-medium mt-1 leading-none">
                {lang === 'RU'
                  ? 'ЧЕРНОГОРИЯ • РЕПАТРИАЦИЯ'
                  : lang === 'MNE'
                  ? 'CRNA GORA • REPATRIJACIJA'
                  : 'MONTENEGRO • REPATRIATION'}
              </span>
            </div>
          </a>

          {/* Center: Airy Desktop Navigation Links (Plus Jakarta Sans 14px, 500 weight, #1A1D20) */}
          <nav
            className="hidden xl:flex items-center gap-6 2xl:gap-7 font-sans text-[14px] font-medium text-[#1A1D20]"
            aria-label={
              lang === 'RU'
                ? 'Основная навигация'
                : lang === 'MNE'
                ? 'Glavna navigacija'
                : 'Main Navigation'
            }
          >
            <a
              href={`${homePath}#services`}
              onClick={(e) => handleAnchorOrRoute(e, '#services')}
              className="hover:text-[#1E3A5F] transition-colors py-1 whitespace-nowrap"
            >
              {navLabels.services}
            </a>
            <a
              href={`${homePath}#estimator`}
              onClick={(e) => handleAnchorOrRoute(e, '#estimator')}
              className="hover:text-[#1E3A5F] transition-colors py-1 whitespace-nowrap"
            >
              {navLabels.calculator}
            </a>
            <a
              href={`${homePath}#seo-directory`}
              onClick={(e) => handleAnchorOrRoute(e, '#seo-directory')}
              className="hover:text-[#1E3A5F] transition-colors py-1 whitespace-nowrap"
            >
              {navLabels.corridors}
            </a>
            <a
              href={buildLocalizedPath(currentLocale, '/pricing-breakdown/')}
              onClick={(e) => handleRouteClick(e, '/pricing-breakdown/')}
              className="hover:text-[#1E3A5F] transition-colors py-1 whitespace-nowrap"
            >
              {navLabels.rates}
            </a>
            <a
              href={buildLocalizedPath(currentLocale, '/step-by-step-guide/')}
              onClick={(e) => handleRouteClick(e, '/step-by-step-guide/')}
              className="hover:text-[#1E3A5F] transition-colors py-1 whitespace-nowrap"
            >
              {navLabels.instructions}
            </a>
            <a
              href={buildLocalizedPath(currentLocale, '/about/director/')}
              onClick={(e) => handleRouteClick(e, '/about/director/')}
              className="hover:text-[#1E3A5F] transition-colors py-1 whitespace-nowrap"
            >
              {navLabels.management}
            </a>
          </nav>

          {/* Right: Clean Low-Border Language Switcher (EN | RU | MNE) & Solid Forest Green CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div
              className="inline-flex items-center bg-[#F9F9FB] p-0.5 rounded-md border border-[#E5E7EB]"
              role="group"
              aria-label={
                lang === 'RU'
                  ? 'Переключатель языка'
                  : lang === 'MNE'
                  ? 'Izbor jezika'
                  : 'Language switcher'
              }
            >
              {languages.map((code, idx) => {
                const active = lang === code;
                return (
                  <React.Fragment key={code}>
                    {idx > 0 && !active && lang !== languages[idx - 1] && (
                      <span className="text-[#D1D5DB] text-[10px] select-none">|</span>
                    )}
                    <button
                      type="button"
                      onClick={() => setLang(code)}
                      className={`px-2 py-1 rounded text-[11px] font-medium tracking-wider transition-all ${
                        active
                          ? 'bg-[#1A1D20] text-white shadow-xs'
                          : 'text-[#5A626A] hover:text-[#1A1D20]'
                      }`}
                      aria-pressed={active}
                    >
                      {code}
                    </button>
                  </React.Fragment>
                );
              })}
            </div>

            {/* Emergency Coordinator Modal Trigger (Forest Green #1E7B54 pill button) */}
            <button
              type="button"
              onClick={onOpenModal}
              className="hidden sm:inline-flex items-center gap-2 bg-[#1E7B54] hover:bg-[#176343] text-white text-[13px] font-medium px-4 py-2 rounded-full shadow-xs transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <span>{emergencyCtaLabel}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-md border border-[#E5E7EB] text-[#1A1D20] hover:bg-[#F9F9FB] transition-colors"
              aria-label={
                lang === 'RU'
                  ? 'Открыть меню'
                  : lang === 'MNE'
                  ? 'Otvori meni'
                  : 'Toggle Menu'
              }
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-[#E5E7EB] px-4 pt-3 pb-6 shadow-elevated">
          <nav className="flex flex-col space-y-1.5 font-sans text-[15px] font-medium text-[#1A1D20]">
            <a
              href={`${homePath}#services`}
              onClick={(e) => handleAnchorOrRoute(e, '#services')}
              className="px-3 py-2.5 rounded-lg hover:bg-[#F9F9FB] transition-colors"
            >
              {navLabels.services}
            </a>
            <a
              href={`${homePath}#estimator`}
              onClick={(e) => handleAnchorOrRoute(e, '#estimator')}
              className="px-3 py-2.5 rounded-lg hover:bg-[#F9F9FB] transition-colors"
            >
              {navLabels.calculator}
            </a>
            <a
              href={`${homePath}#seo-directory`}
              onClick={(e) => handleAnchorOrRoute(e, '#seo-directory')}
              className="px-3 py-2.5 rounded-lg hover:bg-[#F9F9FB] transition-colors"
            >
              {navLabels.corridors}
            </a>
            <a
              href={buildLocalizedPath(currentLocale, '/pricing-breakdown/')}
              onClick={(e) => handleRouteClick(e, '/pricing-breakdown/')}
              className="px-3 py-2.5 rounded-lg hover:bg-[#F9F9FB] transition-colors"
            >
              {navLabels.rates}
            </a>
            <a
              href={buildLocalizedPath(currentLocale, '/step-by-step-guide/')}
              onClick={(e) => handleRouteClick(e, '/step-by-step-guide/')}
              className="px-3 py-2.5 rounded-lg hover:bg-[#F9F9FB] transition-colors"
            >
              {navLabels.instructions}
            </a>
            <a
              href={buildLocalizedPath(currentLocale, '/about/director/')}
              onClick={(e) => handleRouteClick(e, '/about/director/')}
              className="px-3 py-2.5 rounded-lg hover:bg-[#F9F9FB] transition-colors"
            >
              {navLabels.management}
            </a>
          </nav>

          <div className="mt-4 pt-4 border-t border-[#E5E7EB] grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <a
              href={PHONE_HREF}
              className="flex items-center justify-center gap-2 bg-[#162B49] text-white font-medium py-2.5 px-4 rounded-full text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>{PHONE_DISPLAY}</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal();
              }}
              className="flex items-center justify-center gap-2 bg-[#1E7B54] text-white font-medium py-2.5 px-4 rounded-full text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{emergencyCtaLabel}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
