// AI Translation utility using DeepL API (free tier)

export const SUPPORTED_LANGUAGES = [
  { code: 'EN', name: 'English',    flag: '🇬🇧' },
  { code: 'FR', name: 'French',     flag: '🇫🇷' },
  { code: 'ES', name: 'Spanish',    flag: '🇪🇸' },
  { code: 'AR', name: 'Arabic',     flag: '🇸🇦' },
  { code: 'PT', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'DE', name: 'German',     flag: '🇩🇪' },
  { code: 'ZH', name: 'Chinese',    flag: '🇨🇳' },
  { code: 'JA', name: 'Japanese',   flag: '🇯🇵' },
  { code: 'RU', name: 'Russian',    flag: '🇷🇺' },
  { code: 'TR', name: 'Turkish',    flag: '🇹🇷' },
  { code: 'HI', name: 'Hindi',      flag: '🇮🇳' },
  { code: 'IT', name: 'Italian',    flag: '🇮🇹' },
  { code: 'KO', name: 'Korean',     flag: '🇰🇷' },
  { code: 'NL', name: 'Dutch',      flag: '🇳🇱' },
] as const

export type LanguageCode = typeof SUPPORTED_LANGUAGES[number]['code']

// Global in-memory cache for translations (Key: "lang_originalText")
const translationCache = new Map<string, string>()

export interface TranslationResult {
  title: string
  description: string
}

/**
 * Translate text (string or array) using DeepL API (free tier).
 * Falls back to returning the original text if the API key is missing or on error.
 */
export async function translateText<T extends string | string[]>(
  text: T,
  targetLang: LanguageCode
): Promise<T> {
  const apiKey = process.env.DEEPL_API_KEY
 
  if (!apiKey || apiKey === 'your-deepl-free-api-key') return text
 
  const isArray = Array.isArray(text)
  const inputStrings = isArray ? text : [text]
 
  // 1. Check Cache
  const results: string[] = []
  const missingStrings: { str: string; idx: number }[] = []
 
  inputStrings.forEach((str, i) => {
    const cacheKey = `${targetLang}_${str}`
    const cached = translationCache.get(cacheKey)
    if (cached) {
      results[i] = cached
    } else {
      missingStrings.push({ str, idx: i })
    }
  })
 
  if (missingStrings.length === 0) {
    return (isArray ? results : results[0]) as T
  }
 
  // 2. Fetch missing from DeepL
  try {
    const res = await fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: missingStrings.map(m => m.str),
        target_lang: targetLang,
      }),
    })
 
    if (!res.ok) {
      console.error(`DeepL API error: ${res.status}`)
      return text
    }
 
    const data = await res.json()
    const translations = data.translations?.map((t: { text: string }) => t.text) || []
 
    // 3. Update Cache & Final Results
    translations.forEach((t: string, i: number) => {
      const original = missingStrings[i].str
      const index = missingStrings[i].idx
      translationCache.set(`${targetLang}_${original}`, t)
      results[index] = t
    })
 
    return (isArray ? results : (results[0] || text)) as T
  } catch (error) {
    console.error('Translation error:', error)
    return text
  }
}

/**
 * Batch translate multiple strings for better performance.
 */
export async function translateBatch(texts: string[], targetLang: LanguageCode): Promise<string[]> {
  if (texts.length === 0) return []
  return translateText(texts, targetLang)
}

/**
 * Translate a listing's title and description into multiple languages.
 */
export async function translateListing(
  title: string,
  description: string,
  targetLanguages: LanguageCode[]
): Promise<Record<string, TranslationResult>> {
  const results: Record<string, TranslationResult> = {}

  for (const lang of targetLanguages) {
    const [translatedTitle, translatedDescription] = await Promise.all([
      translateText(title, lang),
      translateText(description || '', lang),
    ])

    results[lang] = {
      title: translatedTitle,
      description: translatedDescription,
    }
  }

  return results
}
