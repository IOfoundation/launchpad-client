import {HomeTypes as types} from 'action-types';

const someReduxObject = data => {
  return {
    type: types.FETCH_SOME_DATA,
    data,
  };
};

export function fetchSomeThing() {
  return async (_dispatch: Function) => {
    // TODO this is where you will make your api call
    // dispatch(someReduxObject(data));
  };
}
