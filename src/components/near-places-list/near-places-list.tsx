import type { Offer } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type NearPlacesListProps = {
  offers: Offer[];
};

export default function NearPlacesList({ offers }: NearPlacesListProps) {
  return (
    <div className="near-places__list places__list">
      {offers.map((offer) => (
        <OfferCard
          offer={offer}
          key={offer.id}
          cardType="cities"
        />
      ))}
    </div>
  );
}
