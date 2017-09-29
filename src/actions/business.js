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

const filtersObject = (
  filterType,
  filterValue,
  currentFilters,
  filterMultiple = false
) => {
  const newFilter = {};
  if (filterMultiple && currentFilters[`category[]`]) {
    filterValue = currentFilters[`category[]`] + `&category[]=${filterValue}`;
  }
  newFilter[`category[]`] = filterValue;
  let filters = Object.assign({}, currentFilters, newFilter);
  if (!filterValue && !filterMultiple) {
    filters = _.omit(filters, `category[]`);
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

export function fetchLocations(currentParams) {
  return async (dispatch: Function) => {
    const httpResponse = await httpRequest.get('/api/locations', {
      params: currentParams,
    });
    const locations = httpResponse.data;
    const metadata = {
      pagination: {
        current_page: currentParams.page,
      }
    };
    dispatch(locationsDataObject(locations));
    dispatch(businessesMetaDataObject(metadata));
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
      }
    };
    dispatch(locationsDataObject(locations));
    dispatch(businessesMetaDataObject(metadata));
    pushBrowserHistory(filters);
  };
}

export function filterLocations(
  filterType,
  filterValue,
  currentParams,
  filterMultiple = false
) {
  return async (dispatch: Function) => {
    const filters = filtersObject(
      filterType,
      filterValue,
      currentParams,
      filterMultiple
    );
    const httpResponse = await httpRequest.get('/api/search', {
      params: filters,
    });
    const locations = httpResponse.data;
    const metadata = {
      pagination: {
        current_page: currentParams.page,
      }
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

    const businessTypeCategory = categories.find(
      category => category.name === CategoriesConstants.BUSINESS_TYPE
    );
    const businessTypeCategoryId = businessTypeCategory.taxonomy_id;
    const businessTypes = businessTypeCategory ? getChildren(businessTypeCategoryId,categories) : [];

    const stageCategory = categories.find(
      category => category.name === CategoriesConstants.STAGE
    );
    const stageCategoryId = stageCategory.taxonomy_id;
    const stages = stageCategory ? getChildren(stageCategoryId, categories) : [];

    const communityCategory = categories.find(
      category => category.name === CategoriesConstants.COMMUNITY
    );
    const communityCategoryId = communityCategory.taxonomy_id;
    const communities = communityCategory ? getChildren(communityCategoryId, categories) : [];

    const industryCategory = categories.find(
      category => category.name === CategoriesConstants.INDUSTRY
    );
    const industryCategoryId = industryCategory.taxonomy_id;
    const industries = industryCategory ? getChildren(industryCategoryId, categories) : [];

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

function getChildren(id, categories) {
  var regex = new RegExp("^" + id + "-");
  const children = categories.filter(
    category => regex.test(category.taxonomy_id)
  );
  return children;
}
