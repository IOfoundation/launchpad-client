import React from 'react';

const CheckBox = size => {
  return (
    <input
      className="checkBox"
      style={{height: size, width: size}}
      type="checkbox"
    />
  );
};

export default CheckBox;
