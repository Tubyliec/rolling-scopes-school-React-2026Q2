import { getRequestConfig } from 'next-intl/server';

import { SUPPORTED_LOCALES } from '@/i18n.config';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) || 'en';

  if (!SUPPORTED_LOCALES.includes(locale as never)) {
    return {
      locale: 'en',
    };
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});