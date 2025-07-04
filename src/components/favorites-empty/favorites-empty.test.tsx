import { render, screen } from '@testing-library/react';
import FavoritesEmpty from './favorites-empty';
import { HelmetProvider } from 'react-helmet-async';

describe('Component: favorites-empty', () => {
  it('should render correctly', () => {
    render(
      <HelmetProvider>
        <FavoritesEmpty />
      </HelmetProvider>
    );

    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Save properties to narrow down search/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Favorites \(empty\)/i })
    ).toBeInTheDocument();
  });
});
