import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {isEmpty} from 'lodash';
import GoogleMap from 'google-map-react';
import {fitBounds} from 'google-map-react/utils';
import MapMarker from './MapMarker';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '-1',
    };
  }

  getBounds = () => {
    const latArray = this.props.locations.map(location => location.latitude);
    const lngArray = this.props.locations.map(location => location.longitude);
    return {
      nw: {
        lat: Math.max(...latArray),
        lng: Math.min(...lngArray),
      },
      se: {
        lat: Math.min(...latArray),
        lng: Math.max(...lngArray),
      },
    };
  };

  getCoordinates = business => {
    return business.coordinates;
  };

  handleBoundsChange = e => {
    const {onBoundsChange, getLocationsInView} = this.props.mapActions;
    onBoundsChange(e);
    getLocationsInView(this.props.locations);
  };

  _handleOnClick = (e, childProps) => {
    this.setState({
      selected: e,
    });
    this.props.mapActions.setCenterCoordinates(childProps.lat, childProps.lng);
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

  renderMapMarker = location => {
    const [lat, lng] = [location.latitude, location.longitude];
    if (this.props.mapActions.isWithinBounds(lng, lat) === true) {
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
    }
  };
  _createSettings = () => {
    const {organizations, toggleSwitch, showLoading, mapProps} = this.props;
    const sacCoordinates = {lat: 38.57, lng: -121.47};
    if (toggleSwitch) {
      return {zoom: 7, center: mapProps.centerCoordinates};
    } else if (isEmpty(organizations) || showLoading) {
      return {zoom: 7, center: sacCoordinates};
    } else if (organizations.length === 1) {
      const [lng, lat] = this.getCoordinates(organizations[0].locations[0]);
      return {zoom: 13, center: lng ? {lat, lng} : sacCoordinates};
    }
    const bounds = this.getBounds();
    const size = mapProps.expanded
      ? {width: 400, height: 485}
      : {width: 200, height: 237};
    return fitBounds(bounds, size);
  };

  render() {
    const {locations, mapActions: {getMapsInstance}} = this.props;
    const mapOptions = {fullscreenControl: false};
    const {zoom, center} = this._createSettings();
    return (
      <GoogleMap
        center={center}
        zoom={zoom}
        margin={[30, 30, 30, 30]}
        onChange={this.handleBoundsChange}
        resetBoundsOnResize={true}
        options={mapOptions}
        onGoogleApiLoaded={getMapsInstance}
        onChildMouseEnter={this._handleChildMouseEnter}
        onChildMouseLeave={this._handleChildMouseLeave}
        onChildClick={this._handleOnClick}
        bootstrapURLKeys={{key: process.env.GOOGLE_MAP_API_KEY}}
      >
        {locations
          ? locations.map(location => {
              return this.renderMapMarker(location);
            })
          : ''}
      </GoogleMap>
    );
  }
}

Main.propTypes = {
  highlightOrgCard: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object),
  mapActions: PropTypes.object,
  mapProps: PropTypes.object,
  organizations: PropTypes.arrayOf(PropTypes.object),
  showLoading: PropTypes.bool,
  toggleSwitch: PropTypes.bool,
};

export default Main;
