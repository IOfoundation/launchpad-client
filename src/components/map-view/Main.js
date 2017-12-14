import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {isEmpty} from 'lodash';
import GoogleMap from 'google-map-react';
import {fitBounds} from 'google-map-react/utils';
import MapMarker from './MapMarker';

class Main extends Component {
  state = {
    selected: '-1',
    center: {lat: 38.57, lng: -121.47},
    zoom: null,
  };

  getBounds = () => {
    const lat_array = this.props.locations.map(location => location.latitude);
    const lng_array = this.props.locations.map(location => location.longitude);
    return {
      nw: {
        lat: Math.max(...lat_array),
        lng: Math.min(...lng_array),
      },
      se: {
        lat: Math.min(...lat_array),
        lng: Math.max(...lng_array),
      },
    };
  };
  getCoordinates = business => {
    return business.coordinates;
  };
  handleBoundsChange = e => {
    this.setState({center: e.center, zoom: e.zoom});
    this.props.onBoundsChange(e);
  };
  _handleOnClick = (e, childProps) => {
    this.setState({
      selected: e,
      centerCoordinates: {
        lat: childProps.lat,
        lng: childProps.lng,
      },
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

  createMapOptions = showLoading => {
    if (showLoading) {
      return {
        fullscreenControl: false,
        styles: [
          {
            stylers: [
              {saturation: -100},
              {gamma: 0.8},
              {lightness: 4},
              {visibility: 'on'},
            ],
          },
        ],
      };
    }
    return {fullscreenControl: false};
  };

  _createMapSettings = () => {
    const {organizations, toggleSwitch, expanded, showLoading} = this.props;
    if (showLoading || toggleSwitch) {
      return {
        center: this.state.center,
        zoom: this.state.zoom,
        options: this.createMapOptions(showLoading),
      };
    } else if (isEmpty(organizations)) {
      return {
        center: {lat: 38.57, lng: -121.47},
        zoom: 10,
        options: this.createMapOptions(showLoading),
      };
    } else if (organizations.length === 1) {
      const [lng, lat] = this.getCoordinates(organizations[0].locations[0]);
      return {
        center: lng ? {lat, lng} : {lat: 38.57, lng: -121.47},
        zoom: 13,
        options: this.createMapOptions(showLoading),
      };
    }
    const bounds = this.getBounds();
    const size = expanded
      ? {width: 400, height: 485}
      : {width: 200, height: 237};
    const {center, zoom} = fitBounds(bounds, size);
    return {
      center,
      zoom,
      options: this.createMapOptions(showLoading),
    };
  };

  render() {
    const {
      locations,
      organizations,
      toggleSwitch,
      expanded,
      showLoading,
    } = this.props;
    const {center, zoom, options} = this._createMapSettings();
    const loadingStyles = {
      fullscreenControl: false,
      styles: [
        {
          stylers: [
            {saturation: -100},
            {gamma: 0.8},
            {lightness: 4},
            {visibility: 'on'},
          ],
        },
      ],
    };
    if (showLoading) {
      return (
        <GoogleMap
          center={center}
          zoom={zoom}
          resetBoundsOnResize={true}
          options={loadingStyles}
          bootstrapURLKeys={{key: process.env.GOOGLE_MAP_API_KEY}}
        />
      );
    }
    return (
      <GoogleMap
        center={center}
        zoom={zoom}
        onChange={this.handleBoundsChange}
        resetBoundsOnResize={true}
        onChildMouseEnter={this._handleChildMouseEnter}
        onChildMouseLeave={this._handleChildMouseLeave}
        onChildClick={this._handleOnClick}
        bootstrapURLKeys={{key: process.env.GOOGLE_MAP_API_KEY}}
      >
        {locations
          ? locations.map(location => {
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
            })
          : ''}
      </GoogleMap>
    );
  }
}

Main.propTypes = {
  expanded: PropTypes.bool,
  highlightOrgCard: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object),
  onBoundsChange: PropTypes.func.isRequired,
  organizations: PropTypes.arrayOf(PropTypes.object),
  showLoading: PropTypes.bool,
  toggleSwitch: PropTypes.bool,
};

export default Main;
