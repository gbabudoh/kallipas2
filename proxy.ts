import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Next.js 16 Proxy (formerly Middleware)
 * Consolidates all authentication and navigation guards.
 */
export function proxy(request: NextRequest) {
  const role = request.cookies.get('kallipas_role')?.value
  const { pathname } = request.nextUrl
  const searchParams = request.nextUrl.searchParams

  // 1. Skip all internal Next.js paths and static assets
  if (
    pathname.startsWith('/_next') || 
    pathname.includes('/api/') || 
    pathname === '/favicon.ico' ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // 2. Define Guest-Only routes
  const isGuestRoute = pathname === '/login' || pathname === '/register'
  
  // 3. Define Dashboard routes
  const isDashboardRoute = pathname.includes('/dashboard')

  // SAFETY VALVE: If ?force=true is present, always allow /login
  if (pathname === '/login' && searchParams.get('force') === 'true') {
    return NextResponse.next()
  }

  // LOGGED-IN REGION LOCK LOGIC:

  // A. If user is authenticated and tries to visit a guest route, lock them into their dashboard
  if (role && isGuestRoute) {
    // If they ARE on /login but want to switch, they can use ?force=true
    return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url))
  }

  // B. If user is NOT authenticated and tries to visit a dashboard route, force them to login
  if (!role && isDashboardRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // C. Prevent cross-role access and malformed dashboard URLs
  if (role && isDashboardRoute) {
    const segments = pathname.split('/').filter(Boolean)
    const roleInPath = segments[0]
    
    // Redirect if they are in the wrong role's dashboard area
    if (roleInPath && roleInPath !== role && roleInPath !== 'dashboard') {
      return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url))
    }
  }

  return NextResponse.next()
}

// Config specifies the scope of the proxy
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}