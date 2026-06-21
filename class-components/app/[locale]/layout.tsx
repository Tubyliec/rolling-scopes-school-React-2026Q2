import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

import { SUPPORTED_LOCALES } from '@/i18n.config';
import ErrorBoundary from '@core/error-boundary/error-boundary';

interface LocalizedLayoutProps {
  readonly children: ReactNode;
  readonly params: Promise<{ locale: string }>;
}

export async function LocalizedLayout({
  children,
  params,
}: LocalizedLayoutProps): Promise<ReactNode> {
  const { locale } = await params;

  if (!SUPPORTED_LOCALES.includes(locale as never)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </NextIntlClientProvider>
  );
}

export default LocalizedLayout;

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}
