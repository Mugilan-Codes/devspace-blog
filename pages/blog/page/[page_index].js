import Layout from '@/components/Layout';
import Pagination from '@/components/Pagination';
import Post from '@/components/Post';
import CategoryList from '@/components/CategoryList';
import {
  getAllCategories,
  getPaginatedPostsPage,
  getPostsPages,
  getSortedPosts,
} from '@/lib/posts';

export default function BlogPage({ posts, numPages, currentPage, categories }) {
  return (
    <Layout>
      <div className='flex justify-between'>
        <div className='w-3/4 mr-10'>
          <h1 className='text-5xl border-b-4 p-5 font-bold'>Blog</h1>

          <Pagination currentPage={currentPage} numPages={numPages} />

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>

          <Pagination currentPage={currentPage} numPages={numPages} />
        </div>

        <div className='w-1/4'>
          <CategoryList categories={categories} />
        </div>
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

  const categories = getAllCategories();

  const { slicedPosts, numPages } = getPaginatedPostsPage({ page, posts });

  return {
    props: {
      posts: slicedPosts,
      numPages,
      currentPage: page,
      categories,
    },
  };
};
