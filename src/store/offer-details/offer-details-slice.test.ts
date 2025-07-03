import reducer from './offer-details-slice';
import { fetchOfferById } from './offer-details-actions';
import { toggleFavoriteStatus } from '../favorites/favorites-actions';
import { mockOffer } from '../../utils/mocks';

describe('offerDetailsSlice reducer', () => {
  const initialState = {
    offer: null,
    isLoading: false,
    hasError: false,
  };

  it('should return initial state by default', () => {
    expect(reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(initialState);
  });

  it('should set isLoading true on fetchOfferById.pending', () => {
    const state = reducer(initialState, { type: fetchOfferById.pending.type });
    expect(state.isLoading).toBe(true);
    expect(state.hasError).toBe(false);
  });

  it('should set offer and isLoading false on fetchOfferById.fulfilled', () => {
    const action = { type: fetchOfferById.fulfilled.type, payload: mockOffer };
    const state = reducer(initialState, action);
    expect(state.offer).toEqual(mockOffer);
    expect(state.isLoading).toBe(false);
  });

  it('should set hasError true on fetchOfferById.rejected', () => {
    const state = reducer(initialState, { type: fetchOfferById.rejected.type });
    expect(state.hasError).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  it('should update offer on toggleFavoriteStatus.fulfilled if ids match', () => {
    const modifiedOffer = { ...mockOffer, isFavorite: true };
    const stateWithOffer = {
      ...initialState,
      offer: mockOffer,
    };
    const state = reducer(stateWithOffer, {
      type: toggleFavoriteStatus.fulfilled.type,
      payload: modifiedOffer,
    });
    expect(state.offer).toEqual(modifiedOffer);
  });

  it('should not update offer on toggleFavoriteStatus.fulfilled if ids do not match', () => {
    const modifiedOffer = { ...mockOffer, id: 'another-id' };
    const stateWithOffer = {
      ...initialState,
      offer: mockOffer,
    };
    const state = reducer(stateWithOffer, {
      type: toggleFavoriteStatus.fulfilled.type,
      payload: modifiedOffer,
    });
    expect(state.offer).toEqual(mockOffer);
  });
});
