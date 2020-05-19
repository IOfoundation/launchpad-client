export const createUrlWithParams = (endpoint, data) => {
  const params = Object.keys(data)
    .map(key => `${key}=${encodeURIComponent(data[key])}`)
    .join('&');

  return `${endpoint}?${params}`;
};
