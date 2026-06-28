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
}

export default function RootLayout({ children }: RootLayoutProps): ReactNode {
  return (
    <html data-scroll-behavior="smooth">
      <body>
        <RootLayoutProvider>{children}</RootLayoutProvider>
      </body>
    </html>
  );
}
