import { DEFAULT_CITY, SortType } from '../const.ts';
import { createReducer } from '@reduxjs/toolkit';
import { setCity, setOffers, setSortType } from './action.ts';
import {InitialState} from '../types/state.ts';

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: [],
  sortType: SortType.Popular,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setSortType, (state, action) => {
      state.sortType = action.payload;
    });
});

export { reducer };
