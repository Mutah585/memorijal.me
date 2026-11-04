import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, X, MessageSquare } from 'lucide-react';
import {
  Language,
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_NUMBER,
} from '../i18n/translations';
import { getDispatchStatus } from '../utils/dispatchStatus';

interface MobileEmergencyBarProps {
  lang: Language;
}

export const MobileEmergencyBar: React.FC<MobileEmergencyBarProps> = ({ lang }) => {
  const [visible, setVisible] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const dispatchStatus = getDispatchStatus(lang);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  const callLabel =
    lang === 'RU'
      ? 'Позвонить 24/7'
      : lang === 'MNE'
      ? 'Poziv (EN/RU)'
      : 'Call 24/7';

  const whatsappLabel =
    lang === 'MNE'
      ? 'Pišite na WhatsApp 24/7'
      : 'WhatsApp 24/7';

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    lang === 'RU'
      ? 'Здравствуйте! Необходима экстренная консультация координатора Memorijal d.o.o. в Черногории.'
      : lang === 'MNE'
      ? 'Poštovani, potrebna je hitna konsultacija koordinatora Memorijal d.o.o. u Crnoj Gori.'
      : 'Hello! I need emergency assistance from a Memorijal d.o.o. coordinator in Montenegro.'
  )}`;

  return (
    <>
      <div
        role="complementary"
        aria-label="Mobile Emergency Actions"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stoneBorder px-4 py-2.5 flex items-center gap-3 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-elevated transition-transform animate-in fade-in slide-in-from-bottom-2"
      >
        {/* Call 24/7 Button opens quick action sheet */}
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="inline-flex items-center justify-center gap-1.5 border border-sapphire text-sapphire hover:bg-sapphire-subtle px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors shrink-0 shadow-xs cursor-pointer"
          aria-label={`${callLabel} - ${dispatchStatus.statusText}`}
          title={dispatchStatus.statusText}
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <Phone className="w-3.5 h-3.5 text-sapphire shrink-0" />
          <span>{callLabel}</span>
        </button>

        {/* WhatsApp Button */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-[#1E7B54] hover:bg-[#176343] text-white py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition-colors truncate"
        >
          <MessageCircle className="w-4 h-4 shrink-0" />
          <span className="truncate">{whatsappLabel}</span>
        </a>
      </div>

      {/* Mobile Emergency Action Sheet */}
      {sheetOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slateDeep/60 backdrop-blur-sm p-4 animate-in fade-in"
          onClick={() => setSheetOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={callLabel}
        >
          <div
            className="w-full max-w-sm bg-white rounded-2xl border border-stoneBorder shadow-elevated p-5 space-y-4 animate-in slide-in-from-bottom-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-stoneBorder pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 block">
                  {lang === 'RU'
                    ? 'Экстренная линия 24/7'
                    : lang === 'MNE'
                    ? 'Dežurna linija 24/7'
                    : '24/7 Emergency Dispatch'}
                </span>
                <h3 className="font-serif text-lg font-bold text-slateDeep">
                  Memorijal d.o.o.
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-porcelain transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {/* Option 1: Direct GSM Voice Call */}
              <a
                href={PHONE_HREF}
                onClick={() => setSheetOpen(false)}
                className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-sapphire text-white hover:bg-sapphire-light transition-colors shadow-xs"
              >
                <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-emerald-300" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="font-semibold text-xs leading-snug">
                    {lang === 'RU'
                      ? 'Прямой звонок (GSM)'
                      : lang === 'MNE'
                      ? 'Direktni poziv (GSM)'
                      : 'Direct Voice Call (GSM)'}
                  </p>
                  <p className="text-[11px] text-slate-300 font-mono tracking-wide">
                    {PHONE_DISPLAY}
                  </p>
                  {lang === 'MNE' && (
                    <p className="text-[10px] text-emerald-300 leading-tight mt-0.5">
                      Pozivi na engleskom i ruskom jeziku / Written support in Montenegrin
                    </p>
                  )}
                </div>
              </a>

              {/* Option 2: WhatsApp Call / Chat */}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setSheetOpen(false)}
                className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-forest text-white hover:bg-forest-hover transition-colors shadow-xs"
              >
                <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="font-semibold text-xs leading-snug">
                    {lang === 'RU'
                      ? 'Связь через WhatsApp'
                      : lang === 'MNE'
                      ? 'WhatsApp poziv i poruka'
                      : 'WhatsApp Call & Chat'}
                  </p>
                  <p className="text-[11px] text-emerald-100">
                    {lang === 'RU'
                      ? 'Бесплатно по Wi-Fi / без роуминга'
                      : lang === 'MNE'
                      ? 'Preko interneta / bez rominga'
                      : 'Internet audio / no roaming charge'}
                  </p>
                </div>
              </a>

              {/* Option 3: SMS Dispatch Fallback (for low-connectivity zones / hospital basements) */}
              <a
                href="sms:+38268914816?body=SOS%20Memorijal%20Potrebna%20pomoc"
                onClick={() => setSheetOpen(false)}
                className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition-colors shadow-xs"
              >
                <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4 text-amber-300" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="font-semibold text-xs leading-snug">
                    {lang === 'RU'
                      ? 'Отправить экстренное SMS (работает без мобильного интернета)'
                      : lang === 'MNE'
                      ? 'Pošaljite hitan SMS (radi bez interneta)'
                      : 'Send Emergency SMS (works without mobile data)'}
                  </p>
                  <p className="text-[11px] text-slate-300 font-mono">
                    SMS: +382 68 914 816
                  </p>
                </div>
              </a>

              {/* Option 3: Cancel */}
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                className="w-full py-2.5 rounded-xl border border-stoneBorder text-slate-600 hover:bg-porcelain text-xs font-semibold transition-colors mt-1"
              >
                {lang === 'RU'
                  ? 'Отмена'
                  : lang === 'MNE'
                  ? 'Otkaži'
                  : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

