import Link from 'next/link';

import Layout from '@/components/Layout';
import Post from '@/components/Post';
import CategoryList from '@/components/CategoryList';
import {
  getAllCategories,
  getBlogCategoryPaths,
  getSortedPosts,
} from '@/lib/posts';

export default function CategoryBlogPage({ posts, categoryName, categories }) {
  return (
    <Layout>
      <div className='flex justify-between'>
        <div className='w-3/4 mr-10'>
          <h1 className='text-5xl border-b-4 p-5 font-bold'>
            Posts in {categoryName}
          </h1>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
        </div>

        <div className='w-1/4'>
          <CategoryList categories={categories} />
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const categoryPaths = getBlogCategoryPaths();

  const paths = categoryPaths.map((category) => ({
    params: { category_name: category },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { category_name } }) => {
  const posts = getSortedPosts({ category_name });

  const categories = getAllCategories();

  return {
    props: {
      posts,
      categoryName: category_name,
      categories,
    },
  };
};
