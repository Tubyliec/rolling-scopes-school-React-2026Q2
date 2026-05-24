import type { JSX } from 'react';

import { NavLink } from 'react-router-dom';

import { useTheme } from '@core/theme/use-theme.tsx';

import './header.scss';

function Header(): JSX.Element {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="app-header">
      <div className="header__wrapper wrapper">
        <NavLink to="/main" className="app-header__logo">
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
          <button className="theme-toggle" onClick={toggleTheme} type="button">
            {theme === 'dark' ? '☀ Light' : '☾ Dark'}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
