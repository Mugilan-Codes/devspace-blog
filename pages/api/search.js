import Fuse from 'fuse.js';

import { getSortedPosts } from '@/lib/posts';
import { IS_PROD } from '@/config/index';

// const posts = IS_PROD ? require('../../cache/data').posts : getSortedPosts();
const posts =
  process.env.NODE_ENV === 'production'
    ? require('../../cache/data').posts
    : getSortedPosts();

const fuse = new Fuse(posts, {
  includeMatches: true,
  minMatchCharLength: 2,
  findAllMatches: true,
  keys: [
    'frontmatter.title',
    'frontmatter.excerpt',
    'frontmatter.category',
    'frontmatter.author',
  ],
  useExtendedSearch: true,
});

export default (req, res) => {
  const searchTerm = `'${req.query.q}`; // Search for items that include(') the query term

  const fuseResults = fuse.search(searchTerm);
  // console.log({ fuseResults });

  // HACK: rewrited to easily access the necessary content
  const results = fuseResults.map((fres) => ({
    slug: fres.item.slug,
    frontmatter: fres.item.frontmatter,
  }));

  res.status(200).json(JSON.stringify({ results }));
};
