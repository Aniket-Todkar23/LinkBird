import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
export const runtime = 'nodejs';
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.') ||
    pathname.startsWith('/auth/')
  ) {
    return NextResponse.next()
  }

  try {
    const session = await auth.api.getSession({
      headers: request.headers
    })

    // Redirect unauthenticated users to login
    if (!session && pathname !== '/') {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    // Redirect authenticated users away from auth pages
    if (session && pathname.startsWith('/auth')) {
      return NextResponse.redirect(new URL('/auth/dashboard', request.url))
    }

    return NextResponse.next()
  } catch (error) {
    // If there's an error, redirect to login
    if (pathname !== '/' && !pathname.startsWith('/auth')) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}