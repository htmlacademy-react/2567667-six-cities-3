import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import {fetchOfferById, fetchReviewsByOfferId, fetchNearbyOffers} from '../../store/offer-details/offer-details-actions.ts';
import OfferInsideList from '../../components/offer-inside-list/offer-inside-list';
import NearPlacesList from '../../components/near-places-list/near-places-list';
import Map from '../../components/map/map.tsx';
import Review from '../../components/review/review';
import NotFoundPage from '../not-found-page/not-found-page';
import { getPointFromOffer, getPointsFromOffers } from '../../components/map/map';
import { Offer } from '../../types/offer';
import Spinner from '../../components/spinner/spinner';
import {AuthorizationStatus} from '../../const.ts';
import {getRatingWidth} from '../../utils/rating.ts';
import {selectNearbyOffers, selectIsNearbyOffersLoading} from '../../store/selectors.ts';

export default function OfferPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const offer: Offer | null = useSelector((state: RootState) => state.offerDetails.offer);
  const hasError = useSelector((state: RootState) => state.offerDetails.hasError);
  const isLoading = useSelector((state: RootState) => state.offerDetails.isLoading);
  const reviews = useSelector((state: RootState) => state.offerDetails.reviews);
  const authorizationStatus = useSelector((state: RootState) => state.auth.authorizationStatus);
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;
  const nearbyOffers = useSelector(selectNearbyOffers).slice(0, 3);
  const isNearbyLoading = useSelector(selectIsNearbyOffersLoading);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferById(id));
      dispatch(fetchReviewsByOfferId(id));
      dispatch(fetchNearbyOffers(id));
    }
  }, [dispatch, id]);

  if (isLoading || isNearbyLoading) {
    return <Spinner />;
  }

  if (hasError || !offer) {
    return <NotFoundPage type="offer" />;
  }

  const currentPoint = getPointFromOffer(offer);
  const allPoints = [...getPointsFromOffers(nearbyOffers), currentPoint];

  return (
    <>
      <Helmet>
        <title>6 Cities - {offer.title}</title>
      </Helmet>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {(offer.images).slice(0, 6).map((src: string) => (
                <div className="offer__image-wrapper" key={src}>
                  <img className="offer__image" src={src} alt="Offer preview" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: getRatingWidth(offer.rating) }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{offer.type}</li>
                <li className="offer__feature offer__feature--bedrooms">{offer.bedrooms} Bedrooms</li>
                <li className="offer__feature offer__feature--adults">Max {offer.maxAdults} adults</li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <OfferInsideList goods={offer.goods} />
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${offer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img
                      className="offer__avatar user__avatar"
                      src={offer.host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{offer.host.name}</span>
                  {offer.host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{offer.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <Review isAuth={isAuth} reviews={reviews} offerId={offer.id} />
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map city={offer.city} points={allPoints} selectedPoint={currentPoint} />
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
