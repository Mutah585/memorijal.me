import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  MapPin,
  ShieldAlert,
  Eye,
} from 'lucide-react';
import {
  Language,
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_NUMBER,
} from '../i18n/translations';

export interface DistressTriageViewProps {
  lang: Language;
  onExit: () => void;
  onOpenModal: () => void;
}

type LocationChoice = 'kotor' | 'kccg' | 'hotel' | 'other';

export const DistressTriageView: React.FC<DistressTriageViewProps> = ({
  lang,
  onExit,
  onOpenModal,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<LocationChoice>('kotor');

  const t = {
    ru: {
      badge: 'Режим экстренной помощи и первичной координации',
      exitBtn: 'Вернуться к полному виду сайта',
      title: 'Экстренная фиксация случая и защита интересов семьи',
      subtitle:
        'Сохраняйте спокойствие. Мы немедленно берем юридический контроль над ситуацией и останавливаем коммерческие начисления морга.',
      qLocation: '1. Где сейчас находится тело умершего?',
      locations: [
        {
          id: 'kotor' as LocationChoice,
          label: 'Морг больницы Котора (Opšta bolnica Kotor)',
          sub: 'Охват: Котор, Тиват, Будва • Выезд координатора 30 минут',
        },
        {
          id: 'kccg' as LocationChoice,
          label: 'Морг KCCG Подгорица (Судебная медицина)',
          sub: 'Охват: Подгорица, Даниловград, Колашин • Выезд 30 минут',
        },
        {
          id: 'hotel' as LocationChoice,
          label: 'Отель, апартаменты или вилла (побережье)',
          sub: 'Выезд координатора и дежурного врача за 30–60 минут',
        },
        {
          id: 'other' as LocationChoice,
          label: 'Другой город Черногории (Бар, Никшич, Герцег-Нови)',
          sub: 'Выезд дежурной бригады по всей Черногории 24/7',
        },
      ],
      reassuranceHeader: '2. Важное предупреждение для родственников:',
      reassuranceText:
        'Не передавайте оригиналы документов неуполномоченным лицам. Начисление коммерческих суток морга будет остановлено сразу после авторизации координатора Memorijal.',
      actionsHeader: '3. Выберите способ связи со старшим координатором:',
      callBtn: `Позвонить координатору 24/7 (${PHONE_DISPLAY})`,
      whatsappBtn: 'Защищенный чат WhatsApp 24/7',
      whatsappPrefill: (locLabel: string) =>
        `ЭКСТРЕННОЕ ОБРАЩЕНИЕ: Требуется срочная помощь координатора. Местонахождение: ${locLabel}. Прошу связаться со мной немедленно.`,
      modalTrigger: 'Или запросить обратный звонок дежурного диспетчера',
    },
    en: {
      badge: 'Emergency Distress & Triage Mode',
      exitBtn: 'Switch back to Full Website View',
      title: 'Immediate Crisis Triage & Family Legal Shield',
      subtitle:
        'Please remain calm. We immediately take legal control of the case and halt any commercial mortuary fee accruals.',
      qLocation: '1. Where is the deceased currently located?',
      locations: [
        {
          id: 'kotor' as LocationChoice,
          label: 'Regional Hospital Kotor Mortuary (Opšta bolnica)',
          sub: 'Catchment: Kotor, Tivat, Budva • 30-min coordinator arrival',
        },
        {
          id: 'kccg' as LocationChoice,
          label: 'Clinical Center KCCG Podgorica (Forensic Pathology)',
          sub: 'Catchment: Podgorica & central zone • 30-min coordinator arrival',
        },
        {
          id: 'hotel' as LocationChoice,
          label: 'Hotel, Resort or Private Villa (Coast)',
          sub: 'On-site coordinator & coroner dispatch within 30–60 minutes',
        },
        {
          id: 'other' as LocationChoice,
          label: 'Other location in Montenegro (Bar, Nikšić, Herceg Novi)',
          sub: 'Nationwide dispatch covering all 25 municipalities 24/7',
        },
      ],
      reassuranceHeader: '2. Critical Family Protection Guidance:',
      reassuranceText:
        'Do not surrender original passports or certificates to unauthorized third parties. Commercial mortuary fee accrual will be formally halted under statutory requisition.',
      actionsHeader: '3. Select preferred emergency communication line:',
      callBtn: `Call Duty Coordinator 24/7 (${PHONE_DISPLAY})`,
      whatsappBtn: 'Encrypted 24/7 WhatsApp Liaison',
      whatsappPrefill: (locLabel: string) =>
        `EMERGENCY DISPATCH: Urgent case coordination required. Location: ${locLabel}. Please contact me immediately.`,
      modalTrigger: 'Or request immediate written case requisition callback',
    },
    mne: {
      badge: 'Hitan režim prve pomoći i koordinacije',
      exitBtn: 'Povratak na puni prikaz sajta',
      title: 'Hitna evidencija slučaja i pravna zaštita porodice',
      subtitle:
        'Budite mirni. Odmah preuzimamo pravnu i sanitarnu koordinaciju i zaustavljamo komercijalne bolničke troškove ležarine.',
      qLocation: '1. Gdje se trenutno nalazi tijelo preminulog?',
      locations: [
        {
          id: 'kotor' as LocationChoice,
          label: 'Kapela Opšte bolnice Kotor (Regionalna bolnica)',
          sub: 'Područje: Kotor, Tivat, Budva • Dolazak koordinatora 30 min',
        },
        {
          id: 'kccg' as LocationChoice,
          label: 'Klinički centar KCCG Podgorica (Sudska medicina)',
          sub: 'Područje: Podgorica i centralna regija • Dolazak 30 min',
        },
        {
          id: 'hotel' as LocationChoice,
          label: 'Hotel, apartman ili privatna vila (Primorje)',
          sub: 'Izlazak koordinatora i ljekara u roku od 30–60 minuta',
        },
        {
          id: 'other' as LocationChoice,
          label: 'Druga opština u Crnoj Gori (Bar, Nikšić, Herceg Novi)',
          sub: 'Pokrivenost svih opština u Crnoj Gori 24/7',
        },
      ],
      reassuranceHeader: '2. Važno zakonsko uputstvo za porodicu:',
      reassuranceText:
        'Ne predajte originalna dokumenta neovlašćenim licima. Obračun komercijalnih bolničkih troškova kapele biće zaustavljen angažovanjem koordinatora Memorijal.',
      actionsHeader: '3. Izaberite način direktnog kontakta sa koordinatorom:',
      callBtn: `Pozovite dežurnog koordinatora 24/7 (${PHONE_DISPLAY})`,
      whatsappBtn: 'Direktan WhatsApp kontakt 24/7',
      whatsappPrefill: (locLabel: string) =>
        `HITAN POZIV: Potrebna hitna pomoć koordinatora. Lokacija: ${locLabel}. Molim da me odmah kontaktirate.`,
      modalTrigger: 'Ili zatražite formalni povratni poziv dispečera',
    },
  }[lang === 'RU' ? 'ru' : lang === 'MNE' ? 'mne' : 'en'];

  const currentLocObj =
    t.locations.find((l) => l.id === selectedLocation) || t.locations[0];

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(
    t.whatsappPrefill(currentLocObj.label)
  )}`;

  return (
    <div className="min-h-[85vh] bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white py-10 sm:py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center animate-in fade-in duration-300">
      <div className="max-w-3xl mx-auto w-full space-y-8">
        {/* Top Control Bar with Switch-Back Option */}
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{t.badge}</span>
          </div>

          <button
            type="button"
            onClick={onExit}
            className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t.exitBtn}</span>
          </button>
        </div>

        {/* Calm Peaceful Header */}
        <div className="space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 1. Location Prompt */}
        <div className="bg-white/5 border border-white/15 rounded-2xl p-5 sm:p-6 space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-sapphire-light flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>{t.qLocation}</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {t.locations.map((loc) => {
              const isSelected = selectedLocation === loc.id;
              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setSelectedLocation(loc.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-sapphire text-white border-emerald-400 ring-2 ring-emerald-400/40'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-200'
                  }`}
                >
                  <p className="text-xs sm:text-sm font-semibold leading-snug">
                    {loc.label}
                  </p>
                  <p className="text-[11px] text-slate-300 mt-1 leading-normal">
                    {loc.sub}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Reassurance Guidance Banner */}
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-400/40 text-amber-200 flex items-start gap-3.5">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              {t.reassuranceHeader}
            </h4>
            <p className="text-xs sm:text-sm text-amber-100 leading-relaxed font-medium">
              {t.reassuranceText}
            </p>
          </div>
        </div>

        {/* 3. Primary Crisis Action Buttons */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
            {t.actionsHeader}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-sm font-bold bg-sapphire hover:bg-sapphire-light text-white shadow-elevated border border-emerald-400/30 transition-all text-center"
            >
              <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{t.callBtn}</span>
            </a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-sm font-bold bg-[#1E7B54] hover:bg-[#176343] text-white shadow-elevated transition-all text-center"
            >
              <MessageCircle className="w-5 h-5 text-white shrink-0" />
              <span>{t.whatsappBtn}</span>
            </a>
          </div>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={onOpenModal}
              className="text-xs text-slate-400 hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
            >
              {t.modalTrigger}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
