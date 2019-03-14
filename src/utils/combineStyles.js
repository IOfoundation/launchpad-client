export function combineStyles(styleOne, styleTwo) {
  return function styles(theme) {
    return {
      ...styleOne(theme),
      ...styleTwo(theme),
    };
  };
}
