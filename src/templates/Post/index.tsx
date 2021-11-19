/* eslint-disable react/no-danger */
import format from 'date-fns/format';
import { ptBR } from 'date-fns/locale';
import Head from 'next/head';
import Image from 'next/image';
import { RichText } from 'prismic-dom';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { readingTime } from '../../utils/readingTime';
import styles from './styles.module.scss';

type Post = {
  first_publication_date: string | null;
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

export type PostProps = {
  post: Post;
};

export const PostTemplate = ({ post }: PostProps): JSX.Element => {
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
        </article>
      </main>
    </>
  );
};
