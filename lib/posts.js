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
