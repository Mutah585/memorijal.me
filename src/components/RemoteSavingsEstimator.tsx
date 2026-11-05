import React, { useState } from 'react';
import {
  TrendingDown,
  Plane,
  Building,
  Users,
  CheckCircle2,
  Clock,
  ShieldCheck,
  FileCheck,
  Phone,
} from 'lucide-react';
import { LocaleSlug } from '../data/seo-routes';
import { PHONE_DISPLAY, PHONE_HREF } from '../i18n/translations';

export interface RemoteSavingsEstimatorProps {
  locale: LocaleSlug;
  className?: string;
}

type OriginRegion = 'de' | 'uk' | 'ru' | 'fr' | 'other';

interface RegionProfile {
  id: OriginRegion;
  label: Record<LocaleSlug, string>;
  flightPerPersonMin: number;
  flightPerPersonMax: number;
  hotelEstimate: number;
  localTransport: number;
  translatorFees: number;
}

const REGIONS: RegionProfile[] = [
  {
    id: 'de',
    label: {
      ru: 'Германия / Австрия / Швейцария (DE/AT/CH)',
      en: 'Germany / Austria / Switzerland (DE/AT/CH)',
      mne: 'Njemačka / Austrija / Švajcarska (DE/AT/CH)',
    },
    flightPerPersonMin: 450,
    flightPerPersonMax: 650,
    hotelEstimate: 320,
    localTransport: 180,
    translatorFees: 180,
  },
  {
    id: 'uk',
    label: {
      ru: 'Великобритания (United Kingdom 🇬🇧)',
      en: 'United Kingdom (UK 🇬🇧)',
      mne: 'Velika Britanija (UK 🇬🇧)',
    },
    flightPerPersonMin: 550,
    flightPerPersonMax: 800,
    hotelEstimate: 350,
    localTransport: 200,
    translatorFees: 200,
  },
  {
    id: 'ru',
    label: {
      ru: 'Россия / СНГ (Рейсы через Стамбул / Белград)',
      en: 'Russia / CIS (Transit via Istanbul / Belgrade)',
      mne: 'Rusija / ZND (Tranzit preko Istanbula / Beograda)',
    },
    flightPerPersonMin: 650,
    flightPerPersonMax: 950,
    hotelEstimate: 300,
    localTransport: 160,
    translatorFees: 150,
  },
  {
    id: 'fr',
    label: {
      ru: 'Франция / Бельгия / Западная Европа',
      en: 'France / Belgium / Western Europe',
      mne: 'Francuska / Belgija / Zapadna Evropa',
    },
    flightPerPersonMin: 500,
    flightPerPersonMax: 750,
    hotelEstimate: 340,
    localTransport: 190,
    translatorFees: 190,
  },
  {
    id: 'other',
    label: {
      ru: 'Другие страны ЕС / США / Канада',
      en: 'Other EU / United States / Canada',
      mne: 'Ostale zemlje EU / SAD / Kanada',
    },
    flightPerPersonMin: 600,
    flightPerPersonMax: 900,
    hotelEstimate: 350,
    localTransport: 200,
    translatorFees: 200,
  },
];

