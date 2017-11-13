import React, {Component} from 'react';
import FacebookIcon from '../shared/FacebookIcon';
import TwitterIcon from '../shared/TwitterIcon';
import LinkedinIcon from '../shared/LinkedinIcon';

const K_WIDTH = 24;
const K_HEIGHT = 24;

const markerStyle = {
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -12,
  top: -20,
  borderRadius: K_HEIGHT,
};

const selectedMarkerStyle = {
  position: 'absolute',
  width: 26,
  height: 26,
  left: -12,
  top: -20,
  borderRadius: K_HEIGHT,
  cursor: 'pointer',
};

const markerFill = '#4A4A4A';
const selectedMarkerFill = '#2AD587';

const _renderModal = (business) => {
  return (
    <div className="map_modal">
      <div className="row between-xs top-xs map_modal_top">
        <h1 className="map_modal_title">{business.name}</h1>
      </div>
      <section className="row between-xs map_modal_social business_block--expanded_bottom">
        <a className="visitWebsite bold" href={business.website}>
          {'VISIT WEBSITE'}
        </a>
        <div>
          {business.facebook ? <a href={business.facebook}><FacebookIcon className={'icon-svg'} size={18} /></a> : ''}
          {business.twitter ? <a href={business.twitter}><TwitterIcon className={'icon-svg'} size={18} /></a> : ''}
          {business.linkedin ? <a href={business.linkedin}><LinkedinIcon className={'icon-svg'} size={18} /></a> : ''}
        </div>
      </section>
    </div>
  );
}

export default class MapMarker extends Component {
  render() {
    const {selected} = this.props;
    return (
      <div>
        <svg fill={this.props.$hover ? selectedMarkerFill : markerFill} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" style={this.props.$hover ? selectedMarkerStyle : markerStyle}>
            <path className={'map_marker'} d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
        {this.props.selected ? _renderModal(this.props.organization) : ''}
      </div>

    );
  }
}
