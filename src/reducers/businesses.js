import {BusinessTypes as types} from '../action-types';
import {isEmpty} from 'lodash';

type STATE = {};
type ACTION = {};

const initialState: STATE = {
  organizations: [],
  locations: [],
  filters: null,
  metadata: {
    pagination: {
      last: {
        page: [],
      },
    },
  },
};

export default function(state: STATE = initialState, action: ACTION): STATE {
  switch (action.type) {
    case types.FETCH_ORGANIZATIONS_REQUEST: {
      return {
        ...state,
      };
    }

    case types.FETCH_ORGANIZATIONS_SUCCESS: {
      const {organizations, metadata} = action;
      if (organizations.id) {
        return {
          ...state,
          organizations: [organizations],
          locations: organizations.locations,
          metadata,
        };
      }
      const locations = isEmpty(organizations)
        ? null
        : organizations.map(org => org.locations).reduce((a, b) => a.concat(b));
      return {
        ...state,
        organizations,
        locations,
        metadata,
      };
    }

    case types.FETCH_ORGANIZATIONS_ERROR: {
      const {error} = action;
      return {
        ...state,
        error,
      };
    }

    case types.FETCH_FILTER_OPTIONS_REQUEST: {
      return {
        ...state,
      };
    }

    case types.FETCH_FILTER_OPTIONS_SUCCESS: {
      const {filters} = action;
      return {
        ...state,
        filters,
      };
    }

    case types.FETCH_FILTER_OPTIONS_ERROR: {
      const {error} = action;
      return {
        ...state,
        error,
      };
    }

    case types.FETCH_SEARCH_RESULTS_REQUEST: {
      return {
        ...state,
      };
    }

    case types.FETCH_SEARCH_RESULTS_SUCCESS: {
      const {items} = action;
      return {
        ...state,
        items,
      };
    }

    case types.FETCH_SEARCH_RESULTS_ERROR: {
      const {error} = action;
      return {
        ...state,
        error,
      };
    }

    case types.UPDATE_DISPLAY_FILTER_OPTIONS: {
      const {displayOptions} = action;
      return {
        ...state,
        displayOptions,
      };
    }

    case types.UPDATE_APPLIED_FILTERS: {
      const {appliedFilters} = action;
      return {
        ...state,
        appliedFilters,
      };
    }

    default:
      return state;
  }
}
