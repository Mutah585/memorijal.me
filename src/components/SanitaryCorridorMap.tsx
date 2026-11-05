import React, { useState } from 'react';
import {
  Clock,
  ShieldCheck,
  Truck,
  CheckCircle2,
  FileCheck,
} from 'lucide-react';
import { LocaleSlug } from '../data/seo-routes';
import { PHONE_DISPLAY, PHONE_HREF } from '../i18n/translations';

export interface SanitaryCorridorMapProps {
  locale: LocaleSlug;
  className?: string;
}

type RouteId = 'route-a' | 'route-b' | 'route-c';

interface RouteSpec {
  id: RouteId;
  name: Record<LocaleSlug, string>;
  subtitle: Record<LocaleSlug, string>;
  origin: string;
  via: string;
  borderPost: string;
  destination: Record<LocaleSlug, string>;
  distanceKm: number;
  drivingTime: string;
  customsRegime: Record<LocaleSlug, string>;
  sanitaryNotice: Record<LocaleSlug, string>;
  svgPath: string;
  highlightPoints: Array<{ x: number; y: number; label: string }>;
}

const CORRIDORS: RouteSpec[] = [
  {
    id: 'route-a',
    name: {
      ru: 'Коридор А: Северный транзит на кремацию в Белград',
      en: 'Corridor A: Northern Transit for Belgrade Cremation',
      mne: 'Koridor A: Sjeverni tranzit za kremaciju u Beogradu',
    },
    subtitle: {
      ru: 'Подгорица → Колашин → Биело-Поле → КПП Добраково/Гостун → Белград',
      en: 'Podgorica → Kolašin → Bijelo Polje → Dobrakovo/Gostun border → Belgrade',
      mne: 'Podgorica → Kolašin → Bijelo Polje → GP Dobrakovo/Gostun → Beograd',
    },
    origin: 'Podgorica (KCCG)',
    via: 'Kolašin • Bijelo Polje',
    borderPost: 'GP Dobrakovo (MNE) / Gostun (SRB)',
    destination: {
      ru: 'Белград (Крематорий Леšće / Ново Бежанијско)',
      en: 'Belgrade (Lešće / Novo Bežanijsko Crematorium)',
      mne: 'Beograd (Krematorijum Lešće / Novo Bežanijsko)',
    },
    distanceKm: 440,
    drivingTime: '6.5–7.5 h',
    customsRegime: {
      ru: 'Круглосуточный санитарный и таможенный контроль 24/7. Зелёный коридор по Sprovodnica.',
      en: '24/7 dedicated border sanitary & customs clearance. Priority green lane under Sprovodnica.',
      mne: 'Kontinuirani 24/7 sanitarni i carinski režim. Prioritetni prolaz sa sprovodnicom.',
    },
    sanitaryNotice: {
      ru: 'Прямой транзит рефрижераторного катафалка. Опайка цинка сертифицирована санитарным инспектором Черногории. Задержки на границе исключены.',
      en: 'Direct refrigerated hearse dispatch. Certified zinc hermetic solder verified by Montenegrin Sanitary Inspector. Zero border hold-up.',
      mne: 'Direktan prevoz sertifikovanim vozilom. Lemljenje cinka ovjereno od sanitarne inspekcije Crne Gore. Bez zadržavanja na granici.',
    },
    svgPath: 'M 250 250 L 290 190 L 330 130 L 350 70',
    highlightPoints: [
      { x: 250, y: 250, label: 'Podgorica' },
      { x: 290, y: 190, label: 'Kolašin' },
      { x: 330, y: 130, label: 'Bijelo Polje' },
      { x: 350, y: 70, label: 'GP Dobrakovo' },
    ],
  },
  {
    id: 'route-b',
    name: {
      ru: 'Коридор B: Прибрежный транзит (Босния / Хорватия / ЕС)',
      en: 'Corridor B: Coastal Transit (Bosnia & Herzegovina / Croatia / EU)',
      mne: 'Koridor B: Primorski tranzit (BiH / Hrvatska / EU)',
    },
    subtitle: {
      ru: 'Котор/Тиват → Герцег-Нови → КПП Ситница/Зупци → Требинье / Сараево',
      en: 'Kotor/Tivat → Herceg Novi → Sitnica/Zupci border → Trebinje / Sarajevo',
      mne: 'Kotor/Tivat → Herceg Novi → GP Sitnica/Zupci → Trebinje / Sarajevo',
    },
    origin: 'Kotor / Tivat',
    via: 'Herceg Novi (Boka Kotorska)',
    borderPost: 'GP Sitnica (MNE) / Zupci (BiH)',
    destination: {
      ru: 'Босния и Герцеговина / Хорватия / транзит в ЕС',
      en: 'Bosnia & Herzegovina / Croatia / EU Transit',
      mne: 'Bosna i Hercegovina / Hrvatska / Tranzit ka EU',
    },
    distanceKm: 280,
    drivingTime: '4.5–5.5 h',
    customsRegime: {
      ru: 'Санитарный контроль на побережье. Приоритетный выезд катафалка через КПП Ситница.',
      en: 'Coastal sanitary inspection point. Expedited hearse clearance via Sitnica border.',
      mne: 'Sanitarni pregled na primorju. Ubrzan carinski postupak preko GP Sitnica.',
    },
    sanitaryNotice: {
      ru: 'Маршрут обслуживает все госпитали Боки Которской. Быстрый выезд в сторону Требинье с выходом на автобаны Хорватии и Центральной Европы.',
      en: 'Servicing Kotor and coastal clinics. Direct highway linkage toward Dubrovnik, Split, and Central European routes.',
      mne: 'Opslužuje bolnice u Boki Kotorskoj. Brza veza prema Dubrovniku, Splitu i magistralama ka centralnoj Evropi.',
    },
    svgPath: 'M 180 270 L 140 250 L 110 220 L 95 190',
    highlightPoints: [
      { x: 180, y: 270, label: 'Kotor/Tivat' },
      { x: 140, y: 250, label: 'Herceg Novi' },
      { x: 95, y: 190, label: 'GP Sitnica' },
    ],
  },
  {
    id: 'route-c',
    name: {
      ru: 'Коридор C: Западный транзит (Никшич → Илино-Брдо)',
      en: 'Corridor C: Western Transit (Nikšić → Ilino Brdo / Klobuk)',
      mne: 'Koridor C: Zapadni tranzit (Nikšić → Ilino Brdo / Klobuk)',
    },
    subtitle: {
      ru: 'Подгорица/Никшич → КПП Илино-Брдо/Клобук → Требинье / Мостар',
      en: 'Podgorica/Nikšić → Ilino Brdo/Klobuk border → Trebinje / Mostar',
      mne: 'Podgorica/Nikšić → GP Ilino Brdo/Klobuk → Trebinje / Mostar',
    },
    origin: 'Podgorica / Nikšić',
    via: 'Nikšić (Zapadni region)',
    borderPost: 'GP Ilino Brdo (MNE) / Klobuk (BiH)',
    destination: {
      ru: 'Требинье / Мостар / Сараево',
      en: 'Trebinje / Mostar / Sarajevo',
      mne: 'Trebinje / Mostar / Sarajevo',
    },
    distanceKm: 210,
    drivingTime: '3.5–4.5 h',
    customsRegime: {
      ru: 'Круглосуточный пограничный фитосанитарный и санитарный пост. Прямая линия без очередей.',
      en: '24/7 statutory phytosanitary & mortuary checkpoint. Immediate hearse priority.',
      mne: '24/7 sanitarna kontrola. Prioritetna traka za pogrebna sanitarna vozila.',
    },
    sanitaryNotice: {
      ru: 'Оптимальный маршрут для репатриации из центральных районов Черногории в западном направлении через Боснию.',
      en: 'Preferred overland transit route linking central Montenegrin mortuaries directly with Western Balkan arteries.',
      mne: 'Najefikasniji koridor za prenos posmrtnih ostataka iz centralnih krajeva prema BiH i zapadnim destinacijama.',
    },
    svgPath: 'M 250 250 L 200 190 L 140 160 L 105 145',
    highlightPoints: [
      { x: 250, y: 250, label: 'Podgorica' },
      { x: 200, y: 190, label: 'Nikšić' },
      { x: 105, y: 145, label: 'GP Ilino Brdo' },
    ],
  },
];

