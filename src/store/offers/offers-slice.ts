import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchOffers } from './offers-actions.ts';
import { Offer } from '../../types/offer.ts';
import { DEFAULT_CITY, SortType } from '../../const';

type OffersState = {
  offers: Offer[];
  isLoading: boolean;
  hasError: boolean;
  city: string;
  sortType: SortType;
};

const initialState: OffersState = {
  offers: [],
  isLoading: false,
  hasError: false,
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

export const { setCity, setSortType } = offersSlice.actions;
export default offersSlice.reducer;
