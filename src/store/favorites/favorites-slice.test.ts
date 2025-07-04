import favoritesReducer from './favorites-slice';
import { toggleFavoriteStatus, fetchFavoriteOffers } from './favorites-actions';
import { Offer } from '../../types/offer';

describe('favoritesSlice reducer', () => {
  const offerOne = { id: '1', isFavorite: true } as Offer;
  const offerTwo = { id: '2', isFavorite: true } as Offer;

  const initialState = {
    favorites: [],
    isLoading: false,
    isUpdating: false,
  };

  it('should return initial state', () => {
    expect(favoritesReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(initialState);
  });

  it('should set isLoading true on fetchFavoriteOffers.pending', () => {
    const state = favoritesReducer(initialState, { type: fetchFavoriteOffers.pending.type });
    expect(state.isLoading).toBe(true);
  });

  it('should update favorites and set isLoading false on fetchFavoriteOffers.fulfilled', () => {
    const state = favoritesReducer(initialState, {
      type: fetchFavoriteOffers.fulfilled.type,
      payload: [offerOne],
    });
    expect(state.favorites).toEqual([offerOne]);
    expect(state.isLoading).toBe(false);
  });

  it('should set isLoading false on fetchFavoriteOffers.rejected', () => {
    const state = favoritesReducer(initialState, { type: fetchFavoriteOffers.rejected.type });
    expect(state.isLoading).toBe(false);
  });

  it('should set isUpdating true on toggleFavoriteStatus.pending', () => {
    const state = favoritesReducer(initialState, { type: toggleFavoriteStatus.pending.type });
    expect(state.isUpdating).toBe(true);
  });

  it('should add offer to favorites on toggleFavoriteStatus.fulfilled if not present', () => {
    const state = favoritesReducer(initialState, {
      type: toggleFavoriteStatus.fulfilled.type,
      payload: offerOne,
    });
    expect(state.favorites).toEqual([offerOne]);
    expect(state.isUpdating).toBe(false);
  });

  it('should update offer in favorites if already exists', () => {
    const preloadedState = {
      ...initialState,
      favorites: [offerOne],
    };
    const updatedOffer = { ...offerOne, isFavorite: true, title: 'Updated' };
    const state = favoritesReducer(preloadedState, {
      type: toggleFavoriteStatus.fulfilled.type,
      payload: updatedOffer,
    });
    expect(state.favorites[0]).toEqual(updatedOffer);
  });

  it('should remove offer from favorites if isFavorite is false', () => {
    const preloadedState = {
      ...initialState,
      favorites: [offerOne, offerTwo],
    };
    const unmarkedFavoriteOffer = { ...offerOne, isFavorite: false };
    const state = favoritesReducer(preloadedState, {
      type: toggleFavoriteStatus.fulfilled.type,
      payload: unmarkedFavoriteOffer,
    });
    expect(state.favorites).toEqual([offerTwo]);
    expect(state.isUpdating).toBe(false);
  });

  it('should set isUpdating false on toggleFavoriteStatus.rejected', () => {
    const state = favoritesReducer(initialState, {
      type: toggleFavoriteStatus.rejected.type,
    });
    expect(state.isUpdating).toBe(false);
  });
});
