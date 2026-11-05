import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckSquare,
  Square,
  Printer,
  FileText,
  Lock,
  Camera,
  PackageCheck,
} from 'lucide-react';
import { LocaleSlug } from '../data/seo-routes';
import { PHONE_DISPLAY } from '../i18n/translations';

export interface BelongingsCustodyProtocolProps {
  locale: LocaleSlug;
  className?: string;
}

interface BelongingItem {
  id: string;
  label: Record<LocaleSlug, string>;
  category: 'valuable' | 'document' | 'luggage';
}

const ITEMS: BelongingItem[] = [
  {
    id: 'passport',
    label: {
      ru: 'Загранпаспорт, права, страховой полис',
      en: 'International Passport, Driving License, Insurance Card',
      mne: 'Pasoš, vozačka dozvola, zdravstveno osiguranje',
    },
    category: 'document',
  },
  {
    id: 'phone',
    label: {
      ru: 'Смартфон, планшет, зарядные устройства',
      en: 'Smartphone, Tablet, Electronic Devices',
      mne: 'Telefon, tablet i elektronski uređaji',
    },
    category: 'valuable',
  },
  {
    id: 'jewelry',
    label: {
      ru: 'Обручальное кольцо, нательный крест, ювелирные изделия',
      en: 'Wedding Ring, Pectoral Cross, Jewelry & Watch',
      mne: 'Vjenčani prsten, krstić, nakit i ručni sat',
    },
    category: 'valuable',
  },
  {
    id: 'cash',
    label: {
      ru: 'Наличные средства, кошелек, банковские карты',
      en: 'Wallet, Cash Currency, Credit / Debit Cards',
      mne: 'Novčanik, gotovina, platne kartice',
    },
    category: 'valuable',
  },
  {
    id: 'clothes',
    label: {
      ru: 'Комплект одежды и обуви для усопшего (в морг)',
      en: 'Clothing & Footwear Set for Mortuary Dressing',
      mne: 'Garderoba i obuća za opremanje u kapeli',
    },
    category: 'luggage',
  },
  {
    id: 'keys',
    label: {
      ru: 'Ключи от апартаментов / арендованного авто',
      en: 'Apartment Keys, Hotel Safe Key, Rental Car Fob',
      mne: 'Ključevi od apartmana, sefa, rent-a-car vozila',
    },
    category: 'luggage',
  },
];

