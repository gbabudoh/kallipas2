import Navbar from "@/components/navigation/navbar"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { getServerT } from "@/lib/i18n/server"
import { MapPin, BedDouble, Bath, Square, CheckCircle2, Tag, ArrowRight } from "lucide-react"
import { Suspense } from "react"
import ListingsFilters from "./_components/listings-filters"
import CardImage from "./_components/card-image"
import {
  MOCK_LISTINGS,
  PROPERTY_TYPE_COLOURS,
  PROPERTY_CATEGORIES,
  LISTING_TYPE_LABEL,
} from "./_data/mock-listings"
import {
  PROPERTY_TYPE_IMAGES,
  PROPERTY_TYPE_FALLBACK,
} from "./_data/listing-media"

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; cat?: string; country?: string; city?: string }>
}) {
  const { type, cat, country, city } = await searchParams
  const t = await getServerT()

  // Build country → cities map from mock data
  const citiesByCountry: Record<string, string[]> = {}
  for (const l of MOCK_LISTINGS) {
    if (!citiesByCountry[l.country]) citiesByCountry[l.country] = []
    if (!citiesByCountry[l.country].includes(l.city)) citiesByCountry[l.country].push(l.city)
  }
  Object.values(citiesByCountry).forEach((arr) => arr.sort())
  const countries = Object.keys(citiesByCountry).sort()

  // Fetch real listings from DB
  let dbListings: Array<{
    id: string; title: string; address: string | null; city: string | null; country: string | null
    price: string; listingType: string; propertyType: string; verified: boolean; seller: string; isMock: false
  }> = []

  try {
    const raw = await prisma.listing.findMany({
      where: {
        status: 'active',
        ...(type    ? { listingType: type }           : {}),
        ...(cat     ? { propertyType: cat as never }  : {}),
        ...(country ? { country }                     : {}),
        ...(city    ? { city }                        : {}),
      },
      include: { owner: { select: { fullName: true, isVerified: true } } },
      orderBy: { createdAt: 'desc' },
      take: 48,
    })
    dbListings = raw.map((l) => ({
      id: l.id, title: l.title, address: l.address, city: l.city, country: l.country,
      price: `${l.currency} ${Number(l.price).toLocaleString()}`,
      listingType: l.listingType, propertyType: l.propertyType,
      verified: l.owner?.isVerified ?? false, seller: l.owner?.fullName ?? 'Anonymous',
      isMock: false as const,
    }))
  } catch { /* DB unavailable — fall through to mock data */ }

  const filteredMock = MOCK_LISTINGS.filter((l) => {
    if (type    && l.listingType   !== type)    return false
    if (cat     && l.propertyType  !== cat)     return false
    if (country && l.country       !== country) return false
    if (city    && l.city          !== city)    return false
    return true
  })

  const listings = dbListings.length > 0 ? dbListings : filteredMock

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />
      <main className="pt-32 pb-24 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-10">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0eaa99] mb-3">
            {t.listings.marketplace}
          </p>
          <h1 className="text-5xl font-black tracking-tight text-slate-900 italic mb-4">
            {t.listings.properties}
          </h1>
          <p className="text-slate-500 font-medium">
            {listings.length} {listings.length !== 1 ? t.listings.availablePlural : t.listings.available}
            {country && <span className="text-slate-400"> · {country}</span>}
            {city    && <span className="text-slate-400"> · {city}</span>}
          </p>
        </div>

        {/* Filters (client component) */}
        <Suspense>
          <ListingsFilters countries={countries} citiesByCountry={citiesByCountry} />
        </Suspense>

        {/* Grid */}
        {listings.length === 0 ? (
          <div className="bg-white rounded-[3rem] border border-slate-100 p-24 text-center shadow-sm">
            <p className="text-slate-400 font-bold text-lg">{t.listings.noListings}</p>
            <Link href="/listings" className="mt-6 inline-block text-[10px] font-black uppercase tracking-widest text-[#0eaa99] hover:underline">
              {t.listings.clearFilters}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((listing) => {
              const typeColour = PROPERTY_TYPE_COLOURS[listing.propertyType] ?? PROPERTY_TYPE_COLOURS.residential
              const beds = 'beds' in listing ? listing.beds : null
              const baths = 'baths' in listing ? listing.baths : null
              const sqft = 'sqft' in listing ? listing.sqft : null
              const tag = 'tag' in listing ? listing.tag : null
              const catLabel = PROPERTY_CATEGORIES[listing.propertyType] ?? listing.propertyType

              return (
                <div
                  key={listing.id}
                  className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#0eaa99]/10 hover:border-[#0eaa99]/30 transition-all duration-500 flex flex-col"
                >
                  {/* Image area */}
                  <div className="aspect-[16/10] relative flex-shrink-0 overflow-hidden">
                    <CardImage
                      src={PROPERTY_TYPE_IMAGES[listing.propertyType]?.[0] ?? PROPERTY_TYPE_FALLBACK[listing.propertyType] ?? PROPERTY_TYPE_FALLBACK.residential}
                      fallback={PROPERTY_TYPE_FALLBACK[listing.propertyType] ?? PROPERTY_TYPE_FALLBACK.residential}
                      alt={listing.title}
                    />
                    {tag && (
                      <div className="absolute top-5 left-5 px-4 py-1.5 bg-[#0eaa99] rounded-xl text-[10px] font-black uppercase tracking-widest text-white shadow-lg">
                        {tag}
                      </div>
                    )}
                    <div className={`absolute top-5 right-5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border bg-white/90 backdrop-blur-sm ${typeColour}`}>
                      {LISTING_TYPE_LABEL[listing.listingType] ?? listing.listingType}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-1 gap-4">
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-black text-slate-900 tracking-tight text-lg leading-tight">{listing.title}</h3>
                        <span className="text-lg font-black text-[#0eaa99] tracking-tighter whitespace-nowrap">{listing.price}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{[listing.city, listing.country].filter(Boolean).join(', ')}</span>
                      </div>
                    </div>

                    {/* Stats */}
                    {(beds !== null || baths !== null || sqft !== null) && (
                      <div className="flex items-center gap-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        {beds !== null && beds > 0 && <span className="flex items-center gap-1.5"><BedDouble className="w-4 h-4" />{beds}</span>}
                        {baths !== null && baths > 0 && <span className="flex items-center gap-1.5"><Bath className="w-4 h-4" />{baths}</span>}
                        {sqft !== null && sqft > 0 && <span className="flex items-center gap-1.5"><Square className="w-4 h-4" />{sqft.toLocaleString()} sqft</span>}
                      </div>
                    )}

                    {/* Category + verified */}
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${typeColour}`}>
                        {catLabel}
                      </span>
                      {listing.verified && (
                        <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-[#0eaa99]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> {t.listings.verified}
                        </span>
                      )}
                    </div>

                    {/* Seller */}
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300 mt-auto">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{listing.seller}</span>
                    </div>

                    {/* CTA */}
                    <Link
                      href={`/listings/${listing.id}`}
                      className="w-full py-3.5 bg-slate-950 text-white text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 hover:bg-[#0eaa99] transition-all duration-300"
                    >
                      {t.listings.viewListing} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
