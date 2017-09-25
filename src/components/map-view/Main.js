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
    this.setState({showModal: !this.state.showModal});
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
    return (
      <GoogleMapReact
        defaultCenter={{lat: 38.581572, lng: -121.4944}}
        defaultZoom={15}
      >
        {this.props.businesses.map(business => {
          return null;

          // TODO: Fix with location relation
          // return (
          //   <div
          //     key={business.id}
          //     className="map_markerContainer"
          //     lat={latitude}
          //     lng={longitude}
          //   >
          //     {this.state.showModal ? this._renderModal(business) : null}
          //     <Marker showModal={this.openModal} />
          //   </div>
          // );
        })}
      </GoogleMapReact>
    );
  }
}

Main.propTypes = {
  businesses: PropTypes.array.isRequired,
};

export default Main;
