import { DEFAULT_CITY } from '../const.ts';
import { createReducer } from '@reduxjs/toolkit';
import { setCity, setOffers } from './action.ts';
import {InitialState} from '../types/state.ts';

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export { reducer };
