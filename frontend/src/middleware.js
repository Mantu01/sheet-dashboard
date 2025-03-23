import { NextResponse } from 'next/server';

const publicRoutes = ['/login', '/signup'];
const protectedRoutes = ['/dashboard'];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value || '';
  const isPublicPath = publicRoutes.includes(pathname);
  const isProtectedPath = protectedRoutes.includes(pathname);
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: [...publicRoutes, ...protectedRoutes],
};