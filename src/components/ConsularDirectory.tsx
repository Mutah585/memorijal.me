import React, { useState } from 'react';
import { Building2, ChevronDown, ChevronUp, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { LocaleSlug } from '../data/seo-routes';

interface EmbassyItem {
  id: string;
  name: {
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
    name: {
      ru: 'Посольство Великобритании в Подгорице (British Embassy)',
      en: 'British Embassy Podgorica',
      mne: 'Britanska ambasada u Podgorici',
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
    name: {
      ru: 'Посольство Федеративной Республики Германия (Deutsche Botschaft)',
      en: 'Embassy of the Federal Republic of Germany',
      mne: 'Ambasada Savezne Republike Njemačke',
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
    name: {
      ru: 'Посольство Республики Сербия & Генеральное консульство',
      en: 'Embassy of the Republic of Serbia & Consulate General',
      mne: 'Ambasada Republike Srbije & Generalni konzulat',
    },
    address: 'Bulevar Ivana Crnojevića 10, Podgorica | Trg Hercega Stjepana 15, Herceg Novi',
    city: 'Podgorica / Herceg Novi',
    phone: '+382 20 667 300 / +382 31 350 320',
    notes: {
      ru: 'Выдача sprovodnica za prenos posmrtnih ostataka u Srbiju (Подгорица и Герцег-Нови).',
      en: 'Issuance of cross-border consular transit permits (Sprovodnica) in Podgorica and Herceg Novi.',
      mne: 'Izdavanje sprovodnice za prenos posmrtnih ostataka u Republiku Srbiju.',
    },
  },
  {
    id: 'ua',
    name: {
      ru: 'Посольство Украины в Черногории (Посольство України)',
      en: 'Embassy of Ukraine in Montenegro',
      mne: 'Ambasada Ukrajine u Crnoj Gori',
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
    name: {
      ru: 'Консульский отдел Посольства Российской Федерации',
      en: 'Consular Department of the Russian Federation',
      mne: 'Konzularno odjeljenje Ambasade Ruske Federacije',
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
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const copy = {
    ru: {
      title: 'Дипломатические представительства и консульские службы в Черногории',
      subtitle:
        'Официальные адреса и контакты посольств в Подгорице. Для оформления репатриации семье не требуется посещать консульство лично.',
      reassuranceTitle: 'Подача документов без присутствия семьи',
      reassuranceText:
        'Memorijal d.o.o. подает документы во все дипломатические представительства в Подгорице по доверенности без участия семьи. Мы берем на себя консульские пошлины, перевод судебными переводчиками и получение санитарной справки (Sprovodnica).',
      toggleOpen: 'Подробнее о консульском оформлении',
      toggleClose: 'Свернуть',
    },
    en: {
      title: 'Embassies & Consular Directory in Montenegro',
      subtitle:
        'Official contacts of diplomatic missions in Podgorica. Family members are not required to visit consular offices in person.',
      reassuranceTitle: 'Direct Consular Submission by Power of Attorney',
      reassuranceText:
        'Memorijal d.o.o. files all required statutory documentation directly with embassies in Podgorica under official power of attorney without requiring family attendance. We handle certified translations, statutory fees, and the international mortuary passport (Sprovodnica).',
      toggleOpen: 'Consular clearance details',
      toggleClose: 'Close',
    },
    mne: {
      title: 'Diplomatska predstavništva i konzularna odjeljenja u Crnoj Gori',
      subtitle:
        'Zvanične adrese i kontakti ambasada u Podgorici. Porodica nije u obavezi da lično posjećuje konzulat.',
      reassuranceTitle: 'Podnošenje dokumentacije bez prisustva porodice',
      reassuranceText:
        'Memorijal d.o.o. predaje kompletnu dokumentaciju svim diplomatskim predstavništvima u Podgorici po ovlašćenju, bez ličnog prisustva ožalošćene porodice. Preuzimamo sudske prevode, konzularne takse i izdavanje sprovodnice.',
      toggleOpen: 'Detalji konzularnog postupka',
      toggleClose: 'Zatvori',
    },
  }[locale];

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

      {/* Accordion list */}
      <div className="mt-6 divide-y divide-stoneBorder border-y border-stoneBorder">
        {EMBASSIES.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id} className="py-3.5">
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
                <div className="mt-3 pl-6 pr-2 text-xs sm:text-sm text-slate-600 space-y-2 animate-in fade-in duration-150">
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-700">
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <span className="text-slate-400">Адрес / Adresa:</span> {item.address}, {item.city}
                    </span>
                    {item.phone && (
                      <span className="inline-flex items-center gap-1.5 font-medium">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <a href={`tel:${item.phone.replace(/[^+\d]/g, '')}`} className="hover:text-sapphire hover:underline">
                          {item.phone}
                        </a>
                      </span>
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
    </section>
  );
};
