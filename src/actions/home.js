import {HomeTypes as types} from '../action-types';
import httpRequest from '../utils/httpRequest';
import {browserHistory} from 'react-router';

const servicesDataObject = services => {
  return {
    type: types.FETCH_SERVICES,
    services,
  };
};

export function fetchServices() {
  return async (dispatch: Function) => {
    const httpResponse = await httpRequest.get('api/categories', {
      params: {
        'filters[name]': 'Business Type',
      },
    });
    const services = httpResponse.data[0].children;
    dispatch(servicesDataObject(services));
  };
}

export function filterBusinessesByService(service) {
  return () => {
    browserHistory.push({
      pathname: '/businesses',
      search: `?filters[categories_id_eq]=${service}`,
    });
  };
}

export function filterBusinessesByName(businessName) {
  return () => {
    browserHistory.push({
      pathname: '/businesses',
      search: `?filters[name_cont]=${businessName}`,
    });
  };
}
