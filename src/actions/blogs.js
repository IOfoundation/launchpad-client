import {BlogsTypes as types} from '../action-types';
import {httpRequest} from '../utils';
import {getDate} from '../utils';

const getFeaturedPostsStarts = config => {
  return {
    type: types.GET_FEATURED_POSTS_START,
    ...config,
  };
};

const getFeaturedPostsSuccess = featuredPosts => {
  return {
    type: types.GET_FEATURED_POSTS_SUCCESS,
    featuredPosts,
  };
};

const getFeaturedPostsError = error => {
  return {
    type: types.GET_FEATURED_POSTS_ERROR,
    error,
  };
};

const getFeaturedPostsByIdStart = config => {
  return {
    type: types.GET_FEATURED_POSTS_BY_ID_START,
    ...config,
  };
};

const getFeaturedPostsByIdSuccess = organizationPosts => {
  return {
    type: types.GET_FEATURED_POSTS_BY_ID_SUCCESS,
    organizationPosts,
  };
};

const getFeaturedPostsByIdError = error => {
  return {
    type: types.GET_FEATURED_POSTS_BY_ID_ERROR,
    error,
  };
};

const getAllPostsStarts = config => {
  return {
    type: types.GET_ALL_POSTS_START,
    ...config,
  };
};

const getAllPostsSuccess = posts => {
  return {
    type: types.GET_ALL_POSTS_SUCCESS,
    posts,
  };
};

const getAllPostsError = error => {
  return {
    type: types.GET_ALL_POSTS_ERROR,
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
      dispatch(getFeaturedPostsByIdStart());
      const httpResponse = await httpRequest.get(
        `/api/blog_posts?filter[organization_id]=${id}`
      );
      if (httpResponse.data.length === 0) {
        dispatch(noResults(true));
      }
      dispatch(getFeaturedPostsByIdSuccess(httpResponse.data));
    } catch (error) {
      dispatch(getFeaturedPostsByIdError(error));
    }
  };
};

export const getFeaturedPost = () => {
  return async dispatch => {
    try {
      dispatch(getFeaturedPostsStarts());
      const httpResponse = await httpRequest.get(
        '/api/blog_posts?filter[category]=featured'
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

export const getAllPosts = page => {
  return async dispatch => {
    try {
      dispatch(getAllPostsStarts());
      const httpResponse = await httpRequest.get(
        `/api/blog_posts?page=${page}&per_page=5&filter[category]=${'front page'}`
      );
      if (httpResponse.data.length === 0) {
        dispatch(noResults(true));
      }

      const formatedData = httpResponse.data.map(data => {
        data.posted_at = getDate(data.posted_at);

        return data;
      });

      dispatch(getAllPostsSuccess(formatedData));
    } catch (error) {
      dispatch(getAllPostsError(error));
    }
  };
};
