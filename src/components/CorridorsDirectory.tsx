import React, { useState, useMemo } from 'react';
import { Plane, ChevronRight } from 'lucide-react';
import {
  LocaleSlug,
  ALL_SEO_ROUTES,
  buildLocalizedPath,
} from '../data/seo-routes';

export type CorridorFilterId = 'all' | 'balkans' | 'eu_uk' | 'cis_east';

interface CorridorsDirectoryProps {
  locale: LocaleSlug;
  onNavigate: (path: string) => void;
  className?: string;
}

export const CorridorsDirectory: React.FC<CorridorsDirectoryProps> = ({
  locale,
  onNavigate,
  className = '',
}) => {
  const [activeFilter, setActiveFilter] = useState<CorridorFilterId>('all');

  const allCorridorRoutes = useMemo(
    () => ALL_SEO_ROUTES.filter((r) => r.category === 'corridor'),
    []
  );

  const filteredRoutes = useMemo(() => {
    if (activeFilter === 'all') return allCorridorRoutes;
    if (activeFilter === 'balkans') {
      return allCorridorRoutes.filter((r) => r.id === 'corridor-serbia');
    }
    if (activeFilter === 'eu_uk') {
      return allCorridorRoutes.filter((r) =>
        [
          'corridor-uk',
          'corridor-germany',
          'corridor-poland',
          'corridor-france',
          'corridor-italy',
        ].includes(r.id)
      );
    }
    if (activeFilter === 'cis_east') {
      return allCorridorRoutes.filter((r) =>
        ['corridor-russia', 'corridor-ukraine', 'corridor-turkey'].includes(
          r.id
        )
      );
    }
    return allCorridorRoutes;
  }, [activeFilter, allCorridorRoutes]);

  const tabs = useMemo(
    () =>
      [
        {
          id: 'all' as CorridorFilterId,
          label:
            locale === 'ru'
              ? 'Все направления'
              : locale === 'mne'
              ? 'Sve rute'
              : 'All Corridors',
        },
        {
          id: 'balkans' as CorridorFilterId,
          label:
            locale === 'ru'
              ? 'Сербия и Балканы'
              : locale === 'mne'
              ? 'Srbija i Balkan'
              : 'Serbia & Balkans',
        },
        {
          id: 'eu_uk' as CorridorFilterId,
          label:
            locale === 'ru'
              ? 'Евросоюз и UK'
              : locale === 'mne'
              ? 'Evropska unija i UK'
              : 'EU & UK',
        },
        {
          id: 'cis_east' as CorridorFilterId,
          label:
            locale === 'ru'
              ? 'СНГ и Восток'
              : locale === 'mne'
              ? 'Istočna Evropa'
              : 'Eastern Europe / CIS',
        },
      ] as const,
    [locale]
  );

  const headerTitle =
    locale === 'ru'
      ? '9 основных международных коридоров репатриации'
      : locale === 'mne'
      ? '9 primarnih međunarodnih koridora repatrijacije'
      : '9 Primary International Repatriation Corridors';

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-sapphire flex items-center gap-2">
          <Plane className="w-4 h-4" />
          <span>{headerTitle}</span>
        </h3>

        {/* Ergonomic Horizontal Pill Filter */}
        <div
          role="tablist"
          aria-label="Filter corridors by region"
          className="flex flex-wrap items-center gap-1.5 p-1 bg-surface rounded-xl border border-stoneBorder text-xs"
        >
          {tabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all duration-150 cursor-pointer select-none ${
                  isActive
                    ? 'bg-sapphire text-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slateDeep hover:bg-porcelain'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Corridor Cards Grid with reserved min-height to guarantee CLS = 0.000 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[380px] content-start transition-all">
        {filteredRoutes.map((route) => {
          const data = route.locales[locale];
          const href = buildLocalizedPath(locale, route.path);
          return (
            <a
              key={route.id}
              href={href}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(href);
              }}
              className="bg-white hover:border-sapphire rounded-xl border border-stoneBorder p-5 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between group h-[170px]"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-serif text-xl font-semibold text-slateDeep group-hover:text-sapphire transition-colors">
                    {data.breadcrumbLabel}
                  </span>
                  <ChevronRight className="w-4 h-4 text-sapphire shrink-0 transition-transform group-hover:translate-x-0.5" />
                </div>
                <p className="mt-1.5 text-xs text-slateMuted line-clamp-2">
                  {data.specs.transitTime} • {data.specs.embassyJurisdiction}
                </p>
              </div>
              <div className="pt-3 border-t border-stoneBorder/60 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">
                  {data.specs.estimatedTotalRange}
                </span>
                <span className="text-sapphire font-medium group-hover:underline">
                  {locale === 'ru'
                    ? 'Регламент'
                    : locale === 'mne'
                    ? 'Protokol'
                    : 'Protocol'}{' '}
                  →
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

