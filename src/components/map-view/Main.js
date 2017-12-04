import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import GoogleMap from 'google-map-react';
import MapMarker from './MapMarker';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '-1',
    };
  }
  getCoordinates(business) {
    return business.coordinates;
  }
  handleBoundsChange(e) {
    this.props.onBoundsChange(e);
  }
  _handleOnClick(e) {
    this.setState({selected: e});
  }
  _handleCloseClick() {
    this.setState({selected: -1});
  }
  _handleChildMouseEnter(e) {
    this.props.highlightOrgCard(
      this.props.locations.find(x => String(x.id) === e).organization.id
    );
  }
  _handleChildMouseLeave() {
    this.props.highlightOrgCard(-1);
  }

  render() {
    const {locations} = this.props;
    const firstBusiness = locations ? locations[0] : null;
    const sacCoordinates = {lat: 38.57, lng: -121.47};
    const map_options = {fullscreenControl: false};
    const zoomLevel = 7;
    if (firstBusiness) {
      return (
        <GoogleMap
          center={sacCoordinates}
          zoom={zoomLevel}
          hoverDistance={12}
          onChange={e => this.handleBoundsChange(e)}
          resetBoundsOnResize={true}
          options={map_options}
          onChildMouseEnter={e => this._handleChildMouseEnter(e)}
          onChildMouseLeave={() => this._handleChildMouseLeave()}
          onChildClick={e => this._handleOnClick(e)}
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
                handleCloseClick={() => this._handleCloseClick()}
              />
            );
          })}
        </GoogleMap>
      );
    }
    return (
      <GoogleMap
        center={sacCoordinates}
        zoom={10}
        onChange={event => this.handleBoundsChange(event)}
        resetBoundsOnResize={true}
        options={map_options}
        bootstrapURLKeys={{
          key: process.env.GOOGLE_MAP_API_KEY,
        }}
      />
    );
  }
}

Main.propTypes = {
  highlightOrgCard: PropTypes.func.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object),
  onBoundsChange: PropTypes.func.isRequired,
};

export default Main;
