import React from 'react';

import Jumbotron from '../shared/Jumbotron';

const Blog = () => {
  return (
    <div className="blog-container">
      <Jumbotron
        title="Resource Finder Blog"
        description="Find content relevant to your industry and business stage."
        descriptionModifacor="full-white"
      />
    </div>
  );
};

export default Blog;
