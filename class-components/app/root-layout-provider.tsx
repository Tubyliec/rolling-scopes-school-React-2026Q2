'use client';

import type { ReactNode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@core/theme/theme-context';
import { queryClient } from '@core/query/query-client';

interface RootLayoutProviderProps {
  readonly children: ReactNode;
}

export function RootLayoutProvider({
  children,
}: RootLayoutProviderProps): ReactNode {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  );
}
