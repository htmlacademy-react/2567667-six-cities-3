import { Action } from '@reduxjs/toolkit';
import reducer from './reviews-slice';
import { fetchReviewsByOfferId, postReview } from '../offer-details/offer-details-actions';
import { mockReview } from '../../utils/mocks';

describe('reviewsSlice reducer', () => {
  const initialState = {
    reviews: [],
    isLoading: false,
    error: null,
  };

  it('should return initial state by default', () => {
    expect(reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(initialState);
  });

  it('should set isLoading true on fetchReviewsByOfferId.pending', () => {
    const state = reducer(initialState, { type: fetchReviewsByOfferId.pending.type });
    expect(state.isLoading).toBe(true);
  });

  it('should set reviews and isLoading false on fetchReviewsByOfferId.fulfilled', () => {
    const action = { type: fetchReviewsByOfferId.fulfilled.type, payload: [mockReview] };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.reviews).toEqual([mockReview]);
  });

  it('should set isLoading false on fetchReviewsByOfferId.rejected', () => {
    const state = reducer({ ...initialState, isLoading: true }, { type: fetchReviewsByOfferId.rejected.type });
    expect(state.isLoading).toBe(false);
  });

  it('should set isLoading true and clear error on postReview.pending', () => {
    const state = reducer({ ...initialState, error: 'Some error' }, { type: postReview.pending.type });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should set isLoading false and clear error on postReview.fulfilled', () => {
    const state = reducer({ ...initialState, isLoading: true, error: 'Old error' }, { type: postReview.fulfilled.type });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should set isLoading false and update error on postReview.rejected', () => {
    const errorMessage = 'Review failed';
    const action = {
      type: postReview.rejected.type,
      error: { message: errorMessage },
    } as Action & { error?: { message?: string } };
    const state = reducer({ ...initialState, isLoading: true }, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('should fallback to default error message if message is missing', () => {
    const action: Action & { error?: { message?: string } } = {
      type: postReview.rejected.type,
      error: {},
    };
    const state = reducer(initialState, action);
    expect(state.error).toBe('Failed to send review');
  });
});
