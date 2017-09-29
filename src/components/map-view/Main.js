import React from 'react';
import GoogleMapReact from 'google-map-react';
import {PropTypes} from 'prop-types';
import MapMarker from './MapMarker';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
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
    const firstBusiness = this.props.locations
      ? this.props.locations[0]
      : null;
    if (firstBusiness) {
      const [centerLng, centerLat] = this.getCoordinates(firstBusiness);
      return (
        <GoogleMapReact center={{lat: centerLat, lng: centerLng}} zoom={15}>
          {this.props.locations.map(location => {
            const [lng, lat] = this.getCoordinates(location);
            return (
              <MapMarker
                key={location.id}
                className=""
                lat={lat}
                lng={lng}
              />
            );
          })}
        </GoogleMapReact>
      );
    }
    return <div>{'Loading'}</div>;
  }
}

Main.propTypes = {
  locations: PropTypes.array.isRequired,
};

export default Main;
