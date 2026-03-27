import { NextResponse } from 'next/server'
import { AccessToken } from 'livekit-server-sdk'

export async function POST(req: Request) {
  try {
    const { roomName, participantName } = await req.json()

    if (!roomName || !participantName) {
      return NextResponse.json(
        { error: 'roomName and participantName are required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.LIVEKIT_API_KEY
    const apiSecret = process.env.LIVEKIT_API_SECRET

    if (!apiKey || !apiSecret) {
      return NextResponse.json(
        { error: 'LiveKit credentials not configured' },
        { status: 500 }
      )
    }

    const token = new AccessToken(apiKey, apiSecret, {
      identity: participantName,
      ttl: '2h',
    })

    token.addGrant({
      room: roomName,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
    })

    const jwt = await token.toJwt()

    return NextResponse.json({
      token: jwt,
      url: process.env.LIVEKIT_URL || 'wss://livekit.feendesk.com',
    })
  } catch (error: unknown) {
    console.error('LiveKit token error:', error)
    const message = error instanceof Error ? error.message : 'Token generation failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
