import React from 'react';
import {
  Phone,
  ShieldAlert,
  Clock,
  Lock,
} from 'lucide-react';
import { LocaleSlug } from '../data/seo-routes';
import { PHONE_DISPLAY, PHONE_HREF } from '../i18n/translations';

export interface HomeDeathProtocolProps {
  locale: LocaleSlug;
  className?: string;
}

export const HomeDeathProtocol: React.FC<HomeDeathProtocolProps> = ({
  locale,
  className = '',
}) => {
  const t = {
    ru: {
      badge: 'Экстренный протокол первых 30 минут',
      title: 'Что делать при наступлении смерти в апартаментах, отеле или на вилле',
      subtitle:
        'Если смерть наступила вне стен медицинского стационара (в арендованном жилье, гостинице или частном секторе), действует строгий регламент вызова экстренных служб Черногории.',
      step1Num: 'Шаг 1',
      step1Title: 'Вызов скорой помощи — тел. 124 (Hitna pomoć)',
      step1Desc:
        'Врачебная бригада обязана прибыть для официальной констатации факта смерти (Konstatacija smrti) и выписки первичного врачебного протокола.',
      step2Num: 'Шаг 2',
      step2Title: 'Оповещение полиции — тел. 122 (Policija)',
      step2Desc:
        'Обязательное уставное требование при любой ненасильственной или внезапной смерти иностранного гражданина вне больницы. Полиция обеспечивает вызов дежурного судебно-медицинского эксперта (Mrtvozornik).',
      step3Num: 'Шаг 3',
      step3Title: 'Не трогать вещи, лекарства и обстановку помещения',
      step3Desc:
        'Сохраняйте неприкосновенность спальни/номера до прибытия следователя и патологоанатома. Препараты и упаковки лекарств требуются врачу для установления анамнеза и исключения насильственных причин.',
      step4Num: 'Шаг 4',
      step4Title: 'Отказ от навязанных частных посредников',
      step4Desc:
        'Не передавайте загранпаспорт и оригиналы документов неуполномоченным третьим лицам. Свяжитесь с координатором Memorijal d.o.o. для фиксации случая и официальной защиты интересов семьи.',
      emergencyHotline: 'Экстренная линия координатора Memorijal (24/7):',
      callHitna: 'Скорая помощь 124',
      callPolicija: 'Полиция 122',
      callAgency: `Дежурный координатор (${PHONE_DISPLAY})`,
    },
    en: {
      badge: 'First 30-Minute Emergency Protocol',
      title: 'Action Protocol for Passing at Hotel, Private Villa, or Rental Apartment',
      subtitle:
        'When death occurs outside an acute care hospital (in private villas, resort residences, or hotels), strict statutory emergency procedures apply in Montenegro.',
      step1Num: 'Step 1',
      step1Title: 'Emergency Medical Dispatch — Dial 124 (Hitna pomoć)',
      step1Desc:
        'An attending medical crew must officially certify the verified fact of death (Konstatacija smrti) and issue the initial medical assessment record.',
      step2Num: 'Step 2',
      step2Title: 'Police Notification — Dial 122 (Policija)',
      step2Desc:
        'Mandatory statutory requirement for any foreign citizen passing outside a hospital. Police dispatch coordinates attendance with the municipal coroner (Mrtvozornik).',
      step3Num: 'Step 3',
      step3Title: 'Preserve Room Setting, Belongings & Medications',
      step3Desc:
        'Do not disturb personal luggage, medical vials, or prescriptions prior to formal medical examiner clearance. Medications help substantiate natural cause-of-death findings.',
      step4Num: 'Step 4',
      step4Title: 'Rebuff Unauthorized Intermediaries',
      step4Desc:
        'Never surrender foreign passports or funds to unaccredited local operators. Authorize a licensed case coordinator from Memorijal d.o.o. for certified mortuary dispatch.',
      emergencyHotline: 'Memorijal 24/7 International Crisis Hotline:',
      callHitna: 'Ambulance 124',
      callPolicija: 'Police 122',
      callAgency: `Duty Dispatcher (${PHONE_DISPLAY})`,
    },
    mne: {
      badge: 'Protokol postupanja u prvih 30 minuta',
      title: 'Postupak u slučaju smrti u hotelu, apartmanu ili privatnom smještaju',
      subtitle:
        'Kada smrt nastupi van zdravstvene ustanove (u hotelu, vili ili privatnom stanu), primjenjuje se strogi zakonski protokol obavještavanja dežurnih službi.',
      step1Num: 'Korak 1',
      step1Title: 'Poziv Hitnoj medicinskoj pomoći — tel. 124',
      step1Desc:
        'Dežurna ljekarska ekipa konstatuje smrt i izdaje Potvrdu o konstataciji smrti na licu mjesta.',
      step2Num: 'Korak 2',
      step2Title: 'Obavještenje Policije — tel. 122',
      step2Desc:
        'Zakonska obaveza za sve slučajeve smrti stranih državljana van bolnice radi obavještavanja dežurnog mrtvozornika.',
      step3Num: 'Korak 3',
      step3Title: 'Očuvanje zatečenog stanja i medicinske terapije',
      step3Desc:
        'Ne pomijerati lične stvari, dokumenta i terapiju do dolaska mrtvozornika radi utvrđivanja uzroka smrti.',
      step4Num: 'Korak 4',
      step4Title: 'Odbijanje neovlašćenih lica i posrednika',
      step4Desc:
        'Ne predavati originalna dokumenta i pasoš neovlašćenim licima. Angažujte zvaničnog koordinatora Memorijal d.o.o.',
      emergencyHotline: 'Dežurna linija Memorijal d.o.o. (24/7):',
      callHitna: 'Hitna pomoć 124',
      callPolicija: 'Policija 122',
      callAgency: `Dežurni koordinator (${PHONE_DISPLAY})`,
    },
  }[locale];

  return (
    <div
      className={`bg-white rounded-2xl border border-stoneBorder p-6 sm:p-8 shadow-card space-y-6 ${className}`}
    >
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-2.5 py-1 rounded-full mb-2">
          <Clock className="w-3.5 h-3.5" />
          <span>{t.badge}</span>
        </div>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-slateDeep">
          {t.title}
        </h3>
        <p className="text-xs sm:text-sm text-slateMuted mt-1 max-w-3xl leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Step 1 */}
        <div className="p-4 rounded-xl bg-alabaster border border-stoneBorder space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-md bg-sapphire text-white">
              {t.step1Num}
            </span>
            <a
              href="tel:124"
              className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>124</span>
            </a>
          </div>
          <h4 className="font-bold text-xs sm:text-sm text-slateDeep">
            {t.step1Title}
          </h4>
          <p className="text-xs text-slateMuted leading-relaxed">
            {t.step1Desc}
          </p>
        </div>

        {/* Step 2 */}
        <div className="p-4 rounded-xl bg-alabaster border border-stoneBorder space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-md bg-sapphire text-white">
              {t.step2Num}
            </span>
            <a
              href="tel:122"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>122</span>
            </a>
          </div>
          <h4 className="font-bold text-xs sm:text-sm text-slateDeep">
            {t.step2Title}
          </h4>
          <p className="text-xs text-slateMuted leading-relaxed">
            {t.step2Desc}
          </p>
        </div>

        {/* Step 3 */}
        <div className="p-4 rounded-xl bg-alabaster border border-stoneBorder space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-md bg-amber-600 text-white">
              {t.step3Num}
            </span>
            <Lock className="w-4 h-4 text-amber-600" />
          </div>
          <h4 className="font-bold text-xs sm:text-sm text-slateDeep">
            {t.step3Title}
          </h4>
          <p className="text-xs text-slateMuted leading-relaxed">
            {t.step3Desc}
          </p>
        </div>

        {/* Step 4 */}
        <div className="p-4 rounded-xl bg-alabaster border border-stoneBorder space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-md bg-emerald-700 text-white">
              {t.step4Num}
            </span>
            <ShieldAlert className="w-4 h-4 text-emerald-700" />
          </div>
          <h4 className="font-bold text-xs sm:text-sm text-slateDeep">
            {t.step4Title}
          </h4>
          <p className="text-xs text-slateMuted leading-relaxed">
            {t.step4Desc}
          </p>
        </div>
      </div>

      {/* Emergency Action Buttons Row */}
      <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-0.5 text-center sm:text-left">
          <span className="text-xs text-slate-400 block font-medium">
            {t.emergencyHotline}
          </span>
          <span className="font-mono font-bold text-sm text-emerald-400">
            {PHONE_DISPLAY} (Круглосуточно / 24/7)
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
    </div>
  );
};
