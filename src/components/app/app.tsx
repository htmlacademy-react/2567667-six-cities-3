import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute , AuthorizationStatus} from '../../const.ts';
import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page.tsx';
import LoginPage from '../../pages/login-page/login-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import OfferPage from '../../pages/offer-page/offer-page';
import PrivateRoute from '../private-route/private-route.tsx';
import {HelmetProvider} from 'react-helmet-async';
import Layout from '../layout/layout';
import {Offer} from '../../mocks/offers.ts';

type AppProps = {
  offers: Offer[];
};

export default function App({ offers }: AppProps) {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root} element={<Layout />}>
            <Route index element={<MainPage offers={offers} />} />
            <Route path={AppRoute.Favorites} element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <FavoritesPage offers={offers} />
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
