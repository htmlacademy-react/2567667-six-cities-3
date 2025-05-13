import { Offer } from '../../mocks/offers';

type OfferCardProps = {
  offer: Offer;
  cardType?: 'favorites' | 'cities';
};

export default function OfferCard({ offer, cardType = 'cities' }: OfferCardProps) {
  const articleClass = cardType === 'favorites' ? 'favorites__card place-card' : 'cities__card place-card';
  const imageWrapperClass = cardType === 'favorites'
    ? 'favorites__image-wrapper place-card__image-wrapper'
    : 'cities__image-wrapper place-card__image-wrapper';
  const imageWidth = cardType === 'favorites' ? 150 : 260;
  const imageHeight = cardType === 'favorites' ? 110 : 200;

  return (
    <article className={articleClass}>
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={imageWrapperClass}>
        <a href="#">
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={imageWidth}
            height={imageHeight}
            alt={offer.title}
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''}`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${(offer.rating / 5) * 100}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{offer.title}</a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}
