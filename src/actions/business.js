import {BusinessTypes as types} from '../action-types';
import {CategoriesConstants} from '../constants';
import httpRequest from '../utils/httpRequest';
import {browserHistory} from 'react-router';
import queryString from 'query-string';
import {isEmpty, isString} from 'lodash';

const businessDataObject = business => {
  return {
    type: types.FETCH_BUSINESS,
    business,
  };
};

const locationsDataObject = locations => {
  return {
    type: types.FETCH_LOCATIONS,
    locations,
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

const filtersObject = (filterValue, filters, filterMultiple) => {
  if (!filterValue) {
    return filters;
  }
  let newFilters = {...filters};
  if (isEmpty(filters)) {
    newFilters.category = [filterValue];
  } else if (isString(newFilters.category)) {
    newFilters.category = [newFilters.category, filterValue];
  } else {
    newFilters.category.push(filterValue);
  }
  return newFilters;
};

const pushBrowserHistory = filters => {
  const filterString = queryString.stringify(filters, {encode: false});

  return browserHistory.push({
    pathname: '/businesses',
    search: `?${filterString}`,
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

export function filterBusinessesByName(filterValue, currentParams) {
  return async (dispatch: Function) => {
    const filters = filtersObject('name_cont', filterValue, currentParams);
    const httpResponse = await httpRequest.get('/api/search', {
      params: filters,
    });
    const locations = httpResponse.data;
    const metadata = {
      pagination: {
        current_page: currentParams.page,
      },
    };
    dispatch(locationsDataObject(locations));
    dispatch(businessesMetaDataObject(metadata));
    pushBrowserHistory(filters);
  };
}

export function filterLocations(filterValue, currentParams, filterMultiple) {
  return async (dispatch: Function) => {
    const filters = filtersObject(filterValue, currentParams, filterMultiple);

    const httpResponse = await httpRequest.get('/api/search', {
      params: filters,
    });
    const locations = httpResponse.data;
    const metadata = {
      pagination: {
        current_page: currentParams.page,
      },
    };
    dispatch(locationsDataObject(locations));
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
    const locations = httpResponse.data;
    const {metadata} = httpResponse.data;
    dispatch(locationsDataObject(locations));
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

    const businessServiceCategory = categories.find(
      category => category.name === CategoriesConstants.BUSINESS_SERVICES
    );
    const businessServices = businessServiceCategory
      ? businessServiceCategory.children
      : [];

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
        businessServices,
        businessTypes,
        stages,
        communities,
        industries,
      })
    );
  };
}
