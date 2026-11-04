import React from 'react';
import { Phone, ArrowLeft, Shield, AlertTriangle } from 'lucide-react';
import { Language, PHONE_DISPLAY, PHONE_HREF } from '../i18n/translations';
import { buildLocalizedPath, langToLocaleSlug } from '../data/seo-routes';

interface NotFoundProps {
  lang: Language;
  onNavigate: (path: string) => void;
  onOpenModal: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({
  lang,
  onNavigate,
  onOpenModal,
}) => {
  const locale = langToLocaleSlug(lang);
  const homePath = buildLocalizedPath(locale, '/');

  const headline =
    lang === 'RU'
      ? '404 • Страница не найдена'
      : lang === 'MNE'
      ? '404 • Stranica nije pronađena'
      : '404 • Page Not Found';

  const message =
    lang === 'RU'
      ? 'Запрашиваемый адрес недоступен. Если вам необходима экстренная помощь по репатриации или моргам — дежурный координатор на связи 24/7.'
      : lang === 'MNE'
      ? 'Tražena stranica nije dostupna. Dežurna služba za hitne slučajeve dostupna je 24/7.'
      : 'The requested page is unavailable. If you require emergency repatriation or mortuary coordination, our dispatch line is open 24/7.';

  const homeCta =
    lang === 'RU'
      ? 'На главную страницу'
      : lang === 'MNE'
      ? 'Povratak na početnu'
      : 'Return Home';

  const emergencyCta =
    lang === 'RU'
      ? 'Экстренный вызов дежурного'
      : lang === 'MNE'
      ? 'Hitni poziv dežurnom'
      : 'Emergency Dispatch';

  return (
    <div className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold mb-6">
        <AlertTriangle className="w-4 h-4 text-amber-600" />
        <span>HTTP 404 STATUS</span>
      </div>

      <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold text-slateDeep leading-tight mb-4">
        {headline}
      </h1>

      <p className="max-w-2xl mx-auto text-slateMuted text-base sm:text-lg leading-relaxed mb-10">
        {message}
      </p>

      {/* Emergency Assurance Card */}
      <div className="max-w-md mx-auto bg-white rounded-2xl border border-stoneBorder p-6 shadow-card mb-8 text-left">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-2">
          <Shield className="w-4 h-4 text-emerald-600" />
          <span>Memorijal d.o.o. • Dispatch 24/7</span>
        </div>
        <p className="text-xs text-slateMuted mb-3">
          {lang === 'RU'
            ? 'Лицензированная служба репатриации (Тиват / Подгорица). Круглосуточный приём звонков и WhatsApp.'
            : lang === 'MNE'
            ? 'Licencirana služba repatrijacije (Tivat / Podgorica). Prijem poziva i WhatsApp 24/7.'
            : 'Licensed international repatriation service (Tivat / Podgorica). Direct dispatch 24/7.'}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-stoneBorder">
          <span className="font-mono text-sm font-semibold text-slateDeep">
            {PHONE_DISPLAY}
          </span>
          <a
            href={PHONE_HREF}
            className="text-xs font-semibold text-sapphire hover:text-sapphire-light underline"
          >
            {emergencyCta}
          </a>
        </div>
      </div>

      {/* Action CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
        <button
          type="button"
          onClick={() => onNavigate(homePath)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-sapphire hover:bg-sapphire-light text-white font-semibold py-3.5 px-6 rounded-xl transition-colors text-sm shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{homeCta}</span>
        </button>

        <button
          type="button"
          onClick={onOpenModal}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-forest hover:bg-forest-hover text-white font-semibold py-3.5 px-6 rounded-xl transition-colors text-sm shadow-sm"
        >
          <Phone className="w-4 h-4" />
          <span>{emergencyCta}</span>
        </button>
      </div>
    </div>
  );
};

