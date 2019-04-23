import {DeleteServiceTypes as types} from '../../action-types';

const initialState = {
  data: {},
  error: false,
  errors: [],
  loading: false,
  success: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.DELETE_SERVICE_START: {
      return {
        data: {},
        error: false,
        errors: [],
        loading: true,
        success: false,
      };
    }

    case types.DELETE_SERVICE_SUCCESS: {
      const {data} = action;

      return {
        ...state,
        data,
        loading: false,
        success: true,
      };
    }

    case types.DELETE_SERVICE_ERROR: {
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
