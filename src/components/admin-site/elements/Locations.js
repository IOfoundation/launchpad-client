import React from 'react';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router';

import LandingComponent from '../Landing';
import Title from '../Title';
import Items from './Locations/Items';

const Locations = props => {
  const {router, locations} = props;

  const createLocation = () => {
    router.push('/admin/location/new');
  };

  return (
    <LandingComponent navigation={true}>
      <Title
        titleText="Locations"
        hideCancelAction={true}
        submitLabel={'Add Location'}
        submitClicked={createLocation}
      />
      <div style={{padding: 8}}>
        <Items locations={locations} router={router} />
      </div>
    </LandingComponent>
  );
};

Locations.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({})),
  router: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default withRouter(Locations);
