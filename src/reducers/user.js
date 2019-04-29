import {UserTypes as types} from '../action-types';

const initialUpdateInformation = {
  loading: false,
  response: {},
  errorsInfo: [],
  errorsPassword: [],
  errorsDelete: {},
  successInfo: false,
  successPassword: false,
  successDelete: false,
};

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
    errors: {},
    success: false,
    loading: false,
  },
  userInformation: {
    username: '',
    email: '',
  },
  updateInformation: {...initialUpdateInformation},
};

const loginRequest = state => {
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
};

const loginSuccess = (action, state) => {
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
};

const loginError = (action, state) => {
  const {loginError: _loginError} = action;
  return {
    ...state,
    error: true,
    loading: false,
    loginError: _loginError,
  };
};

const signUpRequest = state => {
  return {
    ...state,
    loading: true,
    signUpSuccessfully: false,
    singUpErrors: {
      model: '',
      errors: {},
    },
  };
};

const signUpSuccess = state => {
  return {
    ...state,
    signUpSuccessfully: true,
    loading: false,
  };
};

const signUpError = (action, state) => {
  const {singUpErrors} = action;
  return {
    ...state,
    loading: false,
    singUpErrors,
    signUpSuccessfully: false,
  };
};

const passwordRecoveryRequest = state => {
  return {
    ...state,
    loading: true,
  };
};

const passwordRecoverySuccess = (action, state) => {
  const {email} = action;
  return {
    ...state,
    emailReset: email,
    loading: false,
    error: false,
  };
};

const passwordRecoveryError = state => {
  return {
    ...state,
    error: true,
    loading: false,
  };
};

const signOutRequest = state => {
  return {
    ...state,
    authorization: '',
    signOut: {
      errors: {},
      success: false,
      loading: true,
    },
  };
};

const signOutSuccess = state => {
  return {
    ...state,
    signOut: {
      ...state.signOut,
      success: true,
      loading: false,
    },
  };
};

const signOutError = (action, state) => {
  const {errors} = action;
  return {
    ...state,
    signOut: {
      ...state.signOut,
      errors,
      loading: false,
    },
  };
};

const resetError = state => {
  return {
    ...state,
    error: false,
  };
};

const updateUserInformationStart = state => {
  return {
    ...state,
    updateInformation: {...initialUpdateInformation},
  };
};

const updateUserInformationSuccess = (action, state) => {
  const {response} = action;
  return {
    ...state,
    updateInformation: {
      ...state.updateInformation,
      loading: false,
      response,
      successInfo: true,
    },
    userInformation: {
      username: response.name,
      email: response.email,
    },
  };
};

const updateUserInformationFail = (action, state) => {
  const {errors} = action;
  return {
    ...state,
    updateInformation: {
      ...state.updateInformation,
      loading: false,
      errorsInfo: errors,
    },
  };
};

const updatePasswordStart = state => {
  return {
    ...state,
    updateInformation: {...initialUpdateInformation},
  };
};

const updatePasswordSuccess = (action, state) => {
  const {response} = action;
  return {
    ...state,
    updateInformation: {
      ...state.updateInformation,
      loading: false,
      response,
      successPassword: true,
    },
    userInformation: {
      username: response.name,
      email: response.email,
    },
  };
};

const updatePasswordFail = (action, state) => {
  const {errors} = action;
  return {
    ...state,
    updateInformation: {
      ...state.updateInformation,
      loading: false,
      errorsPassword: errors,
    },
  };
};

const deleteAccountStart = state => {
  return {
    ...state,
    updateInformation: {...initialUpdateInformation},
  };
};

const deleteAccountSuccess = (action, state) => {
  const {response} = action;
  return {
    ...state,
    updateInformation: {
      ...state.updateInformation,
      loading: false,
      response,
      successDelete: true,
    },
  };
};

const deleteAccountFail = (action, state) => {
  const {errors} = action;
  return {
    ...state,
    updateInformation: {
      ...state.updateInformation,
      loading: false,
      errorsDelete: errors,
    },
  };
};

const passwordResetRequest = state => {
  return {
    ...state,
    passwordResetSuccess: false,
  };
};

const passwordResetSuccess = state => {
  return {
    ...state,
    loading: false,
    passwordResetSuccess: true,
    error: false,
  };
};

const passwordResetError = state => {
  return {
    ...state,
    error: true,
    passwordResetSuccess: false,
    loading: false,
  };
};

/* eslint-disable complexity */
export default function(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST: {
      return loginRequest(state);
    }

    case types.LOGIN_SUCCESS: {
      return loginSuccess(action, state);
    }

    case types.LOGIN_ERROR: {
      return loginError(action, state);
    }

    case types.SIGN_UP_REQUEST: {
      return signUpRequest(state);
    }

    case types.SIGN_UP_SUCCESS: {
      return signUpSuccess(state);
    }

    case types.SIGN_UP_ERROR: {
      return signUpError(action, state);
    }

    case types.PASSWORD_RECOVERY_REQUEST: {
      return passwordRecoveryRequest(state);
    }

    case types.PASSWORD_RECOVERY_SUCCESS: {
      return passwordRecoverySuccess(action, state);
    }

    case types.PASSWORD_RECOVERY_ERROR: {
      return passwordRecoveryError(state);
    }

    case types.SIGN_OUT_REQUEST: {
      return signOutRequest(state);
    }

    case types.SIGN_OUT_SUCCESS: {
      return signOutSuccess(state);
    }

    case types.SIGN_OUT_ERROR: {
      return signOutError(action, state);
    }

    case types.RESET_ERROR: {
      return resetError(state);
    }

    case types.UPDATE_USER_INFORMATION_START: {
      return updateUserInformationStart(state);
    }

    case types.UPDATE_USER_INFORMATION_SUCCESS: {
      return updateUserInformationSuccess(action, state);
    }

    case types.UPDATE_USER_INFORMATION_FAIL: {
      return updateUserInformationFail(action, state);
    }

    case types.UPDATE_PASSWORD_START: {
      return updatePasswordStart(state);
    }

    case types.UPDATE_PASSWORD_SUCCESS: {
      return updatePasswordSuccess(action, state);
    }

    case types.UPDATE_PASSWORD_FAIL: {
      return updatePasswordFail(action, state);
    }

    case types.DELETE_ACCOUNT_START: {
      return deleteAccountStart(state);
    }

    case types.DELETE_ACCOUNT_SUCCESS: {
      return deleteAccountSuccess(action, state);
    }

    case types.DELETE_ACCOUNT_FAIL: {
      return deleteAccountFail(action, state);
    }

    case types.PASSWORD_RESET_REQUEST: {
      return passwordResetRequest(state);
    }

    case types.PASSWORD_RESET_SUCCESS: {
      return passwordResetSuccess(state);
    }

    case types.PASSWORD_RESET_ERROR: {
      return passwordResetError(state);
    }

    default:
      return state;
  }
}
/* eslint-enable complexity */
