import {UserInformationTypes as types} from '../action-types';
import {httpRequest} from '@Utils';
import * as errorsActions from './errors';

const getUserInformationStart = () => {
  return {
    type: types.GET_USER_INFORMATION_REQUEST,
  };
};

const getUserInformationSuccess = featuredEvents => {
  return {
    type: types.GET_USER_INFORMATION_SUCCESS,
    featuredEvents,
  };
};

const getUserInformationError = error => {
  return {
    type: types.GET_USER_INFORMATION_FAIL,
    error,
  };
};

export const getUserInformation = ({Authorization}) => {
  return async dispatch => {
    try {
      dispatch(getUserInformationStart());
      const config = {
        headers: {Authorization},
      };
      const httpResponse = await httpRequest.get('/api/users', config);
      dispatch(getUserInformationSuccess(httpResponse.data));
    } catch (errors) {
      if (errors && errors.status === 401) {
        dispatch(errorsActions.userUnauthorized());
      }
      dispatch(getUserInformationError(errors.data));
    }
  };
};
