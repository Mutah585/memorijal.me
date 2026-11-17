import React from 'react';
import { LocaleSlug, buildLocalizedPath } from '../../data/seo-routes';

interface LegalConsentNoticeProps {
  locale: LocaleSlug;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  requireCheckbox?: boolean;
  className?: string;
}

export const LegalConsentNotice: React.FC<LegalConsentNoticeProps> = ({
  locale,
  checked = true,
  onChange,
  requireCheckbox = false,
  className = '',
}) => {
  const termsUrl = buildLocalizedPath(locale, '/legal/terms-of-service/');
  const privacyUrl = buildLocalizedPath(locale, '/legal/privacy-gdpr/');

  const renderLinksText = () => {
    if (locale === 'ru') {
      return (
        <>
          Отправляя заявку, вы подтверждаете согласие с{' '}
          <a
            href={termsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-sapphire hover:text-sapphire-light font-medium"
          >
            Публичной офертой (агентским договором поручения)
          </a>{' '}
          и{' '}
          <a
            href={privacyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-sapphire hover:text-sapphire-light font-medium"
          >
            Политикой конфиденциальности (GDPR / ZZPL)
          </a>
          .
        </>
      );
    }

    if (locale === 'mne') {
      return (
        <>
          Slanjem zahtjeva prihvatate{' '}
          <a
            href={termsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-sapphire hover:text-sapphire-light font-medium"
          >
            Opšte uslove poslovanja (agencijski nalog)
          </a>{' '}
          i{' '}
          <a
            href={privacyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-sapphire hover:text-sapphire-light font-medium"
          >
            Politiku privatnosti (ZZPL / GDPR)
          </a>
          .
        </>
      );
    }

    return (
      <>
        By dispatching this request, you acknowledge our{' '}
        <a
          href={termsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-sapphire hover:text-sapphire-light font-medium"
        >
          Agency Terms of Service (Mandate Model)
        </a>{' '}
        and{' '}
        <a
          href={privacyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-sapphire hover:text-sapphire-light font-medium"
        >
          GDPR / ZZPL Privacy Policy
        </a>
        .
      </>
    );
  };

  if (requireCheckbox && onChange) {
    return (
      <label
        className={`flex items-start gap-2.5 text-[11px] sm:text-xs text-slateMuted leading-relaxed cursor-pointer select-none ${className}`}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          required
          className="mt-0.5 h-4 w-4 rounded border-stoneBorder text-sapphire focus:ring-sapphire shrink-0 cursor-pointer"
        />
        <span>{renderLinksText()}</span>
      </label>
    );
  }

  return (
    <p className={`text-[11px] text-slateMuted leading-relaxed ${className}`}>
      {renderLinksText()}
    </p>
  );
};

