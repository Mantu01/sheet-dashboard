import { NextResponse } from 'next/server';

const publicRoutes = ['/login', '/signup'];
const protectedRoutes = ['/dashboard'];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value || '';

  const isPublicPath = publicRoutes.includes(pathname);
  const isProtectedPath = protectedRoutes.includes(pathname);

  // If authenticated user tries to access login or signup, redirect to dashboard
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If unauthenticated user tries to access protected routes, redirect to login
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow access to all other routes for both authenticated and unauthenticated users
  return NextResponse.next();
}

export const config = {
  matcher: [...publicRoutes, ...protectedRoutes],
};