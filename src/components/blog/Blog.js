import React from 'react';
import {PropTypes} from 'prop-types';

import Jumbotron from '../shared/Jumbotron';
import FeaturedPosts from './FeaturedPosts';
import MainContent from './MainContent';

const Blog = props => {
  const {breakpoint} = props;

  return (
    <div className="blog-container">
      <Jumbotron
        title="Resource Finder Blog"
        description="Find content relevant to your industry and business stage."
        descriptionModifacor="full-white"
        background="blog-header"
      />
      <FeaturedPosts />
      <MainContent breakpoint={breakpoint} />
    </div>
  );
};

Blog.propTypes = {
  breakpoint: PropTypes.string,
};

export default Blog;
