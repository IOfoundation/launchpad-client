/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import {AppContainer} from 'react-hot-loader';
import Root from './components/Root';
import configureStore from './store/configureStore';
import initialState from './store/initialState';
import '../node_modules/flexboxgrid/css/flexboxgrid.min.css';
import './styles/styles.css';
import './fonts/fonts.min.css';

// Tell webpack to load favicon.ico
require('./favicon.ico');
import {syncHistoryWithStore} from 'react-router-redux';
//tell webpack to load images
require('static-data/images/cs-logo.png');
require('static-data/images/expand-icon.png');
require('static-data/images/ioLogoBlack.png');
require('static-data/images/hero.png');
require('static-data/images/LocationWhite.png');

const store = configureStore(initialState);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    // eslint-disable-next-line global-require
    const NewRoot = require('./components/Root').default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
