import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { LocaleSlug } from '../data/seo-routes';

export interface CaseProgressStepperProps {
  locale: LocaleSlug;
  className?: string;
}

interface StepItem {
  number: string;
  title: Record<LocaleSlug, string>;
  hours: Record<LocaleSlug, string>;
  description: Record<LocaleSlug, string>;
  details: Record<LocaleSlug, string[]>;
}

const STAGES: StepItem[] = [
  {
    number: '01',
    title: {
      ru: 'Авторизация и приёмка в морг',
      en: 'Legal Authorization & Morgue Intake',
      mne: 'Autorizacija i prijem u kapelu',
    },
    hours: {
      ru: '0–2 часа',
      en: '0–2 hours',
      mne: '0–2 sata',
    },
    description: {
      ru: 'Дистанционная доверенность (PoA) и заморозка коммерческих начислений морга.',
      en: 'Remote Power of Attorney filing and freezing hospital mortuary fee accrual.',
      mne: 'Elektronsko punomoćje i obustava obračuna komercijalnih troškova kapele.',
    },
    details: {
      ru: [
        'Оформление доверенности у местного нотариуса за 15 минут',
        'Резервирование холодильной камеры морга (Котор / KCCG)',
        'Остановка начисления суточной лежарины',
      ],
      en: [
        '15-minute statutory PoA draft with local notary',
        'Hospital cold chamber reservation (Kotor / KCCG)',
        'Freezing of commercial daily morgue surcharges',
      ],
      mne: [
        'Overa punomoćja kod lokalnog notara za 15 minuta',
        'Rezervacija rashladne komore (Kotor / KCCG)',
        'Zaustavljanje komercijalne ležarine',
      ],
    },
  },
  {
    number: '02',
    title: {
      ru: 'Уставная медицинская и ЗАГС документация',
      en: 'Statutory Medical & Vital Records',
      mne: 'Medicinska i matična dokumentacija',
    },
    hours: {
      ru: '12–24 часа',
      en: '12–24 hours',
      mne: '12–24 sata',
    },
    description: {
      ru: 'Получение Potvrda o smrti и международного свидетельства (Izvod iz MKU).',
      en: 'Procuring Death Certificate (Potvrda o smrti) & International Vital Record (MKU).',
      mne: 'Preuzimanje Ljekarske potvrde o smrti i međunarodnog Izvoda iz MKU.',
    },
    details: {
      ru: [
        'Истребование Potvrda o smrti у дежурного врача / патологоанатома',
        'Регистрация факта смерти в секретариате местного самоуправления',
        'Получение многоязычного свидетельства Form C (Венская конвенция 1976)',
      ],
      en: [
        'Procuring Potvrda o smrti from attending physician/pathologist',
        'Vital record registration at the municipal civil office',
        'Procuring Multilingual Form C Extract (Vienna Convention 1976)',
      ],
      mne: [
        'Preuzimanje Potvrde o smrti od ordinirajućeg ljekara/patologa',
        'Upis u Matičnu knjigu umrlih u opštinskoj službi',
        'Izdavanje višejezičnog Izvoda iz MKU (Bečka konvencija 1976)',
      ],
    },
  },
  {
    number: '03',
    title: {
      ru: 'Запайка цинка и санитарный пропуск',
      en: 'Zinc Sealing & Sanitary Transit Permit',
      mne: 'Lemljenje cinka i Sprovodnica',
    },
    hours: {
      ru: '24–36 часов',
      en: '24–36 hours',
      mne: '24–36 sati',
    },
    description: {
      ru: 'Сертифицированная герметичная пайка и получение Sprovodnica.',
      en: 'Certified hermetic zinc soldering under state sanitary inspector seal.',
      mne: 'Lemljenje cinkovog sanduka uz prisustvo sanitarne inspekcije i sprovodnicu.',
    },
    details: {
      ru: [
        'Герметичная пайка цинкового вкладыша (0.6–0.8 мм) с клапаном давления',
        'Инспекционный осмотр государственным санитарным инспектором',
        'Выдача международного санитарного пропуска (Sprovodnica za prenos)',
      ],
      en: [
        'Hermetic soldering of zinc insert (0.6–0.8 mm) with pressure valve',
        'Official inspection by state sanitary authorities',
        'Issuance of international mortuary transit passport (Sprovodnica)',
      ],
      mne: [
        'Lemljenje cinkovog uloška (0.6–0.8 mm) sa ventilom pritiska',
        'Inspekcijski pregled od strane državnog sanitarnog inspektora',
        'Izdavanje međunarodne sprovodnice za prenos posmrtnih ostataka',
      ],
    },
  },
  {
    number: '04',
    title: {
      ru: 'Консульская виза и международный транзит',
      en: 'Consular Visa & International Dispatch',
      mne: 'Konzularna dozvola i međunarodni transport',
    },
    hours: {
      ru: '24–48 часов',
      en: '24–48 hours',
      mne: '24–48 sati',
    },
    description: {
      ru: 'Подача в консульство и трансфер (автокатафалк или авиарейс HUM).',
      en: 'Consular mortuary passport sealing and air/road cross-border handover.',
      mne: 'Konzularna saglasnost i prekogranični transport licenciranim vozilom ili avio HUM.',
    },
    details: {
      ru: [
        'Консульское опечатывание (Leichenpass / Letter of No Objection)',
        'Таможенная декларация в аэропорту Подгорицы (TGD) или Тивата (TIV)',
        'Прямой выезд лицензированного катафалка или вылет авиарейса',
      ],
      en: [
        'Consular mortuary passport sealing (Leichenpass / No Objection)',
        'Customs clearance at Podgorica (TGD) or Tivat (TIV) Cargo Terminal',
        'Overland direct hearse departure or Air Cargo HUM flight dispatch',
      ],
      mne: [
        'Konzularno pečaćenje (Leichenpass / Saglasnost ambasade)',
        'Carinska procedura na aerodromu Podgorica (TGD) ili Tivat (TIV)',
        'Direktan polazak licenciranog pogrebnog vozila ili avio kargo let',
      ],
    },
  },
];

