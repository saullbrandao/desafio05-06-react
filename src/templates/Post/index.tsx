/* eslint-disable react/no-danger */
import format from 'date-fns/format';
import { ptBR } from 'date-fns/locale';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { RichText } from 'prismic-dom';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { Comments } from '../../components/Comments';
import { readingTime } from '../../utils/readingTime';
import styles from './styles.module.scss';

export type Post = {
  id: string;
  first_publication_date: string | null;
  last_publication_date: string | null;
  previous_post: {
    uid: string | null;
    title: string | null;
  };
  next_post: {
    uid: string | null;
    title: string | null;
  };
  data: {
    title: string;
    banner: {
      url: string;
      alt: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
};

type PostProps = {
  post: Post;
  preview: boolean;
};

export const PostTemplate = ({
  post,
  preview = false,
}: PostProps): JSX.Element => {
  const estimatedReadingTime = readingTime(post.data.content);

  return (
    <>
      <Head>
        <title>Post | spacetraveling</title>
      </Head>
      <main>
        <div className={styles.banner}>
          <Image
            layout="fill"
            objectFit="cover"
            src={post.data.banner.url}
            alt={post.data.banner.alt}
          />
        </div>

        <article className={styles.container}>
          <h1>{post.data.title}</h1>

          <div className={styles.info}>
            <FiCalendar size={20} />
            <time>
              {format(new Date(post.first_publication_date), 'dd MMM yyyy', {
                locale: ptBR,
              })}
            </time>
            <FiUser size={20} />
            <span>{post.data.author}</span>
            <FiClock size={20} />
            <span>{estimatedReadingTime} min</span>
          </div>
          <span className={styles.lastUpdated}>
            * editado em{' '}
            {format(
              new Date(post.last_publication_date),
              "dd MMM yyyy, 'às' HH:mm",
              {
                locale: ptBR,
              }
            )}
          </span>

          {post.data.content.map(content => (
            <section
              className={styles.content}
              key={`${content.heading}-${Math.random()}`}
            >
              <h2>{content.heading}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: RichText.asHtml(content.body),
                }}
              />
            </section>
          ))}
          <footer className={styles.navigation}>
            {post.previous_post.uid ? (
              <div className={styles.previousPage}>
                <span>{post.previous_post.title}</span>
                <Link href={`/post/${post.previous_post.uid}`}>
                  <a>Post Anterior</a>
                </Link>
              </div>
            ) : (
              <div />
            )}
            {post.next_post.uid ? (
              <div className={styles.nextPage}>
                <span>{post.next_post.title}</span>
                <Link href={`/post/${post.next_post.uid}`}>
                  <a>Próximo Post</a>
                </Link>
              </div>
            ) : (
              <div />
            )}
          </footer>
        </article>
        <Comments />

        {preview && (
          <aside className={styles.exitPreview}>
            <Link href="/api/exit-preview">
              <a>Sair do modo Preview</a>
            </Link>
          </aside>
        )}
      </main>
    </>
  );
};
