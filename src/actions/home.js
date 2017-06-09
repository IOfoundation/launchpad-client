import {HomeTypes as types} from '../action-types';
import httpRequest from '../services/httpRequest';
import {browserHistory} from 'react-router';

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

export function filterBusinessesByService(service) {
  return (dispatch: Function) => {
    browserHistory.push({
      pathname: '/businesses',
      search: `?filters[services_id_eq]=${service}`,
    });
  };
}

export function filterBusinessesByName(businessName) {
  return (dispatch: Function) => {
    browserHistory.push({
      pathname: '/businesses',
      search: `?filters[name_cont]=${businessName}`,
    });
  };
}
