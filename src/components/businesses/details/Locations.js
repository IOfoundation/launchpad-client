import React from 'react';
import {Link} from 'react-router';
import Location from './Location';

const Locations = () => {
  return (
    <div className="detail-locations">
      <h2 className="detail-locations__title text-bold">{'Main Location'}</h2>
      <Location
        address="1325 J Street, 18th Floor Sacramento, CA 95746"
        title="Sacramento Office"
        email="email@domaninname.com"
        phone="(916) 514-7044"
      />
      <h2 className="detail-locations__title text-bold">{'Other Location'}</h2>
      <Location
        address="123 Street Road Natomas, CA 91234"
        title="Natomas"
        email="email@domaninname.com"
        phone="(916) 514-7044"
      />
      <Location
        address="1325 J Street, 18th Floor Sacramento, CA 95746"
        title="Citrus Heights"
        email="email@domaninname.com"
        phone="(916) 514-7044"
      />
      <Link className="detail-locations__all-locations">
        {'View All Locations'}
      </Link>
    </div>
  );
};

export default Locations;
