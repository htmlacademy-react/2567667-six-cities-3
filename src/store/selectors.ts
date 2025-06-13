import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';
import { Offer } from '../types/offer';

export const selectOffers = (state: RootState) => state.offers;
export const selectCity = (state: RootState) => state.city;

export const selectFilteredOffers = createSelector(
  [selectOffers, selectCity],
  (offers: Offer[], city: string) =>
    offers.filter((offer) => offer.city.name === city)
);

export const selectCityObject = createSelector(
  [selectOffers, selectCity],
  (offers, cityName) =>
    offers.find((offer) => offer.city.name === cityName)?.city ?? null
);

export const selectFavoriteOffers = createSelector(
  [selectOffers],
  (offers: Offer[]) => offers.filter((offer) => offer.isFavorite)
);

export const selectFavoritesGroupedByCity = createSelector(
  [selectFavoriteOffers],
  (favorites: Offer[]) =>
    favorites.reduce<Record<string, Offer[]>>((acc, offer) => {
      const cityName = offer.city.name;
      if (!acc[cityName]) {
        acc[cityName] = [];
      }
      acc[cityName].push(offer);
      return acc;
    }, {})
);
