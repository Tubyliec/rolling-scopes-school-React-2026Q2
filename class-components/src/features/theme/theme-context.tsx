'use client';

import { createContext, type JSX, useEffect, useState } from 'react';

import { APP_THEME } from '@shared/constants/theme-constants';

import type { Theme } from './model/types/theme.type';
import type { ThemeContextValue } from './model/types/theme-context-value';
import type { ThemeProviderProps } from './model/types/theme-provider-props';

const ThemeContext = createContext<ThemeContextValue | null>(null);

export default ThemeContext;

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
