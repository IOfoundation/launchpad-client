import {BusinessTypes as types} from '../action-types';

type STATE = {};
type ACTION = {};

const initialState: STATE = {
  data: [],
};

export default function(state: STATE = initialState, action: ACTION): STATE {
  switch (action.type) {
    case types.FETCH_BUSINESSESS: {
      const {businesses} = action;
      return {
        ...state,
        businesses,
      };
    }

    default:
      return state;
  }
}
