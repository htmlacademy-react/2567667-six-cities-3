import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { AppThunk } from '../types/state';
import { offers as allOffers } from '../mocks/offers';
import { SortType } from '../const';

export const setCity = createAction<string>('offers/setCity');
export const setOffers = createAction<Offer[]>('offers/setOffers');
export const setSortType = createAction<SortType>('offers/setSortType');

export const loadOffers = (): AppThunk => (dispatch) => {
  dispatch(setOffers(allOffers));
};
