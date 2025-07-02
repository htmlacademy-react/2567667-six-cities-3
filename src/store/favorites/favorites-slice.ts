import { createSlice } from '@reduxjs/toolkit';
import { toggleFavoriteStatus, fetchFavoriteOffers } from './favorites-actions';
import { Offer } from '../../types/offer';

type FavoritesState = {
  favorites: Offer[];
  isLoading: boolean;
  isUpdating: boolean;
};

const initialState: FavoritesState = {
  favorites: [],
  isLoading: false,
  isUpdating: false,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteOffers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFavoriteOffers.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFavoriteOffers.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(toggleFavoriteStatus.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(toggleFavoriteStatus.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        const offerIndex = state.favorites.findIndex(
          (offer) => offer.id === updatedOffer.id
        );
        if (updatedOffer.isFavorite) {
          if (offerIndex === -1) {
            state.favorites.push(updatedOffer);
          } else {
            state.favorites[offerIndex] = updatedOffer;
          }
        } else {
          state.favorites = state.favorites.filter(
            (offer) => offer.id !== updatedOffer.id
          );
        }
        state.isUpdating = false;
      })
      .addCase(toggleFavoriteStatus.rejected, (state) => {
        state.isUpdating = false;
      });
  },
});

export default favoritesSlice.reducer;
