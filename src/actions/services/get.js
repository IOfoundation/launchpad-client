import {GetServiceTypes as types} from '../../action-types';
import {httpRequest, verifyUnauthorizedErrors} from '@Utils';

const getServiceStart = () => {
  return {
    type: types.GET_SERVICE_START,
  };
};

const getServiceSuccess = data => {
  return {
    type: types.GET_SERVICE_SUCCESS,
    data,
  };
};

const getServiceError = errors => {
  return {
    type: types.GET_SERVICE_ERROR,
    errors,
  };
};

export const get = ({Authorization, locationId, serviceId}) => {
  return async dispatch => {
    try {
      dispatch(getServiceStart());
      const config = {
        headers: {Authorization},
      };
      const httpResponse = await httpRequest.get(
        `/api/locations/${locationId}/services/${serviceId}`,
        config
      );

      dispatch(getServiceSuccess(httpResponse.data));
    } catch (errors) {
      verifyUnauthorizedErrors(dispatch, errors);
      if (errors.data && errors.data.errors) {
        dispatch(getServiceError(errors.data.errors));
      } else {
        dispatch(getServiceError(errors.data));
      }
    }
  };
};

export const setLoading = loading => {
  return {
    type: types.SET_LOADING,
    loading,
  };
};
