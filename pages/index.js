import Layout from '@/components/Layout';

export default function HomePage({ posts }) {
  console.log(posts);
  return (
    <Layout>
      <h1>Hello, World!</h1>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const path = require('path');
  const fs = require('fs');
  const matter = require('gray-matter');

  const files = fs.readdirSync(path.join('posts'));

  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '');

    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
};
