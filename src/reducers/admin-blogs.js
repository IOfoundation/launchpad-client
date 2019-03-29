import {AdminBlogsTypes as types} from '../action-types';

const initialState = {
  drafts: {
    data: [],
    noResults: false,
    page: 1,
    totalPages: 0,
  },
  posted: {
    data: [],
    noResults: false,
    page: 1,
    totalPages: 0,
  },
  noResults: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.GET_ADMIN_POSTS_START: {
      return {
        ...state,
        drafts: {
          data: [],
          noResults: false,
          page: 1,
          totalPages: 0,
        },
        posted: {
          data: [],
          noResults: false,
          page: 1,
          totalPages: 0,
        },
      };
    }

    case types.GET_ADMIN_DRAFTS_POSTS_SUCCESS: {
      const {drafts, totalPages, page} = action;
      return {
        ...state,
        drafts: {
          data: drafts,
          page,
          totalPages,
        },
      };
    }

    case types.GET_ADMIN_POSTED_POSTS_SUCCESS: {
      const {posted, totalPages, page} = action;
      return {
        ...state,
        posted: {
          data: posted,
          page,
          totalPages,
        },
      };
    }

    case types.GET_ADMIN_POSTS_FAIL: {
      const {errors} = action;
      return {
        ...state,
        errors,
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
