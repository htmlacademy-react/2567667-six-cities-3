import { memo } from 'react';

type OfferInsideListProps = {
  goods: string[];
};

const OfferInsideList = ({ goods }: OfferInsideListProps) => (
  <ul className="offer__inside-list">
    {goods.map((good) => (
      <li className="offer__inside-item" key={good}>{good}</li>
    ))}
  </ul>
);

export default memo(OfferInsideList);
