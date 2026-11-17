import React, { useState } from 'react';
import {
  Clock,
  Building2,
  Printer,
  X,
  ShieldCheck,
  Plane,
  FileCheck2,
  MapPin,
} from 'lucide-react';
import { LocaleSlug } from '../data/seo-routes';
import {
  LEGAL_CREDENTIALS,
  PHONE_DISPLAY,
  OFFICIAL_EMAIL,
  getCrpsPibDisplay,
} from '../config/legalCredentials';

export interface HospitalSlaMatrixProps {
  locale: LocaleSlug;
  className?: string;
}

interface FacilityRow {
  id: string;
  name: Record<LocaleSlug, string>;
  jurisdiction: Record<LocaleSlug, string>;
  releaseSla: Record<LocaleSlug, string>;
  sanitaryAndLogistics: Record<LocaleSlug, string>;
}

const FACILITIES: FacilityRow[] = [
  {
    id: 'kotor',
    name: {
      en: 'Opšta bolnica Kotor',
      ru: 'Opšta bolnica Kotor (Котор)',
      mne: 'Opšta bolnica Kotor',
    },
    jurisdiction: {
      en: 'Coastal hub for Tivat, Kotor & Budva',
      ru: 'Прибрежный хаб: Тиват, Котор, Будва',
      mne: 'Primorski centar za Tivat, Kotor i Budvu',
    },
    releaseSla: {
      en: 'Potvrda o smrti: 2–6h',
      ru: 'Potvrda o smrti: 2–6 ч',
      mne: 'Potvrda o smrti: 2–6 h',
    },
    sanitaryAndLogistics: {
      en: 'Same-day sanitary Lemljenje slot • 10 km to TIV Airport',
      ru: 'Пайка цинка (Lemljenje) в тот же день • 10 км до TIV',
      mne: 'Lemljenje istog dana • 10 km do aerodroma TIV',
    },
  },
  {
    id: 'kccg',
    name: {
      en: 'KCCG Podgorica (Klinički centar Crne Gore)',
      ru: 'KCCG Podgorica (Клинический центр ЧГ)',
      mne: 'KCCG Podgorica (Klinički centar CG)',
    },
    jurisdiction: {
      en: 'National clinical center & Forensic Medicine (Sudska medicina)',
      ru: 'Национальный центр и Судебная медицина',
      mne: 'Nacionalni centar i Sudska medicina',
    },
    releaseSla: {
      en: 'Standard: 4–12h • Autopsy (Obdukcija): 24–48h',
      ru: 'Стандарт: 4–12 ч • Вскрытие (Obdukcija): 24–48 ч',
      mne: 'Standardno: 4–12 h • Obdukcija: 24–48 h',
    },
    sanitaryAndLogistics: {
      en: '12 km to TGD Cargo Terminal • Direct Embassy proximity',
      ru: '12 км до карго-терминала TGD • Рядом с посольствами',
      mne: '12 km do kargo terminala TGD • Blizina ambasada',
    },
  },
  {
    id: 'bar',
    name: {
      en: 'Opšta bolnica Bar',
      ru: 'Opšta bolnica Bar (Стари-Бар)',
      mne: 'Opšta bolnica Bar',
    },
    jurisdiction: {
      en: 'Southern coast: Bar, Ulcinj & Petrovac',
      ru: 'Южное побережье: Бар, Улцинь, Петровац',
      mne: 'Južno primorje: Bar, Ulcinj, Petrovac',
    },
    releaseSla: {
      en: 'Release: 3–8h',
      ru: 'Выдача документов: 3–8 ч',
      mne: 'Izdavanje dokumentacije: 3–8 h',
    },
    sanitaryAndLogistics: {
      en: 'Direct coastal highway corridor to TGD / TIV',
      ru: 'Прямой выезд по Адриатической магистрали к TGD / TIV',
      mne: 'Direktan jadranski koridor prema TGD / TIV',
    },
  },
  {
    id: 'risan',
    name: {
      en: 'Specijalna bolnica Risan',
      ru: 'Specijalna bolnica Risan (Рисан)',
      mne: 'Specijalna bolnica Risan',
    },
    jurisdiction: {
      en: 'Neurosurgery & trauma center, Boka Bay',
      ru: 'Центр нейрохирургии и травматологии, Бока',
      mne: 'Centar za neurohirurgiju i ortopediju, Boka',
    },
    releaseSla: {
      en: 'Release: 3–6h',
      ru: 'Выдача документов: 3–6 ч',
      mne: 'Izdavanje dokumentacije: 3–6 h',
    },
    sanitaryAndLogistics: {
      en: 'Consolidated with Kotor Sanitary Inspection',
      ru: 'Консолидация с Санитарной инспекцией Котора',
      mne: 'Konsolidovano sa Sanitarnom inspekcijom Kotor',
    },
  },
  {
    id: 'berane-niksic',
    name: {
      en: 'KBC Berane & Opšta bolnica Nikšić',
      ru: 'KBC Berane и Opšta bolnica Nikšić',
      mne: 'KBC Berane i Opšta bolnica Nikšić',
    },
    jurisdiction: {
      en: 'Northern & Central Montenegro regions',
      ru: 'Северный и Центральный регионы Черногории',
      mne: 'Sjeverni i centralni region Crne Gore',
    },
    releaseSla: {
      en: 'Release: 4–8h',
      ru: 'Выдача документов: 4–8 ч',
      mne: 'Izdavanje dokumentacije: 4–8 h',
    },
    sanitaryAndLogistics: {
      en: 'Direct road corridor to Serbia (Dobrakovo / Ranče)',
      ru: 'Прямой автокоридор в Сербию (Доброково / Ранче)',
      mne: 'Direktan drumski koridor ka Srbiji (Dobrakovo / Ranče)',
    },
  },
];

