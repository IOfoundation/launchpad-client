import React from 'react';
import {PropTypes} from 'prop-types';

import Layout from './Layout';
import ProfileFormContainer from '../../components/admin-site/elements/ProfileFormContainer';

const ProfileRoute = props => {
  return (
    <Layout router={props.router}>
      <ProfileFormContainer breakpoint={props.breakpoint} />
    </Layout>
  );
};

ProfileRoute.propTypes = {
  breakpoint: PropTypes.string,
  router: PropTypes.shape({}),
};

export default ProfileRoute;
