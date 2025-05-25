import {Link, Outlet, useLocation} from 'react-router-dom';
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
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                      <div className="header__avatar-wrapper user__avatar-wrapper" />
                      <span className="header__user-name user__name">
                        Oliver.conner@gmail.com
                      </span>
                      <span className="header__favorite-count">3</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <Link className="header__nav-link" to={AppRoute.Login}>
                      <span className="header__signout">Sign out</span>
                    </Link>
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
          <Link className="footer__logo-link" to={AppRoute.Root}>
            <img
              className="footer__logo"
              src="img/logo.svg"
              alt="6 cities logo"
              width="64"
              height="33"
            />
          </Link>
        </footer>
      )}
    </div>
  );
}
