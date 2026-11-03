import React, { useState } from 'react';
import { Phone, Shield, Globe, MessageCircle, Menu, X, Check, Copy } from 'lucide-react';
import {
  Language,
  TranslationContent,
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_NUMBER,
} from '../i18n/translations';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationContent;
  onOpenModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, setLang, t, onOpenModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const languages: Language[] = ['EN', 'RU', 'MNE'];

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(PHONE_DISPLAY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    lang === 'RU'
      ? 'Здравствуйте, мне необходима консультация координатора Memorijal d.o.o. по вопросу репатриации / кремации в Черногории.'
      : lang === 'MNE'
      ? 'Poštovani, potrebna mi je konsultacija koordinatora Memorijal d.o.o. povodom međunarodne repatrijacije / kremacije.'
      : 'Hello, I require assistance from a Memorijal d.o.o. coordinator regarding repatriation / cremation in Montenegro.'
  )}`;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-stoneBorder shadow-sm">
      {/* Top Emergency & Institutional Bar */}
      <div className="bg-sapphire text-white text-xs sm:text-sm py-2 px-4 sm:px-6 lg:px-8 border-b border-sapphire-light/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Pulsing 24/7 Support Available Badge + Jurisdiction */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 bg-forest px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide text-white shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-80"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              {t.topBar.badge247}
            </span>
            <span className="hidden md:inline-block text-slate-200 font-normal">
              {t.topBar.jurisdiction}
            </span>
          </div>

          {/* Right: Direct Call (+382 __ _______) & Direct WhatsApp */}
          <div className="flex items-center gap-3 sm:gap-5 ml-auto">
            <span className="hidden lg:inline text-slate-200 text-xs">
              {t.topBar.emergencyLine}
            </span>
            <div className="flex items-center gap-1.5">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-emerald-200 transition-colors"
                aria-label={`${t.topBar.callCta} ${PHONE_DISPLAY}`}
              >
                <Phone className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <span className="tracking-wide">{PHONE_DISPLAY}</span>
              </a>
              <button
                onClick={handleCopyPhone}
                type="button"
                title="Copy phone number"
                className="p-1 rounded hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                aria-label="Copy emergency phone number"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <span className="text-white/30 hidden sm:inline">|</span>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-forest hover:bg-forest-hover text-white font-semibold px-3 py-1 rounded text-xs transition-colors shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{t.topBar.whatsappCta}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Left: Brand Logo & Subtitle */}
          <a
            href="#top"
            className="flex items-center gap-3.5 group focus:outline-none"
          >
            <div className="w-11 h-11 rounded-lg bg-sapphire flex items-center justify-center text-white shadow-sm border border-sapphire-light/20 group-hover:bg-sapphire-light transition-colors shrink-0">
              <Shield className="w-5 h-5 text-stone-100 stroke-[1.75]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-2xl sm:text-[26px] font-bold tracking-[0.08em] text-slateDeep leading-none">
                  MEMORIJAL
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-warmStone hidden sm:inline">
                  d.o.o.
                </span>
              </div>
              <span className="text-[11px] sm:text-xs text-slateMuted font-medium tracking-tight mt-1">
                {t.header.brandSubtitle}
              </span>
            </div>
          </a>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-7 text-sm font-medium text-slateDeep" aria-label="Main Navigation">
            <a
              href="#services"
              className="hover:text-sapphire transition-colors py-1"
            >
              {t.header.navServices}
            </a>
            <a
              href="#estimator"
              className="hover:text-sapphire transition-colors py-1"
            >
              {t.header.navEstimator}
            </a>
            <a
              href="#process"
              className="hover:text-sapphire transition-colors py-1"
            >
              {t.header.navProcess}
            </a>
            <a
              href="#credentials"
              className="hover:text-sapphire transition-colors py-1"
            >
              {t.header.navCredentials}
            </a>
            <a
              href="#director"
              className="hover:text-sapphire transition-colors py-1"
            >
              {t.header.navContact}
            </a>
          </nav>

          {/* Right: Prominent Language Switcher (EN | RU | MNE) & Sticky Action */}
          <div className="flex items-center gap-3">
            {/* Language Switcher Pill */}
            <div
              className="inline-flex items-center bg-alabaster p-1 rounded-lg border border-stoneBorder"
              role="group"
              aria-label="Language switcher"
            >
              <Globe className="w-3.5 h-3.5 text-slateMuted ml-2 mr-1 hidden sm:inline" />
              {languages.map((code) => {
                const active = lang === code;
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setLang(code)}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold tracking-wider transition-all ${
                      active
                        ? 'bg-sapphire text-white shadow-sm'
                        : 'text-slateMuted hover:text-slateDeep hover:bg-white/60'
                    }`}
                    aria-pressed={active}
                  >
                    {code}
                  </button>
                );
              })}
            </div>

            {/* Emergency Coordinator Modal Trigger (Desktop/Tablet) */}
            <button
              type="button"
              onClick={onOpenModal}
              className="hidden sm:inline-flex items-center gap-2 bg-forest hover:bg-forest-hover text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-all"
            >
              <Phone className="w-4 h-4 shrink-0" />
              <span>{t.header.emergencyBtn}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg border border-stoneBorder text-slateDeep hover:bg-alabaster transition-colors"
              aria-label="Toggle Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-stoneBorder px-4 pt-3 pb-6 shadow-elevated">
          <nav className="flex flex-col space-y-2 text-base font-medium text-slateDeep">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-alabaster transition-colors"
            >
              {t.header.navServices}
            </a>
            <a
              href="#estimator"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-alabaster transition-colors"
            >
              {t.header.navEstimator}
            </a>
            <a
              href="#process"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-alabaster transition-colors"
            >
              {t.header.navProcess}
            </a>
            <a
              href="#credentials"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-alabaster transition-colors"
            >
              {t.header.navCredentials}
            </a>
            <a
              href="#director"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-alabaster transition-colors"
            >
              {t.header.navContact}
            </a>
          </nav>

          <div className="mt-4 pt-4 border-t border-stoneBorder grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={PHONE_HREF}
              className="flex items-center justify-center gap-2 bg-sapphire text-white font-semibold py-3 px-4 rounded-lg text-sm"
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
              className="flex items-center justify-center gap-2 bg-forest text-white font-semibold py-3 px-4 rounded-lg text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.hero.primaryCta}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

