import { Offer } from '../../types/offer.ts';
import {generatePath, Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import {getRatingWidth} from '../../utils/rating.ts';
import React, { useMemo } from 'react';

type OfferCardProps = {
  offer: Offer;
  cardType?: 'favorites' | 'cities';
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const OfferCard = React.memo(({
  offer: { id, isFavorite, isPremium, previewImage, price, rating, title, type },
  cardType = 'cities',
  onMouseEnter,
  onMouseLeave,
}: OfferCardProps) => {
  const articleClass = useMemo(
    () => cardType === 'favorites' ? 'favorites__card place-card' : 'cities__card place-card',
    [cardType]
  );

  const imageWrapperClass = useMemo(
    () => cardType === 'favorites'
      ? 'favorites__image-wrapper place-card__image-wrapper'
      : 'cities__image-wrapper place-card__image-wrapper',
    [cardType]
  );

  const imageSize = useMemo(
    () => cardType === 'favorites'
      ? { width: 150, height: 110 }
      : { width: 260, height: 200 },
    [cardType]
  );

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
          <button
            className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
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
});

OfferCard.displayName = 'OfferCard';

export default OfferCard;
