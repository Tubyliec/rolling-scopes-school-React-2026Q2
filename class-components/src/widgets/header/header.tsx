import { Component, type JSX } from 'react';
import './header.scss';

class Header extends Component {
  public render(): JSX.Element {
    return (
      <div className="header__wrapper wrapper">
        <header className="app-header">
          <p className="app-header__logo">Star Wars API search</p>
        </header>
      </div>
    );
  }
}

export default Header;
