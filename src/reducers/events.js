import {EventsTypes as types} from '../action-types';

const initialState = {
  events: {
    data: [],
    errors: {},
    loading: true,
    noResults: false,
    page: 1,
    totalPages: 0,
  },
  eventsByMonth: {
    data: [],
    errors: {},
    loading: true,
  },
  featuredEvents: {
    data: [],
    errors: {},
    loading: true,
  },
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
      const {errors} = action;
      return {
        ...state,
        events: {
          ...state.events,
          errors,
          loading: false,
        },
      };
    }

    case types.GET_EVENTS_BY_MONTH_START: {
      return {
        ...state,
        featuredEvents: {
          data: [],
          errors: {},
          loading: true,
        },
      };
    }

    case types.GET_EVENTS_BY_MONTH_SUCCESS: {
      const {featuredEvents} = action;
      return {
        ...state,
        featuredEvents: {
          ...state.featuredEvents,
          data: featuredEvents,
          loading: false,
        },
      };
    }

    case types.GET_EVENTS_BY_MONTH_ERROR: {
      const {error} = action;
      return {
        ...state,
        error,
        featuredEvents: {
          ...state.featuredEvents,
          error,
          loading: false,
        },
      };
    }

    case types.GET_ALL_EVENTS_BY_MONTH_START: {
      return {
        ...state,
        eventsByMonth: {
          data: [],
          errors: {},
          loading: true,
        },
      };
    }

    case types.GET_ALL_EVENTS_BY_MONTH_SUCCESS: {
      const {eventsByMonth} = action;
      return {
        ...state,
        eventsByMonth: {
          ...state.eventsByMonth,
          data: eventsByMonth,
          loading: false,
        },
      };
    }

    case types.GET_ALL_EVENTS_BY_MONTH_ERROR: {
      const {error} = action;
      return {
        ...state,
        eventsByMonth: {
          ...state.eventsByMonth,
          error,
          loading: false,
        },
      };
    }

    case types.RESET: {
      return {
        events: {
          data: [],
          errors: {},
          loading: true,
          noResults: false,
          page: 1,
          totalPages: 0,
        },
        eventsByMonth: {
          data: [],
          errors: {},
          loading: true,
        },
        featuredEvents: {
          data: [],
          errors: {},
          loading: true,
        },
      };
    }

    default:
      return state;
  }
}