export const CaseProgressStepper: React.FC<CaseProgressStepperProps> = ({
  locale,
  className = '',
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const t = {
    ru: {
      badge: 'Прозрачный регламент исполнения кейса',
      title: '4 ключевых этапа международной репатриации под ключ',
      subtitle:
        'Нажмите на любой этап для подробного раскрытия юридических действий. Личное присутствие семьи не требуется на каждом из шагов.',
      reassuranceBanner:
        'Личное присутствие родственников не требуется. Все действия выполняет координатор по доверенности.',
      stepHoursLabel: 'Срок этапа:',
    },
    en: {
      badge: 'Transparent Workflow Architecture',
      title: '4 Statutory Stages of Turnkey International Repatriation',
      subtitle:
        'Click any stage to review procedural milestones. Family attendance is zero throughout the entire timeline.',
      reassuranceBanner:
        'Personal family attendance is not required. All statutory proceedings are finalized by our coordinator under Power of Attorney.',
      stepHoursLabel: 'Turnaround:',
    },
    mne: {
      badge: 'Transparentni tok postupka',
      title: '4 ključne faze međunarodne repatrijacije po sistemu ključ u ruke',
      subtitle:
        'Kliknite na bilo koju fazu za pregled pravnih radnji. Lično prisustvo porodice nije potrebno.',
      reassuranceBanner:
        'Lično prisustvo porodice nije potrebno. Sve zakonske radnje sprovodi ovlašćeni koordinator po punomoćju.',
      stepHoursLabel: 'Trajanje faze:',
    },
  }[locale];

  const stepPrefix = locale === 'ru' ? 'Этап' : locale === 'mne' ? 'Faza' : 'Stage';

  return (
    <div
      data-testid="case-progress-stepper"
      className={`bg-white rounded-2xl border border-stoneBorder p-6 sm:p-7 shadow-card space-y-6 ${className}`}
    >
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sapphire mb-1">
          <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{t.badge}</span>
        </div>
        <h3 className="font-serif text-lg sm:text-xl font-bold text-slateDeep">
          {t.title}
        </h3>
        <p className="text-xs text-slateMuted mt-0.5 leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* 4 Stages Progress Stepper */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {STAGES.map((stage, idx) => {
          const isSelected = activeStep === idx;
          return (
            <button
              key={stage.number}
              type="button"
              data-testid={`stepper-stage-${stage.number}`}
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-sapphire text-white border-sapphire shadow-md ring-2 ring-emerald-400/50'
                  : 'bg-porcelain/60 hover:bg-porcelain border-stoneBorder text-slateDeep'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-mono font-bold text-xs px-2 py-0.5 rounded-md ${
                      isSelected
                        ? 'bg-white/20 text-emerald-300'
                        : 'bg-stone-200 text-slate-700'
                    }`}
                  >
                    {stage.number}
                  </span>
                  <span
                    className={`text-[11px] font-mono font-semibold ${
                      isSelected ? 'text-slate-200' : 'text-emerald-700'
                    }`}
                  >
                    {stage.hours[locale]}
                  </span>
                </div>
                <h4 className="font-bold text-xs sm:text-sm leading-snug">
                  {stage.title[locale]}
                </h4>
              </div>

              <p
                className={`text-[11px] mt-2 leading-relaxed ${
                  isSelected ? 'text-slate-200' : 'text-slateMuted'
                }`}
              >
                {stage.description[locale]}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Stage Deep-Dive Card */}
      <div className="p-4 rounded-xl bg-alabaster border border-stoneBorder space-y-3 animate-in fade-in duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stoneBorder pb-2.5">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-xs text-sapphire bg-sapphire/10 px-2 py-0.5 rounded-md">
              {stepPrefix} {STAGES[activeStep].number}
            </span>
            <h4 className="font-bold text-sm text-slateDeep">
              {STAGES[activeStep].title[locale]}
            </h4>
          </div>
          <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1 font-mono">
            <Clock className="w-3.5 h-3.5" />
            {STAGES[activeStep].hours[locale]}
          </span>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs text-slate-700">
          {STAGES[activeStep].details[locale].map((d, i) => (
            <li key={i} className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-stoneBorder/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="leading-snug font-medium">{d}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Reassurance Banner */}
      <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center gap-3 text-xs text-emerald-950 font-medium">
        <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
        <p className="leading-snug">{t.reassuranceBanner}</p>
      </div>
    </div>
  );
};
