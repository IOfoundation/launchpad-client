import React from 'react';
import {PropTypes} from 'prop-types';
import {MdPlace} from 'react-icons/lib/md';

const PointMarker = ({text}) => {
  return <MdPlace className="map_marker" size={40} />;
};

PointMarker.propTypes = {
  text: PropTypes.string,
};

export default PointMarker;
