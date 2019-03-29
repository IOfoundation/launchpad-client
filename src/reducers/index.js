import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import businesses from './businesses';
import snackbar from './snackbar';
import events from './events';
import blogs from './blogs';
import user from './user';
import adminBlogs from './admin-blogs';

const rootReducer = combineReducers({
  routing: routerReducer,
  adminBlogs,
  blogs,
  businesses,
  events,
  snackbar,
  user,
});

export default rootReducer;
