import {Helmet} from 'react-helmet-async';
import { Link, Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const.ts';
import { FormEvent, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../store/auth/auth-actions.ts';
import { AppDispatch } from '../../store';
import { setCity } from '../../store/offers/offers-slice.ts';
import { getRandomCity } from '../../utils/random-city.ts';
import { selectAuthorizationStatus } from '../../store/selectors.ts';

export default function LoginPage(){
  const dispatch = useDispatch<AppDispatch>();
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const randomCity = useMemo(() => getRandomCity(), []);
  const handleCityClick = () => {
    dispatch(setCity(randomCity));
  };
  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (email && password.trim()) {
      try {
        await dispatch(loginAction({ email, password })).unwrap();
      } catch {
        setError('Invalid email or password. Please try again.');
      }
    }
  };

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Root} />;
  }

  return (
    <>
      <Helmet>
        <title>
          6 Cities - Login
        </title>
      </Helmet>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            {error && (
              <p className="login__error" style={{ color: 'red', marginBottom: '15px' }}>
                {error}
              </p>
            )}
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={(evt) => void handleSubmit(evt)}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(evt) => setEmail(evt.target.value)}
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(evt) => setPassword(evt.target.value)}
                  required
                  minLength={2}
                  pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$"
                  title="Пароль должен содержать хотя бы одну латинскую букву и одну цифру"
                />
              </div>
              <button className="login__submit form__submit button" type="submit">
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={AppRoute.Root}
                onClick={handleCityClick}
              >
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
