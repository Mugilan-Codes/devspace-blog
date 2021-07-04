export const sortByNew = (a, b) => {
  return new Date(b.frontmatter.date) - new Date(a.frontmatter.date);
};

export const sortByOld = (a, b) => {
  return new Date(a.frontmatter.date) - new Date(b.frontmatter.date);
};
