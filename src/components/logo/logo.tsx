import {Link} from 'react-router-dom';

export default function Logo() {
  return (
    <Link className="header__logo-link" to="/">
      <img className="header__logo" src="../../markup/img/logo.svg" alt="Six Cities Logo" width="81" height="41"/>
    </Link>
  );
}
