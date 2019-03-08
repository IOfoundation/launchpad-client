import {BlogsTypes as types} from '../action-types';

const initialState = {
  categories: [],
  category: 'front page',
  featuredPosts: [],
  noResults: false,
  organizationPosts: [],
  page: 1,
  posts: [],
  totalPages: 0,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.GET_FEATURED_POSTS_START: {
      return {
        ...state,
        noResults: false,
        featuredPosts: [],
      };
    }

    case types.GET_FEATURED_POSTS_SUCCESS: {
      const {featuredPosts} = action;
      return {
        ...state,
        featuredPosts,
      };
    }

    case types.GET_FEATURED_POSTS_ERROR: {
      const {error} = action;
      return {
        ...state,
        error,
      };
    }

    case types.GET_FEATURED_POSTS_BY_ID_START: {
      return {
        ...state,
        noResults: false,
        organizationPosts: [],
      };
    }

    case types.GET_FEATURED_POSTS_BY_ID_SUCCESS: {
      const {organizationPosts} = action;
      return {
        ...state,
        organizationPosts,
      };
    }

    case types.GET_FEATURED_POSTS_BY_ID_ERROR: {
      const {error} = action;
      return {
        ...state,
        error,
      };
    }

    case types.GET_ALL_POSTS_START: {
      return {
        ...state,
        noResults: false,
        posts: [],
      };
    }

    case types.GET_ALL_POSTS_SUCCESS: {
      const {posts, totalPages, page, category} = action;
      return {
        ...state,
        posts,
        totalPages,
        page,
        category,
      };
    }

    case types.GET_ALL_POSTS_ERROR: {
      const {error} = action;
      return {
        ...state,
        error,
      };
    }

    case types.GET_POSTS_CATEGORIES_START: {
      return {
        ...state,
        categories: [],
      };
    }

    case types.GET_POSTS_CATEGORIES_SUCCESS: {
      const {categories} = action;
      return {
        ...state,
        categories,
      };
    }

    case types.GET_POSTS_CATEGORIES_ERROR: {
      const {error} = action;
      return {
        ...state,
        error,
      };
    }

    case types.NO_RESULTS: {
      const {noResults} = action;

      return {
        ...state,
        noResults,
      };
    }

    default:
      return state;
  }
}
