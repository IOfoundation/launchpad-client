export const htmlStripper = str => {
  return str.replace(/<[^>]+>/g, '');
};
