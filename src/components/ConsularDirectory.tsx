import React, { useState } from 'react';
import {
  Building2,
  ChevronDown,
  ChevronUp,
  MapPin,
  Phone,
  ShieldCheck,
  Copy,
  Check,
  AlertCircle,
  X,
} from 'lucide-react';
import { LocaleSlug } from '../data/seo-routes';

interface EmbassyItem {
  id: string;
  countryKey: 'uk' | 'de' | 'rs' | 'ua' | 'ru';
  name: {
    ru: string;
    en: string;
    mne: string;
  };
  countryName: {
    ru: string;
    en: string;
    mne: string;
  };
  address: string;
  city: string;
  phone?: string;
  notes?: {
    ru: string;
    en: string;
    mne: string;
  };
}

const EMBASSIES: EmbassyItem[] = [
  {
    id: 'uk',
    countryKey: 'uk',
    name: {
      ru: 'Посольство Великобритании в Подгорице (British Embassy)',
      en: 'British Embassy Podgorica',
      mne: 'Britanska ambasada u Podgorici',
    },
    countryName: {
      ru: 'Великобритании',
      en: 'United Kingdom',
      mne: 'Velike Britanije',
    },
    address: 'Ul. Džordža Vašingtona 44',
    city: '81000 Podgorica',
    phone: '+382 20 618 010',
    notes: {
      ru: 'Консульский отдел осуществляет выдачу справок о невмешательстве (Letter of No Objection / Repatriation note).',
      en: 'Consular section processes Letters of No Objection for repatriation of remains.',
      mne: 'Konzularno odjeljenje izdaje potvrde (Letter of No Objection) za međunarodnu repatrijaciju.',
    },
  },
  {
    id: 'de',
    countryKey: 'de',
    name: {
      ru: 'Посольство Федеративной Республики Германия (Deutsche Botschaft)',
      en: 'Embassy of the Federal Republic of Germany',
      mne: 'Ambasada Savezne Republike Njemačke',
    },
    countryName: {
      ru: 'Германии',
      en: 'Germany',
      mne: 'Njemačke',
    },
    address: 'Hercegovačka 10',
    city: '81000 Podgorica',
    phone: '+382 20 441 000',
    notes: {
      ru: 'Оформление санитарного пропуска для урн и гробов (Leichenpass).',
      en: 'Issuance of consular transport clearance (Leichenpass).',
      mne: 'Izdavanje sprovodnice za prenos posmrtnih ostataka (Leichenpass).',
    },
  },
  {
    id: 'rs',
    countryKey: 'rs',
    name: {
      ru: 'Посольство Республики Сербия & Генеральное консульство',
      en: 'Embassy of the Republic of Serbia & Consulate General',
      mne: 'Ambasada Republike Srbije & Generalni konzulat',
    },
    countryName: {
      ru: 'Сербии',
      en: 'Serbia',
      mne: 'Srbije',
    },
    address: 'Bulevar Ivana Crnojevića 10, Podgorica | Trg Hercega Stjepana 15, Herceg Novi',
    city: 'Podgorica / Herceg Novi',
    phone: '+382 20 667 300',
    notes: {
      ru: 'Выдача sprovodnica za prenos posmrtnih ostataka u Srbiju (Подгорица и Герцег-Нови).',
      en: 'Issuance of cross-border consular transit permits (Sprovodnica) in Podgorica and Herceg Novi.',
      mne: 'Izdavanje sprovodnice za prenos posmrtnih ostataka u Republiku Srbiju.',
    },
  },
  {
    id: 'ua',
    countryKey: 'ua',
    name: {
      ru: 'Посольство Украины в Черногории (Посольство України)',
      en: 'Embassy of Ukraine in Montenegro',
      mne: 'Ambasada Ukrajine u Crnoj Gori',
    },
    countryName: {
      ru: 'Украины',
      en: 'Ukraine',
      mne: 'Ukrajine',
    },
    address: 'Serdara Jola Piletića 15',
    city: '81000 Podgorica',
    phone: '+382 20 320 400',
    notes: {
      ru: 'Оформление консульского разрешения на репатриацию и перевод свидетельств о смерти.',
      en: 'Consular certification for international repatriation, passport cancellation, and document verification.',
      mne: 'Konzularna saglasnost za prenos posmrtnih ostataka i overa dokumentacije.',
    },
  },
  {
    id: 'ru',
    countryKey: 'ru',
    name: {
      ru: 'Консульский отдел Посольства Российской Федерации',
      en: 'Consular Department of the Russian Federation',
      mne: 'Konzularno odjeljenje Ambasade Ruske Federacije',
    },
    countryName: {
      ru: 'РФ',
      en: 'Russian Federation',
      mne: 'Ruske Federacije',
    },
    address: 'Veliše Mugoše 1',
    city: '81000 Podgorica',
    phone: '+382 20 272 460',
    notes: {
      ru: 'Выдача справки о невмешательстве, консульское опечатывание цинкового вкладыша/урны, аннулирование загранпаспорта.',
      en: 'Issuance of consular transport certificate, official sealing of zinc container/urn, cancellation of foreign passport.',
      mne: 'Izdavanje sprovodnice, konzularno pečaćenje cinkovog sanduka/urne i poništavanje pasoša.',
    },
  },
];

