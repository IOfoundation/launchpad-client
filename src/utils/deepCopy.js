export function deepCopy(collection) {
  return JSON.parse(JSON.stringify(collection));
}
