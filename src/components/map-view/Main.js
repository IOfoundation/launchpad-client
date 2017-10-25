import React from 'react';
import {PropTypes} from 'prop-types';
import GoogleMap from 'google-map-react';
import MapMarker from './MapMarker';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
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

  _renderModal(business) {
    return (
      <div className="map_modal">
        <div className="row between-xs top-xs map_modal_top">
          <h1 className="map_modal_title">{business.name}</h1>
          <img className="map_modal_logo" src={business.logo} />
        </div>
        <section className="row between-xs map_modal_social business_block--expanded_bottom">
          <a className="visitWebsite bold smallFont primary" href="#">
            {'VISIT WEBSITE'}
          </a>
          <div>
            <a className="socialIcon" href="#">
              <img
                className="socialIcon_icon"
                src="../static-data/images/twitter.svg"
              />
            </a>
            <a className="socialIcon" href="#">
              <img
                className="socialIcon_icon"
                src="../static-data/images/facebook.svg"
              />
            </a>
            <a className="socialIcon" href="#">
              <img
                className="socialIcon_icon"
                src="../static-data/images/linkedin.svg"
              />
            </a>
          </div>
        </section>
      </div>
    );
  }
  render() {
    const firstBusiness = this.props.locations ? this.props.locations[0] : null;
    const sacCoordinates = {lat: 38.57, lng: -121.47};
    if (firstBusiness) {
      const [centerLng, centerLat] = this.getCoordinates(firstBusiness);
      return (
        <GoogleMap
          center={{lat: centerLat, lng: centerLng}}
          zoom={15}
          onChange={e => this.handleBoundsChange(e)}
          onChildClick={e => this.openModal(e)}
          bootstrapURLKeys={{
            key: process.env.GOOGLE_MAP_API_KEY,
          }}
        >
          {this.props.locations.map(location => {
            const [lng, lat] = this.getCoordinates(location);
            return <MapMarker key={location.id} lat={lat} lng={lng} />;
          })}
        </GoogleMap>
      );
    }
    return (
      <GoogleMap
        center={sacCoordinates}
        zoom={10}
        onChange={event => this.handleBoundsChange(event)}
        bootstrapURLKeys={{
          key: process.env.GOOGLE_MAP_API_KEY,
        }}
      ></GoogleMap>

    )
  }
}

Main.propTypes = {
  locations: PropTypes.array,
  onBoundsChange: PropTypes.func.isRequired,
};

export default Main;
