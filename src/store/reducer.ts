import { combineReducers } from '@reduxjs/toolkit';
import offersReducer from './offers/offers-slice.ts';
import offerDetailsReducer from './offer-details/offer-details-slice.ts';
import reviewsReducer from './reviews/reviews-slice.ts';
import nearbyOffersReducer from './nearby-offers/nearby-offers-slice.ts';
import authReducer from './auth/auth-slice.ts';
import favoritesReducer from './favorites/favorites-slice.ts';

export const reducer = combineReducers({
  offers: offersReducer,
  offerDetails: offerDetailsReducer,
  reviews: reviewsReducer,
  nearbyOffers: nearbyOffersReducer,
  auth: authReducer,
  favorites: favoritesReducer,
});
