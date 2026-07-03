'use client';

import { createContext, type JSX, useEffect, useState } from 'react';

import type { Theme } from '@core/theme/model/types/theme.type.ts';
import type { ThemeContextValue } from '@core/theme/model/types/theme-context-value.ts';
import type { ThemeProviderProps } from '@core/theme/model/types/theme-provider-props.ts';

const APP_THEME = {
  dark: 'dark',
  light: 'light',
} as const;

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleThemeValue = (prev: Theme): Theme =>
    prev === APP_THEME.dark ? APP_THEME.light : APP_THEME.dark;

  const toggleTheme = (): void => {
    setTheme(toggleThemeValue);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
