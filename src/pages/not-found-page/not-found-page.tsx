import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AppRoute } from '../../const.ts';
import styles from './not-found-page.module.css';

const variants = {
  page: { text: 'Похоже, такой страницы не существует.' },
  offer: { text: 'Похоже, такого оффера не существует.' },
};

type TNotFoundPageProps = {
  type: keyof typeof variants;
};

export default function NotFoundPage({type}: TNotFoundPageProps) {
  return (
    <>
      <Helmet>
        <title>
          6 Cities - 404 Not Found Page
        </title>
      </Helmet>
      <main className="page__main page__main--index">
        <div className={styles['not-found-container']}>
          <h1 className={styles['not-found-title']}>
            404 - Страница не найдена
          </h1>
          <p className={styles['not-found-text']}>
            {`Ooops! ${variants[type].text}`}
          </p>
          <Link
            to={AppRoute.Root}
            className={styles['not-found-link']}
          >
            Вернуться на главную
          </Link>
        </div>
      </main>
    </>
  );
}
