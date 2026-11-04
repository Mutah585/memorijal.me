import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { Language, PHONE_HREF, WHATSAPP_NUMBER } from '../i18n/translations';

interface MobileEmergencyBarProps {
  lang: Language;
}

export const MobileEmergencyBar: React.FC<MobileEmergencyBarProps> = ({ lang }) => {
  const [visible, setVisible] = useState(false);

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
      ? 'Pozovite 24/7'
      : 'Call 24/7';

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    lang === 'RU'
      ? 'Здравствуйте! Необходима экстренная консультация координатора Memorijal d.o.o. в Черногории.'
      : lang === 'MNE'
      ? 'Poštovani, potrebna je hitna konsultacija koordinatora Memorijal d.o.o. u Crnoj Gori.'
      : 'Hello! I need emergency assistance from a Memorijal d.o.o. coordinator in Montenegro.'
  )}`;

  return (
    <div
      role="complementary"
      aria-label="Mobile Emergency Actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stoneBorder px-4 py-2.5 flex items-center gap-3 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-elevated transition-transform animate-in fade-in slide-in-from-bottom-2"
    >
      {/* Call 24/7 Button */}
      <a
        href={PHONE_HREF}
        className="inline-flex items-center justify-center gap-2 border border-sapphire text-sapphire hover:bg-sapphire-subtle px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors shrink-0 shadow-xs"
        aria-label={callLabel}
      >
        <Phone className="w-4 h-4 text-sapphire" />
        <span>{callLabel}</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 inline-flex items-center justify-center gap-2 bg-[#1E7B54] hover:bg-[#176343] text-white py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition-colors truncate"
      >
        <MessageCircle className="w-4 h-4 shrink-0" />
        <span className="truncate">WhatsApp 24/7</span>
      </a>
    </div>
  );
};

