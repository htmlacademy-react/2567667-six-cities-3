import {Link, Outlet, useLocation} from 'react-router-dom';
import Logo from '../logo/logo.tsx';
import { AppRoute, AuthorizationStatus } from '../../const.ts';
import {layoutConfig} from './layout-utils.ts';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { logoutAction } from '../../store/auth/auth-actions.ts';
import styles from './Layout.module.css';

export default function Layout() {
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { authorizationStatus, userEmail } = useSelector((state: RootState) => state.auth);
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;
  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return null;
  }

  const getLayoutConfig = () => {
    if (pathname.startsWith('/offer/')) {
      return layoutConfig[AppRoute.Offer];
    }
    return layoutConfig[pathname as AppRoute] || layoutConfig[AppRoute.NotFound];
  };
  const config = getLayoutConfig();
  const { rootClass = '', showUser, showFooter } = config;

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <div className={`page ${rootClass} ${styles.page}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            {showUser && (
              <nav className="header__nav">
                <ul className="header__nav-list">
                  {isAuth ? (
                    <>
                      <li className="header__nav-item user">
                        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                          <div className="header__avatar-wrapper user__avatar-wrapper" />
                          <span className="header__user-name user__name">{userEmail}</span>
                          <span className="header__favorite-count">3</span>
                        </Link>
                      </li>
                      <li className="header__nav-item">
                        <Link
                          className="header__nav-link"
                          to={AppRoute.Root}
                          onClick={() => {
                            handleLogout();
                          }}
                        >
                          <span className="header__signout">Sign out</span>
                        </Link>
                      </li>
                    </>
                  ) : (
                    <li className="header__nav-item user">
                      <Link className="header__nav-link" to={AppRoute.Login}>
                        <span className="header__login">Sign in</span>
                      </Link>
                    </li>
                  )}
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
