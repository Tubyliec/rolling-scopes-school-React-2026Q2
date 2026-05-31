import { useContext } from 'react';

import type { ThemeContextValue } from '@core/theme/model/types/theme-context-value.ts';
import ThemeContext from '@core/theme/theme-context.tsx';

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
