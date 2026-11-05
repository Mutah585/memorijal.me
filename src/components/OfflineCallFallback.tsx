import React, { useState, useEffect } from 'react';
import { WifiOff, Phone, Wifi, X } from 'lucide-react';
import { LocaleSlug } from '../data/seo-routes';
import { PHONE_DISPLAY, PHONE_HREF } from '../i18n/translations';

export interface OfflineCallFallbackProps {
  locale: LocaleSlug;
}

export const OfflineCallFallback: React.FC<OfflineCallFallbackProps> = ({
  locale,
}) => {
  const [isOffline, setIsOffline] = useState(
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  );
  const [showRestored, setShowRestored] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setDismissed(false);
      setShowRestored(true);
      const timer = setTimeout(() => {
        setShowRestored(false);
      }, 3000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setDismissed(false);
      setShowRestored(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const t = {
    ru: {
      offlineTitle: 'Связь с интернетом прервана (горная зона / туннель)',
      offlineBody:
        'Введенные данные сохранены в браузере. Вы можете совершить прямой голосовой вызов дежурному координатору без интернета.',
      callBtn: `Позвонить дежурному (${PHONE_DISPLAY})`,
      restoredMsg: 'Интернет-соединение восстановлено. Страница синхронизирована.',
      dismiss: 'Скрыть уведомление',
    },
    en: {
      offlineTitle: 'Mobile data interrupted (mountain zone / tunnel)',
      offlineBody:
        'Your form progress is saved locally. Tap below for direct voice call to our 24/7 dispatcher without internet.',
      callBtn: `Direct Voice Call (${PHONE_DISPLAY})`,
      restoredMsg: 'Internet connection restored. Live sync active.',
      dismiss: 'Dismiss',
    },
    mne: {
      offlineTitle: 'Prekid internet veze (planinska zona / tunel)',
      offlineBody:
        'Podaci su sačuvani u pretraživaču. Za hitnu koordinaciju upotrijebite direktan telefonski poziv.',
      callBtn: `Hitan poziv koordinatoru (${PHONE_DISPLAY})`,
      restoredMsg: 'Internet veza ponovo uspostavljena.',
      dismiss: 'Zatvori',
    },
  }[locale];

  if (showRestored) {
    return (
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 z-50 max-w-md bg-emerald-900 text-white p-3.5 rounded-2xl shadow-elevated border border-emerald-400/40 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
        <Wifi className="w-5 h-5 text-emerald-400 shrink-0" />
        <p className="text-xs font-medium leading-snug">{t.restoredMsg}</p>
      </div>
    );
  }

  if (!isOffline || dismissed) return null;

  return (
    <div
      role="alert"
      className="fixed bottom-4 left-3 right-3 sm:left-auto sm:right-6 z-50 max-w-lg bg-slate-900/95 backdrop-blur-md text-white p-4 sm:p-5 rounded-2xl shadow-2xl border-2 border-amber-500/80 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/30">
            <WifiOff className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs sm:text-sm font-bold text-amber-300">
              {t.offlineTitle}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              {t.offlineBody}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          title={t.dismiss}
          aria-label={t.dismiss}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-end gap-3">
        <a
          href={PHONE_HREF}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-forest hover:bg-forest-hover text-white text-xs sm:text-sm font-bold shadow-xs transition-colors text-center"
        >
          <Phone className="w-4 h-4" />
          <span>{t.callBtn}</span>
        </a>
      </div>
    </div>
  );
};

