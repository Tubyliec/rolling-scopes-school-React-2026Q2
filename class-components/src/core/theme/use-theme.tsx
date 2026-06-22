'use client';

import { useContext } from 'react';

import ThemeContext from '@core/theme/theme-context.tsx';

import type { ThemeContextValue } from '@core/theme/model/types/theme-context-value.ts';

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
