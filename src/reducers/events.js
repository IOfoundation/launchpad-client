import {EventsTypes as types} from '../action-types';

const initialState = {
  data: [],
  eventsByMonth: [],
  featuredEvents: [],
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

    case types.GET_EVENTS_BY_MONTH_START: {
      return {
        ...state,
      };
    }

    case types.GET_EVENTS_BY_MONTH_SUCCESS: {
      const {featuredEvents} = action;
      return {
        ...state,
        featuredEvents,
      };
    }

    case types.GET_EVENTS_BY_MONTH_ERROR: {
      const {error} = action;
      return {
        ...state,
        error,
      };
    }

    case types.GET_ALL_EVENTS_BY_MONTH_START: {
      return {
        ...state,
      };
    }

    case types.GET_ALL_EVENTS_BY_MONTH_SUCCESS: {
      const {eventsByMonth} = action;
      return {
        ...state,
        eventsByMonth,
      };
    }

    case types.GET_ALL_EVENTS_BY_MONTH_ERROR: {
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
