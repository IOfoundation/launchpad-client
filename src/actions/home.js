import {HomeTypes as types} from '../action-types';
import httpRequest from '../utils/httpRequest';
import {browserHistory} from 'react-router';

const servicesDataObject = services => {
  return {
    type: types.FILTER_SERVICES,
    services,
  };
};

export function filterServices(filter) {
  return async (dispatch: Function) => {
    const httpResponse = await httpRequest.get('api/categories/search', {
      params: {'name': filter}
    });
    const services = httpResponse.data;
    dispatch(servicesDataObject(services));
  };
}

export function filterBusinessesByService(filterString) {
  return () => {
    browserHistory.push({
      pathname: '/businesses',
      search: `?${filterString}`,
    });
  };
}

export function filterBusinessesByName(filterString) {
  return () => {
    browserHistory.push({
      pathname: '/businesses',
      search: `?${filterString}`,
    });
  };
}
