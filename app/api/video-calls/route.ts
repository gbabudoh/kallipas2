import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET: List video calls for a user
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId') || 'dev-user-001'

    const calls = await prisma.videoCall.findMany({
      where: {
        OR: [
          { requesterId: userId },
          { ownerId: userId },
        ],
      },
      include: {
        listing: { select: { title: true, city: true, country: true, images: true } },
        requester: { select: { fullName: true, avatarUrl: true } },
        owner: { select: { fullName: true, avatarUrl: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ calls })
  } catch (error: unknown) {
    console.error('Video calls GET error:', error)
    const message = error instanceof Error ? error.message : 'Failed to fetch video calls'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// POST: Create a video call request
export async function POST(req: Request) {
  try {
    const { listingId, requesterId } = await req.json()

    if (!listingId) {
      return NextResponse.json({ error: 'listingId is required' }, { status: 400 })
    }

    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      select: { ownerId: true, title: true },
    })

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    const roomName = `call-${listingId.slice(0, 8)}-${Date.now()}`
    const callerId = requesterId || 'dev-user-001'

    const videoCall = await prisma.videoCall.create({
      data: {
        listingId,
        requesterId: callerId,
        ownerId: listing.ownerId,
        roomName,
        status: 'requested',
      },
    })

    return NextResponse.json({ success: true, videoCall })
  } catch (error: unknown) {
    console.error('Video call POST error:', error)
    const message = error instanceof Error ? error.message : 'Failed to create video call'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// PATCH: Accept or decline a video call
export async function PATCH(req: Request) {
  try {
    const { callId, action } = await req.json() as {
      callId: string
      action: 'accepted' | 'declined'
    }

    if (!callId || !action) {
      return NextResponse.json({ error: 'callId and action are required' }, { status: 400 })
    }

    const call = await prisma.videoCall.update({
      where: { id: callId },
      data: { status: action },
    })

    return NextResponse.json({ success: true, call })
  } catch (error: unknown) {
    console.error('Video call PATCH error:', error)
    const message = error instanceof Error ? error.message : 'Failed to update video call'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