export const RemoteSavingsEstimator: React.FC<RemoteSavingsEstimatorProps> = ({
  locale,
  className = '',
}) => {
  const [selectedRegion, setSelectedRegion] = useState<OriginRegion>('de');
  const [passengers, setPassengers] = useState<1 | 2>(1);

  const region =
    REGIONS.find((r) => r.id === selectedRegion) || REGIONS[0];

  const minFlight = region.flightPerPersonMin * passengers;
  const maxFlight = region.flightPerPersonMax * passengers;
  const totalTravelMin =
    minFlight + region.hotelEstimate + region.localTransport + region.translatorFees;
  const totalTravelMax =
    maxFlight + region.hotelEstimate + region.localTransport + region.translatorFees;

  const t = {
    ru: {
      badge: 'Экономический и временной расчёт',
      title: 'Дистанционное ведение дела по доверенности против экстренной поездки семьи',
      subtitle:
        'Семьям в состоянии острого горя часто кажется, что они обязаны срочно покупать дорогие билеты и лететь в Черногорию. По закону Черногории личное присутствие родственников не требуется.',
      regionLabel: 'Страна вылета / юрисдикция семьи:',
      travelersLabel: 'Количество родственников (если лететь лично):',
      travelScenarioTitle: 'Вариант 1: Экстренная поездка семьи в Черногорию',
      remoteScenarioTitle: 'Вариант 2: Дистанционное оформление по доверенности (Memorijal)',
      flightsLabel: `Срочные авиабилеты (${passengers} чел.):`,
      hotelLabel: 'Экстренное проживание (Котор / Будва / Подгорица, 3–5 ночей):',
      transportLabel: 'Локальный транспорт, аренда авто, трансферы между моргами:',
      translatorLabel: 'Судебные переводчики и нотариальные выезды на месте:',
      totalTravelCost: 'Ориентировочные затраты семьи на поездку:',
      remoteCost: '0 € (выезд семьи не требуется)',
      timeComparison: 'Выигрыш по времени:',
      timeDetails: 'Экономия 24–48 часов (нет ожидания виз, стыковок и перелётов)',
      reassuranceQuote:
        'Оформление через агентство по доверенности экономит семье от €1 800 на экстренных перелетах и проживании, сокращая срок отправки на 48–72 часа.',
      btnDiscuss: 'Получить консультацию по доверенности 24/7',
    },
    en: {
      badge: 'Cost & Time Comparison Analysis',
      title: 'Remote Case Management vs. Emergency Family Travel Cost Estimator',
      subtitle:
        'Bereaved families under acute shock often mistakenly assume they must purchase expensive last-minute flights to Montenegro. Under Montenegrin law, personal family attendance is not required.',
      regionLabel: 'Country of Departure / Family Residence:',
      travelersLabel: 'Number of Family Travelers (if travelling in person):',
      travelScenarioTitle: 'Scenario 1: Emergency Family Travel to Montenegro',
      remoteScenarioTitle: 'Scenario 2: Remote Case Management under PoA (Memorijal)',
      flightsLabel: `Emergency Flights (${passengers} traveler${passengers > 1 ? 's' : ''}):`,
      hotelLabel: 'Short-Notice Lodging (Kotor / Budva / Podgorica, 3–5 nights):',
      transportLabel: 'Local car hire, transfers between morgues and embassies:',
      translatorLabel: 'Certified court interpreters & in-person notary appointments:',
      totalTravelCost: 'Estimated Unnecessary Out-of-Pocket Family Expense:',
      remoteCost: '€0 (No travel required)',
      timeComparison: 'Turnaround Time Advantage:',
      timeDetails: 'Saves 24–48 hours (eliminates flight schedules & travel logistics)',
      reassuranceQuote:
        'Remote case management under Power of Attorney saves families from €1,800 in emergency travel and lodging while expediting repatriation by 48–72 hours.',
      btnDiscuss: 'Consult 24/7 on Remote PoA Authorization',
    },
    mne: {
      badge: 'Ekonomska i vremenska analiza troškova',
      title: 'Vođenje predmeta po punomoćju u odnosu na hitan dolazak porodice',
      subtitle:
        'Porodice u šoku često pogrešno smatraju da moraju hitno kupovati skupe avio karte za dolazak u Crnu Goru. Prema zakonima Crne Gore, lično prisustvo porodice nije neophodno.',
      regionLabel: 'Zemlja polaska / prebivalište porodice:',
      travelersLabel: 'Broj članova porodice (u slučaju ličnog dolaska):',
      travelScenarioTitle: 'Opcija 1: Hitan dolazak porodice u Crnu Goru',
      remoteScenarioTitle: 'Opcija 2: Vođenje predmeta po punomoćju (Memorijal)',
      flightsLabel: `Hitne avio karte (${passengers} putnik${passengers > 1 ? 'a' : ''}):`,
      hotelLabel: 'Hitan smještaj (Kotor / Budva / Podgorica, 3–5 noćenja):',
      transportLabel: 'Lokalni prevoz, rent-a-car, taksi relacije:',
      translatorLabel: 'Sudski tumači i administrativni troškovi na licu mjesta:',
      totalTravelCost: 'Procijenjeni nepotrebni trošak putovanja:',
      remoteCost: '0 € (dolazak porodice nije potreban)',
      timeComparison: 'Ušteda vremena:',
      timeDetails: 'Ušteda 24–48 sati (bez čekanja na avio letove i organizaciju puta)',
      reassuranceQuote:
        'Vođenje slučaja po punomoćju štedi porodici od €1.800 troškova hitnog putovanja i smještaja, ubrzavajući postupak za 48–72 sata.',
      btnDiscuss: 'Konsultujte dežurnog koordinatora 24/7',
    },
  }[locale];

  return (
    <div
      className={`bg-white rounded-2xl border border-stoneBorder p-6 sm:p-8 shadow-card space-y-6 ${className}`}
    >
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sapphire mb-1.5">
          <TrendingDown className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{t.badge}</span>
        </div>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-slateDeep">
          {t.title}
        </h3>
        <p className="text-xs sm:text-sm text-slateMuted mt-1 max-w-3xl leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Control Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-alabaster border border-stoneBorder text-xs">
        <div className="sm:col-span-2">
          <label className="block font-semibold text-slateDeep mb-1.5">
            {t.regionLabel}
          </label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value as OriginRegion)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-stoneBorder bg-white text-slateDeep font-medium focus:outline-none focus:ring-1 focus:ring-sapphire cursor-pointer"
          >
            {REGIONS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label[locale]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold text-slateDeep mb-1.5">
            {t.travelersLabel}
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setPassengers(1)}
              className={`py-2 px-3 rounded-lg border font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                passengers === 1
                  ? 'bg-sapphire text-white border-sapphire'
                  : 'bg-white text-slateDeep border-stoneBorder hover:bg-porcelain'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>1</span>
            </button>
            <button
              type="button"
              onClick={() => setPassengers(2)}
              className={`py-2 px-3 rounded-lg border font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                passengers === 2
                  ? 'bg-sapphire text-white border-sapphire'
                  : 'bg-white text-slateDeep border-stoneBorder hover:bg-porcelain'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>2</span>
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Columns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Column 1: Emergency Travel Scenario (High Stress & Cost) */}
        <div className="p-6 rounded-2xl border border-red-200 bg-red-50/30 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-800">
              <Plane className="w-4 h-4 text-red-600" />
              <span>{t.travelScenarioTitle}</span>
            </div>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="flex items-center justify-between py-1 border-b border-red-100">
                <span className="flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5 text-slate-400" />
                  {t.flightsLabel}
                </span>
                <span className="font-mono font-bold text-slateDeep">
                  €{minFlight} – €{maxFlight}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-red-100">
                <span className="flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  {t.hotelLabel}
                </span>
                <span className="font-mono font-bold text-slateDeep">
                  €{region.hotelEstimate}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-red-100">
                <span>{t.transportLabel}</span>
                <span className="font-mono font-bold text-slateDeep">
                  €{region.localTransport}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-red-100">
                <span>{t.translatorLabel}</span>
                <span className="font-mono font-bold text-slateDeep">
                  €{region.translatorFees}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-red-200 text-xs">
            <span className="text-red-700 font-bold block text-[11px] uppercase">
              {t.totalTravelCost}
            </span>
            <span className="text-xl sm:text-2xl font-mono font-extrabold text-red-800 mt-1 block">
              €{totalTravelMin.toLocaleString()} – €{totalTravelMax.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Column 2: Remote Handling Model (Zero Travel, Expedited) */}
        <div className="p-6 rounded-2xl border-2 border-emerald-400 bg-emerald-50/40 flex flex-col justify-between space-y-4 shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{t.remoteScenarioTitle}</span>
            </div>

            <ul className="space-y-3 text-xs text-emerald-950 font-medium">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Транспортные расходы семьи: 0 €</strong> (дистанционная доверенность за 15 минут у нотариуса).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Судебные переводы и пошлины:</strong> организованы координатором Memorijal по безналичному расчёту.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>{t.timeComparison}</strong> {t.timeDetails}.
                </span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-white border border-emerald-300 text-xs">
            <span className="text-emerald-800 font-bold block text-[11px] uppercase">
              Итоговые дорожные расходы семьи:
            </span>
            <span className="text-2xl sm:text-3xl font-mono font-extrabold text-emerald-700 mt-1 block">
              0 €
            </span>
            <span className="text-[11px] text-emerald-800 block mt-0.5 font-medium">
              Чистая экономия бюджета семьи: €{totalTravelMin.toLocaleString()} – €{totalTravelMax.toLocaleString()}+
            </span>
          </div>
        </div>
      </div>

      {/* Official Institutional Reassurance Quote */}
      <div className="p-4 rounded-xl bg-sapphire/5 border border-sapphire/20 flex items-start gap-3 text-xs sm:text-sm text-slateDeep">
        <FileCheck className="w-5 h-5 text-sapphire shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="block font-semibold text-sapphire">
            Юридическая гарантия Memorijal d.o.o.:
          </strong>
          <p className="text-slate-700 leading-relaxed text-xs">
            {t.reassuranceQuote}
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
        <span className="text-xs text-slate-500 font-medium">
          Круглосуточная правовая линия: <span className="font-semibold text-slateDeep">{PHONE_DISPLAY}</span>
        </span>
        <a
          href={PHONE_HREF}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-forest hover:bg-forest-hover text-white text-xs font-bold shadow-xs transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span>{t.btnDiscuss}</span>
        </a>
      </div>
    </div>
  );
};

