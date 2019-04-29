import {UserInformationTypes as types} from '../action-types';
import {httpRequest, verifyUnauthorizedErrors} from '@Utils';

const getUserInformationStart = () => {
  return {
    type: types.GET_USER_INFORMATION_REQUEST,
  };
};

const getUserInformationSuccess = information => {
  return {
    type: types.GET_USER_INFORMATION_SUCCESS,
    information,
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
      verifyUnauthorizedErrors(dispatch, errors);
      dispatch(getUserInformationError(errors.data));
    }
  };
};
