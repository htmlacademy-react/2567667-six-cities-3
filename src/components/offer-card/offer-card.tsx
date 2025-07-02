import { Offer } from '../../types/offer.ts';
import {generatePath, Link, useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {getRatingWidth} from '../../utils/rating.ts';
import { memo, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavoriteStatus } from '../../store/favorites/favorites-actions.ts';
import { selectAuthorizationStatus, selectIsFavoritesUpdating } from '../../store/selectors.ts';
import { AppDispatch } from '../../store';
import BookmarkButton from '../bookmark-button/bookmark-button';

type OfferCardProps = {
  offer: Offer;
  cardType?: 'favorites' | 'cities';
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

function OfferCardComponent({
  offer: { id, isFavorite, isPremium, previewImage, price, rating, title, type },
  cardType = 'cities',
  onMouseEnter,
  onMouseLeave,
}: OfferCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const isUpdating = useSelector(selectIsFavoritesUpdating);

  const articleClass = useMemo(
    () => (cardType === 'favorites'
      ? 'favorites__card place-card'
      : 'cities__card place-card'),
    [cardType]
  );

  const imageWrapperClass = useMemo(
    () => (cardType === 'favorites'
      ? 'favorites__image-wrapper place-card__image-wrapper'
      : 'cities__image-wrapper place-card__image-wrapper'),
    [cardType]
  );

  const imageSize = useMemo(
    () => (cardType === 'favorites'
      ? { width: 150, height: 110 }
      : { width: 260, height: 200 }),
    [cardType]
  );

  const handleFavoriteClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }
    dispatch(toggleFavoriteStatus({ offerId: id, status: Number(!isFavorite) }));
  };

  return (
    <article
      className={articleClass}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={imageWrapperClass}>
        <Link to={generatePath(AppRoute.Offer, { id })}>
          <img
            className="place-card__image"
            src={previewImage}
            width={imageSize.width}
            height={imageSize.height}
            alt={title}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <BookmarkButton
            isActive={isFavorite}
            isDisabled={isUpdating}
            onClick={handleFavoriteClick}
            size="small"
            buttonClass="place-card__bookmark-button"
            iconClass="place-card__bookmark-icon"
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: getRatingWidth(rating) }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.Offer, { id })}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

const OfferCard = memo(OfferCardComponent);
export default OfferCard;
