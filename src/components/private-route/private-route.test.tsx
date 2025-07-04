import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import authReducer from '../../store/auth/auth-slice';
import PrivateRoute from './private-route';

describe('Component: PrivateRoute', () => {
  const mockStoreAuth = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        authorizationStatus: AuthorizationStatus.Auth,
        userEmail: null,
      },
    },
  });

  const mockStoreNoAuth = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userEmail: null,
      },
    },
  });

  it('renders children when authenticated', () => {
    render(
      <Provider store={mockStoreAuth}>
        <MemoryRouter initialEntries={[AppRoute.Root]}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={
                <PrivateRoute>
                  <h1>Private Page</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Private Page')).toBeInTheDocument();
  });

  it('redirects to login when not authenticated', () => {
    render(
      <Provider store={mockStoreNoAuth}>
        <MemoryRouter initialEntries={[AppRoute.Favorites]}>
          <Routes>
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute>
                  <h1>Private Page</h1>
                </PrivateRoute>
              }
            />
            <Route path={AppRoute.Login} element={<h1>Login Page</h1>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
});
