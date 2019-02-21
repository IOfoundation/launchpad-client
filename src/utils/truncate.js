export const truncate = (str, limit = 50, after = '') => {
  const content = str.split(' ').slice(0, limit);

  return `${content.join(' ')}${after}`;
};
