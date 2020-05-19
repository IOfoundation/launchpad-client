export function combineStyles(styleOne, styleTwo) {
  return function styles(theme) {
    let one;
    let two;

    if (typeof styleOne === 'function') {
      one = styleOne(theme);
    } else {
      one = styleOne;
    }

    if (typeof styleTwo === 'function') {
      two = styleTwo(theme);
    } else {
      two = styleTwo;
    }

    return {
      ...one,
      ...two,
    };
  };
}
