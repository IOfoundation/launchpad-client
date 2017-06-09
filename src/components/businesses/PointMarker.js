import React from 'react';

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

export default PointMarker;
