import {DeleteLocationTypes as types} from '../../action-types';

const initialState = {
  error: false,
  errors: [],
  loading: false,
  location: {},
  success: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.DELETE_LOCATION_START: {
      return {
        error: false,
        errors: [],
        loading: true,
        location: {},
        success: false,
      };
    }

    case types.DELETE_LOCATION_SUCCESS: {
      const {location} = action;

      return {
        ...state,
        loading: false,
        location,
        success: true,
      };
    }

    case types.DELETE_LOCATION_ERROR: {
      const {errors} = action;
      return {
        ...state,
        error: true,
        errors,
        loading: false,
      };
    }

    default:
      return state;
  }
}
