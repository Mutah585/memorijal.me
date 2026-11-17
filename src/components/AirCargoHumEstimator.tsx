import React, { useState } from 'react';
import { Plane, Scale, ShieldCheck, Box, CheckCircle2 } from 'lucide-react';
import { LocaleSlug } from '../data/seo-routes';

export interface AirCargoHumEstimatorProps {
  locale: LocaleSlug;
  className?: string;
}

type CasketOption = 'standard' | 'reinforced';

export const AirCargoHumEstimator: React.FC<AirCargoHumEstimatorProps> = ({
  locale,
  className = '',
}) => {
  const [selectedCasket, setSelectedCasket] = useState<CasketOption>('standard');

  const copy = {
    en: {
      badge: 'IATA TACT Cargo HUM • Volumetric & Gross Weight Estimator',
      title: 'IATA Cargo HUM Volumetric & Coffin Weight Estimator',
      subtitle:
        'Select casket specification to preview gross weight, outer protective crating dimensions, and IATA 1:6000 volumetric chargeable weight used by airlines at Podgorica (TGD) and Belgrade (BEG).',
      options: {
        standard: {
          label: 'Standard Transport Casket (Solid Wood + 0.6–0.8 mm Hermetic Zinc Liner)',
          shortBadge: 'Standard Export Spec',
          grossWeight: '~130–145\u00A0kg gross',
          outerDimensions: '210 × 72 × 62\u00A0cm (with outer air-cargo crate)',
          volumetricWeight: '~156\u00A0kg IATA chargeable volume',
          zincSpec: '0.6–0.8\u00A0mm galvanized zinc liner + barometric pressure valve',
          clearanceTime: '3–4 hours pre-flight cargo terminal X-ray & MAWB seal',
        },
        reinforced: {
          label: 'Reinforced / Solid Oak Casket (Heavy Duty + Hermetic Zinc Liner)',
          shortBadge: 'Reinforced Solid Oak',
          grossWeight: '~160–180\u00A0kg gross',
          outerDimensions: '215 × 78 × 68\u00A0cm (with outer air-cargo crate)',
          volumetricWeight: '~190\u00A0kg IATA chargeable volume',
          zincSpec: '0.8\u00A0mm heavy-gauge zinc liner + dual pressure-equalizing bio-filter',
          clearanceTime: '4 hours pre-flight cargo terminal X-ray & MAWB seal',
        },
      },
      metricsLabels: {
        gross: 'Estimated Gross Weight',
        dimensions: 'Outer Crated Dimensions',
        volumetric: 'IATA Volumetric Weight (L×W×H / 6000)',
        zinc: 'Hermetic Zinc & Valve Spec',
      },
      institutionalNote:
        'Airlines enforce statutory IATA HUM tariff slabs. Official weighing and Air Waybill (AWB) security dispatch are finalized by the Memorijal coordinator at Podgorica (TGD) or Belgrade (BEG) Cargo Terminal.',
    },
    ru: {
      badge: 'Расчет весогабаритных параметров • Стандарт IATA TACT Cargo HUM',
      title: 'Калькулятор объемного и брутто-веса авиационного гроба (Cargo HUM)',
      subtitle:
        'Выберите тип транспортировочного контейнера для просмотра брутто-веса, габаритов в защитном коробе и расчетного объемного веса IATA (1:6000) при отправке из аэропортов Подгорицы (TGD) и Белграда (BEG).',
      options: {
        standard: {
          label: 'Стандартный транспортировочный гроб (массив дерева + цинковый вкладыш 0.6–0.8 мм с клапаном)',
          shortBadge: 'Стандарт IATA HUM',
          grossWeight: '~130–145\u00A0кг брутто',
          outerDimensions: '210 × 72 × 62\u00A0см (в защитном авиакоробе)',
          volumetricWeight: '~156\u00A0кг объемный вес IATA',
          zincSpec: 'Оцинкованный вкладыш 0.6–0.8\u00A0мм + барометрический клапан давления',
          clearanceTime: 'Сдача на карго-терминал и рентген-контроль за 3–4 часа до вылета',
        },
        reinforced: {
          label: 'Усиленный / дубовый гроб (массив дуба + герметичный цинковый вкладыш)',
          shortBadge: 'Усиленный массив дуба',
          grossWeight: '~160–180\u00A0кг брутто',
          outerDimensions: '215 × 78 × 68\u00A0см (в защитном авиакоробе)',
          volumetricWeight: '~190\u00A0кг объемный вес IATA',
          zincSpec: 'Усиленный цинковый вкладыш 0.8\u00A0мм + двойной биофильтр давления',
          clearanceTime: 'Сдача на карго-терминал и рентген-контроль за 4 часа до вылета',
        },
      },
      metricsLabels: {
        gross: 'Расчетный вес брутто',
        dimensions: 'Габариты в авиакоробе',
        volumetric: 'Объемный вес IATA (Д×Ш×В / 6000)',
        zinc: 'Спецификация цинка и клапана',
      },
      institutionalNote:
        'Авиакомпания применяет фиксированный тариф HUM. Взвешивание и опломбирование авианакладной (AWB) производятся координатором Memorijal в грузовом терминале аэропорта Подгорицы (TGD) или Белграда (BEG) без участия семьи.',
    },
    mne: {
      badge: 'IATA TACT Cargo HUM • Proračun težine i zapremine sanduka',
      title: 'Kalkulator bruto i zapreminske težine avio-sanduka (Cargo HUM)',
      subtitle:
        'Odaberite vrstu transportnog sanduka za pregled bruto težine, dimenzija zaštitnog pakovanja i obračunske IATA zapreminske težine (1:6000) na aerodromima Podgorica (TGD) i Beograd (BEG).',
      options: {
        standard: {
          label: 'Standardni transportni sanduk (puno drvo + hermetički cink uložak 0.6–0.8 mm sa ventilom)',
          shortBadge: 'Standardna IATA specifikacija',
          grossWeight: '~130–145\u00A0kg bruto',
          outerDimensions: '210 × 72 × 62\u00A0cm (sa zaštitnom oblogom)',
          volumetricWeight: '~156\u00A0kg obračunska IATA težina',
          zincSpec: 'Pocinkovani uložak 0.6–0.8\u00A0mm + barometarski ventil pritiska',
          clearanceTime: 'Predaja na kargo terminal i KD kontrola 3–4 sata prije leta',
        },
        reinforced: {
          label: 'Ojačani / hrastov sanduk (masivni hrast + hermetički cink uložak)',
          shortBadge: 'Ojačani masivni hrast',
          grossWeight: '~160–180\u00A0kg bruto',
          outerDimensions: '215 × 78 × 68\u00A0cm (sa zaštitnom oblogom)',
          volumetricWeight: '~190\u00A0kg obračunska IATA težina',
          zincSpec: 'Ojačani cink uložak 0.8\u00A0mm + dvostruki bio-filter pritiska',
          clearanceTime: 'Predaja na kargo terminal i KD kontrola 4 sata prije leta',
        },
      },
      metricsLabels: {
        gross: 'Procijenjena bruto težina',
        dimensions: 'Spoljne dimenzije pakovanja',
        volumetric: 'IATA zapreminska težina (D×Š×V / 6000)',
        zinc: 'Specifikacija cinka i ventila',
      },
      institutionalNote:
        'Avio-kompanije primjenjuju fiksne IATA HUM tarifne stavke. Vaganje i pečaćenje tovarnog lista (AWB) vrši koordinator Memorijal u kargo terminalu Aerodroma Podgorica (TGD) ili Beograd (BEG).',
    },
  }[locale];

  const activeSpec = copy.options[selectedCasket];

  return (
    <div
      className={`bg-white rounded-2xl border border-stoneBorder p-6 sm:p-8 shadow-card space-y-6 ${className}`}
    >
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sapphire mb-1.5">
          <Plane className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{copy.badge}</span>
        </div>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-slateDeep">
          {copy.title}
        </h3>
        <p className="text-xs sm:text-sm text-slateMuted mt-1 max-w-3xl leading-relaxed">
          {copy.subtitle}
        </p>
      </div>

      {/* Interactive Casket Selector Toggle */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {(['standard', 'reinforced'] as CasketOption[]).map((optKey) => {
          const isSelected = selectedCasket === optKey;
          const opt = copy.options[optKey];
          return (
            <button
              key={optKey}
              type="button"
              onClick={() => setSelectedCasket(optKey)}
              className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                isSelected
                  ? 'bg-sapphire text-white border-sapphire shadow-sm'
                  : 'bg-porcelain hover:bg-alabaster text-slateDeep border-stoneBorder'
              }`}
            >
              <div className="space-y-1">
                <span
                  className={`inline-block text-[11px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                    isSelected
                      ? 'bg-white/15 text-emerald-300'
                      : 'bg-sapphire/10 text-sapphire'
                  }`}
                >
                  {opt.shortBadge}
                </span>
                <p
                  className={`text-xs sm:text-sm font-semibold leading-snug ${
                    isSelected ? 'text-white' : 'text-slateDeep'
                  }`}
                >
                  {opt.label}
                </p>
              </div>
              <span
                className={`font-mono text-xs sm:text-sm font-bold shrink-0 px-2.5 py-1 rounded-lg ${
                  isSelected
                    ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/30'
                    : 'bg-white text-sapphire border border-stoneBorder'
                }`}
              >
                {opt.grossWeight}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Clearance & Weight Breakdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-alabaster border border-stoneBorder">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-warmStone flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-sapphire" />
            {copy.metricsLabels.gross}
          </span>
          <p className="mt-1.5 font-serif text-lg sm:text-xl font-bold text-slateDeep">
            {activeSpec.grossWeight}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-alabaster border border-stoneBorder">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-warmStone flex items-center gap-1.5">
            <Box className="w-3.5 h-3.5 text-sapphire" />
            {copy.metricsLabels.dimensions}
          </span>
          <p className="mt-1.5 text-xs sm:text-sm font-semibold text-slateDeep">
            {activeSpec.outerDimensions}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-alabaster border border-stoneBorder">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-warmStone flex items-center gap-1.5">
            <Plane className="w-3.5 h-3.5 text-sapphire" />
            {copy.metricsLabels.volumetric}
          </span>
          <p className="mt-1.5 font-mono text-xs sm:text-sm font-bold text-sapphire">
            {activeSpec.volumetricWeight}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-alabaster border border-stoneBorder">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-warmStone flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
            {copy.metricsLabels.zinc}
          </span>
          <p className="mt-1.5 text-xs text-slateDeep font-medium leading-snug">
            {activeSpec.zincSpec}
          </p>
        </div>
      </div>

      {/* Institutional Note */}
      <div className="p-4 rounded-xl bg-sapphire-subtle border border-sapphire/20 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-sapphire shrink-0 mt-0.5" />
        <p className="text-xs sm:text-sm text-slateDeep leading-relaxed font-medium">
          {copy.institutionalNote}
        </p>
      </div>
    </div>
  );
};
