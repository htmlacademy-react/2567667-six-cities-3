import { memo } from 'react';

type OfferInsideListProps = {
  goods: string[];
};

function OfferInsideListComponent({ goods }: OfferInsideListProps) {
  return (
    <ul className="offer__inside-list">
      {goods.map((good) => (
        <li className="offer__inside-item" key={good}>{good}</li>
      ))}
    </ul>
  );
}

const OfferInsideList = memo(OfferInsideListComponent);
export default OfferInsideList;
