import {EventsTypes as types} from '../action-types';
import httpRequest from '../utils/httpRequest';

const getAllEventsRequestStart = () => {
  return {
    type: types.GET_ALL_EVENTS_REQUEST_START,
  };
};

const getAllEventsRequestSuccess = data => {
  return {
    type: types.GET_ALL_EVENTS_REQUEST_SUCCESS,
    data,
  };
};

const getAllEventsRequestError = error => {
  return {
    type: types.GET_ALL_EVENTS_REQUEST_ERROR,
    error,
  };
};

export const getAllEvents = () => {
  return async dispatch => {
    try {
      dispatch(getAllEventsRequestStart());
      const httpResponse = await httpRequest.get('/api/events');
      dispatch(getAllEventsRequestSuccess({data: httpResponse.data}));
    } catch (error) {
      dispatch(getAllEventsRequestError(error));
    }
  };
};
