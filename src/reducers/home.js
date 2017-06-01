import {HomeTypes as types} from 'action-types';

type STATE = {};
type ACTION = {};

const initialState: STATE = {
  data: [],
};

export default function(state: STATE = initialState, action: ACTION): STATE {
  switch (action.type) {
    case types.FETCH_SOME_DATA: {
      const {data} = action;
      return {
        ...state,
        data,
      };
    }

    default:
      return state;
  }
}
