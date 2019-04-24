import {EventDeleteTypes as types} from '../../action-types';
import {httpRequest} from '@Utils';

const deleteEventStart = () => {
  return {
    type: types.DELETE_EVENT_START,
  };
};

const deleteEventSuccess = data => {
  return {
    type: types.DELETE_EVENT_SUCCESS,
    data,
  };
};

const deleteEventError = errors => {
  return {
    type: types.DELETE_EVENT_ERROR,
    errors,
  };
};

export const remove = ({Authorization, eventId}) => {
  return async dispatch => {
    try {
      dispatch(deleteEventStart());
      const config = {
        headers: {Authorization},
      };
      const httpResponse = await httpRequest.delete(
        `/api/events/${eventId}`,
        config
      );

      dispatch(deleteEventSuccess(httpResponse.data));
    } catch (errors) {
      if (errors.data && errors.data.errors) {
        dispatch(deleteEventError(errors.data.errors));
      } else {
        dispatch(deleteEventError(errors.data));
      }
    }
  };
};
