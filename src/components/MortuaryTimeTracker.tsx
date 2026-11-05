import React, { useState, useMemo } from 'react';
import {
  Clock,
  Building2,
  AlertTriangle,
  CheckCircle2,
  Shield,
  MessageCircle,
} from 'lucide-react';
import { LocaleSlug } from '../data/seo-routes';
import { WHATSAPP_NUMBER } from '../i18n/translations';

export interface MortuaryTimeTrackerProps {
  locale: LocaleSlug;
  initialHospitalId?: string;
  className?: string;
}

interface HospitalData {
  id: string;
  name: {
    en: string;
    ru: string;
    mne: string;
  };
  city: string;
  dailyRateEur: number;
}

const HOSPITALS: HospitalData[] = [
  {
    id: 'kotor',
    name: {
      en: 'General Hospital Kotor (Opšta bolnica Kotor)',
      ru: 'Региональная больница Котора (Opšta bolnica Kotor)',
      mne: 'Opšta bolnica Kotor (Regionalna bolnica)',
    },
    city: 'Kotor',
    dailyRateEur: 30,
  },
  {
    id: 'kccg',
    name: {
      en: 'Clinical Center of Montenegro (KCCG Podgorica)',
      ru: 'Клинический центр Черногории (KCCG Подгорица)',
      mne: 'Klinički centar Crne Gore (KCCG Podgorica)',
    },
    city: 'Podgorica',
    dailyRateEur: 35,
  },
  {
    id: 'bar',
    name: {
      en: 'General Hospital Bar (Opšta bolnica Bar)',
      ru: 'Общая больница Бара (Opšta bolnica Bar)',
      mne: 'Opšta bolnica Bar (Stari Bar)',
    },
    city: 'Bar',
    dailyRateEur: 25,
  },
  {
    id: 'berane',
    name: {
      en: 'Clinical Hospital Center Berane (KBC Berane)',
      ru: 'Клиническо-больничный центр Беране (KBC Berane)',
      mne: 'Kliničko-bolnički centar Berane (KBC Berane)',
    },
    city: 'Berane',
    dailyRateEur: 25,
  },
];

type TimeRange = '0_12' | '12_24' | '24_48' | '48_plus';

