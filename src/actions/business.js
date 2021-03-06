import {BusinessTypes as types} from '../action-types';
import {CategoriesConstants} from '../constants';
import {httpRequest} from '../utils';
import {browserHistory} from 'react-router';
import queryString from 'query-string';
import {isEmpty, isString, cloneDeep, debounce} from 'lodash';
import URL from 'url-parse';

const MaxItemsDisplayedPerPage = 6;

const fetchOrganizationsRequestObject = () => {
  return {
    type: types.FETCH_ORGANIZATIONS_REQUEST,
  };
};

const fetchOrganizationsSuccessObject = (organizations, metadata) => {
  return {
    type: types.FETCH_ORGANIZATIONS_SUCCESS,
    organizations,
    metadata,
  };
};

const fetchOrganizationsErrorObject = error => {
  return {
    type: types.FETCH_ORGANIZATIONS_ERROR,
    error,
  };
};

const fetchOrganizationByIdRequestObject = () => {
  return {
    type: types.FETCH_ORGANIZATION_BY_ID_REQUEST,
  };
};

export const fetchOrganizationByIdSuccessObject = organization => {
  return {
    type: types.FETCH_ORGANIZATION_BY_ID_SUCCESS,
    organization,
  };
};

const fetchOrganizationByIdErrorObject = error => {
  return {
    type: types.FETCH_ORGANIZATION_BY_ID_ERROR,
    error,
  };
};

const fetchFilterOptionsRequestObject = () => {
  return {
    type: types.FETCH_FILTER_OPTIONS_REQUEST,
  };
};

const fetchFilterOptionsSuccessObject = filters => {
  return {
    type: types.FETCH_FILTER_OPTIONS_SUCCESS,
    filters,
  };
};

const fetchFilterOptionsErrorObject = error => {
  return {
    type: types.FETCH_FILTER_OPTIONS_ERROR,
    error,
  };
};

const fetchSearchResultsRequestObject = () => {
  return {
    type: types.FETCH_SEARCH_RESULTS_REQUEST,
  };
};

const fetchSearchResultsSuccessObject = items => {
  return {
    type: types.FETCH_SEARCH_RESULTS_SUCCESS,
    items,
  };
};

const fetchSearchResultsErrorObject = error => {
  return {
    type: types.FETCH_SEARCH_RESULTS_ERROR,
    error,
  };
};

const updateDisplayFilterOptionsObject = displayOptions => {
  return {
    type: types.UPDATE_DISPLAY_FILTER_OPTIONS,
    displayOptions,
  };
};

const updateAppliedFiltersObject = appliedFilters => {
  return {
    type: types.UPDATE_APPLIED_FILTERS,
    appliedFilters,
  };
};

const pushBrowserHistory = filters => {
  let filterString = queryString.stringify(filters, {encode: true});
  filterString = filterString.replace(/&per_page=\d+/, '');
  return browserHistory.push({
    pathname: '/businesses',
    search: `?${filterString}`,
  });
};

const _debouncedBuildOrganizationsAndMetadata = debounce(
  (filters, dispatch) => {
    _buildOrganizationsAndMetadata(filters, dispatch);
  },
  500
);

const _debouncedfetchSearchResults = debounce(
  (filter, dispatch) => {
    _buildSearchResultsObject(filter, dispatch);
  },
  250,
  {leading: true}
);

