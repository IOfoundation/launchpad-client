/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import {AppContainer} from 'react-hot-loader';
import Root from './components/Root';
import configureStore from './store/configureStore';
import initialState from './store/initialState';
import './styles/styles.css';
import './fonts/fonts.min.css';

// Tell webpack to load favicon.ico
require('./favicon.ico');
import {syncHistoryWithStore} from 'react-router-redux';
//tell webpack to load images
require('static-data/images/admin-login.png');
require('static-data/images/blog-header.png');
require('static-data/images/close.png');
require('static-data/images/collapse-icon.png');
require('static-data/images/cs-logo.png');
require('static-data/images/Dropdown-arrow.svg');
require('static-data/images/events.png');
require('static-data/images/expand-icon.png');
require('static-data/images/expand-icon.png');
require('static-data/images/filter.png');
require('static-data/images/hero.png');
require('static-data/images/bg.png');
require('static-data/images/ic_map_green.png');
require('static-data/images/ic_map_grey.png');
require('static-data/images/ic_map_list-view-Green.png');
require('static-data/images/ic_map_list-view-Grey.png');
require('static-data/images/ioLogoBlack.png');
require('static-data/images/loader.gif');
require('static-data/images/location-icon.png');
require('static-data/images/LocationWhite.png');
require('static-data/images/organization.png');
require('static-data/images/orgs-placeholder.png');
require('static-data/images/search-icon.png');
require('static-data/images/search.png');
require('medium-editor/dist/css/medium-editor.css');
require('medium-editor/dist/css/themes/default.css');

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
