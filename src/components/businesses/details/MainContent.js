import React from 'react';
import {PropTypes} from 'prop-types';

import ServicesOffered from './ServicesOffered';
import FeaturedPosts from './FeaturedPosts';

const MainContent = props => {
  const {services} = props;

  return (
    <div className="main-content">
      <ServicesOffered services={services} />
      <FeaturedPosts />
    </div>
  );
};

MainContent.propTypes = {
  services: PropTypes.arrayOf(PropTypes.object),
};

export default MainContent;
