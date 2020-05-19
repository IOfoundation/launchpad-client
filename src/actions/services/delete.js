import {DeleteServiceTypes as types} from '../../action-types';
import {httpRequest, verifyUnauthorizedErrors} from '@Utils';

const deleteServiceStart = () => {
  return {
    type: types.DELETE_SERVICE_START,
  };
};

const deleteServiceSuccess = data => {
  return {
    type: types.DELETE_SERVICE_SUCCESS,
    data,
  };
};

const deleteServiceError = errors => {
  return {
    type: types.DELETE_SERVICE_ERROR,
    errors,
  };
};

export const remove = ({Authorization, locationId, serviceId}) => {
  return async dispatch => {
    try {
      dispatch(deleteServiceStart());
      const config = {
        headers: {Authorization},
      };
      const httpResponse = await httpRequest.delete(
        `/api/locations/${locationId}/services/${serviceId}`,
        config
      );

      dispatch(deleteServiceSuccess(httpResponse.data));
    } catch (errors) {
      verifyUnauthorizedErrors(dispatch, errors);
      if (errors.data && errors.data.errors) {
        dispatch(deleteServiceError(errors.data.errors));
      } else {
        dispatch(deleteServiceError(errors.data));
      }
    }
  };
};
