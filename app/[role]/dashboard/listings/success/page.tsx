import prisma from '@/lib/prisma'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, Home } from 'lucide-react'
import { getServerT } from '@/lib/i18n/server'

export default async function ListingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ listingId?: string }>
}) {
  const { listingId } = await searchParams
  const t = await getServerT()

  let listing = null
  if (listingId) {
    listing = await prisma.listing.findUnique({
      where: { id: listingId },
    })
  }

  return (
    <div className="min-h-full flex items-center justify-center py-20">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Success Animation */}
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
          <div className="relative w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center border-2 border-green-500/30">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-3">{t.listings.published}</h1>
          <p className="text-gray-400 text-lg">
            {t.listings.publishedDesc}
          </p>
        </div>

        {listing && (
          <div className="glass-card p-6 rounded-3xl text-left space-y-3">
            <h3 className="font-bold text-xl">{listing.title}</h3>
            <p className="text-gray-400 text-sm">
              {listing.city}{listing.country ? `, ${listing.country}` : ''}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-blue-500">
                {listing.currency} {Number(listing.price).toLocaleString()}
              </span>
              <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-green-500/10 text-green-500 uppercase tracking-widest">
                {listing.status}
              </span>
            </div>
          </div>
        )}

        <div className="p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10">
          <p className="text-sm text-blue-400">
            ✨ {t.listings.aiTranslationNotice}
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            href="/dashboard/listings"
            className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl transition-all"
          >
            <Home className="w-4 h-4" />
            {t.dashboard.myListings}
          </Link>
          {listing && (
            <Link
              href={`/listings/${listing.id}`}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20"
            >
              {t.listings.viewListing}
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
