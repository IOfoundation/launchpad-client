import React from 'react';

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

export default ClearIcon;
