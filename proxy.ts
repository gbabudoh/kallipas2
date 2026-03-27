import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Next.js 16 Proxy (formerly Middleware)
 * 
 * This function runs before every request.
 * The naming convention has changed from 'middleware.ts' to 'proxy.ts'.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function proxy(_request: NextRequest) {
  return NextResponse.next()
}

// Config to limit the proxy to specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - any file with an extension (e.g. .png, .jpg)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
}