interface ConsularDirectoryProps {
  locale: LocaleSlug;
}

export const ConsularDirectory: React.FC<ConsularDirectoryProps> = ({ locale }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [openId, setOpenId] = useState<string | null>(null);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);
  const [confirmCallModal, setConfirmCallModal] = useState<{
    phone: string;
    countryName: string;
  } | null>(null);

  const filterOptions = [
    {
      id: 'all',
      labels: { ru: 'Все', en: 'All', mne: 'Sve' },
    },
    {
      id: 'uk',
      labels: { ru: 'UK 🇬🇧', en: 'UK 🇬🇧', mne: 'UK 🇬🇧' },
    },
    {
      id: 'de',
      labels: { ru: 'Германия 🇩🇪', en: 'Germany 🇩🇪', mne: 'Njemačka 🇩🇪' },
    },
    {
      id: 'rs',
      labels: { ru: 'Сербия 🇷🇸', en: 'Serbia 🇷🇸', mne: 'Srbija 🇷🇸' },
    },
    {
      id: 'ua',
      labels: { ru: 'Украина 🇺🇦', en: 'Ukraine 🇺🇦', mne: 'Ukrajina 🇺🇦' },
    },
    {
      id: 'ru',
      labels: { ru: 'РФ 🇷🇺', en: 'Russia 🇷🇺', mne: 'Rusija 🇷🇺' },
    },
  ];

  const handleSelectFilter = (filterId: string) => {
    setSelectedFilter(filterId);
    if (filterId !== 'all') {
      setOpenId(filterId);
      const el = document.getElementById(`embassy-${filterId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleCopyPhone = (e: React.MouseEvent, phone: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => {
      setCopiedPhone((curr) => (curr === phone ? null : curr));
    }, 2000);
  };

  const handleTriggerCallModal = (e: React.MouseEvent, item: EmbassyItem) => {
    e.stopPropagation();
    if (!item.phone) return;
    setConfirmCallModal({
      phone: item.phone,
      countryName: item.countryName[locale],
    });
  };

  const copy = {
    ru: {
      title: 'Дипломатические представительства и консульские службы в Черногории',
      subtitle:
        'Официальные адреса и контакты посольств в Подгорице. Для оформления репатриации семье не требуется посещать консульство лично.',
      reassuranceTitle: 'Подача документов без присутствия семьи',
      reassuranceText:
        'Memorijal d.o.o. подает документы во все дипломатические представительства в Подгорице по доверенности без участия семьи. Мы берем на себя консульские пошлины, перевод судебными переводчиками и получение санитарной справки (Sprovodnica).',
      copySuccess: 'Номер скопирован',
      copyTitle: 'Скопировать номер телефона',
      confirmCallTitle: 'Подтверждение вызова',
      confirmCallText: (country: string) =>
        `Позвонить в дежурную службу консульства ${country}?`,
      callBtn: 'Вызов',
      cancelBtn: 'Отмена',
    },
    en: {
      title: 'Embassies & Consular Directory in Montenegro',
      subtitle:
        'Official contacts of diplomatic missions in Podgorica. Family members are not required to visit consular offices in person.',
      reassuranceTitle: 'Direct Consular Submission by Power of Attorney',
      reassuranceText:
        'Memorijal d.o.o. files all required statutory documentation directly with embassies in Podgorica under official power of attorney without requiring family attendance. We handle certified translations, statutory fees, and the international mortuary passport (Sprovodnica).',
      copySuccess: 'Number copied',
      copyTitle: 'Copy phone number',
      confirmCallTitle: 'Confirm Consular Call',
      confirmCallText: (country: string) =>
        `Place a call to the consular duty desk of ${country}?`,
      callBtn: 'Call',
      cancelBtn: 'Cancel',
    },
    mne: {
      title: 'Diplomatska predstavništva i konzularna odjeljenja u Crnoj Gori',
      subtitle:
        'Zvanične adrese i kontakti ambasada u Podgorici. Porodica nije u obavezi da lično posjećuje konzulat.',
      reassuranceTitle: 'Podnošenje dokumentacije bez prisustva porodice',
      reassuranceText:
        'Memorijal d.o.o. predaje kompletnu dokumentaciju svim diplomatskim predstavništvima u Podgorici po ovlašćenju, bez ličnog prisustva ožalošćene porodice. Preuzimamo sudske prevode, konzularne takse i izdavanje sprovodnice.',
      copySuccess: 'Broj kopiran',
      copyTitle: 'Kopirajte broj telefona',
      confirmCallTitle: 'Potvrda poziva',
      confirmCallText: (country: string) =>
        `Pozvati dežurnu službu konzulata ${country}?`,
      callBtn: 'Pozovi',
      cancelBtn: 'Otkaži',
    },
  }[locale];

  const displayedEmbassies =
    selectedFilter === 'all'
      ? EMBASSIES
      : EMBASSIES.filter((e) => e.countryKey === selectedFilter);

  return (
    <section className="mt-12 bg-white rounded-2xl border border-stoneBorder p-6 sm:p-8 shadow-card print:border-none print:shadow-none print:p-0">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-sapphire/10 text-sapphire flex items-center justify-center shrink-0">
          <Building2 className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-semibold text-slateDeep">
            {copy.title}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-slateMuted leading-relaxed">
            {copy.subtitle}
          </p>
        </div>
      </div>

      {/* Institutional reassurance banner */}
      <div className="mt-5 p-4 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-start gap-3 text-xs sm:text-sm text-emerald-950">
        <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-semibold text-emerald-900">
            {copy.reassuranceTitle}
          </strong>
          <p className="mt-0.5 text-emerald-800 leading-relaxed text-xs">
            {copy.reassuranceText}
          </p>
        </div>
      </div>

      {/* Interactive Country Filter Pills */}
      <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-print">
        {filterOptions.map((filter) => {
          const isActive = selectedFilter === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => handleSelectFilter(filter.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors ${
                isActive
                  ? 'bg-sapphire text-white shadow-xs'
                  : 'bg-porcelain text-slate-700 hover:bg-stone-200 border border-stoneBorder'
              }`}
            >
              {filter.labels[locale]}
            </button>
          );
        })}
      </div>

      {/* Accordion list */}
      <div className="mt-4 divide-y divide-stoneBorder border-y border-stoneBorder">
        {displayedEmbassies.map((item) => {
          const isOpen = openId === item.id || selectedFilter === item.countryKey;
          const isCopied = copiedPhone === item.phone;

          return (
            <div
              key={item.id}
              id={`embassy-${item.id}`}
              className={`py-3.5 transition-colors ${
                selectedFilter === item.countryKey ? 'bg-sapphire/5 -mx-4 px-4 rounded-xl' : ''
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 text-left group"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-sapphire shrink-0" />
                  <span className="font-semibold text-sm sm:text-base text-slateDeep group-hover:text-sapphire transition-colors">
                    {item.name[locale]}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-slateMuted hidden sm:inline">
                    {item.city}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="mt-3 pl-6 pr-2 text-xs sm:text-sm text-slate-600 space-y-2.5 animate-in fade-in duration-150">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-700">
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <span className="text-slate-400">Адрес / Adresa:</span> {item.address}, {item.city}
                    </span>

                    {item.phone && (
                      <div className="inline-flex items-center gap-2">
                        {/* Tap Shield Phone Button (Triggers Confirmation Dialog instead of immediate tel:) */}
                        <button
                          type="button"
                          onClick={(e) => handleTriggerCallModal(e, item)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/80 font-medium transition-colors cursor-pointer"
                          title="Позвонить в консульство"
                        >
                          <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{item.phone}</span>
                        </button>

                        {/* Direct Copy Button */}
                        <button
                          type="button"
                          onClick={(e) => handleCopyPhone(e, item.phone!)}
                          className="p-1 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                          title={copy.copyTitle}
                          aria-label={copy.copyTitle}
                        >
                          {isCopied ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                              <Check className="w-3.5 h-3.5" />
                              <span>{copy.copySuccess}</span>
                            </span>
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {item.notes && (
                    <p className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60 leading-relaxed">
                      {item.notes[locale]}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Feature 2: Confirmation Dialog / Tap Shield Modal */}
      {confirmCallModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs no-print"
        >
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-stoneBorder animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <button
                type="button"
                onClick={() => setConfirmCallModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4">
              <h4 className="font-serif text-lg font-bold text-slateDeep">
                {copy.confirmCallTitle}
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-slateMuted leading-relaxed">
                {copy.confirmCallText(confirmCallModal.countryName)}
              </p>
              <p className="mt-2 text-xs font-mono font-bold text-sapphire bg-slate-50 p-2 rounded-lg border border-slate-200">
                {confirmCallModal.phone}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmCallModal(null)}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                {copy.cancelBtn}
              </button>
              <a
                href={`tel:${confirmCallModal.phone.replace(/[^+\d]/g, '')}`}
                onClick={() => setConfirmCallModal(null)}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-forest hover:bg-forest-hover text-white shadow-xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{copy.callBtn}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
