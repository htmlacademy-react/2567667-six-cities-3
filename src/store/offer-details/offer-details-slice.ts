import { createSlice } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer.ts';
import { fetchOfferById } from './offer-details-actions.ts';

type OfferDetailsState = {
  offer: Offer | null;
  isLoading: boolean;
  hasError: boolean;
};

const initialState: OfferDetailsState = {
  offer: null,
  isLoading: false,
  hasError: false,
};

const offerDetailsSlice = createSlice({
  name: 'offerDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferById.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOfferById.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOfferById.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      });
  },
});

export default offerDetailsSlice.reducer;
