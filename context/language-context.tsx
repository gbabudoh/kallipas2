'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { getDict, type Dict } from '@/lib/i18n'

type LangContextType = {
  lang: string
  setLang: (code: string) => void
  t: Dict
}

const LangContext = createContext<LangContextType | null>(null)

export function LanguageProvider({ children, initialLang = 'EN' }: { children: ReactNode; initialLang?: string }) {
  const [lang, setLangState] = useState(initialLang)

  useEffect(() => {
    const stored = localStorage.getItem('kallipas_lang') ?? initialLang
    if (stored !== lang) setLangState(stored)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // RTL for Arabic
  useEffect(() => {
    document.documentElement.dir = lang === 'AR' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang.toLowerCase()
  }, [lang])

  const setLang = useCallback((code: string) => {
    setLangState(code)
    localStorage.setItem('kallipas_lang', code)
    document.cookie = `kallipas_lang=${code}; path=/; max-age=31536000; SameSite=Lax`
  }, [])

  const t = getDict(lang)

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>
}

export function useT(): Dict {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useT must be used within LanguageProvider')
  return ctx.t
}

export function useLang(): { lang: string; setLang: (code: string) => void } {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return { lang: ctx.lang, setLang: ctx.setLang }
}
