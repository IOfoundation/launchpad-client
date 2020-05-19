import {CreateLocationTypes as types} from '../../action-types';
import {httpRequest, verifyUnauthorizedErrors} from '@Utils';

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

export const createLocation = ({
  Authorization,
  location,
  organizationId,
  locationId,
  mode,
}) => {
  return async dispatch => {
    try {
      dispatch(createLocationStart());
      const config = {
        headers: {Authorization},
      };
      let httpResponse;

      if (mode === 'new') {
        httpResponse = await httpRequest.post(
          `/api/organizations/${organizationId}/locations`,
          location,
          config
        );
      } else if (mode === 'edit') {
        httpResponse = await httpRequest.put(
          `/api/locations/${locationId}`,
          location,
          config
        );
      }

      dispatch(createLocationSuccess(httpResponse.data));
    } catch (errors) {
      verifyUnauthorizedErrors(dispatch, errors);
      if (errors.data && errors.data.errors) {
        dispatch(createLocationError(errors.data.errors));
      } else {
        dispatch(createLocationError(errors.data));
      }
    }
  };
};
