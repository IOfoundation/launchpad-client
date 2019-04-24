import {BlogsTypes as types} from '../action-types';

const initialState = {
  categories: [],
  categoriesLoading: true,
  category: 'front page',
  featuredPosts: [],
  getFeaturedPostloading: true,
  getPostIdSuccess: false,
  noResults: false,
  organizationPosts: [],
  page: 1,
  post: {},
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
        getFeaturedPostloading: true,
      };
    }

    case types.GET_FEATURED_POSTS_SUCCESS: {
      const {featuredPosts} = action;
      return {
        ...state,
        featuredPosts,
        getFeaturedPostloading: false,
      };
    }

    case types.GET_FEATURED_POSTS_ERROR: {
      const {error} = action;
      return {
        ...state,
        error,
        getFeaturedPostloading: false,
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
        categoriesLoading: true,
      };
    }

    case types.GET_POSTS_CATEGORIES_SUCCESS: {
      const {categories} = action;
      return {
        ...state,
        categories,
        categoriesLoading: false,
      };
    }

    case types.GET_POSTS_CATEGORIES_ERROR: {
      const {error} = action;
      return {
        ...state,
        error,
        categoriesLoading: false,
      };
    }

    case types.GET_POST_BY_ID_START: {
      return {
        ...state,
        getPostIdSuccess: false,
        noResults: false,
        post: {},
      };
    }

    case types.GET_POST_BY_ID_SUCCESS: {
      const {post} = action;
      return {
        ...state,
        getPostIdSuccess: true,
        post,
      };
    }

    case types.GET_POST_BY_ID_ERROR: {
      const {error} = action;
      return {
        ...state,
        error,
      };
    }

    case types.RESET_POST_BY_ID: {
      return {
        ...state,
        noResults: false,
        post: {},
        getPostIdSuccess: false,
      };
    }

    case types.SET_CATEGORY: {
      const {category} = action;

      return {
        ...state,
        category,
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
