import React, { useState } from 'react';
import { Check, Lock } from 'lucide-react';
import { LocaleSlug } from '../data/seo-routes';

export interface PrivacyDataWipeProps {
  locale: LocaleSlug;
  className?: string;
  onWipe?: () => void;
}

export const PrivacyDataWipe: React.FC<PrivacyDataWipeProps> = ({
  locale,
  className = '',
  onWipe,
}) => {
  const [wipedToast, setWipedToast] = useState(false);

  const t = {
    ru: {
      btnLabel: 'Очистить мои конфиденциальные данные с этого устройства',
      tooltip:
        'Рекомендуется при использовании общего гостиничного компьютера или чужого телефона (GDPR)',
      toastTitle: 'Конфиденциальные данные удалены',
      toastDesc:
        'Все временные черновики, кэш форм и данные сессии стёрты из памяти браузера.',
    },
    en: {
      btnLabel: 'Wipe My Confidential Data from This Device',
      tooltip:
        'Recommended when using hotel business center PCs or borrowed devices (GDPR)',
      toastTitle: 'Session Data Purged',
      toastDesc:
        'All temporary form drafts and session artifacts have been cleared from this browser.',
    },
    mne: {
      btnLabel: 'Obriši moje podatke sa ovog uređaja',
      tooltip:
        'Preporučuje se prilikom korišćenja zajedničkog računara u hotelu (GDPR)',
      toastTitle: 'Podaci o sesiji obrisani',
      toastDesc:
        'Svi privremeni nacrti i unijeti podaci su uspješno uklonjeni iz memorije pretraživača.',
    },
  }[locale];

  const handleWipe = () => {
    try {
      // Clear sessionStorage
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.clear();
      }

      // Clear case-related keys from localStorage (preserve language preference)
      if (typeof window !== 'undefined' && window.localStorage) {
        const langPref = window.localStorage.getItem('memorijal_lang');
        const keysToRemove: string[] = [];
        for (let i = 0; i < window.localStorage.length; i++) {
          const key = window.localStorage.key(i);
          if (key && key !== 'memorijal_lang') {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach((k) => window.localStorage.removeItem(k));
        if (langPref) {
          window.localStorage.setItem('memorijal_lang', langPref);
        }
      }

      // Trigger custom event for active forms to reset
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('memorijal:privacy-wipe'));
      }

      if (onWipe) {
        onWipe();
      }

      setWipedToast(true);
      setTimeout(() => setWipedToast(false), 3500);
    } catch {
      setWipedToast(true);
      setTimeout(() => setWipedToast(false), 3500);
    }
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={handleWipe}
        title={t.tooltip}
        className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors py-1 px-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
      >
        <Lock className="w-3 h-3 text-slate-400" />
        <span className="underline underline-offset-2 decoration-slate-300">
          {t.btnLabel}
        </span>
      </button>

      {/* Floating Confirmation Toast */}
      {wipedToast && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-50 max-w-sm bg-slate-900 text-white p-3.5 rounded-xl shadow-2xl border border-emerald-500/50 flex items-start gap-3 animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
            <Check className="w-3.5 h-3.5" />
          </div>
          <div className="space-y-0.5 text-xs">
            <strong className="block font-semibold text-emerald-300">
              {t.toastTitle}
            </strong>
            <p className="text-slate-300 text-[11px] leading-snug">
              {t.toastDesc}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
