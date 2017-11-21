import React from 'react';

const FacebookIcon = ({className, size, style}) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 18 18"
      style={style}
    >
      <g id="Main" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          id="List-Less-Initial-Expanded"
          transform="translate(-323.000000, -576.000000)"
        >
          <g id="Group-23" transform="translate(195.000000, 482.000000)">
            <g id="Group-8">
              <g id="FB" transform="translate(128.000000, 94.000000)">
                <rect
                  id="Rectangle-4-Copy-3"
                  fill="#3B5998"
                  x="0"
                  y="0"
                  width={size}
                  height={size}
                  rx="1"
                />
                <path
                  d="M6.77128275,16.425 L6.75,9.675 L4.05,9.675 L4.05,6.975 L6.75,6.975 L6.75,5.2875 C6.75,2.782305 8.301366,1.575 10.5361695,1.575 C11.6066655,1.575 12.5266972,1.65469725 12.7948207,1.69032375 L12.7948207,4.308399 L11.2448655,4.309101 C10.0294537,4.309101 9.79412175,4.8866445 9.79412175,5.73415425 L9.79412175,6.975 L13.33125,6.975 L11.98125,9.675 L9.79412175,9.675 L9.79412175,16.425 L6.77128275,16.425 Z"
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

export default FacebookIcon;
