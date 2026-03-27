import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import prisma from '@/lib/prisma'
import type { Prisma } from '.prisma/client'
import { translateListing } from '@/lib/translate'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    if (!webhookSecret) {
      console.warn('STRIPE_WEBHOOK_SECRET not set, skipping signature verification')
      event = JSON.parse(body) as Stripe.Event
    } else {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
    }
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const listingId = session.metadata?.listingId
    const userId = session.metadata?.userId

    if (!listingId) {
      console.error('No listingId in session metadata')
      return NextResponse.json({ error: 'Missing listingId' }, { status: 400 })
    }

    try {
      // 1. Activate the listing
      const listing = await prisma.listing.update({
        where: { id: listingId },
        data: {
          status: 'active',
          expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
        },
      })

      // 2. Record the transaction
      await prisma.transaction.create({
        data: {
          listingId,
          userId: userId || null,
          amount: 25.00,
          currency: 'USD',
          provider: 'stripe',
          providerId: session.payment_intent as string,
          status: 'completed',
        },
      })

      // 3. Auto-translate listing to FR, ES, AR
      if (listing.title) {
        try {
          const translations = await translateListing(
            listing.title,
            listing.description || '',
            ['FR', 'ES', 'AR']
          )

          await prisma.listing.update({
            where: { id: listingId },
            data: { translations: translations as unknown as Prisma.InputJsonValue },
          })
        } catch (translationError) {
          console.error('Auto-translation failed:', translationError)
          // Non-blocking: listing is still activated even if translation fails
        }
      }

      console.log(`Listing ${listingId} activated and translated`)
    } catch (dbError) {
      console.error('Database update failed:', dbError)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}
