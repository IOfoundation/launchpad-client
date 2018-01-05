import Axios from 'axios';

const httpRequest = Axios.create({
  baseURL: process.env.API_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    ContentType: 'application/json',
  },
});

export default httpRequest;
