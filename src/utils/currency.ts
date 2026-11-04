export interface CurrencyRates {
  GBP: number;
  USD: number;
  date: string;
}

const STORAGE_KEY = 'memorijal_rates_cache';

// Stable baseline fallbacks if network fails or user is offline
const DEFAULT_RATES: CurrencyRates = {
  GBP: 0.85,
  USD: 1.08,
  date: new Date().toISOString().split('T')[0],
};

export async function fetchLiveRates(): Promise<CurrencyRates> {
  const today = new Date().toISOString().split('T')[0];

  try {
    const cached = sessionStorage.getItem(STORAGE_KEY);
    if (cached) {
      const parsed: CurrencyRates = JSON.parse(cached);
      if (parsed.date === today && parsed.GBP && parsed.USD) {
        return parsed;
      }
    }
  } catch {
    // sessionStorage blocked or unavailable
  }

  try {
    // Fast, CORS-friendly public exchange rate API
    const res = await fetch('https://open.er-api.com/v6/latest/EUR', {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.rates && data.rates.GBP && data.rates.USD) {
        const rates: CurrencyRates = {
          GBP: Number(data.rates.GBP),
          USD: Number(data.rates.USD),
          date: today,
        };
        try {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(rates));
        } catch {
          // Ignore quota errors
        }
        return rates;
      }
    }
  } catch {
    // Network failure / offline: fallback gracefully without throwing
  }

  return DEFAULT_RATES;
}

/**
 * Converts price string like "From €1,850", "От 1 850 €", or "Od 1.850 €" to selected target currency.
 */
export function convertPriceString(
  priceRange: string,
  currency: 'EUR' | 'GBP' | 'USD',
  rates: CurrencyRates
): string {
  if (currency === 'EUR') return priceRange;

  // Extract clean integer from string, removing all non-digits
  const rawNumeric = parseInt(priceRange.replace(/\D/g, ''), 10) || 0;
  if (!rawNumeric) return priceRange;

  const rate = currency === 'GBP' ? (rates.GBP || 0.85) : (rates.USD || 1.08);
  const converted = Math.round(rawNumeric * rate);
  const formattedNumber = converted.toLocaleString('ru-RU').replace(/\u00A0/g, ' ');

  const symbol = currency === 'GBP' ? '£' : '$';

  // Check prefix or localized prefix (From / От / Od)
  if (priceRange.startsWith('From')) {
    return `From ${symbol}${formattedNumber}`;
  }
  if (priceRange.startsWith('От') || priceRange.startsWith('Od')) {
    const prefix = priceRange.startsWith('От') ? 'От' : 'Od';
    return `${prefix} ${formattedNumber} ${symbol}`;
  }

  return `${formattedNumber} ${symbol}`;
}

