import {BlogsTypes as types} from '../action-types';

const initialState = {
  organizationPosts: [],
  noResults: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.GET_FEATURED_POSTS_START: {
      return {
        ...state,
        noResults: false,
        organizationPosts: [],
      };
    }

    case types.GET_FEATURED_POSTS_SUCCESS: {
      const {organizationPosts} = action;
      return {
        ...state,
        organizationPosts,
      };
    }

    case types.GET_FEATURED_POSTS_ERROR: {
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
