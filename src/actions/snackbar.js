import {SnackbarTypes as types} from '../action-types';
import {httpRequest} from '../utils';

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

const testingSnackbarRequest = config => {
  return {
    type: types.TESTING_SNACKBAR_REQUEST,
    ...config,
  };
};

const testingSnackbarSuccess = response => {
  return {
    type: types.TESTING_SNACKBAR_SUCCESS,
    response,
  };
};

const testingSnackbarError = error => {
  return {
    type: types.TESTING_SNACKBAR_ERROR,
    error,
  };
};

export const testingSnackbar = config => {
  return async dispatch => {
    try {
      dispatch(testingSnackbarRequest(config));
      const httpResponse = await httpRequest.get('/api/categories');
      dispatch(testingSnackbarSuccess({status: httpResponse.status}));
    } catch (error) {
      dispatch(testingSnackbarError(error));
    }
  };
};
