import OffersList from '../../components/offer-list/offer-list.tsx';
import { Helmet } from 'react-helmet-async';
import { Offer, Point } from '../../types/offer.ts';
import MainPageSort from '../../components/main-page-sort/main-page-sort.tsx';
import MainPageLocations from '../../components/main-page-locations/main-page-locations.tsx';
import Map from '../../components/map/map.tsx';
import { useState } from 'react';
import { handleOfferHover } from '../../components/map/map';

type MainPageProps = {
  offers: Offer[];
};

export default function MainPage({ offers }: MainPageProps) {
  const amsterdamOffers = offers.filter((offer) => offer.city.name === 'Amsterdam');
  const city = amsterdamOffers[0]?.city;

  const points: Point[] = amsterdamOffers.map((offer) => ({
    latitude: offer.location.latitude,
    longitude: offer.location.longitude,
    title: offer.title,
  }));

  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(undefined);

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
              <b className="places__found">{amsterdamOffers.length} places to stay in Amsterdam</b>
              <MainPageSort />

              <OffersList
                offers={amsterdamOffers}
                onOfferHover={(offer) => handleOfferHover(offer, points, setSelectedPoint)}
              />
            </section>

            <div className="cities__right-section">
              {city && points.length > 0 && (
                <Map city={city} points={points} selectedPoint={selectedPoint} />
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
