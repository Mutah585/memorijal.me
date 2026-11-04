import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle } from 'lucide-react';
import { LocaleSlug } from '../../data/seo-routes';

export type GlossaryKey =
  | 'Sprovodnica'
  | 'Lemljenje'
  | 'Potvrda o smrti'
  | 'Cargo HUM'
  | 'GOP';

interface GlossaryDefinition {
  term: string;
  definition: Record<LocaleSlug, string>;
}

const GLOSSARY_DEFINITIONS: Record<GlossaryKey, GlossaryDefinition> = {
  Sprovodnica: {
    term: 'Sprovodnica (Спрово́дница / Laissez-Passer)',
    definition: {
      ru: 'Главный государственный пропуск на трансграничную перевозку умершего, выдаваемый Санитарной инспекцией Черногории или консульством.',
      en: 'Official statutory mortuary transit pass (Laissez-Passer) issued by the Montenegro Sanitary Inspection or receiving Embassy.',
      mne: 'Zvanični zakonski sprovodni list za međunarodni prevoz preminulog koji izdaje Sanitarna inspekcija Crne Gore ili konzulat.',
    },
  },
  Lemljenje: {
    term: 'Lemljenje (Герметичная запайка цинка)',
    definition: {
      ru: 'Обязательная процедура герметичной пайки цинкового вкладыша с оформлением протокола санитарного опломбирования.',
      en: 'Statutory hermetic zinc soldering and lead sealing under official sanitary inspector supervision.',
      mne: 'Obavezno hermetičko lemljenje cinkanog sanduka pod nadzorom sanitarne inspekcije uz izdavanje zapisnika.',
    },
  },
  'Potvrda o smrti': {
    term: 'Potvrda o smrti (Врачебное свидетельство о смерти)',
    definition: {
      ru: 'Медицинский документ, составляемый врачом больницы или судебным экспертом, констатирующий факт и причину смерти.',
      en: 'Initial medical certificate of death issued by the hospital pathologist or attending physician.',
      mne: 'Ljekarsko uvjerenje o smrti koje izdaje ljekar mrtvozornik ili bolnički patolog.',
    },
  },
  'Cargo HUM': {
    term: 'Cargo HUM (Авиаперевозка останков IATA)',
    definition: {
      ru: 'Международный приоритетный авиационный тариф IATA для гробов с телом или урн с прахом с контролем пересадок.',
      en: 'International IATA air freight classification for human remains (Human Remains Cargo) with priority boarding.',
      mne: 'Međunarodna IATA avio-kargo klasifikacija za prevoz posmrtnih ostataka uz prioritetni ukrcaj.',
    },
  },
  GOP: {
    term: 'GOP (Guarantee of Payment / Гарантийное письмо)',
    definition: {
      ru: 'Официальное гарантийное обязательство международной страховой компании или ассистанса о прямой оплате репатриации.',
      en: 'Guarantee of Payment issued directly by international travel insurers or assistance companies for direct corporate billing.',
      mne: 'Pismo o garanciji plaćanja koje izdaje međunarodno osiguranje za direktno preuzimanje troškova.',
    },
  },
};

interface GlossaryTermProps {
  termKey: GlossaryKey;
  locale?: LocaleSlug;
  children?: React.ReactNode;
}

export const GlossaryTerm: React.FC<GlossaryTermProps> = ({
  termKey,
  locale = 'en',
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const item = GLOSSARY_DEFINITIONS[termKey];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  if (!item) {
    return <>{children || termKey}</>;
  }

  const definitionText = item.definition[locale] || item.definition.en;

  return (
    <span
      ref={containerRef}
      className="relative inline-flex items-center gap-0.5 cursor-help group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span className="border-b border-dotted border-sapphire text-slateDeep font-medium">
        {children || termKey}
      </span>
      <HelpCircle className="w-3.5 h-3.5 text-sapphire/70 inline-block shrink-0 -translate-y-0.5" />

      {isOpen && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 sm:w-72 p-3 bg-slateDeep text-white text-xs rounded-xl shadow-elevated z-50 pointer-events-none animate-in fade-in zoom-in-95 leading-relaxed text-left font-normal"
        >
          <strong className="block text-emerald-300 font-semibold mb-1 text-[11px] tracking-wide">
            {item.term}
          </strong>
          <span className="text-slate-200 text-[11.5px] leading-snug block">
            {definitionText}
          </span>
          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slateDeep" />
        </span>
      )}
    </span>
  );
};

