import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { listingId, type, message, date, time } = await req.json()

    // In a real production app, we would:
    // 1. Get the current user from session
    // 2. Find the listing and its owner
    // 3. Create a Message or VideoCall record in the DB
    // 4. Send email/push notifications

    console.log(`[CONTACT API] New ${type} for listing ${listingId}:`, { message, date, time })

    // Simulate database latency
    await new Promise(r => setTimeout(r, 800))

    // Optional: If we have a listingId that exists in DB, we could actually save it
    // But for mock listings, we just return success
    
    return NextResponse.json({ 
      success: true, 
      message: 'Request received and transmitted successfully.' 
    })
  } catch (error) {
    console.error('[CONTACT API ERROR]', error)
    return NextResponse.json({ error: 'Failed to transmit request.' }, { status: 500 })
  }
}
