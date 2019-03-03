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

const getAllPostsSuccess = (posts, totalPages, page, category) => {
  return {
    type: types.GET_ALL_POSTS_SUCCESS,
    posts,
    totalPages,
    page,
    category,
  };
};

const getAllPostsError = error => {
  return {
    type: types.GET_ALL_POSTS_ERROR,
    error,
  };
};

const getPostsCategoriesStart = () => {
  return {
    type: types.GET_POSTS_CATEGORIES_START,
  };
};

const getPostsCategoriesSuccess = categories => {
  return {
    type: types.GET_POSTS_CATEGORIES_SUCCESS,
    categories,
  };
};

const getPostsCategoriesError = error => {
  return {
    type: types.GET_POSTS_CATEGORIES_ERROR,
    error,
  };
};

export const getCategories = () => {
  return async dispatch => {
    try {
      dispatch(getPostsCategoriesStart());
      const httpResponse = await httpRequest.get('/api/blog_posts/categories');

      let frontPage;
      const categories = httpResponse.data
        .filter(data => {
          if (data.name === 'front page') {
            frontPage = data;
            return false;
          }
          return true;
        })
        .sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      categories.unshift(frontPage);
      dispatch(getPostsCategoriesSuccess(categories));
    } catch (error) {
      dispatch(getPostsCategoriesError(error));
    }
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

export const getAllPosts = (page, category) => {
  return async dispatch => {
    try {
      dispatch(getAllPostsStarts());
      let httpResponse;

      if (category) {
        httpResponse = await httpRequest.get(
          `/api/blog_posts?page=${page}&per_page=5&filter[category]=${category}`
        );
      } else {
        httpResponse = await httpRequest.get(
          `/api/blog_posts?page=${page}&per_page=5`
        );
      }

      if (httpResponse.data.length === 0) {
        dispatch(noResults(true));
      }

      const formatedData = httpResponse.data.map(data => {
        data.posted_at = getDate(data.posted_at);

        return data;
      });
      const totalPages =
        parseInt(httpResponse.headers['x-total-count'], 10) / 5;

      dispatch(getAllPostsSuccess(formatedData, totalPages, page, category));
    } catch (error) {
      dispatch(getAllPostsError(error));
    }
  };
};
