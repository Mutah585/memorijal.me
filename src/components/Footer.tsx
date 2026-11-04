import React, { useState } from 'react';
import {
  Phone,
  MapPin,
  FileCheck,
  MessageCircle,
  Mail,
  Globe,
  Copy,
  Check,
} from 'lucide-react';
import {
  Language,
  TranslationContent,
  PHONE_DISPLAY,
  PHONE_HREF,
  SECONDARY_PHONE_DISPLAY,
  WHATSAPP_NUMBER,
  OFFICIAL_EMAIL,
} from '../i18n/translations';
import {
  langToLocaleSlug,
  buildLocalizedPath,
  ALL_SEO_ROUTES,
} from '../data/seo-routes';
import { GlossaryTerm } from './common/GlossaryTerm';

interface FooterProps {
  lang: Language;
  t: TranslationContent;
  onOpenModal: () => void;
  onNavigate?: (localizedPath: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  t,
  onOpenModal,
  onNavigate,
}) => {
  const [copied, setCopied] = useState(false);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;
  const locale = langToLocaleSlug(lang);

  const handleCopyCredentials = async () => {
    const textToCopy = `Entity: Memorijal d.o.o.
Country: Montenegro (Tivat / Podgorica)
PIB: 03489217 | PDV: 30/31-20948-4
Dispatch Line 24/7: ${PHONE_DISPLAY}
Official Email: ${OFFICIAL_EMAIL}
Bank & GOP Settlements: SEPA / SWIFT IBAN Transfer`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback silent failure
    }
  };

  const serviceLinks = ALL_SEO_ROUTES.filter((r) => r.category === 'service');
  const resourceLinks = ALL_SEO_ROUTES.filter((r) => r.category === 'resource');
  const corridorLinks = ALL_SEO_ROUTES.filter((r) => r.category === 'corridor');
  const locationLinks = ALL_SEO_ROUTES.filter((r) => r.category === 'location');

  const handleLink = (e: React.MouseEvent, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  return (
    <footer className="bg-slateDeep text-slate-200 border-t border-stoneBorder pb-24 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 (4 cols): Brand & Mission */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href={buildLocalizedPath(locale, '/')}
              onClick={(e) => handleLink(e, buildLocalizedPath(locale, '/'))}
              className="inline-flex items-center gap-3 md:gap-3.5 select-none group focus:outline-none"
            >
              <div className="relative flex items-center justify-center shrink-0 w-9 h-9 md:w-10 md:h-10">
                <img
                  src="/assets/branding/emblem-crest.svg"
                  alt={
                    lang === 'RU'
                      ? 'Герб Memorijal d.o.o.'
                      : lang === 'MNE'
                      ? 'Memorijal Grb'
                      : 'Memorijal d.o.o. Crest'
                  }
                  width={40}
                  height={40}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain -translate-y-[1px] brightness-125 contrast-105 transition-opacity duration-200 group-hover:opacity-90"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-slate-100 font-serif tracking-[0.14em] font-semibold text-lg leading-none">
                  MEMORIJAL
                </span>
                <span className="text-slate-400 font-sans tracking-[0.2em] text-[10px] uppercase mt-1 leading-none">
                  {lang === 'RU'
                    ? 'ЧЕРНОГОРИЯ • РЕПАТРИАЦИЯ'
                    : lang === 'MNE'
                    ? 'CRNA GORA • REPATRIJACIJA'
                    : 'MONTENEGRO • REPATRIATION'}
                </span>
              </div>
            </a>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t.footer.description}
            </p>
            <div className="text-[11px] text-slate-400 font-mono tracking-wide">
              Memorijal d.o.o. • PIB 03489217 • PDV 30/31-20948-4
            </div>
            <div className="pt-1 flex items-center gap-2 text-xs text-emerald-300 font-medium">
              <FileCheck className="w-4 h-4 shrink-0" />
              <span>
                <GlossaryTerm termKey="Cargo HUM" locale={locale}>IATA Cargo HUM</GlossaryTerm> •{' '}
                <GlossaryTerm termKey="Sprovodnica" locale={locale}>Sprovodnica</GlossaryTerm> •{' '}
                {lang === 'RU'
                  ? 'По доверенности'
                  : lang === 'MNE'
                  ? 'Po punomoćju'
                  : 'Consular PoA'}
              </span>
            </div>
          </div>

          {/* Col 2 (2 cols): Specialized Services & Resources */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              {t.footer.quickLinksTitle}
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {serviceLinks.map((item) => {
                const path = buildLocalizedPath(locale, item.path);
                return (
                  <li key={item.id}>
                    <a
                      href={path}
                      onClick={(e) => handleLink(e, path)}
                      className="hover:text-white transition-colors"
                    >
                      {item.locales[locale].breadcrumbLabel}
                    </a>
                  </li>
                );
              })}
              {resourceLinks.map((item) => {
                const path = buildLocalizedPath(locale, item.path);
                return (
                  <li key={item.id}>
                    <a
                      href={path}
                      onClick={(e) => handleLink(e, path)}
                      className="hover:text-white transition-colors"
                    >
                      {item.locales[locale].breadcrumbLabel}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 3 (3 cols): 24/7 Emergency Phone Lines */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              {t.footer.emergencyDispatchTitle}
            </h3>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <a
                href={PHONE_HREF}
                className="flex items-center gap-2.5 text-white font-semibold hover:text-emerald-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {PHONE_DISPLAY}{' '}
                  {lang === 'RU'
                    ? '(Дежурный 24/7)'
                    : lang === 'MNE'
                    ? '(Dežurni 24/7)'
                    : '(24/7 Duty)'}
                </span>
              </a>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span>
                  {SECONDARY_PHONE_DISPLAY}{' '}
                  {lang === 'RU'
                    ? '(Офис Подгорица)'
                    : lang === 'MNE'
                    ? '(Kancelarija Podgorica)'
                    : '(Podgorica Desk)'}
                </span>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-emerald-300 hover:text-emerald-200 font-medium transition-colors"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>
                  {lang === 'RU'
                    ? `WhatsApp 24/7 (${PHONE_DISPLAY})`
                    : lang === 'MNE'
                    ? `WhatsApp 24/7 (${PHONE_DISPLAY})`
                    : `WhatsApp Dispatch (${PHONE_DISPLAY})`}
                </span>
              </a>
              <a
                href={`mailto:${OFFICIAL_EMAIL}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{OFFICIAL_EMAIL}</span>
              </a>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenModal}
                className="inline-flex items-center gap-2 bg-forest hover:bg-forest-hover text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{t.hero.primaryCta}</span>
              </button>
            </div>
          </div>

          {/* Col 4 (3 cols): Registered Office Address & Fiscal Info */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              {t.footer.legalEntityTitle}
            </h3>
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{t.footer.officeTivat}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{t.footer.officePodgorica}</span>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300 font-mono space-y-2">
                <div>{t.footer.fiscalNotice}</div>
                <div className="pt-1 border-t border-white/10">
                  <button
                    type="button"
                    onClick={handleCopyCredentials}
                    className="inline-flex items-center gap-1.5 text-[11px] text-emerald-300 hover:text-emerald-200 font-sans font-medium transition-colors cursor-pointer group"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                    )}
                    <span>
                      {copied
                        ? lang === 'RU'
                          ? 'Реквизиты скопированы!'
                          : lang === 'MNE'
                          ? 'Podaci kopirani!'
                          : 'Dossier copied to clipboard!'
                        : lang === 'RU'
                        ? 'Скопировать досье для страховой / консульства'
                        : lang === 'MNE'
                        ? 'Kopiraj podatke za osiguranje / konzulat'
                        : 'Copy company dossier for insurer / embassy'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Sitemap Links Bar: 9 Corridors & 6 Montenegro Locations */}
        <div className="py-6 border-b border-white/10 space-y-3 text-[11px] text-slate-400">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <span className="font-semibold text-slate-200 inline-flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              {lang === 'RU'
                ? 'Коридоры:'
                : lang === 'MNE'
                ? 'Koridori:'
                : 'Corridors:'}
            </span>
            {corridorLinks.map((c) => {
              const path = buildLocalizedPath(locale, c.path);
              return (
                <a
                  key={c.id}
                  href={path}
                  onClick={(e) => handleLink(e, path)}
                  className="hover:text-white transition-colors"
                >
                  {c.locales[locale].breadcrumbLabel}
                </a>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <span className="font-semibold text-slate-200 inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              {lang === 'RU'
                ? 'Города ЧГ:'
                : lang === 'MNE'
                ? 'Opštine CG:'
                : 'Montenegro Hubs:'}
            </span>
            {locationLinks.map((l) => {
              const path = buildLocalizedPath(locale, l.path);
              return (
                <a
                  key={l.id}
                  href={path}
                  onClick={(e) => handleLink(e, path)}
                  className="hover:text-white transition-colors"
                >
                  {l.locales[locale].breadcrumbLabel}
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Copyright, Privacy & Studio Credit Bar */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>{t.footer.copyright}</p>
            <span className="hidden sm:inline text-white/20">•</span>
            <p>{t.footer.privacyNote}</p>
          </div>
          <p className="text-slate-400">
            {t.footer.creditPrefix}{' '}
            <span className="font-semibold text-white tracking-wide">
              {t.footer.creditStudio}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};
