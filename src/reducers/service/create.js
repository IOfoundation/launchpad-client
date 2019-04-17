import {CreateServiceTypes as types} from '../../action-types';

const initialState = {
  error: false,
  errors: [],
  loading: false,
  location: {},
  success: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_SERVICE_START: {
      return {
        error: false,
        errors: [],
        loading: true,
        location: {},
        success: false,
      };
    }

    case types.CREATE_SERVICE_SUCCESS: {
      const {location} = action;

      return {
        ...state,
        loading: false,
        location,
        success: true,
      };
    }

    case types.CREATE_SERVICE_ERROR: {
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
