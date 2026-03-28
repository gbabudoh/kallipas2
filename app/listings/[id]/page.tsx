import Navbar from '@/components/navigation/navbar'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import {
  MapPin, BedDouble, Bath, Square, CheckCircle2,
  ArrowLeft, Tag, Video, MessageSquare, ChevronRight,
  Wifi, Car, Zap, ShieldCheck, CalendarDays,
} from 'lucide-react'
import ImageGallery from './_components/image-gallery'
import VideoTour from './_components/video-tour'
import MortgageCalculator from './_components/mortgage-calculator'
import EPCRating from './_components/epc-rating'
import SimilarListings from './_components/similar-listings'
import {
  MOCK_LISTINGS,
  PROPERTY_TYPE_COLOURS,
  PROPERTY_CATEGORIES,
  LISTING_TYPE_LABEL,
} from '../_data/mock-listings'
import {
  PROPERTY_TYPE_IMAGES,
  PROPERTY_TYPE_FALLBACK,
  getMockVideos,
  EPC_DEFAULTS,
} from '../_data/listing-media'

// ── Helpers ───────────────────────────────────────────────────────────────────

function extractNumericPrice(price: string): number {
  const n = parseFloat(price.replace(/[^0-9.]/g, ''))
  return isNaN(n) ? 0 : n
}

function extractCurrencySymbol(price: string): string {
  const match = price.match(/^[^0-9\s]+/)
  return match ? match[0].trim() : ''
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // Mock listing
  const mock = MOCK_LISTINGS.find((l) => l.id === id)
  if (mock) {
    const images = PROPERTY_TYPE_IMAGES[mock.propertyType] ?? PROPERTY_TYPE_IMAGES.residential
    const videos = getMockVideos(mock.propertyType, images[0])
    const epc    = EPC_DEFAULTS[mock.propertyType] ?? { current: 'D', potential: 'C' }

    return (
      <ListingView
        listing={{
          id: mock.id,
          title: mock.title,
          description: mock.description,
          address: mock.address,
          city: mock.city,
          country: mock.country,
          price: mock.price,
          numericPrice: extractNumericPrice(mock.price),
          currencySymbol: extractCurrencySymbol(mock.price),
          listingType: mock.listingType,
          propertyType: mock.propertyType,
          beds: mock.beds,
          baths: mock.baths,
          sqft: mock.sqft,
          tag: mock.tag,
          amenities: mock.amenities,
          verified: mock.verified,
          seller: mock.seller,
          sellerRole: 'Member',
          images,
          videos,
          epc,
          isMock: true,
        }}
      />
    )
  }

  // DB listing
  let dbListing
  try {
    dbListing = await prisma.listing.findUnique({
      where: { id },
      include: {
        owner: { select: { fullName: true, avatarUrl: true, isVerified: true, role: true } },
      },
    })
  } catch { /* DB unavailable */ }

  if (!dbListing) notFound()

  const amenities = Array.isArray(dbListing.amenities) ? dbListing.amenities as string[] : []
  const priceStr = `${dbListing.currency} ${Number(dbListing.price).toLocaleString()}`
  const images = PROPERTY_TYPE_IMAGES[dbListing.propertyType] ?? PROPERTY_TYPE_IMAGES.residential
  const videos = getMockVideos(dbListing.propertyType, images[0])
  const epc    = EPC_DEFAULTS[dbListing.propertyType] ?? { current: 'D', potential: 'C' }

  return (
    <ListingView
      listing={{
        id: dbListing.id,
        title: dbListing.title,
        description: dbListing.description ?? '',
        address: dbListing.address ?? '',
        city: dbListing.city ?? '',
        country: dbListing.country ?? '',
        price: priceStr,
        numericPrice: Number(dbListing.price),
        currencySymbol: dbListing.currency,
        listingType: dbListing.listingType,
        propertyType: dbListing.propertyType,
        beds: null,
        baths: null,
        sqft: null,
        tag: null,
        amenities,
        verified: dbListing.owner?.isVerified ?? false,
        seller: dbListing.owner?.fullName ?? 'Anonymous',
        sellerRole: dbListing.owner?.role ?? 'Member',
        images,
        videos,
        epc,
        isMock: false,
      }}
    />
  )
}

// ── Shared view ───────────────────────────────────────────────────────────────

type VideoItem = { id: string; label: string; duration: string; thumb: string; embedUrl?: string }
type EPCData   = { current: string; potential: string }

