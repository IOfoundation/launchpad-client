export const sortArrayBy = (arrArg, prop) => {
  return arrArg.sort((a, b) => a[prop] - b[prop]);
};
