import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import OffersList from './offer-list.tsx';
import { mockOffer } from '../../utils/mocks';
import type { Offer } from '../../types/offer';

type OfferCardProps = {
  offer: Offer;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

vi.mock('../offer-card/offer-card', () => ({
  __esModule: true,
  default: ({ offer, onMouseEnter, onMouseLeave }: OfferCardProps) => (
    <div
      data-testid="offer-card"
      data-offer-id={offer.id}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {offer.title}
    </div>
  ),
}));

describe('Component: OffersList', () => {
  it('renders OfferCard for each offer', () => {
    render(<OffersList offers={[mockOffer, { ...mockOffer, id: 'offer-2', title: 'Second offer' }]} onOfferHover={() => {}} />);
    const cards = screen.getAllByTestId('offer-card');
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent(mockOffer.title);
    expect(cards[1]).toHaveTextContent('Second offer');
  });

  it('calls onOfferHover with offer on mouse enter and null on mouse leave', () => {
    const handleHover = vi.fn();
    render(<OffersList offers={[mockOffer]} onOfferHover={handleHover} />);
    const card = screen.getByTestId('offer-card');
    fireEvent.mouseEnter(card);
    expect(handleHover).toHaveBeenCalledWith(mockOffer);
    fireEvent.mouseLeave(card);
    expect(handleHover).toHaveBeenCalledWith(null);
  });

  it('renders nothing if offers is empty', () => {
    render(<OffersList offers={[]} onOfferHover={() => {}} />);
    expect(screen.queryByTestId('offer-card')).toBeNull();
  });
});
