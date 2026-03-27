import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  try {
    // During migration, we'll use a fixed ID if session is not yet refactored to Prisma/NextAuth
    const tempUserId = "dev-user-001"
    const { listingId } = await req.json()

    // Verify listing exists in Prisma
    const listing = await prisma.listing.findUnique({
      where: { id: listingId }
    })

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Kallipas Property Listing Fee',
              description: 'Flat fee for listing on the global marketplace',
            },
            unit_amount: 2500, // $25.00
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/dashboard/listings/success?listingId=${listingId}`,
      cancel_url: `${req.headers.get('origin')}/dashboard/listings/new`,
      metadata: {
        listingId,
        userId: tempUserId
      }
    })

    return NextResponse.json({ sessionId: checkoutSession.id, url: checkoutSession.url })
  } catch (error: unknown) {
    console.error('Stripe error:', error)
    const message = error instanceof Error ? error.message : 'Payment initialization failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
