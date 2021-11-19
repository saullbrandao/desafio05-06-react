import Head from 'next/head';
import { FiCalendar, FiUser } from 'react-icons/fi';
import styles from './styles.module.scss';

export const HomeTemplate = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Home | spacetraveling</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.content}>
          <h2>Como utilizar hooks</h2>
          <p>Pensando em sincronização em vez de ciclos de vida.</p>
          <div className={styles.info}>
            <FiCalendar size={20} />
            <time>15 mar 2021</time>

            <FiUser size={20} />
            <span>Joseph Oliveira</span>
          </div>
        </div>
        <div className={styles.content}>
          <h2>Como utilizar hooks</h2>
          <p>Pensando em sincronização em vez de ciclos de vida.</p>
          <div className={styles.info}>
            <FiCalendar size={20} />
            <time>15 mar 2021</time>

            <FiUser size={20} />
            <span>Joseph Oliveira</span>
          </div>
        </div>
        <div className={styles.content}>
          <h2>Como utilizar hooks</h2>
          <p>Pensando em sincronização em vez de ciclos de vida.</p>
          <div className={styles.info}>
            <FiCalendar size={20} />
            <time>15 mar 2021</time>

            <FiUser size={20} />
            <span>Joseph Oliveira</span>
          </div>
        </div>

        <button onClick={() => null} type="button" className={styles.loadPosts}>
          Carregar mais posts
        </button>
      </main>
    </>
  );
};
