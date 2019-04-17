import {CreateServiceTypes as types} from '../../action-types';

const initialState = {
  error: false,
  errors: [],
  loading: false,
  locationId: '',
  service: {},
  success: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_SERVICE_START: {
      return {
        error: false,
        errors: [],
        loading: true,
        service: {},
        success: false,
      };
    }

    case types.CREATE_SERVICE_SUCCESS: {
      const {service} = action;

      return {
        ...state,
        loading: false,
        service,
        success: true,
      };
    }

    case types.CREATE_SERVICE_ERROR: {
      const {errors} = action;
      return {
        ...state,
        error: true,
        errors,
        loading: false,
      };
    }

    case types.SET_LOCATION_ID: {
      const {locationId} = action;
      return {
        ...state,
        locationId,
      };
    }

    default:
      return state;
  }
}
