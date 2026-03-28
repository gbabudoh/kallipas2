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

export interface TranslationResult {
  title: string
  description: string
}

/**
 * Translate text using DeepL API (free tier).
 * Falls back to returning the original text if the API key is missing or on error.
 */
export async function translateText(text: string, targetLang: LanguageCode): Promise<string> {
  const apiKey = process.env.DEEPL_API_KEY

  if (!apiKey || apiKey === 'your-deepl-free-api-key') {
    // Return original text when no API key is configured
    return text
  }

  try {
    const res = await fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: [text],
        target_lang: targetLang,
      }),
    })

    if (!res.ok) {
      console.error(`DeepL API error: ${res.status}`)
      return text
    }

    const data = await res.json()
    return data.translations?.[0]?.text || text
  } catch (error) {
    console.error('Translation error:', error)
    return text
  }
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
