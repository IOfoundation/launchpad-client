import {BusinessTypes as types} from '../action-types';
import {CategoriesConstants} from '../constants';
import httpRequest from '../utils/httpRequest';
import {browserHistory} from 'react-router';
import queryString from 'query-string';
import {isEmpty, isString, cloneDeep} from 'lodash';
import URL from 'url-parse';

const MaxItemsDisplayedPerPage = 6;

const paginationMetadata = links => {
  const _paginationMetadata = {};
  Object.keys(links).forEach(type => {
    const link = links[type];
    if (link) {
      _paginationMetadata[type] = {};
      const urlParse = URL(link);
      urlParse.query
        .slice(1)
        .split('&')
        .forEach(pairs => {
          const [param, value] = pairs.split('=');
          if (param === 'page') {
            _paginationMetadata[type].page = parseInt(value, 10);
          }
          if (param === 'per_page') {
            _paginationMetadata[type].per_page = parseInt(value, 10);
          }
        });
    }
  });
  return _paginationMetadata;
};

const getData = (organizations, metadata) => {
  return {
    type: types.FETCH_DATA,
    organizations,
    metadata,
  };
};

const filtersDataObject = filters => {
  return {
    type: types.FETCH_FILTERS_OPTIONS,
    filters,
  };
};

const searchResultsDataObject = items => {
  return {
    type: types.FETCH_SEARCH_RESULTS,
    items,
  };
};

const displayFilterOptions = displayOptions => {
  return {
    type: types.FETCH_DISPLAY_FILTER_OPTIONS,
    displayOptions,
  };
};
const pushBrowserHistory = filters => {
  let filterString = queryString.stringify(filters, {encode: false});
  filterString = filterString.replace(/&per_page=\d+/, '');
  return browserHistory.push({
    pathname: '/businesses',
    search: `?${filterString}`,
  });
};

export function filterOrganizations(filterValue, currentParams, filterType, removeFilter) {
  return async (dispatch: Function) => {
    const filters = filtersObject(filterValue, currentParams, filterType, removeFilter);
    const {organizations, metadata} = await _buildOrganizationsAndMetadata(filters);

    dispatch(getData(organizations, metadata))
    pushBrowserHistory(filters);
  };
}

const filtersObject = (filterValue, filters, filterType, removeFilter) => {
  let newFilters = cloneDeep(filters);
  switch (filterType) {
    case 'category':
      return removeFilter ? _removeCategoryFilter(newFilters, filterValue) : _addCategoryFilter(newFilters, filterValue);
      break;
    case 'organization':
      return removeFilter ? _removeOrganizationIdFilter() : _addOrganizationIdFilter(newFilters, filterValue);
      break;
    case 'coordinates':
      return removeFilter ? _removeLocationFilter(newFilters) : _addLocationFilter(newFilters, filterValue);
      break;
    default:
      return _removeAllFilters();
    }
  }

export function changePage(page, currentParams) {
  return async (dispatch: Function) => {
    const params = {
      ...currentParams,
      page,
      per_page: MaxItemsDisplayedPerPage,
    };

    const httpResponse = await httpRequest.get('/api/organizations', {
      params,
    });

    const organizations = httpResponse.data;
    const metadata = {
      pagination: {
        ...paginationMetadata(JSON.parse(httpResponse.headers.link)),
        currentPage: params.page,
      },
      totalOrganizations: httpResponse.headers['x-total-count'],
    };
    dispatch(getData(organizations, metadata));
    pushBrowserHistory(params);
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

export function fetchSearchResults(filter) {
  return async (dispatch: Function) => {
    const httpResponse = await httpRequest.get('api/search', {
      params: {'text': filter}
    });
    const items = httpResponse.data;
    dispatch(searchResultsDataObject(items));
  };
}

export function changeFilterDisplayOptions(showBusinessTypes, locationToggleSwitch) {
  return async (dispatch: Function) => {
    const displayOptions = {
      showBusinessTypes: showBusinessTypes,
      locationToggleSwitch: locationToggleSwitch,
    };
    dispatch(displayFilterOptions(displayOptions));
  }
}
async function _buildOrganizationsAndMetadata(filters) {
  const params = {
    ...filters,
    per_page: MaxItemsDisplayedPerPage,
  };
  if (!params.hasOwnProperty('page')) {
    Object.assign(params, {page: 1});
  }
  const httpResponse = await httpRequest.get(`api/organizations`, {params});
  const organizations = httpResponse.data
  const metadata = {
    pagination: {
      ...paginationMetadata(JSON.parse(httpResponse.headers.link)),
      currentPage: params.page,
    },
    totalOrganizations: httpResponse.headers['x-total-count'],
  };
  return {
    organizations,
    metadata,
  };
}

function _addCategoryFilter(newFilters, filterValue) {
  if (newFilters.id) {newFilters.id = [];}
  if (filterValue === null) {return newFilters;}
  if (isEmpty(newFilters.category)) {
    newFilters.category = [filterValue];
  } else if (isString(newFilters.category)) {
    newFilters.category = [newFilters.category, filterValue];
  } else {
    newFilters.category.push(filterValue);
  }
  return newFilters;
}

function _removeCategoryFilter(newFilters, filterValue) {
  if (isString(newFilters.category)) {
    newFilters.category = [];
    return newFilters;
  }
  const filterIndex = newFilters.category.indexOf(filterValue);
  newFilters.category.splice(filterIndex, 1);
  return newFilters;
}

function _addOrganizationIdFilter(newFilters, filterValue) {
  changeFilterDisplayOptions(true, false);
  newFilters = [];
  newFilters.id = filterValue;
  return newFilters;
}

function _removeOrganizationIdFilter() {
  return [];
}

function _addLocationFilter(newFilters, filterValue) {
  newFilters.id = [];
  newFilters.sw_lat = filterValue.sw.lat;
  newFilters.sw_lng = filterValue.sw.lng;
  newFilters.ne_lat = filterValue.ne.lat;
  newFilters.ne_lng = filterValue.ne.lng;
  return newFilters;
}

function _removeLocationFilter(newFilters) {
  newFilters.sw_lat = [];
  newFilters.sw_lng = [];
  newFilters.ne_lat = [];
  newFilters.ne_lng = [];
  return newFilters;
}

function _removeAllFilters() {
  return [];
}
