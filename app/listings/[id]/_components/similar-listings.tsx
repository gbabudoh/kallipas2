import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import {
  MOCK_LISTINGS,
  PROPERTY_TYPE_COLOURS,
  PROPERTY_CATEGORIES,
  LISTING_TYPE_LABEL,
} from '../../_data/mock-listings'

type Props = {
  currentId: string
  propertyType: string
  country: string
}

export default function SimilarListings({ currentId, propertyType, country }: Props) {
  // Same type in same country first, then same type elsewhere, limit 3
  const similar = [
    ...MOCK_LISTINGS.filter((l) => l.id !== currentId && l.propertyType === propertyType && l.country === country),
    ...MOCK_LISTINGS.filter((l) => l.id !== currentId && l.propertyType === propertyType && l.country !== country),
  ].slice(0, 3)

  if (similar.length === 0) return null

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#0eaa99] mb-1">More Like This</p>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 italic">Similar Listings</h2>
        </div>
        <Link
          href={`/listings?cat=${propertyType}`}
          className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#0eaa99] transition-colors flex items-center gap-1.5"
        >
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {similar.map((l) => {
          const typeColour = PROPERTY_TYPE_COLOURS[l.propertyType] ?? PROPERTY_TYPE_COLOURS.residential
          const catLabel   = PROPERTY_CATEGORIES[l.propertyType] ?? l.propertyType
          const typeLabel  = LISTING_TYPE_LABEL[l.listingType]   ?? l.listingType

          return (
            <Link
              key={l.id}
              href={`/listings/${l.id}`}
              className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#0eaa99]/10 hover:border-[#0eaa99]/30 transition-all duration-500 flex flex-col group"
            >
              {/* Thumb */}
              <div className="aspect-[16/10] bg-gradient-to-br from-slate-100 to-slate-200 relative flex-shrink-0">
                {l.tag && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#0eaa99] rounded-lg text-[10px] font-black uppercase tracking-widest text-white">
                    {l.tag}
                  </div>
                )}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${typeColour}`}>
                  {typeLabel}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1 gap-3">
                <div>
                  <h3 className="font-black text-slate-900 tracking-tight group-hover:text-[#0eaa99] transition-colors leading-tight mb-1">
                    {l.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span>{[l.city, l.country].join(', ')}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <span className="font-black text-[#0eaa99] text-base tracking-tight">{l.price}</span>
                  <span className={`px-2.5 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest ${typeColour}`}>
                    {catLabel}
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
