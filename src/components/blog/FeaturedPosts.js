import React from 'react';
import FeaturedPost from './FeaturedPost';

const FeaturedPosts = () => {
  return (
    <div className="featured-posts">
      <FeaturedPost
        imageSrc="/static-data/images/orgs-placeholder.png"
        title="Cras justo odio, dapibus ac facilisis in, egestas eget quam. "
        description="Grow America Fund"
      />
      <FeaturedPost
        imageSrc="/static-data/images/orgs-placeholder.png"
        title="Donec id elit non mi porta gravida at eget metus. Curabitur blandit tempus porttitor."
        description="Governor’s Office of Business and Ec"
      />
      <FeaturedPost
        imageSrc="/static-data/images/orgs-placeholder.png"
        title="Fusce dapibus, tellus ac cursus commodo, tortor mauri"
        description="Grow America Fund"
      />
      <FeaturedPost
        imageSrc="/static-data/images/orgs-placeholder.png"
        title="Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermen"
        description="Governor’s Office of Business and Ec"
      />
    </div>
  );
};

export default FeaturedPosts;
