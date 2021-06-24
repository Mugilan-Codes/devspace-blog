import Head from 'next/head';

import Header from './Header';

export default function Layout({ title, keywords, description, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />

        <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
      </Head>

      <Header />

      <main className='container mx-auto my-7'>{children}</main>
    </div>
  );
}

Layout.defaultProps = {
  title: 'Welcome to DevSpace',
  keywords: 'development, coding, programming, web',
  description:
    'The one stop for all the best news and information in development',
};
