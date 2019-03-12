import {EventsTypes as types} from '../action-types';
import {httpRequest, getDate} from '../utils';

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

const getEventsByMonthStart = () => {
  return {
    type: types.GET_EVENTS_BY_MONTH_START,
  };
};

const getEventsByMonthSuccess = featuredEvents => {
  return {
    type: types.GET_EVENTS_BY_MONTH_SUCCESS,
    featuredEvents,
  };
};

const getEventsByMonthError = error => {
  return {
    type: types.GET_EVENTS_BY_MONTH_ERROR,
    error,
  };
};

export const getAllEvents = () => {
  return async dispatch => {
    try {
      dispatch(getAllEventsRequestStart());
      const httpResponse = await httpRequest.get('/api/events');
      dispatch(getAllEventsRequestSuccess(httpResponse.data));
    } catch (error) {
      dispatch(getAllEventsRequestError(error));
    }
  };
};

const getAllEventsByMonthStart = () => {
  return {
    type: types.GET_ALL_EVENTS_BY_MONTH_START,
  };
};

const getAllEventsByMonthSuccess = eventsByMonth => {
  return {
    type: types.GET_ALL_EVENTS_BY_MONTH_SUCCESS,
    eventsByMonth,
  };
};

const getAllEventsByMonthError = error => {
  return {
    type: types.GET_ALL_EVENTS_BY_MONTH_ERROR,
    error,
  };
};

export const getAllEventsByMonth = month => {
  return async dispatch => {
    try {
      dispatch(getAllEventsByMonthStart());
      const httpResponse = await httpRequest.get(`/api/events?month=${month}`);
      const totalCount = parseInt(httpResponse.headers['x-total-count'], 10);

      if (totalCount > 200) {
        const totalHttpResponse = await httpRequest.get(
          `/api/events?month=${month}&perPage=${totalCount}`
        );
        dispatch(getAllEventsByMonthSuccess(totalHttpResponse.data));
      } else {
        dispatch(getAllEventsByMonthSuccess(httpResponse.data));
      }
    } catch (error) {
      dispatch(getAllEventsByMonthError(error));
    }
  };
};

export const getAllEventsById = id => {
  return async dispatch => {
    try {
      dispatch(getAllEventsRequestStart());
      const httpResponse = await httpRequest.get(
        `/api/events?organization_id=${id}`
      );
      dispatch(getAllEventsRequestSuccess(httpResponse.data));
    } catch (error) {
      dispatch(getAllEventsRequestError(error));
    }
  };
};

export const getEventsByMonth = (months, filterBy = 'default') => {
  return async dispatch => {
    try {
      dispatch(getEventsByMonthStart());

      const responses = await Promise.all(
        months.map(async month => {
          const url = {
            featured: `/api/events?month=${month}&featured=true`,
            default: `/api/events?month=${month}`,
          };

          const httpResponse = await httpRequest.get(url[filterBy]);

          const groupedData = httpResponse.data
            .slice(0, 3)
            .reduce((acc, data) => {
              data.starting_at = getDate(data.starting_at);
              data.posted_at = getDate(data.posted_at);
              acc.title = data.starting_at.monthLarge;
              acc.key = data.starting_at.month;

              if (acc[data.starting_at.month]) {
                acc[data.starting_at.month].push(data);
              } else {
                acc[data.starting_at.month] = [data];
              }

              return acc;
            }, {});

          return groupedData;
        })
      );

      dispatch(getEventsByMonthSuccess(responses));
    } catch (error) {
      dispatch(getEventsByMonthError(error));
    }
  };
};
