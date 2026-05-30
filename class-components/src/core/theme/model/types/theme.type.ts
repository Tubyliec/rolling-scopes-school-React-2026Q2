export const APP_THEME = {
  dark: 'dark',
  light: 'light',
} as const;

export type Theme = keyof typeof APP_THEME;
