import Axios from 'axios';

export const imageRequest = Axios.create({
  baseURL: process.env.API_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json; multipart/form-data;',
    ContentType: 'multipart/form-data; application/json;',
  },
  responseType: 'application/json',
});

imageRequest.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error.response);
  }
);
