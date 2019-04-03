import React from 'react';
import {PropTypes} from 'prop-types';

import Layout from './Layout';
import Events from '../../components/admin-site/elements/Events';

const EventsIndex = props => {
  return (
    <Layout>
      <Events router={props.router} />
    </Layout>
  );
};

EventsIndex.propTypes = {
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default EventsIndex;
