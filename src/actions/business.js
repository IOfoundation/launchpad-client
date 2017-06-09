import {BusinessTypes as types} from '../action-types';
import httpRequest from '../services/httpRequest';
import {browserHistory} from 'react-router';
import queryString from 'query-string';
import _ from 'lodash';

const businessesDataObject = businesses => {
  return {
    type: types.FETCH_BUSINESSESS,
    businesses,
  };
};

const businessesMetaDataObject = metadata => {
  return {
    type: types.FETCH_BUSINESSES_METADATA,
    metadata,
  };
};

const filtersDataObject = filters => {
  return {
    type: types.FETCH_FILTERS_OPTIONS,
    filters,
  };
};

const filtersObject = (filterType, filterValue, currentFilters) => {
  let newFilter = {};
  newFilter[`filters[${filterType}]`] = filterValue;
  let filters = Object.assign({}, currentFilters, newFilter);
  if (!filterValue) {
    filters = _.omit(filters, `filters[${filterType}]`);
  }
  return filters;
};

const pushBrowserHistory = filters => {
  return browserHistory.push({
    pathname: '/businesses',
    search: `?${queryString.stringify(filters, {encode: false})}`,
  });
};

export function fetchBusinesses(currentParams) {
  return async (dispatch: Function) => {
    const httpResponse = await httpRequest.get('/businesses', {
      params: currentParams,
    });
    const {businesses} = httpResponse.data;
    const {metadata} = httpResponse.data;
    dispatch(businessesDataObject(businesses));
    dispatch(businessesMetaDataObject(metadata));
  };
}

export function filterBusinessesByName(filterValue, currentParams) {
  return async (dispatch: Function) => {
    const filters = filtersObject('name_cont', filterValue, currentParams);
    const httpResponse = await httpRequest.get('/businesses', {
      params: filters,
    });
    const {businesses} = httpResponse.data;
    const {metadata} = httpResponse.data;
    dispatch(businessesDataObject(businesses));
    dispatch(businessesMetaDataObject(metadata));
    pushBrowserHistory(filters);
  };
}

export function filterBusinesses(filterType, filterValue, currentParams) {
  return async (dispatch: Function) => {
    const filters = filtersObject(
      `${filterType}_id_eq`,
      filterValue,
      currentParams
    );
    const httpResponse = await httpRequest.get('/businesses', {
      params: filters,
    });
    const {businesses} = httpResponse.data;
    const {metadata} = httpResponse.data;
    dispatch(businessesDataObject(businesses));
    dispatch(businessesMetaDataObject(metadata));
    pushBrowserHistory(filters);
  };
}

export function fetchFilterOptions() {
  return async (dispatch: Function) => {
    const httpResponse = await httpRequest.get('/businesses-filters');
    const filters = httpResponse.data;
    dispatch(filtersDataObject(filters));
  };
}
