import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../../services/api';
import { loginAction, checkAuthAction, logoutAction } from './auth-actions';
import { makeMockStore, AppThunkDispatch } from '../../utils/mock-store';

describe('Auth async actions', () => {
  const api = createAPI();
  const mockApi = new MockAdapter(api);
  const store = makeMockStore(undefined, api);
  const dispatch: AppThunkDispatch = store.dispatch;

  beforeEach(() => {
    mockApi.reset();
  });

  it('should set auth on checkAuthAction success', async () => {
    mockApi.onGet('/login').reply(200, { token: 'abc', email: 'test@mail.com' });

    await dispatch(checkAuthAction());

    expect(store.getState().auth.authorizationStatus).toBe('AUTH');
    expect(store.getState().auth.userEmail).toBe('test@mail.com');
  });

  it('should set no auth on checkAuthAction fail', async () => {
    mockApi.onGet('/login').reply(401);

    await dispatch(checkAuthAction());

    expect(store.getState().auth.authorizationStatus).toBe('NO_AUTH');
    expect(store.getState().auth.userEmail).toBe(null);
  });

  it('should login correctly', async () => {
    mockApi.onPost('/login').reply(200, { token: 'token123', email: 'user@mail.com' });

    await dispatch(loginAction({ email: 'user@mail.com', password: '123456' }));

    expect(store.getState().auth.authorizationStatus).toBe('AUTH');
    expect(store.getState().auth.userEmail).toBe('user@mail.com');
  });

  it('should fail login with incorrect credentials', async () => {
    mockApi.onPost('/login').reply(400);

    const result = await dispatch(
      loginAction({ email: 'fail@mail.com', password: 'fail' })
    );

    expect(result.type).toBe('user/login/rejected');
    expect(store.getState().auth.authorizationStatus).toBe('NO_AUTH');
    expect(store.getState().auth.userEmail).toBe(null);
  });

  it('should logout and clear auth', async () => {
    mockApi.onDelete('/logout').reply(204);

    await dispatch(logoutAction());

    expect(store.getState().auth.authorizationStatus).toBe('NO_AUTH');
    expect(store.getState().auth.userEmail).toBe(null);
  });
});
