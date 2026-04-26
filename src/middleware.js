import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes EXCEPT /admin (login page)
  if (pathname.startsWith('/admin') && pathname !== '/admin') {
    const adminAuth = request.cookies.get('admin_auth');
    if (!adminAuth || adminAuth.value !== 'true') {
      const loginUrl = new URL('/admin', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
