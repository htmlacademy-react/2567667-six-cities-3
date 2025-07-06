import { useDispatch } from 'react-redux';
import { fetchOffers } from '../../store/offers/offers-actions';
import styles from './error-page.module.css';
import type { AppDispatch } from '../../store';

export default function ErrorPage() {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Сервер временно недоступен</h1>
      <p className={styles.text}>
        Не удалось получить данные.<br />
        Попробуйте обновить страницу или повторите попытку позже.
      </p>
      <button
        className={styles.button}
        type="button"
        onClick={() => {
          dispatch(fetchOffers());
        }}
      >
        Повторить попытку
      </button>
    </div>
  );
}
