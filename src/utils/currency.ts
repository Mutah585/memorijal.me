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
 * Converts price string like "From €1,850" or "От €4,500" to selected target currency.
 */
export function convertPriceString(
  priceRange: string,
  currency: 'EUR' | 'GBP' | 'USD',
  rates: CurrencyRates
): string {
  if (currency === 'EUR') return priceRange;

  // Extract numeric digits
  const match = priceRange.match(/([0-9.,]+)/);
  if (!match) return priceRange;

  const rawNumStr = match[1].replace(/,/g, '').replace(/\./g, '');
  const eurVal = parseInt(rawNumStr, 10);
  if (isNaN(eurVal)) return priceRange;

  const rate = currency === 'GBP' ? rates.GBP : rates.USD;
  const symbol = currency === 'GBP' ? '£' : '$';
  const converted = Math.round(eurVal * rate);
  const formatted = converted.toLocaleString();

  // Replace original euro figure with converted currency
  return priceRange
    .replace(/€\s*[0-9.,]+/, `${symbol}${formatted}`)
    .replace(/[0-9.,]+\s*€/, `${symbol}${formatted}`);
}

