import { Helmet } from 'react-helmet-async';
import OfferCard from '../../components/offer-card/offer-card';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import { useSelector } from 'react-redux';
import { selectFavoritesGroupedByCity } from '../../store/selectors';

export default function FavoritesPage() {
  const favoritesByCity = useSelector(selectFavoritesGroupedByCity);

  return (
    <>
      <Helmet>
        <title>
          6 Cities - Favorites
        </title>
      </Helmet>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(favoritesByCity).map(([city, cityOffers]) => (
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link className="locations__item-link" to={AppRoute.Favorites}>
                        <span>{city}</span>
                      </Link>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {cityOffers.map((offer) => (
                      <OfferCard key={offer.id} offer={offer} cardType="favorites" />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
