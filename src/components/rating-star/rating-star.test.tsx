import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import RatingStar from './rating-star';

describe('Component: RatingStar', () => {
  it('renders input and label with correct props', () => {
    render(
      <RatingStar
        star={3}
        currentRating={3}
        onChange={() => {}}
        title="Good"
      />
    );

    const input = screen.getByRole('radio');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', '3-stars');
    expect(input).toHaveAttribute('value', '3');
    expect(input).toBeChecked();
    const label = screen.getByTitle('Good');
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe('LABEL');
  });

  it('calls onChange when input changes', () => {
    const handleChange = vi.fn();
    render(
      <RatingStar
        star={4}
        currentRating={2}
        onChange={handleChange}
        title="Very Good"
      />
    );
    const input = screen.getByRole('radio');
    fireEvent.click(input);
    expect(handleChange).toHaveBeenCalled();
  });

  it('disables input and does not call onChange when disabled', () => {
    const handleChange = vi.fn();
    render(
      <RatingStar
        star={2}
        currentRating={1}
        onChange={handleChange}
        title="Ok"
        disabled
      />
    );
    const input = screen.getByRole('radio');
    expect(input).toBeDisabled();
    fireEvent.click(input);
    expect(handleChange).not.toHaveBeenCalled();

    const label = screen.getByTitle('Ok');
    expect(label.className).toMatch(/disabled/);
  });

  it('input is not checked if currentRating !== star', () => {
    render(
      <RatingStar
        star={1}
        currentRating={3}
        onChange={() => {}}
        title="One star"
      />
    );
    const input = screen.getByRole('radio');
    expect(input).not.toBeChecked();
  });
});
