import { Offer } from '../../mocks/offers.ts';
import OfferCard from '../offer-card/offer-card.tsx';
import { useState } from 'react';

type OffersListProps = {
  offers: Offer[];
};

export default function OffersList({ offers }: OffersListProps) {
  const [ , setActiveOfferId] = useState<number | null>(null);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <article
          key={offer.id}
          onMouseEnter={() => setActiveOfferId(offer.id)}
          onMouseLeave={() => setActiveOfferId(null)}
        >
          <OfferCard offer={offer} />
        </article>
      ))}
    </div>
  );
}
