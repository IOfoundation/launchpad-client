let axios = require('axios');
let JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;

const deserializeResponse = (response) => {
  return new JSONAPIDeserializer({keyAttribute: 'camelCase'})
  .deserialize(response)
  .then((result) => {
    response.data = result;
    return Promise.resolve(reponse);
  });
};
const isJsonContent = (headers) => {
  return /json/.exec(headers['content-type']) != undefined;
};

axios.interceptors.response.use(
  (response) => {
    const {data , headers} = response;

    if(!isJsonContent(headers)) {
      return response;
    }

    if (data.errors != undefined) {
      return Promise.reject(data);
    }

    return(!data && '') || deserializeResponse(data);
  },
  (error) => { return Promise.reject(error); }
);

const httpRequest = {
  baseURL: process.env['API_URL'],
  headers: {
    'Accept': 'application/json; version=1'
  },
};

httpRequest.get = async (url, params = {}, options: {}) => {
  return await httpRequest.request('get', url, { params: params }, options);
};

httpRequest.post = async (url, data = {}) => {
  return await httpRequest.request('post', url, { data: data }, {});
};

httpRequest.put = async (url, data = {}) => {
  return await httpRequest.request('put', url, { data: data }, {});
};

httpRequest.patch = async (url, data = {}) => {
  return await httpRequest.request('patch', url, { data: data }, {});
};

httpRequest.delete = async (url, data = {}) => {
  return await httpRequest.request('delete', url, { data: data }, {});
};

httpRequest.request = async (request_method, url, params, customOptions) => {
  let options = Object.assign({}, {
    method: request_method,
    url: url,
    baseURL: HttpHelper.baseURL,
    headers: HttpHelper.headers,
    withCredentials: true,
    responseType: 'json',
  }, params, customOptions);

  try {
    const { data } = await axios(options);
    return data;
  }catch(err){
    console.warn(err);
    const { status, data } = err.response;
    if(status == 412) {
      return Promise.reject(data);
    }
    throw err;
  }
};


export default httpRequest;
