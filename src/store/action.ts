import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { AppThunk } from '../types/state';
import { offers as allOffers } from '../mocks/offers';

export const setCity = createAction<string>('offers/setCity');
export const setOffers = createAction<Offer[]>('offers/setOffers');

export const loadOffersByCity = (city: string): AppThunk => (dispatch) => {
  dispatch(setCity(city));

  const filtered = allOffers.filter((offer) => offer.city.name === city);
  dispatch(setOffers(filtered));
};
