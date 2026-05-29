import { NextRequest, NextResponse } from 'next/server';

// Edge runtime for Cloudflare Pages compatibility
export const runtime = 'experimental-edge';

// Simple pass-through middleware — auth logic is handled by AdminGate component
// and API route guards. This file exists primarily to satisfy @cloudflare/next-on-pages
// requirement that all middleware runs on edge runtime.
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|json|txt)$).*)',
  ],
};
