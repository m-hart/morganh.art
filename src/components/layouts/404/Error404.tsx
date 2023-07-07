import styles from './error.module.scss';

export default function Error404() {
  return (
    <div className={styles.container}>
      <p>404 not found</p>
    </div>
  );
}