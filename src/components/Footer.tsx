import React from 'react';
import {
  Phone,
  Shield,
  MapPin,
  FileCheck,
  MessageCircle,
  Mail,
  Globe,
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
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;
  const locale = langToLocaleSlug(lang);

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
    <footer className="bg-slateDeep text-slate-200 border-t border-stoneBorder">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 (4 cols): Brand & Mission */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-sapphire flex items-center justify-center text-white border border-white/15">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-[0.08em] text-white block leading-none">
                  MEMORIJAL
                </span>
                <span className="text-[11px] text-slate-300 block mt-1">
                  {t.header.brandSubtitle}
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t.footer.description}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-300 font-medium">
              <FileCheck className="w-4 h-4 shrink-0" />
              <span>IATA Cargo HUM • Sprovodnica • Consular PoA</span>
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
                <span>{PHONE_DISPLAY} (24/7 Duty)</span>
              </a>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{SECONDARY_PHONE_DISPLAY} (Podgorica Desk)</span>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-emerald-300 hover:text-emerald-200 font-medium transition-colors"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>WhatsApp Dispatch ({PHONE_DISPLAY})</span>
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
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300 font-mono">
                {t.footer.fiscalNotice}
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
