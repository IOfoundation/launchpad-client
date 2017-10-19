import {BusinessTypes as types} from '../action-types';
import {isEmpty} from 'lodash';


type STATE = {};
type ACTION = {};

const initialState: STATE = {
  organization: null,
  organizations: [],
  filters: null,
  metadata: null,
};

export default function(state: STATE = initialState, action: ACTION): STATE {
  switch (action.type) {
    case types.FETCH_ORGANIZATIONS: {
      const {organizations} = action;
      if (organizations.id) { organizations = [organizations]; }
      const locations = organizations.id ? (organizations.locations) : (organizations.map(org => org.locations).reduce((a, b) => a.concat(b)));
      return {
        ...state,
        organizations,
        locations,
      };
    }

    case types.FETCH_FILTERS_OPTIONS: {
      const {filters} = action;
      return {
        ...state,
        filters,
      };
    }

    case types.FETCH_BUSINESSES_METADATA: {
      const {metadata} = action;
      return {
        ...state,
        metadata,
      };
    }

    case types.FETCH_SEARCH_RESULTS: {
      const {items} = action;
      return {
        ...state,
        items,
      };
    }

    default:
      return state;
  }
}
