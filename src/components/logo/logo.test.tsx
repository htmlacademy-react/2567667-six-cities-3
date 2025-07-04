import { render, screen } from '@testing-library/react';
import Logo from './logo';
import { MemoryRouter } from 'react-router-dom';

describe('Component: logo', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );

    const image = screen.getByAltText(/Six Cities Logo/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/img/logo.svg');
    expect(image).toHaveAttribute('width', '81');
    expect(image).toHaveAttribute('height', '41');
  });
});
