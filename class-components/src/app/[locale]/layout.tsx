import type { ReactNode } from 'react';

import { notFound } from 'next/navigation';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import ErrorBoundary from '@features/error-boundary/error-boundary';

import { SUPPORTED_LOCALES } from '@/i18n/i18n.config';

import type { LocalizedLayoutProps } from '../model/types/localized-layout-props.type.ts';

export default async function LocalizedLayout({
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

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}
