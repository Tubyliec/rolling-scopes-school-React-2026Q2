import { Component, type JSX } from 'react';
import './header.scss';

class Header extends Component {
  public render(): JSX.Element {
    return (
      <>
        <header className="app-header">
          <div className="app-header__logo">
            SWAPI<span className="app-header__logo-sub">/search</span>
          </div>
          <div className="app-header__tag">Star Wars API · v1</div>
        </header>
      </>
    );
  }
}

export default Header;
