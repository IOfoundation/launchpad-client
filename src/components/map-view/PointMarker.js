import React from 'react';
import {PropTypes} from 'prop-types';
import {MdPlace} from 'react-icons/lib/md';

class PointMarker extends React.Component {
  render() {
    return (
      <MdPlace
        className="map_marker"
        size={40}
        onClick={() => this.props.showModal()}
      />
    );
  }
}

PointMarker.propTypes = {
  showModal: PropTypes.func,
  text: PropTypes.string,
};

export default PointMarker;
