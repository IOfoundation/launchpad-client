import {EventsTypes as types} from '../action-types';

const initialState = {
  events: {
    data: [],
    errors: {},
    loading: false,
    noResults: false,
    page: 1,
    totalPages: 0,
  },
  eventsByMonth: [],
  featuredEvents: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.GET_ALL_EVENTS_REQUEST_START: {
      return {
        ...state,
        events: {
          data: [],
          errors: {},
          loading: true,
          noResults: false,
          page: 1,
          totalPages: 0,
        },
      };
    }

    case types.GET_ALL_EVENTS_REQUEST_SUCCESS: {
      const {data, totalPages, page} = action;
      return {
        ...state,
        events: {
          ...state.events,
          data,
          loading: false,
          noResults: false,
          page,
          totalPages,
        },
      };
    }

    case types.GET_ALL_EVENTS_REQUEST_ERROR: {
      const {error} = action;
      return {
        ...state,
        events: {
          ...state.events,
          error,
          loading: false,
        },
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
