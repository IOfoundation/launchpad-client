import {CreateLocationTypes as types} from '../../action-types';
import {httpRequest} from '@Utils';

const createLocationStart = () => {
  return {
    type: types.CREATE_LOCATION_START,
  };
};

const createLocationSuccess = location => {
  return {
    type: types.CREATE_LOCATION_SUCCESS,
    location,
  };
};

const createLocationError = errors => {
  return {
    type: types.CREATE_LOCATION_ERROR,
    errors,
  };
};

export const createLocation = ({Authorization, location, organizationId}) => {
  return async dispatch => {
    try {
      dispatch(createLocationStart());
      const config = {
        headers: {Authorization},
      };
      const httpResponse = await httpRequest.post(
        `/api/organizations/${organizationId}/locations`,
        {
          ...location,
        },
        config
      );
      dispatch(createLocationSuccess(httpResponse.data));
    } catch (errors) {
      dispatch(createLocationError(errors.data));
    }
  };
};
