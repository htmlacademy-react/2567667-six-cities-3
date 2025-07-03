import { useSelector, useDispatch } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import {layoutConfig} from './layout-utils.ts';
import Logo from '../logo/logo.tsx';
import { AppDispatch } from '../../store';
import { logoutAction } from '../../store/auth/auth-actions.ts';
import { selectFavoriteOffers, selectAuthorizationStatus, selectUserEmail } from '../../store/selectors.ts';
import styles from './layout.module.css';
import React from 'react';

export default function Layout() {
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const userEmail = useSelector(selectUserEmail);
  const favoriteOffersCount = useSelector(selectFavoriteOffers).length;
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

  const { rootClass = '', showUser, showFooter } = getLayoutConfig();

  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (pathname === AppRoute.Favorites) {
      dispatch(logoutAction()).then(() => {
        navigate(AppRoute.Login);
      });
    } else {
      dispatch(logoutAction());
    }
  };

  return (
    <div className={`page ${rootClass} ${styles.page}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo width={81} height={41} />
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
                          <span className="header__favorite-count">{favoriteOffersCount}</span>
                        </Link>
                      </li>
                      <li className="header__nav-item">
                        <Link className="header__nav-link" to={AppRoute.Root} onClick={handleLogout}>
                          <span className="header__signout">Sign out</span>
                        </Link>
                      </li>
                    </>
                  ) : (
                    <li className="header__nav-item user">
                      <Link
                        className="header__nav-link header__nav-link--profile"
                        to={AppRoute.Login}
                      >
                        <div className="header__avatar-wrapper user__avatar-wrapper" />
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
            <Logo width={64} height={33} />
          </Link>
        </footer>
      )}
    </div>
  );
}
