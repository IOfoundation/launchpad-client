import {BlogsTypes as types} from '../action-types';
import httpRequest from '../utils/httpRequest';

const getFeaturedPostsStarts = config => {
  return {
    type: types.GET_FEATURED_POSTS_START,
    ...config,
  };
};

const getFeaturedPostsSuccess = organizationPosts => {
  return {
    type: types.GET_FEATURED_POSTS_SUCCESS,
    organizationPosts,
  };
};

const getFeaturedPostsError = error => {
  return {
    type: types.GET_FEATURED_POSTS_ERROR,
    error,
  };
};

export const noResults = value => {
  return {
    type: types.NO_RESULTS,
    noResults: value,
  };
};

export const getFeaturedPostById = id => {
  return async dispatch => {
    try {
      dispatch(getFeaturedPostsStarts());
      const httpResponse = await httpRequest.get(
        `/api/blog_posts?filter[organization_id]=${id}`
      );
      if (httpResponse.data.length === 0) {
        dispatch(noResults(true));
      }
      dispatch(getFeaturedPostsSuccess(httpResponse.data));
    } catch (error) {
      dispatch(getFeaturedPostsError(error));
    }
  };
};
