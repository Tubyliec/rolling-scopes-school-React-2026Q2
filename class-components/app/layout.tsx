import type { ReactNode } from 'react';

import type { Metadata } from 'next';

import { RootLayoutProvider } from './root-layout-provider';

import './globals.scss';

export const metadata: Metadata = {
  title: 'Star Wars API Search',
  description: 'Search Star Wars characters using SWAPI API',
};

interface RootLayoutProps {
  readonly children: ReactNode;
  readonly params: Promise<{ locale: string }>;
}

export async function RootLayout({
  children,
  params,
}: RootLayoutProps): Promise<ReactNode> {
  const { locale } = await params;

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body>
        <RootLayoutProvider>{children}</RootLayoutProvider>
      </body>
    </html>
  );
}

export default RootLayout;
