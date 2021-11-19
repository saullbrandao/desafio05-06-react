import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import styles from './styles.module.scss';

type Post = {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
};

type PostPagination = {
  next_page: string;
  results: Post[];
};

type HomeProps = {
  postsPagination: PostPagination;
};

export const HomeTemplate = ({ postsPagination }: HomeProps): JSX.Element => {
  const { next_page, results } = postsPagination;
  const [posts, setPosts] = useState(results);
  const [nextPage, setNextPage] = useState(next_page);

  const loadMorePosts = async (): Promise<void> => {
    if (!nextPage) return;

    const response = await fetch(next_page);
    const data = await response.json();

    const formattedPosts = data.results.map(post => {
      return {
        uid: post.uid,
        first_publication_date: post.first_publication_date,
        data: {
          title: post.data.title,
          subtitle: post.data.subtitle,
          author: post.data.author,
        },
      };
    });

    setPosts([...posts, ...formattedPosts]);
    setNextPage(data.next_page);
  };

  return (
    <>
      <Head>
        <title>Home | spacetraveling</title>
      </Head>
      <main className={styles.container}>
        {posts.map(
          (post: Post): JSX.Element => (
            <div key={post.uid} className={styles.content}>
              <Link href={`/post/${post.uid}`}>
                <a>
                  <h2>{post.data.title}</h2>
                </a>
              </Link>
              <p>{post.data.subtitle}</p>
              <div className={styles.info}>
                <FiCalendar size={20} />
                <time>
                  {format(
                    new Date(post.first_publication_date),
                    'dd MMM yyyy',
                    {
                      locale: ptBR,
                    }
                  )}
                </time>

                <FiUser size={20} />
                <span>{post.data.author}</span>
              </div>
            </div>
          )
        )}

        {nextPage && (
          <button
            onClick={loadMorePosts}
            type="button"
            className={styles.loadPosts}
          >
            Carregar mais posts
          </button>
        )}
      </main>
    </>
  );
};
