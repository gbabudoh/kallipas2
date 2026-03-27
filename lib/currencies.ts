// Currency configuration for Kallipas global marketplace

export interface CurrencyConfig {
  code: string
  name: string
  symbol: string
  locale: string
  flag: string
  stripeCompatible: boolean
  // Static exchange rate relative to USD (approximate)
  rateToUsd: number
}

export const CURRENCIES: CurrencyConfig[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', locale: 'en-US', flag: '🇺🇸', stripeCompatible: true, rateToUsd: 1 },
  { code: 'EUR', name: 'Euro', symbol: '€', locale: 'de-DE', flag: '🇪🇺', stripeCompatible: true, rateToUsd: 1.08 },
  { code: 'GBP', name: 'British Pound', symbol: '£', locale: 'en-GB', flag: '🇬🇧', stripeCompatible: true, rateToUsd: 1.27 },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', locale: 'en-NG', flag: '🇳🇬', stripeCompatible: true, rateToUsd: 0.00063 },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', locale: 'en-KE', flag: '🇰🇪', stripeCompatible: true, rateToUsd: 0.0077 },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', locale: 'en-ZA', flag: '🇿🇦', stripeCompatible: true, rateToUsd: 0.055 },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: '₵', locale: 'en-GH', flag: '🇬🇭', stripeCompatible: true, rateToUsd: 0.063 },
  { code: 'MAD', name: 'Moroccan Dirham', symbol: 'MAD', locale: 'ar-MA', flag: '🇲🇦', stripeCompatible: true, rateToUsd: 0.10 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', locale: 'en-CA', flag: '🇨🇦', stripeCompatible: true, rateToUsd: 0.74 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', locale: 'en-AU', flag: '🇦🇺', stripeCompatible: true, rateToUsd: 0.65 },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', locale: 'ar-AE', flag: '🇦🇪', stripeCompatible: true, rateToUsd: 0.27 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', locale: 'ja-JP', flag: '🇯🇵', stripeCompatible: true, rateToUsd: 0.0067 },
]

export function getCurrency(code: string): CurrencyConfig {
  return CURRENCIES.find(c => c.code === code) || CURRENCIES[0]
}

export function formatPrice(amount: number, currencyCode: string): string {
  const currency = getCurrency(currencyCode)
  try {
    return new Intl.NumberFormat(currency.locale, {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: currency.code === 'JPY' ? 0 : 2,
      maximumFractionDigits: currency.code === 'JPY' ? 0 : 2,
    }).format(amount)
  } catch {
    return `${currency.symbol}${amount.toLocaleString()}`
  }
}

export function convertToUsd(amount: number, fromCurrency: string): number {
  const currency = getCurrency(fromCurrency)
  return amount * currency.rateToUsd
}

export function convertFromUsd(amountUsd: number, toCurrency: string): number {
  const currency = getCurrency(toCurrency)
  return amountUsd / currency.rateToUsd
}
