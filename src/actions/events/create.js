import {EventsCreateTypes as types} from '../../action-types';
import {httpRequest} from '@Utils';

const createEventStart = () => {
  return {
    type: types.CREATE_EVENT_START,
  };
};

const createEventSuccess = data => {
  return {
    type: types.CREATE_EVENT_SUCCESS,
    data,
  };
};

const createEventError = errors => {
  return {
    type: types.CREATE_EVENT_ERROR,
    errors,
  };
};

export const create = ({
  Authorization,
  organizationId: organization_id,
  event,
  mode,
}) => {
  return async dispatch => {
    try {
      dispatch(createEventStart());
      const config = {
        headers: {Authorization},
      };
      let httpResponse;

      if (mode === 'new') {
        httpResponse = await httpRequest.post(
          '/api/events',
          {...event, organization_id},
          config
        );
      } else if (mode === 'edit') {
        httpResponse = await httpRequest.put(
          '/api/events',
          {...event, organization_id},
          config
        );
      }

      dispatch(createEventSuccess(httpResponse.data));
    } catch (errors) {
      if (errors.data && errors.data.errors) {
        dispatch(createEventError(errors.data.errors));
      } else {
        dispatch(createEventError(errors.data));
      }
    }
  };
};
