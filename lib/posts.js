import { join } from 'path';
import { readdirSync, readFileSync } from 'fs';
import matter from 'gray-matter';

import { sortByNew, sortByOld } from '@/utils/date';
import { POSTS_PER_PAGE } from '../config';

const postsDirectory = readdirSync(join('posts'));

export const getSortedPosts = ({
  oldestPostsFirst = false,
  category_name,
} = {}) => {
  const posts = postsDirectory.map((filename) => {
    const slug = filename.replace('.md', '');

    const markdownWithMeta = readFileSync(join('posts', filename), 'utf-8');

    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  let sortedPosts = oldestPostsFirst
    ? posts.sort(sortByOld)
    : posts.sort(sortByNew);

  // Filter posts by category
  if (category_name) {
    sortedPosts = sortedPosts.filter(
      (post) => post.frontmatter.category.toLowerCase() === category_name
    );
  }

  return sortedPosts;
};

export const getAllPostsPaths = () => {
  const paths = postsDirectory.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));

  return paths;
};

export const getPostBySlug = (slug) => {
  const markdownWithMeta = readFileSync(join('posts', `${slug}.md`), 'utf-8');

  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    frontmatter,
    content,
  };
};

export const getPostsPages = (per_page = POSTS_PER_PAGE) => {
  const numPages = Math.ceil(postsDirectory.length / per_page);

  let paths = [];

  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: {
        page_index: i.toString(),
      },
    });
  }

  return paths;
};

export const getPaginatedPostsPage = ({
  per_page = POSTS_PER_PAGE,
  page,
  posts,
} = {}) => {
  const numPages = Math.ceil(postsDirectory.length / per_page);

  const pageIndex = page - 1;

  const slicedPosts = posts.slice(
    pageIndex * per_page,
    (pageIndex + 1) * per_page
  );

  return { slicedPosts, numPages };
};

export const getBlogCategoryPaths = () => {
  const categories = postsDirectory.map((file) => {
    const markdownWithMeta = readFileSync(join('posts', file), 'utf-8');

    const { data: frontmatter } = matter(markdownWithMeta);

    return frontmatter.category.toLowerCase();
  });

  return categories;
};
