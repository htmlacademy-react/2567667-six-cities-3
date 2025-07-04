import { render, screen } from '@testing-library/react';
import EmptyOffers from './empty-offers';

describe('Component: EmptyOffers', () => {
  it('should render correctly with provided city name', () => {
    const cityName = 'Paris';

    render(<EmptyOffers cityName={cityName} />);

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(
      screen.getByText(`We could not find any property available at the moment in ${cityName}`)
    ).toBeInTheDocument();
  });
});