export const SanitaryCorridorMap: React.FC<SanitaryCorridorMapProps> = ({
  locale,
  className = '',
}) => {
  const [activeRouteId, setActiveRouteId] = useState<RouteId>('route-a');

  const activeRoute =
    CORRIDORS.find((r) => r.id === activeRouteId) || CORRIDORS[0];

  const t = {
    ru: {
      badge: 'Санитарно-таможенные коридоры Черногории',
      title: 'Интерактивная карта пограничных санитарных маршрутов',
      subtitle:
        'Схема утверждённых пограничных переходов для беспрепятственного транзита цинковых саркофагов и урн под контролем санитарной инспекции.',
      tabRouteA: 'Маршрут А (Север / Белград)',
      tabRouteB: 'Маршрут B (Побережье / БиГ / ЕС)',
      tabRouteC: 'Маршрут C (Запад / Никшич)',
      originLabel: 'Пункт отправления:',
      viaLabel: 'Транзитные пункты:',
      borderLabel: 'КПП санитарного контроля:',
      destLabel: 'Конечный пункт:',
      distanceLabel: 'Дистанция:',
      timeLabel: 'Время в пути:',
      regimeTitle: 'Таможенно-санитарный режим:',
      guaranteeTitle: 'Гарантия приоритетного коридора:',
      callHelp: 'Уточнить транзитный статус дежурному координатору',
    },
    en: {
      badge: 'Montenegrin Sanitary Transit Corridors',
      title: 'Interactive Cross-Border Sanitary Transit Map',
      subtitle:
        'Official schematic of approved international border checkpoints for expedited hearse transit under statutory sanitary inspection supervision.',
      tabRouteA: 'Route A (North / Belgrade)',
      tabRouteB: 'Route B (Coast / Bosnia / EU)',
      tabRouteC: 'Route C (West / Nikšić)',
      originLabel: 'Dispatch Origin:',
      viaLabel: 'Intermediate Hubs:',
      borderLabel: 'Sanitary Border Post:',
      destLabel: 'Destination:',
      distanceLabel: 'Distance:',
      timeLabel: 'Driving Time:',
      regimeTitle: 'Border Sanitary Protocol:',
      guaranteeTitle: 'Priority Clearance Guarantee:',
      callHelp: 'Verify transit clearance with duty dispatcher',
    },
    mne: {
      badge: 'Sanitarno-carinski koridori Crne Gore',
      title: 'Interaktivna mapa prekograničnih sanitarnih ruta',
      subtitle:
        'Zvanična šema odobrenih graničnih prelaza za međunarodni prenos posmrtnih ostataka uz ovlašćenje Sanitarne inspekcije.',
      tabRouteA: 'Ruta A (Sjever / Beograd)',
      tabRouteB: 'Ruta B (Primorje / BiH / EU)',
      tabRouteC: 'Ruta C (Zapad / Nikšić)',
      originLabel: 'Polazna tačka:',
      viaLabel: 'Tranzitni čvorovi:',
      borderLabel: 'GP sanitarnog pregleda:',
      destLabel: 'Odredište:',
      distanceLabel: 'Razdaljina:',
      timeLabel: 'Vrijeme vožnje:',
      regimeTitle: 'Sanitarno-carinski režim:',
      guaranteeTitle: 'Garancija prioritetnog prolaza:',
      callHelp: 'Provjerite tranzitni status sa dežurnim koordinatorom',
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
            <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{t.badge}</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slateDeep">
            {t.title}
          </h3>
          <p className="text-xs sm:text-sm text-slateMuted mt-1 max-w-3xl leading-relaxed">
            {t.subtitle}
          </p>
        </div>
      </div>

      {/* Corridor Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CORRIDORS.map((corridor) => {
          const isActive = activeRouteId === corridor.id;
          return (
            <button
              key={corridor.id}
              type="button"
              onClick={() => setActiveRouteId(corridor.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-sapphire text-white shadow-xs'
                  : 'bg-porcelain text-slate-700 hover:bg-stone-200 border border-stoneBorder'
              }`}
            >
              {corridor.id === 'route-a'
                ? t.tabRouteA
                : corridor.id === 'route-b'
                ? t.tabRouteB
                : t.tabRouteC}
            </button>
          );
        })}
      </div>

      {/* Grid: Interactive SVG Map on Left, Detailed Transit Specs on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Vector SVG Schematic (5 cols on lg) */}
        <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-inner relative overflow-hidden flex flex-col items-center justify-center min-h-[320px]">
          <div className="absolute top-3 left-4 text-[11px] font-mono font-semibold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>MNE Transit Grid</span>
          </div>

          <svg
            viewBox="0 0 400 320"
            className="w-full max-w-[360px] h-auto drop-shadow-md select-none"
            aria-label="Montenegro Sanitary Corridor Map"
          >
            {/* Outline schematic of Montenegro boundary */}
            <path
              d="M 80 180 L 110 130 L 160 110 L 220 90 L 290 80 L 360 60 L 370 120 L 340 180 L 330 240 L 280 270 L 220 290 L 150 280 L 90 230 Z"
              fill="#1e293b"
              stroke="#334155"
              strokeWidth="2"
              strokeDasharray="4 4"
            />

            {/* Inactive Corridor Ghost Lines */}
            {CORRIDORS.map((c) => {
              if (c.id === activeRouteId) return null;
              return (
                <path
                  key={c.id}
                  d={c.svgPath}
                  fill="none"
                  stroke="#475569"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="2 3"
                  opacity="0.4"
                />
              );
            })}

            {/* Active Corridor Highlight Line with glow */}
            <path
              d={activeRoute.svgPath}
              fill="none"
              stroke="#10b981"
              strokeWidth="4"
              strokeLinecap="round"
              className="transition-all duration-300 drop-shadow-[0_0_8px_rgba(16,185,129,0.7)]"
            />

            {/* Node Highlights */}
            {activeRoute.highlightPoints.map((pt, i) => (
              <g key={i} className="animate-in fade-in duration-200">
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="7"
                  fill="#065f46"
                  stroke="#34d399"
                  strokeWidth="2"
                />
                <circle cx={pt.x} cy={pt.y} r="3" fill="#ffffff" />
                <text
                  x={pt.x}
                  y={pt.y - 12}
                  textAnchor="middle"
                  fill="#f8fafc"
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="sans-serif"
                  className="drop-shadow-sm"
                >
                  {pt.label}
                </text>
              </g>
            ))}

            {/* Adriatic Sea Label */}
            <text
              x="100"
              y="295"
              fill="#64748b"
              fontSize="10"
              fontStyle="italic"
              fontFamily="sans-serif"
            >
              Adriatic Sea (Jadran)
            </text>
          </svg>

          <div className="w-full flex items-center justify-between text-[11px] text-slate-400 mt-2 border-t border-slate-800 pt-2 font-mono">
            <span>Border Check: {activeRoute.borderPost.split('(')[0]}</span>
            <span className="text-emerald-400 font-semibold">Priority 24/7</span>
          </div>
        </div>

        {/* Detailed Corridor Specs Card (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-4 rounded-xl bg-alabaster border border-stoneBorder space-y-3">
            <h4 className="font-serif text-base sm:text-lg font-bold text-slateDeep">
              {activeRoute.name[locale]}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {activeRoute.subtitle[locale]}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-stoneBorder/70 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px] font-semibold uppercase">
                  {t.distanceLabel}
                </span>
                <span className="font-mono font-bold text-slateDeep text-sm sm:text-base">
                  {activeRoute.distanceKm} km
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px] font-semibold uppercase">
                  {t.timeLabel}
                </span>
                <span className="font-mono font-bold text-emerald-700 text-sm sm:text-base flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {activeRoute.drivingTime}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block text-[11px] font-semibold uppercase">
                  {t.borderLabel}
                </span>
                <span className="font-semibold text-slateDeep text-xs truncate block">
                  {activeRoute.borderPost}
                </span>
              </div>
            </div>
          </div>

          {/* Regime & Guarantee Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-1">
              <span className="font-semibold text-emerald-950 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                {t.regimeTitle}
              </span>
              <p className="text-emerald-900 leading-relaxed text-[11px]">
                {activeRoute.customsRegime[locale]}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-sapphire/5 border border-sapphire/20 space-y-1">
              <span className="font-semibold text-sapphire flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-sapphire shrink-0" />
                {t.guaranteeTitle}
              </span>
              <p className="text-slate-700 leading-relaxed text-[11px]">
                {activeRoute.sanitaryNotice[locale]}
              </p>
            </div>
          </div>

          {/* Direct Assistance CTA Link */}
          <div className="pt-1 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              {t.callHelp}:
            </span>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sapphire hover:text-sapphire-light underline underline-offset-4"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{PHONE_DISPLAY} (24/7)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
