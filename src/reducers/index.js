import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import adminBlogs from './admin-blogs';
import adminProfile from './admin-profile';
import blogs from './blogs';
import businesses from './businesses';
import errors from './errors';
import events from './events';
import snackbar from './snackbar';
import user from './user';
import userInformation from './user-information';

const rootReducer = combineReducers({
  routing: routerReducer,
  adminBlogs,
  adminProfile,
  blogs,
  businesses,
  errors,
  events,
  snackbar,
  user,
  userInformation,
});

export default rootReducer;
