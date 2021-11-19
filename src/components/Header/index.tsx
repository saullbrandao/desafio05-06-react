import Link from 'next/link';
import Image from 'next/image';
import styles from './styles.module.scss';

export const Header = (): JSX.Element => {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Link href="/">
          <a>
            <Image src="/logo.svg" alt="logo" width={239} height={26} />
          </a>
        </Link>
      </div>
    </header>
  );
};
