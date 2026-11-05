import React, { useState } from 'react';
import {
  Building,
  Phone,
  Printer,
  X,
  Lock,
  EyeOff,
} from 'lucide-react';
import { LocaleSlug } from '../data/seo-routes';
import { PHONE_DISPLAY, PHONE_HREF } from '../i18n/translations';

export interface HotelIncidentProtocolProps {
  locale: LocaleSlug;
  className?: string;
}

export const HotelIncidentProtocol: React.FC<HotelIncidentProtocolProps> = ({
  locale,
  className = '',
}) => {
  const [printModalOpen, setPrintModalOpen] = useState(false);

  const t = {
    ru: {
      badge: 'Протокол безопасности гостиничного сектора',
      title: 'Протокол экстренных действий для отелей, вилл и резортов',
      subtitle:
        'Официальный регламент действий службы безопасности, ресепшн и администрации при кончине иностранного гостя на территории объекта размещения.',
      step1Num: 'Шаг 1',
      step1Title: 'Изоляция номера и сохранение обстановки',
      step1Desc:
        'Немедленно заблокировать электронный замок номера / виллы. Категорически запрещено прикасаться к личным вещам, багажу, медицинским препаратам и документам до завершения следственного и врачебного осмотра.',
      step2Num: 'Шаг 2',
      step2Title: 'Вызов экстренных служб — 124 и 122',
      step2Desc:
        'Вызвать Скорую помощь (Hitna pomoć 124) для констатации факта смерти, затем Полицию (Policija 122). Полиция обеспечивает прибытие дежурного судебного патологоанатома (Mrtvozornik).',
      step3Num: 'Шаг 3',
      step3Title: 'Деликатная эвакуация и защита репутации объекта',
      step3Desc:
        'Связаться с дежурным координатором Memorijal d.o.o. (+382 68 914 816). Специализированная бригада прибывает на автомобиле без опознавательных знаков через служебный подъезд, исключая панику среди гостей.',
      btnPrint: 'Скачать памятку для персонала (PDF)',
      callHitna: 'Скорая помощь 124',
      callPolicija: 'Полиция 122',
      callAgency: `Дежурный координатор (${PHONE_DISPLAY})`,
      modalTitle: 'ПАМЯТКА СЛУЖБЫ БЕЗОПАСНОСТИ ОТЕЛЯ / РЕЗОРТА',
      modalSubtitle: 'Утвержденный регламент при кончине иностранного гостя',
      confidentialityNote:
        'Конфиденциальность: фотосъемка персоналом строго запрещена. Все коммуникации с семьей и консульством берет на себя сертифицированное агентство.',
    },
    en: {
      badge: 'Hospitality Emergency & Security Standard',
      title: 'Emergency Incident Protocol for Hotels, Villas & Resorts',
      subtitle:
        'Official operational protocol for hotel management, guest relations, and security personnel upon the sudden passing of an international guest.',
      step1Num: 'Step 1',
      step1Title: 'Room Sealing & Preservation of Evidence',
      step1Desc:
        'Immediately lock down access to the room or villa. Strictly prohibit touching personal effects, luggage, prescription medications, or documents prior to official coroner inspection.',
      step2Num: 'Step 2',
      step2Title: 'Emergency Dispatch — 124 & 122',
      step2Desc:
        'Call Emergency Medical Services (Hitna pomoć 124) for formal pronouncement of death, followed by Police (Policija 122) to summon the municipal medical examiner (Mrtvozornik).',
      step3Num: 'Step 3',
      step3Title: 'Discreet Hearse Dispatch & Reputation Protection',
      step3Desc:
        'Liaise directly with Memorijal d.o.o. (+382 68 914 816). Our team arrives discreetly via service access in unmarked vehicles, preserving guest privacy and hotel ambiance.',
      btnPrint: 'Download Staff Incident Protocol (PDF)',
      callHitna: 'Ambulance 124',
      callPolicija: 'Police 122',
      callAgency: `Duty Desk (${PHONE_DISPLAY})`,
      modalTitle: 'HOTEL & RESORT SECURITY EMERGENCY ACTION SHEET',
      modalSubtitle: 'Statutory Protocol for Deceased International Guest Handling',
      confidentialityNote:
        'Privacy Compliance: Staff photography is strictly prohibited. Consular liaison and family communications are managed by Memorijal d.o.o.',
    },
    mne: {
      badge: 'Protokol bezbjednosti za hotelski sektor',
      title: 'Protokol postupanja u slučaju smrti za hotele i privatni smještaj',
      subtitle:
        'Zvanični operativni postupak za hotelsko obezbjeđenje, recepciju i menadžment u slučaju smrti stranog gosta.',
      step1Num: 'Korak 1',
      step1Title: 'Izolacija sobe i očuvanje zatečenog stanja',
      step1Desc:
        'Zaključati sobu/vilu i ograničiti pristup. Strogo je zabranjeno pomjerati lične stvari, prtljag i terapiju do dolaska ljekara i mrtvozornika.',
      step2Num: 'Korak 2',
      step2Title: 'Poziv dežurnim službama — 124 i 122',
      step2Desc:
        'Pozvati Hitnu medicinsku pomoć (124) radi konstatacije smrti, a zatim Policiju (122) radi dolaska mrtvozornika.',
      step3Num: 'Korak 3',
      step3Title: 'Diskretan prevoz i zaštita ugleda objekta',
      step3Desc:
        'Kontaktirati Memorijal d.o.o. (+382 68 914 816). Tim obavlja prevoz kroz servisni ulaz bez uznemiravanja ostalih gostiju.',
      btnPrint: 'Preuzmi protokol za osoblje (PDF)',
      callHitna: 'Hitna pomoć 124',
      callPolicija: 'Policija 122',
      callAgency: `Dežurni centar (${PHONE_DISPLAY})`,
      modalTitle: 'UPUTSTVO ZA HOTELSKO OBEZBJEĐENJE I RECEPCIJU',
      modalSubtitle: 'Zvanični protokol postupanja u slučaju smrti stranog državljanina',
      confidentialityNote:
        'Zaštita privatnosti: Fotografisanje od strane osoblja je strogo zabranjeno. Sve procedure vodi ovlašćeni koordinator.',
    },
  }[locale];

  return (
    <div
      className={`bg-white rounded-2xl border border-stoneBorder p-6 sm:p-8 shadow-card space-y-6 ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sapphire mb-1.5">
            <Building className="w-4 h-4 text-emerald-600 shrink-0" />
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
          onClick={() => setPrintModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-sapphire text-sapphire hover:bg-sapphire hover:text-white text-xs font-bold shadow-xs transition-colors shrink-0 cursor-pointer"
        >
          <Printer className="w-4 h-4 shrink-0" />
          <span>{t.btnPrint}</span>
        </button>
      </div>

      {/* 3 Step Protocol Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Step 1 */}
        <div className="p-4 rounded-xl bg-alabaster border border-stoneBorder space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold font-mono px-2 py-0.5 rounded-md bg-amber-600 text-white">
              {t.step1Num}
            </span>
            <Lock className="w-4 h-4 text-amber-600" />
          </div>
          <h4 className="font-bold text-xs sm:text-sm text-slateDeep leading-snug">
            {t.step1Title}
          </h4>
          <p className="text-xs text-slateMuted leading-relaxed">
            {t.step1Desc}
          </p>
        </div>

        {/* Step 2 */}
        <div className="p-4 rounded-xl bg-alabaster border border-stoneBorder space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold font-mono px-2 py-0.5 rounded-md bg-blue-600 text-white">
              {t.step2Num}
            </span>
            <Phone className="w-4 h-4 text-blue-600" />
          </div>
          <h4 className="font-bold text-xs sm:text-sm text-slateDeep leading-snug">
            {t.step2Title}
          </h4>
          <p className="text-xs text-slateMuted leading-relaxed">
            {t.step2Desc}
          </p>
        </div>

        {/* Step 3 */}
        <div className="p-4 rounded-xl bg-alabaster border border-stoneBorder space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold font-mono px-2 py-0.5 rounded-md bg-emerald-700 text-white">
              {t.step3Num}
            </span>
            <EyeOff className="w-4 h-4 text-emerald-700" />
          </div>
          <h4 className="font-bold text-xs sm:text-sm text-slateDeep leading-snug">
            {t.step3Title}
          </h4>
          <p className="text-xs text-slateMuted leading-relaxed">
            {t.step3Desc}
          </p>
        </div>
      </div>

      {/* Emergency Hotline Bar */}
      <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-0.5 text-center sm:text-left">
          <span className="text-xs text-slate-400 block font-medium">
            Линия оперативного дежурного Memorijal (24/7):
          </span>
          <span className="font-mono font-bold text-sm text-emerald-400">
            {PHONE_DISPLAY}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href="tel:124"
            className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{t.callHitna}</span>
          </a>

          <a
            href="tel:122"
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{t.callPolicija}</span>
          </a>

          <a
            href={PHONE_HREF}
            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{t.callAgency}</span>
          </a>
        </div>
      </div>

      {/* Printable Staff Incident Protocol Modal */}
      {printModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setPrintModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stoneBorder max-h-[92vh] overflow-y-auto space-y-6 animate-in zoom-in-95 print:p-0 print:border-none print:shadow-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Letterhead */}
            <div className="border-b border-stoneBorder pb-4 flex items-start justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase font-bold text-sapphire tracking-wider block">
                  Memorijal d.o.o. • Dispatch Desk: {PHONE_DISPLAY}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slateDeep mt-0.5">
                  {t.modalTitle}
                </h3>
                <p className="text-xs text-slateMuted mt-0.5">
                  {t.modalSubtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPrintModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 no-print cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Checklist Content */}
            <div className="space-y-3.5 text-xs text-slate-800">
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200">
                <strong className="block font-bold text-amber-950 mb-1">
                  1. ОЦЕПЛЕНИЕ И СОХРАННОСТЬ ОБСТАНОВКИ (ROOM LOCKDOWN)
                </strong>
                <p className="text-amber-900 leading-relaxed text-[11px]">
                  Не прикасаться к личным вещам, стаканам, упаковкам лекарств, сейфу и документам. Не допускать уборку и персонал клининга до окончания следственных действий.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200">
                <strong className="block font-bold text-blue-950 mb-1">
                  2. ВЫЗОВ СЛУЖБ: 124 (СКОРАЯ) И 122 (ПОЛИЦИЯ)
                </strong>
                <p className="text-blue-900 leading-relaxed text-[11px]">
                  Сообщить диспетчеру: название отеля/виллы, точный адрес, номер комнаты, гражданство гостя (по данным бронирования).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <strong className="block font-bold text-emerald-950 mb-1">
                  3. ОПОВЕЩЕНИЕ МЕЖДУНАРОДНОГО КООРДИНАТОРА MEMORIJAL (+382 68 914 816)
                </strong>
                <p className="text-emerald-900 leading-relaxed text-[11px]">
                  Координатор немедленно выезжает на объект, перенимает взаимодействие с полицией и судебно-медицинской службой, защищает приватность гостей и берет на себя коммуникацию со страховой компанией.
                </p>
              </div>
            </div>

            {/* Footer Assurance & Print Trigger */}
            <div className="border-t border-stoneBorder pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <p className="text-slate-500 text-[11px] italic max-w-sm">
                {t.confidentialityNote}
              </p>
              <div className="flex items-center gap-2 no-print">
                <button
                  type="button"
                  onClick={() => setPrintModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Закрыть
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-forest hover:bg-forest-hover text-white font-bold shadow-xs cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Печать A4</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
