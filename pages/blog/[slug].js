import { getAllPostsPaths, getPostBySlug } from '@/lib/posts';

export default function PostPage({
  frontmatter: { title, category, date, cover_image, author, author_image },
  content,
  slug,
}) {
  return <div>{title}</div>;
}

export const getStaticPaths = async () => {
  const paths = getAllPostsPaths();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const { frontmatter, content } = getPostBySlug(slug);

  return {
    props: {
      frontmatter,
      content,
      slug,
    },
  };
};
