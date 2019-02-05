import {SnackbarTypes as types} from '../action-types';

type STATE = {};
type ACTION = {};

const initialState: STATE = {
  visibility: false,
};

export default function(state: STATE = initialState, action: ACTION): STATE {
  switch (action.type) {
    case types.SHOW_SNACKBAR: {
      return {
        ...state,
        visibility: true,
      };
    }
    case types.HIDE_SNACKBAR: {
      return {
        ...state,
        visibility: false,
      };
    }
    default:
      return state;
  }
}
