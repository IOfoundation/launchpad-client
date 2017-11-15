import React from 'react';
import {PropTypes} from 'prop-types';

const Chip = ({canDelete, text, handleClick}) => (
  <a
    className={`
      search-filter-label
    `}
    onClick={e => handleClick(e)}
    data-value={text}
  >
    <span className="text text-bold">{text}</span>
    {canDelete ? (<span className="search-filter-icon">{'x'}</span>): (null) }
  </a>
);

Chip.propTypes = {
  canDelete: PropTypes.bool.isRequired,
  handleClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

export default Chip;
