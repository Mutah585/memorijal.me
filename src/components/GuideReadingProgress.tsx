import React, { useEffect, useState } from 'react';
import { LocaleSlug } from '../data/seo-routes';

export interface GuideReadingProgressProps {
  locale: LocaleSlug;
}

export const GuideReadingProgress: React.FC<GuideReadingProgressProps> = ({
  locale,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      if (scrollHeight <= 0) {
        setProgress(0);
        return;
      }
      const pct = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
      setProgress(pct);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  const sections =
    locale === 'ru'
      ? [
          { id: 'section-steps', label: '01. Алгоритм' },
          { id: 'section-documents', label: '02. Документы' },
          { id: 'section-costs', label: '03. Тарифы' },
          { id: 'section-faq', label: '04. Вопросы' },
        ]
      : locale === 'mne'
      ? [
          { id: 'section-steps', label: '01. Procedura' },
          { id: 'section-documents', label: '02. Dokumenta' },
          { id: 'section-costs', label: '03. Cijene' },
          { id: 'section-faq', label: '04. Pitanja' },
        ]
      : [
          { id: 'section-steps', label: '01. Steps' },
          { id: 'section-documents', label: '02. Documents' },
          { id: 'section-costs', label: '03. Costs' },
          { id: 'section-faq', label: '04. FAQ' },
        ];

  const handleJump = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Fixed 3px top reading progress bar */}
      <div
        role="progressbar"
        aria-label="Guide reading progress"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="fixed top-0 left-0 z-50 h-[3px] bg-[#C29B61] transition-all duration-150 no-print pointer-events-none"
        style={{ width: `${progress}%` }}
      />

      {/* Compact Jump-to-Section Pill Bar (zero CLS sticky/inline bar) */}
      <nav
        aria-label="Guide Table of Contents"
        className="bg-alabaster/95 border-b border-stoneBorder py-2.5 no-print"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto">
          {sections.map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              onClick={(e) => handleJump(e, sec.id)}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-sapphire hover:text-white border border-stoneBorder text-xs font-semibold text-slateDeep transition-colors whitespace-nowrap shrink-0"
            >
              {sec.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
};
