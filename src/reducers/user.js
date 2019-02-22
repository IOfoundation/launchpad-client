import {UserTypes as types} from '../action-types';

const initialState = {
  loading: false,
  authorization: '',
  error: false,
  emailReset: '',
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
        error: false,
      };
    }

    case types.LOGIN_ERROR: {
      return {
        ...state,
        error: true,
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
        error: false,
      };
    }

    case types.SIGN_UP_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }

    case types.PASSWORD_RECOVERY_REQUEST: {
      return {
        ...state,
      };
    }

    case types.PASSWORD_RECOVERY_SUCCESS: {
      const {email} = action;
      return {
        ...state,
        emailReset: email,
        loading: false,
        error: false,
      };
    }

    case types.PASSWORD_RECOVERY_ERROR: {
      return {
        ...state,
        error: true,
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
        error: false,
      };
    }

    case types.SIGN_OUT_ERROR: {
      return {
        ...state,
        error: true,
        loading: false,
      };
    }

    case types.RESET_ERROR: {
      return {
        ...state,
        error: false,
      };
    }

    default:
      return state;
  }
}
