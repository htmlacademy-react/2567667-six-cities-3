import { Offer } from '../../types/offer.ts';
import OfferCard from '../offer-card/offer-card.tsx';
import React, { useCallback } from 'react';

type OffersListProps = {
  offers: Offer[];
  onOfferHover: (offer: Offer | null) => void;
};

const OffersList = ({ offers, onOfferHover }: OffersListProps) => {
  const handleMouseEnter = useCallback(
    (offer: Offer) => () => onOfferHover(offer),
    [onOfferHover]
  );

  const handleMouseLeave = useCallback(
    () => onOfferHover(null),
    [onOfferHover]
  );

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onMouseEnter={handleMouseEnter(offer)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
};

OffersList.displayName = 'OffersList';
export default React.memo(OffersList);
