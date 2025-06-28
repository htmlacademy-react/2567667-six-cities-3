import { createSlice } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer.ts';
import { fetchNearbyOffers } from '../offer-details/offer-details-actions.ts';

type NearbyOffersState = {
  nearbyOffers: Offer[];
  isLoading: boolean;
};

const initialState: NearbyOffersState = {
  nearbyOffers: [],
  isLoading: false,
};

const nearbyOffersSlice = createSlice({
  name: 'nearbyOffers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNearbyOffers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchNearbyOffers.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default nearbyOffersSlice.reducer;
