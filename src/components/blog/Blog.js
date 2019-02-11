import React from 'react';

import Jumbotron from '../shared/Jumbotron';
import FeaturedPosts from './FeaturedPosts';
import MainContent from './MainContent';

const Blog = () => {
  return (
    <div className="blog-container">
      <Jumbotron
        title="Resource Finder Blog"
        description="Find content relevant to your industry and business stage."
        descriptionModifacor="full-white"
      />
      <FeaturedPosts />
      <MainContent />
    </div>
  );
};

export default Blog;
