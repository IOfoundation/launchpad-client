import {ErrorsTypes as types} from '../action-types';

export const userUnauthorized = () => {
  return {
    type: types.USER_UNAUTHORIZED,
  };
};

export const userAuthorized = () => {
  return {
    type: types.USER_AUTHORIZED,
  };
};
