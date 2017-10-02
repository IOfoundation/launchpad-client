import React from 'react';
import {PropTypes} from 'prop-types';

const Chip = ({text, handleClick}) => (
  <a
    className={`
      search-filter-label
    `}
    onClick={e => handleClick(e)}
    data-value={text}
  >
    {text}
    <span className="search-filter-icon">{'x'}</span>
  </a>
);

Chip.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default Chip;
