import { GetStaticProps } from 'next';

import Prismic from '@prismicio/client';
import { HomeProps, HomeTemplate } from '../templates/Home';
import { getPrismicClient } from '../services/prismic';

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  return <HomeTemplate postsPagination={postsPagination} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetch: ['post/title', 'post/content'],
      pageSize: 1,
      orderings: '[document.last_publication_date desc]',
    }
  );

  const results = postsResponse.results.map(post => {
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

  return {
    props: {
      postsPagination: {
        next_page: postsResponse.next_page,
        results,
      },
    },
  };
};
