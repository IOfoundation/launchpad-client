import {CreateServiceTypes as types} from '../../action-types';
import {httpRequest} from '@Utils';

const createServiceStart = () => {
  return {
    type: types.CREATE_SERVICE_START,
  };
};

const createServiceSuccess = service => {
  return {
    type: types.CREATE_SERVICE_SUCCESS,
    service,
  };
};

const createServiceError = errors => {
  return {
    type: types.CREATE_SERVICE_ERROR,
    errors,
  };
};

export const create = ({
  Authorization,
  service,
  locationId,
  serviceId,
  mode,
}) => {
  return async dispatch => {
    try {
      dispatch(createServiceStart());
      const config = {
        headers: {Authorization},
      };
      let httpResponse;

      if (mode === 'new') {
        httpResponse = await httpRequest.post(
          `/api/locations/${locationId}/services`,
          service,
          config
        );
      } else if (mode === 'edit') {
        httpResponse = await httpRequest.put(
          `/api/locations/${locationId}/services/${serviceId}`,
          service,
          config
        );
      }

      dispatch(createServiceSuccess(httpResponse.data));
    } catch (errors) {
      if (errors.data && errors.data.errors) {
        dispatch(createServiceError(errors.data.errors));
      } else {
        dispatch(createServiceError(errors.data));
      }
    }
  };
};

export const setLocationId = locationId => {
  sessionStorage.setItem('locationId', locationId);

  return {
    type: types.SET_LOCATION_ID,
    locationId,
  };
};