export const HospitalSlaMatrix: React.FC<HospitalSlaMatrixProps> = ({
  locale,
  className = '',
}) => {
  const [dossierOpen, setDossierOpen] = useState(false);

  const t = {
    en: {
      badge: 'B2B Clinical SLA & Turnaround Matrix',
      title: 'Montenegro Hospital Mortuary SLA Matrix for Assistance Desks',
      subtitle:
        'Verified clinical document release timeframes and airport/border distances across Montenegro’s 5 primary hospital facilities before issuing a Guarantee of Payment (GOP).',
      colFacility: 'Clinical Facility',
      colJurisdiction: 'Coverage & Function',
      colSla: 'Medical Release SLA',
      colLogistics: 'Sanitary & Transit Link',
      btnDossier: 'Download B2B Provider & SEPA/SWIFT Dossier (PDF)',
      modalTitle: 'B2B ASSISTANCE & INSURER PROVIDER DOSSIER',
      modalSubtitle: 'Official Agency Mandate Credentials & GOP Settlement Protocol',
      btnPrint: 'Print / Save as PDF',
    },
    ru: {
      badge: 'B2B-матрица клинических сроков (SLA)',
      title: 'Сроки оформления в моргах 5 ключевых госпиталей Черногории',
      subtitle:
        'Актуальные нормативы выдачи медицинских документов (Potvrda o smrti) и логистические плечи до аэропортов/границ для страховых аджастеров и ассистансов перед выпуском GOP.',
      colFacility: 'Медицинское учреждение',
      colJurisdiction: 'Зона охвата и профиль',
      colSla: 'Срок выдачи в морге',
      colLogistics: 'Санитарный и транзитный контур',
      btnDossier: 'Скачать досье B2B и реквизиты SEPA/SWIFT (PDF)',
      modalTitle: 'B2B-ДОСЬЕ АГЕНТСТВА ДЛЯ СТРАХОВЫХ И АССИСТАНСОВ',
      modalSubtitle: 'Официальные реквизиты координации по договору поручения (KD 82.99)',
      btnPrint: 'Печать / Сохранить PDF',
    },
    mne: {
      badge: 'B2B Matrica kliničkih rokova (SLA)',
      title: 'Rokovi izdavanja dokumentacije u 5 ključnih bolnica u Crnoj Gori',
      subtitle:
        'Pregled prosječnih rokova za izdavanje Potvrde o smrti i udaljenosti do aerodroma/granica za međunarodna osiguranja prije izdavanja garancije plaćanja (GOP).',
      colFacility: 'Zdravstvena ustanova',
      colJurisdiction: 'Područje i nadležnost',
      colSla: 'Rok u mrtvačnici',
      colLogistics: 'Sanitarna i saobraćajna veza',
      btnDossier: 'Preuzmi B2B dosije i SEPA/SWIFT podatke (PDF)',
      modalTitle: 'B2B DOSIJE AGENCIJE ZA OSIGURAČE I ASISTENCE',
      modalSubtitle: 'Zvanični podaci agencije po Ugovoru o nalogu (KD 82.99)',
      btnPrint: 'Štampaj / Sačuvaj PDF',
    },
  }[locale];

  return (
    <div
      className={`bg-white rounded-2xl border border-stoneBorder p-6 sm:p-8 shadow-card space-y-6 ${className}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sapphire mb-1.5">
            <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{t.badge}</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slateDeep">
            {t.title}
          </h3>
          <p className="text-xs sm:text-sm text-slateMuted mt-1 max-w-3xl leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setDossierOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-sapphire hover:bg-sapphire-light text-white text-xs font-semibold shadow-xs transition-colors shrink-0 cursor-pointer no-print"
        >
          <Printer className="w-4 h-4 shrink-0" />
          <span>{t.btnDossier}</span>
        </button>
      </div>

      {/* Desktop Matrix Table */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-stoneBorder">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-sapphire text-white text-xs uppercase tracking-wider">
              <th className="py-3.5 px-4 font-semibold">{t.colFacility}</th>
              <th className="py-3.5 px-4 font-semibold">{t.colJurisdiction}</th>
              <th className="py-3.5 px-4 font-semibold">{t.colSla}</th>
              <th className="py-3.5 px-4 font-semibold">{t.colLogistics}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stoneBorder">
            {FACILITIES.map((fac) => (
              <tr key={fac.id} className="hover:bg-porcelain/70 transition-colors">
                <td className="py-3.5 px-4 font-semibold text-slateDeep">
                  {fac.name[locale]}
                </td>
                <td className="py-3.5 px-4 text-slateMuted">
                  {fac.jurisdiction[locale]}
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-xs font-semibold">
                    {fac.releaseSla[locale]}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-xs text-slateDeep">
                  {fac.sanitaryAndLogistics[locale]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {FACILITIES.map((fac) => (
          <div
            key={fac.id}
            className="p-4 rounded-xl bg-porcelain border border-stoneBorder space-y-2 text-xs"
          >
            <div className="font-semibold text-sm text-slateDeep flex items-center gap-2">
              <Building2 className="w-4 h-4 text-sapphire shrink-0" />
              <span>{fac.name[locale]}</span>
            </div>
            <p className="text-slateMuted">{fac.jurisdiction[locale]}</p>
            <div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-[11px] font-semibold">
                {fac.releaseSla[locale]}
              </span>
            </div>
            <p className="text-slateDeep flex items-center gap-1.5 pt-0.5">
              <Plane className="w-3.5 h-3.5 text-sapphire shrink-0" />
              <span>{fac.sanitaryAndLogistics[locale]}</span>
            </p>
          </div>
        ))}
      </div>

      {/* B2B Dossier Printable Modal */}
      {dossierOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.modalTitle}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
          onClick={() => setDossierOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stoneBorder max-h-[90vh] overflow-y-auto space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-stoneBorder pb-4">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sapphire block">
                  {LEGAL_CREDENTIALS.COMPANY_NAME} • {LEGAL_CREDENTIALS.HEADQUARTERS}
                </span>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-slateDeep mt-1">
                  {t.modalTitle}
                </h4>
                <p className="text-xs text-slateMuted mt-0.5">{t.modalSubtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setDossierOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer no-print"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-porcelain p-4 rounded-xl border border-stoneBorder">
              <div className="space-y-1">
                <span className="text-slateMuted block uppercase text-[10px] font-bold">
                  Legal Entity & Activity Code
                </span>
                <p className="font-semibold text-slateDeep">
                  {LEGAL_CREDENTIALS.COMPANY_NAME}
                </p>
                <p className="font-mono text-[11px] text-sapphire">
                  {LEGAL_CREDENTIALS.ACTIVITY_CODES}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-slateMuted block uppercase text-[10px] font-bold">
                  Headquarters & 24/7 GOP Desk
                </span>
                <p className="font-semibold text-slateDeep flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-forest shrink-0" />
                  Tivat, Crna Gora
                </p>
                <p className="font-mono text-slateDeep">
                  Tel / WhatsApp: {PHONE_DISPLAY}
                </p>
                <p className="font-mono text-sapphire">{OFFICIAL_EMAIL}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slateDeep leading-relaxed">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                <p>
                  <strong>Registration & Tax Status:</strong> {getCrpsPibDisplay(locale)}.{' '}
                  {LEGAL_CREDENTIALS.VAT_STATUS[locale]}.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <FileCheck2 className="w-4 h-4 text-sapphire shrink-0 mt-0.5" />
                <p>
                  <strong>B2B Billing & Settlements:</strong> Agency coordination fees are
                  itemized separately from pass-through third-party disbursements (
                  <em>prolazne stavke</em>: hospital morgue fees, sanitary inspection
                  taxes, Belgrade crematorium fees, licensed partner carriers, and IATA
                  Cargo HUM AWB). Settled via SEPA / SWIFT IBAN against formal GOP.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-stoneBorder no-print">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest hover:bg-forest-hover text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>{t.btnPrint}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
