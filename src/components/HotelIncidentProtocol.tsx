import React, { useState } from 'react';
import {
  Building,
  Phone,
  Printer,
  X,
  Lock,
  FileText,
  EyeOff,
} from 'lucide-react';
import { LocaleSlug } from '../data/seo-routes';
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  OFFICIAL_EMAIL,
} from '../i18n/translations';

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
      badge: 'Протокол безопасности гостиничного сектора и марин (KD 82.99)',
      title: 'Протокол действий для администрации отелей, вилл и марин',
      subtitle:
        'Официальный регламент действий службы безопасности, ресепшн и управляющих объектами размещения при кончине иностранного гостя.',
      step1Num: 'Шаг 1',
      step1Title: 'Изоляция номера и сохранение обстановки (124 / 122)',
      step1Desc:
        'Изолируйте номер, виллу или каюту без перемещения личных вещей и документов до завершения осмотра Скорой помощью (Hitna pomoć 124), Полицией (Policija 122) и судебно-медицинским экспертом (Mrtvozornik).',
      step2Num: 'Шаг 2',
      step2Title: 'Подготовка копии паспорта и связь с дежурным координатором',
      step2Desc:
        'Подготовьте данные паспорта гостя из карточки регистрации и свяжитесь с дежурным координатором Memorijal d.o.o. (+382 68 934 904) для оперативного перехвата взаимодействия с полицией и консульством.',
      step3Num: 'Шаг 3',
      step3Title: 'Деликатная транспортировка силами лицензированного партнера',
      step3Desc:
        'Неприметная подача спецтранспорта аккредитованного лицензированного партнера через служебный выезд без тревоги для окружающих гостей и ущерба репутации объекта.',
      btnPrint: 'Скачать памятку для службы безопасности (PDF)',
      hotlineLabel: 'Круглосуточная линия дежурного координатора Memorijal (24/7):',
      callHitna: 'Скорая помощь 124',
      callPolicija: 'Полиция 122',
      callAgency: `Координатор (${PHONE_DISPLAY})`,
      modalTitle: 'ПАМЯТКА СЛУЖБЫ БЕЗОПАСНОСТИ ОТЕЛЯ, ВИЛЛЫ И МАРИНЫ',
      modalSubtitle: 'Утвержденный регламент действий при кончине иностранного гостя',
      modalSteps: [
        {
          title: '1. ИЗОЛЯЦИЯ НОМЕРА И ВЫЗОВ 124 / 122 (ROOM LOCKDOWN)',
          text: 'Ограничьте доступ в номер или виллу. Не прикасайтесь к личным вещам, лекарствам, сейфу и документам до завершения осмотра Hitna pomoć (124), Policija (122) и дежурного Mrtvozornik.',
        },
        {
          title: '2. ПОДГОТОВКА ДАННЫХ ГОСТЯ И ВЫЗОВ КООРДИНАТОРА',
          text: `Подготовьте копию паспорта/регистрации гостя и свяжитесь с дежурным координатором Memorijal d.o.o.: ${PHONE_DISPLAY} (${OFFICIAL_EMAIL}) для немедленного включения в протокол.`,
        },
        {
          title: '3. ДЕЛИКАТНАЯ ЭВАКУАЦИЯ ЧЕРЕЗ СЛУЖЕБНЫЙ КОНТУР',
          text: 'Специализированный транспорт аккредитованного лицензированного партнера подается через технический подъезд без привлечения внимания отдыхающих.',
        },
      ],
      confidentialityNote:
        'Конфиденциальность: фото- и видеосъемка персоналом строго запрещена. Все коммуникации с семьей, страховой и консульством берет на себя Memorijal d.o.o.',
      closeLabel: 'Закрыть',
      printA4Label: 'Печать A4 / PDF',
    },
    en: {
      badge: 'Hospitality & Marina Security Standard (KD 82.99)',
      title: 'Host Emergency Incident Protocol for Hotels, Villas & Marinas',
      subtitle:
        'Official operational protocol for hotel management, villa hosts, marina captains, and security personnel upon the sudden passing of an international guest.',
      step1Num: 'Step 1',
      step1Title: 'Room Isolation & Emergency Services (124 / 122)',
      step1Desc:
        'Isolate the room, villa, or yacht berth without disturbing personal belongings before emergency services (Hitna pomoć 124, Policija 122) and the medical examiner (Mrtvozornik) conclude inspection.',
      step2Num: 'Step 2',
      step2Title: 'Guest Passport Copy & Duty Coordinator Handover',
      step2Desc:
        'Prepare the guest ID/passport copy from check-in records and contact the Memorijal d.o.o. duty coordinator (+382 68 934 904) for non-disruptive case takeover.',
      step3Num: 'Step 3',
      step3Title: 'Discreet Mortuary Transfer via Accredited Partner',
      step3Desc:
        'Discreet mortuary transfer executed via accredited licensed partner vehicle through service access without disturbing surrounding guests.',
      btnPrint: 'Download Security Protocol (PDF)',
      hotlineLabel: 'Memorijal 24/7 Hospitality & Marina Dispatch Line:',
      callHitna: 'Ambulance 124',
      callPolicija: 'Police 122',
      callAgency: `Duty Desk (${PHONE_DISPLAY})`,
      modalTitle: 'HOTEL, VILLA & MARINA SECURITY INCIDENT PROTOCOL',
      modalSubtitle: 'Statutory Action Sheet for Deceased International Guest Handling',
      modalSteps: [
        {
          title: '1. ROOM ISOLATION & STATUTORY INSPECTION (124 / 122)',
          text: 'Isolate the room without disturbing personal belongings before emergency services (Hitna pomoć 124, Policija 122) and the medical examiner (Mrtvozornik) conclude inspection.',
        },
        {
          title: '2. GUEST PASSPORT COPY & COORDINATOR DISPATCH',
          text: `Prepare guest ID/passport copy and contact the Memorijal d.o.o. duty coordinator at ${PHONE_DISPLAY} (${OFFICIAL_EMAIL}) for non-disruptive case takeover.`,
        },
        {
          title: '3. DISCREET MORTUARY TRANSFER',
          text: 'Discreet mortuary transfer via accredited licensed partner through service access without disturbing surrounding guests.',
        },
      ],
      confidentialityNote:
        'Privacy Compliance: Staff photography is strictly prohibited. Consular liaison, insurer GOP, and family communications are managed by Memorijal d.o.o.',
      closeLabel: 'Close',
      printA4Label: 'Print A4 / Save PDF',
    },
    mne: {
      badge: 'Protokol bezbjednosti za hotele, vile i marine (KD 82.99)',
      title: 'Protokol postupanja za hotele, vile i marine',
      subtitle:
        'Zvanični operativni postupak za hotelsko obezbjeđenje, recepciju, upravnike vila i marina u slučaju smrti stranog gosta.',
      step1Num: 'Korak 1',
      step1Title: 'Izolacija sobe i uviđaj nadležnih službi (124 / 122)',
      step1Desc:
        'Izolujte sobu, vilu ili plovilo bez pomjeranja ličnih stvari prije nego što Hitna pomoć (124), Policija (122) i mrtvozornik završe zvanični uviđaj.',
      step2Num: 'Korak 2',
      step2Title: 'Priprema kopije pasoša i poziv dežurnom koordinatoru',
      step2Desc:
        'Pripremite kopiju pasoša/prijave gosta i kontaktirajte dežurnog koordinatora Memorijal d.o.o. (+382 68 934 904) radi diskretnog preuzimanja procedure.',
      step3Num: 'Korak 3',
      step3Title: 'Diskretan transport putem licenciranog partnera',
      step3Desc:
        'Diskretan prevoz u mrtvačnicu putem akreditovanog licenciranog partnera kroz servisni ulaz bez uznemiravanja ostalih gostiju.',
      btnPrint: 'Preuzmi protokol za osoblje (PDF)',
      hotlineLabel: 'Dežurna linija koordinatora Memorijal (24/7):',
      callHitna: 'Hitna pomoć 124',
      callPolicija: 'Policija 122',
      callAgency: `Dežurni centar (${PHONE_DISPLAY})`,
      modalTitle: 'UPUTSTVO ZA OBEZBJEĐENJE HOTELA, VILA I MARINA',
      modalSubtitle: 'Zvanični protokol postupanja u slučaju smrti stranog gosta',
      modalSteps: [
        {
          title: '1. IZOLACIJA SOBE I POZIV SLUŽBAMA 124 / 122',
          text: 'Izolujte sobu bez pomjeranja ličnih stvari prije nego što Hitna pomoć (124), Policija (122) i mrtvozornik okončaju pregled.',
        },
        {
          title: '2. KOPIJA PASOŠA GOSTA I KONTAKT KOORDINATORA',
          text: `Pripremite kopiju pasoša gosta i kontaktirajte dežurnog koordinatora Memorijal d.o.o. na ${PHONE_DISPLAY} (${OFFICIAL_EMAIL}) radi preuzimanja slučaja.`,
        },
        {
          title: '3. DISKRETAN TRANSPORT DO BOLNIČKE MRTVAČNICE',
          text: 'Diskretan prevoz putem akreditovanog licenciranog partnera bez uznemiravanja prisutnih gostiju.',
        },
      ],
      confidentialityNote:
        'Zaštita privatnosti: Fotografisanje od strane osoblja je strogo zabranjeno. Sve procedure sa ambasadom i porodicom vodi Memorijal d.o.o.',
      closeLabel: 'Zatvori',
      printA4Label: 'Štampaj A4 / PDF',
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
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-sapphire text-sapphire hover:bg-sapphire hover:text-white text-xs font-bold shadow-xs transition-colors shrink-0 cursor-pointer no-print"
        >
          <Printer className="w-4 h-4 shrink-0" />
          <span>{t.btnPrint}</span>
        </button>
      </div>

      {/* 3 Step Protocol Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
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
            <FileText className="w-4 h-4 text-blue-600" />
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
            {t.hotlineLabel}
          </span>
          <span className="font-mono font-bold text-sm text-emerald-400">
            {PHONE_DISPLAY} • {OFFICIAL_EMAIL}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 no-print">
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
                  Memorijal d.o.o. (KD 82.99) • Tivat, Crna Gora • {PHONE_DISPLAY} • {OFFICIAL_EMAIL}
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
                  {t.modalSteps[0].title}
                </strong>
                <p className="text-amber-900 leading-relaxed text-[11px]">
                  {t.modalSteps[0].text}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200">
                <strong className="block font-bold text-blue-950 mb-1">
                  {t.modalSteps[1].title}
                </strong>
                <p className="text-blue-900 leading-relaxed text-[11px]">
                  {t.modalSteps[1].text}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <strong className="block font-bold text-emerald-950 mb-1">
                  {t.modalSteps[2].title}
                </strong>
                <p className="text-emerald-900 leading-relaxed text-[11px]">
                  {t.modalSteps[2].text}
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
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer"
                >
                  {t.closeLabel}
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-forest hover:bg-forest-hover text-white font-bold shadow-xs cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>{t.printA4Label}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
