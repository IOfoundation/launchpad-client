import {EventsTypes as types} from '../action-types';

const initialState = {
  data: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.GET_ALL_EVENTS_REQUEST_START: {
      return {
        ...state,
      };
    }

    case types.GET_ALL_EVENTS_REQUEST_SUCCESS: {
      const {data} = action;
      return {
        ...state,
        data,
      };
    }

    case types.GET_ALL_EVENTS_REQUEST_ERROR: {
      const {error} = action;
      return {
        ...state,
        error,
      };
    }
    default:
      return state;
  }
}
