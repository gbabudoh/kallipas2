'use server'

import prisma from '@/lib/prisma'
import { revalidatePath, unstable_noStore } from 'next/cache'
import { type GlobalSiteSettings } from '@/types/settings'

const DEFAULT_SETTINGS: GlobalSiteSettings = {
  heroTitle: 'Own Property, Anywhere.',
  heroSubtitle: 'The first global real estate platform with zero translation barriers, verified private sellers, and instant video walkthroughs.',
  heroImageUrl: '/hero-bg.jpg',
}

export async function getSiteSettings(): Promise<GlobalSiteSettings> {
  unstable_noStore();
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: 'global' },
    })

    if (!settings) {
      return DEFAULT_SETTINGS
    }

    return {
      heroTitle: settings.heroTitle,
      heroSubtitle: settings.heroSubtitle,
      heroImageUrl: settings.heroImageUrl,
    }
  } catch (error) {
    console.error('Failed to get site settings:', error)
    return DEFAULT_SETTINGS
  }
}

export async function updateSiteSettings(data: GlobalSiteSettings) {
  try {
    await prisma.siteSettings.upsert({
      where: { id: 'global' },
      update: data,
      create: {
        id: 'global',
        ...data,
      },
    })
    
    revalidatePath('/')
    
    return { success: true }
  } catch (error) {
    console.error('Failed to update site settings:', error)
    return { error: 'Failed to update settings' }
  }
}
