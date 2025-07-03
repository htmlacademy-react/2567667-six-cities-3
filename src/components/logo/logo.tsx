import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';

type LogoProps = {
  width?: number;
  height?: number;
  className?: string;
};

export default function Logo({ width = 81, height = 41, className = '' }: LogoProps) {
  return (
    <Link className={`header__logo-link ${className}`} to={AppRoute.Root}>
      <img
        className="header__logo"
        src="/img/logo.svg"
        alt="Six Cities Logo"
        width={width}
        height={height}
      />
    </Link>
  );
}
