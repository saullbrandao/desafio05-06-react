import { NextApiRequest, NextApiResponse } from 'next';
import { Document } from '@prismicio/client/types/documents';
import { getPrismicClient } from '../../services/prismic';

function linkResolver(doc: Document): string {
  if (doc.type === 'post') {
    return `/post/${doc.uid}`;
  }
  return '/';
}

export default async function Preview(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { token: ref, documentId } = req.query;
  const prismic = getPrismicClient(req);

  const redirectUrl = await prismic
    .getPreviewResolver(String(ref), String(documentId))
    .resolve(linkResolver, '/');

  if (!redirectUrl) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  res.setPreviewData({ ref });

  res.write(
    `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${redirectUrl}" />
    <script>window.location.href = '${redirectUrl}'</script>
    </head>`
  );
  res.end();
}
