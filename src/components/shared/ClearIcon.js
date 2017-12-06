import React from 'react';
import {PropTypes} from 'prop-types';

const ClearIcon = ({className, size, style}) => {
  return (
    <svg
      fill="currentColor"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      height={size}
      width={size}
      viewBox="0 0 40 40"
      style={style}
    >
      <g>
        <path d="m31.6 10.7l-9.3 9.3 9.3 9.3-2.3 2.3-9.3-9.3-9.3 9.3-2.3-2.3 9.3-9.3-9.3-9.3 2.3-2.3 9.3 9.3 9.3-9.3z" />
      </g>
    </svg>
  );
};

ClearIcon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.object,
};

export default ClearIcon;
