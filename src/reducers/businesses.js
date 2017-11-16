import {BusinessTypes as types} from '../action-types';
import {isEmpty} from 'lodash';

type STATE = {};
type ACTION = {};

const initialState: STATE = {
  organizations: [],
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
    case types.FETCH_DATA: {
      const {organizations, metadata} = action;
      if (organizations.id) { organizations = [organizations]; }
      const locations = isEmpty(organizations) ? (null) : (organizations.map(org => org.locations).reduce((a, b) => a.concat(b)));
      return {
        ...state,
        organizations,
        locations,
        metadata
      };
    }
    case types.FETCH_FILTERS_OPTIONS: {
      const {filters} = action;
      return {
        ...state,
        filters,
      };
    }

    case types.FETCH_SEARCH_RESULTS: {
      const {items} = action;
      return {
        ...state,
        items,
      };
    }

    case types.FETCH_DISPLAY_FILTER_OPTIONS: {
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
