import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MainPageLocations from './main-page-locations.tsx';
import { CITIES } from '../../const.ts';
import { MemoryRouter } from 'react-router-dom';

describe('Component: MainPageLocations', () => {
  it('renders all cities as links', () => {
    const mockOnCityChange = vi.fn();
    const selectedCity = CITIES[0];

    render(
      <MemoryRouter>
        <MainPageLocations selectedCity={selectedCity} onCityChange={mockOnCityChange} />
      </MemoryRouter>
    );

    CITIES.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });

  it('highlights the selected city with active class', () => {
    const mockOnCityChange = vi.fn();
    const selectedCity = CITIES[1];

    render(
      <MemoryRouter>
        <MainPageLocations selectedCity={selectedCity} onCityChange={mockOnCityChange} />
      </MemoryRouter>
    );

    const activeLink = screen.getByText(selectedCity).closest('a');
    expect(activeLink).toHaveClass('tabs__item--active');
  });

  it('calls onCityChange with the correct city when clicked', async () => {
    const user = userEvent.setup();
    const mockOnCityChange = vi.fn();
    const selectedCity = CITIES[0];

    render(
      <MemoryRouter>
        <MainPageLocations selectedCity={selectedCity} onCityChange={mockOnCityChange} />
      </MemoryRouter>
    );

    const cityToClick = CITIES[2];
    const link = screen.getByText(cityToClick);

    await user.click(link);

    expect(mockOnCityChange).toHaveBeenCalledTimes(1);
    expect(mockOnCityChange).toHaveBeenCalledWith(cityToClick);
  });
});
