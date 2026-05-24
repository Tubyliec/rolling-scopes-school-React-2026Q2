import type { Theme } from '@core/theme/model/types/theme.type.ts';

export type ThemeContextValue = Readonly<{
  theme: Theme;
  toggleTheme: () => void;
}>;