export const MortuaryTimeTracker: React.FC<MortuaryTimeTrackerProps> = ({
  locale,
  initialHospitalId = 'kotor',
  className = '',
}) => {
  const [selectedHospitalId, setSelectedHospitalId] =
    useState<string>(initialHospitalId);
  const [selectedTimeRange, setSelectedTimeRange] =
    useState<TimeRange>('0_12');

  const selectedHospital =
    HOSPITALS.find((h) => h.id === selectedHospitalId) || HOSPITALS[0];

  const calculation = useMemo(() => {
    switch (selectedTimeRange) {
      case '0_12':
        return {
          remainingFreeHours: '12–24 ч / hrs',
          status: 'free_safe',
          accruedDays: 0,
          currentSurchargeEur: 0,
          nextSurchargeStartsIn: '12–24h',
        };
      case '12_24':
        return {
          remainingFreeHours: '0–12 ч / hrs (Критическое окно)',
          status: 'free_warning',
          accruedDays: 0,
          currentSurchargeEur: 0,
          nextSurchargeStartsIn: '< 12h',
        };
      case '24_48':
        return {
          remainingFreeHours: '0 ч / 0 hrs (Льготные 24ч истекли)',
          status: 'accruing',
          accruedDays: 1,
          currentSurchargeEur: selectedHospital.dailyRateEur,
          nextSurchargeStartsIn: 'Каждые 24ч',
        };
      case '48_plus':
        return {
          remainingFreeHours: '0 ч / 0 hrs (Льготные 24ч истекли)',
          status: 'accruing_high',
          accruedDays: 2,
          currentSurchargeEur: selectedHospital.dailyRateEur * 2,
          nextSurchargeStartsIn: 'Каждые 24ч',
        };
    }
  }, [selectedTimeRange, selectedHospital]);

  const t = {
    ru: {
      badge: 'Калькулятор льготных часов и начислений морга',
      title: 'Контроль коммерческих начислений морга (24-часовой льготный период)',
      subtitle:
        'По закону Черногории первые 24 часа нахождения в клиническом морге бесплатны. Свыше 24 часов начисляется ежедневная коммерческая ставка.',
      selectHospitalLabel: 'Выберите медицинское учреждение / морг:',
      selectTimeLabel: 'Сколько часов назад наступила смерть / тело поступило в морг:',
      timeOptions: [
        { id: '0_12', label: 'До 12 часов (0–12ч)' },
        { id: '12_24', label: '12–24 часа (Критический порог)' },
        { id: '24_48', label: '24–48 часов (Истек льготный срок)' },
        { id: '48_plus', label: 'Более 48 часов (Начисление суток)' },
      ],
      resultTitle: 'Статус начислений по моргу',
      freeHoursRemaining: 'Остаток бесплатного времени:',
      dailyRate: 'Суточная ставка после 24ч:',
      currentAccrual: 'Ориентировочно начислено за морг:',
      perDay: 'в сутки',
      eur: '€',
      reassurance:
        'При передаче кейса координатору Memorijal начисление коммерческих суток морга останавливается, а оформление выездных документов берется под контроль.',
      nonDisposalTitle: 'Гарантия защиты от принудительного захоронения:',
      nonDisposalGuarantee:
        'Риск принудительного захоронения исключен. После регистрации кейса координатором Memorijal морг присваивает делу статус «Международная репатриация» и резервирует камеру до завершения консульских процедур.',
      timelineTitle: 'Уставные этапы нахождения тела в морге больницы (Kotor / KCCG):',
      timeline0_24: '0–24 ч: Льготный период (0 €)',
      timeline24_7d: '24 ч – 7 дней: Оформление справок и запайка цинка',
      timeline7_14d: '7–14 дней: Резерв камеры (статус «Международная репатриация»)',
      whatsappCta: 'Остановить начисления морга',
      whatsappPrefill: `Здравствуйте! Прошу помочь остановить коммерческие начисления морга в ${selectedHospital.name.ru}. Время поступления: ${selectedTimeRange}.`,
    },
    en: {
      badge: 'Mortuary Free Time & Accrual Calculator',
      title: 'Mortuary Free Time & Holding Surcharge Tracker (24h Statutory Window)',
      subtitle:
        'Under Montenegrin public health regulations, the first 24 hours in a hospital mortuary are statutory free. Beyond 24 hours, commercial holding surcharges accrue daily.',
      selectHospitalLabel: 'Select clinical hospital / mortuary:',
      selectTimeLabel: 'Hours elapsed since death / mortuary admission:',
      timeOptions: [
        { id: '0_12', label: 'Under 12 hours (0–12h)' },
        { id: '12_24', label: '12–24 hours (Critical deadline)' },
        { id: '24_48', label: '24–48 hours (Free window expired)' },
        { id: '48_plus', label: 'Over 48 hours (Commercial accrual)' },
      ],
      resultTitle: 'Current Mortuary Accrual Status',
      freeHoursRemaining: 'Remaining statutory free window:',
      dailyRate: 'Daily rate beyond 24h:',
      currentAccrual: 'Estimated accrued holding fee:',
      perDay: '/ day',
      eur: '€',
      reassurance:
        'Upon authorizing Memorijal case dispatch, commercial mortuary surcharge accrual is frozen under official statutory requisition.',
      nonDisposalTitle: 'Zero Municipal Disposal Guarantee:',
      nonDisposalGuarantee:
        'Zero risk of municipal disposal. Once Memorijal formally requisitions the case, clinical pathology assigns "International Repatriation" status, holding the body securely until diplomatic clearances finalize.',
      timelineTitle: 'Statutory Mortuary Holding Bounds (Kotor / KCCG Podgorica):',
      timeline0_24: '0–24h: Free statutory window (€0)',
      timeline24_7d: '24h–7 days: Medical clearance & zinc hermetic sealing',
      timeline7_14d: '7–14 days: Chamber reservation under International Repatriation status',
      whatsappCta: 'Freeze Mortuary Fees',
      whatsappPrefill: `Hello! Please assist in freezing commercial mortuary fees at ${selectedHospital.name.en}. Admission elapsed: ${selectedTimeRange}.`,
    },
    mne: {
      badge: 'Kalkulator besplatnih sati i troškova kapele',
      title: 'Kontrola bolničkih troškova kapele (Zakonski rok od 24 sata)',
      subtitle:
        'Po propisima Crne Gore, prvih 24 sata zadržavanja tijela u bolničkoj kapeli je besplatno. Nakon isteka 24h, obračunava se komercijalna dnevna ležarina.',
      selectHospitalLabel: 'Izaberite zdravstvenu ustanovu / kapelu:',
      selectTimeLabel: 'Koliko je sati proteklo od nastupanja smrti / prijema u kapelu:',
      timeOptions: [
        { id: '0_12', label: 'Do 12 sati (0–12h)' },
        { id: '12_24', label: '12–24 sata (Kritični rok)' },
        { id: '24_48', label: '24–48 sati (Istekao besplatni rok)' },
        { id: '48_plus', label: 'Više od 48 sati (Dnevna ležarina)' },
      ],
      resultTitle: 'Status obračuna kapele',
      freeHoursRemaining: 'Preostalo besplatno vrijeme:',
      dailyRate: 'Dnevna ležarina nakon 24h:',
      currentAccrual: 'Procijenjeni trošak ležarine:',
      perDay: '/ dan',
      eur: '€',
      reassurance:
        'Angažovanjem koordinatora agencije Memorijal zaustavlja se obračun komercijalnih bolničkih troškova kapele.',
      nonDisposalTitle: 'Garancija zaštite od prinudnog sahranjivanja:',
      nonDisposalGuarantee:
        'Isključen rizik prinudnog sahranjivanja. Nakon prijave slučaja od strane agencije Memorijal, kapela dodjeljuje status međunarodne repatrijacije.',
      timelineTitle: 'Zakonski rokovi zadržavanja tijela u kapeli (Kotor / KCCG):',
      timeline0_24: '0–24h: Zakonski besplatan boravak (0 €)',
      timeline24_7d: '24h–7 dana: Priprema dokumentacije i lemljenje cinka',
      timeline7_14d: '7–14 dana: Rezervacija komore pod statusom međunarodne repatrijacije',
      whatsappCta: 'Zaustavi obračun kapele',
      whatsappPrefill: `Dobar dan! Molim za pomoć oko zaustavljanja troškova ležarine u ${selectedHospital.name.mne}. Vrijeme prijema: ${selectedTimeRange}.`,
    },
  }[locale];

  const isWarningOrAccruing =
    calculation.status === 'free_warning' ||
    calculation.status === 'accruing' ||
    calculation.status === 'accruing_high';

  return (
    <div
      className={`bg-white rounded-2xl border border-stoneBorder p-6 sm:p-8 shadow-card ${className}`}
    >
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sapphire mb-2">
        <Clock className="w-4 h-4 text-sapphire shrink-0" />
        <span>{t.badge}</span>
      </div>

      <h3 className="font-serif text-xl sm:text-2xl font-bold text-slateDeep">
        {t.title}
      </h3>
      <p className="mt-1 text-xs sm:text-sm text-slateMuted leading-relaxed max-w-3xl">
        {t.subtitle}
      </p>

      {/* Interactive Controls */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Hospital selector */}
        <div>
          <label className="block text-xs font-semibold text-slateDeep mb-2 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-sapphire" />
            <span>{t.selectHospitalLabel}</span>
          </label>
          <div className="space-y-1.5">
            {HOSPITALS.map((hosp) => {
              const isSelected = selectedHospitalId === hosp.id;
              return (
                <button
                  key={hosp.id}
                  type="button"
                  onClick={() => setSelectedHospitalId(hosp.id)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'border-sapphire bg-sapphire-subtle/40 font-semibold text-slateDeep shadow-xs'
                      : 'border-stoneBorder hover:bg-porcelain text-slate-700'
                  }`}
                >
                  <span className="truncate pr-2">{hosp.name[locale]}</span>
                  <span className="shrink-0 text-slate-500 font-mono text-[11px]">
                    ~{hosp.dailyRateEur} {t.eur}{t.perDay}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time elapsed selector */}
        <div>
          <label className="block text-xs font-semibold text-slateDeep mb-2 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-sapphire" />
            <span>{t.selectTimeLabel}</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {t.timeOptions.map((opt) => {
              const isSelected = selectedTimeRange === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedTimeRange(opt.id as TimeRange)}
                  className={`p-3 rounded-xl border text-xs text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'border-sapphire bg-sapphire text-white font-semibold shadow-xs'
                      : 'border-stoneBorder hover:bg-porcelain text-slate-700'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Dynamic Result Card */}
          <div
            className={`mt-4 p-4 rounded-xl border transition-all ${
              isWarningOrAccruing
                ? 'bg-amber-50/80 border-amber-200 text-amber-950'
                : 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="flex items-center gap-1.5">
                {isWarningOrAccruing ? (
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                )}
                <span>{t.resultTitle}</span>
              </span>
              <span className="font-mono text-sm font-bold">
                {calculation.currentSurchargeEur > 0
                  ? `+${calculation.currentSurchargeEur} ${t.eur}`
                  : `0 ${t.eur}`}
              </span>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600">{t.freeHoursRemaining}</span>
                <span className="font-semibold">{calculation.remainingFreeHours}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">{t.dailyRate}</span>
                <span className="font-mono font-medium">
                  {selectedHospital.dailyRateEur} {t.eur} {t.perDay}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Institutional Statutory Timeline Bar */}
      <div className="mt-6 p-4 rounded-xl bg-porcelain border border-stoneBorder space-y-2.5">
        <span className="text-xs font-bold uppercase tracking-wider text-sapphire block">
          {t.timelineTitle}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-950 font-medium">
            <span className="block font-bold text-emerald-800 text-[11px] mb-0.5">0–24 ч</span>
            <span>{t.timeline0_24}</span>
          </div>
          <div className="p-3 rounded-lg bg-sapphire/5 border border-sapphire/20 text-slate-800 font-medium">
            <span className="block font-bold text-sapphire text-[11px] mb-0.5">24ч – 7 дней</span>
            <span>{t.timeline24_7d}</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 font-medium">
            <span className="block font-bold text-slate-700 text-[11px] mb-0.5">7–14 дней</span>
            <span>{t.timeline7_14d}</span>
          </div>
        </div>
      </div>

      {/* Non-Disposal Reassurance Guarantee Banner */}
      <div className="mt-4 p-4 rounded-xl bg-sapphire/10 border border-sapphire/30 flex items-start gap-3 text-xs sm:text-sm text-slateDeep">
        <Shield className="w-5 h-5 text-sapphire shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <strong className="block font-bold text-sapphire">
            {t.nonDisposalTitle}
          </strong>
          <p className="text-slate-700 leading-relaxed text-xs font-medium">
            {t.nonDisposalGuarantee}
          </p>
        </div>
      </div>

      {/* Reassurance Banner & WhatsApp Action Button */}
      <div className="mt-4 pt-4 border-t border-stoneBorder/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-emerald-50/60 p-4 rounded-xl border border-emerald-200/60">
        <div className="flex items-start gap-3 max-w-2xl">
          <Shield className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <p className="text-xs text-emerald-900 leading-relaxed font-medium">
            {t.reassurance}
          </p>
        </div>

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(
            t.whatsappPrefill
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-forest hover:bg-forest-hover text-white shadow-xs transition-colors shrink-0"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{t.whatsappCta}</span>
        </a>
      </div>
    </div>
  );
};
