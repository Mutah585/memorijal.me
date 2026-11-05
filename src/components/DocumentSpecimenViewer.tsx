import React, { useState } from 'react';
import {
  FileText,
  Shield,
  X,
  Eye,
  CheckCircle2,
  Info,
  Stamp,
  Lock,
} from 'lucide-react';
import { LocaleSlug } from '../data/seo-routes';

export interface DocumentSpecimenViewerProps {
  locale: LocaleSlug;
  className?: string;
}

interface SpecimenData {
  id: string;
  title: Record<LocaleSlug, string>;
  authority: Record<LocaleSlug, string>;
  category: string;
  summary: Record<LocaleSlug, string>;
  callouts: Array<{
    title: Record<LocaleSlug, string>;
    desc: Record<LocaleSlug, string>;
    iconType: 'lock' | 'stamp' | 'shield';
  }>;
  legalNotice: Record<LocaleSlug, string>;
}

const SPECIMENS: SpecimenData[] = [
  {
    id: 'potvrda_o_smrti',
    title: {
      ru: 'Врачебное свидетельство о смерти (Potvrda o smrti)',
      en: 'Medical Certificate of Cause of Death (Potvrda o smrti)',
      mne: 'Ljekarska potvrda o smrti (Potvrda o smrti)',
    },
    authority: {
      ru: 'Клинический врач / Патологоанатом больницы (Kotor / KCCG)',
      en: 'Attending Physician / Hospital Pathologist (Kotor / KCCG)',
      mne: 'Ordinirajući ljekar / Patolog (Kotor / KCCG)',
    },
    category: 'Form M-1',
    summary: {
      ru: 'Первичный медицинский документ, констатирующий факт, точное время и клиническую причину смерти.',
      en: 'Initial statutory medical record certifying the verified fact, exact time, and clinical cause of death.',
      mne: 'Primarni medicinski dokument koji utvrđuje činjenicu, tačno vrijeme i klinički uzrok smrti.',
    },
    callouts: [
      {
        title: {
          ru: 'Конфиденциальность диагноза',
          en: 'Cause of Death Confidentiality',
          mne: 'Povjerljivost medicinskog uzroka',
        },
        desc: {
          ru: 'Шифр МКБ-10 и диагноз указываются врачом в закрытой графе для ЗАГСа и врачебной тайны.',
          en: 'ICD-10 clinical code is recorded in a protected field governed by medical confidentiality protocols.',
          mne: 'MKB-10 dijagnoza upisuje se u zaštićenu rubriku za potrebe Matičnog registra.',
        },
        iconType: 'lock',
      },
      {
        title: {
          ru: 'Основание для ЗАГСа',
          en: 'Civil Registry Foundation',
          mne: 'Osnov za upis u Matičnu knjigu',
        },
        desc: {
          ru: 'Только на основании оригинала Potvrda o smrti выдается государственное гербовое свидетельство.',
          en: 'Sole legal instrument enabling the Municipal Civil Registry (Matičar) to issue Form C.',
          mne: 'Jedini zakonski osnov za opštinski upis u Matičnu knjigu umrlih i Obrazac C.',
        },
        iconType: 'stamp',
      },
    ],
    legalNotice: {
      ru: 'Оформляется координатором Memorijal непосредственно в ординаторской морга больницы.',
      en: 'Retrieved directly by Memorijal case director from the hospital pathology office.',
      mne: 'Preuzima koordinator agencije Memorijal direktno od nadležnog ljekara kapele.',
    },
  },
  {
    id: 'sprovodnica',
    title: {
      ru: 'Санитарный пропуск Минздрава (Sprovodnica)',
      en: 'Statutory Mortuary Transit Permit (Sprovodnica)',
      mne: 'Sprovodnica za prenos posmrtnih ostataka',
    },
    authority: {
      ru: 'Республиканская санитарная инспекция Черногории',
      en: 'Montenegro State Sanitary Inspection Authority',
      mne: 'Uprava za inspekcijske poslove — Sanitarna inspekcija',
    },
    category: 'Sprovodnica Form',
    summary: {
      ru: 'Главный трансграничный документ, разрешающий вывоз гроба или урны через государственную границу.',
      en: 'Primary statutory cross-border clearance authorizing export of remains or ashes via borders and airports.',
      mne: 'Glavni međunarodni dokument koji odobrava prelazak državne granice sanduka ili urne.',
    },
    callouts: [
      {
        title: {
          ru: 'Номерная государственная пломба',
          en: 'Registered Sanitary Lead Seal',
          mne: 'Brojčani sanitarni pečat',
        },
        desc: {
          ru: 'В графу вносится уникальный номер пломбы, наложенной инспектором после пайки цинка.',
          en: 'Records the numbered lead seal applied by the Sanitary Inspector upon certified zinc soldering.',
          mne: 'Evidentira jedinstveni serijski broj plombe postavljene nakon lemljenja cinka.',
        },
        iconType: 'stamp',
      },
      {
        title: {
          ru: 'Конвенция Страсбурга (1973)',
          en: '1973 Strasbourg Agreement Exemption',
          mne: 'Strazburški sporazum (1973)',
        },
        desc: {
          ru: 'Стандартизированная многоязычная форма освобождает транспорт от повторного досмотра на границах ЕС.',
          en: 'Multilingual standardized treaty layout exempts the mortuary transport from border customs re-opening.',
          mne: 'Standardizovani međunarodni obrazac oslobađa vozilo ponovnog carinskog otvaranja.',
        },
        iconType: 'shield',
      },
    ],
    legalNotice: {
      ru: 'Принимается пограничной полицией Черногории, Сербии, Хорватии и аэропортами TGD/TIV круглосуточно.',
      en: 'Recognized 24/7 by Montenegro border customs, EU Schengen transit points, and IATA cargo terminals.',
      mne: 'Prihvataju svi granični prelazi i aerodromi Crne Gore, Srbije i Evropske unije 24/7.',
    },
  },
  {
    id: 'izvod_mku',
    title: {
      ru: 'Международное свидетельство о смерти (Obrazac C)',
      en: 'International Multilingual Death Certificate (Vienna Form C)',
      mne: 'Izvod iz Matične knjige umrlih (Obrazac C)',
    },
    authority: {
      ru: 'Министерство внутренних дел (MUP) / Муниципальный ЗАГС',
      en: 'Ministry of Interior (MUP) / Civil Registry Office',
      mne: 'Ministarstvo unutrašnjih poslova (MUP) — Matičar',
    },
    category: 'Vienna Convention Form C',
    summary: {
      ru: 'Гербовое многоязычное свидетельство Венской конвенции 1976 года на 10 европейских языках.',
      en: 'Official 10-language civil registry extract issued under the 1976 Vienna Convention.',
      mne: 'Višejezični međunarodni izvod po Bečkoj konvenciji na 10 evropskih jezika.',
    },
    callouts: [
      {
        title: {
          ru: 'Действительно без перевода',
          en: 'Universal Recognition Without Translation',
          mne: 'Važi bez dodatnog prevoda',
        },
        desc: {
          ru: 'Содержит параллельные колонки на английском, французском, немецком, сербском и испанском.',
          en: 'Printed with multilingual standard fields recognized directly by foreign authorities and insurance.',
          mne: 'Sadrži standardizovane rubrike priznate u svim zemljama potpisnicama Bečke konvencije.',
        },
        iconType: 'shield',
      },
      {
        title: {
          ru: 'Гаагский апостиль',
          en: 'Hague Court Apostille',
          mne: 'Sudski Apostille pečat',
        },
        desc: {
          ru: 'При необходимости заверяется штампом Apostille в Суде первой инстанции (Kotor / Podgorica).',
          en: 'Authenticated with court Apostille seal at Basic Court (Osnovni sud) for worldwide legal validity.',
          mne: 'Po potrebi se overava Apostil pečatom u Osnovnom sudu za punu međunarodnu pravnu snagu.',
        },
        iconType: 'stamp',
      },
    ],
    legalNotice: {
      ru: 'Позволяет получить выплату в страховой компании и открыть наследственное дело на родине.',
      en: 'Enables insurance claims reimbursement and statutory probate proceedings in home jurisdiction.',
      mne: 'Omogućava isplatu osiguranja i pokretanje ostavinskog postupka u matičnoj državi.',
    },
  },
];

