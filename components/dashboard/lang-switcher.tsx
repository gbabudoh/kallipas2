'use client'

import { useState } from 'react'
import { Globe, ChevronDown, Check } from 'lucide-react'
import { useLang } from '@/context/language-context'
import { SUPPORTED_LANGUAGES } from '@/lib/translate'

export default function DashboardLangSwitcher() {
  const { lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const active = SUPPORTED_LANGUAGES.find((l) => l.code === lang) ?? SUPPORTED_LANGUAGES[0]

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-white border border-slate-200 hover:border-[#0eaa99]/40 transition-all text-[10px] font-black uppercase tracking-widest shadow-sm group"
      >
        <Globe className="w-4 h-4 text-[#0eaa99] group-hover:rotate-12 transition-transform" />
        <span>{active.flag} {active.code}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          {/* backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl border border-slate-100 shadow-2xl shadow-slate-200/60 z-50 overflow-hidden py-2">
            {SUPPORTED_LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code); setOpen(false) }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold hover:bg-slate-50 transition-colors text-left"
              >
                <span className="text-base">{l.flag}</span>
                <span className={lang === l.code ? 'text-[#0eaa99]' : 'text-slate-700'}>{l.name}</span>
                {lang === l.code && <Check className="w-3.5 h-3.5 text-[#0eaa99] ml-auto" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
