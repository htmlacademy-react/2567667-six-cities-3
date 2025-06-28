import { createSlice } from '@reduxjs/toolkit';
import { Review } from '../../types/offer.ts';
import { fetchReviewsByOfferId, postReview } from '../offer-details/offer-details-actions.ts';

type ReviewsState = {
  reviews: Review[];
  isLoading: boolean;
  error: string | null;
};

const initialState: ReviewsState = {
  reviews: [],
  isLoading: false,
  error: null,
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsByOfferId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchReviewsByOfferId.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchReviewsByOfferId.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(postReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postReview.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(postReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to send review';
      });
  },
});

export default reviewsSlice.reducer;
