import {ErrorsTypes as types} from '../action-types';

const initialState = {
  userAuthorized: true,
  isSigningOut: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.USER_UNAUTHORIZED: {
      const {isSigningOut} = action;
      return {
        userAuthorized: false,
        isSigningOut,
      };
    }
    case types.USER_AUTHORIZED: {
      return {
        userAuthorized: true,
        isSigningOut: false,
      };
    }

    default:
      return state;
  }
}
