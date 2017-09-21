import Axios from 'axios';

const httpRequest = Axios.create({
  baseURL: process.env.API_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default httpRequest;