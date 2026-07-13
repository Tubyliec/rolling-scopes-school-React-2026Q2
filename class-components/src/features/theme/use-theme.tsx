'use client';

import { useContext } from 'react';

import type { ThemeContextValue } from './model/types/theme-context-value';

import ThemeContext from './theme-context';

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
