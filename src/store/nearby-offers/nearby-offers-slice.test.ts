import reducer from './nearby-offers-slice';
import { fetchNearbyOffers } from '../offer-details/offer-details-actions';
import { mockOffer } from '../../utils/mocks';

describe('nearbyOffersSlice reducer', () => {
  const initialState = {
    nearbyOffers: [],
    isLoading: false,
  };

  it('should return initial state by default', () => {
    expect(reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(initialState);
  });

  it('should set isLoading true on fetchNearbyOffers.pending', () => {
    const action = { type: fetchNearbyOffers.pending.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  it('should set nearbyOffers and isLoading false on fetchNearbyOffers.fulfilled', () => {
    const fakeOffers = [mockOffer];
    const action = { type: fetchNearbyOffers.fulfilled.type, payload: fakeOffers };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.nearbyOffers).toEqual(fakeOffers);
  });

  it('should set isLoading false on fetchNearbyOffers.rejected', () => {
    const action = { type: fetchNearbyOffers.rejected.type };
    const state = reducer({ ...initialState, isLoading: true }, action);
    expect(state.isLoading).toBe(false);
  });
});
