import { Offer, Point } from '../../types/offer.ts';

export function findPointByOffer(offer: Offer, points: Point[]): Point | undefined {
  return points.find(
    (p) =>
      p.latitude === offer.location.latitude &&
      p.longitude === offer.location.longitude
  );
}

export function handleOfferHover(
  offer: Offer | null,
  points: Point[],
  setSelectedPoint: (point: Point | undefined) => void
): void {
  if (offer) {
    const point = findPointByOffer(offer, points);
    setSelectedPoint(point);
  } else {
    setSelectedPoint(undefined);
  }
}

export function getPointsFromOffers(offers: Offer[]): Point[] {
  return offers.map((offer) => ({
    latitude: offer.location.latitude,
    longitude: offer.location.longitude,
    title: offer.title,
  }));
}

export function getPointFromOffer(offer: Offer): Point {
  return {
    latitude: offer.location.latitude,
    longitude: offer.location.longitude,
    title: offer.title,
  };
}
