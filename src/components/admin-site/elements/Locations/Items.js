import React from 'react';
import {PropTypes} from 'prop-types';

import Item from './Item';

const Items = props => {
  const {locations, router} = props;
  let itemElement;
  const createEditLocation = id => {
    router.push(`/admin/location/${id}`);
  };

  if (locations.length > 0) {
    itemElement = locations.map(location => {
      const {address: addressObj} = location;
      let address;

      if (addressObj !== null) {
        const {address_1, city, state_province, postal_code} = addressObj;
        address = `${address_1}, ${city}, ${state_province} ${postal_code}`;
      }

      return (
        <Item
          key={location.id}
          name={location.name}
          address={address}
          clicked={() => createEditLocation(location.id)}
        />
      );
    });
  } else {
    itemElement = (
      <p className="text-regular paragraph">{'No locations available'}</p>
    );
  }

  return itemElement;
};

Items.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({})),
  router: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default Items;
