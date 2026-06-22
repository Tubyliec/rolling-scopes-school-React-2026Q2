import createMiddleware from 'next-intl/middleware';

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/i18n.config';

export const middleware = createMiddleware({
  locales: SUPPORTED_LOCALES as unknown as string[],
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'always',
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|favicon.ico|robots.txt|sitemap.xml).*)'],
};
