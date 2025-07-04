import { render, screen } from '@testing-library/react';
import OfferInsideList from './offer-inside-list';

describe('Component: offer-inside-list', () => {
  it('should render a list of goods', () => {
    const goods = ['Wi-Fi', 'Heating', 'Kitchen'];

    render(<OfferInsideList goods={goods} />);

    goods.forEach((good) => {
      expect(screen.getByText(good)).toBeInTheDocument();
    });

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(goods.length);
  });
});
