import {ErrorsTypes as types} from '../action-types';

const initialState = {
  userAuthorized: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.USER_UNAUTHORIZED: {
      return {
        userAuthorized: false,
      };
    }
    case types.USER_AUTHORIZED: {
      return {
        userAuthorized: true,
      };
    }

    default:
      return state;
  }
}