const paginationMetadata = links => {
  const _paginationMetadata = {};
  Object.keys(links).forEach(type => {
    const link = links[type];
    if (link) {
      _paginationMetadata[type] = {};
      const urlParse = new URL(link);
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

export function fetchOrganizationById(id) {
  return async dispatch => {
    dispatch(fetchOrganizationByIdRequestObject());
    try {
      const httpResponse = await httpRequest.get(`api/organizations/${id}`);
      dispatch(fetchOrganizationByIdSuccessObject(httpResponse.data));
    } catch (error) {
      dispatch(fetchOrganizationByIdErrorObject(error));
    }
  };
}

export function filterOrganizations(
  filterType,
  currentFilters,
  filterValue,
  removeFilter
) {
  return async dispatch => {
    dispatch(fetchOrganizationsRequestObject());
    const filters = filtersObject(
      filterType,
      currentFilters,
      filterValue,
      removeFilter
    );
    _debouncedBuildOrganizationsAndMetadata(filters, dispatch);
  };
}

export function changePage(page, currentParams) {
  return async dispatch => {
    dispatch(fetchOrganizationsRequestObject());

    const filters = {
      ...currentParams,
      page,
    };
    _debouncedBuildOrganizationsAndMetadata(filters, dispatch);
  };
}

export function updateAppliedFiltersCurrentPage(page, filters) {
  return async dispatch => {
    const appliedFilters = {
      ...filters,
      page,
    };
    dispatch(updateAppliedFiltersObject(appliedFilters));
    pushBrowserHistory(appliedFilters);
  };
}

export function fetchFilterOptions() {
  return async dispatch => {
    try {
      dispatch(fetchFilterOptionsRequestObject());
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
        fetchFilterOptionsSuccessObject({
          businessServices,
          businessTypes,
          stages,
          communities,
          industries,
        })
      );
    } catch (error) {
      dispatch(fetchFilterOptionsErrorObject(error));
    }
  };
}

export function fetchSearchResults(filter) {
  return async dispatch => {
    _debouncedfetchSearchResults(filter, dispatch);
  };
}

export function changeFilterDisplayOptions(
  showBusinessTypes,
  locationToggleSwitch
) {
  return async dispatch => {
    const displayOptions = {
      showBusinessTypes,
      locationToggleSwitch,
    };
    dispatch(updateDisplayFilterOptionsObject(displayOptions));
  };
}

export function updateChipFilters(
  filterType,
  currentFilters,
  filterValue,
  removeFilter
) {
  return dispatch => {
    const appliedFilters = filtersObject(
      filterType,
      currentFilters,
      filterValue,
      removeFilter
    );
    dispatch(updateAppliedFiltersObject(appliedFilters));
    pushBrowserHistory(appliedFilters);
  };
}

async function _buildOrganizationsAndMetadata(filters, dispatch) {
  try {
    const params = {
      ...filters,
      per_page: MaxItemsDisplayedPerPage,
    };
    const httpResponse = await httpRequest.get('api/organizations', {params});
    const organizations = httpResponse.data;
    const metadata = {
      pagination: {
        ...paginationMetadata(JSON.parse(httpResponse.headers.link)),
        currentPage: params.page,
      },
      totalOrganizations: httpResponse.headers['x-total-count'],
    };
    dispatch(fetchOrganizationsSuccessObject(organizations, metadata));
  } catch (error) {
    dispatch(fetchOrganizationsErrorObject(error));
  }
}

async function _buildSearchResultsObject(filter, dispatch) {
  try {
    dispatch(fetchSearchResultsRequestObject());
    const httpResponse = await httpRequest.get('api/search', {
      params: {text: filter},
    });
    const items = httpResponse.data;
    dispatch(fetchSearchResultsSuccessObject(items));
  } catch (error) {
    dispatch(fetchSearchResultsErrorObject(error));
  }
}

const filtersObject = (filterType, filters, filterValue, removeFilter) => {
  const newFilters = cloneDeep(filters);
  if (!newFilters.hasOwnProperty('page')) {
    newFilters.page = 1;
  }
  switch (filterType) {
    case 'category':
      return removeFilter
        ? _removeCategoryFilter(newFilters, filterValue)
        : _addCategoryFilter(newFilters, filterValue);
    case 'organization':
      return _addOrganizationIdFilter(filterValue);
    case 'coordinates':
      return removeFilter
        ? _removeLocationFilter(newFilters)
        : _addLocationFilter(newFilters, filterValue);
    case 'all':
      return _removeAllFilters();
  }
  return newFilters;
};

function _addCategoryFilter(newFilters, filterValue) {
  if (newFilters.id) {
    newFilters.id = [];
  }
  if (!isEmpty(newFilters.page)) {
    _removePaginationFilters(newFilters);
  }
  if (typeof filterValue === 'undefined') {
    return newFilters;
  }
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
  if (!isEmpty(newFilters.page)) {
    _removePaginationFilters(newFilters);
  }
  if (isString(newFilters.category)) {
    newFilters.category = [];
    return newFilters;
  }
  const filterIndex = newFilters.category.indexOf(filterValue);
  newFilters.category.splice(filterIndex, 1);
  return newFilters;
}

function _addOrganizationIdFilter(filterValue) {
  changeFilterDisplayOptions(true, false);
  const newFilters = {
    id: filterValue,
    page: 1,
  };
  return newFilters;
}

function _addLocationFilter(newFilters, filterValue) {
  if (!isEmpty(newFilters.page)) {
    _removePaginationFilters(newFilters);
  }
  newFilters.id = [];

  if (filterValue.sw && filterValue.ne) {
    newFilters.sw_lat = filterValue.sw.lat;
    newFilters.sw_lng = filterValue.sw.lng;
    newFilters.ne_lat = filterValue.ne.lat;
    newFilters.ne_lng = filterValue.ne.lng;

    return newFilters;
  }

  return {page: 1, id: []};
}

function _removeLocationFilter(newFilters) {
  if (!isEmpty(newFilters.page)) {
    _removePaginationFilters(newFilters);
  }
  newFilters.sw_lat = [];
  newFilters.sw_lng = [];
  newFilters.ne_lat = [];
  newFilters.ne_lng = [];
  return newFilters;
}

function _removeAllFilters() {
  return {page: 1};
}

function _removePaginationFilters(newFilters) {
  newFilters.page = 1;
  return newFilters;
}
