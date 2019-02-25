import {UserTypes as types} from '../action-types';
import {httpRequest} from '../utils';

const loginStart = config => {
  return {
    type: types.LOGIN_REQUEST,
    ...config,
  };
};

const loginSuccess = authorization => {
  return {
    type: types.LOGIN_SUCCESS,
    authorization,
  };
};

const loginError = () => {
  return {
    type: types.LOGIN_ERROR,
  };
};

const singUpStart = () => {
  return {
    type: types.SIGN_UP_REQUEST,
  };
};

const singUpSuccess = () => {
  return {
    type: types.SIGN_UP_SUCCESS,
  };
};

const singUpError = singUpErros => {
  return {
    type: types.SIGN_UP_ERROR,
    singUpErros,
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

const passwordRecoveryError = () => {
  return {
    type: types.PASSWORD_RECOVERY_ERROR,
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

const signOutError = () => {
  return {
    type: types.SIGN_OUT_ERROR,
  };
};

const post = ({url, params, startFn, successFn, errorFn}) => {
  return async dispatch => {
    try {
      dispatch(startFn());
      const httpResponse = await httpRequest.post(url, params);
      dispatch(successFn(httpResponse.data));
    } catch (error) {
      dispatch(errorFn());
    }
  };
};

export const login = ({password, email}) => {
  return async dispatch => {
    try {
      dispatch(loginStart());
      const httpResponse = await httpRequest.post('/api/users/sign_in', {
        api_user: {
          email,
          password,
        },
      });

      dispatch(loginSuccess(httpResponse.headers.authorization));
    } catch (error) {
      dispatch(loginError());
    }
  };
};

export const singUp = ({
  password,
  email,
  name,
  organization_name,
  organization_description,
}) => {
  return async dispatch => {
    try {
      dispatch(singUpStart());
      await httpRequest.post('/api/users', {
        api_user: {
          email,
          password,
          name,
          organization_name,
          organization_description,
        },
      });

      dispatch(singUpSuccess());
    } catch (error) {
      dispatch(singUpError(error.data.errors));
    }
  };
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
      dispatch(signOutError());
    }
  };
};

export const resetError = () => {
  return {
    type: types.RESET_ERROR,
  };
};
