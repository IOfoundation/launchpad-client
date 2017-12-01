import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import GoogleMap from 'google-map-react';
import MapMarker from './MapMarker';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '-1',
      coordinates: {lat: 38.57, lng: -121.47},
    };
  }
  getCoordinates(business) {
    return business.coordinates;
  }
  handleBoundsChange = e => {
    this.props.onBoundsChange(e);
  }
  _handleOnClick = (e, childProps) => {
    this.setState({
      selected: e,
      coordinates: {
        lat: childProps.lat,
        lng: childProps.lng},
    });
  };
  _handleCloseClick = () => {
    this.setState({selected: -1});
  };
  _handleChildMouseEnter = e => {
    this.props.highlightOrgCard(
      this.props.locations.find(x => String(x.id) === e).organization.id
    );
  };
  _handleChildMouseLeave = () => {
    this.props.highlightOrgCard(-1);
  };

  render() {
    const {locations} = this.props;
    const firstBusiness = locations ? locations[0] : null;
    const mapOptions = {fullscreenControl: false};
    const zoomLevel = 7;
    if (firstBusiness) {
      return (
        <GoogleMap
          center={this.state.coordinates}
          zoom={zoomLevel}
          hoverDistance={12}
          onChange={this.handleBoundsChange}
          resetBoundsOnResize={true}
          options={mapOptions}
          onChildMouseEnter={this._handleChildMouseEnter}
          onChildMouseLeave={this._handleChildMouseLeave}
          onChildClick={this._handleOnClick}
          bootstrapURLKeys={{
            key: process.env.GOOGLE_MAP_API_KEY,
          }}
        >
          {locations.map(location => {
            const [lng, lat] = this.getCoordinates(location);
            return (
              <MapMarker
                key={location.id}
                lat={lat}
                lng={lng}
                organization={location.organization}
                selected={this.state.selected === String(location.id)}
                handleCloseClick={this._handleCloseClick}
              />
            );
          })}
        </GoogleMap>
      );
    }
    return (
      <GoogleMap
        center={this.state.coordinates}
        zoom={10}
        onChange={event => this.handleBoundsChange(event)}
        resetBoundsOnResize={true}
        options={mapOptions}
        bootstrapURLKeys={{
          key: process.env.GOOGLE_MAP_API_KEY,
        }}
      />
    );
  }
}

Main.propTypes = {
  highlightOrgCard: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object),
  onBoundsChange: PropTypes.func.isRequired,
};

export default Main;
