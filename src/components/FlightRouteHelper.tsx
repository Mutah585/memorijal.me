import React, { useState } from 'react';
import {
  Plane,
  ShieldCheck,
  ArrowRight,
  Luggage,
  PackageCheck,
} from 'lucide-react';
import { LocaleSlug } from '../data/seo-routes';

export interface FlightRouteHelperProps {
  locale: LocaleSlug;
  className?: string;
}

type OriginAirport = 'TGD' | 'TIV';
type DestinationHub = 'BEG' | 'IST' | 'VIE' | 'LON';

interface HubInfo {
  id: DestinationHub;
  city: { en: string; ru: string; mne: string };
  airportName: string;
  airlines: string;
  dailyFrequency: { en: string; ru: string; mne: string };
  transitPurpose: { en: string; ru: string; mne: string };
  cargoLeadTime: string;
  cargoAwbGuidance: { en: string; ru: string; mne: string };
  cabinUrnGuidance: { en: string; ru: string; mne: string };
}

const HUBS: HubInfo[] = [
  {
    id: 'BEG',
    city: {
      en: 'Belgrade (BEG), Serbia',
      ru: 'Белград (BEG), Сербия',
      mne: 'Beograd (BEG), Srbija',
    },
    airportName: 'Belgrade Nikola Tesla Airport (BEG)',
    airlines: 'Air Serbia (JU)',
    dailyFrequency: {
      en: 'Up to 3–5 flights daily from TGD & TIV',
      ru: 'До 3–5 рейсов ежедневно из Подгорицы и Тивата',
      mne: 'Do 3–5 letova dnevno iz TGD i TIV',
    },
    transitPurpose: {
      en: 'Primary state cremation corridor & Southeast Europe transit',
      ru: 'Основной коридор кремации в Белграде и транзитный хаб Балкан',
      mne: 'Glavni koridor za državnu kremaciju u Beogradu i tranzit',
    },
    cargoLeadTime: '18–24 ч / hrs',
    cargoAwbGuidance: {
      en: 'Air Serbia Cargo AWB issuance within 24h. Certified zinc hermetic solder and customs sealing accepted.',
      ru: 'Оформление авианакладной Air Serbia Cargo (AWB) за 24ч. Принимается сертифицированная герметичная опайка цинка.',
      mne: 'Izdavanje AWB tovarnog lista Air Serbia Cargo u roku od 24h. Sertifikovano lemljenje cinka i carinske plombe.',
    },
    cabinUrnGuidance: {
      en: 'Permitted in aircraft cabin as carry-on. Requires Certificate of Cremation (Potvrda o kremaciji) and factory lead seal.',
      ru: 'Разрешен провоз в салоне самолета как ручная кладь. Требуется Potvrda o kremaciji и заводская пломба.',
      mne: 'Dozvoljeno unošenje u kabinu aviona kao ručni prtljag uz Potvrdu o kremaciji i fabrički pečat.',
    },
  },
  {
    id: 'IST',
    city: {
      en: 'Istanbul (IST), Turkey',
      ru: 'Стамбул (IST), Турция',
      mne: 'Istanbul (IST), Turska',
    },
    airportName: 'Istanbul Airport (IST)',
    airlines: 'Turkish Airlines (TK) / Air Montenegro (4O)',
    dailyFrequency: {
      en: 'Daily scheduled flights from TGD & TIV',
      ru: 'Ежедневные регулярные рейсы из Подгорицы и Тивата',
      mne: 'Svakodnevni redovni letovi iz TGD i TIV',
    },
    transitPurpose: {
      en: 'Global connection hub to Middle East, Asia, Americas & CIS',
      ru: 'Мировой пересадочный хаб на Ближний Восток, в Азию, США и СНГ',
      mne: 'Globalni tranzitni centar za Bliski istok, Aziju i Ameriku',
    },
    cargoLeadTime: '24–36 ч / hrs',
    cargoAwbGuidance: {
      en: 'Direct Turkish Cargo booking with Cenaze Nakil Belgesi and IATA HUM compliance.',
      ru: 'Прямое бронирование Turkish Cargo со справкой Cenaze Nakil Belgesi и нормами IATA HUM.',
      mne: 'Direktna rezervacija Turkish Cargo sa Cenaze Nakil Belgesi i IATA HUM standardima.',
    },
    cabinUrnGuidance: {
      en: 'Compliant radiotransparent urn permitted in passenger cabin. Multilingual translation required.',
      ru: 'Рентгенопрозрачная урна допускается в салон самолета. Требуется нотариальный перевод свидетельства.',
      mne: 'Rendgenski propusna urna dozvoljena u putničkoj kabini uz ovjereni prevod potvrde.',
    },
  },
  {
    id: 'VIE',
    city: {
      en: 'Vienna (VIE), Austria',
      ru: 'Вена (VIE), Австрия',
      mne: 'Beč (VIE), Austrija',
    },
    airportName: 'Vienna International Airport (VIE)',
    airlines: 'Austrian Airlines (OS)',
    dailyFrequency: {
      en: 'Daily flights from Podgorica (TGD)',
      ru: 'Ежедневные рейсы из Подгорицы (TGD)',
      mne: 'Svakodnevni letovi iz Podgorice (TGD)',
    },
    transitPurpose: {
      en: 'Central European gateway to Germany, Switzerland, Poland & EU',
      ru: 'Центральноевропейский хаб в Германию, Швейцарию, Польшу и ЕС',
      mne: 'Centralnoevropski čvor za Njemačku, Švajcarsku i EU',
    },
    cargoLeadTime: '24–36 ч / hrs',
    cargoAwbGuidance: {
      en: 'Lufthansa Cargo / Austrian Cargo network. Full Schengen sanitary import declaration.',
      ru: 'Сеть Lufthansa Cargo / Austrian Cargo. Санитарная декларация ввоза в Шенген.',
      mne: 'Mreža Austrian / Lufthansa Cargo. Šengenska sanitarna uvozna deklaracija.',
    },
    cabinUrnGuidance: {
      en: 'Standard cabin carry-on clearance with official Leichenpass or Certificate of Cremation.',
      ru: 'Беспрепятственный провоз в салоне с официальным свидетельством о кремации (Leichenpass).',
      mne: 'Standardan unos u putničku kabinu uz zvaničnu potvrdu o kremaciji.',
    },
  },
  {
    id: 'LON',
    city: {
      en: 'London (LGW / LHR), UK',
      ru: 'Лондон (LGW / LHR), Великобритания',
      mne: 'London (LGW / LHR), UK',
    },
    airportName: 'London Gatwick (LGW) / Heathrow (LHR)',
    airlines: 'British Airways / Scheduled seasonal carriers',
    dailyFrequency: {
      en: 'Direct scheduled flights from TIV & TGD (seasonal & connections via VIE/BEG)',
      ru: 'Прямые рейсы из Тивата и Подгорицы (сезонные и через BEG/VIE)',
      mne: 'Direktni i tranzitni letovi iz TIV i TGD (preko BEG/VIE)',
    },
    transitPurpose: {
      en: 'Repatriation to England, Scotland, Wales & Coroner jurisdiction',
      ru: 'Репатриация в Англию, Шотландию, Уэльс под юрисдикцию Coroner',
      mne: 'Repatrijacija u Ujedinjeno Kraljevstvo i prijem kod Koronera',
    },
    cargoLeadTime: '24–48 ч / hrs',
    cargoAwbGuidance: {
      en: 'Strict compliance with UK Border Force & Coroner Out-of-England / Form 104 requirements.',
      ru: 'Соблюдение требований UK Border Force, Coroner Out-of-England и формы Form 104.',
      mne: 'Usklađenost sa propisima UK Border Force i procedurom britanskog Koronera.',
    },
    cabinUrnGuidance: {
      en: 'Passenger carriage in cabin permitted. Non-metallic urn required to pass UK airport security X-ray.',
      ru: 'Разрешен провоз в ручной клади. Неметаллическая урна для прохождения британского сканера.',
      mne: 'Dozvoljen unos u kabinu. Nemetalna urna za prolaz kroz britanske aerodromske skenere.',
    },
  },
];

