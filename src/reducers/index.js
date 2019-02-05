import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import businesses from './businesses';
import snackbar from './snackbar';

const rootReducer = combineReducers({
  routing: routerReducer,
  businesses,
  snackbar,
});

export default rootReducer;
