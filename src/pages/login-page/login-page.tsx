import {Helmet} from 'react-helmet-async';
import {Link, useNavigate } from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import { FormEvent, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../store/auth/auth-actions.ts';
import { AppDispatch } from '../../store';
import { setCity } from '../../store/offers/offers-slice.ts';
import { getRandomCity } from '../../utils/random-city.ts';

export default function LoginPage(){
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (email && password.trim()) {
      try {
        await dispatch(loginAction({ email, password })).unwrap();
        setTimeout(() => {
          navigate(AppRoute.Root);
        }, 500);
      } catch {
        setError('Invalid email or password. Please try again.');
      }
    }
  };

  const randomCity = useMemo(() => getRandomCity(), []);
  const handleCityClick = () => {
    dispatch(setCity(randomCity));
  };

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
            <form className="login__form form" action="#" method="post" onSubmit={(evt) => void handleSubmit(evt)}>
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
