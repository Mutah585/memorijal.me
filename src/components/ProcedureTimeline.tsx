import React, { useState } from 'react';
import {
  Phone,
  FileCheck,
  Shield,
  Plane,
  Clock,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  UserCheck,
} from 'lucide-react';
import { TranslationContent, Language } from '../i18n/translations';

interface ProcedureTimelineProps {
  t: TranslationContent;
  lang?: Language;
}

interface StageDetail {
  number: string;
  timeframe: string;
  title: {
    ru: string;
    en: string;
    mne: string;
  };
  subtitle: {
    ru: string;
    en: string;
    mne: string;
  };
  checklist: {
    ru: string[];
    en: string[];
    mne: string[];
  };
  handledBy: {
    ru: string;
    en: string;
    mne: string;
  };
}

const STAGES: StageDetail[] = [
  {
    number: '01',
    timeframe: '0 – 2 ч / h',
    title: {
      ru: 'Экстренное обращение, дистанционная доверенность и морг',
      en: 'Initial Call, Remote PoA & Mortuary Freeze',
      mne: 'Hitni poziv, daljinsko punomoćje i prijem u kapelu',
    },
    subtitle: {
      ru: 'Первичная фиксация случая, остановка коммерческих начислений морга',
      en: 'Immediate emergency liaison, mortuary holding fee freeze',
      mne: 'Prvi kontakt, stopiranje komercijalnih troškova ležarine',
    },
    checklist: {
      ru: [
        'Прием звонка или WhatsApp-заявки дежурным координатором 24/7',
        'Оформление дистанционной доверенности (Punomoćje) без визита в Черногорию',
        'Официальное уведомление морга больницы (Котор / KCCG) и фиксация места',
      ],
      en: [
        '24/7 intake via phone or encrypted WhatsApp dispatch',
        'Remote statutory Power of Attorney execution without travel to Montenegro',
        'Formal notification to hospital morgue (Kotor / KCCG) and fee freeze',
      ],
      mne: [
        'Prijem poziva dežurnog koordinatora 24/7 putem telefona ili WhatsApp-a',
        'Izdavanje ovlašćenog punomoćja na daljinu bez dolaska porodice',
        'Zvanično obavještenje kapele (Kotor / KCCG) i preuzimanje tijela',
      ],
    },
    handledBy: {
      ru: 'Выполняется координатором Memorijal без участия семьи',
      en: 'Executed by Memorijal coordinator — zero family burden',
      mne: 'Izvršava koordinator Memorijal d.o.o. bez prisustva porodice',
    },
  },
  {
    number: '02',
    timeframe: '12 – 24 ч / h',
    title: {
      ru: 'Медицинская экспертиза и гербовое свидетельство о смерти',
      en: 'Forensic Clearance & Statutory Death Certificate',
      mne: 'Ljekarska potvrda o smrti i izvod iz Matične knjige',
    },
    subtitle: {
      ru: 'Официальное врачебное освидетельствование и регистрация в ЗАГСе',
      en: 'Official medical cause of death declaration and municipality registration',
      mne: 'Medicinski zapisnik i zvanična prijava u opštinskom MUP-u',
    },
    checklist: {
      ru: [
        'Получение официального врачебного заключения (Potvrda o smrti)',
        'Судебно-медицинская экспертиза в KCCG Подгорица (при назначении прокурором)',
        'Регистрация в городском ЗАГСе (Matičar) и выдача гербового Izvod iz MKU',
      ],
      en: [
        'Securing official medical cause of death certificate (Potvrda o smrti)',
        'Forensic autopsy protocol release at KCCG Podgorica if prosecutor-ordered',
        'City Hall death registration (Matičar) and international death certificate',
      ],
      mne: [
        'Pribavljanje zvanične ljekarske potvrde o smrti (Potvrda o smrti)',
        'Preuzimanje sudsko-medicinskog nalaza u KCCG Podgorica (po nalogu tužioca)',
        'Upis u Matičnu knjigu umrlih i izdavanje međunarodnog izvoda',
      ],
    },
    handledBy: {
      ru: 'Выполняется координатором Memorijal без участия семьи',
      en: 'Executed by Memorijal coordinator — zero family burden',
      mne: 'Izvršava koordinator Memorijal d.o.o. bez prisustva porodice',
    },
  },
  {
    number: '03',
    timeframe: '24 – 48 ч / h',
    title: {
      ru: 'Цинковая пайка, санинспекция и пропуск (Sprovodnica)',
      en: 'Zinc Soldering, Sanitary Clearance & Sprovodnica',
      mne: 'Lemljenje cinkovog sanduka, sanitarna inspekcija i Sprovodnica',
    },
    subtitle: {
      ru: 'Герметизация по нормам IATA и получение санитарного пропуска',
      en: 'Hermetic zinc sealing to IATA standards and border transit clearance',
      mne: 'Hermetičko zatvaranje po IATA standardima i sanitarna dozvola',
    },
    checklist: {
      ru: [
        'Сертифицированная герметичная пайка цинкового вкладыша (Lemljenje)',
        'Официальное освидетельствование Санитарной инспекцией Черногории',
        'Выдача международного санитарного пропуска (Sprovodnica za prenos)',
      ],
      en: [
        'Certified airtight zinc soldering according to international IATA guidelines',
        'On-site inspection and official sealing by Montenegro Sanitary Authority',
        'Issuance of cross-border mortuary transit permit (Sprovodnica)',
      ],
      mne: [
        'Sertifikovano lemljenje cinkovog uloška uz prisustvo nadležnih organa',
        'Zvanični uviđaj i pečaćenje Sanitarne inspekcije Crne Gore',
        'Izdavanje sprovodnice za prenos posmrtnih ostataka preko granice',
      ],
    },
    handledBy: {
      ru: 'Выполняется координатором Memorijal без участия семьи',
      en: 'Executed by Memorijal coordinator — zero family burden',
      mne: 'Izvršava koordinator Memorijal d.o.o. bez prisustva porodice',
    },
  },
  {
    number: '04',
    timeframe: '48 – 72 ч / h',
    title: {
      ru: 'Консульская легализация и авиаотправка / спецтранспорт',
      en: 'Consular Clearance, Air Cargo HUM / Hearse Dispatch',
      mne: 'Konzularna dozvola, avio Cargo HUM / drumski prevoz',
    },
    subtitle: {
      ru: 'Согласование с посольством в Подгорице и пересечение границы',
      en: 'Diplomatic mission approval in Podgorica and international transfer',
      mne: 'Odobrenje ambasade u Podgorici i međunarodna isporuka',
    },
    checklist: {
      ru: [
        'Подача пакета с судебным переводом в посольство страны назначения в Подгорице',
        'Оформление грузовой накладной Air Cargo HUM (TGD / TIV / BEG)',
        'Или отправка лицензированным европейским автокатафалком до адреса / крематория',
      ],
      en: [
        'Filing court-translated dossier with destination embassy in Podgorica',
        'Air Waybill (AWB) issuance for Air Cargo HUM dispatch via TGD, TIV or BEG',
        'Or direct long-distance climate-controlled road hearse transport across Europe',
      ],
      mne: [
        'Predaja sudski prevedenih dokumenata u nadležnu ambasadu u Podgorici',
        'Rezervacija avio teretnog prostora Air Cargo HUM (TGD, TIV ili BEG)',
        'Ili direktan prevoz licenciranim specijalnim vozilom do odredišta',
      ],
    },
    handledBy: {
      ru: 'Выполняется координатором Memorijal без участия семьи',
      en: 'Executed by Memorijal coordinator — zero family burden',
      mne: 'Izvršava koordinator Memorijal d.o.o. bez prisustva porodice',
    },
  },
];

