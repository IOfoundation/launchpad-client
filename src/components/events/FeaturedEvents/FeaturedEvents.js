import React from 'react';

import FeaturedEvent from './FeaturedEvent';

const FeaturedEvents = () => {
  return (
    <div className="featured-events">
      <div className="featured-events__row">
        <h2 className="featured-events__title text-bold">{'November'}</h2>
        <FeaturedEvent
          title="Special Conference for Lorem"
          description="Donec sed odio dui. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
          date="November 2, 2017"
          name="Resource Name"
        />

        <FeaturedEvent
          title="Raising Investor Capital The Right Way"
          description="Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros"
          date="November 2, 2017"
          name="Resource Name"
        />
      </div>
      <div className="featured-events__row">
        <h2 className="featured-events__title text-bold">{'Dicember'}</h2>
        <FeaturedEvent
          title="Raising Investor Capital The Right Way"
          description="Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros"
          date="November 12, 2017"
          name="Resource Name"
        />

        <FeaturedEvent
          title="Special Conference for Long Name Ipsum"
          description="Donec sed odio dui. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. "
          date="November 2, 2017"
          name="Resource Name"
        />

        <FeaturedEvent
          title="Managing Your Books"
          description="Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros"
          date="November 12, 2017"
          name="Resource Name"
        />
      </div>
      <div className="featured-events__row">
        <h2 className="featured-events__title text-bold">{'January'}</h2>
        <FeaturedEvent
          title="Managing Your Books"
          description="Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros"
          date="November 12, 2017"
          name="Resource Name"
        />
      </div>
    </div>
  );
};

export default FeaturedEvents;
