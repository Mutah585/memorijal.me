import { Language } from '../i18n/translations';

export interface DispatchStatus {
  isNight: boolean;
  statusText: string;
}

export function getDispatchStatus(lang: Language): DispatchStatus {
  let isNight = false;
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Europe/Podgorica',
      hour: 'numeric',
      hour12: false,
    });
    const hour = parseInt(formatter.format(new Date()), 10);
    // Night hours: 22:00 (10 PM) through 06:59 (before 07:00)
    isNight = hour >= 22 || hour < 7;
  } catch {
    // Fallback to local machine hour if timezone lookup fails
    const localHour = new Date().getHours();
    isNight = localHour >= 22 || localHour < 7;
  }

  const statusText = isNight
    ? lang === 'RU'
      ? 'Ночная экстренная линия активна • Тиват / Подгорица'
      : lang === 'MNE'
      ? 'Noćna dežurna linija aktivna • Tivat / Podgorica'
      : 'Night emergency dispatch active • Tivat / Podgorica'
    : lang === 'RU'
    ? 'Дежурная служба на связи 24/7 • Тиват / Подгорица'
    : lang === 'MNE'
    ? 'Dežurna služba aktivna 24/7 • Tivat / Podgorica'
    : 'Emergency dispatch online 24/7 • Tivat / Podgorica';

  return { isNight, statusText };
}

