import { RichText } from 'prismic-dom';

type Content = {
  body: {
    text: string;
  }[];
};

export const readingTime = (content: Content[]): number => {
  const words = content.reduce((acc, curr) => {
    return acc + RichText.asText(curr.body).split(' ').length;
  }, 0);

  const minutes = Math.ceil(words / 200);

  return minutes;
};
