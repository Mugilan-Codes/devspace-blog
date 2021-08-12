import Layout from '@/components/Layout';
import Post from '@/components/Post';
import {
  getPaginatedPostsPage,
  getPostsPages,
  getSortedPosts,
} from '@/lib/posts';

export default function BlogPage({ posts, numPages, currentPage }) {
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

export const getStaticProps = async ({ params }) => {
  const page = parseInt((params && params.page_index) || 1);

  const posts = getSortedPosts();

  const { slicedPosts, numPages } = getPaginatedPostsPage({ page, posts });

  return {
    props: {
      posts: slicedPosts,
      numPages,
      currentPage: page,
    },
  };
};
