import {cities} from '../../const.ts';
import {Link} from 'react-router-dom';

export default function MainPageLocations() {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li className="locations__item" key={city}>
            <Link
              className={`locations__item-link tabs__item${city === 'Amsterdam' ? ' tabs__item--active' : ''}`}
              to="#"
            >
              <span>{city}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
