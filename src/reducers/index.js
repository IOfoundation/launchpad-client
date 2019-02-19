import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import businesses from './businesses';
import snackbar from './snackbar';
import events from './events';
import blogs from './blogs';
import user from './user';

const rootReducer = combineReducers({
  routing: routerReducer,
  businesses,
  snackbar,
  events,
  blogs,
  user,
});

export default rootReducer;
