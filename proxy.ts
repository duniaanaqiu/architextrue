import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { withAuth } from "next-auth/middleware";

export const proxy = withAuth(
  function proxy(request: NextRequest) {
    const host = request.headers.get('host');
    
    if (host && host.startsWith('www.architextrue.com')) {
      const url = request.nextUrl.clone();
      url.hostname = 'architextrue.com';
      return NextResponse.redirect(url, 301);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Protect /admin routes
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return !!token;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
