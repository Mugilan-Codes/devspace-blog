import Link from 'next/link';
import Image from 'next/image';
import marked from 'marked';

import Layout from '@/components/Layout';
import CategoryLabel from '@/components/CategoryLabel';
import { getAllPostsPaths, getPostBySlug } from '@/lib/posts';

export default function PostPage({
  frontmatter: { title, category, date, cover_image, author, author_image },
  content,
  slug,
}) {
  return (
    <Layout title={title}>
      <Link href='/blog'>
        <a>Go Back</a>
      </Link>

      <div className='w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6'>
        <div className='flex justify-between items-center mt-4'>
          <h1 className='text-5xl mb-7'>{title}</h1>

          <CategoryLabel>{category}</CategoryLabel>
        </div>

        <div className='w-full'>
          <Image
            src={cover_image}
            alt=''
            width={1200}
            height={800}
            className='rounded'
          />
        </div>

        <div className='flex justify-between items-center bg-gray-100 py-2 my-8'>
          <div className='flex items-center'>
            <div className='mx-4 w-10 h-10 object-cover hidden sm:block'>
              <Image
                src={author_image}
                className='rounded-full'
                width={100}
                height={100}
              />
            </div>

            <h4>{author}</h4>
          </div>

          <div className='mr-4'>{date}</div>
        </div>

        <div className='blog-text mt-2'>
          <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>
      </div>
    </Layout>
  );
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
