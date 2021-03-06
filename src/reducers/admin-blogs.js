import {AdminBlogsTypes as types} from '../action-types';

const initialState = {
  drafts: {
    data: [],
    noResults: false,
    page: 1,
    totalPages: 0,
    loading: true,
  },
  posted: {
    data: [],
    noResults: false,
    page: 1,
    totalPages: 0,
    loading: true,
  },
  noResults: false,
  savePost: {
    data: {},
    loading: false,
    errors: {},
  },
  updatePost: {
    data: {},
    loading: false,
    errors: {},
  },
  deletePost: {
    errors: {},
    loading: false,
    success: false,
  },
  hideFooter: false,
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
          loading: true,
        },
        posted: {
          data: [],
          noResults: false,
          page: 1,
          totalPages: 0,
          loading: true,
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
          loading: false,
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
          loading: false,
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

    case types.SAVE_POSTS_START: {
      return {
        ...state,
        savePost: {
          data: {},
          loading: true,
          errors: {},
        },
      };
    }

    case types.SAVE_POSTS_SUCCESS: {
      const {post} = action;
      return {
        ...state,
        savePost: {
          ...state.savePost,
          data: post,
          loading: false,
        },
      };
    }

    case types.SAVE_POSTS_FAIL: {
      const {errors} = action;
      return {
        ...state,
        savePost: {
          ...state.savePost,
          loading: false,
          errors,
        },
      };
    }

    case types.DELETE_POST_START: {
      return {
        ...state,
        deletePost: {
          errors: {},
          loading: true,
          success: false,
        },
      };
    }

    case types.DELETE_POST_SUCCESS: {
      return {
        ...state,
        deletePost: {
          ...state.deletePost,
          loading: false,
          success: true,
        },
      };
    }

    case types.DELETE_POST_FAIL: {
      const {errors} = action;
      return {
        ...state,
        deletePost: {
          ...state.deletePost,
          loading: false,
          errors,
        },
      };
    }

    case types.HIDE_FOOTER: {
      const {hideFooter} = action;
      return {
        ...state,
        hideFooter,
      };
    }

    case types.UPDATE_POSTS_START: {
      return {
        ...state,
        updatePost: {
          data: {},
          loading: false,
          errors: {},
        },
      };
    }

    case types.UPDATE_POSTS_SUCCESS: {
      const {post} = action;
      return {
        ...state,
        updatePost: {
          ...state.savePost,
          data: post,
          loading: false,
        },
      };
    }

    case types.UPDATE_POSTS_FAIL: {
      const {errors} = action;
      return {
        ...state,
        updatePost: {
          ...state.savePost,
          loading: false,
          errors,
        },
      };
    }

    default:
      return state;
  }
}
