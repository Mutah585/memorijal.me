import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertOctagon,
  Plane,
  Scale,
  Maximize2,
  Lock,
  Sparkles,
} from 'lucide-react';
import { LocaleSlug } from '../data/seo-routes';

export interface CabinUrnSelectorProps {
  locale: LocaleSlug;
  className?: string;
}

type MaterialId = 'wood' | 'stone' | 'ceramic' | 'bio';

interface UrnMaterial {
  id: MaterialId;
  name: Record<LocaleSlug, string>;
  density: string;
  weightRange: string;
  dimensions: string;
  xrayStatus: 'approved' | 'restricted';
  features: Record<LocaleSlug, string[]>;
  securityNote: Record<LocaleSlug, string>;
}

const MATERIALS: UrnMaterial[] = [
  {
    id: 'wood',
    name: {
      ru: 'Массив благородного дерева (дуб, бук, ясень)',
      en: 'Solid Hardwood (Oak, Beech, Ash)',
      mne: 'Puno plemenito drvo (hrast, bukva, jasen)',
    },
    density: '0.65–0.75 g/cm³',
    weightRange: '2.4–2.8 kg',
    dimensions: '24 × 18 × 15 cm',
    xrayStatus: 'approved',
    features: {
      ru: [
        '100% рентген-прозрачность для сканеров аэропортов (TGD/TIV/BEG)',
        'Герметичный внутренний контейнер с пломбой крематория',
        'Эстетичный матовый лак, разрешённый к проносу в ручной клади',
      ],
      en: [
        '100% X-ray transparent for cabin baggage scanners (TGD/TIV/BEG)',
        'Hermetic inner ash capsule with certified crematorium seal',
        'Compliant with standard carry-on dimensional envelopes',
      ],
      mne: [
        '100% rendgenska prozirnost za aerodromske skenere (TGD/TIV/BEG)',
        'Hermetička unutrašnja kapsula sa pečatom krematorijuma',
        'Dimenzije prilagođene kabinskom ručnom prtljagu',
      ],
    },
    securityNote: {
      ru: 'Идеальный выбор для авиаперевозок. Не вызывает срабатывания металлодетекторов и досмотровых аппаратов.',
      en: 'Recommended for air cabin transport. Passes carry-on security scanners seamlessly without opening.',
      mne: 'Preporučeno za avio prenos u kabini. Prolazi skenere bez zadržavanja i bez otvaranja.',
    },
  },
  {
    id: 'stone',
    name: {
      ru: 'Натуральный камень / Мрамор / Гранит',
      en: 'Natural Stone / Marble / Granite',
      mne: 'Prirodni kamen / Mermer / Granit',
    },
    density: '2.5–2.7 g/cm³',
    weightRange: '3.6–4.5 kg',
    dimensions: '23 × 18 × 16 cm',
    xrayStatus: 'approved',
    features: {
      ru: [
        'Высокая прочность и монументальность',
        'Просвечивается рентгеном при стандартной мощности сканера',
        'Требуется проверка веса ручной клади (до 8 кг суммарно)',
      ],
      en: [
        'High physical durability and stone finish',
        'Transparent under standard aviation dual-energy X-ray beam',
        'Carry-on weight limit check recommended (under 8 kg allowance)',
      ],
      mne: [
        'Visoka postojanost i kamenita obrada',
        'Jasno vidljiva unutrašnjost na rendgenu aerodromske kontrole',
        'Provjeriti ukupnu težinu ručnog prtljaga (ispod 8 kg)',
      ],
    },
    securityNote: {
      ru: 'Разрешено авиакомпаниями, но из-за собственного веса урны рекомендуется взвесить общую ручную кладь.',
      en: 'Permitted by all IATA carriers; verify that combined carry-on weight remains within airline allowance.',
      mne: 'Dozvoljeno od strane IATA kompanija; obratiti pažnju na ukupnu težinu ručnog prtljaga.',
    },
  },
  {
    id: 'ceramic',
    name: {
      ru: 'Керамика / Художественный фарфор',
      en: 'Glazed Ceramic & Fine Porcelain',
      mne: 'Keramika / Umjetnički porcelan',
    },
    density: '1.8–2.2 g/cm³',
    weightRange: '2.2–2.6 kg',
    dimensions: '22 × 19 × 15 cm',
    xrayStatus: 'approved',
    features: {
      ru: [
        'Полная радиопрозрачность для инспекционных сканеров',
        'Герметичная крышка на силиконовом уплотнителе',
        'Компактная форма, помещающаяся под сиденье самолёта',
      ],
      en: [
        'Full transparency under security screening equipment',
        'Silicone hermetic gasket seal with wax certification',
        'Compact profile fitting under standard passenger seat',
      ],
      mne: [
        'Potpuna rendgenska vidljivost na bezbjednosnom pregledu',
        'Hermetički silikonski zaptivač sa voskom',
        'Kompaktna forma pogodna za smještaj ispod sjedišta',
      ],
    },
    securityNote: {
      ru: 'Превосходная просвечиваемость. Рекомендуется перевозить в мягком защитном чехле.',
      en: 'Optimal screening clarity. Soft padded transport case recommended during boarding.',
      mne: 'Odlična preglednost na kontroli. Preporučuje se zaštitna futrola tokom leta.',
    },
  },
  {
    id: 'bio',
    name: {
      ru: 'Биоразлагаемая эко-урна (растительные волокна)',
      en: 'Biodegradable Eco-Composite',
      mne: 'Biorazgradiva eko-urna (biljna vlakna)',
    },
    density: '0.45–0.55 g/cm³',
    weightRange: '1.2–1.6 kg',
    dimensions: '25 × 18 × 14 cm',
    xrayStatus: 'approved',
    features: {
      ru: [
        'Сверхлёгкий вес (всего ~1.4 кг)',
        'Мгновенная идентификация содержимого на досмотре',
        'Идеально подходит для последующего захоронения в природе или море',
      ],
      en: [
        'Ultra-lightweight (~1.4 kg total)',
        'Immediate security clearance at all international gates',
        'Ecologically certified for natural or sea water release',
      ],
      mne: [
        'Izuzetno lagana (~1.4 kg)',
        'Brz prolaz kroz kontrolni punkt bez dodatnih provjera',
        'Sertifikovano za ekološko polaganje u prirodi ili moru',
      ],
    },
    securityNote: {
      ru: 'Самый беспроблемный вариант для международных перелётов с пересадками.',
      en: 'Fastest security processing across multi-leg international transit airports.',
      mne: 'Najjednostavniji izbor za međunarodne letove sa presjedanjem.',
    },
  },
];

