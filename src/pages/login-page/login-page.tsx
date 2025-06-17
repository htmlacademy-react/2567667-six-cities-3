import {Helmet} from 'react-helmet-async';
import {Link, useNavigate } from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../store/auth-actions';
import { AppDispatch } from '../../store';

export default function LoginPage(){
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (email && password.trim()) {
      try {
        await dispatch(loginAction({ email, password })).unwrap();
        navigate(AppRoute.Root);
      } catch {
        alert('Login failed. Please check your credentials.');
      }
    }
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
            <form className="login__form form" onSubmit={(evt) => void handleSubmit(evt)}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Login}>
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
