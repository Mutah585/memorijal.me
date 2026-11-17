import React from 'react';
import {
  Scale,
  ShieldCheck,
  FileText,
  Printer,
  ArrowLeft,
  ChevronRight,
  Building2,
  Phone,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';
import {
  LocaleSlug,
  SeoRouteEntry,
  buildLocalizedPath,
} from '../../data/seo-routes';
import { getLegalDocuments, LegalDocId } from '../../data/legal-documents';
import {
  LEGAL_CREDENTIALS,
  getCrpsPibDisplay,
} from '../../config/legalCredentials';
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  OFFICIAL_EMAIL,
} from '../../i18n/translations';

interface LegalPageTemplateProps {
  locale: LocaleSlug;
  route: SeoRouteEntry;
  onNavigate: (localizedPath: string) => void;
  onOpenModal: () => void;
}

export const LegalPageTemplate: React.FC<LegalPageTemplateProps> = ({
  locale,
  route,
  onNavigate,
  onOpenModal,
}) => {
  const docs = getLegalDocuments(locale);
  const activeDoc =
    docs.find((d) => d.id === (route.id as LegalDocId)) || docs[0];
  const homePath = buildLocalizedPath(locale, '/');

  const ui =
    locale === 'ru'
      ? {
          home: 'Главная',
          hubCategory: 'Правовая информация и комплаенс',
          backToHome: 'Вернуться на главную',
          sidebarTitle: 'Юридические документы',
          sectionsTitle: 'Разделы документа',
          effectiveLabel: 'Дата вступления в силу:',
          printBtn: 'Скачать / Печать PDF',
          entityTitle: 'Идентификация оператора',
          statutesLabel: 'Нормативная база:',
          needHelpTitle: 'Вопросы по договору поручения или GDPR?',
          needHelpText:
            'Координатор 24/7 предоставит индивидуальный проект договора поручения (Ugovor o nalogu) и форму доверенности.',
          callBtn: 'Позвонить 24/7',
          modalBtn: 'Запросить проект договора',
        }
      : locale === 'mne'
      ? {
          home: 'Početna',
          hubCategory: 'Pravne informacije i usklađenost',
          backToHome: 'Povratak na početnu',
          sidebarTitle: 'Pravna dokumentacija',
          sectionsTitle: 'Odjeljci dokumenta',
          effectiveLabel: 'Datum stupanja na snagu:',
          printBtn: 'Štampaj / Snimi PDF',
          entityTitle: 'Identifikacija pravnog lica',
          statutesLabel: 'Zakonski osnov:',
          needHelpTitle: 'Pitanja o Ugovoru o nalogu ili ZZPL / GDPR?',
          needHelpText:
            'Dežurni koordinator 24/7 dostavlja individualni pisani Ugovor o nalogu i nacrt punomoćja.',
          callBtn: 'Pozovite 24/7',
          modalBtn: 'Zatražite ugovor',
        }
      : {
          home: 'Home',
          hubCategory: 'Legal & Regulatory Compliance',
          backToHome: 'Return to Main Overview',
          sidebarTitle: 'Legal Documents',
          sectionsTitle: 'Document Sections',
          effectiveLabel: 'Effective Date:',
          printBtn: 'Print / Save Legal Brief (PDF)',
          entityTitle: 'Corporate Entity Identification',
          statutesLabel: 'Statutory References:',
          needHelpTitle: 'Questions on Mandate Terms or GDPR?',
          needHelpText:
            'Our 24/7 duty coordinator can provide an individual written Mandate Agreement (Ugovor o nalogu) and Power of Attorney draft.',
          callBtn: 'Call 24/7 Desk',
          modalBtn: 'Request Formal Mandate',
        };

  const handleLink = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <article className="bg-porcelain text-slateDeep min-h-screen">
      {/* Official Print Letterhead */}
      <div className="hidden print:block print-letterhead print-header">
        <div className="flex justify-between items-center text-xs text-slate-700">
          <div>
            <span className="font-serif font-bold text-sm text-slate-900 block tracking-wider">
              MEMORIJAL D.O.O.
            </span>
            <span>
              {LEGAL_CREDENTIALS.HEADQUARTERS} •{' '}
              {LEGAL_CREDENTIALS.ACTIVITY_CODES_SHORT}
            </span>
          </div>
          <div className="text-right text-[11px]">
            <span className="block font-semibold">
              {getCrpsPibDisplay(locale)}
            </span>
            <span>
              {PHONE_DISPLAY} | {OFFICIAL_EMAIL} | memorijal.me
            </span>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-stoneBorder breadcrumbs-nav no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <nav
            aria-label="Breadcrumb"
            className="text-xs text-slate-500 font-sans tracking-wide flex items-center gap-1.5 flex-wrap"
          >
            <a
              href={homePath}
              onClick={(e) => handleLink(e, homePath)}
              className="hover:text-sapphire transition-colors font-medium"
            >
              {ui.home}
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500">{ui.hubCategory}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slateDeep font-semibold">
              {activeDoc.shortTitle}
            </span>
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-sapphire hover:text-sapphire-light bg-sapphire-subtle px-3 py-1.5 rounded-lg border border-sapphire/20 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{ui.printBtn}</span>
            </button>
            <a
              href={homePath}
              onClick={(e) => handleLink(e, homePath)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slateMuted hover:text-sapphire transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{ui.backToHome}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Institutional Header */}
      <section className="bg-white border-b border-stoneBorder py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sapphire-subtle border border-sapphire/20 text-sapphire text-xs font-semibold uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5" />
              <span>{route.locales[locale].eyebrow}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-semibold text-slateDeep leading-[1.15]">
              {activeDoc.fullTitle}
            </h1>

            <p className="text-sm sm:text-base text-slateMuted leading-relaxed max-w-3xl">
              {activeDoc.subtitle}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-alabaster border border-stoneBorder text-slateDeep font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
                {ui.effectiveLabel} {activeDoc.effectiveDate}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-alabaster border border-stoneBorder text-slateMuted">
                <Building2 className="w-3.5 h-3.5 text-sapphire" />
                {LEGAL_CREDENTIALS.COMPANY_NAME} •{' '}
                {LEGAL_CREDENTIALS.ACTIVITY_CODES_SHORT}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content + Sticky Sidebar */}
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sticky Left Sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6 no-print">
            {/* Switch between 3 Legal Documents */}
            <div className="bg-white rounded-2xl border border-stoneBorder p-5 shadow-card space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slateMuted flex items-center gap-2">
                <FileText className="w-4 h-4 text-sapphire" />
                <span>{ui.sidebarTitle}</span>
              </h2>
              <nav className="space-y-1.5" aria-label={ui.sidebarTitle}>
                {docs.map((doc) => {
                  const isActive = doc.id === activeDoc.id;
                  const targetPath = buildLocalizedPath(locale, doc.path);
                  return (
                    <a
                      key={doc.id}
                      href={targetPath}
                      onClick={(e) => handleLink(e, targetPath)}
                      className={`flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-sapphire text-white shadow-xs'
                          : 'bg-porcelain hover:bg-sapphire-subtle text-slateDeep border border-stoneBorder/70'
                      }`}
                    >
                      <span className="leading-snug">{doc.shortTitle}</span>
                      <ChevronRight
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? 'text-emerald-300' : 'text-slate-400'
                        }`}
                      />
                    </a>
                  );
                })}
              </nav>

              <button
                type="button"
                onClick={() => window.print()}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl border border-stoneBorder bg-alabaster hover:bg-stone-200 text-xs font-semibold text-slateDeep transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-sapphire" />
                <span>{ui.printBtn}</span>
              </button>
            </div>

            {/* Quick Section Anchors */}
            <div className="bg-white rounded-2xl border border-stoneBorder p-5 shadow-card space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slateMuted flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sapphire" />
                <span>{ui.sectionsTitle}</span>
              </h2>
              <ul className="space-y-1.5 text-xs">
                {activeDoc.sections.map((sec) => (
                  <li key={sec.id}>
                    <a
                      href={`#${sec.id}`}
                      className="block px-2.5 py-1.5 rounded-lg text-slateMuted hover:text-sapphire hover:bg-porcelain transition-colors leading-snug"
                    >
                      {sec.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Corporate Entity Identification Card */}
            <div className="bg-sapphire text-white rounded-2xl p-5 shadow-card space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
                <ShieldCheck className="w-4 h-4" />
                <span>{ui.entityTitle}</span>
              </div>
              <div className="text-xs text-slate-200 space-y-1.5 leading-relaxed">
                <p className="font-semibold text-white">
                  {LEGAL_CREDENTIALS.COMPANY_NAME} •{' '}
                  {LEGAL_CREDENTIALS.HEADQUARTERS}
                </p>
                <p className="text-[11px] text-slate-300">
                  {LEGAL_CREDENTIALS.ACTIVITY_CODES}
                </p>
                <p className="text-[11px] font-mono text-emerald-200 pt-1">
                  {getCrpsPibDisplay(locale)}
                </p>
                <p className="text-[11px] text-slate-300">{vatNoticeSafe(locale)}</p>
              </div>
            </div>
          </aside>

          {/* Document Body */}
          <div className="lg:col-span-8 space-y-6">
            {activeDoc.sections.map((sec) => (
              <section
                key={sec.id}
                id={sec.id}
                className="bg-white rounded-2xl border border-stoneBorder p-6 sm:p-8 shadow-card space-y-4 scroll-mt-28 step-card"
              >
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-sapphire bg-sapphire-subtle px-2.5 py-1 rounded-md">
                  <span>{sec.pillarBadge}</span>
                </div>

                <h2 className="font-serif text-xl sm:text-2xl font-semibold text-slateDeep">
                  {sec.heading}
                </h2>

                {sec.statutes.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slateMuted">
                    <span className="font-semibold text-slateDeep">
                      {ui.statutesLabel}
                    </span>
                    {sec.statutes.map((st, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-alabaster border border-stoneBorder font-mono text-[10.5px]"
                      >
                        {st}
                      </span>
                    ))}
                  </div>
                )}

                <div className="space-y-3 text-sm text-slateDeep leading-relaxed">
                  {sec.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {sec.bullets && sec.bullets.length > 0 && (
                  <ul className="space-y-2.5 pt-2">
                    {sec.bullets.map((b, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-sm text-slateDeep bg-porcelain p-3.5 rounded-xl border border-stoneBorder/70 leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-sapphire mt-2 shrink-0" />
                        <span className="min-w-0 break-words">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {/* Bottom Legal Assistance CTA */}
            <div className="bg-white rounded-2xl border border-stoneBorder p-6 sm:p-8 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 no-print">
              <div className="space-y-1.5 max-w-xl">
                <h3 className="font-serif text-xl font-semibold text-slateDeep">
                  {ui.needHelpTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slateMuted leading-relaxed">
                  {ui.needHelpText}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2.5 shrink-0 w-full sm:w-auto">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center justify-center gap-2 bg-forest hover:bg-forest-hover text-white font-semibold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{ui.callBtn}</span>
                </a>
                <button
                  type="button"
                  onClick={onOpenModal}
                  className="inline-flex items-center justify-center gap-2 bg-sapphire hover:bg-sapphire-light text-white font-semibold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  <span>{ui.modalBtn}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};

function vatNoticeSafe(locale: LocaleSlug): string {
  return LEGAL_CREDENTIALS.VAT_STATUS[locale];
}

