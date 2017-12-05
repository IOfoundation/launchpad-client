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
      coordinates: {lat: 38.57, lng: -121.47},
    };
  }

  getBounds = locations => {
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
    this.props.onBoundsChange(e);
  };
  _handleOnClick = (e, childProps) => {
    this.setState({
      selected: e,
      coordinates: {
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

  render() {
    const {locations, organizations, toggleSwitch, expanded} = this.props;
    const sacCoordinates = {lat: 38.57, lng: -121.47};
    const map_options = {fullscreenControl: false};
    const zoomLevel = 7;
    if (toggleSwitch) {
      return (
        <GoogleMap
          center={this.state.coordinates}
          zoom={zoomLevel}
          hoverDistance={12}
          onChange={this.handleBoundsChange}
          resetBoundsOnResize={true}
          options={map_options}
          onChildMouseEnter={e => this._handleChildMouseEnter(e)}
          onChildMouseLeave={() => this._handleChildMouseLeave()}
          onChildClick={e => this._handleOnClick(e)}
          bootstrapURLKeys={{key: process.env.GOOGLE_MAP_API_KEY}}
        >
          {!isEmpty(locations)
            ? locations.map(location => {
                const [lng, lat] = this.getCoordinates(location);
                return (
                <MapMarker
                    key={location.id}
                    lat={lat}
                    lng={lng}
                    organization={location.organization}
                    selected={this.state.selected === String(location.id)}
                    handleCloseClick={() => this._handleCloseClick()}
                  />
              );
              })
            : ''}
        </GoogleMap>
      );
    }
    if (isEmpty(locations)) {
      return (
        <GoogleMap
          center={sacCoordinates}
          zoom={12}
          onChange={event => this.handleBoundsChange(event)}
          resetBoundsOnResize={true}
          options={map_options}
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
    } else if (organizations.length === 1) {
      const [lng, lat] = this.getCoordinates(organizations[0].locations[0]);
      return (
        <GoogleMap
          center={lng ? {lat, lng} : sacCoordinates}
          zoom={13}
          hoverDistance={12}
          onChange={e => this.handleBoundsChange(e)}
          resetBoundsOnResize={true}
          options={map_options}
          onChildMouseEnter={e => this._handleChildMouseEnter(e)}
          onChildMouseLeave={() => this._handleChildMouseLeave()}
          onChildClick={e => this._handleOnClick(e)}
          bootstrapURLKeys={{key: process.env.GOOGLE_MAP_API_KEY}}
        >
          {!isEmpty(locations)
            ? locations.map(location => {
                const [lng, lat] = this.getCoordinates(location);
                return (
                <MapMarker
                    key={location.id}
                    lat={lat}
                    lng={lng}
                    organization={location.organization}
                    selected={this.state.selected === String(location.id)}
                    handleCloseClick={() => this._handleCloseClick()}
                  />
              );
              })
            : ''}
        </GoogleMap>
      );
    }
    const bounds = this.getBounds(locations);
    const size = expanded
      ? {width: 400, height: 485}
      : {width: 200, height: 237};
    const {center, zoom} = fitBounds(bounds, size);
    return (
      <GoogleMap
        center={center}
        zoom={zoom}
        hoverDistance={12}
        onChange={e => this.handleBoundsChange(e)}
        resetBoundsOnResize={true}
        options={map_options}
        onChildMouseEnter={e => this._handleChildMouseEnter(e)}
        onChildMouseLeave={() => this._handleChildMouseLeave()}
        onChildClick={e => this._handleOnClick(e)}
        bootstrapURLKeys={{key: process.env.GOOGLE_MAP_API_KEY}}
      >
        {!isEmpty(locations)
          ? locations.map(location => {
              const [lng, lat] = this.getCoordinates(location);
              return (
              <MapMarker
                  key={location.id}
                  lat={lat}
                  lng={lng}
                  organization={location.organization}
                  selected={this.state.selected === String(location.id)}
                  handleCloseClick={() => this._handleCloseClick()}
                />
            );
            })
          : ''}
      </GoogleMap>
    );
  }
}

Main.propTypes = {
  expanded: PropTypes.bool.isRequired,
  highlightOrgCard: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object),
  onBoundsChange: PropTypes.func.isRequired,
  organizations: PropTypes.arrayOf(PropTypes.object),
  toggleSwitch: PropTypes.bool.isRequired,
};

export default Main;
