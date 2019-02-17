import React from 'react';
import {PropTypes} from 'prop-types';

import ServicesOffered from './ServicesOffered';
import DetailFeaturedPosts from './DetailFeaturedPosts';

const MainContent = props => {
  const {services, posts} = props;

  return (
    <div className="main-content">
      <ServicesOffered services={services} />
      <DetailFeaturedPosts posts={posts} />
    </div>
  );
};

MainContent.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  services: PropTypes.arrayOf(PropTypes.object),
};

export default MainContent;
