import React, { useEffect, useState } from 'react';
import { BookOpen, ChevronDown } from 'lucide-react';
import { LocaleSlug } from '../data/seo-routes';

export interface GuideReadingProgressProps {
  locale: LocaleSlug;
}

export const GuideReadingProgress: React.FC<GuideReadingProgressProps> = ({
  locale,
}) => {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<string>('section-legal-basis');
  const [mobileOpen, setMobileOpen] = useState(false);

  const sections =
    locale === 'ru'
      ? [
          { id: 'section-legal-basis', label: 'Правовая база' },
          { id: 'section-statutory-sla', label: 'Регламентные сроки' },
          { id: 'section-official-fees', label: 'Сборы и пошлины' },
          { id: 'section-family-steps', label: 'Порядок действий семьи' },
        ]
      : locale === 'mne'
      ? [
          { id: 'section-legal-basis', label: 'Pravni osnov' },
          { id: 'section-statutory-sla', label: 'Zakonski rokovi' },
          { id: 'section-official-fees', label: 'Takse i troškovi' },
          { id: 'section-family-steps', label: 'Koraci porodice' },
        ]
      : [
          { id: 'section-legal-basis', label: 'Legal Basis' },
          { id: 'section-statutory-sla', label: 'Statutory SLA' },
          { id: 'section-official-fees', label: 'Official Fees' },
          { id: 'section-family-steps', label: 'Family Action Steps' },
        ];

  const tocTitle =
    locale === 'ru'
      ? 'Навигация по регламенту:'
      : locale === 'mne'
      ? 'Sadržaj vodiča:'
      : 'Guide Contents:';

  useEffect(() => {
    const sectionIds = [
      'section-legal-basis',
      'section-statutory-sla',
      'section-official-fees',
      'section-family-steps',
    ];

    const updateProgressAndActive = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      if (scrollHeight <= 0) {
        setProgress(0);
      } else {
        const pct = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
        setProgress(pct);
      }

      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            current = id;
          }
        }
      }
      setActiveId(current);
    };

    updateProgressAndActive();
    window.addEventListener('scroll', updateProgressAndActive, { passive: true });
    window.addEventListener('resize', updateProgressAndActive, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateProgressAndActive);
      window.removeEventListener('resize', updateProgressAndActive);
    };
  }, []);

  const handleJump = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActiveId(id);
    setMobileOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const activeSectionObj =
    sections.find((s) => s.id === activeId) || sections[0];

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div
        role="progressbar"
        aria-label="Guide reading progress"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-1 bg-gradient-to-r from-[#162B49] to-[#C29B61] fixed top-0 left-0 z-50 transition-all duration-150 no-print pointer-events-none"
        style={{ width: `${progress}%` }}
      />

      {/* Sticky Anchor Navigator (Desktop Bar & Mobile Collapsible Pill) */}
      <nav
        aria-label="Guide Table of Contents"
        className="sticky top-0 z-30 bg-alabaster/95 backdrop-blur-xs border-b border-stoneBorder py-2.5 no-print"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Horizontal Anchor Bar */}
          <div className="hidden sm:flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slateMuted shrink-0">
              <BookOpen className="w-3.5 h-3.5 text-sapphire" />
              <span>{tocTitle}</span>
            </span>

            <div className="flex items-center gap-2 overflow-x-auto">
              {sections.map((sec) => {
                const isActive = activeId === sec.id;
                return (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={(e) => handleJump(e, sec.id)}
                    className={`px-3.5 py-1.5 rounded-full border text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-sapphire text-white border-sapphire shadow-2xs'
                        : 'bg-white hover:bg-sapphire/10 text-slateDeep border-stoneBorder'
                    }`}
                  >
                    {sec.label}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Mobile Collapsible Pill */}
          <div className="sm:hidden relative">
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="w-full flex items-center justify-between gap-2 px-3.5 py-2 rounded-xl bg-white border border-stoneBorder text-xs font-semibold text-slateDeep"
            >
              <span className="inline-flex items-center gap-1.5 truncate">
                <BookOpen className="w-3.5 h-3.5 text-sapphire shrink-0" />
                <span className="text-slateMuted">{tocTitle}</span>
                <span className="text-sapphire font-bold truncate">
                  {activeSectionObj.label}
                </span>
              </span>
              <ChevronDown
                className={`w-4 h-4 text-slateMuted transition-transform shrink-0 ${
                  mobileOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {mobileOpen && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl border border-stoneBorder shadow-elevated p-2 space-y-1 z-40">
                {sections.map((sec) => {
                  const isActive = activeId === sec.id;
                  return (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      onClick={(e) => handleJump(e, sec.id)}
                      className={`block px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-sapphire text-white'
                          : 'text-slateDeep hover:bg-porcelain'
                      }`}
                    >
                      {sec.label}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
