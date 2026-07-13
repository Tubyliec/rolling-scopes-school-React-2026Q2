import type { Theme } from './theme.type';

export type ThemeContextValue = Readonly<{
  theme: Theme;
  toggleTheme: () => void;
}>;
