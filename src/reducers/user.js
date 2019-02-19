import {UserTypes as types} from '../action-types';

const initialState = {
  loading: false,
  authorization: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST: {
      return {
        ...state,
      };
    }

    case types.LOGIN_SUCCESS: {
      const {authorization} = action;
      return {
        ...state,
        authorization,
        loading: false,
      };
    }

    case types.LOGIN_ERROR: {
      const {error} = action;
      return {
        ...state,
        error,
        loading: false,
      };
    }

    case types.SIGN_UP_REQUEST: {
      return {
        ...state,
      };
    }

    case types.SIGN_UP_SUCCESS: {
      const {response} = action;
      return {
        ...state,
        response,
        loading: false,
      };
    }

    case types.SIGN_UP_ERROR: {
      const {error} = action;
      return {
        ...state,
        error,
        loading: false,
      };
    }

    case types.PASSWORD_RECOVERY_REQUEST: {
      return {
        ...state,
      };
    }

    case types.PASSWORD_RECOVERY_SUCCESS: {
      const {response} = action;
      return {
        ...state,
        response,
        loading: false,
      };
    }

    case types.PASSWORD_RECOVERY_ERROR: {
      const {error} = action;
      return {
        ...state,
        error,
        loading: false,
      };
    }

    case types.SIGN_OUT_REQUEST: {
      return {
        ...state,
      };
    }

    case types.SIGN_OUT_SUCCESS: {
      const {response} = action;
      return {
        ...state,
        response,
        loading: false,
      };
    }

    case types.SIGN_OUT_ERROR: {
      const {error} = action;
      return {
        ...state,
        error,
        loading: false,
      };
    }

    default:
      return state;
  }
}
