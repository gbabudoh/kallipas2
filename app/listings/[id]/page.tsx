import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { formatPrice } from '@/lib/currencies'
import { SUPPORTED_LANGUAGES } from '@/lib/translate'
import ListingActions from './listing-actions'
import {
  MapPin,
  Home,
  Tag,
  Calendar,
  CheckCircle2,
  Globe,
} from 'lucide-react'

interface TranslationData {
  title: string
  description: string
}

export default async function ListingDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ lang?: string }>
}) {
  const { id } = await params
  const { lang } = await searchParams

  const listing = await prisma.listing.findUnique({
    where: { id },
    include: {
      owner: { select: { fullName: true, avatarUrl: true, isVerified: true, role: true } },
    },
  })

  if (!listing) {
    notFound()
  }

  const translations = (listing.translations as unknown as Record<string, TranslationData>) || {}
  const activeLang = lang || 'EN'
  const translated = translations[activeLang]

  const displayTitle = translated?.title || listing.title
  const displayDescription = translated?.description || listing.description

  const availableLanguages = SUPPORTED_LANGUAGES.filter(
    l => l.code === 'EN' || translations[l.code]
  )

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Hero Image Gallery */}
      <div className="relative h-[50vh] bg-gray-900">
        {listing.images.length > 0 ? (
          <div className="grid grid-cols-2 h-full gap-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={listing.images[0]}
              alt={displayTitle}
              className="w-full h-full object-cover col-span-2 md:col-span-1"
            />
            {listing.images.length > 1 && (
              <div className="hidden md:grid grid-rows-2 gap-1">
                {listing.images.slice(1, 3).map((img, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={img} alt="" className="w-full h-full object-cover" />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-900/50">
            <Home className="w-20 h-20 text-gray-700" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Language Selector */}
            {availableLanguages.length > 1 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Globe className="w-4 h-4 text-gray-400" />
                {availableLanguages.map((l) => (
                  <a
                    key={l.code}
                    href={`/listings/${id}?lang=${l.code}`}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      activeLang === l.code
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    {l.flag} {l.name}
                  </a>
                ))}
              </div>
            )}

            {/* Title & Location */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-blue-500/10 text-blue-500 uppercase tracking-widest">
                  {listing.propertyType}
                </span>
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-green-500/10 text-green-500 uppercase tracking-widest">
                  For {listing.listingType}
                </span>
                {listing.owner?.isVerified && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-green-500">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-bold mb-4">{displayTitle}</h1>
              {listing.city && (
                <p className="flex items-center gap-2 text-gray-400 text-lg">
                  <MapPin className="w-5 h-5" />
                  {listing.city}{listing.country ? `, ${listing.country}` : ''}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="glass-card rounded-3xl p-6">
              <p className="text-sm text-gray-400 mb-1 font-bold italic">Price</p>
              <p className="text-4xl font-bold text-blue-500">
                {formatPrice(Number(listing.price), listing.currency)}
              </p>
            </div>

            {/* Description */}
            <div className="glass-card rounded-3xl p-6">
              <h3 className="text-xl font-bold mb-4">Description</h3>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {displayDescription || 'No description provided.'}
              </p>
              {translated && activeLang !== 'EN' && (
                <p className="text-xs text-gray-500 mt-4 italic">
                  🌐 Auto-translated to {availableLanguages.find(l => l.code === activeLang)?.name}
                </p>
              )}
            </div>

            {/* Details */}
            <div className="glass-card rounded-3xl p-6">
              <h3 className="text-xl font-bold mb-4">Details</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-400 italic">Type</p>
                  <p className="font-bold capitalize">{listing.propertyType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 italic">Listing</p>
                  <p className="font-bold capitalize">{listing.listingType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 italic">Status</p>
                  <p className="font-bold capitalize">{listing.status}</p>
                </div>
                {listing.address && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-400 italic">Address</p>
                    <p className="font-bold">{listing.address}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-400 italic">Listed</p>
                  <p className="font-bold flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(listing.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Seller Card */}
            <div className="glass-card rounded-3xl p-6 sticky top-24">
              <h3 className="text-lg font-bold mb-4">Seller</h3>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                  <Tag className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-bold">{listing.owner?.fullName || 'Anonymous'}</p>
                  <p className="text-xs text-gray-400 capitalize">{listing.owner?.role || 'User'}</p>
                </div>
              </div>

              <ListingActions listingId={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
