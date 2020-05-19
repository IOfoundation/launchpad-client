export const maxCharacters = 290;
export const truncate = (str, limit = maxCharacters, after = '...') => {
  const content = str.split('').slice(0, limit);

  return `${content.join('')}${after}`;
};
