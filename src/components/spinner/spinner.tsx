import styles from './spinner.module.css';

export default function Spinner() {
  return (
    <div className={styles.container}>
      <div className={styles.circle} />
      <p className={styles.text}>Loading...</p>
    </div>
  );
}