type ListingViewProps = {
  listing: {
    id: string
    title: string
    description: string
    address: string
    city: string
    country: string
    price: string
    numericPrice: number
    currencySymbol: string
    listingType: string
    propertyType: string
    beds: number | null
    baths: number | null
    sqft: number | null
    tag: string | null
    amenities: string[]
    verified: boolean
    seller: string
    sellerRole: string
    images: string[]
    videos: VideoItem[]
    epc: EPCData
    isMock: boolean
  }
}

function ListingView({ listing }: ListingViewProps) {
  const typeColour = PROPERTY_TYPE_COLOURS[listing.propertyType] ?? PROPERTY_TYPE_COLOURS.residential
  const catLabel   = PROPERTY_CATEGORIES[listing.propertyType] ?? listing.propertyType
  const typeLabel  = LISTING_TYPE_LABEL[listing.listingType] ?? listing.listingType
  const isSale     = listing.listingType === 'sale'

  const sellerRoleLabel = typeof listing.sellerRole === 'string'
    ? listing.sellerRole.replace(/_/g, ' ')
    : String(listing.sellerRole)

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />

      <main className="pt-28 pb-24 max-w-7xl mx-auto px-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8">
          <Link href="/listings" className="hover:text-[#0eaa99] transition-colors flex items-center gap-1.5">
            <ArrowLeft className="w-3 h-3" /> Listings
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-200" />
          <span className="text-slate-600 truncate max-w-xs">{listing.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Left column ─────────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Image gallery */}
            <ImageGallery
              images={listing.images}
              fallback={PROPERTY_TYPE_FALLBACK[listing.propertyType] ?? PROPERTY_TYPE_FALLBACK.residential}
              title={listing.title}
            />

            {/* Title block */}
            <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${typeColour}`}>
                  {catLabel}
                </span>
                <span className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${typeColour}`}>
                  {typeLabel}
                </span>
                {listing.tag && (
                  <span className="px-3 py-1 rounded-full bg-[#0eaa99] text-white text-[10px] font-black uppercase tracking-widest">
                    {listing.tag}
                  </span>
                )}
                {listing.verified && (
                  <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-[#0eaa99]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </span>
                )}
              </div>

              <h1 className="text-4xl font-black tracking-tight text-slate-900 italic mb-3 leading-tight">
                {listing.title}
              </h1>

              <div className="flex items-center gap-1.5 text-slate-400 text-sm font-bold">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>{[listing.address, listing.city, listing.country].filter(Boolean).join(', ')}</span>
              </div>

              {/* Stats row */}
              {(listing.beds !== null || listing.baths !== null || listing.sqft !== null) && (
                <div className="flex items-center gap-6 mt-6 pt-6 border-t border-slate-50 text-[11px] font-black uppercase tracking-widest text-slate-400">
                  {listing.beds !== null && listing.beds > 0 && (
                    <span className="flex items-center gap-2">
                      <BedDouble className="w-4 h-4 text-slate-300" />
                      {listing.beds} {listing.beds === 1 ? 'Bed' : 'Beds'}
                    </span>
                  )}
                  {listing.baths !== null && listing.baths > 0 && (
                    <span className="flex items-center gap-2">
                      <Bath className="w-4 h-4 text-slate-300" />
                      {listing.baths} {listing.baths === 1 ? 'Bath' : 'Baths'}
                    </span>
                  )}
                  {listing.sqft !== null && listing.sqft > 0 && (
                    <span className="flex items-center gap-2">
                      <Square className="w-4 h-4 text-slate-300" />
                      {listing.sqft.toLocaleString()} sqft
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Description */}
            {listing.description && (
              <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 mb-4">Description</p>
                <p className="text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">
                  {listing.description}
                </p>
              </div>
            )}

            {/* Video tour */}
            <VideoTour videos={listing.videos} thumb={listing.images[0]} />

            {/* Amenities */}
            {listing.amenities.length > 0 && (
              <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 mb-5">Features & Amenities</p>
                <div className="flex flex-wrap gap-2.5">
                  {listing.amenities.map((a) => (
                    <span
                      key={a}
                      className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-black uppercase tracking-widest text-slate-500"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Property details */}
            <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 mb-5">Property Details</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                <DetailCell label="Type"    value={catLabel} />
                <DetailCell label="Listing" value={typeLabel} />
                {listing.city    && <DetailCell label="City"    value={listing.city} />}
                {listing.country && <DetailCell label="Country" value={listing.country} />}
                {listing.sqft !== null && listing.sqft > 0 && (
                  <DetailCell label="Size" value={`${listing.sqft.toLocaleString()} sqft`} />
                )}
                {listing.beds !== null && listing.beds > 0 && (
                  <DetailCell label="Bedrooms"  value={String(listing.beds)} />
                )}
                {listing.baths !== null && listing.baths > 0 && (
                  <DetailCell label="Bathrooms" value={String(listing.baths)} />
                )}
              </div>
            </div>

            {/* Key info strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: ShieldCheck, label: 'Verified Listing', sub: listing.verified ? 'Yes' : 'Pending' },
                { icon: CalendarDays, label: 'Availability', sub: isSale ? 'Immediate' : 'Now' },
                { icon: Wifi, label: 'Virtual Tour', sub: 'Available' },
                { icon: Zap, label: 'EPC Rating', sub: listing.epc.current },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col gap-2">
                  <Icon className="w-4 h-4 text-[#0eaa99]" />
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{label}</p>
                  <p className="font-black text-slate-800 text-sm">{sub}</p>
                </div>
              ))}
            </div>

            {/* EPC */}
            {['residential', 'commercial', 'industrial', 'business', 'mixed_use', 'holiday'].includes(listing.propertyType) && (
              <EPCRating current={listing.epc.current} potential={listing.epc.potential} />
            )}

            {/* Map placeholder */}
            <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-50">
                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1">Location</p>
                <p className="font-black text-slate-900 tracking-tight">{[listing.address, listing.city, listing.country].filter(Boolean).join(', ')}</p>
              </div>
              <div className="h-56 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, #000 0, #000 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #000 0, #000 1px, transparent 1px, transparent 40px)',
                }} />
                <div className="relative text-center space-y-2">
                  <div className="w-10 h-10 bg-[#0eaa99] rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    {listing.city}{listing.country ? `, ${listing.country}` : ''}
                  </p>
                  <p className="text-[9px] font-bold text-slate-400">Full map available on request</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right column (sidebar) ───────────────────────────────────── */}
          <div className="space-y-5">

            {/* Price card */}
            <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1">
                {isSale ? 'Asking Price' : 'Rental Price'}
              </p>
              <p className="text-3xl font-black tracking-tight text-[#0eaa99] mb-3">{listing.price}</p>
              {isSale && listing.numericPrice > 0 && (
                <p className="text-[10px] font-bold text-slate-400">
                  Est. {listing.currencySymbol}{Math.round(listing.numericPrice * 0.8 / 12 / 25).toLocaleString()} /mo · 80% LTV · 5.5% APR
                </p>
              )}
            </div>

            {/* CTA card */}
            <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm space-y-5 sticky top-28">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 mb-3">Listed by</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#0eaa99]/10 flex items-center justify-center flex-shrink-0">
                    <Tag className="w-4 h-4 text-[#0eaa99]" />
                  </div>
                  <div>
                    <p className="font-black text-slate-900 tracking-tight">{listing.seller}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 capitalize">
                      {sellerRoleLabel}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 bg-slate-50 rounded-xl px-4 py-3">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0eaa99]" />
                Typically responds within 24 hrs
              </div>

              <div className="space-y-3">
                <button className="w-full py-3.5 bg-slate-950 hover:bg-[#0eaa99] text-white text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all duration-300">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Send Enquiry
                </button>
                <button className="w-full py-3.5 bg-white border border-slate-200 hover:border-[#0eaa99]/40 hover:text-[#0eaa99] text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all duration-300">
                  <Video className="w-3.5 h-3.5" />
                  Request Viewing
                </button>
                <button className="w-full py-3.5 bg-white border border-slate-200 hover:border-[#0eaa99]/40 hover:text-[#0eaa99] text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all duration-300">
                  <Car className="w-3.5 h-3.5" />
                  Book In-Person Visit
                </button>
              </div>

              <p className="text-[9px] font-bold text-slate-300 text-center leading-relaxed">
                By contacting, you agree to our Terms & Privacy Policy.
              </p>
            </div>

            {/* Mortgage calculator — only for sale listings */}
            {isSale && listing.numericPrice > 0 && (
              <MortgageCalculator
                askingPrice={listing.numericPrice}
                currency={listing.currencySymbol || '£'}
              />
            )}

            {/* Back */}
            <Link
              href="/listings"
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-[#0eaa99] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to all listings
            </Link>
          </div>
        </div>

        {/* Similar listings */}
        <SimilarListings
          currentId={listing.id}
          propertyType={listing.propertyType}
          country={listing.country}
        />
      </main>
    </div>
  )
}

function DetailCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{label}</p>
      <p className="font-black text-slate-700 tracking-tight capitalize">{value}</p>
    </div>
  )
}
