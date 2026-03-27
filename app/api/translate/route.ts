import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import type { Prisma } from '.prisma/client'
import { translateListing, type LanguageCode } from '@/lib/translate'

export async function POST(req: Request) {
  try {
    const { listingId, targetLanguages } = await req.json() as {
      listingId: string
      targetLanguages: LanguageCode[]
    }

    if (!listingId || !targetLanguages?.length) {
      return NextResponse.json(
        { error: 'listingId and targetLanguages are required' },
        { status: 400 }
      )
    }

    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
    })

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    const translations = await translateListing(
      listing.title,
      listing.description || '',
      targetLanguages
    )

    // Merge with existing translations
    const existingTranslations = (listing.translations as Record<string, unknown>) || {}
    const mergedTranslations = { ...existingTranslations, ...translations }

    await prisma.listing.update({
      where: { id: listingId },
      data: { translations: mergedTranslations as Prisma.InputJsonValue },
    })

    return NextResponse.json({ success: true, translations })
  } catch (error: unknown) {
    console.error('Translation API error:', error)
    const message = error instanceof Error ? error.message : 'Translation failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
