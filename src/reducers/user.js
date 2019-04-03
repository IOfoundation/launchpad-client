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
  userInformation: {
    username: '',
    email: '',
  },
  updateInformation: {
    loading: false,
    response: {},
    errorsInfo: [],
    errorsPassword: [],
    successInfo: false,
    successPassword: false,
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
        userInformation: {
          username: '',
          email: '',
        },
      };
    }

    case types.LOGIN_SUCCESS: {
      const {authorization, organizationId, username, email} = action;
      return {
        ...state,
        authorization,
        loading: false,
        error: false,
        loginError: '',
        organizationId,
        userInformation: {
          username,
          email,
        },
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

    case types.UPDATE_USER_INFORMATION_START: {
      return {
        ...state,
        updateInformation: {
          loading: true,
          response: {},
          errorsInfo: [],
          successInfo: false,
        },
      };
    }

    case types.UPDATE_USER_INFORMATION_SUCCESS: {
      const {response} = action;
      return {
        ...state,
        updateInformation: {
          ...state.updateInformation,
          loading: false,
          response,
          successInfo: true,
        },
      };
    }

    case types.UPDATE_USER_INFORMATION_FAIL: {
      const {errors} = action;
      return {
        ...state,
        updateInformation: {
          ...state.updateInformation,
          loading: false,
          errorsInfo: errors,
        },
      };
    }

    case types.UPDATE_PASSWORD_START: {
      return {
        ...state,
        updateInformation: {
          loading: true,
          response: {},
          errorsPassword: [],
          successPassword: false,
        },
      };
    }

    case types.UPDATE_PASSWORD_SUCCESS: {
      const {response} = action;
      return {
        ...state,
        updateInformation: {
          ...state.updateInformation,
          loading: false,
          response,
          successPassword: true,
        },
      };
    }

    case types.UPDATE_PASSWORD_FAIL: {
      const {errors} = action;
      return {
        ...state,
        updateInformation: {
          ...state.updateInformation,
          loading: false,
          errorsPassword: errors,
        },
      };
    }

    default:
      return state;
  }
}
