import React from 'react';
import {Link} from 'react-router';
import Location from './Location';
import {PropTypes} from 'prop-types';

const Locations = props => {
  const {locations} = props;
  let $otherLocation = null;

  if (locations.length > 1) {
    const mapOtherLocations = locations.map((location, index) => {
      if (index === 0) {
        return (
          <h2 key={1} className="detail-locations__title text-bold">
            {'Other Location'}
          </h2>
        );
      }

      return (
        <Location
          address={`${location.address.address_1}, ${
            location.address.address_2
          }, ${location.address.state_province} ${
            location.address.postal_code
          }`}
          title={location.address.city}
          email="email@domaninname.com"
          phone="(916) 514-7044"
          key={location.id}
        />
      );
    });

    $otherLocation = [
      ...mapOtherLocations,
      <Link key={'link'} className="detail-locations__all-locations">
        {'View All Locations'}
      </Link>,
    ];
  }

  return (
    <div className="detail-locations">
      <h2 className="detail-locations__title text-bold">{'Main Location'}</h2>
      <Location
        address={`${locations[0].address.address_1}, ${
          locations[0].address.address_2
        }, ${locations[0].address.state_province} ${
          locations[0].address.postal_code
        }`}
        title={locations[0].address.city}
        email="email@domaninname.com"
        phone="(916) 514-7044"
      />
      {$otherLocation}
    </div>
  );
};

Locations.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      address: PropTypes.shape({
        address_1: PropTypes.string,
        address_2: PropTypes.string,
        city: PropTypes.string,
        postal_code: PropTypes.string,
        state_province: PropTypes.string,
      }),
      phones: PropTypes.array,
      email: PropTypes.string,
    })
  ),
};

export default Locations;
