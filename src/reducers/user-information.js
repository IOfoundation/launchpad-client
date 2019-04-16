import {UserInformationTypes as types} from '../action-types';

const initialState = {
  information: {},
  loading: false,
  success: false,
  errors: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.GET_USER_INFORMATION_REQUEST: {
      return {
        information: {},
        loading: false,
        success: false,
        errors: [],
      };
    }
    case types.GET_USER_INFORMATION_SUCCESS: {
      const {information} = action;
      return {
        ...state,
        information,
        loading: false,
        success: true,
      };
    }

    case types.GET_USER_INFORMATION_FAIL: {
      const {errors} = action;
      return {
        ...state,
        information: true,
        loading: false,
        errors,
      };
    }

    default:
      return state;
  }
}
