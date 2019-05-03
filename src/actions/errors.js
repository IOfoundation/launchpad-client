import {ErrorsTypes as types} from '../action-types';

export const userUnauthorized = (isSigningOut = false) => {
  return {
    type: types.USER_UNAUTHORIZED,
    isSigningOut,
  };
};

export const userAuthorized = () => {
  return {
    type: types.USER_AUTHORIZED,
  };
};
