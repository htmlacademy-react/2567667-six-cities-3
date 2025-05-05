import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>
          6 Cities - 404 Not Found Page
        </title>
      </Helmet>
      <main className="page__main page__main--index">
        <div className="container" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <h1 className="title" style={{ fontSize: '48px', marginBottom: '20px' }}>
            404 - Страница не найдена
          </h1>
          <p style={{ fontSize: '18px', marginBottom: '30px' }}>
            Похоже, такой страницы не существует.
          </p>
          <Link
            to="/"
            className="locations__item-link"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#4481c3',
              color: '#fff',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            Вернуться на главную
          </Link>
        </div>
      </main>
    </>
  );
}
