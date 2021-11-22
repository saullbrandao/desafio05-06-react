import { useEffect } from 'react';

export const Comments = (): JSX.Element => {
  useEffect(() => {
    const script = document.createElement('script');
    const anchor = document.getElementById('inject-comments-for-uterances');
    script.setAttribute('src', 'https://utteranc.es/client.js');
    script.setAttribute('crossorigin', 'anonymous');
    script.setAttribute('async', 'true');
    script.setAttribute('repo', 'saullbrandao/desafio05-react');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('theme', 'photon-dark');
    anchor.appendChild(script);
  }, []);

  return <div id="inject-comments-for-uterances" />;
};
