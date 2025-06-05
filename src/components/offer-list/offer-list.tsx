import { Offer } from '../../types/offer.ts';
import OfferCard from '../offer-card/offer-card.tsx';

type OffersListProps = {
  offers: Offer[];
  onOfferHover: (offer: Offer | null) => void;
};

export default function OffersList({ offers, onOfferHover }: OffersListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          offer={offer}
          key={offer.id}
          onMouseEnter={() => onOfferHover(offer)}
          onMouseLeave={() => onOfferHover(null)}
        />
      ))}
    </div>
  );
}
