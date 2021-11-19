import { GetStaticProps } from 'next';

import Prismic from '@prismicio/client';
import { HomeTemplate } from '../templates/Home';
import { getPrismicClient } from '../services/prismic';

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
