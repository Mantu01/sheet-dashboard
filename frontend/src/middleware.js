import { NextResponse } from 'next/server';

const publicRoutes = ['/login', '/signup'];
const protectedRoutes = ['/dashboard'];

export async function middleware(request) {
  const { pathname } = new URL(request.url);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.includes(pathname);
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
      credentials: 'include',
      headers: { cookie: request.headers.get('cookie') || '' }
    });

    const isAuthenticated = response.ok;
    if (isAuthenticated && isPublicRoute) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    if (!isAuthenticated && isProtectedRoute) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } catch (error) {
    console.error('Authentication check failed:', error);
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  return NextResponse.next();
}
export const config = {
  matcher: [...publicRoutes, ...protectedRoutes],
};
