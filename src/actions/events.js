import {EventsTypes as types} from '../action-types';
import {httpRequest, getDate, createUrlWithParams} from '@Utils';

const getAllEventsRequestStart = () => {
  return {
    type: types.GET_ALL_EVENTS_REQUEST_START,
  };
};

const getAllEventsRequestSuccess = (data, totalPages, page) => {
  return {
    type: types.GET_ALL_EVENTS_REQUEST_SUCCESS,
    data,
    totalPages,
    page,
  };
};

const getAllEventsRequestError = errors => {
  return {
    type: types.GET_ALL_EVENTS_REQUEST_ERROR,
    errors,
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
      const httpResponse = await httpRequest.get(
        createUrlWithParams('/api/events', {month})
      );
      const totalCount = parseInt(httpResponse.headers['x-total-count'], 10);

      if (totalCount > 200) {
        const totalHttpResponse = await httpRequest.get(
          createUrlWithParams('/api/events', {month, perPage: totalCount})
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

export const getAllEventsById = organization_id => {
  return async dispatch => {
    try {
      dispatch(getAllEventsRequestStart());
      const httpResponse = await httpRequest.get(
        createUrlWithParams('/api/events', {organization_id})
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
            featured: createUrlWithParams('/api/events', {
              month,
              featured: true,
            }),
            default: createUrlWithParams('/api/events', {month}),
          };

          const httpResponse = await httpRequest.get(url[filterBy]);
          let groupedData = [];
          if (httpResponse.data.length > 0) {
            let group;
            if (httpResponse.data.length > 3) {
              group = httpResponse.data.slice(0, 3);
            } else {
              group = httpResponse.data;
            }

            groupedData = group.reduce((acc, data) => {
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
          }

          return groupedData;
        })
      );

      const filtered = responses.filter(response => response.key);
      dispatch(getEventsByMonthSuccess(filtered));
    } catch (error) {
      dispatch(getEventsByMonthError(error));
    }
  };
};

const eventsParams = ({
  page,
  organization_id,
  perPage,
  ignoreOrgPublish,
  starting_after,
  ending_before,
}) => {
  const params = {
    per_page: perPage,
    page,
    organization_id,
  };

  if (starting_after) {
    params.starting_after = starting_after;
  }

  if (ending_before) {
    params.ending_before = ending_before;
  }

  if (ignoreOrgPublish) {
    params.ignore_org_publish = ignoreOrgPublish;
  }

  return params;
};

const getAllEventsWithFilter = async ({
  dispatch,
  mode,
  page,
  organizationId: organization_id,
  perPage = 5,
  ignoreOrgPublish,
}) => {
  let url = '';
  const today = getDate();

  if (mode === 'after') {
    url = createUrlWithParams(
      '/api/events',
      eventsParams({
        starting_after: today.date.toISOString(),
        page,
        organization_id,
        perPage,
        ignoreOrgPublish,
      })
    );
  } else {
    url = createUrlWithParams(
      '/api/events',
      eventsParams({
        ending_before: today.date.toISOString(),
        page,
        organization_id,
        perPage,
        ignoreOrgPublish,
      })
    );
  }

  try {
    dispatch(getAllEventsRequestStart());
    const [httpResponse] = await Promise.all([
      httpRequest.get(url),
      new Promise(resolve => setTimeout(resolve, 1000)),
    ]);

    const totalPages = parseInt(httpResponse.headers['x-total-count'], 10) / 5;

    dispatch(getAllEventsRequestSuccess(httpResponse.data, totalPages, page));
  } catch (errors) {
    dispatch(getAllEventsRequestError({errors: true}));
  }
};

export const getAllEventsAfter = ({
  page,
  organizationId,
  perPage,
  ignoreOrgPublish,
}) => {
  return async dispatch => {
    await getAllEventsWithFilter({
      dispatch,
      ignoreOrgPublish,
      mode: 'after',
      organizationId,
      page,
      perPage,
    });
  };
};

export const getAllEventsBefore = ({
  page,
  organizationId,
  ignoreOrgPublish,
}) => {
  return async dispatch => {
    await getAllEventsWithFilter({
      dispatch,
      ignoreOrgPublish,
      mode: 'before',
      organizationId,
      page,
    });
  };
};

export const reset = () => {
  return {
    type: types.RESET,
  };
};
