import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';

export default function Logo() {
  return (
    <Link className="header__logo-link" to={AppRoute.Root}>
      <img className="header__logo" src="/img/logo.svg" alt="Six Cities Logo" width="81" height="41"/>
    </Link>
  );
}
