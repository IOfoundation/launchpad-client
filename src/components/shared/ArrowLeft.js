import React from 'react';
import {PropTypes} from 'prop-types';

const ArrowLeft = ({className, size, style}) => {
  return (
    <svg
      fill="currentColor"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      height={size}
      width={size}
      viewBox="0 0 40 40"
      style={style}
    >
      <g>
        <path d="m25.7 12.3l-7.7 7.7 7.7 7.7-2.3 2.3-10-10 10-10z" />
      </g>
    </svg>
  );
};

ArrowLeft.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.object,
};

export default ArrowLeft;
