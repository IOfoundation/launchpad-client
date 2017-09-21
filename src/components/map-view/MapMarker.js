import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {MdPlace} from 'react-icons/lib/md';
const K_WIDTH = 40;
const K_HEIGHT = 40;

const markerStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,
  borderRadius: K_HEIGHT,
  color: '#4A4A4A',
};

export default class MapMarker extends Component {
  render() {
    return (
      <div style={markerStyle}>
        <MdPlace className="map_marker" size={40} />
      </div>
    );
  }
}
