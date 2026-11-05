import { Language, WHATSAPP_NUMBER } from '../i18n/translations';
import { LocaleSlug } from '../data/seo-routes';

/**
 * Geolocation guidance micro-caption for villas, resorts, and remote mountain locations.
 */
export function getWhatsAppGeolocationPrompt(langOrLocale: Language | LocaleSlug): string {
  const isRu = langOrLocale === 'RU' || langOrLocale === 'ru';
  const isMne = langOrLocale === 'MNE' || langOrLocale === 'mne';

  if (isRu) {
    return 'Находясь на вилле или в апартаментах, вы можете отправить точку геопозиции прямо в чат WhatsApp для точного прибытия координатора.';
  }
  if (isMne) {
    return 'Možete poslati lokaciju putem WhatsApp-a za tačan dolazak koordinatora.';
  }
  return 'If at a villa, yacht berth, or private rental, share your WhatsApp live location pin for precise coordinator dispatch.';
}

/**
 * Formats a direct WhatsApp link with prefilled emergency message.
 */
export function buildEmergencyWhatsAppUrl(message: string): string {
  const cleanNumber = WHATSAPP_NUMBER.replace(/\D/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

