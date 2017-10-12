import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import businesses from './businesses';

const rootReducer = combineReducers({
  routing: routerReducer,
  businesses,
});

export default rootReducer;
