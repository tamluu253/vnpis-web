import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static assets, api routes, _next files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico|css|js|pdf|mp4|txt|xml)$/i)
  ) {
    return NextResponse.next();
  }

  // Handle .html extensions: 301 redirect to clean path or /blog
  if (pathname.endsWith('.html')) {
    const cleanPath = pathname.replace(/\.html$/, '');
    // If root .html or common page
    if (cleanPath === '/index' || cleanPath === '' || cleanPath === '/') {
      return NextResponse.redirect(new URL('/', request.url), 301);
    }
    if (cleanPath === '/about' || cleanPath === '/contact' || cleanPath === '/blog' || cleanPath === '/faq') {
      return NextResponse.redirect(new URL(cleanPath, request.url), 301);
    }
    return NextResponse.redirect(new URL('/blog', request.url), 301);
  }

  // Handle legacy category, tag, author, feed, wp-content paths
  if (
    pathname.startsWith('/category/') ||
    pathname.startsWith('/tag/') ||
    pathname.startsWith('/author/') ||
    pathname.startsWith('/feed') ||
    pathname.startsWith('/wp-content') ||
    pathname.startsWith('/wp-includes')
  ) {
    return NextResponse.redirect(new URL('/blog', request.url), 301);
  }

  // Handle legacy san-pham & dich-vu paths
  if (pathname.startsWith('/san-pham/')) {
    return NextResponse.redirect(new URL('/products', request.url), 301);
  }
  if (pathname.startsWith('/dich-vu/')) {
    return NextResponse.redirect(new URL('/services', request.url), 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
