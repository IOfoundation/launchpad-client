import {BusinessTypes as types} from '../action-types';

type STATE = {};
type ACTION = {};

const initialState: STATE = {
  data: [],
};

export default function(state: STATE = initialState, action: ACTION): STATE {
  switch (action.type) {
    case types.FETCH_BUSINESSESS: {
      const {businesses} = action;
      return {
        ...state,
        businesses,
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
