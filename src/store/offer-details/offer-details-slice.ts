import { createSlice } from '@reduxjs/toolkit';
import { Offer, Review } from '../../types/offer.ts';
import { fetchOfferById } from './offer-details-actions.ts';
import { fetchReviewsByOfferId, postReview } from './offer-details-actions.ts';

type OfferDetailsState = {
  offer: Offer | null;
  isLoading: boolean;
  hasError: boolean;
  reviews: Review[];
  isReviewsLoading: boolean;
  postReviewError: string | null;
};

const initialState: OfferDetailsState = {
  offer: null,
  isLoading: false,
  hasError: false,
  reviews: [],
  isReviewsLoading: false,
  postReviewError: null,
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
    builder
      .addCase(fetchReviewsByOfferId.pending, (state) => {
        state.isReviewsLoading = true;
      })
      .addCase(fetchReviewsByOfferId.fulfilled, (state, action) => {
        state.isReviewsLoading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsByOfferId.rejected, (state) => {
        state.isReviewsLoading = false;
      });
    builder
      .addCase(postReview.pending, (state) => {
        state.isReviewsLoading = true;
        state.postReviewError = null;
      })
      .addCase(postReview.fulfilled, (state) => {
        state.isReviewsLoading = false;
        state.postReviewError = null;
      })
      .addCase(postReview.rejected, (state, action) => {
        state.isReviewsLoading = false;
        state.postReviewError = action.error.message || 'Failed to send review';
      });
  },
});

export default offerDetailsSlice.reducer;
