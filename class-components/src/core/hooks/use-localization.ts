import { usePathname, useRouter } from 'next/navigation';

import { useLocale } from 'next-intl';

export function useLocalization() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (newLocale: string): void => {
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  const getLocalizedPath = (path: string): string => {
    return `/${locale}${path}`;
  };

  return {
    locale,
    handleLanguageChange,
    getLocalizedPath,
  };
}
