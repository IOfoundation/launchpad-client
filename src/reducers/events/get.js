import {GetEventTypes as types} from '../../action-types';

const initialState = {
  data: {},
  error: false,
  errors: [],
  loading: true,
  success: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.GET_EVENT_START: {
      return {
        data: {},
        error: false,
        errors: [],
        loading: true,
        success: false,
      };
    }

    case types.GET_EVENT_SUCCESS: {
      const {data} = action;

      return {
        ...state,
        data,
        loading: false,
        success: true,
      };
    }

    case types.GET_EVENT_ERROR: {
      const {errors} = action;
      return {
        ...state,
        error: true,
        errors,
        loading: false,
      };
    }

    case types.SET_LOADING: {
      const {loading} = action;
      return {
        ...state,
        loading,
      };
    }

    default:
      return state;
  }
}
