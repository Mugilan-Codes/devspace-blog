// REF: Building a search component for your Next.js markdown blog - https://medium.com/@matswainson/building-a-search-component-for-your-next-js-markdown-blog-9e75e0e7d210

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function getPostsData() {
  const files = fs.readdirSync(path.join('posts'));

  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '');

    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  return JSON.stringify(posts);
}

const postsContent = `export const posts = ${getPostsData()}`;

// Read or Create `cache` folder
try {
  fs.readdirSync('cache');
} catch (error) {
  fs.mkdirSync('cache');
}

fs.writeFile('cache/data.js', postsContent, function (err) {
  if (err) return console.log(err);

  console.log('Posts Cached...');
});
