import {EventsCreateTypes as types} from '../../action-types';

const initialState = {
  data: {},
  error: false,
  errors: [],
  loading: false,
  success: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_EVENT_START: {
      return {
        data: {},
        error: false,
        errors: [],
        loading: true,
        success: false,
      };
    }

    case types.CREATE_EVENT_SUCCESS: {
      const {data} = action;

      return {
        ...state,
        data,
        loading: false,
        success: true,
      };
    }

    case types.CREATE_EVENT_ERROR: {
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
