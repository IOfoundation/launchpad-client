import React from 'react';

const DropdownArrow = ({className, size, style}) => {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 32 32" style={style}>
      <defs>
        <polygon id="path-1" points="9.33333333 12 16 18.6666667 22.6666667 12"></polygon>
      </defs>
      <g id="icon" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Dropdown">
          <mask id="mask-2" fill="white">
              <use xlinkHref="#path-1"></use>
          </mask>
          <use id="Shape" fill="#fff" xlinkHref="#path-1"></use>
        </g>
      </g>
    </svg>
  );
};

export default DropdownArrow;
