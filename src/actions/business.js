import {BusinessTypes as types} from '../action-types';
import {CategoriesConstants} from '../constants';
import httpRequest from '../utils/httpRequest';
import {browserHistory} from 'react-router';
import queryString from 'query-string';
import {isEmpty, isString, cloneDeep} from 'lodash';

const MaxItemsDisplayedPerPage = 10;

const paginationMetadata = links => {
  const _paginationMetadata = {};
  Object.keys(links).forEach(type => {
    const link = links[type];
    if (link) {
      _paginationMetadata[type] = {};
      const urlParse = new URL(link);
      urlParse.search
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

const organizationDataObject = organization => {
  return {
    type: types.FETCH_ORGANIZATION,
    organization,
  };
};

const organizationsDataObject = organizations => {
  return {
    type: types.FETCH_ORGANIZATIONS,
    organizations,
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

const filtersObject = (filterValue, filters, removeFilter) => {
  const newFilters = cloneDeep(filters);
  if (removeFilter) {
    _removeFilters(filterValue, newFilters);
  } else {
    _addFilters(filterValue, newFilters);
  }
  return newFilters;
};

const pushBrowserHistory = filters => {
  let filterString = queryString.stringify(filters, {encode: false});
  filterString = filterString.replace(/&per_page=\d+/, '');
  return browserHistory.push({
    pathname: '/businesses',
    search: `?${filterString}`,
  });
};

export function fetchOrganization(organizationId) {
  return async (dispatch: Function) => {
    const httpResponse = await httpRequest.get(
      `/api/organizations/${organizationId}`
    );
    const organization = httpResponse.data;
    dispatch(organizationDataObject(organization));
  };
}

export function filterBusinessesByName(filterValue, currentParams) {
  return async (dispatch: Function) => {
    const filters = filtersObject(null, filterValue, currentParams);
    const httpResponse = await httpRequest.get('/api/search', {
      params: filters,
    });
    const locations = httpResponse.data;
    const metadata = {
      pagination: {
        currentPage: currentParams.page,
      },
    };
    dispatch(locationsDataObject(locations));
    dispatch(businessesMetaDataObject(metadata));
    pushBrowserHistory(filters);
  };
}

export function filterOrganizations(filterValue, currentParams, removeFilter) {
  return async (dispatch: Function) => {
    const filters = filtersObject(filterValue, currentParams, removeFilter);
    const params = {
      ...filters,
      per_page: MaxItemsDisplayedPerPage,
    };
    if (!params.hasOwnProperty('page')) {
      Object.assign(params, {page: 1});
    }

    const httpResponse = await httpRequest.get('/api/organizations/search', {
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
    dispatch(organizationsDataObject(organizations));
    dispatch(businessesMetaDataObject(metadata));
    pushBrowserHistory(filters);
  };
}

export function changePage(page, currentParams) {
  return async (dispatch: Function) => {
    const params = {
      ...currentParams,
      page,
      per_page: MaxItemsDisplayedPerPage,
    };

    const httpResponse = await httpRequest.get('/api/organizations/search', {
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
    dispatch(organizationsDataObject(organizations));
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

function _removeFilters(filterValue, newFilters) {
  if (isString(newFilters.category)) {
    newFilters.category = [];
  } else {
    const filterIndex = newFilters.category.indexOf(filterValue);
    newFilters.category.splice(filterIndex, 1);
  }
  return newFilters;
}

function _addFilters(filterValue, newFilters) {
  if (!filterValue) {
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
