import { getSortedPosts } from '@/lib/posts';
import { IS_PROD } from '@/config/index';

const posts = IS_PROD ? [] : getSortedPosts();

// TODO: add fuzzy-search (https://github.com/wouter2203/fuzzy-search)
export default (req, res) => {
  console.log('Search Posts...');

  const results = posts.filter(
    ({ frontmatter: { title, excerpt, category } }) =>
      title.toLowerCase().indexOf(req.query.q) != -1 ||
      excerpt.toLowerCase().indexOf(req.query.q) != -1 ||
      category.toLowerCase().indexOf(req.query.q) != -1
  );

  res.status(200).json(JSON.stringify({ results }));
};
