import {UserTypes as types} from '../action-types';

const initialState = {
  loading: false,
  authorization: '',
  error: false,
  emailReset: '',
  signUpSuccessfully: false,
  singUpErrors: {
    model: '',
    errors: {},
  },
  loginError: '',
  passwordResetSuccess: false,
  organizationId: 0,
  signOut: {
    data: {},
    errors: {},
    success: false,
    loading: false,
  },
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST: {
      return {
        ...state,
        authorization: '',
        loading: true,
        error: false,
        loginError: '',
        organizationId: 0,
      };
    }

    case types.LOGIN_SUCCESS: {
      const {authorization, organizationId} = action;
      return {
        ...state,
        authorization,
        loading: false,
        error: false,
        loginError: '',
        organizationId,
      };
    }

    case types.LOGIN_ERROR: {
      const {loginError} = action;
      return {
        ...state,
        error: true,
        loading: false,
        loginError,
      };
    }

    case types.SIGN_UP_REQUEST: {
      return {
        ...state,
        loading: true,
        signUpSuccessfully: false,
        singUpErrors: {
          model: '',
          errors: {},
        },
      };
    }

    case types.SIGN_UP_SUCCESS: {
      return {
        ...state,
        signUpSuccessfully: true,
        loading: false,
      };
    }

    case types.SIGN_UP_ERROR: {
      const {singUpErrors} = action;
      return {
        ...state,
        loading: false,
        singUpErrors,
        signUpSuccessfully: false,
      };
    }

    case types.PASSWORD_RECOVERY_REQUEST: {
      return {
        ...state,
        loading: true,
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
        signOut: {
          data: {},
          errors: {},
          success: false,
          loading: true,
        },
      };
    }

    case types.SIGN_OUT_SUCCESS: {
      const {response} = action;
      return {
        ...state,
        signOut: {
          ...state.signOut,
          data: response,
          success: true,
          loading: false,
        },
      };
    }

    case types.SIGN_OUT_ERROR: {
      const {errors} = action;
      return {
        ...state,
        signOut: {
          ...state.signOut,
          errors,
          loading: false,
        },
      };
    }

    case types.RESET_ERROR: {
      return {
        ...state,
        error: false,
      };
    }

    case types.PASSWORD_RESET_REQUEST: {
      return {
        ...state,
        passwordResetSuccess: false,
      };
    }

    case types.PASSWORD_RESET_SUCCESS: {
      return {
        ...state,
        loading: false,
        passwordResetSuccess: true,
        error: false,
      };
    }

    case types.PASSWORD_RESET_ERROR: {
      return {
        ...state,
        error: true,
        passwordResetSuccess: false,
        loading: false,
      };
    }

    default:
      return state;
  }
}
