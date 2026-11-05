import React, { useState } from 'react';
import { Phone, MessageCircle, Menu, X, Check, Copy, Download } from 'lucide-react';
import {
  Language,
  TranslationContent,
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_NUMBER,
} from '../i18n/translations';
import { langToLocaleSlug, buildLocalizedPath } from '../data/seo-routes';
import { getDispatchStatus } from '../utils/dispatchStatus';
import { downloadVCard, getVCardButtonLabel } from '../utils/vcard';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationContent;
  onOpenModal: () => void;
  onNavigate?: (localizedPath: string, hash?: string) => void;
  isDistressMode?: boolean;
  onToggleDistressMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  t,
  onOpenModal,
  onNavigate,
  isDistressMode = false,
  onToggleDistressMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [vcardToast, setVcardToast] = useState<string | null>(null);

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

  // Dynamic Dispatch Status (Local Podgorica / Tivat Time)
  const dispatchStatus = getDispatchStatus(lang);

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
      lang === 'RU' ? 'О компании' : lang === 'MNE' ? 'O nama' : 'About Us',
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
            <span className="inline-flex items-center gap-2 font-medium tracking-wide text-white shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{dispatchStatus.statusText}</span>
            </span>
            <span className="text-white/20 select-none">|</span>
            <span className="text-[#B8C7D9] font-normal tracking-wide truncate">
              {topBarLicense}
            </span>
          </div>

          {/* Center-Right & Far Right: Coordinator 24/7 Phone + Copy + WhatsApp 24/7 Pill */}
          <div className="flex items-center gap-3 shrink-0 ml-4 relative">
            <div className="flex items-center gap-1.5 relative">
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

              {/* Floating Copy Feedback Toast */}
              {copied && (
                <div
                  role="status"
                  aria-live="polite"
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 z-50 bg-slate-900/95 text-emerald-300 border border-emerald-500/30 text-[10px] font-medium px-2.5 py-1 rounded-md shadow-lg whitespace-nowrap backdrop-blur-sm pointer-events-none transition-all animate-in fade-in slide-in-from-top-1"
                >
                  {lang === 'RU'
                    ? 'Номер скопирован в буфер'
                    : lang === 'MNE'
                    ? 'Broj kopiran'
                    : 'Phone number copied'}
                </div>
              )}
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

            {/* One-Click vCard Contact Download */}
            <button
              type="button"
              onClick={() =>
                downloadVCard(lang, (msg) => {
                  setVcardToast(msg);
                  setTimeout(() => setVcardToast(null), 3000);
                })
              }
              title={getVCardButtonLabel(lang)}
              className="hidden xl:inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-[#D8E6F5] hover:text-white font-medium px-2.5 py-1 rounded-full text-[11px] leading-none transition-colors border border-white/10 cursor-pointer"
            >
              <Download className="w-3 h-3 shrink-0 text-emerald-300" />
              <span>{getVCardButtonLabel(lang)}</span>
            </button>

            {/* Distress / Emergency Focus Mode Toggle */}
            {onToggleDistressMode && (
              <button
                type="button"
                onClick={onToggleDistressMode}
                className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                  isDistressMode
                    ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold shadow-xs'
                    : 'bg-white/10 hover:bg-white/20 text-[#D8E6F5] hover:text-white border-white/20'
                }`}
                title={
                  lang === 'RU'
                    ? 'Переключить режим экстренной помощи'
                    : lang === 'MNE'
                    ? 'Promijeni hitan režim'
                    : 'Toggle emergency distress mode'
                }
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isDistressMode ? 'bg-slate-950 animate-pulse' : 'bg-amber-400'
                  }`}
                />
                <span className="hidden sm:inline">
                  {isDistressMode
                    ? lang === 'RU'
                      ? 'Полный вид сайта'
                      : lang === 'MNE'
                      ? 'Puni prikaz'
                      : 'Full View'
                    : lang === 'RU'
                    ? 'Режим экстренной помощи'
                    : lang === 'MNE'
                    ? 'Hitan režim'
                    : 'Distress View'}
                </span>
                <span className="sm:hidden">
                  {isDistressMode ? 'Exit' : 'SOS'}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Quiet Luxury / Swiss Minimal Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[74px] gap-2 sm:gap-4 w-full min-w-0">
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
                decoding="async"
                className="w-full h-full object-contain translate-y-[0.5px] transition-opacity duration-200 group-hover:opacity-90"
              />
            </div>
            <div className="flex flex-col min-w-0 justify-center">
              <span className="font-serif text-[18px] sm:text-[19px] md:text-[21px] tracking-[0.14em] font-semibold text-slate-900 leading-none">
                MEMORIJAL
              </span>
              <span className="hidden sm:block text-[9px] md:text-[10px] tracking-[0.2em] text-slate-500 uppercase font-sans font-medium mt-1 leading-none whitespace-nowrap">
                {lang === 'RU'
                  ? 'ЧЕРНОГОРИЯ • РЕПАТРИАЦИЯ'
                  : lang === 'MNE'
                  ? 'CRNA GORA • REPATRIJACIJA'
                  : 'MONTENEGRO • REPATRIATION'}
              </span>
            </div>
          </a>

          {/* Center: Airy Desktop Navigation Links (Plus Jakarta Sans, 500 weight, #1A1D20) */}
          <nav
            className="hidden xl:flex items-center gap-4 lg:gap-5 2xl:gap-6 font-sans text-xs lg:text-[13.5px] 2xl:text-[14px] font-medium text-[#1A1D20]"
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
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
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
                      className={`px-1.5 sm:px-2 py-1 rounded text-[11px] font-medium tracking-wider transition-all ${
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

          {/* Crisis Contact Container inside Mobile Menu */}
          <div className="mt-4 pt-4 border-t border-[#E5E7EB] flex flex-col gap-2.5">
            <a
              href={PHONE_HREF}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#1E7B54] hover:bg-[#176343] text-white font-semibold py-3 px-4 rounded-xl text-sm shadow-xs transition-colors"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Phone className="w-4 h-4 shrink-0" />
              <span>
                {lang === 'RU'
                  ? `Позвонить 24/7 (${PHONE_DISPLAY})`
                  : lang === 'MNE'
                  ? `Pozovite 24/7 (${PHONE_DISPLAY})`
                  : `Call 24/7 (${PHONE_DISPLAY})`}
              </span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 border border-[#162B49] text-[#162B49] hover:bg-[#F9F9FB] font-semibold py-3 px-4 rounded-xl text-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4 shrink-0 text-[#1E7B54]" />
              <span>
                {lang === 'RU'
                  ? 'Написать в WhatsApp'
                  : lang === 'MNE'
                  ? 'Pišite na WhatsApp'
                  : 'Message on WhatsApp'}
              </span>
            </a>

            {/* Mobile vCard Download */}
            <button
              type="button"
              onClick={() => {
                downloadVCard(lang, (msg) => {
                  setVcardToast(msg);
                  setTimeout(() => setVcardToast(null), 3000);
                });
                setMobileMenuOpen(false);
              }}
              className="w-full inline-flex items-center justify-center gap-2 border border-stoneBorder bg-porcelain text-slateDeep hover:bg-stone-200 font-semibold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 shrink-0 text-sapphire" />
              <span>{getVCardButtonLabel(lang)}</span>
            </button>

            {/* Mobile Distress Mode Toggle */}
            {onToggleDistressMode && (
              <button
                type="button"
                onClick={() => {
                  onToggleDistressMode();
                  setMobileMenuOpen(false);
                }}
                className={`w-full inline-flex items-center justify-center gap-2 font-semibold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-colors border ${
                  isDistressMode
                    ? 'bg-slate-900 text-white border-slate-700'
                    : 'bg-amber-50 text-amber-950 border-amber-300 hover:bg-amber-100'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span>
                  {isDistressMode
                    ? lang === 'RU'
                      ? 'Вернуться к полному виду сайта'
                      : lang === 'MNE'
                      ? 'Povratak na puni prikaz sajta'
                      : 'Switch back to Full Website'
                    : lang === 'RU'
                    ? 'Режим экстренной помощи'
                    : lang === 'MNE'
                    ? 'Hitan režim'
                    : 'Distress / Emergency View'}
                </span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Toast Alert for vCard download */}
      {vcardToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-slate-900/95 text-emerald-300 border border-emerald-500/40 text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 flex items-center gap-2"
        >
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{vcardToast}</span>
        </div>
      )}
    </header>
  );
};