export const ProcedureTimeline: React.FC<ProcedureTimelineProps> = ({ t, lang = 'EN' }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const loc: 'ru' | 'en' | 'mne' =
    lang === 'RU' ? 'ru' : lang === 'MNE' ? 'mne' : 'en';

  const stepIcons = [
    <Phone className="w-5 h-5 text-sapphire" />,
    <FileCheck className="w-5 h-5 text-sapphire" />,
    <Shield className="w-5 h-5 text-sapphire" />,
    <Plane className="w-5 h-5 text-sapphire" />,
  ];

  const trackerBadge = {
    ru: 'Интерактивный трекер этапов • Нажмите для подробного чек-листа',
    en: 'Interactive Stage Tracker • Tap any stage for detailed checklist',
    mne: 'Interaktivno praćenje faza • Kliknite za detaljnu listu aktivnosti',
  }[loc];

  const toggleStage = (idx: number) => {
    setExpandedIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="process"
      className="py-16 sm:py-24 bg-porcelain border-b border-stoneBorder"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Remote Assurance Pill */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-sapphire mb-3">
              <Clock className="w-4 h-4" />
              <span>{t.timeline.eyebrow}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-semibold text-slateDeep leading-[1.18]">
              {t.timeline.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slateMuted leading-relaxed">
              {t.timeline.subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span className="text-[11px] font-semibold text-sapphire bg-sapphire/10 px-3 py-1.5 rounded-lg border border-sapphire/20">
              {trackerBadge}
            </span>
            <div className="inline-flex items-center gap-2.5 bg-forest-subtle text-forest border border-forest/20 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shrink-0">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{t.timeline.remoteAssuranceBadge}</span>
            </div>
          </div>
        </div>

        {/* 4-Step Interactive Timeline Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 relative">
          {STAGES.map((stage, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <div
                key={stage.number}
                className={`bg-white rounded-2xl border transition-all duration-200 p-6 sm:p-7 shadow-card flex flex-col justify-between relative group cursor-pointer ${
                  isExpanded
                    ? 'border-sapphire ring-2 ring-sapphire/10 shadow-elevated'
                    : 'border-stoneBorder hover:border-sapphire/40'
                }`}
                onClick={() => toggleStage(index)}
              >
                <div>
                  {/* Step Number & Timeframe Pill */}
                  <div className="flex items-start justify-between gap-2 mb-5">
                    <div className="flex items-center gap-2.5">
                      <span className="font-serif text-3xl font-bold text-sapphire leading-none">
                        {stage.number}
                      </span>
                      <div className="w-9 h-9 rounded-lg bg-sapphire-subtle flex items-center justify-center">
                        {stepIcons[index]}
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-warmStone bg-alabaster px-2.5 py-1 rounded-md border border-stoneBorder">
                      <Clock className="w-3 h-3 text-sapphire" />
                      {stage.timeframe}
                    </span>
                  </div>

                  {/* Step Title & Subtitle */}
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-slateDeep leading-snug group-hover:text-sapphire transition-colors">
                    {stage.title[loc]}
                  </h3>
                  <p className="mt-2 text-xs text-slateMuted leading-relaxed">
                    {stage.subtitle[loc]}
                  </p>

                  {/* Expandable Checklist Details */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-stoneBorder/80 space-y-2.5 animate-in fade-in duration-150">
                      <ul className="space-y-2 text-xs text-slateDeep">
                        {stage.checklist[loc].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-forest shrink-0 mt-0.5" />
                            <span className="leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Handled By Reassurance */}
                      <div className="mt-3 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200/80 flex items-start gap-2 text-[11px] text-emerald-900 font-medium">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                        <span>{stage.handledBy[loc]}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Toggle Cue */}
                <div className="mt-5 pt-3 border-t border-stoneBorder/60 flex items-center justify-between text-xs text-slate-500">
                  <span className="text-[11px] font-semibold text-sapphire">
                    {isExpanded ? (
                      loc === 'ru' ? 'Свернуть' : loc === 'mne' ? 'Zatvori' : 'Collapse'
                    ) : (
                      loc === 'ru' ? 'Чек-лист этапа' : loc === 'mne' ? 'Lista detalja' : 'View checklist'
                    )}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-sapphire" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-sapphire transition-colors" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