export const DocumentSpecimenViewer: React.FC<DocumentSpecimenViewerProps> = ({
  locale,
  className = '',
}) => {
  const [activeSpecimen, setActiveSpecimen] = useState<SpecimenData | null>(null);

  const t = {
    ru: {
      badge: 'Официальные бланки документов Черногории',
      title: 'Интерактивные образцы уставных документов',
      subtitle:
        'Нажмите на любой образец, чтобы изучить структуру бланка, порядок гербовой защиты и соответствие международным конвенциям.',
      viewDetails: 'Открыть образец',
      closeModal: 'Закрыть',
      authorityLabel: 'Выдающий орган:',
      statusLabel: 'Статус признания:',
      calloutHeader: 'Ключевые отметки и степени защиты:',
    },
    en: {
      badge: 'Official Montenegrin Statutory Forms',
      title: 'Interactive Document Specimen Inspector',
      subtitle:
        'Select any document specimen to inspect statutory layout, security stamps, and treaty compliance.',
      viewDetails: 'Inspect Specimen',
      closeModal: 'Close',
      authorityLabel: 'Issuing Authority:',
      statusLabel: 'Legal Recognition:',
      calloutHeader: 'Key Legal Markers & Security Seals:',
    },
    mne: {
      badge: 'Zvanični obrasci Crne Gore',
      title: 'Interaktivni uzorci zakonskih dokumenata',
      subtitle:
        'Kliknite na bilo koji dokument za pregled strukture obrasca, pečata i usklađenosti sa međunarodnim konvencijama.',
      viewDetails: 'Pogledaj uzorak',
      closeModal: 'Zatvori',
      authorityLabel: 'Nadležni organ izdavanja:',
      statusLabel: 'Status priznanja:',
      calloutHeader: 'Ključne oznake i stepeni zaštite:',
    },
  }[locale];

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sapphire">
        <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>{t.badge}</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-slateDeep">
            {t.title}
          </h3>
          <p className="text-xs text-slateMuted mt-0.5">
            {t.subtitle}
          </p>
        </div>
      </div>

      {/* 3 Specimen Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
        {SPECIMENS.map((specimen) => (
          <div
            key={specimen.id}
            onClick={() => setActiveSpecimen(specimen)}
            className="p-4 rounded-xl border border-stoneBorder bg-white hover:border-sapphire/60 hover:shadow-card transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-mono font-bold text-sapphire bg-sapphire/10 px-2 py-0.5 rounded-md">
                  {specimen.category}
                </span>
                <span className="text-xs text-slate-400 group-hover:text-sapphire flex items-center gap-1 transition-colors">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{t.viewDetails}</span>
                </span>
              </div>
              <h4 className="font-serif text-sm font-bold text-slateDeep leading-snug group-hover:text-sapphire transition-colors">
                {specimen.title[locale]}
              </h4>
              <p className="mt-1.5 text-[11px] text-slateMuted leading-relaxed line-clamp-2">
                {specimen.summary[locale]}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-stoneBorder/60 flex items-center justify-between text-[11px] text-slate-500">
              <span className="truncate max-w-[200px]">
                {specimen.authority[locale]}
              </span>
              <span className="text-forest font-semibold shrink-0">✓ Verified</span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Modal Lightbox */}
      {activeSpecimen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setActiveSpecimen(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-stoneBorder max-h-[90vh] overflow-y-auto space-y-5 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 border-b border-stoneBorder pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-sapphire bg-sapphire/10 px-2.5 py-1 rounded-md uppercase">
                  {activeSpecimen.category}
                </span>
                <h3 className="font-serif text-xl font-bold text-slateDeep mt-2">
                  {activeSpecimen.title[locale]}
                </h3>
                <p className="text-xs text-slateMuted mt-1">
                  {t.authorityLabel}{' '}
                  <strong className="text-slateDeep font-semibold">
                    {activeSpecimen.authority[locale]}
                  </strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveSpecimen(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-porcelain transition-colors cursor-pointer"
                aria-label={t.closeModal}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Specimen Visual Mockup Container */}
            <div className="p-4 rounded-xl bg-porcelain border border-stoneBorder/80 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-500 border-b border-stoneBorder pb-2">
                <span>CRNA GORA • MONTENEGRO</span>
                <span>STAN-SPECIMEN-2026</span>
              </div>
              <p className="text-slateDeep text-xs font-medium leading-relaxed">
                {activeSpecimen.summary[locale]}
              </p>
            </div>

            {/* Callouts Section */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-sapphire mb-3 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                <span>{t.calloutHeader}</span>
              </h4>
              <div className="space-y-2.5">
                {activeSpecimen.callouts.map((callout, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3"
                  >
                    <div className="mt-0.5 w-7 h-7 rounded-lg bg-white border border-stoneBorder flex items-center justify-center shrink-0 text-sapphire">
                      {callout.iconType === 'lock' ? (
                        <Lock className="w-3.5 h-3.5 text-amber-600" />
                      ) : callout.iconType === 'stamp' ? (
                        <Stamp className="w-3.5 h-3.5 text-sapphire" />
                      ) : (
                        <Shield className="w-3.5 h-3.5 text-forest" />
                      )}
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slateDeep">
                        {callout.title[locale]}
                      </h5>
                      <p className="text-[11px] text-slateMuted mt-0.5 leading-relaxed">
                        {callout.desc[locale]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal Notice Footer */}
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <p className="text-[11px] text-emerald-900 leading-relaxed font-medium">
                {activeSpecimen.legalNotice[locale]}
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setActiveSpecimen(null)}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-white hover:bg-slate-700 transition-colors cursor-pointer"
              >
                {t.closeModal}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

