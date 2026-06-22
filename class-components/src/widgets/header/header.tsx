'use client';

import type { JSX } from 'react';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { useLocale, useTranslations } from 'next-intl';

import { ROUTES } from '@shared/constants/route-constants';

import { SUPPORTED_LOCALES } from '@/i18n.config';

import './header.scss';

function Header(): JSX.Element {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('navigation');

  const handleLanguageChange = (newLocale: string): void => {
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  const getLocalizedPath = (path: string): string => {
    return `/${locale}${path}`;
  };

  return (
    <header className="app-header">
      <div className="header__wrapper wrapper">
        <Link href={getLocalizedPath(ROUTES.main)} className="app-header__logo">
          Star Wars API search
        </Link>
        <nav className="app-header__nav">
          <Link
            href={getLocalizedPath(ROUTES.about)}
            className="app-header__nav-link"
          >
            {t('about')}
          </Link>
          <select
            className="app-header__language-select"
            value={locale}
            onChange={(e) => handleLanguageChange(e.target.value)}
          >
            {SUPPORTED_LOCALES.map((loc) => (
              <option key={loc} value={loc}>
                {loc === 'be' ? 'БЕ' : 'EN'}
              </option>
            ))}
          </select>
        </nav>
      </div>
    </header>
  );
}

export default Header;
