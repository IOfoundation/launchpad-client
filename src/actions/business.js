import {BusinessTypes as types} from '../action-types';
import httpRequest from '../services/httpRequest';
import { browserHistory } from 'react-router';
import queryString from 'query-string';
import _ from 'lodash';

const businessesDataObject = businesses => {
  return {
    type: types.FETCH_BUSINESSESS,
    businesses,
  };
};

export function fetchBusinesses(filters) {
  return async (dispatch: Function) => {
    const httpResponse = await httpRequest.get('/businesses', {
      params: filters
    });
    const {businesses} = httpResponse.data;
    dispatch(businessesDataObject(businesses));
  };
}

export function filterBusinessesByName(name, currentFilters) {
  return async (dispatch: Function) => {
    let filterByName = {};
    filterByName['filters[name_cont]'] = name;
    let filters = Object.assign({}, currentFilters, filterByName);
    if (!name){
      filters = _.omit(filters, 'filters[name_cont]');
    }
    const httpResponse = await httpRequest.get('/businesses', {
      params: filters
    });
    const {businesses} = httpResponse.data;
    dispatch(businessesDataObject(businesses));
    browserHistory.push({
      pathname: '/businesses',
      search: `?${queryString.stringify(filters, {encode: false})}`
    });
  };
}
