import type { Offer } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type NearPlacesListProps = {
  nearbyOffers: Offer[];
};

export default function NearPlacesList({ nearbyOffers }: NearPlacesListProps) {
  return (
    <div className="near-places__list places__list">
      {nearbyOffers.map((offer) => (
        <OfferCard offer={offer} key={offer.id} cardType="cities" />
      ))}
    </div>
  );
}
