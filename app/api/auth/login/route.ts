import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

const ROLE_TO_SLUG: Record<string, string> = {
  PRIVATE_SELLER: 'private-seller',
  INDEPENDENT_REALTOR: 'independent-realtor',
  AGENCY_AGENT: 'agency-agent',
  PRIVATE_LANDLORD: 'private-landlord',
  PROPERTY_MANAGER: 'property-manager',
  LETTING_AGENT: 'letting-agent',
  LEGAL_AGENT: 'legal-agent',
  SURVEYOR: 'surveyor',
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })
    }

    const profile = await prisma.profile.findUnique({ where: { email: email.toLowerCase() } })

    if (!profile || !profile.password) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
    }

    const passwordMatch = await bcrypt.compare(password, profile.password)
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
    }

    const roleSlug = ROLE_TO_SLUG[profile.role] ?? 'private-seller'

    return NextResponse.json({ roleSlug }, { status: 200 })
  } catch (error) {
    console.error('[LOGIN API ERROR]', error)
    return NextResponse.json({ error: 'An unexpected error occurred. Please try again.' }, { status: 500 })
  }
}
