import {BusinessTypes as types} from '../action-types';
import {isEmpty} from 'lodash';


type STATE = {};
type ACTION = {};

const initialState: STATE = {
  business: null,
  organizations: [],
  filters: null,
  metadata: null,
};

export default function(state: STATE = initialState, action: ACTION): STATE {
  switch (action.type) {
    case types.FETCH_ORGANIZATIONS: {
      const {organizations} = action;
      if (isEmpty(organizations)) {

      }
      const locations = isEmpty(organizations) ? (
        null
      ) : (
        organizations.map(org => org.locations).reduce((a, b) => a.concat(b))
      );
      return {
        ...state,
        organizations,
        locations,
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
