import { join } from 'path';
import { readdirSync, readFileSync } from 'fs';
import matter from 'gray-matter';

import { sortByNew, sortByOld } from '@/utils/date';

const postsDirectory = readdirSync(join('posts'));

export const getSortedPosts = ({ oldestPostsFirst = false } = {}) => {
  const posts = postsDirectory.map((filename) => {
    const slug = filename.replace('.md', '');

    const markdownWithMeta = readFileSync(join('posts', filename), 'utf-8');

    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  return oldestPostsFirst ? posts.sort(sortByOld) : posts.sort(sortByNew);
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