export const BelongingsCustodyProtocol: React.FC<BelongingsCustodyProtocolProps> = ({
  locale,
  className = '',
}) => {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({
    passport: true,
    phone: true,
    jewelry: true,
  });

  const toggle = (id: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const t = {
    ru: {
      badge: 'Протокол сохранности личных вещей и ценностей',
      title: 'Опись и ответственное хранение личных вещей в морге и отеле',
      subtitle:
        'Исключает риск утери телефона, ювелирных изделий, документов и наличных средств. Memorijal принимает ценности по официальному акту приёма-передачи с фотофиксацией.',
      step1Title: '1. Опечатывание при поступлении в морг',
      step1Desc:
        'При поступлении в патологоанатомическое отделение (Котор / KCCG Подгорица) дежурный врач и полиция составляют первичный протокол описи вещей (Zapisnik o prijemu stvari).',
      step2Title: '2. Передача координатору под роспись',
      step2Desc:
        'Координатор Memorijal принимает вещи у заведующего моргом по акту приёма-передачи с обязательной фото- и видеофиксацией каждого предмета.',
      step3Title: '3. Доставка семье или опечатывание в цинк',
      step3Desc:
        'Ценности передаются доверенному лицу семьи, отправляются курьерской дипломатической связью либо опечатываются внутри транспортировочного бокса.',
      checklistTitle: 'Чек-лист описи ценностей (отметьте вещи для контроля):',
      btnPrint: 'Включить опись ценностей в памятку передачи (PDF)',
      secureNote:
        'Все ценности хранятся в сейфе агентства до момента передачи. Видеофиксация описи направляется родственникам в день поступления тела.',
    },
    en: {
      badge: 'Belongings & Valuables Custody Safeguard',
      title: 'Mortuary Chain-of-Custody & Valuables Inventory Protocol',
      subtitle:
        'Eliminating risks of misplaced smartphones, wedding bands, passports, and cash. Memorijal coordinates formal chain-of-custody handover under dual-witnessed protocol.',
      step1Title: '1. Initial Hospital / Police Sealing',
      step1Desc:
        'Upon admission to the hospital morgue (Kotor / KCCG Podgorica), the attending pathologist and police officer log an initial statutory inventory (Zapisnik o prijemu stvari).',
      step2Title: '2. Signed Handover with Photo/Video Log',
      step2Desc:
        'Our licensed coordinator takes custody under signed counter-protocol with high-resolution timestamped photo and video documentation of all articles.',
      step3Title: '3. Direct Delivery or Consular Sealing',
      step3Desc:
        'Articles are delivered directly to designated family members, dispatched via diplomatic courier, or sealed securely alongside transport casket manifest.',
      checklistTitle: 'Valuables & Effects Custody Checklist:',
      btnPrint: 'Include Belongings Custody in Dossier (PDF)',
      secureNote:
        'All valuables are safeguarded in an insured vault. High-resolution photo verification is dispatched to the family within hours of morgue clearance.',
    },
    mne: {
      badge: 'Protokol o čuvanju ličnih stvari i dragocjenosti',
      title: 'Zvanični popis i preuzimanje ličnih stvari iz kapele i smještaja',
      subtitle:
        'Sprečava rizik od gubitka telefona, nakita, dokumenata i novca. Memorijal preuzima stvari po zvaničnom zapisniku o primopredaji uz foto-evidenciju.',
      step1Title: '1. Zapečaćenje prilikom prijema u kapelu',
      step1Desc:
        'Prilikom prijema u bolničku kapelu (Kotor / KCCG Podgorica) dežurni patolog i policija sačinjavaju zvanični Zapisnik o prijemu stvari.',
      step2Title: '2. Primopredaja koordinatoru uz potpis',
      step2Desc:
        'Koordinator Memorijal preuzima predmete od uprave kapele uz potpisani zapisnik i video/foto arhiviranje svakog predmeta.',
      step3Title: '3. Predaja porodici ili obezbjeđenje',
      step3Desc:
        'Stvari se predaju ovlašćenom članu porodice ili bezbjedno pakuju uz konzularnu saglasnost.',
      checklistTitle: 'Kontrolna lista popisa dragocjenosti:',
      btnPrint: 'Uključi popis stvari u podsjetnik (PDF)',
      secureNote:
        'Sve dragocjenosti se čuvaju u sefu agencije. Foto-zapisnik se dostavlja porodici istog dana.',
    },
  }[locale];

  return (
    <div
      className={`bg-white rounded-2xl border border-stoneBorder p-6 sm:p-8 shadow-card space-y-6 ${className}`}
    >
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sapphire mb-1.5">
          <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{t.badge}</span>
        </div>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-slateDeep">
          {t.title}
        </h3>
        <p className="text-xs sm:text-sm text-slateMuted mt-1 max-w-3xl leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* 3 Step Protocol Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-alabaster border border-stoneBorder space-y-2">
          <div className="w-8 h-8 rounded-lg bg-sapphire/10 text-sapphire flex items-center justify-center font-bold text-xs">
            <FileText className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-xs sm:text-sm text-slateDeep">
            {t.step1Title}
          </h4>
          <p className="text-xs text-slateMuted leading-relaxed">
            {t.step1Desc}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-alabaster border border-stoneBorder space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
            <Camera className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-xs sm:text-sm text-slateDeep">
            {t.step2Title}
          </h4>
          <p className="text-xs text-slateMuted leading-relaxed">
            {t.step2Desc}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-alabaster border border-stoneBorder space-y-2">
          <div className="w-8 h-8 rounded-lg bg-sapphire/10 text-sapphire flex items-center justify-center font-bold text-xs">
            <PackageCheck className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-xs sm:text-sm text-slateDeep">
            {t.step3Title}
          </h4>
          <p className="text-xs text-slateMuted leading-relaxed">
            {t.step3Desc}
          </p>
        </div>
      </div>

      {/* Interactive Checkpoints */}
      <div className="p-5 rounded-xl bg-porcelain border border-stoneBorder space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-sapphire block">
          {t.checklistTitle}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {ITEMS.map((item) => {
            const isChecked = Boolean(checkedIds[item.id]);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggle(item.id)}
                className={`p-3 rounded-lg border text-left transition-colors flex items-start gap-2.5 cursor-pointer text-xs font-medium ${
                  isChecked
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-semibold'
                    : 'bg-white border-stoneBorder text-slate-700 hover:bg-stone-50'
                }`}
              >
                {isChecked ? (
                  <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                )}
                <span>{item.label[locale]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Security Note Banner */}
      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-start gap-3 text-xs text-emerald-950">
        <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {t.secureNote} <strong>Hotline: {PHONE_DISPLAY}</strong>.
        </p>
      </div>

      {/* Print Action */}
      <div className="flex items-center justify-end pt-1">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest hover:bg-forest-hover text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>{t.btnPrint}</span>
        </button>
      </div>
    </div>
  );
};
