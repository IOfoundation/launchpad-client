import React from 'react';
import {PropTypes} from 'prop-types';
import {Provider} from 'react-redux';
import routes from 'routes';
import {Router} from 'react-router';

const Root = props => {
  const {store, history} = props;
  return (
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  );
};

Root.propTypes = {
  history: PropTypes.shape({}).isRequired,
  store: PropTypes.shape({}).isRequired,
};

export default Root;
