import type { JSX } from 'react';
import { NavLink } from 'react-router-dom';

import { AppRoute } from '@core/router/model/constants/app-route.ts';
import { useTheme } from '@core/theme/use-theme.tsx';

import './header.scss';

function Header(): JSX.Element {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="app-header">
      <div className="header__wrapper wrapper">
        <NavLink to={AppRoute.Main} className="app-header__logo">
          Star Wars API search
        </NavLink>
        <nav className="app-header__nav">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `app-header__nav-link${isActive ? ' app-header__nav-link--active' : ''}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/forms"
            className={({ isActive }) =>
              `app-header__nav-link${isActive ? ' app-header__nav-link--active' : ''}`
            }
          >
            Forms
          </NavLink>
          <button className="theme-toggle" onClick={toggleTheme} type="button">
            {theme === 'dark' ? '☀ Light' : '☾ Dark'}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
