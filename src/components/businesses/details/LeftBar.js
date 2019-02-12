import React from 'react';
import {PropTypes} from 'prop-types';

import Locations from './Locations';
import UpcomingEvents from './UpcomingEvents';

const LeftBar = props => {
  const {organization} = props;

  return (
    <div className="left-bar">
      <Locations locations={organization.locations} />
      <h3 className="left-bar__title text-bold">{'Upcoming events'}</h3>
      <UpcomingEvents
        text="Transforming Your Business with Custom Software"
        day="22"
        month="NOV"
      />
      <UpcomingEvents
        text="Transforming Your Business with Custom Software"
        day="22"
        month="NOV"
      />
      <UpcomingEvents
        text="Transforming Your Business with Custom Software"
        day="22"
        month="NOV"
      />
    </div>
  );
};

LeftBar.propTypes = {
  organization: PropTypes.shape({
    services: PropTypes.arrayOf(PropTypes.object),
    locations: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default LeftBar;
