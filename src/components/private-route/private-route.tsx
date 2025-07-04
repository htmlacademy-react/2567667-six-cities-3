import { useSelector } from 'react-redux';
import { selectAuthorizationStatus } from '../../store/selectors';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {Navigate} from 'react-router-dom';

type PrivateRouteProps = {
  children: JSX.Element;
};

export default function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useSelector(selectAuthorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}
