import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import businesses from './businesses';
import snackbar from './snackbar';
import events from './events';

const rootReducer = combineReducers({
  routing: routerReducer,
  businesses,
  snackbar,
  events,
});

export default rootReducer;
