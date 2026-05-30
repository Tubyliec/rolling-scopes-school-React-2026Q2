import { createContext, useState, useEffect, type JSX } from 'react';

import type { ThemeContextValue } from '@core/theme/model/types/theme-context-value.ts';
import type { Theme } from '@core/theme/model/types/theme.type.ts';
import type { ThemeProviderProps } from '@core/theme/model/types/theme-provider-props.ts';

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = (): void => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
