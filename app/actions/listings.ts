'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createListing(formData: {
  ownerId: string
  title: string
  description?: string
  price: number
  currency: string
  propertyType: 'residential' | 'commercial' | 'land' | 'industrial'
  listingType: string
  address?: string
  city?: string
  country?: string
  images: string[]
}) {
  try {
    // 1. Ensure the profile exists (for this dev phase/migration)
    const profile = await prisma.profile.upsert({
      where: { id: formData.ownerId },
      update: {},
      create: {
        id: formData.ownerId,
        fullName: 'Test User',
        role: 'private'
      }
    })

    // 2. Create the listing
    const listing = await prisma.listing.create({
      data: {
        ownerId: profile.id,
        title: formData.title,
        description: formData.description,
        price: formData.price,
        currency: formData.currency,
        propertyType: formData.propertyType,
        listingType: formData.listingType,
        address: formData.address,
        city: formData.city,
        country: formData.country,
        images: formData.images,
        status: 'draft',
        amenities: []
      }
    })

    revalidatePath('/dashboard')
    
    return { success: true, listingId: listing.id }
  } catch (error) {
    console.error('Prisma Error:', error)
    return { success: false, error: 'Failed to create listing' }
  }
}
