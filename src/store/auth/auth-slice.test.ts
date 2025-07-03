import reducer, { setAuthorizationStatus, setUserEmail } from './auth-slice';
import { AuthorizationStatus } from '../../const';

describe('authSlice reducer', () => {
  const initialState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    userEmail: null,
  };

  it('should return initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should set authorization status', () => {
    const result = reducer(initialState, setAuthorizationStatus(AuthorizationStatus.Auth));
    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });

  it('should set user email', () => {
    const result = reducer(initialState, setUserEmail('test@mail.com'));
    expect(result.userEmail).toBe('test@mail.com');
  });

  it('should set user email to null', () => {
    const result = reducer({ ...initialState, userEmail: 'old@mail.com' }, setUserEmail(null));
    expect(result.userEmail).toBeNull();
  });
});
