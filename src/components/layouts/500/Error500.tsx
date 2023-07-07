import NavLink from '@/components/nav/NavLink';
import styles from './error.module.scss';

export default function Error500() {
  return (
    <div className={styles.container}>
      <p>500 something went wrong</p>
      <NavLink
        title='home'
        href='/'
        list={false}
      />
    </div>
  );
}