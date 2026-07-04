'use client';

import type { JSX } from 'react';

import Link from 'next/link';

import { useTranslations } from 'next-intl';

import { useTheme } from '@features/theme/use-theme';

import { LOCALE_DISPLAY_NAMES } from '@shared/constants/locale-display-names';
import { ROUTES } from '@shared/constants/route-constants';
import { THEME_ICONS } from '@shared/constants/theme-icons';

import { useLocalization } from '@/i18n/hooks/use-localization';
import { SUPPORTED_LOCALES } from '@/i18n/i18n.config';

import './header.scss';

function Header(): JSX.Element {
  const translation = useTranslations('navigation');
  const { theme, toggleTheme } = useTheme();
  const { locale, handleLanguageChange, getLocalizedPath } = useLocalization();

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
            {translation('about')}
          </Link>
          <button
            className="app-header__theme-toggle"
            onClick={toggleTheme}
            type="button"
          >
            {theme === 'dark' ? THEME_ICONS.SUN : THEME_ICONS.MOON}
          </button>
          <select
            className="app-header__language-select"
            value={locale}
            onChange={(e) => handleLanguageChange(e.target.value)}
          >
            {SUPPORTED_LOCALES.map((loc) => (
              <option key={loc} value={loc}>
                {LOCALE_DISPLAY_NAMES[loc as keyof typeof LOCALE_DISPLAY_NAMES]}
              </option>
            ))}
          </select>
        </nav>
      </div>
    </header>
  );
}

export default Header;
