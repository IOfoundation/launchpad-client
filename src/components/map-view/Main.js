import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './PointMarker';
import {PropTypes} from 'prop-types';

class Main extends React.Component {
  render() {
    return (
      <GoogleMapReact
        defaultCenter={{lat: 38.581572, lng: -121.4944}}
        defaultZoom={15}
      >
        {this.props.businesses.map(business => {
          return (
            <Marker
              key={business.id}
              lat={business.location.latitude}
              lng={business.location.longitude}
              text={''}
            />
          );
        })}
      </GoogleMapReact>
    );
  }
}

Main.propTypes = {
  businesses: PropTypes.array.isRequired,
};

export default Main;
