import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import FacebookIcon from '../shared/FacebookIcon';
import TwitterIcon from '../shared/TwitterIcon';
import LinkedinIcon from '../shared/LinkedinIcon';
import ClearIcon from '../shared/ClearIcon';
import ArrowRight from '../shared/ArrowRight';

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
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -12,
  top: -20,
  borderRadius: K_HEIGHT,
  cursor: 'pointer',
};

const markerFill = '#4A4A4A';
const selectedMarkerFill = '#2AD587';

class MapMarker extends Component {
  _closeOrgInfo() {
    this.props.handleCloseClick();
  }
  render() {
    const {$hover, selected, organization} = this.props;
    const orgInfoModal = (
      <div id="org-modal" className="map_modal">
        <div className="row between-xs top-xs map_modal_top">
          <a className="close-map-org" onClick={() => this._closeOrgInfo()}>
            <ClearIcon
              size={15}
              style={{color: '#000000', verticalAlign: 'middle'}}
            />
          </a>
          <img
            className="map_modal_logo"
            src={
              organization.logo_url
                ? organization.logo_url
                : '../static-data/images/orgs-placeholder.png'
            }
          />
          <h1 className="map_modal_title">{organization.name}</h1>
        </div>
        <hr />
        <section className="row between-xs map_modal_social business_block--expanded_bottom">
          <div>
            {organization.facebook && (
              <a href={organization.facebook} target="_blank" rel="noopener">
                <FacebookIcon className={'icon-svg'} size={18} />
              </a>
            )}
            {organization.twitter && (
              <a href={organization.twitter} target="_blank" rel="noopener">
                <TwitterIcon className={'icon-svg'} size={18} />
              </a>
            )}
            {organization.linkedin && (
              <a href={organization.linkedin} target="_blank" rel="noopener">
                <LinkedinIcon className={'icon-svg'} size={18} />
              </a>
            )}
          </div>
          <a
            className="website-link bold"
            href={organization.website}
            target="_blank"
            rel="noopener"
          >
            {'WEBSITE'}
            <ArrowRight size={20} style={{verticalAlign: 'middle'}} />
          </a>
        </section>
      </div>
    );
    return (
      <div>
        <svg
          fill={$hover ? selectedMarkerFill : markerFill}
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          style={$hover ? selectedMarkerStyle : markerStyle}
        >
          <path
            className={'map_marker'}
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
          />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
        {selected ? orgInfoModal : ''}
      </div>
    );
  }
}

MapMarker.propTypes = {
  $hover: PropTypes.bool,
  handleCloseClick: PropTypes.func.isRequired,
  organization: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  selected: PropTypes.bool.isRequired,
};

export default MapMarker;
