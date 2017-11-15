import React from 'react';
import {PropTypes} from 'prop-types';
import GoogleMap from 'google-map-react';
import MapMarker from './MapMarker';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selected: -1,
    };
  }

  openModal() {
    this.setState({showModal: !this.state.showModal});
  }
  getCoordinates(business) {
    return business.coordinates;
  }
  handleBoundsChange(event) {
    this.props.onBoundsChange(event);
  }
  _handleOnClick(e) {
    this.setState({ selected: e });
  }

  _handleCloseClick() {
    this.setState({ selected: -1 });
  }

  _handleHover(e) {
    this.props.highlightOrgCard(e);
  }

  render() {
    const {locations} = this.props;
    const firstBusiness = locations ? locations[0] : null;
    const sacCoordinates = {lat: 38.57, lng: -121.47};
    const map_options = { fullscreenControl: false };
    const zoomLevel = 7
    if (firstBusiness) {
      const [centerLng, centerLat] = this.getCoordinates(firstBusiness);
      return (
        <GoogleMap
          center={sacCoordinates}
          zoom={zoomLevel}
          hoverDistance={12}
          onChange={e => this.handleBoundsChange(e)}
          resetBoundsOnResize={true}
          options={map_options}
          onChildMouseEnter={e => this._handleHover(e)}
          onChildMouseLeave={e => this._handleHover(e)}
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
                selected={this.state.selected === String(location.id)
                  ? true : false}
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
      >
      </GoogleMap>
    )
  }
}

Main.propTypes = {
  locations: PropTypes.array,
  onBoundsChange: PropTypes.func.isRequired,
};

export default Main;
