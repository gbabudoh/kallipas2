'use client'

import { useState } from 'react'
import { Heart, MapPin, BedDouble, Bath, Square, X, ArrowRight, Search } from 'lucide-react'
import Link from 'next/link'

const MOCK_SAVED = [
  {
    id: '1',
    title: 'Victorian Terrace House',
    address: '14 Elmwood Road, Manchester',
    price: '$485,000',
    type: 'For Sale',
    beds: 3,
    baths: 2,
    sqft: 1340,
    tag: 'New to Market',
  },
  {
    id: '2',
    title: 'Modern City Apartment',
    address: '9th Floor, Harbour Tower, Liverpool',
    price: '$310,000',
    type: 'For Sale',
    beds: 2,
    baths: 1,
    sqft: 890,
    tag: 'Price Reduced',
  },
  {
    id: '3',
    title: '4-Bed Detached Home',
    address: '7 Birchwood Close, Leeds',
    price: '$625,000',
    type: 'For Sale',
    beds: 4,
    baths: 3,
    sqft: 2100,
    tag: 'Verified',
  },
  {
    id: '4',
    title: 'Studio Flat — City Centre',
    address: 'Flat 3B, Central Quarter, Birmingham',
    price: '$1,450 / mo',
    type: 'To Let',
    beds: 1,
    baths: 1,
    sqft: 420,
    tag: 'Available Now',
  },
]

export default function SavedPage() {
  const [saved, setSaved] = useState(MOCK_SAVED)

  const remove = (id: string) => setSaved((prev) => prev.filter((p) => p.id !== id))

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-5xl font-black tracking-tight text-slate-900 italic mb-3">
            Saved <span className="text-[#0eaa99]">Properties</span>
          </h1>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">
            {saved.length} shortlisted
          </p>
        </div>
        <Link
          href="listings"
          className="flex items-center gap-2 px-6 py-3 bg-[#0eaa99] text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-[#0c9485] transition-all shadow-lg shadow-[#0eaa99]/20"
        >
          <Search className="w-4 h-4" />
          Browse More
        </Link>
      </div>

      {saved.length === 0 ? (
        <div className="glass-card rounded-[3rem] p-24 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center mb-8 shadow-inner">
            <Heart className="w-10 h-10 text-slate-200" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 italic mb-3">No saved properties yet</h3>
          <p className="text-slate-400 font-bold text-sm max-w-sm">
            Browse the marketplace and save properties you&apos;re interested in.
          </p>
          <Link
            href="listings"
            className="mt-8 flex items-center gap-2 px-8 py-4 bg-[#0eaa99] text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-[#0c9485] transition-all"
          >
            Browse Properties <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {saved.map((property) => (
            <div
              key={property.id}
              className="glass-card rounded-[2.5rem] overflow-hidden group hover:border-[#0eaa99]/30 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-[#0eaa99]/10 relative"
            >
              {/* Image placeholder */}
              <div className="aspect-[16/9] bg-gradient-to-br from-slate-100 to-slate-200 relative">
                <div className="absolute top-5 left-5 px-4 py-1.5 bg-[#0eaa99] rounded-xl text-[10px] font-black uppercase tracking-widest text-white shadow-lg">
                  {property.tag}
                </div>
                <div className="absolute top-5 right-5 px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 shadow-sm border border-slate-100">
                  {property.type}
                </div>
                <button
                  onClick={() => remove(property.id)}
                  className="absolute bottom-5 right-5 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-rose-400 hover:text-rose-600 hover:bg-white transition-all shadow-sm border border-slate-100"
                  title="Remove from saved"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-8">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">{property.title}</h3>
                  <span className="text-xl font-black text-[#0eaa99] tracking-tighter whitespace-nowrap ml-4">
                    {property.price}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-6">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{property.address}</span>
                </div>

                <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8">
                  <span className="flex items-center gap-1.5"><BedDouble className="w-4 h-4" />{property.beds} Beds</span>
                  <span className="flex items-center gap-1.5"><Bath className="w-4 h-4" />{property.baths} Baths</span>
                  <span className="flex items-center gap-1.5"><Square className="w-4 h-4" />{property.sqft} sqft</span>
                </div>

                <div className="flex items-center gap-3">
                  <button className="flex-1 py-3 bg-slate-950 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                    Enquire <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button className="px-4 py-3 border border-slate-100 rounded-xl text-slate-400 hover:text-[#0eaa99] hover:border-[#0eaa99]/30 transition-all">
                    <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
