import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  // Auth callback route - during migration, just redirect to onboarding
  return NextResponse.redirect(new URL('/onboarding', request.url))
}
