'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { useT } from '@/context/language-context'

const PROPERTY_TYPE_COLOURS: Record<string, string> = {
  residential:  'bg-[#0eaa99]/10 text-[#0eaa99] border-[#0eaa99]/20',
  commercial:   'bg-violet-50 text-violet-500 border-violet-100',
  industrial:   'bg-slate-100 text-slate-500 border-slate-200',
  land:         'bg-amber-50 text-amber-500 border-amber-100',
  business:     'bg-blue-50 text-blue-500 border-blue-100',
  mixed_use:    'bg-rose-50 text-rose-500 border-rose-100',
  holiday:      'bg-orange-50 text-orange-500 border-orange-100',
  agricultural: 'bg-lime-50 text-lime-600 border-lime-100',
}

type Props = {
  countries: string[]
  citiesByCountry: Record<string, string[]>
}

export default function ListingsFilters({ countries, citiesByCountry }: Props) {
  const router = useRouter()
  const sp = useSearchParams()
  const t = useT()
  const l = t.listings

  const LISTING_TYPES = [
    { value: '', label: l.all },
    { value: 'sale', label: l.forSale },
    { value: 'rent', label: l.toLet },
  ]

  const PROPERTY_CATEGORIES = [
    { value: '', label: l.allTypes },
    { value: 'residential', label: l.residential },
    { value: 'commercial', label: l.commercial },
    { value: 'industrial', label: l.industrial },
    { value: 'land', label: l.land },
    { value: 'business', label: l.business },
    { value: 'mixed_use', label: l.mixedUse },
    { value: 'holiday', label: l.holiday },
    { value: 'agricultural', label: l.agricultural },
  ]

  const type    = sp.get('type') ?? ''
  const cat     = sp.get('cat') ?? ''
  const country = sp.get('country') ?? ''
  const city    = sp.get('city') ?? ''

  const push = useCallback(
    (updates: Record<string, string>) => {
      const next = new URLSearchParams(sp.toString())
      Object.entries(updates).forEach(([k, v]) => {
        if (v) next.set(k, v)
        else next.delete(k)
      })
      router.push(`/listings?${next.toString()}`)
    },
    [router, sp],
  )

  const availableCities = country ? (citiesByCountry[country] ?? []) : Object.values(citiesByCountry).flat().sort()

  return (
    <div className="space-y-4 mb-10">

      {/* Row 1 — Listing type pills */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1">
        {LISTING_TYPES.map((t) => (
          <button
            key={t.value}
            onClick={() => push({ type: t.value, city: '' })}
            className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
              type === t.value
                ? 'bg-slate-950 text-white shadow-lg'
                : 'bg-white border border-slate-100 text-slate-400 hover:border-[#0eaa99]/30 hover:text-[#0eaa99]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Row 2 — Property category pills */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1">
        {PROPERTY_CATEGORIES.map((c) => {
          const colour = c.value ? PROPERTY_TYPE_COLOURS[c.value] : ''
          const isActive = cat === c.value
          return (
            <button
              key={c.value}
              onClick={() => push({ cat: c.value })}
              className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap border transition-all ${
                isActive
                  ? `${colour} shadow-sm`
                  : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200 hover:text-slate-600'
              }`}
            >
              {c.label}
            </button>
          )
        })}
      </div>

      {/* Row 3 — Country + City selects */}
      <div className="flex items-center gap-4 flex-wrap">
        {/* Country */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 ml-1">{l.country}</label>
          <select
            value={country}
            onChange={(e) => push({ country: e.target.value, city: '' })}
            className="min-w-[180px] bg-white border border-slate-100 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:border-[#0eaa99]/40 focus:ring-2 focus:ring-[#0eaa99]/10 transition-all appearance-none cursor-pointer"
          >
            <option value="">{l.allCountries}</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* City */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 ml-1">
            {l.city}{country ? ` — ${country}` : ''}
          </label>
          <select
            value={city}
            onChange={(e) => push({ city: e.target.value })}
            className="min-w-[180px] bg-white border border-slate-100 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:border-[#0eaa99]/40 focus:ring-2 focus:ring-[#0eaa99]/10 transition-all appearance-none cursor-pointer"
          >
            <option value="">{l.allCities}</option>
            {availableCities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Clear all */}
        {(type || cat || country || city) && (
          <button
            onClick={() => router.push('/listings')}
            className="self-end mb-0.5 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-rose-400 transition-colors"
          >
            {l.clearAll}
          </button>
        )}
      </div>
    </div>
  )
}
