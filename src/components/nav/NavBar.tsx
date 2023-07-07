import styles from './nav.module.scss';

interface NavBarProps {
  children: React.ReactNode;
}

export default function NavBar({ children }: NavBarProps) {
  return (
    <nav className={styles.bar}>
      <ul className={styles.barChildren}>
        {children}
      </ul>
    </nav>
  )
}