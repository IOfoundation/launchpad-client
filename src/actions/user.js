import {UserTypes as types} from '../action-types';
import {httpRequest} from '../utils';

const loginStart = config => {
  return {
    type: types.LOGIN_REQUEST,
    ...config,
  };
};

const loginSuccess = ({authorization, username, organizationId, email}) => {
  return {
    type: types.LOGIN_SUCCESS,
    authorization,
    organizationId,
    username,
    email,
  };
};

const loginError = _loginError => {
  return {
    type: types.LOGIN_ERROR,
    loginError: _loginError,
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

const singUpError = singUpErrors => {
  return {
    type: types.SIGN_UP_ERROR,
    singUpErrors,
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

export const signOut = Authorization => {
  return async dispatch => {
    try {
      const config = {
        headers: {Authorization},
      };
      dispatch(signOutStart());
      const httpResponse = await httpRequest.delete(
        '/api/users/sign_out',
        null,
        config
      );
      localStorage.removeItem('userAuth');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('organizationId');
      dispatch(signOutSuccess(httpResponse.data));
    } catch (error) {
      dispatch(signOutError());
    }
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
      const data = {
        authorization: httpResponse.headers.authorization,
        username: httpResponse.data.name,
        email: httpResponse.data.email,
        organizationId: httpResponse.data.organization_id,
      };

      localStorage.setItem('userAuth', httpResponse.headers.authorization);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('organizationId', httpResponse.data.organization_id);
      dispatch(loginSuccess(data));
    } catch (errors) {
      dispatch(loginError(errors.data.error));
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
      dispatch(singUpError(error.data));
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

export const resetError = () => {
  return {
    type: types.RESET_ERROR,
  };
};

const updateUserInformationStart = () => {
  return {
    type: types.UPDATE_USER_INFORMATION_START,
  };
};

const updateUserInformationSuccess = response => {
  return {
    type: types.UPDATE_USER_INFORMATION_SUCCESS,
    response,
  };
};

const updateUserInformationFail = errors => {
  return {
    type: types.UPDATE_USER_INFORMATION_FAIL,
    errors,
  };
};

export const updateUserInformation = ({Authorization, name, email}) => {
  return async dispatch => {
    try {
      const config = {
        headers: {Authorization},
      };
      dispatch(updateUserInformationStart());
      const httpResponse = await httpRequest.put(
        '/api/users',
        {
          api_user: {
            name,
            email,
          },
        },
        config
      );
      dispatch(updateUserInformationSuccess(httpResponse.data));
    } catch (errors) {
      dispatch(updateUserInformationFail(errors.data.errors));
    }
  };
};

const updatePasswordStart = () => {
  return {
    type: types.UPDATE_PASSWORD_START,
  };
};

const updatePasswordSuccess = response => {
  return {
    type: types.UPDATE_PASSWORD_SUCCESS,
    response,
  };
};

const updatePasswordFail = errors => {
  return {
    type: types.UPDATE_PASSWORD_FAIL,
    errors,
  };
};

export const updatePassword = ({
  Authorization,
  current_password,
  password,
  password_confirmation,
}) => {
  return async dispatch => {
    try {
      const config = {
        headers: {Authorization},
      };
      dispatch(updatePasswordStart());
      const httpResponse = await httpRequest.put(
        '/api/users',
        {
          api_user: {
            current_password,
            password,
            password_confirmation,
          },
        },
        config
      );
      dispatch(updatePasswordSuccess(httpResponse.data));
    } catch (errors) {
      dispatch(updatePasswordFail(errors.data.errors));
    }
  };
};
