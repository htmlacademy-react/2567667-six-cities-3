import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Review from '../../components/review/review';
import OfferGallery from '../../components/offer-gallery/offer-gallery';
import OfferInsideList from '../../components/offer-inside-list/offer-inside-list';
import NearPlacesList from '../../components/near-places-list/near-places-list';
import Map from '../../components/map/map.tsx';
import { getRatingWidth } from '../../utils/rating';
import { offers } from '../../mocks/offers';
import { mockReviews } from '../../mocks/reviews';
import NotFoundPage from '../not-found-page/not-found-page';
import { getPointsFromOffers, getPointFromOffer } from '../../components/map/map';

export default function OfferPage() {
  const { id } = useParams<{ id: string }>();
  const currentOffer = offers.find((offerItem) => offerItem.id === String(id));

  if (!currentOffer) {
    return <NotFoundPage type="offer" />;
  }

  const nearbyOffers = offers
    .filter((offerItem) =>
      offerItem.id !== id &&
      offerItem.city.name === currentOffer.city.name
    )
    .slice(0, 3);
  const currentPoint = getPointFromOffer(currentOffer);
  const allPoints = [...getPointsFromOffers(nearbyOffers), currentPoint];

  return (
    <>
      <Helmet>
        <title>6 Cities - Offer Page</title>
      </Helmet>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <OfferGallery images={currentOffer.images} />
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{currentOffer.title}</h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: getRatingWidth(currentOffer.rating) }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{currentOffer.type}</li>
                <li className="offer__feature offer__feature--bedrooms">{currentOffer.bedrooms} Bedrooms</li>
                <li className="offer__feature offer__feature--adults">Max {currentOffer.maxAdults} adults</li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <OfferInsideList goods={currentOffer.goods} />
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${currentOffer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img
                      className="offer__avatar user__avatar"
                      src={currentOffer.host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{currentOffer.host.name}</span>
                  {currentOffer.host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{currentOffer.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <Review isAuth reviews={mockReviews} />
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map city={currentOffer.city} points={allPoints} selectedPoint={currentPoint} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <NearPlacesList nearbyOffers={nearbyOffers} />
          </section>
        </div>
      </main>
    </>
  );
}
