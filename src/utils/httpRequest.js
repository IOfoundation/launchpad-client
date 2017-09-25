import Axios from 'axios';

const httpRequest = Axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default httpRequest;
