import { Outlet, useLocation } from 'react-router-dom';
import Logo from '../logo/logo.tsx';
import { AppRoute } from '../../const.ts';
import {layoutConfig} from './layout-utils.ts';

export default function Layout() {
  const { pathname } = useLocation();
  const config = layoutConfig[pathname as AppRoute] || layoutConfig[AppRoute.NotFound];
  const { rootClass = '', showUser, showFooter } = config;

  return (
    <div className={`page ${rootClass}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            {showUser && (
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper" />
                      <span className="header__user-name user__name">
                        Oliver.conner@gmail.com
                      </span>
                      <span className="header__favorite-count">3</span>
                    </a>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="#">
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </header>

      <Outlet />

      {showFooter && (
        <footer className="footer container">
          <a className="footer__logo-link" href="/">
            <img
              className="footer__logo"
              src="img/logo.svg"
              alt="6 cities logo"
              width="64"
              height="33"
            />
          </a>
        </footer>
      )}
    </div>
  );
}
