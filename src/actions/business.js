import {BusinessTypes as types} from '../action-types';
import {CategoriesConstants} from '../constants';
import httpRequest from '../utils/httpRequest';
import {browserHistory} from 'react-router';
import queryString from 'query-string';
import _ from 'lodash';

const businessDataObject = business => {
  return {
    type: types.FETCH_BUSINESS,
    business,
  };
};

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

const filtersObject = (filterType, filterValue, currentFilters, filterMultiple = false) => {
  const newFilter = {};
  if (filterMultiple && currentFilters[`filters[${filterType}]`]){
    filterValue = currentFilters[`filters[${filterType}]`] + `,${filterValue}`
  }
  newFilter[`filters[${filterType}]`] = filterValue;
  let filters = Object.assign({}, currentFilters, newFilter);
  if (!filterValue && !filterMultiple) {
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

export function fetchBusiness(businessId) {
  return async (dispatch: Function) => {
    const httpResponse = await httpRequest.get(
      `/api/organizations/${businessId}`
    );
    const business = httpResponse.data;
    dispatch(businessDataObject(business));
  };
}

export function fetchBusinesses(currentParams) {
  return async (dispatch: Function) => {
    const httpResponse = await httpRequest.get('/api/organizations', {
      params: currentParams,
    });
    const businesses = httpResponse.data.organizations;
    const {metadata} = httpResponse.data;
    dispatch(businessesDataObject(businesses));
    dispatch(businessesMetaDataObject(metadata));
  };
}

export function filterBusinessesByName(filterValue, currentParams) {
  return async (dispatch: Function) => {
    const filters = filtersObject('name_cont', filterValue, currentParams);
    const httpResponse = await httpRequest.get('/api/organizations', {
      params: filters,
    });
    const businesses = httpResponse.data.organizations;
    const {metadata} = httpResponse.data;
    dispatch(businessesDataObject(businesses));
    dispatch(businessesMetaDataObject(metadata));
    pushBrowserHistory(filters);
  };
}

export function filterBusinesses(filterType, filterValue, currentParams, filterMultiple = false) {
  const filterOptionName = filterMultiple ? `${filterType}_id_in` : `${filterType}_id_eq`;
  return async (dispatch: Function) => {
    const filters = filtersObject(
      filterOptionName,
      filterValue,
      currentParams,
      filterMultiple,
    );
    const httpResponse = await httpRequest.get('/api/organizations', {
      params: filters,
    });
    const businesses = httpResponse.data.organizations;
    const {metadata} = httpResponse.data;
    dispatch(businessesDataObject(businesses));
    dispatch(businessesMetaDataObject(metadata));
    pushBrowserHistory(filters);
  };
}

export function changePage(page, currentParams) {
  return async (dispatch: Function) => {
    const params = {
      ...currentParams,
      page,
    };
    const httpResponse = await httpRequest.get('/api/organizations', {
      params,
    });
    const businesses = httpResponse.data.organizations;
    const {metadata} = httpResponse.data;
    dispatch(businessesDataObject(businesses));
    dispatch(businessesMetaDataObject(metadata));
    pushBrowserHistory(params);
  };
}

export function showBusiness(business) {
  return async () => {
    browserHistory.push({
      pathname: `/businesses/${business.id}`,
    });
  };
}

export function fetchFilterOptions() {
  return async (dispatch: Function) => {
    const httpResponse = await httpRequest.get('/api/categories');
    const categories = httpResponse.data;

    const businessTypeCategory = categories.find(
      category => category.name === CategoriesConstants.BUSINESS_TYPE
    );
    const businessTypes = businessTypeCategory
      ? businessTypeCategory.children
      : [];

    const stageCategory = categories.find(
      category => category.name === CategoriesConstants.STAGE
    );
    const stages = stageCategory ? stageCategory.children : [];

    const communityCategory = categories.find(
      category => category.name === CategoriesConstants.COMMUNITY
    );
    const communities = communityCategory ? communityCategory.children : [];

    const industryCategory = categories.find(
      category => category.name === CategoriesConstants.INDUSTRY
    );
    const industries = industryCategory ? industryCategory.children : [];

    dispatch(
      filtersDataObject({
        categories,
        businessTypes,
        stages,
        communities,
        industries,
      })
    );
  };
}
