import React, { useState } from 'react';
import { CheckSquare, Square, FileText, CheckCircle2 } from 'lucide-react';
import { LocaleSlug } from '../data/seo-routes';

interface DocumentChecklistProps {
  locale: LocaleSlug;
}

interface ChecklistItem {
  id: string;
  label: Record<LocaleSlug, string>;
  subtext: Record<LocaleSlug, string>;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'passport_deceased',
    label: {
      ru: 'Заграничный паспорт покойного',
      en: "Deceased's original passport",
      mne: 'Originalni pasoš preminulog',
    },
    subtext: {
      ru: 'Оригинал документа для консульской аннуляции и оформления Sprovodnica',
      en: 'Original document required for consular cancellation and transit pass',
      mne: 'Originalni dokument za poništenje i izdavanje sprovodnice',
    },
  },
  {
    id: 'death_certificate',
    label: {
      ru: 'Врачебное свидетельство о смерти (Potvrda o smrti)',
      en: 'Medical Certificate of Death (Potvrda o smrti)',
      mne: 'Ljekarsko uvjerenje o smrti (Potvrda o smrti)',
    },
    subtext: {
      ru: 'Выдаётся врачом больницы (Kotor / KCCG) или скорой помощью',
      en: 'Issued by the attending hospital physician (Kotor / KCCG) or emergency service',
      mne: 'Izdato od strane bolničkog ljekara (Kotor / KCCG) ili mrtvozornika',
    },
  },
  {
    id: 'insurance_gop',
    label: {
      ru: 'Страховой полис или номер ассистанса (GOP)',
      en: 'Travel insurance policy or assistance case number (GOP)',
      mne: 'Polisa osiguranja ili broj asistentskog predmeta (GOP)',
    },
    subtext: {
      ru: 'Для прямой безналичной оплаты репатриации страховой компанией',
      en: 'For direct corporate billing and insurer payment guarantee',
      mne: 'Za direktno fakturisanje i pokriće troškova od strane osiguranja',
    },
  },
  {
    id: 'applicant_id',
    label: {
      ru: 'Паспорт заявителя / близкого родственника',
      en: "Family member / applicant's ID or passport",
      mne: 'Pasoš ili lična karta podnosioca zahtjeva / srodnika',
    },
    subtext: {
      ru: 'Необходим для оформления дистанционной доверенности (Punomoćje)',
      en: 'Required for executing statutory Power of Attorney (Punomoćje) remotely',
      mne: 'Neophodno za izdavanje ovlašćenja (Punomoćja) na daljinu',
    },
  },
];

export const DocumentChecklist: React.FC<DocumentChecklistProps> = ({ locale }) => {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const completedCount = Object.values(checkedIds).filter(Boolean).length;
  const totalCount = CHECKLIST_ITEMS.length;

  const headerTitle =
    locale === 'ru'
      ? 'Чек-лист документов для подготовки (отметьте то, что уже на руках):'
      : locale === 'mne'
      ? 'Kontrolna lista dokumenata (označite šta već imate):'
      : 'Required documents checklist (tap what you currently have):';

  const counterText =
    locale === 'ru'
      ? `Готово ${completedCount} из ${totalCount} документов. Координатор подскажет, как оформить недостающие.`
      : locale === 'mne'
      ? `Spremno ${completedCount} od ${totalCount} dokumenata. Koordinator će vas uputiti kako pribaviti preostale.`
      : `Ready: ${completedCount} of ${totalCount} documents. Our coordinator will guide you on retrieving any remaining papers.`;

  return (
    <div className="bg-white rounded-2xl border border-stoneBorder p-6 sm:p-7 shadow-card space-y-4">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sapphire">
        <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>{headerTitle}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {CHECKLIST_ITEMS.map((item) => {
          const isChecked = Boolean(checkedIds[item.id]);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggleItem(item.id)}
              className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer select-none ${
                isChecked
                  ? 'bg-emerald-50/60 border-emerald-300 ring-1 ring-emerald-300'
                  : 'bg-porcelain/60 hover:bg-porcelain border-stoneBorder'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-xs sm:text-sm font-semibold leading-snug transition-colors ${
                    isChecked
                      ? 'text-emerald-950 line-through opacity-85'
                      : 'text-slateDeep'
                  }`}
                >
                  {item.label[locale] || item.label.en}
                </p>
                <p className="text-[11px] text-slateMuted mt-1 leading-normal">
                  {item.subtext[locale] || item.subtext.en}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="pt-2 border-t border-stoneBorder flex items-center gap-2 text-xs text-slate-600">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
        <span className="font-medium">{counterText}</span>
      </div>
    </div>
  );
};
