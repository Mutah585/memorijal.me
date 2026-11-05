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
  Clock,
  Calendar,
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
  sla: Record<LocaleSlug, string>;
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
    sla: {
      ru: 'Согласование с офисом Coroner — до 72 часов',
      en: 'UK Coroner & Consular mortuary clearance (up to 72h)',
      mne: 'Usklađivanje sa kancelarijom Koronera — do 72h',
    },
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
    sla: {
      ru: 'Рассмотрение и консульское опечатывание — 24–48 часов',
      en: '24–48h statutory review and consular Leichenpass sealing',
      mne: 'Izdavanje Leichenpass i pečaćenje — 24–48 sati',
    },
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
    sla: {
      ru: 'Выдача Sprovodnica — 4–6 часов (в день обращения)',
      en: 'Same-day transit permit clearance (4–6 hours)',
      mne: 'Izdavanje Sprovodnice — 4–6 sati (istog dana)',
    },
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
    sla: {
      ru: 'Консульское оформление — 24–36 часов',
      en: '24–36h consular statutory clearance',
      mne: 'Konzularna dozvola — 24–36 sati',
    },
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
    sla: {
      ru: 'Оформление разрешения и опечатывание цинка — 24 часа',
      en: '24h consular permit and zinc sealing',
      mne: 'Izdavanje dozvole i pečaćenje cinka — 24 sata',
    },
    notes: {
      ru: 'Выдача справки о невмешательстве, консульское опечатывание цинкового вкладыша/урны, аннулирование загранпаспорта.',
      en: 'Issuance of consular transport certificate, official sealing of zinc container/urn, cancellation of foreign passport.',
      mne: 'Izdavanje sprovodnice, konzularno pečaćenje cinkovog sanduka/urne i poništavanje pasoša.',
    },
  },
];

interface ConsularDirectoryProps {
  locale: LocaleSlug;
  initialFilter?: 'all' | 'uk' | 'de' | 'rs' | 'ua' | 'ru';
}

export const ConsularDirectory: React.FC<ConsularDirectoryProps> = ({ locale, initialFilter = 'all' }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>(initialFilter);
  const [openId, setOpenId] = useState<string | null>(initialFilter !== 'all' ? initialFilter : null);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);
  const [confirmCallModal, setConfirmCallModal] = useState<{
    phone: string;
    embassyName: string;
  } | null>(null);

  const isWeekend = typeof window !== 'undefined' ? [0, 6].includes(new Date().getDay()) : false;

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
      embassyName: item.name[locale],
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
      slaTitle: 'Сроки оформления:',
      weekendTitle: 'Режим выходного дня (Сб–Вс)',
      weekendText:
        'Выходной день дипломатических миссий. Подготовка медицинских справок и запайка цинка ведутся дежурным координатором без потери времени.',
      copySuccess: 'Номер скопирован',
      copyTitle: 'Скопировать номер телефона',
      confirmCallTitle: 'Подтверждение вызова',
      confirmCallText: (name: string) =>
        `Позвонить в дежурную службу консульства «${name}»?`,
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
      slaTitle: 'Consular Clearance SLA:',
      weekendTitle: 'Weekend Operations Mode (Sat–Sun)',
      weekendText:
        'Diplomatic missions are closed for the weekend. Medical clearance and certified zinc sealing are performed without delay by our on-duty coordinator.',
      copySuccess: 'Number copied',
      copyTitle: 'Copy phone number',
      confirmCallTitle: 'Confirm Consular Call',
      confirmCallText: (name: string) =>
        `Call ${name} Consular Emergency Line?`,
      callBtn: 'Dial',
      cancelBtn: 'Cancel',
    },
    mne: {
      title: 'Diplomatska predstavništva i konzularna odjeljenja u Crnoj Gori',
      subtitle:
        'Zvanične adrese i kontakti ambasada u Podgorici. Porodica nije u obavezi da lično posjećuje konzulat.',
      reassuranceTitle: 'Podnošenje dokumentacije bez prisustva porodice',
      reassuranceText:
        'Memorijal d.o.o. predaje kompletnu dokumentaciju svim diplomatskim predstavništvima u Podgorici po ovlašćenju, bez ličnog prisustva ožalošćene porodice. Preuzimamo sudske prevode, konzularne takse i izdavanje sprovodnice.',
      slaTitle: 'Rok konzularne obrade:',
      weekendTitle: 'Režim rada vikendom (Sub–Ned)',
      weekendText:
        'Neradni dan diplomatskih misija. Priprema medicinske dokumentacije i lemljenje cinka obavlja dežurni koordinator bez odlaganja.',
      copySuccess: 'Broj kopiran',
      copyTitle: 'Kopirajte broj telefona',
      confirmCallTitle: 'Potvrda poziva',
      confirmCallText: (name: string) =>
        `Pozvati dežurnu konzularnu liniju «${name}»?`,
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

      {/* Weekend alert banner */}
      {isWeekend && (
        <div className="mt-3 p-4 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start gap-3 text-xs sm:text-sm text-amber-950 animate-in fade-in duration-150">
          <Calendar className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold text-amber-900">
              {copy.weekendTitle}
            </strong>
            <p className="mt-0.5 text-amber-800 leading-relaxed text-xs">
              {copy.weekendText}
            </p>
          </div>
        </div>
      )}

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
                className="w-full flex items-center justify-between gap-3 text-left group py-1"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 min-w-0">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-sapphire shrink-0" />
                    <span className="font-semibold text-sm sm:text-base text-slateDeep group-hover:text-sapphire transition-colors truncate">
                      {item.name[locale]}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sapphire/10 text-sapphire border border-sapphire/20 w-fit shrink-0">
                    <Clock className="w-3 h-3 shrink-0" />
                    <span>{item.sla[locale]}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-slateMuted hidden md:inline">
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
                  {/* Dynamic SLA badge in expanded row */}
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-sapphire/5 border border-sapphire/15 text-xs text-slateDeep">
                    <Clock className="w-4 h-4 text-sapphire shrink-0" />
                    <div>
                      <span className="font-semibold text-sapphire mr-1.5">{copy.slaTitle}</span>
                      <span className="font-medium text-slate-800">{item.sla[locale]}</span>
                    </div>
                  </div>

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
                {copy.confirmCallText(confirmCallModal.embassyName)}
              </p>
              <div className="mt-3 flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-sm font-mono font-bold text-sapphire">
                  {confirmCallModal.phone}
                </span>
                <button
                  type="button"
                  onClick={(e) => handleCopyPhone(e, confirmCallModal.phone)}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold text-slate-600 hover:text-slateDeep hover:bg-slate-200 transition-colors"
                  title={copy.copyTitle}
                >
                  {copiedPhone === confirmCallModal.phone ? (
                    <span className="text-forest inline-flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>{copy.copySuccess}</span>
                    </span>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copy.copyTitle}</span>
                    </>
                  )}
                </button>
              </div>
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