export const CabinUrnSelector: React.FC<CabinUrnSelectorProps> = ({
  locale,
  className = '',
}) => {
  const [selectedId, setSelectedId] = useState<MaterialId>('wood');

  const selectedMaterial =
    MATERIALS.find((m) => m.id === selectedId) || MATERIALS[0];

  const t = {
    ru: {
      badge: 'Авиационные стандарты IATA для ручной клади',
      title: 'Калькулятор материалов урны для провоза в салоне самолёта',
      subtitle:
        'Правила авиабезопасности строго запрещают провоз свинцовых и металлических вкладышей в ручной клади (сканер не может их просветить). Выберите материал урны для проверки соответствия стандартам аэропортов.',
      warningHeader: 'Строгий запрет на металлический и свинцовый вкладыш:',
      warningBody:
        'Службы безопасности аэропортов Подгорицы (TGD), Тивата (TIV) и Белграда (BEG) не вскрывают урны вручную. Если материал не просвечивается рентгеном (металл/свинец), в посадке на борт с ручной кладью будет отказано.',
      dimensionsHeader: 'Предельные габариты для салона:',
      weightHeader: 'Ориентировочный вес:',
      densityHeader: 'Плотность материала:',
      featuresHeader: 'Особенности и сертификация:',
      airlinesTitle: 'Политика авиакомпаний из Черногории:',
      airMne: 'Air Montenegro: Разрешено бесплатно в салон при наличии Potvrda o kremaciji.',
      airSrb: 'Air Serbia: Разрешено в ручную кладь как личная вещь (Personal Item).',
      turk: 'Turkish Airlines: Разрешено в салоне самолёта на всех регулярных рейсах из TGD.',
    },
    en: {
      badge: 'IATA Aviation Standards for Cabin Carry-On',
      title: 'Cabin-Approved Urn Material & Security Inspector',
      subtitle:
        'Aviation security regulations strictly prohibit metal or lead-lined urns in passenger cabins (X-ray beams cannot penetrate opaque metals). Select an approved material to verify security compliance.',
      warningHeader: 'Strict Prohibition of Metal & Lead Liners in Cabin:',
      warningBody:
        'Security screening checkpoints at Podgorica (TGD), Tivat (TIV), and Belgrade (BEG) will never open a certified urn. If the material is opaque to dual-energy X-ray, boarding with cabin carry-on will be denied.',
      dimensionsHeader: 'Max Recommended Dimensions:',
      weightHeader: 'Estimated Gross Weight:',
      densityHeader: 'Material Density:',
      featuresHeader: 'Features & Certification:',
      airlinesTitle: 'Airline Carry-On Policies from Montenegro:',
      airMne: 'Air Montenegro: Free cabin carriage with Cremation Certificate + Death Certificate.',
      airSrb: 'Air Serbia: Permitted in passenger cabin as carry-on or personal item.',
      turk: 'Turkish Airlines: Permitted in cabin across all scheduled international flights from TGD.',
    },
    mne: {
      badge: 'IATA vazduhoplovni standardi za kabinski prtljag',
      title: 'Kalkulator materijala urne za prenos u kabini aviona',
      subtitle:
        'Propisi avio-bezbjednosti strogo zabranjuju metalne i olovne uloške u kabinskom prtljagu (rendgen ih ne može prosvijetliti). Odaberite materijal za provjeru usklađenosti.',
      warningHeader: 'Stroga zabrana metalnih i olovnih uložaka:',
      warningBody:
        'Aerodromsko obezbjeđenje u Podgorici (TGD), Tivtu (TIV) i Beogradu (BEG) ne otvara hermetički zatvorene urne. Ukoliko materijal blokira rendgen zrake, unošenje u kabinu neće biti dozvoljeno.',
      dimensionsHeader: 'Maksimalne kabinske dimenzije:',
      weightHeader: 'Okvirna težina:',
      densityHeader: 'Gustina materijala:',
      featuresHeader: 'Karakteristike i sertifikacija:',
      airlinesTitle: 'Politika avio-kompanija iz Crne Gore:',
      airMne: 'Air Montenegro: Dozvoljen besplatan unos u kabinu uz Potvrdu o kremaciji.',
      airSrb: 'Air Serbia: Dozvoljeno u ručnom prtljagu kao lična stvar (Personal Item).',
      turk: 'Turkish Airlines: Dozvoljeno u putničkoj kabini na svim letovima iz TGD.',
    },
  }[locale];

  return (
    <div
      className={`bg-white rounded-2xl border border-stoneBorder p-6 sm:p-8 shadow-card space-y-6 ${className}`}
    >
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sapphire mb-1.5">
          <Plane className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{t.badge}</span>
        </div>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-slateDeep">
          {t.title}
        </h3>
        <p className="text-xs sm:text-sm text-slateMuted mt-1 max-w-3xl leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Critical Security Warning Callout */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-400/40 text-amber-950 flex items-start gap-3.5">
        <AlertOctagon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="block text-xs sm:text-sm font-bold text-amber-900">
            {t.warningHeader}
          </strong>
          <p className="text-xs text-amber-900/90 leading-relaxed font-medium">
            {t.warningBody}
          </p>
        </div>
      </div>

      {/* 4 Material Cards Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {MATERIALS.map((mat) => {
          const isSelected = selectedId === mat.id;
          return (
            <button
              key={mat.id}
              type="button"
              onClick={() => setSelectedId(mat.id)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-sapphire text-white border-emerald-400 shadow-md ring-2 ring-emerald-400/40'
                  : 'bg-porcelain/60 hover:bg-porcelain border-stoneBorder text-slateDeep'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-emerald-400/20 text-emerald-300'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    <span>100% X-Ray OK</span>
                  </span>
                  <span
                    className={`text-[11px] font-mono ${
                      isSelected ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {mat.weightRange}
                  </span>
                </div>
                <h4 className="font-semibold text-sm leading-snug">
                  {mat.name[locale]}
                </h4>
              </div>

              <div
                className={`text-[11px] mt-3 pt-2 border-t font-mono ${
                  isSelected
                    ? 'border-white/20 text-slate-300'
                    : 'border-stoneBorder/80 text-slate-500'
                }`}
              >
                {mat.dimensions}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Material Detail Card */}
      <div className="p-5 rounded-xl bg-alabaster border border-stoneBorder space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stoneBorder pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <h4 className="font-serif text-lg font-bold text-slateDeep">
              {selectedMaterial.name[locale]}
            </h4>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>IATA Cabin Security Approved</span>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 rounded-lg bg-white border border-stoneBorder">
            <span className="text-slate-400 font-semibold block text-[11px] uppercase flex items-center gap-1">
              <Maximize2 className="w-3.5 h-3.5 text-sapphire" />
              {t.dimensionsHeader}
            </span>
            <span className="font-mono font-bold text-slateDeep text-sm mt-0.5 block">
              {selectedMaterial.dimensions}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-white border border-stoneBorder">
            <span className="text-slate-400 font-semibold block text-[11px] uppercase flex items-center gap-1">
              <Scale className="w-3.5 h-3.5 text-sapphire" />
              {t.weightHeader}
            </span>
            <span className="font-mono font-bold text-emerald-700 text-sm mt-0.5 block">
              {selectedMaterial.weightRange}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-white border border-stoneBorder">
            <span className="text-slate-400 font-semibold block text-[11px] uppercase flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-sapphire" />
              {t.densityHeader}
            </span>
            <span className="font-mono font-bold text-slateDeep text-sm mt-0.5 block">
              {selectedMaterial.density}
            </span>
          </div>
        </div>

        {/* Feature Checkpoints */}
        <div className="space-y-2 pt-1">
          <span className="text-xs font-bold uppercase tracking-wider text-sapphire block">
            {t.featuresHeader}
          </span>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700">
            {selectedMaterial.features[locale].map((feat, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-slate-600 bg-white p-3 rounded-lg border border-stoneBorder leading-relaxed font-medium">
          {selectedMaterial.securityNote[locale]}
        </p>
      </div>

      {/* Airline Policies Box */}
      <div className="p-4 rounded-xl bg-porcelain border border-stoneBorder space-y-2 text-xs">
        <h5 className="font-bold text-slateDeep flex items-center gap-2">
          <Plane className="w-4 h-4 text-sapphire" />
          <span>{t.airlinesTitle}</span>
        </h5>
        <ul className="space-y-1.5 text-slate-600 text-xs pl-6 list-disc">
          <li>{t.airMne}</li>
          <li>{t.airSrb}</li>
          <li>{t.turk}</li>
        </ul>
      </div>
    </div>
  );
};

