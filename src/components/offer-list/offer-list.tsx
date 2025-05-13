import { Offer } from '../../mocks/offers.ts';
import OfferCard from '../offer-card/offer-card.tsx';

type OffersListProps = {
  offers: Offer[];
};

export default function OffersList({ offers }: OffersListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
}
