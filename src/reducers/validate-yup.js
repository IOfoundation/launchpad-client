import {ValidateYupTypes as types} from '../action-types';

const initialState = {
  loading: false,
  success: false,
  error: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.VALIDATE_REQUEST: {
      return {
        loading: true,
        success: false,
        error: false,
      };
    }

    case types.VALIDATE_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
      };
    }

    case types.VALIDATE_FAIL: {
      return {
        ...state,
        error: true,
        loading: false,
      };
    }

    default:
      return state;
  }
}
