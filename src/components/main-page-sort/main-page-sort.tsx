import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { selectSortType } from '../../store/selectors';
import { setSortType } from '../../store/offers/offers-slice';
import { SortType, SORT_OPTIONS } from '../../const';
import { AppDispatch } from '../../store';

export default function MainPageSort() {
  const dispatch = useDispatch<AppDispatch>();
  const selectedSortType = useSelector(selectSortType);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: SortType) => {
    dispatch(setSortType(option));
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {SORT_OPTIONS.map((option: SortType) => (
          <li
            key={option}
            className={`places__option ${option === selectedSortType ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleSelect(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}
