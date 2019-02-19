import {UserTypes as types} from '../action-types';
import httpRequest from '../utils/httpRequest';

const loginStart = config => {
  return {
    type: types.LOGIN_REQUEST,
    ...config,
  };
};

const loginSuccess = response => {
  return {
    type: types.LOGIN_SUCCESS,
    response,
  };
};

const loginError = error => {
  return {
    type: types.LOGIN_ERROR,
    error,
  };
};

const singUpStart = config => {
  return {
    type: types.SIGN_UP_REQUEST,
    ...config,
  };
};

const singUpSuccess = response => {
  return {
    type: types.SIGN_UP_SUCCESS,
    response,
  };
};

const singUpError = error => {
  return {
    type: types.SIGN_UP_ERROR,
    error,
  };
};

const passwordRecoveryStart = config => {
  return {
    type: types.PASSWORD_RECOVERY_REQUEST,
    ...config,
  };
};

const passwordRecoverySuccess = response => {
  return {
    type: types.PASSWORD_RECOVERY_SUCCESS,
    response,
  };
};

const passwordRecoveryError = error => {
  return {
    type: types.PASSWORD_RECOVERY_ERROR,
    error,
  };
};

const signOutStart = config => {
  return {
    type: types.SIGN_OUT_REQUEST,
    ...config,
  };
};

const signOutSuccess = response => {
  return {
    type: types.SIGN_OUT_SUCCESS,
    response,
  };
};

const signOutError = error => {
  return {
    type: types.SIGN_OUT_ERROR,
    error,
  };
};

const post = ({url, params, startFn, successFn, errorFn}) => {
  return async dispatch => {
    try {
      dispatch(startFn());
      const httpResponse = await httpRequest.post(url, params);
      dispatch(successFn(httpResponse.data));
    } catch (error) {
      dispatch(errorFn(error));
    }
  };
};

export const login = ({password, email}) => {
  return post({
    url: '/api/users/sign_in',
    params: {
      api_user: {
        email,
        password,
      },
    },
    startFn: loginStart,
    successFn: loginSuccess,
    errorFn: loginError,
  });
};

export const singUp = ({
  password,
  email,
  name,
  organization_name,
  organization_description,
}) => {
  return post({
    url: '/api/users',
    params: {
      email,
      password,
      name,
      organization_name,
      organization_description,
    },
    startFn: singUpStart,
    successFn: singUpSuccess,
    errorFn: singUpError,
  });
};

export const passwordRecovery = ({email}) => {
  return post({
    url: '/users/password',
    params: {user: {email}},
    startFn: passwordRecoveryStart,
    successFn: passwordRecoverySuccess,
    errorFn: passwordRecoveryError,
  });
};

export const signOut = token => {
  return async dispatch => {
    try {
      const config = {
        headers: {Authorization: 'Bearer ' + token},
      };
      dispatch(signOutStart());
      const httpResponse = await httpRequest.delete(
        '/api/users/sign_out',
        null,
        config
      );
      dispatch(signOutSuccess(httpResponse.data));
    } catch (error) {
      dispatch(signOutError(error));
    }
  };
};