export const FlightRouteHelper: React.FC<FlightRouteHelperProps> = ({
  locale,
  className = '',
}) => {
  const [selectedOrigin, setSelectedOrigin] = useState<OriginAirport>('TGD');
  const [selectedHub, setSelectedHub] = useState<DestinationHub>('BEG');

  const activeHub = HUBS.find((h) => h.id === selectedHub) || HUBS[0];

  const t = {
    ru: {
      badge: 'IATA Cargo HUM & Салонная перевозка урн',
      title: 'Интерактивный навигатор авиамаршрутов (Тиват / Подгорица)',
      subtitle:
        'Выберите аэропорт вылета в Черногории и узловой международный хаб назначения для проверки регламента бронирования груза Cargo HUM и провоза урны в салоне.',
      originLabel: 'Аэропорт вылета из Черногории:',
      destLabel: 'Международный стыковочный хаб:',
      tgdDesc: 'Аэропорт Подгорица (TGD) — Круглогодичный грузовой карго-терминал',
      tivDesc: 'Аэропорт Тиват (TIV) — Прибрежный хаб (Бока-Которский залив)',
      carrier: 'Авиакомпания:',
      frequency: 'Регулярность:',
      purpose: 'Назначение коридора:',
      cargoTitle: 'Регламент IATA Cargo HUM (Гроб в грузовом отсеке)',
      cargoTime: 'Срок бронирования AWB:',
      cabinTitle: 'Регламент перевозки урны в ручной клади (Салон)',
      cabinLead: 'Ручная кладь без карго-тарифов',
      complianceNotice:
        'Memorijal d.o.o. оформляет экспортную таможенную декларацию, прохождение авиационной безопасности и выдачу авианакладной (AWB) без задержек.',
    },
    en: {
      badge: 'IATA Cargo HUM & Cabin Urn Flight Navigator',
      title: 'Interactive Flight Hub & Air Repatriation Selector (TIV / TGD)',
      subtitle:
        'Select departure airport in Montenegro and primary destination hub to inspect exact booking lead times for Air Cargo HUM and cabin baggage urn protocols.',
      originLabel: 'Departure Airport in Montenegro:',
      destLabel: 'International Destination / Transit Hub:',
      tgdDesc: 'Podgorica Airport (TGD) — Year-round dedicated air cargo terminal',
      tivDesc: 'Tivat Airport (TIV) — Coastal hub serving Boka Bay & Budva Riviera',
      carrier: 'Operating Carrier:',
      frequency: 'Flight Frequency:',
      purpose: 'Corridor Purpose:',
      cargoTitle: 'IATA Cargo HUM Protocol (Casket in Cargo Hold)',
      cargoTime: 'Booking & AWB Lead Time:',
      cabinTitle: 'Aircraft Cabin Urn Protocol (Carry-On Baggage)',
      cabinLead: 'Cabin Carry-On with Zero Mortuary Fees',
      complianceNotice:
        'Memorijal d.o.o. directly coordinates export customs clearance, aviation security screening, and Master Air Waybill (AWB) issuance.',
    },
    mne: {
      badge: 'IATA Cargo HUM & Avio-prevoz urne u kabini',
      title: 'Interaktivni selektor avio-koridora (Tivat / Podgorica)',
      subtitle:
        'Izaberite polazni aerodrom u Crnoj Gori i međunarodni čvor za provjeru rokova rezervacije Cargo HUM avio-tereta i pravila za unošenje urne u kabinu aviona.',
      originLabel: 'Polazni aerodrom u Crnoj Gori:',
      destLabel: 'Međunarodni tranzitni aerodrom:',
      tgdDesc: 'Aerodrom Podgorica (TGD) — Cjelogodišnji kargo terminal',
      tivDesc: 'Aerodrom Tivat (TIV) — Primorski aerodrom za Boku i Budvu',
      carrier: 'Avio-kompanija:',
      frequency: 'Učestalost letova:',
      purpose: 'Svrha koridora:',
      cargoTitle: 'IATA Cargo HUM protokol (Sanduk u teretnom prostoru)',
      cargoTime: 'Rok za rezervaciju AWB:',
      cabinTitle: 'Protokol za urnu u kabini aviona (Ručni prtljag)',
      cabinLead: 'Ručni prtljag bez posebnih avio-doplata',
      complianceNotice:
        'Memorijal d.o.o. direktno sprovodi izvozno carinsko carinjenje, bezbjednosnu provjeru i izdavanje avio tovarnog lista (AWB).',
    },
  }[locale];

  return (
    <div
      className={`bg-white rounded-2xl border border-stoneBorder p-6 sm:p-8 shadow-card ${className}`}
    >
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sapphire mb-2">
        <Plane className="w-4 h-4 text-sapphire shrink-0" />
        <span>{t.badge}</span>
      </div>

      <h3 className="font-serif text-xl sm:text-2xl font-bold text-slateDeep">
        {t.title}
      </h3>
      <p className="mt-1 text-xs sm:text-sm text-slateMuted leading-relaxed max-w-3xl">
        {t.subtitle}
      </p>

      {/* 1. Departure Airport Selector */}
      <div className="mt-6">
        <label className="block text-xs font-semibold text-slateDeep mb-2">
          {t.originLabel}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setSelectedOrigin('TGD')}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              selectedOrigin === 'TGD'
                ? 'border-sapphire bg-sapphire-subtle/40 ring-1 ring-sapphire/30'
                : 'border-stoneBorder hover:bg-porcelain'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs sm:text-sm text-slateDeep">
                Podgorica Airport (TGD)
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white border border-stoneBorder text-sapphire font-bold">
                TGD
              </span>
            </div>
            <p className="mt-1 text-[11px] text-slateMuted">{t.tgdDesc}</p>
          </button>

          <button
            type="button"
            onClick={() => setSelectedOrigin('TIV')}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              selectedOrigin === 'TIV'
                ? 'border-sapphire bg-sapphire-subtle/40 ring-1 ring-sapphire/30'
                : 'border-stoneBorder hover:bg-porcelain'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs sm:text-sm text-slateDeep">
                Tivat Airport (TIV)
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white border border-stoneBorder text-sapphire font-bold">
                TIV
              </span>
            </div>
            <p className="mt-1 text-[11px] text-slateMuted">{t.tivDesc}</p>
          </button>
        </div>
      </div>

      {/* 2. Destination Hub Pills */}
      <div className="mt-5">
        <label className="block text-xs font-semibold text-slateDeep mb-2">
          {t.destLabel}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {HUBS.map((hub) => {
            const isSelected = selectedHub === hub.id;
            return (
              <button
                key={hub.id}
                type="button"
                onClick={() => setSelectedHub(hub.id)}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'border-sapphire bg-sapphire text-white font-semibold shadow-xs'
                    : 'border-stoneBorder hover:bg-porcelain text-slate-700'
                }`}
              >
                <span className="block font-mono text-xs font-bold">
                  {hub.id}
                </span>
                <span className="block text-[11px] truncate mt-0.5">
                  {hub.city[locale].split('(')[0].trim()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Detailed Route Information */}
      <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-porcelain border border-stoneBorder space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stoneBorder/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-sapphire">
              <span>{selectedOrigin}</span>
              <ArrowRight className="w-3.5 h-3.5" />
              <span>{activeHub.id}</span>
            </div>
            <h4 className="font-serif text-lg sm:text-xl font-bold text-slateDeep mt-0.5">
              {activeHub.airportName}
            </h4>
          </div>
          <div className="text-xs text-slate-600 sm:text-right">
            <div>
              <span className="text-slate-400">{t.carrier} </span>
              <strong className="text-slateDeep font-semibold">
                {activeHub.airlines}
              </strong>
            </div>
            <div className="mt-0.5 text-[11px] text-slateMuted">
              {activeHub.dailyFrequency[locale]}
            </div>
          </div>
        </div>

        {/* Dual Guidance Cards: Cargo HUM vs Cabin Urn */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Cargo HUM Card */}
          <div className="p-4 rounded-xl bg-white border border-stoneBorder shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sapphire mb-2">
                <PackageCheck className="w-4 h-4 text-sapphire" />
                <span>{t.cargoTitle}</span>
              </div>
              <p className="text-xs text-slateMuted leading-relaxed">
                {activeHub.cargoAwbGuidance[locale]}
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-stoneBorder/60 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">
                {t.cargoTime}
              </span>
              <span className="font-mono font-bold text-slateDeep">
                {activeHub.cargoLeadTime}
              </span>
            </div>
          </div>

          {/* Cabin Urn Card */}
          <div className="p-4 rounded-xl bg-white border border-stoneBorder shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest mb-2">
                <Luggage className="w-4 h-4 text-forest" />
                <span>{t.cabinTitle}</span>
              </div>
              <p className="text-xs text-slateMuted leading-relaxed">
                {activeHub.cabinUrnGuidance[locale]}
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-stoneBorder/60 flex items-center justify-between text-xs">
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t.cabinLead}</span>
              </span>
              <span className="font-mono font-bold text-emerald-800">0 €</span>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance reassurance note */}
      <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-600">
        <ShieldCheck className="w-4 h-4 text-sapphire shrink-0 mt-0.5" />
        <p className="leading-relaxed">{t.complianceNotice}</p>
      </div>
    </div>
  );
};
