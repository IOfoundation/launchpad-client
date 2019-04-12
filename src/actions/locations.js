import {LocationsTypes as types} from '../action-types';
import {httpRequest} from '../utils';

const getLocationsStart = () => {
  return {
    type: types.GET_LOCATIONS_START,
  };
};

const getLocationsSuccess = locations => {
  return {
    type: types.GET_LOCATIONS_SUCCESS,
    locations,
  };
};

const getLocationsError = error => {
  return {
    type: types.GET_LOCATIONS_ERROR,
    error,
  };
};

export const getAllLocations = () => {
  return async dispatch => {
    try {
      dispatch(getLocationsStart());
      const httpResponse = await httpRequest.get('/api/locations');
      dispatch(getLocationsSuccess(httpResponse.data));
    } catch (error) {
      dispatch(getLocationsError(error));
    }
  };
};

const getLocationByIdStart = () => {
  return {
    type: types.GET_LOCATION_BY_ID_START,
  };
};

const getLocationByIdSuccess = location => {
  return {
    type: types.GET_LOCATION_BY_ID_SUCCESS,
    location,
  };
};

const getLocationByIdError = error => {
  return {
    type: types.GET_LOCATION_BY_ID_ERROR,
    error,
  };
};

export const getLocatonById = id => {
  return async dispatch => {
    try {
      dispatch(getLocationByIdStart());
      const httpResponse = await httpRequest.get(`/api/locations/${id}`);
      dispatch(getLocationByIdSuccess(httpResponse.data));
    } catch (error) {
      dispatch(getLocationByIdError(error));
    }
  };
};

export const setLoading = loading => {
  return {
    type: types.SET_LOADING,
    loading,
  };
};
