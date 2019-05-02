import React from 'react';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router';

import LandingComponent from '../Landing';
import Title from '../Title';
import Items from './Locations/Items';
import Loading from '@Shared/Loading';

const Locations = props => {
  const {router, locations, loading} = props;
  const createLocation = () => {
    router.push('/admin/location/new');
  };
  let items = <Loading />;

  if (locations.length > 0 || !loading) {
    items = (
      <div style={{padding: 8}}>
        <Items locations={locations} router={router} />
      </div>
    );
  }

  return (
    <LandingComponent navigation={true}>
      <Title
        titleText="Locations"
        hideCancelAction={true}
        submitLabel={'Add Location'}
        submitClicked={createLocation}
      />
      {items}
    </LandingComponent>
  );
};

Locations.propTypes = {
  loading: PropTypes.bool,
  locations: PropTypes.arrayOf(PropTypes.shape({})),
  router: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default withRouter(Locations);
