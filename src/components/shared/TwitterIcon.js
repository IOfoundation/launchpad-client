import React from 'react';
import {PropTypes} from 'prop-types';

const TwitterIcon = ({className, size, style}) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 18 18"
      style={style}
    >
      <g id="Main">
        <g
          id="List-Less-Initial-Expanded"
          transform="translate(-349.000000, -576.000000)"
        >
          <g id="Group-23" transform="translate(195.000000, 482.000000)">
            <g id="Group-8">
              <g id="TW" transform="translate(154.000000, 94.000000)">
                <rect
                  id="Rectangle-4-Copy-2"
                  fill="#1DA1F2"
                  x="0"
                  y="0"
                  width={size}
                  height={size}
                  rx="1"
                />
                <path
                  d="M16.8,4.1375 C16.2375,4.3875 15.675,4.575 15.05,4.6375 C15.675,4.2625 16.175,3.6375 16.425,2.95 C15.8,3.325 15.175,3.575 14.4875,3.7 C13.925,3.075 13.1125,2.7 12.2375,2.7 C10.55,2.7 9.175,4.075 9.175,5.7625 C9.175,6.0125 9.175,6.2625 9.2375,6.45 C6.6125,6.325 4.3625,5.075 2.8625,3.2 C2.55,3.7 2.425,4.2 2.425,4.7625 C2.425,5.825 2.9875,6.7625 3.8,7.325 C3.3,7.325 2.8,7.2 2.425,6.95 C2.425,6.95 2.425,6.95 2.425,7.0125 C2.425,8.5125 3.4875,9.7625 4.8625,10.0125 C4.6125,10.075 4.3625,10.1375 4.05,10.1375 C3.8625,10.1375 3.675,10.1375 3.4875,10.075 C3.8625,11.325 4.9875,12.2 6.3625,12.2 C5.3,13.0125 3.9875,13.5125 2.55,13.5125 C2.3,13.5125 2.05,13.5125 1.8,13.45 C3.175,14.325 4.8,14.825 6.4875,14.825 C12.175,14.825 15.2375,10.1375 15.2375,6.075 L15.2375,5.7 C15.8625,5.2625 16.3625,4.7 16.8,4.1375 Z"
                  id="Mask"
                  fill="#FFFFFF"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

TwitterIcon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.shape({}),
};

export default TwitterIcon;
