import { NextResponse } from 'next/server';

import createMiddleware from 'next-intl/middleware';

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/i18n/i18n.config';

import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: SUPPORTED_LOCALES as unknown as string[],
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'always',
});

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Redirect root to default locale
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
