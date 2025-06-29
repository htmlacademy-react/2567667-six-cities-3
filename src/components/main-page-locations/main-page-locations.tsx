import {AppRoute, CITIES} from '../../const.ts';
import {Link} from 'react-router-dom';
import { memo } from 'react';

type MainPageLocationsProps = {
  selectedCity: string;
  onCityChange: (city: string) => void;
};

const MainPageLocations = ({ selectedCity, onCityChange }: MainPageLocationsProps) => (
  <section className="locations container">
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => (
        <li className="locations__item" key={city}>
          <Link
            className={`locations__item-link tabs__item${city === selectedCity ? ' tabs__item--active' : ''}`}
            to={AppRoute.Root}
            onClick={(evt) => {
              evt.preventDefault();
              onCityChange(city);
            }}
          >
            <span>{city}</span>
          </Link>
        </li>
      ))}
    </ul>
  </section>
);

export default memo(MainPageLocations);
