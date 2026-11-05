import React, { useState } from 'react';
import {
  CheckSquare,
  Square,
  FileText,
  CheckCircle2,
  Printer,
  MessageCircle,
  ShieldCheck,
  X,
  Shirt,
  UserCheck,
} from 'lucide-react';
import { LocaleSlug } from '../data/seo-routes';
import {
  PHONE_DISPLAY,
  WHATSAPP_NUMBER,
  OFFICIAL_EMAIL,
} from '../i18n/translations';
import { DocumentSpecimenViewer } from './DocumentSpecimenViewer';

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
  const [dossierModalOpen, setDossierModalOpen] = useState(false);

  const toggleItem = (id: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const completedCount = Object.values(checkedIds).filter(Boolean).length;
  const totalCount = CHECKLIST_ITEMS.length;

  const readyItems = CHECKLIST_ITEMS.filter((i) => checkedIds[i.id]).map(
    (i) => i.label[locale]
  );
  const missingItems = CHECKLIST_ITEMS.filter((i) => !checkedIds[i.id]).map(
    (i) => i.label[locale]
  );

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

  const btnPrintLabel =
    locale === 'ru'
      ? 'Скачать памятку передачи кейса (PDF)'
      : locale === 'mne'
      ? 'Preuzmi podsjetnik za predaju predmeta (PDF)'
      : 'Save Handover Dossier (PDF)';

  const btnWhatsAppLabel =
    locale === 'ru'
      ? 'Отправить статус в WhatsApp'
      : locale === 'mne'
      ? 'Pošalji status na WhatsApp'
      : 'Send Status to WhatsApp';

  const whatsappMessage =
    locale === 'ru'
      ? `Здравствуйте! Заполнен чек-лист документов (Готово: ${completedCount}/4). В наличии: ${
          readyItems.join(', ') || 'пока нет'
        }. Требуется оформить: ${
          missingItems.join(', ') || 'все документы в наличии'
        }. Прошу связаться со мной для координации.`
      : locale === 'mne'
      ? `Dobar dan! Popunjena lista dokumenata (Spremno: ${completedCount}/4). Na raspolaganju: ${
          readyItems.join(', ') || 'trenutno nema'
        }. Potrebno pribaviti: ${
          missingItems.join(', ') || 'sve je spremno'
        }. Molim za kontakt radi koordinacije.`
      : `Hello! Document checklist status (Ready: ${completedCount}/4). Available: ${
          readyItems.join(', ') || 'none yet'
        }. Remaining to procure: ${
          missingItems.join(', ') || 'all ready'
        }. Please contact me to coordinate.`;

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div
      id="modal-checklist"
      className="bg-white rounded-2xl border border-stoneBorder p-6 sm:p-7 shadow-card space-y-5"
    >
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

      {/* Counter & Action Row */}
      <div className="pt-3 border-t border-stoneBorder/80 space-y-3.5">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-medium">{counterText}</span>
        </div>

        {/* 2 Conversion Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="button"
            onClick={() => setDossierModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-sapphire text-sapphire hover:bg-sapphire hover:text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 shrink-0" />
            <span>{btnPrintLabel}</span>
          </button>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-forest hover:bg-forest-hover text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{btnWhatsAppLabel}</span>
          </a>
        </div>
      </div>

      {/* Part 4: Interactive Document Specimen Lightbox */}
      <div className="pt-5 border-t border-stoneBorder/80">
        <DocumentSpecimenViewer locale={locale} />
      </div>

      {/* Modal / Printable Single-Sheet Handover Dossier */}
      {dossierModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setDossierModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stoneBorder max-h-[92vh] overflow-y-auto space-y-6 animate-in zoom-in-95 print:p-0 print:border-none print:shadow-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Letterhead */}
            <div className="border-b border-stoneBorder pb-4 flex items-start justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase font-bold text-sapphire tracking-wider block">
                  Memorijal d.o.o. • Dispatch 24/7: {PHONE_DISPLAY}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slateDeep mt-1">
                  {locale === 'ru'
                    ? 'Памятка передачи документов и вещей координатору'
                    : locale === 'mne'
                    ? 'Podsjetnik za predaju dokumentacije i odjeće kapele'
                    : 'Case Handover & Mortuary Clothing Dossier'}
                </h3>
                <p className="text-xs text-slateMuted mt-1">
                  Tivat & Podgorica • Email: {OFFICIAL_EMAIL}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDossierModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 no-print cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Breakdown */}
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
                  <h4 className="font-bold text-emerald-950 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>
                      {locale === 'ru'
                        ? `В наличии (${readyItems.length}):`
                        : locale === 'mne'
                        ? `Na raspolaganju (${readyItems.length}):`
                        : `Ready & Available (${readyItems.length}):`}
                    </span>
                  </h4>
                  {readyItems.length > 0 ? (
                    <ul className="space-y-1.5 text-emerald-900">
                      {readyItems.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span>✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-emerald-800 italic">
                      {locale === 'ru'
                        ? 'Пока ничего не отмечено'
                        : locale === 'mne'
                        ? 'Nijedan dokument nije označen'
                        : 'No documents marked yet'}
                    </p>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
                  <h4 className="font-bold text-amber-950 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-amber-700" />
                    <span>
                      {locale === 'ru'
                        ? `Истребует координатор (${missingItems.length}):`
                        : locale === 'mne'
                        ? `Pribavlja koordinator (${missingItems.length}):`
                        : `Procured by Coordinator (${missingItems.length}):`}
                    </span>
                  </h4>
                  {missingItems.length > 0 ? (
                    <ul className="space-y-1.5 text-amber-900">
                      {missingItems.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span>•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-amber-800 font-semibold">
                      {locale === 'ru'
                        ? 'Все уставные документы на руках'
                        : locale === 'mne'
                        ? 'Svi dokumenti su spremni'
                        : 'All statutory documents ready'}
                    </p>
                  )}
                </div>
              </div>

              {/* Mortuary Clothing Checklist */}
              <div className="p-4 rounded-xl bg-porcelain border border-stoneBorder">
                <h4 className="font-bold text-slateDeep uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                  <Shirt className="w-3.5 h-3.5 text-sapphire" />
                  <span>
                    {locale === 'ru'
                      ? 'Комплект погребальной одежды для морга (передается водителю / санитарам):'
                      : locale === 'mne'
                      ? 'Pogrebna odjeća za kapelu (predaje se vozaču / osoblju kapele):'
                      : 'Mortuary Clothing Set (to be handed over for casket dressing):'}
                  </span>
                </h4>
                <div className="grid grid-cols-2 gap-2 text-slate-700 text-[11px]">
                  <span>□ Костюм / Платье (Suit / Dress)</span>
                  <span>□ Нижнее белье (Underwear)</span>
                  <span>□ Обувь / Туфли (Shoes)</span>
                  <span>□ Религиозные принадлежности (Optional religious items)</span>
                </div>
              </div>

              {/* Statutory Reassurance */}
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <p className="leading-relaxed font-medium">
                  {locale === 'ru'
                    ? 'Личный визит родственников в морг или суд не требуется. Все недостающие документы истребуются координатором по доверенности.'
                    : locale === 'mne'
                    ? 'Lični dolazak srodnika u kapelu ili sud nije obavezan. Sve preostale isprave pribavlja koordinator po ovlašćenju.'
                    : 'Personal travel by family members to hospital mortuaries or courts is not required. All outstanding documentation is retrieved directly by our coordinator under Power of Attorney.'}
                </p>
              </div>
            </div>

            {/* Print & Close Actions */}
            <div className="flex items-center justify-end gap-3 pt-2 no-print border-t border-stoneBorder">
              <button
                type="button"
                onClick={() => setDossierModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-porcelain transition-colors cursor-pointer"
              >
                {locale === 'ru' ? 'Закрыть' : locale === 'mne' ? 'Zatvori' : 'Close'}
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold bg-sapphire hover:bg-sapphire-light text-white shadow-xs transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{btnPrintLabel}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
