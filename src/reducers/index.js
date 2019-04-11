import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import businesses from './businesses';
import snackbar from './snackbar';
import events from './events';
import blogs from './blogs';
import user from './user';
import adminBlogs from './admin-blogs';
import errors from './errors';
import userInformation from './user-information';

const rootReducer = combineReducers({
  routing: routerReducer,
  adminBlogs,
  blogs,
  businesses,
  errors,
  events,
  snackbar,
  user,
  userInformation,
});

export default rootReducer;
