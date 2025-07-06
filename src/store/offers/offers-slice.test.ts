import reducer, { setCity, setSortType } from './offers-slice';
import { SortType, DEFAULT_CITY } from '../../const';

describe('offersSlice reducer', () => {
  const initialState = {
    offers: [],
    isLoading: false,
    hasError: false,
    isServerUnavailable: false,
    city: DEFAULT_CITY,
    sortType: SortType.Popular,
  };

  it('should return initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should set city', () => {
    const result = reducer(initialState, setCity('Amsterdam'));
    expect(result.city).toBe('Amsterdam');
  });

  it('should set sort type', () => {
    const result = reducer(initialState, setSortType(SortType.TopRatedFirst));
    expect(result.sortType).toBe(SortType.TopRatedFirst);
  });
});
