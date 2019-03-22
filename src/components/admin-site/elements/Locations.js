import React from 'react';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router';

import LandingComponent from '../Landing';
import Title from '../Title';
import Item from './Locations/Item';

const Locations = props => {
  const {router, locations} = props;
  const createEditLocation = id => {
    router.push(`/admin/location/${id}`);
  };

  return (
    <LandingComponent navigation={true}>
      <Title
        titleText="Locations"
        hideCancelAction={true}
        submitLabel={'Add Location'}
        submitClicked={createEditLocation}
      />
      <div style={{padding: 8}}>
        {locations.map(location => {
          const {address} = location;
          return (
            <Item
              key={location.id}
              name={location.name}
              address={` ${address.address_1}, ${address.city}, ${
                address.state_province
              } ${address.postal_code}`}
              clicked={() => createEditLocation(location.id)}
            />
          );
        })}
      </div>
    </LandingComponent>
  );
};

Locations.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({})),
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default withRouter(Locations);
