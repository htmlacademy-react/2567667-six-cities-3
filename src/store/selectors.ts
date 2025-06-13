import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';
import { Offer } from '../types/offer';
import { SortType } from '../const';

export const selectOffers = (state: RootState) => state.offers;
export const selectCity = (state: RootState) => state.city;
export const selectSortType = (state: RootState) => state.sortType;

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

export const selectSortedOffers = createSelector(
  [selectFilteredOffers, selectSortType],
  (offers: Offer[], sortType: SortType): Offer[] => {
    switch (sortType) {
      case SortType.PriceLowToHigh:
        return [...offers].sort((offerA, offerB) => offerA.price - offerB.price);
      case SortType.PriceHighToLow:
        return [...offers].sort((offerA, offerB) => offerB.price - offerA.price);
      case SortType.TopRatedFirst:
        return [...offers].sort((offerA, offerB) => offerB.rating - offerA.rating);
      default:
        return offers;
    }
  }
);

