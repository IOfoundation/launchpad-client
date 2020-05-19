import {GetLocationByOrganizationTypes as types} from '../../action-types';

const initialState = {
  error: false,
  errors: [],
  loading: false,
  locations: [],
  success: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.GET_LOCATION_BY_ORGANIZATION_START: {
      return {
        error: false,
        errors: [],
        loading: true,
        locations: [],
        success: false,
      };
    }

    case types.GET_LOCATION_BY_ORGANIZATION_SUCCESS: {
      const {locations} = action;

      return {
        ...state,
        loading: false,
        locations,
        success: true,
      };
    }

    case types.GET_LOCATION_BY_ORGANIZATION_ERROR: {
      const {errors} = action;
      return {
        ...state,
        error: true,
        errors,
        loading: false,
      };
    }

    case types.SET_LOADING: {
      const {loading} = action;
      return {
        ...state,
        loading,
      };
    }

    default:
      return state;
  }
}
