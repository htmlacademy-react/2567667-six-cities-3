import { combineReducers, createReducer } from '@reduxjs/toolkit';
import offersReducer from './offers-slice';
import { setCity, setSortType } from './action';
import { DEFAULT_CITY, SortType } from '../const';
import offerDetailsReducer from './offer-details-slice';
import authReducer from './auth-slice';

const city = createReducer<string>(DEFAULT_CITY, (builder) => {
  builder.addCase(setCity, (_state, action) => action.payload);
});

const sortType = createReducer<SortType>(SortType.Popular, (builder) => {
  builder.addCase(setSortType, (_state, action) => action.payload);
});

export const reducer = combineReducers({
  offers: offersReducer,
  offerDetails: offerDetailsReducer,
  city,
  sortType,
  auth: authReducer
});
