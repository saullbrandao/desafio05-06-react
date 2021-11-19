import Link from 'next/link';
import styles from './styles.module.scss';

export const Header = (): JSX.Element => {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Link href="/">
          <a>
            <img src="/logo.svg" alt="logo" />
          </a>
        </Link>
      </div>
    </header>
  );
};
