export const MAIN_PAGE_ROUTE = 'main' as const;
export const ABOUT_PAGE_ROUTE = 'about' as const;

export const ROUTES = {
  main: `/${MAIN_PAGE_ROUTE}`,
  about: `/${ABOUT_PAGE_ROUTE}`,
} as const;
