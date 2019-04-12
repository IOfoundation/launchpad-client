import {LocationsTypes as types} from '../action-types';

const initialState = {
  error: false,
  errors: [],
  loading: true,
  location: {},
  locations: [],
  noResults: false,
  locationByIdSuccess: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.GET_LOCATIONS_START: {
      return {
        ...state,
        loading: true,
        error: false,
        noResults: false,
      };
    }

    case types.GET_LOCATIONS_SUCCESS: {
      const {locations} = action;
      let noResults = false;

      if (locations.length === 0) {
        noResults = true;
      }

      return {
        ...state,
        locations,
        loading: false,
        noResults,
        error: false,
      };
    }

    case types.GET_LOCATIONS_ERROR: {
      const {errors} = action;
      return {
        ...state,
        errors,
        loading: false,
        error: true,
      };
    }

    case types.GET_LOCATION_BY_ID_START: {
      return {
        ...state,
        error: false,
        loading: true,
        location: {},
        locationByIdSuccess: false,
      };
    }

    case types.GET_LOCATION_BY_ID_SUCCESS: {
      const {location} = action;
      return {
        ...state,
        loading: false,
        location,
        locationByIdSuccess: true,
      };
    }

    case types.GET_LOCATION_BY_ID_ERROR: {
      const {errors} = action;
      return {
        ...state,
        errors,
        loading: false,
        error: true,
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
