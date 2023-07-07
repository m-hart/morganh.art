import styles from './containers.module.scss';

interface ErrorContainerProps {
  children: React.ReactNode;
}

export default function ErrorContainer({ children }: ErrorContainerProps) {
  return (
    <div className={styles.error}>
      {children}
    </div>
  )
}