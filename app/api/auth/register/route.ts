import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { UserRole } from '../../../../prisma/client'

export async function POST(req: Request) {
  try {
    const { 
      fullName, 
      email, 
      phone, 
      password, 
      role,
      legalCredentialUrl,
      identityDocUrl,
      identityType
    } = await req.json()

    if (!fullName || !email || !password || !role) {
      return NextResponse.json({ error: 'Full name, email, password, and account type are required.' }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })
    }

    // Check if profile with this email already exists
    const existing = await prisma.profile.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 })
    }

    // Validate role
    if (!Object.values(UserRole).includes(role as UserRole)) {
      return NextResponse.json({ error: 'Invalid account type selected.' }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Generate unique username from email
    const baseUsername = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '_')
    const username = `${baseUsername}_${Date.now()}`

    // Create profile
    const profile = await prisma.profile.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        phone: phone || null,
        username,
        role: role as UserRole,
        // Optional verification fields
        legalCredentialUrl: legalCredentialUrl || null,
        identityDocUrl: identityDocUrl || null,
        identityType: identityType || null,
        verificationStatus: role === 'LEGAL_AGENT' ? 'PENDING_REVIEW' : 'UNVERIFIED',
        isVerified: false
      }
    })

    return NextResponse.json({ success: true, profileId: profile.id }, { status: 201 })
  } catch (error) {
    console.error('[REGISTER API ERROR]', error)
    return NextResponse.json({ error: 'An unexpected error occurred. Please try again.' }, { status: 500 })
  }
}
