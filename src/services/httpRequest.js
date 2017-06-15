import Axios from 'axios';

const httpRequest = Axios.create({
  baseURL: 'http://localhost:4567',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default httpRequest;
