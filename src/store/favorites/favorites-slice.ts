import { createSlice } from '@reduxjs/toolkit';
import { toggleFavoriteStatus, fetchFavoriteOffers } from './favorites-actions';
import { Offer } from '../../types/offer';

type FavoritesState = {
  favorites: Offer[];
  isLoading: boolean;
};

const initialState: FavoritesState = {
  favorites: [],
  isLoading: false,
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

    builder.addCase(toggleFavoriteStatus.fulfilled, (state, action) => {
      const updatedOffer = action.payload;
      const index = state.favorites.findIndex((o) => o.id === updatedOffer.id);

      if (updatedOffer.isFavorite) {
        if (index === -1) {
          state.favorites.push(updatedOffer);
        } else {
          state.favorites[index] = updatedOffer;
        }
      } else {
        state.favorites = state.favorites.filter((o) => o.id !== updatedOffer.id);
      }
    });
  },
});

export default favoritesSlice.reducer;
