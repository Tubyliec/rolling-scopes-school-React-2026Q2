'use client';

import type { ReactNode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@core/query/query-client';
import { ThemeProvider } from '@core/theme/theme-context';

import type { RootLayoutProviderProps } from './model/types/root-layout-provider-props.type.ts';

export function RootLayoutProvider({
  children,
}: RootLayoutProviderProps): ReactNode {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  );
}
