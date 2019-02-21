import Axios from 'axios';

export const httpRequest = Axios.create({
  baseURL: process.env.API_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    ContentType: 'application/json',
  },
});
