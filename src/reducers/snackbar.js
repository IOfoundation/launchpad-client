import {SnackbarTypes as types} from '../action-types';

const initialState = {
  visibility: false,
  message: 'placeholder message',
  autoHideDuration: 10000,
  actionText: 'DISMISS',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.SHOW_SNACKBAR: {
      const {
        message,
        autoHideDuration = 10000,
        actionText = 'DISMISS',
      } = action;
      return {
        ...state,
        visibility: true,
        message,
        autoHideDuration,
        actionText,
      };
    }

    case types.HIDE_SNACKBAR: {
      return {
        ...state,
        visibility: false,
      };
    }

    case types.TESTING_SNACKBAR_REQUEST: {
      const {
        message,
        autoHideDuration = 10000,
        actionText = 'DISMISS',
      } = action;
      return {
        ...state,
        message,
        autoHideDuration,
        actionText,
      };
    }

    case types.TESTING_SNACKBAR_SUCCESS: {
      const {response} = action;
      return {
        ...state,
        response,
        visibility: true,
      };
    }

    case types.TESTING_SNACKBAR_ERROR: {
      const {error} = action;
      return {
        ...state,
        error,
        visibility: false,
      };
    }
    default:
      return state;
  }
}
