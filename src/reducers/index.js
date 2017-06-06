import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import home from './home';
import businesses from './businesses';

const rootReducer = combineReducers({
  routing: routerReducer,
  home,
  businesses,
});

export default rootReducer;
