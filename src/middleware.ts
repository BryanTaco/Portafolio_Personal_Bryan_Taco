// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });

  const isAuth = !!token;
  const isAuthPage = request.nextUrl.pathname.startsWith('/admin/login');
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin') && !isAuthPage;

  // Si está en página de login y ya está autenticado, redirigir a dashboard
  if (isAuthPage && isAuth) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // Si está en área admin y no está autenticado, redirigir a login
  if (isAdminPage && !isAuth) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};