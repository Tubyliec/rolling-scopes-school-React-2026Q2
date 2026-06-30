import type { ReactNode } from 'react';

export type LocalizedLayoutProps = Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>;
