import OffersList from '../../components/offer-list/offer-list.tsx';
import { Helmet } from 'react-helmet-async';
import { Point } from '../../types/offer.ts';
import MainPageSort from '../../components/main-page-sort/main-page-sort.tsx';
import MainPageLocations from '../../components/main-page-locations/main-page-locations.tsx';
import Map from '../../components/map/map.tsx';
import { useState } from 'react';
import { handleOfferHover } from '../../components/map/map';
import EmptyOffers from '../../components/empty-offers/empty-offers.tsx';
import { useSelector, useDispatch } from 'react-redux';
import { setCity } from '../../store/offers/offers-slice';
import { selectCity, selectSortedOffers, selectCityObject } from '../../store/selectors';
import { AppDispatch } from '../../store';

export default function MainPage() {
  const dispatch = useDispatch<AppDispatch>();

  const selectedCity = useSelector(selectCity);
  const offers = useSelector(selectSortedOffers);
  const city = useSelector(selectCityObject);

  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(undefined);
  const points: Point[] = offers.map((offer) => ({
    latitude: offer.location.latitude,
    longitude: offer.location.longitude,
    title: offer.title,
  }));

  return (
    <>
      <Helmet>
        <title>
          6 Cities - Main Page
        </title>
      </Helmet>
      <main className={`page__main page__main--index ${offers.length === 0 ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <MainPageLocations
            selectedCity={selectedCity}
            onCityChange={(newCity) => dispatch(setCity(newCity))}
          />
        </div>

        <div className="cities">
          {offers.length === 0 ? (
            <EmptyOffers cityName={selectedCity} />
          ) : (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {offers.length} places to stay in {selectedCity}
                </b>
                <MainPageSort />
                <OffersList
                  offers={offers}
                  onOfferHover={(offer) => handleOfferHover(offer, points, setSelectedPoint)}
                />
              </section>

              <div className="cities__right-section">
                {city && points.length > 0 && (
                  <Map city={city} points={points} selectedPoint={selectedPoint} />
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
