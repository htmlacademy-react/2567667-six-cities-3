import { createSlice } from '@reduxjs/toolkit';
import { fetchOffers } from './offers-actions.ts';
import { Offer } from '../../types/offer.ts';

type OffersState = {
  offers: Offer[];
  isLoading: boolean;
  hasError: boolean;
};

const initialState: OffersState = {
  offers: [],
  isLoading: false,
  hasError: false,
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export default offersSlice.reducer;
