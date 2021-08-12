import Layout from '@/components/Layout';
import Post from '@/components/Post';
import { getPostsPages, getSortedPosts } from '@/lib/posts';

export default function BlogPage({ posts }) {
  return (
    <Layout>
      <h1 className='text-5xl border-b-4 p-5 font-bold'>Blog</h1>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const noOfPostsPerPage = getPostsPages();

  return {
    paths: noOfPostsPerPage,
    fallback: false,
  };
};

export const getStaticProps = async () => {
  const posts = getSortedPosts();

  return {
    props: {
      posts,
    },
  };
};
