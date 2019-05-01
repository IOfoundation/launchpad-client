import Axios from 'axios';

export const imageRequest = Axios.create({
  baseURL: process.env.API_URL,
  timeout: 10000,
  headers: {
    Accept: 'multipart/form-data',
    ContentType: 'multipart/form-data',
  },
  responseType: 'blob',
});

imageRequest.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error.response);
  }
);
