import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './PointMarker';
import {PropTypes} from 'prop-types';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.state = {
      showModal: false,
    };
  }
  openModal() {
    console.log('tet');
    this.setState({showModal: !this.state.showModal});
  }
  _renderModal() {
    return (
      <div className="map_modal">
        <h1>{'test'}</h1>
      </div>
    );
  }
  render() {
    return (
      <GoogleMapReact
        defaultCenter={{lat: 38.581572, lng: -121.4944}}
        defaultZoom={15}
      >
        <div className="map_markerContainer" lat={38.581572} lng={-121.4944}>
          {this.state.showModal ? this._renderModal() : null}
          <Marker showModal={this.openModal} />
        </div>
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
