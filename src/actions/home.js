import {HomeTypes as types} from '../action-types';
import httpRequest from '../services/httpRequest';

const servicesDataObject = services => {
  return {
    type: types.FETCH_SERVICES,
    services,
  };
};

export function fetchServices() {
  return async (dispatch: Function) => {
    const httpResponse = await httpRequest.get('/services');
    const {services} = httpResponse.data;
    dispatch(servicesDataObject(services));
  };
}
