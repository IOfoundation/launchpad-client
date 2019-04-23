import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import adminBlogs from './admin-blogs';
import adminProfile from './admin-profile';
import blogs from './blogs';
import businesses from './businesses';
import errors from './errors';
import events from './events';
import getLocationByOrganization from './location/getByOrganization';
import locationCreate from './location/create';
import locationDelete from './location/delete';
import locations from './locations';
import serviceCreate from './service/create';
import serviceTaxonomy from './service/taxonomy';
import snackbar from './snackbar';
import user from './user';
import userInformation from './user-information';
import validateYup from './validate-yup';

const rootReducer = combineReducers({
  routing: routerReducer,
  adminBlogs,
  adminProfile,
  blogs,
  businesses,
  errors,
  events,
  getLocationByOrganization,
  locationCreate,
  locationDelete,
  locations,
  serviceCreate,
  serviceTaxonomy,
  snackbar,
  user,
  userInformation,
  validateYup,
});

export default rootReducer;
