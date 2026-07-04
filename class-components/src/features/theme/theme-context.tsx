'use client';

import { createContext, type JSX, useEffect, useState } from 'react';

import type { Theme } from './model/types/theme.type';
import type { ThemeContextValue } from './model/types/theme-context-value';
import type { ThemeProviderProps } from './model/types/theme-provider-props';

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
