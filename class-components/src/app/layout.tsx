import type { ReactNode } from 'react';

import { APP_METADATA } from '@shared/constants/metadata-constants.ts';

import type { RootLayoutProps } from './model/types/root-layout-props.type.ts';

import { RootLayoutProvider } from './providers/root-layout-provider';

import './app.scss';

export const metadata = APP_METADATA;

export default function RootLayout({ children }: RootLayoutProps): ReactNode {
  return (
    <html data-scroll-behavior="smooth">
      <body>
        <RootLayoutProvider>{children}</RootLayoutProvider>
      </body>
    </html>
  );
}
