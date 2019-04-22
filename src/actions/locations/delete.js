import {DeleteLocationTypes as types} from '../../action-types';
import {httpRequest} from '@Utils';

const deleteLocationStart = () => {
  return {
    type: types.DELETE_LOCATION_START,
  };
};

const deleteLocationSuccess = location => {
  return {
    type: types.DELETE_LOCATION_SUCCESS,
    location,
  };
};

const deleteLocationError = errors => {
  return {
    type: types.DELETE_LOCATION_ERROR,
    errors,
  };
};

export const deleteLocation = ({Authorization, locationId}) => {
  return async dispatch => {
    try {
      dispatch(deleteLocationStart());
      const config = {
        headers: {Authorization},
      };

      const httpResponse = await httpRequest.delete(
        `/api/locations/${locationId}`,
        config
      );

      dispatch(deleteLocationSuccess(httpResponse.data));
    } catch (errors) {
      if (errors.data && errors.data.errors) {
        dispatch(deleteLocationError(errors.data.errors));
      } else {
        dispatch(deleteLocationError(errors.data));
      }
    }
  };
};
