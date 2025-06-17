import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, DEFAULT_CITY } from '../../const.ts';
import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page.tsx';
import LoginPage from '../../pages/login-page/login-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import OfferPage from '../../pages/offer-page/offer-page';
import PrivateRoute from '../private-route/private-route.tsx';
import { HelmetProvider } from 'react-helmet-async';
import Layout from '../layout/layout';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOffers } from '../../store/offers-actions.ts';
import { setCity } from '../../store/action.ts';
import { AppDispatch, RootState } from '../../store';
import Spinner from '../spinner/spinner';
import { checkAuthAction } from '../../store/auth-actions.ts';

export default function App() {
  const dispatch = useDispatch<AppDispatch>();

  const isLoading = useSelector((state: RootState) => state.offers.isLoading);

  useEffect(() => {
    dispatch(fetchOffers());
    dispatch(setCity(DEFAULT_CITY));
    dispatch(checkAuthAction());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root} element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                  <FavoritesPage />
                </PrivateRoute>
              }
            />
            <Route path={AppRoute.Offer} element={<OfferPage />} />
            <Route path={AppRoute.Login} element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage type="page" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
