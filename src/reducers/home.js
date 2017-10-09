import {HomeTypes as types} from '../action-types';

type STATE = {};
type ACTION = {};

const initialState: STATE = {
  data: [],
};

export default function(state: STATE = initialState, action: ACTION): STATE {
  switch (action.type) {
    case types.FILTER_SERVICES: {
      const {services} = action;
      return {
        ...state,
        services,
      };
    }

    default:
      return state;
  }
}
