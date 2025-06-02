import OffersList from '../../components/offer-list/offer-list.tsx';
import { Helmet } from 'react-helmet-async';
import {Offer} from '../../types/offer.ts';
import MainPageSort from '../../components/main-page-sort/main-page-sort.tsx';
import MainPageLocations from '../../components/main-page-locations/main-page-locations.tsx';

type MainPageProps = {
  offers: Offer[];
};

export default function MainPage({ offers }: MainPageProps) {
  return (
    <>
      <Helmet>
        <title>
          6 Cities - Main Page
        </title>
      </Helmet>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <MainPageLocations />
        </div>

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in Amsterdam</b>
              <MainPageSort />

              <OffersList offers={offers} />
            </section>

            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
