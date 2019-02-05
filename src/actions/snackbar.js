import {SnackbarTypes as types} from '../action-types';

export const showSnackbar = () => {
  return {
    type: types.SHOW_SNACKBAR,
  };
};

export const hideSnackbar = () => {
  return {
    type: types.HIDE_SNACKBAR,
  };
};
