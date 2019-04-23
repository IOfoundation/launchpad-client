import {GetEventTypes as types} from '../../action-types';
import {httpRequest} from '@Utils';

const getEventStart = () => {
  return {
    type: types.GET_EVENT_START,
  };
};

const getEventSuccess = data => {
  return {
    type: types.GET_EVENT_SUCCESS,
    data,
  };
};

const getEventError = errors => {
  return {
    type: types.GET_EVENT_ERROR,
    errors,
  };
};

export const get = eventId => {
  return async dispatch => {
    try {
      dispatch(getEventStart());
      const httpResponse = await httpRequest.get(`/api/events/${eventId}`);

      dispatch(getEventSuccess(httpResponse.data));
    } catch (errors) {
      if (errors.data && errors.data.errors) {
        dispatch(getEventError(errors.data.errors));
      } else {
        dispatch(getEventError(errors.data));
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
