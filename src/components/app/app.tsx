import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, DEFAULT_CITY } from '../../const.ts';
import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page.tsx';
import LoginPage from '../../pages/login-page/login-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import OfferPage from '../../pages/offer-page/offer-page';
import PrivateRoute from '../private-route/private-route.tsx';
import Layout from '../layout/layout';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOffers } from '../../store/offers/offers-actions.ts';
import { setCity } from '../../store/offers/offers-slice';
import { AppDispatch } from '../../store';
import Spinner from '../spinner/spinner';
import { checkAuthAction } from '../../store/auth/auth-actions.ts';
import {selectAuthorizationStatus, selectIsLoading, selectIsServerUnavailable} from '../../store/selectors.ts';
import ScrollToTop from '../scroll-to-top/scroll-to-top.tsx';
import ErrorPage from '../../pages/error-page/error-page';

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsLoading);
  const isServerUnavailable = useSelector(selectIsServerUnavailable);
  useEffect(() => {
    dispatch(fetchOffers());
    dispatch(setCity(DEFAULT_CITY));
    dispatch(checkAuthAction());
  }, [dispatch]);

  const authorizationStatus = useSelector(selectAuthorizationStatus);

  if (isLoading || authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }

  if (isServerUnavailable) {
    return <ErrorPage />;
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Offer} element={<OfferPage />} />
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage type="page" />} />
        </Route>
      </Routes>
    </>
  );
}
