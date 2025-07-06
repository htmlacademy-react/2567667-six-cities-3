import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchOffers } from './offers-actions.ts';
import { Offer } from '../../types/offer.ts';
import { DEFAULT_CITY, SortType } from '../../const';
import { toggleFavoriteStatus } from '../favorites/favorites-actions.ts';

export type OffersState = {
  offers: Offer[];
  isLoading: boolean;
  hasError: boolean;
  isServerUnavailable: boolean;
  city: string;
  sortType: SortType;
};

const initialState: OffersState = {
  offers: [],
  isLoading: false,
  hasError: false,
  isServerUnavailable: false,
  city: DEFAULT_CITY,
  sortType: SortType.Popular,
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
        state.isServerUnavailable = false;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offers = action.payload;
        state.isServerUnavailable = false;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
        state.isServerUnavailable = true;
      });
    builder.addCase(toggleFavoriteStatus.fulfilled, (state, action) => {
      const updatedOffer = action.payload;
      const index = state.offers.findIndex((offer) => offer.id === updatedOffer.id);
      if (index !== -1) {
        state.offers[index] = updatedOffer;
      }
    });
  },
});

export const { setCity, setSortType } = offersSlice.actions;
export default offersSlice.reducer;
