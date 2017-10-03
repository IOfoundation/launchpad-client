import {BusinessTypes as types} from '../action-types';

type STATE = {};
type ACTION = {};

const initialState: STATE = {
  business: null,
  locations: [],
  organizations: [],
  filters: null,
  metadata: null,
};

export default function(state: STATE = initialState, action: ACTION): STATE {
  switch (action.type) {
    case types.FETCH_LOCATIONS: {
      const {locations} = action;

      return {
        ...state,
        locations,
        organizations: getOrganizationsFromLocations(locations),
      };
    }

    case types.FETCH_BUSINESS: {
      const {business} = action;
      return {
        ...state,
        business,
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

    default:
      return state;
  }
}

function getOrganizationsFromLocations(locations) {
  return filterById(locations.map(location => location.organization));
}

function filterById(arr) {
  var f = [];
  return arr.filter(n => {
    return f.indexOf(n.id) == -1 && f.push(n.id);
  });
}
