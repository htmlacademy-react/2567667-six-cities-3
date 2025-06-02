import {AppRoute, CITIES} from '../../const.ts';
import {Link} from 'react-router-dom';

export default function MainPageLocations() {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CITIES.map((city) => (
          <li className="locations__item" key={city}>
            <Link
              className={`locations__item-link tabs__item${city === 'Amsterdam' ? ' tabs__item--active' : ''}`}
              to={AppRoute.Root}
            >
              <span>{city}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
