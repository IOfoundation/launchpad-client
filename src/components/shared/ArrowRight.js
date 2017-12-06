import React from 'react';
import {PropTypes} from 'prop-types';

const ArrowRight = ({className, size, style}) => {
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
        <path d="m16.6 10l10 10-10 10-2.3-2.3 7.7-7.7-7.7-7.7z" />
      </g>
    </svg>
  );
};

ArrowRight.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.object,
};

export default ArrowRight;
