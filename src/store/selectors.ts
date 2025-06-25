import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';
import { Offer } from '../types/offer';
import { SortType, AuthorizationStatus } from '../const';

export const selectOffers = (state: RootState): Offer[] => state.offers.offers;
export const selectCity = (state: RootState): string => state.city;
export const selectSortType = (state: RootState): SortType => state.sortType;

export const selectFilteredOffers = createSelector(
  [selectOffers, selectCity],
  (offers: Offer[], city: string): Offer[] =>
    offers.filter((offer) => offer.city.name === city)
);

export const selectCityObject = createSelector(
  [selectFilteredOffers],
  (filteredOffers) => filteredOffers[0]?.city ?? null
);

export const selectFavoriteOffers = createSelector(
  [selectOffers],
  (offers) => offers.filter((offer) => offer.isFavorite)
);

export const selectFavoritesGroupedByCity = createSelector(
  [selectFavoriteOffers],
  (favorites) =>
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

export const selectAuthorizationStatus = (state: RootState): AuthorizationStatus => state.auth.authorizationStatus;
export const selectIsLoading = (state: RootState): boolean => state.offers.isLoading;
export const selectIsReviewsLoading = (state: RootState): boolean => state.offerDetails.isReviewsLoading;
export const selectPostReviewError = (state: RootState): string | null => state.offerDetails.postReviewError;
export const selectNearbyOffers = (state: RootState): Offer[] => state.offerDetails.nearbyOffers;
export const selectIsNearbyOffersLoading = (state: RootState): boolean => state.offerDetails.isNearbyOffersLoading;
