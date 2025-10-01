import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const accessToken = request.cookies.get('accessToken')?.value
  const isAdmin = request.cookies.get('isAdmin')?.value

  const isAuthenticated = accessToken || isAdmin

  if (pathname === '/' && isAuthenticated) {
    return NextResponse.redirect(new URL('/areas', request.url))
  }

  const protectedRoutes = ['/dashboard', '/areas', '/category', '/order', '/user']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/areas/:path*',
    '/category/:path*',
    '/order/:path*',
    '/user/:path*'
  ],
}
