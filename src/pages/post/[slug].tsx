import { GetStaticPaths, GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import { useRouter } from 'next/router';
import { getPrismicClient } from '../../services/prismic';
import { Post as PostType, PostTemplate } from '../../templates/Post';
import Custom404 from '../404';
import { useUpdatePreview } from '../../hooks/useUpdatePreviewRef';

type PostProps = {
  post: PostType;
  previewRef: string;
  preview: boolean;
};

export default function Post({
  post,
  previewRef,
  preview,
}: PostProps): JSX.Element {
  const { isFallback } = useRouter();

  useUpdatePreview(previewRef, post?.id);

  if (isFallback) return <div>Carregando...</div>;

  if (!post) {
    return <Custom404 />;
  }

  return <PostTemplate post={post} preview={preview} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetch: ['post/slug'],
      pageSize: 10,
    }
  );

  const paths = posts.results.map(post => ({ params: { slug: post.uid } }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const { slug } = params;
  const previewRef = previewData ? previewData.ref : null;
  const refOption = previewRef ? { ref: previewRef } : null;

  const prismic = getPrismicClient();
  const postData = await prismic.getByUID('post', String(slug), refOption);

  if (!postData) {
    return {
      notFound: true,
    };
  }

  const postsResponse = await prismic.query('', {
    orderings: '[document.last_publication_date desc]',
  });

  const currentPostindex = postsResponse.results.findIndex(
    post => post.uid === slug
  );

  const post = {
    id: postData.id,
    first_publication_date: postData.first_publication_date,
    last_publication_date: postData.last_publication_date,
    next_post: {
      uid:
        currentPostindex > 0
          ? postsResponse.results[currentPostindex - 1].uid
          : null,
      title:
        currentPostindex > 0
          ? postsResponse.results[currentPostindex - 1].data.title
          : null,
    },
    previous_post: {
      uid:
        currentPostindex < postsResponse.results.length - 1
          ? postsResponse.results[currentPostindex + 1].uid
          : null,
      title:
        currentPostindex < postsResponse.results.length - 1
          ? postsResponse.results[currentPostindex + 1].data.title
          : null,
    },
    data: {
      title: postData.data.title,
      banner: {
        url: postData.data.banner.url,
        alt: postData.data.banner.alt,
      },
      author: postData.data.author,
      content: postData.data.content,
    },
  };

  return {
    props: {
      post,
      previewRef,
      preview,
    },
    revalidate: 60 * 60 * 24, // 1 day
  };
};
