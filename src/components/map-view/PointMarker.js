import React from 'react';
import {PropTypes} from 'prop-types';

const PointMarker = ({text}) => {
  return (
    <div
      style={{
        backgroundColor: 'red',
        width: '15px',
        height: '15px',
        borderRadius: '50%',
      }}
    >
      {text}
    </div>
  );
};

PointMarker.propTypes = {
  text: PropTypes.string,
};

export default PointMarker;
